"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Accent } from "@/components/ui/Accent";
import { useTr } from "@/i18n/I18nProvider";
import { fill, rich } from "./rich";

/**
 * Shared layout of the client guides (Meta, TikTok). The content lives in a `Guide` object with Dutch
 * sentences; every sentence is looked up in the page dictionary (src/i18n/dict/<taal>/<Pagina>.json).
 * Markup inside sentences: see rich.tsx.
 */
export type GuideStep = {
  title: string;
  why: string;
  skip?: string;
  path?: string[];
  open: { link: string; label: string };
  todo: string[];
  note?: { warn?: boolean; text: string };
};

export type Guide = {
  store: string;
  id: string;
  links: Record<string, string>;
  eyebrow: string;
  brand: string;
  intro: string;
  need: [title: string, text: string, icon: ReactNode][];
  idLabel: string;
  stepsHead: string;
  stepsIntro: string;
  multiNote: string;
  steps: GuideStep[];
  faq: [q: string, a: string][];
  mailSubject: string;
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const listeners = new Set<() => void>();
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

export function GuidePage({ g }: { g: Guide }) {
  const { t } = useTr();
  const readDone = () => {
    try {
      return localStorage.getItem(g.store) || "{}";
    } catch {
      return "{}";
    }
  };
  const writeDone = (v: Record<string, boolean>) => {
    try {
      localStorage.setItem(g.store, JSON.stringify(v));
    } catch {
      /* niet bewaren */
    }
    listeners.forEach((l) => l());
  };
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
  const failed = t("Kopiëren lukte niet. Selecteer het nummer en kopieer het zelf.");
  const copy = () => {
    try {
      navigator.clipboard.writeText(g.id).then(() => say(fill(t("Gekopieerd: {id}"), { id: g.id })), () => say(failed));
    } catch {
      say(failed);
    }
  };

  const r = (s: string) =>
    rich(t(s), g.links, {
      ID: (
        <>
          <span className="inline-id">{g.id}</span>{" "}
          <button type="button" className="copy-sm" onClick={copy}>
            {t("kopieer")}
          </button>
        </>
      ),
    });

  const total = g.steps.length;
  const count = g.steps.filter((_, i) => done[i + 1]).length;
  const pad = (n: number) => String(n).padStart(2, "0");
  const mail = `mailto:info@achieve.nl?subject=${encodeURIComponent(t(g.mailSubject))}`;

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
            <p className="eyebrow">{t(g.eyebrow)}</p>
            <h1>
              {t("Geef ons toegang tot")}{" "}
              <Accent from="#B48DFF" to="#5EC0FA">
                <span className="gt3">{g.brand}</span>
              </Accent>
            </h1>
            <p className="intro">{t(g.intro)}</p>
            <div className="facts">
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18" /></svg>
                {t("Op je computer, niet in de app")}
              </span>
              <span className="fact"><Shield />{t("Jij blijft eigenaar")}</span>
              <span className="fact">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10" /></svg>
                {fill(t("{n} stappen, al gedaan sla je over"), { n: total })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <nav className="progress" aria-label={t("Voortgang")}>
        <div className="wrap">
          <span className="lbl" id="hl-plbl">
            {count === total ? t("Alle stappen klaar") : fill(t("{n} van {total} stappen klaar"), { n: count, total })}
          </span>
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={count} aria-labelledby="hl-plbl">
            <span style={{ width: `${(count / total) * 100}%` }} />
          </div>
          <div className="jump">
            {g.steps.map((_, i) => (
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
            <p className="eyebrow">{t("Voordat je begint")}</p>
            <h2>
              {t("Dit heb je")} <Accent><span className="gt1">{t("nodig.")}</span></Accent>
            </h2>
            <p>{t("Leg dit klaar, dan loop je de stappen in één keer door.")}</p>
          </div>
          <div className="need">
            {g.need.map(([h, p, ic], i) => (
              <div className="card" key={i}>
                <span className="ic">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ic}</svg>
                </span>
                <div>
                  <h3>{t(h)}</h3>
                  <p>{t(p)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="idbox">
            <div>
              <small>{t(g.idLabel)}</small>
              <div className="num">{g.id}</div>
              <p>{fill(t("Dit nummer heb je nodig in stap {n}."), { n: total })}</p>
            </div>
            <button type="button" className="k4" onClick={copy}>
              {t("Kopieer het ID")}
              <Arrow />
            </button>
          </div>
        </div>
      </section>

      <section className="on-light" style={{ paddingTop: 0 }}>
        <div className="wrap narrow">
          <div className="sec-head">
            <p className="eyebrow">{t("Stap voor stap")}</p>
            <h2>
              {t(g.stepsHead)} <Accent><span className="gt1">{t("geregeld.")}</span></Accent>
            </h2>
            <p>{r(g.stepsIntro)}</p>
            <div className="note" style={{ margin: "16px 0 0" }}>
              <Info />
              <span>{r(g.multiNote)}</span>
            </div>
          </div>

          <div className="steps">
            {g.steps.map((s, i) => {
              const n = i + 1;
              return (
                <article className={`step${done[n] ? " is-done" : ""}`} id={`stap-${n}`} key={n}>
                  <div className="num-big" aria-hidden="true">{pad(n)}</div>
                  <div>
                    <h3>{t(s.title)}</h3>
                    <p className="why">{t(s.why)}</p>
                    {s.skip && (
                      <span className="skip">
                        <span>{r(s.skip)}</span>
                      </span>
                    )}
                    <div className="pathrow">
                      {s.path && (
                        <div className="path" aria-label={t("Menupad")}>
                          {s.path.map((p, j) => (
                            <span key={j} style={{ display: "contents" }}>
                              {j > 0 && <span className="sep">›</span>}
                              <span className="pill">{t(p)}</span>
                            </span>
                          ))}
                        </div>
                      )}
                      <a className="x-arrow go" href={g.links[s.open.link]} {...ext}>
                        <span className="l2-txt">{t(s.open.label)}</span>{" "}
                        <span className="c" aria-hidden="true">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                        </span>
                      </a>
                    </div>
                    <ol className="do">
                      {s.todo.map((x, j) => (
                        <li key={j}>{r(x)}</li>
                      ))}
                    </ol>
                    {s.note && (
                      <div className={`note${s.note.warn ? " warn" : ""}`}>
                        {s.note.warn ? <Warn /> : i === 0 ? <Shield /> : <Info />}
                        <span>{r(s.note.text)}</span>
                      </div>
                    )}
                    <label className="check">
                      <input type="checkbox" checked={!!done[n]} onChange={toggle(n)} /> {fill(t("Stap {n} is klaar"), { n })}
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
            <p className="eyebrow">{t("Lukt het niet?")}</p>
            <h2>
              {t("Veelgestelde")} <Accent><span className="gt1">{t("vragen.")}</span></Accent>
            </h2>
          </div>
          <div>
            {g.faq.map(([q, a], i) => (
              <div className="qa" key={i}>
                <button type="button" aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {t(q)}
                  <span className="pl"><Plus /></span>
                </button>
                <div className="ans">
                  <div>
                    <p>{r(a)}</p>
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
            <h2>{t("Alles gedaan? Laat het ons weten.")}</h2>
            <p>{t("Wij accepteren je verzoek en controleren of alles goed staat. Daarna gaan we voor je aan de slag.")}</p>
            <div className="btns">
              <a className="k4" href={mail}>
                {t("Mail ons dat je klaar bent")}
                <Arrow />
              </a>
              <a className="k5" href="tel:+31854016590">
                {t("Bel 085 401 6590")}
                <Arrow />
              </a>
            </div>
            <p className="small">
              {rich(t("Of mail naar [info@achieve.nl](~mail). Op werkdagen nemen we binnen 4 uur contact met je op."), { mail: "mailto:info@achieve.nl" })}
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
