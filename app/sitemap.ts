import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { allProductsQuery, allPostsQuery } from "@/sanity/lib/queries";
import type { Product, Post } from "@/types";

const staticRoutes = [
  "",
  "/products",
  "/technology",
  "/about",
  "/blog",
  "/custom-orders",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [products, posts] = await Promise.all([
    client.fetch<Product[]>(allProductsQuery),
    client.fetch<Post[]>(allPostsQuery),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...postEntries];
}
