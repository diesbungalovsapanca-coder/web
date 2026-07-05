import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata, faqJsonLd } from "@/lib/seo";
import { getFaqs } from "@/lib/data/faqs";
import { getSiteSettings } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Sık Sorulan Sorular",
    description: "DİES BUNGALOV Sapanca rezervasyon, havuz, jakuzi, konum, otopark ve ödeme süreci hakkında sık sorulan sorular.",
    path: "/sss"
  });
}

export default async function FaqPage() {
  const [settings, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);

  return (
    <section className="bg-background pb-20 pt-32">
      <JsonLd data={faqJsonLd(faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Sık Sorulan Sorular", path: "/sss" }
        ])}
      />
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">SSS</p>
          <h1 className="font-serif text-5xl leading-tight text-text">Sık sorulan sorular</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Temel bilgiler burada yer alır. Seçilen tarih, dönem ve konaklama koşullarına göre detaylar WhatsApp üzerinden yazılı olarak netleştirilir.
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.id} className="rounded-lg border border-border bg-surface p-6">
              <p className="text-xs font-bold uppercase tracking-normal text-accent-dark">{faq.category}</p>
              <h2 className="mt-2 text-xl font-bold text-text">{faq.question}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
        <TrackedLink
          href={createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.faq)}
          event="whatsapp_click_contact"
          target="_blank"
          rel="noreferrer"
          className={buttonClassName("primary", "mt-10")}
        >
          <Icon name="MessageCircle" className="h-5 w-5" />
          WhatsApp’tan soru sor
        </TrackedLink>
      </Container>
    </section>
  );
}
