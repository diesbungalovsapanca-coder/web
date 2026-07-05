"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mediaCategories } from "@/data/categories";
import { requireAdmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { parseBoolean, parseNumber, slugify, toArray } from "@/lib/utils";
import {
  faqToDb,
  featureToDb,
  mediaToDb,
  testimonialToDb
} from "@/lib/data/mappers";
import { readLocalStore, updateLocalStore } from "@/lib/data/local-store";
import { getSiteSettings } from "@/lib/data/queries";
import {
  faqSchema,
  featureSchema,
  mediaSchema,
  settingsSchema,
  testimonialSchema
} from "@/lib/validations";
import type { MediaCategory, MediaInput, MediaItem, MediaType } from "@/types/media";
import type { Faq, Feature, Testimonial } from "@/types/site";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedVideoTypes = ["video/mp4", "video/quicktime"];
const maxImageSize = 10 * 1024 * 1024;
const maxVideoSize = 100 * 1024 * 1024;

function redirectWith(pathname: string, state: "ok" | "error", message: string) {
  redirect(`${pathname}?${state}=${encodeURIComponent(message)}`);
}

function normalizeOptional(value: FormDataEntryValue | null) {
  const stringValue = String(value ?? "").trim();
  return stringValue.length > 0 ? stringValue : null;
}

function getCategory(value: FormDataEntryValue | null): MediaCategory {
  const candidate = String(value ?? "uncategorized") as MediaCategory;
  return mediaCategories.some((category) => category.value === candidate) ? candidate : "uncategorized";
}

function getMediaInput(formData: FormData, publicUrl: string): MediaInput {
  return mediaSchema.parse({
    type: String(formData.get("type") ?? "image") as MediaType,
    publicUrl,
    storagePath: normalizeOptional(formData.get("storagePath")) ?? publicUrl,
    thumbnailUrl: normalizeOptional(formData.get("thumbnailUrl")),
    posterUrl: normalizeOptional(formData.get("posterUrl")),
    category: getCategory(formData.get("category")),
    title: String(formData.get("title") ?? ""),
    alt: normalizeOptional(formData.get("alt")),
    description: normalizeOptional(formData.get("description")),
    isFeatured: parseBoolean(formData.get("isFeatured")),
    isHero: parseBoolean(formData.get("isHero")),
    isActive: parseBoolean(formData.get("isActive")),
    sortOrder: parseNumber(formData.get("sortOrder"))
  });
}

async function uploadFile(file: File, category: MediaCategory) {
  const isImage = allowedImageTypes.includes(file.type);
  const isVideo = allowedVideoTypes.includes(file.type);
  if (!isImage && !isVideo) {
    throw new Error("Desteklenmeyen dosya tipi.");
  }
  if (isImage && file.size > maxImageSize) {
    throw new Error("Görsel dosyası 10MB sınırını aşamaz.");
  }
  if (isVideo && file.size > maxVideoSize) {
    throw new Error("Video dosyası 100MB sınırını aşamaz.");
  }

  const extension = path.extname(file.name) || (isImage ? ".jpg" : ".mp4");
  const filename = `${Date.now()}-${slugify(path.basename(file.name, extension)) || "media"}${extension.toLowerCase()}`;
  const storagePath = `${category}/${filename}`;
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from("dies-media").upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false
    });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("dies-media").getPublicUrl(storagePath);
    return {
      type: isImage ? "image" : "video",
      publicUrl: data.publicUrl,
      storagePath
    };
  }

  const localDir = path.join(process.cwd(), "public", "media", "raw");
  await mkdir(localDir, { recursive: true });
  const localPath = path.join(localDir, filename);
  await writeFile(localPath, Buffer.from(await file.arrayBuffer()));
  return {
    type: isImage ? "image" : "video",
    publicUrl: `/media/raw/${filename}`,
    storagePath: `public/media/raw/${filename}`
  };
}

