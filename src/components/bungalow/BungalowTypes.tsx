"use client";

import type { MouseEvent } from "react";
import { useState, useSyncExternalStore } from "react";
import { buttonClassName } from "@/components/common/AppButton";
import { BungalowVideo } from "@/components/bungalow/BungalowVideo";
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
  if (!checkIn || !checkOut) {
    return `Merhaba, web siteniz üzerinden size ulaşıyorum. ${type} tipi bungalovunuz için müsaitlik ve fiyat bilgisi alabilir miyim?`;
  }

  const dateRange = `${formatDate(checkIn)} - ${formatDate(checkOut)}`;

  return `Merhaba, web siteniz üzerinden size ulaşıyorum. ${type} tipi bungalovunuz için ${dateRange} tarih aralığındaki müsaitliği öğrenebilir miyim?`;
}

function openDatePicker(event: MouseEvent<HTMLInputElement>) {
  const input = event.currentTarget;

  if (!input.disabled && typeof input.showPicker === "function") {
    input.showPicker();
  }
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
    <div>
      <div className="rounded-lg border border-border bg-surface p-4 shadow-[0_18px_50px_rgba(47,58,43,0.08)]">
        <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] sm:items-end">
          <div className="flex min-w-0 items-center gap-3 sm:mb-2.5 sm:pr-2">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-dark text-white">
              <Icon name="CalendarCheck" className="h-4 w-4" />
            </span>
            <p className="text-sm font-bold text-text">
              Tarihinizi ekleyin
              <span className="ml-1.5 font-semibold text-muted">(isteğe bağlı)</span>
            </p>
          </div>

          <label className="grid min-w-0 gap-1.5 text-xs font-bold text-muted">
            Giriş tarihi
            <input
              type="date"
              value={checkIn}
              min={minimumDate}
              onClick={openDatePicker}
              onChange={(event) => handleCheckInChange(event.target.value)}
              className="date-field min-h-12 w-full min-w-0 max-w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-4 text-sm text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <label className="grid min-w-0 gap-1.5 text-xs font-bold text-muted">
            Çıkış tarihi
            <input
              type="date"
              value={checkOut}
              min={minimumCheckOut}
              onClick={openDatePicker}
              onChange={(event) => setCheckOut(event.target.value)}
              className="date-field min-h-12 w-full min-w-0 max-w-full cursor-pointer appearance-none rounded-lg border border-border bg-background px-4 text-sm text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {hasDateRange
            ? `${formatDate(checkIn)} giriş — ${formatDate(checkOut)} çıkış seçildi.`
            : "Tarih seçmeden de müsaitlik sorabilirsiniz."}
        </p>
      </div>

      {/* Mobilde yatay snap carousel, md üstünde 3'lü grid. Kartların ekran kenarına
          taşabilmesi için Container padding'i negatif margin ile telafi edilir. */}
      <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {bungalowTypes.map((bungalow) => {
          const message = createAvailabilityMessage(bungalow.name, checkIn, checkOut);

          return (
            <article
              key={bungalow.name}
              className="w-[85%] max-w-sm shrink-0 snap-center overflow-hidden rounded-lg border border-border bg-surface shadow-[0_18px_48px_rgba(31,26,23,0.08)] md:w-auto md:max-w-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-surface-dark md:aspect-[9/16]">
                <BungalowVideo src={bungalow.video} poster={bungalow.poster} label={`${bungalow.name} Bungalov`} />
                <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-surface-dark/75 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md">
                  {bungalow.name} Bungalov
                </span>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="font-serif text-2xl font-semibold text-text sm:text-3xl">{bungalow.name} Bungalov</h3>
                <TrackedLink
                  href={createWhatsappUrl(whatsappPhone, message)}
                  event="whatsapp_click_contact"
                  params={{
                    cta_location: "bungalow_card",
                    bungalow_type: bungalow.name,
                    ...(hasDateRange ? { check_in: checkIn, check_out: checkOut } : {})
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClassName("whatsapp", "mt-4 w-full")}
                  aria-label={`${bungalow.name} Bungalov için WhatsApp'tan müsaitlik sor`}
                >
                  <Icon name="MessageCircle" className="h-5 w-5" />
                  Müsaitlik Sor
                </TrackedLink>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs font-semibold text-muted md:hidden">
        Diğer tipleri görmek için yana kaydırın
      </p>
    </div>
  );
}
