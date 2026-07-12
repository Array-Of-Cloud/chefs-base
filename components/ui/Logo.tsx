import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types";

export function Logo({
  settings,
  className = "",
}: {
  settings: SiteSettings | null;
  className?: string;
}) {
  if (settings?.logo) {
    const src = urlForImage(settings.logo).height(80).url();
    return (
      <Image
        src={src}
        alt={settings.siteName ?? "Chefs Base LLP"}
        width={160}
        height={40}
        className={`h-10 w-auto ${className}`}
      />
    );
  }

  return (
    <span className={`font-serif text-2xl italic ${className}`}>
      Chefs Base
    </span>
  );
}
