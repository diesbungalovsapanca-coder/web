import { defaultSettings } from "@/data/defaults";
import { sortByOrder } from "@/lib/utils";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MediaItem } from "@/types/media";
import type {
  DashboardStats,
  ExperienceCard,
  Faq,
  Feature,
  ReservationInfo,
  SiteSettings,
  Testimonial
} from "@/types/site";
import {
  mapExperience,
  mapFaq,
  mapFeature,
  mapMedia,
  mapReservationInfo,
  mapTestimonial
} from "./mappers";
import { readLocalStore } from "./local-store";

type SettingsRow = {
  key: string;
  value: unknown;
};

function deepMerge<T>(base: T, override: unknown): T {
  if (!override || typeof override !== "object" || Array.isArray(override)) return base;
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    const current = result[key];
    if (current && typeof current === "object" && !Array.isArray(current)) {
      result[key] = deepMerge(current, value);
    } else if (typeof value === "string" && value.trim() === "" && typeof current === "string" && current !== "") {
      // Boş kayıt, koddaki dolu varsayılanı ezmesin (ör. instagramUrl)
      continue;
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

async function fetchRows<T>(
  table: string,
  mapper: (row: Record<string, unknown>) => T,
  fallback: T[],
  activeOnly = true
): Promise<T[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return fallback;

  try {
    let query = supabase.from(table).select("*").order("sort_order", { ascending: true });
    if (activeOnly) query = query.eq("is_active", true);
    const { data, error } = await query;
    if (error || !data) {
      if (error) console.error(`[data] ${table}`, error.message);
      return fallback;
    }
    if (data.length === 0) return fallback;
    return data.map((row) => mapper(row as Record<string, unknown>));
  } catch (error) {
    console.error(`[data] ${table}`, error);
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    const local = await readLocalStore();
    return local.siteSettings;
  }

  try {
    const { data, error } = await supabase.from("site_settings").select("key,value");
    if (error || !data) {
      if (error) console.error("[data] site_settings", error.message);
      return defaultSettings;
    }
    if (data.length === 0) return defaultSettings;

    return (data as SettingsRow[]).reduce((settings, row) => {
      if (row.key in settings) {
        return {
          ...settings,
          [row.key]: deepMerge(settings[row.key as keyof SiteSettings], row.value)
        };
      }
      return settings;
    }, defaultSettings);
  } catch (error) {
    console.error("[data] site_settings", error);
    return defaultSettings;
  }
}

export async function getActiveMedia(activeOnly = true): Promise<MediaItem[]> {
  const local = await readLocalStore();
  return fetchRows("media_items", mapMedia, activeOnly ? local.mediaItems.filter((item) => item.isActive) : local.mediaItems, activeOnly);
}

export async function getHeroMedia(): Promise<MediaItem | null> {
  const media = await getActiveMedia();
  const hero = sortByOrder(media.filter((item) => item.isHero))[0];
  const featured = sortByOrder(media.filter((item) => item.isFeatured))[0];
  return hero ?? featured ?? media[0] ?? null;
}

export async function getFeaturedMedia(limit = 8): Promise<MediaItem[]> {
  const media = await getActiveMedia();
  const featured = media.filter((item) => item.isFeatured);
  return sortByOrder(featured.length > 0 ? featured : media).slice(0, limit);
}

export async function getFeatures(activeOnly = true): Promise<Feature[]> {
  const local = await readLocalStore();
  return fetchRows("features", mapFeature, activeOnly ? local.features.filter((item) => item.isActive) : local.features, activeOnly);
}

export async function getFaqs(activeOnly = true): Promise<Faq[]> {
  const local = await readLocalStore();
  return fetchRows("faqs", mapFaq, activeOnly ? local.faqs.filter((item) => item.isActive) : local.faqs, activeOnly);
}

export async function getTestimonials(activeOnly = true): Promise<Testimonial[]> {
  const local = await readLocalStore();
  return fetchRows(
    "testimonials",
    mapTestimonial,
    activeOnly ? local.testimonials.filter((item) => item.isActive) : local.testimonials,
    activeOnly
  );
}

export async function getExperienceCards(activeOnly = true): Promise<ExperienceCard[]> {
  const local = await readLocalStore();
  return fetchRows(
    "experience_cards",
    mapExperience,
    activeOnly ? local.experienceCards.filter((item) => item.isActive) : local.experienceCards,
    activeOnly
  );
}

export async function getReservationInfo(publicOnly = true): Promise<ReservationInfo[]> {
  const local = await readLocalStore();
  const fallback = publicOnly
    ? local.reservationInfo.filter((item) => item.isPublic)
    : local.reservationInfo;

  const supabase = createSupabaseServerClient();
  if (!supabase) return sortByOrder(fallback);

  try {
    let query = supabase.from("reservation_info").select("*").order("sort_order", { ascending: true });
    if (publicOnly) query = query.eq("is_public", true);
    const { data, error } = await query;
    if (error || !data) {
      if (error) console.error("[data] reservation_info", error.message);
      return sortByOrder(fallback);
    }
    if (data.length === 0) return sortByOrder(fallback);
    return data.map((row) => mapReservationInfo(row as Record<string, unknown>));
  } catch (error) {
    console.error("[data] reservation_info", error);
    return sortByOrder(fallback);
  }
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [settings, media, features, faqs, testimonials] = await Promise.all([
    getSiteSettings(),
    getActiveMedia(false),
    getFeatures(false),
    getFaqs(false),
    getTestimonials(false)
  ]);

  return {
    totalMedia: media.length,
    activeMedia: media.filter((item) => item.isActive).length,
    hasHeroMedia: media.some((item) => item.isHero && item.isActive),
    activeFaqs: faqs.filter((item) => item.isActive).length,
    activeFeatures: features.filter((item) => item.isActive).length,
    activeTestimonials: testimonials.filter((item) => item.isActive).length,
    hasWhatsapp: Boolean(settings.contact.whatsappPhone && !settings.contact.whatsappPhone.includes("X"))
  };
}
