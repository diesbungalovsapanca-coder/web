import Image from "next/image";
import type { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils";

const HERO_IMAGE = "/insta/posts/17891915832192943.jpg";
const HERO_ALT = "Sapanca'da A-frame bungalovlar, özel havuz, ahşap teras ve doğa manzarası";

export function HeroMedia({ className }: { media: MediaItem | null; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface-dark", className)}>
      <Image
        src={HERO_IMAGE}
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
