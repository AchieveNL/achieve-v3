import type { Metadata } from "next";
import { locales, pathFor, type Locale, type PageId } from "@/i18n/config";
import { getTr } from "@/i18n/server";

const OG_LOCALE: Record<Locale, string> = {
  nl: "nl_NL",
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
  de: "de_DE",
  pl: "pl_PL",
  tr: "tr_TR",
  ar: "ar_AR",
};

/** Title/description are written in Dutch and translated through the page dictionary. */
export async function pageMetadata(locale: Locale, page: PageId, nl: { title: string; description: string }): Promise<Metadata> {
  const { t } = await getTr(locale, page);
  const title = t(nl.title);
  const description = t(nl.description);
  const url = pathFor(locale, page);
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, pathFor(l, page)])),
    },
    openGraph: {
      type: "website",
      siteName: "Achieve",
      locale: OG_LOCALE[locale],
      url,
      title,
      description,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og-image.jpg"] },
    robots: { index: true, follow: true },
  };
}
