import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Button } from "@/components/ui/Button";
import type { Homepage } from "@/types";

export async function CtaBanner() {
  const homepage = await client.fetch<Homepage | null>(homepageQuery);

  const headline = homepage?.ctaHeadline ?? "Ready to Bring Kerala Flavor to Your Menu?";
  const subtext =
    homepage?.ctaSubtext ?? "Get in touch for samples, pricing, and custom formulation options.";
  const buttonLabel = homepage?.ctaButtonLabel ?? "Request a Quote";

  return (
    <section className="bg-primary px-6 py-24 text-center text-on-dark">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-serif text-4xl italic">{headline}</h2>
        <p className="font-sans text-on-dark/80">{subtext}</p>
        <Button variant="secondary" href="/contact">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}
