import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";

// Flips siteSettings.siteIsLive to true — the actual "launch" moment.
// Requires the same bypass cookie as the preview link, checked server-side
// here regardless of whether the button was visible client-side, so this
// can't be triggered by anyone who hasn't gone through /api/preview first.
export async function POST(request: NextRequest) {
  const bypass = request.cookies.get("launch_preview")?.value;
  const expected = process.env.LAUNCH_PREVIEW_SECRET;

  if (!expected || !bypass || bypass !== expected) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "2024-01-01",
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
  });

  await client.patch("siteSettings").set({ siteIsLive: true }).commit();

  return NextResponse.json({ success: true });
}
