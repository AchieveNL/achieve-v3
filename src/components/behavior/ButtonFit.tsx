"use client";

import { useEffect } from "react";

/**
 * Brandguide (Knoppen): button text always stays on one line, also when the
 * arrow slides in on hover. Where a label plus arrow does not fit (narrow
 * columns, long translations), the button gets `arw-off`: no arrow, so the
 * hover never changes the number of lines.
 */
const SEL = ".btn-ghost,.btn-glass,.btn-outline,.btn-white,.feat-cta,.k3-out,.social-btn,.tf-k4,.ty-btn,.ty-ghost";

export function ButtonFit() {
  useEffect(() => {
    let tm = 0;
    const check = () => {
      tm = 0;
      document.querySelectorAll<HTMLElement>(SEL).forEach((b) => {
        if (!b.offsetParent) return;
        b.classList.remove("arw-off");
        b.classList.add("arw-test");
        const over = b.scrollWidth - b.clientWidth > 1;
        b.classList.remove("arw-test");
        if (over) b.classList.add("arw-off");
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
