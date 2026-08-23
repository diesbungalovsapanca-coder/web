import type { Metadata } from "next";
import { BungalowTypes } from "@/components/bungalow/BungalowTypes";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DiesExperience } from "@/components/home/DiesExperience";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroSection } from "@/components/home/HeroSection";
import { LocationPreview } from "@/components/home/LocationPreview";
import { MediaShowcase } from "@/components/home/MediaShowcase";
import { ReservationSteps } from "@/components/home/ReservationSteps";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd, mediaJsonLd } from "@/lib/seo";
import { getFaqs } from "@/lib/data/faqs";
import { getFeatures } from "@/lib/data/features";
import { getFeaturedMedia, getHeroMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";
import { getTestimonials } from "@/lib/data/testimonials";

const HOME_FAQ_COUNT = 5;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings);
}

export default async function HomePage() {
  const [settings, heroMedia, featuredMedia, features, faqs, testimonials] = await Promise.all([
    getSiteSettings(),
    getHeroMedia(),
    getFeaturedMedia(9),
    getFeatures(),
    getFaqs(),
    getTestimonials()
  ]);
  const homeMedia = [heroMedia, ...featuredMedia]
    .filter((item): item is NonNullable<typeof heroMedia> => Boolean(item))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index);
  // FAQPage şeması yalnızca sayfada görünen soruları kapsamalı; tamamı /sss'te.
  const visibleFaqs = faqs.slice(0, HOME_FAQ_COUNT);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Ana Sayfa", path: "/" }])} />
      <JsonLd data={faqJsonLd(visibleFaqs)} />
      <JsonLd data={mediaJsonLd(homeMedia)} />

      <HeroSection settings={settings} media={heroMedia} />

      <Section id="bungalov-tipleri" tone="light" labelledBy="bungalov-tipleri-baslik">
        <SectionHeader
          eyebrow="Konaklama"
          title="Bungalov Tipleri"
          titleId="bungalov-tipleri-baslik"
          body="Suit, Deluxe ve Woodlux. Videoyu izleyin, müsaitliği doğrudan WhatsApp'tan sorun."
        />
        <div className="mt-8 sm:mt-10">
          <BungalowTypes whatsappPhone={settings.contact.whatsappPhone} />
        </div>
      </Section>

      <FeatureCards features={features} />
      <MediaShowcase media={featuredMedia} />
      <DiesExperience settings={settings} media={featuredMedia[1] ?? heroMedia} />
      <ReservationSteps settings={settings} />
      <ReviewsSection testimonials={testimonials} />
      <LocationPreview settings={settings} />
      <FaqPreview faqs={visibleFaqs} />
      <FinalCta settings={settings} />
    </>
  );
}
