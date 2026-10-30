import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { CaseADirectContent } from "@/components/cases/CaseADirectContent";
import { CaseBouwvergunningDirectContent } from "@/components/cases/CaseBouwvergunningDirectContent";
import { CaseBeddenenzoContent } from "@/components/cases/CaseBeddenenzoContent";
import { CaseMinimastersContent } from "@/components/cases/CaseMinimastersContent";
import { CaseRCpeptidesContent } from "@/components/cases/CaseRCpeptidesContent";
import { CaseRonVanDamContent } from "@/components/cases/CaseRonVanDamContent";
import { CaseSharkysContent } from "@/components/cases/CaseSharkysContent";
import { CaseSushiTodayContent } from "@/components/cases/CaseSushiTodayContent";
import { CaseZorggroepHaarlemmermeerContent } from "@/components/cases/CaseZorggroepHaarlemmermeerContent";
import { CaseDeLimesContent } from "@/components/cases/CaseDeLimesContent";
import { CaseBioNippyContent } from "@/components/cases/CaseBioNippyContent";
import { CaseCherriesContent } from "@/components/cases/CaseCherriesContent";
import { CasePlanLesContent } from "@/components/cases/CasePlanLesContent";
import { CaseGromotionContent } from "@/components/cases/CaseGromotionContent";
import { CaseDermeClinicContent } from "@/components/cases/CaseDermeClinicContent";
import { CaseHorlogewinkelContent } from "@/components/cases/CaseHorlogewinkelContent";
import { CaseLogosLegalContent } from "@/components/cases/CaseLogosLegalContent";
import { CaseTurnedGovContent } from "@/components/cases/CaseTurnedGovContent";
import { CaseBuruContent } from "@/components/cases/CaseBuruContent";
import { PageShell } from "@/components/layout/PageShell";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { isLocale, locales, routes, type Locale, type PageId } from "@/i18n/config";
import { getTr } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";

