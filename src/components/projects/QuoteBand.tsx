"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useState } from "react";
import { useTick } from "@/components/motion/MotionProvider";

export function QuoteBand() {
  const { t, ta, href } = useTr();

  // Four client quotes fade into each other every 8 s (holds on hover).
  const [qi, setQi] = useState(0);
  const [hover, setHover] = useState(false);
  useTick(8000, () => !hover && !document.hidden && setQi((i) => (i + 1) % 4));
  const q = (k: number) => ({
    op: qi === k ? "1" : "0",
    hid: qi !== k,
    pr: qi === k,
    w: qi === k ? "28px" : "8px",
    bg: qi === k ? "#FFFFFF" : "rgba(255, 255, 255, 0.35)",
    go: () => setQi(k),
  });
  const [q0, q1, q2, q3] = [q(0), q(1), q(2), q(3)];
  const h = {
    qtPause: () => setHover(true),
    qtPlay: () => setHover(false),
    qtOp0: q0.op,
    qtHid0: q0.hid,
    qtPr0: q0.pr,
    qtW0: q0.w,
    qtBg0: q0.bg,
    qtGo0: q0.go,
    qtOp1: q1.op,
    qtHid1: q1.hid,
    qtPr1: q1.pr,
    qtW1: q1.w,
    qtBg1: q1.bg,
    qtGo1: q1.go,
    qtOp2: q2.op,
    qtHid2: q2.hid,
    qtPr2: q2.pr,
    qtW2: q2.w,
    qtBg2: q2.bg,
    qtGo2: q2.go,
    qtOp3: q3.op,
    qtHid3: q3.hid,
    qtPr3: q3.pr,
    qtW3: q3.w,
    qtBg3: q3.bg,
    qtGo3: q3.go,
  };
  return (
    <>
      <section
        className="pj-wrap pj-quote"
        onMouseEnter={h.qtPause}
        onMouseLeave={h.qtPlay}
        style={{ background: "#1F246C", padding: "104px 40px", position: "relative", overflow: "hidden" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            background:
              "radial-gradient(45% 70% at 15% 20%, rgba(134, 57, 250, 0.35) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(40% 60% at 90% 90%, rgba(15, 138, 229, 0.30) 0%, rgba(15, 138, 229, 0) 70%)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <svg aria-hidden="true" width="56" height="44" viewBox="0 0 56 44">
            <defs>
              <linearGradient id="qtG" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#B48DFF"></stop>
                <stop offset="1" stopColor="#5EC0FA"></stop>
              </linearGradient>
            </defs>
            <path
              d="M0 44V26C0 11 8 2 22 0l3 6C17 9 13 14 12 22h12v22H0zm32 0V26C32 11 40 2 54 0l2 6c-8 3-12 8-13 16h12v22H32z"
              fill="url(#qtG)"
            ></path>
          </svg>
          <div aria-live="polite" style={{ display: "grid", width: "100%" }}>
            <figure
              aria-hidden={h.qtHid0}
              style={{
                gridArea: "1 / 1",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                textAlign: "center",
                opacity: h.qtOp0,
                transition: "opacity .6s ease",
              }}
            >
              <blockquote
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {t("“Discipline is de brug tussen doelen en resultaat.”")}
              </blockquote>
              <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span
                  style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}
                >
                  {t("Jim Rohn")}
                </span>
                <span style={{ fontSize: "15px", color: "#D5DAE3" }}>{t("Ondernemer, auteur en spreker")}</span>
              </figcaption>
            </figure>
            <figure
              aria-hidden={h.qtHid1}
              style={{
                gridArea: "1 / 1",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                textAlign: "center",
                opacity: h.qtOp1,
                transition: "opacity .6s ease",
              }}
            >
              <blockquote
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {t("“Je stijgt niet naar het niveau van je doelen. Je valt terug op het niveau van je systemen.”")}
              </blockquote>
              <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span
                  style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}
                >
                  {t("James Clear")}
                </span>
                <span style={{ fontSize: "15px", color: "#D5DAE3" }}>{t("Auteur van Atomic Habits")}</span>
              </figcaption>
            </figure>
            <figure
              aria-hidden={h.qtHid2}
              style={{
                gridArea: "1 / 1",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                textAlign: "center",
                opacity: h.qtOp2,
                transition: "opacity .6s ease",
              }}
            >
              <blockquote
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {t("“Je houding, niet je aanleg, bepaalt hoe hoog je komt.”")}
              </blockquote>
              <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span
                  style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}
                >
                  {t("Zig Ziglar")}
                </span>
                <span style={{ fontSize: "15px", color: "#D5DAE3" }}>{t("Auteur en motivatiespreker")}</span>
              </figcaption>
            </figure>
            <figure
              aria-hidden={h.qtHid3}
              style={{
                gridArea: "1 / 1",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                textAlign: "center",
                opacity: h.qtOp3,
                transition: "opacity .6s ease",
              }}
            >
              <blockquote
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(30px, 4vw, 50px)",
                  lineHeight: "1.2",
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {t("“Werk áán je bedrijf, niet ín je bedrijf.”")}
              </blockquote>
              <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <span
                  style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}
                >
                  {t("Michael Gerber")}
                </span>
                <span style={{ fontSize: "15px", color: "#D5DAE3" }}>{t("Auteur van The E-Myth")}</span>
              </figcaption>
            </figure>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <button
              type="button"
              className="qt-dot"
              onClick={h.qtGo0}
              aria-label={ta("Quote 1")}
              aria-pressed={h.qtPr0}
              style={{
                width: h.qtW0,
                height: "8px",
                borderRadius: "999px",
                border: "0",
                padding: "0",
                cursor: "pointer",
                background: h.qtBg0,
                transition: "width .3s ease, background .3s ease",
              }}
            ></button>
            <button
              type="button"
              className="qt-dot"
              onClick={h.qtGo1}
              aria-label={ta("Quote 2")}
              aria-pressed={h.qtPr1}
              style={{
                width: h.qtW1,
                height: "8px",
                borderRadius: "999px",
                border: "0",
                padding: "0",
                cursor: "pointer",
                background: h.qtBg1,
                transition: "width .3s ease, background .3s ease",
              }}
            ></button>
            <button
              type="button"
              className="qt-dot"
              onClick={h.qtGo2}
              aria-label={ta("Quote 3")}
              aria-pressed={h.qtPr2}
              style={{
                width: h.qtW2,
                height: "8px",
                borderRadius: "999px",
                border: "0",
                padding: "0",
                cursor: "pointer",
                background: h.qtBg2,
                transition: "width .3s ease, background .3s ease",
              }}
            ></button>
            <button
              type="button"
              className="qt-dot"
              onClick={h.qtGo3}
              aria-label={ta("Quote 4")}
              aria-pressed={h.qtPr3}
              style={{
                width: h.qtW3,
                height: "8px",
                borderRadius: "999px",
                border: "0",
                padding: "0",
                cursor: "pointer",
                background: h.qtBg3,
                transition: "width .3s ease, background .3s ease",
              }}
            ></button>
          </div>
        </div>
      </section>
    </>
  );
}
