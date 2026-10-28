"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstBrandBookContent() {
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
            <rect x="96" y="92" width="190" height="250" rx="22" stroke="url(#abL)" strokeWidth="2.5" transform="rotate(-7 190 217)"></rect>
            <rect x="128" y="74" width="190" height="250" rx="22" fill="#FFFFFF"></rect>
            <rect x="128" y="74" width="22" height="250" rx="11" fill="#E3E7F5"></rect>
            <circle cx="234" cy="148" r="42" fill="url(#abF)"></circle>
            <path
              className="ia-draw"
              style={{ "--d": "0.9s" }}
              pathLength="1"
              d="M216 162l18-36 18 36"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <circle className="ia-pop" style={{ "--d": "0.7s" }} cx="182" cy="232" r="14" fill="#8639FA"></circle>
            <circle className="ia-pop" style={{ "--d": "0.82s" }} cx="218" cy="232" r="14" fill="#0F8AE5"></circle>
            <circle className="ia-pop" style={{ "--d": "0.94s" }} cx="254" cy="232" r="14" fill="#FAE84E"></circle>
            <circle className="ia-pop" style={{ "--d": "1.06s" }} cx="290" cy="232" r="14" fill="#5EC0FA"></circle>
            <rect x="170" y="272" width="124" height="10" rx="5" fill="#D5DAE3"></rect>
            <rect x="170" y="294" width="92" height="10" rx="5" fill="#D5DAE3"></rect>
            <g className="ia-wig" style={{ "--d": "1.2s" }}>
              <g transform="rotate(32 318 284)">
                <rect x="300" y="214" width="34" height="132" rx="8" fill="url(#abF)" stroke="#FFFFFF" strokeWidth="3"></rect>
                <path d="M300 346l17 28 17-28" fill="#FAE84E"></path>
              </g>
            </g>
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
            <span aria-current="page" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {"Brand Book"}
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
              padding: "8px 16px",
              borderRadius: "999px",
            }}
          >
            {"Brand Book"}
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
            {t("Eén merk.")}
            <br />
            {t("Overal")}{" "}
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
                {t("herkenbaar.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t(
              "Een huisstijlhandboek legt je huisstijl vast in één boek. Je logo, kleuren en letters kloppen, waar je ook zichtbaar bent.",
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
                padding: "20px 32px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
            </a>
            <span style={{ fontSize: "15px", color: "#D5DAE3" }}>
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €1.497")}</strong> {t("eenmalig, ex. btw")}
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
              {t("Je bent beter dan je merk laat")}{" "}
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
                  {t("zien.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Herken je dit? Dan brengen we samen één lijn aan.")}
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
                {t("Elke uiting ziet er anders uit.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je website, offertes en socials hebben elk een eigen stijl. Klanten herkennen je daardoor niet.")}
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
                {t("Je logo past niet meer.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je bedrijf is gegroeid, je logo niet. Het laat niet zien wie je nu bent.")}
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
                {t("Niemand weet hoe het hoort.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Een collega of ontwerper maakt iets nieuws. Zonder vaste regels gokt iedereen naar kleuren en letters.")}
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
              {t("Een merk dat voor je")}{" "}
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
                  {t("verkoopt.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
              {t("Van rommelig naar herkenbaar.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
              {t(
                "Veel ondernemers hebben een goed bedrijf, maar een uitstraling die alle kanten op gaat. Elke nieuwe uiting is weer zoeken naar de juiste kleur of letter. Maar stel je voor dat alles in één keer klopt.",
              )}
            </p>
          </div>
          <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je merk ziet er overal hetzelfde uit. Klanten herkennen je direct, online en offline.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je laat zien wie je echt bent. Dat geeft vertrouwen en maakt je de logische keuze.")}
            </li>
            <li style={{ paddingLeft: "20px", borderLeft: "3px solid #FAE84E", fontSize: "17px", lineHeight: "1.65", color: "#FFFFFF" }}>
              {t("Je team en ontwerpers weten precies hoe het moet. Nieuwe uitingen maak je sneller, zonder discussie.")}
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
              {t("Herkenbaar merk, meer")}{" "}
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
                  {t("vertrouwen.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t(
                "Een huisstijlhandboek legt je hele uitstraling vast: je logo, kleuren, letters en vormen. Zo herkennen klanten je overal en weet je team precies hoe je merk eruitziet.",
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
                <span>{t("Klanten kiezen sneller voor jou")}</span>
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
                <span>{t("De juiste associaties bij je merk")}</span>
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
                <span>{t("Eenheid in alles wat je laat zien")}</span>
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
                <span>{t("Minder tijd en kosten, meer omzet")}</span>
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
              {t("Een prettige samenwerking, van het eerste gesprek tot je huisstijlhandboek.")}
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
                {t("We denken mee")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We leveren niet alleen een product. Eerst zijn je wensen helder, daarna komen we met een voorstel dat bij je past.")}
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
                {t("Altijd een stap extra")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We doen meer dan wat gevraagd wordt. Vaak komen we met ideeën waar je zelf nog niet aan had gedacht.")}
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
                {t("Meerdere ontwerpers")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je krijgt ontwerpen van verschillende ontwerpers. Zo liggen er meer ideeën op tafel en kies je wat echt bij je past.")}
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
                {t("Een vast bedrag per pakket, zodat je vooraf precies weet waar je aan toe bent.")}
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
            {t("Een bewezen aanpak in vier fasen. Elke stap brengt je dichter bij een merk dat klopt.")}
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
                  {t("1. Visie en positionering")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We praten over je merk, je doelgroep en je kernwaarden. Samen bepalen we je identiteit en tone of voice.")}
                  <Tip label={ta("Uitleg")}>
                    {t("Tone of voice: de manier waarop je merk praat en schrijft, bijvoorbeeld zakelijk, warm of speels.")}
                  </Tip>
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
                  {t("2. Grafisch ontwerp")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We werken je logo, kleuren, typografie, fotografie en stijlelementen uit, passend bij je merk.")}
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
                  {t("Je ziet het eerste ontwerp en geeft je feedback. We schaven tot alles past bij je visie en uitstraling.")}
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
                  {t("Je krijgt je huisstijlhandboek als overzichtelijk document, klaar voor je team en externe partners.")}
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
            {"“A brand is not what you say it is. It is what they"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"say"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="bbQuoteBrush" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#bbQuoteBrush)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#bbQuoteBrush)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.75"
                ></path>
              </svg>
            </span>{" "}
            {"it is.”"}
          </blockquote>
          <figcaption translate="no" style={{ fontSize: "17px", fontWeight: "500", color: "#E6E9F8" }}>
            {"Marty Neumeier"}
          </figcaption>
        </figure>
      </section>
      <section id="pakketten" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
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
              {t("Je huisstijlhandboek voor een vast bedrag, zodat je precies weet waar je aan toe bent.")}
            </p>
          </div>
          <div className="tf-scroll" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", paddingTop: "16px" }}>
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
                      padding: "40px 24px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "8px",
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
                        marginTop: "16px",
                        color: "inherit",
                      }}
                    >
                      {t("€1.497")}
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
                      padding: "40px 24px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "8px",
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
                        padding: "4px 12px",
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
                        marginTop: "16px",
                        color: "inherit",
                      }}
                    >
                      {t("€3.997")}
                    </span>
                    <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                      {t("eenmalig, ex. btw")}
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
                      padding: "40px 24px 28px",
                      height: "100%",
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      gap: "8px",
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
                        marginTop: "16px",
                        color: "inherit",
                      }}
                    >
                      {t("€5.497")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Intake en vragenlijst")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Concurrentieanalyse")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Interviews en surveys")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Buyer persona's")}
                    <Tip label={ta("Uitleg")}>
                      {t("Een uitgewerkt profiel van je ideale klant: wie hij is, wat hij wil en wat hem tegenhoudt.")}
                    </Tip>
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Klantreizen")}
                    <Tip label={ta("Uitleg")}>{t("De stappen die een klant zet, van eerste kennismaking tot aankoop en daarna.")}</Tip>
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Merkverhaal / merkstrategie")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("Incl. 2 strategische sessies")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Tone of voice")}
                    <Tip label={ta("Uitleg")}>
                      {t("Tone of voice: de manier waarop je merk praat en schrijft, bijvoorbeeld zakelijk, warm of speels.")}
                    </Tip>{" "}
                    {t("ontwikkelen")}
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Logovoorstellen")}</strong>
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("3")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {t("4")}
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("5")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Pay-off / tagline")}
                    <Tip label={ta("Uitleg")}>{t("Een korte zin bij je logo die zegt waar je merk voor staat.")}</Tip>
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Typografie")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Kleurenpalet")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Vormentaal")}
                    <Tip label={ta("Uitleg")}>{t("Terugkerende vormen en lijnen die je huisstijl herkenbaar maken.")}</Tip>
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Toepassingen")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Briefpapier, envelop en visitekaartje")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Volledig gebruiksrecht")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Bestandsformaten")}
                    <Tip label={ta("Uitleg")}>
                      {t("PNG en SVG voor online gebruik, PDF om te delen en AI om later aan te passen in Illustrator.")}
                    </Tip>
                  </strong>
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("PNG, SVG, PDF, AI")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {t("PNG, SVG, PDF, AI")}
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("PNG, SVG, PDF, AI")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Teampresentatie of onboarding deck")}
                    <Tip label={ta("Uitleg")}>{t("Een presentatie waarmee je je team of nieuwe collega's meeneemt in je merk.")}</Tip>
                  </strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Implementatie")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Extra online consultancy")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("Tot 3 begeleidende sessies")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Correctierondes")}</strong>
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("Max. 2")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {t("Max. 3")}
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("Max. 5")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Levertijd")}</strong>
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("± 2 weken")}
                </div>
                <div
                  className="tf-cell"
                  data-plan="1"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    background: "#F6F2FF",
                  }}
                >
                  {t("± 3 weken")}
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
                    padding: "20px 12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t("Vanaf 4 weken")}
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
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Meerwerk")}</strong>
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                    padding: "20px 12px",
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
                padding: "20px 7% 8px",
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
                    padding: "40px 24px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "8px",
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
                      marginTop: "16px",
                      color: "inherit",
                    }}
                  >
                    {t("€1.497")}
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Intake en vragenlijst")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Concurrentieanalyse")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Interviews en surveys")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Buyer persona's")}
                    <Tip label={ta("Uitleg")}>
                      {t("Een uitgewerkt profiel van je ideale klant: wie hij is, wat hij wil en wat hem tegenhoudt.")}
                    </Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Klantreizen")}
                    <Tip label={ta("Uitleg")}>{t("De stappen die een klant zet, van eerste kennismaking tot aankoop en daarna.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Merkverhaal / merkstrategie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Tone of voice")}
                    <Tip label={ta("Uitleg")}>
                      {t("Tone of voice: de manier waarop je merk praat en schrijft, bijvoorbeeld zakelijk, warm of speels.")}
                    </Tip>{" "}
                    {t("ontwikkelen")}
                  </strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Logovoorstellen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("3")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Pay-off / tagline")}
                    <Tip label={ta("Uitleg")}>{t("Een korte zin bij je logo die zegt waar je merk voor staat.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Typografie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Kleurenpalet")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Vormentaal")}
                    <Tip label={ta("Uitleg")}>{t("Terugkerende vormen en lijnen die je huisstijl herkenbaar maken.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Toepassingen")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Briefpapier, envelop en visitekaartje")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Volledig gebruiksrecht")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>
                    {t("Bestandsformaten")}
                    <Tip label={ta("Uitleg")}>
                      {t("PNG en SVG voor online gebruik, PDF om te delen en AI om later aan te passen in Illustrator.")}
                    </Tip>
                  </strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("PNG, SVG, PDF, AI")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Teampresentatie of onboarding deck")}
                    <Tip label={ta("Uitleg")}>{t("Een presentatie waarmee je je team of nieuwe collega's meeneemt in je merk.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Implementatie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Extra online consultancy")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 2")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("± 2 weken")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
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
                    padding: "40px 24px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "8px",
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
                      padding: "4px 12px",
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
                      marginTop: "16px",
                      color: "inherit",
                    }}
                  >
                    {t("€3.997")}
                  </span>
                  <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: "#E6E9F8" }}>
                    {t("eenmalig, ex. btw")}
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Intake en vragenlijst")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Concurrentieanalyse")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Interviews en surveys")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Buyer persona's")}
                    <Tip label={ta("Uitleg")}>
                      {t("Een uitgewerkt profiel van je ideale klant: wie hij is, wat hij wil en wat hem tegenhoudt.")}
                    </Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Klantreizen")}
                    <Tip label={ta("Uitleg")}>{t("De stappen die een klant zet, van eerste kennismaking tot aankoop en daarna.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Merkverhaal / merkstrategie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Tone of voice")}
                    <Tip label={ta("Uitleg")}>
                      {t("Tone of voice: de manier waarop je merk praat en schrijft, bijvoorbeeld zakelijk, warm of speels.")}
                    </Tip>{" "}
                    {t("ontwikkelen")}
                  </strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Logovoorstellen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("4")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Pay-off / tagline")}
                    <Tip label={ta("Uitleg")}>{t("Een korte zin bij je logo die zegt waar je merk voor staat.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Typografie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Kleurenpalet")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Vormentaal")}
                    <Tip label={ta("Uitleg")}>{t("Terugkerende vormen en lijnen die je huisstijl herkenbaar maken.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Toepassingen")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Briefpapier, envelop en visitekaartje")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Volledig gebruiksrecht")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>
                    {t("Bestandsformaten")}
                    <Tip label={ta("Uitleg")}>
                      {t("PNG en SVG voor online gebruik, PDF om te delen en AI om later aan te passen in Illustrator.")}
                    </Tip>
                  </strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("PNG, SVG, PDF, AI")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Teampresentatie of onboarding deck")}
                    <Tip label={ta("Uitleg")}>{t("Een presentatie waarmee je je team of nieuwe collega's meeneemt in je merk.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Implementatie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Extra online consultancy")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 3")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("± 3 weken")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
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
                    padding: "40px 24px 28px",
                    height: "100%",
                    width: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: "8px",
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
                      marginTop: "16px",
                      color: "inherit",
                    }}
                  >
                    {t("€5.497")}
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Intake en vragenlijst")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Concurrentieanalyse")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Interviews en surveys")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Buyer persona's")}
                    <Tip label={ta("Uitleg")}>
                      {t("Een uitgewerkt profiel van je ideale klant: wie hij is, wat hij wil en wat hem tegenhoudt.")}
                    </Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Klantreizen")}
                    <Tip label={ta("Uitleg")}>{t("De stappen die een klant zet, van eerste kennismaking tot aankoop en daarna.")}</Tip>
                  </strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Merkverhaal / merkstrategie")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Incl. 2 strategische sessies")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Tone of voice")}
                    <Tip label={ta("Uitleg")}>
                      {t("Tone of voice: de manier waarop je merk praat en schrijft, bijvoorbeeld zakelijk, warm of speels.")}
                    </Tip>{" "}
                    {t("ontwikkelen")}
                  </strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Logovoorstellen")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("5")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Pay-off / tagline")}
                    <Tip label={ta("Uitleg")}>{t("Een korte zin bij je logo die zegt waar je merk voor staat.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Typografie")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Kleurenpalet")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Vormentaal")}
                    <Tip label={ta("Uitleg")}>{t("Terugkerende vormen en lijnen die je huisstijl herkenbaar maken.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Toepassingen")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Briefpapier, envelop en visitekaartje")}</strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Volledig gebruiksrecht")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>
                    {t("Bestandsformaten")}
                    <Tip label={ta("Uitleg")}>
                      {t("PNG en SVG voor online gebruik, PDF om te delen en AI om later aan te passen in Illustrator.")}
                    </Tip>
                  </strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("PNG, SVG, PDF, AI")}</span>
                </div>
                <div
                  style={{
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t("Teampresentatie of onboarding deck")}
                    <Tip label={ta("Uitleg")}>{t("Een presentatie waarmee je je team of nieuwe collega's meeneemt in je merk.")}</Tip>
                  </strong>
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
                    padding: "16px 24px",
                    borderTop: "1px solid #E4E6EA",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>{t("Implementatie")}</strong>
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
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Extra online consultancy")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Tot 3 begeleidende sessies")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Correctierondes")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Max. 5")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Levertijd")}</strong>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{t("Vanaf 4 weken")}</span>
                </div>
                <div style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong style={{ fontSize: "13px", fontWeight: "600", color: "#5A6273" }}>{t("Meerwerk")}</strong>
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
