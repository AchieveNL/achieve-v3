import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { PrivacyContent } from "@/components/pages/PrivacyContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/privacy.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "Privacy", {
    title: "Privacyverklaring | Achieve",
    description: "",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <SimpleShell locale={locale} page="Privacy" footer="full">
      <PrivacyContent />
    </SimpleShell>
  );
}
