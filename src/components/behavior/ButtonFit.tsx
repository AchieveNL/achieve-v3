"use client";

import { useEffect } from "react";

/**
 * Brandguide (Knoppen): every button keeps its sliding arrow, and the hover
 * never changes the number of lines. When label + arrow do not fit on one
 * line, step down: smaller gap (arw-s1), 15px (arw-s2), 14px (arw-s3). If it
 * still does not fit (long translation in a narrow column), arw-wrap gives the
 * arrow fixed room so the label wraps the same with and without hover.
 * Identical buttons side by side (price cards) always get the same size.
 */
const SEL = ".btn-ghost,.btn-glass,.btn-outline,.btn-white,.feat-cta,.k3-out,.social-btn,.tf-k4,.ty-btn,.ty-ghost";
const STEPS = ["arw-s1", "arw-s2", "arw-s3"];
const ALL = [...STEPS, "arw-wrap"];

export function ButtonFit() {
  useEffect(() => {
    let tm = 0;
    const fits = (b: HTMLElement) => {
      b.classList.add("arw-test");
      const ok = b.scrollWidth - b.clientWidth <= 1;
      b.classList.remove("arw-test");
      return ok;
    };
    const check = () => {
      tm = 0;
      // 0..2 = STEPS, 3 = arw-wrap. Buttons with the same label and width (one row of price cards) share the largest step, so they look the same.
      const level = new Map<HTMLElement, number>();
      const group = new Map<string, number>();
      document.querySelectorAll<HTMLElement>(SEL).forEach((b) => {
        if (!b.offsetParent) return;
        b.classList.remove(...ALL);
        let lv = -1;
        if (!fits(b)) {
          lv = STEPS.length;
          for (let i = 0; i < STEPS.length; i++) {
            b.classList.add(STEPS[i]);
            if (fits(b)) {
              lv = i;
              break;
            }
          }
          b.classList.remove(...STEPS);
        }
        const key = (b.textContent || "").trim() + "|" + Math.round(b.getBoundingClientRect().width / 4);
        level.set(b, lv);
        group.set(key, Math.max(group.get(key) ?? -1, lv));
        b.dataset.arwKey = key;
      });
      level.forEach((_, b) => {
        const lv = group.get(b.dataset.arwKey || "") ?? -1;
        if (lv < 0) return;
        if (lv >= STEPS.length) b.classList.add("arw-wrap");
        else b.classList.add(...STEPS.slice(0, lv + 1));
      });
    };
    const queue = () => {
      if (!tm) tm = window.setTimeout(check, 150);
    };
    queue();
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(queue).catch(() => {});
    window.addEventListener("resize", queue);
    const mo = new MutationObserver((list) => {
      if (list.some((m) => m.type === "childList")) queue();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("resize", queue);
      mo.disconnect();
      if (tm) clearTimeout(tm);
    };
  }, []);
  return null;
}
