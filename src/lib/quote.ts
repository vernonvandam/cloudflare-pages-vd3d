// Shared by the quote form (browser) and the /api/quote handler (server).
// Keep it free of server-only imports.

export const quoteServices = [
  "3D printing (I have a file)",
  "Design & prototyping",
  "Short production run",
  "Laser engraving",
  "Not sure yet",
] as const;

export const MAX_FILES = 5;
// Brevo caps an API email at 20 MB including base64 overhead, so keep raw uploads well under.
export const MAX_TOTAL_BYTES = 12 * 1024 * 1024;
export const ACCEPTED_EXTENSIONS = [
  "stl",
  "3mf",
  "step",
  "stp",
  "obj",
  "svg",
  "dxf",
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "heic",
  "zip",
] as const;
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`).join(",");
// A human takes longer than this to fill the form; bots usually don't.
export const MIN_FILL_MS = 3000;

export type QuoteFields = {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  quantity: string;
  deadline: string;
  details: string;
};

export type QuoteErrors = Partial<Record<keyof QuoteFields | "files", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function extensionOf(name: string) {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

export function validateQuote(
  fields: QuoteFields,
  files: { name: string; size: number }[],
): QuoteErrors {
  const errors: QuoteErrors = {};
  if (fields.name.trim().length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_RE.test(fields.email.trim())) errors.email = "Please enter a valid email address.";
  if (fields.phone && !/^[0-9+()\s-]{6,20}$/.test(fields.phone.trim()))
    errors.phone = "Please enter a valid phone number, or leave it blank.";
  if (!quoteServices.includes(fields.service as (typeof quoteServices)[number]))
    errors.service = "Please choose what you need.";
  if (!/^\d{1,6}$/.test(fields.quantity.trim()) || Number(fields.quantity) < 1)
    errors.quantity = "Please enter how many you need (1 or more).";
  if (fields.deadline && !/^\d{4}-\d{2}-\d{2}$/.test(fields.deadline))
    errors.deadline = "Please pick a valid date.";
  if (fields.details.trim().length < 20)
    errors.details = "Please describe the job in a sentence or two (20+ characters).";
  if (fields.details.length > 5000)
    errors.details = "Please keep the description under 5,000 characters.";
  for (const value of Object.values(fields))
    if (value.length > 5000) errors.details ??= "One of the fields is too long.";

  if (files.length > MAX_FILES) errors.files = `Please attach up to ${MAX_FILES} files.`;
  else if (
    files.some(
      (file) =>
        !ACCEPTED_EXTENSIONS.includes(
          extensionOf(file.name) as (typeof ACCEPTED_EXTENSIONS)[number],
        ),
    )
  )
    errors.files = `Allowed file types: ${ACCEPTED_EXTENSIONS.join(", ")}.`;
  else if (files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES)
    errors.files = "Files must total 12 MB or less. Send larger files by email after you submit.";
  return errors;
}

export function readQuoteFields(form: FormData): QuoteFields {
  const get = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };
  return {
    name: get("name").trim(),
    email: get("email").trim(),
    phone: get("phone").trim(),
    business: get("business").trim(),
    service: get("service"),
    quantity: get("quantity").trim(),
    deadline: get("deadline"),
    details: get("details").trim(),
  };
}
