"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstSMALooptijdContent() {
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
              x="86"
              y="140"
              width="250"
              height="190"
              rx="20"
              stroke="url(#abL)"
              strokeWidth="2.5"
              transform="rotate(-6 211 235)"
            ></rect>
            <rect x="96" y="84" width="236" height="52" rx="26" fill="#FFFFFF"></rect>
            <circle cx="128" cy="110" r="11" stroke="#8639FA" strokeWidth="5"></circle>
            <path d="M136 118l9 9" stroke="#8639FA" strokeWidth="5" strokeLinecap="round"></path>
            <rect x="156" y="105" width="120" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="110" y="152" width="236" height="174" rx="20" fill="#FFFFFF"></rect>
            <rect className="ia-pop" style={{ "--d": "0.7s" }} x="126" y="168" width="204" height="58" rx="12" fill="url(#abF)"></rect>
            <rect className="ia-pop" style={{ "--d": "0.95s" }} x="140" y="182" width="30" height="14" rx="7" fill="#FAE84E"></rect>
            <rect x="178" y="183" width="96" height="12" rx="6" fill="#FFFFFF"></rect>
            <rect x="140" y="204" width="140" height="8" rx="4" fill="#FFFFFF" fillOpacity=".6"></rect>
            <rect x="126" y="244" width="170" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="126" y="262" width="130" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="126" y="286" width="160" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="126" y="304" width="110" height="10" rx="5" fill="#D5DAE3"></rect>
            <path
              className="ia-click"
              style={{ "--d": "1.1s" }}
              d="M292 200l0 72 18-16 14 30 14-6-14-30 24-2z"
              fill="#FAE84E"
              stroke="#1F246C"
              strokeWidth="3"
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
              {"Search Engine Advertising"}
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
            {"SEA"}
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
            {t("Klanten zoeken.")}
            <br />
            {t("Jij wordt")}{" "}
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
                {t("gevonden.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Met Search Engine Advertising adverteer je in Google. Je verschijnt op het moment dat iemand zoekt naar wat jij aanbiedt.")}
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
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €1.197")}</strong> {t("per maand, ex. btw")}
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
              {t("Veel klikken, weinig")}{" "}
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
                  {t("klanten.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Je weet dat je klanten in Google zoeken, maar je advertenties leveren niet op wat ze kosten. Herken je dit?")}
            </p>
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
                {t("Je budget verdwijnt.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je betaalt elke maand voor klikken. Maar je ziet niet wat het je oplevert.")}
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
                {t("Je concurrent staat boven je.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je zoekt op je eigen vak in Google. En je ziet steeds dezelfde concurrent als eerste.")}
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
                {t("Je weet niet wat er gebeurt.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t(
                  "Je campagnes lopen, maar niemand vertelt je eerlijk wat werkt en wat niet. Je wilt het niet zelf uitzoeken, je wilt resultaat.",
                )}
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
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto" }}>
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
                {t("Geen loze beloftes.")}{" "}
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
                    {t("Wel eerlijke resultaten.")}
                  </span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
                {t("We zijn eigenlijk heel normaal, en dat maakt ons anders.")}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t("Geen verhalen over geheime trucs of gegarandeerde leads. Veel factoren hebben invloed op je campagne, zoals:")}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "Daarom werken we transparant en laten we ons leiden door data. Na de eerste maand weet je eerlijk wat realistische resultaten zijn bij welk budget.",
                )}
              </p>
            </div>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "22px" }}>
              <li
                style={{
                  paddingLeft: "20px",
                  borderLeft: "3px solid #FAE84E",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {t("De concurrentie")}
              </li>
              <li
                style={{
                  paddingLeft: "20px",
                  borderLeft: "3px solid #FAE84E",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {t("Jouw budget")}
              </li>
              <li
                style={{
                  paddingLeft: "20px",
                  borderLeft: "3px solid #FAE84E",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {t("Jouw product of dienst")}
              </li>
              <li
                style={{
                  paddingLeft: "20px",
                  borderLeft: "3px solid #FAE84E",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {t("Jouw landingspagina's")}
              </li>
              <li
                style={{
                  paddingLeft: "20px",
                  borderLeft: "3px solid #FAE84E",
                  fontSize: "18px",
                  lineHeight: "1.6",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                {t("Nieuwe updates van Google")}
              </li>
            </ul>
          </div>
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
              {t("Wat betekent online adverteren voor")}{" "}
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
                  {t("jouw bedrijf?")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t("Het is veel meer dan een advertentie: laat het werken als een marketingmachine die klanten oplevert.")}
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
              style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "16px" }}
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
                <span>{t("Gerichte targeting op demografie, interesses, gedrag en meer")}</span>
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
                <span>{t("Geïnteresseerde bezoekers")}</span>
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
                <span>{t("Directe zichtbaarheid")}</span>
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
                <span>{t("Concurrentievoordeel")}</span>
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
              {t("Search engine advertising in")}{" "}
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
              {t("Wie zoekt, wil iets. Dit zeggen de nieuwste cijfers over zoeken en adverteren.")}
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
                {t("89,9%")}
              </span>
              <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("van alle zoekopdrachten wereldwijd gaat via Google. In Nederland is dat 89,1%.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Marktaandeel zoekmachines wereldwijd")}
              </span>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span translate="no">{"Google"}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: "89.94%",
                      height: "100%",
                      borderRadius: "999px",
                      background: "linear-gradient(90deg, #FAE84E 0%, #FDEF6A 100%)",
                    }}
                  ></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("89,9%")}</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span translate="no">{"Bing"}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "5.29%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("5,3%")}</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span translate="no">{"Yahoo!"}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "1.36%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("1,4%")}</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span translate="no">{"Yandex"}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "1.3%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("1,3%")}</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span translate="no">{"DuckDuckGo"}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "0.74%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("0,7%")}</span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "96px minmax(0, 1fr) 56px",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                <span>{t("Overige")}</span>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "1.37%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
                <span style={{ textAlign: "right" }}>{t("1,4%")}</span>
              </div>
              <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#E6E9F8" }}>{t("Bron: StatCounter, september 2026")}</span>
            </div>
          </div>
          <div
            className="se-ai"
            style={{
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
              borderRadius: "28px",
              background: "#1F246C",
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "0",
                pointerEvents: "none",
                background:
                  "radial-gradient(45% 70% at 0% 0%, rgba(134, 57, 250, 0.35) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(40% 60% at 100% 100%, rgba(15, 138, 229, 0.3) 0%, rgba(15, 138, 229, 0) 70%)",
              }}
            ></div>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "10px", maxWidth: "760px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Zoeken met AI")}
              </span>
              <h3
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: "1.15",
                  color: "#FFFFFF",
                }}
              >
                {t("Steeds meer mensen zoeken via ChatGPT en andere AI-assistenten.")}
              </h3>
            </div>
            <ul
              className="em-stats"
              style={{
                position: "relative",
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "20px",
              }}
            >
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "24px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "48px",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    color: "#FAE84E",
                  }}
                >
                  {t("900 miljoen")}
                </span>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#FFFFFF" }}>
                  {t("mensen gebruiken ChatGPT elke week.")}
                </p>
                <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#C9CFF0" }}>
                  {t("Bron: TechCrunch, februari 2026")}
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "24px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "48px",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    color: "#FAE84E",
                  }}
                >
                  {t("28%")}
                </span>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#FFFFFF" }}>
                  {t("van alle zoekacties wereldwijd loopt al via AI-assistenten.")}
                </p>
                <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#C9CFF0" }}>
                  {t("Bron: Graphite.io, maart 2026")}
                </span>
              </li>
              <li
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "24px",
                  borderRadius: "18px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "48px",
                    lineHeight: "1",
                    letterSpacing: "-0.02em",
                    color: "#FAE84E",
                  }}
                >
                  {t("57,6%")}
                </span>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#FFFFFF" }}>
                  {t("is het aandeel van Google in zoeken en AI samen. In 2022 was dat nog 89,3%.")}
                </p>
                <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#C9CFF0" }}>
                  {t("Bron: Graphite.io, maart 2026")}
                </span>
              </li>
            </ul>
            <p
              style={{
                position: "relative",
                margin: "0",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "1.6",
                color: "#FFFFFF",
                maxWidth: "860px",
              }}
            >
              {t(
                "Adverteren in AI-antwoorden komt eraan: ChatGPT en Google testen nu advertenties in hun AI-zoekresultaten. Wij houden dat voor je in de gaten.",
              )}
            </p>
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
                {t("5 biljoen")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("zoekopdrachten verwerkt Google per jaar. Dat zijn er zo'n 9,5 miljoen per minuut.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>{t("Bron: Google, 2025")}</span>
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
                {t("3,4")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("woorden telt een gemiddelde zoekopdracht. Mensen zoeken steeds specifieker.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Growth Memo, 2025")}
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
                {t("7,52%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("is de gemiddelde conversieratio van Google Ads-campagnes, 6,8% hoger dan het jaar ervoor.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: WordStream, 2025")}
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
                {t("6,66%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("is de gemiddelde doorklikratio (CTR) van zoekadvertenties in Google Ads.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: WordStream, 2025")}
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
                {t("Persoonlijke aandacht")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We luisteren naar jouw doelen en maken een strategie die specifiek bij jouw bedrijf past.")}
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
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>{t("Kostenbewust")}</h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Maximaal resultaat binnen jouw budget, zonder onnodige uitgaven. Er is altijd een pakket dat bij je past.")}
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
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>{t("Flexibel")}</h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Alle experts in huis, dus we spelen snel in op trends en blijven je concurrentie een stap voor.")}
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
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>{t("Transparant")}</h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Heldere rapportages, zodat je precies weet wat je campagnes doen. Ook als live dashboard.")}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section id="aanpak" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px" }}>
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
            {t(
              "Onze aanpak is een bewezen proces. Elke stap brengt je dichter bij je doelen, en bij elke fase is duidelijk of we je verwachtingen waarmaken.",
            )}
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
                  {t("1. Intakegesprek")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We bespreken je merk, doelgroep en doelen, en bepalen welke zoekwoorden, platforms en advertentievormen passen.")}
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
                  {t("2. Strategie")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We bepalen de structuur van je campagnes, de doelgroepen en de boodschap die het meeste oplevert.")}
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
                  {t("3. Campagne opzetten")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We schrijven sterke advertenties en zorgen voor de juiste targeting en tracking, zodat je vanaf dag één presteert.")}
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
                  {t("4. Analyse en optimalisatie")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We volgen klikgedrag, conversies en kosten, en verbeteren je campagnes doorlopend voor een steeds beter rendement.")}
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
            {"“93% of online experiences begin with a"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"search engine"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="seQuote" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#seQuote)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#seQuote)"
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
            {"Kim Garst"}
          </figcaption>
        </figure>
      </section>
      <section id="pakketten" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
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
              {t("Kies jouw")}{" "}
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
                  {t("groeiplan.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150", fontWeight: "600" }}>
              {t("Social Media Advertising: adverteren op social media, zodat je de mensen bereikt die echt bij jouw bedrijf passen.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Zonder vaste looptijd betaal je")} <strong style={{ color: "#1F246C" }}>{t("€997 per maand")}</strong>
              {t(". Leg je je langer vast, dan zakt dat tarief.")}
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
                        lineHeight: "1",
                        color: "inherit",
                      }}
                    >
                      {"Basic"}
                    </h3>
                    <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("3 maanden")}</span>
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
                      {t("€897")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("per maand, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€2.691 in totaal")}</span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        background: "#EFE8FD",
                        color: "#6B2BD9",
                      }}
                    >
                      {t("€300 voordeel")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                      {t("Voor wie eerst wil ervaren wat het kanaal oplevert.")}
                    </p>
                    <div style={{ marginTop: "auto", width: "100%" }}>
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
                        lineHeight: "1",
                        color: "inherit",
                      }}
                    >
                      {"Standard"}
                    </h3>
                    <span style={{ fontSize: "14px", color: "#E6E9F8" }}>{t("6 maanden")}</span>
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
                      {t("€697")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                      {t("per maand, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.25)", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€4.182 in totaal")}</span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        background: "rgba(255, 255, 255, 0.2)",
                        color: "#FFFFFF",
                      }}
                    >
                      {t("€1.800 voordeel")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#E6E9F8" }}>
                      {t("Voor wie wil groeien met een duidelijk plan en vaste basis.")}
                    </p>
                    <div style={{ marginTop: "auto", width: "100%" }}>
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
                        lineHeight: "1",
                        color: "inherit",
                      }}
                    >
                      {"Premium"}
                    </h3>
                    <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("12 maanden")}</span>
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
                      {t("€597")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("per maand, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€7.164 in totaal")}</span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        background: "#EFE8FD",
                        color: "#6B2BD9",
                      }}
                    >
                      {t("€4.800 voordeel")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                      {t("Voor wie structureel op marge en groei wil sturen.")}
                    </p>
                    <div style={{ marginTop: "auto", width: "100%" }}>
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Advertentiebudget")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t(
                      "Je advertentiebudget betaal je rechtstreeks aan het platform, zoals Meta of TikTok, en staat los van onze tarieven. Minimaal €20 per dag (ongeveer €600 per maand) is nodig om de roadmap effectief uit te voeren.",
                    )}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  {t("Minimaal €20 per dag")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Standard"
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
                  {t("Minimaal €20 per dag")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Premium"
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
                  {t("Minimaal €20 per dag")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Opstartkosten")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Geen opstartkosten. Deze zijn volledig inbegrepen in het maandtarief.")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  {t("Inbegrepen")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Standard"
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
                  {t("Inbegrepen")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Premium"
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
                  {t("Inbegrepen")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Tussentijds stoppen")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t(
                      "De samenwerking loopt voor de gekozen looptijd. Eerder stoppen kan, maar de betalingsverplichting voor de resterende maanden blijft gelden.",
                    )}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  {t("Looptijd 3 maanden")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Standard"
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
                  {t("Looptijd 6 maanden")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="Premium"
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
                  {t("Looptijd 12 maanden")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elke maand")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Nieuwe advertenties & creatives")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Creatives: de beelden, video's en teksten in je advertenties. We vernieuwen ze elke maand, zodat je doelgroep niet op ze uitgekeken raakt.",
                      )}
                    </Tip>{" "}
                    {t("| Bijsturen doelgroepen & budgetverdeling | Maandelijkse rapportage | Evaluatiecall")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 1")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Fundament en tracking")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Intakegesprek en strategie | Pixel, tracking en conversies instellen | Doelgroepen opbouwen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 2")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Eerste campagnes live")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Concept en creatives maken | Campagnes opzetten en live zetten | Eerste resultaten meten")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 3")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Testen en bijsturen")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("A/B-testen op advertenties en doelgroepen | Budget naar wat werkt | Evaluatie na 3 maanden")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 4")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Remarketing")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Remarketing voor websitebezoekers en volgers | Nieuwe creatives")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 5")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Nieuwe doelgroepen")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Lookalike-doelgroepen testen | Nieuwe creatives | Budget bijsturen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 6")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Opschalen en evaluatie")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Winnende campagnes opschalen | Evaluatie na 6 maanden | Plan voor het volgende halfjaar")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 7")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Tweede platform")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Uitbreiden naar een tweede platform, zoals TikTok of LinkedIn | Nieuwe creatives")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 8")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Video en UGC")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Video- en UGC-advertenties testen | Doelgroepen verfijnen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 9")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Seizoenen en acties")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Campagnes rond seizoenen en acties | Budget opschalen op pieken")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 10")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Funnel verdiepen")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Campagnes per fase: bekendheid, overweging en conversie | Nieuwe creatives")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 11")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Verfijnen op data")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Doelgroepen en budget verfijnen op basis van data | Nieuwe A/B-testen")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Maand 12")}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t("Jaarevaluatie")}</span>
                  </strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Evaluatie van het hele jaar | Plan en doelen voor het volgende jaar")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord.")}
                  </span>
                </div>
                <div
                  className="tf-cell"
                  data-plan="Basic"
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
                  data-plan="Standard"
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
                  data-plan="Premium"
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
                      lineHeight: "1",
                      color: "inherit",
                    }}
                  >
                    {"Basic"}
                  </h3>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("3 maanden")}</span>
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
                    {t("€897")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("per maand, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€2.691 in totaal")}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "#EFE8FD",
                      color: "#6B2BD9",
                    }}
                  >
                    {t("€300 voordeel")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Voor wie eerst wil ervaren wat het kanaal oplevert.")}
                  </p>
                  <div style={{ marginTop: "auto", width: "100%" }}>
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
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Advertentiebudget")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Minimaal €20 per dag")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Je advertentiebudget betaal je rechtstreeks aan het platform, zoals Meta of TikTok, en staat los van onze tarieven. Minimaal €20 per dag (ongeveer €600 per maand) is nodig om de roadmap effectief uit te voeren.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Opstartkosten")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Inbegrepen")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Geen opstartkosten. Deze zijn volledig inbegrepen in het maandtarief.")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Tussentijds stoppen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Looptijd 3 maanden")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "De samenwerking loopt voor de gekozen looptijd. Eerder stoppen kan, maar de betalingsverplichting voor de resterende maanden blijft gelden.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elke maand")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Nieuwe advertenties & creatives")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Creatives: de beelden, video's en teksten in je advertenties. We vernieuwen ze elke maand, zodat je doelgroep niet op ze uitgekeken raakt.",
                      )}
                    </Tip>{" "}
                    {t("| Bijsturen doelgroepen & budgetverdeling | Maandelijkse rapportage | Evaluatiecall")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elk kwartaal")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Volledige accountanalyse | Herverdeling budget over platforms | Doelen herijken op basis van de cijfers | A/B-testen op nieuwe doelgroepen",
                    )}
                    <Tip label={ta("Uitleg")}>
                      {t("A/B-testen: twee versies van een advertentie tegen elkaar testen en doorgaan met de beste.")}
                    </Tip>
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord.")}
                  </span>
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
                      lineHeight: "1",
                      color: "inherit",
                    }}
                  >
                    {"Standard"}
                  </h3>
                  <span style={{ fontSize: "14px", color: "#E6E9F8" }}>{t("6 maanden")}</span>
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
                    {t("€697")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                    {t("per maand, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.25)", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€4.182 in totaal")}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "#FFFFFF",
                    }}
                  >
                    {t("€1.800 voordeel")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#E6E9F8" }}>
                    {t("Voor wie wil groeien met een duidelijk plan en vaste basis.")}
                  </p>
                  <div style={{ marginTop: "auto", width: "100%" }}>
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
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Advertentiebudget")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Minimaal €20 per dag")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Je advertentiebudget betaal je rechtstreeks aan het platform, zoals Meta of TikTok, en staat los van onze tarieven. Minimaal €20 per dag (ongeveer €600 per maand) is nodig om de roadmap effectief uit te voeren.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Opstartkosten")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Inbegrepen")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Geen opstartkosten. Deze zijn volledig inbegrepen in het maandtarief.")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Tussentijds stoppen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Looptijd 6 maanden")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "De samenwerking loopt voor de gekozen looptijd. Eerder stoppen kan, maar de betalingsverplichting voor de resterende maanden blijft gelden.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elke maand")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Nieuwe advertenties & creatives")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Creatives: de beelden, video's en teksten in je advertenties. We vernieuwen ze elke maand, zodat je doelgroep niet op ze uitgekeken raakt.",
                      )}
                    </Tip>{" "}
                    {t("| Bijsturen doelgroepen & budgetverdeling | Maandelijkse rapportage | Evaluatiecall")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elk kwartaal")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Volledige accountanalyse | Herverdeling budget over platforms | Doelen herijken op basis van de cijfers | A/B-testen op nieuwe doelgroepen",
                    )}
                    <Tip label={ta("Uitleg")}>
                      {t("A/B-testen: twee versies van een advertentie tegen elkaar testen en doorgaan met de beste.")}
                    </Tip>
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord.")}
                  </span>
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
                      lineHeight: "1",
                      color: "inherit",
                    }}
                  >
                    {"Premium"}
                  </h3>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("12 maanden")}</span>
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
                    {t("€597")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("per maand, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("€7.164 in totaal")}</span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      background: "#EFE8FD",
                      color: "#6B2BD9",
                    }}
                  >
                    {t("€4.800 voordeel")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Voor wie structureel op marge en groei wil sturen.")}
                  </p>
                  <div style={{ marginTop: "auto", width: "100%" }}>
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
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Advertentiebudget")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Minimaal €20 per dag")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Je advertentiebudget betaal je rechtstreeks aan het platform, zoals Meta of TikTok, en staat los van onze tarieven. Minimaal €20 per dag (ongeveer €600 per maand) is nodig om de roadmap effectief uit te voeren.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Opstartkosten")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Inbegrepen")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Geen opstartkosten. Deze zijn volledig inbegrepen in het maandtarief.")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Tussentijds stoppen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Looptijd 12 maanden")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "De samenwerking loopt voor de gekozen looptijd. Eerder stoppen kan, maar de betalingsverplichting voor de resterende maanden blijft gelden.",
                    )}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elke maand")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Nieuwe advertenties & creatives")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Creatives: de beelden, video's en teksten in je advertenties. We vernieuwen ze elke maand, zodat je doelgroep niet op ze uitgekeken raakt.",
                      )}
                    </Tip>{" "}
                    {t("| Bijsturen doelgroepen & budgetverdeling | Maandelijkse rapportage | Evaluatiecall")}
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#8639FA" }}>{t("Elk kwartaal")}</strong>
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
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t(
                      "Volledige accountanalyse | Herverdeling budget over platforms | Doelen herijken op basis van de cijfers | A/B-testen op nieuwe doelgroepen",
                    )}
                    <Tip label={ta("Uitleg")}>
                      {t("A/B-testen: twee versies van een advertentie tegen elkaar testen en doorgaan met de beste.")}
                    </Tip>
                  </span>
                </div>
                <div style={{ padding: "16px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("€130 p/uur")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord.")}
                  </span>
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
                  background: "#FFF6CC",
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
                  background: "#FFF6CC",
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
