"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstEmailMarketingContent() {
  const { t, ta, href } = useTr();

  // "Op deze pagina": sticks under the header and highlights the section you are reading.
  const jumpRef = useRef<HTMLElement>(null);
  const [act, setAct] = useState("");
  useEffect(() => {
    const bar = jumpRef.current;
    if (!bar) return;
    const ids = Array.from(bar.querySelectorAll("a[href^='#']")).map((a) => a.getAttribute("href")!.slice(1));
    const onScroll = () => {
      const head = document.querySelector(".site-head") as HTMLElement | null;
      const top = head && !head.classList.contains("is-hidden") ? head.offsetHeight : 0;
      bar.style.top = top + "px";
      const line = top + bar.offsetHeight + 24;
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      setAct(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const j = (id: string) => ({ c: act === id ? "is-on" : "", a: act === id });

  // Price plans on phones: a swipeable row of cards, centred on the selected plan (Standard first).
  const tfmTrackRef = useRef<HTMLDivElement>(null);
  const [tfmI, setTfmI] = useState(1);
  const tfmGo = useCallback((i: number, smooth: boolean) => {
    const t = tfmTrackRef.current;
    if (!t) return;
    const n = t.children.length;
    const k = Math.max(0, Math.min(n - 1, i));
    const c = t.children[k] as HTMLElement | undefined;
    if (!c) return;
    t.scrollTo({ left: c.offsetLeft - (t.clientWidth - c.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);
  useEffect(() => {
    const el = tfmTrackRef.current;
    if (!el) return;
    tfmGo(1, false);
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0,
        bd = Infinity;
      Array.from(el.children).forEach((c, i) => {
        const h2 = c as HTMLElement;
        const d = Math.abs(h2.offsetLeft + h2.offsetWidth / 2 - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      setTfmI(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [tfmGo]);
  const [tfmReq, setTfmReq] = useState({ i: 1, n: 0 });
  useEffect(() => {
    if (tfmReq.n > 0) tfmGo(tfmReq.i, true);
  }, [tfmReq, tfmGo]);

  // Web Development: switch between Custom website and Shopify webshop.
  const [wdKind, setWdKind] = useState<"custom" | "shopify">("custom");
  const wdC = wdKind === "custom",
    wdS = wdKind === "shopify";

  const h = {
    jcUitdagingen: j("uitdagingen").c,
    jaUitdagingen: j("uitdagingen").a,
    jcOplossing: j("oplossing").c,
    jaOplossing: j("oplossing").a,
    jcVoordelen: j("voordelen").c,
    jaVoordelen: j("voordelen").a,
    jcCijfers: j("cijfers").c,
    jaCijfers: j("cijfers").a,
    jcWaaromWij: j("waarom-wij").c,
    jaWaaromWij: j("waarom-wij").a,
    jcAanpak: j("aanpak").c,
    jaAanpak: j("aanpak").a,
    jcPakketten: j("pakketten").c,
    jaPakketten: j("pakketten").a,
    jcHosting: j("hosting").c,
    jaHosting: j("hosting").a,
    jcReviews: j("reviews").c,
    jaReviews: j("reviews").a,
    jcStart: j("start").c,
    jaStart: j("start").a,
    tfmPlan: ["Basic", "Standard", "Premium"][tfmI],
    tfmCounter: `${tfmI + 1} / 3`,
    tfmPrevOp: tfmI === 0 ? "0.35" : "1",
    tfmNextOp: tfmI === 2 ? "0.35" : "1",
    tfmPrev: () => setTfmReq((r) => ({ i: tfmI - 1, n: r.n + 1 })),
    tfmNext: () => setTfmReq((r) => ({ i: tfmI + 1, n: r.n + 1 })),
    wdIsCustom: wdC,
    wdIsShop: wdS,
    wdPickCustom: () => setWdKind("custom"),
    wdPickShop: () => setWdKind("shopify"),
    wdCP: wdC,
    wdSP: wdS,
    wdCBg: wdC ? "#1F246C" : "transparent",
    wdSBg: wdS ? "#1F246C" : "transparent",
    wdCCol: wdC ? "#FFFFFF" : "#1F246C",
    wdSCol: wdS ? "#FFFFFF" : "#1F246C",
    wdCSh: wdC ? "0 6px 16px rgba(31, 36, 108, 0.18)" : "none",
    wdSSh: wdS ? "0 6px 16px rgba(31, 36, 108, 0.18)" : "none",
  };
  return (
    <>
      <section
        className="hero-dark cs-hero sv-hero m-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1F246C",
          color: "#FFFFFF",
          minHeight: "640px",
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
              x="92"
              y="170"
              width="236"
              height="160"
              rx="20"
              stroke="url(#abL)"
              strokeWidth="2.5"
              transform="rotate(-6 210 250)"
            ></rect>
            <rect className="ia-slide" style={{ "--d": "0.5s" }} x="148" y="96" width="140" height="150" rx="14" fill="#FFFFFF"></rect>
            <rect className="ia-slide" style={{ "--d": "0.6s" }} x="166" y="116" width="70" height="12" rx="6" fill="url(#abF)"></rect>
            <rect x="166" y="142" width="104" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="166" y="162" width="86" height="10" rx="5" fill="#D5DAE3"></rect>
            <path d="M104 196l106 72 106-72v116a16 16 0 0 1-16 16H120a16 16 0 0 1-16-16z" fill="url(#abF)"></path>
            <path d="M104 196l106 72 106-72" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round"></path>
            <path d="M104 312l80-56M316 312l-80-56" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="3"></path>
            <circle className="ia-pop" style={{ "--d": "1.1s" }} cx="306" cy="110" r="26" fill="#FAE84E"></circle>
            <path
              className="ia-draw"
              style={{ "--d": "1.4s" }}
              pathLength="1"
              d="M294 110l9 9 16-18"
              stroke="#1F246C"
              strokeWidth="5"
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
            background:
              "radial-gradient(50% 70% at 12% 15%, rgba(134, 57, 250, 0.45) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(45% 60% at 92% 95%, rgba(15, 138, 229, 0.40) 0%, rgba(15, 138, 229, 0) 70%)",
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
            <span aria-hidden="true" style={{ margin: "0 6px" }}>
              {t("/")}
            </span>{" "}
            <a href={href("Main")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Diensten")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 6px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {"Email Marketing"}
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
          <span
            translate="no"
            style={{
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#6E5A00",
              background: "#FFF6C7",
              padding: "7px 14px",
              borderRadius: "999px",
            }}
          >
            {"Email Marketing"}
          </span>
          <h1
            style={{
              margin: "0",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(48px, 7vw, 104px)",
              lineHeight: "0.95",
              letterSpacing: "-0.035em",
            }}
          >
            {t("Blijf in beeld.")}
            <br />
            {t("Ook na de")}{" "}
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
                {t("aankoop.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t(
              "Nieuwsbrieven en automatische e-mails die je klanten op het juiste moment bereiken. Wij zetten het samen met je op, zodat je contact houdt zonder er elke dag mee bezig te zijn.",
            )}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 28px" }}>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="glow d2"
              style={{
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "18px 30px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
            </a>
            <span style={{ fontSize: "15px", color: "#D5DAE3" }}>
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €997")}</strong> {t("eenmalig, ex. btw")}
            </span>
          </div>
        </div>
      </section>
      <nav
        className="em-jump"
        ref={jumpRef}
        aria-label={ta("Op deze pagina")}
        style={{
          position: "sticky",
          top: "0",
          zIndex: "40",
          background: "rgba(255, 255, 255, 0.92)",
          WebkitBackdropFilter: "blur(14px)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #E4E6EA",
          transition: "top .3s ease",
        }}
      >
        <div
          className="em-jump-in"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          <span
            className="em-jump-lbl"
            style={{
              flexShrink: "0",
              marginRight: "12px",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#5A6273",
            }}
          >
            {t("Op deze pagina")}
          </span>
          <a href="#uitdagingen" className={`em-jl ${h.jcUitdagingen}`} aria-current={h.jaUitdagingen}>
            {t("Uitdagingen")}
          </a>
          <a href="#oplossing" className={`em-jl ${h.jcOplossing}`} aria-current={h.jaOplossing}>
            {t("Oplossing")}
          </a>
          <a href="#voordelen" className={`em-jl ${h.jcVoordelen}`} aria-current={h.jaVoordelen}>
            {t("Voordelen")}
          </a>
          <a href="#cijfers" className={`em-jl ${h.jcCijfers}`} aria-current={h.jaCijfers}>
            {t("Cijfers")}
          </a>
          <a href="#waarom-wij" className={`em-jl ${h.jcWaaromWij}`} aria-current={h.jaWaaromWij}>
            {t("Waarom wij")}
          </a>
          <a href="#aanpak" className={`em-jl ${h.jcAanpak}`} aria-current={h.jaAanpak}>
            {t("Aanpak")}
          </a>
          <a href="#reviews" className={`em-jl ${h.jcReviews}`} aria-current={h.jaReviews}>
            {t("Reviews")}
          </a>
          <a href="#pakketten" className={`em-jl ${h.jcPakketten}`} aria-current={h.jaPakketten}>
            {t("Pakketten")}
          </a>
          <a href="#start" className={`em-jl ${h.jcStart}`} aria-current={h.jaStart}>
            {t("Contact")}
          </a>
        </div>
      </nav>
      <section id="uitdagingen" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "760px" }}>
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
              {t("Je laat omzet liggen in je eigen")}{" "}
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
                  {t("klantenbestand.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>{t("Herken je dit?")}</p>
          </div>
          <ul
            className="sv-grid3"
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
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Je weet niet waar je moet beginnen.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je wilt meer halen uit de klanten die je al hebt. Maar waar start je, en wat stuur je?")}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Je mist inzicht.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je hebt een groot bestand, maar je weet niet wat je mails opleveren. Zonder de juiste cijfers (KPI's)")}
                <Tip label={ta("Uitleg")} plain>
                  {t(
                    "KPI's (key performance indicators): de paar cijfers die laten zien of je je doelen haalt, zoals omzet of aantal aanvragen.",
                  )}
                </Tip>{" "}
                {t("kun je niets verbeteren.")}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Je bereikt de verkeerde mensen.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je weet niet wie je mist. Zo gaan je mails naar de verkeerde doelgroep, en laat je kansen liggen.")}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section
        id="oplossing"
        className="pj-wrap pj-sec sv-dark"
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
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "56px" }}>
          <div
            className="sv-grip"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "56px", alignItems: "center" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
                {t("E-mail die verkoopt terwijl jij")}{" "}
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
                    {t("onderneemt.")}
                  </span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
                {t("Van los bestand naar vaste klanten.")}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "Goede e-mailmarketing doet meer dan berichten versturen. Een deel van je marketing loopt vanzelf, en er komen echt meer leads",
                )}
                <Tip label={ta("Uitleg")} plain>
                  {t("Lead: iemand die interesse toont en zijn gegevens achterlaat, bijvoorbeeld via een formulier of een afspraak.")}
                </Tip>{" "}
                {t("en verkopen uit. Stel je voor dat elke klant op het juiste moment de juiste mail krijgt.")}
              </p>
            </div>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
              <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
                {t("Je haalt meer waarde uit de klanten die je al hebt, zonder steeds nieuwe te hoeven zoeken.")}
              </li>
              <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
                {t("Je ziet precies wat werkt: wie opent, wie klikt en wie je nog mist.")}
              </li>
              <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
                {t("Je mails lopen grotendeels vanzelf. Jij hebt tijd voor je bedrijf, de mails doen het werk.")}
              </li>
            </ul>
          </div>
          <figure style={{ margin: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "24px",
                padding: "32px 24px",
                boxSizing: "border-box",
              }}
            >
              <div className="em-flow-scroll" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
                <div
                  className="em-flow"
                  translate="no"
                  role="img"
                  aria-label="Voorbeeld van een automatische e-mailflow na een gepland groeigesprek"
                  style={{ position: "relative", width: "1080px", height: "820px", margin: "0 auto", fontFamily: "var(--font-body)" }}
                >
                  <svg
                    aria-hidden="true"
                    width="1080"
                    height="820"
                    viewBox="0 0 1080 820"
                    style={{ position: "absolute", left: "0", top: "0" }}
                  >
                    <path d="M362 48 V80" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M362 144 C 362 168, 180 156, 180 180" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 214 V246" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M362 144 C 362 168, 545 156, 545 180" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 214 V246" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 304 V338" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 396 V430" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 488 V522" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 580 V614" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M180 672 V706" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 304 V338" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 396 V430" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 488 V522" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 580 V614" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M545 672 V706" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M905 304 V338" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path d="M905 396 V430" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="2" fill="none"></path>
                    <path
                      d="M905 488 C 905 551, 770 551, 710 551"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M380 551 C 368 551, 357 643, 345 643"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    ></path>
                    <path
                      d="M545 764 C 545 808, 405 808, 345 735"
                      stroke="rgba(255, 255, 255, 0.4)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="6 6"
                      strokeLinecap="round"
                    ></path>
                    <g transform="translate(352 54)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 220)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 220)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 311)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 403)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 495)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 587)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(170 679)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 311)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 403)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 495)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 587)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(535 679)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(895 311)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                    <g transform="translate(895 403)">
                      <rect width="20" height="20" rx="4" fill="#262C78" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="1.5"></rect>
                      <path d="M10 5v10M5 10h10" stroke="#DDE1F4" strokeWidth="2" strokeLinecap="round"></path>
                    </g>
                  </svg>
                  <div
                    style={{
                      position: "absolute",
                      left: "162px",
                      top: "0px",
                      width: "400px",
                      height: "48px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(134, 57, 250, 0.22)",
                      border: "1px solid rgba(180, 141, 255, 0.45)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9AEFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 7v5l3 2"></path>
                    </svg>
                    <span>{"Wacht tot Huidige tijd (Europe/Amsterdam) is 9 (9AM)"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "112px",
                      top: "80px",
                      width: "500px",
                      height: "64px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 1-1 1.7"></path>
                      <path d="M12 17h.01"></path>
                    </svg>
                    <span>
                      {"Wordt er aan de volgende voorwaarden voldaan? (Contact heeft tag calendly-integration-[Groeigesprek gepland])"}
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "152px",
                      top: "180px",
                      width: "56px",
                      height: "34px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255, 255, 255, 0.35)",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {"Ja"}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "517px",
                      top: "180px",
                      width: "56px",
                      height: "34px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(255, 255, 255, 0.35)",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      color: "#FFFFFF",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {"Nee"}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "246px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(250, 232, 78, 0.14)",
                      border: "1px solid rgba(250, 232, 78, 0.4)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FAE84E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <path d="M12 3v18"></path>
                      <path d="M16.5 7.5c-.8-1.2-2.5-2-4.5-2-2.5 0-4 1.3-4 3s1.6 2.5 4 3 4 1.4 4 3.2-1.7 3.3-4.2 3.3c-2 0-3.8-.9-4.6-2.2"></path>
                    </svg>
                    <span>{"Verplaats deal naar fase Sales Pipeline > Call ingepland"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "338px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3 7l9 6 9-6"></path>
                    </svg>
                    <span>{"Een e-mail sturen ‘Ik kijk uit naar ons belletje!’ (Toon Rapporten)"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "430px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(134, 57, 250, 0.22)",
                      border: "1px solid rgba(180, 141, 255, 0.45)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9AEFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 7v5l3 2"></path>
                    </svg>
                    <span>{"Wacht tot Deal stadium is Leads in > Contact gehad"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "522px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(250, 232, 78, 0.14)",
                      border: "1px solid rgba(250, 232, 78, 0.4)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FAE84E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <path d="M12 3v18"></path>
                      <path d="M16.5 7.5c-.8-1.2-2.5-2-4.5-2-2.5 0-4 1.3-4 3s1.6 2.5 4 3 4 1.4 4 3.2-1.7 3.3-4.2 3.3c-2 0-3.8-.9-4.6-2.2"></path>
                    </svg>
                    <span>{"Voeg taak “Bellen” toe aan een deal"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "614px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(134, 57, 250, 0.22)",
                      border: "1px solid rgba(180, 141, 255, 0.45)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9AEFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 7v5l3 2"></path>
                    </svg>
                    <span>{"Wacht tot Deal stadium is Leads in > Contact gehad"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "15px",
                      top: "706px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"></path>
                      <path d="M20 4v4h-4"></path>
                      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"></path>
                      <path d="M4 20v-4h4"></path>
                    </svg>
                    <span>{"Eindig deze automatische serie"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "246px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                      <path d="M3 7l9 6 9-6"></path>
                    </svg>
                    <span>{"Een E-mail sturen ‘Ben je nog geïnteresseerd in een gesprek met ons?’ (Toon Rapporten)"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "338px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(134, 57, 250, 0.22)",
                      border: "1px solid rgba(180, 141, 255, 0.45)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C9AEFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="12" r="9"></circle>
                      <path d="M12 7v5l3 2"></path>
                    </svg>
                    <span>{"Wacht op 14 dag(en)"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "430px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(127, 190, 240, 0.16)",
                      border: "1px solid rgba(127, 190, 240, 0.42)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9FD0F7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="8" r="4"></circle>
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path>
                    </svg>
                    <span>{"Tag toevoegen: [STATUS] Lead website > koud geworden"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "522px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(127, 190, 240, 0.16)",
                      border: "1px solid rgba(127, 190, 240, 0.42)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9FD0F7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="8" r="4"></circle>
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path>
                    </svg>
                    <span>{"Tag verwijderen: [LEAD] website"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "614px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(250, 232, 78, 0.14)",
                      border: "1px solid rgba(250, 232, 78, 0.4)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FAE84E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <path d="M12 3v18"></path>
                      <path d="M16.5 7.5c-.8-1.2-2.5-2-4.5-2-2.5 0-4 1.3-4 3s1.6 2.5 4 3 4 1.4 4 3.2-1.7 3.3-4.2 3.3c-2 0-3.8-.9-4.6-2.2"></path>
                    </svg>
                    <span>{"Status van de transactie bijwerken naar “Verloren”"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "380px",
                      top: "706px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="6" cy="5" r="2.5"></circle>
                      <circle cx="18" cy="5" r="2.5"></circle>
                      <circle cx="6" cy="19" r="2.5"></circle>
                      <path d="M6 7.5v9"></path>
                      <path d="M18 7.5c0 5-6 4-11 9"></path>
                    </svg>
                    <span>{"Ga naar een andere actie"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "740px",
                      top: "246px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(127, 190, 240, 0.16)",
                      border: "1px solid rgba(127, 190, 240, 0.42)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9FD0F7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="12" cy="8" r="4"></circle>
                      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path>
                    </svg>
                    <span>{"Tag verwijderen: [LEAD] Website"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "740px",
                      top: "338px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(250, 232, 78, 0.14)",
                      border: "1px solid rgba(250, 232, 78, 0.4)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FAE84E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <path d="M12 3v18"></path>
                      <path d="M16.5 7.5c-.8-1.2-2.5-2-4.5-2-2.5 0-4 1.3-4 3s1.6 2.5 4 3 4 1.4 4 3.2-1.7 3.3-4.2 3.3c-2 0-3.8-.9-4.6-2.2"></path>
                    </svg>
                    <span>{"Status van de transactie bijwerken naar “Verloren”"}</span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      left: "740px",
                      top: "430px",
                      width: "330px",
                      height: "58px",
                      boxSizing: "border-box",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "0 14px",
                      borderRadius: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.28)",
                      color: "#FFFFFF",
                      fontSize: "13px",
                      fontWeight: "600",
                      lineHeight: "1.35",
                      boxShadow: "none",
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      style={{ flexShrink: "0" }}
                    >
                      <circle cx="6" cy="5" r="2.5"></circle>
                      <circle cx="18" cy="5" r="2.5"></circle>
                      <circle cx="6" cy="19" r="2.5"></circle>
                      <path d="M6 7.5v9"></path>
                      <path d="M18 7.5c0 5-6 4-11 9"></path>
                    </svg>
                    <span>{"Ga naar een andere actie"}</span>
                  </div>
                </div>
              </div>
            </div>
            <figcaption style={{ fontSize: "15px", lineHeight: "1.5", color: "#C9CFF0" }}>
              {t("Voorbeeld van een automatische opvolging: na een geplande intake gaat alles vanzelf.")}
            </figcaption>
          </figure>
        </div>
      </section>
      <section id="voordelen" className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px" }}>
        <div
          className="sv-why"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              {t("Je goedkoopste")}{" "}
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
                  {t("groeikanaal.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t("Veel meer leads dankzij automatische e-mails. Zo haal je meer uit de klanten die je al hebt.")}
            </p>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="glow d2"
              style={{
                alignSelf: "flex-start",
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "18px 30px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
            </a>
          </div>
          <div
            className="sv-why-card"
            style={{
              boxSizing: "border-box",
              borderRadius: "28px",
              background: "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
              {t("Wat het je oplevert")}
            </span>
            <ul
              className="sv-why-list"
              style={{
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "16px 28px",
              }}
            >
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Een zeer relevante doelgroep")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Resultaten die je goed kunt meten")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Persoonlijke berichten")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Inzicht in wie je wel en niet bereikt")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Relatief goedkoop")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Schaalbaar door automatisering")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "17px", lineHeight: "1.55", color: "#FFFFFF" }}>
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
                  style={{ flexShrink: "0", marginTop: "3px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Jij bepaalt wanneer een mail aankomt")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section id="cijfers" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "760px" }}>
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
              {t("E-mailmarketing in")}{" "}
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
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Recente cijfers uit onafhankelijk onderzoek.")}
            </p>
          </div>
          <div
            className="em-feat"
            style={{
              boxSizing: "border-box",
              borderRadius: "28px",
              background: "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)",
              padding: "48px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
              gap: "48px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(72px, 9vw, 120px)",
                  lineHeight: "0.9",
                  letterSpacing: "-0.03em",
                  color: "#FAE84E",
                }}
              >
                {t("3×")}
              </span>
              <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("zoveel kliks op automatische e-mails als op losse campagnes.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  <span>{t("Automatische e-mails")}</span>
                  <span>{t("7,39%")}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "999px",
                      background: "linear-gradient(90deg, #FAE84E 0%, #FDEF6A 100%)",
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  <span>{t("Losse campagnes")}</span>
                  <span>{t("2,27%")}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "30.7%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
              </div>
              <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#E6E9F8" }}>
                {t("Bron: Brevo Benchmark 2026, data uit 2025 van 175.000+ verzenders")}
              </span>
            </div>
          </div>
          <ul
            className="em-stats"
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
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  alignSelf: "flex-start",
                  fontSize: "52px",
                }}
              >
                {t("70%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("van de marketeers haalt minstens tien keer terug wat ze in e-mail steken.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Litmus, State of Email 2025")}
              </span>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  alignSelf: "flex-start",
                  fontSize: "52px",
                }}
              >
                {t("99%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("van de e-mails komt aan. Gemiddeld wordt 24,1% geopend.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Dotdigital Benchmark 2026; Inxmail Benchmark 2026 (4 miljard e-mails, 2025)")}
              </span>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  alignSelf: "flex-start",
                  fontSize: "52px",
                }}
              >
                {t("3 van de 4")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t(
                  "e-mails worden geopend in Apple Mail, vooral op de iPhone. Werkt je mail niet goed op mobiel, dan mis je de meeste lezers.",
                )}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Litmus, september 2026")}
              </span>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  alignSelf: "flex-start",
                  fontSize: "52px",
                }}
              >
                {t("85%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("van de B2B-bedrijven")}
                <Tip label={ta("Uitleg")} plain>
                  {t("B2B (business-to-business): je verkoopt aan bedrijven en organisaties.")}
                </Tip>{" "}
                {t("die personaliseren, doet dat met e-mail.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Content Marketing Institute, 2026")}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section id="waarom-wij" className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "760px" }}>
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
              {t("Wat maakt ons")}{" "}
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
                  {t("speciaal?")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t(
                "Anderen bieden aan waar ze goed in zijn. Wij adviseren wat het beste bij jou past. Staat je e-mailmarketing goed, dan kijken we samen naar de volgende stap, bijvoorbeeld",
              )}{" "}
              <a
                href={href("DienstSEA")}
                style={{ color: "#1F246C", fontWeight: "600", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                {t("online adverteren")}
              </a>
              {t(".")}
            </p>
          </div>
          <ul
            className="bb-diff"
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
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "1",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("01")}
              </span>
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Marketingdoelen scherp")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "We gaan verder dan de inbox. Je e-mails horen bij je hele marketingstrategie, zodat je boodschap de juiste mensen bereikt en iets oplevert.",
                )}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "1",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("02")}
              </span>
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Persoonlijk en uniek")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "We schrijven je mails zo persoonlijk mogelijk, zodat er vertrouwen ontstaat. Kortingen en acties maken we duidelijk zichtbaar.",
                )}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "1",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("03")}
              </span>
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Doelgroepen precies bepalen")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We verdelen je klanten in groepen en sturen elke groep een passende mail. Met A/B-testen,")}
                <Tip label={ta("Uitleg")} plain>
                  {t("A/B-test: je toont twee versies aan verschillende groepen en kijkt welke het beste werkt.")}
                </Tip>{" "}
                {t("twee versies tegen elkaar, ontdekken we wat het best werkt.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                className="grad-text"
                aria-hidden="true"
                style={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "40px",
                  lineHeight: "1",
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("04")}
              </span>
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>
                {t("Netjes volgens de wet")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "We werken volgens de AVG en checken als je wilt je privacybeleid. Zo ga je goed om met persoonsgegevens en voorkom je reputatieschade.",
                )}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section id="aanpak" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
            {t("Onze aanpak in vier")}{" "}
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
                {t("stappen.")}
              </span>
            </Accent>
          </h2>
          <p
            style={{
              position: "relative",
              margin: "-28px 0 44px",
              maxWidth: "720px",
              fontSize: "17px",
              lineHeight: "1.65",
              color: "#C9CFF0",
            }}
          >
            {t("Een bewezen aanpak in vier fasen. Elke stap brengt je dichter bij je doelen.")}
          </p>
          <div style={{ position: "relative" }}>
            <div
              className="vc-rt-line"
              aria-hidden="true"
              style={{ position: "absolute", left: "12px", right: "14%", top: "52px", borderTop: "2px dashed rgba(255, 255, 255, 0.35)" }}
            ></div>
            <ol
              className="vc-rt"
              style={{
                position: "relative",
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
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
                    padding: "5px 10px",
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
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("1. Intake en strategie")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "We praten over je merk, je doelgroep en je doelen. Samen bepalen we de aanpak, de tone of voice en hoe we je klanten in groepen verdelen.",
                  )}
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
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("2. Opzetten en automatiseren")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "We richten je e-mailplatform in, ontwerpen templates en schrijven teksten die converteren. Ook bouwen we slimme automatische e-mails.",
                  )}
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
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("3. Testen, testen, testen")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Voor we live gaan, testen we alles: onderwerpregels, verzendtijd en hoe de mail eruitziet op elk apparaat.")}
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
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("4. Meten en verbeteren")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "We volgen opens, kliks en verkopen. Op basis daarvan verbeteren we de inhoud en de strategie, voor steeds betere resultaten.",
                  )}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <Reviews />
      <section
        className="pj-wrap bb-quote"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(110deg, #8639FA 0%, #5B4BF0 55%, #0F8AE5 100%)",
          padding: "88px 40px",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "radial-gradient(40% 70% at 12% 20%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 70%), radial-gradient(35% 60% at 90% 90%, rgba(250, 232, 78, 0.16) 0%, rgba(250, 232, 78, 0) 70%)",
          }}
        ></div>
        <figure
          style={{
            position: "relative",
            margin: "0 auto",
            maxWidth: "1040px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "22px",
            textAlign: "center",
          }}
        >
          <blockquote
            translate="no"
            style={{
              margin: "0",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(30px, 3.6vw, 48px)",
              lineHeight: "1.12",
              letterSpacing: "-0.02em",
            }}
          >
            {"“Personalization is not about first/last name. It’s about"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"relevant content"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="emQuote" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#emQuote)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#emQuote)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.75"
                ></path>
              </svg>
            </span>
            {".”"}
          </blockquote>
          <figcaption translate="no" style={{ fontSize: "17px", fontWeight: "500", color: "#E6E9F8" }}>
            {"Dan Jak"}
          </figcaption>
        </figure>
      </section>
      <section id="pakketten" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center" }}>
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
              {t("Vergelijk de")}{" "}
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
                  {t("pakketten.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150" }}>
              {t(
                "Nieuwsbrieven en automatische e-mails, voor een vast bedrag, zodat je precies weet waar je aan toe bent.",
              )}
            </p>
          </div>
          <div className="tf-scroll" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", paddingTop: "14px" }}>
            <div
              className="tf-table tf-combo"
              data-sel={h.tfmPlan}
              style={{ background: "transparent", borderRadius: "24px", overflow: "visible" }}
            >
              <div
                className="tf-row tf-cardrow"
                style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))", alignItems: "stretch" }}
              >
                <div></div>
                <div className="tf-pcell" style={{ display: "flex" }}>
                  <div
                    style={{
                      position: "relative",
                      background: "#FFFFFF",
                      color: "#1F246C",
                      borderRadius: "24px 24px 0 0",
                      padding: "40px 22px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "6px",
                    }}
                  >
                    <h3
                      className="tf-pname"
                      translate="no"
                      style={{
                        margin: "0",
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "34px",
                        lineHeight: "1.05",
                        color: "inherit",
                      }}
                    >
                      {"Basic"}
                    </h3>
                    <span
                      className="tf-price"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "56px",
                        lineHeight: "1",
                        letterSpacing: "-0.02em",
                        marginTop: "14px",
                        color: "inherit",
                      }}
                    >
                      {t("€997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("eenmalig, ex. btw")}
                    </span>
                    <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="k3-out"
                        style={{
                          background: "transparent",
                          color: "#1F246C",
                          border: "1px solid #1F246C",
                          textDecoration: "none",
                          padding: "14px 18px",
                          borderRadius: "8px",
                          fontWeight: "700",
                          fontSize: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {t("Plan je groeigesprek")}
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
                    </div>
                  </div>
                </div>
                <div className="tf-pcell" style={{ display: "flex" }}>
                  <div
                    style={{
                      position: "relative",
                      background: "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)",
                      color: "#FFFFFF",
                      borderRadius: "24px 24px 0 0",
                      padding: "40px 22px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      className="tf-badge"
                      style={{
                        position: "absolute",
                        top: "-13px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#6B2BD9",
                        background: "#FFFFFF",
                        border: "1px solid #EFE8FD",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t("Meest gekozen")}
                    </span>
                    <h3
                      className="tf-pname"
                      translate="no"
                      style={{
                        margin: "0",
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "34px",
                        lineHeight: "1.05",
                        color: "inherit",
                      }}
                    >
                      {"Standard"}
                    </h3>
                    <span
                      className="tf-price"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "56px",
                        lineHeight: "1",
                        letterSpacing: "-0.02em",
                        marginTop: "14px",
                        color: "inherit",
                      }}
                    >
                      {t("€5.997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                      {t("per halfjaar, ex. btw")}
                    </span>
                    <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="tf-k4"
                        style={{
                          background: "#FFFFFF",
                          color: "#1F246C",
                          textDecoration: "none",
                          padding: "14px 18px",
                          borderRadius: "8px",
                          fontWeight: "700",
                          fontSize: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {t("Plan je groeigesprek")}
                        <svg
                          className="tf-k4a"
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
                    </div>
                  </div>
                </div>
                <div className="tf-pcell" style={{ display: "flex" }}>
                  <div
                    style={{
                      position: "relative",
                      background: "#FFFFFF",
                      color: "#1F246C",
                      borderRadius: "24px 24px 0 0",
                      padding: "40px 22px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "6px",
                    }}
                  >
                    <h3
                      className="tf-pname"
                      translate="no"
                      style={{
                        margin: "0",
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "34px",
                        lineHeight: "1.05",
                        color: "inherit",
                      }}
                    >
                      {"Premium"}
                    </h3>
                    <span
                      className="tf-price"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "56px",
                        lineHeight: "1",
                        letterSpacing: "-0.02em",
                        marginTop: "14px",
                        color: "inherit",
                      }}
                    >
                      {t("€11.997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("per jaar, ex. btw")}
                    </span>
                    <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                      <a
                        href="https://calendly.com/vrijblijvendgesprek/"
                        target="_blank"
                        rel="noopener"
                        className="k3-out"
                        style={{
                          background: "transparent",
                          color: "#1F246C",
                          border: "1px solid #1F246C",
                          textDecoration: "none",
                          padding: "14px 18px",
                          borderRadius: "8px",
                          fontWeight: "700",
                          fontSize: "16px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        {t("Plan je groeigesprek")}
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
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 1")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Fundament en koppelingen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Analyse huidige systemen en strategieën, systemen koppelen en correct inrichten | Opzet en onderhoud formulieren | Opzet en onderhoud welkomstautomation | Opzet en onderhoud opschoningsautomation",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 2")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Nieuwsbrief, dashboard en templates")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud nieuwsbriefautomation | Opzet van het datadashboard | Ontwikkeling e-mailtemplates | Maandelijkse call voor evaluatie en vervolgstappen",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 3")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verlaten winkelwagens")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud abandoned-cart-flow | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 4")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Herhaalaankopen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud herhaalaankoopautomation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 5")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Klanten terugwinnen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud winback-automation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 6")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verjaardagen en evaluatie")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud verjaardagsautomation | Evaluatie na 6 maanden | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 7")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Inrichten van gedragstracking en lead scoring")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Lead scoring: elke bezoeker krijgt punten voor wat hij doet, zoals pagina's bekijken of mails openen. Zo zie je wie klaar is voor contact.",
                        )}
                      </Tip>{" "}
                      {t("| Meten van websitebezoeken, bekeken producten en klikken in e-mails | Opbouwen van segmenten")}
                      <Tip label={ta("Uitleg")}>
                        {t("Segment: een groep contacten met iets gemeen, zoals dezelfde interesse of hoe vaak ze je mails openen.")}
                      </Tip>{" "}
                      {t("op basis van interesse en betrokkenheid")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 8")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring verder uitbouwen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzetten van automations")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Automation: een e-mail of reeks e-mails die vanzelf verstuurd wordt zodra iemand iets doet, zoals een product bekijken.",
                        )}
                      </Tip>{" "}
                      {t(
                        "per product- of dienstcategorie met de verzamelde data | Automatisch versturen van passende e-mails aan geïnteresseerde contacten | Testen en optimaliseren van de segmenten, verzendmomenten en lead scoring",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 9")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en break-even")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud break-evenautomation",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 10")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Reviews en feedback")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud review- en feedbackautomation",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 11")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen op gedrag")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 12")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen en vooruitkijken")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                    {t("–")}
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Niet inbegrepen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#EFE8FD",
                      color: "#8639FA",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                    </svg>
                  </span>
                  <span
                    className="sr-only"
                    style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                  >
                    {t("Inbegrepen")}
                  </span>
                </div>
              </div>
              <div
                className="tf-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Meerwerk wordt altijd vooraf besproken en alleen uitgevoerd na wederzijds akkoord.")}
                    </span>
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="0"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("€130 p/uur")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {t("€130 p/uur")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="2"
                  style={{
                    borderLeft: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "18px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("€130 p/uur")}
                </div>
              </div>
            </div>
          </div>
          <div className="tfm" style={{ display: "none", flexDirection: "column", gap: "20px", width: "100%" }}>
            <div
              ref={tfmTrackRef}
              className="tfm-track"
              dir="ltr"
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                overflowY: "hidden",
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                margin: "0 -20px",
                padding: "18px 7% 6px",
                alignItems: "flex-start",
              }}
            >
              <div
                className="tfm-slide"
                dir="auto"
                style={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    borderRadius: "24px 24px 0 0",
                    padding: "40px 22px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <h3
                    className="tf-pname"
                    translate="no"
                    style={{
                      margin: "0",
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "34px",
                      lineHeight: "1.05",
                      color: "inherit",
                    }}
                  >
                    {"Basic"}
                  </h3>
                  <span
                    className="tf-price"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "56px",
                      lineHeight: "1",
                      letterSpacing: "-0.02em",
                      marginTop: "14px",
                      color: "inherit",
                    }}
                  >
                    {t("€997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("eenmalig, ex. btw")}
                  </span>
                  <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                    <a
                      href="https://calendly.com/vrijblijvendgesprek/"
                      target="_blank"
                      rel="noopener"
                      className="k3-out"
                      style={{
                        background: "transparent",
                        color: "#1F246C",
                        border: "1px solid #1F246C",
                        textDecoration: "none",
                        padding: "14px 18px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      {t("Plan je groeigesprek")}
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
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 1")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Fundament en koppelingen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Analyse huidige systemen en strategieën, systemen koppelen en correct inrichten | Opzet en onderhoud formulieren | Opzet en onderhoud welkomstautomation | Opzet en onderhoud opschoningsautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 2")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Nieuwsbrief, dashboard en templates")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud nieuwsbriefautomation | Opzet van het datadashboard | Ontwikkeling e-mailtemplates | Maandelijkse call voor evaluatie en vervolgstappen",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 3")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verlaten winkelwagens")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud abandoned-cart-flow | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 4")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Herhaalaankopen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud herhaalaankoopautomation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 5")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Klanten terugwinnen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud winback-automation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 6")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verjaardagen en evaluatie")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud verjaardagsautomation | Evaluatie na 6 maanden | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 7")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Inrichten van gedragstracking en lead scoring")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Lead scoring: elke bezoeker krijgt punten voor wat hij doet, zoals pagina's bekijken of mails openen. Zo zie je wie klaar is voor contact.",
                        )}
                      </Tip>{" "}
                      {t("| Meten van websitebezoeken, bekeken producten en klikken in e-mails | Opbouwen van segmenten")}
                      <Tip label={ta("Uitleg")}>
                        {t("Segment: een groep contacten met iets gemeen, zoals dezelfde interesse of hoe vaak ze je mails openen.")}
                      </Tip>{" "}
                      {t("op basis van interesse en betrokkenheid")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 8")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring verder uitbouwen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzetten van automations")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Automation: een e-mail of reeks e-mails die vanzelf verstuurd wordt zodra iemand iets doet, zoals een product bekijken.",
                        )}
                      </Tip>{" "}
                      {t(
                        "per product- of dienstcategorie met de verzamelde data | Automatisch versturen van passende e-mails aan geïnteresseerde contacten | Testen en optimaliseren van de segmenten, verzendmomenten en lead scoring",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 9")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en break-even")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud break-evenautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 10")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Reviews en feedback")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud review- en feedbackautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 11")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen op gedrag")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 12")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen en vooruitkijken")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Meerwerk wordt altijd vooraf besproken en alleen uitgevoerd na wederzijds akkoord.")}
                    </span>
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                </div>
              </div>
              <div
                className="tfm-slide"
                dir="auto"
                style={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 0 0 2px #8639FA",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)",
                    color: "#FFFFFF",
                    borderRadius: "24px 24px 0 0",
                    padding: "40px 22px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <span
                    className="tf-badge"
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "11px",
                      fontWeight: "700",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#6B2BD9",
                      background: "#FFFFFF",
                      border: "1px solid #EFE8FD",
                      padding: "5px 12px",
                      borderRadius: "999px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("Meest gekozen")}
                  </span>
                  <h3
                    className="tf-pname"
                    translate="no"
                    style={{
                      margin: "0",
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "34px",
                      lineHeight: "1.05",
                      color: "inherit",
                    }}
                  >
                    {"Standard"}
                  </h3>
                  <span
                    className="tf-price"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "56px",
                      lineHeight: "1",
                      letterSpacing: "-0.02em",
                      marginTop: "14px",
                      color: "inherit",
                    }}
                  >
                    {t("€5.997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                    {t("per halfjaar, ex. btw")}
                  </span>
                  <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                    <a
                      href="https://calendly.com/vrijblijvendgesprek/"
                      target="_blank"
                      rel="noopener"
                      className="tf-k4"
                      style={{
                        background: "#FFFFFF",
                        color: "#1F246C",
                        textDecoration: "none",
                        padding: "14px 18px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      {t("Plan je groeigesprek")}
                      <svg
                        className="tf-k4a"
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
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 1")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Fundament en koppelingen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Analyse huidige systemen en strategieën, systemen koppelen en correct inrichten | Opzet en onderhoud formulieren | Opzet en onderhoud welkomstautomation | Opzet en onderhoud opschoningsautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 2")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Nieuwsbrief, dashboard en templates")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud nieuwsbriefautomation | Opzet van het datadashboard | Ontwikkeling e-mailtemplates | Maandelijkse call voor evaluatie en vervolgstappen",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 3")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verlaten winkelwagens")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud abandoned-cart-flow | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 4")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Herhaalaankopen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud herhaalaankoopautomation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 5")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Klanten terugwinnen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud winback-automation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 6")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verjaardagen en evaluatie")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud verjaardagsautomation | Evaluatie na 6 maanden | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 7")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Inrichten van gedragstracking en lead scoring")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Lead scoring: elke bezoeker krijgt punten voor wat hij doet, zoals pagina's bekijken of mails openen. Zo zie je wie klaar is voor contact.",
                        )}
                      </Tip>{" "}
                      {t("| Meten van websitebezoeken, bekeken producten en klikken in e-mails | Opbouwen van segmenten")}
                      <Tip label={ta("Uitleg")}>
                        {t("Segment: een groep contacten met iets gemeen, zoals dezelfde interesse of hoe vaak ze je mails openen.")}
                      </Tip>{" "}
                      {t("op basis van interesse en betrokkenheid")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 8")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring verder uitbouwen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzetten van automations")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Automation: een e-mail of reeks e-mails die vanzelf verstuurd wordt zodra iemand iets doet, zoals een product bekijken.",
                        )}
                      </Tip>{" "}
                      {t(
                        "per product- of dienstcategorie met de verzamelde data | Automatisch versturen van passende e-mails aan geïnteresseerde contacten | Testen en optimaliseren van de segmenten, verzendmomenten en lead scoring",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 9")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en break-even")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud break-evenautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 10")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Reviews en feedback")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud review- en feedbackautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 11")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen op gedrag")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 12")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen en vooruitkijken")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
                      {t("–")}
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Niet inbegrepen")}
                    </span>
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Meerwerk wordt altijd vooraf besproken en alleen uitgevoerd na wederzijds akkoord.")}
                    </span>
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                </div>
              </div>
              <div
                className="tfm-slide"
                dir="auto"
                style={{
                  flex: "0 0 86%",
                  scrollSnapAlign: "center",
                  boxSizing: "border-box",
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    borderRadius: "24px 24px 0 0",
                    padding: "40px 22px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "6px",
                  }}
                >
                  <h3
                    className="tf-pname"
                    translate="no"
                    style={{
                      margin: "0",
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "34px",
                      lineHeight: "1.05",
                      color: "inherit",
                    }}
                  >
                    {"Premium"}
                  </h3>
                  <span
                    className="tf-price"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "700",
                      fontSize: "56px",
                      lineHeight: "1",
                      letterSpacing: "-0.02em",
                      marginTop: "14px",
                      color: "inherit",
                    }}
                  >
                    {t("€11.997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("per jaar, ex. btw")}
                  </span>
                  <div style={{ marginTop: "auto", paddingTop: "24px", width: "100%" }}>
                    <a
                      href="https://calendly.com/vrijblijvendgesprek/"
                      target="_blank"
                      rel="noopener"
                      className="k3-out"
                      style={{
                        background: "transparent",
                        color: "#1F246C",
                        border: "1px solid #1F246C",
                        textDecoration: "none",
                        padding: "14px 18px",
                        borderRadius: "8px",
                        fontWeight: "700",
                        fontSize: "16px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      {t("Plan je groeigesprek")}
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
                  </div>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 1")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Fundament en koppelingen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Analyse huidige systemen en strategieën, systemen koppelen en correct inrichten | Opzet en onderhoud formulieren | Opzet en onderhoud welkomstautomation | Opzet en onderhoud opschoningsautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 2")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Nieuwsbrief, dashboard en templates")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud nieuwsbriefautomation | Opzet van het datadashboard | Ontwikkeling e-mailtemplates | Maandelijkse call voor evaluatie en vervolgstappen",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 3")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verlaten winkelwagens")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud abandoned-cart-flow | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 4")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Herhaalaankopen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud herhaalaankoopautomation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 5")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Klanten terugwinnen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud winback-automation | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 6")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verjaardagen en evaluatie")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzet en onderhoud verjaardagsautomation | Evaluatie na 6 maanden | Opzet en onderhoud nieuwsbriefautomation")}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 7")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Inrichten van gedragstracking en lead scoring")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Lead scoring: elke bezoeker krijgt punten voor wat hij doet, zoals pagina's bekijken of mails openen. Zo zie je wie klaar is voor contact.",
                        )}
                      </Tip>{" "}
                      {t("| Meten van websitebezoeken, bekeken producten en klikken in e-mails | Opbouwen van segmenten")}
                      <Tip label={ta("Uitleg")}>
                        {t("Segment: een groep contacten met iets gemeen, zoals dezelfde interesse of hoe vaak ze je mails openen.")}
                      </Tip>{" "}
                      {t("op basis van interesse en betrokkenheid")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 8")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en lead scoring verder uitbouwen")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Opzetten van automations")}
                      <Tip label={ta("Uitleg")}>
                        {t(
                          "Automation: een e-mail of reeks e-mails die vanzelf verstuurd wordt zodra iemand iets doet, zoals een product bekijken.",
                        )}
                      </Tip>{" "}
                      {t(
                        "per product- of dienstcategorie met de verzamelde data | Automatisch versturen van passende e-mails aan geïnteresseerde contacten | Testen en optimaliseren van de segmenten, verzendmomenten en lead scoring",
                      )}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 9")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Gedrag en break-even")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud break-evenautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 10")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Reviews en feedback")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation | Opzet en onderhoud review- en feedbackautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 11")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen op gedrag")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    padding: "14px 22px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                      {t("Maand 12")}
                      <span aria-hidden="true"> {t("–")} </span>
                      <span>{t("Verfijnen en vooruitkijken")}</span>
                    </strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t(
                        "Opzet en onderhoud automations per product- of dienstcategorie op basis van gedragstracking | Opzet en onderhoud nieuwsbriefautomation",
                      )}
                    </span>
                  </span>
                  <span style={{ flexShrink: "0", display: "inline-flex" }}>
                    <span
                      aria-hidden="true"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#EFE8FD",
                        color: "#8639FA",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                      </svg>
                    </span>
                    <span
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}
                    >
                      {t("Inbegrepen")}
                    </span>
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0", textAlign: "left" }}>
                    <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
                    <span style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.6", color: "#3A4150" }}>
                      {t("Meerwerk wordt altijd vooraf besproken en alleen uitgevoerd na wederzijds akkoord.")}
                    </span>
                  </span>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <button
                type="button"
                className="gal-btn"
                aria-label={ta("Vorig pakket")}
                onClick={h.tfmPrev}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
                  border: "1px solid #1F246C",
                  background: "transparent",
                  color: "#1F246C",
                  opacity: h.tfmPrevOp,
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
              <span
                translate="no"
                aria-live="polite"
                style={{ minWidth: "48px", textAlign: "center", fontSize: "15px", fontWeight: "600", color: "#1F246C" }}
              >
                {h.tfmCounter}
              </span>
              <button
                type="button"
                className="gal-btn"
                aria-label={ta("Volgend pakket")}
                onClick={h.tfmNext}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
                  border: "1px solid #1F246C",
                  background: "transparent",
                  color: "#1F246C",
                  opacity: h.tfmNextOp,
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
        </div>
      </section>
      <section
        id="start"
        className="pj-wrap cta-arrows"
        style={{ background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)", color: "#FFFFFF", padding: "96px 40px" }}
      >
        <div
          className="pj-cta"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "22px",
          }}
        >
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
            {t("Klaar om te")}{" "}
            <Accent from="#FFFFFF" to="#FFFFFF">
              <span style={{ color: "#FFFFFF" }}>{t("groeien?")}</span>
            </Accent>
          </h2>
          <p style={{ margin: "0", maxWidth: "560px", fontSize: "18px", lineHeight: "1.6", color: "#FFFFFF" }}>
            {t("Vertel ons waar je naartoe wilt. Wij laten zien hoe je er komt.")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "14px", paddingTop: "8px" }}>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="btn-white"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "56px",
                padding: "0 30px",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#1F246C",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
              <svg
                className="slide-arrow"
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
              href="tel:+31854016590"
              className="btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "56px",
                padding: "0 26px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.7)",
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "17px",
              }}
            >
              {t("Bel 085 401 6590")}
              <svg
                className="slide-arrow"
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
          </div>
          <div className="cta-team" style={{ display: "flex", alignItems: "center", gap: "14px", paddingTop: "6px" }}>
            <span style={{ display: "flex" }}>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#EFE8FD",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "0px",
                  zIndex: "10",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/karim.svg"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FFF6C7",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-14px",
                  zIndex: "9",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/denise.svg"
                  alt=""
                  style={{ position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#E3F1FD",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-14px",
                  zIndex: "8",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/abdelmonim.svg"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FFF6C7",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-14px",
                  zIndex: "7",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/niek.svg"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
            </span>
            <span style={{ textAlign: "left", fontSize: "15px", lineHeight: "1.45", color: "#FFFFFF" }}>
              <b>{t("We kijken uit naar je verhaal.")}</b>
              <br />
              {t("Reactie binnen 4 uur op werkdagen.")}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
