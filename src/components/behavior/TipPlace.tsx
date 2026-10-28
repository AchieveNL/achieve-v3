"use client";

import { useEffect } from "react";

/**
 * Mobile placement for the jargon "i" explainer (Tip). On phones the box is
 * position:fixed so section overflow can never clip it. This places it right
 * under the tapped "i" (or above it when there is no room above the sticky
 * booking bar), and closes it on scroll so it never floats away from its word.
 * A transformed ancestor (animations) turns "fixed" into "relative to that
 * ancestor", so the position is measured and corrected after a first pass.
 */
const MOBILE = "(max-width: 720px)";
const GAP = 8;
const EDGE = 12;

export function TipPlace() {
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);

    const place = (tip: HTMLElement) => {
      if (!mq.matches) return;
      const box = tip.querySelector<HTMLElement>(".tf-tip-box");
      if (!box || getComputedStyle(box).position !== "fixed") return;
      const r = tip.getBoundingClientRect();
      const bar = document.querySelector<HTMLElement>(".m-cta-bar");
      const barTop = bar && bar.offsetParent !== null ? bar.getBoundingClientRect().top : window.innerHeight;
      box.style.marginTop = "0";
      box.style.top = "0px";
      box.style.left = "0px";
      box.style.right = "auto";
      box.style.width = `${window.innerWidth - 2 * EDGE - 8}px`;
      const o = box.getBoundingClientRect(); // where (0,0) really lands
      const h = o.height;
      let top = r.bottom + GAP;
      if (top + h > barTop - EDGE && r.top - GAP - h >= EDGE) top = r.top - GAP - h;
      box.style.top = `${Math.round(top - o.top)}px`;
      box.style.left = `${Math.round(EDGE + 4 - o.left)}px`;
    };

    const reset = (tip: Element) => {
      const box = tip.querySelector<HTMLElement>(".tf-tip-box");
      if (box) {
        for (const k of ["top", "left", "right", "width", "marginTop"] as const) box.style[k] = "";
      }
    };

    let y0 = 0;
    const onIn = (e: FocusEvent) => {
      const tip = (e.target as Element | null)?.closest?.<HTMLElement>(".tf-tip");
      if (!tip) return;
      y0 = window.scrollY;
      place(tip);
    };
    const onOut = (e: FocusEvent) => {
      const tip = (e.target as Element | null)?.closest?.(".tf-tip");
      if (tip) reset(tip);
    };
    const onScroll = () => {
      if (!mq.matches) return;
      const a = document.activeElement as HTMLElement | null;
      if (!a?.classList.contains("tf-tip")) return;
      // A tap can nudge the page a little; only close after a real scroll, otherwise follow the "i".
      if (Math.abs(window.scrollY - y0) > 48) a.blur();
      else place(a);
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
