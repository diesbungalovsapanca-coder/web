"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "@/types/media";
import { cn } from "@/lib/utils";

const HERO_FALLBACK = "/media/fallback/dies-hero-fallback.png";

export function HeroMedia({ media, className }: { media: MediaItem | null; className?: string }) {
  if (!media) {
    return <div className={cn("media-gradient h-full w-full", className)} />;
  }

  if (media.type === "video") {
    return <HeroVideo media={media} className={className} />;
  }

  const src = media.thumbnailUrl || media.publicUrl;
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-border", className)}>
      <Image src={src} alt={media.alt || media.title} fill priority sizes="100vw" className="object-cover" />
    </div>
  );
}

function HeroVideo({ media, className }: { media: MediaItem; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const poster = media.posterUrl || HERO_FALLBACK;

  // Videoyu LCP ile yarıştırmamak için sayfa tamamen yüklendikten sonra başlat.
  useEffect(() => {
    if (document.readyState === "complete") {
      setShowVideo(true);
      return;
    }
    const start = () => setShowVideo(true);
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    if (showVideo) {
      videoRef.current?.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-surface-dark", className)}>
      {/* Optimize poster = LCP elementi (AVIF/WebP + preload) */}
      <Image src={poster} alt={media.alt || media.title} fill priority sizes="100vw" className="object-cover" />
      {showVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={media.publicUrl}
          poster={poster}
          muted
          autoPlay
          loop
          playsInline
          preload="none"
        />
      ) : null}
    </div>
  );
}
