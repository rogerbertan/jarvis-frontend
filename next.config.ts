import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Temporarily disable Turbopack to enable middleware
  // turbopack: {
  //   resolveAlias: {
  //     "@": "./src",
  //   },
  // },
};

export default nextConfig;
