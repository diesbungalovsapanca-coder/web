import Link from "next/link";
import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Faq } from "@/types/site";

export function FaqPreview({ faqs }: { faqs: Faq[] }) {
  return (
    <Section tone="surface">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader eyebrow="SSS" title="Sık sorulan sorular" />
        <Link href="/sss" className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-accent-dark">
          Tüm soruları gör
          <Icon name="ChevronRight" className="h-4 w-4" />
        </Link>
      </div>
      {/* Akordiyon: önceden 5-8 cevap tam metin açıktı ve mobilde ~1400px sürüyordu. */}
      <div className="mt-8 grid gap-3 lg:mt-10">
        {faqs.slice(0, 5).map((faq) => (
          <details key={faq.id} className="group rounded-lg border border-border bg-background px-5">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-bold text-text [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Icon
                name="ChevronRight"
                className="h-5 w-5 shrink-0 text-accent-dark transition group-open:rotate-90"
              />
            </summary>
            <p className="pb-5 text-sm leading-7 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
