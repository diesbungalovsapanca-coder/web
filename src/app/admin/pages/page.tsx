import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { savePagesAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data/site";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminPagesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Sayfa Metinleri</h1>
        <p className="mt-2 text-sm text-muted">Ana sayfa, CTA, güven kutusu ve rezervasyon adımları.</p>
      </div>
      <AdminCard title="İçerik">
        <form action={savePagesAction} className="grid gap-5">
          <label className="admin-label">
            Hero başlık
            <input name="heroTitle" defaultValue={settings.hero.title} className="admin-input" required />
          </label>
          <label className="admin-label">
            Hero alt metin
            <textarea name="heroSubtitle" defaultValue={settings.hero.subtitle} className="admin-input min-h-24" required />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="admin-label">
              Hero CTA
              <input name="heroPrimaryCta" defaultValue={settings.hero.primaryCta} className="admin-input" />
            </label>
            <label className="admin-label">
              İkincil CTA
              <input name="heroSecondaryCta" defaultValue={settings.hero.secondaryCta} className="admin-input" />
            </label>
          </div>
          <label className="admin-label">
            Hero rozetleri
            <textarea name="heroBadges" defaultValue={settings.hero.badges.join("\n")} className="admin-input min-h-28" />
            <span className="admin-help">Her satıra bir rozet yazın.</span>
          </label>
          <label className="admin-label">
            Deneyim başlığı
            <input name="experienceTitle" defaultValue={settings.content.experienceTitle} className="admin-input" />
          </label>
          <label className="admin-label">
            Deneyim metni
            <textarea name="experienceBody" defaultValue={settings.content.experienceBody} className="admin-input min-h-28" />
          </label>
          <label className="admin-label">
            Güvenli rezervasyon başlığı
            <input name="trustReservationTitle" defaultValue={settings.content.trustReservationTitle} className="admin-input" />
          </label>
          <label className="admin-label">
            Güvenli rezervasyon metni
            <textarea name="trustReservationBody" defaultValue={settings.content.trustReservationBody} className="admin-input min-h-28" />
          </label>
          <label className="admin-label">
            Güven maddeleri
            <textarea name="secureBullets" defaultValue={settings.reservation.secureBullets.join("\n")} className="admin-input min-h-36" />
          </label>
          <label className="admin-label">
            Rezervasyon adımları
            <textarea name="reservationSteps" defaultValue={settings.reservation.steps.join("\n")} className="admin-input min-h-36" />
          </label>
          <label className="admin-label">
            Final CTA başlığı
            <input name="finalCtaTitle" defaultValue={settings.content.finalCtaTitle} className="admin-input" />
          </label>
          <label className="admin-label">
            Final CTA metni
            <textarea name="finalCtaBody" defaultValue={settings.content.finalCtaBody} className="admin-input min-h-28" />
          </label>
          <label className="admin-label">
            Lokasyon metni
            <textarea name="locationBody" defaultValue={settings.content.locationBody} className="admin-input min-h-28" />
          </label>
          <button type="submit" className="w-fit rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
            Kaydet
          </button>
        </form>
      </AdminCard>
    </AdminShell>
  );
}
