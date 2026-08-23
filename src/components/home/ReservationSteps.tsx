import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { SiteSettings } from "@/types/site";

export function ReservationSteps({ settings }: { settings: SiteSettings }) {
  return (
    <Section tone="light" containerClassName="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <SectionHeader eyebrow="Rezervasyon" title="Rezervasyon Nasıl Yapılır?" />

      {/* Mobilde numara ve metin yan yana; sm üstünde alt alta kart düzenine döner. */}
      <ol className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {settings.reservation.steps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 sm:block sm:p-5"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white sm:mb-5">
              {index + 1}
            </span>
            <p className="text-sm font-semibold leading-6 text-text sm:text-base sm:leading-7">{step}</p>
          </li>
        ))}
      </ol>

      <div className="rounded-lg bg-surface-dark p-5 text-white sm:p-8 lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent">Güven</p>
            <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{settings.content.trustReservationTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-white/72">{settings.content.trustReservationBody}</p>
          </div>
          {/* Kısa ifadeler; mobilde de 2 kolon sığıyor (tek kolonda ~480px sürüyordu). */}
          <ul className="grid grid-cols-2 gap-2 sm:gap-3">
            {settings.reservation.secureBullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.06] p-3 sm:gap-3 sm:p-4">
                <Icon name="CheckCircle2" className="mt-0.5 h-4 w-4 shrink-0 text-accent sm:h-5 sm:w-5" />
                <span className="text-xs font-semibold leading-5 text-white/82 sm:text-sm sm:leading-6">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
