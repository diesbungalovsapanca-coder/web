export function getInstagramHandle(url: string): string | null {
  const segment = url
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "")
    .split("/")
    .pop();
  return segment ? `@${segment.replace(/^@/, "")}` : null;
}

export function getInstagramAnalyticsParams(url: string, linkLocation: string) {
  return {
    link_location: linkLocation,
    link_url: url,
    link_domain: "instagram.com",
    link_text: getInstagramHandle(url) ?? "Instagram",
    outbound: true
  };
}
