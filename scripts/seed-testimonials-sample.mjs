// SAMPLE/PLACEHOLDER testimonials — for previewing the homepage Testimonials
// section layout only. Not real customer quotes. Run with:
//   node --env-file=.env.local scripts/seed-testimonials-sample.mjs
// Delete with:
//   node --env-file=.env.local scripts/delete-sample-testimonials.mjs
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function uploadImage(url, filename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.status}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

async function main() {
  console.log("Uploading sample headshots...");
  const photos = {
    chef: await uploadImage(
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      "sample-testimonial-chef.jpg",
    ),
    manager: await uploadImage(
      "https://images.unsplash.com/photo-1627161683077-e34782c24d81",
      "sample-testimonial-manager.jpg",
    ),
    owner: await uploadImage(
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "sample-testimonial-owner.jpg",
    ),
  };
  console.log("Uploaded.");

  const samples = [
    {
      id: "sample-1",
      quote:
        "The consistency is what sold us. Every pouch tastes like it came out of the same kitchen, whether it's our first order or our fiftieth. Our line cooks finish it in under fifteen minutes.",
      name: "James Whitfield",
      role: "Executive Chef",
      company: "Independent Indian Restaurant Group",
      country: "United Kingdom",
      photo: photos.chef,
      order: 1,
    },
    {
      id: "sample-2",
      quote:
        "We were nervous about shelf-stable curry bases losing authenticity. Chefs Base proved us wrong — the spice balance holds up, and not needing cold storage simplified our import logistics significantly.",
      name: "Priya Nair",
      role: "F&B Operations Manager",
      company: "Regional Hospitality Group",
      country: "United Arab Emirates",
      photo: photos.manager,
      order: 2,
    },
    {
      id: "sample-3",
      quote:
        "Onboarding a new supplier for three locations at once was a risk. Six months in, quality hasn't dipped once, and our guests can't tell the base was prepped anywhere but our own kitchen.",
      name: "Marcus Chen",
      role: "Owner",
      company: "Multi-Location Restaurant Chain",
      country: "United States",
      photo: photos.owner,
      order: 3,
    },
  ];

  console.log("Creating sample testimonials...");
  for (const s of samples) {
    await client.createOrReplace({
      _id: `testimonial-${s.id}`,
      _type: "testimonial",
      quote: s.quote,
      name: s.name,
      role: s.role,
      company: s.company,
      country: s.country,
      photo: {
        _type: "image",
        asset: { _type: "reference", _ref: s.photo._id },
        alt: s.name,
      },
      order: s.order,
      featured: true,
    });
    console.log(`  Created: ${s.name}`);
  }

  console.log("\nSample testimonials created. These are PLACEHOLDER content — replace with real buyer quotes before launch.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
