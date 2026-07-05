import { redirect } from "next/navigation";
import { loginAction } from "@/lib/actions/auth";
import { isAdminAuthenticated } from "@/lib/auth";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  if (await isAdminAuthenticated()) redirect("/admin/dashboard");
  const params = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-surface-dark px-4">
      <section className="w-full max-w-md rounded-lg bg-surface p-6 shadow-2xl">
        <p className="font-serif text-3xl text-text">DİES Admin</p>
        <p className="mt-2 text-sm leading-6 text-muted">
          İçerik ve medya yönetimi için giriş yapın. Development varsayılanı: admin@dies.local / dies-admin
        </p>
        {params.error ? <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Giriş bilgileri hatalı.</p> : null}
        <form action={loginAction} className="mt-6 grid gap-4">
          <label className="admin-label">
            E-posta
            <input name="email" type="email" className="admin-input" required autoComplete="email" />
          </label>
          <label className="admin-label">
            Şifre
            <input name="password" type="password" className="admin-input" required autoComplete="current-password" />
          </label>
          <button type="submit" className="rounded-lg bg-green-dark px-5 py-3 text-sm font-bold text-white">
            Giriş Yap
          </button>
        </form>
      </section>
    </main>
  );
}
