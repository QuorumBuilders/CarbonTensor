import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    if (!backendUrl) return [];

    return [
      {
        source: "/api/v1/:path*",
        // Django's API routes require a trailing slash, including for POSTs.
        destination: `${backendUrl}/api/v1/:path*/`,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
