import type { NextConfig } from "next";
import { oldSiteRedirects } from "./redirects";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  // Inline the CSS in the HTML: no render-blocking stylesheet request before first paint.
  experimental: { inlineCss: true },
  async redirects() {
    return oldSiteRedirects;
  },
};

export default nextConfig;
