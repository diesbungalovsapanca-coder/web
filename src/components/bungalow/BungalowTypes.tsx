"use client";

import { useState, useSyncExternalStore } from "react";
import { buttonClassName } from "@/components/common/AppButton";
import { Icon } from "@/components/common/Icon";
import { TrackedLink } from "@/components/common/TrackedLink";
import { createWhatsappUrl } from "@/lib/whatsapp";

const bungalowTypes = [
  { name: "Suit", video: "/videolar/Suit.mp4", poster: "/videolar/Suit-poster.jpg" },
  { name: "Deluxe", video: "/videolar/Deluxe.mp4", poster: "/videolar/Deluxe-poster.jpg" },
  { name: "Woodlux", video: "/videolar/woodlux.mp4", poster: "/videolar/woodlux-poster.jpg" }
] as const;

function getCurrentDate() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");
}

function subscribeToDateChange(onStoreChange: () => void) {
  const interval = window.setInterval(onStoreChange, 60_000);
  return () => window.clearInterval(interval);
}

function addOneDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const nextDay = new Date(year, month - 1, day + 1);

  return [
    nextDay.getFullYear(),
    String(nextDay.getMonth() + 1).padStart(2, "0"),
    String(nextDay.getDate()).padStart(2, "0")
  ].join("-");
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function createAvailabilityMessage(type: string, checkIn: string, checkOut: string) {
  const dateRange = `${formatDate(checkIn)} - ${formatDate(checkOut)}`;

  return `Merhaba, web siteniz üzerinden size ulaşıyorum. ${type} tipi bungalovunuz için ${dateRange} tarih aralığındaki müsaitliği öğrenebilir miyim?`;
}

export function BungalowTypes({ whatsappPhone }: { whatsappPhone: string }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const minimumDate = useSyncExternalStore(subscribeToDateChange, getCurrentDate, () => "");
  const hasDateRange = Boolean(checkIn && checkOut && checkOut > checkIn);
  const minimumCheckOut = checkIn ? addOneDay(checkIn) : minimumDate;

  function handleCheckInChange(value: string) {
    setCheckIn(value);

    if (checkOut && checkOut <= value) {
      setCheckOut("");
    }
  }

  return (
    <section id="bungalov-tipleri" className="scroll-mt-28" aria-labelledby="bungalov-tipleri-baslik">
      <div className="mx-auto max-w-3xl text-center">
        <h2 id="bungalov-tipleri-baslik" className="font-serif text-4xl leading-tight text-text sm:text-5xl">
          Bungalov Tipleri
        </h2>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-4 shadow-[0_18px_50px_rgba(47,58,43,0.08)] sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-[minmax(13rem,0.8fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <div className="flex items-center gap-3 sm:col-span-2 md:col-span-1 md:self-center">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
              <Icon name="CalendarCheck" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-text">Konaklama tarihinizi seçin</h3>
              <p className="mt-0.5 text-xs text-muted">Üç bungalov tipi için ortak tarih</p>
            </div>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-text">
            Giriş tarihi
            <input
              type="date"
              value={checkIn}
              min={minimumDate}
              onChange={(event) => handleCheckInChange(event.target.value)}
              className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-text">
            Çıkış tarihi
            <input
              type="date"
              value={checkOut}
              min={minimumCheckOut}
              disabled={!checkIn}
              onChange={(event) => setCheckOut(event.target.value)}
              className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-55"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {hasDateRange
            ? `${formatDate(checkIn)} giriş — ${formatDate(checkOut)} çıkış`
            : "WhatsApp butonlarını kullanmak için giriş ve çıkış tarihlerini seçin."}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {bungalowTypes.map((bungalow) => {
          const message = hasDateRange ? createAvailabilityMessage(bungalow.name, checkIn, checkOut) : "";

          return (
            <article
              key={bungalow.name}
              className="overflow-hidden rounded-lg border border-border bg-surface shadow-[0_18px_48px_rgba(31,26,23,0.08)]"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-surface-dark">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={bungalow.poster}
                  className="h-full w-full object-cover"
                  aria-label={`${bungalow.name} Bungalov tanıtım videosu`}
                >
                  <source src={bungalow.video} type="video/mp4" />
                  Tarayıcınız video oynatmayı desteklemiyor.
                </video>
                <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-surface-dark/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md">
                  {bungalow.name} Bungalov
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-serif text-3xl font-semibold text-text">{bungalow.name} Bungalov</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Videoyu izleyin, seçtiğiniz tarihler için müsaitlik bilgisini doğrudan alın.
                </p>

                {hasDateRange ? (
                  <TrackedLink
                    href={createWhatsappUrl(whatsappPhone, message)}
                    event="whatsapp_click_contact"
                    params={{ bungalow_type: bungalow.name, check_in: checkIn, check_out: checkOut }}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonClassName("whatsapp", "mt-5 w-full")}
                    aria-label={`${bungalow.name} Bungalov için WhatsApp'tan müsaitlik sor`}
                  >
                    <Icon name="MessageCircle" className="h-5 w-5" />
                    Müsaitlik Sor
                  </TrackedLink>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={buttonClassName("whatsapp", "mt-5 w-full cursor-not-allowed")}
                    title="Önce giriş ve çıkış tarihlerini seçin"
                  >
                    <Icon name="MessageCircle" className="h-5 w-5" />
                    Müsaitlik Sor
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
