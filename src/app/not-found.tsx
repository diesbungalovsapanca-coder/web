import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import { getSiteSettings } from "@/lib/data/site";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <section className="bg-background pb-20 pt-32">
      <Container className="grid min-h-[62svh] place-items-center">
        <div className="max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-normal text-accent-dark">404</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-text sm:text-6xl">Aradığınız sayfa bulunamadı</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
            Sayfa taşınmış olabilir. Konaklama detayları, galeri ve müsaitlik bilgisi için aşağıdaki bağlantıları kullanabilirsiniz.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <TrackedLink
              href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.contact)}
              event="whatsapp_click_contact"
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("dark")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              Rezervasyon için WhatsApp
            </TrackedLink>
            <Link href="/galeri" className={buttonClassName("ghost")}>
              <Icon name="Play" className="h-5 w-5" />
              Galeriyi incele
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
