import type { MediaItem } from "@/types/media";
import { BRAND_LOGO_URL } from "@/data/brand";
import { localInstagramMedia } from "@/data/local-media";
import type {
  ExperienceCard,
  Faq,
  Feature,
  ReservationInfo,
  SiteSettings,
  Testimonial
} from "@/types/site";

export const defaultSettings: SiteSettings = {
  brand: {
    name: "DİES BUNGALOV",
    logoUrl: BRAND_LOGO_URL,
    location: "Sapanca, Sakarya",
    slogan: "Sapanca’da Size Özel Premium Bungalov Deneyimi",
    description:
      "DİES BUNGALOV; Sapanca’da özel havuz, jakuzi, ateş çukuru, barbekü ve doğa manzarasıyla çiftler, özel günler ve sakin kaçamaklar için premium bungalov deneyimi sunar."
  },
  contact: {
    phone: "",
    whatsappPhone: "905403040054",
    email: "",
    instagramUrl: "https://www.instagram.com/diesbungalovsapanca",
    mapsUrl: "https://maps.app.goo.gl/9wEtaTR7XYANSYzb8"
  },
  seo: {
    title: "DİES BUNGALOV Sapanca | Isıtmalı Havuzlu ve Jakuzili Premium Bungalov",
    description:
      "DİES BUNGALOV Sapanca’da ısıtmalı havuz, jakuzi, ateş çukuru, barbekü ve doğa manzarasıyla premium bungalov konaklama deneyimi sunar. Müsaitlik ve fiyat için WhatsApp’tan bilgi alın.",
    keywords: [
      "Sapanca bungalov",
      "Sapanca jakuzili bungalov",
      "Sapanca ısıtmalı havuzlu bungalov",
      "Sapanca özel havuzlu bungalov",
      "Sapanca balayı bungalov",
      "Sapanca ateş çukurlu bungalov",
      "Sapanca doğa manzaralı bungalov",
      "Sapanca hafta sonu bungalov"
    ],
    ogImage: "/media/fallback/dies-hero-fallback.png",
    ratingValue: 4.9,
    reviewCount: 54,
    priceRange: "₺₺₺"
  },
  hero: {
    title: "Sapanca’da Size Özel Premium Bungalov Deneyimi",
    subtitle:
      "Isıtmalı havuz, jakuzi, ateş çukuru ve doğa manzarasıyla şehirden uzak, konfordan ödün vermeyen özel bir kaçış.",
    primaryCta: "WhatsApp’tan Müsaitlik Sor",
    secondaryCta: "Galeriyi İncele",
    badges: ["Isıtmalı Havuz", "Jakuzi", "Ateş Çukuru", "Doğa Manzarası", "Otopark"]
  },
  content: {
    experienceTitle:
      "DİES’te konaklama, sadece bir gece kalmak değil; size özel bir atmosfer yaşamak demek.",
    experienceBody:
      "Doğanın içinde, modern konforla hazırlanmış DİES BUNGALOV; özel havuzu, jakuzisi, ateş çukuru ve sıcak iç mekânıyla çiftler ve özel günler için sakin, güvenli ve premium bir kaçış sunar.",
    trustReservationTitle: "Güvenli Rezervasyon",
    trustReservationBody:
      "DİES BUNGALOV rezervasyon süreci resmi iletişim hattımız üzerinden yazılı olarak ilerler. Müsaitlik, fiyat, ödeme koşulları ve konaklama detayları size net şekilde iletilir.",
    finalCtaTitle: "DİES BUNGALOV’da yerinizi ayırmak için ilk adımı atın.",
    finalCtaBody:
      "Tarih ve kişi sayınızı WhatsApp üzerinden iletin; müsaitlik, fiyat ve rezervasyon detaylarını size net şekilde aktaralım.",
    locationBody:
      "DİES BUNGALOV, Sapanca’da doğayla iç içe sakin bir konumda yer alır. Konumu haritada inceleyebilir, ulaşım için WhatsApp’tan destek alabilirsiniz."
  },
  reservation: {
    steps: [
      "Tarih ve kişi sayınızı belirtin.",
      "WhatsApp üzerinden müsaitlik ve fiyat bilgisi alın.",
      "Rezervasyon koşulları ve ödeme bilgileri size yazılı olarak iletilir.",
      "Onay sonrası konaklama detayları paylaşılır."
    ],
    secureBullets: [
      "Resmi WhatsApp hattı",
      "Gerçek tesis görselleri",
      "Yazılı rezervasyon onayı",
      "Net ödeme / kapora bilgilendirmesi",
      "Instagram hesabı bağlantısı",
      "Konum ve ulaşım bilgilendirmesi"
    ],
    paymentNote:
      "Ödeme ve kapora bilgileri rezervasyon öncesinde resmi iletişim hattı üzerinden net ve yazılı şekilde paylaşılır.",
    checkInOut: "Giriş ve çıkış saatleri rezervasyon sırasında yazılı olarak iletilir.",
    minimumStay: "Minimum gece bilgisi seçilen döneme göre netleştirilir.",
    breakfast: "Kahvaltı bilgisi rezervasyon öncesinde WhatsApp üzerinden net olarak iletilir.",
    pets: "Evcil hayvan kabul durumu rezervasyon öncesinde net olarak iletilir."
  },
  location: {
    visible: true,
    body: "Sapanca / Sakarya’da doğayla iç içe sakin bir konum. Konumu aşağıdaki haritada inceleyebilirsiniz.",
    parking: "Misafirler için otopark imkânı bulunmaktadır.",
    nearby: ["Sapanca merkez", "Sapanca Gölü", "Kırkpınar", "Maşukiye"]
  }
};

