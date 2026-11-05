// Cloudflare passes secrets and variables to the Worker as `env` on each request.
// src/server.ts stores it here so route handlers can read it. Locally, vite dev
// falls back to process.env (for example from a .dev.vars-style shell export).

const ENV_KEY = "__vd3dEnv";

export function setServerEnv(env: unknown) {
  if (env && typeof env === "object") (globalThis as Record<string, unknown>)[ENV_KEY] = env;
}

export function getServerEnv(name: string): string | undefined {
  const env = (globalThis as Record<string, unknown>)[ENV_KEY] as
    Record<string, unknown> | undefined;
  const value = env?.[name];
  if (typeof value === "string" && value) return value;
  const fromProcess = typeof process !== "undefined" ? process.env?.[name] : undefined;
  return fromProcess || undefined;
}
