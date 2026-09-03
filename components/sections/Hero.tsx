import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Button } from "@/components/ui/Button";
import { SpiceParticles } from "@/components/ui/SpiceParticles";
import type { Homepage } from "@/types";

export async function Hero() {
  const homepage = await client.fetch<Homepage | null>(homepageQuery);

  const eyebrow = homepage?.heroEyebrow ?? "Crafted in Malabar";
  const headline = homepage?.heroHeadline ?? "Ready-to-Cook Kerala Gravies, Crafted for the World";
  const subhead =
    homepage?.heroSubhead ??
    "Chefs Base LLP produces preservative-free, shelf-stable Malabar gravy bases for international restaurant kitchens — authentic flavor, 24-month shelf life, export-ready quality.";
  const primaryButtonLabel = homepage?.heroPrimaryButtonLabel ?? "Explore Products";
  const secondaryButtonLabel = homepage?.heroSecondaryButtonLabel ?? "Get a Quote";

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-surface md:flex-row">
      <SpiceParticles />

      <div className="relative z-10 order-2 flex w-full flex-col items-start justify-center gap-6 px-6 py-16 md:order-1 md:w-[55%] md:px-16">
        <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent opacity-0 [animation:fade-up_0.7s_ease-out_forwards]">
          {eyebrow}
        </span>
        <div className="h-px w-0 bg-accent [animation:shimmer-grow_0.8s_ease-out_forwards]" />
        <h1 className="font-serif text-6xl italic leading-tight text-on-light opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.1s]">
          {headline}
        </h1>
        <p className="max-w-xl font-sans text-lg text-on-light/70 opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.2s]">
          {subhead}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.4s]">
          <Button variant="primary" href="/products">
            {primaryButtonLabel}
          </Button>
          <Button variant="secondary" href="/contact">
            {secondaryButtonLabel}
          </Button>
        </div>
      </div>

      <div className="relative z-10 order-1 h-[40vh] w-full md:order-2 md:h-auto md:w-[45%] md:[clip-path:polygon(8%_0%,100%_0%,100%_100%,0%_100%)]">
        {/* TODO: Replace with real Chefs Base product photography before launch */}
        <Image
          src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=1200&auto=format&fit=crop&q=90"
          alt="Kerala-style gravy dish"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: "linear-gradient(to right, var(--color-surface) 0%, transparent 40%)",
          }}
        />
      </div>
    </section>
  );
}