const fallbackMedia: MediaItem[] = [
  {
    id: "fallback-hero",
    type: "image",
    storagePath: "public/media/fallback/dies-hero-fallback.png",
    publicUrl: "/media/fallback/dies-hero-fallback.png",
    thumbnailUrl: "/media/fallback/dies-hero-fallback.png",
    posterUrl: null,
    category: "hero",
    title: "DİES BUNGALOV dış alan atmosferi",
    alt: "Sapanca’da modern ahşap bungalov, özel havuz ve doğa manzarası",
    description: "Gerçek medya eklenene kadar kullanılan fallback hero görseli.",
    orientation: "landscape",
    width: 1536,
    height: 864,
    isFeatured: true,
    isHero: true,
    isActive: true,
    sortOrder: 0
  }
];

export const defaultMedia: MediaItem[] = localInstagramMedia.length > 0 ? localInstagramMedia : fallbackMedia;

export const defaultFeatures: Feature[] = [
  {
    id: "heated-pool",
    title: "Isıtmalı Havuz",
    description: "Soğuk havalarda bile konforlu havuz keyfi. Gündüz doğa manzarası, gece ışıklarla özel atmosfer.",
    icon: "Waves",
    isActive: true,
    isFeatured: true,
    sortOrder: 1
  },
  {
    id: "jacuzzi",
    title: "Jakuzi",
    description: "Günün yorgunluğunu atacağınız, tamamen size özel rahatlama alanı.",
    icon: "Bath",
    isActive: true,
    isFeatured: true,
    sortOrder: 2
  },
  {
    id: "fire-pit",
    title: "Ateş Çukuru",
    description: "Akşam saatlerinde kahvenizi alıp ateş başında sakin bir Sapanca gecesi.",
    icon: "Flame",
    isActive: true,
    isFeatured: true,
    sortOrder: 3
  },
  {
    id: "barbecue",
    title: "Barbekü",
    description: "Konaklamanızı keyifli bir akşam yemeği deneyimine dönüştüren özel alan.",
    icon: "Utensils",
    isActive: true,
    isFeatured: false,
    sortOrder: 4
  },
  {
    id: "floor-heating",
    title: "Yerden Isıtma",
    description: "Kış aylarında sıcak ve konforlu iç mekân deneyimi.",
    icon: "ThermometerSun",
    isActive: true,
    isFeatured: false,
    sortOrder: 5
  },
  {
    id: "nature-view",
    title: "Doğa / Vadi Manzarası",
    description: "Kalabalıktan uzak, doğaya bakan huzurlu bir atmosfer.",
    icon: "Trees",
    isActive: true,
    isFeatured: true,
    sortOrder: 6
  },
  {
    id: "wifi-tv",
    title: "Wi-Fi & TV",
    description: "Doğanın içinde kalırken temel konforlardan uzak kalmayın.",
    icon: "Wifi",
    isActive: true,
    isFeatured: false,
    sortOrder: 7
  },
  {
    id: "parking",
    title: "Otopark",
    description: "Konaklama boyunca aracınız için rahat park imkânı.",
    icon: "ParkingCircle",
    isActive: true,
    isFeatured: false,
    sortOrder: 8
  }
];

