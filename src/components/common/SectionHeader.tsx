import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  className
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">{eyebrow}</p>
      ) : null}
      <h2 className="font-serif text-3xl leading-tight text-text sm:text-4xl lg:text-5xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-8 text-muted sm:text-lg">{body}</p> : null}
    </div>
  );
}
