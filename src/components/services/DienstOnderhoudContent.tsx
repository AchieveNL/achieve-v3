"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstOnderhoudContent() {
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
              x="82"
              y="104"
              width="250"
              height="196"
              rx="20"
              stroke="url(#abL)"
              strokeWidth="2.5"
              transform="rotate(-6 207 202)"
            ></rect>
            <rect x="106" y="96" width="250" height="210" rx="20" fill="#FFFFFF"></rect>
            <path d="M106 116a20 20 0 0 1 20-20h210a20 20 0 0 1 20 20v18H106z" fill="#E3E7F5"></path>
            <circle cx="128" cy="115" r="5" fill="#8639FA"></circle>
            <circle cx="144" cy="115" r="5" fill="#0F8AE5"></circle>
            <circle cx="160" cy="115" r="5" fill="#FAE84E"></circle>
            <rect className="ia-pop" style={{ "--d": "0.6s" }} x="126" y="152" width="210" height="72" rx="12" fill="url(#abF)"></rect>
            <rect x="140" y="170" width="96" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="140" y="188" width="70" height="8" rx="4" fill="#FFFFFF" fillOpacity=".6"></rect>
            <rect x="126" y="242" width="150" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="126" y="262" width="110" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect className="ia-pop" style={{ "--d": "0.9s" }} x="126" y="280" width="84" height="12" rx="6" fill="#8639FA"></rect>
            <path
              className="ia-click"
              style={{ "--d": "1.0s" }}
              d="M268 250l0 72 18-16 14 30 14-6-14-30 24-2z"
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
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <a href={href("Main")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Diensten")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {t("Onderhoud")}
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
            {t("Onderhoud")}
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
            {t("Altijd up-to-date.")}
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
                {t("omkijken.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Wij houden je website veilig, snel en up-to-date. Ook als hij niet door ons is gebouwd. Jij richt je op je bedrijf.")}
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
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €100")}</strong> {t("per maand, ex. btw")}
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
              {t("Een verouderde website kost je")}{" "}
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
              {t("Een website heeft na de livegang aandacht nodig. Herken je dit?")}
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
                {t("Updates blijven liggen.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Plugins en software lopen achter. Dat maakt je site traag en kwetsbaar voor hackers.")}
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
                {t("Elke aanpassing is gedoe.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Een tekst of foto wijzigen? Je moet steeds iemand zoeken, en dat kost tijd en geld.")}
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
                {t("Er is geen back-up.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Gaat er iets mis, dan ben je alles kwijt. Niemand houdt het in de gaten tot het te laat is.")}
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
              {t("Je site blijft snel, veilig en")}{" "}
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
                  {t("online.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
              {t("Van zorgenkind naar vaste waarde.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
              {t(
                "Veel ondernemers laten hun website na de livegang links liggen. Tot er iets misgaat. Stel je voor dat iemand er elke maand naar omkijkt.",
              )}
            </p>
          </div>
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je site is altijd veilig en up-to-date. Je hoeft er niet meer aan te denken.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Een aanpassing nodig? Je stuurt een berichtje en het is geregeld.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je weet vooraf wat het kost. Geen losse facturen meer voor elk klusje.")}
            </li>
          </ul>
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
              {t("Nooit meer omkijken naar je")}{" "}
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
                  {t("website.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t("Een website is nooit af. Met vast onderhoud blijft hij net zo goed als op de dag van livegang.")}
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
                padding: "20px 32px",
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
              gap: "24px",
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
                <span>{t("Een veilige website")}</span>
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
                <span>{t("Een snelle website")}</span>
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
                <span>{t("Altijd een recente back-up")}</span>
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
                <span>{t("Aanpassingen zonder gedoe")}</span>
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
                <span>{t("Vaste kosten per maand")}</span>
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
                <span>{t("Eén vast aanspreekpunt")}</span>
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
                <span>{t("Meer tijd voor je bedrijf")}</span>
              </li>
            </ul>
          </div>
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
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Onderhoud is meer dan op een knop drukken.")}
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
                {t("Ook voor bestaande sites")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Is je website door een ander gebouwd? Geen probleem. We bekijken hem eerst en nemen het onderhoud daarna over.")}
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
                {t("We denken mee")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We doen niet alleen updates. We zien ook wat beter kan en komen zelf met ideeën.")}
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
                {t("Snel geregeld")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je mailt of belt ons. Op werkdagen krijg je binnen 4 uur reactie.")}
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
                {t("Transparante tarieven")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Een vast bedrag per maand, zodat je vooraf precies weet waar je aan toe bent.")}
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
            {t("Zo nemen we het onderhoud van je website over.")}
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
                  {t("We bespreken je website, je wensen en hoe vaak je aanpassingen nodig hebt.")}
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
                  {t("2. Website-check")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We controleren je site op snelheid, veiligheid en updates. Zo weten we waar we beginnen.")}
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
                  {t("3. Alles op orde")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We voeren achterstallige updates uit en zetten automatische back-ups aan.")}
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
                  {t("4. Vast onderhoud")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Elke maand houden we je site bij. Jij stuurt je aanpassingen, wij regelen het.")}
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
            {"“An ounce of prevention is worth a pound of"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"cure"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="ondQuote" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#ondQuote)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#ondQuote)"
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
            {"Benjamin Franklin"}
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
                  {t("onderhoudspakket.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t(
                "Een vast bedrag per maand, zodat je precies weet waar je aan toe bent. Het verschil zit in hoeveel tijd we elke maand voor je klaarzetten.",
              )}
            </p>
          </div>
          <ul
            className="sv-plans sv-plans3"
            style={{
              margin: "0",
              padding: "16px 0 0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "20px",
              alignItems: "stretch",
              maxWidth: "1040px",
              width: "100%",
              alignSelf: "center",
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
                {t("€100")}
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
                  <span>{t("Updates van software en plugins")}</span>
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
                  <span>{t("Beveiligingscontrole")}</span>
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
                  <span>{t("Dagelijkse back-up")}</span>
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
                  <span>{t("Support per e-mail")}</span>
                </li>
              </ul>
              <a
                href={href("Contact")}
                className="k3-out"
                style={{
                  marginTop: "auto",
                  background: "transparent",
                  color: "#1F246C",
                  border: "1px solid #1F246C",
                  textDecoration: "none",
                  padding: "16px 20px",
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
                {t("€199")}
              </span>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>{t("per maand, ex. btw")}</span>
              <span style={{ width: "100%", height: "1px", background: "rgba(255, 255, 255, 0.3)", margin: "20px 0 16px" }}></span>
              <ul style={{ margin: "0 0 24px", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Alles uit Basic")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>
                    {t("Uptime-monitoring en geteste updates")}
                    <Tip label={ta("Uitleg")} plain>
                      {t("Uptime: de tijd dat je website online en bereikbaar is.")}
                    </Tip>
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
                    stroke="#FAE84E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("1 uur aanpassingen per maand")}</span>
                </li>
                <li
                  style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontSize: "15px", lineHeight: "1.5", color: "#FFFFFF" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FAE84E"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: "0", marginTop: "3px" }}
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5"></path>
                  </svg>
                  <span>{t("Telefoon- en e-mailsupport")}</span>
                </li>
              </ul>
              <a
                href={href("Contact")}
                className="tf-k4"
                style={{
                  marginTop: "auto",
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
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                {t("Start met")} <span translate="no">{"Standard"}</span>
              </a>
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
                {t("€399")}
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
                  <span>{t("Alles uit Standard")}</span>
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
                  <span>{t("Reactie binnen 4 uur")}</span>
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
                  <span>{t("3 uur aanpassingen per maand")}</span>
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
                  <span>{t("Maandelijkse snelheids- en beveiligingscheck")}</span>
                </li>
              </ul>
              <a
                href={href("Contact")}
                className="k3-out"
                style={{
                  marginTop: "auto",
                  background: "transparent",
                  color: "#1F246C",
                  border: "1px solid #1F246C",
                  textDecoration: "none",
                  padding: "16px 20px",
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
            </li>
          </ul>
          <p style={{ margin: "0", textAlign: "center", fontSize: "15px", color: "#5A6273" }}>
            {t("Meerwerk buiten je pakket: €130 p/uur, ex. btw.")}
          </p>
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
                  src="/media/team/small/karim.webp"
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
                  src="/media/team/small/denise.webp"
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
                  src="/media/team/small/abdelmonim.webp"
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
                  src="/media/team/small/niek.webp"
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
