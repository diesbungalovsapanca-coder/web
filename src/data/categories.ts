import type { MediaCategory } from "@/types/media";

export const mediaCategories: Array<{ value: MediaCategory; label: string }> = [
  { value: "hero", label: "Hero" },
  { value: "exterior", label: "Dış Alan" },
  { value: "interior", label: "İç Mekân" },
  { value: "pool-jacuzzi", label: "Havuz & Jakuzi" },
  { value: "night-atmosphere", label: "Gece Atmosferi" },
  { value: "winter", label: "Kış" },
  { value: "details", label: "Detaylar" },
  { value: "logo", label: "Logo" },
  { value: "uncategorized", label: "Kategorisiz" }
];

export const publicGalleryCategories: Array<{ value: "all" | MediaCategory; label: string }> = [
  { value: "all", label: "Tümü" },
  { value: "exterior", label: "Dış Alan" },
  { value: "interior", label: "İç Mekân" },
  { value: "pool-jacuzzi", label: "Havuz & Jakuzi" },
  // "Gece Atmosferi": arşivde gerçek gece içeriği yok; içerik eklenince geri alınabilir.
  { value: "winter", label: "Kış" },
  { value: "details", label: "Detaylar" }
];

export function getCategoryLabel(category: MediaCategory) {
  return mediaCategories.find((item) => item.value === category)?.label ?? "Kategorisiz";
}
