import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { legalPageBySlugQuery } from "@/sanity/lib/queries";
import type { LegalPage } from "@/types";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function LegalPageContent({ slug }: { slug: string }) {
  const page = await client.fetch<LegalPage | null>(legalPageBySlugQuery, { slug });

  if (!page) notFound();

  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <h1 className="font-serif text-5xl italic text-on-light">{page.title}</h1>
          <span className="font-sans text-xs uppercase tracking-wide text-muted">
            Last updated {formatDate(page.lastUpdated)}
          </span>
        </div>

        <div className="prose prose-sm max-w-none font-sans text-on-light/80">
          <PortableText value={page.body} />
        </div>
      </div>
    </div>
  );
}
