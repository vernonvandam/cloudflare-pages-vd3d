import type { QuoteFields } from "@/lib/quote";

// The confirmation goes to whatever address someone typed into a public form, so it must
// never echo free text back. Spammers abuse "we got your message: <their text>" emails to
// send their content from your domain. Only fixed wording and validated values go in.

export const CONFIRMATION_SIGNATURE = {
  name: "Vernon van Dam",
  business: "VD3D",
  location: "Perth, Western Australia",
  email: "hello@vd3d.com.au",
  website: "https://vd3d.com.au",
};

const NAME_RE = /^[\p{L}][\p{L}' .-]{0,39}$/u;

/** First name if the name field looks like a real name, otherwise null. */
export function safeFirstName(name: string): string | null {
  const trimmed = name.trim();
  if (!NAME_RE.test(trimmed) || /https?:|www\.|\.(com|net|org|ru|io)\b/i.test(trimmed)) return null;
  return trimmed.split(/\s+/)[0] ?? null;
}

function formatDeadline(value: string) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function buildConfirmationEmail(fields: QuoteFields, fileCount: number) {
  const firstName = safeFirstName(fields.name);
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";
  const deadline = formatDeadline(fields.deadline);
  // service is checked against a fixed list and quantity is digits only, so both are safe to show.
  const summary: [string, string][] = [
    ["What you need", fields.service],
    ["Quantity", fields.quantity],
    ["Needed by", deadline ?? "No date given"],
    [
      "Files",
      fileCount ? `${fileCount} file${fileCount === 1 ? "" : "s"} received` : "None attached",
    ],
  ];
  const sig = CONFIRMATION_SIGNATURE;

  const subject = "We've received your quote request | VD3D";

  const text = [
    greeting,
    "",
    "Thanks for getting in touch. Your quote request has reached us and we're reviewing it now.",
    "",
    "Here's what you sent:",
    ...summary.map(([label, value]) => `- ${label}: ${value}`),
    "",
    "What happens next:",
    "1. We look over your request and any files.",
    "2. If anything's unclear, we'll ask before quoting, so the price is right the first time.",
    "3. You get a quote with pricing and timing by email.",
    "",
    "Want to add photos, files or details, or change something? Just reply to this email.",
    "",
    sig.name,
    `${sig.business} · ${sig.location}`,
    sig.email,
    sig.website,
  ].join("\n");

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 0;color:#111"><strong>${value}</strong></td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;padding:0;background:#f4f5f3">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f3;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:6px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222">
<tr><td style="background:#141414;padding:18px 28px;color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:.5px">VD<span style="color:#78c874">3D</span></td></tr>
<tr><td style="padding:28px">
<p style="margin:0 0 16px">${greeting}</p>
<p style="margin:0 0 20px">Thanks for getting in touch. Your quote request has reached us and we're reviewing it now.</p>
<p style="margin:0 0 6px;font-weight:bold">Here's what you sent</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;font-size:14px">${summary.map(([label, value]) => row(label, value)).join("")}</table>
<p style="margin:0 0 6px;font-weight:bold">What happens next</p>
<ol style="margin:0 0 22px;padding-left:20px">
<li>We look over your request and any files.</li>
<li>If anything's unclear, we'll ask before quoting, so the price is right the first time.</li>
<li>You get a quote with pricing and timing by email.</li>
</ol>
<p style="margin:0 0 24px;padding:12px 14px;background:#f0f7ef;border-left:3px solid #78c874">Want to add photos, files or details, or change something? <strong>Just reply to this email.</strong></p>
<p style="margin:0">${sig.name}<br><span style="color:#666">${sig.business} · ${sig.location}</span><br><a href="mailto:${sig.email}" style="color:#3d8a38">${sig.email}</a> · <a href="${sig.website}" style="color:#3d8a38">vd3d.com.au</a></p>
</td></tr></table>
<p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#888;margin:14px 0 0">You're receiving this because a quote was requested on vd3d.com.au with this email address. If that wasn't you, you can ignore this email.</p>
</td></tr></table></body></html>`;

  return { subject, text, html };
}
