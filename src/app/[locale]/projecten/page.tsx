import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { ClientStrip } from "@/components/projects/ClientStrip";
import { FeaturedCase } from "@/components/projects/FeaturedCase";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectsCta } from "@/components/projects/ProjectsCta";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { QuoteBand } from "@/components/projects/QuoteBand";
import { Reviews } from "@/components/sections/Reviews";
import { isLocale, type Locale } from "@/i18n/config";
import { getTr } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "Projecten", {
    title: "Projecten | Achieve – merken, websites en campagnes",
    description: "Bekijk projecten van Achieve: merken, websites, webshops, campagnes en video voor ondernemers met ambitie. Met resultaten en reviews van onze klanten.",
  });
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  const tr = await getTr(locale, "Projecten");
  return (
    <PageShell locale={locale} page="Projecten">
      <ProjectsHero />
      <ClientStrip />
      <FeaturedCase />
      <ProjectGrid />
      <QuoteBand />
      <Reviews />
      <ProjectsCta tr={tr} />
    </PageShell>
  );
}
