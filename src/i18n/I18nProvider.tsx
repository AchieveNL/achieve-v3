"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { pathFor, type Locale, type PageId } from "./config";
import { makeTranslator, type Dict, type Translator } from "./translate";

type Ctx = Translator & { page: PageId; href: (page: PageId | string, anchor?: string) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ locale, page, dicts, children }: { locale: Locale; page: PageId; dicts: Dict[]; children: ReactNode }) {
  const value = useMemo<Ctx>(() => {
    const tr = makeTranslator(locale, dicts);
    return { ...tr, page, href: (p, a) => pathFor(locale, p, a) };
  }, [locale, page, dicts]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Translation helpers for client components: t() for text, ta() for attributes, href() for internal links. */
export function useTr(): Ctx {
  const v = useContext(I18nContext);
  if (!v) throw new Error("useTr() must be used inside <I18nProvider>");
  return v;
}
