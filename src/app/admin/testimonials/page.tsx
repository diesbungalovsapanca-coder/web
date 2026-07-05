import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { archiveTestimonialAction } from "@/lib/actions/admin";
import { requireAdmin } from "@/lib/auth";
import { getTestimonials } from "@/lib/data/testimonials";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminTestimonialsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [testimonials, params] = await Promise.all([getTestimonials(false), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Misafir Yorumları</h1>
        <p className="mt-2 text-sm text-muted">Gerçek yorum yoksa public bölüm otomatik gizlenir.</p>
      </div>
      <div className="grid gap-6">
        <AdminCard title="Yeni yorum">
          <TestimonialForm />
        </AdminCard>
        <AdminCard title="Mevcut yorumlar">
          {testimonials.length === 0 ? <p className="text-sm text-muted">Henüz yorum yok.</p> : null}
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="grid gap-3">
                <TestimonialForm item={testimonial} />
                <form action={archiveTestimonialAction}>
                  <input type="hidden" name="id" value={testimonial.id} />
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
