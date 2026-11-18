import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP_URL } from "@/lib/redirects";
import shopImage from "@/assets/shop-teaser.webp";
import shopImageMobile from "@/assets/shop-teaser-mobile.webp";

/** Homepage band for the shop, with a photo on the right cut on a diagonal. */
export function ShopTeaser() {
  return (
    <section id="shop" className="shop-teaser" aria-labelledby="shop-heading">
      <div className="site-width shop-teaser-inner">
        <div className="shop-teaser-content">
          <div className="eyebrow">SHOP · NOW OPEN</div>
          <h2 id="shop-heading">Printed products and downloads.</h2>
          <p>
            Gifts, keyrings, signs and desk organisers printed in our Bullsbrook workshop, plus our
            3D print pricing tool. Shipped Australia-wide or picked up locally.
          </p>
          <div>
            <Button asChild variant="industrial" size="feature">
              <a href={SHOP_URL}>
                Visit the shop <ArrowUpRight />
              </a>
            </Button>
          </div>
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
