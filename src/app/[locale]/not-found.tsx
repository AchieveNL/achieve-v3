import { headers } from "next/headers";
import { SimpleShell } from "@/components/layout/SimpleShell";
import { NietGevondenContent } from "@/components/pages/NietGevondenContent";
import { defaultLocale, isLocale } from "@/i18n/config";
import "@/styles/pages/projecten.css";
import "@/styles/pages/case.css";
import "@/styles/pages/nietGevonden.css";

export const metadata = { title: "Pagina niet gevonden | Achieve", robots: { index: false, follow: true } };

export default async function NotFound() {
  const h = await headers();
  const l = h.get("x-locale") ?? defaultLocale;
  const locale = isLocale(l) ? l : defaultLocale;
  return (
    <SimpleShell locale={locale} page="NietGevonden" footer="simple">
      <NietGevondenContent />
    </SimpleShell>
  );
}
