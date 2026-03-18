import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // prevent TS crash on Vercel
  },
  images: {
    unoptimized: true, // avoids image loader issues
  },
};

export default nextConfig;
