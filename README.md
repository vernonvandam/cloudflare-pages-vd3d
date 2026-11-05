# VD3D website

The website for VD3D, a Perth design, 3D printing and laser engraving workshop.

Built with TanStack Start (React), Tailwind CSS and TypeScript, and deployed to
Cloudflare Pages. Every push to `main` deploys automatically.

## Run it locally

You need Node.js 22+ and [Bun](https://bun.sh) (or npm).

```sh
bun install
bun run dev
```

Then open the address it prints. The forms need the secrets below to send email;
without them they show a friendly "temporarily unavailable" message.

## Scripts

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `bun run dev`   | Local dev server with hot reload |
| `bun run build` | Production build                 |
| `bun run test`  | Unit tests (Vitest)              |
| `bun run lint`  | ESLint and Prettier checks       |

## Cloudflare Pages settings

Build command `npm run build`, output directory `dist`, production branch `main`.

Secrets (Pages project → Settings → Variables and Secrets):

| Name                   | Used for                                     |
| ---------------------- | -------------------------------------------- |
| `BREVO_API_KEY`        | Sending quote emails and adding shop signups |
| `BREVO_SHOP_LIST_ID`   | The Brevo list that shop signups join        |
| `TURNSTILE_SECRET_KEY` | Verifying the spam check on both forms       |

After changing a secret, redeploy the **newest** deployment. Retrying an older
one puts that older version live.

## Where things live

| Path                            | Contents                                                                 |
| ------------------------------- | ------------------------------------------------------------------------ |
| `src/routes/`                   | Pages (`index`, `quote`, `faq`, `shop`, legal pages) and `api/` handlers |
| `src/lib/services.ts`           | Services, contact email and quote link                                   |
| `src/lib/proof.ts`              | Etsy figures and reviews, copied word for word                           |
| `src/lib/faqs.ts`               | FAQ questions and answers                                                |
| `src/components/site-shell.tsx` | Header, navigation, footer                                               |
| `src/styles.css`                | Brand colours, type scale and all page styles                            |
| `brand.md`                      | Brand guide: logo, colours, type, voice, claims, imagery                 |
