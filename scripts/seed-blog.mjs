// One-off blog content seed script — run with:
//   node --env-file=.env.local scripts/seed-blog.mjs
// Requires SANITY_API_WRITE_TOKEN (editor access) in .env.local.
// Safe to re-run: uses fixed document IDs, so it replaces rather than duplicates.
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
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  return client.assets.upload("image", buffer, { filename });
}

let key = 0;
const nextKey = () => `k${key++}`;
const h2 = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "h2",
  children: [{ _type: "span", _key: nextKey(), text }],
});
const p = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "normal",
  children: [{ _type: "span", _key: nextKey(), text }],
});
const bullet = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "normal",
  listItem: "bullet",
  level: 1,
  children: [{ _type: "span", _key: nextKey(), text }],
});
const numbered = (text) => ({
  _type: "block",
  _key: nextKey(),
  style: "normal",
  listItem: "number",
  level: 1,
  children: [{ _type: "span", _key: nextKey(), text }],
});

async function main() {
  console.log("Uploading blog images from Unsplash...");
  const images = {
    retort: await uploadImage(
      "https://images.unsplash.com/photo-1588416820614-f8d6ac6cea56",
      "retort-technology.jpg",
    ),
    readyToCook: await uploadImage(
      "https://images.unsplash.com/flagged/photo-1561350117-501b4661f8d4",
      "ready-to-cook-kitchen.jpg",
    ),
    spices: await uploadImage(
      "https://images.unsplash.com/photo-1775433205046-86e060feff06",
      "malabar-spices.jpg",
    ),
  };
  console.log("Images uploaded.");

  console.log("Creating author...");
  await client.createOrReplace({
    _id: "team-chefs-base-team",
    _type: "teamMember",
    name: "Chefs Base Team",
    role: "Editorial Team",
    bio: "Notes on Kerala cuisine, retort technology, and export foodservice from the Chefs Base LLP team.",
  });
  const author = { _type: "reference", _ref: "team-chefs-base-team" };
  console.log("Author created.");

  console.log("Creating blog posts...");
  const posts = [
    {
      id: "what-is-retort-technology",
      title: "How Retort Technology Locks In Fresh-Cooked Flavor",
      image: images.retort,
      excerpt:
        "How retort processing keeps Chefs Base gravies shelf-stable for 24 months without refrigeration or preservatives.",
      publishedAt: "2026-06-08T09:00:00Z",
      readTime: 5,
      featured: true,
      body: [
        p(
          "International restaurant buyers ask us the same question almost every time: how can a curry sit on a shelf for up to two years, without refrigeration, without a single preservative on the label? The answer is retort processing — the technology behind every pouch we ship.",
        ),
        h2("What Retort Processing Actually Does"),
        p(
          "Retort processing seals cooked food into an airtight, food-grade pouch, then sterilizes it under carefully controlled heat and pressure. The process eliminates microbial risk without freezing, refrigeration, or chemical preservatives — the same principle behind canning, refined for a flexible pouch that heats faster and holds flavor better.",
        ),
        h2("From Kitchen to Pouch: How We Do It"),
        p("Every batch moves through five stages before it leaves Kerala:"),
        numbered(
          "Preparation — ingredients are sourced, cleaned, and cooked to traditional Kerala recipes.",
        ),
        numbered(
          "Filling & sealing — the cooked gravy is portioned into retort-grade pouches with the air removed.",
        ),
        numbered(
          "Retort processing — sealed packs are sterilized under controlled heat and pressure.",
        ),
        numbered(
          "Cooling & quality check — packs are rapidly cooled and every seal is inspected for integrity.",
        ),
        numbered(
          "Packing & export — finished product is boxed, labeled, and shipped shelf-stable at room temperature.",
        ),
        h2("Why It Matters for Your Kitchen"),
        bullet(
          "No cold-chain logistics — no refrigerated shipping or storage needed, which cuts import and inventory costs.",
        ),
        bullet("Shelf-stable for up to 24 months at room temperature."),
        bullet("No preservatives — the seal and sterilization do the work instead."),
        bullet(
          "Consistent flavor batch to batch, so the dish tastes the same on order one and order fifty.",
        ),
        p(
          "It's why a gravy cooked in Malappuram can travel to a restaurant kitchen anywhere in the world and still taste freshly made — because in every way that matters, it is.",
        ),
      ],
      seoTitle: "How Retort Technology Locks In Fresh-Cooked Flavor | Chefs Base LLP",
      seoDescription:
        "A buyer's guide to retort processing — how Chefs Base keeps Kerala gravies shelf-stable for 24 months without refrigeration or preservatives.",
    },
    {
      id: "ready-to-cook-vs-ready-to-eat",
      title: "Ready-to-Cook, Not Ready-to-Eat: Why the Distinction Matters",
      image: images.readyToCook,
      excerpt:
        "Chefs Base gravies are finished in your kitchen, not ours — here's why that protects your menu and your margins.",
      publishedAt: "2026-06-22T09:00:00Z",
      readTime: 4,
      featured: true,
      body: [
        p(
          "\"Ready-to-cook\" and \"ready-to-eat\" get used interchangeably in foodservice sourcing conversations, but for a restaurant kitchen they mean very different things — and the difference is worth being precise about.",
        ),
        h2("What 'Ready-to-Cook' Actually Means"),
        p(
          "A Chefs Base gravy arrives as a finished base: the slow-cooked, spice-balanced foundation of the dish, done exactly as it would be in a Kerala kitchen. What it isn't is a finished plate. Your kitchen still adds the protein or vegetables, simmers it through, and finishes it with cream, tempering, or garnish — the same way our own preparation notes guide it.",
        ),
        h2("Why That's Better for Your Kitchen, Not Worse"),
        bullet(
          "Your chefs keep creative and quality control — garnish, spice level, plating, and portioning stay in your hands.",
        ),
        bullet("You can honestly tell guests the dish is cooked in-house, not reheated."),
        bullet(
          "You cut the hours-long, skill-intensive base-gravy prep — the actual bottleneck in an authentic Kerala curry's mise en place — without cutting corners on the finished plate.",
        ),
        bullet(
          "Base quality stays consistent across locations and shifts, which matters most for multi-outlet or catering operations.",
        ),
        h2("What This Looks Like in Practice"),
        p(
          "Take a dish like our Beef Varattu: the protein is pressure-cooked separately, the gravy base is sautéed, the two are combined and reduced until the sauce clings to the meat, then finished on the flame. That's fifteen to twenty minutes of real, active cooking in your kitchen — not a pouch opened and reheated. The base is done; the dish still isn't, until your chef finishes it.",
        ),
        p(
          "That's the whole point of ready-to-cook: it removes the slowest, most repetitive part of the process and leaves the part that actually makes a dish yours.",
        ),
      ],
      seoTitle: "Ready-to-Cook vs Ready-to-Eat, Explained | Chefs Base LLP",
      seoDescription:
        "Chefs Base gravies are a ready-to-cook base, not a heat-and-serve meal — here's why that distinction matters for restaurant kitchens.",
    },
    {
      id: "spices-of-malabar",
      title: "The Spices of Malabar: What Makes Kerala Gravies Different",
      image: images.spices,
      excerpt:
        "From the historic Spice Coast to your kitchen — the ingredients and techniques behind an authentic Kerala gravy.",
      publishedAt: "2026-07-01T09:00:00Z",
      readTime: 5,
      featured: false,
      body: [
        p(
          "Kerala's Malabar coast was known for centuries as the Spice Coast — the reason traders sailed from as far as Rome and China was the black pepper growing in its hills. That same coastline still supplies the spices behind every Chefs Base gravy.",
        ),
        h2("The Core Spice Palette"),
        bullet("Black pepper — Malabar's original export, and still a backbone of the region's heat."),
        bullet("Cardamom, cinnamon, and clove — grown in the same Western Ghats hill country, used whole to build a gravy's base aroma."),
        bullet("Curry leaves — fried in hot oil at the start or end of cooking for a sharp, essential-oil aroma nothing dried can replace."),
        bullet("Kudampuli (Malabar tamarind) — the dried, smoky souring agent behind coastal fish curries like our Fish Mango Curry."),
        bullet("Coconut — milk, oil, and grated flesh, the base texture and richness running through stews, kurumas, and varattus alike."),
        h2("Technique Matters as Much as Ingredients"),
        p(
          "The same spice list produces very different dishes depending on technique: slow dry-roasting for a varattu-style masala that clings to the meat, coconut milk stirred in at the end for a mild stew or kuruma, or a final tempering — mustard seeds and curry leaves crackled in hot coconut oil — poured over a finished curry as the last step.",
        ),
        h2("Why It Doesn't Travel Well — Until Now"),
        p(
          "Freshly ground spice pastes and coconut milk lose their character within days, which is exactly why Malabar cuisine has historically been so hard to export with any authenticity — most of what travels is an approximation. Cooking and sealing close to the source is what lets the real spice profile make the trip intact. That's the idea behind everything we make: crafted in Malabar, created for the world.",
        ),
      ],
      seoTitle: "The Spices of Malabar: What Makes Kerala Gravies Different | Chefs Base LLP",
      seoDescription:
        "A guide to the spices and techniques behind authentic Kerala gravies — pepper, coconut, kudampuli, and the Malabar coast's culinary history.",
    },
  ];

  for (const post of posts) {
    await client.createOrReplace({
      _id: `post-${post.id}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.id },
      publishedAt: post.publishedAt,
      author,
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: post.image._id },
        alt: post.title,
      },
      excerpt: post.excerpt,
      body: post.body,
      readTime: post.readTime,
      featured: post.featured,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    });
    console.log(`  Created post: ${post.title}`);
  }
  console.log("Posts created.");

  console.log("\nBlog seed complete.");
}

main().catch((err) => {
  console.error("Blog seed failed:", err);
  process.exit(1);
});
