"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstHostingContent() {
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
            <path
              d="M120 196a52 52 0 0 1 64-60 70 70 0 0 1 130 26 44 44 0 0 1-4 88H134a46 46 0 0 1-14-54z"
              stroke="url(#abL)"
              strokeWidth="2.5"
            ></path>
            <rect x="130" y="170" width="180" height="44" rx="12" fill="#FFFFFF"></rect>
            <rect x="148" y="186" width="70" height="12" rx="6" fill="#D5DAE3"></rect>
            <circle className="ia-blink" style={{ "--d": "0.0s" }} cx="270" cy="192" r="6" fill="#5EC0FA"></circle>
            <circle className="ia-blink" style={{ "--d": "1.3s" }} cx="290" cy="192" r="6" fill="#FAE84E"></circle>
            <rect x="130" y="226" width="180" height="44" rx="12" fill="#FFFFFF"></rect>
            <rect x="148" y="242" width="70" height="12" rx="6" fill="#D5DAE3"></rect>
            <circle cx="270" cy="248" r="6" fill="#5EC0FA"></circle>
            <circle className="ia-blink" style={{ "--d": "0.5s" }} cx="290" cy="248" r="6" fill="#FAE84E"></circle>
            <rect x="130" y="282" width="180" height="44" rx="12" fill="#FFFFFF"></rect>
            <rect x="148" y="298" width="70" height="12" rx="6" fill="#D5DAE3"></rect>
            <circle className="ia-blink" style={{ "--d": "1.0s" }} cx="270" cy="304" r="6" fill="#5EC0FA"></circle>
            <circle cx="290" cy="304" r="6" fill="#FAE84E"></circle>
            <circle
              className="ia-pop"
              style={{ "--d": "1.0s" }}
              cx="316"
              cy="300"
              r="40"
              fill="url(#abF)"
              stroke="#FFFFFF"
              strokeWidth="3"
            ></circle>
            <path
              className="ia-draw"
              style={{ "--d": "1.3s" }}
              pathLength="1"
              d="M298 300l13 13 24-26"
              stroke="#FAE84E"
              strokeWidth="9"
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
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {"Hosting"}
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
              color: "#0B6DB8",
              background: "#E3F1FD",
              padding: "8px 16px",
              borderRadius: "999px",
            }}
          >
            {"Hosting"}
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
            {t("Altijd online.")}
            <br />
            {t("Zonder")}{" "}
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
                {t("zorgen.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("De server waarop je website draait, zodat hij altijd online is. Wij regelen de techniek, jij richt je op je bedrijf.")}
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
                padding: "20px 32px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
            </a>
            <span style={{ fontSize: "15px", color: "#D5DAE3" }}>
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €10,99")}</strong> {t("per maand, ex. btw")}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
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
              {t("Je website hoort gewoon te")}{" "}
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
                  {t("werken.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Herken je dit? Dan is het tijd voor hosting waar je niet meer aan hoeft te denken.")}
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
                {t("Je website is traag.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Bezoekers haken af voordat je pagina geladen is, en dat merk je in je aanvragen.")}
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
                {t("Offline op het verkeerde moment.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Net als je campagne loopt, is je website onbereikbaar.")}
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
                {t("Niemand voelt zich verantwoordelijk.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Updates, back-ups en beveiliging blijven liggen, tot het misgaat.")}
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
        <div
          className="sv-grip"
          style={{
            position: "relative",
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "56px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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
              {t("Hosting waar je niet meer aan hoeft te")}{" "}
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
                  {t("denken.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
              {t("Van kopzorg naar vanzelfsprekend.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
              {t(
                "Veel ondernemers merken pas dat hun hosting tekortschiet als hun website plat ligt. Stel je voor dat je er gewoon niet meer aan hoeft te denken.",
              )}
            </p>
          </div>
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je website laadt snel, ook als het druk is.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Gaat er iets mis? Wij zien het eerder dan jij.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je hebt één aanspreekpunt dat je website kent.")}
            </li>
          </ul>
        </div>
      </section>
      <section id="voordelen" className="pj-wrap pj-sec" style={{ position: "relative", background: "#FFFFFF", padding: "112px 40px" }}>
        <div style={{ position: "relative", maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
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
              {t("Alles geregeld op één")}{" "}
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
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Alles wat je website nodig heeft om veilig en snel online te blijven, op één plek geregeld.")}
            </p>
          </div>
          <ol
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
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("99,9% uptime")}
                <Tip label={ta("Uitleg")}>{t("Uptime: de tijd dat je website online en bereikbaar is.")}</Tip> {t("garantie")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je website is bereikbaar, dag en nacht.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Servers in Amsterdam")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Snelle SSD-opslag")}
                <Tip label={ta("Uitleg")}>{t("SSD: snelle opslag zonder bewegende onderdelen, waardoor je website vlot laadt.")}</Tip>
                {t(", dicht bij je bezoekers.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("SSL-certificaat inbegrepen")}
                <Tip label={ta("Uitleg")}>
                  {t("SSL-certificaat: zorgt voor het slotje in de browser en een beveiligde verbinding (https).")}
                </Tip>
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Een beveiligde verbinding, zodat bezoekers en Google je vertrouwen.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Website migratie inbegrepen")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Wij verhuizen je website naar onze server. Jij hoeft niets te doen.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Eenvoudig cPanel")}
                <Tip label={ta("Uitleg")}>{t("cPanel: het beheerscherm van je hosting, voor je e-mail, domein en bestanden.")}</Tip>
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Beheer je e-mail, domein en bestanden in één overzichtelijk scherm.")}
              </p>
            </li>
            <li
              style={{
                background: "#F2F8FE",
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
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
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
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "24px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                }}
              >
                {t("Support op werkdagen")}
              </h3>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Bel of mail ons tussen 9 en 5. Je spreekt iemand die je website kent.")}
              </p>
            </li>
          </ol>
        </div>
      </section>
      <section id="cijfers" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
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
              {t("Hosting in")}{" "}
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
              {t("Een snelle, stabiele website levert direct meer aanvragen en omzet op.")}
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
                {t("3x")}
              </span>
              <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("meer conversies bij een website die in 1 seconde laadt, vergeleken met 5 seconden.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Conversieratio")}
                <Tip label={ta("Uitleg")} plain>
                  {t("Conversieratio: het percentage bezoekers dat iets doet wat je wilt, zoals een aankoop of een aanvraag.")}
                </Tip>{" "}
                {t("B2B-websites per laadtijd")}
                <Tip label={ta("Uitleg")} plain>
                  {t("B2B (business-to-business): je verkoopt aan bedrijven en organisaties.")}
                </Tip>
              </span>
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
                  <span>{t("1 seconde")}</span>
                  <span translate="no">{"40%"}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: "40%",
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
                  <span>{t("2 seconden")}</span>
                  <span translate="no">{"34%"}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "34%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
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
                  <span>{t("3 seconden")}</span>
                  <span translate="no">{"29%"}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "29%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
              </div>
              <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#E6E9F8" }}>
                {t("Bron: Portent, 2022 (100 miljoen paginaweergaven).")}
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
                {t("8,4%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("meer conversies in retail als een mobiele website 0,1 seconde sneller laadt.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Deloitte en Google, Milliseconds Make Millions, 2020.")}
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
                {t("9,2%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("meer besteed per bestelling door retailklanten bij die snellere website.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Deloitte en Google, Milliseconds Make Millions, 2020.")}
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
                {t("53%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("van de mobiele bezoekers haakt af als een pagina langer dan 3 seconden laadt.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: Google, Think with Google.")}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section id="waarom-wij" className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
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
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
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
                {t("Je spreekt iemand die je website kent.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Geen ticketnummer of callcenter. Je belt of mailt met het team dat je website kent.")}
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
                {t("Wij zien het, jij merkt niks.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We houden je website en server in de gaten. Problemen lossen we op voordat je bezoekers ze zien.")}
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
                {t("Hosting en website onder één dak.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Moet er iets aan je website gebeuren? Dat regelen we direct, zonder dat je tussen partijen hoeft te schakelen.")}
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
            {t("Overstappen zonder")}{" "}
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
                {t("gedoe.")}
              </span>
            </Accent>
          </h2>
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
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {t("1. Kennismaken")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We bekijken je huidige website en hosting, en wat je nodig hebt.")}
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
                  {t("2. Overzetten")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We verhuizen je website naar onze server. Jij hoeft niets te doen.")}
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
                  {t("3. Live")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We zetten je domein om. Je bezoekers merken er niets van.")}
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
                  {t("4. Wij staan klaar")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Vragen? Bel of mail ons op werkdagen tussen 9 en 5.")}
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
            gap: "24px",
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
            {"“Speed is more than a feature. Speed is the"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"number one"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="qHostingBrush" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#qHostingBrush)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#qHostingBrush)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.75"
                ></path>
              </svg>
            </span>{" "}
            {"feature.”"}
          </blockquote>
          <figcaption translate="no" style={{ fontSize: "17px", fontWeight: "500", color: "#E6E9F8" }}>
            {"Fred Wilson"}
          </figcaption>
        </figure>
      </section>
      <section id="pakketten" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "760px" }}>
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
              {t("Kies je")}{" "}
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
                  {t("hostingpakket.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t(
                "Een vast bedrag per maand, zodat je precies weet waar je aan toe bent. Alle pakketten draaien op dezelfde snelle servers; het verschil zit in opslag en dataverkeer.",
              )}
            </p>
          </div>
          <ul
            className="sv-plans"
            style={{
              margin: "0",
              padding: "16px 0 0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "20px",
              alignItems: "stretch",
            }}
          >
            <li
              style={{
                position: "relative",
                background: "#FFFFFF",
                color: "#1F246C",
                borderRadius: "24px",
                padding: "36px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3
                translate="no"
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "1",
                  color: "inherit",
                }}
              >
                {"Basic"}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "48px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  marginTop: "16px",
                  color: "inherit",
                }}
              >
                {t("€10,99")}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>{t("per maand, ex. btw")}</span>
              <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "20px 0 16px" }}></span>
              <ul style={{ margin: "0 0 24px", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("99,9% uptime garantie")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Eenvoudig cPanel")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Telefoon- en e-mailsupport (9 – 5)")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 domeinnaam")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("10 GB SSD-opslag")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("100 GB dataverkeer")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 mailbox, onbeperkt e-mailadressen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("SSL-certificaat (https) inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Website migratie inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Dagelijkse back-ups")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Serverlocatie: Amsterdam")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto" }}>
                <a
                  href={href("Contact")}
                  className="k3-out"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: "50px",
                    padding: "0 20px",
                    borderRadius: "8px",
                    border: "1px solid #1F246C",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  {t("Start met")} <span translate="no">{"Basic"}</span>
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
            </li>
            <li
              style={{
                position: "relative",
                background: "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                borderRadius: "24px",
                padding: "36px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 16px 40px rgba(134, 57, 250, 0.30)",
              }}
            >
              <span
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
                  padding: "4px 12px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                }}
              >
                {t("Meest gekozen")}
              </span>
              <h3
                translate="no"
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "1",
                  color: "inherit",
                }}
              >
                {"Standard"}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "48px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  marginTop: "16px",
                  color: "inherit",
                }}
              >
                {t("€12,99")}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>{t("per maand, ex. btw")}</span>
              <span style={{ width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.25)", margin: "20px 0 16px" }}></span>
              <ul style={{ margin: "0 0 24px", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("99,9% uptime garantie")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Eenvoudig cPanel")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Telefoon- en e-mailsupport (9 – 5)")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 domeinnaam")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("20 GB SSD-opslag")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("200 GB dataverkeer")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 mailbox, onbeperkt e-mailadressen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("SSL-certificaat (https) inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Website migratie inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Dagelijkse back-ups")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FFD43B"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Serverlocatie: Amsterdam")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto" }}>
                <a
                  href={href("Contact")}
                  className="tf-k4"
                  style={{
                    background: "#FFFFFF",
                    color: "#1F246C",
                    textDecoration: "none",
                    padding: "16px 20px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  {t("Start met")} <span translate="no">{"Standard"}</span>
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
            </li>
            <li
              style={{
                position: "relative",
                background: "#FFFFFF",
                color: "#1F246C",
                borderRadius: "24px",
                padding: "36px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3
                translate="no"
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "1",
                  color: "inherit",
                }}
              >
                {"Premium"}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "48px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  marginTop: "16px",
                  color: "inherit",
                }}
              >
                {t("€15,99")}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>{t("per maand, ex. btw")}</span>
              <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "20px 0 16px" }}></span>
              <ul style={{ margin: "0 0 24px", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("99,9% uptime garantie")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Eenvoudig cPanel")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Telefoon- en e-mailsupport (9 – 5)")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 domeinnaam")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("50 GB SSD-opslag")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("600 GB dataverkeer")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 mailbox, onbeperkt e-mailadressen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("SSL-certificaat (https) inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Website migratie inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Dagelijkse back-ups")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Serverlocatie: Amsterdam")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto" }}>
                <a
                  href={href("Contact")}
                  className="k3-out"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: "50px",
                    padding: "0 20px",
                    borderRadius: "8px",
                    border: "1px solid #1F246C",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  {t("Start met")} <span translate="no">{"Premium"}</span>
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
            </li>
            <li
              style={{
                position: "relative",
                background: "#FFFFFF",
                color: "#1F246C",
                borderRadius: "24px",
                padding: "36px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h3
                translate="no"
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "1",
                  color: "inherit",
                }}
              >
                {"Enterprise"}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "48px",
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  marginTop: "16px",
                  color: "inherit",
                }}
              >
                {t("€22,09")}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>{t("per maand, ex. btw")}</span>
              <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "20px 0 16px" }}></span>
              <ul style={{ margin: "0 0 24px", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("99,9% uptime garantie")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Eenvoudig cPanel")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Telefoon- en e-mailsupport (9 – 5)")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 domeinnaam")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("100 GB SSD-opslag")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    <strong>{t("Ongelimiteerd dataverkeer")}</strong>
                  </span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 mailbox, onbeperkt e-mailadressen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("SSL-certificaat (https) inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Website migratie inbegrepen")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Dagelijkse back-ups")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#8639FA"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Serverlocatie: Amsterdam")}</span>
                </li>
              </ul>
              <div style={{ marginTop: "auto" }}>
                <a
                  href={href("Contact")}
                  className="k3-out"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    boxSizing: "border-box",
                    minHeight: "50px",
                    padding: "0 20px",
                    borderRadius: "8px",
                    border: "1px solid #1F246C",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  {t("Start met")} <span translate="no">{"Enterprise"}</span>
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
            </li>
          </ul>
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
            gap: "24px",
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", paddingTop: "8px" }}>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="btn-white"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "56px",
                padding: "0 32px",
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
                padding: "0 28px",
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
          <div className="cta-team" style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "8px" }}>
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
                  marginLeft: "-16px",
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
                  marginLeft: "-16px",
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
                  marginLeft: "-16px",
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
