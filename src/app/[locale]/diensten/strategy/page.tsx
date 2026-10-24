import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstStrategyContent } from "@/components/services/DienstStrategyContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/Strategy.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstStrategy", {
    title: "Positionering en merkrichting | Achieve",
    description:
      "Een scherpe positionering die je merk onderscheidt en je doelgroep direct aanspreekt. Strategy van Achieve, vanaf €1.747 ex. btw.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstStrategy">
      <DienstStrategyContent />
    </ServicePage>
  );
}
