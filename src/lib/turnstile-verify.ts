import { getServerEnv } from "@/lib/server-env";

const DEFAULT_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = "ok" | "failed" | "not-configured";

/**
 * Checks the Turnstile token sent with a form. Returns "not-configured" when the
 * TURNSTILE_SECRET_KEY secret is missing, so forms keep working until it's added.
 */
export async function verifyTurnstile(form: FormData, request: Request): Promise<TurnstileResult> {
  const secret = getServerEnv("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.warn("turnstile: TURNSTILE_SECRET_KEY is not set, skipping verification");
    return "not-configured";
  }
  const token = form.get("cf-turnstile-response");
  if (typeof token !== "string" || !token || token.length > 2048) return "failed";

  const ip = request.headers.get("cf-connecting-ip");
  const body = JSON.stringify({ secret, response: token, ...(ip ? { remoteip: ip } : {}) });

  try {
    const response = await fetch(getServerEnv("TURNSTILE_VERIFY_URL") ?? DEFAULT_VERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
    if (result.success) return "ok";
    console.warn("turnstile: token rejected", result["error-codes"]);
    return "failed";
  } catch (error) {
    // Cloudflare's check being unreachable shouldn't lose a real customer's request.
    console.error("turnstile: siteverify request failed", error);
    return "ok";
  }
}

export const TURNSTILE_FAILED_MESSAGE =
  "We couldn’t confirm you’re not a robot. Please wait a moment and try again.";
