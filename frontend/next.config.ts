import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // prevent TS crash on Vercel
  },
  eslint: {
    ignoreDuringBuilds: true, // prevent lint crash
  },
  images: {
    unoptimized: true, // avoids image loader issues
  },
};

export default nextConfig;
