import { describe, expect, it } from "vitest";

import { isNonCanonicalHost, redirectFor, SHOP_LIVE } from "@/lib/redirects";

const go = (href: string) => redirectFor(new URL(href))?.location ?? null;

describe("old WordPress redirects", () => {
  it.each([
    ["https://vd3d.com.au/contact/", "https://vd3d.com.au/quote"],
    ["https://vd3d.com.au/faqs/", "https://vd3d.com.au/faq"],
    ["https://vd3d.com.au/materials-guide", "https://vd3d.com.au/faq"],
    ["https://vd3d.com.au/privacy-policy/", "https://vd3d.com.au/privacy"],
    ["https://vd3d.com.au/terms-conditions/", "https://vd3d.com.au/terms"],
    ["https://vd3d.com.au/refund_returns/", "https://vd3d.com.au/shipping-returns"],
    [
      "https://vd3d.com.au/design-manufacturing/",
      "https://vd3d.com.au/services/design-and-prototyping",
    ],
    ["https://vd3d.com.au/etsy/", "https://www.etsy.com/shop/vanDam3D"],
  ])("%s → %s", (from, to) => {
    expect(go(from)).toBe(to);
  });

  it.each([
    "https://vd3d.com.au/product/honda-cbr-gift-set/",
    "https://vd3d.com.au/product-category/keyrings/",
    "https://vd3d.com.au/cart/",
    "https://vd3d.com.au/my-account/orders/",
    "https://vd3d.com.au/wp-admin/",
    "https://vd3d.com.au/?p=123",
  ])("sends old store path %s to the shop", (from) => {
    const result = redirectFor(new URL(from));
    if (SHOP_LIVE) {
      expect(result).toEqual({
        location: from.replace("https://vd3d.com.au", "https://shop.vd3d.com.au"),
        status: 301,
      });
    } else {
      // Temporary, so search engines keep the old URLs until the new shop exists.
      expect(result).toEqual({ location: "https://vd3d.com.au/shop", status: 302 });
    }
  });

  it("uses permanent redirects for pages that have moved for good", () => {
    expect(redirectFor(new URL("https://vd3d.com.au/faqs/"))?.status).toBe(301);
    expect(redirectFor(new URL("https://www.vd3d.com.au/"))?.status).toBe(301);
  });

  it("doesn't catch new paths that merely start like an old one", () => {
    expect(go("https://vd3d.com.au/cartoon")).toBeNull();
    expect(go("https://vd3d.com.au/feedback")).toBeNull();
  });

  it("sends www to the bare domain", () => {
    expect(go("https://www.vd3d.com.au/faq?x=1")).toBe("https://vd3d.com.au/faq?x=1");
  });

  it("leaves new pages alone, including the new /shop page", () => {
    for (const path of [
      "/",
      "/quote",
      "/faq",
      "/shop",
      "/shop/",
      "/services/3d-printing",
      "/api/quote",
    ])
      expect(go(`https://vd3d.com.au${path}`)).toBeNull();
  });

  it("marks pages.dev hosts as non-canonical", () => {
    expect(isNonCanonicalHost("vd3d-website.pages.dev")).toBe(true);
    expect(isNonCanonicalHost("vd3d.com.au")).toBe(false);
  });
});
