// Small helpers shared by the /api route handlers.

export const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

/** Reject posts from other websites. Missing Origin is allowed (some privacy tools strip it). */
export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** True when the hidden honeypot is filled or the form was submitted implausibly fast. */
export function looksLikeBot(form: FormData, minFillMs: number) {
  const honeypot = form.get("company_website");
  const startedAt = Number(form.get("started_at"));
  return (
    (typeof honeypot === "string" && honeypot.trim() !== "") ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < minFillMs
  );
}