async function upsertMedia(id: string | null, input: MediaInput) {
  const supabase = createSupabaseAdminClient();
  const item: MediaItem = {
    id: id || randomUUID(),
    ...input,
    thumbnailUrl: input.thumbnailUrl ?? null,
    posterUrl: input.posterUrl ?? null,
    alt: input.alt ?? null,
    description: input.description ?? null,
    orientation: input.orientation ?? "unknown",
    width: input.width ?? null,
    height: input.height ?? null,
    isFeatured: input.isFeatured ?? false,
    isHero: input.isHero ?? false,
    isActive: input.isActive ?? true,
    sortOrder: input.sortOrder ?? 0,
    updatedAt: new Date().toISOString()
  };

  if (supabase) {
    if (id) {
      const { error } = await supabase.from("media_items").update(mediaToDb(item)).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("media_items").insert(mediaToDb(item));
      if (error) throw new Error(error.message);
    }
    return;
  }

  await updateLocalStore((store) => {
    const existing = store.mediaItems.filter((media) => media.id !== item.id);
    return {
      ...store,
      mediaItems: [...existing, item]
    };
  });
}

export async function createMediaAction(formData: FormData) {
  await requireAdmin();
  try {
    const file = formData.get("file");
    const publicUrlField = normalizeOptional(formData.get("publicUrl"));
    let uploadResult: { type: string; publicUrl: string; storagePath: string } | null = null;

    if (file instanceof File && file.size > 0) {
      uploadResult = await uploadFile(file, getCategory(formData.get("category")));
      formData.set("type", uploadResult.type);
    }

    const publicUrl = uploadResult?.publicUrl ?? publicUrlField;
    if (!publicUrl) throw new Error("Dosya yükleyin veya medya URL girin.");

    const input = getMediaInput(formData, publicUrl);
    input.storagePath = uploadResult?.storagePath ?? input.storagePath;
    await upsertMedia(null, input);
    revalidatePath("/");
    revalidatePath("/galeri");
    redirectWith("/admin/media", "ok", "Medya kaydedildi.");
  } catch (error) {
    redirectWith("/admin/media/new", "error", error instanceof Error ? error.message : "Medya kaydedilemedi.");
  }
}

export async function updateMediaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  try {
    const publicUrl = String(formData.get("publicUrl") ?? "");
    const input = getMediaInput(formData, publicUrl);
    await upsertMedia(id, input);
    revalidatePath("/");
    revalidatePath("/galeri");
    redirectWith("/admin/media", "ok", "Medya güncellendi.");
  } catch (error) {
    redirectWith(`/admin/media/${id}`, "error", error instanceof Error ? error.message : "Medya güncellenemedi.");
  }
}

export async function archiveMediaAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { error } = await supabase.from("media_items").update({ is_active: false }).eq("id", id);
    if (error) redirectWith("/admin/media", "error", error.message);
  } else {
    await updateLocalStore((store) => ({
      ...store,
      mediaItems: store.mediaItems.map((item) => (item.id === id ? { ...item, isActive: false } : item))
    }));
  }

  revalidatePath("/");
  revalidatePath("/galeri");
  redirectWith("/admin/media", "ok", "Medya pasife alındı.");
}

async function upsertFeature(id: string | null, input: Omit<Feature, "id">) {
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    const payload = featureToDb(input);
    const { error } = id
      ? await supabase.from("features").update(payload).eq("id", id)
      : await supabase.from("features").insert(payload);
    if (error) throw new Error(error.message);
    return;
  }

  const item: Feature = { id: id || randomUUID(), ...input };
  await updateLocalStore((store) => ({
    ...store,
    features: [...store.features.filter((feature) => feature.id !== item.id), item]
  }));
}

export async function saveFeatureAction(formData: FormData) {
  await requireAdmin();
  try {
    const id = normalizeOptional(formData.get("id"));
    const input = featureSchema.parse({
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      icon: String(formData.get("icon") ?? "Sparkles"),
      isActive: parseBoolean(formData.get("isActive")),
      isFeatured: parseBoolean(formData.get("isFeatured")),
      sortOrder: parseNumber(formData.get("sortOrder"))
    });
    await upsertFeature(id, input);
    revalidatePath("/");
    redirectWith("/admin/features", "ok", "Özellik kaydedildi.");
  } catch (error) {
    redirectWith("/admin/features", "error", error instanceof Error ? error.message : "Özellik kaydedilemedi.");
  }
}

