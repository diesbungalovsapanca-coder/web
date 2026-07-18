import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";

export function FinalCta({ settings }: { settings: SiteSettings }) {
  return (
    <section className="bg-background pb-20 pt-6">
      <Container>
        <div className="rounded-lg bg-accent px-6 py-10 text-white sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl leading-tight">{settings.content.finalCtaTitle}</h2>
            <p className="mt-4 text-base leading-8 text-white/82">{settings.content.finalCtaBody}</p>
            <TrackedLink
              href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero)}
              event="whatsapp_click_contact"
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("whatsapp", "mt-7")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              WhatsApp’tan Müsaitlik Sor
            </TrackedLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
