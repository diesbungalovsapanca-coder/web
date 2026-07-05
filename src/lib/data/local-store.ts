import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  defaultExperienceCards,
  defaultFaqs,
  defaultFeatures,
  defaultMedia,
  defaultReservationInfo,
  defaultSettings,
  defaultTestimonials
} from "@/data/defaults";
import type { MediaItem } from "@/types/media";
import type {
  ExperienceCard,
  Faq,
  Feature,
  ReservationInfo,
  SiteSettings,
  Testimonial
} from "@/types/site";

export interface LocalStore {
  siteSettings: SiteSettings;
  mediaItems: MediaItem[];
  features: Feature[];
  faqs: Faq[];
  testimonials: Testimonial[];
  experienceCards: ExperienceCard[];
  reservationInfo: ReservationInfo[];
}

const localDir = path.join(process.cwd(), ".local-data");
const localPath = path.join(localDir, "dies-content.json");

export const defaultLocalStore: LocalStore = {
  siteSettings: defaultSettings,
  mediaItems: defaultMedia,
  features: defaultFeatures,
  faqs: defaultFaqs,
  testimonials: defaultTestimonials,
  experienceCards: defaultExperienceCards,
  reservationInfo: defaultReservationInfo
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

export async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localPath, "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return {
      ...defaultLocalStore,
      ...parsed,
      siteSettings: deepMerge(defaultSettings, parsed.siteSettings)
    };
  } catch {
    return defaultLocalStore;
  }
}

export async function writeLocalStore(store: LocalStore) {
  await mkdir(localDir, { recursive: true });
  await writeFile(localPath, JSON.stringify(store, null, 2));
}

export async function updateLocalStore(updater: (store: LocalStore) => LocalStore | Promise<LocalStore>) {
  const store = await readLocalStore();
  const updated = await updater(store);
  await writeLocalStore(updated);
  return updated;
}
