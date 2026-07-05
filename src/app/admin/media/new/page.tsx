import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaForm } from "@/components/admin/MediaForm";
import { requireAdmin } from "@/lib/auth";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminNewMediaPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Yeni medya</h1>
        <p className="mt-2 text-sm text-muted">Supabase Storage varsa bucket’a yüklenir; yoksa local public/media/raw kullanılır.</p>
      </div>
      <AdminCard title="Medya bilgileri">
        <MediaForm />
      </AdminCard>
    </AdminShell>
  );
}
