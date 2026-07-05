import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { createPageMetadata } from "@/lib/seo";
import { getExperienceCards } from "@/lib/data/experiences";
import { getActiveMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";
import type { MediaCategory, MediaItem } from "@/types/media";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Deneyimler",
    description: "Çiftler, balayı, özel günler, hafta sonu kaçamağı ve kış tatili için DİES BUNGALOV Sapanca deneyimleri.",
    path: "/deneyimler"
  });
}

export default async function ExperiencesPage() {
  const [settings, experiences, media] = await Promise.all([getSiteSettings(), getExperienceCards(), getActiveMedia()]);

  // Her deneyim kartına kendi temasından (mediaCategory) bir görsel eşleştirilir;
  // aynı temadan fotoğraf yoksa videoya, o da yoksa genel arşive düşülür.
  const usedIds = new Set<string>();
  const mediaFor = (category: MediaCategory, fallbackIndex: number): MediaItem | null => {
    const pool = media.filter((item) => item.category === category && !usedIds.has(item.id));
    const images = pool.filter((item) => item.type === "image");
    const source = images.length > 0 ? images : pool;
    const picked = source.find((item) => item.isFeatured) ?? source[0] ?? media[fallbackIndex % media.length] ?? null;
    if (picked) usedIds.add(picked.id);
    return picked;
  };

  return (
    <section className="bg-background pb-20 pt-32">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Deneyimler</p>
          <h1 className="font-serif text-5xl leading-tight text-text">DİES BUNGALOV’u farklı kaçamak niyetleriyle keşfedin</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Romantik konaklama, özel gün, kısa hafta sonu molası veya kış kaçamağı. Her senaryo için WhatsApp’tan net bilgi alabilirsiniz.
          </p>
        </div>

        <div className="mt-12 grid gap-6">
          {experiences.map((experience, index) => (
            <article key={experience.id} className="grid overflow-hidden rounded-lg border border-border bg-surface lg:grid-cols-2">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="h-[28rem]">
                  <MediaVisual media={mediaFor(experience.mediaCategory ?? "details", index)} className="h-full" />
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <Icon name="Heart" className="h-7 w-7 text-accent-dark" />
                <h2 className="mt-5 font-serif text-4xl leading-tight text-text">{experience.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted">{experience.description}</p>
                <TrackedLink
                  href={createWhatsappUrl(settings.contact.whatsappPhone, experience.ctaMessage)}
                  event="whatsapp_click_special_day"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClassName("dark", "mt-7 w-fit")}
                >
                  {experience.ctaLabel}
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
