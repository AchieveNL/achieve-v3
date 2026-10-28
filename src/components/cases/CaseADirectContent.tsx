"use client";

import { useTr } from "@/i18n/I18nProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Fragment, useState } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function CaseADirectContent() {
  const { t, ta, href } = useTr();

  // Video pause button = the site-wide animation switch; photo slider and media carousel are click-through.
  const { paused, toggle } = useMotion();
  const [csI, setCsI] = useState(0);
  const [mkI, setMkI] = useState(0);
  const SLIDES: { img: string; alt: string }[] = [
    { img: "/media/projects/a-direct-automaterialen-01.webp", alt: "Bedrijfsbus van A-direct Autoparts met logo en belettering" },
    { img: "/media/cases/a-direct-pand.webp", alt: "Het pand van A-direct Autoparts met bedrijfsbussen voor de deur" },
    {
      img: "/media/projects/a-direct-automaterialen-02.webp",
      alt: "De winkelingang van A-direct Autoparts met raambelettering in eigen huisstijl",
    },
    { img: "/media/projects/a-direct-automaterialen-03.webp", alt: "Gevelbord met het logo van A-direct Autoparts" },
    { img: "/media/projects/a-direct-automaterialen-04.webp", alt: "Het team van A-direct Autoparts achter de balie in de winkel" },
    { img: "/media/projects/a-direct-automaterialen-05.webp", alt: "Medewerker van A-direct Autoparts pakt een band uit het bandenrek" },
    { img: "/media/projects/a-direct-automaterialen-06.webp", alt: "Medewerker rijdt een steekwagen met banden door het bandenmagazijn" },
    {
      img: "/media/projects/a-direct-automaterialen-07.webp",
      alt: "Medewerker controleert de voorraad remschijven en filters in het magazijn",
    },
    { img: "/media/projects/a-direct-automaterialen-08.webp", alt: "Medewerker met adembeschermingsmasker achter de verfmengmachine" },
    { img: "/media/projects/a-direct-automaterialen-09.webp", alt: "Medewerker aan het werk in de verfmengkamer van A-direct Autoparts" },
    {
      img: "/media/projects/a-direct-automaterialen-10.webp",
      alt: "Medewerker laadt onderdelen in een bedrijfsbus van A-direct Autoparts",
    },
    { img: "/media/projects/a-direct-automaterialen-11.webp", alt: "Medewerker achter de kassa met wanden vol gereedschap" },
    { img: "/media/projects/a-direct-automaterialen-12.webp", alt: "Medewerker scant een Mann-filter aan de balie" },
    { img: "/media/projects/a-direct-automaterialen-13.webp", alt: "Schappen met Liqui Moly-additieven en autopoetsmiddelen in de winkel" },
    { img: "/media/projects/a-direct-automaterialen-14.webp", alt: "Gangpad met schappen vol motorolie en transmissieolie" },
    { img: "/media/projects/a-direct-automaterialen-15.webp", alt: "Wand met dopsleutels en gereedschap in de winkel" },
  ];
  const N = 16;
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
        <img
          fetchPriority="high"
          src="/media/projects/a-direct-automaterialen-01.webp"
          srcSet="/media/projects/a-direct-automaterialen-01-800.webp 800w, /media/projects/a-direct-automaterialen-01.webp 1800w"
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
          alt=""
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
              {"A-direct Automaterialen"}
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
            <span>{t("Automotive")}</span> <span aria-hidden="true">{t("·")}</span> <span translate="no">{"Nederland"}</span>
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
            {"A-direct Automaterialen"}
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Nieuw merk en website in eigen huisstijl")}
          </p>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
              {"Photoshoot"}
            </span>
          </span>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "96px 40px" }}>
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
                {"A-direct Automaterialen"}
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Sector")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Automotive")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Markt")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Nederland")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Doelgroep")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                {t("Consumenten (B2C)")}
                <Tip label={ta("Uitleg")}>{t("B2C (business-to-consumer): je verkoopt aan consumenten.")}</Tip>
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
              <dd style={{ margin: "0", display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
                  {"Brand Strategy"}
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
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Website")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Offline")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Jaar")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("2022")}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
            {t("Van idee tot")}{" "}
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
                {t("oplevering.")}
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
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px",
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
                  fontSize: "44px",
                  lineHeight: "1",
                  color: "#8639FA",
                }}
              >
                {t("01")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Uitdaging")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "De uitdaging voor A-Direct Autoparts was het herstructureren van hun aanbod en het verfrissen van hun merkuitstraling. Het bedrijf bood een breed scala aan producten en diensten, van auto-onderdelen en gereedschappen tot kentekenplaten en diagnose-apparatuur, maar de merkbeleving was niet duidelijk gestructureerd. De uitdaging was om de verschillende categorieën en diensten helder te categoriseren, zodat klanten precies wisten waar ze voor bij A-Direct moesten zijn. Tegelijkertijd moest de visuele uitstraling van het merk worden vernieuwd, om het bedrijf een modernere en professionelere uitstraling te geven die beter aansluit bij de wensen van de markt en klanten.",
                )}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px",
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
                  fontSize: "44px",
                  lineHeight: "1",
                  color: "#8639FA",
                }}
              >
                {t("02")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Aanpak")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "We begonnen met het ordenen van het aanbod: welke producten en diensten horen bij elkaar, en waar komt een klant voor? Zo ontstonden heldere categorieën, van auto-onderdelen en gereedschap tot kentekenplaten en diagnose. Daarna keken we naar het merk. Het bestaande logo was vertrouwd, dus we kozen ervoor het te moderniseren in plaats van te vervangen. Tot slot planden we een fotoshoot op de nieuwe locatie, zodat het verhaal van groei en vakmanschap ook in beeld te zien is.",
                )}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
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
              {t("Het resultaat in")}{" "}
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
                  {t("beeld.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Een Haags familiebedrijf in auto-onderdelen, met een frisse nieuwe uitstraling.")}
            </p>
          </div>
          <div
            className="cs-media mk-car"
            role="group"
            aria-roledescription="carrousel"
            aria-label={ta("Beeld van A-direct Automaterialen")}
            style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "24px", overflow: "hidden", background: "#0E1116" }}
          >
            {h.csSlides.map((g, g_i) => (
              <Fragment key={g_i}>
                <img
                  className="gal-img"
                  src={g.img}
                  srcSet={srcSet(g.img)}
                  sizes={IMG_SIZES}
                  alt={ta(String(g.alt))}
                  aria-hidden={g.hidden}
                  loading="lazy"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: g.op }}
                />
              </Fragment>
            ))}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "4px", background: "rgba(255, 255, 255, 0.3)" }}
            >
              <div style={{ height: "4px", width: h.csProg, background: "#FFFFFF", transition: "width .3s ease" }}></div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "50%",
                bottom: "24px",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
                padding: "4px",
                borderRadius: "999px",
                background: "#FFFFFF",
                boxShadow: "0 10px 28px rgba(31, 36, 108, 0.18)",
              }}
            >
              <button
                type="button"
                className="gal-btn"
                onClick={h.csPrev}
                aria-label={ta("Vorige afbeelding")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid transparent",
                  background: "transparent",
                  color: "#1F246C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
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
                  <path d="M15 18l-6-6 6-6"></path>
                </svg>
              </button>
              <span
                aria-live="polite"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1F246C",
                  padding: "0 8px",
                  minWidth: "52px",
                  textAlign: "center",
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                {t(String(h.csCounter))}
              </span>
              <button
                type="button"
                className="gal-btn"
                onClick={h.csNext}
                aria-label={ta("Volgende afbeelding")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid transparent",
                  background: "transparent",
                  color: "#1F246C",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
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
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <ol
            className="cs-steps"
            style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px",
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
                  fontSize: "44px",
                  lineHeight: "1",
                  color: "#8639FA",
                }}
              >
                {t("03")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Oplossing")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "Het was al snel duidelijk dat A-Direct Autoparts een nieuwe huisstijl nodig had om de groei en professionaliteit van het bedrijf beter te weerspiegelen. Gehecht aan het bestaande logo, besloten we dit te moderniseren zodat het herkenbaar bleef, maar beter bij de tijd paste. Aangezien A-Direct de afgelopen jaren flink was gegroeid en onlangs was verhuisd naar een indrukwekkend nieuw gebouw, wilden we dit visueel benadrukken. Het bedrijf was bescheiden over deze stap, maar de ruime, moderne locatie verdiende het om getoond te worden. Daarom organiseerden we een professionele fotoshoot, waarbij niet alleen de nieuwe ruimte werd vastgelegd, maar ook de mensen achter het bedrijf. Door de medewerkers in beeld te brengen, konden we de persoonlijke en professionele uitstraling van A-Direct versterken. Deze beelden werden doorgevoerd in de vernieuwde huisstijl, die zowel op de gloednieuwe website, de bussen van het bedrijf als op de visitekaartjes werd toegepast. Zo kreeg A-Direct een frisse, moderne uitstraling die consistent werd doorgevoerd in alle uitingen, zowel online als offline, en werd de trots en professionaliteit van het bedrijf duidelijk gecommuniceerd.",
                )}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px",
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
                  fontSize: "44px",
                  lineHeight: "1",
                  color: "#8639FA",
                }}
              >
                {t("04")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Impact")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "De vernieuwde huisstijl heeft een grote impact gehad op A-Direct Autoparts. Door het bedrijf een uitstraling te geven die meer bij deze tijd past en deze consistent door te voeren in de hele organisatie, is de merkbeleving aanzienlijk verbeterd. De moderne visuele identiteit versterkt niet alleen het imago van A-Direct als een professionele en groeiende speler in de Haagse automotive sector, maar heeft ook bijgedragen aan een groter vertrouwen bij zowel bestaande als potentiële klanten. De nieuwe beelden van de indrukwekkende locatie en het team, evenals de doorgevoerde veranderingen op de website, bussen en visitekaartjes, zorgen voor een uniforme en herkenbare uitstraling die de positionering van het bedrijf duidelijk maakt. Deze visuele vernieuwing heeft niet alleen het merk versterkt, maar ook nieuwe zakelijke kansen gecreëerd en de klantinteractie vergroot, wat A-Direct beter heeft gepositioneerd voor verdere groei en succes in de toekomst.",
                )}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
                {t("“De persoonlijke communicatie zorgde ervoor dat het project soepel verliep.”")}
              </p>
            </blockquote>
            <figcaption style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <cite translate="no" style={{ fontStyle: "normal", fontSize: "18px", fontWeight: "600", color: "#FFFFFF" }}>
                {"Adem Karadirek"}
              </cite>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "#C9CFF0" }}>
                <span>{t("Eigenaar automaterialenwinkel")}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
                  src="/media/projects/rcpeptides-03.webp"
                  srcSet="/media/projects/rcpeptides-03-800.webp 800w, /media/projects/rcpeptides-03.webp 1024w"
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
                  alt={ta("De webshop RCpeptides op een laptop en een telefoon in een modern lab")}
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
                    <a href={href("CaseRCpeptides")} className="pj-title">
                      {"RCpeptides"}
                    </a>
                  </strong>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Life sciences")}</span>
                </span>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", lineHeight: "1.45", color: "#1F246C" }}>
                  {t("8,3x ROAS")}
                  <Tip label={ta("Uitleg")}>
                    {t(
                      "ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.",
                    )}
                  </Tip>{" "}
                  {t("in de eerste maand")}
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
                    {"SEA"}
                  </span>
                </span>
                <a
                  href={href("CaseRCpeptides")}
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
          </div>
        </div>
      </section>
    </>
  );
}
