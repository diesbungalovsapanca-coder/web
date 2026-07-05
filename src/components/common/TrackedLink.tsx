"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  params,
  children,
  ...props
}: {
  href: string;
  event: AnalyticsEventName;
  params?: Record<string, unknown>;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = () => trackEvent(event, params);

  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
