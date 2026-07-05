import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";

const items = [
  "Gerçek tesis görselleri",
  "Resmi WhatsApp iletişimi",
  "Rezervasyon sonrası yazılı onay",
  "Şeffaf rezervasyon süreci"
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface">
      <Container className="grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-lg bg-background px-4 py-3">
            <Icon name="ShieldCheck" className="h-5 w-5 shrink-0 text-accent-dark" />
            <p className="text-sm font-semibold text-text">{item}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
