import { Icon } from "@/components/common/Icon";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TrackedLink } from "@/components/common/TrackedLink";
import { createWhatsappUrl } from "@/lib/whatsapp";
import type { ExperienceCard, SiteSettings } from "@/types/site";

export function AudienceSections({
  experiences,
  settings
}: {
  experiences: ExperienceCard[];
  settings: SiteSettings;
}) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <SectionHeader
          eyebrow="Kimin için"
          title="Farklı kaçamak niyetleri için aynı sakin ve özel atmosfer"
          body="Çiftler, özel günler, hafta sonu kaçamakları ve kış tatili için metinler admin panelden yönetilebilir."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {experiences.map((card) => (
            <article key={card.id} className="flex min-h-72 flex-col justify-between rounded-lg border border-border bg-background p-5">
              <div>
                <Icon name="Heart" className="h-6 w-6 text-accent-dark" />
                <h3 className="mt-5 text-xl font-bold text-text">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.description}</p>
              </div>
              <TrackedLink
                href={createWhatsappUrl(settings.contact.whatsappPhone, card.ctaMessage)}
                event="whatsapp_click_special_day"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent-dark"
              >
                {card.ctaLabel}
                <Icon name="MessageCircle" className="h-4 w-4" />
              </TrackedLink>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
