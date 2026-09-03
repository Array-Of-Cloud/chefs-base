// One-off script to seed the new homepage/aboutPage singletons with content
// from the client's WhatsApp-provided copy (Text 1 for homepage sections that
// map cleanly to existing sections, Text 2 for the finalized Mission/Vision).
// Also sets the secondaryAddressLabel default on siteSettings (UK office),
// leaving the address itself blank until the client has one to add.
// Run with: node --env-file=.env.local scripts/seed-dynamic-content.mjs
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  console.log("Seeding homepage singleton...");
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroEyebrow: "Crafted in Malabar",
    heroHeadline: "Authentic Food. Smarter Kitchen Operations.",
    heroSubhead:
      "Premium retort food solutions designed for modern food businesses. Chefs Base helps restaurants, hotels, caterers, cloud kitchens and hospitality businesses simplify food preparation, improve consistency and reduce kitchen operating costs — while preserving the authentic flavours of Indian cuisine.",
    heroPrimaryButtonLabel: "Explore Our Solutions",
    heroSecondaryButtonLabel: "Request a Product Trial",

    trustStats: [
      { _key: "stat1", label: "FSSAI Certified", value: "Certified" },
      { _key: "stat2", label: "Export Ready", value: "20+ Countries" },
      { _key: "stat3", label: "Shelf Life", value: "Up to 24 Months" },
      { _key: "stat4", label: "Production Capacity", value: "500+ MT / Year" },
    ],

    whyUsReasons: [
      {
        _key: "reason1",
        title: "Reduce Preparation",
        description: "Spend less time on complex preparation and cooking processes.",
      },
      {
        _key: "reason2",
        title: "Optimise Labour",
        description: "Reduce the amount of kitchen labour required for selected dishes.",
      },
      {
        _key: "reason3",
        title: "Reduce Waste",
        description: "Prepare the quantity you need and reduce the risk of excess prepared food.",
      },
      {
        _key: "reason4",
        title: "Improve Consistency",
        description: "Deliver consistent flavour, texture, colour and portioning.",
      },
      {
        _key: "reason5",
        title: "Simplify Inventory",
        description: "Improve stock management and reduce purchasing pressure.",
      },
      {
        _key: "reason6",
        title: "Serve Faster",
        description: "Streamline preparation and help your kitchen respond more efficiently to demand.",
      },
    ],

    whoWeServeIntro: "Solutions for Professional Food Businesses",
    whoWeServeSegments: [
      {
        _key: "segment1",
        title: "Restaurants & Takeaways",
        description: "Deliver authentic Indian dishes while simplifying kitchen preparation.",
      },
      {
        _key: "segment2",
        title: "Hotels",
        description:
          "Offer Indian cuisine without the operational complexity of maintaining a specialist kitchen for every dish.",
      },
      {
        _key: "segment3",
        title: "Cloud Kitchens",
        description: "Improve speed, consistency and operational efficiency across delivery-focused kitchens.",
      },
      {
        _key: "segment4",
        title: "Caterers",
        description: "Create predictable, repeatable output for events and high-volume requirements.",
      },
      {
        _key: "segment5",
        title: "Hospitality Businesses",
        description:
          "Support resorts, serviced accommodation, hostels and other hospitality operators with practical food-service solutions.",
      },
    ],

    ctaHeadline: "Ready to Make Your Kitchen Smarter?",
    ctaSubtext:
      "Let's analyse your menu, understand your operation and explore where Chefs Base can add value.",
    ctaButtonLabel: "Request a Product Trial",
  });
  console.log("Homepage seeded.");

  console.log("Seeding aboutPage singleton...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    // Story paragraphs unchanged from what was already live — only
    // Mission/Vision were explicitly provided as finalized new copy (Text 2).
    storyParagraph1:
      "Chefs Base LLP was founded in 2024 by a group of friends in Kerala with a simple goal: bring the authentic flavors of Malabar to kitchens around the world. Before launching, the team spent extensive time studying retort technology through hands-on research — testing recipes for months to get taste, safety, and shelf life right.",
    storyParagraph2:
      "We're passionate about bringing authentic Malabar flavors to kitchens everywhere, blending traditional recipes with modern food processing standards. Every gravy is crafted using carefully selected ingredients, authentic spice blends, and hygienic manufacturing processes — sealed for freshness, ready to cook wherever you are.",
    missionText:
      "To make authentic Malabar and Indian cuisine easier, more efficient and more consistent for food businesses worldwide. We combine traditional recipes with modern advanced technology to help restaurants, hotels, caterers and other hospitality businesses reduce kitchen costs, labour, preparation time and food waste — without compromising on taste or quality.",
    visionText:
      "To become a globally trusted food-service solutions brand, bringing the authentic flavours of Malabar to professional kitchens around the world through innovative, scalable and reliable food technology.",
  });
  console.log("About page seeded.");

  console.log("Setting secondaryAddressLabel default on siteSettings (address left blank)...");
  await client.patch("siteSettings").set({ secondaryAddressLabel: "UK Office" }).commit();
  console.log("Site settings updated.");

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
