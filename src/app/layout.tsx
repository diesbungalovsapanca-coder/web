import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/app/globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { JsonLd } from "@/components/common/JsonLd";
import { SITE_URL, lodgingJsonLd } from "@/lib/seo";
import { getSiteSettings } from "@/lib/data/site";
import { getFeaturedMedia } from "@/lib/data/media";
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
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: BRAND_LOGO_URL, type: "image/jpeg" }],
    apple: [{ url: BRAND_LOGO_URL, type: "image/jpeg" }]
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
        <GoogleAnalytics />
      </body>
    </html>
  );
}
