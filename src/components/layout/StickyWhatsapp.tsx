import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";

export function StickyWhatsapp({ settings }: { settings: SiteSettings }) {
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.sticky);

  return (
    <>
      <TrackedLink
        href={whatsappUrl}
        event="whatsapp_click_sticky"
        target="_blank"
        rel="noreferrer"
        className="sticky-whatsapp fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.32)] transition hover:bg-[#1DA851] sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        aria-label="WhatsApp’tan müsaitlik sor"
        title="WhatsApp’tan müsaitlik sor"
      >
        <Icon name="MessageCircle" className="h-6 w-6 text-white" />
      </TrackedLink>
    </>
  );
}
