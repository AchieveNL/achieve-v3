import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstSEAContent } from "@/components/services/DienstSEAContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/SEA.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "DienstSEA", {
    title: "Search Engine Advertising: adverteren in Google | Achieve",
    description: "Adverteren in Google met Achieve. We zetten je campagnes op en sturen ze samen met jou bij, vanaf €1.197 per maand.",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstSEA">
      <DienstSEAContent />
    </ServicePage>
  );
}
