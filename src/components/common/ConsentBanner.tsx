"use client";

import { useCallback, useSyncExternalStore } from "react";
import { buttonClassName } from "@/components/common/AppButton";
import { GoogleAnalytics } from "@/components/common/GoogleAnalytics";
import { BANT_GORUNSUN, readConsent, writeConsent, type ConsentState } from "@/lib/consent";

/**
 * Çerez onayı + kapıya alınmış GA4 yükleyici.
 *
 * GA4 yalnız izin verilmişken render edilir. Reddetmek, Google'a hiçbir istek
 * gitmemesi demek -- etiketi yükleyip sonra "denied" bayrağı set etmek yine
 * veri gönderir, bu yüzden o yol seçilmedi.
 *
 * Reddet ve Kabul düğmeleri eşit ağırlıkta; bulması zor bir reddetme yolu
 * geçerli onay sayılmaz.
 */

/**
 * localStorage harici bir sistem, bu yüzden effect + setState yerine
 * useSyncExternalStore ile okunuyor: mount'ta setState'in tetiklediği ikinci
 * render'ı ve bandın bir an görünüp kaybolmasını önler.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Ziyaretçi başka sekmede karar verirse burası da güncellensin.
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function emitChange() {
  for (const listener of listeners) listener();
}

/** Sunucuda localStorage yok; "unset" dönmek hydration sırasında bandı bir an
 *  gösterirdi. null dönüp bandı yalnız istemcide render ediyoruz. */
const getServerSnapshot = (): ConsentState | null => null;

export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);

  const decide = useCallback((next: "granted" | "denied") => {
    writeConsent(next);
    emitChange();
  }, []);

  // null yalnızca SSR/ilk boyamada -- karar vermiş ziyaretçide bant parlamasın.
  if (consent === null) return null;

  return (
    <>
      {BANT_GORUNSUN && consent === "granted" ? <GoogleAnalytics /> : null}

      {BANT_GORUNSUN && consent === "unset" ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cerez-basligi"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/98 backdrop-blur-md"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p id="cerez-basligi" className="mb-1 font-semibold text-text">
                Çerez tercihiniz
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Sitenin çalışması için gerekli çerezleri kullanıyoruz. İsterseniz siteyi
                nasıl kullandığınızı anlamamıza yardımcı olan ölçümleme çerezlerine de
                izin verebilirsiniz. Reddederseniz ölçümleme araçları hiç yüklenmez.
                {/* BAYRAK AÇILMADAN ÖNCE: çerez politikası sayfası eklenip buraya
                    link verilmeli. Şu an böyle bir sayfa yok, ölü link bırakmamak
                    için link de konulmadı. */}
              </p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              <button
                type="button"
                className={buttonClassName("ghost")}
                onClick={() => decide("denied")}
              >
                Reddet
              </button>
              <button
                type="button"
                className={buttonClassName("primary")}
                onClick={() => decide("granted")}
              >
                Kabul et
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
