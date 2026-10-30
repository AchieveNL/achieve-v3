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

export function pathFor(locale: Locale, page: PageId | string, anchor?: string): string {
  const slug = (routes as Record<string, string>)[page] ?? "";
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
