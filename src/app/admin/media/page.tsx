import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { MediaVisual } from "@/components/common/MediaVisual";
import { archiveMediaAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getActiveMedia } from "@/lib/data/media";
import { getCategoryLabel } from "@/data/categories";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminMediaPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [media, params] = await Promise.all([getActiveMedia(false), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-4xl text-text">Medya Yönetimi</h1>
          <p className="mt-2 text-sm text-muted">Fotoğraf/video, kategori, hero ve öne çıkarma durumlarını yönetin.</p>
        </div>
        <Link href="/admin/media/new" className="rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
          Yeni medya yükle
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {media.map((item) => (
          <AdminCard key={item.id}>
            <div className="h-56 overflow-hidden rounded-lg">
              <MediaVisual media={item} className="h-full" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-bold text-text">{item.title}</p>
              <p className="mt-1 text-xs text-muted">
                {item.type} · {getCategoryLabel(item.category)} · {item.isActive ? "Aktif" : "Pasif"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.isHero ? <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">Hero</span> : null}
                {item.isFeatured ? <span className="rounded-full bg-green-dark px-3 py-1 text-xs font-bold text-white">Öne çıkan</span> : null}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/admin/media/${item.id}`} className="rounded-lg border border-border px-4 py-2 text-sm font-bold text-text">
                  Düzenle
                </Link>
                <form action={archiveMediaAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="rounded-lg border border-border px-4 py-2 text-sm font-bold text-muted">
                    Pasife al
                  </button>
                </form>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>
    </AdminShell>
  );
}
