// Search engine details shared by every page. Keep the business facts here in
// line with the Google Business Profile: same name, email, area and social
// profiles, no street address and no phone number.
import { etsyShopUrl } from "@/lib/proof";
import { contactEmail } from "@/lib/services";

export const SITE_URL = "https://vd3d.com.au";

/** <link rel="canonical"> for a page path such as "/quote". */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: `${SITE_URL}${path === "/" ? "/" : path}` };
}

export const socialProfiles = [
  "https://www.instagram.com/vandam3d/",
  "https://www.facebook.com/vandam3d/",
  "https://www.linkedin.com/company/vandam3d",
  "https://www.youtube.com/@vanDam3D-zg8ry",
  etsyShopUrl,
];

export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "VD3D",
  alternateName: "vanDam3D",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.svg`,
  email: contactEmail,
  description:
    "Design, prototyping and 3D printing studio in Bullsbrook, Perth. Design help, prototypes, short production runs and laser engraving.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bullsbrook",
    addressRegion: "WA",
    postalCode: "6084",
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "City", name: "Perth" },
    { "@type": "State", name: "Western Australia" },
    { "@type": "Country", name: "Australia" },
  ],
  knowsAbout: ["3D printing", "Prototyping", "Product design", "Laser engraving"],
  sameAs: socialProfiles,
};
