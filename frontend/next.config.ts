import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@clerk/nextjs"],
  },
  // Force middleware to run in Node.js runtime instead of Edge
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@clerk/nextjs/server");
    }
    return config;
  },
};

export default nextConfig;
