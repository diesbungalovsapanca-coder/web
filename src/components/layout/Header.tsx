"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { buttonClassName } from "@/components/common/AppButton";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { getInstagramAnalyticsParams, getInstagramHandle } from "@/lib/instagram";
import { whatsappMessages } from "@/data/whatsapp";
import type { SiteSettings } from "@/types/site";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/bungalov", label: "Bungalov Tipleri" },
  { href: "/galeri", label: "Galeri" },
  { href: "/deneyimler", label: "Deneyimler" },
  { href: "/konum", label: "Konum" },
  { href: "/sss", label: "SSS" }
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const whatsappUrl = createWhatsappUrl(settings.contact.whatsappPhone, whatsappMessages.hero);
  const instagramHandle = getInstagramHandle(settings.contact.instagramUrl) ?? "Instagram";

  // Menü açıkken arka planın kaymaması ve Escape ile kapanması için.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-surface-dark/70 text-white backdrop-blur-md lg:bg-surface-dark/55 lg:backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="inline-flex min-w-0 items-center gap-3 leading-none" aria-label="DİES BUNGALOV ana sayfa">
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-white/24 lg:h-12 lg:w-12">
            <Image
              src={settings.brand.logoUrl}
              alt={`${settings.brand.name} logo`}
              width={96}
              height={96}
              priority
              sizes="(min-width: 1024px) 48px, 40px"
              className="h-full w-full rounded-full object-contain"
            />
          </span>
          <span className="grid min-w-0 leading-none">
            <span className="font-serif text-xl font-semibold tracking-normal lg:text-2xl">DİES</span>
            <span className="text-[0.68rem] font-bold uppercase tracking-normal text-white/70">Bungalov Sapanca</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:gap-7 lg:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-semibold text-white/82 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <TrackedLink
            href={whatsappUrl}
            event="whatsapp_click_hero"
            params={{ cta_location: "header_desktop" }}
            target="_blank"
            rel="noreferrer"
            className={buttonClassName("whatsapp", "min-h-10 px-3 py-2 xl:px-4")}
          >
            <Icon name="MessageCircle" className="h-4 w-4" />
            Müsaitlik Sor
          </TrackedLink>
          <TrackedLink
            href={settings.contact.instagramUrl}
            event="instagram_click"
            params={getInstagramAnalyticsParams(settings.contact.instagramUrl, "header_desktop")}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram'da ${instagramHandle} hesabını aç`}
            className={buttonClassName("secondary", "min-h-10 px-2.5 py-2 text-xs xl:px-4 xl:text-sm")}
          >
            <Icon name="Instagram" className="h-4 w-4" />
            {instagramHandle}
          </TrackedLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 lg:hidden"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="mobil-menu"
        >
          <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
        </button>
      </div>

      {/* 0fr↔1fr açılımında `overflow-hidden` grid ÖĞESİNDE olmalı; kapsayıcıda
          olduğu sürece 1fr max-content'e çözülmüyor ve panel 1px'te kalıyordu. */}
      <div
        id="mobil-menu"
        className={cn(
          "grid border-t border-white/10 bg-surface-dark/94 transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <nav
            className="grid gap-1 overflow-y-auto overscroll-contain px-4 py-5 [max-height:calc(100svh-4rem)]"
            aria-label="Mobil menü"
          >
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
              params={{ cta_location: "header_mobile" }}
              target="_blank"
              rel="noreferrer"
              className={buttonClassName("whatsapp", "mt-3 w-full")}
            >
              <Icon name="MessageCircle" className="h-5 w-5" />
              WhatsApp’tan Müsaitlik Sor
            </TrackedLink>
            <TrackedLink
              href={settings.contact.instagramUrl}
              event="instagram_click"
              params={getInstagramAnalyticsParams(settings.contact.instagramUrl, "header_mobile")}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram'da ${instagramHandle} hesabını aç`}
              className={buttonClassName("secondary", "mt-2 w-full")}
            >
              <Icon name="Instagram" className="h-5 w-5" />
              {instagramHandle}
            </TrackedLink>
          </nav>
        </div>
      </div>

      {open ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Menüyü kapat"
          className="fixed inset-x-0 bottom-0 top-16 -z-10 bg-surface-dark/45 lg:hidden"
        />
      ) : null}
    </header>
  );
}
