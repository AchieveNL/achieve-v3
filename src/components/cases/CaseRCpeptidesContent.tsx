"use client";

import { preload } from "react-dom";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function CaseRCpeptidesContent() {
  // Hero video: fetch its poster (the LCP image) right away.
  preload("/media/projects/rcpeptides-02.webp", { as: "image", fetchPriority: "high", imageSrcSet: srcSet("/media/projects/rcpeptides-02.webp"), imageSizes: IMG_SIZES });
  const { t, ta, href } = useTr();

  // Video pause button = the site-wide animation switch; photo slider and media carousel are click-through.
  const { paused, toggle } = useMotion();
  const [csI, setCsI] = useState(0);
  const [mkI, setMkI] = useState(0);
  const SLIDES: { img: string; alt: string }[] = [];
  const N = 1;
  const ci = csI % N;
  const h = {
    vidPaused: paused,
    vidPlaying: !paused,
    vidPressed: paused,
    vidLabel: paused ? "Video afspelen" : "Video pauzeren",
    toggleVid: toggle,
    csSlides: SLIDES.map((x, i) => ({ ...x, op: i === ci ? "1" : "0", hidden: i !== ci })),
    csProg: ((ci + 1) / N) * 100 + "%",
    csCounter: `${ci + 1} / ${N}`,
    csPrev: () => setCsI((i) => (i + N - 1) % N),
    csNext: () => setCsI((i) => (i + 1) % N),
    mkIsVid: mkI === 2,
    mkOp0: mkI === 0 ? "1" : "0",
    mkOp1: mkI === 1 ? "1" : "0",
    mkOp2: mkI === 2 ? "1" : "0",
    mkHid0: mkI !== 0,
    mkHid1: mkI !== 1,
    mkHid2: mkI !== 2,
    mkW0: "100%",
    mkW1: mkI >= 1 ? "100%" : "0%",
    mkW2: mkI >= 2 ? "100%" : "0%",
    mkCounter: `${mkI + 1} / 3`,
    mkPrev: () => setMkI((i) => (i + 2) % 3),
    mkNext: () => setMkI((i) => (i + 1) % 3),
  };
  return (
    <>
      <section
        className="hero-dark cs-hero m-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1F246C",
          color: "#FFFFFF",
          minHeight: "720px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LazyVideo
          preload="none"
          src="/media/projects/rcpeptides-01.mp4"
          poster="/media/projects/rcpeptides-02.webp"
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(31, 36, 108, 0.7) 0%, rgba(31, 36, 108, 0.15) 26%, rgba(31, 36, 108, 0.3) 50%, rgba(31, 36, 108, 0.9) 80%, rgba(31, 36, 108, 0.98) 100%)",
          }}
        ></div>
        <div
          className="pj-wrap"
          style={{
            position: "relative",
            zIndex: "2",
            width: "100%",
            maxWidth: "1280px",
            boxSizing: "border-box",
            margin: "0 auto",
            padding: "28px 40px 0",
          }}
        >
          <nav aria-label={ta("Kruimelpad")} style={{ fontSize: "14px", color: "#C9CFF0" }}>
            <a href={href("Main")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Home")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <a href={href("Projecten")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Projecten")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {"RCpeptides"}
            </span>
          </nav>
        </div>
        <div
          className="pj-wrap cs-hero-body"
          style={{
            position: "relative",
            zIndex: "2",
            marginTop: "auto",
            width: "100%",
            maxWidth: "1280px",
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0 40px 88px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "24px",
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}>
            <span>{t("Life sciences")}</span> <span aria-hidden="true">{t("·")}</span> <span>{t("Webshop")}</span>
          </span>
          <h1
            translate="no"
            style={{
              margin: "0",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(56px, 8vw, 124px)",
              lineHeight: "0.9",
              letterSpacing: "-0.035em",
              textShadow: "0 4px 32px rgba(14, 17, 40, 0.35)",
            }}
          >
            {"RCpeptides"}
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("8,3x ROAS")}
            <Tip label={ta("Uitleg")}>
              {t("ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.")}
            </Tip>{" "}
            {t("in de eerste maand met zoekadvertenties en Shopping.")}
            <Tip label={ta("Uitleg")}>
              {t("Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.")}
            </Tip>
          </p>
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
        </div>
        <button
          type="button"
          className="vid-btn"
          onClick={h.toggleVid}
          aria-pressed={h.vidPressed}
          aria-label={ta(String(h.vidLabel))}
          title={ta(String(h.vidLabel))}
          style={{
            position: "absolute",
            zIndex: "3",
            right: "40px",
            bottom: "32px",
            width: "44px",
            height: "44px",
            borderRadius: "999px",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            background: "rgba(14, 17, 40, 0.45)",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            padding: "0",
          }}
        >
          {h.vidPlaying && (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                <rect x="14" y="5" width="4" height="14" rx="1"></rect>
              </svg>
            </>
          )}
          {h.vidPaused && (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"></path>
              </svg>
            </>
          )}
        </button>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "96px 40px 48px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            background: "#FFFFFF",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <dl
            className="cs-facts"
            style={{
              flex: "1 1 100%",
              minWidth: "0",
              margin: "0",
              padding: "48px 52px",
              display: "grid",
              gridTemplateColumns: "repeat(4, max-content)",
              gridTemplateRows: "repeat(2, auto)",
              gridAutoFlow: "column",
              justifyContent: "space-between",
              gap: "28px 48px",
              alignContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Klant")}
              </dt>
              <dd translate="no" style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                {"RCpeptides"}
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Sector")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Life sciences")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Markt")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                <span>{t("Europa")}</span> <span translate="no">{"(DE, BE, CH, SE, UK)"}</span>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Doelgroep")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                {t("Onderzoekers en labs (B2B)")}
                <Tip label={ta("Uitleg")}>{t("B2B (business-to-business): je verkoopt aan bedrijven en organisaties.")}</Tip>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Looptijd")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("1 maand")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Diensten")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6E5A00",
                      background: "#FFF6C7",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"SEA"}
                  </span>
                </span>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Website")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>
                <a
                  href="https://rcpeptides.com"
                  target="_blank"
                  rel="noopener"
                  translate="no"
                  style={{ color: "#1F246C", textUnderlineOffset: "4px" }}
                >
                  {"RCpeptides.com"}
                </a>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Jaar")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("2026")}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "48px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
            <h2
              style={{
                margin: "0",
                color: "#1F246C",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(34px, 4vw, 52px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
              }}
            >
              {t("De eerste maand in")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span
                  className="grad-text"
                  style={{
                    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("cijfers.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
              {t("3 t/m 30 juni 2026 · zoekadvertenties en Shopping")}
              <Tip label={ta("Uitleg")}>
                {t("Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.")}
              </Tip>
              {t(", zonder merknaamverkeer")}
              <Tip label={ta("Uitleg")}>
                {t(
                  "Merknaamverkeer: klikken van mensen die al op jouw merknaam zoeken. Die tellen hier niet mee, zodat je ziet wat de advertenties aan nieuwe klanten opleverden.",
                )}
              </Tip>
              {t(".")}
            </p>
          </div>
          <div className="rc-kpis" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
            <div
              className="rc-roas"
              style={{
                gridColumn: "span 2",
                borderRadius: "20px",
                padding: "28px 32px",
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {t("ROAS")}
                <Tip label={ta("Uitleg")}>
                  {t("ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.")}
                </Tip>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(64px, 7vw, 96px)",
                }}
              >
                {t("8,3x")}
              </span>
              <span style={{ fontSize: "15px", lineHeight: "1.5" }}>{t("€ 8,30 omzet per euro advertentiekosten")}</span>
            </div>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Omzet uit advertenties")}</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("€10.100")}
              </span>
              <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("62 aankopen")}</span>
            </div>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Advertentiekosten")}</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("€1.200")}
              </span>
              <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("± € 43 per dag")}</span>
            </div>
          </div>
          <div className="rc-kpis2" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>
                {t("Kosten per aankoop")}
                <Tip label={ta("Uitleg")}>{t("Wat het aan advertenties kostte om één aankoop binnen te halen.")}</Tip>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("€19")}
              </span>
            </div>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>
                {t("Gem. orderwaarde")}
                <Tip label={ta("Uitleg")}>{t("Het gemiddelde bedrag per bestelling.")}</Tip>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("€161")}
              </span>
            </div>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>
                {t("Conversieratio")}
                <Tip label={ta("Uitleg")}>{t("Het percentage bezoekers dat na een klik ook echt iets koopt.")}</Tip>
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("4,6%")}
              </span>
            </div>
            <div
              style={{
                borderRadius: "20px",
                padding: "24px 28px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Klikken")}</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  color: "#1F246C",
                }}
              >
                {t("1.342")}
              </span>
            </div>
          </div>
          <div
            className="rc-card"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              padding: "32px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>
              {t("Omzet tegenover kosten, opgeteld per dag")}
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "15px", color: "#5A6273" }}>
              {t("De omzet loopt vanaf de eerste week weg van de kosten.")}
            </p>
            <svg
              className="rc-chart-d"
              viewBox="0 0 1160 340"
              role="img"
              aria-label={ta("Lijngrafiek: opgetelde omzet loopt op tot € 10.100, de opgetelde kosten tot € 1.200 op 30 juni")}
              style={{ display: "block", width: "100%", height: "auto", fontFamily: "var(--font-body)" }}
            >
              <line x1="80" y1="300.0" x2="1000" y2="300.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="68" y="304.0" textAnchor="end" fontSize="13" fill="#5A6273">
                {"€0"}
              </text>
              <line x1="80" y1="232.5" x2="1000" y2="232.5" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="68" y="236.5" textAnchor="end" fontSize="13" fill="#5A6273">
                {"€2.500"}
              </text>
              <line x1="80" y1="165.0" x2="1000" y2="165.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="68" y="169.0" textAnchor="end" fontSize="13" fill="#5A6273">
                {"€5.000"}
              </text>
              <line x1="80" y1="97.5" x2="1000" y2="97.5" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="68" y="101.5" textAnchor="end" fontSize="13" fill="#5A6273">
                {"€7.500"}
              </text>
              <line x1="80" y1="30.0" x2="1000" y2="30.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="68" y="34.0" textAnchor="end" fontSize="13" fill="#5A6273">
                {"€10.000"}
              </text>
              <polygon
                points="80,300 80.0,300.0 114.1,290.6 148.1,290.6 182.2,282.4 216.3,259.5 250.4,258.1 284.4,247.3 318.5,243.3 352.6,224.4 386.7,205.5 420.7,204.2 454.8,190.6 488.9,185.2 523.0,178.5 557.0,173.1 591.1,166.3 625.2,152.8 659.3,148.8 693.3,136.7 727.4,109.7 761.5,107.0 795.6,107.0 829.6,105.6 863.7,74.6 897.8,43.5 931.9,32.7 965.9,28.7 1000.0,27.3 1000,300"
                fill="rgba(15, 138, 229, 0.10)"
              ></polygon>
              <polygon
                points="80,300 80.0,300.0 114.1,294.6 148.1,293.2 182.2,291.9 216.3,291.1 250.4,289.7 284.4,288.1 318.5,287.6 352.6,286.2 386.7,285.7 420.7,283.8 454.8,282.7 488.9,281.6 523.0,280.8 557.0,279.8 591.1,278.7 625.2,277.3 659.3,276.2 693.3,275.2 727.4,273.8 761.5,273.3 795.6,273.0 829.6,272.7 863.7,271.4 897.8,270.3 931.9,270.0 965.9,268.4 1000.0,267.6 1000,300"
                fill="rgba(31, 36, 108, 0.08)"
              ></polygon>
              <polyline
                points="80.0,300.0 114.1,290.6 148.1,290.6 182.2,282.4 216.3,259.5 250.4,258.1 284.4,247.3 318.5,243.3 352.6,224.4 386.7,205.5 420.7,204.2 454.8,190.6 488.9,185.2 523.0,178.5 557.0,173.1 591.1,166.3 625.2,152.8 659.3,148.8 693.3,136.7 727.4,109.7 761.5,107.0 795.6,107.0 829.6,105.6 863.7,74.6 897.8,43.5 931.9,32.7 965.9,28.7 1000.0,27.3"
                fill="none"
                stroke="#0F8AE5"
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></polyline>
              <polyline
                points="80.0,300.0 114.1,294.6 148.1,293.2 182.2,291.9 216.3,291.1 250.4,289.7 284.4,288.1 318.5,287.6 352.6,286.2 386.7,285.7 420.7,283.8 454.8,282.7 488.9,281.6 523.0,280.8 557.0,279.8 591.1,278.7 625.2,277.3 659.3,276.2 693.3,275.2 727.4,273.8 761.5,273.3 795.6,273.0 829.6,272.7 863.7,271.4 897.8,270.3 931.9,270.0 965.9,268.4 1000.0,267.6"
                fill="none"
                stroke="#5A6273"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></polyline>
              <circle cx="1000" cy="27.3" r="6" fill="#0F8AE5"></circle>
              <circle cx="1000" cy="267.6" r="6" fill="#5A6273"></circle>
              <text x="1016" y="25.3" fontSize="15" fontWeight="600" fill="#1F246C">
                {"Omzet"}
              </text>
              <text x="1016" y="45.3" fontSize="13" fill="#5A6273">
                {"€10.100"}
              </text>
              <text x="1016" y="265.6" fontSize="15" fontWeight="600" fill="#1F246C">
                {"Kosten"}
              </text>
              <text x="1016" y="285.6" fontSize="13" fill="#5A6273">
                {"€1.200"}
              </text>
              <text x="80.0" y="326" textAnchor="middle" fontSize="13" fill="#5A6273">
                {"3 jun"}
              </text>
              <text x="318.5" y="326" textAnchor="middle" fontSize="13" fill="#5A6273">
                {"10 jun"}
              </text>
              <text x="557.0" y="326" textAnchor="middle" fontSize="13" fill="#5A6273">
                {"17 jun"}
              </text>
              <text x="795.6" y="326" textAnchor="middle" fontSize="13" fill="#5A6273">
                {"24 jun"}
              </text>
              <text x="1000.0" y="326" textAnchor="middle" fontSize="13" fill="#5A6273">
                {"30 jun"}
              </text>
            </svg>
            <svg
              className="rc-chart-m"
              viewBox="0 0 340 300"
              role="img"
              aria-label={ta("Lijngrafiek: opgetelde omzet loopt op tot € 10.100, de opgetelde kosten tot € 1.200 op 30 juni")}
              style={{ display: "none", width: "100%", height: "auto", fontFamily: "var(--font-body)" }}
            >
              <line x1="66" y1="226.0" x2="326" y2="226.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="58" y="230.0" textAnchor="end" fontSize="12" fill="#5A6273">
                {"€0"}
              </text>
              <line x1="66" y1="121.0" x2="326" y2="121.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="58" y="125.0" textAnchor="end" fontSize="12" fill="#5A6273">
                {"€5.000"}
              </text>
              <line x1="66" y1="16.0" x2="326" y2="16.0" stroke="#E4E6EA" strokeWidth="1"></line>
              <text x="58" y="20.0" textAnchor="end" fontSize="12" fill="#5A6273">
                {"€10.000"}
              </text>
              <polygon
                points="66,226 66.0,226.0 75.6,218.7 85.3,218.7 94.9,212.3 104.5,194.5 114.1,193.4 123.8,185.1 133.4,181.9 143.0,167.2 152.7,152.5 162.3,151.4 171.9,140.9 181.6,136.8 191.2,131.5 200.8,127.3 210.4,122.0 220.1,111.5 229.7,108.4 239.3,99.0 249.0,78.0 258.6,75.8 268.2,75.8 277.9,74.8 287.5,50.7 297.1,26.5 306.7,18.1 316.4,15.0 326.0,13.9 326,226"
                fill="rgba(15, 138, 229, 0.10)"
              ></polygon>
              <polygon
                points="66,226 66.0,226.0 75.6,221.8 85.3,220.8 94.9,219.7 104.5,219.1 114.1,218.0 123.8,216.8 133.4,216.3 143.0,215.3 152.7,214.9 162.3,213.4 171.9,212.6 181.6,211.7 191.2,211.1 200.8,210.2 210.4,209.4 220.1,208.4 229.7,207.5 239.3,206.7 249.0,205.6 258.6,205.2 268.2,205.0 277.9,204.8 287.5,203.7 297.1,202.9 306.7,202.7 316.4,201.4 326.0,200.8 326,226"
                fill="rgba(31, 36, 108, 0.08)"
              ></polygon>
              <polyline
                points="66.0,226.0 75.6,218.7 85.3,218.7 94.9,212.3 104.5,194.5 114.1,193.4 123.8,185.1 133.4,181.9 143.0,167.2 152.7,152.5 162.3,151.4 171.9,140.9 181.6,136.8 191.2,131.5 200.8,127.3 210.4,122.0 220.1,111.5 229.7,108.4 239.3,99.0 249.0,78.0 258.6,75.8 268.2,75.8 277.9,74.8 287.5,50.7 297.1,26.5 306.7,18.1 316.4,15.0 326.0,13.9"
                fill="none"
                stroke="#0F8AE5"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></polyline>
              <polyline
                points="66.0,226.0 75.6,221.8 85.3,220.8 94.9,219.7 104.5,219.1 114.1,218.0 123.8,216.8 133.4,216.3 143.0,215.3 152.7,214.9 162.3,213.4 171.9,212.6 181.6,211.7 191.2,211.1 200.8,210.2 210.4,209.4 220.1,208.4 229.7,207.5 239.3,206.7 249.0,205.6 258.6,205.2 268.2,205.0 277.9,204.8 287.5,203.7 297.1,202.9 306.7,202.7 316.4,201.4 326.0,200.8"
                fill="none"
                stroke="#5A6273"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              ></polyline>
              <circle cx="326" cy="13.9" r="4.5" fill="#0F8AE5"></circle>
              <circle cx="326" cy="200.8" r="4.5" fill="#5A6273"></circle>
              <text x="66.0" y="248" textAnchor="start" fontSize="12" fill="#5A6273">
                {"3 jun"}
              </text>
              <text x="200.8" y="248" textAnchor="middle" fontSize="12" fill="#5A6273">
                {"17 jun"}
              </text>
              <text x="326.0" y="248" textAnchor="end" fontSize="12" fill="#5A6273">
                {"30 jun"}
              </text>
              <circle cx="20" cy="286" r="6" fill="#0F8AE5"></circle>
              <text x="32" y="291" fontSize="14" fontWeight="600" fill="#1F246C">
                {"Omzet"}
              </text>
              <text x="86" y="291" fontSize="13" fill="#5A6273">
                {"€10.100"}
              </text>
              <circle cx="176" cy="286" r="6" fill="#5A6273"></circle>
              <text x="188" y="291" fontSize="14" fontWeight="600" fill="#1F246C">
                {"Kosten"}
              </text>
              <text x="246" y="291" fontSize="13" fill="#5A6273">
                {"€1.200"}
              </text>
            </svg>
          </div>
          <div className="rc-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px" }}>
            <div
              className="rc-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>
                {t("ROAS per week")}
                <Tip label={ta("Uitleg")}>
                  {t("ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.")}
                </Tip>
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: "15px", color: "#5A6273" }}>
                {t("Het rendement liep op naarmate we de campagnes bijstuurden.")}
              </p>
              <svg
                className="rc-bars"
                viewBox="0 0 500 270"
                role="img"
                aria-label={ta("Staafdiagram ROAS per week: 4,4x, 8,3x, 7,1x en 14,4x")}
                style={{ display: "block", width: "100%", height: "auto", fontFamily: "var(--font-body)" }}
              >
                <line x1="16" y1="230" x2="484" y2="230" stroke="#E4E6EA" strokeWidth="1"></line>
                <rect x="30" y="174.3" width="76" height="55.7" rx="6" fill="#7FBEF0"></rect>
                <text x="68.0" y="164.3" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1F246C">
                  {"4,4x"}
                </text>
                <text x="68.0" y="256" textAnchor="middle" fontSize="13" fill="#5A6273">
                  {"3–7 jun"}
                </text>
                <rect x="150" y="124.9" width="76" height="105.1" rx="6" fill="#7FBEF0"></rect>
                <text x="188.0" y="114.9" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1F246C">
                  {"8,3x"}
                </text>
                <text x="188.0" y="256" textAnchor="middle" fontSize="13" fill="#5A6273">
                  {"8–14 jun"}
                </text>
                <rect x="270" y="140.1" width="76" height="89.9" rx="6" fill="#7FBEF0"></rect>
                <text x="308.0" y="130.1" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1F246C">
                  {"7,1x"}
                </text>
                <text x="308.0" y="256" textAnchor="middle" fontSize="13" fill="#5A6273">
                  {"15–21 jun"}
                </text>
                <rect x="390" y="47.6" width="76" height="182.4" rx="6" fill="#0F8AE5"></rect>
                <text x="428.0" y="37.6" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1F246C">
                  {"14,4x"}
                </text>
                <text x="428.0" y="256" textAnchor="middle" fontSize="13" fill="#5A6273">
                  {"22–30 jun"}
                </text>
              </svg>
            </div>
            <div
              className="rc-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>{t("Per kanaal")}</h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "20px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                  <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>
                    {t("Zoekadvertenties")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.",
                      )}
                    </Tip>
                  </span>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("€590 kosten · €6.800 omzet · 46 aankopen")}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    fontSize: "40px",
                    color: "#0F8AE5",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("11,5x")}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "20px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                  <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>
                    {t("Shopping")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.",
                      )}
                    </Tip>
                  </span>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("€620 kosten · €3.200 omzet · 16 aankopen")}</span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    fontSize: "40px",
                    color: "#0F8AE5",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t("5,2x")}
                </span>
              </div>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: "13px", lineHeight: "1.6", color: "#5A6273" }}>
            {t(
              "ROAS = omzet gedeeld door advertentiekosten. Bron: Google Ads, aankopen toegewezen aan de klikdatum, omzet inclusief verzendkosten. Bedragen afgerond.",
            )}
          </p>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px" }}>
        <div
          className="rc-media"
          style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px" }}
        >
          <figure style={{ margin: "0", borderRadius: "24px", overflow: "hidden", aspectRatio: "4 / 3", background: "#1F246C" }}>
            <img
              src="/media/projects/rcpeptides-03.webp"
              srcSet="/media/projects/rcpeptides-03-800.webp 800w, /media/projects/rcpeptides-03.webp 1024w"
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
              alt={ta("De webshop RCpeptides op een laptop en een telefoon in een modern lab")}
              loading="lazy"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
          </figure>
          <figure style={{ margin: "0", borderRadius: "24px", overflow: "hidden", aspectRatio: "4 / 3", background: "#1F246C" }}>
            <img
              src="/media/projects/rcpeptides-04.webp"
              srcSet="/media/projects/rcpeptides-04-800.webp 800w, /media/projects/rcpeptides-04.webp 1024w"
              sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
              alt={ta("De productpagina van RCpeptides op een laptop en een telefoon in een modern lab")}
              loading="lazy"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
            />
          </figure>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "0 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <h2
            style={{
              margin: "0",
              color: "#1F246C",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: "1",
              letterSpacing: "-0.025em",
            }}
          >
            {t("Het plan achter de")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span
                className="grad-text"
                style={{
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("groei.")}
              </span>
            </Accent>
          </h2>
          <ol
            className="cs-steps"
            style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "40px",
                  color: "#8639FA",
                }}
              >
                {t("01")}
              </span>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Zoekcampagne opgezet op zakelijke research-zoekopdrachten, los van de merknaam.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "40px",
                  color: "#8639FA",
                }}
              >
                {t("02")}
              </span>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Assortiment en zoekwoorden")}
                <Tip label={ta("Uitleg")}>
                  {t("Zoekwoorden: de woorden die mensen in Google intypen. Daarop laten we je advertentie verschijnen.")}
                </Tip>{" "}
                {t("doorgelicht op het Google-beleid voor peptides en gezondheidsproducten, zodat de campagnes live konden.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "40px",
                  color: "#8639FA",
                }}
              >
                {t("03")}
              </span>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Uitsluitingslijsten opgebouwd tegen consumentenzoekopdrachten, concurrentnamen en irrelevant verkeer.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  fontSize: "40px",
                  color: "#8639FA",
                }}
              >
                {t("04")}
              </span>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Shopping")}
                <Tip label={ta("Uitleg")}>
                  {t("Shopping: advertenties met productfoto en prijs in Google.")}
                </Tip>{" "}
                {t("teruggebracht naar producten die Google goedkeurt, en budget weggehaald uit landen die niets opleverden.")}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "0 40px 112px" }}>
        <div
          className="cs-qdark"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            boxSizing: "border-box",
            background: "#1F246C",
            color: "#FFFFFF",
            borderRadius: "24px",
            padding: "80px 48px",
          }}
        >
          <figure
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "28px",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
              <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill="#F2C811"
                  ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill="#F2C811"
                  ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill="#F2C811"
                  ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill="#F2C811"
                  ></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    fill="#F2C811"
                  ></path>
                </svg>
              </span>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#FFFFFF" }}
              >
                <img
                  src="/media/icons/google.svg"
                  alt=""
                  width="18"
                  height="18"
                  style={{ display: "block", width: "18px", height: "18px" }}
                />
                <span>{t("Google review")}</span>
              </span>
            </div>
            <blockquote style={{ margin: "0" }}>
              <p
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(30px, 3.8vw, 50px)",
                  lineHeight: "1.18",
                  fontWeight: "700",
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {t("“Nog nooit zo snel een goede band met een agency opgebouwd.”")}
              </p>
            </blockquote>
            <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <cite translate="no" style={{ fontStyle: "normal", fontSize: "18px", fontWeight: "600", color: "#FFFFFF" }}>
                {"Boris Boot"}
              </cite>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#C9CFF0" }}>
                <span>{t("Webshopeigenaar")}</span>
              </span>
            </figcaption>
            <a
              href="https://rcpeptides.com"
              target="_blank"
              rel="noopener"
              className="about-link"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                minHeight: "44px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              <span className="l2-txt">{t("Bekijk de website")}</span>{" "}
              <span
                className="svc-arrow"
                aria-hidden="true"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255, 255, 255, 0.4)",
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
          </figure>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "end", justifyContent: "space-between", gap: "16px 40px" }}>
            <h2
              style={{
                margin: "0",
                color: "#1F246C",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(34px, 4vw, 52px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
              }}
            >
              {t("Meer ondernemers zoals")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text">{t("jij.")}</span>
              </Accent>
            </h2>
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
          <div className="cs-more" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            <article
              className="pj-card"
              style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#1F246C" }}>
                <LazyVideo
                  src="/media/cases/sharkys.mp4"
                  poster="/media/cases/sharkys-poster-800.webp"
                  preload="none"
                  muted
                  loop
                  playsInline
                  aria-label={ta("Sporter traint met battle ropes in de sportschool van Sharkys")}
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: "1", padding: "28px 32px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <strong
                    translate="no"
                    style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#1F246C", lineHeight: "1.1" }}
                  >
                    <a href={href("CaseSharkys")} className="pj-title">
                      {"Sharkys"}
                    </a>
                  </strong>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Sportschool")}</span>
                </span>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", lineHeight: "1.45", color: "#1F246C" }}>
                  {t("Nieuwe klanten op dag 1")}
                </p>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6B2BD9",
                      background: "#EFE8FD",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"Branding"}
                  </span>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#0B6DB8",
                      background: "#E3F1FD",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"WordPress Website"}
                  </span>
                </span>
                <a
                  href={href("CaseSharkys")}
                  className="about-link"
                  style={{
                    marginTop: "auto",
                    paddingTop: "8px",
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "44px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                  }}
                >
                  <span className="l2-txt">{t("Lees wat werkte")}</span>{" "}
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
            </article>
            <article
              className="pj-card"
              style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#1F246C" }}>
                <img
                  src="/media/projects/minimasters-playground-01.webp"
                  srcSet="/media/projects/minimasters-playground-01-800.webp 800w, /media/projects/minimasters-playground-01.webp 1536w"
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
                  alt={ta("Kinderen spelen verkleed als kok, verpleegkundige, brandweer en politie in Minimasters Playground")}
                  loading="lazy"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: "1", padding: "28px 32px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <strong
                    translate="no"
                    style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#1F246C", lineHeight: "1.1" }}
                  >
                    <a href={href("CaseMinimasters")} className="pj-title">
                      {"Minimasters Playground"}
                    </a>
                  </strong>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Recreatie")}</span>
                </span>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", lineHeight: "1.45", color: "#1F246C" }}>
                  {t("Website en raamstickering, van idee tot oplevering")}
                </p>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6B2BD9",
                      background: "#EFE8FD",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"Window Graphics"}
                  </span>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#0B6DB8",
                      background: "#E3F1FD",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"Custom Website"}
                  </span>
                </span>
                <a
                  href={href("CaseMinimasters")}
                  className="about-link"
                  style={{
                    marginTop: "auto",
                    paddingTop: "8px",
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "44px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                  }}
                >
                  <span className="l2-txt">{t("Lees wat werkte")}</span>{" "}
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
            </article>
            <article
              className="pj-card"
              style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "hidden", display: "flex", flexDirection: "column" }}
            >
              <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "#1F246C" }}>
                <img
                  src="/media/projects/sushi-today-01.webp"
                  srcSet="/media/projects/sushi-today-01-800.webp 800w, /media/projects/sushi-today-01.webp 1800w"
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
                  alt={ta("Het interieur van Sushi Today met groene banken, houten tafels en een kleurrijk lichtplafond")}
                  loading="lazy"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: "1", padding: "28px 32px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <strong
                    translate="no"
                    style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#1F246C", lineHeight: "1.1" }}
                  >
                    <a href={href("CaseSushiToday")} className="pj-title">
                      {"Sushi Today"}
                    </a>
                  </strong>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Horeca")}</span>
                </span>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", lineHeight: "1.45", color: "#1F246C" }}>
                  {t("Fotoshoot en content met foodie influencers")}
                </p>
                <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6E5A00",
                      background: "#FFF6C7",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"Photoshoot"}
                  </span>
                  <span
                    translate="no"
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6E5A00",
                      background: "#FFF6C7",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {"UGC Marketing"}
                  </span>
                </span>
                <a
                  href={href("CaseSushiToday")}
                  className="about-link"
                  style={{
                    marginTop: "auto",
                    paddingTop: "8px",
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "44px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                  }}
                >
                  <span className="l2-txt">{t("Lees wat werkte")}</span>{" "}
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
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
