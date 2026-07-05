import type { MediaCategory, MediaItem, MediaOrientation, MediaType } from "@/types/media";
import type { ExperienceCard, Faq, Feature, ReservationInfo, Testimonial } from "@/types/site";

type Row = Record<string, unknown>;

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function asNullableString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

export function mapMedia(row: Row): MediaItem {
  return {
    id: asString(row.id),
    type: asString(row.type, "image") as MediaType,
    storagePath: asNullableString(row.storage_path) ?? undefined,
    publicUrl: asString(row.public_url),
    thumbnailUrl: asNullableString(row.thumbnail_url),
    posterUrl: asNullableString(row.poster_url),
    category: asString(row.category, "uncategorized") as MediaCategory,
    title: asString(row.title, "DİES BUNGALOV medya"),
    alt: asNullableString(row.alt),
    description: asNullableString(row.description),
    orientation: asNullableString(row.orientation) as MediaOrientation | null,
    width: row.width === null ? null : asNumber(row.width, 0),
    height: row.height === null ? null : asNumber(row.height, 0),
    isFeatured: asBoolean(row.is_featured),
    isHero: asBoolean(row.is_hero),
    isActive: asBoolean(row.is_active, true),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function mediaToDb(item: Partial<MediaItem>) {
  return {
    type: item.type,
    storage_path: item.storagePath,
    public_url: item.publicUrl,
    thumbnail_url: item.thumbnailUrl,
    poster_url: item.posterUrl,
    category: item.category,
    title: item.title,
    alt: item.alt,
    description: item.description,
    orientation: item.orientation,
    width: item.width,
    height: item.height,
    is_featured: item.isFeatured,
    is_hero: item.isHero,
    is_active: item.isActive,
    sort_order: item.sortOrder
  };
}

export function mapFeature(row: Row): Feature {
  return {
    id: asString(row.id),
    title: asString(row.title),
    description: asString(row.description),
    icon: asString(row.icon, "Sparkles"),
    isActive: asBoolean(row.is_active, true),
    isFeatured: asBoolean(row.is_featured),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function featureToDb(item: Partial<Feature>) {
  return {
    title: item.title,
    description: item.description,
    icon: item.icon,
    is_active: item.isActive,
    is_featured: item.isFeatured,
    sort_order: item.sortOrder
  };
}

export function mapFaq(row: Row): Faq {
  return {
    id: asString(row.id),
    question: asString(row.question),
    answer: asString(row.answer),
    category: asString(row.category, "Genel"),
    isActive: asBoolean(row.is_active, true),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function faqToDb(item: Partial<Faq>) {
  return {
    question: item.question,
    answer: item.answer,
    category: item.category,
    is_active: item.isActive,
    sort_order: item.sortOrder
  };
}

export function mapTestimonial(row: Row): Testimonial {
  return {
    id: asString(row.id),
    name: asString(row.name),
    source: asString(row.source, "Manuel"),
    rating: row.rating === null ? null : asNumber(row.rating, 5),
    comment: asString(row.comment),
    isActive: asBoolean(row.is_active, true),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function testimonialToDb(item: Partial<Testimonial>) {
  return {
    name: item.name,
    source: item.source,
    rating: item.rating,
    comment: item.comment,
    is_active: item.isActive,
    sort_order: item.sortOrder
  };
}

export function mapExperience(row: Row): ExperienceCard {
  return {
    id: asString(row.id),
    title: asString(row.title),
    description: asString(row.description),
    ctaLabel: asString(row.cta_label, "Bilgi al"),
    ctaMessage: asString(row.cta_message),
    mediaId: asNullableString(row.media_id),
    isActive: asBoolean(row.is_active, true),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function experienceToDb(item: Partial<ExperienceCard>) {
  return {
    title: item.title,
    description: item.description,
    cta_label: item.ctaLabel,
    cta_message: item.ctaMessage,
    media_id: item.mediaId,
    is_active: item.isActive,
    sort_order: item.sortOrder
  };
}

export function mapReservationInfo(row: Row): ReservationInfo {
  return {
    id: asString(row.id),
    title: asString(row.title),
    value: asNullableString(row.value),
    description: asNullableString(row.description),
    isPublic: asBoolean(row.is_public, true),
    sortOrder: asNumber(row.sort_order),
    createdAt: asNullableString(row.created_at) ?? undefined,
    updatedAt: asNullableString(row.updated_at) ?? undefined
  };
}

export function reservationInfoToDb(item: Partial<ReservationInfo>) {
  return {
    title: item.title,
    value: item.value,
    description: item.description,
    is_public: item.isPublic,
    sort_order: item.sortOrder
  };
}
