import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { BadgeCheckIcon } from "@/components/icons/BadgeCheckIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import { CalendarIcon } from "@/components/icons/CalendarIcon";
import { FactoryIcon } from "@/components/icons/FactoryIcon";
import type { Homepage } from "@/types";

// Icons are a fixed, positional, visual concern — not editorial content — so
// they stay in code and are zipped with the CMS-driven label/value by index.
const icons = [BadgeCheckIcon, GlobeIcon, CalendarIcon, FactoryIcon];

const fallbackStats = [
  { label: "FSSAI Certified", value: "Certified" },
  { label: "Export Ready", value: "20+ Countries" },
  { label: "Shelf Life", value: "Up to 24 Months" },
  { label: "Production Capacity", value: "500+ MT / Year" },
];

export async function TrustBar() {
  const homepage = await client.fetch<Homepage | null>(homepageQuery);
  const stats = homepage?.trustStats?.length ? homepage.trustStats : fallbackStats;

  return (
    <section className="border-y border-border bg-surface-alt px-6 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = icons[i] ?? icons[icons.length - 1];
          return (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <Icon className="h-7 w-7 text-accent" />
              <span className="font-serif text-2xl italic text-on-light">{stat.value}</span>
              <span className="font-sans text-xs uppercase tracking-wide text-muted">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
