export function normalizeWhatsappPhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function createWhatsappUrl(phone: string, message: string) {
  const normalized = normalizeWhatsappPhone(phone);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}
