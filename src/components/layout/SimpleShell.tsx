import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getDicts, getTr } from "@/i18n/server";
import type { Locale, PageId } from "@/i18n/config";
import { CalendlyPopup } from "@/components/behavior/CalendlyPopup";
import { Footer } from "./Footer";
import { SimpleFooter } from "./SimpleFooter";
import { SimpleHeader } from "./SimpleHeader";
import { SvgDefs } from "./SvgDefs";

/**
 * Light shell for thank-you, 404 and legal pages: logo, language and "Terug naar home" instead of the full menu.
 * Legal pages keep the full footer (without the sticky mobile CTA bar), the others get a one-line footer.
 */
export async function SimpleShell({
  locale,
  page,
  footer,
  children,
}: {
  locale: Locale;
  page: PageId;
  footer: "simple" | "full";
  children: ReactNode;
}) {
  const dicts = await getDicts(locale, page);
  const tr = await getTr(locale, page);
  return (
    <I18nProvider locale={locale} page={page} dicts={dicts}>
      <div
        className="no-cta-bar"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "#FFFFFF",
          fontFamily: "var(--font-body)",
          color: "#0E1116",
        }}
      >
        <SvgDefs />
        <SimpleHeader />
        <main style={{ flex: "1 0 auto" }}>{children}</main>
        {footer === "full" ? <Footer tr={tr} /> : <SimpleFooter tr={tr} />}
      </div>
      <CalendlyPopup />
    </I18nProvider>
  );
}
