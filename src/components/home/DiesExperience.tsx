import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { signatureSteps } from "@/data/defaults";
import type { MediaItem } from "@/types/media";
import type { SiteSettings } from "@/types/site";

/**
 * Eski ExperienceIntro + SignatureExperience birleşimi. İkisi de aynı fikri
 * ("sadece bir gece kalmak değil") iki bölüm arayla tekrar ediyordu.
 */
export function DiesExperience({ settings, media }: { settings: SiteSettings; media: MediaItem | null }) {
  return (
    <Section tone="dark">
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-[16/10] lg:aspect-auto lg:h-[26rem]">
          <MediaVisual media={media} className="h-full" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div>
          <SectionHeader
            eyebrow="DİES deneyimi"
            title={settings.content.experienceTitle}
            body={settings.content.experienceBody}
            className="text-white [&_h2]:text-white [&_p]:text-white/75"
          />
        </div>
      </div>

      {/* Mobilde de 2 kolon: metinler kısa, tek kolonda 6 kart ~660px sürüyordu. */}
      <ol className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 lg:grid-cols-3">
        {signatureSteps.map((step, index) => (
          <li key={step.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-4">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-sm font-bold text-white sm:text-base">{step.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-white/70">{step.body}</p>
          </li>
        ))}
      </ol>

      <Link
        href="/deneyimler"
        className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent transition hover:text-white"
      >
        Kaçamak niyetinize göre deneyimler
        <Icon name="ChevronRight" className="h-4 w-4" />
      </Link>
    </Section>
  );
}
