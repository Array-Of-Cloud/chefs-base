import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Multiple root layouts ((site) and studio) mean there's no single
    // layout to compose a global 404 from — this is Next's documented
    // escape hatch for that exact case. See app/global-not-found.tsx.
    globalNotFound: true,
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    // Next 15+ defaults this to "attachment", which makes browsers download
    // optimized images instead of displaying them inline in <img> tags.
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
