import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { getInstagramAnalyticsParams, getInstagramHandle } from "@/lib/instagram";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";

/** Eski SocialProof bölümü buraya (ikincil Instagram butonu olarak) eritildi. */
export function FinalCta({ settings }: { settings: SiteSettings }) {
  const instagramHandle = getInstagramHandle(settings.contact.instagramUrl) ?? "Instagram";

  return (
    <section className="bg-background pb-14 pt-4 sm:pb-20 sm:pt-6">
      <Container>
        <div className="rounded-lg bg-accent px-5 py-8 text-white sm:px-8 sm:py-10 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{settings.content.finalCtaTitle}</h2>
            <p className="mt-4 text-base leading-8 text-white/82">{settings.content.finalCtaBody}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero)}
                event="whatsapp_click_contact"
                params={{ cta_location: "final_cta" }}
                target="_blank"
                rel="noreferrer"
                className={buttonClassName("whatsapp", "w-full sm:w-auto")}
              >
                <Icon name="MessageCircle" className="h-5 w-5" />
                WhatsApp’tan Müsaitlik Sor
              </TrackedLink>
              <TrackedLink
                href={settings.contact.instagramUrl}
                event="instagram_click"
                params={getInstagramAnalyticsParams(settings.contact.instagramUrl, "home_final_cta")}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram'da ${instagramHandle} hesabını aç`}
                className={buttonClassName("dark", "w-full sm:w-auto")}
              >
                <Icon name="Instagram" className="h-5 w-5 text-accent" />
                Instagram’ı Aç
              </TrackedLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
