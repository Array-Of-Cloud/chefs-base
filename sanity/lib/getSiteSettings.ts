import { cache } from "react";
import { client } from "@/sanity/lib/client";
import { siteSettingsQuery } from "@/sanity/lib/queries";
import type { SiteSettings } from "@/types";

/**
 * siteSettings is fetched from multiple places per request (root layout theme,
 * root layout metadata, page-level metadata) — React's cache() dedupes those
 * into a single Sanity call per request instead of one per call site.
 */
export const getSiteSettings = cache(async () => {
  return client.fetch<SiteSettings | null>(siteSettingsQuery);
});
