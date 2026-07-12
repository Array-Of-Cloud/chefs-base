import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/lib/queries";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { ContactForm } from "@/components/ui/ContactForm";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Contact | Chefs Base LLP",
  description: "Request a quote or get in touch with Chefs Base LLP.",
};

export default async function ContactPage() {
  const [settings, products] = await Promise.all([
    getSiteSettings(),
    client.fetch<Product[]>(allProductsQuery),
  ]);
  const whatsappNumber = settings?.whatsappNumber ?? "+918137060637";
  const contactEmail = settings?.contactEmail ?? "chefsbasellp@outlook.com";
  const contactPhone = settings?.contactPhone ?? "+918137060637";
  const address =
    settings?.address ?? "Door No. 110F, Ottupara, Pulikkal, Malappuram, Kerala 673634, India";

  return (
    <div className="px-6 py-20">
      <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-5xl italic text-on-light">Get in Touch</h1>
          <p className="max-w-md font-sans text-on-light/70">
            Tell us about your requirements and we&apos;ll get back to you with
            pricing, samples, and lead times.
          </p>

          <div className="flex flex-col gap-2 border-t border-border pt-6 font-sans text-sm text-on-light/80">
            <a href={`mailto:${contactEmail}`} className="hover:text-accent">
              {contactEmail}
            </a>
            <a href={`tel:${contactPhone}`} className="hover:text-accent">
              {contactPhone}
            </a>
            <p>{address}</p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit rounded-xl border border-accent px-6 py-3 font-sans text-sm text-accent transition-colors hover:bg-accent hover:text-on-light"
          >
            Chat on WhatsApp
          </a>
        </div>

        <ContactForm products={products} />
      </div>
    </div>
  );
}
