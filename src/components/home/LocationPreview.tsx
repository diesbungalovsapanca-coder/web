import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { MapEmbed } from "@/components/home/MapEmbed";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { SiteSettings } from "@/types/site";

export function LocationPreview({ settings }: { settings: SiteSettings }) {
  return (
    <Section tone="light" containerClassName="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div>
        <SectionHeader eyebrow="Konum" title="Sapanca’da doğayla iç içe sakin bir konum" body={settings.content.locationBody} />
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
        <Link href="/konum" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent-dark">
          Konum detaylarını incele
          <Icon name="ChevronRight" className="h-4 w-4" />
        </Link>
      </div>
      <MapEmbed />
    </Section>
  );
}
