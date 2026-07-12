import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SpiceParticles } from "@/components/ui/SpiceParticles";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-surface md:flex-row">
      <SpiceParticles />

      <div className="relative z-10 order-2 flex w-full flex-col items-start justify-center gap-6 px-6 py-16 md:order-1 md:w-[55%] md:px-16">
        <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent opacity-0 [animation:fade-up_0.7s_ease-out_forwards]">
          Crafted in Malabar
        </span>
        <div className="h-px w-0 bg-accent [animation:shimmer-grow_0.8s_ease-out_forwards]" />
        <h1 className="font-serif text-6xl italic leading-tight text-on-light opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.1s]">
          Ready-to-Cook Kerala Gravies, Crafted for the World
        </h1>
        <p className="max-w-xl font-sans text-lg text-on-light/70 opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.2s]">
          Chefs Base LLP produces preservative-free, shelf-stable Malabar gravy
          bases for international restaurant kitchens — authentic flavor, 24-month
          shelf life, export-ready quality.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4 opacity-0 [animation:fade-up_0.7s_ease-out_forwards] [animation-delay:0.4s]">
          <Button variant="primary" href="/products">
            Explore Products
          </Button>
          <Button variant="secondary" href="/contact">
            Get a Quote
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
