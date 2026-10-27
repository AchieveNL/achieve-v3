import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { PageLoader } from "@/components/ui/PageLoader";
import { getDicts, getTr } from "@/i18n/server";
import type { Locale, PageId } from "@/i18n/config";
import { CalendlyPopup } from "@/components/behavior/CalendlyPopup";
import { ButtonFit } from "@/components/behavior/ButtonFit";
import { DragScroll } from "@/components/behavior/DragScroll";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SvgDefs } from "./SvgDefs";

/** Header + footer + shared behaviour around every page. */
export async function PageShell({ locale, page, children }: { locale: Locale; page: PageId; children: ReactNode }) {
  const dicts = await getDicts(locale, page);
  const tr = await getTr(locale, page);
  return (
    <I18nProvider locale={locale} page={page} dicts={dicts}>
      <div style={{ fontFamily: "var(--font-body)", color: "#0E1116", background: "#FFFFFF" }}>
        <SvgDefs />
        <Header />
        <main>{children}</main>
        <Footer tr={tr} />
      </div>
      <CalendlyPopup />
      <ButtonFit />
      <PageLoader />
      <DragScroll />
    </I18nProvider>
  );
}
