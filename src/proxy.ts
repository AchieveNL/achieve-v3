import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

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
