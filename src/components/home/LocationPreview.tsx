import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import type { SiteSettings } from "@/types/site";

export function LocationPreview({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-background py-20">
      <Container className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Konum</p>
          <h2 className="font-serif text-4xl leading-tight text-text">Sapanca’da doğayla iç içe sakin bir konum</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted">{settings.content.locationBody}</p>
          <div className="mt-6 flex items-start gap-4 rounded-lg border border-border bg-surface p-5">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-dark text-accent">
              <Icon name="MapPin" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-text">{settings.brand.location}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{settings.location.parking}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {settings.location.nearby.map((item) => (
              <span key={item} className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted">
                {item}
              </span>
            ))}
          </div>
          <Link href="/konum" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-accent-dark">
            Konum detaylarını incele
            <Icon name="MapPin" className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            title="DİES Bungalov Sapanca — Google Haritalar konumu"
            src="https://maps.google.com/maps?q=Dies%20Bungalov%20Sapanca&ll=40.6620377,30.2999791&z=15&hl=tr&output=embed"
            className="h-72 w-full border-0 lg:h-full lg:min-h-[24rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Container>
    </section>
  );
}
