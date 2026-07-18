import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const cookieName = "dies_admin_session";
const sessionMaxAgeSeconds = 60 * 60 * 12;
const sessionMaxAgeMs = sessionMaxAgeSeconds * 1000;

function adminEmail() {
  return process.env.ADMIN_EMAIL || (process.env.NODE_ENV !== "production" ? "admin@dies.local" : "");
}

function adminPassword() {
  return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "dies-admin" : "");
}

function sessionSecret() {
  const configuredSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configuredSecret) return configuredSecret;
  return process.env.NODE_ENV !== "production" ? "dies-dev-session-secret" : "";
}

function sign(value: string) {
  const secret = sessionSecret();
  if (!secret) return null;
  return createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  return aBuffer.length === bBuffer.length && timingSafeEqual(aBuffer, bBuffer);
}

export function canUseAdminLogin() {
  const secret = sessionSecret();
  const hasStrongProductionSecret = process.env.NODE_ENV !== "production" || secret.length >= 32;
  return Boolean(adminEmail() && adminPassword() && secret && hasStrongProductionSecret);
}

export async function loginAdmin(email: string, password: string) {
  const expectedEmail = adminEmail();
  const expectedPassword = adminPassword();
  if (!canUseAdminLogin()) return false;

  const validEmail = safeEqual(email, expectedEmail);
  const validPassword = safeEqual(password, expectedPassword);
  if (!validEmail || !validPassword) return false;

  const tokenPayload = `${expectedEmail}:${Date.now()}`;
  const signature = sign(tokenPayload);
  if (!signature) return false;
  const token = `${tokenPayload}:${signature}`;
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAgeSeconds
  });
  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function isAdminAuthenticated() {
  if (!canUseAdminLogin()) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;
  const [email, issuedAtValue, signature] = parts;
  const issuedAt = Number(issuedAtValue);
  const age = Date.now() - issuedAt;

  if (!safeEqual(email, adminEmail())) return false;
  if (!Number.isFinite(issuedAt) || age < 0 || age > sessionMaxAgeMs) return false;

  const payload = `${email}:${issuedAtValue}`;
  const expectedSignature = sign(payload);
  return expectedSignature ? safeEqual(expectedSignature, signature) : false;
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) redirect("/admin/login");
}
