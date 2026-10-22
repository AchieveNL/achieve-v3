import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstSMALooptijdContent } from "@/components/services/DienstSMALooptijdContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/SMALooptijd.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstSMALooptijd", {
    title: "Voorbeeld SMA looptijden – Social Media Advertising | Achieve",
    description: "Adverteren op Meta, TikTok, LinkedIn en meer met Achieve. Vanaf €497 per maand, plus opstartkosten en advertentiebudget.",
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstSMALooptijd">
      <DienstSMALooptijdContent />
    </ServicePage>
  );
}
