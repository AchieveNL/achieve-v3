/**
 * 301/308 redirects from the old achieve.nl (project "achieve-last") to the new site,
 * so visitors with old links and Google rankings land on the right page.
 * Old site: Dutch at the root, English under /en with English slugs.
 * New site: Dutch slugs for every language, English under /en.
 */
type Redirect = { source: string; destination: string; permanent: true };

// Old case slugs that have a new case page; every other old case goes to the overview.
const caseMap: Record<string, string> = {
  "a-direct-autoparts": "a-direct",
  beddenenzo: "beddenenzo",
  "minimasters-playground": "minimasters",
  "ron-van-dam-art": "ron-van-dam",
  "sharkys-gym": "sharkys",
  "sushi-today": "sushi-today",
  "zorggroep-haarlemmermeer": "zorggroep-haarlemmermeer",
  "de-limes": "de-limes",
  "bionippy": "bionippy",
  "cherries": "cherries",
  "plan-les": "planles",
  gromotion: "gromotion",
  "logos-legal": "logos-legal",
  "turned-gov": "turned-government",
  "buru-construction": "buru-construction",
  "bouwvergunning-direct": "bouwvergunning-direct",
};
const oldCases = [
  "ayeway", "cabby-rentals", "career-rebels",
  "crypto-architect", "decathlon", "dermeclinic", "frootie", "gemeente-west-brabant", "gifted-tigers",
  "greenteam", "horloge-winkel", "kortingcentrum", "mevsen", "surprise-company",
  "the-cave-zanzibar", "vnmshop", "winkwing", "wrppn", "zcn-zzv",
];

// Old service slugs → new service slugs (only the ones that changed).
const serviceMap: Record<string, string> = {};
const services = [
  "brand-strategy", "brand-book", "web-development", "video-marketing", "search-engine-advertising",
  "social-media-management", "email-marketing", "ugc-marketing", "social-media-advertising", "dashboard", "legal",
];

const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

function forLocale(nl: boolean): Redirect[] {
  const p = nl ? "" : "/en";
  const out: Redirect[] = [];
  const old = (nlPath: string, enPath: string) => (nl ? nlPath : `/en${enPath}`);

  if (!nl) out.push(r("/en/about", "/en/over-ons"));
  out.push(r(old("/diensten", "/services"), `${p || "/"}#diensten`));
  for (const s of services) {
    const src = s === "legal" && nl ? "/juridisch/legal" : old(`/diensten/${s}`, `/services/${s}`);
    out.push(r(src, `${p}/diensten/${serviceMap[s] ?? s}`));
  }
  out.push(r(old("/tarieven/:slug", "/pricing/:slug"), `${p}/tarieven`));
  if (!nl) out.push(r("/en/pricing", "/en/tarieven"));
  // The old Dutch FAQ moves to /faq. The old English FAQ already lived at /en/faq, which is the new page itself.
  if (nl) out.push(r("/veelgestelde-vragen", "/faq"));
  if (!nl) out.push(r("/en/projects", "/en/projecten"));
  for (const [from, to] of Object.entries(caseMap)) {
    if (nl && from === to) continue;
    out.push(r(old(`/projecten/${from}`, `/projects/${from}`), `${p}/projecten/${to}`));
  }
  for (const c of oldCases) out.push(r(old(`/projecten/${c}`, `/projects/${c}`), `${p}/projecten`));
  out.push(r(old("/werken-bij/sales-internship", "/careers/sales-internship"), `${p}/werken-bij/sales`));
  out.push(r(old("/werken-bij/content-internship", "/careers/content-internship"), `${p}/werken-bij/content`));
  if (!nl) out.push(r("/en/careers", "/en/werken-bij"));
  out.push(r(old("/privacy-policy", "/privacy-policy"), `${p}/privacy`));
  out.push(r(old("/algemene-voorwaarden", "/algemene-voorwaarden"), `${p}/voorwaarden`));
  // A redirect onto itself would loop; drop those.
  return out.filter((x) => x.source !== x.destination);
}

// Strategy was renamed Brand Strategy on 24 Oct 2026: its old new-site address points to the new one in every language.
const renamed: Redirect[] = ["", "/en", "/es", "/fr", "/de", "/pl", "/tr", "/ar"].map((b) =>
  r(`${b}/diensten/strategy`, `${b}/diensten/brand-strategy`),
);

export const oldSiteRedirects: Redirect[] = [...forLocale(true), ...forLocale(false), ...renamed];
