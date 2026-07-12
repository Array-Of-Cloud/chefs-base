import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="bg-primary px-6 py-24 text-center text-on-dark">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
        <h2 className="font-serif text-4xl italic">
          Ready to Bring Kerala Flavor to Your Menu?
        </h2>
        <p className="font-sans text-on-dark/80">
          Get in touch for samples, pricing, and custom formulation options.
        </p>
        <Button variant="secondary" href="/contact">
          Request a Quote
        </Button>
      </div>
    </section>
  );
}
