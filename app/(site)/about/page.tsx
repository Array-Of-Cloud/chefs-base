import type { Metadata } from "next";
import { CertificationsStrip } from "@/components/sections/CertificationsStrip";

export const metadata: Metadata = {
  title: "About | Chefs Base LLP",
  description: "The story behind Chefs Base LLP, a Kerala-based retort food company.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="px-6 py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
          <h1 className="font-serif text-5xl italic text-on-light">Our Story</h1>
          <p className="font-sans text-lg text-on-light/70">
            Chefs Base LLP was founded in 2024 by a group of friends in Kerala with a
            simple goal: bring the authentic flavors of Malabar to kitchens around
            the world. Before launching, the team spent extensive time studying
            retort technology through hands-on research — testing recipes in retort
            pouches to get taste, safety, and shelf life right.
          </p>
          <p className="font-sans text-on-light/70">
            We're passionate about bringing authentic Malabar flavors to kitchens
            everywhere, blending traditional recipes with modern food processing
            standards. Every gravy is crafted using carefully selected ingredients,
            authentic spice blends, and hygienic manufacturing processes — sealed in
            high-barrier retort pouches, ready to cook wherever you are.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-2">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-serif text-2xl italic text-on-light">Our Mission</h2>
            <p className="font-sans text-sm text-on-light/70">
              To create premium-quality food products using authentic ingredients
              while maintaining the highest standards of food safety, innovation,
              and customer satisfaction.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-serif text-2xl italic text-on-light">Our Vision</h2>
            <p className="font-sans text-sm text-on-light/70">
              To become a globally trusted food brand by sharing the rich culinary
              heritage of Malabar through exceptional taste, uncompromising quality,
              and continuous innovation.
            </p>
          </div>
        </div>
      </div>
      <CertificationsStrip />
    </div>
  );
}
