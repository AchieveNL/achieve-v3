import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstUGCMarketingContent } from "@/components/services/DienstUGCMarketingContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/UGCMarketing.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "DienstUGCMarketing", {
    title: "UGC Marketing: video's van echte creators | Achieve",
    description:
      "Video's van echte creators die passen bij jouw merk. Wij zoeken de creator, regelen het contract en bedenken het concept. Vanaf €997 per maand.",
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstUGCMarketing">
      <DienstUGCMarketingContent />
    </ServicePage>
  );
}
