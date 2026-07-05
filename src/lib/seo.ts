import type { Metadata } from "next";
import type { SiteSettings } from "@/types/site";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata(
  settings: SiteSettings,
  page?: {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
  }
): Metadata {
  const title = page?.title ? `${page.title} | ${settings.brand.name}` : settings.seo.title;
  const description = page?.description ?? settings.seo.description;
  const url = absoluteUrl(page?.path ?? "/");
  const image = absoluteUrl(page?.image ?? settings.seo.ogImage);

  return {
    title,
    description,
    keywords: settings.seo.keywords,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: settings.brand.name,
      images: [{ url: image }],
      locale: "tr_TR",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export function lodgingJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: settings.brand.name,
    description: settings.brand.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sapanca",
      addressRegion: "Sakarya",
      addressCountry: "TR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.6620377,
      longitude: 30.2999791
    },
    hasMap: settings.contact.mapsUrl || undefined,
    areaServed: "Sapanca, Sakarya",
    url: siteUrl,
    logo: absoluteUrl(settings.brand.logoUrl),
    image: absoluteUrl(settings.seo.ogImage),
    sameAs: [settings.contact.instagramUrl].filter(Boolean),
    telephone: settings.contact.phone || settings.contact.whatsappPhone,
    amenityFeature: settings.hero.badges.map((badge) => ({
      "@type": "LocationFeatureSpecification",
      name: badge
    }))
  };
}
