import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { HeroMedia } from "@/components/home/HeroMedia";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/types/media";
import type { SiteSettings } from "@/types/site";

export function HeroSection({ settings, media }: { settings: SiteSettings; media: MediaItem | null }) {
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero);

  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-surface-dark text-white lg:min-h-[88svh]">
      <div className="absolute inset-0">
        <HeroMedia media={media} className="h-full" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,18,15,0.82),rgba(21,18,15,0.45)_44%,rgba(21,18,15,0.18)),linear-gradient(0deg,rgba(21,18,15,0.72),transparent_46%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[78svh] max-w-7xl items-end px-4 pb-12 pt-28 sm:px-6 lg:min-h-[88svh] lg:px-8 lg:pb-20 lg:pt-32">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white/78 backdrop-blur-md">
            <Icon name="MapPin" className="h-4 w-4 text-accent" />
            {settings.brand.location}
          </p>
          <h1 className="font-serif text-4xl leading-[1.04] text-balance sm:text-6xl lg:text-7xl">
            {settings.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:mt-6 sm:text-xl sm:leading-8">
            {settings.hero.subtitle}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click_hero"
              params={{ cta_location: "hero" }}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("whatsapp", "w-full sm:w-auto")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              {settings.hero.primaryCta}
            </TrackedLink>
            <Link href="/galeri" className={buttonClassName("secondary", "w-full sm:w-auto")}>
              <Icon name="Play" className="h-5 w-5" />
              {settings.hero.secondaryCta}
            </Link>
          </div>

          {/* Mobilde ilk 3 rozet; tamamı sm üstünde. */}
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
            {settings.hero.badges.map((badge, index) => (
              <span
                key={badge}
                className={cn(
                  "rounded-full border border-white/18 bg-white/10 px-3 py-2 text-xs font-semibold text-white/82 backdrop-blur-md",
                  index >= 3 && "hidden sm:inline-block"
                )}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
