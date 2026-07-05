import type { MediaCategory } from "./media";

export interface BrandSettings {
  name: string;
  logoUrl: string;
  location: string;
  slogan: string;
  description: string;
}

export interface ContactSettings {
  phone: string;
  whatsappPhone: string;
  email: string;
  instagramUrl: string;
  mapsUrl: string;
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ratingValue?: number;
  reviewCount?: number;
  priceRange?: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  badges: string[];
}

export interface ContentSettings {
  experienceTitle: string;
  experienceBody: string;
  trustReservationTitle: string;
  trustReservationBody: string;
  finalCtaTitle: string;
  finalCtaBody: string;
  locationBody: string;
}

export interface ReservationSettings {
  steps: string[];
  secureBullets: string[];
  paymentNote: string;
  checkInOut: string;
  minimumStay: string;
  breakfast: string;
  pets: string;
}

export interface LocationSettings {
  visible: boolean;
  body: string;
  parking: string;
  nearby: string[];
}

export interface SiteSettings {
  brand: BrandSettings;
  contact: ContactSettings;
  seo: SeoSettings;
  hero: HeroSettings;
  content: ContentSettings;
  reservation: ReservationSettings;
  location: LocationSettings;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  source: "Google" | "Instagram" | "WhatsApp" | "Manuel" | string;
  rating?: number | null;
  comment: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExperienceCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaMessage: string;
  mediaId?: string | null;
  mediaCategory?: MediaCategory;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReservationInfo {
  id: string;
  title: string;
  value?: string | null;
  description?: string | null;
  isPublic: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalMedia: number;
  activeMedia: number;
  hasHeroMedia: boolean;
  activeFaqs: number;
  activeFeatures: number;
  activeTestimonials: number;
  hasWhatsapp: boolean;
}
