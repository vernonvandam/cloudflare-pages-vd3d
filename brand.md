# VD3D brand guide

The rules for how VD3D looks, sounds and what it can claim. The website follows
this file; anything made in Canva, on Etsy, Instagram or in print should too.

Last updated 5 November 2026.

## Who we are

VD3D is a design, 3D printing and laser engraving workshop in Bullsbrook, Perth,
Western Australia, run by Vernon van Dam.

**Positioning:** a problem solved, not just a print. We help startups, small
businesses, makers and trades get from idea to finished part: design help,
prototypes, short production runs and engraving, from one workshop and one point
of contact.

**Why us over a cheaper print service:** they run whatever file you send. We help
get the design right first, so customers avoid costly reprints and delays.

## Logo

The mark is a heavy **VD** with a hand-lettered **3d** overlapping it. Files are in
`src/assets/`:

| File                                                                           | Use                                                                      |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `vd3d-mark-green.svg`                                                          | Website header, social avatars, any dark background (white VD, green 3d) |
| `vd3d-horizontal-green.svg`                                                    | Website footer and wide dark spaces (mark plus services and domain)      |
| `vd3d-mark-white.svg` / `vd3d-horizontal-white.svg`                            | Dark backgrounds where colour isn't possible                             |
| `vd3d-mark-black.svg` / `vd3d-horizontal-black.svg` / `vd3d-stacked-black.svg` | Light backgrounds, documents, invoices                                   |
| `vd3d-stacked-white.svg`                                                       | Dark square spaces                                                       |
| `public/favicon.svg`                                                           | Browser tab icon (black mark, flips to white in dark mode)               |

Rules:

- **Physical products, packaging, engraving and stickers use the one-colour mono
  logo.** Colour is for screens only.
- Keep clear space around the logo of at least the height of the "3d".
- Don't recolour, stretch, outline, add shadows or effects, or retype "VD3D" in
  another font. If a design needs the name as text, write "VD3D" in Space Grotesk.
- The mark must stay legible: minimum 32px tall on screen, 12mm in print.

## Colour

One brand colour, used sparingly, on a dark industrial or clean light base.

| Name            | Hex       | CSS token            | Use                                                            |
| --------------- | --------- | -------------------- | -------------------------------------------------------------- |
| VD3D Green      | `#78C874` | `--primary`          | Brand colour. Buttons, the "3d", highlights, icons on dark     |
| Green strong    | `#399738` | `--primary-strong`   | Number badges, arrows, small solid shapes on light backgrounds |
| Green ink       | `#267625` | `--primary-ink`      | Green text links on light backgrounds                          |
| Industrial      | `#0F100F` | `--industrial`       | Header, call-to-action bands, dark panels                      |
| Industrial deep | `#070707` | `--industrial-deep`  | Footer, hero background                                        |
| Ink             | `#191B19` | `--foreground`       | Headings and body text on light                                |
| Muted text      | `#606460` | `--muted-foreground` | Secondary text, descriptions                                   |
| Background      | `#FBFCFB` | `--background`       | Page background                                                |
| Surface         | `#EFF1EF` | `--muted`            | Alternate section background                                   |
| Border          | `#D6D8D6` | `--border`           | Dividers and card outlines                                     |

Rules:

- **Never use VD3D Green for body text on white.** It fails contrast. Use Green ink.
- Button text on VD3D Green is near-black (`#090F09`), never white.
- No gradients, and no second accent colour.

## Typography

| Role                                    | Font          | Weight    | Desktop | Phone | Token            |
| --------------------------------------- | ------------- | --------- | ------- | ----- | ---------------- |
| Display (homepage hero only, uppercase) | Space Grotesk | 700       | 76px    | 44px  | `--text-display` |
| Page title (H1)                         | Space Grotesk | 500       | 46px    | 32px  | `--text-h1`      |
| Section heading (H2)                    | Space Grotesk | 500       | 44px    | 30px  | `--text-h2`      |
| Callout title                           | Space Grotesk | 500       | 24px    | 24px  | `--text-title`   |
| Card, step and question titles (H3)     | Space Grotesk | 600       | 20px    | 20px  | `--text-h3`      |
| Statistic                               | Space Grotesk | 500       | 34px    | 28px  | `--text-stat`    |
| Lead paragraph                          | DM Sans       | 400       | 16px    | 16px  | `--text-lead`    |
| Body                                    | DM Sans       | 400       | 14px    | 14px  | `--text-body`    |
| Label (bold body)                       | DM Sans       | 600       | 14px    | 14px  | `--text-body`    |
| Small print, notes, form labels         | DM Sans       | 400 / 600 | 12px    | 12px  | `--text-small`   |
| Eyebrow (uppercase, 2px tracking)       | DM Sans       | 600       | 11px    | 11px  | `--text-eyebrow` |

Rules:

- **Two fonts only:** Space Grotesk for headings and numbers, DM Sans for
  everything else. Both are free on Google Fonts.
- Every size on the website comes from the tokens above, defined once in
  `src/styles.css`. Never add a one-off font size; if something doesn't fit,
  change the scale here first.
- Sentence case for headings ("Three steps. One point of contact."). Uppercase is
  only for the hero headline and eyebrows.
- Every section opens with an eyebrow, then the heading.

## Voice

Plain, direct and practical, like a tradesperson who knows their craft.

- **Lead with the customer's problem,** not the technology. "Send what you've got"
  beats "Our FDM additive manufacturing workflow".
- **Short sentences. Australian spelling** (colour, organise, metre).
- **Specific over vague:** "printed in 1–2 days" beats "fast turnaround".
- **Honest about limits:** say what 3D printing can't do (food contact,
  safety-critical parts). It builds trust.
- **Calls to action** are "Get a quote" (main) and email (secondary). Avoid "Let's
  create magic" style copy.

## Claims we can and can't make

Everything on the site must be true today. Customers hold us to it, and the
Australian Consumer Law does too.

**We can say:**

- Seven-printer farm. Multi-colour printing (up to four colours in a part).
- Materials: PLA+ (standard), PETG, ABS, ASA, TPU.
- Laser engraving with an xTool F1.
- Design and prototyping from sketches, photos or measurements.
- Short runs "up to a few hundred parts".
- Turnaround: typically 1–2 days for print-ready files, 3–5 days design to first
  print. Always "typically", always confirmed in the quote.
- Etsy proof: the real, current numbers and reviews word for word
  (`src/lib/proof.ts`).

**We don't say, until it's true:**

- 3D scanning, laser cutting, or "laser services".
- A specific production quantity we haven't delivered.
- That 3D prints are food safe.
- Response times we can't keep every time.
- Anything implying fake reviews, invented clients or stock photos are our work.

## Imagery

- **Real beats perfect.** Photos of our own printers, prints and engraving, even
  shot on a phone, always beat stock or AI images. Daylight, no flash, clean dark
  or neutral background, our real logo on the parts.
- Stand-in illustrations are allowed for explaining a process, but never presented
  as a past job, and never showing a real brand's product that isn't what we use.
- Replace stand-ins as real photos arrive. Current stand-ins: hero, the three
  service cards, the How it works steps and the shop photo.
- No other brands' logos, characters or trade marks on anything we make or show.

## Contact details

- Email: **hello@vd3d.com.au** (the only public contact; no phone on the site)
- Location: Bullsbrook, Perth, WA. Pickup by arrangement; never publish the street
  address.
- Instagram: @vandam3d · Etsy: vanDam3D
