import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | Chefs Base LLP",
  description:
    "How retort processing keeps Chefs Base products shelf-stable and restaurant-grade.",
};

const traditionalFlow = ["Purchase", "Storage", "Preparation", "Cooking", "Labour", "Waste", "Service"];
const chefsBaseFlow = ["Purchase", "Storage", "Reheat & Finish", "Serve", "Zero Waste"];

const steps = [
  {
    title: "Preparation",
    description:
      "Ingredients are sourced, cleaned, and cooked using traditional Kerala recipes.",
  },
  {
    title: "Filling & Sealing",
    description:
      "Cooked product is portioned and sealed in retort-grade pouches or cans, free of air.",
  },
  {
    title: "Retort Processing",
    description:
      "Sealed packs are sterilized under controlled heat and pressure, eliminating microbial risk without refrigeration.",
  },
  {
    title: "Cooling & Quality Check",
    description:
      "Packs are rapidly cooled and inspected for seal integrity before packing.",
  },
  {
    title: "Packing & Export",
    description:
      "Finished product is boxed, labeled, and prepared for international shipping — shelf-stable at room temperature.",
  },
];

export default function TechnologyPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-accent">
            Retort Technology
          </span>
          <h1 className="font-serif text-5xl italic text-on-light">
            How We Keep Flavor Locked In
          </h1>
          <p className="max-w-xl font-sans text-on-light/70">
            Retort processing lets us deliver restaurant-grade Kerala cuisine anywhere
            in the world — shelf-stable at room temperature for up to 24 months, with
            no preservatives.
          </p>
        </div>

        <ol className="flex flex-col gap-10">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-6">
              <span className="font-serif text-3xl italic text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-serif text-2xl italic text-on-light">{step.title}</h2>
                <p className="mt-1 font-sans text-sm text-on-light/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <div className="rounded-xl bg-surface-alt p-6 sm:p-8 lg:p-10">
            <h2 className="text-center font-serif text-2xl italic text-on-light">
              What Changes in Your Kitchen
            </h2>
            <p className="mt-2 text-center font-sans text-sm text-on-light/70">
              The same dish, produced two different ways.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <div>
                <span className="font-sans text-xs uppercase tracking-wide text-muted">
                  Traditional Kitchen
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-sans text-sm text-on-light/60">
                  {traditionalFlow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-border px-3 py-1">{step}</span>
                      {i < traditionalFlow.length - 1 && <span className="text-border">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-sans text-xs uppercase tracking-wide text-accent">
                  With Chefs Base
                </span>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-sans text-sm text-on-light">
                  {chefsBaseFlow.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-full border border-accent bg-accent/10 px-3 py-1 font-medium">
                        {step}
                      </span>
                      {i < chefsBaseFlow.length - 1 && <span className="text-accent">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
