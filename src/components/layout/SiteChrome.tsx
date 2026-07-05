"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyWhatsapp } from "@/components/layout/StickyWhatsapp";
import type { SiteSettings } from "@/types/site";
import type { ReactNode } from "react";

export function SiteChrome({ settings, children }: { settings: SiteSettings; children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <StickyWhatsapp settings={settings} />
    </>
  );
}
