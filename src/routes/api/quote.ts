import { createFileRoute } from "@tanstack/react-router";
import { zipSync } from "fflate";
import { MIN_FILL_MS, readQuoteFields, validateQuote, type QuoteFields } from "@/lib/quote";
import { buildConfirmationEmail } from "@/lib/quote-confirmation";
import { getServerEnv } from "@/lib/server-env";

const DEFAULT_BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const SENDER = { name: "VD3D Website", email: "hello@vd3d.com.au" };

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );

// Strip anything that could inject extra email headers or break the subject line.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").slice(0, 120);

function toBase64(bytes: Uint8Array) {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk)
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(binary);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // some privacy tools strip Origin on same-site posts
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function sendBrevo(apiKey: string, payload: Record<string, unknown>, label: string) {
  try {
    const response = await fetch(getServerEnv("BREVO_API_URL") ?? DEFAULT_BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) return true;
    console.error(
      `quote: Brevo rejected the ${label}`,
      response.status,
      (await response.text()).slice(0, 500),
    );
  } catch (error) {
    console.error(`quote: Brevo request for the ${label} failed`, error);
  }
  return false;
}

function buildEmailHtml(fields: QuoteFields, fileNames: string[]) {
  const rows: [string, string][] = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone || "—"],
    ["Business", fields.business || "—"],
    ["Needs", fields.service],
    ["Quantity", fields.quantity],
    ["Needed by", fields.deadline || "No deadline given"],
    ["Files", fileNames.length ? fileNames.join(", ") + " (in quote-files.zip)" : "None"],
  ];
  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;vertical-align:top"><strong>${label}</strong></td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#111">
<h2 style="margin:0 0 12px">New quote request</h2>
<table style="border-collapse:collapse">${table}</table>
<h3 style="margin:20px 0 6px">Job details</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(fields.details)}</p>
<p style="margin-top:24px;color:#777;font-size:12px">Sent from the quote form on vd3d.com.au. Reply to this email to answer ${escapeHtml(fields.name)} directly.</p>
</div>`;
}

export const Route = createFileRoute("/api/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json(403, { ok: false, message: "Request blocked." });

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json(400, {
            ok: false,
            message: "We could not read that form. Please try again.",
          });
        }

        // Spam traps: a hidden field humans never fill, and a minimum time on the page.
        const honeypot = form.get("company_website");
        const startedAt = Number(form.get("started_at"));
        if (
          (typeof honeypot === "string" && honeypot.trim()) ||
          !Number.isFinite(startedAt) ||
          Date.now() - startedAt < MIN_FILL_MS
        ) {
          return json(200, { ok: true }); // look successful so bots don't adapt
        }

        const fields = readQuoteFields(form);
        const files = form
          .getAll("files")
          .filter(
            (item): item is File =>
              typeof item === "object" &&
              item !== null &&
              "arrayBuffer" in item &&
              (item as File).size > 0,
          );
        const errors = validateQuote(fields, files);
        if (Object.keys(errors).length) return json(422, { ok: false, errors });

        const apiKey = getServerEnv("BREVO_API_KEY");
        if (!apiKey) {
          console.error("quote: BREVO_API_KEY is not set");
          return json(503, { ok: false, message: "Our quote form is temporarily unavailable." });
        }

        let attachment: { name: string; content: string }[] | undefined;
        if (files.length) {
          const entries: Record<string, Uint8Array> = {};
          for (const file of files) {
            let name = file.name.replace(/[\\/]/g, "_") || "file";
            for (let n = 2; entries[name]; n++) name = `${n}-${file.name}`;
            entries[name] = new Uint8Array(await file.arrayBuffer());
          }
          attachment = [
            { name: "quote-files.zip", content: toBase64(zipSync(entries, { level: 6 })) },
          ];
        }

        const to = getServerEnv("QUOTE_TO_EMAIL") ?? "hello@vd3d.com.au";
        const payload = {
          sender: SENDER,
          to: [{ email: to, name: "VD3D" }],
          replyTo: { email: fields.email, name: oneLine(fields.name) },
          subject: `Quote request: ${oneLine(fields.service)} x${fields.quantity} from ${oneLine(fields.name)}`,
          htmlContent: buildEmailHtml(
            fields,
            files.map((file) => file.name),
          ),
          ...(attachment ? { attachment } : {}),
          tags: ["quote-request"],
        };

        if (!(await sendBrevo(apiKey, payload, "quote email")))
          return json(502, { ok: false, message: "We could not send your request just now." });

        // The request is safely with us; a failed confirmation shouldn't make the customer resend.
        const confirmation = buildConfirmationEmail(fields, files.length);
        await sendBrevo(
          apiKey,
          {
            sender: { name: "VD3D", email: SENDER.email },
            to: [{ email: fields.email }],
            replyTo: { email: SENDER.email, name: "VD3D" },
            subject: confirmation.subject,
            htmlContent: confirmation.html,
            textContent: confirmation.text,
            tags: ["quote-confirmation"],
          },
          "confirmation email",
        );

        return json(200, { ok: true });
      },
    },
  },
});
