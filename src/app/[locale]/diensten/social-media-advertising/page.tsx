import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstSMAContent } from "@/components/services/DienstSMAContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/SMA.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstSMA", {
    title: "Social Media Advertising: adverteren op social media | Achieve",
    description: "Adverteren op Meta, TikTok, LinkedIn en meer met Achieve. Vanaf €497 per maand, plus opstartkosten en advertentiebudget.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstSMA">
      <DienstSMAContent />
    </ServicePage>
  );
}
