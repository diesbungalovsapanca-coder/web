import Image from "next/image";
import type { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils";

// Hero fotoğrafı bilinçli olarak sabittir (bkz. c7ab5bf "Restore tracked hero photo").
// CMS'ten seçilen medya üretimde yanlış görsel getirdiği için media prop'u kullanılmıyor.
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
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
