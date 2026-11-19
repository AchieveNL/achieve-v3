"use client";

import { Accent } from "@/components/ui/Accent";
import { useTr } from "@/i18n/I18nProvider";
import type { PageId } from "@/i18n/config";

/**
 * Overzicht van de handleidingen voor klanten. Nieuwe handleiding: kaart toevoegen aan `guides`.
 * Teksten in het Nederlands; vertalingen in src/i18n/dict/<taal>/Handleidingen.json.
 */
const guides: { page: PageId; label: string; title: string; text: string }[] = [
  {
    page: "HandleidingMeta",
    label: "Meta",
    title: "Geef ons toegang tot Meta",
    text: "Zet alles klaar voor advertenties op Facebook en Instagram en geef Achieve veilig toegang als partner.",
  },
  {
    page: "HandleidingTikTok",
    label: "TikTok",
    title: "Geef ons toegang tot TikTok",
    text: "Zet alles klaar voor advertenties op TikTok en geef Achieve veilig toegang via je Business Center.",
  },
];

export function HandleidingenContent() {
  const { t, href } = useTr();
  return (
    <div className="hl">
      <header className="hero" style={{ paddingBottom: 88 }}>
        <span className="hl-ring" style={{ width: 460, height: 460, right: -160, top: -180 }} aria-hidden="true" />
        <span className="dot" style={{ right: "20%", top: "40%", background: "#5EC0FA" }} aria-hidden="true" />
        <span className="dot" style={{ right: "32%", bottom: "22%", background: "#FAE84E", width: 6, height: 6 }} aria-hidden="true" />
        <div className="wrap">
          <div className="hero-in">
            <p className="eyebrow">{t("Voor klanten")}</p>
            <h1>
              <Accent from="#B48DFF" to="#5EC0FA">
                <span className="gt3">{t("Handleidingen.")}</span>
              </Accent>
            </h1>
            <p className="intro">{t("Korte stappenplannen voor wat je zelf regelt, zodat wij snel voor je aan de slag kunnen.")}</p>
          </div>
        </div>
      </header>
      <section className="on-light">
        <div className="wrap narrow">
          <div className="guides">
            {guides.map((g) => (
              <a className="card guide" href={href(g.page)} key={g.page}>
                <span className="lbl">{g.label}</span>
                <h3>{t(g.title)}</h3>
                <p>{t(g.text)}</p>
                <span className="x-arrow" style={{ marginTop: 8 }}>
                  <span className="l2-txt">{t("Bekijk de handleiding")}</span>{" "}
                  <span className="c" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
