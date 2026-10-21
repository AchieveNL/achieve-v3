import { pathFor, type Locale, type PageId } from "./config";
import { makeTranslator, type Dict } from "./translate";

const cache = new Map<string, Dict | null>();

async function load(locale: Locale, page: string): Promise<Dict | null> {
  if (locale === "nl") return null;
  const k = `${locale}/${page}`;
  if (cache.has(k)) return cache.get(k)!;
  let d: Dict | null = null;
  try {
    d = (await import(`./dict/${locale}/${page}.json`)).default as Dict;
  } catch {
    d = null;
  }
  cache.set(k, d);
  return d;
}

/** Dictionaries for a page: the page itself first, the homepage as shared fallback (header, footer, CTA). */
export async function getDicts(locale: Locale, page: PageId): Promise<Dict[]> {
  const list = await Promise.all([load(locale, page), page === "Main" ? null : load(locale, "Main")]);
  return list.filter(Boolean) as Dict[];
}

/** Translator for server components. */
export async function getTr(locale: Locale, page: PageId) {
  const tr = makeTranslator(locale, await getDicts(locale, page));
  return { ...tr, page, href: (p: PageId | string, a?: string) => pathFor(locale, p, a) };
}
export type ServerTr = Awaited<ReturnType<typeof getTr>>;
