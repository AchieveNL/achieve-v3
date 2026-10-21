import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstLegalContent } from "@/components/services/DienstLegalContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/Legal.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstLegal", {
    title: "Legal: juridisch advies voor ondernemers | Achieve",
    description:
      "Juridisch advies voor ondernemers: een scan van je onderneming, algemene voorwaarden op maat en bescherming van je merk. Vanaf €197 eenmalig.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstLegal">
      <DienstLegalContent />
    </ServicePage>
  );
}
