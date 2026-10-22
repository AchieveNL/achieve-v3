import type { MetadataRoute } from "next";
import { locales, pathFor, routes, type PageId } from "@/i18n/config";

/** Every page in all 8 languages, with hreflang alternates. Thank-you, 404 and the SMA term variant are left out. */
const SKIP: PageId[] = ["Bedankt", "NietGevonden", "DienstSMALooptijd"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://achieve.nl";
  const pages = (Object.keys(routes) as PageId[]).filter((p) => !SKIP.includes(p));
  return pages.flatMap((page) =>
    locales.map((l) => ({
      url: base + pathFor(l, page),
      changeFrequency: "monthly" as const,
      priority: page === "Main" ? 1 : page.startsWith("Dienst") ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, base + pathFor(x, page)])) },
    })),
  );
}
