import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Konum",
    description: "DİES BUNGALOV Sapanca / Sakarya konum, ulaşım, otopark ve yakın çevre bilgileri.",
    path: "/konum"
  });
}

export default async function LocationPage() {
  const settings = await getSiteSettings();

  return (
    <section className="bg-background pb-20 pt-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Konum", path: "/konum" }
        ])}
      />
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Konum</p>
          <h1 className="font-serif text-5xl leading-tight text-text">{settings.brand.location}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{settings.location.body}</p>
          <p className="mt-5 text-base leading-8 text-muted">{settings.location.parking}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.location)}
              event="whatsapp_click_contact"
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("dark")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              Konum bilgisi sor
            </TrackedLink>
            {settings.contact.mapsUrl ? (
              <TrackedLink
                href={settings.contact.mapsUrl}
                event="maps_click"
                target="_blank"
                rel="noreferrer"
                className={buttonClassName("ghost")}
              >
                <Icon name="MapPin" className="h-5 w-5" />
                Google Maps
              </TrackedLink>
            ) : null}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h2 className="font-serif text-3xl text-text">Yakın çevre</h2>
          <div className="mt-6 grid gap-3">
            {settings.location.nearby.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg bg-background p-4">
                <Icon name="MapPin" className="h-5 w-5 text-accent-dark" />
                <span className="font-semibold text-text">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg bg-green-dark p-5 text-white">
            <h3 className="font-bold">Ulaşım desteği</h3>
            <p className="mt-2 text-sm leading-7 text-white/72">
              Haritadaki konuma yol tarifi için Google Maps bağlantısını kullanabilir, ulaşım sorularınız için WhatsApp’tan destek alabilirsiniz.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-border lg:col-span-2">
          <iframe
            title="DİES Bungalov Sapanca — Google Haritalar konumu"
            src="https://maps.google.com/maps?q=Dies%20Bungalov%20Sapanca&ll=40.6620377,30.2999791&z=15&hl=tr&output=embed"
            className="h-80 w-full border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p className="bg-surface px-5 py-3 text-sm text-muted">
            DİES Bungalov’un Google Haritalar üzerindeki konumu. Yol tarifi için haritaya tıklayabilirsiniz.
          </p>
        </div>
      </Container>
    </section>
  );
}
