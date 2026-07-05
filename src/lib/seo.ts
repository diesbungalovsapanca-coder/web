import type { Metadata } from "next";
import type { Faq, SiteSettings } from "@/types/site";

export const SITE_URL = "https://diesbungalov.com";

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return new URL(path.startsWith("/") ? path : `/${path}`, SITE_URL).toString();
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

export function lodgingJsonLd(settings: SiteSettings, images?: string[]) {
  const { ratingValue, reviewCount, priceRange } = settings.seo;

  const imageUrls = (images && images.length > 0 ? images : [settings.seo.ogImage])
    .filter(Boolean)
    .map((src) => absoluteUrl(src));

  const aggregateRating =
    typeof ratingValue === "number" &&
    ratingValue > 0 &&
    typeof reviewCount === "number" &&
    reviewCount > 0
      ? {
          "@type": "AggregateRating",
          ratingValue,
          reviewCount,
          bestRating: 5,
          worstRating: 1
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: settings.brand.name,
    description: settings.brand.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Fevziye Sok. 66/1",
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
    url: SITE_URL,
    logo: absoluteUrl(settings.brand.logoUrl),
    image: imageUrls,
    priceRange: priceRange || undefined,
    currenciesAccepted: "TRY",
    sameAs: [settings.contact.instagramUrl].filter(Boolean),
    telephone: settings.contact.phone || settings.contact.whatsappPhone,
    aggregateRating,
    amenityFeature: settings.hero.badges.map((badge) => ({
      "@type": "LocationFeatureSpecification",
      name: badge,
      value: true
    }))
  };
}

function toPlainText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function faqJsonLd(faqs: Faq[]) {
  const activeFaqs = faqs.filter((faq) => faq.isActive !== false && faq.question && faq.answer);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: toPlainText(faq.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: toPlainText(faq.answer)
      }
    }))
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}
