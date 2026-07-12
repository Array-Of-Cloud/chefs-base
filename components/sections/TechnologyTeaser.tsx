import { Button } from "@/components/ui/Button";

export function TechnologyTeaser() {
  return (
    <section className="bg-primary px-6 py-24 text-on-dark">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
          Retort Technology
        </span>
        <h2 className="font-serif text-4xl italic">
          Locked-In Flavor, Room-Temperature Shelf Stability
        </h2>
        <p className="max-w-xl font-sans text-on-dark/80">
          Our retort processing preserves authentic taste and texture without
          refrigeration or preservatives — built for long-distance export and
          restaurant-grade consistency.
        </p>
        <Button variant="secondary" href="/technology">
          How It Works
        </Button>
      </div>
    </section>
  );
}
