import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { TarievenContent } from "@/components/pages/TarievenContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/tarieven.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "Tarieven", {
    title: "Tarieven | Achieve",
    description:
      "Heldere vanaf-prijzen per dienst, van merkstrategie tot adverteren in Google. In je voorstel zie je precies wat jouw traject kost.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="Tarieven">
      <TarievenContent />
    </PageShell>
  );
}
