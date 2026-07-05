import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { lodgingJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";
import { BRAND_LOGO_URL } from "@/data/brand";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans"
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: BRAND_LOGO_URL, type: "image/jpeg" }],
    apple: [{ url: BRAND_LOGO_URL, type: "image/jpeg" }]
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="tr"
      className={`${inter.variable} ${cormorantGaramond.variable}`}
      style={
        {
          "--font-sans": inter.style.fontFamily,
          "--font-serif": cormorantGaramond.style.fontFamily
        } as CSSProperties
      }
    >
      <body>
        <SiteChrome settings={settings}>{children}</SiteChrome>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd(settings)) }}
        />
      </body>
    </html>
  );
}
