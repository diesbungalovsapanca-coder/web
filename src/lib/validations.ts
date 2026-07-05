import { z } from "zod";

export const mediaSchema = z.object({
  type: z.enum(["image", "video"]),
  publicUrl: z.string().min(1, "Medya URL zorunlu"),
  storagePath: z.string().optional(),
  thumbnailUrl: z.string().optional().nullable(),
  posterUrl: z.string().optional().nullable(),
  category: z.enum([
    "hero",
    "exterior",
    "interior",
    "pool-jacuzzi",
    "night-atmosphere",
    "winter",
    "details",
    "logo",
    "uncategorized"
  ]),
  title: z.string().min(2, "Başlık zorunlu"),
  alt: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  isHero: z.boolean().default(false),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const featureSchema = z.object({
  title: z.string().min(2, "Başlık zorunlu"),
  description: z.string().min(5, "Açıklama zorunlu"),
  icon: z.string().min(1, "İkon zorunlu"),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().default(0)
});

export const faqSchema = z.object({
  question: z.string().min(5, "Soru zorunlu"),
  answer: z.string().min(10, "Cevap zorunlu"),
  category: z.string().min(2, "Kategori zorunlu"),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const testimonialSchema = z.object({
  name: z.string().min(2, "İsim zorunlu"),
  source: z.string().min(2, "Kaynak zorunlu"),
  rating: z.number().int().min(1).max(5).nullable(),
  comment: z.string().min(5, "Yorum zorunlu"),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

export const settingsSchema = z.object({
  whatsappPhone: z.string().min(5, "WhatsApp telefonu zorunlu"),
  phone: z.string().optional(),
  email: z.string().optional(),
  instagramUrl: z.string().url("Geçerli Instagram URL girin"),
  mapsUrl: z.string().optional(),
  seoTitle: z.string().min(10, "SEO başlığı zorunlu"),
  seoDescription: z.string().min(30, "SEO açıklaması zorunlu"),
  heroTitle: z.string().min(5, "Hero başlığı zorunlu"),
  heroSubtitle: z.string().min(10, "Hero alt metni zorunlu"),
  locationBody: z.string().min(10, "Lokasyon metni zorunlu")
});
