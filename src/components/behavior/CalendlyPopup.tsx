"use client";

import { useEffect } from "react";
import { useTr } from "@/i18n/I18nProvider";

/**
 * Every link to calendly.com opens the booking calendar in a popup instead of a
 * new tab (Cmd/Ctrl-click still opens normally). Add data-cal-direct to opt out.
 */
export function CalendlyPopup() {
  const { t, ta } = useTr();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href*="calendly.com"]:not([data-cal-direct])') as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
      e.preventDefault();
      e.stopPropagation();
      const base = a.getAttribute("href") || "";
      const url = `${base}${base.includes("?") ? "&" : "?"}hide_gdpr_banner=1&embed_type=PopupWidget&embed_domain=${encodeURIComponent(location.hostname || "achieve.nl")}`;
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
      const ov = document.createElement("div");
      ov.setAttribute("role", "dialog");
      ov.setAttribute("aria-modal", "true");
      ov.setAttribute("aria-label", ta("Plan je groeigesprek"));
      ov.style.cssText =
        "position:fixed;inset:0;z-index:1000;background:rgba(14,17,40,.72);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box";
      ov.innerHTML =
        '<div style="position:relative;width:100%;max-width:1000px;height:min(760px,calc(100vh - 32px));background:#FFFFFF;border-radius:16px;overflow:hidden">' +
        `<button type="button" class="rev-close" aria-label="${esc(ta("Sluiten"))}" style="position:absolute;top:10px;right:10px;z-index:2;width:44px;height:44px;border-radius:999px;border:none;background:#FFFFFF;color:#1F246C;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 2px 10px rgba(31,36,108,.15)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button>` +
        '<div style="display:flex;flex-direction:column;height:100%">' +
        `<iframe title="${esc(ta("Plan je groeigesprek"))}" src="${esc(url)}" style="flex:1;width:100%;border:0;background:#F2F8FE"></iframe>` +
        `<div style="flex-shrink:0;padding:14px 20px;border-top:1px solid #E4E6EA;font:500 14px var(--font-body);color:#3A4150;text-align:center">${esc(t("Laadt de agenda niet?"))} <a href="${esc(base)}" target="_blank" rel="noopener" data-cal-direct="1" style="color:#1F246C;font-weight:700">${esc(t("Open hem in een nieuw tabblad"))}</a></div>` +
        "</div></div>";
      const prevOverflow = document.body.style.overflow;
      const close = () => {
        ov.remove();
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
        try {
          a.focus();
        } catch {}
      };
      const onKey = (k: KeyboardEvent) => k.key === "Escape" && close();
      ov.addEventListener("click", (ev) => ev.target === ov && close());
      ov.querySelector("button")!.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      document.body.appendChild(ov);
      ov.querySelector("button")!.focus();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [t, ta]);
  return null;
}
