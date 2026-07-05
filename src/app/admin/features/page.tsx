import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { FeatureForm } from "@/components/admin/FeatureForm";
import { archiveFeatureAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getFeatures } from "@/lib/data/features";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminFeaturesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [features, params] = await Promise.all([getFeatures(false), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Özellikler</h1>
        <p className="mt-2 text-sm text-muted">Özellik ekleme, ikon seçimi, aktif/pasif ve sıralama yönetimi.</p>
      </div>
      <div className="grid gap-6">
        <AdminCard title="Yeni özellik">
          <FeatureForm />
        </AdminCard>
        <AdminCard title="Mevcut özellikler">
          <div className="grid gap-4">
            {features.map((feature) => (
              <div key={feature.id} className="grid gap-3">
                <FeatureForm item={feature} />
                <form action={archiveFeatureAction}>
                  <input type="hidden" name="id" value={feature.id} />
                  <button type="submit" className="text-sm font-bold text-muted">
                    Pasife al
                  </button>
                </form>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
