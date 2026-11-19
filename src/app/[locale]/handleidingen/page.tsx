import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { HandleidingenContent } from "@/components/pages/HandleidingenContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/handleiding.css";

type Props = { params: Promise<{ locale: string }> };

/** Handleiding voor klanten: in alle 8 talen, maar niet in de zoekresultaten en niet in de sitemap. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "Handleidingen", {
    title: "Handleidingen | Achieve",
    description: "Stappenplannen voor klanten van Achieve.",
  });
  return { ...meta, robots: { index: false, follow: true } };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <SimpleShell locale={locale} page="Handleidingen" footer="full">
      <HandleidingenContent />
    </SimpleShell>
  );
}
