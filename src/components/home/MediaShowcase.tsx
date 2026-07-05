import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { MediaItem } from "@/types/media";

export function MediaShowcase({ media }: { media: MediaItem[] }) {
  const [main, ...items] = media;

  return (
    <section className="bg-background py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Galeri"
            title="Instagram’dan gelen gerçek atmosfer, web’de düzenli ve güven veren bir vitrine dönüşür"
            body="Fotoğraf ve videolar yalnızca galeriye değil, karar anını etkileyen tüm bölümlere yayılır."
          />
          <Link
            href="/galeri"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-bold text-text transition hover:border-accent"
          >
            Tüm Galeriyi Gör
            <Icon name="Play" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="h-[32rem] overflow-hidden rounded-lg">
            <MediaVisual media={main ?? null} className="h-full" videoControls={false} sizes="(min-width: 1024px) 58vw, 100vw" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.slice(0, 6).map((item) => (
              <Link key={item.id} href="/galeri" className="group relative min-h-40 overflow-hidden rounded-lg bg-border">
                <MediaVisual media={item} className="absolute inset-0" sizes="(min-width: 1024px) 20vw, 50vw" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/64 to-transparent p-3">
                  <p className="line-clamp-1 text-xs font-bold text-white">{item.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
