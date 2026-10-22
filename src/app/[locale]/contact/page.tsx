import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ContactContent } from "@/components/pages/ContactContent";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/contact.css";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = await pageMetadata(locale as Locale, "Contact", {
    title: "Contact | Achieve",
    description:
      "Neem contact op met Achieve: plan een vrijblijvend groeigesprek, bel 085 401 6590 of mail info@achieve.nl. Op werkdagen heb je binnen 4 uur antwoord.",
  });
  return meta;
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page="Contact">
      <ContactContent />
    </PageShell>
  );
}
