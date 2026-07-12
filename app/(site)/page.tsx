import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { TechnologyTeaser } from "@/components/sections/TechnologyTeaser";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { CertificationsStrip } from "@/components/sections/CertificationsStrip";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <TechnologyTeaser />
      <WhyUs />
      <Testimonials />
      <CertificationsStrip />
      <LatestPosts />
      <CtaBanner />
    </>
  );
}
