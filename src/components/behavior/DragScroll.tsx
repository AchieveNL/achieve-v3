"use client";

import { useEffect } from "react";

/**
 * Desktop: drag horizontal rows with the mouse. Touch: swipe photo galleries
 * that use prev/next buttons ("Vorige…"/"Volgende…" aria-labels).
 */
export function DragScroll() {
  useEffect(() => {
    const PREV = '[aria-label^="Vorig"],[aria-label^="Previous"]';
    const NEXT = '[aria-label^="Volgend"],[aria-label^="Next"]';
    const scroller = (t: EventTarget | null): HTMLElement | null => {
      for (let e = t as HTMLElement | null; e && e !== document.body; e = e.parentElement) {
        if (e.nodeType !== 1) continue;
        const ox = getComputedStyle(e).overflowX;
        if ((ox === "auto" || ox === "scroll") && e.scrollWidth > e.clientWidth + 4) return e;
      }
      return null;
    };
    const gallery = (t: EventTarget | null): HTMLElement | null => {
      for (let e = t as HTMLElement | null; e && e !== document.body; e = e.parentElement) {
        if (e.nodeType === 1 && e.querySelector?.("button" + NEXT.split(",")[0]) && e.querySelector("button" + PREV.split(",")[0]))
          return e;
      }
      return null;
    };
    type Drag = { kind: "scroll" | "gal"; el: HTMLElement; x: number; sl: number; moved: boolean; snap: string; beh: string };
    let drag: Drag | null = null;
    let suppress = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      if ((e.target as Element).closest?.("input, textarea, select, .tf-tip")) return;
      const sc = scroller(e.target);
      if (sc) {
        drag = {
          kind: "scroll",
          el: sc,
          x: e.clientX,
          sl: sc.scrollLeft,
          moved: false,
          snap: sc.style.scrollSnapType,
          beh: sc.style.scrollBehavior,
        };
        return;
      }
      const g = gallery(e.target);
      if (g) drag = { kind: "gal", el: g, x: e.clientX, sl: 0, moved: false, snap: "", beh: "" };
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) {
        drag.moved = true;
        if (drag.kind === "scroll") {
          drag.el.style.scrollSnapType = "none";
          drag.el.style.scrollBehavior = "auto";
          drag.el.style.cursor = "grabbing";
        }
      }
      if (drag.moved && drag.kind === "scroll") {
        e.preventDefault();
        drag.el.scrollLeft = drag.sl - dx;
      }
    };
    const end = (e: PointerEvent) => {
      if (!drag) return;
      const d = drag;
      drag = null;
      if (!d.moved) return;
      if (d.kind === "scroll") {
        d.el.style.cursor = "";
        d.el.style.scrollBehavior = d.beh;
        d.el.style.scrollSnapType = d.snap;
        d.el.scrollBy({ left: 1 });
        d.el.scrollBy({ left: -1 });
      } else {
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 40) (d.el.querySelector("button" + (dx < 0 ? NEXT : PREV).split(",")[0]) as HTMLButtonElement | null)?.click();
      }
      suppress = true;
      setTimeout(() => (suppress = false), 0);
    };
    const cancel = () => (drag = null);
    const click = (e: MouseEvent) => {
      if (suppress) {
        e.preventDefault();
        e.stopPropagation();
        suppress = false;
      }
    };
    const dragstart = (e: DragEvent) => {
      if (scroller(e.target) || gallery(e.target)) e.preventDefault();
    };
    let ts: { g: HTMLElement; x: number; y: number } | null = null;
    const tstart = (e: TouchEvent) => {
      if (e.touches.length !== 1 || scroller(e.target)) return void (ts = null);
      const g = gallery(e.target);
      ts = g ? { g, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    };
    const tend = (e: TouchEvent) => {
      if (!ts) return;
      const c = e.changedTouches[0];
      const dx = c.clientX - ts.x,
        dy = c.clientY - ts.y;
      const g = ts.g;
      ts = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2)
        (g.querySelector("button" + (dx < 0 ? NEXT : PREV).split(",")[0]) as HTMLButtonElement | null)?.click();
    };
    document.addEventListener("pointerdown", down, true);
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", cancel);
    document.addEventListener("click", click, true);
    document.addEventListener("dragstart", dragstart, true);
    document.addEventListener("touchstart", tstart, { passive: true });
    document.addEventListener("touchend", tend, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", down, true);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", cancel);
      document.removeEventListener("click", click, true);
      document.removeEventListener("dragstart", dragstart, true);
      document.removeEventListener("touchstart", tstart);
      document.removeEventListener("touchend", tend);
    };
  }, []);
  return null;
}
