"use client";

import { useEffect, useRef, useState } from "react";
import { useTr } from "@/i18n/I18nProvider";

/**
 * Shown only when the next page takes longer than 0.3 s: a team member "types" a short line in a
 * chat bubble, in the same style as the team chat on Over ons. Links are plain <a> tags, so the
 * browser keeps the current page on screen while the next one loads; the new page replaces this.
 */

const TEAM = [
  { name: "Karim", img: "/media/team/karim.svg", bg: "#EFE8FD", left: "-14%", w: "128%" },
  { name: "Abdelmonim", img: "/media/team/abdelmonim.svg", bg: "#E3F1FD", left: "-14%", w: "128%" },
  { name: "Niek", img: "/media/team/niek.svg", bg: "#FFF6CC", left: "-14%", w: "128%" },
  { name: "Seyma", img: "/media/team/seyma.svg", bg: "#EFE8FD", left: "-5%", w: "110%" },
  { name: "Jonas", img: "/media/team/jonas.svg", bg: "#E3F1FD", left: "-14%", w: "128%" },
  { name: "Denise", img: "/media/team/denise.svg", bg: "#FFF6CC", left: "-5%", w: "110%" },
];
const LINES = [
  "Momentje, we halen je pagina op.",
  "Nog heel even…",
  "We zetten alles voor je klaar.",
  "Bijna daar.",
  "Even de laatste details rechtzetten.",
];
const DELAY = 300;

export function PageLoader() {
  const { t } = useTr();
  const [pick, setPick] = useState<{ m: number; l: number } | null>(null);
  const [typed, setTyped] = useState(0);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const hide = () => {
      window.clearTimeout(timer.current);
      setPick(null);
    };
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return; // same page / anchor
      // let other handlers (menus, toggles) cancel the click first
      window.setTimeout(() => {
        if (e.defaultPrevented) return;
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
          setTyped(0);
          setPick({ m: Math.floor(Math.random() * TEAM.length), l: Math.floor(Math.random() * LINES.length) });
        }, DELAY);
      }, 0);
    };
    const onShow = () => hide(); // back/forward cache restores the old page
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onShow);
      window.clearTimeout(timer.current);
    };
  }, []);

  const line = pick ? t(LINES[pick.l]) : "";
  useEffect(() => {
    if (!pick) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = window.setTimeout(() => setTyped(line.length), 0);
      return () => window.clearTimeout(id);
    }
    const id = window.setInterval(() => setTyped((n) => (n >= line.length ? n : n + 1)), 35);
    return () => window.clearInterval(id);
  }, [pick, line]);

  if (!pick) return null;
  const m = TEAM[pick.m];
  return (
    <div className="pl-overlay" role="status" aria-live="polite">
      <div className="pl-row">
        <span className="pl-face" style={{ background: m.bg }} aria-hidden="true">
          <img src={m.img} alt="" style={{ left: m.left, width: m.w }} />
        </span>
        <div className="pl-bubble">
          <span className="pl-name">{m.name}</span>
          <span className="pl-line">
            <span aria-hidden="true">{line.slice(0, typed)}</span>
            <span className="pl-sr">{line}</span>
          </span>
        </div>
      </div>
      <span className="pl-dots" aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </span>
    </div>
  );
}
