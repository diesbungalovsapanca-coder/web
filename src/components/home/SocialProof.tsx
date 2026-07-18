import { Container } from "@/components/common/Container";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { getInstagramAnalyticsParams, getInstagramHandle } from "@/lib/instagram";
import type { SiteSettings } from "@/types/site";

export function SocialProof({ settings }: { settings: SiteSettings }) {
  const instagramHandle = getInstagramHandle(settings.contact.instagramUrl);
  return (
    <section className="bg-background py-16">
      <Container>
        <div className="flex flex-col gap-5 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-accent-dark">
              Instagram{instagramHandle ? ` · ${instagramHandle}` : ""}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-text">Güncel atmosfer ve medya arşivi Instagram’da</h2>
          </div>
          <TrackedLink
            href={settings.contact.instagramUrl}
            event="instagram_click"
            params={getInstagramAnalyticsParams(settings.contact.instagramUrl, "home_social_proof")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white"
          >
            <Icon name="Instagram" className="h-5 w-5 text-accent" />
            Instagram’ı Aç
          </TrackedLink>
        </div>
      </Container>
    </section>
  );
}
