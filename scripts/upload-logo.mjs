// One-off script to upload the 4 processed logo assets and attach them to siteSettings.
// Source PNGs (transparent, brand-tinted, cropped) must exist locally — not part of the repo.
// Run with: node --env-file=.env.local scripts/upload-logo.mjs
import { createClient } from "next-sanity";
import { readFile } from "node:fs/promises";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const DIR =
  "/tmp/claude-1000/-home-project-flow-Documents-AoC-chefs-base/36841460-50ec-4b6b-b776-c7eb10487a37/scratchpad/logo-pdf";

async function uploadImage(filename) {
  const buffer = await readFile(`${DIR}/${filename}`);
  return client.assets.upload("image", buffer, { filename });
}

async function main() {
  console.log("Uploading logo assets...");
  const [logoIcon, logoIconLight, logoFull, logoFullLight] = await Promise.all([
    uploadImage("logo-monogram-transparent.png"),
    uploadImage("monogram-cream.png"),
    uploadImage("logo-full-transparent.png"),
    uploadImage("full-cream.png"),
  ]);
  console.log("Uploaded.");

  const asImage = (asset) => ({ _type: "image", asset: { _type: "reference", _ref: asset._id } });

  await client
    .patch("siteSettings")
    .set({
      logoIcon: asImage(logoIcon),
      logoIconLight: asImage(logoIconLight),
      logoFull: asImage(logoFull),
      logoFullLight: asImage(logoFullLight),
    })
    .unset(["logo"]) // old single-field logo, replaced by the 4 fields above
    .commit();

  console.log("siteSettings updated with new logo fields.");
}

main().catch((err) => {
  console.error("Upload failed:", err);
  process.exit(1);
});
