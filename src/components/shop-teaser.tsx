import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ShopSignup } from "@/components/shop-signup";
import shopImage from "@/assets/shop-teaser.webp";
import shopImageMobile from "@/assets/shop-teaser-mobile.webp";

/** Homepage band announcing the shop, with a photo on the right cut on a diagonal. */
export function ShopTeaser() {
  return (
    <section id="shop" className="shop-teaser" aria-labelledby="shop-heading">
      <div className="site-width shop-teaser-inner">
        <div className="shop-teaser-content">
          <div className="eyebrow">SHOP · COMING SOON</div>
          <h2 id="shop-heading">Printed products, downloads and merch.</h2>
          <p>Our online shop is moving here. Get an email the day it opens.</p>
          <Link to="/shop" className="inline-link">
            What’s coming <ArrowUpRight size={14} />
          </Link>
          <ShopSignup id="home-signup" />
        </div>
      </div>
      <picture className="shop-teaser-picture">
        {/* Narrow screens get a crop without the diagonal's empty corner. */}
        <source media="(max-width: 900px)" srcSet={shopImageMobile} />
        <img
          className="shop-teaser-image"
          src={shopImage}
          alt="A green low-poly fox being 3D printed"
          width={1258}
          height={724}
          loading="lazy"
        />
      </picture>
    </section>
  );
}
