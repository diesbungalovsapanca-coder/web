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
        className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-center gap-3 rounded-xl bg-green-dark px-4 py-3 text-white shadow-[0_18px_44px_rgba(21,18,15,0.28)] sm:hidden"
      >
        <Icon name="MessageCircle" className="h-5 w-5 text-accent" />
        <span className="grid leading-tight">
          <span className="text-sm font-bold">Müsaitlik Sor</span>
          <span className="text-xs text-white/70">WhatsApp’tan hızlı bilgi alın</span>
        </span>
      </TrackedLink>
      <TrackedLink
        href={whatsappUrl}
        event="whatsapp_click_sticky"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-green-dark text-white shadow-[0_18px_44px_rgba(21,18,15,0.28)] transition hover:bg-surface-dark sm:inline-flex"
        aria-label="WhatsApp’tan müsaitlik sor"
      >
        <Icon name="MessageCircle" className="h-6 w-6 text-accent" />
      </TrackedLink>
    </>
  );
}
