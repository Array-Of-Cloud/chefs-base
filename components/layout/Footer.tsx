import Link from "next/link";
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
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-on-dark">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-serif text-2xl italic">Chefs Base</span>
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

          <div className="flex flex-col gap-2 font-sans text-sm text-on-dark/80">
            <a href={`mailto:${contactEmail}`} className="hover:text-accent">
              {contactEmail}
            </a>
            <a href={`tel:${contactPhone}`} className="hover:text-accent">
              {contactPhone}
            </a>
            <p>{address}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-on-dark/10 pt-6 font-sans text-xs text-on-dark/60">
          © {year} {siteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
