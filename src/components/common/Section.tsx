import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

type Tone = "light" | "surface" | "dark" | "accent";

const tones: Record<Tone, string> = {
  light: "bg-background text-text",
  surface: "bg-surface text-text",
  dark: "bg-green-dark text-white",
  accent: "bg-accent text-white"
};

/**
 * Tüm ana sayfa bölümlerinin ortak kabuğu. Dikey boşluk mobilde küçülür
 * (py-12 → sm:py-16 → lg:py-20); daha önce her bölüm sabit py-20 yazdığı için
 * mobilde yalnızca bölüm araları ~1900px yer kaplıyordu.
 */
export function Section({
  id,
  tone = "light",
  labelledBy,
  className,
  containerClassName,
  children
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-12 sm:py-16 lg:py-20", tones[tone], id && "scroll-mt-20", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
