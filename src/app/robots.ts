import type { MetadataRoute } from "next";
import { locales, pathFor } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", ...locales.map((l) => pathFor(l, "Bedankt"))] },
    sitemap: "https://achieve.nl/sitemap.xml",
  };
}
