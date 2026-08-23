"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/common/Icon";

/**
 * Video dosyaları büyük olduğu için ilk render'da yalnızca poster gösterilir.
 * Kullanıcı dokunana kadar hiçbir video isteği (metadata dahil) yapılmaz.
 */
export function BungalowVideo({
  src,
  poster,
  label,
  sizes = "(min-width: 768px) 33vw, 85vw"
}: {
  src: string;
  poster: string;
  label: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        autoPlay
        controls
        playsInline
        preload="auto"
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
        aria-label={`${label} tanıtım videosu`}
      >
        <source src={src} type="video/mp4" />
        Tarayıcınız video oynatmayı desteklemiyor.
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`${label} tanıtım videosunu oynat`}
    >
      <Image src={poster} alt="" fill sizes={sizes} className="object-cover" />
      <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30">
        <Icon name="Play" className="ml-0.5 h-7 w-7 fill-current" />
      </span>
    </button>
  );
}
