import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, delocalizeSegments, isLocale, localizeSlug } from "@/i18n/config";

/**
 * Dutch lives at the root (/projecten), other languages get a prefix (/en/projecten).
 * Internally every page sits under /[locale], so root URLs are rewritten to /nl.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (first === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  // The locale is passed on as a header so the 404 page (which gets no params) can speak the right language.
  const headers = new Headers(req.headers);
  if (isLocale(first)) {
    headers.set("x-locale", first);
    // Other languages use translated URL words (/en/services/...). Page folders keep the Dutch names,
    // so translated URLs are rewritten to them and old Dutch words are redirected to the translated ones.
    const rest = pathname.split("/").slice(2).filter(Boolean);
    if (rest.length) {
      const nl = delocalizeSegments(first, rest);
      const wanted = localizeSlug(first, nl.join("/"));
      if (wanted !== rest.join("/")) {
        const url = req.nextUrl.clone();
        url.pathname = `/${first}/${wanted}`;
        return NextResponse.redirect(url, 308);
      }
      if (nl.join("/") !== rest.join("/")) {
        const url = req.nextUrl.clone();
        url.pathname = `/${first}/${nl.join("/")}`;
        return NextResponse.rewrite(url, { request: { headers } });
      }
    }
    return NextResponse.next({ request: { headers } });
  }
  headers.set("x-locale", defaultLocale);
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next|media|vendor|favicon|apple-touch-icon|og-image|robots.txt|sitemap.xml).*)"],
};
