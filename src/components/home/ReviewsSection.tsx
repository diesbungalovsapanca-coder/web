import { Icon } from "@/components/common/Icon";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Testimonial } from "@/types/site";

export function ReviewsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <Section tone="light">
      <SectionHeader eyebrow="Misafir yorumları" title="Konaklayan misafirlerden notlar" />
      {/* Mobilde yatay şerit; yorum sayısı arttıkça sayfa boyu uzamasın. */}
      <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="w-[85%] shrink-0 snap-center rounded-lg border border-border bg-surface p-5 md:w-auto"
          >
            <div className="mb-4 flex gap-1 text-accent-dark">
              {Array.from({ length: testimonial.rating ?? 5 }).map((_, index) => (
                <Icon key={index} name="Star" className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm leading-7 text-muted">{testimonial.comment}</p>
            <p className="mt-5 text-sm font-bold text-text">{testimonial.name}</p>
            <p className="text-xs text-muted">{testimonial.source}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
