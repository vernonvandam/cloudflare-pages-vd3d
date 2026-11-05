// Redirects for addresses from the old WordPress site, plus host clean-up.
// The old WooCommerce store now lives at shop.vd3d.com.au, so store paths forward
// there unchanged; old content pages map to their new equivalents.

export const SITE_ORIGIN = "https://vd3d.com.au";
export const SHOP_ORIGIN = "https://shop.vd3d.com.au";
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

// Paths that belong to WordPress/WooCommerce and now live on the shop subdomain.
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

/** Where to send this request instead, or null to serve it normally. */
export function redirectFor(url: URL): string | null {
  // One canonical host: www → bare domain.
  if (url.hostname === "www.vd3d.com.au") {
    return `${SITE_ORIGIN}${url.pathname}${url.search}`;
  }

  const path = url.pathname;
  const bare = path.length > 1 ? path.replace(/\/+$/, "") : path;

  const page = pageRedirects[bare.toLowerCase()];
  if (page) return page.startsWith("http") ? page : new URL(page, url.origin).toString();

  // A prefix matches the path itself or anything below it ("/cart" matches "/cart/", not "/cartoon").
  const underPrefix = (prefix: string) => {
    const base = prefix.replace(/\/$/, "");
    return (
      bare === base ||
      path.startsWith(`${base}/`) ||
      (/\.(php|xml)$/.test(base) && path.startsWith(base))
    );
  };
  if (shopPrefixes.some(underPrefix)) return `${SHOP_ORIGIN}${path}${url.search}`;

  // Old WordPress search and query-string links (?p=123, ?product=x, ?s=...) go to the shop.
  if (
    path === "/" &&
    (url.searchParams.has("p") || url.searchParams.has("product") || url.searchParams.has("s"))
  )
    return `${SHOP_ORIGIN}/${url.search}`;

  return null;
}

/** Preview and *.pages.dev copies of the site must not be indexed by search engines. */
export function isNonCanonicalHost(hostname: string) {
  return hostname.endsWith(".pages.dev");
}
