"use client";

import { useEffect, useState } from "react";
import { useTr } from "@/i18n/I18nProvider";

/** Bar at the bottom of the screen that fills from 0 to 100% while you read the page (cases and service pages). */
export function ReadingProgress() {
  const { ta } = useTr();
  const [pct, setPct] = useState(0);
  const [bottom, setBottom] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    const measure = () => {
      raf = 0;
      const t = document.scrollingElement || document.documentElement;
      const max = t.scrollHeight - t.clientHeight;
      if (max < 40) return;
      setPct(Math.min(100, Math.max(0, Math.round((t.scrollTop / max) * 100))));
      // On phones the sticky "Plan je groeigesprek" bar sits at the bottom; keep the progress bar just above it.
      const cta = document.querySelector<HTMLElement>(".m-cta-bar");
      setBottom(cta && getComputedStyle(cta).display !== "none" ? cta.offsetHeight : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      className="em-progress"
      role="progressbar"
      aria-label={ta("Leesvoortgang")}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom,
        zIndex: 49,
        height: 8,
        background: "rgba(31, 36, 108, 0.22)",
        boxShadow: "0 -2px 10px rgba(31, 36, 108, 0.12)",
        pointerEvents: "none",
      }}
    >
      <div
        className="em-progress-fill"
        style={{
          height: "100%",
          width: `${pct}%`,
          background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
          borderRadius: "0 4px 4px 0",
          boxShadow: "0 0 12px rgba(134, 57, 250, 0.55)",
        }}
      />
    </div>
  );
}
