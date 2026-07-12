const reasons = [
  {
    title: "Kerala-Sourced Ingredients",
    description: "Spices and produce sourced directly from Malabar's growing regions.",
  },
  {
    title: "Export-Grade Compliance",
    description: "FSSAI-certified facilities built for international food safety standards.",
  },
  {
    title: "Custom Formulations",
    description: "Recipes and packaging tailored to your menu and market.",
  },
  {
    title: "Reliable at Scale",
    description: "Consistent quality and supply for growing foodservice operations.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center font-serif text-4xl italic text-on-light">
          Why Chefs Base
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <div key={reason.title} className="flex flex-col items-center gap-2 text-center">
              <div className="mb-2 h-px w-10 bg-accent" />
              <h3 className="font-serif text-2xl italic text-on-light">{reason.title}</h3>
              <p className="font-sans text-sm text-on-light/70">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
