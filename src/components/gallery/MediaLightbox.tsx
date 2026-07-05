"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";
import type { MediaItem } from "@/types/media";

export function MediaLightbox({
  item,
  onClose,
  onPrev,
  onNext,
  position
}: {
  item: MediaItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  position?: { current: number; total: number };
}) {
  useEffect(() => {
    if (!item) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/86 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-lg bg-surface-dark" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/48 text-white backdrop-blur-md"
          aria-label="Galeriyi kapat"
        >
          <Icon name="X" className="h-5 w-5" />
        </button>
        {onPrev ? (
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/48 text-white backdrop-blur-md transition hover:bg-black/70"
            aria-label="Önceki medya"
          >
            <Icon name="ChevronLeft" className="h-5 w-5" />
          </button>
        ) : null}
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/48 text-white backdrop-blur-md transition hover:bg-black/70"
            aria-label="Sonraki medya"
          >
            <Icon name="ChevronRight" className="h-5 w-5" />
          </button>
        ) : null}
        <div className="relative min-h-[72vh] bg-black">
          {item.type === "video" ? (
            <video
              key={item.id}
              src={item.publicUrl}
              poster={item.posterUrl || undefined}
              controls
              playsInline
              className="h-[72vh] w-full object-contain"
              preload="metadata"
            />
          ) : (
            <Image
              src={item.publicUrl}
              alt={item.alt || item.title}
              fill
              sizes="100vw"
              className="object-contain"
            />
          )}
        </div>
        <div className="flex items-center justify-between gap-4 bg-surface px-5 py-4">
          <div>
            <h2 className="font-bold text-text">{item.title}</h2>
            {item.description ? <p className="mt-1 text-sm text-muted">{item.description}</p> : null}
          </div>
          {position ? (
            <p className="shrink-0 text-sm font-semibold text-muted">
              {position.current} / {position.total}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
