"use client";

import { useEffect, useRef, useState } from "react";
import { useTr } from "@/i18n/I18nProvider";

export type JumpItem = { id: string; label: string };

/**
 * "Op deze pagina": a bar that sticks under the header and highlights the section
 * you are reading. Same look and behaviour as the jump menu on the service pages.
 * Labels are passed already translated. The last item can be a pill-style CTA.
 */
export function JumpNav({ items, cta }: { items: JumpItem[]; cta?: JumpItem }) {
  const { t, ta } = useTr();
  const ref = useRef<HTMLElement>(null);
  const [act, setAct] = useState("");
  const all = cta ? [...items, cta] : items;
  const ids = all.map((i) => i.id).join(",");

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const list = ids.split(",");
    const onScroll = () => {
      const head = document.querySelector(".site-head") as HTMLElement | null;
      const top = head && !head.classList.contains("is-hidden") ? head.offsetHeight : 0;
      bar.style.top = top + "px";
      const offset = (head?.offsetHeight ?? 0) + bar.offsetHeight + 16;
      const line = top + bar.offsetHeight + 24;
      let cur = "";
      for (const id of list) {
        const el = document.getElementById(id);
        if (!el) continue;
        el.style.scrollMarginTop = offset + "px";
        if (el.getBoundingClientRect().top <= line) cur = id;
      }
      setAct(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  // Keep the active link visible when the bar scrolls sideways (phones).
  useEffect(() => {
    const bar = ref.current;
    const a = act ? bar?.querySelector<HTMLElement>(`a[href="#${act}"]`) : null;
    const row = a?.parentElement;
    if (!a || !row || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: a.offsetLeft - (row.clientWidth - a.offsetWidth) / 2, behavior: "smooth" });
  }, [act]);

  return (
    <nav className="em-jump jn-bar" ref={ref} aria-label={ta("Op deze pagina")}>
      <div className="em-jump-in jn-in">
        <span className="em-jump-lbl jn-lbl">{t("Op deze pagina")}</span>
        {items.map((i) => (
          <a key={i.id} href={`#${i.id}`} className={`em-jl${act === i.id ? " is-on" : ""}`} aria-current={act === i.id ? "true" : undefined}>
            {i.label}
          </a>
        ))}
        {cta && (
          <a href={`#${cta.id}`} className={`em-jl em-jl-cta${act === cta.id ? " is-on" : ""}`} aria-current={act === cta.id ? "true" : undefined}>
            {cta.label}
          </a>
        )}
      </div>
    </nav>
  );
}
