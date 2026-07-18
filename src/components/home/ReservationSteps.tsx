import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";

export function ReservationSteps({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-background py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Rezervasyon</p>
          <h2 className="font-serif text-4xl leading-tight text-text">Rezervasyon Nasıl Yapılır?</h2>
          <TrackedLink
            href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero)}
            event="whatsapp_click_hero"
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("whatsapp", "mt-7")}
          >
            <Icon name="MessageCircle" className="h-5 w-5" />
            WhatsApp’tan Müsaitlik Sor
          </TrackedLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {settings.reservation.steps.map((step, index) => (
            <article key={step} className="rounded-lg border border-border bg-surface p-5">
              <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {index + 1}
              </span>
              <p className="text-base font-semibold leading-7 text-text">{step}</p>
            </article>
          ))}
        </div>
        <div className="rounded-lg bg-surface-dark p-6 text-white sm:p-8 lg:col-span-2">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent">Güven</p>
              <h3 className="font-serif text-3xl leading-tight">{settings.content.trustReservationTitle}</h3>
              <p className="mt-4 text-sm leading-7 text-white/72">{settings.content.trustReservationBody}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {settings.reservation.secureBullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4">
                  <Icon name="CheckCircle2" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm font-semibold leading-6 text-white/82">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
