import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "whatsapp";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_14px_34px_rgba(138,100,56,0.24)] hover:bg-accent-dark focus-visible:outline-accent",
  secondary:
    "border border-white/55 bg-white/12 text-white backdrop-blur-md hover:bg-white/20 focus-visible:outline-white",
  ghost: "border border-border bg-surface text-text hover:border-accent hover:text-accent-dark focus-visible:outline-accent",
  dark: "bg-green-dark text-white hover:bg-surface-dark focus-visible:outline-green-dark",
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.24)] hover:bg-[#1DA851] focus-visible:outline-[#25D366]"
};

export function buttonClassName(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    variants[variant],
    className
  );
}

export function AppButton({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & ComponentPropsWithoutRef<"a">) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={buttonClassName(variant, className)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={buttonClassName(variant, className)} {...props}>
      {children}
    </a>
  );
}