export const defaultFaqs: Faq[] = [
  {
    id: "check-in-time-faq",
    question: "Giriş saati kaç?",
    answer: "Giriş saati rezervasyon sırasında misafire yazılı olarak iletilir.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "check-out-time-faq",
    question: "Çıkış saati kaç?",
    answer: "Çıkış saati rezervasyon sırasında misafire yazılı olarak iletilir.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "heated-pool-faq",
    question: "Havuz ısıtmalı mı?",
    answer: "DİES BUNGALOV’da havuz kullanımı ve ısıtma durumu dönemsel koşullara göre rezervasyon öncesinde net olarak iletilir.",
    category: "Konaklama",
    isActive: true,
    sortOrder: 3
  },
  {
    id: "breakfast-included-faq",
    question: "Kahvaltı dahil mi?",
    answer: "Kahvaltı bilgisi ve varsa ek hizmetler rezervasyon öncesinde WhatsApp üzerinden yazılı olarak netleştirilir.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 4
  },
  {
    id: "pets-faq",
    question: "Evcil hayvan kabul ediliyor mu?",
    answer: "Evcil hayvan kabul durumu seçilen tarih ve tesis koşullarına göre rezervasyon öncesinde net olarak iletilir.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 5
  },
  {
    id: "capacity-faq",
    question: "Kaç kişi konaklayabilir?",
    answer: "Kapasite bilgisi seçilen tarih ve konaklama düzenine göre WhatsApp üzerinden netleştirilir.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 6
  },
  {
    id: "wifi-faq",
    question: "WiFi var mı?",
    answer: "Konaklama alanında Wi-Fi ve TV imkânı bulunmaktadır.",
    category: "Konaklama",
    isActive: true,
    sortOrder: 7
  },
  {
    id: "jacuzzi-faq",
    question: "Jakuzi özel mi?",
    answer: "Jakuzi konaklama alanı içinde misafirlerin özel kullanımına yönelik olarak sunulur.",
    category: "Konaklama",
    isActive: true,
    sortOrder: 8
  },
  {
    id: "bbq-faq",
    question: "Barbekü kullanılabiliyor mu?",
    answer: "Uygun hava ve tesis kuralları çerçevesinde barbekü alanı kullanılabilir.",
    category: "Konaklama",
    isActive: true,
    sortOrder: 9
  },
  {
    id: "parking-faq",
    question: "Otopark var mı?",
    answer: "Misafirler için otopark imkânı bulunmaktadır.",
    category: "Ulaşım",
    isActive: true,
    sortOrder: 10
  },
  {
    id: "reservation-faq",
    question: "Rezervasyon nasıl yapılır?",
    answer:
      "Tarih ve kişi sayınızı WhatsApp üzerinden ilettiğinizde müsaitlik, fiyat ve rezervasyon koşulları size yazılı olarak aktarılır.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 11
  },
  {
    id: "deposit-faq",
    question: "Kapora / ödeme süreci nasıl ilerliyor?",
    answer:
      "Ödeme ve kapora bilgileri rezervasyon öncesinde resmi iletişim hattı üzerinden net ve yazılı şekilde paylaşılır.",
    category: "Rezervasyon",
    isActive: true,
    sortOrder: 12
  },
];

