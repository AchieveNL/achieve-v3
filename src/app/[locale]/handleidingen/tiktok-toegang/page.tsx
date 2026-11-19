import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { HandleidingTikTokContent } from "@/components/pages/HandleidingTikTokContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/handleiding.css";

type Props = { params: Promise<{ locale: string }> };

/** Handleiding voor klanten: in alle 8 talen, maar niet in de zoekresultaten en niet in de sitemap. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "HandleidingTikTok", {
    title: "Geef Achieve toegang tot TikTok | Achieve",
    description: "Zo zet je TikTok-advertenties klaar en geef je Achieve partnertoegang in TikTok Business Center.",
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <SimpleShell locale={locale} page="HandleidingTikTok" footer="full">
      <HandleidingTikTokContent />
    </SimpleShell>
  );
}
