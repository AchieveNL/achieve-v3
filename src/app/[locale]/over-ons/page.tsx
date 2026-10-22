import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { OverOnsContent } from "@/components/pages/OverOnsContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/werkenBij.css";
import "@/styles/pages/overOns.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "OverOns", {
    title: "Over ons: het team achter Achieve | Achieve",
    description:
      "Maak kennis met Achieve: de digital agency voor ondernemers die meer willen. Ons verhaal, waar we voor staan en het team achter je groei.",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="OverOns">
      <OverOnsContent />
    </PageShell>
  );
}
