// One-off content seed script — run with:
//   node --env-file=.env.local scripts/seed.mjs
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

function portableText(text) {
  return [
    {
      _type: "block",
      _key: "block1",
      style: "normal",
      children: [{ _type: "span", _key: "span1", text }],
    },
  ];
}

// Builds "Ingredients" + optional prep-note + numbered "Preparation" steps
// as Portable Text, sourced from the SOP documents.
function preparationSteps({ ingredients, note, steps }) {
  let key = 0;
  const nextKey = () => `k${key++}`;
  const heading = (text) => ({
    _type: "block",
    _key: nextKey(),
    style: "h4",
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
  const paragraph = (text) => ({
    _type: "block",
    _key: nextKey(),
    style: "normal",
    children: [{ _type: "span", _key: nextKey(), text }],
  });

  const blocks = [heading("Ingredients"), ...ingredients.map(bullet)];
  if (note) blocks.push(paragraph(note));
  blocks.push(heading("Preparation"), ...steps.map(numbered));
  return blocks;
}

async function main() {
  console.log("Uploading product images from Unsplash (full resolution)...");
  const images = {
    butterChicken: await uploadImage(
      "https://images.unsplash.com/photo-1772730065344-4cf131b39951",
      "butter-gravy-chicken.jpg",
    ),
    butterPaneer: await uploadImage(
      "https://images.unsplash.com/photo-1567529854338-fc097b962123",
      "butter-gravy-paneer.jpg",
    ),
    stew: await uploadImage(
      "https://images.unsplash.com/photo-1754573433917-066de5cc2425",
      "stew-chicken-mutton.jpg",
    ),
    fishMango: await uploadImage(
      "https://images.unsplash.com/photo-1735988813908-6d38db90c41e",
      "fish-mango-curry.jpg",
    ),
    beefVarattu: await uploadImage(
      "https://images.unsplash.com/photo-1545247181-516773cae754",
      "beef-varattu.jpg",
    ),
    kuruma: await uploadImage(
      "https://images.unsplash.com/photo-1532384159185-16f0bcfd5a5b",
      "yellow-kuruma.jpg",
    ),
  };
  console.log("Images uploaded.");

  console.log("Creating categories...");
  const categoryDefs = [
    { slug: "chicken", name: "Chicken" },
    { slug: "beef", name: "Beef" },
    { slug: "mutton", name: "Mutton" },
    { slug: "fish", name: "Fish" },
    { slug: "vegetarian", name: "Vegetarian" },
  ];
  const categories = {};
  for (const cat of categoryDefs) {
    await client.createOrReplace({
      _id: `category-${cat.slug}`,
      _type: "category",
      name: cat.name,
      slug: { _type: "slug", current: cat.slug },
    });
    categories[cat.slug] = `category-${cat.slug}`;
  }
  console.log("Categories created.");

  console.log("Creating products...");
  const products = [
    {
      id: "butter-gravy-chicken",
      name: "Butter Gravy – Chicken",
      category: categories.chicken,
      image: images.butterChicken,
      shortDescription:
        "Rich, creamy butter gravy with tomatoes and aromatic spices — restaurant-style flavor.",
      description:
        "A rich, creamy gravy prepared with butter, tomatoes, and aromatic spices to deliver an authentic restaurant-style flavour. Perfect with naan, chapati, parotta, or rice.",
      featured: true,
      prep: {
        ingredients: [
          "Chefs Base butter gravy – 160g",
          "Water – 300g",
          "Tomato sauce – 13g",
          "Milk – 300g",
          "Cashew paste – 30g",
          "Grilled chicken – 500g (14 pcs)",
          "Butter – 20g",
          "Fresh cream – 60g",
        ],
        note: "Cashew paste: combine 50g broken cashews with 100ml water and blend to a smooth, fine paste.",
        steps: [
          "Pour the butter gravy into a pan over medium heat.",
          "Add water, mix thoroughly, and bring to a boil. Cover, reduce to low flame, and simmer for 5 minutes.",
          "Stir in tomato sauce and cook uncovered for another minute.",
          "Add the cashew paste and mix well.",
          "Add the grilled chicken and sauté for 1–2 minutes. Add half the cream and 15g butter, and mix well.",
          "Pour in the milk and stir over low flame until uniformly mixed.",
          "Glaze with the remaining butter and fresh cream on top, then switch off the flame. Serve hot.",
        ],
      },
    },
    {
      id: "butter-gravy-paneer",
      name: "Butter Gravy – Paneer",
      category: categories.vegetarian,
      image: images.butterPaneer,
      shortDescription:
        "Vegetarian butter gravy with a smooth tomato-based sauce and blended spices.",
      description:
        "A delicious vegetarian butter gravy with a smooth tomato-based sauce and carefully blended spices, offering a rich and satisfying flavour.",
      featured: true,
    },
    {
      id: "stew-chicken-mutton",
      name: "Stew – Chicken / Mutton",
      category: categories.mutton,
      image: images.stew,
      shortDescription:
        "Traditional Kerala-style stew with coconut milk, whole spices, and mild aromatics.",
      description:
        "A traditional Kerala-style stew made with coconut milk, whole spices, and carefully selected ingredients, creating a mild, comforting, and aromatic curry.",
      featured: true,
      prep: {
        ingredients: [
          "Mutton – 500g (20 pcs)",
          "Water – 700g",
          "Cardamom – 6 pcs",
          "Cinnamon – 2.5g",
          "Clove – 6 pcs",
          "Salt – 3g",
          "Stew gravy – 200g",
          "Carrot cubes – 20g",
          "Potato cubes – 35g",
          "Coconut milk powder – 80g",
          "Cashew paste – 40g",
          "Crushed pepper – 1g",
          "Coconut oil – 4.5g",
        ],
        note:
          "Cashew paste: soak 50g broken cashews in 100ml warm water for 15 minutes, then blend to a smooth paste. Coconut milk: whisk 80g coconut milk powder into 100ml lukewarm water until smooth. Parboiled vegetables: dice carrots and potatoes into 1-inch cubes and boil until fork-tender (6–8 minutes), then drain.",
        steps: [
          "Combine the mutton, water, whole cardamom, cinnamon, cloves, and salt in a pressure cooker.",
          "Seal the lid and cook over high heat until the first whistle, then reduce to low and cook for 4–5 more whistles (about 12–15 minutes) until tender.",
          "Transfer the cooked mutton and its broth into a deep pan, then stir in the stew gravy base.",
          "Cover and bring to a rolling boil over medium heat for 5 minutes.",
          "Uncover and stir in the parboiled potato and carrot cubes, along with the crushed pepper and cashew paste.",
          "Simmer for 3 minutes, stirring constantly.",
          "Slowly pour in the prepared coconut milk while stirring continuously.",
          "Turn off the flame, drizzle with raw coconut oil, and serve hot.",
        ],
      },
    },
    {
      id: "fish-mango-curry",
      name: "Fish Mango Curry",
      category: categories.fish,
      image: images.fishMango,
      shortDescription:
        "Signature Malabar fish curry with tangy raw mango and traditional spices.",
      description:
        "A signature Malabar fish curry infused with the tangy flavour of raw mango and traditional spices, delivering the perfect balance of freshness and authentic coastal taste.",
      featured: true,
      prep: {
        ingredients: [
          "Chefs Base fish mango gravy – 200g",
          "Fish – 300g",
          "Water – 300g",
          "Mango slices – 30g",
          "Coconut milk powder – 80g",
          "Fried curry leaves – 2–5 pieces",
          "Ginger julienne – 1.5g",
        ],
        note:
          "Coconut milk: whisk the coconut milk powder into 100ml water until uniform and completely free of lumps. Set aside.",
        steps: [
          "Transfer the fish mango gravy into a pan and sauté.",
          "Add the fish pieces and sauté well.",
          "Pour in water and mix well. Cover and simmer.",
          "Add the mango pieces and mix well.",
          "Once the fish is cooked, add the coconut milk and mix well. Switch off the flame.",
          "Garnish with fried curry leaves, ginger julienne, and 3–5 mango slices. Serve hot.",
        ],
      },
    },
    {
      id: "beef-varattu",
      name: "Beef Varattu",
      category: categories.beef,
      image: images.beefVarattu,
      shortDescription: "Classic Kerala-style roasted beef masala with slow-cooked spices.",
      description:
        "A classic Kerala-style roasted beef masala featuring slow-cooked spices and a rich, bold flavour that captures the true essence of Malabar cuisine.",
      featured: false,
      prep: {
        ingredients: [
          "Cinnamon – 1.5g",
          "Cardamom – 3 pcs",
          "Clove – 3 pcs",
          "Beef – 500g",
          "Water – 500g",
          "Chefs Base Beef Varattu gravy – 200g",
        ],
        steps: [
          "Add the beef, spices, and water to a pressure cooker. Close the lid and cook for 10–15 whistles until the meat is tender. Keep aside.",
          "Transfer the beef varattu gravy into a pan and sauté.",
          "Add the cooked beef along with the remaining stock and mix well.",
          "Continue cooking until the liquid evaporates and the gravy turns dark and thick, coating the beef.",
          "Switch off the flame and serve hot.",
        ],
      },
    },
    {
      id: "yellow-kuruma",
      name: "Yellow Kuruma – Chicken / Vegetable",
      category: categories.vegetarian,
      image: images.kuruma,
      shortDescription:
        "Mildly spiced coconut-based curry, available in chicken and vegetable variants.",
      description:
        "A mildly spiced coconut-based curry with a creamy texture, available in both chicken and vegetable variants. An excellent companion for appam, chapati, parotta, and rice.",
      featured: false,
      prep: {
        ingredients: [
          "Chefs Base Kuruma gravy – 300g",
          "Cauliflower – 135g",
          "Carrot – 144g",
          "Beans – 150g",
          "Potato – 180g",
          "Green peas – 75g",
          "Water – 560g",
          "Cashew paste – 106g",
          "Coconut milk powder – 75g",
          "Crushed black pepper – 3g",
        ],
        note:
          "Coconut milk: whisk the coconut milk powder into 135ml water until smooth. Cashew paste: blend 50g cashew pieces with 100ml water into a fine paste. Pre-boil the vegetables until tender, then drain.",
        steps: [
          "Transfer the kuruma gravy into a pan and bring to a gentle sauté on low flame.",
          "Add the pre-boiled vegetables and mix well, then add water and mix again.",
          "After 2–3 minutes, stir in the cashew paste and mix well.",
          "Pour in the prepared coconut milk and stir on low flame.",
          "Season with crushed black pepper, and add salt if required.",
          "Switch off the flame and serve hot.",
        ],
      },
    },
  ];

  for (const p of products) {
    await client.createOrReplace({
      _id: `product-${p.id}`,
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.id },
      category: { _type: "reference", _ref: p.category },
      mainImage: {
        _type: "image",
        asset: { _type: "reference", _ref: p.image._id },
        alt: p.name,
      },
      shortDescription: p.shortDescription,
      description: portableText(p.description),
      ...(p.prep ? { preparationSteps: preparationSteps(p.prep) } : {}),
      shelfLife: "Up to 24 months at room temperature",
      storageInfo: "Store in a cool, dry place, away from direct sunlight.",
      customOrderAvailable: true,
      featured: p.featured,
    });
    console.log(`  Created product: ${p.name}`);
  }
  console.log("Products created.");

  console.log("Updating site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Chefs Base LLP",
    tagline: "Crafted in Malabar, created for the world",
    contactEmail: "chefsbasellp@outlook.com",
    contactPhone: "+918137060637",
    whatsappNumber: "+918137060637",
    address: "Door No. 110F, Ottupara, Pulikkal, Malappuram, Kerala 673634, India",
    gstNumber: "32AAWFC1382M1Z1",
    fssaiNumber: "11326999000225",
    colorScheme: "malabar-night",
    instagram: "https://instagram.com/chefsbasellp",
  });
  console.log("Site settings updated.");

  console.log("\nSeed complete.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
