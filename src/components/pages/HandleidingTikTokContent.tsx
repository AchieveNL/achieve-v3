"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";

/** Business Center-ID van Achieve in TikTok. Leeg = placeholder op de pagina (nog aan te leveren door Karim). */
const BUSINESS_ID = "";
const SHOW_ID = BUSINESS_ID || "[Business Center-ID Achieve]";
const BC = "https://business.tiktok.com/";
const STORE = "achieve-tiktok-stappen";
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

export function HandleidingTikTokContent() {
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
    if (!BUSINESS_ID) {
      say("Het ID wordt nog ingevuld door Achieve.");
      return;
    }
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
      title: "Maak een TikTok Business Center aan",
      why: "Het Business Center is de centrale plek waar je TikTok-account, advertentieaccount en pixel samenkomen, en waar je bepaalt wie erbij mag.",
      skip: "Heb je al een Business Center? Ga naar stap 2.",
      open: { href: BC, label: "Open TikTok Business Center" },
      todo: [
        <>Ga naar <L href={BC}>business.tiktok.com</L> en log in met je TikTok for Business-account. Nog geen account? Klik op <b>Sign up</b> en maak er een aan met je zakelijke e-mailadres.</>,
        <>Klik op <b>Create</b> (Business Center maken) en vul de naam van je bedrijf in, zoals die ook op je facturen staat.</>,
        <>Kies tijdzone <b>Amsterdam</b> en bevestig. Je bent nu automatisch beheerder (Admin).</>,
      ],
      note: {
        text: (
          <><b>Tip:</b> zet tweestapsverificatie aan en voeg een tweede beheerder uit je eigen bedrijf toe. Dan kom je er altijd in, ook als één account niet werkt.</>
        ),
      },
    },
    {
      title: "Maak een advertentieaccount aan",
      why: "Hier draaien je campagnes en hier betaal je de advertentiekosten. Het account staat op jouw naam.",
      skip: <>Adverteer je al op TikTok? Kies bij punt 3 dan <b>&nbsp;Transfer</b> om je bestaande account naar je Business Center te halen.</>,
      path: ["Accounts", "Advertiser accounts"],
      open: { href: BC, label: "Open TikTok Business Center" },
      todo: [
        <>Klik in het menu links op <b>Accounts</b> en kies <b>Advertiser accounts</b>.</>,
        <>Klik op <b>Add advertiser account</b>.</>,
        <>Kies <b>Create new</b> en klik op <b>Next</b>.</>,
        <>Vul de naam van je bedrijf in, kies land <b>Nederland</b>, tijdzone <b>Amsterdam</b> en valuta <b>Euro (EUR)</b>, en bevestig.</>,
        <>Open het advertentieaccount en voeg onder <b>Payment</b> een betaalmethode toe.</>,
      ],
      note: { warn: true, text: <>Land, tijdzone en valuta kun je later <b>niet meer wijzigen</b>. Controleer ze goed voordat je bevestigt.</> },
    },
    {
      title: "Koppel je TikTok-account",
      why: "Zo verschijnen je advertenties met de naam en profielfoto van je eigen TikTok-account, en kunnen we bestaande video's als advertentie inzetten.",
      path: ["Accounts", "TikTok accounts"],
      open: { href: BC, label: "Open TikTok Business Center" },
      todo: [
        <>Klik in het menu links op <b>Accounts</b> en kies <b>TikTok accounts</b>.</>,
        <>Klik op <b>Add a TikTok account</b> en kies <b>Link an existing TikTok account</b>.</>,
        <>Kies <b>Send a QR code</b> en klik op <b>Next</b>.</>,
        <>Scan de QR-code met de TikTok-app op je telefoon, ingelogd op het account van je bedrijf, en keur het verzoek goed.</>,
      ],
      note: { text: <>Nog geen TikTok-account voor je bedrijf? Maak er eerst een aan in de TikTok-app en kom dan terug naar deze stap.</> },
    },
    {
      title: "Geef Achieve toegang als partner",
      why: "De laatste stap. Je koppelt ons Business Center aan jouw account, zonder dat je wachtwoorden deelt. Je kunt de toegang altijd weer intrekken.",
      path: ["Partners", "Add partner"],
      open: { href: BC, label: "Open TikTok Business Center" },
      todo: [
        <>Klik in het menu links op <b>Partners</b> (soms onder <b>Users</b>) en klik op <b>Add partner</b>.</>,
        <>
          Vul ons Business Center-ID in: <span className="inline-id">{SHOW_ID}</span>{" "}
          <button type="button" className="copy-sm" onClick={copy}>kopieer</button> en klik op <b>Next</b>.
        </>,
        <>TikTok vraagt of dit bureau je advertenties beheert. Kies <b>Yes</b>.</>,
        <>Kies je <b>advertentieaccount</b> en geef het de rol <b>Admin</b>. Kies ook je <b>TikTok-account</b>.</>,
        <>Klik op <b>Confirm</b>.</>,
      ],
      note: {
        text: (
          <>Je geeft ons alleen toegang tot deze onderdelen, niet tot je hele Business Center. TikTok toont de menu&apos;s vaak in het Engels; heet iets bij jou net anders, kijk dan in het menu links.</>
        ),
      },
    },
  ];

  const faq: [string, ReactNode][] = [
    ["Blijf ik eigenaar van mijn TikTok-account en advertentieaccount?", "Ja. Alles staat in jouw Business Center en op jouw naam. Wij krijgen alleen toegang om voor je te werken. Wil je stoppen, dan haal je ons weg via Partners in je Business Center."],
    ["Moet ik mijn wachtwoord met jullie delen?", "Nee, nooit. Juist daarom werkt het via een partnerkoppeling: wij loggen in met onze eigen accounts. Vraagt iemand namens ons om je wachtwoord, neem dan contact met ons op."],
    ["En de TikTok-pixel?", "Die hoef je niet zelf aan te maken. Wij maken hem aan in jouw advertentieaccount, zodat hij van jou blijft, en zetten hem samen met je op je website."],
    ["Ik zie \u201cPartners\u201d niet.", "Dan ben je waarschijnlijk geen beheerder (Admin) van het Business Center. Vraag de persoon die het beheert om stap 4 te doen, of om jou beheerder te maken."],
    ["Mijn advertentieaccount staat al bij een ander Business Center, bijvoorbeeld van een vorig bureau.", "Een advertentieaccount kan maar in één Business Center staan. Vraag het vorige bureau om het account vrij te geven, zodat jij het met Transfer naar je eigen Business Center haalt. Lukt dat niet, laat het ons weten; dan kijken we samen naar de beste route."],
    ["Wie betaalt de advertenties?", "De advertentiekosten betaal je rechtstreeks aan TikTok, via de betaalmethode in jouw advertentieaccount. Zo zie je altijd precies wat er wordt uitgegeven."],
  ];

  const count = steps.filter((_, i) => done[i + 1]).length;
  const total = steps.length;
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
            <p className="eyebrow">Handleiding · TikTok-advertenties</p>
            <h1>
              Geef ons toegang tot{" "}
              <Accent from="#B48DFF" to="#5EC0FA">
                <span className="gt3">TikTok.</span>
              </Accent>
            </h1>
            <p className="intro">
              Met deze stappen zet je alles klaar om op TikTok te adverteren, en geef je Achieve veilig toegang. Je deelt geen wachtwoorden en je blijft zelf eigenaar van alles.
            </p>
            <div className="facts">
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /></svg>
                Op je computer, niet in de app
              </span>
              <span className="fact"><Shield />Jij blijft eigenaar</span>
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                4 stappen, al gedaan sla je over
              </span>
            </div>
          </div>
        </div>
      </header>

      <nav className="progress" aria-label="Voortgang">
        <div className="wrap">
          <span className="lbl" id="hl-plbl">{count === total ? "Alle stappen klaar" : `${count} van ${total} stappen klaar`}</span>
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count} aria-labelledby="hl-plbl">
            <span style={{ width: `${(count / total) * 100}%` }} />
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
              ["Een TikTok for Business-account", "Daarmee log je in op het Business Center. Heb je er nog geen, dan maak je die in stap 1 aan met je zakelijke e-mailadres.", <><circle key="a" cx="12" cy="8" r="4" /><path key="b" d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>],
              ["Het TikTok-account van je bedrijf", "Op je telefoon, ingelogd in de TikTok-app. Je scant er in stap 3 een QR-code mee.", <><rect key="a" x="7" y="2" width="10" height="20" rx="3" /><path key="b" d="M11 18h2" /></>],
              ["Je bedrijfsgegevens", "Bedrijfsnaam zoals op je facturen, en eventueel je KvK-nummer. TikTok kan erom vragen bij het advertentieaccount.", <><rect key="a" x="4" y="3" width="16" height="18" rx="3" /><path key="b" d="M8 8h8M8 12h8M8 16h5" /></>],
              ["Een betaalmethode", "Bijvoorbeeld een creditcard of PayPal. TikTok schrijft de advertentiekosten daar rechtstreeks van af.", <><rect key="a" x="2" y="5" width="20" height="14" rx="3" /><path key="b" d="M2 10h20M6 15h4" /></>],
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
              <small>Het Business Center-ID van Achieve</small>
              <div className="num">{SHOW_ID}</div>
              <p>Dit nummer heb je nodig in stap 4.</p>
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
              In vier stappen <Accent><span className="gt1">geregeld.</span></Accent>
            </h2>
            <p>
              Alles gebeurt op <a href={BC} {...ext}>business.tiktok.com</a> (TikTok Business Center). Bij elke stap staat een knop die het Business Center opent in een nieuw tabblad. Vink een stap af als hij klaar is; deze pagina onthoudt waar je bent.
            </p>
            <div className="note" style={{ margin: "16px 0 0" }}>
              <Info />
              <span>Heb je meer dan één Business Center? Kies dan eerst het Business Center van je bedrijf. Doe de stappen op je computer; alleen de QR-code in stap 3 scan je met je telefoon.</span>
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
              <a className="k4" href="mailto:info@achieve.nl?subject=Toegang%20TikTok%20gegeven">
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
