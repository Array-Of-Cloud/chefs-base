import { BadgeCheckIcon } from "@/components/icons/BadgeCheckIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { FactoryIcon } from "@/components/icons/FactoryIcon";

const stats = [
  { label: "FSSAI Certified", value: "Certified", icon: BadgeCheckIcon },
  { label: "Export Ready", value: "20+ Countries", icon: GlobeIcon },
  { label: "Shelf Life", value: "Up to 24 Months", icon: CalendarIcon },
  { label: "Production Capacity", value: "500+ MT / Year", icon: FactoryIcon },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-surface-alt px-6 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <stat.icon className="h-7 w-7 text-accent" />
            <span className="font-serif text-2xl italic text-on-light">{stat.value}</span>
            <span className="font-sans text-xs uppercase tracking-wide text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
