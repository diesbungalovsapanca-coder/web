import { notFound } from "next/navigation";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaForm } from "@/components/admin/MediaForm";
import { requireAdmin } from "@/lib/auth";
import { getActiveMedia } from "@/lib/data/media";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
type Params = Promise<{ id: string }>;

export default async function AdminEditMediaPage({
  params,
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  await requireAdmin();
  const [{ id }, allMedia, query] = await Promise.all([params, getActiveMedia(false), searchParams]);
  const item = allMedia.find((media) => media.id === id);
  if (!item) notFound();

  return (
    <AdminShell>
      <AdminNotice ok={query.ok as string | undefined} error={query.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Medya düzenle</h1>
        <p className="mt-2 text-sm text-muted">{item.title}</p>
      </div>
      <AdminCard title="Medya bilgileri">
        <MediaForm item={item} />
      </AdminCard>
    </AdminShell>
  );
}
