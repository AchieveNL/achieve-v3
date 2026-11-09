/**
 * 301/308 redirects from the old achieve.nl (project "achieve-last") to the new site,
 * so visitors with old links and Google rankings land on the right page.
 * Old site: Dutch at the root, English under /en with English slugs.
 * New site: Dutch at the root, other languages under /<locale> with translated URL words (see i18n/config segments).
 */
import { localizeSlug, type Locale } from "./src/i18n/config";
type Redirect = { source: string; destination: string; permanent: true };

// Old case slugs that have a new case page; every other old case goes to the overview.
const caseMap: Record<string, string> = {
  "surprise-company": "surprise-company",
  "gemeente-west-brabant": "regio-west-brabant",
  "zcn-zzv": "zcn-zzv",
  "decathlon": "decathlon",
  "mevsen": "mevsen",
  "career-rebels": "career-rebels",
  "greenteam": "greenteam",
  "kortingcentrum": "kortingcentrum",
  "frootie": "frootie",
  "wrppn": "wrppn",
  "crypto-architect": "crypto-architect",
  "winkwing": "winkwing",
  "dermeclinic": "derme-clinic",
  "horloge-winkel": "horlogewinkel",
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
  "ayeway", "cabby-rentals", 
  "gifted-tigers",
  
  "the-cave-zanzibar", "vnmshop", 
];

// Old service slugs → new service slugs (only the ones that changed).
const serviceMap: Record<string, string> = {};
const services = [
  "brand-strategy", "brand-book", "web-development", "video-marketing", "search-engine-advertising",
  "social-media-management", "email-marketing", "ugc-marketing", "social-media-advertising", "dashboard", "legal",
];

/** "/en/diensten/x" -> "/en/services/x" (keeps a #hash). */
function loc(l: Locale, path: string): string {
  const [p, hash] = path.split("#");
  const rest = p.replace(new RegExp(`^/${l}/?`), "");
  return `/${l}${rest ? "/" + localizeSlug(l, rest) : ""}${hash !== undefined ? "#" + hash : ""}`;
}

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
  // English destinations use the translated URL words; a redirect onto itself would loop, so drop those.
  return out.map((x) => (nl ? x : { ...x, destination: loc("en", x.destination) })).filter((x) => x.source !== x.destination);
}

// Strategy was renamed Brand Strategy on 24 Oct 2026: its old new-site address points to the new one in every language.
const renamed: Redirect[] = (["nl", "en", "es", "fr", "de", "pl", "tr", "ar"] as Locale[]).flatMap((l) =>
  l === "nl"
    ? [r("/diensten/strategy", "/diensten/brand-strategy")]
    : [
        r(`/${l}/diensten/strategy`, loc(l, `/${l}/diensten/brand-strategy`)),
        r(loc(l, `/${l}/diensten/strategy`), loc(l, `/${l}/diensten/brand-strategy`)),
      ],
);

// Old addresses Google still reported as 404 (Search Console, 9 Nov 2026).
const all: Locale[] = ["nl", "en", "es", "fr", "de", "pl", "tr", "ar"];
const at = (l: Locale, nlPath: string) => (l === "nl" ? nlPath : loc(l, `/${l}${nlPath}`));
const found404: Redirect[] = [
  // Old personal pages of the team → Over ons.
  ...["karim", "abdelmonim", "niek", "seyma", "jonas", "denise"].map((n) => r(`/${n}`, "/over-ons")),
  // Old service and vacancy slugs, in every language (Dutch and translated words).
  ...all.flatMap((l) =>
    [
      ["/diensten/custom-website", "/diensten/web-development"],
      ["/werken-bij/sales-stage", "/werken-bij/sales"],
      ["/werken-bij/content-stage", "/werken-bij/content"],
    ].flatMap(([from, to]) => {
      const out = [r(at(l, from), at(l, to))];
      if (l !== "nl") out.push(r(`/${l}${from}`, at(l, to)));
      return out;
    }),
  ),
].filter((x, i, a) => x.source !== x.destination && a.findIndex((y) => y.source === x.source) === i);

export const oldSiteRedirects: Redirect[] = [...forLocale(true), ...forLocale(false), ...renamed, ...found404];
