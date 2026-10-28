"use client";

import { useEffect } from "react";

/**
 * Brandguide (Knoppen): every button keeps its sliding arrow, and the hover
 * never changes the number of lines. When label + arrow do not fit on one
 * line, step down: smaller gap (arw-s1), 15px (arw-s2), 14px (arw-s3). If it
 * still does not fit (long translation in a narrow column), arw-wrap gives the
 * arrow fixed room so the label wraps the same with and without hover.
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
      document.querySelectorAll<HTMLElement>(SEL).forEach((b) => {
        if (!b.offsetParent) return;
        b.classList.remove(...ALL);
        if (fits(b)) return;
        for (let i = 0; i < STEPS.length; i++) {
          b.classList.add(STEPS[i]);
          if (fits(b)) return;
        }
        b.classList.remove(...STEPS);
        b.classList.add("arw-wrap");
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
