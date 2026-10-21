import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstEmailMarketingContent } from "@/components/services/DienstEmailMarketingContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/EmailMarketing.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "DienstEmailMarketing", {
    title: "Email Marketing: nieuwsbrieven en automatische e-mails | Achieve",
    description: "Nieuwsbrieven en automatische e-mails die je klanten op het juiste moment bereiken. Begeleiding vanaf €997.",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstEmailMarketing">
      <DienstEmailMarketingContent />
    </ServicePage>
  );
}
