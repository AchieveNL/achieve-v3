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
    // One write pass (reset), one read pass, one write pass: no forced reflow per button.
    const ARROW = 30; // 18px arrow + 12px gap
    const ARROW_S1 = 26; // 18px arrow + 8px gap
    const check = () => {
      tm = 0;
      const btns = [...document.querySelectorAll<HTMLElement>(SEL)];
      btns.forEach((b) => ALL.some((c) => b.classList.contains(c)) && b.classList.remove(...ALL));
      const rows: { b: HTMLElement; lv: number; key: string }[] = [];
      const range = document.createRange();
      for (const b of btns) {
        if (!b.offsetParent) continue;
        const cs = getComputedStyle(b);
        const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
        let inner = b.clientWidth - pad;
        range.selectNodeContents(b);
        const text = range.getBoundingClientRect().width; // natural label width (arrow is 0 wide at rest)
        const fs = parseFloat(cs.fontSize) || 16;
        // Auto-width buttons can grow on hover; only the space of their container limits them.
        if (inner - text < 2 && b.parentElement) {
          const pcs = getComputedStyle(b.parentElement);
          inner = b.parentElement.clientWidth - parseFloat(pcs.paddingLeft) - parseFloat(pcs.paddingRight) - pad;
        }
        let lv = -1;
        if (text + ARROW > inner + 1) {
          lv = STEPS.length;
          const sizes = [fs, 15, 14];
          for (let i = 0; i < STEPS.length; i++) {
            if ((text * Math.min(fs, sizes[i])) / fs + ARROW_S1 <= inner + 1) {
              lv = i;
              break;
            }
          }
        }
        rows.push({ b, lv, key: (b.textContent || "").trim() + "|" + Math.round(b.clientWidth / 4) });
      }
      // Identical buttons side by side (one row of price cards) share the largest step.
      const group = new Map<string, number>();
      rows.forEach((r) => group.set(r.key, Math.max(group.get(r.key) ?? -1, r.lv)));
      rows.forEach(({ b, key }) => {
        const lv = group.get(key) ?? -1;
        if (lv < 0) return;
        if (lv >= STEPS.length) b.classList.add("arw-wrap");
        else b.classList.add(...STEPS.slice(0, lv + 1));
      });
    };
    const queue = () => {
      if (tm) return;
      tm = window.setTimeout(() => {
        const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        // Measure inside a frame: the browser does its style/layout pass there anyway, so reading is not an extra forced reflow.
        const inFrame = () => requestAnimationFrame(check);
        if (ric) ric(inFrame, { timeout: 1000 });
        else inFrame();
      }, 150);
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
