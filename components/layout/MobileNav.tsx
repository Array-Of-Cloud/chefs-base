"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  links: { href: string; label: string }[];
  whatsappNumber: string;
}

export function MobileNav({ links, whatsappNumber }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const digits = whatsappNumber.replace(/[^\d]/g, "");

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-xl text-on-light"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <nav className="absolute inset-x-0 top-full flex flex-col gap-3 border-b border-border bg-surface px-6 py-6 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-sans text-on-light hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3">
            <Button
              variant="secondary"
              href={`https://wa.me/${digits}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </Button>
            <Button
              variant="primary"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
