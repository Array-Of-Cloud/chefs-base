"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import type { SiteSettings } from "@/types";

export function FloatingWhatsApp({ settings }: { settings: SiteSettings | null }) {
  const pathname = usePathname();

  // /contact already has its own "Chat on WhatsApp" CTA in the page content,
  // and the fixed floating button can overlap the RFQ form's fields while
  // scrolling — so skip it on that page specifically.
  if (pathname === "/contact") return null;

  return <WhatsAppButton settings={settings} />;
}
