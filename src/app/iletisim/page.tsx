import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { getInstagramHandle } from "@/lib/instagram";
import { whatsappMessages } from "@/data/whatsapp";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "İletişim",
    description: "DİES BUNGALOV Sapanca WhatsApp, Instagram, rezervasyon akışı ve güvenli iletişim bilgileri.",
    path: "/iletisim"
  });
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.contact);
  const instagramHandle = getInstagramHandle(settings.contact.instagramUrl);

  return (
    <section className="bg-background pb-20 pt-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" }
        ])}
      />
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">İletişim</p>
          <h1 className="font-serif text-5xl leading-tight text-text">Müsaitlik ve fiyat bilgisi için resmi WhatsApp hattı</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Tarih ve kişi sayınızı ilettiğinizde müsaitlik, fiyat, ödeme koşulları ve konaklama detayları size yazılı olarak aktarılır.
          </p>
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click_contact"
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("dark", "mt-7")}
          >
            <Icon name="MessageCircle" className="h-5 w-5" />
            WhatsApp’tan Müsaitlik Sor
          </TrackedLink>
        </div>
        <div className="grid gap-4">
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-3xl text-text">Rezervasyon akışı</h2>
            <ol className="mt-5 grid gap-3">
              {settings.reservation.steps.map((step, index) => (
                <li key={step} className="flex gap-3 rounded-lg bg-background p-4 text-sm font-semibold text-text">
                  <span className="text-accent-dark">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <h2 className="font-serif text-3xl text-text">Kanallar</h2>
            <div className="mt-5 grid gap-3 text-sm font-semibold text-text">
              <TrackedLink href={whatsappUrl} event="whatsapp_click_contact" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                <Icon name="MessageCircle" className="h-5 w-5 text-accent-dark" />
                WhatsApp
              </TrackedLink>
              <TrackedLink href={settings.contact.instagramUrl} event="instagram_click" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                <Icon name="Instagram" className="h-5 w-5 text-accent-dark" />
                Instagram{instagramHandle ? ` · ${instagramHandle}` : ""}
              </TrackedLink>
              <span className="flex items-center gap-3">
                <Icon name="MapPin" className="h-5 w-5 text-accent-dark" />
                {settings.brand.location}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
