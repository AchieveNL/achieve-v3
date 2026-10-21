import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { VacatureSalesContent } from "@/components/pages/VacatureSalesContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/vacatureSales.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "VacatureSales", {
    title: "Sales stage bij Achieve | Werken bij Achieve",
    description:
      "Sales stage bij Achieve: 4 à 5 maanden meebouwen aan de groei van een digitaal bureau, met veel vrijheid en een bonus voor nieuwe klanten.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="VacatureSales">
      <VacatureSalesContent />
    </PageShell>
  );
}
