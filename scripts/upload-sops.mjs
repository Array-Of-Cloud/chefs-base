// One-off script to upload SOP PDFs and attach them to their products.
// Run with: node --env-file=.env.local scripts/upload-sops.mjs
// PDF source files must be present locally at the paths below (not part of the repo).
import { createClient } from "next-sanity";
import { readFile } from "node:fs/promises";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const SOP_DIR =
  "/tmp/claude-1000/-home-project-flow-Documents-AoC-chefs-base/36841460-50ec-4b6b-b776-c7eb10487a37/scratchpad/sop-inspect";

async function uploadPdf(filename) {
  const buffer = await readFile(`${SOP_DIR}/${filename}`);
  return client.assets.upload("file", buffer, {
    filename,
    contentType: "application/pdf",
  });
}

// productId -> one or more { label, filename } SOP documents
const mapping = [
  { productId: "product-beef-varattu", sops: [{ filename: "CB BEEF VARATTU.pdf" }] },
  { productId: "5bc4e151-df46-4087-80b4-047b008518dc", sops: [{ filename: "CB BIRIYANI MASALA 1.pdf" }] },
  { productId: "product-butter-gravy-chicken", sops: [{ filename: "CB BUTTER CHICKEN.pdf" }] },
  { productId: "fea192e2-d4c4-42d6-adbb-7078ead1bc99", sops: [{ filename: "CB INSTANT BASE GRAVY.pdf" }] },
  { productId: "product-fish-mango-curry", sops: [{ filename: "CB FISH MANGO.pdf" }] },
  { productId: "1eea13c2-aedf-4f78-9ae3-be7d2bd31d0d", sops: [{ filename: "CB MALABAR CHICKEN.pdf" }] },
  { productId: "product-stew-chicken-mutton", sops: [{ filename: "CB STEW GRAVY.pdf" }] },
  {
    productId: "product-yellow-kuruma",
    sops: [
      { label: "Vegetable", filename: "CB YELLOW VEG KURUMA.pdf" },
      { label: "Chicken", filename: "CB YELLOW CHICKEN KORMA.pdf" },
    ],
  },
];

async function main() {
  const uploadedAssets = new Map();

  for (const { productId, sops } of mapping) {
    const sopFiles = [];
    for (const sop of sops) {
      if (!uploadedAssets.has(sop.filename)) {
        console.log(`Uploading ${sop.filename}...`);
        uploadedAssets.set(sop.filename, await uploadPdf(sop.filename));
      }
      const asset = uploadedAssets.get(sop.filename);
      sopFiles.push({
        _type: "sopFile",
        _key: sop.filename.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        ...(sop.label ? { label: sop.label } : {}),
        file: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
      });
    }

    await client.patch(productId).set({ sopFiles }).commit();
    console.log(`  Attached ${sopFiles.length} SOP(s) to ${productId}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
