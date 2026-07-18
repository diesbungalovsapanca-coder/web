import Image from "next/image";
import type { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils";

const FALLBACK_HERO_IMAGE = "/media/fallback/dies-hero-fallback.png";
const HERO_ALT = "Sapanca'da A-frame bungalovlar, özel havuz, ahşap teras ve doğa manzarası";

export function HeroMedia({ media, className }: { media: MediaItem | null; className?: string }) {
  const imageSource =
    media?.type === "video"
      ? media.posterUrl || media.thumbnailUrl || FALLBACK_HERO_IMAGE
      : media?.publicUrl || FALLBACK_HERO_IMAGE;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface-dark", className)}>
      <Image
        src={imageSource}
        alt={HERO_ALT}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
