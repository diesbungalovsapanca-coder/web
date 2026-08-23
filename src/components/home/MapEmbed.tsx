"use client";

import { useState } from "react";
import { Icon } from "@/components/common/Icon";

const MAP_SRC =
  "https://maps.google.com/maps?q=Dies%20Bungalov%20Sapanca&ll=40.6620377,30.2999791&z=15&hl=tr&output=embed";

/**
 * Harita etkinleştirilene kadar pointer olaylarını yutar. Aksi halde mobilde
 * parmak iframe'in üstüne denk geldiğinde sayfa kaymak yerine harita pan yapıyor.
 */
export function MapEmbed() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <iframe
        title="DİES Bungalov Sapanca — Google Haritalar konumu"
        src={MAP_SRC}
        className="h-64 w-full border-0 sm:h-72 lg:h-full lg:min-h-[24rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {active ? null : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 flex items-end justify-center bg-surface-dark/10 pb-5 transition hover:bg-surface-dark/20"
        >
          <span className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-surface px-4 py-2.5 text-sm font-bold text-text shadow-[0_10px_28px_rgba(31,26,23,0.18)]">
            <Icon name="MapPin" className="h-4 w-4 text-accent-dark" />
            Haritayı etkinleştir
          </span>
        </button>
      )}
    </div>
  );
}
