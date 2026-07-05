import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { MediaVisual } from "@/components/common/MediaVisual";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import { createPageMetadata } from "@/lib/seo";
import { getFeatures } from "@/lib/data/features";
import { getFeaturedMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";
import { getReservationInfo } from "@/lib/data/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Bungalov Detayları",
    description: "DİES BUNGALOV Sapanca bungalov detayları, özel havuz, jakuzi, ateş çukuru, barbekü, iç ve dış alan bilgileri.",
    path: "/bungalov"
  });
}

const detailSections = [
  ["İç Mekân", "Sıcak, sakin ve özel günlere uygun iç mekân deneyimi."],
  ["Dış Alan", "Doğa atmosferi, oturma alanları ve size özel kullanım hissi."],
  ["Havuz & Jakuzi", "Kullanım ve ısıtma detayları dönemsel koşullara göre rezervasyon öncesinde netleştirilir."],
  ["Mutfak / Barbekü", "Konaklamayı keyifli bir akşam yemeği deneyimine dönüştüren alanlar."],
  ["Isıtma / Kış Konforu", "Kış aylarında konfor bilgileri WhatsApp üzerinden net olarak iletilir."],
  ["Otopark / Ulaşım", "Misafirler için rahat ulaşım ve otopark bilgisi rezervasyon sürecinde paylaşılır."]
];

export default async function BungalovPage() {
  const [settings, features, reservationInfo, media] = await Promise.all([
    getSiteSettings(),
    getFeatures(),
    getReservationInfo(),
    getFeaturedMedia(6)
  ]);

  return (
    <section className="bg-background pb-20 pt-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Bungalov</p>
            <h1 className="font-serif text-5xl leading-tight text-text">Sapanca’da özel ve konforlu bir bungalov deneyimi</h1>
            <p className="mt-5 text-lg leading-8 text-muted">
              Detaylar rezervasyon öncesinde WhatsApp üzerinden net olarak iletilir. Bu sayfa, tesisin sunduğu ana atmosferi ve yönetilebilir bilgileri özetler.
            </p>
            <TrackedLink
              href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero)}
              event="whatsapp_click_contact"
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("dark", "mt-7")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              Müsaitlik ve detay sor
            </TrackedLink>
          </div>
          <div className="h-[34rem] overflow-hidden rounded-lg">
            <MediaVisual media={media[0] ?? null} className="h-full" />
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.id} className="rounded-lg border border-border bg-surface p-5">
              <Icon name={feature.icon} className="h-6 w-6 text-accent-dark" />
              <h2 className="mt-4 text-lg font-bold text-text">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {detailSections.map(([title, body]) => (
            <article key={title} className="rounded-lg border border-border bg-surface p-6">
              <h2 className="text-xl font-bold text-text">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-green-dark p-6 text-white sm:p-8">
          <h2 className="font-serif text-3xl">Rezervasyon öncesi netleşen bilgiler</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {reservationInfo.map((item) => (
              <div key={item.id} className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="mt-2 text-sm text-white/72">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
