// Removes the sample/placeholder testimonials created by seed-testimonials-sample.mjs.
// Run with: node --env-file=.env.local scripts/delete-sample-testimonials.mjs
import { createClient } from "next-sanity";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const ids = ["testimonial-sample-1", "testimonial-sample-2", "testimonial-sample-3"];

async function main() {
  for (const id of ids) {
    await client.delete(id);
    console.log(`  Deleted: ${id}`);
  }
  console.log("\nSample testimonials removed.");
}

main().catch((err) => {
  console.error("Delete failed:", err);
  process.exit(1);
});
