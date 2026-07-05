import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminNotice } from "@/components/admin/AdminNotice";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/auth";
import { seedDefaultsToLocalAction } from "@/lib/actions/admin";
import { getDashboardStats } from "@/lib/data/queries";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const quickLinks = [
  ["/", "Siteyi görüntüle"],
  ["/admin/media/new", "Medya ekle"],
  ["/admin/faqs", "SSS düzenle"],
  ["/admin/settings", "Site ayarları"]
];

export default async function AdminDashboardPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const [stats, params] = await Promise.all([getDashboardStats(), searchParams]);

  return (
    <AdminShell>
      <AdminNotice ok={params.ok as string | undefined} error={params.error as string | undefined} />
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-text">Dashboard</h1>
        <p className="mt-2 text-sm text-muted">Medya, içerik ve güven bilgileri için hızlı durum özeti.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Toplam medya", stats.totalMedia],
          ["Aktif medya", stats.activeMedia],
          ["Aktif SSS", stats.activeFaqs],
          ["Aktif özellik", stats.activeFeatures],
          ["Aktif yorum", stats.activeTestimonials],
          ["Hero medya", stats.hasHeroMedia ? "Seçili" : "Yok"],
          ["WhatsApp", stats.hasWhatsapp ? "Tanımlı" : "Placeholder"],
          ["Admin veri", "Hazır"]
        ].map(([label, value]) => (
          <AdminCard key={label as string}>
            <p className="text-sm font-bold text-muted">{label}</p>
            <p className="mt-3 text-3xl font-bold text-text">{value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <AdminCard title="Hızlı linkler">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-bold text-text">
                {label}
              </Link>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Yerel fallback seed" description="Supabase env yokken admin kayıtları .local-data/dies-content.json dosyasında tutulur.">
          <form action={seedDefaultsToLocalAction}>
            <button type="submit" className="rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
              Yerel seed dosyasını hazırla
            </button>
          </form>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
