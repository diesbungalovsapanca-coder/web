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
    <section className="bg-background pb-20 pt-28">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Bungalov Tipleri", path: "/bungalov" }
        ])}
      />
      <Container>
        <BungalowTypes whatsappPhone={settings.contact.whatsappPhone} />
      </Container>
    </section>
  );
}
