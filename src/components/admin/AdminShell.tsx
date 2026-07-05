import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "@/lib/actions/auth";
import { Icon } from "@/components/common/Icon";
import { BRAND_LOGO_URL } from "@/data/brand";

const adminLinks = [
  ["/admin/dashboard", "Dashboard"],
  ["/admin/media", "Medya"],
  ["/admin/pages", "Sayfa Metinleri"],
  ["/admin/features", "Özellikler"],
  ["/admin/faqs", "SSS"],
  ["/admin/testimonials", "Yorumlar"],
  ["/admin/settings", "Ayarlar"]
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-text">
      <aside className="fixed bottom-0 left-0 top-0 hidden w-72 border-r border-border bg-surface p-5 lg:block">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-3 leading-none">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-border">
            <Image
              src={BRAND_LOGO_URL}
              alt="DİES BUNGALOV logo"
              width={112}
              height={112}
              sizes="56px"
              className="h-full w-full rounded-full object-contain"
            />
          </span>
          <span className="grid leading-none">
            <span className="font-serif text-3xl text-text">DİES</span>
            <span className="text-xs font-bold uppercase tracking-normal text-muted">Admin Panel</span>
          </span>
        </Link>
        <nav className="mt-10 grid gap-2">
          {adminLinks.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-lg px-4 py-3 text-sm font-bold text-muted transition hover:bg-background hover:text-text">
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border bg-background/86 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-accent-dark">
              Siteyi görüntüle
              <Icon name="Play" className="h-4 w-4" />
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-bold text-muted">
                Çıkış
              </button>
            </form>
          </div>
          <nav className="flex gap-2 overflow-x-auto border-t border-border px-4 py-3 lg:hidden">
            {adminLinks.map(([href, label]) => (
              <Link key={href} href={href} className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-sm font-bold text-muted">
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
