"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/bungalov", label: "Bungalov" },
  { href: "/galeri", label: "Galeri" },
  { href: "/deneyimler", label: "Deneyimler" },
  { href: "/konum", label: "Konum" },
  { href: "/sss", label: "SSS" }
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-surface-dark/55 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex min-w-0 items-center gap-3 leading-none" aria-label="DİES BUNGALOV ana sayfa">
          <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-white/24">
            <Image
              src={settings.brand.logoUrl}
              alt={`${settings.brand.name} logo`}
              width={96}
              height={96}
              priority
              sizes="48px"
              className="h-full w-full rounded-full object-contain"
            />
          </span>
          <span className="grid min-w-0 leading-none">
            <span className="font-serif text-2xl font-semibold tracking-normal">DİES</span>
            <span className="text-[0.68rem] font-bold uppercase tracking-normal text-white/70">Bungalov Sapanca</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-white/82 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click_hero"
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("primary", "min-h-10 px-4 py-2")}
          >
            <Icon name="MessageCircle" className="h-4 w-4" />
            Müsaitlik Sor
          </TrackedLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
        >
          <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-white/10 bg-surface-dark/94 transition-[grid-template-rows] lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="grid gap-1 px-4 py-5" aria-label="Mobil menü">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold text-white/88 hover:bg-white/8"
              >
                {item.label}
              </Link>
            ))}
            <TrackedLink
              href={whatsappUrl}
              event="whatsapp_click_hero"
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("primary", "mt-3 w-full")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              WhatsApp’tan Müsaitlik Sor
            </TrackedLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
