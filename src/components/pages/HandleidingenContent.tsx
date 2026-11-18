import { Accent } from "@/components/ui/Accent";
import { pathFor } from "@/i18n/config";

/** Overzicht van de handleidingen voor klanten. Nieuwe handleiding: kaart toevoegen aan `guides`. */
const guides = [
  {
    href: pathFor("nl", "HandleidingMeta"),
    label: "Meta",
    title: "Geef ons toegang tot Meta",
    text: "Zet alles klaar voor advertenties op Facebook en Instagram en geef Achieve veilig toegang als partner.",
  },
];

export function HandleidingenContent() {
  return (
    <div className="hl">
      <header className="hero" style={{ paddingBottom: 88 }}>
        <span className="hl-ring" style={{ width: 460, height: 460, right: -160, top: -180 }} aria-hidden="true" />
        <span className="dot" style={{ right: "20%", top: "40%", background: "#5EC0FA" }} aria-hidden="true" />
        <span className="dot" style={{ right: "32%", bottom: "22%", background: "#FAE84E", width: 6, height: 6 }} aria-hidden="true" />
        <div className="wrap">
          <div className="hero-in">
            <p className="eyebrow">Voor klanten</p>
            <h1>
              <Accent from="#B48DFF" to="#5EC0FA">
                <span className="gt3">Handleidingen.</span>
              </Accent>
            </h1>
            <p className="intro">Korte stappenplannen voor wat je zelf regelt, zodat wij snel voor je aan de slag kunnen.</p>
          </div>
        </div>
      </header>
      <section className="on-light">
        <div className="wrap narrow">
          <div className="guides">
            {guides.map((g) => (
              <a className="card guide" href={g.href} key={g.href}>
                <span className="lbl">{g.label}</span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="x-arrow" style={{ marginTop: 8 }}>
                  <span className="l2-txt">Bekijk de handleiding</span>{" "}
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
