import Image from "next/image";
import { Icon } from "@/components/common/Icon";
import type { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils";

export function MediaVisual({
  media,
  priority = false,
  className,
  imageClassName,
  videoControls = false,
  autoPlay = false,
  sizes = "(min-width: 1024px) 50vw, 100vw"
}: {
  media: MediaItem | null;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  videoControls?: boolean;
  autoPlay?: boolean;
  sizes?: string;
}) {
  if (!media) {
    return <div className={cn("media-gradient h-full w-full", className)} />;
  }

  const src = media.thumbnailUrl || media.publicUrl;

  if (media.type === "video") {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-surface-dark", className)}>
        <video
          className={cn("h-full w-full object-cover", imageClassName)}
          src={media.publicUrl}
          poster={media.posterUrl || "/media/fallback/dies-hero-fallback.png"}
          muted={autoPlay}
          autoPlay={autoPlay}
          loop={autoPlay}
          playsInline
          preload={autoPlay ? "metadata" : "none"}
          controls={videoControls}
        />
        {!videoControls ? (
          <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md">
            <Icon name="Play" className="h-5 w-5 fill-current" />
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-border", className)}>
      <Image
        src={src}
        alt={media.alt || media.title}
        fill
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
