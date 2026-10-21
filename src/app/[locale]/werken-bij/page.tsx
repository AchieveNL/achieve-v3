import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { WerkenBijContent } from "@/components/pages/WerkenBijContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/werkenBij.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "WerkenBij", {
    title: "Werken bij Achieve: stages en vacatures | Achieve",
    description:
      "Werken bij Achieve: een open cultuur, toffe klanten en ruimte om te groeien. Bekijk onze stages in sales en content, of stuur een open sollicitatie.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="WerkenBij">
      <WerkenBijContent />
    </PageShell>
  );
}
