import type { MetadataRoute } from "next";

// Defaults to blocking all crawling — set NEXT_PUBLIC_ENABLE_INDEXING=true in
// Vercel once the real domain is connected and the site is ready to go live.
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const allowIndexing = process.env.NEXT_PUBLIC_ENABLE_INDEXING === "true";

  return {
    rules: {
      userAgent: "*",
      ...(allowIndexing
        ? { allow: "/", disallow: ["/studio", "/studio/", "/api/"] }
        : { disallow: "/" }),
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
