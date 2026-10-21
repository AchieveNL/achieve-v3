import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { isLocale, type PageId } from "@/i18n/config";

/** Shell for a service page: header/footer, the page content and the reading progress bar. */
export function ServicePage({ locale, page, children }: { locale: string; page: PageId; children: ReactNode }) {
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} page={page}>
      {children}
      <ReadingProgress />
    </PageShell>
  );
}
