"use client";

import { useMemo, useState } from "react";
import { buttonClassName } from "@/components/common/AppButton";
import { CategoryTabs } from "@/components/gallery/CategoryTabs";
import { MediaCard } from "@/components/gallery/MediaCard";
import { MediaLightbox } from "@/components/gallery/MediaLightbox";
import { TrackedLink } from "@/components/common/TrackedLink";
import { Icon } from "@/components/common/Icon";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { whatsappMessages } from "@/data/whatsapp";
import type { MediaCategory, MediaItem } from "@/types/media";
import type { SiteSettings } from "@/types/site";

export function GalleryGrid({
  media,
  settings
}: {
  media: MediaItem[];
  settings: SiteSettings;
}) {
  const [category, setCategory] = useState<"all" | MediaCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const publicMedia = useMemo(() => media.filter((item) => item.category !== "logo"), [media]);

  const filtered = useMemo(() => {
    if (category === "all") return publicMedia;
    return publicMedia.filter((item) => item.category === category || (category === "details" && item.category === "hero"));
  }, [category, publicMedia]);

  const activeItem = activeIndex === null ? null : filtered[activeIndex] ?? null;

  const handleCategoryChange = (value: "all" | MediaCategory) => {
    setCategory(value);
    setActiveIndex(null);
    trackEvent("gallery_filter_change", { category: value });
  };

  const openItem = (item: MediaItem, index: number) => {
    setActiveIndex(index);
    trackEvent("gallery_open_item", { id: item.id, type: item.type, category: item.category });
  };

  const stepItem = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      if (current === null || filtered.length === 0) return current;
      return (current + direction + filtered.length) % filtered.length;
    });
  };

  return (
    <div>
      <CategoryTabs value={category} onChange={handleCategoryChange} />
      <div className="mt-8 grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <div key={item.id} className={item.type === "video" || index % 5 === 0 ? "sm:row-span-2" : ""}>
            <MediaCard item={item} onOpen={() => openItem(item, index)} />
          </div>
        ))}
        <div className="flex min-h-[18rem] flex-col justify-between rounded-lg bg-green-dark p-6 text-white sm:min-h-[22rem]">
          <div>
            <Icon name="MessageCircle" className="h-8 w-8 text-accent" />
            <h2 className="mt-5 font-serif text-3xl">Galeride gördüğünüz atmosfer için bilgi alın.</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Tarih ve kişi sayınızı iletin; müsaitlik ve fiyat bilgisi resmi WhatsApp hattımızdan net şekilde aktarılsın.
            </p>
          </div>
          <TrackedLink
            href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.gallery)}
            event="whatsapp_click_gallery"
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("primary", "mt-6")}
          >
            WhatsApp’tan bilgi al
          </TrackedLink>
        </div>
      </div>
      <MediaLightbox
        item={activeItem}
        onClose={() => setActiveIndex(null)}
        onPrev={filtered.length > 1 ? () => stepItem(-1) : undefined}
        onNext={filtered.length > 1 ? () => stepItem(1) : undefined}
        position={activeIndex === null ? undefined : { current: activeIndex + 1, total: filtered.length }}
      />
    </div>
  );
}
