"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";

/** Bedrijfsportfolio-ID van Achieve in Meta (Karim, 18 nov 2026). */
const BUSINESS_ID = "1552343925160219";
const S = "https://business.facebook.com/latest/settings/";
const STORE = "achieve-meta-stappen";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Afgevinkte stappen in de browser van de klant (localStorage), veilig als opslag ontbreekt. */
const listeners = new Set<() => void>();
function readDone(): string {
  try {
    return localStorage.getItem(STORE) || "{}";
  } catch {
    return "{}";
  }
}
function writeDone(v: Record<string, boolean>) {
  try {
    localStorage.setItem(STORE, JSON.stringify(v));
  } catch {
    /* niet bewaren */
  }
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

const Arrow = () => (
  <svg className="sa" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Info = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v5M12 16h.01" />
  </svg>
);
const Warn = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l10 18H2z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
);
const Shield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
  </svg>
);
const Plus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const L = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} {...ext}>
    <b>{children}</b>
  </a>
);

type Step = {
  title: string;
  why: string;
  skip?: ReactNode;
  path?: string[];
  open: { href: string; label: string };
  todo: ReactNode[];
  note?: { warn?: boolean; text: ReactNode };
};

export function HandleidingMetaContent() {
  const raw = useSyncExternalStore(subscribe, readDone, () => "{}");
  let done: Record<string, boolean> = {};
  try {
    done = JSON.parse(raw) || {};
  } catch {
    done = {};
  }
  const [toast, setToast] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const tt = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggle = (n: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    writeDone({ ...done, [n]: e.target.checked });
  };

  const say = (m: string) => {
    setToast(m);
    if (tt.current) clearTimeout(tt.current);
    tt.current = setTimeout(() => setToast(""), 2200);
  };
  const copy = () => {
    try {
      navigator.clipboard.writeText(BUSINESS_ID).then(
        () => say(`Gekopieerd: ${BUSINESS_ID}`),
        () => say("Kopiëren lukte niet. Selecteer het nummer en kopieer het zelf."),
      );
    } catch {
      say("Kopiëren lukte niet. Selecteer het nummer en kopieer het zelf.");
    }
  };

  const steps: Step[] = [
    {
      title: "Maak een bedrijfsportfolio aan",
      why: "Het bedrijfsportfolio (vroeger Business Manager) is de centrale plek waar je pagina, Instagram en advertenties samenkomen.",
      skip: "Heb je al een bedrijfsportfolio of Business Manager? Ga naar stap 2.",
      open: { href: "https://business.facebook.com/", label: "Open Meta Business Suite" },
      todo: [
        <>Ga naar <L href="https://business.facebook.com/">business.facebook.com</L> en log in met je persoonlijke Facebook-account.</>,
        <>Klik op <b>Account maken</b> (of <b>Bedrijfsportfolio maken</b>).</>,
        <>Vul de naam van je bedrijf, je eigen naam en je zakelijke e-mailadres in.</>,
        <>Bevestig je e-mailadres via de mail die Meta je stuurt.</>,
      ],
      note: {
        text: (
          <><b>Tip:</b> zet tweestapsverificatie aan en voeg een tweede beheerder uit je eigen bedrijf toe. Dan kom je er altijd in, ook als één account wordt geblokkeerd.</>
        ),
      },
    },
    {
      title: "Voeg je Facebook-pagina toe",
      why: "Advertenties verschijnen altijd namens een pagina. Daarom moet die in je bedrijfsportfolio staan.",
      path: ["Instellingen", "Accounts", "Pagina's"],
      open: { href: S, label: "Open Instellingen in Meta" },
      todo: [
        <>Open <L href={S}>Instellingen</L> (of klik linksonder op het <b>tandwiel</b>).</>,
        <>Ga naar <b>Accounts</b> en kies <b>Pagina&apos;s</b>.</>,
        <>Klik op <b>Toevoegen</b> en kies <b>Een bestaande Facebook-pagina toevoegen</b>.</>,
        <>Kies je pagina of typ de naam, en bevestig.</>,
      ],
      note: { text: <>Nog geen pagina? Kies dan <b>Een nieuwe Facebook-pagina maken</b> en vul naam, categorie en logo in.</> },
    },
    {
      title: "Voeg je Instagram-account toe",
      why: "Zo kunnen je advertenties ook op Instagram draaien, met je eigen naam en profielfoto.",
      path: ["Instellingen", "Accounts", "Instagram-accounts"],
      open: { href: S, label: "Open Instellingen in Meta" },
      todo: [
        <>Ga in <L href={S}>Instellingen</L> naar <b>Accounts</b> en kies <b>Instagram-accounts</b>.</>,
        <>Klik op <b>Toevoegen</b>, ga akkoord met de voorwaarden en klik op <b>Instagram-account toevoegen</b>.</>,
        <>Log in met de gegevens van het Instagram-account van je bedrijf.</>,
      ],
      note: {
        warn: true,
        text: (
          <>Je Instagram moet een <b>professioneel account</b> zijn (zakelijk of creator). Is het nog privé? Zet het om in de Instagram-app via <b>Instellingen › Accounttype en tools › Overschakelen naar professioneel account</b>.</>
        ),
      },
    },
    {
      title: "Maak een advertentieaccount aan",
      why: "Hier draaien je campagnes en hier betaal je de advertentiekosten. Het account staat op jouw naam.",
      skip: <>Heb je al een advertentieaccount? Kies bij punt 3 dan <b>&nbsp;Een advertentieaccount toevoegen</b>.</>,
      path: ["Instellingen", "Accounts", "Advertentieaccounts"],
      open: { href: S + "ad_accounts", label: "Open Advertentieaccounts in Meta" },
      todo: [
        <>Ga in <L href={S}>Instellingen</L> naar <b>Accounts</b> en kies <L href={S + "ad_accounts"}>Advertentieaccounts</L>.</>,
        <>Klik op <b>Toevoegen</b>.</>,
        <>Kies <b>Een nieuw advertentieaccount maken</b>.</>,
        <>Geef het een duidelijke naam (bijvoorbeeld je bedrijfsnaam), kies tijdzone <b>Europe/Amsterdam</b> en valuta <b>Euro (EUR)</b>.</>,
        <>Kies dat het account voor <b>je eigen bedrijf</b> is en klik op <b>Maken</b>.</>,
        <>Ga naar <b>Facturering en betalingen</b> en klik op <b>Betaalmethode toevoegen</b>.</>,
      ],
      note: { warn: true, text: <>Tijdzone en valuta kun je later <b>niet meer wijzigen</b>. Controleer ze goed voordat je op Maken klikt.</> },
    },
    {
      title: "Maak een dataset aan (de Meta-pixel)",
      why: "Met een dataset zie je wat bezoekers van je advertenties op je website doen, zoals een aankoop of aanvraag. Zo meten we wat werkt.",
      skip: "Heb je al een pixel of dataset? Ga naar stap 6.",
      path: ["Instellingen", "Gegevensbronnen", "Datasets"],
      open: { href: S, label: "Open Instellingen in Meta" },
      todo: [
        <>Ga in <L href={S}>Instellingen</L> naar <b>Gegevensbronnen</b> en kies <b>Datasets</b>.</>,
        <>Klik op <b>Toevoegen</b>, geef de dataset de naam van je bedrijf en klik op <b>Maken</b>.</>,
      ],
      note: { text: <>Meer hoef je niet te doen. Het koppelen aan je advertentieaccount en het plaatsen op je website regelen wij, zodra we toegang hebben.</> },
    },
    {
      title: "Geef Achieve toegang als partner",
      why: "De laatste stap. Je koppelt ons bedrijf aan jouw bedrijfsmiddelen, zonder dat je wachtwoorden deelt. Je kunt de toegang altijd weer intrekken.",
      path: ["Instellingen", "Gebruikers", "Partners"],
      open: { href: S + "partners", label: "Open Partners in Meta" },
      todo: [
        <>Ga in <L href={S}>Instellingen</L> naar <b>Gebruikers</b> en kies <L href={S + "partners"}>Partners</L>.</>,
        <>Klik rechtsboven op <b>Toevoegen</b> en kies <b>Een partner toegang geven tot je bedrijfsmiddelen</b>.</>,
        <>
          Vul bij <b>Bedrijfs-ID van partner</b> ons ID in: <span className="inline-id">{BUSINESS_ID}</span>{" "}
          <button type="button" className="copy-sm" onClick={copy}>kopieer</button> en klik op <b>Volgende</b>.
        </>,
        <>Kies links per soort bedrijfsmiddel en vink aan: je <b>Facebook-pagina</b>, je <b>Instagram-account</b>, je <b>advertentieaccount</b> en je <b>dataset</b>.</>,
        <>Zet bij elk bedrijfsmiddel rechts <b>Volledige controle</b> aan.</>,
        <>Klik rechtsonder op <b>Bedrijfsmiddelen toewijzen</b>.</>,
      ],
      note: {
        text: (
          <>Je geeft ons alleen toegang tot deze vier onderdelen, niet tot je hele bedrijfsportfolio. Meta past menu&apos;s soms aan; heet iets bij jou net anders, zoek dan in Instellingen op <b>Partners</b>.</>
        ),
      },
    },
  ];

  const faq: [string, ReactNode][] = [
    ["Blijf ik eigenaar van mijn pagina en advertentieaccount?", <>Ja. Alles staat in jouw bedrijfsportfolio en op jouw naam. Wij krijgen alleen toegang om voor je te werken. Wil je stoppen, dan haal je ons weg via <a href={S + "partners"} {...ext}>Instellingen › Gebruikers › Partners</a>.</>],
    ["Moet ik mijn wachtwoord met jullie delen?", "Nee, nooit. Juist daarom werkt het via een partnerkoppeling: wij loggen in met onze eigen accounts. Vraagt iemand namens ons om je wachtwoord, neem dan contact met ons op."],
    ["Ik zie “Partners” niet in mijn instellingen.", "Dan heb je waarschijnlijk geen volledige toegang tot het bedrijfsportfolio. Vraag de persoon die het beheert (bijvoorbeeld een collega of compagnon) om stap 6 te doen, of om jou volledige toegang te geven."],
    ["Mijn pagina staat al bij een ander portfolio, bijvoorbeeld van een vorig bureau.", "Een pagina kan maar in één bedrijfsportfolio staan. Vraag het vorige bureau om de pagina (en eventueel het advertentieaccount) uit hun portfolio te verwijderen, zodat jij hem kunt toevoegen. Lukt dat niet, laat het ons weten; dan kijken we samen naar de beste route."],
    ["Datasets staat grijs of ik kan geen advertentieaccount maken.", "Bij een nieuw bedrijfsportfolio zet Meta sommige functies pas na een tijdje vrij. Doe de stappen die wel lukken, geef ons toegang tot wat er al staat, en laat ons weten wat nog ontbreekt. Dan voegen we het later samen toe."],
    ["Wie betaalt de advertenties?", "De advertentiekosten betaal je rechtstreeks aan Meta, via de betaalmethode in jouw advertentieaccount. Zo zie je altijd precies wat er wordt uitgegeven."],
  ];

  const count = steps.filter((_, i) => done[i + 1]).length;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="hl">
      <header className="hero">
        <span className="hl-ring" style={{ width: 560, height: 560, right: -180, top: -200 }} aria-hidden="true" />
        <span className="hl-ring" style={{ width: 340, height: 340, right: -60, bottom: -200 }} aria-hidden="true" />
        <span className="dot" style={{ right: "22%", top: "30%", background: "#5EC0FA" }} aria-hidden="true" />
        <span className="dot" style={{ right: "12%", top: "58%", background: "#B48DFF", width: 6, height: 6 }} aria-hidden="true" />
        <span className="dot" style={{ right: "30%", bottom: "18%", background: "#FAE84E", width: 6, height: 6 }} aria-hidden="true" />
        <div className="wrap">
          <div className="hero-in">
            <p className="eyebrow">Handleiding · Facebook- en Instagram-advertenties</p>
            <h1>
              Geef ons toegang tot{" "}
              <Accent from="#B48DFF" to="#5EC0FA">
                <span className="gt3">Meta.</span>
              </Accent>
            </h1>
            <p className="intro">
              Met deze stappen zet je alles klaar om op Facebook en Instagram te adverteren, en geef je Achieve veilig toegang. Je deelt geen wachtwoorden en je blijft zelf eigenaar van alles.
            </p>
            <div className="facts">
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /></svg>
                Op je computer, niet in de app
              </span>
              <span className="fact"><Shield />Jij blijft eigenaar</span>
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                6 stappen, al gedaan sla je over
              </span>
            </div>
          </div>
        </div>
      </header>

      <nav className="progress" aria-label="Voortgang">
        <div className="wrap">
          <span className="lbl" id="hl-plbl">{count === 6 ? "Alle stappen klaar" : `${count} van 6 stappen klaar`}</span>
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={6} aria-valuenow={count} aria-labelledby="hl-plbl">
            <span style={{ width: `${(count / 6) * 100}%` }} />
          </div>
          <div className="jump">
            {steps.map((_, i) => (
              <a key={i} href={`#stap-${i + 1}`} className={done[i + 1] ? "done" : undefined}>
                {i + 1}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="on-light">
        <div className="wrap narrow">
          <div className="sec-head">
            <p className="eyebrow">Voordat je begint</p>
            <h2>
              Dit heb je <Accent><span className="gt1">nodig.</span></Accent>
            </h2>
            <p>Leg dit klaar, dan loop je de stappen in één keer door.</p>
          </div>
          <div className="need">
            {[
              ["Je eigen Facebook-account", "Meta werkt alleen met een persoonlijk account om in te loggen. Niemand ziet je profiel; het is alleen je sleutel.", <><circle key="a" cx="12" cy="8" r="4" /><path key="b" d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>],
              ["Beheer over je Facebook-pagina", "Je moet volledige controle (beheerder) hebben over de pagina van je bedrijf.", <><rect key="a" x="4" y="3" width="16" height="18" rx="3" /><path key="b" d="M8 8h8M8 12h8M8 16h5" /></>],
              ["Inloggegevens van Instagram", "Gebruikersnaam en wachtwoord van het Instagram-account van je bedrijf. Die vul je alleen zelf in bij Meta.", <><rect key="a" x="3" y="3" width="18" height="18" rx="5" /><circle key="b" cx="12" cy="12" r="4" /><path key="c" d="M17.5 6.5h.01" /></>],
              ["Een betaalmethode", "Bijvoorbeeld een creditcard of PayPal. Meta schrijft de advertentiekosten daar rechtstreeks van af.", <><rect key="a" x="2" y="5" width="20" height="14" rx="3" /><path key="b" d="M2 10h20M6 15h4" /></>],
            ].map(([h, p, ic], i) => (
              <div className="card" key={i}>
                <span className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic}</svg>
                </span>
                <div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="idbox">
            <div>
              <small>Het bedrijfs-ID van Achieve</small>
              <div className="num">{BUSINESS_ID}</div>
              <p>Dit nummer heb je nodig in stap 6.</p>
            </div>
            <button type="button" className="k4" onClick={copy}>
              Kopieer het ID
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      <section className="on-light" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <div className="sec-head">
            <p className="eyebrow">Stap voor stap</p>
            <h2>
              In zes stappen <Accent><span className="gt1">geregeld.</span></Accent>
            </h2>
            <p>
              Alles gebeurt op <a href="https://business.facebook.com/" {...ext}>business.facebook.com</a> (Meta Business Suite). Bij elke stap staat een knop die het juiste scherm in Meta opent in een nieuw tabblad. Vink een stap af als hij klaar is; deze pagina onthoudt waar je bent.
            </p>
            <div className="note" style={{ margin: "16px 0 0" }}>
              <Info />
              <span>Heb je meer dan één bedrijfsportfolio? Kies dan linksboven in Meta eerst het portfolio van je bedrijf. Kom je op een ander scherm uit, klik dan in het menu links op het onderdeel dat bij de stap staat.</span>
            </div>
          </div>

          <div className="steps">
            {steps.map((s, i) => {
              const n = i + 1;
              return (
                <article className={`step${done[n] ? " is-done" : ""}`} id={`stap-${n}`} key={n}>
                  <div className="num-big" aria-hidden="true">{pad(n)}</div>
                  <div>
                    <h3>{s.title}</h3>
                    <p className="why">{s.why}</p>
                    {s.skip && <span className="skip">{s.skip}</span>}
                    <div className="pathrow">
                      {s.path && (
                        <div className="path" aria-label="Menupad">
                          {s.path.map((p, j) => (
                            <span key={j} style={{ display: "contents" }}>
                              {j > 0 && <span className="sep">›</span>}
                              <span className="pill">{p}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      <a className="x-arrow go" href={s.open.href} {...ext}>
                        <span className="l2-txt">{s.open.label}</span>{" "}
                        <span className="c" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                        </span>
                      </a>
                    </div>
                    <ol className="do">
                      {s.todo.map((t, j) => (
                        <li key={j}>{t}</li>
                      ))}
                    </ol>
                    {s.note && (
                      <div className={`note${s.note.warn ? " warn" : ""}`}>
                        {s.note.warn ? <Warn /> : i === 0 ? <Shield /> : <Info />}
                        <span>{s.note.text}</span>
                      </div>
                    )}
                    <label className="check">
                      <input type="checkbox" checked={!!done[n]} onChange={toggle(n)} /> Stap {n} is klaar
                    </label>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="faq on-light">
        <div className="wrap narrow">
          <div className="sec-head">
            <p className="eyebrow">Lukt het niet?</p>
            <h2>
              Veelgestelde <Accent><span className="gt1">vragen.</span></Accent>
            </h2>
          </div>
          <div>
            {faq.map(([q, a], i) => (
              <div className="qa" key={i}>
                <button type="button" aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {q}
                  <span className="pl"><Plus /></span>
                </button>
                <div className="ans">
                  <div>
                    <p>{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap narrow">
          <div className="cta-box">
            <span className="hl-ring" style={{ width: 300, height: 300, right: -110, top: -130, borderColor: "rgba(255,255,255,.22)" }} aria-hidden="true" />
            <span className="hl-ring" style={{ width: 220, height: 220, left: -90, bottom: -110, borderColor: "rgba(255,255,255,.22)" }} aria-hidden="true" />
            <h2>Alles gedaan? Laat het ons weten.</h2>
            <p>Wij accepteren je verzoek en controleren of alles goed staat. Daarna gaan we voor je aan de slag.</p>
            <div className="btns">
              <a className="k4" href="mailto:info@achieve.nl?subject=Toegang%20Meta%20gegeven">
                Mail ons dat je klaar bent
                <Arrow />
              </a>
              <a className="k5" href="tel:+31854016590">
                Bel 085 401 6590
                <Arrow />
              </a>
            </div>
            <p className="small">
              Of mail naar <a href="mailto:info@achieve.nl">info@achieve.nl</a>. Op werkdagen nemen we binnen 4 uur contact met je op.
            </p>
          </div>
        </div>
      </section>

      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
