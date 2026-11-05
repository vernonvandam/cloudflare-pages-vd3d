import { useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Loader2, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-shell";
import { Turnstile, type TurnstileHandle } from "@/components/turnstile";
import { contactEmail } from "@/lib/services";
import {
  ACCEPT_ATTR,
  MAX_FILES,
  quoteServices,
  readQuoteFields,
  validateQuote,
  type QuoteErrors,
} from "@/lib/quote";

export const Route = createFileRoute("/quote")({
  validateSearch: (search: Record<string, unknown>): { service?: string } =>
    typeof search["service"] === "string" ? { service: search["service"] } : {},
  head: () => ({
    meta: [
      { title: "Get a quote | VD3D Perth" },
      {
        name: "description",
        content:
          "Tell us what you need made. Send a sketch, photos or a print-ready file and get a quote for design, 3D printing or laser engraving in Perth.",
      },
      { property: "og:title", content: "Get a quote | VD3D Perth" },
      {
        property: "og:description",
        content: "Design, prototyping, short production runs and laser engraving in Perth.",
      },
    ],
  }),
  component: QuotePage,
});

const serviceFromSlug: Record<string, string> = {
  "3d-printing": quoteServices[0],
  "design-and-prototyping": quoteServices[1],
  "laser-engraving": quoteServices[3],
};

type Status = "idle" | "sending" | "sent" | "error";

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function QuotePage() {
  const { service } = Route.useSearch();
  const [startedAt] = useState(() => performance.now());
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const turnstile = useRef<TurnstileHandle>(null);

  function updateFileError(next: File[]) {
    const message = validateQuote(readQuoteFields(new FormData()), next).files;
    setErrors((current) => {
      const { files: _previous, ...rest } = current;
      return message ? { ...rest, files: message } : rest;
    });
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    for (const file of Array.from(list))
      if (!next.some((f) => f.name === file.name && f.size === file.size)) next.push(file);
    setFiles(next);
    updateFileError(next);
    if (fileInput.current) fileInput.current.value = "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    form.delete("files");
    for (const file of files) form.append("files", file);
    form.set("fill_ms", String(Math.round(performance.now() - startedAt)));

    const found = validateQuote(readQuoteFields(form), files);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(first === "files" ? "quote-files" : `quote-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerMessage("");
    try {
      const response = await fetch("/api/quote", { method: "POST", body: form });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: QuoteErrors;
        message?: string;
      };
      if (response.ok && result.ok) {
        setStatus("sent");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (result.errors) setErrors(result.errors);
      setServerMessage(result.message ?? "Something went wrong sending your request.");
      setStatus("error");
      turnstile.current?.reset();
    } catch {
      setServerMessage("We could not reach our server. Check your connection and try again.");
      setStatus("error");
      turnstile.current?.reset();
    }
  }

  const fieldError = (key: keyof QuoteErrors) =>
    errors[key] ? (
      <p className="field-error" id={`quote-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (key: keyof QuoteErrors) => (errors[key] ? `quote-${key}-error` : undefined);

  return (
    <>
      <SiteHeader />
      <main id="main" className="quote-page">
        <section className="section site-width quote-layout">
          <div className="quote-intro">
            <Button asChild variant="link" className="px-0">
              <Link to="/">
                <ArrowLeft /> Back to VD3D
              </Link>
            </Button>
            <div className="eyebrow">GET A QUOTE</div>
            <h1>Tell us what you need made.</h1>
            <p>
              A sketch, photos, measurements or a finished file are all fine. The more you tell us
              about what the part needs to do, the faster and more accurate your quote.
            </p>
            <ul className="quote-points">
              <li>No file? Describe it, or attach photos and a rough sketch.</li>
              <li>Print-ready files typically print in 1–2 days.</li>
              <li>Design to first print typically takes 3–5 days.</li>
            </ul>
            <p className="quote-alt">
              Prefer email? Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </div>

          {status === "sent" ? (
            <div className="quote-card quote-success" role="status">
              <CheckCircle2 />
              <h2>Thanks, your request is in.</h2>
              <p>
                We’ve emailed you a confirmation. If it isn’t in your inbox in a few minutes, check
                your spam folder. We’ll review your request and reply with questions or a quote. To
                add files or details, reply to the confirmation or write to{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
              <Button asChild variant="industrial" size="feature">
                <Link to="/">
                  Back to the homepage <ArrowUpRight />
                </Link>
              </Button>
            </div>
          ) : (
            <form className="quote-card quote-form" onSubmit={onSubmit} noValidate>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="quote-name">
                    Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={describedBy("name")}
                  />
                  {fieldError("name")}
                </div>
                <div className="field">
                  <label htmlFor="quote-email">
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={describedBy("email")}
                  />
                  {fieldError("email")}
                </div>
                <div className="field">
                  <label htmlFor="quote-phone">
                    Phone <span className="optional">optional</span>
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={describedBy("phone")}
                  />
                  {fieldError("phone")}
                </div>
                <div className="field">
                  <label htmlFor="quote-business">
                    Business <span className="optional">optional</span>
                  </label>
                  <input id="quote-business" name="business" autoComplete="organization" />
                </div>
                <div className="field">
                  <label htmlFor="quote-service">
                    What do you need? <span aria-hidden="true">*</span>
                  </label>
                  <select
                    id="quote-service"
                    name="service"
                    defaultValue={(service && serviceFromSlug[service]) || ""}
                    required
                    aria-invalid={!!errors.service}
                    aria-describedby={describedBy("service")}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {quoteServices.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {fieldError("service")}
                </div>
                <div className="field field-pair">
                  <div>
                    <label htmlFor="quote-quantity">
                      Quantity <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="quote-quantity"
                      name="quantity"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      defaultValue={1}
                      required
                      aria-invalid={!!errors.quantity}
                      aria-describedby={describedBy("quantity")}
                    />
                  </div>
                  <div>
                    <label htmlFor="quote-deadline">
                      Needed by <span className="optional">optional</span>
                    </label>
                    <input
                      id="quote-deadline"
                      name="deadline"
                      type="date"
                      aria-invalid={!!errors.deadline}
                      aria-describedby={describedBy("deadline")}
                    />
                  </div>
                  {fieldError("quantity")}
                  {fieldError("deadline")}
                </div>
                <div className="field field-wide">
                  <label htmlFor="quote-details">
                    Tell us about the job <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="quote-details"
                    name="details"
                    rows={6}
                    required
                    placeholder="What is it, what does it need to do, rough size, colour or material, and anything you'd like engraved."
                    aria-invalid={!!errors.details}
                    aria-describedby={describedBy("details")}
                  />
                  {fieldError("details")}
                </div>
                <div className="field field-wide">
                  <span className="label" id="quote-files-label">
                    Files{" "}
                    <span className="optional">
                      optional · up to {MAX_FILES} files, 12 MB total
                    </span>
                  </span>
                  <button
                    type="button"
                    id="quote-files"
                    className="file-drop"
                    aria-labelledby="quote-files-label"
                    aria-describedby={describedBy("files")}
                    onClick={() => fileInput.current?.click()}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      addFiles(event.dataTransfer.files);
                    }}
                  >
                    <Paperclip />
                    <span>
                      <strong>Add files</strong> or drop them here
                    </span>
                    <small>STL, 3MF, STEP, OBJ, SVG, DXF, PDF, images or ZIP</small>
                  </button>
                  <input
                    ref={fileInput}
                    type="file"
                    multiple
                    accept={ACCEPT_ATTR}
                    hidden
                    onChange={(event) => addFiles(event.target.files)}
                  />
                  {files.length > 0 && (
                    <ul className="file-list">
                      {files.map((file) => (
                        <li key={file.name + file.size}>
                          <span>{file.name}</span>
                          <small>{formatBytes(file.size)}</small>
                          <button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={() => {
                              const next = files.filter((f) => f !== file);
                              setFiles(next);
                              updateFileError(next);
                            }}
                          >
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {fieldError("files")}
                </div>
                {/* Spam trap: hidden from people, filled in by bots. */}
                <div className="hp-field" aria-hidden="true">
                  <label htmlFor="quote-company-website">Company website</label>
                  <input
                    id="quote-company-website"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              </div>
              <Turnstile ref={turnstile} />
              {status === "error" && (
                <div className="form-alert" role="alert">
                  {serverMessage} You can also email your request to{" "}
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                </div>
              )}
              <div className="form-actions">
                <Button
                  type="submit"
                  variant="industrial"
                  size="feature"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send my request <ArrowUpRight />
                    </>
                  )}
                </Button>
                <p>We only use your details to reply to this request.</p>
              </div>
            </form>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
