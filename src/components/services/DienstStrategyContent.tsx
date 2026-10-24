"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstStrategyContent() {
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
            <circle cx="236" cy="196" r="108" stroke="url(#abL)" strokeWidth="2.5"></circle>
            <circle cx="200" cy="220" r="108" fill="#FFFFFF"></circle>
            <circle cx="200" cy="220" r="76" fill="url(#abF)"></circle>
            <circle cx="200" cy="220" r="48" fill="#FFFFFF"></circle>
            <circle className="ia-pulse" style={{ "--d": "1.6s" }} cx="200" cy="220" r="22" fill="url(#abF)"></circle>
            <path
              className="ia-draw"
              style={{ "--d": "0.7s" }}
              pathLength="1"
              d="M204 216L318 102"
              stroke="#FAE84E"
              strokeWidth="7"
              strokeLinecap="round"
            ></path>
            <path
              className="ia-pop"
              style={{ "--d": "1.25s" }}
              d="M318 102l-2-26M318 102l26 2M304 116l-2-26M304 116l26 2"
              stroke="#FAE84E"
              strokeWidth="5"
              strokeLinecap="round"
            ></path>
            <circle className="ia-pop" style={{ "--d": "1.15s" }} cx="204" cy="216" r="6" fill="#FAE84E"></circle>
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
              {"Brand Strategy"}
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
              color: "#6B2BD9",
              background: "#EFE8FD",
              padding: "7px 14px",
              borderRadius: "999px",
            }}
          >
            {"Brand Strategy"}
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
            {t("Scherp gepositioneerd.")}
            <br />
            {t("Direct")}{" "}
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
                {t("herkend.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t(
              "Een scherpe positionering die je merk onderscheidt en je doelgroep direct aanspreekt. De basis onder je merk, je website en je marketing.",
            )}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 28px" }}>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="glow d2 m-hero-k1"
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
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €1.747")}</strong> {t("ex. btw")}
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
          <a href="#pakketten" className={`em-jl ${h.jcPakketten}`} aria-current={h.jaPakketten}>
            {t("Pakketten")}
          </a>
          <a href="#reviews" className={`em-jl ${h.jcReviews}`} aria-current={h.jaReviews}>
            {t("Reviews")}
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
              {t("Snappen klanten je niet, dan kiezen ze een")}{" "}
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
                  {t("ander.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Herken je dit? Dan is het tijd om scherp te krijgen waar je voor staat.")}
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
                {t("Je bedrijf is beter dan het eruitziet.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Klanten zien het verschil met je concurrent niet, dus kiezen ze op prijs.")}
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
                {t("Marketing zonder richting.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je probeert van alles, maar zonder heldere boodschap levert het weinig op.")}
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
                {t("Iedereen is je doelgroep.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Wie iedereen probeert aan te spreken, raakt uiteindelijk niemand.")}
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
              {t("Een merk waar klanten direct voor")}{" "}
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
                  {t("kiezen.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
              {t("Van twijfel naar een duidelijke koers.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
              {t(
                "Veel ondernemers weten goed wat ze doen, maar niet hoe ze het moeten vertellen. Elke uiting voelt anders en keuzes kosten veel tijd. Maar stel je voor dat je precies weet waar je merk voor staat.",
              )}
            </p>
          </div>
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je weet precies wie je klant is en wat hem beweegt. Elke keuze maak je met die klant voor ogen.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je hele team vertelt hetzelfde verhaal, op je website, in offertes en op social media.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je onderneemt met focus. Nieuwe kansen toets je snel aan je strategie, zodat je weet wat wel en niet bij je past.")}
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
              {t("Een heldere koers naar")}{" "}
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
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t(
                "Een merkstrategie is de basis voor herkenning, vertrouwen en samenhang. We brengen je missie, visie, merkpersoonlijkheid en doelgroep samen, zodat elk contactmoment consistent en krachtig is.",
              )}
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
                <span>{t("Een professionele eerste indruk")}</span>
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
                <span>{t("Vertrouwen en geloofwaardigheid")}</span>
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
                <span>{t("Klanten kiezen sneller voor jouw dienst, product of bedrijf")}</span>
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
                <span>{t("Je merk roept de juiste associaties op")}</span>
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
                <span>{t("Eenheid en herkenning")}</span>
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
                <span>{t("Klanten onthouden je beter")}</span>
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
                <span>{t("Bespaart tijd en kosten, en zorgt voor meer omzet")}</span>
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
                <span>{t("Alle richtlijnen in één overzicht")}</span>
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
              {t("Merk in")}{" "}
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
              {t("Klanten kiezen voor merken die ze snappen en vertrouwen. Dit zeggen de nieuwste cijfers.")}
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
                {t("71%")}
              </span>
              <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("van de consumenten zegt dat vertrouwen bepaalt of ze een merk kopen of juist links laten liggen.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Wat consumenten van merken verwachten")}
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
                  <span>{t("Een consistente ervaring op elk kanaal")}</span>
                  <span translate="no">{"80%"}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: "80%",
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
                  <span>{t("Vertrouwen bepaalt de aankoop")}</span>
                  <span translate="no">{"71%"}</span>
                </div>
                <div style={{ height: "14px", borderRadius: "999px", background: "rgba(255, 255, 255, 0.15)", overflow: "hidden" }}>
                  <div style={{ width: "71%", height: "100%", borderRadius: "999px", background: "rgba(255, 255, 255, 0.45)" }}></div>
                </div>
              </div>
              <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#E6E9F8" }}>
                {t("Bron: Salesforce (2024) en Edelman Trust Barometer (2024)")}
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
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
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
                {t("80%")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("van de mensen vertrouwt de merken die ze gebruiken meer dan overheid en media.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>{t("Bron: Edelman, 2025")}</span>
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
                {t("Strategie die je gebruikt")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Geen dik rapport in een la, maar een heldere koers die je team direct toepast.")}
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
                {t("Van strategie tot uitvoering")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We vertalen je positionering door naar je website, campagnes en content.")}
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
                {t("Gericht op groei")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Elke keuze toetsen we aan één vraag: levert het je meer klanten op?")}
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section id="aanpak" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
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
              "Een bewezen proces. Elke stap brengt je dichter bij je doelen en je visie, en bij elke fase weet je precies waar je staat.",
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
                  {t("1. Visie en positionering")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "We starten met een uitgebreide intake en 1-op-1-consults. Samen brengen we je merk, doelgroep en ambities in kaart: wie je bent, wat je wilt uitstralen en hoe je je onderscheidt.",
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
                  {t("2. Concept")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "Op basis van onderzoek bouwen we het fundament van je merk: missie, visie, merkpersoonlijkheid, hoe je klinkt en je doelgroepen. In de grotere pakketten komen daar markt- en concurrentieanalyse, positionering, je merkverhaal en een social media-actieplan bij.",
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
                  {t("3. Feedback en fine-tuning")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "Je krijgt de eerste voorstellen te zien. We verwerken je feedback tot alles past bij je visie, waarden en doelen. Afhankelijk van je pakket zijn er meer correctierondes.",
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
                  {t("4. Oplevering")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t(
                    "Je krijgt een compleet en praktisch strategiedocument met je merkessentie en kernboodschap, en waar dat past een social media plan of onboarding deck voor je team. Zo heb je een duidelijke koers én concrete handvatten.",
                  )}
                </p>
              </li>
            </ol>
          </div>
        </div>
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
              {t("Je merkstrategie en positionering, voor een vast bedrag, zodat je precies weet waar je aan toe bent.")}
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
                    <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Levertijd ± 3 weken")}</span>
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
                      {t("€1.747")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("eenmalig, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("2 persoonlijke consults")}</span>
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
                      {t("Max. 1 correctieronde")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                      {t("Voor wie zijn merk scherp wil neerzetten en de basis wil vastleggen.")}
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
                    <span style={{ fontSize: "14px", color: "#E6E9F8" }}>{t("Levertijd ± 4 weken")}</span>
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
                      {t("€3.997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                      {t("eenmalig, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.25)", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("3 persoonlijke consults")}</span>
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
                      {t("Max. 2 correctierondes")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#E6E9F8" }}>
                      {t("Voor wie zijn positie in de markt wil onderbouwen met onderzoek.")}
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
                    <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Levertijd vanaf 5 weken")}</span>
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
                      {t("€4.997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                      {t("eenmalig, ex. btw")}
                    </span>
                    <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                    <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("4 persoonlijke consults")}</span>
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
                      {t("Max. 3 correctierondes")}
                    </span>
                    <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                      {t("Voor wie van strategie meteen door wil naar uitvoering.")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Persoonlijke begeleiding")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("1-op-1-consults met je strateeg, online of op locatie.")}
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
                  {t("2 consults")}
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
                  {t("3 consults")}
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
                  {t("4 consults")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Feedbackrondes op de opgeleverde strategie, tot jij er helemaal achter staat.")}
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
                  {t("Max. 1")}
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
                  {t("Max. 2")}
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
                  {t("Max. 3")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Vanaf de intake tot de oplevering van je strategie.")}
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
                  {t("± 3 weken")}
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
                  {t("± 4 weken")}
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
                  {t("Vanaf 5 weken")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Eenmalig bedrag")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Je betaalt één keer. Geen abonnement, geen doorlopende kosten.")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord.")}
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
                      lineHeight: "1",
                      color: "inherit",
                    }}
                  >
                    {"Basic"}
                  </h3>
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Levertijd ± 3 weken")}</span>
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
                    {t("€1.747")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("eenmalig, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("2 persoonlijke consults")}</span>
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
                    {t("Max. 1 correctieronde")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Voor wie zijn merk scherp wil neerzetten en de basis wil vastleggen.")}
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
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Persoonlijke begeleiding")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("2 consults")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("1-op-1-consults met je strateeg, online of op locatie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 1")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Feedbackrondes op de opgeleverde strategie, tot jij er helemaal achter staat.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("± 3 weken")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Vanaf de intake tot de oplevering van je strategie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Eenmalig bedrag")}</strong>
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
                    {t("Je betaalt één keer. Geen abonnement, geen doorlopende kosten.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
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
                  <span style={{ fontSize: "14px", color: "#E6E9F8" }}>{t("Levertijd ± 4 weken")}</span>
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
                    {t("€3.997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                    {t("eenmalig, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "rgba(255,255,255,.25)", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("3 persoonlijke consults")}</span>
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
                    {t("Max. 2 correctierondes")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#E6E9F8" }}>
                    {t("Voor wie zijn positie in de markt wil onderbouwen met onderzoek.")}
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
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Persoonlijke begeleiding")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("3 consults")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("1-op-1-consults met je strateeg, online of op locatie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 2")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Feedbackrondes op de opgeleverde strategie, tot jij er helemaal achter staat.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("± 4 weken")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Vanaf de intake tot de oplevering van je strategie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Eenmalig bedrag")}</strong>
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
                    {t("Je betaalt één keer. Geen abonnement, geen doorlopende kosten.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
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
                  <span style={{ fontSize: "14px", color: "#5A6273" }}>{t("Levertijd vanaf 5 weken")}</span>
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
                    {t("€4.997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#5A6273" }}>
                    {t("eenmalig, ex. btw")}
                  </span>
                  <span style={{ width: "100%", height: "1px", background: "#E4E6EA", margin: "16px 0 10px" }}></span>
                  <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t("4 persoonlijke consults")}</span>
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
                    {t("Max. 3 correctierondes")}
                  </span>
                  <p className="tf-who" style={{ margin: "14px 0 18px", fontSize: "15px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Voor wie van strategie meteen door wil naar uitvoering.")}
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
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Persoonlijke begeleiding")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("4 consults")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("1-op-1-consults met je strateeg, online of op locatie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 3")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Feedbackrondes op de opgeleverde strategie, tot jij er helemaal achter staat.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Vanaf 5 weken")}</span>
                  <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>
                    {t("Vanaf de intake tot de oplevering van je strategie.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Eenmalig bedrag")}</strong>
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
                    {t("Je betaalt één keer. Geen abonnement, geen doorlopende kosten.")}
                  </span>
                </div>
                <div style={{ padding: "14px 22px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "32px", margin: "24px auto 0", width: "100%", maxWidth: "1200px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center" }}>
              <h3
                style={{
                  margin: "0",
                  color: "#1F246C",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "clamp(26px, 2.6vw, 34px)",
                  lineHeight: "1",
                  letterSpacing: "-0.025em",
                }}
              >
                {t("Wat zit er in elk")}{" "}
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
                    {t("pakket.")}
                  </span>
                </Accent>
              </h3>
              <p style={{ margin: "0", fontSize: "17px", color: "#3A4150" }}>
                {t("Per fase zie je welke onderdelen in je pakket zitten.")}
              </p>
            </div>
            <div className="tf-table" data-sel={h.tfmPlan} style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "visible" }}>
              <div
                className="tf-row tf-head"
                style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))" }}
              >
                <div></div>
                <div
                  translate="no"
                  style={{
                    padding: "18px 12px",
                    textAlign: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "#1F246C",
                  }}
                >
                  {"Basic"}
                </div>
                <div
                  translate="no"
                  style={{
                    padding: "18px 12px",
                    textAlign: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {"Standard"}
                </div>
                <div
                  translate="no"
                  style={{
                    padding: "18px 12px",
                    textAlign: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "18px",
                    color: "#1F246C",
                  }}
                >
                  {"Premium"}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 1 - Kennismaken")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Intake en vragenlijst | Eerste consult")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 2 - Onderzoek")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("SWOT-analyse")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "SWOT-analyse: je sterktes, zwaktes, kansen en bedreigingen op een rij. Tone of voice: de toon waarop je merk praat.",
                      )}
                    </Tip>{" "}
                    {t("| Concurrentieanalyse | Klantdefinitie | Trends | Tone of voice, aanbod en uitstraling")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 3 - Merkfundament")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Missie en visie | USP's")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "USP's: wat jou uniek maakt ten opzichte van concurrenten. Buyer persona: een profiel van je ideale klant. De 7 P's: product, prijs, plaats, promotie, personeel, proces en fysiek bewijs. KPI's: meetbare doelen. Messaging framework: je kernboodschappen op een rij.",
                      )}
                    </Tip>{" "}
                    {t("| Toegevoegde waarde | Doelgroep(en) en buyer persona's | Merkpersoonlijkheid | De 7 P's | Doelen en KPI's")}
                    <Tip label={ta("Uitleg")} plain>
                      {t(
                        "KPI's (key performance indicators): de paar cijfers die laten zien of je je doelen haalt, zoals omzet of aantal aanvragen.",
                      )}
                    </Tip>{" "}
                    {t("| Merkessentie en messaging framework")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 4 - Positionering")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Strategische positionering | Merkverhaal / merkstrategie")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 5 - Van plan naar actie")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Actieplan social media | Kanalen en tools | Planning en tijdlijn | Conceptvoorbeelden")}
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
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Fase 6 - Overdracht")}</strong>
                  <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>
                    {t("Online teampresentatie of onboarding deck")}
                    <Tip label={ta("Uitleg")}>
                      {t("Onboarding deck: een presentatie waarmee je nieuwe collega's of partners meeneemt in je merk.")}
                    </Tip>
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
            </div>
          </div>
        </div>
      </section>
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
            {"“The essence of strategy is choosing"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"what not to do"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="qStrategyBrush" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#qStrategyBrush)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#qStrategyBrush)"
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
            {"Michael Porter"}
          </figcaption>
        </figure>
      </section>
      <Reviews />
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
