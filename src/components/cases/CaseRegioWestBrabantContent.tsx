"use client";

import { preload } from "react-dom";
import { useTr } from "@/i18n/I18nProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { Fragment, useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function CaseRegioWestBrabantContent() {
  // Hero photo (the LCP image): fetch it right away.
  preload("/media/projects/regio-west-brabant-01.webp", { as: "image", fetchPriority: "high", imageSrcSet: srcSet("/media/projects/regio-west-brabant-01.webp"), imageSizes: IMG_SIZES });
  const { t, ta, href } = useTr();

  // Photo slider and media carousel are click-through.
  const [csI, setCsI] = useState(0);
  const [mkI, setMkI] = useState(0);
  const SLIDES: { img: string; alt: string; mpos?: string; video?: string }[] = [
    { img: "/media/projects/regio-west-brabant-01.webp", alt: "Titelbeeld van de animatie West-Brabant werkt met talent" },
  ];
  const N = SLIDES.length;
  const ci = csI % N;
  const h = {
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
          src="/media/projects/regio-west-brabant-01.webp"
          srcSet={srcSet("/media/projects/regio-west-brabant-01.webp")}
          sizes={IMG_SIZES}
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
              "linear-gradient(90deg, rgba(31, 36, 108, 0.8) 0%, rgba(31, 36, 108, 0.45) 45%, rgba(31, 36, 108, 0) 70%), linear-gradient(180deg, rgba(31, 36, 108, 0.7) 0%, rgba(31, 36, 108, 0.15) 26%, rgba(31, 36, 108, 0.3) 50%, rgba(31, 36, 108, 0.9) 80%, rgba(31, 36, 108, 0.98) 100%)",
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
              {"Regio West-Brabant"}
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
            <span>{t("Overheid")}</span> <span aria-hidden="true">{t("·")}</span> <span>{t("West-Brabant")}</span>
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
            {"Regio West-Brabant"}
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Een rustige animatie die medewerkers meeneemt in de veranderende arbeidsmarkt")}
          </p>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
              {"Video Marketing"}
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
                {"Regio West-Brabant"}
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Sector")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Overheid")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Markt")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("West-Brabant")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Doelgroep")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                {t("B2E")}
                <Tip label={ta("Uitleg")}>{t("B2E (business-to-employee): je richt je op je eigen medewerkers.")}</Tip>
                
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
                    color: "#6E5A00",
                    background: "#FFF6C7",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {"Video Marketing"}
                </span>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Website")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>
                <a
                  href="https://regiowestbrabant.nl"
                  target="_blank"
                  rel="noopener"
                  translate="no"
                  style={{ color: "#1F246C", textUnderlineOffset: "4px" }}
                >
                  {"RegioWestBrabant.nl"}
                </a>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Jaar")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("2020")}</dd>
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
                  "De uitdaging voor RWB was het creëren van een duidelijke en overzichtelijke animatie om interne medewerkers te informeren over de veranderende arbeidsmarkt en de grote opgaven die daarbij komen kijken. De regio heeft iedereen nodig op de arbeidsmarkt, van jong tot oud, en moet daarom talent aantrekken, benutten, ontwikkelen en behouden. De animatie moest laten zien hoe de regio aantrekkelijk wordt voor studenten en arbeidskrachten van buitenaf, hoe mensen met een grotere afstand tot de arbeidsmarkt kunnen participeren, en hoe een leven lang ontwikkelen gestimuleerd wordt. Ook moest het benadrukken hoe onderwijs en werkgelegenheid beter op elkaar worden afgestemd om talent in de regio te behouden. De uitdaging was om deze complexe boodschap helder en visueel aantrekkelijk over te brengen.",
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
                  "RWB is een samenwerkingsverband van zestien West-Brabantse gemeenten. Door samen te werken op verschillende gebieden, kun je als gemeenten en als regio meer bereiken. RWB is als gemeenschappelijke regeling verantwoordelijk voor de strategische agenda, de Deeltaxi West-Brabant en regioarcheologie. Mobiliteitscentrum West-Brabant is ook onderdeel van RWB, maar heeft een eigen identiteit.",
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
              {t("De animatie West-Brabant werkt met talent. Zet het geluid aan.")}
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 100%), 1fr))", gap: "24px", alignItems: "start" }}>
            <figure style={{ margin: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "20px", overflow: "hidden", background: "#0E1116" }}>
                <video src="/media/projects/regio-west-brabant.mp4" poster="/media/projects/regio-west-brabant-01.webp" controls playsInline preload="none" aria-label={ta("Animatie: West-Brabant werkt met talent")} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", background: "#0E1116" }} />
              </div>
              <figcaption style={{ fontSize: "15px", lineHeight: "1.5", color: "#5A6273" }}>{t("Animatie: West-Brabant werkt met talent")}</figcaption>
            </figure>
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
                  "De oplossing die wij hebben geboden, was het creëren van een animatie die rustig, maar versterkend was ten opzichte van de voice-over en de aangeleverde visuals. De voice-over diende als leidraad, wat ons hielp om de informatie op een heldere manier te structureren. We hebben ervoor gezorgd dat de animatie een kalme en overzichtelijke toon had, zodat de boodschap niet verloren ging in te veel visuele prikkels. Tegelijkertijd versterkten de visuals de kernpunten van de boodschap, waardoor de inhoud op een natuurlijke manier werd ondersteund en duidelijker werd voor de kijker. Deze aanpak maakte de animatie niet alleen informatief, maar ook boeiend en effectief in het overbrengen van de boodschap.",
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
                  "De impact van de animatie was groot in het effectief informeren van interne medewerkers over de veranderende arbeidsmarkt. Door complexe onderwerpen op een duidelijke en visueel aantrekkelijke manier te presenteren, konden medewerkers snel de belangrijkste uitdagingen en strategische prioriteiten begrijpen. De animatie versterkte het bewustzijn binnen de organisatie over het belang van het aantrekken, ontwikkelen en behouden van talent, en ondersteunde de regio’s inspanningen om medewerkers te betrekken bij een gezamenlijke visie voor de toekomst.",
                )}
              </p>
            </li>
          </ol>
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
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Sport")}</span>
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
                  src="/media/projects/a-direct-automaterialen-01.webp"
                  srcSet="/media/projects/a-direct-automaterialen-01-800.webp 800w, /media/projects/a-direct-automaterialen-01.webp 1800w"
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 70vw, 60vw"
                  alt={ta("Bedrijfsbus van A-direct Autoparts met logo en belettering")}
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
                    <a href={href("CaseADirect")} className="pj-title">
                      {"A-direct Automaterialen"}
                    </a>
                  </strong>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Automotive")}</span>
                </span>
                <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", lineHeight: "1.45", color: "#1F246C" }}>
                  {t("Nieuw merk en website in eigen huisstijl")}
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
                </span>
                <a
                  href={href("CaseADirect")}
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
