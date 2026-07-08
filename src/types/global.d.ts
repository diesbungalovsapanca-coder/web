export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, ...params: unknown[]) => void;
  }
}
