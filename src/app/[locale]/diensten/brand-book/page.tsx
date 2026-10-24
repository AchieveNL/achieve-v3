import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstBrandBookContent } from "@/components/services/DienstBrandBookContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/BrandBook.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstBrandBook", {
    title: "Je huisstijl in één handboek | Achieve",
    description:
      "Een huisstijlhandboek met je logo, pay-off, kleuren, letters en vormentaal, plus volledig gebruiksrecht. Vanaf €1.497 eenmalig.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstBrandBook">
      <DienstBrandBookContent />
    </ServicePage>
  );
}
