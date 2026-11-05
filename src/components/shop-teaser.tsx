import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ShopSignup } from "@/components/shop-signup";

/** Homepage band announcing the shop. */
export function ShopTeaser() {
  return (
    <section id="shop" className="section site-width shop-teaser" aria-labelledby="shop-heading">
      <div>
        <div className="eyebrow">SHOP · COMING SOON</div>
        <h2 id="shop-heading">Printed products, downloads and merch.</h2>
        <p>
          Our online shop is moving here. Get an email the day it opens.{" "}
          <Link to="/shop" className="inline-link">
            What’s coming <ArrowUpRight size={14} />
          </Link>
        </p>
      </div>
      <ShopSignup id="home-signup" />
    </section>
  );
}
