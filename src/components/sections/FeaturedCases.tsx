"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useEffect, useRef, useState } from "react";
import { useFrame } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function FeaturedCases() {
  const { t, ta, href } = useTr();

  // Three featured cases rotate every 7 seconds; the bar under the active tab fills up.
  const DUR = 7000;
  const [sel, setSel] = useState({ ci: 0, n: 0 });
  const ci = sel.ci;
  const elapsed = useRef(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    elapsed.current = 0;
  }, [sel]);
  useFrame((_now, dt) => {
    elapsed.current += dt * 1000;
    const cp = Math.min(1, elapsed.current / DUR);
    root.current?.querySelectorAll<HTMLElement>("[data-casebar]").forEach((el) => {
      const k = Number(el.getAttribute("data-casebar"));
      el.style.transform = `scaleX(${(k === ci ? cp : k < ci ? 1 : 0).toFixed(4)})`; // transform, not width: no layout per frame
    });
    if (cp >= 1) {
      elapsed.current = 0;
      setSel((s) => ({ ci: (s.ci + 1) % 3, n: s.n + 1 }));
    }
  }, true, root);
  const pick = (i: number) => () => setSel((s) => ({ ci: i, n: s.n + 1 }));
  const h = {
    cs0: ci === 0,
    cs1: ci === 1,
    cs2: ci === 2,
    caseOp0: ci === 0 ? "1" : "0.55",
    caseOp1: ci === 1 ? "1" : "0.55",
    caseOp2: ci === 2 ? "1" : "0.55",
    pickCase0: pick(0),
    pickCase1: pick(1),
    pickCase2: pick(2),
  };
  // Progress bars for the three cases, laid over the bottom of the case image.
  const CASES = [
    { name: "RCpeptides", label: ta("Toon case RCpeptides") },
    { name: "Sharkys", label: ta("Toon case Sharkys") },
    { name: "A-direct Automaterialen", label: ta("Toon case A-direct Automaterialen") },
  ];
  const bars = (
    <div className="fc-bars">
      <div className="fc-pager">
        <button type="button" className="gal-btn" onClick={pick((ci + 2) % 3)} aria-label={ta("Vorige case")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        <span className="fc-count" aria-hidden="true">
          {ci + 1} / 3
        </span>
        <button type="button" className="gal-btn" onClick={pick((ci + 1) % 3)} aria-label={ta("Volgende case")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
      {CASES.map((c, i) => (
        <button key={c.name} type="button" onClick={pick(i)} aria-label={c.label} aria-current={ci === i ? "true" : undefined} className={ci === i ? "is-on" : undefined}>
          <span className="fc-bar" aria-hidden="true">
            <span data-casebar={i}></span>
          </span>
          <span className="fc-num">{t(["01", "02", "03"][i])}</span>
          <span className="fc-name">{t(c.name)}</span>
        </button>
      ))}
    </div>
  );
  return (
    <>
      <section id="werk" ref={root} style={{ background: "#F2F8FE" }}>
        <div style={{ padding: "112px 0", display: "flex", flexDirection: "column", gap: "48px" }}>
          <div
            style={{
              maxWidth: "1280px",
              width: "100%",
              boxSizing: "border-box",
              margin: "0 auto",
              padding: "0 40px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8639FA",
                textAlign: "center",
              }}
            >
              {t("Ons werk")}
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
                textAlign: "center",
              }}
            >
              {t("Wie zaait met een")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={{ color: "#8639FA" }}>
                  {t("plan")}
                </span>
              </Accent>
              {t(", oogst")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={{ color: "#8639FA" }}>
                  {t("resultaat.")}
                </span>
              </Accent>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {h.cs0 && (
              <>
                <article
                  className="rot-in"
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "0", background: "#FFFFFF" }}
                >
                  <div className="fc-img" style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}>
                    {bars}
                    <img
                      src="/media/cases/rcpeptides-lab.webp"
                      srcSet="/media/cases/rcpeptides-lab-800.webp 800w, /media/cases/rcpeptides-lab.webp 1536w"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      loading="lazy"
                      decoding="async"
                      alt={ta("De webshop RCpeptides op een laptop en een telefoon in een modern lab")}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "44% center",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "64px max(40px, calc((100vw - 1280px) / 2 + 40px)) 64px 64px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                    }}
                  >
                    <div className="fc-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <strong
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1F246C",
                            lineHeight: "1.1",
                          }}
                        >
                          <a href={href("CaseRCpeptides")} className="pj-title">
                            {t("RCpeptides")}
                          </a>
                        </strong>
                        <span style={{ fontSize: "15px", color: "#5A6273" }}>{t("Life sciences")}</span>
                      </span>
                      <span className="fc-tags" style={{ flexShrink: "0", display: "flex", gap: "8px" }}>
                        <span
                          translate="no"
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#6E5A00",
                            background: "#FFF6C7",
                            padding: "8px 16px",
                            borderRadius: "999px",
                          }}
                        >
                          {"SEA"}
                        </span>
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        className="grad-text"
                        style={{
                          alignSelf: "flex-start",
                          fontFamily: "var(--font-display)",
                          fontWeight: "700",
                          fontSize: "80px",
                          lineHeight: "0.95",
                          letterSpacing: "-0.03em",
                          color: "#8639FA",
                        }}
                      >
                        {t("8,3x")}
                      </span>
                      <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>
                        {t("ROAS")}
                        <Tip label={ta("Uitleg")}>
                          {t(
                            "ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.",
                          )}
                        </Tip>{" "}
                        {t("in de eerste maand")}
                      </span>
                    </div>
                    <div className="fc-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Uitdaging")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t("Een jonge webshop, nog zonder bewezen advertentiekanaal.")}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Aanpak")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t("Een eerste maand met zoekadvertenties en Shopping")}
                          <Tip label={ta("Uitleg")}>
                            {t(
                              "Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.",
                            )}
                          </Tip>
                          {t(", dagelijks bijgestuurd.")}
                        </p>
                      </div>
                    </div>
                    <blockquote
                      className="fc-quote"
                      style={{
                        margin: "0",
                        marginTop: "auto",
                        padding: "24px 24px",
                        borderRadius: "16px",
                        background: "#F8F5FE",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                      </span>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", fontWeight: "500", color: "#1F246C" }}>
                        {t("“Doen precies wat ik wil met mijn visie en sturen bij waar hun ervaring goed van pas komt.”")}
                      </p>
                    </blockquote>
                    <div className="cta-duo" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
                      <a
                        href={href("CaseRCpeptides")}
                        className="feat-cta"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          minHeight: "52px",
                          padding: "0 28px",
                          borderRadius: "8px",
                          background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                          color: "#FFFFFF",
                          textDecoration: "none",
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        {t("Lees wat werkte")}{" "}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="feat-link fc-sub"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minHeight: "44px",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#1F246C",
                          textDecoration: "none",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        {t("Plan je groeigesprek")}
                        <svg
                          className="l1-ar"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </>
            )}
            {h.cs1 && (
              <>
                <article
                  className="rot-in"
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "0", background: "#FFFFFF" }}
                >
                  <div className="fc-img" style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}>
                    {bars}
                    <LazyVideo
                      preload="none"
                      src="/media/cases/sharkys.mp4"
                      poster="/media/cases/sharkys-poster-800.webp"
                      muted
                      loop
                      playsInline
                      aria-label={ta("Sporter traint met battle ropes in de sportschool van Sharkys")}
                      style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "64px max(40px, calc((100vw - 1280px) / 2 + 40px)) 64px 64px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                    }}
                  >
                    <div className="fc-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <strong
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1F246C",
                            lineHeight: "1.1",
                          }}
                        >
                          <a href={href("CaseSharkys")} className="pj-title">
                            {t("Sharkys")}
                          </a>
                        </strong>
                        <span style={{ fontSize: "15px", color: "#5A6273" }}>{t("Sport")}</span>
                      </span>
                      <span
                        translate="no"
                        style={{
                          flexShrink: "0",
                          fontSize: "12px",
                          fontWeight: "600",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color: "#0B6DB8",
                          background: "#E3F1FD",
                          padding: "8px 16px",
                          borderRadius: "999px",
                        }}
                      >
                        {"WordPress Website"}
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        className="grad-text"
                        style={{
                          alignSelf: "flex-start",
                          fontFamily: "var(--font-display)",
                          fontWeight: "700",
                          fontSize: "80px",
                          lineHeight: "0.95",
                          letterSpacing: "-0.03em",
                          color: "#8639FA",
                        }}
                      >
                        {t("Nieuwe klanten")}
                      </span>
                      <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>{t("op dag 1")}</span>
                    </div>
                    <div className="fc-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Uitdaging")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t(
                            "Meer leden binnenhalen, maar de oude website was geen goed visitekaartje: bezoekers zagen niet snel wat Sharkys aanbiedt.",
                          )}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Aanpak")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t(
                            "Een overzichtelijke website met alle diensten op één plek, en één duidelijke knop: Claim jouw 3 dagen try-out. Aanmeldingen staan via Virtuagym direct in hun planning.",
                          )}
                        </p>
                      </div>
                    </div>
                    <blockquote
                      className="fc-quote"
                      style={{
                        margin: "0",
                        marginTop: "auto",
                        padding: "24px 24px",
                        borderRadius: "16px",
                        background: "#F8F5FE",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                      </span>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", fontWeight: "500", color: "#1F246C" }}>
                        {t("“Achieve heeft voor ons een top website gecreëerd die op dag 1 al heeft gezorgd voor nieuwe klanten.”")}
                      </p>
                    </blockquote>
                    <div className="cta-duo" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
                      <a
                        href={href("CaseSharkys")}
                        className="feat-cta"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          minHeight: "52px",
                          padding: "0 28px",
                          borderRadius: "8px",
                          background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                          color: "#FFFFFF",
                          textDecoration: "none",
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        {t("Lees wat werkte")}{" "}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="feat-link fc-sub"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minHeight: "44px",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#1F246C",
                          textDecoration: "none",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        {t("Plan je groeigesprek")}
                        <svg
                          className="l1-ar"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </>
            )}
            {h.cs2 && (
              <>
                <article
                  className="rot-in"
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "0", background: "#FFFFFF" }}
                >
                  <div className="fc-img" style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}>
                    {bars}
                    <img
                      src="/media/projects/a-direct-automaterialen-01.webp"
                      srcSet="/media/projects/a-direct-automaterialen-01-800.webp 800w, /media/projects/a-direct-automaterialen-01.webp 1800w"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      loading="lazy"
                      decoding="async"
                      alt={ta("Bedrijfsbus van A-direct Autoparts met logo en belettering")}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      padding: "64px max(40px, calc((100vw - 1280px) / 2 + 40px)) 64px 64px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                    }}
                  >
                    <div className="fc-head" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <strong
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "28px",
                            fontWeight: "700",
                            color: "#1F246C",
                            lineHeight: "1.1",
                          }}
                        >
                          <a href={href("CaseADirect")} className="pj-title">
                            {t("A-direct Automaterialen")}
                          </a>
                        </strong>
                        <span style={{ fontSize: "15px", color: "#5A6273" }}>{t("Familiebedrijf")}</span>
                      </span>
                      <span className="fc-tags" style={{ flexShrink: "0", display: "flex", gap: "8px" }}>
                        <span
                          translate="no"
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#6B2BD9",
                            background: "#EFE8FD",
                            padding: "8px 16px",
                            borderRadius: "999px",
                          }}
                        >
                          {"Brand Strategy"}
                        </span>
                        <span
                          translate="no"
                          style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: "#0B6DB8",
                            background: "#E3F1FD",
                            padding: "8px 16px",
                            borderRadius: "999px",
                          }}
                        >
                          {"WordPress Website"}
                        </span>
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <span
                        className="grad-text"
                        style={{
                          alignSelf: "flex-start",
                          fontFamily: "var(--font-display)",
                          fontWeight: "700",
                          fontSize: "80px",
                          lineHeight: "0.95",
                          letterSpacing: "-0.03em",
                          color: "#8639FA",
                        }}
                      >
                        {t("Nieuw")}
                      </span>
                      <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>
                        {t("merk en website in eigen huisstijl")}
                      </span>
                    </div>
                    <div className="fc-detail" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Uitdaging")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t("Een familiebedrijf dat klaar was voor een professionele online uitstraling.")}
                        </p>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <span
                          style={{
                            fontSize: "12px",
                            fontWeight: "700",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#8639FA",
                          }}
                        >
                          {t("Aanpak")}
                        </span>
                        <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                          {t("Digitale strategie, branding en een nieuwe website, volledig in de eigen huisstijl.")}
                        </p>
                      </div>
                    </div>
                    <blockquote
                      className="fc-quote"
                      style={{
                        margin: "0",
                        marginTop: "auto",
                        padding: "24px 24px",
                        borderRadius: "16px",
                        background: "#F8F5FE",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                            fill="url(#sgStar)"
                          ></path>
                        </svg>
                      </span>
                      <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.55", fontWeight: "500", color: "#1F246C" }}>
                        {t(
                          "“Achieve heeft een prachtige website opgeleverd die aansloot bij onze wensen op het gebied van (digitale) strategie en branding.”",
                        )}
                      </p>
                    </blockquote>
                    <div className="cta-duo" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
                      <a
                        href={href("Projecten")}
                        className="feat-cta"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "12px",
                          minHeight: "52px",
                          padding: "0 28px",
                          borderRadius: "8px",
                          background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                          color: "#FFFFFF",
                          textDecoration: "none",
                          fontWeight: "700",
                          fontSize: "16px",
                        }}
                      >
                        {t("Lees wat werkte")}{" "}
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="feat-link fc-sub"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minHeight: "44px",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: "#1F246C",
                          textDecoration: "none",
                          textUnderlineOffset: "4px",
                        }}
                      >
                        {t("Plan je groeigesprek")}
                        <svg
                          className="l1-ar"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M13 6l6 6-6 6"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </>
            )}
            <div style={{ maxWidth: "1280px", width: "100%", boxSizing: "border-box", margin: "0 auto", padding: "0 40px" }}>
              <div className="fc-more" style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}>
                <a
                  href={href("Projecten")}
                  className="about-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "44px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                  }}
                >
                  <span className="l2-txt">{t("Bekijk de hele oogst")}</span>{" "}
                  <span
                    className="svc-arrow"
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "999px",
                      border: "1px solid #D5DAE3",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6"></path>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
