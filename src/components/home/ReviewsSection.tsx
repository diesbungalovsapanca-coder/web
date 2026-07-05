import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { SectionHeader } from "@/components/common/SectionHeader";
import type { Testimonial } from "@/types/site";

export function ReviewsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-background py-20">
      <Container>
        <SectionHeader eyebrow="Misafir yorumları" title="Konaklayan misafirlerden notlar" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="rounded-lg border border-border bg-surface p-5">
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
      </Container>
    </section>
  );
}
