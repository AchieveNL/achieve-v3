import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstSMMContent } from "@/components/services/DienstSMMContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/SMM.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstSMM", {
    title: "Beheer van je social media | Achieve",
    description: "Achieve maakt je content, plant je posts en houdt je social media actief. Social Media Management vanaf €497 per maand.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstSMM">
      <DienstSMMContent />
    </ServicePage>
  );
}
