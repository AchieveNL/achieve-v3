import type { Metadata } from "next";
import { ServicePage } from "@/components/services/ServicePage";
import { DienstDashboardContent } from "@/components/services/DienstDashboardContent";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/services/Dashboard.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "DienstDashboard", {
    title: "Al je cijfers in één overzicht | Achieve",
    description:
      "Achieve koppelt je databronnen aan één helder dashboard, zodat je in één oogopslag ziet hoe je bedrijf ervoor staat. Dashboard vanaf €997, eenmalig.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <ServicePage locale={locale} page="DienstDashboard">
      <DienstDashboardContent />
    </ServicePage>
  );
}
