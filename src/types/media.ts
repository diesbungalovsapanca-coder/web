export type MediaType = "image" | "video";

export type MediaCategory =
  | "hero"
  | "exterior"
  | "interior"
  | "pool-jacuzzi"
  | "night-atmosphere"
  | "winter"
  | "details"
  | "logo"
  | "uncategorized";

export type MediaOrientation = "landscape" | "portrait" | "square" | "unknown";

export interface MediaItem {
  id: string;
  type: MediaType;
  storagePath?: string;
  publicUrl: string;
  thumbnailUrl?: string | null;
  posterUrl?: string | null;
  category: MediaCategory;
  title: string;
  alt?: string | null;
  description?: string | null;
  orientation?: MediaOrientation | null;
  width?: number | null;
  height?: number | null;
  isFeatured: boolean;
  isHero: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MediaInput {
  type: MediaType;
  publicUrl: string;
  storagePath?: string;
  thumbnailUrl?: string | null;
  posterUrl?: string | null;
  category: MediaCategory;
  title: string;
  alt?: string | null;
  description?: string | null;
  orientation?: MediaOrientation | null;
  width?: number | null;
  height?: number | null;
  isFeatured?: boolean;
  isHero?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}
