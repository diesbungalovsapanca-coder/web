import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL, lodgingJsonLd, websiteJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";
import { getFeaturedMedia } from "@/lib/data/media";

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
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
  // Sekme ikonu için 2,4 KB'lık 32px varyant kullanılır; 512px sürüm yalnızca
  // manifest (PWA) tarafında kalır — önceden her sayfa açılışında 135 KB iniyordu.
  icons: {
    icon: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    shortcut: [{ url: "/favicon-32.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }]
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [settings, featuredMedia] = await Promise.all([getSiteSettings(), getFeaturedMedia(6)]);
  const schemaImages = featuredMedia
    .filter((item) => item.type === "image")
    .map((item) => item.publicUrl);

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
        <JsonLd data={lodgingJsonLd(settings, schemaImages)} />
        <JsonLd data={websiteJsonLd(settings)} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
