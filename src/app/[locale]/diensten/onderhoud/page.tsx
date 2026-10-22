import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstOnderhoudContent } from "@/components/services/DienstOnderhoudContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/Onderhoud.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstOnderhoud", {
    title: "Website onderhoud: veilig, snel en up-to-date | Achieve",
    description: "Wij houden je website veilig, snel en up-to-date, ook als hij niet door ons is gebouwd. Een vast bedrag per maand.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstOnderhoud">
      <DienstOnderhoudContent />
    </ServicePage>
  );
}
