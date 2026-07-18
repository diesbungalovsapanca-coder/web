import type { Metadata } from "next";
import { Container } from "@/components/common/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata, mediaJsonLd } from "@/lib/seo";
import { getActiveMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Galeri",
    description: "DİES BUNGALOV Sapanca fotoğraf galerisi. Özel havuz, jakuzi, dış alan, gece atmosferi ve detayları inceleyin.",
    path: "/galeri"
  });
}

export default async function GalleryPage() {
  const [settings, media] = await Promise.all([getSiteSettings(), getActiveMedia()]);
  const galleryMedia = media.filter((item) => item.type === "image");

  return (
    <section className="bg-background pb-20 pt-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Galeri", path: "/galeri" }
        ])}
      />
      <JsonLd data={mediaJsonLd(galleryMedia, { maxItems: 40 })} />
      <Container>
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Galeri</p>
          <h1 className="font-serif text-5xl leading-tight text-text">DİES BUNGALOV fotoğraf arşivi</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Instagram’dan gelen gerçek fotoğraflar, kategorilere ayrılmış ve mobilde hızlı incelenebilir bir galeriye dönüştürüldü.
          </p>
        </div>
        <GalleryGrid media={galleryMedia} settings={settings} />
      </Container>
    </section>
  );
}
