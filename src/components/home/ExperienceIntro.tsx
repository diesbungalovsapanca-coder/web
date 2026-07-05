import { Container } from "@/components/common/Container";
import { MediaVisual } from "@/components/common/MediaVisual";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { MediaItem } from "@/types/media";
import type { SiteSettings } from "@/types/site";

export function ExperienceIntro({ settings, media }: { settings: SiteSettings; media: MediaItem | null }) {
  return (
    <section className="bg-background py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative h-[30rem] overflow-hidden rounded-lg">
          <MediaVisual media={media} className="h-full" sizes="(min-width: 1024px) 45vw, 100vw" />
        </div>
        <div>
          <SectionHeader eyebrow="DİES deneyimi" title={settings.content.experienceTitle} body={settings.content.experienceBody} />
          <div className="mt-8 grid gap-4 border-l border-accent/40 pl-5 text-sm leading-7 text-muted">
            <p>Doğrulanmamış iddialar yerine net bilgi, yazılı süreç ve gerçek medya ile güven veren bir rezervasyon akışı sunulur.</p>
            <p>Havuz, jakuzi, ateş çukuru ve dönemsel detaylar rezervasyon öncesinde resmi iletişim hattından netleşir.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
