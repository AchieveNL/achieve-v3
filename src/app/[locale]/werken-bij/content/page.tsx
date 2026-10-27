import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { VacatureContentContent } from "@/components/pages/VacatureContentContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/vacatureContent.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "VacatureContent", {
    title: "Content stage bij Achieve | Werken bij Achieve",
    description:
      "Content stage bij Achieve: bedenk, maak en publiceer content voor klanten en voor Achieve zelf, met veel vrijheid voor jouw ideeën.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="VacatureContent">
      <VacatureContentContent />
      <ReadingProgress />
    </PageShell>
  );
}
