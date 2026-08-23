import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { BungalowTypes } from "@/components/bungalow/BungalowTypes";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Bungalov Tipleri",
    description: "DİES BUNGALOV Sapanca Suit, Deluxe ve Woodlux bungalov tipleri, tanıtım videoları ve tarihe göre WhatsApp müsaitlik sorgulama.",
    path: "/bungalov"
  });
}

export default async function BungalovPage() {
  const settings = await getSiteSettings();

  return (
    <section className="bg-background pb-14 pt-24 sm:pb-20 lg:pt-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Bungalov Tipleri", path: "/bungalov" }
        ])}
      />
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Konaklama</p>
          <h1 className="font-serif text-3xl leading-tight text-text sm:text-4xl lg:text-5xl">Bungalov Tipleri</h1>
          <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
            Suit, Deluxe ve Woodlux. Videoyu izleyin, müsaitliği doğrudan WhatsApp’tan sorun.
          </p>
        </div>
        <div className="mt-8 sm:mt-10">
          <BungalowTypes whatsappPhone={settings.contact.whatsappPhone} />
        </div>
      </Container>
    </section>
  );
}
