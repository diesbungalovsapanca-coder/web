import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { getInstagramHandle } from "@/lib/instagram";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";

const links = [
  ["Bungalov", "/bungalov"],
  ["Galeri", "/galeri"],
  ["Deneyimler", "/deneyimler"],
  ["Konum", "/konum"],
  ["SSS", "/sss"],
  ["İletişim", "/iletisim"]
];

export function Footer({ settings }: { settings: SiteSettings }) {
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.sticky);
  const instagramHandle = getInstagramHandle(settings.contact.instagramUrl);

  return (
    <footer className="bg-surface-dark py-14 text-white">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex items-center gap-3">
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white p-1 ring-1 ring-white/16">
              <Image
                src={settings.brand.logoUrl}
                alt={`${settings.brand.name} logo`}
                width={128}
                height={128}
                sizes="64px"
                className="h-full w-full rounded-full object-contain"
              />
            </span>
            <p className="font-serif text-3xl leading-none">DİES BUNGALOV</p>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/68">{settings.brand.description}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/75">
            <Icon name="ShieldCheck" className="h-4 w-4 text-accent" />
            Rezervasyon süreci resmi WhatsApp hattımız üzerinden yazılı ilerler.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-white/52">Menü</h2>
          <nav className="mt-4 grid gap-3 text-sm text-white/74">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-normal text-white/52">İletişim</h2>
          <div className="mt-4 grid gap-3 text-sm text-white/74">
            <p className="inline-flex items-center gap-2">
              <Icon name="MapPin" className="h-4 w-4 text-accent" />
              {settings.brand.location}
            </p>
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click_contact"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Icon name="MessageCircle" className="h-4 w-4 text-accent" />
              WhatsApp’tan bilgi alın
            </TrackedLink>
            <TrackedLink
              href={settings.contact.instagramUrl}
              event="instagram_click"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Icon name="Instagram" className="h-4 w-4 text-accent" />
              {instagramHandle ?? "Instagram"}
            </TrackedLink>
          </div>
        </div>
      </Container>
    </footer>
  );
}
