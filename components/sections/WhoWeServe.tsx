const segments = [
  {
    title: "Restaurants & Takeaways",
    description: "Authentic Malabar flavor without the labor-intensive prep — ready to finish and serve.",
  },
  {
    title: "Hotels",
    description: "Offer genuine Indian dishes on your menu without needing a dedicated specialist kitchen.",
  },
  {
    title: "Cloud Kitchens",
    description: "Faster turnaround and consistent quality, built for high-volume delivery operations.",
  },
  {
    title: "Caterers",
    description: "Predictable, consistent output for events and high-volume requirements — no surprises at scale.",
  },
  {
    title: "Hospitality Businesses",
    description: "Resorts, serviced apartments, hostels, and student accommodation — authentic food service without a full kitchen team.",
  },
];

export function WhoWeServe() {
  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h2 className="font-serif text-4xl italic text-on-light">Who We Serve</h2>
          <p className="max-w-xl font-sans text-on-light/70">
            Built for foodservice operations that need consistent quality without a full prep kitchen.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((segment) => (
            <div key={segment.title} className="flex flex-col items-center gap-2 text-center">
              <div className="mb-2 h-px w-10 bg-accent" />
              <h3 className="font-serif text-xl italic text-on-light">{segment.title}</h3>
              <p className="font-sans text-sm text-on-light/70">{segment.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
