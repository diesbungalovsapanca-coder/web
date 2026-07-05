export function getInstagramHandle(url: string): string | null {
  const segment = url
    .replace(/[?#].*$/, "")
    .replace(/\/+$/, "")
    .split("/")
    .pop();
  return segment ? `@${segment.replace(/^@/, "")}` : null;
}
