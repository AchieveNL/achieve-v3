import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstHostingContent } from "@/components/services/DienstHostingContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/Hosting.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstHosting", {
    title: "Snel en veilig online | Achieve",
    description:
      "Hosting van Achieve: de server waarop je website draait, zodat hij altijd online is. Servers in Amsterdam, vanaf €10,99 per maand.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstHosting">
      <DienstHostingContent />
    </ServicePage>
  );
}
