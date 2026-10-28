"use client";

import { useEffect } from "react";

/**
 * Mobile placement for the jargon "i" explainer (Tip). On phones the box is
 * position:fixed so section overflow can never clip it. This places it right
 * under the tapped "i" (or above it when there is no room above the sticky
 * booking bar), and closes it on scroll so it never floats away from its word.
 * Tips inside price slides (.tfm-slide) keep their own card-anchored layout.
 */
const MOBILE = "(max-width: 720px)";
const GAP = 8;
const EDGE = 12;

export function TipPlace() {
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);

    const place = (tip: HTMLElement) => {
      if (!mq.matches || tip.closest(".tfm-slide")) return;
      const box = tip.querySelector<HTMLElement>(".tf-tip-box");
      if (!box || getComputedStyle(box).position !== "fixed") return;
      const r = tip.getBoundingClientRect();
      const bar = document.querySelector<HTMLElement>(".m-cta-bar");
      const barTop = bar && bar.offsetParent !== null ? bar.getBoundingClientRect().top : window.innerHeight;
      box.style.marginTop = "0";
      box.style.top = "0px";
      const h = box.offsetHeight;
      let top = r.bottom + GAP;
      if (top + h > barTop - EDGE && r.top - GAP - h >= EDGE) top = r.top - GAP - h;
      box.style.top = `${Math.round(top)}px`;
    };

    const reset = (tip: Element) => {
      const box = tip.querySelector<HTMLElement>(".tf-tip-box");
      if (box) {
        box.style.top = "";
        box.style.marginTop = "";
      }
    };

    const onIn = (e: FocusEvent) => {
      const tip = (e.target as Element | null)?.closest?.<HTMLElement>(".tf-tip");
      if (tip) place(tip);
    };
    const onOut = (e: FocusEvent) => {
      const tip = (e.target as Element | null)?.closest?.(".tf-tip");
      if (tip) reset(tip);
    };
    const onScroll = () => {
      if (!mq.matches) return;
      const a = document.activeElement as HTMLElement | null;
      if (a?.classList.contains("tf-tip") && !a.closest(".tfm-slide")) a.blur();
    };

    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
