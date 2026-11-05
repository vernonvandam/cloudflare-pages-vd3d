import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { etsyShopUrl } from "@/lib/proof";

type Status = "idle" | "sending" | "done" | "error";

/** Email signup for the shop launch. Posts to /api/subscribe. */
export function ShopSignup({ id = "shop-signup" }: { id?: string }) {
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    form.set("started_at", String(startedAt));
    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", { method: "POST", body: form });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (response.ok && result.ok) {
        setStatus("done");
        return;
      }
      setMessage(result.message ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("We could not reach our server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done")
    return (
      <p className="signup-done" role="status">
        <CheckCircle2 aria-hidden="true" /> You’re on the list. We’ll email you when the shop opens.
      </p>
    );

  return (
    <form className="signup-form" onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="signup-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={status === "error"}
          aria-describedby={`${id}-note`}
        />
        <Button type="submit" variant="industrial" size="feature" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 className="animate-spin" /> Adding…
            </>
          ) : (
            <>
              Notify me <ArrowUpRight />
            </>
          )}
        </Button>
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      {status === "error" && (
        <p className="field-error" role="alert">
          {message}
        </p>
      )}
      <p className="signup-note" id={`${id}-note`}>
        One email when the shop opens, plus occasional new products. Unsubscribe any time. Can’t
        wait?{" "}
        <a href={etsyShopUrl} target="_blank" rel="noreferrer">
          Shop on Etsy now
        </a>
        .
      </p>
    </form>
  );
}
