import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Custom Orders | Chefs Base LLP",
  description: "Custom formulations, packaging, and private label options from Chefs Base LLP.",
};

const offerings = [
  {
    title: "Custom Formulations",
    description: "Adjust spice levels, portion sizes, or ingredients to fit your menu.",
  },
  {
    title: "Private Label Packaging",
    description: "Your branding on retort pouches, cartons, and shipping cases.",
  },
  {
    title: "Flexible Order Volumes",
    description: "From trial batches to full-container loads, scaled to your business.",
  },
];

export default function CustomOrdersPage() {
  return (
    <div className="px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="font-serif text-5xl italic text-on-light">Custom Orders</h1>
        <p className="max-w-xl font-sans text-on-light/70">
          Most of our products can be tailored to your kitchen, your brand, and your
          market. Tell us what you need and we&apos;ll work out the details together.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-3">
        {offerings.map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2 text-center">
            <div className="mb-2 h-px w-10 bg-accent" />
            <h2 className="font-serif text-2xl italic text-on-light">{item.title}</h2>
            <p className="font-sans text-sm text-on-light/70">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button variant="primary" href="/contact">
          Discuss Your Order
        </Button>
      </div>
    </div>
  );
}
