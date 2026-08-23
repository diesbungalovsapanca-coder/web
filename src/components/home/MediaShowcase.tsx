import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { MediaItem } from "@/types/media";

export function MediaShowcase({ media }: { media: MediaItem[] }) {
  const [main, ...items] = media;

  return (
    <Section tone="light">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="Galeri" title="Tesisten gerçek fotoğraf ve videolar" />
        <Link
          href="/galeri"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-bold text-text transition hover:border-accent"
        >
          Tüm Galeriyi Gör
          <Icon name="ChevronRight" className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Link href="/galeri" className="relative block aspect-[4/3] overflow-hidden rounded-lg lg:aspect-auto lg:h-[32rem]">
          <MediaVisual media={main ?? null} className="h-full" sizes="(min-width: 1024px) 58vw, 100vw" />
        </Link>
        {/* Mobilde yatay şerit, lg üstünde 2x3 grid. Önceden breakpoint'siz
            grid-cols-2 yüzünden 390px ekranda thumb'lar 171px'e sıkışıyordu. */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {items.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href="/galeri"
              className="group relative aspect-square w-40 shrink-0 snap-center overflow-hidden rounded-lg bg-border lg:aspect-auto lg:min-h-40 lg:w-auto"
            >
              <MediaVisual media={item} className="absolute inset-0" sizes="(min-width: 1024px) 20vw, 160px" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/64 to-transparent p-3">
                <p className="line-clamp-1 text-xs font-bold text-white">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
