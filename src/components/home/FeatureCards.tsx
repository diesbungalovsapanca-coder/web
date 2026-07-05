import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Feature } from "@/types/site";

export function FeatureCards({ features }: { features: Feature[] }) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <SectionHeader
          eyebrow="Öne çıkanlar"
          title="Konforu ve atmosferi birlikte taşıyan detaylar"
          body="Özellikler ikon listesi gibi değil, konaklama deneyiminin parçası olarak tasarlandı."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.id} className="rounded-lg border border-border bg-background p-5">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-green-dark text-accent">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-text">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