type CaseId = Extract<PageId, `Case${string}`>;
const CASES: Record<CaseId, { Content: ComponentType; title: string; description: string }> = {
  CaseBouwvergunningDirect: {
    Content: CaseBouwvergunningDirectContent,
    title: "BouwvergunningDirect: een heldere website voor het vergunningstraject | Achieve",
    description: "Hoe Achieve voor BouwvergunningDirect een WordPress-website bouwde die vergunningen, bouwtekeningen en constructieberekeningen begrijpelijk maakt voor particulieren en ondernemers.",
  },
  CaseSharkys: {
    Content: CaseSharkysContent,
    title: "Sharkys: van eerste klik tot try-out | Achieve",
    description:
      "Hoe Achieve voor Sharkys in Capelle a/d IJssel een nieuwe website bouwde met één duidelijke knop: Claim jouw 3 dagen try-out. Aanmeldingen landen via Virtuagym direct in de planning. Op dag 1 al nieuwe klanten.",
  },
  CaseSushiToday: {
    Content: CaseSushiTodayContent,
    title: "Sushi Today: fotoshoot en content met foodie influencers | Achieve",
    description: "Hoe Achieve met Sushi Today werkte: fotoshoot en content met foodie influencers.",
  },
  CaseRCpeptides: {
    Content: CaseRCpeptidesContent,
    title: "RCpeptides: 8,3x ROAS in de eerste maand | Achieve",
    description:
      "Hoe Achieve voor research-peptide webshop RCpeptides in de eerste maand 8,3x ROAS haalde met zoekadvertenties en Shopping: € 10.100 omzet op € 1.200 advertentiekosten.",
  },
  CaseADirect: {
    Content: CaseADirectContent,
    title: "A-direct Automaterialen: nieuw merk en website in eigen huisstijl | Achieve",
    description: "Hoe Achieve met A-direct Automaterialen werkte: nieuw merk en website in eigen huisstijl.",
  },
  CaseBeddenenzo: {
    Content: CaseBeddenenzoContent,
    title: "Beddenenzo: zichtbaar in Google met Search en Shopping | Achieve",
    description: "Hoe Achieve met Beddenenzo werkte: zichtbaar in Google met Search en Shopping.",
  },
  CaseMinimasters: {
    Content: CaseMinimastersContent,
    title: "Minimasters Playground: website en raamstickering, van idee tot oplevering | Achieve",
    description: "Hoe Achieve met Minimasters Playground werkte: website en raamstickering, van idee tot oplevering.",
  },
  CaseRonVanDam: {
    Content: CaseRonVanDamContent,
    title: "Ron van Dam: webshop voor mixed media portretten | Achieve",
    description: "Hoe Achieve met Ron van Dam werkte: webshop voor mixed media portretten.",
  },
  CaseZorggroepHaarlemmermeer: {
    Content: CaseZorggroepHaarlemmermeerContent,
    title: "Zorggroep Haarlemmermeer: aftermovie van Praktijk van de Toekomst 2025 | Achieve",
    description: "Hoe Achieve voor Zorggroep Haarlemmermeer het congres Praktijk van de Toekomst 2025 vastlegde in een aftermovie van 51 seconden.",
  },
  CaseDeLimes: {
    Content: CaseDeLimesContent,
    title: "HuisartsenSpoedpost De Limes: wervingsvideo's voor triagisten | Achieve",
    description: "Hoe Achieve voor HuisartsenSpoedpost De Limes twee wervingsvideo's maakte waarin triagisten zelf vertellen over hun werk.",
  },
  CaseBioNippy: {
    Content: CaseBioNippyContent,
    title: "BioNippy: coming soon-website voor een duurzaam boodschappenplatform | Achieve",
    description: "Hoe Achieve voor BioNippy een coming soon-website ontwierp ter voorbereiding op de internationale lancering van hun app.",
  },
  CaseCherries: {
    Content: CaseCherriesContent,
    title: "Cherries: speelse Shopify-webshop voor telefoonaccessoires | Achieve",
    description: "Hoe Achieve voor Cherries een speelse en overzichtelijke Shopify-webshop ontwierp, op desktop en mobiel.",
  },
  CasePlanLes: {
    Content: CasePlanLesContent,
    title: "PlanLes: app om rijlessen te plannen, betalen en volgen | Achieve",
    description: "Hoe Achieve voor PlanLes een app ontwierp waarin leerlingen en instructeurs lessen plannen, betalen en voortgang volgen.",
  },
  CaseGromotion: {
    Content: CaseGromotionContent,
    title: "Gromotion: nieuw logo en website voor een fysiotherapiepraktijk | Achieve",
    description: "Hoe Achieve voor fysiotherapiepraktijk Gromotion een nieuw logo en een frisse, toegankelijke website ontwierp.",
  },
  CaseLogosLegal: {
    Content: CaseLogosLegalContent,
    title: "Logos Legal: moderne website voor een advocatenkantoor | Achieve",
    description: "Hoe Achieve voor advocatenkantoor Logos Legal een moderne website met een klassieke uitstraling ontwierp.",
  },
  CaseTurnedGov: {
    Content: CaseTurnedGovContent,
    title: "Turned Government International: WordPress-website voor overheidscontracten | Achieve",
    description: "Hoe Achieve voor Turned Government International een heldere en professionele WordPress-website ontwierp.",
  },
  CaseBuru: {
    Content: CaseBuruContent,
    title: "Buru Construction: nieuw merk met een stier als mascotte | Achieve",
    description: "Hoe Achieve voor renovatiebedrijf Buru Construction een stier als mascotte ontwierp en een website die erbij past.",
  },
  CaseHorlogewinkel: {
    Content: CaseHorlogewinkelContent,
    title: "Horlogewinkel.com: 30% hogere ROAS met CRO en Google Shopping | Achieve",
    description: "Hoe Achieve voor Horlogewinkel.com de conversie verbeterde en met een geoptimaliseerde productfeed en Google Shopping de ROAS met 30% verhoogde.",
  },
  CaseDermeClinic: {
    Content: CaseDermeClinicContent,
    title: "Dermé Clinic: 23 afspraken in één maand met CRO en Google Ads | Achieve",
    description: "Hoe Achieve voor Dermé Clinic de website optimaliseerde en met gerichte Google Ads-campagnes in één maand 23 afspraken opleverde.",
  },
};

/** "sharkys" -> "CaseSharkys" via the route table (projecten/sharkys). */
function caseFor(slug: string): CaseId | null {
  const hit = (Object.keys(CASES) as CaseId[]).find((id) => routes[id] === `projecten/${slug}`);
  return hit ?? null;
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => (Object.keys(CASES) as CaseId[]).map((id) => ({ locale, slug: routes[id].split("/")[1] })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const id = caseFor(slug);
  if (!id) return {};
  return pageMetadata(locale as Locale, id, CASES[id]);
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  const id = caseFor(slug);
  if (!isLocale(locale) || !id) notFound();
  const { Content } = CASES[id];
  const tr = await getTr(locale, id);
  return (
    <PageShell locale={locale} page={id}>
      <Content />
      <ProjectsCta tr={tr} />
      <ReadingProgress />
    </PageShell>
  );
}
