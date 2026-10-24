import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstVideoMarketingContent } from "@/components/services/DienstVideoMarketingContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/VideoMarketing.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstVideoMarketing", {
    title: "Video's die jouw verhaal vertellen | Achieve",
    description:
      "Video's die jouw verhaal vertellen, van idee en script tot montage, met onze cameraploeg bij jou op locatie. Vanaf €1.447 per maand.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstVideoMarketing">
      <DienstVideoMarketingContent />
    </ServicePage>
  );
}
