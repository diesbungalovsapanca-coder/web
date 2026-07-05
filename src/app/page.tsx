import type { Metadata } from "next";
import { AudienceSections } from "@/components/home/AudienceSections";
import { ExperienceIntro } from "@/components/home/ExperienceIntro";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FeatureCards } from "@/components/home/FeatureCards";
import { FinalCta } from "@/components/home/FinalCta";
import { HeroSection } from "@/components/home/HeroSection";
import { LocationPreview } from "@/components/home/LocationPreview";
import { MediaShowcase } from "@/components/home/MediaShowcase";
import { ReservationSteps } from "@/components/home/ReservationSteps";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { SignatureExperience } from "@/components/home/SignatureExperience";
import { SocialProof } from "@/components/home/SocialProof";
import { TrustBar } from "@/components/home/TrustBar";
import { createPageMetadata } from "@/lib/seo";
import { getExperienceCards } from "@/lib/data/experiences";
import { getFaqs } from "@/lib/data/faqs";
import { getFeatures } from "@/lib/data/features";
import { getFeaturedMedia, getHeroMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";
import { getTestimonials } from "@/lib/data/testimonials";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings);
}

export default async function HomePage() {
  const [settings, heroMedia, featuredMedia, features, faqs, testimonials, experiences] = await Promise.all([
    getSiteSettings(),
    getHeroMedia(),
    getFeaturedMedia(9),
    getFeatures(),
    getFaqs(),
    getTestimonials(),
    getExperienceCards()
  ]);

  return (
    <>
      <HeroSection settings={settings} media={heroMedia} />
      <TrustBar />
      <ExperienceIntro settings={settings} media={featuredMedia[1] ?? heroMedia} />
      <FeatureCards features={features} />
      <MediaShowcase media={featuredMedia} />
      <SignatureExperience />
      <AudienceSections settings={settings} experiences={experiences} />
      <ReservationSteps settings={settings} />
      <ReviewsSection testimonials={testimonials} />
      <LocationPreview settings={settings} />
      <FaqPreview faqs={faqs} />
      <SocialProof settings={settings} />
      <FinalCta settings={settings} />
    </>
  );
}