export async function archiveFeatureAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    await supabase.from("features").update({ is_active: false }).eq("id", id);
  } else {
    await updateLocalStore((store) => ({
      ...store,
      features: store.features.map((item) => (item.id === id ? { ...item, isActive: false } : item))
    }));
  }
  revalidatePath("/");
  redirectWith("/admin/features", "ok", "Özellik pasife alındı.");
}

async function upsertFaq(id: string | null, input: Omit<Faq, "id">) {
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    const payload = faqToDb(input);
    const { error } = id
      ? await supabase.from("faqs").update(payload).eq("id", id)
      : await supabase.from("faqs").insert(payload);
    if (error) throw new Error(error.message);
    return;
  }

  const item: Faq = { id: id || randomUUID(), ...input };
  await updateLocalStore((store) => ({
    ...store,
    faqs: [...store.faqs.filter((faq) => faq.id !== item.id), item]
  }));
}

export async function saveFaqAction(formData: FormData) {
  await requireAdmin();
  try {
    const id = normalizeOptional(formData.get("id"));
    const input = faqSchema.parse({
      question: String(formData.get("question") ?? ""),
      answer: String(formData.get("answer") ?? ""),
      category: String(formData.get("category") ?? "Genel"),
      isActive: parseBoolean(formData.get("isActive")),
      sortOrder: parseNumber(formData.get("sortOrder"))
    });
    await upsertFaq(id, input);
    revalidatePath("/sss");
    redirectWith("/admin/faqs", "ok", "SSS kaydedildi.");
  } catch (error) {
    redirectWith("/admin/faqs", "error", error instanceof Error ? error.message : "SSS kaydedilemedi.");
  }
}

export async function archiveFaqAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    await supabase.from("faqs").update({ is_active: false }).eq("id", id);
  } else {
    await updateLocalStore((store) => ({
      ...store,
      faqs: store.faqs.map((item) => (item.id === id ? { ...item, isActive: false } : item))
    }));
  }
  revalidatePath("/sss");
  redirectWith("/admin/faqs", "ok", "SSS pasife alındı.");
}

async function upsertTestimonial(id: string | null, input: Omit<Testimonial, "id">) {
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    const payload = testimonialToDb(input);
    const { error } = id
      ? await supabase.from("testimonials").update(payload).eq("id", id)
      : await supabase.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
    return;
  }

  const item: Testimonial = { id: id || randomUUID(), ...input };
  await updateLocalStore((store) => ({
    ...store,
    testimonials: [...store.testimonials.filter((testimonial) => testimonial.id !== item.id), item]
  }));
}

export async function saveTestimonialAction(formData: FormData) {
  await requireAdmin();
  try {
    const id = normalizeOptional(formData.get("id"));
    const input = testimonialSchema.parse({
      name: String(formData.get("name") ?? ""),
      source: String(formData.get("source") ?? "Manuel"),
      rating: parseNumber(formData.get("rating"), 5),
      comment: String(formData.get("comment") ?? ""),
      isActive: parseBoolean(formData.get("isActive")),
      sortOrder: parseNumber(formData.get("sortOrder"))
    });
    await upsertTestimonial(id, input);
    revalidatePath("/");
    redirectWith("/admin/testimonials", "ok", "Yorum kaydedildi.");
  } catch (error) {
    redirectWith("/admin/testimonials", "error", error instanceof Error ? error.message : "Yorum kaydedilemedi.");
  }
}

export async function archiveTestimonialAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const supabase = createSupabaseAdminClient();
  if (supabase) {
    await supabase.from("testimonials").update({ is_active: false }).eq("id", id);
  } else {
    await updateLocalStore((store) => ({
      ...store,
      testimonials: store.testimonials.map((item) => (item.id === id ? { ...item, isActive: false } : item))
    }));
  }
  revalidatePath("/");
  redirectWith("/admin/testimonials", "ok", "Yorum pasife alındı.");
}

