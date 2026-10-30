"use client";

import { preload } from "react-dom";
import { useTr } from "@/i18n/I18nProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { Fragment, useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function CaseBouwvergunningDirectContent() {
  // Hero photo (the LCP image): fetch it right away.
  preload("/media/projects/bouwvergunningdirect-01.webp", { as: "image", fetchPriority: "high", imageSrcSet: srcSet("/media/projects/bouwvergunningdirect-01.webp"), imageSizes: IMG_SIZES });
  const { t, ta, href } = useTr();

  // Photo slider and media carousel are click-through.
  const [csI, setCsI] = useState(0);
  const [mkI, setMkI] = useState(0);
  const SLIDES: { img: string; alt: string; mpos?: string; video?: string }[] = [
    { img: "/media/projects/bouwvergunningdirect-01.webp", alt: "De nieuwe website van BouwvergunningDirect op een laptop, tussen bouwtekeningen en een maquette" },
    { img: "/media/projects/bouwvergunningdirect-02.webp", alt: "Het dienstenoverzicht van BouwvergunningDirect op een tablet en een telefoon" },
  ];
  const N = 2;
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
          src="/media/projects/bouwvergunningdirect-01.webp"
          srcSet={srcSet("/media/projects/bouwvergunningdirect-01.webp")}
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
              {"BouwvergunningDirect"}
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
            <span>{t("Bouw")}</span> <span aria-hidden="true">{t("·")}</span> <span>{t("Nederland")}</span>
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
            {"BouwvergunningDirect"}
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Een heldere website die het vergunningstraject eenvoudig maakt")}
          </p>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
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
                {"BouwvergunningDirect"}
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Sector")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Bouw")}</dd>
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
                {t("Particulieren en ondernemers")}
                
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Specialisme")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Vergunningsaanvragen")}</dd>
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
                    color: "#0B6DB8",
                    background: "#E3F1FD",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {"WordPress Website"}
                </span>
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Website")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600" }}>
                <a
                  href="https://www.bouwvergunningdirect.nl"
                  target="_blank"
                  rel="noopener"
                  translate="no"
                  style={{ color: "#1F246C", textUnderlineOffset: "4px" }}
                >
                  {"bouwvergunningdirect.nl"}
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
                  "De uitdaging voor ons zat in het vertalen van een technisch en procedureel proces naar een toegankelijke en betrouwbare online ervaring. BouwvergunningDirect werkt met complexe regelgeving, bouwkundige details en gemeentelijke eisen die voor veel mensen overweldigend kunnen aanvoelen. Het was aan ons om die inhoud overzichtelijk en begrijpelijk te maken, zonder afbreuk te doen aan de expertise en nauwkeurigheid van het bedrijf. Daarbij lag de focus op het creëren van vertrouwen, duidelijkheid en een professionele uitstraling die zowel particulieren als ondernemers aanspreekt.",
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
                  "Voor BouwvergunningDirect ontwikkelden we een heldere en professionele website die complexe technische dienstverlening toegankelijk maakt voor een brede doelgroep. Door structuur, duidelijke communicatie en een sterke visuele uitstraling samen te brengen, hebben we een online ervaring gecreëerd die vertrouwen uitstraalt en bezoekers eenvoudig door een vaak ingewikkeld proces begeleidt.",
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
              {t("De nieuwe website van BouwvergunningDirect, op laptop, tablet en telefoon.")}
            </p>
          </div>
          <div
            className="cs-media mk-car"
            role="group"
            aria-roledescription="carrousel"
            aria-label={ta("Beeld van BouwvergunningDirect")}
            style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: "24px", overflow: "hidden", background: "#0E1116" }}
          >
            {h.csSlides.map((g, g_i) => (
              <Fragment key={g_i}>
                {g.video ? (
                  <LazyVideo
                    className="gal-img"
                    src={g.video}
                    poster={g.img}
                    preload="none"
                    muted
                    loop
                    playsInline
                    aria-label={ta(String(g.alt))}
                    aria-hidden={g.hidden}
                    style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: g.op }}
                  />
                ) : (
                  <img
                    className="gal-img"
                    src={g.img}
                    srcSet={srcSet(g.img)}
                    sizes={IMG_SIZES}
                    alt={ta(String(g.alt))}
                    aria-hidden={g.hidden}
                    loading="lazy"
                    style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", opacity: g.op, ...(g.mpos ? { ["--mpos" as string]: g.mpos } : {}) }}
                  />
                )}
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
                  "We hebben een website ontwikkeld die structuur brengt in een vaak ingewikkeld traject. Door heldere contenthiërarchie, een intuïtieve gebruikerservaring en een sterke visuele identiteit hebben we de dienstverlening van BouwvergunningDirect toegankelijker gemaakt voor een brede doelgroep. De website begeleidt bezoekers stap voor stap door het proces en vertaalt technische informatie naar duidelijke communicatie, terwijl de professionele uitstraling de deskundigheid en betrouwbaarheid van het merk versterkt.",
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
                  "De nieuwe website zorgt ervoor dat BouwvergunningDirect haar expertise op een veel duidelijkere en professionelere manier presenteert. Waar vergunningsaanvragen voor veel bezoekers eerst ingewikkeld of onzeker konden aanvoelen, biedt de nieuwe online ervaring nu overzicht, vertrouwen en duidelijkheid. Hierdoor begrijpen potentiële klanten sneller wat de dienstverlening inhoudt, welke ondersteuning zij kunnen verwachten en waarom BouwvergunningDirect de juiste partner is voor hun aanvraag.",
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
