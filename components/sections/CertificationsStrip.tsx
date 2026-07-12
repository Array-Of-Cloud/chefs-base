import { client } from "@/sanity/lib/client";
import { certificationsQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Certification } from "@/types";

export async function CertificationsStrip() {
  const certifications = await client.fetch<Certification[]>(certificationsQuery);

  if (certifications.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface-alt px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12">
        {certifications.map((cert) => (
          <div key={cert._id} className="flex flex-col items-center gap-2">
            <div className="relative h-16 w-16">
              <SanityImage
                src={urlForImage(cert.logo).height(64).url()}
                alt={cert.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-sans text-xs text-muted">{cert.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