export async function saveSettingsAction(formData: FormData) {
  await requireAdmin();
  try {
    const settings = await getSiteSettings();
    const input = settingsSchema.parse({
      whatsappPhone: String(formData.get("whatsappPhone") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      instagramUrl: String(formData.get("instagramUrl") ?? ""),
      mapsUrl: String(formData.get("mapsUrl") ?? ""),
      seoTitle: String(formData.get("seoTitle") ?? ""),
      seoDescription: String(formData.get("seoDescription") ?? ""),
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
      locationBody: String(formData.get("locationBody") ?? "")
    });

    const updated = {
      ...settings,
      contact: {
        ...settings.contact,
        phone: input.phone ?? "",
        whatsappPhone: input.whatsappPhone,
        email: input.email ?? "",
        instagramUrl: input.instagramUrl,
        mapsUrl: input.mapsUrl ?? ""
      },
      seo: {
        ...settings.seo,
        title: input.seoTitle,
        description: input.seoDescription
      },
      hero: {
        ...settings.hero,
        title: input.heroTitle,
        subtitle: input.heroSubtitle
      },
      content: {
        ...settings.content,
        locationBody: input.locationBody
      },
      location: {
        ...settings.location,
        body: input.locationBody
      }
    };

    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const rows = [
        { key: "contact", value: updated.contact },
        { key: "seo", value: updated.seo },
        { key: "hero", value: updated.hero },
        { key: "content", value: updated.content },
        { key: "location", value: updated.location }
      ];
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw new Error(error.message);
    } else {
      await updateLocalStore((store) => ({
        ...store,
        siteSettings: updated
      }));
    }

    revalidatePath("/");
    redirectWith("/admin/settings", "ok", "Ayarlar kaydedildi.");
  } catch (error) {
    redirectWith("/admin/settings", "error", error instanceof Error ? error.message : "Ayarlar kaydedilemedi.");
  }
}

export async function savePagesAction(formData: FormData) {
  await requireAdmin();
  try {
    const settings = await getSiteSettings();
    const updated = {
      ...settings,
      hero: {
        ...settings.hero,
        title: String(formData.get("heroTitle") ?? settings.hero.title),
        subtitle: String(formData.get("heroSubtitle") ?? settings.hero.subtitle),
        primaryCta: String(formData.get("heroPrimaryCta") ?? settings.hero.primaryCta),
        secondaryCta: String(formData.get("heroSecondaryCta") ?? settings.hero.secondaryCta),
        badges: toArray(formData.get("heroBadges"))
      },
      content: {
        ...settings.content,
        experienceTitle: String(formData.get("experienceTitle") ?? settings.content.experienceTitle),
        experienceBody: String(formData.get("experienceBody") ?? settings.content.experienceBody),
        trustReservationTitle: String(formData.get("trustReservationTitle") ?? settings.content.trustReservationTitle),
        trustReservationBody: String(formData.get("trustReservationBody") ?? settings.content.trustReservationBody),
        finalCtaTitle: String(formData.get("finalCtaTitle") ?? settings.content.finalCtaTitle),
        finalCtaBody: String(formData.get("finalCtaBody") ?? settings.content.finalCtaBody),
        locationBody: String(formData.get("locationBody") ?? settings.content.locationBody)
      },
      reservation: {
        ...settings.reservation,
        steps: toArray(formData.get("reservationSteps")),
        secureBullets: toArray(formData.get("secureBullets"))
      }
    };

    const supabase = createSupabaseAdminClient();
    if (supabase) {
      const { error } = await supabase.from("site_settings").upsert(
        [
          { key: "hero", value: updated.hero },
          { key: "content", value: updated.content },
          { key: "reservation", value: updated.reservation }
        ],
        { onConflict: "key" }
      );
      if (error) throw new Error(error.message);
    } else {
      await updateLocalStore((store) => ({ ...store, siteSettings: updated }));
    }

    revalidatePath("/");
    redirectWith("/admin/pages", "ok", "Sayfa metinleri kaydedildi.");
  } catch (error) {
    redirectWith("/admin/pages", "error", error instanceof Error ? error.message : "Sayfa metinleri kaydedilemedi.");
  }
}

export async function seedDefaultsToLocalAction() {
  await requireAdmin();
  const store = await readLocalStore();
  await updateLocalStore(() => store);
  redirectWith("/admin/dashboard", "ok", "Yerel seed dosyası hazırlandı.");
}
