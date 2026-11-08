import { canonicalLink } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationBand, SiteFooter, SiteHeader } from "@/components/site-shell";
import { faqs } from "@/lib/faqs";
import { contactEmail } from "@/lib/services";

// Structured data so search engines can show these answers directly.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

export const Route = createFileRoute("/faq")({
  head: () => ({
    links: [canonicalLink("/faq")],
    meta: [
      { title: "3D printing FAQ | VD3D Perth" },
      {
        name: "description",
        content:
          "Answers to common 3D printing questions: cost, turnaround, materials, strength, size, multi-colour printing, file types, food safety and delivery.",
      },
      { property: "og:title", content: "3D printing FAQ | VD3D Perth" },
      {
        property: "og:description",
        content:
          "Cost, turnaround, materials, strength and more, answered by a Perth print workshop.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section site-width faq-layout">
          <div className="faq-intro">
            <Button asChild variant="link" className="px-0">
              <Link to="/">
                <ArrowLeft /> Back to VD3D
              </Link>
            </Button>
            <div className="eyebrow">FAQ</div>
            <h1>Questions we get asked most.</h1>
            <p>
              Straight answers about cost, timing, materials and what 3D printing can and can’t do.
              Can’t find yours? Ask us.
            </p>
            <div className="faq-intro-actions">
              <Button asChild variant="industrial" size="feature">
                <Link to="/quote">
                  Get a quote <ArrowUpRight />
                </Link>
              </Button>
              <a className="inline-link" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="faq-item" open={index === 0}>
                <summary>
                  <h2>{faq.question}</h2>
                  <Plus aria-hidden="true" />
                </summary>
                <div className="faq-answer">
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>
        <ConsultationBand />
      </main>
      <SiteFooter />
    </>
  );
}
