"use client";

import { publicGalleryCategories } from "@/data/categories";
import type { MediaCategory } from "@/types/media";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  value,
  onChange
}: {
  value: "all" | MediaCategory;
  onChange: (value: "all" | MediaCategory) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Galeri kategorileri">
      {publicGalleryCategories.map((category) => (
        <button
          key={category.value}
          type="button"
          onClick={() => onChange(category.value)}
          className={cn(
            "min-h-10 shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition",
            value === category.value
              ? "border-green-dark bg-green-dark text-white"
              : "border-border bg-surface text-muted hover:border-accent hover:text-text"
          )}
          role="tab"
          aria-selected={value === category.value}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
