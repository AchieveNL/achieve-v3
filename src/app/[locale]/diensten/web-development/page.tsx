import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstWebDevelopmentContent } from "@/components/services/DienstWebDevelopmentContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/WebDevelopment.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstWebDevelopment", {
    title: "Web Development: website op maat of webshop in Shopify | Achieve",
    description: "Een website op maat of een webshop in Shopify, mooi op elk scherm en klaar voor betalingen. Vanaf €4.497 eenmalig.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstWebDevelopment">
      <DienstWebDevelopmentContent />
    </ServicePage>
  );
}
