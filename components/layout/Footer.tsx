import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { MailIcon } from "@/components/icons/MailIcon";
import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import type { SiteSettings } from "@/types";

const footerLinks = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.siteName ?? "Chefs Base LLP";
  const tagline = settings?.tagline ?? "Crafted in Malabar, created for the world";
  const contactEmail = settings?.contactEmail ?? "chefsbasellp@outlook.com";
  const contactPhone = settings?.contactPhone ?? "+918137060637";
  const address =
    settings?.address ?? "Door No. 110F, Ottupara, Pulikkal, Malappuram, Kerala 673634, India";
  const secondaryAddress = settings?.secondaryAddress;
  const secondaryAddressLabel = settings?.secondaryAddressLabel ?? "Secondary Office";
  const instagram = settings?.instagram ?? "https://instagram.com/chefsbasellp";
  const instagramHandle = `@${instagram.replace(/\/+$/, "").split("/").pop()}`;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-on-dark">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Logo settings={settings} variant="icon" onBackground="dark" />
            <p className="mt-3 max-w-xs font-sans text-sm text-on-dark/70">
              {tagline}
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-on-dark/80 hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 font-sans text-sm text-on-dark/80">
            <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-accent">
              <MailIcon className="h-4 w-4 shrink-0" />
              {contactEmail}
            </a>
            <a href={`tel:${contactPhone}`} className="flex items-center gap-2 hover:text-accent">
              <PhoneIcon className="h-4 w-4 shrink-0" />
              {contactPhone}
            </a>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-accent"
            >
              <InstagramIcon className="h-4 w-4 shrink-0" />
              {instagramHandle}
            </a>
            <p className="pt-1">{address}</p>
            {secondaryAddress && (
              <div className="pt-1">
                <span className="block text-xs uppercase tracking-wide text-on-dark/50">
                  {secondaryAddressLabel}
                </span>
                <p>{secondaryAddress}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-on-dark/10 pt-6 font-sans text-xs text-on-dark/60">
          © {year} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
