import { getSiteSettings } from "@/lib/data/site";
import { getFeatures } from "@/lib/data/features";
import { getFaqs } from "@/lib/data/faqs";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

// AI ajanları/motorları için düz metin site özeti (llms.txt standardı).
export async function GET() {
  const [settings, features, faqs] = await Promise.all([getSiteSettings(), getFeatures(), getFaqs()]);

  const activeFeatures = features.filter((feature) => feature.isActive !== false);
  const activeFaqs = faqs.filter((faq) => faq.isActive !== false);

  const pages: [string, string][] = [
    ["/", "Ana sayfa — genel tanıtım ve öne çıkanlar"],
    ["/bungalov", "Bungalov detayları ve olanaklar"],
    ["/galeri", "Fotoğraf galerisi"],
    ["/deneyimler", "Çiftler, balayı, hafta sonu ve kış konaklama senaryoları"],
    ["/konum", "Konum, ulaşım ve yakın çevre"],
    ["/sss", "Sık sorulan sorular"],
    ["/iletisim", "İletişim ve rezervasyon akışı"]
  ];

  const contactLines = [
    `Konum: ${settings.brand.location} (Fevziye Sok. 66/1, Sapanca / Sakarya)`,
    `Web: ${SITE_URL}`,
    settings.contact.instagramUrl ? `Instagram: ${settings.contact.instagramUrl}` : null,
    settings.contact.whatsappPhone ? `WhatsApp: +${settings.contact.whatsappPhone}` : null,
    settings.seo.ratingValue && settings.seo.reviewCount
      ? `Google değerlendirmesi: ${settings.seo.ratingValue} / 5 (${settings.seo.reviewCount} yorum)`
      : null
  ].filter((line): line is string => line !== null);

  const lines: string[] = [
    `# ${settings.brand.name}`,
    "",
    `> ${settings.brand.description}`,
    "",
    ...contactLines,
    "",
    "## Öne çıkan olanaklar",
    ...activeFeatures.map((feature) => `- ${feature.title}: ${feature.description}`),
    "",
    "## Sayfalar",
    ...pages.map(([path, label]) => `- [${label}](${absoluteUrl(path)})`),
    "",
    "## Sık sorulan sorular",
    ...activeFaqs.map((faq) => `- S: ${faq.question}\n  C: ${faq.answer}`),
    "",
    "## Rezervasyon",
    settings.reservation.paymentNote,
    "Müsaitlik, fiyat ve rezervasyon detayları resmi WhatsApp hattı üzerinden yazılı olarak paylaşılır."
  ];

  const body = lines.join("\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
