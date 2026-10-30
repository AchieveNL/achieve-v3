"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

/**
 * AI Advertising: plans (Test / Beheer / Groei), the phase table and "Goed om te weten".
 * Used on the service page and on Tarieven (inTarieven: Tarieven spacing and ids).
 */
export function AIAPricing({ inTarieven = false }: { inTarieven?: boolean }) {
  const { t, ta, href } = useTr();

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

  const h = {
    tfmPlan: ["Test", "Beheer", "Groei"][tfmI],
    tfmCounter: `${tfmI + 1} / 3`,
    tfmPrevOp: tfmI === 0 ? "0.35" : "1",
    tfmNextOp: tfmI === 2 ? "0.35" : "1",
    tfmPrev: () => setTfmReq((r) => ({ i: tfmI - 1, n: r.n + 1 })),
    tfmNext: () => setTfmReq((r) => ({ i: tfmI + 1, n: r.n + 1 })),
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
      <section id={inTarieven ? undefined : "pakketten"} className={inTarieven ? "pj-wrap pj-sec tf-res1" : "pj-wrap pj-sec"} style={{ background: "#F2F8FE", padding: inTarieven ? "88px 40px 112px" : "112px 40px 112px" }}>
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
      <section id={inTarieven ? undefined : "roadmap"} className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
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
      <section id={inTarieven ? "faq" : "goed-om-te-weten"} className="pj-wrap pj-sec" style={{ background: "#FFFFFF", padding: "112px 40px 112px" }}>
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
    </>
  );
}
