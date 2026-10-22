import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { FAQContent } from "@/components/pages/FAQContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/werkenBij.css";
import "@/styles/pages/overOns.css";
import "@/styles/pages/faq.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "FAQ", {
    title: "Veelgestelde vragen over samenwerken, prijzen en looptijd | Achieve",
    description:
      "Antwoord op de vragen die ondernemers ons het vaakst stellen: hoe een samenwerking begint, wat het kost, looptijd en opzeggen, websites, hosting en marketing.",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="FAQ">
      <FAQContent />
    </PageShell>
  );
}
