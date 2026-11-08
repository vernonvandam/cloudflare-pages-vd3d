import { canonicalLink } from "@/lib/seo";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Download, Gift, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationBand, SiteFooter, SiteHeader } from "@/components/site-shell";
import { ShopSignup } from "@/components/shop-signup";
import { etsyShopUrl, etsyStats } from "@/lib/proof";

export const Route = createFileRoute("/shop")({
  head: () => ({
    links: [canonicalLink("/shop")],
    meta: [
      { title: "Shop | VD3D Perth" },
      {
        name: "description",
        content:
          "The VD3D shop is coming soon: 3D printed products, 3D printing digital downloads and merch. Get notified when it opens, or shop on Etsy now.",
      },
      { property: "og:title", content: "Shop coming soon | VD3D" },
      {
        property: "og:description",
        content: "3D printed products, digital downloads and merch from a Perth workshop.",
      },
    ],
  }),
  component: ShopPage,
});

const comingSoon = [
  {
    icon: Gift,
    title: "Printed products",
    text: "Keyrings, desk signs, organisers and gifts, made in our Perth workshop.",
  },
  {
    icon: Download,
    title: "Digital downloads",
    text: "Print files and tools for 3D printing, like our price calculator.",
  },
  { icon: Shirt, title: "Merch", text: "VD3D apparel and accessories for makers." },
];

function ShopPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="section site-width shop-hero">
          <Button asChild variant="link" className="px-0">
            <Link to="/">
              <ArrowLeft /> Back to VD3D
            </Link>
          </Button>
          <div className="eyebrow">THE VD3D SHOP</div>
          <h1>Our new shop is on the way.</h1>
          <p>
            We’re moving our products to this site. Leave your email and we’ll let you know the day
            it opens.
          </p>
          <ShopSignup id="shop-page-signup" />
        </section>
        <section className="section site-width shop-coming" aria-label="What's coming">
          <div className="shop-grid">
            {comingSoon.map(({ icon: Icon, title, text }) => (
              <div key={title} className="shop-tile">
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="shop-etsy">
            <div>
              <h2>Can’t wait? We’re on Etsy.</h2>
              <p>
                {etsyStats.sales} sales and a {etsyStats.rating}-star rating from{" "}
                {etsyStats.reviews} reviews.
              </p>
            </div>
            <Button asChild variant="industrialOutline" size="feature" className="shop-etsy-btn">
              <a href={etsyShopUrl} target="_blank" rel="noreferrer">
                Visit our Etsy shop <ArrowUpRight />
              </a>
            </Button>
          </div>
        </section>
        <ConsultationBand />
      </main>
      <SiteFooter />
    </>
  );
}
