import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { FaqForm } from "@/components/admin/FaqForm";
import { archiveFaqAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getFaqs } from "@/lib/data/faqs";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminFaqsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [faqs, params] = await Promise.all([getFaqs(false), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">SSS Yönetimi</h1>
        <p className="mt-2 text-sm text-muted">Soru, cevap, kategori, aktif/pasif ve sıralama alanları.</p>
      </div>
      <div className="grid gap-6">
        <AdminCard title="Yeni soru">
          <FaqForm />
        </AdminCard>
        <AdminCard title="Mevcut sorular">
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="grid gap-3">
                <FaqForm item={faq} />
                <form action={archiveFaqAction}>
                  <input type="hidden" name="id" value={faq.id} />
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
