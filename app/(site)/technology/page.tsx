import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology | Chefs Base LLP",
  description:
    "How retort processing keeps Chefs Base products shelf-stable and restaurant-grade.",
};

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
      </div>
    </div>
  );
}
