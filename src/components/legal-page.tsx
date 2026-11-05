import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export type LegalSection = { heading: string; body: ReactNode };

export const LEGAL_UPDATED = "5 November 2026";

/** Shared layout for the privacy policy, terms and shipping & returns pages. */
export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <article className="section site-width legal-page">
          <Button asChild variant="link" className="px-0">
            <Link to="/">
              <ArrowLeft /> Back to VD3D
            </Link>
          </Button>
          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>
          <p className="legal-updated">Last updated {LEGAL_UPDATED}</p>
          <div className="legal-intro">{intro}</div>
          <nav className="legal-toc" aria-label="On this page">
            <ol>
              {sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#section-${index + 1}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          {sections.map((section, index) => (
            <section key={section.heading} id={`section-${index + 1}`} className="legal-section">
              <h2>
                {index + 1}. {section.heading}
              </h2>
              {section.body}
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
