"use client";

import { useEffect } from "react";
import { useTr } from "@/i18n/I18nProvider";

/**
 * Every link to calendly.com opens the booking calendar in a popup instead of a
 * new tab (Cmd/Ctrl-click still opens normally). Add data-cal-direct to opt out.
 *
 * Calendly needs a few seconds to boot inside an iframe, so the popup is built
 * (hidden) as soon as a visitor hovers, focuses or touches a Calendly link. By the
 * time they click, the calendar has usually finished loading. Until the iframe
 * reports it has loaded, a three-dot loader shows behind it (same as the old site).
 * Closing only hides the popup, so reopening is instant.
 */
const SEL = 'a[href*="calendly.com"]:not([data-cal-direct])';

/**
 * Calendly shows a booking page in the language set on its event type, so each site language
 * links to its own event type. Calendly offers Dutch, English, Spanish, French and German;
 * Polish, Turkish and Arabic visitors get the English one. Empty = keep the link as written (Dutch).
 */
const CAL_BY_LOCALE: Partial<Record<string, string>> = {
  en: "",
  es: "",
  fr: "",
  de: "",
  pl: "",
  tr: "",
  ar: "",
};

export function CalendlyPopup() {
  const { t, ta, locale } = useTr();
  useEffect(() => {
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const popups = new Map<string, HTMLDivElement>();
    let current: { ov: HTMLDivElement; link: HTMLAnchorElement; prevOverflow: string } | null = null;

    if (!document.getElementById("cal-popup-css")) {
      const st = document.createElement("style");
      st.id = "cal-popup-css";
      st.textContent =
        ".cal-dots{position:absolute;inset:0;display:flex;gap:8px;align-items:center;justify-content:center;z-index:0}" +
        ".cal-dots i{width:14px;height:14px;border-radius:50%;background:#C9CCE6;animation:calDot 1.4s infinite both}" +
        ".cal-dots i:nth-child(1){animation-delay:-.32s}.cal-dots i:nth-child(2){animation-delay:-.16s}" +
        "@keyframes calDot{0%,80%,to{transform:scale(0)}40%{transform:scale(1)}}" +
        ".cal-ready .cal-dots{display:none}" +
        "@media (prefers-reduced-motion:reduce){.cal-dots i{animation:none;opacity:.6}}";
      document.head.appendChild(st);
    }

    const build = (href: string) => {
      const base = CAL_BY_LOCALE[locale] || href;
      const existing = popups.get(base);
      if (existing) return existing;
      const url = `${base}${base.includes("?") ? "&" : "?"}hide_gdpr_banner=1&embed_type=Inline&embed_domain=1`;
      const ov = document.createElement("div");
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.setAttribute("aria-label", ta("Plan je groeigesprek"));
      ov.style.cssText =
        "position:fixed;inset:0;z-index:1000;background:rgba(14,17,40,.72);display:flex;visibility:hidden;pointer-events:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box";
      ov.innerHTML =
        '<div class="cal-box" style="position:relative;width:100%;max-width:1000px;height:min(760px,calc(100dvh - 32px));background:#FFFFFF;border-radius:16px;overflow:hidden">' +
        `<button type="button" aria-label="${esc(ta("Sluiten"))}" style="position:absolute;top:10px;right:10px;z-index:2;width:44px;height:44px;border-radius:999px;border:none;background:#FFFFFF;color:#1F246C;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 2px 10px rgba(31,36,108,.15)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>` +
        '<div style="display:flex;flex-direction:column;height:100%">' +
        '<div style="position:relative;flex:1;min-height:0">' +
        '<div class="cal-dots" aria-hidden="true"><i></i><i></i><i></i></div>' +
        `<iframe title="${esc(ta("Plan je groeigesprek"))}" src="${esc(url)}" style="position:relative;z-index:1;display:block;width:100%;height:100%;border:0;background:transparent"></iframe>` +
        "</div>" +
        `<div style="flex-shrink:0;padding:14px 20px;border-top:1px solid #E4E6EA;font:500 14px var(--font-body);color:#3A4150;text-align:center">${esc(t("Laadt de agenda niet?"))} <a href="${esc(base)}" target="_blank" rel="noopener" data-cal-direct="1" style="color:#1F246C;font-weight:700">${esc(t("Open hem in een nieuw tabblad"))}</a></div>` +
        "</div></div>";
      ov.querySelector("iframe")!.addEventListener("load", () => ov.querySelector(".cal-box")!.classList.add("cal-ready"));
      ov.addEventListener("click", (ev) => ev.target === ov && close());
      ov.querySelector("button")!.addEventListener("click", close);
      document.body.appendChild(ov);
      popups.set(base, ov);
      return ov;
    };

    const close = () => {
      if (!current) return;
      const { ov, link, prevOverflow } = current;
      current = null;
      ov.style.visibility = "hidden";
      ov.style.pointerEvents = "none";
      document.body.style.overflow = prevOverflow;
      try {
        link.focus();
      } catch {}
    };

    const linkFrom = (e: Event) => (e.target as Element | null)?.closest?.(SEL) as HTMLAnchorElement | null;

    // Warm up: start loading the calendar before the click.
    const warm = (e: Event) => {
      const a = linkFrom(e);
      if (a) build(a.getAttribute("href") || "");
    };

    const onClick = (e: MouseEvent) => {
      const a = linkFrom(e);
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      e.stopPropagation();
      const ov = build(a.getAttribute("href") || "");
      current = { ov, link: a, prevOverflow: document.body.style.overflow };
      ov.style.visibility = "visible";
      ov.style.pointerEvents = "auto";
      document.body.style.overflow = "hidden";
      ov.querySelector("button")!.focus();
    };

    const onKey = (k: KeyboardEvent) => k.key === "Escape" && close();

    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("touchstart", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("keydown", onKey);
      popups.forEach((ov) => ov.remove());
      document.body.style.overflow = current?.prevOverflow ?? document.body.style.overflow;
    };
  }, [t, ta, locale]);
  return null;
}
