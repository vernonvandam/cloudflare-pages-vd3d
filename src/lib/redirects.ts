// Redirects for addresses from the old WordPress site, plus host clean-up.
// Old content pages map to their new equivalents. Old store paths go to the shop:
// while SHOP_LIVE is false that's the /shop coming-soon page (temporary 302s, so
// search engines keep the old URLs until the real shop exists); once a store is live
// at SHOP_ORIGIN, flip SHOP_LIVE and they forward there unchanged (permanent 301s).

export const SITE_ORIGIN = "https://vd3d.com.au";
export const SHOP_ORIGIN = "https://shop.vd3d.com.au";
export const SHOP_LIVE = false;
const ETSY_URL = "https://www.etsy.com/shop/vanDam3D";

// Old WordPress pages → new pages (keys without trailing slash).
const pageRedirects: Record<string, string> = {
  "/contact": "/quote",
  "/contact-us": "/quote",
  "/faqs": "/faq",
  "/materials-guide": "/faq",
  "/privacy-policy": "/privacy",
  "/terms-conditions": "/terms",
  "/refund_returns": "/shipping-returns",
  "/about": "/#about",
  "/services-2": "/#services",
  "/design-manufacturing": "/services/design-and-prototyping",
  "/etsy": ETSY_URL,
};

// Paths that belonged to WordPress/WooCommerce.
const shopPrefixes = [
  "/product/",
  "/product-category/",
  "/product-tag/",
  "/cart",
  "/checkout",
  "/my-account",
  "/wp-admin",
  "/wp-login.php",
  "/wp-content/",
  "/wp-includes/",
  "/wp-json",
  "/wp-sitemap.xml",
  "/feed",
];

export type Redirect = { location: string; status: 301 | 302 };

const permanent = (location: string): Redirect => ({ location, status: 301 });

/** Where to send old store traffic for this path and query. */
function toShop(url: URL, pathAndQuery: string): Redirect {
  return SHOP_LIVE
    ? permanent(`${SHOP_ORIGIN}${pathAndQuery}`)
    : { location: new URL("/shop", url.origin).toString(), status: 302 };
}

/** Where to send this request instead, or null to serve it normally. */
export function redirectFor(url: URL): Redirect | null {
  // One canonical host: www → bare domain.
  if (url.hostname === "www.vd3d.com.au") {
    return permanent(`${SITE_ORIGIN}${url.pathname}${url.search}`);
  }

  const path = url.pathname;
  const bare = path.length > 1 ? path.replace(/\/+$/, "") : path;

  const page = pageRedirects[bare.toLowerCase()];
  if (page) return permanent(page.startsWith("http") ? page : new URL(page, url.origin).toString());

  // A prefix matches the path itself or anything below it ("/cart" matches "/cart/", not "/cartoon").
  const underPrefix = (prefix: string) => {
    const base = prefix.replace(/\/$/, "");
    return (
      bare === base ||
      path.startsWith(`${base}/`) ||
      (/\.(php|xml)$/.test(base) && path.startsWith(base))
    );
  };
  if (shopPrefixes.some(underPrefix)) return toShop(url, `${path}${url.search}`);

  // Old WordPress search and query-string links (?p=123, ?product=x, ?s=...) go to the shop.
  if (
    path === "/" &&
    (url.searchParams.has("p") || url.searchParams.has("product") || url.searchParams.has("s"))
  )
    return toShop(url, `/${url.search}`);

  return null;
}

/** Preview and *.pages.dev copies of the site must not be indexed by search engines. */
export function isNonCanonicalHost(hostname: string) {
  return hostname.endsWith(".pages.dev");
}
