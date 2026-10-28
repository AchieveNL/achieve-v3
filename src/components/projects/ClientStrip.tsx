"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useEffect, useRef } from "react";
import { useFrame } from "@/components/motion/MotionProvider";
import { clientLogos } from "@/data/logos";

export function ClientStrip() {
  const { t, ta, href } = useTr();

  // Same calm pace as the other logo rows (px per second). Moves half the track, then wraps.
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(0);
  // Track width is measured on resize only, never inside the frame loop (avoids a forced reflow every frame).
  const halfRef = useRef(0);
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      halfRef.current = el.scrollWidth / 2;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useFrame((_now, dt) => {
    const el = track.current;
    if (!el) return;
    const half = halfRef.current;
    if (!half) return;
    pos.current = (pos.current + 22 * dt) % half;
    el.style.transform = `translateX(${(-pos.current).toFixed(1)}px)`;
  });
  const logos = [0, 1, 2, 3].flatMap((copy) =>
    clientLogos.map((l) => (
      <img
        key={`${copy}-${l.name}`}
        className="trust-logo trust-light"
        src={l.src}
        alt={copy === 0 ? l.name : ""}
        aria-hidden={copy === 0 ? undefined : true}
        loading="lazy"
        width={l.width}
        height={l.height}
        style={{ display: "block", flexShrink: 0, marginRight: 44, height: l.height, width: "auto" }}
      />
    )),
  );
  return (
    <>
      <section
        className="pjl"
        style={{
          background: "#1F246C",
          padding: "32px 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        <h2
          className="pjl-label"
          style={{
            flexShrink: "0",
            margin: "0",
            paddingLeft: "max(40px, calc((100vw - 1280px) / 2 + 40px))",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: "1.4",
            color: "#FAE84E",
            whiteSpace: "nowrap",
          }}
        >
          {t("Ze wilden groeien.")}
          <br />
          <span style={{ color: "#FFFFFF" }}>{t("En deden het.")}</span>
        </h2>
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "0",
            overflow: "hidden",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
            maskImage: "linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
        >
          <div ref={track} className="pjl-track" style={{ display: "flex", alignItems: "center", width: "max-content", willChange: "transform" }}>
            {logos}
          </div>
        </div>
      </section>
    </>
  );
}
