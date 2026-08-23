import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.diesbungalov.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || request.nextUrl.protocol.replace(":", "");
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  if (!isLocalhost && (hostname === "diesbungalov.com" || protocol === "http")) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

// Uzantılı yollar (görsel, video, robots.txt vb.) hariç tutulur: /_next/image
// optimizasyonu kaynak dosyayı iç istekle çeker ve o istek buraya düştüğünde
// 301 dönüyordu. Optimizer yönlendirme gövdesini "geçersiz görsel" sayıp 400
// veriyor, bu yüzden yerel görseller daha önce unoptimized işaretlenmişti.
export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\.[^/]+$).*)"]
};
