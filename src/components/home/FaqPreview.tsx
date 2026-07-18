import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Faq } from "@/types/site";

export function FaqPreview({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="bg-surface py-20">
      <Container>
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="SSS"
            title="WhatsApp’a geçmeden önce temel cevaplar"
            body="Kesinleşmesi gereken tüm konular rezervasyon öncesinde yazılı olarak netleştirilir."
          />
          <Link href="/sss" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark">
            Tüm soruları gör
            <Icon name="Play" className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.slice(0, 8).map((faq) => (
            <article key={faq.id} className="rounded-lg border border-border bg-background p-5">
              <h3 className="text-base font-bold text-text">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
