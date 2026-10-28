import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstAIAContent } from "@/components/services/DienstAIAContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/AIA.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstAIA", {
    title: "Adverteren in ChatGPT | Achieve",
    description: "Adverteren in ChatGPT met Achieve. Begin met een test van 3 maanden en beslis daarna op basis van cijfers, vanaf €999 per maand.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstAIA">
      <DienstAIAContent />
    </ServicePage>
  );
}
