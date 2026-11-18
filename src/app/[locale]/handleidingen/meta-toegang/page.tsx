import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { HandleidingMetaContent } from "@/components/pages/HandleidingMetaContent";
import { isLocale, pathFor, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/handleiding.css";

type Props = { params: Promise<{ locale: string }> };

/** Handleiding voor klanten: alleen in het Nederlands, niet in de zoekresultaten en niet in de sitemap. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "HandleidingMeta", {
    title: "Geef Achieve toegang tot Meta | Achieve",
    description: "Zo zet je Facebook- en Instagram-advertenties klaar en geef je Achieve partnertoegang in Meta Business Suite.",
  });
  return { ...meta, alternates: { canonical: pathFor("nl", "HandleidingMeta") }, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (locale !== "nl") redirect(pathFor("nl", "HandleidingMeta"));
  return (
    <SimpleShell locale={locale} page="HandleidingMeta" footer="full">
      <HandleidingMetaContent />
    </SimpleShell>
  );
}
