import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { DisclaimerContent } from "@/components/pages/DisclaimerContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/disclaimer.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "Disclaimer", {
    title: "Disclaimer | Achieve",
    description: "",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <SimpleShell locale={locale} page="Disclaimer" footer="full">
      <DisclaimerContent />
    </SimpleShell>
  );
}
