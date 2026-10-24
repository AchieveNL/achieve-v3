"use client";

import { useTr } from "@/i18n/I18nProvider";
import { sendLead, type LeadValue } from "@/lib/sendLead";
import React, { useEffect, useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { JumpNav } from "@/components/ui/JumpNav";

export function VacatureSalesContent() {
  const { t, ta, href } = useTr();

  // Contact/application form: native validation, then send everything (files included) to info@achieve.nl (lib/sendLead) and show the thank-you page.
  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const box = btn.closest("section") ?? document.body;
    const fields = Array.from(box.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      bad.reportValidity();
      return;
    }
    const lead: Record<string, LeadValue> = {};
    for (const f of fields) {
      if (!f.name) continue;
      if (f instanceof HTMLInputElement && f.type === "file") {
        if (f.files?.[0]) lead[f.name] = f.files[0];
      } else if (f instanceof HTMLInputElement && f.type === "checkbox") lead[f.name] = f.checked ? "ja" : "nee";
      else lead[f.name] = f.value;
    }
    lead.bron = window.location.pathname;
    btn.disabled = true;
    await sendLead(lead, href("Bedankt"));
    btn.disabled = false;
  };

  // Intern reviews: scrolling row (pause button) and a dialog with the full review.
  const WBR: [string, string, string][] = [
    [
      "Stef Doelman",
      "Ecommerce",
      "“In het afgelopen stagejaar heb ik veel gezien en gedaan. De begeleiding van Karim was altijd top en fijn. Daarom zou ik dus iedereen ook aanraden om hier stage te lopen!”",
    ],
    [
      "Shaznay Severin",
      "Grafisch vormgever",
      "“Mijn dagen als stagiaire vlogen voorbij bij Achieve. Een relaxte werkomgeving en begeleider die zich goed kan verplaatsen in studenten. Ik kan niet denken aan een betere stageplek voor mijn afstudeerfase dan hier.”",
    ],
    [
      "Brian van Buuren",
      "Ecommerce",
      "“Ik vond het een leuke stageplek omdat je veel flexibiliteit krijgt. En je krijgt zeker een goed kijkje in de keuken over hoe dingen in zijn werking gaan. Verder de collegas zijn vriendelijk en behulpzaam. Dus als je nog een stageplek nodighebt is het zeker een aanrader!”",
    ],
    [
      "Bjorn van Aken",
      "Onderzoek & Ontwikkeling",
      "“Gedurende mijn stage periode bij Achieve heel veel plezier gehad in wat ik kon en mocht doen. Nog veel belangrijker ook veel kunnen leren. Een top bedrijf met een hele grote know how van hun branche!”",
    ],
    [
      "Busra van Deursen",
      "Grafisch ontwerper",
      "“Mijn stageperiode bij Achieve was heel leuk en leerzaam! Je krijgt veel vrijheid als Grafisch Ontwerper en daardoor kom je er achter wat jouw kwaliteiten zijn. Verder is de sfeer super fijn en is er een goede verhouding tussen werken en samen lol hebben”",
    ],
    [
      "Aniza Malik",
      "Ecommerce",
      "“Ik vond de stage die ik de afgelopen 5 maanden mocht doen wel leuk. Achieve is ook een bedrijf die flexibel is met andere werknemers binnen het bedrijf. De tijd vloog snel, waardoor ik Achieve ook een duimpje geef!”",
    ],
    [
      "Lilianne Heuvelman",
      "Grafisch vormgever",
      "“Het was een hele toffe stage periode bij Achieve. Ik heb veel leuke en gevarieerde opdrachten gekregen. Hierdoor kwam ik er achter wat mijn kwaliteiten zijn. Ik heb een hoop nieuwe dingen geleerd en het erg naar mijn zin gehad.”",
    ],
    [
      "Angelique Nauta",
      "Digital creative",
      "“Achieve is een erg jong en creatief bedrijf. Heb hier een half jaar stage lopen, en hierin heb ik mezelf goed kunnen ontwikkelen. Achieve werkt erg professioneel, maar kan zeker wel wat lol hebben! 10/10 zou hier weer werken”",
    ],
    [
      "Aniek Breebaart",
      "Grafisch vormgever",
      "“Top stage! gehad bij achieve als mediavormgever. De tijd vloog verbij, had geen betere stageplek kunnen wensen. Het was een leuke en leerzame stage ik heb veel geleerd van marketing en illustrator. Voor mensen die nog een stageplek zoeken is dit zeker een aanrader.”",
    ],
    ["Pebbles Malestein", "Grafisch vormgever", "“Ik heb bij Achieve een geweldige stage periode gehad, veel kunnen doen en leren!”"],
    [
      "Owen van de Griend",
      "Grafisch vormgever",
      "“Heb hier 20 weken stage gelopen en heel veel geleerd en gelachen met Karim. Super leuke 20 weken gehad.”",
    ],
  ];
  const [wbPaused, setWbPaused] = useState(false);
  const [wbRev, setWbRev] = useState(-1);
  useEffect(() => {
    if (wbRev < 0) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWbRev(-1);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [wbRev]);
  const wbOpen = (i: number) => () => setWbRev(i);
  const h = {
    send,
    wbrCls: wbPaused ? "is-paused" : "",
    wbRunning: !wbPaused,
    wbStopped: wbPaused,
    wbPressed: wbPaused,
    wbLabel: wbPaused ? "Reviews afspelen" : "Reviews pauzeren",
    wbToggle: () => setWbPaused((p) => !p),
    wbRevOpen: wbRev >= 0,
    wbRevName: wbRev >= 0 ? WBR[wbRev][0] : "",
    wbRevRole: wbRev >= 0 ? WBR[wbRev][1] : "",
    wbRevQuote: wbRev >= 0 ? WBR[wbRev][2] : "",
    wbClose: () => setWbRev(-1),
    wbOpen0: wbOpen(0),
    wbOpen1: wbOpen(1),
    wbOpen2: wbOpen(2),
    wbOpen3: wbOpen(3),
    wbOpen4: wbOpen(4),
    wbOpen5: wbOpen(5),
    wbOpen6: wbOpen(6),
    wbOpen7: wbOpen(7),
    wbOpen8: wbOpen(8),
    wbOpen9: wbOpen(9),
    wbOpen10: wbOpen(10),
  };
  return (
    <>
      <section
        className="hero-dark cs-hero m-hero wb-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1F246C",
          color: "#FFFFFF",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="sv-hero-ill"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "max(40px, calc((100% - 1280px) / 2 + 40px))",
            top: "54%",
            transform: "translateY(-50%)",
            width: "360px",
            height: "360px",
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 420 420" width="100%" height="100%" fill="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="abL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#B48DFF"></stop>
                <stop offset="1" stopColor="#5EC0FA"></stop>
              </linearGradient>
              <linearGradient id="abF" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8639FA"></stop>
                <stop offset="1" stopColor="#0F8AE5"></stop>
              </linearGradient>
            </defs>
            <circle cx="210" cy="215" r="150" fill="#2E3590"></circle>
            <circle
              className="ia-ring"
              cx="210"
              cy="215"
              r="176"
              stroke="url(#abL)"
              strokeWidth="2"
              strokeDasharray="4 10"
              strokeLinecap="round"
              opacity="0.7"
            ></circle>
            <circle className="ia-tw" style={{ "--d": "0.0s" }} cx="92" cy="110" r="9" fill="#FAE84E"></circle>
            <circle className="ia-tw" style={{ "--d": "0.9s" }} cx="344" cy="118" r="12" stroke="url(#abL)" strokeWidth="3"></circle>
            <circle className="ia-tw" style={{ "--d": "0.5s" }} cx="78" cy="300" r="5" fill="#5EC0FA"></circle>
            <path
              className="ia-tw"
              style={{ "--d": "1.4s" }}
              d="M354 300l6 0M357 297l0 6"
              stroke="#FAE84E"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <rect
              x="104"
              y="176"
              width="236"
              height="156"
              rx="20"
              stroke="url(#abL)"
              strokeWidth="2.5"
              transform="rotate(-6 222 254)"
            ></rect>
            <rect x="120" y="168" width="236" height="156" rx="20" fill="#FFFFFF"></rect>
            <rect className="ia-grow" style={{ "--d": "0.6s" }} x="142" y="262" width="22" height="42" rx="6" fill="#D5DAE3"></rect>
            <rect className="ia-grow" style={{ "--d": "0.7s" }} x="176" y="246" width="22" height="58" rx="6" fill="#D5DAE3"></rect>
            <rect className="ia-grow" style={{ "--d": "0.8s" }} x="210" y="228" width="22" height="76" rx="6" fill="#D5DAE3"></rect>
            <rect className="ia-grow" style={{ "--d": "0.9s" }} x="244" y="206" width="22" height="98" rx="6" fill="url(#abF)"></rect>
            <path
              className="ia-draw"
              style={{ "--d": "1.0s" }}
              pathLength="1"
              d="M146 240l40-20 34 6 50-42 40-10"
              stroke="url(#abF)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <circle
              className="ia-pop"
              style={{ "--d": "1.5s" }}
              cx="310"
              cy="174"
              r="12"
              fill="#FAE84E"
              stroke="#FFFFFF"
              strokeWidth="3"
            ></circle>
            <path
              className="ia-pop"
              style={{ "--d": "0.5s" }}
              d="M92 92h118a18 18 0 0 1 18 18v32a18 18 0 0 1-18 18h-86l-24 20v-20h-8a18 18 0 0 1-18-18v-32a18 18 0 0 1 18-18z"
              fill="#FFFFFF"
            ></path>
            <circle cx="122" cy="126" r="9" fill="#D5DAE3"></circle>
            <circle cx="152" cy="126" r="9" fill="#D5DAE3"></circle>
            <circle className="ia-type" style={{ "--d": "1.8s" }} cx="182" cy="126" r="9" fill="#8639FA"></circle>
            <path
              className="ia-pop"
              style={{ "--d": "1.2s" }}
              d="M262 70h88a16 16 0 0 1 16 16v30a16 16 0 0 1-16 16h-8v18l-22-18h-58a16 16 0 0 1-16-16V86a16 16 0 0 1 16-16z"
              fill="url(#abF)"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
            ></path>
            <path
              className="ia-draw"
              style={{ "--d": "1.5s" }}
              pathLength="1"
              d="M286 102l12 12 24-26"
              stroke="#FAE84E"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "radial-gradient(60% 70% at 85% 20%, rgba(134, 57, 250, 0.45) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(50% 60% at 70% 95%, rgba(15, 138, 229, 0.35) 0%, rgba(15, 138, 229, 0) 70%)",
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
            <a href={href("WerkenBij")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Werken bij")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {t("Sales stage")}
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
          <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}>
              {t("Vacature")}
            </span>
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
              {"Internship"}
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
              {"Full-time"}
            </span>
          </span>
          <h1
            style={{
              margin: "0",
              maxWidth: "960px",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(48px, 6.4vw, 96px)",
              lineHeight: "0.95",
              letterSpacing: "-0.035em",
            }}
          >
            {t("Leer verkopen bij een bureau dat")}{" "}
            <Accent from="#B48DFF" to="#5EC0FA">
              <span
                className="grad-text"
                style={{
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("groeit.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t(
              "Vier à vijf maanden meebouwen aan de groei van Achieve, met veel vrijheid en verantwoordelijkheid. Ben jij de energieke doorzetter die we zoeken?",
            )}
          </p>
          <a
            href="#solliciteren"
            className="about-link"
            style={{
              alignSelf: "flex-start",
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
            <span className="l2-txt">{t("Solliciteer direct")}</span>{" "}
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
        </div>
      </section>
      <JumpNav items={[{ id: "functie", label: t("De functie") }, { id: "profiel", label: t("Wie we zoeken") }, { id: "stagiairs", label: t("Ervaringen") }, { id: "locatie", label: t("Locatie") }, { id: "procedure", label: t("Procedure") }]} cta={{ id: "solliciteren", label: t("Solliciteer") }} />
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "96px 40px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", background: "#FFFFFF", borderRadius: "24px", overflow: "hidden" }}>
          <dl
            className="cs-facts vc-facts"
            style={{
              margin: "0",
              padding: "44px 52px",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "28px 48px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Type")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Stage")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Uren")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("Full-time")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Duur")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("4 à 5 maanden")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Start")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("September, februari of maart")}</dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Locatie")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>
                {t("Cypresbaan 3, Capelle a/d IJssel")}
              </dd>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <dt style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Niveau")}
              </dt>
              <dd style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C" }}>{t("MBO, HBO of WO")}</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        id="functie"
        className="pj-wrap pj-sec vc-dark"
        style={{ position: "relative", overflow: "hidden", background: "#1F246C", padding: "112px 40px" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "radial-gradient(50% 60% at 10% 0%, rgba(134, 57, 250, 0.35) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(45% 55% at 95% 100%, rgba(15, 138, 229, 0.3) 0%, rgba(15, 138, 229, 0) 70%)",
          }}
        ></div>
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
            <h2
              style={{
                margin: "0",
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(34px, 4vw, 52px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
              }}
            >
              {t("Dit ga je")}{" "}
              <Accent from="#B48DFF" to="#5EC0FA">
                <span
                  className="grad-text"
                  style={{
                    background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("doen.")}
                </span>
              </Accent>
            </h2>
          </div>
          <ol
            className="vc-four"
            style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("01")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Inwerkweek")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Je begint met een inwerkweek in ons salesteam.")}
              </p>
            </li>
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("02")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Brainstormen")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Je doet mee aan strategische brainstormsessies.")}
              </p>
            </li>
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("03")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Meedenken over strategie")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Samen met je begeleider werk je aan de salesstrategie en aan diverse opdrachten.")}
              </p>
            </li>
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("04")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Klanten overtuigen")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Je denkt mee over hoe we potentiële klanten overtuigen en gaat mee naar gesprekken.")}
              </p>
            </li>
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("05")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Het hele salesproces")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Van nieuwe klanten zoeken tot de deal sluiten: je draait mee in elke stap.")}
              </p>
            </li>
            <li
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
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
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("06")}
              </span>
              <h3
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontSize: "26px",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Bouwen aan de sfeer")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Je draagt bij aan de goede sfeer binnen Achieve.")}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section id="profiel" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px" }}>
        <div
          className="vc-split"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          <div
            className="vc-card"
            style={{
              boxSizing: "border-box",
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  lineHeight: "1",
                  letterSpacing: "-0.025em",
                }}
              >
                {t("Wie we")}{" "}
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
                    {t("zoeken.")}
                  </span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>{t("Dit vinden we belangrijk:")}</p>
            </div>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je volgt een opleiding die raakt aan deze stage.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je bent ambitieus en resultaatgericht, en wilt bijdragen aan de salesstrategie en de uitvoering ervan.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je pitcht en overtuigt als geen ander.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je hebt de drive om te groeien.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je hebt enige ervaring met adviserend verkopen.")}</span>
              </li>
            </ul>
          </div>
          <div
            className="vc-card"
            style={{
              boxSizing: "border-box",
              background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
              borderRadius: "24px",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              color: "#FFFFFF",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h2
                style={{
                  margin: "0",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  lineHeight: "1",
                  letterSpacing: "-0.025em",
                }}
              >
                {t("Dit krijg je")}{" "}
                <Accent from="#B48DFF" to="#5EC0FA">
                  <span
                    className="grad-text"
                    style={{
                      background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {t("terug.")}
                  </span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
                {t("Naast een leerzame stage bieden we je:")}
              </p>
            </div>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("Persoonlijke ontwikkeling in een vertrouwde omgeving waarin je kunt excelleren.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("Kans op een vaste baan na je stage.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("Werkervaring door voor klanten te werken en bij ze langs te gaan.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("De kans om zelfstandig werk op te pakken.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("Veel collegialiteit en gezelligheid.")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
                <span style={{ flexShrink: "0", marginTop: "2px" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12.5l5 5L20 6.5"></path>
                  </svg>
                </span>
                <span>{t("Een bonus voor elke nieuwe klant die je binnenhaalt.")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="stagiairs" className={`wbr ${h.wbrCls}`} style={{ position: "relative", background: "#F2F8FE", padding: "0 0 112px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px 32px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
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
            {t("Zij zaten op jouw")}{" "}
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
                {t("plek.")}
              </span>
            </Accent>
          </h2>
          <button
            type="button"
            onClick={h.wbToggle}
            aria-pressed={h.wbPressed}
            aria-label={ta(String(h.wbLabel))}
            title={ta(String(h.wbLabel))}
            style={{
              flexShrink: "0",
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              border: "1px solid #D5DAE3",
              background: "#FFFFFF",
              color: "#1F246C",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              padding: "0",
            }}
          >
            {h.wbRunning && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                  <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                </svg>
              </>
            )}
            {h.wbStopped && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"></path>
                </svg>
              </>
            )}
          </button>
        </div>
        <div className="wbr-rows" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="wbr-row">
            <div className="wbr-track wbr-l">
              <article className="wbr-card">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Stef Doelman"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/google.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Google")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“In het afgelopen stagejaar heb ik veel gezien en gedaan. De begeleiding van Karim was altijd top en fijn. Daarom zou ik dus iedereen ook aanraden om hier stage te lopen!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen0} aria-label={ta("Lees de hele review van Stef Doelman")}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
              <article className="wbr-card">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Brian van Buuren"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("4 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#E4E6EA"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/trustpilot.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Trustpilot")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“Ik vond het een leuke stageplek omdat je veel flexibiliteit krijgt. En je krijgt zeker een goed kijkje in de keuken over hoe dingen in zijn werking gaan. Verder de collegas zijn vriendelijk en behulpzaam. Dus als je nog een stageplek nodighebt is het zeker een aanrader!”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen2}
                    aria-label={ta("Lees de hele review van Brian van Buuren")}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
              <article className="wbr-card">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Aniza Malik"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/google.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Google")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“Ik vond de stage die ik de afgelopen 5 maanden mocht doen wel leuk. Achieve is ook een bedrijf die flexibel is met andere werknemers binnen het bedrijf. De tijd vloog snel, waardoor ik Achieve ook een duimpje geef!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen5} aria-label={ta("Lees de hele review van Aniza Malik")}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
              <article className="wbr-card" aria-hidden="true">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Stef Doelman"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/google.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Google")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“In het afgelopen stagejaar heb ik veel gezien en gedaan. De begeleiding van Karim was altijd top en fijn. Daarom zou ik dus iedereen ook aanraden om hier stage te lopen!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen0} aria-label={ta("Lees de hele review van Stef Doelman")}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
              <article className="wbr-card" aria-hidden="true">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Brian van Buuren"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("4 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#E4E6EA"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/trustpilot.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Trustpilot")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“Ik vond het een leuke stageplek omdat je veel flexibiliteit krijgt. En je krijgt zeker een goed kijkje in de keuken over hoe dingen in zijn werking gaan. Verder de collegas zijn vriendelijk en behulpzaam. Dus als je nog een stageplek nodighebt is het zeker een aanrader!”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen2}
                    aria-label={ta("Lees de hele review van Brian van Buuren")}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
              <article className="wbr-card" aria-hidden="true">
                <div style={{ display: "contents" }}>
                  <svg
                    aria-hidden="true"
                    width="40"
                    height="31"
                    viewBox="0 0 56 44"
                    style={{ position: "absolute", top: "22px", right: "26px" }}
                  >
                    <path
                      d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                      fill="#EFE8FD"
                    ></path>
                  </svg>
                </div>
                <h3
                  translate="no"
                  style={{
                    margin: "0",
                    paddingRight: "52px",
                    fontFamily: "var(--font-body)",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {"Aniza Malik"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Ecommerce")}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#3A4150",
                    }}
                  >
                    <img src="/media/icons/google.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                    <span>{t("Google")}</span>
                  </span>
                </span>
                <div className="wbr-qwrap">
                  <p className="wbr-q">
                    {t(
                      "“Ik vond de stage die ik de afgelopen 5 maanden mocht doen wel leuk. Achieve is ook een bedrijf die flexibel is met andere werknemers binnen het bedrijf. De tijd vloog snel, waardoor ik Achieve ook een duimpje geef!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen5} aria-label={ta("Lees de hele review van Aniza Malik")}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14"></path>
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
        {h.wbRevOpen && (
          <>
            <div onClick={h.wbClose} style={{ position: "absolute", inset: "0", zIndex: "60", background: "rgba(15,18,60,0.55)" }}></div>
            <div
              role="dialog"
              aria-modal="true"
              style={{
                position: "absolute",
                zIndex: "61",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(640px, calc(100% - 32px))",
                boxSizing: "border-box",
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "44px 48px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 30px 80px rgba(15,18,60,0.35)",
              }}
            >
              <button
                type="button"
                onClick={h.wbClose}
                aria-label={ta("Sluiten")}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "44px",
                  height: "44px",
                  border: "0",
                  borderRadius: "999px",
                  background: "#F2F8FE",
                  color: "#1F246C",
                  cursor: "pointer",
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
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18"></path>
                </svg>
              </button>
              <h3 translate="no" style={{ margin: "0", paddingRight: "48px", fontSize: "24px", fontWeight: "600", color: "#1F246C" }}>
                {h.wbRevName}
              </h3>
              <span style={{ fontSize: "16px", color: "#8639FA" }}>{t(String(h.wbRevRole))}</span>
              <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.8", color: "#3A4150" }}>{t(String(h.wbRevQuote))}</p>
            </div>
          </>
        )}
      </section>
      <section id="locatie" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
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
              {t("Hier werk je")}{" "}
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
                  {t("straks.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Ons kantoor in Capelle aan den IJssel, vlak bij Rotterdam en goed bereikbaar met auto en openbaar vervoer.")}
            </p>
          </div>
          <div
            className="wb-map"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2.1fr)", gap: "24px", alignItems: "stretch" }}
          >
            <div
              className="wb-photo-box"
              style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "16 / 9", background: "#E3E8F2" }}
            >
              <img
                className="wb-photo"
                src="/media/kantoor-kaart.jpg"
                alt={ta("Het kantoorpand van Achieve aan de Cypresbaan 3 in Capelle aan den IJssel, met terras voor de ingang")}
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }}
              />
            </div>
            <div
              className="wb-map-card"
              style={{
                order: "-1",
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "36px 36px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <strong translate="no" style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#1F246C" }}>
                {"Achieve"}
              </strong>
              <span translate="no" style={{ fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}>
                {"Cypresbaan 3"}
                <br />
                {"2908 LT Capelle aan den IJssel"}
              </span>
              <span style={{ marginTop: "8px", fontSize: "14px", lineHeight: "1.6", color: "#5A6273" }}>
                {t("Maandag – vrijdag: 09:00 – 17:30")}
                <br />
                {t("Zaterdag – zondag: gesloten")}
              </span>
              <div style={{ marginTop: "8px" }}>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Achieve,+Cypresbaan+3,+2908+LT+Capelle+aan+den+IJssel"
                  className="about-link"
                  style={{
                    alignSelf: "flex-start",
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
                  <span className="l2-txt">{t("Plan je route")}</span>{" "}
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
      <section id="procedure" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div
          className="vc-route"
          style={{
            position: "relative",
            overflow: "hidden",
            boxSizing: "border-box",
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#1F246C",
            borderRadius: "28px",
            padding: "64px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "0",
              pointerEvents: "none",
              background: "radial-gradient(50% 70% at 90% 10%, rgba(134, 57, 250, 0.4) 0%, rgba(134, 57, 250, 0) 70%)",
            }}
          ></div>
          <h2
            style={{
              position: "relative",
              margin: "0 0 44px",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: "1",
              letterSpacing: "-0.025em",
            }}
          >
            {t("Zo werkt")}{" "}
            <Accent from="#B48DFF" to="#5EC0FA">
              <span
                className="grad-text"
                style={{
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("solliciteren.")}
              </span>
            </Accent>
          </h2>
          <div style={{ position: "relative" }}>
            <div
              className="vc-rt-line"
              aria-hidden="true"
              style={{ position: "absolute", left: "12px", right: "20%", top: "52px", borderTop: "2px dashed rgba(255, 255, 255, 0.35)" }}
            ></div>
            <ol
              className="vc-rt"
              style={{
                position: "relative",
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "24px",
              }}
            >
              <li style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#1F246C",
                    background: "#FAE84E",
                    padding: "4px 12px",
                    borderRadius: "999px",
                  }}
                >
                  {t("Je bent hier")}
                </span>
                <span
                  aria-hidden="true"
                  className="vc-rt-dot vc-rt-here"
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "28px",
                    height: "28px",
                    borderRadius: "999px",
                    background: "#FAE84E",
                    margin: "0",
                    boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.15)",
                  }}
                ></span>
                <h3
                  style={{
                    margin: "0",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("1. Stuur je cv en motivatie")}
                </h3>
                <p style={{ margin: "0", maxWidth: "340px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Via het formulier hieronder, of mail ze naar")}{" "}
                  <a href="mailto:info@achieve.nl" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
                    {"info@achieve.nl"}
                  </a>
                  {t(".")}
                </p>
              </li>
              <li style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <span className="vc-rt-spacer" aria-hidden="true" style={{ height: "27px" }}></span>
                <span
                  aria-hidden="true"
                  className="vc-rt-dot"
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "20px",
                    height: "20px",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    margin: "4px",
                    boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.15)",
                  }}
                ></span>
                <h3
                  style={{
                    margin: "0",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("2. Kennismaken")}
                </h3>
                <p style={{ margin: "0", maxWidth: "340px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Past het? Dan nodigen we je uit voor een gesprek om elkaar te leren kennen.")}
                </p>
              </li>
              <li style={{ position: "relative", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
                <span className="vc-rt-spacer" aria-hidden="true" style={{ height: "27px" }}></span>
                <span
                  aria-hidden="true"
                  className="vc-rt-dot"
                  style={{
                    position: "relative",
                    zIndex: "1",
                    width: "20px",
                    height: "20px",
                    borderRadius: "999px",
                    background: "#FFFFFF",
                    margin: "4px",
                    boxShadow: "0 0 0 6px rgba(255, 255, 255, 0.15)",
                  }}
                ></span>
                <h3
                  style={{
                    margin: "0",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display)",
                    fontSize: "26px",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("3. Aan de slag")}
                </h3>
                <p style={{ margin: "0", maxWidth: "340px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Samen spreken we je startdatum af en maak je kennis met het team.")}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <section
        id="solliciteren"
        className="pj-wrap cta-arrows"
        style={{ background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)", color: "#FFFFFF", padding: "112px 40px" }}
      >
        <div
          className="wb-form"
          style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px 72px" }}
        >
          <div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
            <p
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                fontWeight: "700",
                fontStyle: "italic",
                color: "#FAE84E",
              }}
            >
              {t("Ambition, delivered.")}
            </p>
            <h2
              style={{
                margin: "0",
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
              }}
            >
              {t("Solliciteer")}{" "}
              <Accent from="#FAE84E" to="#F2C811">
                <span style={{ color: "#FAE84E" }}>{t("direct.")}</span>
              </Accent>
            </h2>
            <p style={{ margin: "0", maxWidth: "480px", fontSize: "18px", lineHeight: "1.6", color: "#FFFFFF" }}>
              {t("Stuur je cv en motivatie mee. Zit de juiste vacature er niet tussen? Kies dan voor een open sollicitatie.")}
            </p>
            <ul style={{ margin: "8px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>
                  {t("Bel ons:")}{" "}
                  <a href="tel:+31854016590" style={{ color: "#FFFFFF" }}>
                    {t("085 401 6590")}
                  </a>
                </span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>
                  {t("Mail ons:")}{" "}
                  <a href="mailto:info@achieve.nl" translate="no" style={{ color: "#FFFFFF" }}>
                    {"info@achieve.nl"}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <div
            style={{
              flex: "0 1 440px",
              minWidth: "0",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "36px",
              color: "#1F246C",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "700" }}>
              {t("Jouw sollicitatie")}
            </h3>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Naam")}
              <input
                type="text"
                name="naam"
                autoComplete="name"
                required
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "16px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D5DAE3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("E-mailadres")}
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "16px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D5DAE3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Telefoonnummer")}
              <input
                type="tel"
                name="telefoon"
                autoComplete="tel"
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "16px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D5DAE3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Vacature")}
              <select
                name="vacature"
                defaultValue={t("Sales stage")}
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "16px 16px",
                  borderRadius: "8px",
                  border: "1px solid #D5DAE3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                  appearance: "auto",
                }}
              >
                <option>{t("Sales stage")}</option>
                <option>{t("Content stage")}</option>
                <option>{t("Open sollicitatie")}</option>
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Upload je cv")}
              <input
                type="file"
                name="cv"
                accept=".pdf,.txt,.doc,.docx"
                style={{
                  font: "inherit",
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px dashed #B9BFD3",
                  background: "#F2F8FE",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Upload je motivatie")}
              <input
                type="file"
                name="motivatie"
                accept=".pdf,.txt,.doc,.docx"
                style={{
                  font: "inherit",
                  fontSize: "14px",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px dashed #B9BFD3",
                  background: "#F2F8FE",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
              />
            </label>
            <span style={{ fontSize: "13px", color: "#5A6273", marginTop: "-8px" }}>
              {t("Geaccepteerde bestanden: .pdf, .txt, .doc, .docx")}
            </span>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "1.5",
                color: "#5A6273",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              <input
                type="checkbox"
                name="toestemming"
                required
                style={{ width: "18px", height: "18px", margin: "1px 0 0", flexShrink: "0", accentColor: "#8639FA", cursor: "pointer" }}
              />
              <span>
                {t("Ik ga akkoord dat Achieve mijn gegevens gebruikt om mijn sollicitatie te behandelen. Lees onze")}{" "}
                <a href={href("Privacy")} style={{ color: "#1F246C", fontWeight: "600" }}>
                  {t("privacyverklaring")}
                </a>
                {t(".")}
              </span>
            </label>
            <button
              type="button"
              className="glow"
              onClick={h.send}
              style={{
                marginTop: "8px",
                font: "inherit",
                fontSize: "18px",
                fontWeight: "700",
                padding: "16px 24px",
                borderRadius: "8px",
                border: "2px solid transparent",
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              {t("Verstuur sollicitatie")}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
