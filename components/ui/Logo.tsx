import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteSettings } from "@/types";

interface LogoProps {
  settings: SiteSettings | null;
  /** "icon" = compact monogram, "full" = wordmark + tagline lockup. */
  variant?: "icon" | "full";
  /** The background this logo sits on — picks the dark- or light-colored asset. */
  onBackground?: "light" | "dark";
  className?: string;
}

export function Logo({ settings, variant = "icon", onBackground = "light", className = "" }: LogoProps) {
  const field =
    variant === "icon"
      ? onBackground === "dark"
        ? settings?.logoIconLight
        : settings?.logoIcon
      : onBackground === "dark"
        ? settings?.logoFullLight
        : settings?.logoFull;

  if (field) {
    const src = urlForImage(field).height(160).url();
    return (
      <Image
        src={src}
        alt={settings?.siteName ?? "Chefs Base LLP"}
        width={160}
        height={160}
        className={`h-12 w-12 object-contain ${className}`}
      />
    );
  }

  return (
    <span
      className={`font-serif text-2xl italic ${onBackground === "dark" ? "text-on-dark" : "text-on-light"} ${className}`}
    >
      Chefs Base
    </span>
  );
}
