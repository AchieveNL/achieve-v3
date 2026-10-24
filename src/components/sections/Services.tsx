"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { Accent } from "@/components/ui/Accent";

export function Services() {
  const { t, ta, href } = useTr();

  const svcTrackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const sync = useCallback(() => {
    const el = svcTrackRef.current;
    if (!el) return;
    const start = el.scrollLeft < 8;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    setEdge((e) => (e.start === start && e.end === end ? e : { start, end }));
  }, []);
  useEffect(() => {
    const el = svcTrackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);
  const move = (d: number) => svcTrackRef.current?.scrollBy({ left: d * 360, behavior: "smooth" });
  const h = {
    svcPrev: () => move(-1),
    svcNext: () => move(1),
    svcPrevOp: edge.start ? "0.35" : "1",
    svcNextOp: edge.end ? "0.35" : "1",
  };
  return (
    <>
      <section id="diensten" style={{ background: "#F2F8FE" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "112px 40px", display: "flex", flexDirection: "column", gap: "48px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <p
                style={{
                  margin: "0",
                  fontSize: "15px",
                  fontWeight: "700",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#8639FA",
                }}
              >
                {t("Onze diensten")}
              </p>
              <h2
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(36px, 4.5vw, 60px)",
                  lineHeight: "1",
                  letterSpacing: "-0.025em",
                  maxWidth: "720px",
                  position: "relative",
                }}
              >
                <span>{t("Alles wat je merk nodig heeft om online te")}</span>{" "}
                <Accent from="#8639FA" to="#0F8AE5">
                  <span className="grad-text" style={{ color: "#8639FA" }}>
                    {t("winnen")}
                  </span>
                </Accent>
              </h2>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                className="gal-btn"
                aria-label={ta("Vorige diensten")}
                onClick={h.svcPrev}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
                  transition: "background-color .3s ease, color .3s ease, opacity .25s ease",
                  border: "1px solid #1F246C",
                  background: "transparent",
                  color: "#1F246C",
                  opacity: h.svcPrevOp,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 12H5"></path>
                  <path d="M11 6l-6 6 6 6"></path>
                </svg>
              </button>
              <button
                type="button"
                className="gal-btn"
                aria-label={ta("Volgende diensten")}
                onClick={h.svcNext}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
                  transition: "background-color .3s ease, color .3s ease, opacity .25s ease",
                  border: "1px solid #1F246C",
                  background: "transparent",
                  color: "#1F246C",
                  opacity: h.svcNextOp,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={svcTrackRef}
            className="svc-scroll"
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              margin: "-24px -40px -64px",
              padding: "24px 40px 64px",
              scrollPaddingLeft: "40px",
            }}
          >
            <div style={{ display: "flex", width: "max-content" }}>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("01")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Brand Strategy")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Een scherpe positionering die je merk onderscheidt en je doelgroep direct aanspreekt.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstStrategy")}
                  aria-label={ta("Ontdek Brand Strategy")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("02")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Legal")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Algemene voorwaarden, privacy en cookies op orde, zodat je zorgeloos online onderneemt.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstLegal")}
                  aria-label={ta("Ontdek Legal")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("03")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Brand Book")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Al je merkregels op één plek, zodat je merk overal herkenbaar en consistent is.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstBrandBook")}
                  aria-label={ta("Ontdek Brand Book")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("04")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Web Development")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Snelle, vindbare websites die bezoekers omzetten in klanten.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstWebDevelopment")}
                  aria-label={ta("Ontdek Web Development")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("05")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Email Marketing")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Nieuwsbrieven en automatische flows die klanten laten terugkomen.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstEmailMarketing")}
                  aria-label={ta("Ontdek Email Marketing")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("06")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Video Marketing")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Video's die je verhaal in een paar seconden overbrengen.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstVideoMarketing")}
                  aria-label={ta("Ontdek Video Marketing")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("07")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("UGC Marketing")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Echte content van echte mensen, die vertrouwen opbouwt en converteert.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstUGCMarketing")}
                  aria-label={ta("Ontdek UGC Marketing")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("08")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Search Engine Advertising")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Bovenaan in Google, precies op het moment dat klanten zoeken.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstSEA")}
                  aria-label={ta("Ontdek Search Engine Advertising")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("09")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Social Media Advertising")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Campagnes die je ideale klant bereiken en meetbaar resultaat opleveren.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstSMA")}
                  aria-label={ta("Ontdek Social Media Advertising")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("10")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Social Media Management")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Een sterke, consistente aanwezigheid op social. Wij regelen het, jij onderneemt.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstSMM")}
                  aria-label={ta("Ontdek Social Media Management")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
              <article
                className="svc-card"
                style={{
                  position: "relative",
                  scrollSnapAlign: "start",
                  boxSizing: "border-box",
                  width: "340px",
                  flexShrink: "0",
                  marginRight: "20px",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "300px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", color: "#B8BFCC" }}>
                    {t("11")}
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0",
                    color: "#1F246C",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "30px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("Dashboard")}
                </h3>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Al je resultaten live in één overzicht, zodat je altijd weet waar je staat.")}
                </p>
                <span
                  className="svc-arrow"
                  aria-hidden="true"
                  style={{
                    marginTop: "auto",
                    alignSelf: "flex-end",
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    border: "1.5px solid #1F246C",
                    color: "#1F246C",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M13 6l6 6-6 6"></path>
                  </svg>
                </span>
                <a
                  href={href("DienstDashboard")}
                  aria-label={ta("Ontdek Dashboard")}
                  style={{ position: "absolute", top: "0", right: "0", bottom: "0", left: "0", borderRadius: "24px" }}
                ></a>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
