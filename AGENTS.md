# VD3D website: notes for coding agents

TanStack Start (React) site deployed to Cloudflare Pages from the `main` branch of
GitHub. Every push to `main` goes live, so keep it building.

- Keep reusable site navigation, brand and footer in the shared site-shell module so all public pages stay consistent.
- Keep service content in the browser-safe services module and render service detail pages through the parameterised TanStack route so service links and metadata share one source.
- Route quote calls to action through `consultationUrl` in the services module. It points at the /quote form, which posts to /api/quote and emails hello@vd3d.com.au through Brevo (needs the BREVO_API_KEY secret). Never point CTAs back to the old WordPress contact page.
- Only claim capabilities VD3D has: FDM single and multi-colour printing on seven printers, design and prototyping, and laser engraving with an xTool F1. No 3D scanning, laser cutting or fake reviews.
- Proof figures and reviews live in src/lib/proof.ts and are copied word for word from the Etsy shop. Update the numbers, never invent or reword reviews.
- The shop is a placeholder: /shop and the homepage teaser collect emails via /api/subscribe into a Brevo list (BREVO_SHOP_LIST_ID secret).
- FAQ answers live in src/lib/faqs.ts and are commitments to customers. Never claim 3D prints are food safe, quote prices, or promise anything VD3D hasn't confirmed.
- Both forms use Cloudflare Turnstile (widget 'VD3D website forms'). The site key is in src/components/turnstile.tsx; the server checks tokens when the TURNSTILE_SECRET_KEY secret is set.
- Legal pages (/privacy, /terms, /shipping-returns) reflect VD3D's real terms: sole trader (ABN not shown), contact by email only, quotes valid 14 days, online orders paid upfront, custom jobs 50% deposit with the balance due before dispatch or at collection, customer owns designs once paid, no weapons or gun parts. Never weaken Australian Consumer Law wording.
- Follow brand.md for colours, logo use, typography, voice and what VD3D can claim. Font sizes only come from the --text-* tokens in src/styles.css.
