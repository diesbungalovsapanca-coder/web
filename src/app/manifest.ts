import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DİES BUNGALOV Sapanca",
    short_name: "DİES BUNGALOV",
    description: "Sapanca’da özel havuzlu, jakuzili ve doğa manzaralı premium bungalov deneyimi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#1f332b",
    lang: "tr-TR",
    id: SITE_URL,
    icons: [
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      }
    ]
  };
}
