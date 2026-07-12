import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import type { SiteSettings } from "@/types";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/custom-orders", label: "Custom Orders" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ settings }: { settings: SiteSettings | null }) {
  const whatsappNumber = settings?.whatsappNumber ?? "+918137060637";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Chefs Base LLP home" className="shrink-0">
          <Logo settings={settings} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap font-sans text-sm text-on-light/80 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="secondary"
            href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </Button>
          <Button variant="primary" href="/contact">
            Get a Quote
          </Button>
        </div>

        <MobileNav links={navLinks} whatsappNumber={whatsappNumber} />
      </div>
    </header>
  );
}
