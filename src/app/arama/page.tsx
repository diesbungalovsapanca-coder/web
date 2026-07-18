import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { JsonLd } from "@/components/common/JsonLd";
import { breadcrumbJsonLd, createPageMetadata } from "@/lib/seo";
import { getFaqs } from "@/lib/data/faqs";
import { getFeatures } from "@/lib/data/features";
import { getActiveMedia } from "@/lib/data/media";
import { getSiteSettings } from "@/lib/data/site";

type SearchPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type SearchEntry = {
  title: string;
  body: string;
  href: string;
  type: string;
};

function paramValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(entry: SearchEntry, query: string) {
  const haystack = normalizeSearch(`${entry.title} ${entry.body} ${entry.type}`);
  return normalizeSearch(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return createPageMetadata(settings, {
    title: "Site İçi Arama",
    description: "DİES BUNGALOV Sapanca sayfaları, SSS yanıtları, özellikleri ve galeri başlıkları içinde arama yapın.",
    path: "/arama"
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = (paramValue(params.q) || paramValue(params.query) || "").trim();
  const [faqs, features, media] = await Promise.all([getFaqs(), getFeatures(), getActiveMedia()]);

  const entries: SearchEntry[] = [
    {
      title: "Bungalov Detayları",
      body: "Özel havuz, jakuzi, ateş çukuru, barbekü, iç mekan, dış alan, otopark ve kış konforu bilgileri.",
      href: "/bungalov",
      type: "Sayfa"
    },
    {
      title: "Galeri",
      body: "DİES BUNGALOV Sapanca fotoğraf ve video arşivi.",
      href: "/galeri",
      type: "Sayfa"
    },
    {
      title: "Konum",
      body: "Sapanca, Sakarya konum, ulaşım, otopark ve yakın çevre bilgileri.",
      href: "/konum",
      type: "Sayfa"
    },
    {
      title: "İletişim",
      body: "WhatsApp, Instagram, rezervasyon akışı ve güvenli iletişim bilgileri.",
      href: "/iletisim",
      type: "Sayfa"
    },
    ...faqs.map((faq) => ({
      title: faq.question,
      body: faq.answer,
      href: "/sss",
      type: "SSS"
    })),
    ...features.map((feature) => ({
      title: feature.title,
      body: feature.description,
      href: "/bungalov",
      type: "Özellik"
    })),
    ...media.slice(0, 40).map((item) => ({
      title: item.title,
      body: item.alt || item.description || item.title,
      href: "/galeri",
      type: item.type === "video" ? "Video" : "Fotoğraf"
    }))
  ];

  const results = query ? entries.filter((entry) => matchesQuery(entry, query)) : entries.slice(0, 8);

  return (
    <section className="bg-background pb-20 pt-32">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana Sayfa", path: "/" },
          { name: "Site İçi Arama", path: "/arama" }
        ])}
      />
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-normal text-accent-dark">Arama</p>
          <h1 className="font-serif text-5xl leading-tight text-text">DİES BUNGALOV içinde arama</h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            Sayfalar, sık sorulan sorular, özellikler ve galeri başlıkları içinde arama yapabilirsiniz.
          </p>
        </div>

        <form action="/arama" className="mt-10 flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row">
          <label className="sr-only" htmlFor="site-search">
            Site içinde ara
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Örn. havuz, kahvaltı, WiFi"
            className="min-h-12 flex-1 rounded-lg border border-border bg-background px-4 text-base text-text outline-none transition focus:border-accent"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-text"
          >
            <Icon name="Search" className="h-4 w-4" />
            Ara
          </button>
        </form>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {results.map((entry, index) => (
            <Link
              key={`${entry.href}-${entry.title}-${index}`}
              href={entry.href}
              className="rounded-lg border border-border bg-surface p-5 transition hover:border-accent"
            >
              <p className="text-xs font-bold uppercase tracking-normal text-accent-dark">{entry.type}</p>
              <h2 className="mt-2 text-xl font-bold text-text">{entry.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted">{entry.body}</p>
            </Link>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-10 rounded-lg border border-border bg-surface p-8">
            <h2 className="font-serif text-3xl text-text">Sonuç bulunamadı</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Farklı bir kelimeyle tekrar arayabilir veya rezervasyon detayları için iletişim sayfasına geçebilirsiniz.
            </p>
            <Link
              href="/iletisim"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-text"
            >
              <Icon name="MessageCircle" className="h-4 w-4" />
              İletişime geç
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
