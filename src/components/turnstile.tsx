import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

// Cloudflare Turnstile ("VD3D website forms" widget, allowed on vd3d.com.au and
// vd3d-website.pages.dev and their subdomains). The site key is public.
const SITE_KEY = "0x4AAAAAAF0g83EMX-dYpiZt";
// Cloudflare's documented always-pass test key, used on local dev hosts.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | undefined;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  scriptPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () =>
      window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing"));
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

function siteKeyForHost() {
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" ? TEST_SITE_KEY : SITE_KEY;
}

export type TurnstileHandle = { reset: () => void };

/**
 * Renders the Turnstile check. Its token is submitted with the surrounding form as
 * `cf-turnstile-response`. Tokens are single-use, so call reset() after a failed submit.
 */
export function Turnstile({
  ref,
  compact = false,
}: {
  ref?: Ref<TurnstileHandle>;
  compact?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((api) => {
        if (cancelled || !container.current || widgetId.current) return;
        widgetId.current = api.render(container.current, {
          sitekey: siteKeyForHost(),
          action: "form",
          size: compact ? "compact" : "flexible",
          appearance: "interaction-only",
          "response-field-name": "cf-turnstile-response",
        });
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [compact]);

  return <div ref={container} className="turnstile-slot" />;
}
