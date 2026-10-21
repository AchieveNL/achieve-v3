import type { Locale } from "./config";

export type Dict = {
  D: Record<string, string>;
  A: Record<string, string>;
  P: [source: string, flags: string, replacement: string][];
};

export type T = (key: string) => string;
export type Translator = { t: T; ta: T; locale: Locale };

const has = (o: object, k: string) => Object.prototype.hasOwnProperty.call(o, k);

/**
 * Same lookup the design canvas uses: exact sentence (D), attribute text (A),
 * then regex patterns (P). Dutch is the source language, so NL returns the key.
 * Earlier dictionaries in the list win (page first, shared fallback after).
 */
export function makeTranslator(locale: Locale, dicts: Dict[]): Translator {
  const compiled = dicts.map((d) => ({
    ...d,
    re: d.P.map(([s, f, r]) => [new RegExp(s, f), r] as const),
  }));
  const look = (k: string, attr: boolean): string => {
    if (locale === "nl") return k;
    const key = k.trim();
    if (!key) return k;
    for (const d of compiled) {
      let hit: string | undefined;
      if (attr && has(d.A, key)) hit = d.A[key];
      else if (has(d.D, key)) hit = d.D[key];
      else {
        for (const [re, rep] of d.re) {
          if (re.test(key)) {
            hit = key.replace(re, rep);
            break;
          }
        }
      }
      if (hit !== undefined) {
        const i = k.indexOf(key);
        return k.slice(0, i) + hit + k.slice(i + key.length);
      }
    }
    return k;
  };
  return { locale, t: (k) => look(k, false), ta: (k) => look(k, true) };
}
