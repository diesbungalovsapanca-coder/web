import { signatureSteps } from "@/data/defaults";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";

export function SignatureExperience() {
  return (
    <section className="bg-green-dark py-20 text-white">
      <Container>
        <SectionHeader
          eyebrow="DİES’te 24 Saat"
          title="Giriş anından gece ateş başına kadar her anın ritmi ayrı"
          body="Konaklamanız yalnızca bir gece kalmak değil; sakin, özel ve planlı bir deneyim akışı."
          className="text-white [&_h2]:text-white [&_p]:text-white/72"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {signatureSteps.map((step, index) => (
            <article key={step.title} className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
              <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="text-lg font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
