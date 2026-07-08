"use client";

export type AnalyticsEventName =
  | "whatsapp_click_hero"
  | "whatsapp_click_sticky"
  | "whatsapp_click_gallery"
  | "whatsapp_click_special_day"
  | "whatsapp_click_contact"
  | "gallery_open_item"
  | "gallery_filter_change"
  | "instagram_click"
  | "maps_click";

export function trackEvent(name: AnalyticsEventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params ?? {});
  } else {
    window.dataLayer?.push({ event: name, ...params });
  }

  console.log("[analytics]", name, params);
}
