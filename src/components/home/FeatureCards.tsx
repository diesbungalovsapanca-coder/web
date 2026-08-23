import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Feature } from "@/types/site";

export function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <Section tone="surface">
      <SectionHeader eyebrow="Öne çıkanlar" title="Konforu ve atmosferi birlikte taşıyan detaylar" />
      {/* Mobilde 2 kolon kompakt ikon+başlık; açıklamalar sm üstünde açılır.
          Önceden 8 kart tam açıklamayla alt alta ~1400px yer kaplıyordu. */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.id} className="rounded-lg border border-border bg-background p-4 sm:p-5">
            <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-green-dark text-accent sm:mb-5 sm:h-11 sm:w-11">
              <Icon name={feature.icon} className="h-5 w-5" />
            </span>
            <h3 className="text-sm font-bold text-text sm:text-lg">{feature.title}</h3>
            <p className="mt-2 hidden text-sm leading-7 text-muted sm:block">{feature.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
