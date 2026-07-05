import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "dies_admin_session";

function adminEmail() {
  return process.env.ADMIN_EMAIL || (process.env.NODE_ENV !== "production" ? "admin@dies.local" : "");
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "dies-admin" : "");
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "dies-dev-session-secret";
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function canUseAdminLogin() {
  return Boolean(adminEmail() && adminPassword());
}

export async function loginAdmin(email: string, password: string) {
  const expectedEmail = adminEmail();
  const expectedPassword = adminPassword();
  if (!expectedEmail || !expectedPassword) return false;

  const validEmail = safeEqual(email, expectedEmail);
  const validPassword = safeEqual(password, expectedPassword);
  if (!validEmail || !validPassword) return false;

  const tokenPayload = `${expectedEmail}:${Date.now()}`;
  const token = `${tokenPayload}:${sign(tokenPayload)}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}:${parts[1]}`;
  const signature = parts[2];
  return safeEqual(sign(payload), signature);
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin/login");
}
