<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep reusable site navigation, brand and footer in the shared site-shell module so all public pages stay consistent.
- Keep service content in the browser-safe services module and render service detail pages through the parameterised TanStack route so service links and metadata share one source.
- Route quote calls to action through `consultationUrl` in the services module. It points at the /quote form, which posts to /api/quote and emails hello@vd3d.com.au through Brevo (needs the BREVO_API_KEY secret). Never point CTAs back to the old WordPress contact page.
- Only claim capabilities VD3D has: FDM single and multi-colour printing on seven printers, design and prototyping, and laser engraving with an xTool F1. No 3D scanning, laser cutting or fake reviews.
