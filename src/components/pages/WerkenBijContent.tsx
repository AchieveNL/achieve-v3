"use client";

import { useTr } from "@/i18n/I18nProvider";
import { sendLead, type LeadValue } from "@/lib/sendLead";
import React, { useEffect, useState } from "react";
import { Accent } from "@/components/ui/Accent";
import { JumpNav } from "@/components/ui/JumpNav";

export function WerkenBijContent() {
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
          className="wbt"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "max(40px, calc((100% - 1280px) / 2 + 40px))",
            top: "54%",
            transform: "translateY(-50%)",
            width: "440px",
            height: "440px",
            pointerEvents: "none",
          }}
        >
          <svg
            viewBox="0 0 440 440"
            width="100%"
            height="100%"
            fill="none"
            aria-hidden="true"
            focusable="false"
            style={{ position: "absolute", inset: "0", overflow: "visible" }}
          >
            <defs>
              <linearGradient id="wbtL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#B48DFF"></stop>
                <stop offset="1" stopColor="#5EC0FA"></stop>
              </linearGradient>
            </defs>
            <circle cx="220" cy="222" r="150" fill="#2E3590"></circle>
            <circle
              className="wbt-ring"
              cx="220"
              cy="222"
              r="158"
              stroke="url(#wbtL)"
              strokeWidth="2"
              strokeDasharray="4 10"
              strokeLinecap="round"
              opacity="0.7"
            ></circle>
            <circle cx="416" cy="96" r="7" fill="#FAE84E"></circle>
            <circle cx="36" cy="400" r="5" fill="#5EC0FA"></circle>
            <path d="M418 330l8 0M422 326l0 8" stroke="#FAE84E" strokeWidth="3" strokeLinecap="round"></path>
          </svg>
          <div className="wbt-b" style={{ position: "absolute", left: "19.318%", top: "6.636%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#EFE8FD",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/karim.svg"
                alt=""
                style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Karim")}</span>
          </div>
          <div className="wbt-b" style={{ position: "absolute", left: "55.227%", top: "6.636%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#E3F1FD",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/abdelmonim.svg"
                alt=""
                style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Abdelmonim")}</span>
          </div>
          <div className="wbt-b" style={{ position: "absolute", left: "73.182%", top: "37.727%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#FFF6C7",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/niek.svg"
                alt=""
                style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Niek")}</span>
          </div>
          <div className="wbt-b" style={{ position: "absolute", left: "55.227%", top: "68.818%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#E3F1FD",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/jonas.svg"
                alt=""
                style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Jonas")}</span>
          </div>
          <div className="wbt-b" style={{ position: "absolute", left: "19.318%", top: "68.818%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#EFE8FD",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/seyma.svg"
                alt=""
                style={{ position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Seyma")}</span>
          </div>
          <div className="wbt-b" style={{ position: "absolute", left: "1.364%", top: "37.727%", width: "25.455%", aspectRatio: "1 / 1" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#FFF6C7",
                border: "3px solid #FFFFFF",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/media/team/denise.svg"
                alt=""
                style={{ position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
              />
            </div>
            <span className="wbt-n">{t("Denise")}</span>
          </div>
          <div
            className="wbt-you"
            style={{
              position: "absolute",
              left: "37.273%",
              top: "37.727%",
              width: "25.455%",
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              border: "3px dashed #FAE84E",
              background: "rgba(250, 232, 78, 0.08)",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "32px",
                lineHeight: "1",
                letterSpacing: "-0.02em",
                color: "#FAE84E",
              }}
            >
              {t("Jij?")}
            </span>
          </div>
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
            <span aria-current="page" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {t("Werken bij")}
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
            {t("Werken bij Achieve")}
          </span>
          <h1
            style={{
              margin: "0",
              maxWidth: "900px",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(48px, 6.4vw, 96px)",
              lineHeight: "0.95",
              letterSpacing: "-0.035em",
            }}
          >
            {t("Word jij onze nieuwe")}{" "}
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
                {t("collega?")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t(
              "Voel je je thuis in een open cultuur, waar je jezelf kunt zijn en je mening telt? Werk je graag voor toffe, diverse klanten en wil je groeien in wat je leuk vindt? Dan willen we je graag ontmoeten.",
            )}
          </p>
          <a
            href="#vacatures"
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
            <span className="l2-txt">{t("Bekijk de vacatures")}</span>{" "}
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
      <JumpNav items={[{ id: "vacatures", label: t("Vacatures") }, { id: "waarom", label: t("Waarom Achieve") }, { id: "stagiairs", label: t("Ervaringen") }, { id: "locatie", label: t("Locatie") }]} cta={{ id: "solliciteren", label: t("Solliciteer") }} />
      <section id="vacatures" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "96px 40px 112px" }}>
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
              {t("Onze")}{" "}
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
                  {t("vacatures.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Twee stageplekken staan open. Zit jouw plek er niet tussen? Open sollicitaties zijn ook altijd welkom.")}
            </p>
          </div>
          <div className="wb-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px" }}>
            <article
              className="pj-card"
              style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
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
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1.05",
                  letterSpacing: "-0.015em",
                }}
              >
                {t("Sales stage")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "Vier à vijf maanden meebouwen aan de groei van Achieve, met veel vrijheid en verantwoordelijkheid. Haal je de juiste klanten binnen, dan verdien je ook nog een bonus.",
                )}
              </p>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Dit ga je doen")}
              </span>
              <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je draait mee in het hele salesproces, van nieuwe klanten zoeken tot de deal sluiten.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je denkt mee over de salesstrategie en werkt samen met je begeleider.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je gaat mee op pad naar klanten en pakt zelfstandig werk op.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Kans op een vaste baan na je stage.")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                <a
                  href={href("VacatureSales")}
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
                  <span className="l2-txt">{t("Bekijk de vacature")}</span>{" "}
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
              style={{
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
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
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1.05",
                  letterSpacing: "-0.015em",
                }}
              >
                {t("Content stage")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "Bedenken, maken en publiceren: content voor onze klanten én voor Achieve zelf. Voor jouw ideeën krijg je veel vrijheid.",
                )}
              </p>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
                {t("Dit ga je doen")}
              </span>
              <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je werkt samen met je begeleider aan echte klantprojecten.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je denkt mee over de contentstrategie, van social media tot kennisartikelen.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Je maakt social media posts, online en offline advertenties en meer.")}</span>
                </li>
                <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
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
                  <span>{t("Kans op een vaste baan na je stage.")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                <a
                  href={href("VacatureContent")}
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
                  <span className="l2-txt">{t("Bekijk de vacature")}</span>{" "}
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
      <section
        id="waarom"
        className="pj-wrap pj-sec wb-dark"
        style={{ position: "relative", overflow: "hidden", background: "#1F246C", padding: "112px 40px", marginBottom: "0" }}
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
              {t("Waarom")}{" "}
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
                  {t("Achieve?")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
              {t("Vijf redenen waarom stagiairs en collega's graag bij ons werken.")}
            </p>
          </div>
          <ol
            className="wb-plus"
            style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
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
                {t("Super collega's")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "We gaan vriendschappelijk met elkaar om en staan altijd voor elkaar klaar. Hoeveel ervaring je ook hebt, je leert elke dag van je collega's.",
                )}
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
                {t("Toffe klanten")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "Een breed portfolio betekent afwisselend werk. We werken vooral voor bedrijven die nog flink kunnen groeien, en die groei maak jij van dichtbij mee.",
                )}
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
                {t("Informele werksfeer")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "Geen hiërarchisch gedoe, wel ruimte om jezelf te ontwikkelen. En er staat altijd een cappuccino of warme chocolademelk voor je klaar.",
                )}
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
                {t("Persoonlijke groei")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "We investeren in jouw ontwikkeling. Bij de opdrachten die je krijgt, houden we zoveel mogelijk rekening met waarin jij wilt groeien.",
                )}
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
                {t("Meedenkers")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "We denken mee met klanten én met elkaar, en werken oplossingsgericht. Thuiswerken kan, al is het op kantoor ook erg gezellig.",
                )}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section id="stagiairs" className={`wbr ${h.wbrCls}`} style={{ position: "relative", background: "#F2F8FE", padding: "112px 0" }}>
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
                  {"Busra van Deursen"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch ontwerper")}</span>
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
                      "“Mijn stageperiode bij Achieve was heel leuk en leerzaam! Je krijgt veel vrijheid als Grafisch Ontwerper en daardoor kom je er achter wat jouw kwaliteiten zijn. Verder is de sfeer super fijn en is er een goede verhouding tussen werken en samen lol hebben”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen4}
                    aria-label={ta("Lees de hele review van Busra van Deursen")}
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
                  {"Lilianne Heuvelman"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Het was een hele toffe stage periode bij Achieve. Ik heb veel leuke en gevarieerde opdrachten gekregen. Hierdoor kwam ik er achter wat mijn kwaliteiten zijn. Ik heb een hoop nieuwe dingen geleerd en het erg naar mijn zin gehad.”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen6}
                    aria-label={ta("Lees de hele review van Lilianne Heuvelman")}
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
                  {"Aniek Breebaart"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Top stage! gehad bij achieve als mediavormgever. De tijd vloog verbij, had geen betere stageplek kunnen wensen. Het was een leuke en leerzame stage ik heb veel geleerd van marketing en illustrator. Voor mensen die nog een stageplek zoeken is dit zeker een aanrader.”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen8} aria-label={ta("Lees de hele review van Aniek Breebaart")}>
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
                  {"Owen van de Griend"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                    {t("“Heb hier 20 weken stage gelopen en heel veel geleerd en gelachen met Karim. Super leuke 20 weken gehad.”")}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen10}
                    aria-label={ta("Lees de hele review van Owen van de Griend")}
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
                  {"Busra van Deursen"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch ontwerper")}</span>
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
                      "“Mijn stageperiode bij Achieve was heel leuk en leerzaam! Je krijgt veel vrijheid als Grafisch Ontwerper en daardoor kom je er achter wat jouw kwaliteiten zijn. Verder is de sfeer super fijn en is er een goede verhouding tussen werken en samen lol hebben”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen4}
                    aria-label={ta("Lees de hele review van Busra van Deursen")}
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
                  {"Lilianne Heuvelman"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Het was een hele toffe stage periode bij Achieve. Ik heb veel leuke en gevarieerde opdrachten gekregen. Hierdoor kwam ik er achter wat mijn kwaliteiten zijn. Ik heb een hoop nieuwe dingen geleerd en het erg naar mijn zin gehad.”",
                    )}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen6}
                    aria-label={ta("Lees de hele review van Lilianne Heuvelman")}
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
                  {"Aniek Breebaart"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Top stage! gehad bij achieve als mediavormgever. De tijd vloog verbij, had geen betere stageplek kunnen wensen. Het was een leuke en leerzame stage ik heb veel geleerd van marketing en illustrator. Voor mensen die nog een stageplek zoeken is dit zeker een aanrader.”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen8} aria-label={ta("Lees de hele review van Aniek Breebaart")}>
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
                  {"Owen van de Griend"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                    {t("“Heb hier 20 weken stage gelopen en heel veel geleerd en gelachen met Karim. Super leuke 20 weken gehad.”")}
                  </p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen10}
                    aria-label={ta("Lees de hele review van Owen van de Griend")}
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
            </div>
          </div>
          <div className="wbr-row">
            <div className="wbr-track wbr-r">
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
                  {"Shaznay Severin"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Mijn dagen als stagiaire vlogen voorbij bij Achieve. Een relaxte werkomgeving en begeleider die zich goed kan verplaatsen in studenten. Ik kan niet denken aan een betere stageplek voor mijn afstudeerfase dan hier.”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen1} aria-label={ta("Lees de hele review van Shaznay Severin")}>
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
                  {"Bjorn van Aken"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Onderzoek & Ontwikkeling")}</span>
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
                      "“Gedurende mijn stage periode bij Achieve heel veel plezier gehad in wat ik kon en mocht doen. Nog veel belangrijker ook veel kunnen leren. Een top bedrijf met een hele grote know how van hun branche!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen3} aria-label={ta("Lees de hele review van Bjorn van Aken")}>
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
                  {"Angelique Nauta"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Digital creative")}</span>
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
                      "“Achieve is een erg jong en creatief bedrijf. Heb hier een half jaar stage lopen, en hierin heb ik mezelf goed kunnen ontwikkelen. Achieve werkt erg professioneel, maar kan zeker wel wat lol hebben! 10/10 zou hier weer werken”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen7} aria-label={ta("Lees de hele review van Angelique Nauta")}>
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
                  {"Pebbles Malestein"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                  <p className="wbr-q">{t("“Ik heb bij Achieve een geweldige stage periode gehad, veel kunnen doen en leren!”")}</p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen9}
                    aria-label={ta("Lees de hele review van Pebbles Malestein")}
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
                  {"Shaznay Severin"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                      "“Mijn dagen als stagiaire vlogen voorbij bij Achieve. Een relaxte werkomgeving en begeleider die zich goed kan verplaatsen in studenten. Ik kan niet denken aan een betere stageplek voor mijn afstudeerfase dan hier.”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen1} aria-label={ta("Lees de hele review van Shaznay Severin")}>
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
                  {"Bjorn van Aken"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Onderzoek & Ontwikkeling")}</span>
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
                      "“Gedurende mijn stage periode bij Achieve heel veel plezier gehad in wat ik kon en mocht doen. Nog veel belangrijker ook veel kunnen leren. Een top bedrijf met een hele grote know how van hun branche!”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen3} aria-label={ta("Lees de hele review van Bjorn van Aken")}>
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
                  {"Angelique Nauta"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Digital creative")}</span>
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
                      "“Achieve is een erg jong en creatief bedrijf. Heb hier een half jaar stage lopen, en hierin heb ik mezelf goed kunnen ontwikkelen. Achieve werkt erg professioneel, maar kan zeker wel wat lol hebben! 10/10 zou hier weer werken”",
                    )}
                  </p>
                  <button type="button" className="wbr-more" onClick={h.wbOpen7} aria-label={ta("Lees de hele review van Angelique Nauta")}>
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
                  {"Pebbles Malestein"}
                </h3>
                <span style={{ fontSize: "15px", color: "#8639FA" }}>{t("Grafisch vormgever")}</span>
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
                  <p className="wbr-q">{t("“Ik heb bij Achieve een geweldige stage periode gehad, veel kunnen doen en leren!”")}</p>
                  <button
                    type="button"
                    className="wbr-more"
                    onClick={h.wbOpen9}
                    aria-label={ta("Lees de hele review van Pebbles Malestein")}
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
