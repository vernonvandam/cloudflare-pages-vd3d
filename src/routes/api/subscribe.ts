import { createFileRoute } from "@tanstack/react-router";
import { isSameOrigin, json, looksLikeBot } from "@/lib/http";
import { getServerEnv } from "@/lib/server-env";

const DEFAULT_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_FILL_MS = 1500;

// Adds an email to the Brevo "shop launch" list. Needs BREVO_API_KEY and BREVO_SHOP_LIST_ID.
export const Route = createFileRoute("/api/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) return json(403, { ok: false, message: "Request blocked." });

        let form: FormData;
        try {
          form = await request.formData();
        } catch {
          return json(400, { ok: false, message: "Please try again." });
        }
        if (looksLikeBot(form, MIN_FILL_MS)) return json(200, { ok: true });

        const email = String(form.get("email") ?? "")
          .trim()
          .toLowerCase();
        if (!EMAIL_RE.test(email) || email.length > 254)
          return json(422, { ok: false, message: "Please enter a valid email address." });

        const apiKey = getServerEnv("BREVO_API_KEY");
        const listId = Number(getServerEnv("BREVO_SHOP_LIST_ID"));
        if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
          console.error("subscribe: BREVO_API_KEY or BREVO_SHOP_LIST_ID is not set");
          return json(503, { ok: false, message: "Signups are temporarily unavailable." });
        }

        try {
          const response = await fetch(getServerEnv("BREVO_CONTACTS_URL") ?? DEFAULT_CONTACTS_URL, {
            method: "POST",
            headers: {
              "api-key": apiKey,
              "content-type": "application/json",
              accept: "application/json",
            },
            // updateEnabled: an existing contact is added to the list instead of erroring.
            body: JSON.stringify({ email, listIds: [listId], updateEnabled: true }),
          });
          if (!response.ok) {
            console.error(
              "subscribe: Brevo rejected the contact",
              response.status,
              (await response.text()).slice(0, 300),
            );
            return json(502, {
              ok: false,
              message: "We could not add you just now. Please try again.",
            });
          }
        } catch (error) {
          console.error("subscribe: Brevo request failed", error);
          return json(502, {
            ok: false,
            message: "We could not add you just now. Please try again.",
          });
        }
        return json(200, { ok: true });
      },
    },
  },
});
