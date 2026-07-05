"use client";

import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { getCategoryLabel } from "@/data/categories";
import type { MediaItem } from "@/types/media";

export function MediaCard({
  item,
  onOpen
}: {
  item: MediaItem;
  onOpen: (item: MediaItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="group relative block h-full w-full min-h-[18rem] overflow-hidden rounded-lg bg-border text-left outline-none ring-accent transition focus-visible:ring-4 sm:min-h-[22rem]"
      aria-label={`${item.title} medyasını aç`}
    >
      <MediaVisual media={item} className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 25vw, 50vw" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/76 to-transparent p-4 text-white">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-full bg-white/14 px-3 py-1 text-[0.7rem] font-bold backdrop-blur-md">
            {getCategoryLabel(item.category)}
          </span>
          {item.type === "video" ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[0.7rem] font-bold">
              <Icon name="Play" className="h-3 w-3 fill-current" />
              Video
            </span>
          ) : null}
        </div>
        <p className="line-clamp-2 text-sm font-bold">{item.title}</p>
      </div>
    </button>
  );
}