export const defaultTestimonials: Testimonial[] = [];

export const defaultExperienceCards: ExperienceCard[] = [
  {
    id: "couples",
    title: "Çiftler İçin",
    description: "Sessiz, özel ve romantik bir kaçış.",
    ctaLabel: "Bu deneyim için bilgi al",
    ctaMessage: "Merhaba, DİES BUNGALOV çift konaklaması hakkında bilgi almak istiyorum.",
    mediaCategory: "details",
    isActive: true,
    sortOrder: 1
  },
  {
    id: "honeymoon",
    title: "Balayı & Özel Günler İçin",
    description: "Yıl dönümü, doğum günü veya evlilik teklifi gibi anlar için unutulmaz atmosfer.",
    ctaLabel: "Özel gün için bilgi al",
    ctaMessage: "Merhaba, DİES BUNGALOV özel gün / balayı paketi hakkında bilgi almak istiyorum.",
    mediaCategory: "details",
    isActive: true,
    sortOrder: 2
  },
  {
    id: "weekend",
    title: "Hafta Sonu Kaçamağı İçin",
    description: "Şehir temposundan uzaklaşıp kısa sürede doğaya geçmek isteyenler için.",
    ctaLabel: "Hafta sonu müsaitlik sor",
    ctaMessage: "Merhaba, DİES BUNGALOV hafta sonu müsaitliği hakkında bilgi almak istiyorum.",
    mediaCategory: "exterior",
    isActive: true,
    sortOrder: 3
  },
  {
    id: "winter",
    title: "Kış Tatili İçin",
    description: "Yerden ısıtma ve sıcak atmosferle dört mevsim konfor.",
    ctaLabel: "Kış dönemi için bilgi al",
    ctaMessage: "Merhaba, DİES BUNGALOV kış dönemi konaklama bilgisi almak istiyorum.",
    mediaCategory: "winter",
    isActive: true,
    sortOrder: 4
  }
];

export const defaultReservationInfo: ReservationInfo[] = [
  {
    id: "check-in-out",
    title: "Giriş / Çıkış",
    value: "Rezervasyon sırasında iletilir",
    description: "Giriş ve çıkış saatleri rezervasyon sırasında misafire yazılı olarak iletilir.",
    isPublic: true,
    sortOrder: 1
  },
  {
    id: "minimum-stay",
    title: "Minimum Gece",
    value: "Döneme göre değişebilir",
    description: "Minimum gece bilgisi seçilen tarih ve dönem koşullarına göre netleştirilir.",
    isPublic: true,
    sortOrder: 2
  },
  {
    id: "breakfast",
    title: "Kahvaltı",
    value: "Rezervasyon öncesinde netleşir",
    description: "Kahvaltı bilgisi ve ek hizmetler WhatsApp üzerinden yazılı olarak paylaşılır.",
    isPublic: true,
    sortOrder: 3
  },
  {
    id: "pets",
    title: "Evcil Hayvan",
    value: "Rezervasyon öncesinde sorunuz",
    description: "Evcil hayvan kabul durumu seçilen tarih ve tesis koşullarına göre net olarak iletilir.",
    isPublic: true,
    sortOrder: 4
  }
];

export const signatureSteps = [
  {
    title: "Giriş & Karşılama",
    body: "Bungalovunuza yerleşin, doğanın içinde ilk nefesi alın."
  },
  {
    title: "Havuz Keyfi",
    body: "Gün ışığında veya akşam ışıklarıyla size özel havuz atmosferi."
  },
  {
    title: "Jakuzi Molası",
    body: "Sakin ve rahatlatıcı bir özel alan deneyimi."
  },
  {
    title: "Barbekü Saati",
    body: "Sevdiklerinizle keyifli bir akşam yemeği hazırlayın."
  },
  {
    title: "Ateş Başında Gece",
    body: "Kahveniz, ateşin sıcaklığı ve Sapanca’nın dinginliği."
  },
  {
    title: "Sabah Manzarası",
    body: "Doğaya karşı yavaş ve huzurlu bir sabah."
  }
];
