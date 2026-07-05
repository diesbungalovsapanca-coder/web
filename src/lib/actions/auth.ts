"use server";

import { redirect } from "next/navigation";
import { loginAdmin, logoutAdmin } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const ok = await loginAdmin(email, password);
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/admin/login");
}
