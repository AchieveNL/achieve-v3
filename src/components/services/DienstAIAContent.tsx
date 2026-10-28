"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Reviews } from "@/components/sections/Reviews";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function DienstAIAContent() {
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

  // Price plans on phones: a swipeable row of cards, centred on the selected plan (Test first).
  const tfmTrackRef = useRef<HTMLDivElement>(null);
  const [tfmI, setTfmI] = useState(0);
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
    tfmGo(0, false);
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
  const [tfmReq, setTfmReq] = useState({ i: 0, n: 0 });
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
    tfmPlan: ["Test", "Beheer", "Groei"][tfmI],
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

  // ---- Pakketten, roadmap and "Goed om te weten" (data-driven) ----
  const sel = tfmI;
  const COLS = "minmax(0, 1.6fr) repeat(3, minmax(0, 1fr))";
  const GRAD_TEXT = {
    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  } as const;
  const NAV_BTN = {
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
  } as const;
  const cell = (i: number) =>
    ({
      borderLeft: i === sel ? undefined : "1px solid #E4E6EA",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "20px 12px",
      fontSize: "14px",
      fontWeight: "600",
      color: "#1F246C",
      background: i === sel ? "#F6F2FF" : undefined,
    }) as const;
  const CHECK = "✓",
    DASH = "–";
  const val = (v: ReactNode, small = false) =>
    v === CHECK ? (
      <>
        <span
          aria-hidden="true"
          style={{
            width: small ? "32px" : "36px",
            height: small ? "32px" : "36px",
            borderRadius: "50%",
            background: "#EFE8FD",
            color: "#8639FA",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5"></path>
          </svg>
        </span>
        <span className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {t("Inbegrepen")}
        </span>
      </>
    ) : v === DASH ? (
      <>
        <span aria-hidden="true" style={{ color: "#B8BFCC" }}>
          {t("–")}
        </span>
        <span className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {t("Niet inbegrepen")}
        </span>
      </>
    ) : (
      <>{typeof v === "string" ? t(v) : v}</>
    );

  type Plan = { id: string; sub: string; phase: string; price: string; total: string; pill: string; who: string; badge?: string };
  const PLANS: Plan[] = [
    { id: "Test", sub: "3 maanden", phase: "maand 1 t/m 3", price: "€999", total: "€2.997 voor de hele test", pill: "3 maanden vast", who: "Voor wie eerst wil ervaren wat ChatGPT oplevert.", badge: "Start hier" },
    { id: "Beheer", sub: "Na de test", phase: "vanaf maand 4", price: "€697", total: "Tot 2 onderwerpen", pill: "Maandelijks opzegbaar", who: "Voor wie wil doorgaan, of verder wil testen op dezelfde onderwerpen." },
    { id: "Groei", sub: "Na de test", phase: "vanaf maand 4", price: "€997", total: "Tot 4 onderwerpen", pill: "Maandelijks opzegbaar", who: "Voor wie wil uitbreiden naar meer onderwerpen of producten." },
  ];
  const planCard = (p: Plan, mobile = false) => {
    const hi = !!p.badge;
    return (
      <div
        style={{
          position: "relative",
          background: hi ? "linear-gradient(160deg, #8639FA 0%, #0F8AE5 100%)" : "#FFFFFF",
          color: hi ? "#FFFFFF" : "#1F246C",
          borderRadius: "24px 24px 0 0",
          padding: "40px 24px 28px",
          height: mobile ? undefined : "100%",
          width: mobile ? undefined : "100%",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "8px",
        }}
      >
        {p.badge && (
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
            {t(p.badge)}
          </span>
        )}
        <h3 className="tf-pname" style={{ margin: "0", fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "34px", lineHeight: "1", color: "inherit" }}>
          {t(p.id)}
        </h3>
        <span style={{ fontSize: "14px", color: hi ? "#E6E9F8" : "#5A6273" }}>{t(p.sub)}</span>
        <span
          className="tf-price"
          style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "56px", lineHeight: "1", letterSpacing: "-0.02em", marginTop: "16px", color: "inherit" }}
        >
          {t(p.price)}
        </span>
        <span className="tf-pm" style={{ fontSize: "14px", fontWeight: "600", color: hi ? "#E6E9F8" : "#5A6273" }}>
          {t("per maand, ex. btw")}
        </span>
        <span style={{ width: "100%", height: "1px", background: hi ? "rgba(255,255,255,.25)" : "#E4E6EA", margin: "16px 0 12px" }}></span>
        <span style={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}>{t(p.total)}</span>
        <span
          style={{
            fontSize: "12px",
            fontWeight: "600",
            padding: "4px 12px",
            borderRadius: "999px",
            background: hi ? "rgba(255, 255, 255, 0.2)" : "#EFE8FD",
            color: hi ? "#FFFFFF" : "#6B2BD9",
          }}
        >
          {t(p.pill)}
        </span>
        <p className="tf-who" style={{ margin: "16px 0 20px", fontSize: "15px", lineHeight: "1.55", color: hi ? "#E6E9F8" : "#5A6273" }}>
          {t(p.who)}
        </p>
        <div style={{ marginTop: "auto", width: "100%" }}>
          <a
            href="https://calendly.com/vrijblijvendgesprek/"
            target="_blank"
            rel="noopener"
            className={hi ? "tf-k4" : "k3-out"}
            style={{
              background: hi ? "#FFFFFF" : "transparent",
              color: "#1F246C",
              border: hi ? undefined : "1px solid #1F246C",
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
              className={hi ? "tf-k4a" : undefined}
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
    );
  };

  type Row = { k: string; tip?: string; d: ReactNode; v: ReactNode[]; accent?: boolean };
  const ROWS: Row[] = [
    {
      k: "Looptijd en opzeggen",
      d: t(
        "De voorbereiding start direct na je akkoord. De 3 maanden van de test tellen vanaf het moment dat je eerste campagne live staat. Keurt OpenAI je account af, dan stopt de test en betaal je alleen het vaste bedrag voor de voorbereiding dat we vooraf afspreken. Beheer en Groei zeg je op of wissel je per de volgende maand.",
      ),
      v: ["3 maanden vast", "Maandelijks opzegbaar", "Maandelijks opzegbaar"],
    },
    {
      k: "Advertentiebudget",
      d: (
        <>
          {t(
            "Je advertentiebudget betaal je rechtstreeks aan OpenAI en staat los van onze tarieven. Voor de test en Beheer minimaal €1.500 p/mnd, voor Groei €3.000 p/mnd. Wil je testen op aanvragen of verkopen, dan adviseren we vanaf €3.000 p/mnd. Wat nodig is, hangt af van je klikprijs en conversieratio",
          )}
          <Tip label={ta("Uitleg")}>
            {t("Conversieratio: het percentage bezoekers dat iets doet wat je wilt, zoals een aankoop of een aanvraag.")}
          </Tip>
          {t(".")}
        </>
      ),
      v: ["Minimaal €1.500 p/mnd", "Minimaal €1.500 p/mnd", "Minimaal €3.000 p/mnd"],
    },
    {
      k: "Totaal per maand, met minimaal budget",
      d: (
        <>
          {t("Ons tarief plus het minimale advertentiebudget, ex. btw en datakosten. Bij Groei komt daar eenmalig het project server-side")}
          <Tip label={ta("Uitleg")}>
            {t("Server-side: meten via je eigen server in plaats van alleen de browser, zodat minder data verloren gaat.")}
          </Tip>{" "}
          {t("& CRM")}
          <Tip label={ta("Uitleg")}>
            {t("CRM: het systeem waarin je je klanten en aanvragen bijhoudt.")}
          </Tip>{" "}
          {t("(€897) bij, als je dat wilt.")}
        </>
      ),
      v: ["Vanaf €2.499 p/mnd", "Vanaf €2.197 p/mnd", "Vanaf €3.997 p/mnd"],
    },
    {
      k: "Onderwerpen of productgroepen",
      d: (
        <>
          {t("Een onderwerp is een groep klantvragen met eigen advertenties en een eigen landingspagina.")}
          <Tip label={ta("Uitleg")}>
            {t("Landingspagina: de pagina waar iemand terechtkomt na een klik op je advertentie.")}
          </Tip>
        </>
      ),
      v: ["Tot 2", "Tot 2", "Tot 4"],
    },
    {
      k: "Nieuwe advertentievarianten",
      d: t("Titel, tekst en beeld, met beeld dat je al hebt of aanlevert."),
      v: ["4 bij de start, daarna 2 per maand", "2 per maand", "4 per maand"],
    },
    {
      k: "Landingspagina's",
      tip: "Landingspagina: de pagina waar iemand terechtkomt na een klik op je advertentie.",
      d: t("Advies en tekstvoorstellen. De aanpassing zelf voert jouw webbouwer uit."),
      v: ["Advies bij de start", "Advies bij elke evaluatie", "Elk kwartaal een uitgewerkt voorstel"],
    },
    {
      k: "Meting",
      d: (
        <>
          {t("De OpenAI-pixel")}
          <Tip label={ta("Uitleg")}>
            {t("Pixel: een stukje code op je website dat meet wat bezoekers doen na een klik op je advertentie.")}
          </Tip>{" "}
          {t("achter je cookietoestemming en eigen UTM's")}
          <Tip label={ta("Uitleg")}>
            {t("UTM: een label in de link van je advertentie, zodat je in je statistieken ziet waar een bezoeker vandaan komt.")}
          </Tip>{" "}
          {t(", zodat ChatGPT ook in GA4")}
          <Tip label={ta("Uitleg")}>
            {t("GA4 (Google Analytics 4): de tool van Google die laat zien hoeveel bezoekers je website heeft en wat ze doen.")}
          </Tip>{" "}
          {t("los zichtbaar is. Bij Groei kun je daar server-side meting")}
          <Tip label={ta("Uitleg")}>
            {t("Server-side: meten via je eigen server in plaats van alleen de browser, zodat minder data verloren gaat.")}
          </Tip>{" "}
          {t("en CRM-terugkoppeling")}
          <Tip label={ta("Uitleg")}>
            {t("CRM: het systeem waarin je je klanten en aanvragen bijhoudt.")}
          </Tip>{" "}
          {t("aan toevoegen, als eenmalig project van €897.")}
        </>
      ),
      v: [
        "Basismeting",
        "Basismeting",
        <>
          {t("Basismeting, server-side")}
          <Tip label={ta("Uitleg")}>{t("Server-side: meten via je eigen server in plaats van alleen de browser, zodat minder data verloren gaat.")}</Tip>{" "}
          {t("& CRM")}
          <Tip label={ta("Uitleg")}>{t("CRM: het systeem waarin je je klanten en aanvragen bijhoudt.")}</Tip>{" "}
          {t("als project")}
        </>,
      ],
    },
    {
      k: "Regiotest",
      d: (
        <>
          {t("Regio's met en zonder advertenties vergelijken, om te zien wat ChatGPT extra oplevert. Alleen als je volume en de regiotargeting")}
          <Tip label={ta("Uitleg")}>
            {t("Targeting: bepalen wie je advertentie te zien krijgt, bijvoorbeeld op leeftijd, interesses of woonplaats.")}
          </Tip>{" "}
          {t("in Nederland dat toelaten.")}
        </>
      ),
      v: [
        DASH,
        DASH,
        <>
          {t("Als volume & targeting")}
          <Tip label={ta("Uitleg")}>{t("Targeting: bepalen wie je advertentie te zien krijgt, bijvoorbeeld op leeftijd, interesses of woonplaats.")}</Tip>{" "}
          {t("het toelaten")}
        </>,
      ],
    },
    {
      k: "Datakosten voor de meting",
      d: (
        <>
          {t("De zichtbaarheidsmeting")}
          <Tip label={ta("Uitleg")}>
            {t("Zichtbaarheidsmeting: we stellen ChatGPT vaste vragen uit jouw vak en kijken of je bedrijf, je website en andere bronnen in de antwoorden voorkomen.")}
          </Tip>{" "}
          {t("draait op data van DataForSEO. Die kosten betaal je zelf, bovenop je advertentiebudget. Vooraf krijg je een kostenraming.")}
        </>
      ),
      v: ["Op basis van gebruik", "Op basis van gebruik", "Op basis van gebruik"],
    },
    {
      k: "Opstartkosten",
      d: t("De inrichting zit in de test. Beheer en Groei starten pas na de test, dus daar komen geen opstartkosten bij."),
      v: ["Inbegrepen", "Niet van toepassing", "Niet van toepassing"],
    },
    {
      k: "Elke maand",
      accent: true,
      d: t(
        "Analyse per onderwerp & advertentie | Levering, afkeuringen & meting controleren | Bijsturen biedingen & budgetverdeling | Nieuwe advertentievarianten | Kwaliteit van aanvragen of verkopen volgen | Maandelijkse rapportage | Evaluatiecall",
      ),
      v: [CHECK, CHECK, CHECK],
    },
    {
      k: "Elk kwartaal",
      accent: true,
      d: t(
        "Volledige accountanalyse, in maand 3, 6, 9 & 12 samen met de evaluatie | Doelen herijken op basis van de cijfers | Seizoenskalender bijwerken & pieken op tijd voorbereiden | Herhaling zichtbaarheidsmeting met dezelfde vragen & methode | Check nieuwe functies & regels van OpenAI",
      ),
      v: [CHECK, CHECK, CHECK],
    },
    {
      k: "Meerwerk",
      d: t("Bespreken we altijd vooraf en voeren we alleen uit na jouw akkoord."),
      v: ["€130 p/uur", "€130 p/uur", "€130 p/uur"],
    },
  ];

  type Phase = { when: string; k: string; items: [string, ReactNode][]; v: string[]; note?: string };
  const VIA = "Via de test";
  const PHASES: Phase[] = [
    {
      when: "Maand 1",
      k: "Meting en start",
      items: [
        ["", "Account, branche & regiomogelijkheden controleren"],
        ["", "Onderzoek naar de vragen die klanten stellen vóór de aankoop"],
        ["Nulmeting:", "huidige aanvragen, verkopen & kosten per kanaal"],
        ["", "Doel, maximale kosten per aanvraag of verkoop, stopcriteria & seizoenskalender vastleggen"],
        [
          "",
          <>
            {t("Meting inrichten zodat verkeer & conversies")}
            <Tip label={ta("Uitleg")}>{t("Conversie: een bezoeker die doet wat jij wilt, zoals een bestelling plaatsen.")}</Tip>{" "}
            {t("uit ChatGPT apart zichtbaar zijn, met toestemming van bezoekers")}
          </>,
        ],
        ["Dienstverlener:", "afspreken hoe we zien welke aanvragen klant worden"],
        [
          "",
          <>
            {t("Landingspagina")}
            <Tip label={ta("Uitleg")}>{t("Landingspagina: de pagina waar iemand terechtkomt na een klik op je advertentie.")}</Tip>{" "}
            {t("per onderwerp beoordelen, met advies & tekstvoorstellen")}
          </>,
        ],
        ["", "Eerste campagnes voor tot 2 onderwerpen, met 4 advertentievarianten"],
        ["Webshop:", "productfeed koppelen & automatisch bijwerken, zodra productadvertenties voor je account beschikbaar zijn"],
        ["Zichtbaarheidsmeting:", "noemt ChatGPT je bedrijf, je website & andere bronnen"],
      ],
      v: [CHECK, VIA, VIA],
    },
    {
      when: "Maand 2",
      k: "Eerste testbevindingen",
      items: [
        ["", "Eerste resultaten beoordelen & vervolgstappen bepalen"],
        ["", "Eerste aanvragen of verkopen beoordelen op kwaliteit"],
        ["", "Keuzes voor de rest van de test vastleggen"],
      ],
      v: [CHECK, VIA, VIA],
    },
    {
      when: "Maand 3",
      k: "Evaluatie en besluit",
      items: [
        ["", "Resultaten naast de nulmeting, je doelen & je andere kanalen"],
        [
          "",
          <>
            {t("Overstap naar sturen op conversies")}
            <Tip label={ta("Uitleg")}>{t("Conversie: een bezoeker die doet wat jij wilt, zoals een bestelling plaatsen.")}</Tip>
            {t(", zodra de meting betrouwbaar is")}
          </>,
        ],
        ["", "Onderbouwd advies: stoppen, Beheer of Groei"],
      ],
      v: [CHECK, VIA, VIA],
      note: "Tot hier",
    },
    {
      when: "Vanaf maand 4",
      k: "Doorgaan met wat werkt",
      items: [
        ["", "Je onderwerpen doorlopend beheren: bijsturen, nieuwe varianten & rapportage"],
        [
          "",
          <>
            {t("Overstap naar sturen op conversies")}
            <Tip label={ta("Uitleg")}>{t("Conversie: een bezoeker die doet wat jij wilt, zoals een bestelling plaatsen.")}</Tip>
            {t(", als dat in de test nog niet kon")}
          </>,
        ],
        ["", "Elk kwartaal: doelen herijken, seizoen voorbereiden & zichtbaarheidsmeting herhalen"],
        ["", "Elk half jaar een evaluatie: resultaten, totale kosten & vervolg"],
      ],
      v: [DASH, CHECK, CHECK],
    },
    {
      when: "Vanaf maand 4",
      k: "Gericht uitbreiden (alleen Groei)",
      items: [
        ["", "Uitbreiden naar tot 4 onderwerpen of productgroepen, elk met eigen testbudget & criteria"],
        [
          "",
          <>
            {t("Als eenmalig project (€897): server-side meting")}
            <Tip label={ta("Uitleg")}>{t("Server-side: meten via je eigen server in plaats van alleen de browser, zodat minder data verloren gaat.")}</Tip>{" "}
            {t("& voor dienstverleners CRM-terugkoppeling")}
            <Tip label={ta("Uitleg")}>{t("CRM: het systeem waarin je je klanten en aanvragen bijhoudt.")}</Tip>
            {t(", met een standaardkoppeling")}
          </>,
        ],
        [
          "",
          <>
            {t("Elk kwartaal een uitgewerkt voorstel voor een landingspagina")}
            <Tip label={ta("Uitleg")}>{t("Landingspagina: de pagina waar iemand terechtkomt na een klik op je advertentie.")}</Tip>
          </>,
        ],
        [
          "",
          <>
            {t("Regiotest met en zonder advertenties, als volume & regiotargeting")}
            <Tip label={ta("Uitleg")}>{t("Targeting: bepalen wie je advertentie te zien krijgt, bijvoorbeeld op leeftijd, interesses of woonplaats.")}</Tip>{" "}
            {t("dat toelaten")}
          </>,
        ],
      ],
      v: [DASH, DASH, CHECK],
    },
  ];

  type Faq = { q: string; a: ReactNode[]; link?: [string, string] };
  const FAQ: Faq[] = [
    {
      q: "Past ChatGPT bij jouw branche?",
      a: [
        "Niet elke branche mag adverteren in ChatGPT. Voor campagnes in Nederland zijn zorg en financiële diensten in principe uitgesloten, net als onder meer juridische diensten, onbewezen gezondheidsclaims (ook bij supplementen), alcohol, gokken, dating en losse vacatures.",
        "We toetsen dit in het groeigesprek, voordat je iets tekent.",
      ],
    },
    {
      q: "Webshop of dienstverlener?",
      a: [
        "Heb je een webshop? Dan kan ChatGPT je producten tonen met beeld, prijs en merk. Bij de start checken we of dat voor jouw account al kan. Zo niet, dan beginnen we met advertenties per onderwerp en voegen we je producten toe zodra het kan.",
        "Ben je dienstverlener? Dan sturen we op aanvragen die klant worden, niet alleen op aantallen. Verkoop je vooral aan bedrijven? Mensen met een zakelijk ChatGPT-abonnement zien geen advertenties.",
      ],
    },
    {
      q: "Wie je advertenties kan zien",
      a: [
        "Mensen die ChatGPT gratis of met een Go-abonnement gebruiken. Plus, Pro en zakelijke abonnementen zijn advertentievrij. Minderjarigen krijgen geen advertenties, en bij gevoelige gesprekken, zoals over gezondheid of politiek, verschijnen ze niet.",
        "In Nederland zijn gepersonaliseerde advertenties voorlopig niet beschikbaar. ChatGPT kiest een advertentie op basis van het gesprek, niet op basis van een persoonlijk profiel.",
      ],
    },
    {
      q: "Een nieuw kanaal",
      a: [
        "Advertenties in ChatGPT zijn in Nederland beschikbaar sinds augustus 2026. Je resultaat is vooraf niet betrouwbaar te voorspellen. Daarom beginnen we met een test van 3 maanden en leggen we vooraf vast wanneer het resultaat goed genoeg is om door te gaan. Te weinig data na de test? Dan kun je met Beheer op dezelfde onderwerpen doortesten.",
        "Het platform verandert snel. Wat nieuw beschikbaar komt in Nederland, beoordelen we op wat het jou kan opleveren.",
      ],
    },
    {
      q: "Wat we van jou nodig hebben",
      a: [
        <>
          {t("Een advertentieaccount bij OpenAI op jouw naam: je maakt het zelf aan en nodigt ons uit. Verder toegang tot je website of Google Tag Manager")}
          <Tip label={ta("Uitleg")}>
            {t("Google Tag Manager: een tool van Google waarmee je meetcodes op je website beheert, zonder de website zelf aan te passen.")}
          </Tip>
          {t(", je cijfers over aanvragen, verkopen & marge, en iemand die onze vragen binnen enkele werkdagen kan beantwoorden.")}
        </>,
        "Soms zijn al bij de start aanpassingen aan je website nodig. Wij leveren het advies en de teksten, en hebben iemand nodig die de aanpassingen uitvoert.",
        "Loopt iets vast? Dan kan de planning opschuiven. We laten dit altijd op tijd weten.",
      ],
    },
    {
      q: "Wat er niet in zit",
      a: [
        <>
          {t("Het maken van nieuw beeldmateriaal en fotografie, het bouwen van een nieuwe website of landingspagina")}
          <Tip label={ta("Uitleg")}>
            {t("Landingspagina: de pagina waar iemand terechtkomt na een klik op je advertentie.")}
          </Tip>{" "}
          {t("en het opzetten van een productfeed als je die nog niet hebt. Advertentievarianten maken we met beeld dat je al hebt of aanlevert.")}
        </>,
        "We bepalen wat er nodig is en leveren hiervoor duidelijke specificaties aan. Of wij dit uitvoeren of een partij die je zelf kiest, en welke kosten daaraan verbonden zijn, bespreken we zodra dit aan de orde is.",
      ],
    },
    {
      q: "Samen met SEO en andere kanalen",
      a: [
        <>
          {t("Werk je ook aan je vindbaarheid in Google of in AI-antwoorden? Dan gebruiken we dezelfde onderwerpen voor je advertenties en je organische vindbaarheid")}
          <Tip label={ta("Uitleg")}>
            {t("Organische vindbaarheid: gevonden worden in de gewone zoekresultaten, zonder te betalen voor advertenties.")}
          </Tip>
          {t(". De zichtbaarheidsmeting laat zien welke bronnen ChatGPT noemt. Dat geeft aanknopingspunten voor je vindbaarheid.")}
        </>,
        "Advertenties veranderen de antwoorden van ChatGPT niet. Wat je advertenties opleveren, meten we daarom aan je aanvragen en verkopen. Advertenties rond de AI-overzichten van Google lopen via Google Ads, zie",
      ],
      link: ["DienstSEA", "Search Engine Advertising"],
    },
    {
      q: "Meerdere landen of talen",
      a: [
        "Ieder extra land of iedere extra taal vraagt om een eigen campagne- en budgetopzet. Dit valt niet binnen het bovenstaande tarief. Een nieuw advertentieaccount kan bovendien eerst alleen in het eigen land adverteren. Andere landen gaan open na verificatie en voldoende besteding in je eigen land.",
        "Wil je in meerdere markten adverteren? Dan maken we hiervoor een aparte berekening.",
      ],
    },
    {
      q: "Stoppen, doorgaan of wisselen",
      a: [
        "Na de test kies je: stoppen, Beheer of Groei. Wij geven daarbij een onderbouwd advies.",
        "Beheer en Groei zijn maandelijks opzegbaar, en je kunt per maand wisselen. Ga je van Groei naar Beheer, dan kiezen we samen welke twee onderwerpen doorlopen. De meting die al staat, blijft staan.",
        "Besluit je te stoppen? Dan behoud je volledige toegang tot het account en alles wat we hebben opgebouwd, waaronder de campagnes, advertenties, meting en de rapportages die we voor je bewaren.",
        "Het account is en blijft van jou.",
      ],
    },
  ];
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
            <path className="ia-tw" style={{ "--d": "1.4s" }} d="M354 300l6 0M357 297l0 6" stroke="#B48DFF" strokeWidth="3" strokeLinecap="round"></path>
            <rect x="92" y="112" width="240" height="200" rx="22" stroke="url(#abL)" strokeWidth="2.5" transform="rotate(-6 212 212)"></rect>
            <rect x="104" y="106" width="232" height="200" rx="22" fill="#FFFFFF"></rect>
            <rect className="ia-slide" style={{ "--d": "0.5s" }} x="200" y="124" width="116" height="28" rx="14" fill="url(#abF)"></rect>
            <rect x="214" y="135" width="70" height="6" rx="3" fill="#FFFFFF" opacity="0.85"></rect>
            <path className="ia-pulse" style={{ "--d": "1.2s" }} d="M134 166l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="url(#abF)"></path>
            <rect className="ia-slide" style={{ "--d": "0.8s" }} x="156" y="170" width="150" height="8" rx="4" fill="#D5DAE3"></rect>
            <rect className="ia-slide" style={{ "--d": "0.9s" }} x="156" y="186" width="116" height="8" rx="4" fill="#D5DAE3"></rect>
            <g className="ia-slide" style={{ "--d": "1.1s" }}>
              <rect x="124" y="212" width="192" height="74" rx="14" fill="#F2F8FE" stroke="#D5DAE3" strokeWidth="1.5"></rect>
              <rect x="136" y="224" width="50" height="50" rx="10" fill="url(#abF)"></rect>
              <rect x="198" y="230" width="84" height="8" rx="4" fill="#1F246C"></rect>
              <rect x="198" y="245" width="100" height="7" rx="3.5" fill="#D5DAE3"></rect>
              <rect x="198" y="259" width="46" height="10" rx="5" fill="#FAE84E"></rect>
            </g>
            <path
              className="ia-click"
              style={{ "--d": "1.6s" }}
              d="M286 254l0 34 9-8 7 15 7-3-7-15 12-1z"
              fill="#1F246C"
              stroke="#FFFFFF"
              strokeWidth="2.5"
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
            <span aria-current="page" translate="no" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {"AI Advertising"}
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
              padding: "8px 16px",
              borderRadius: "999px",
            }}
          >
            {"AI Ads"}
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
            {t("Ze vragen het ChatGPT.")}
            <br />
            {t("Jij staat in")}{" "}
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
                {t("beeld.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Met AI Advertising adverteer je in ChatGPT. Je verschijnt in het gesprek op het moment dat iemand vraagt naar wat jij aanbiedt.")}
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
              <strong style={{ color: "#FFFFFF", fontWeight: "700" }}>{t("Vanaf €999")}</strong> {t("per maand, ex. btw")}
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
              {t("Je klant vraagt het ChatGPT. Jij ontbreekt in het")}{" "}
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
                  {t("antwoord.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150", maxWidth: "720px" }}>
              {t("Steeds meer mensen beginnen hun zoektocht met een vraag aan AI. Herken je dit?")}
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
                {t("Je bent er niet bij.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Klanten vragen ChatGPT om advies. Jouw bedrijf komt in dat gesprek niet voor.")}
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
                {t("Een nieuw kanaal. Waar begin je?")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Adverteren in ChatGPT kan in Nederland pas sinds augustus 2026. Ervaring en vaste regels zijn er nog nauwelijks.")}
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
                {t("Je weet niet wat het oplevert.")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Zonder goede meting zie je niet welke klanten uit ChatGPT komen, en wat ze je kosten.")}
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
                {t("Zichtbaar in het")}{" "}
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
                    {t("gesprek.")}
                  </span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "20px", fontWeight: "600", lineHeight: "1.45", color: "#FFFFFF" }}>
                {t("Je advertentie verschijnt bij het antwoord van ChatGPT, als iemand vraagt naar wat jij aanbiedt.")}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#C9CFF0" }}>
                {t(
                  "We beginnen met een test van 3 maanden, met doelen die we vooraf vastleggen. Jij ziet elke maand wat het oplevert: bezoekers, kwalitatieve leads",
                )}
                <Tip label={ta("Uitleg")} plain>
                  {t("Lead: iemand die interesse toont en zijn gegevens achterlaat, bijvoorbeeld via een formulier of een afspraak.")}
                </Tip>{" "}
                {t("en omzet.")}
              </p>
            </div>
            <ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "28px" }}>
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
                {t("Je verschijnt op het moment dat iemand een vraag stelt over jouw vak.")}
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
                {t("Je ziet apart wat ChatGPT oplevert, naast je andere kanalen.")}
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
                {t("Na 3 maanden beslis je op basis van cijfers: stoppen of doorgaan.")}
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
              {t("Aanwezig op het moment van de")}{" "}
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
                  {t("vraag.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.65", color: "#3A4150", maxWidth: "520px" }}>
              {t("Je bereikt mensen die actief op zoek zijn naar een antwoord.")}
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
                <span>{t("Advertenties die passen bij het gesprek")}</span>
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
                <span>{t("Mensen met een concrete vraag")}</span>
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
                <span>{t("Vroeg erbij in een nieuw kanaal")}</span>
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
                <span>
                  {t("Apart meetbaar in GA4")}
                  <Tip label={ta("Uitleg")}>{t("GA4 (Google Analytics 4): de tool van Google die laat zien hoeveel bezoekers je website heeft en wat ze doen.")}</Tip>
                </span>
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
                <span>{t("Besluiten op basis van cijfers")}</span>
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
                <span>
                  {t("Sterker samen met je SEO")}
                  <Tip label={ta("Uitleg")}>{t("SEO: zorgen dat Google je pagina's goed begrijpt, zodat je hoger komt in de gewone zoekresultaten.")}</Tip>
                </span>
              </li>
            </ul>
          </div>
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
              {t("AI advertising in")}{" "}
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
              {t("Steeds meer mensen stellen hun vragen aan AI. Dit zeggen de nieuwste cijfers.")}
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
                {t("20%")}
              </span>
              <p style={{ margin: "0", fontSize: "22px", fontWeight: "600", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("van de vragen aan ChatGPT heeft een directe koopintentie, volgens OpenAI.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Advertenties in ChatGPT in het kort")}
              </span>
              <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "minmax(0, 150px) minmax(0, 1fr)", gap: "14px 16px", fontSize: "15px", color: "#FFFFFF" }}>
                {[
                  ["In Nederland", "Sinds 24 augustus 2026"],
                  ["Wie ze ziet", "Gratis en Go-gebruikers, 18+"],
                  ["Advertentievrij", "Plus, Pro en zakelijke abonnementen"],
                  ["Afrekenen", "Per klik of per 1.000 vertoningen"],
                ].map(([k, v]) => (
                  <Fragment key={k}>
                    <dt style={{ fontWeight: "600", color: "#E6E9F8" }}>{t(k)}</dt>
                    <dd style={{ margin: "0", fontWeight: "700" }}>{t(v)}</dd>
                  </Fragment>
                ))}
              </dl>
              <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#E6E9F8" }}>
                {t("Bron: OpenAI, 2026")}
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
                {t("900 mln+")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("mensen gebruiken ChatGPT elke week.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>{t("Bron: OpenAI, juni 2026")}</span>
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
                {t("9 op 10")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("gebruikers van ChatGPT heeft geen betaald abonnement. In de gratis versie verschijnen advertenties.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: OpenAI via Trouw, 2026")}
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
                {t("31")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("Europese landen waar je sinds augustus 2026 in ChatGPT kunt adverteren, waaronder Nederland.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: OpenAI, augustus 2026")}
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
                {t("0")}
              </span>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("gesprekken of persoonsgegevens deelt OpenAI met adverteerders. Je krijgt alleen totaalcijfers.")}
              </p>
              <span style={{ marginTop: "auto", fontSize: "13px", lineHeight: "1.5", color: "#5A6273" }}>
                {t("Bron: OpenAI, 2026")}
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
                {t("Eerst testen, dan beslissen")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We beginnen met 3 maanden en leggen vooraf vast wanneer het resultaat goed genoeg is om door te gaan.")}
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
                {t("Ervaring met Google en Meta")}
              </h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("We adverteren al jaren in Google en op social media. Die kennis nemen we mee naar ChatGPT.")}
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
              <h3 style={{ margin: "0", fontSize: "21px", fontWeight: "600", lineHeight: "1.3", color: "#1F246C" }}>{t("Transparant")}</h3>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.65", color: "#3A4150" }}>
                {t("Je weet precies wat je krijgt en wat het kost. Dat zie je terug in onze pakketten.")}
              </p>
              <a
                href="#pakketten"
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
                <span className="l2-txt">{t("Bekijk de pakketten")}</span>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6"></path>
                  </svg>
                </span>
              </a>
            </li>
          </ul>
          <p style={{ margin: "0", fontSize: "18px", fontWeight: "600", lineHeight: "1.6", color: "#1F246C", maxWidth: "760px" }}>
            {t("Ontdek hoe we je helpen groeien, met meer bezoekers, kwalitatieve leads en keiharde omzet.")}
          </p>
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
            {t("Onze aanpak in vijf")}{" "}
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
              style={{ position: "absolute", left: "12px", right: "11%", top: "52px", borderTop: "2px dashed rgba(255, 255, 255, 0.35)" }}
            ></div>
            <ol
              className="vc-rt"
              style={{
                position: "relative",
                margin: "0",
                padding: "0",
                listStyle: "none",
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "20px",
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
                  {t("1. Intakegesprek")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We bespreken je doelen en je klanten, en checken of jouw branche in ChatGPT mag adverteren.")}
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
                  {t("2. Onderzoek en nulmeting")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We zoeken uit welke vragen klanten stellen vóór de aankoop, en leggen vast waar je nu staat.")}
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
                  {t("3. Meting inrichten")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We zorgen dat bezoekers en aanvragen uit ChatGPT apart zichtbaar zijn, met toestemming van je bezoekers.")}
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
                  {t("4. Campagne opzetten")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("We maken advertenties per onderwerp en zetten je eerste campagnes live.")}
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
                  {t("5. Evaluatie en besluit")}
                </h3>
                <p style={{ margin: "0", maxWidth: "300px", fontSize: "16px", lineHeight: "1.6", color: "#C9CFF0" }}>
                  {t("Na 3 maanden leggen we de resultaten naast je doelen. Jij beslist: stoppen, Beheer of Groei.")}
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
            {"“The best marketing doesn’t feel like"}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {"marketing"}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 20"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "0", bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }}
              >
                <defs>
                  <linearGradient id="qAIABrush" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="#FFFFFF"></stop>
                    <stop offset="1" stopColor="#FAE84E"></stop>
                  </linearGradient>
                </defs>
                <path d="M4 9 C 60 4, 130 3, 196 7" stroke="url(#qAIABrush)" strokeWidth="7" fill="none" strokeLinecap="round"></path>
                <path
                  d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
                  stroke="url(#qAIABrush)"
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
            {"Tom Fishburne"}
          </figcaption>
        </figure>
      </section>
      <section id="pakketten" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
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
              {t("Kies jouw")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={GRAD_TEXT}>
                  {t("groeiplan.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#3A4150", fontWeight: "600" }}>
              {t("Adverteren in ChatGPT, zodat je zichtbaar bent op het moment dat klanten een vraag stellen.")}
            </p>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Begin met een")} <strong style={{ color: "#1F246C" }}>{t("test van 3 maanden")}</strong>
              {t(". Daarna kies je: stoppen, of")} <strong style={{ color: "#1F246C" }}>{t("maandelijks opzegbaar")}</strong>{" "}
              {t("verder met Beheer of Groei.")}
            </p>
          </div>
          <div className="tf-scroll" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", paddingTop: "16px" }}>
            <div className="tf-table tf-combo" data-sel={h.tfmPlan} style={{ background: "transparent", borderRadius: "24px", overflow: "visible" }}>
              <div className="tf-row tf-cardrow" style={{ display: "grid", gridTemplateColumns: COLS, alignItems: "stretch" }}>
                <div></div>
                {PLANS.map((p) => (
                  <div key={p.id} className="tf-pcell" style={{ display: "flex" }}>
                    {planCard(p)}
                  </div>
                ))}
              </div>
              {ROWS.map((r) => (
                <div key={r.k} className="tf-row" style={{ display: "grid", gridTemplateColumns: COLS, borderTop: "1px solid #E4E6EA" }}>
                  <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <strong style={{ fontSize: "15px", color: r.accent ? "#8639FA" : "#1F246C" }}>
                      {t(r.k)}
                      {r.tip && <Tip label={ta("Uitleg")}>{t(r.tip)}</Tip>}
                    </strong>
                    <span style={{ fontSize: "14px", lineHeight: "1.55", color: "#3A4150" }}>{r.d}</span>
                  </div>
                  {r.v.map((v, i) => (
                    <div key={i} className="tf-cell" data-plan={PLANS[i].id} style={cell(i)}>
                      {val(v)}
                    </div>
                  ))}
                </div>
              ))}
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
              {PLANS.map((p, pi) => (
                <div
                  key={p.id}
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
                  {planCard(p, true)}
                  {ROWS.map((r) => (
                    <div key={r.k} style={{ padding: "16px 24px", borderTop: "1px solid #E4E6EA", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {r.v[pi] === CHECK || r.v[pi] === DASH ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                          <strong style={{ fontSize: "15px", color: r.accent ? "#8639FA" : "#1F246C" }}>
                            {t(r.k)}
                            {r.tip && <Tip label={ta("Uitleg")}>{t(r.tip)}</Tip>}
                          </strong>
                          <span style={{ flexShrink: "0", display: "inline-flex" }}>
                            {val(r.v[pi], true)}
                          </span>
                        </div>
                      ) : (
                        <>
                          <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                            {t(r.k)}
                            {r.tip && <Tip label={ta("Uitleg")}>{t(r.tip)}</Tip>}
                          </strong>
                          <span style={{ fontSize: "15px", fontWeight: "700", color: "#1F246C" }}>{val(r.v[pi])}</span>
                        </>
                      )}
                      <span style={{ fontSize: "13px", lineHeight: "1.55", color: "#5A6273" }}>{r.d}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <button type="button" className="gal-btn" aria-label={ta("Vorig pakket")} onClick={h.tfmPrev} style={{ ...NAV_BTN, opacity: h.tfmPrevOp }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5"></path>
                  <path d="M11 6l-6 6 6 6"></path>
                </svg>
              </button>
              <span translate="no" aria-live="polite" style={{ minWidth: "48px", textAlign: "center", fontSize: "15px", fontWeight: "600", color: "#1F246C" }}>
                {h.tfmCounter}
              </span>
              <button type="button" className="gal-btn" aria-label={ta("Volgend pakket")} onClick={h.tfmNext} style={{ ...NAV_BTN, opacity: h.tfmNextOp }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14"></path>
                  <path d="M13 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id="roadmap" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
              {t("Stap voor stap. Steeds een onderbouwd")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={GRAD_TEXT}>
                  {t("besluit.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Ontdek wat we per fase doen, en wanneer we samen besluiten hoe het verder gaat.")}
            </p>
          </div>
          <div className="tf-table" data-sel={h.tfmPlan} style={{ background: "#FFFFFF", borderRadius: "24px", overflow: "visible" }}>
            <div className="tf-row tf-head" style={{ display: "grid", gridTemplateColumns: COLS }}>
              <div></div>
              {PLANS.map((p, i) => (
                <div key={p.id} style={{ padding: "20px 12px", textAlign: "center", background: i === sel ? "#F6F2FF" : undefined }}>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "18px", color: "#1F246C" }}>{t(p.id)}</span>
                  <span style={{ display: "block", marginTop: "4px", fontSize: "13px", color: "#5A6273" }}>{t(p.phase)}</span>
                </div>
              ))}
            </div>
            {PHASES.map((ph) => (
              <div key={ph.k} className="tf-row" style={{ display: "grid", gridTemplateColumns: COLS, borderTop: "1px solid #E4E6EA" }}>
                <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <strong style={{ fontSize: "15px", color: "#1F246C" }}>
                    {t(ph.when)}
                    <span aria-hidden="true"> {t("–")} </span>
                    <span>{t(ph.k)}</span>
                  </strong>
                  <ul className="aia-list">
                    {ph.items.map((it, ii) => (
                      <li key={ii}>
                        {it[0] && <strong>{t(it[0])}</strong>} {typeof it[1] === "string" ? t(it[1]) : it[1]}
                      </li>
                    ))}
                  </ul>
                </div>
                {ph.v.map((v, i) => (
                  <div key={i} className="tf-cell" data-plan={PLANS[i].id} style={{ ...cell(i), flexDirection: "column", gap: "8px" }}>
                    {val(v)}
                    {ph.note && i === 0 && <span style={{ fontSize: "12px", fontWeight: "600", color: "#6B2BD9" }}>{t(ph.note)}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="goed-om-te-weten" className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px 112px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
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
              {t("Goed om te")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={GRAD_TEXT}>
                  {t("weten.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Duidelijkheid vooraf, zodat je precies weet waar je aan toe bent.")}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FAQ.map((f) => (
              <details key={f.q} className="tf-faq" style={{ background: "#F2F8FE", borderRadius: "16px", padding: "0 24px" }}>
                <summary
                  style={{
                    listStyle: "none",
                    cursor: "pointer",
                    minHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1F246C",
                  }}
                >
                  {t(f.q)}
                  <svg className="tf-faq-ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6"></path>
                  </svg>
                </summary>
                {f.a.map((a, i) => (
                  <p key={i} style={{ margin: i === f.a.length - 1 ? "0 0 20px" : "0 0 12px", fontSize: "15px", lineHeight: "1.65", color: "#3A4150" }}>
                    {typeof a === "string" ? t(a) : a}
                    {f.link && i === f.a.length - 1 && (
                      <>
                        {" "}
                        <a href={href(f.link[0])} style={{ color: "#6B2BD9", fontWeight: "600" }}>
                          {t(f.link[1])}
                        </a>
                        {t(".")}
                      </>
                    )}
                  </p>
                ))}
              </details>
            ))}
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
