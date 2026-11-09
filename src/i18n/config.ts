export const locales = ["nl", "en", "es", "fr", "de", "pl", "tr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

/** Page ids match the design files (Main.dc.html -> "Main"). */
export const routes = {
  Main: "",
  Projecten: "projecten",
  Tarieven: "tarieven",
  WerkenBij: "werken-bij",
  OverOns: "over-ons",
  VacatureSales: "werken-bij/sales",
  VacatureContent: "werken-bij/content",
  Contact: "contact",
  Bedankt: "bedankt",
  NietGevonden: "404",
  Privacy: "privacy",
  Voorwaarden: "voorwaarden",
  Disclaimer: "disclaimer",
  FAQ: "faq",
  DienstStrategy: "diensten/brand-strategy",
  DienstLegal: "diensten/legal",
  DienstBrandBook: "diensten/brand-book",
  DienstWebDevelopment: "diensten/web-development",
  DienstEmailMarketing: "diensten/email-marketing",
  DienstVideoMarketing: "diensten/video-marketing",
  DienstUGCMarketing: "diensten/ugc-marketing",
  DienstSEA: "diensten/search-engine-advertising",
  DienstSMA: "diensten/social-media-advertising",
  DienstSMALooptijd: "diensten/social-media-advertising/looptijd",
  DienstAIA: "diensten/ai-advertising",
  DienstSMM: "diensten/social-media-management",
  DienstDashboard: "diensten/dashboard",
  DienstHosting: "diensten/hosting",
  DienstOnderhoud: "diensten/onderhoud",
  CaseSharkys: "projecten/sharkys",
  CaseSushiToday: "projecten/sushi-today",
  CaseRCpeptides: "projecten/rcpeptides",
  CaseADirect: "projecten/a-direct",
  CaseBeddenenzo: "projecten/beddenenzo",
  CaseMinimasters: "projecten/minimasters",
  CaseRonVanDam: "projecten/ron-van-dam",
  CaseBouwvergunningDirect: "projecten/bouwvergunning-direct",
  CaseZorggroepHaarlemmermeer: "projecten/zorggroep-haarlemmermeer",
  CaseDeLimes: "projecten/de-limes",
  CaseBioNippy: "projecten/bionippy",
  CaseCherries: "projecten/cherries",
  CasePlanLes: "projecten/planles",
  CaseGromotion: "projecten/gromotion",
  CaseSurpriseCompany: "projecten/surprise-company",
  CaseRegioWestBrabant: "projecten/regio-west-brabant",
  CaseZcnZzv: "projecten/zcn-zzv",
  CaseDecathlon: "projecten/decathlon",
  CaseMevsen: "projecten/mevsen",
  CaseCareerRebels: "projecten/career-rebels",
  CaseGreenTeam: "projecten/greenteam",
  CaseKortingCentrum: "projecten/kortingcentrum",
  CaseFrootie: "projecten/frootie",
  CaseWrppn: "projecten/wrppn",
  CaseCryptoArchitect: "projecten/crypto-architect",
  CaseWinkWing: "projecten/winkwing",
  CaseDermeClinic: "projecten/derme-clinic",
  CaseHorlogewinkel: "projecten/horlogewinkel",
  CaseLogosLegal: "projecten/logos-legal",
  CaseTurnedGov: "projecten/turned-government",
  CaseBuru: "projecten/buru-construction",
} as const;
export type PageId = keyof typeof routes;

/**
 * Translated URL words per language. The pages themselves live under the Dutch folder names;
 * proxy.ts rewrites translated URLs to them and redirects old Dutch words to the translated ones.
 * Service and project names that are already names (brand-strategy, sharkys) stay the same everywhere.
 */
const EN_SEG = {
  diensten: "services", projecten: "projects", tarieven: "pricing", "werken-bij": "careers", "over-ons": "about-us",
  contact: "contact", bedankt: "thank-you", privacy: "privacy", voorwaarden: "terms", disclaimer: "disclaimer",
  faq: "faq", onderhoud: "maintenance", looptijd: "duration",
};
export const segments: Record<Exclude<Locale, "nl">, Record<string, string>> = {
  en: EN_SEG,
  ar: EN_SEG,
  de: {
    diensten: "leistungen", projecten: "projekte", tarieven: "preise", "werken-bij": "karriere", "over-ons": "ueber-uns",
    contact: "kontakt", bedankt: "danke", privacy: "datenschutz", voorwaarden: "agb", disclaimer: "haftungsausschluss",
    faq: "faq", onderhoud: "wartung", looptijd: "laufzeit",
  },
  fr: {
    diensten: "services", projecten: "projets", tarieven: "tarifs", "werken-bij": "carrieres", "over-ons": "a-propos",
    contact: "contact", bedankt: "merci", privacy: "confidentialite", voorwaarden: "conditions", disclaimer: "avertissement",
    faq: "faq", onderhoud: "maintenance", looptijd: "duree",
  },
  es: {
    diensten: "servicios", projecten: "proyectos", tarieven: "precios", "werken-bij": "empleo", "over-ons": "sobre-nosotros",
    contact: "contacto", bedankt: "gracias", privacy: "privacidad", voorwaarden: "condiciones", disclaimer: "aviso-legal",
    faq: "preguntas-frecuentes", onderhoud: "mantenimiento", looptijd: "duracion",
  },
  pl: {
    diensten: "uslugi", projecten: "projekty", tarieven: "cennik", "werken-bij": "kariera", "over-ons": "o-nas",
    contact: "kontakt", bedankt: "dziekujemy", privacy: "prywatnosc", voorwaarden: "regulamin", disclaimer: "zastrzezenia",
    faq: "faq", onderhoud: "utrzymanie", looptijd: "okres",
  },
  tr: {
    diensten: "hizmetler", projecten: "projeler", tarieven: "fiyatlar", "werken-bij": "kariyer", "over-ons": "hakkimizda",
    contact: "iletisim", bedankt: "tesekkurler", privacy: "gizlilik", voorwaarden: "kosullar", disclaimer: "sorumluluk-reddi",
    faq: "sss", onderhoud: "bakim", looptijd: "sure",
  },
};

/** Dutch slug ("diensten/onderhoud") -> slug in the given language ("services/maintenance"). */
export function localizeSlug(locale: Locale, slug: string): string {
  if (locale === defaultLocale) return slug;
  const map = segments[locale as Exclude<Locale, "nl">];
  return slug.split("/").map((s) => map[s] ?? s).join("/");
}

/** Translated path segments -> Dutch segments, as the page folders are named. */
export function delocalizeSegments(locale: Locale, segs: string[]): string[] {
  if (locale === defaultLocale) return segs;
  const map = segments[locale as Exclude<Locale, "nl">];
  const rev: Record<string, string> = {};
  for (const [nl, t] of Object.entries(map)) rev[t] = nl;
  return segs.map((s) => rev[s] ?? s);
}

export function pathFor(locale: Locale, page: PageId | string, anchor?: string): string {
  const slug = localizeSlug(locale, (routes as Record<string, string>)[page] ?? "");
  const base = locale === defaultLocale ? "" : `/${locale}`;
  const p = `${base}/${slug}`.replace(/\/+$/, "") || "/";
  return anchor ? `${p}#${anchor}` : p;
}

export const localeNames: Record<Locale, string> = {
  nl: "Nederlands",
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pl: "Polski",
  tr: "Türkçe",
  ar: "العربية",
};

/** Menu item that counts as "current" for a page (case pages live under Projecten, vacancies under Werken bij). */
export function navSection(page: string): string {
  if (page.startsWith("Case")) return "Projecten";
  if (page.startsWith("Vacature")) return "WerkenBij";
  return page;
}
