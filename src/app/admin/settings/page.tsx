import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { saveSettingsAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/data/site";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminSettingsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Site Ayarları</h1>
        <p className="mt-2 text-sm text-muted">WhatsApp, Instagram, Google Maps ve SEO temel bilgileri.</p>
      </div>
      <AdminCard title="Ayarlar">
        <form action={saveSettingsAction} className="grid gap-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="admin-label">
              WhatsApp telefonu
              <input name="whatsappPhone" defaultValue={settings.contact.whatsappPhone} className="admin-input" required />
            </label>
            <label className="admin-label">
              Telefon
              <input name="phone" defaultValue={settings.contact.phone} className="admin-input" />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="admin-label">
              Instagram URL
              <input name="instagramUrl" defaultValue={settings.contact.instagramUrl} className="admin-input" required />
            </label>
            <label className="admin-label">
              Google Maps URL
              <input name="mapsUrl" defaultValue={settings.contact.mapsUrl} className="admin-input" />
            </label>
          </div>
          <label className="admin-label">
            E-posta
            <input name="email" defaultValue={settings.contact.email} className="admin-input" />
          </label>
          <label className="admin-label">
            SEO başlık
            <input name="seoTitle" defaultValue={settings.seo.title} className="admin-input" required />
          </label>
          <label className="admin-label">
            SEO açıklama
            <textarea name="seoDescription" defaultValue={settings.seo.description} className="admin-input min-h-28" required />
          </label>
          <label className="admin-label">
            Hero başlık
            <input name="heroTitle" defaultValue={settings.hero.title} className="admin-input" required />
          </label>
          <label className="admin-label">
            Hero alt metin
            <textarea name="heroSubtitle" defaultValue={settings.hero.subtitle} className="admin-input min-h-24" required />
          </label>
          <label className="admin-label">
            Lokasyon metni
            <textarea name="locationBody" defaultValue={settings.content.locationBody} className="admin-input min-h-28" required />
          </label>
          <button type="submit" className="w-fit rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
            Kaydet
          </button>
        </form>
      </AdminCard>
    </AdminShell>
  );
}
