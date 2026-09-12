"use client";

/**
 * Çerez onayı — tek kaynak.
 *
 * KVKK, GDPR gibi, zorunlu olmayan izleyicilerin onaydan ÖNCE yüklenmemesini
 * ister. Bant gösterilip GA4 arkada çoktan raporluyorsa onay geçerli sayılmaz.
 * Bu yüzden ölçüm script'i `ConsentBanner` içinde, yalnız izin varken render
 * edilir; reddetmek gerçek bir "hiçbir istek gitmez" yoludur.
 */

export const CONSENT_KEY = "dies.consent.v1";

export type ConsentState = "granted" | "denied" | "unset";

/**
 * Çerez bandının görünürlük anahtarı.
 *
 * `false` iken bant hiç çıkmaz VE GA4 hiç yüklenmez -- daha önce "granted"
 * kaydetmiş ziyaretçide bile. Kayıtlı tercih silinmez; bayrak açılınca o
 * ziyaretçiye tekrar sorulmaz.
 *
 * Aynı ada sahip bayrak TuvalSoft'un tüm site repolarında var; hepsini tek
 * aramayla bulmak için `BANT_GORUNSUN` diye ara.
 *
 * AÇMADAN ÖNCE: bu projede çerez politikası sayfası YOK. Bant bir politika
 * sayfasına link vermek zorunda -- önce sayfayı ekle, sonra bayrağı çevir.
 *
 * Tip `boolean` olarak YAZILI: `= false` literal tipi üretir, o zaman
 * TypeScript bayrağa bağlı blokları erişilemez kod sayıp uyarır.
 */
export const BANT_GORUNSUN: boolean = false;

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return "unset";
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unset";
}

export function writeConsent(state: Exclude<ConsentState, "unset">): void {
  window.localStorage.setItem(CONSENT_KEY, state);
}

/**
 * Ölçüm yapılabilir mi? Hem bayrağa hem kayıtlı izne bakar.
 *
 * Bayrak kapalıyken kayıtlı "granted" BİLEREK yok sayılır: "bant hiçbir yerde
 * çıkmasın, hiçbir izleyici yüklenmesin" kuralı, daha önce kabul etmiş
 * ziyaretçilerde delinmesin diye.
 */
export function analyticsAllowed(): boolean {
  return BANT_GORUNSUN && readConsent() === "granted";
}
