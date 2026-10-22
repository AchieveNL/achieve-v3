import type { NextConfig } from "next";
import { oldSiteRedirects } from "./redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  async redirects() {
    return oldSiteRedirects;
  },
};

export default nextConfig;
