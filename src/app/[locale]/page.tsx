import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Achiever } from "@/components/sections/Achiever";
import { Approach } from "@/components/sections/Approach";
import { ContactCta } from "@/components/sections/ContactCta";
import { FeaturedCases } from "@/components/sections/FeaturedCases";
import { Hero } from "@/components/sections/Hero";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { isLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale as Locale, "Main", {
    title: "Achieve | Digital agency voor ondernemers met ambitie",
    description:
      "Achieve bouwt merken, websites en online marketing voor ondernemers met ambitie. Eén team, heldere tarieven en meetbaar resultaat. Plan je groeigesprek.",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) return null;
  return (
    <PageShell locale={locale} page="Main">
      <Hero />
      <Achiever />
      <Services />
      <Approach />
      <FeaturedCases />
      <Team />
      <Reviews />
      <ContactCta />
    </PageShell>
  );
}
