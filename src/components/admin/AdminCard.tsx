import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminCard({
  title,
  description,
  children,
  className
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-border bg-surface p-5", className)}>
      {title ? <h2 className="text-lg font-bold text-text">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm leading-6 text-muted">{description}</p> : null}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}
