"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";

export function VoorwaardenContent() {
  const { t, ta, href } = useTr();

  const { locale } = useTr();
  const h = {
    notNL: locale !== "nl",
  };
  return (
    <>
      <section className="ty-wrap ty-hero" style={{ background: "#F2F8FE", padding: "64px 40px 72px" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8639FA",
            }}
          >
            {t("Juridisch")}
          </p>
          <h1
            style={{
              margin: "0",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(38px, 5vw, 60px)",
              lineHeight: "1.02",
              letterSpacing: "-0.025em",
              color: "#1F246C",
            }}
          >
            {t("Algemene")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("voorwaarden.")}</span>
            </Accent>
          </h1>
          <nav
            aria-label={ta("Juridische pagina's")}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", paddingTop: "12px" }}
          >
            <a
              href={href("Privacy")}
              className="lg-tab"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "44px",
                padding: "0 20px",
                borderRadius: "999px",
                background: "#FFFFFF",
                border: "1px solid #D5DAE3",
                color: "#1F246C",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              {t("Privacyverklaring")}
            </a>
            <a
              href={href("Voorwaarden")}
              aria-current="page"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "44px",
                padding: "0 20px",
                borderRadius: "999px",
                background: "#1F246C",
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              {t("Algemene voorwaarden")}
            </a>
            <a
              href={href("Disclaimer")}
              className="lg-tab"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "44px",
                padding: "0 20px",
                borderRadius: "999px",
                background: "#FFFFFF",
                border: "1px solid #D5DAE3",
                color: "#1F246C",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "15px",
              }}
            >
              {t("Disclaimer")}
            </a>
          </nav>
        </div>
      </section>
      <section className="ty-wrap" style={{ padding: "72px 40px 96px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          {h.notNL && (
            <>
              <p
                style={{
                  margin: "0 0 8px",
                  padding: "16px 20px",
                  borderRadius: "16px",
                  background: "#FFF6C7",
                  color: "#6E5A00",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                {t("Deze tekst is alleen beschikbaar in het Nederlands.")}
              </p>
            </>
          )}
          <p style={{ margin: "0", fontSize: "15px", color: "#5A6273" }}>{t("Klik op een artikel om het te openen.")}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <details
              className="lg-acc"
              id="artikel-1-definities"
              open
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 1")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Definities")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                  {t("In de navolgende bepalingen wordt verstaan onder:")}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("1.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>{t("Achieve: een eenmanszaak")}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve, kantoorhoudende te Cypresbaan 3, 2908 LT Capelle aan den IJssel, Nederland en ingeschreven bij de Kamer van Koophandel onder dossiernummer 76815889.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("1.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtgever: de natuurlijke of rechtspersoon die handelt in de uitoefening van beroep of bedrijf en die met Achieve een overeenkomst heeft afgesloten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("1.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Algemene Voorwaarden: het geheel van de bepalingen als hierna opgenomen.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("1.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Overeenkomst: elke wederzijdse acceptatie, telefonisch, schriftelijk of per e-mail bevestigd, van levering van één of meer producten of diensten van Achieve.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-2-toepasselijkheid"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 2")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Toepasselijkheid")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Deze Voorwaarden zijn van toepassing op alle overeenkomsten die tussen Achieve en een Opdrachtgever gesloten worden, alsmede op iedere in dat kader door een Opdrachtgever aan Achieve verstrekte opdracht.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Voor zover daarvan in onderlinge overeenstemming tussen partijen niet schriftelijk is afgeweken, zijn onderstaande artikelen in deze Algemene Voorwaarden van toepassing op elke aanbieding, offerte, opdracht of overeenkomst van of met Achieve.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De onderhavige voorwaarden zijn eveneens van toepassing op overeenkomsten met Achieve voor de uitvoering waarvan door Achieve derden dienen te worden betrokken.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Eventuele inkoop- of andere voorwaarden van opdrachtgever c.q. derden zijn voor Achieve niet bindend en de toepasselijkheid van dergelijke voorwaarden wordt uitdrukkelijk uitgesloten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Door het verstrekken van een opdracht - het zij telefonisch hetzij schriftelijk - erkent de opdrachtgever van de inhoud van deze Algemene Voorwaarden op de hoogte te zijn en verklaart hij zich daarmee akkoord, indien en voor zover het bestaan van deze Algemene Voorwaarden tevoren aan hem is medegedeeld of indien er bij de offerte en/of bij de telefonische of schriftelijke orderbevestiging naar werd verwezen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien één of meerdere bepalingen in deze Algemene Voorwaarden op enig moment geheel of gedeeltelijk nietig zijn of vernietigd mochten worden, dan blijft het overige in deze Algemene Voorwaarden bepaalde volledig van toepassing. Achieve en de Opdrachtgever zullen alsdan in overleg treden teneinde nieuwe bepalingen ter vervanging van de nietige of vernietigde bepalingen overeen te komen, waarbij zoveel als mogelijk het doel en de strekking van de oorspronkelijke bepalingen in acht wordt genomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien onduidelijkheid bestaat omtrent de uitleg van één of meerdere bepalingen van deze Algemene Voorwaarden, dan dient de uitleg plaats te vinden 'naar de geest' van deze bepalingen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.8")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien zich tussen partijen een situatie voordoet die niet in deze Algemene Voorwaarden geregeld is, dan dient deze situatie te worden beoordeeld naar de geest van deze Algemene Voorwaarden.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("2.9")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Achieve niet steeds strikte naleving van deze Voorwaarden verlangt, betekent dit niet, dat de bepalingen daarvan niet van toepassing zijn, of dat Achieve in enigerlei mate het recht zou verliezen om in andere gevallen de stipte naleving van de bepalingen van deze voorwaarden te verlangen.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-3-offertes-en-aanbiedingen"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 3")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Offertes en aanbiedingen")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Alle offertes en aanbiedingen van Achieve hebben een geldigheidsduur van 30 dagen, tenzij in de offerte een ander termijn voor aanvaarding is gesteld.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien blijkt dat de bij de aanvraag of overeenkomst door Opdrachtgever verstrekte gegevens onjuist waren heeft Achieve het recht de prijzen hierover aan te passen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve kan niet aan haar offertes of aanbiedingen worden gehouden indien de Opdrachtgever redelijkerwijs kan begrijpen dat de offertes of aanbiedingen, dan wel een onderdeel daarvan, een kennelijke vergissing of verschrijving bevat.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De in een offerte of aanbieding vermelde prijzen zijn exclusief BTW en andere heffingen van overheidswege, eventuele in het kader van de overeenkomst te maken kosten, daaronder begrepen reis- en verblijf-, verzend- en administratiekosten, tenzij anders aangegeven.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de aanvaarding (al dan niet op ondergeschikte punten) afwijkt van het in de offerte of de aanbieding opgenomen aanbod dan is Achieve daaraan niet gebonden. De Overeenkomst komt dan niet overeenkomstig deze afwijkende aanvaarding tot stand, tenzij Achieve anders aangeeft.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("3.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Een samengestelde prijsopgave verplicht Achieve niet tot het verrichten van een gedeelte van de opdracht tegen een overeenkomstig gedeelte van de opgegeven prijs. Aanbiedingen of offertes gelden niet automatisch voor toekomstige orders.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-4-totstandkoming-en-uitvoering-van-de-ov"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 4")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Totstandkoming en uitvoering van de overeenkomst")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("4.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Een overeenkomst komt tot stand op het moment dat:")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Indien een opdracht tot uitvoering van onze diensten telefonisch wordt verleend:")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtgever, na de initieel aan de afdeling Verkoop telefonisch verstrekte opdracht tot uitvoering van onze diensten, in een daarop volgend bevestigingsgesprek van Achieve nogmaals nadrukkelijk telefonisch akkoord voor uitvoering van deze opdracht geeft, welk gesprek, met toestemming van opdrachtgever, als bewijs van opdrachtverstrekking als geluidsopname digitaal wordt opgenomen en opgeslagen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Indien een opdracht tot uitvoering van onze diensten schriftelijk wordt verleend:")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "opdrachtgever een bestelformulier heeft ingevuld en/of zijn akkoord heeft opgestuurd middels e-mail, website, post of fax en de ontvangst en acceptatie van zijn akkoord en daarmee de opdracht door Achieve telefonisch dan wel per e-mail aan opdrachtgever is bevestigd.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("4.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve heeft het recht bepaalde werkzaamheden te laten verrichten door derden. De toepasselijkheid van de artikelen 7:404, 7:407 lid 2 en 7:409 BW wordt uitdrukkelijk uitgesloten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("4.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve is gerechtigd de overeenkomst in verschillende fasen uit te voeren en het aldus uitgevoerde gedeelte afzonderlijk te factureren.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("4.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de overeenkomst in fasen wordt uitgevoerd kan Achieve de uitvoering van die onderdelen die tot een volgende fase behoren opschorten totdat de Opdrachtgever de resultaten van de daaraan voorafgaande fase schriftelijk heeft goedgekeurd.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("4.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever draagt er zorg voor dat alle gegevens, waarvan Achieve aangeeft dat deze noodzakelijk zijn of waarvan de Opdrachtgever redelijkerwijs behoort te begrijpen dat deze noodzakelijk zijn voor het uitvoeren van de overeenkomst, tijdig aan Achieve worden verstrekt.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-5-duur-beeindiging-en-annulering"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 5")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Duur, beëindiging en annulering")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Overeenkomst gaat in per besteldatum van de dienst door Opdrachtgever en wordt aangegaan voor de minimumduur van 3 maanden na factuurdatum, tenzij nadrukkelijk anders afgesproken.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Tenzij schriftelijk anders overeengekomen, is de Overeenkomst na het verstrijken van deze termijn maandelijks opzegbaar. De Overeenkomst kan ten alle tijden worden opgezegd, daarbij moet in acht worden genomen dat de minimumduur van het contract wel wordt voltooid. Daarbij wordt een opzegtermijn van één maand gehanteerd. Restitutie over al vooruit betaalde jaarkosten is niet mogelijk.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Na akkoord is annulering niet meer toegestaan en is de Opdrachtgever verplicht zich te houden aan alle in de Overeenkomst gemaakte afspraken.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Achieve is bevoegd de Overeenkomst te ontbinden indien:")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("de Opdrachtgever de verplichtingen uit de Overeenkomst niet, niet volledig of niet tijdig nakomt")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "na het sluiten van de Overeenkomst Achieve ter kennis gekomen omstandigheden goede grond geven te vrezen dat de Opdrachtgever de verplichtingen niet zal nakomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "de Opdrachtgever bij het sluiten van de Overeenkomst verzocht is om zekerheid te stellen voor de voldoening van zijn verplichtingen uit de Overeenkomst en deze zekerheid uitblijft of onvoldoende is;",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "door vertraging aan de zijde van de Opdrachtgever niet langer van Achieve kan worden gevergd dat hij de Overeenkomst tegen de oorspronkelijk overeengekomen condities zal nakomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Voorts is Achieve bevoegd de Overeenkomst te ontbinden indien zich omstandigheden voordoen welke van dien aard zijn dat nakoming van de Overeenkomst onmogelijk is of indien er zich anderszins omstandigheden voordoen die van dien aard zijn dat ongewijzigde instandhouding van de Overeenkomst in redelijkheid niet van Achieve kan worden gevergd.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de Overeenkomst wordt ontbonden zijn de vorderingen van Achieve op de Opdrachtgever onmiddellijk opeisbaar.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Achieve tot ontbinding overgaat, is zij op generlei wijze gehouden tot vergoeding van schade en kosten daardoor op enigerlei wijze ontstaan.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.8")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de ontbinding aan de Opdrachtgever toerekenbaar is, is Achieve gerechtigd tot vergoeding van de schade, daaronder begrepen de kosten, daardoor direct en indirect ontstaan.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.9")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de Opdrachtgever zijn uit de Overeenkomst voortvloeiende verplichtingen niet nakomt en deze niet-nakoming ontbinding rechtvaardigt, dan is Achieve gerechtigd de Overeenkomst terstond en met directe ingang te ontbinden zonder enige verplichting zijnerzijds tot betaling van enige schadevergoeding of schadeloosstelling, terwijl de Opdrachtgever, uit hoofde van wanprestatie, wél tot schadevergoeding of schadeloosstelling is verplicht.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.10")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien de Overeenkomst tussentijds wordt opgezegd door Achieve, zal Achieve in overleg met de Opdrachtgever zorgdragen voor overdracht van nog te verrichten werkzaamheden aan derden. Dit tenzij de opzegging aan de Opdrachtgever toerekenbaar is. Indien de overdracht van de werkzaamheden voor Achieve extra kosten met zich meebrengt, dan worden deze aan de Opdrachtgever in rekening gebracht. De Opdrachtgever is gehouden deze kosten binnen de daarvoor genoemde termijn te voldoen, tenzij Achieve anders aangeeft.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("5.11")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Onverminderd hetgeen in de voorgaande leden is bepaald, is Achieve gerechtigd de Overeenkomst zonder ingebrekestelling of gerechtelijke tussenkomst met onmiddellijke ingang te ontbinden indien:",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever in staat van faillissement is verklaard, surseance van betaling heeft aangevraagd of verkregen of anderszins het vrije beheer of zijn vermogen heeft verloren.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "de Opdrachtgever oneigenlijk gebruik maakt van de door Achieve aangeboden producten en diensten, als het opslaan en/of verspreiden van mp3, warez of het versturen van ongevraagde e-mail (SPAM).",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("de Opdrachtgever informatie verspreidt die in strijd is met (inter)nationale wet- en regelgeving.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("de Opdrachtgever informatie verspreidt die in strijd is met de algemeen aanvaarde normen en waarden.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "de Opdrachtgever informatie verspreidt die discriminerend is ten aanzien van uiterlijk, ras, religie, geslacht, cultuur, afkomst of anderszins kwetsend genoemd kan worden.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-6-werkzaamheden-google-ads"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 6")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Werkzaamheden Google Ads")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Een deel van de werkzaamheden van de campagnemanager bestaat uit het monitoren van de campagne en het analyseren van data. Een ander deel van de werkzaamheden is terug te vinden in de wijzigingsgeschiedenis van het Google Ads-account.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Opdrachtgever zijn campagne/account wilt opschorten dan wel geen budget heeft, loopt de managementfee door onafhankelijk van de vraag of de campagne wel of niet aanstaat.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px 18px minmax(0, 1fr)", gap: "8px" }}>
                  <span></span>
                  <span
                    aria-hidden="true"
                    style={{ width: "6px", height: "6px", marginTop: "12px", borderRadius: "999px", background: "#8639FA" }}
                  ></span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Opdrachtnemer een account opzet waarbij Opdrachtnemer ook het budget betaalt, blijft dit eigendom van Opdrachtnemer; het kan ook na beëindiging van het contract niet worden overgedragen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Opdrachtnemer in opdracht van Opdrachtgever een account aanmaakt en Opdrachtgever rechtstreeks met Google afrekent, wordt Opdrachtgever eigenaar van het account.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtgever blijft zelf verantwoordelijk voor de volledige SEA-campagne, waaronder gebruikte zoekwoorden en teksten van advertenties.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtnemer kan niet aansprakelijk gesteld worden voor afgekeurde advertentieteksten, gederfde omzet voor het niet live staan van een campagne, vermindering van conversies dan wel van website-/webshop-omzet of voor andere negatieve gevolgen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Google Ads is een advertentieprogramma van Google en niet van Opdrachtnemer. Deze onderhoudt en optimaliseert een campagne zo goed mogelijk maar is hierbij altijd afhankelijk van hoe dit programma zich gedraagt. Opdrachtgever dient zich te houden aan de regelgeving van Google Ads.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Posities met Google Ads ontstaan op basis van een biedsysteem, waardoor Opdrachtnemer nooit garanties op bepaalde posities kan geven.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.8")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Het is Opdrachtgever niet toegestaan gedurende de contractsduur te adverteren of te laten adverteren op zoekmachines waarop Opdrachtnemer een campagne voor Opdrachtgever heeft lopen met advertenties die linken naar dezelfde website(s) als de advertenties die Opdrachtnemer voor Opdrachtgever geplaatst heeft.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.9")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Het uitvoeren van werkzaamheden door een derde (webbouwer) of door Opdrachtgever zelf aan de website ten gunste van de SEA-campagne (plaatsen van scripts ten behoeve van meten conversies, Analytics, etc.) gebeurt onder verantwoordelijkheid van Opdrachtgever en niet die van Opdrachtnemer. Opdrachtnemer is niet verantwoordelijk voor het missen van data als een script niet (goed) geplaatst is door Opdrachtgever/webbouwer of externe partij.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.10")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtnemer is niet aansprakelijk indien bepaalde Google Ads-functionaliteiten niet in werking gesteld kunnen worden vanwege beperkingen van de website/het cms dan wel vanwege de beperking van de producten van de Opdrachtgever (zoals bij producten zonder EAN-nummers).",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("6.11")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtnemer is niet aansprakelijk voor de (negatieve) gevolgen met betrekking tot de campagne of de resultaten, indien die gevolgen veroorzaakt worden door aanpassingen op de website of Google Ads campagne door Opdrachtgever en/of derden.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-7-meerwerk"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 7")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Meerwerk")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("7.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien tijdens de uitvoering van de Overeenkomst blijkt, dat het voor een behoorlijke uitvoering noodzakelijk is om de te verrichten werkzaamheden te wijzigen of aan te vullen, zullen partijen tijdig en in onderling overleg de Overeenkomst dienovereenkomstig aanpassen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("7.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien partijen overeenkomen dat de Overeenkomst wordt gewijzigd of aangevuld, kan het tijdstip van voltooiing van de uitvoering daardoor worden beïnvloed. Achieve zal Opdrachtgever zo spoedig mogelijk hiervan op de hoogte stellen.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-8-beschikbaarheid-en-beheer-van-de-diens"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 8")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Beschikbaarheid en beheer van de dienst")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve zal zich jegens de Opdrachtgever inspannen om de beschikbaarheid en bruikbaarheid van de diensten zo groot mogelijk te laten zijn.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve zal eventuele storingen zo snel mogelijk (laten) verhelpen. Achieve kan geen onbelemmerde toegang tot haar producten en diensten garanderen, noch dat te allen tijde gebruik gemaakt kan worden van de overige door Achieve geleverde diensten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve is in het geheel niet aansprakelijk voor vermissing, verwisseling, of beschadiging van gegevens door het gebruik van de diensten, daaronder begrepen via het netwerk van Achieve verzonden (e-mail) berichten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever zal geen toegang tot de diensten kunnen verkrijgen op tijdstippen dat onderhoud- en/of reparatiewerkzaamheden aan de diensten moeten worden verricht. Achieve zal zich inspannen deze werkzaamheden te laten plaatsvinden op tijden dat de Opdrachtgever daarvan de minste hinder ondervindt.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve is met het oog op het behoud en/of verbetering van de kwaliteit en veiligheid van de diensten, gerechtigd in haar apparatuur, programmatuur alsmede in haar wijze van dienstverlening, wijzigingen aan te brengen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve spant zich in om de gegevens die Opdrachtgever opslaat op de apparatuur van Achieve zodanig te beveiligen dat deze gegevens niet beschikbaar zijn voor onbevoegde personen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("8.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Zonder toestemming van Achieve is het Opdrachtgever verboden de door Achieve verschafte gebruikersnaam of gebruikersnamen en wachtwoord of wachtwoorden aan derden over te dragen.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-9-aansprakelijkheid"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 9")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Aansprakelijkheid")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve aanvaardt geen enkele aansprakelijkheid voortvloeiende uit de buitengebruikstelling als gesteld in lid 4 van artikel 8.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve kan niet aansprakelijk gesteld worden voor schade in welke vorm dan ook veroorzaakt door het verzenden van vertrouwelijke of geheime informatie. Achieve is niet aansprakelijk voor beveiliging of misbruik door derden van gegevens die worden verzonden of ontvangen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve kan niet aansprakelijk worden gesteld voor het op enigerwijs verloren gaan van digitaal opgeslagen informatie. Achieve behoudt zich het recht voor van haar Opdrachtgevers te verwachten dat digitaal opgeslagen informatie op een deugdelijke wijze en recentelijk voorafgaand aan de overeengekomen werkzaamheden hebben opgeslagen op een duplicaat.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Wijzigingen in de gegevens van opdrachtgever dient opdrachtgever schriftelijk mede te delen aan Achieve. Als opdrachtgever dit niet doet, is opdrachtgever aansprakelijk voor eventuele schade die Achieve als gevolg daarvan lijdt.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtgever verklaart door het aanleveren van tekst- en/of beeldmateriaal aan Achieve, dat al het door Opdrachtgever aan Achieve verstrekte materiaal vrij is van rechten van derden, dan wel dat Opdrachtgever toestemming heeft van de rechthebbende(n) om het materiaal door Achieve te laten gebruiken bij de uitvoering van de opdracht.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Achieve, onverminderd het voorgaande, aansprakelijk mocht zijn, dan is deze aansprakelijkheid beperkt tot hetgeen in de leden 7 tot en met 11 van dit artikel is geregeld, een en ander behoudens schade die te wijten is aan opzet of grove schuld aan de zijde van Achieve.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve is niet aansprakelijk voor schade, van welke aard ook, ontstaan doordat Achieve is uitgegaan van door of namens de Opdrachtgever verstrekte onjuiste en/of onvolledige gegevens.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.8")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Achieve aansprakelijk mocht zijn voor enigerlei schade, dan is de aansprakelijkheid van Achieve beperkt tot maximaal eenmaal de factuurwaarde van de order, althans tot dat gedeelte van de order waarop de aansprakelijkheid betrekking heeft.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.9")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De aansprakelijkheid van Achieve is in ieder geval steeds beperkt tot het bedrag der uitkering van zijn verzekeraar in voorkomend geval.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.10")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Achieve is uitsluitend aansprakelijk voor directe schade.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("9.11")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Onder directe schade wordt uitsluitend verstaan de redelijke kosten ter vaststelling van de oorzaak en de omvang van de schade, voor zover de vaststelling betrekking heeft op schade in de zin van deze voorwaarden, de eventuele redelijke kosten gemaakt om de gebrekkige prestatie van Achieve aan de overeenkomst te laten beantwoorden, voor zoveel deze aan Achieve toegerekend kunnen worden en redelijke kosten, gemaakt ter voorkoming of beperking van schade, voor zover de Opdrachtgever aantoont dat deze kosten hebben geleid tot beperking van directe schade als bedoeld in deze algemene voorwaarden. Achieve is nimmer aansprakelijk voor indirecte schade, daaronder begrepen gevolgschade, gederfde winst, gemiste besparingen en schade door bedrijfsstagnatie.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-10-vrijwaring"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 10")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Vrijwaring")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("10.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever vrijwaart Achieve voor eventuele aanspraken van derden, die in verband met de uitvoering van de Overeenkomst schade lijden en waarvan de oorzaak aan andere dan aan Achieve toerekenbaar is. Indien Achieve uit dien hoofde door derden mocht worden aangesproken, dan is de Opdrachtgever gehouden Achieve zowel buiten als in rechte bij te staan en onverwijld al hetgeen te doen dat van hem in dat geval verwacht mag worden. Mocht de Opdrachtgever in gebreke blijven in het nemen van adequate maatregelen, dan is Achieve, zonder ingebrekestelling, gerechtigd zelf daartoe over te gaan. Alle kosten en schade aan de zijde van Achieve en derden daardoor ontstaan, komen integraal voor rekening en risico van de Opdrachtgever.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-11-prijzen"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 11")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Prijzen")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("11.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Alle prijzen zijn exclusief omzetbelasting (BTW) en andere heffingen welke van overheidswege worden opgelegd.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("11.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Alle prijzen op de website, offertes en overige documenten van Achieve zijn onder voorbehoud van typefouten. Voor de gevolgen van typefouten wordt geen aansprakelijkheid aanvaard.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("11.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De door de Opdrachtgever te betalen vergoeding is gebaseerd op het tarief als vermeld in de Overeenkomst. Achieve behoudt zich het recht voor tarieven tussentijds te wijzigen en zal de Opdrachtgever hiervan dertig (30) dagen van tevoren op de hoogte stellen. Indien de Opdrachtgever een tariefswijziging niet wenst te accepteren, heeft hij het recht om binnen zeven dagen na de in dit artikel genoemde kennisgeving de Overeenkomst waarop de tariefswijziging betrekking heeft schriftelijk op te zeggen. De opzegging dient per aangetekende brief te geschieden.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-12-levertijd"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 12")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Levertijd")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("12.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Een door Achieve opgegeven termijn voor het volbrengen van de opdracht heeft een indicatieve strekking, tenzij uit de aard of de inhoud van de Overeenkomst anders blijkt.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("12.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Vervaardiging en publicatie van een campagne of dienst geschiedt zo spoedig mogelijk na totstandkoming van de Overeenkomst en aanlevering van gegevens en tekst- en/of beeldmateriaal, of op een later af te spreken tijdstip.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("12.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Is voor de voltooiing van bepaalde werkzaamheden een termijn overeengekomen, dan is dit nimmer een fatale termijn. Bij overschrijding van de leveringstermijn dient Opdrachtgever Achieve derhalve schriftelijk in gebreke te stellen en Achieve een redelijke termijn te stellen haar verplichtingen alsnog na te komen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("12.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De door Achieve opgegeven leveringstermijn vangt eerst aan nadat alle benodigde gegevens en zaken in haar bezit zijn.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-13-wijziging-opdracht"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 13")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Wijziging opdracht")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("13.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Alle wijzigingen in de opdracht, hetzij in opdracht van Opdrachtgever, hetzij als gevolg van het feit dat door welke omstandigheden dan ook een andere uitvoering noodzakelijk is, worden wanneer daaraan meerdere kosten verbonden zijn als meerwerk beschouwd en voor zover daaruit minder kosten bestaan als minderwerk. Deze worden overeenkomstig gefactureerd aan Opdrachtgever.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("13.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Achieve, door omstandigheden ten tijde van de offerte of de opdrachtbevestiging onbekend, meer werk moet verrichten dan overeengekomen, of werkzaamheden dient te verrichten onder omstandigheden bezwaarlijker dan hem bij het aangaan van de overeenkomst bekend was, is Achieve gerechtigd de daaruit voortvloeiende meerdere kosten aan Opdrachtgever in rekening te brengen. Indien Opdrachtgever zich niet met de betrokken meerkosten kan verenigen heeft hij het recht het nog niet uitgevoerde gedeelte van de opdracht te annuleren.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-14-intellectuele-eigendomsrechten"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 14")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Intellectuele eigendomsrechten")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("14.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Alle rechten van Intellectuele eigendom op alle krachtens de Overeenkomst ontwikkelde of ter beschikking gestelde programmatuur, apparatuur of andere materialen zoals analyses, ontwerpen, documentatie, rapporten, offertes, alsmede voorbereidend materiaal daarvan, berusten uitsluitend bij Achieve.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("14.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Het auteursrecht van door Achieve ontworpen of vervaardigde campagnes, advertenties en teksten blijft ten alle tijden bij Achieve berusten, tenzij anders schriftelijk is overeengekomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("14.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever verkrijgt uitsluitend een niet-exclusief en niet-overdraagbaar gebruiksrecht met betrekking tot het Intellectuele eigendom voor de duur van de Overeenkomst.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("14.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De Opdrachtgever onthoudt zich van het verveelvoudigen en/of openbaar maken en/of verspreiden van de programmatuur en de daarbij behorende andere materialen. Het is de Opdrachtgever niet toegestaan enige aanduiding omtrent auteursrechten, merken, handelsnamen of andere rechten van intellectuele eigendom uit de programmatuur, apparatuur of materialen te verwijderen of te wijzigen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("14.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Het is Achieve toegestaan technische maatregelen te nemen ter bescherming van de Programmatuur. Indien Achieve door middel van technische bescherming de Programmatuur heeft beveiligd, is het de Opdrachtgever niet toegestaan deze beveiliging te verwijderen of te ontwijken.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-15-gebruiksrechten"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 15")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Gebruiksrechten")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("15.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Onverminderd het bepaalde in artikel 14 verleent Achieve Opdrachtgever het niet- exclusieve recht tot het gebruik van de programmatuur. Opdrachtgever zal de tussen partijen overeengekomen gebruiksbeperkingen steeds stipt naleven. Onverminderd het overigens in deze Algemene Voorwaarden bepaalde, omvat het gebruiksrecht van Opdrachtgever uitsluitend het recht de programmatuur te laden en uit te voeren.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("15.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Het gebruiksrecht is niet overdraagbaar. Het is Opdrachtgever niet toegestaan de programmatuur en dragers waarop deze is vastgelegd te verkopen, te verhuren, te sublicentiëren, te vervreemden of daarop beperkte rechten te verlenen of op welke wijze of voor welk doel dan ook ter beschikking van een derde te stellen, ook niet indien de betreffende derde de programmatuur uitsluitend ten behoeve van Opdrachtgever gebruikt, tenzij anders schriftelijk overeengekomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("15.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De broncode van de programmatuur en de bij de ontwikkeling van de programmatuur voortgebrachte technische documentatie worden niet aan Opdrachtgever ter beschikking gesteld, tenzij anders schriftelijk overeengekomen.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-16-betalingsvoorwaarden"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 16")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Betalingsvoorwaarden")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Alle facturen dienen binnen 14 dagen na factuurdatum te worden voldaan op de wijze zoals op de factuur aangegeven, tenzij schriftelijk anders is overeengekomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve zal niet in verzuim geraken door de enkele late verzending van een factuur. Het enkele feit dat Opdrachtgever niet binnen de in lid 1 vermelde termijn een factuur van Achieve ontvangt, zal nimmer tot gevolg hebben dat Opdrachtgever geen vergoeding ter zake de verleende dienst verschuldigd is en impliceert evenmin op enigerlei wijze afstand van recht door Achieve op betaling.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien automatische incasso is overeengekomen, wordt het bedrag na toestemming van Opdrachtgever automatisch geïncasseerd ten laste van het rekeningnummer van Opdrachtgever en ten gunste van IBAN nummer NL21 KNAB 0259 9950 29 ten name van Achieve. De automatische incasso vindt ineens plaats en binnen 14 dagen na factuurdatum.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien automatische incasso niet mogelijk blijkt te zijn, zal Opdrachtgever daarvan op de hoogte worden gesteld en is Opdrachtgever gehouden het niet-geïncasseerde bedrag binnen 14 dagen na factuurdatum alsnog aan Achieve te voldoen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.5")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien en zodra de betalingstermijn van 14 dagen verstrijkt, zonder dat Achieve de gehele betaling heeft ontvangen, zal Opdrachtgever – zonder nadere ingebrekestelling – in verzuim verkeren, tenzij schriftelijk een andere betalingstermijn is overeengekomen. Na het verstrijken van 30 dagen na de factuurdatum zal het factuurbedrag alsdan verhoogd worden met administratiekosten ad €17,50. Vanaf het moment van verzuim tot aan het moment van integrale voldoening van het verschuldigde is Opdrachtgever tevens de wettelijke handelsrente verschuldigd.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.6")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Vanaf het moment waarop Opdrachtgever in verzuim verkeert, zal Opdrachtgever tevens aansprakelijk zijn voor de als gevolg daarvan door Achieve te maken buitengerechtelijke incassokosten, die gelijk aan 15% van het factuurbedrag worden geacht te zijn, met een minimum van €40,- per factuur. Indien en voor zover de daadwerkelijk door Achieve gemaakte incassokosten hoger zijn dan 15% van het factuurbedrag, is Achieve gerechtigd deze daadwerkelijke kosten aan Opdrachtgever in rekening te brengen, een en ander in plaats van de fictieve incassokosten en voor zover in redelijkheid gemaakt.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.7")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Opdrachtgever is nimmer bevoegd om enige betaling voortvloeiende uit de Overeenkomst op te schorten dan wel te verrekenen met enige vordering die Opdrachtgever op enig moment mocht hebben op Achieve.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.8")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Mocht zich op enig moment ten aanzien van Opdrachtgever de situatie voordoen van liquidatie, faillissement, beslag of surséance van betaling, dan worden alle verbintenissen van Opdrachtgever voortvloeiend uit de Overeenkomst en alle overige tussen partijen bestaande overeenkomsten onmiddellijk en in het geheel opeisbaar. Hetzelfde geldt mutatis mutandis voor het geval waarin Opdrachtgever in verzuim is met enige uit de Overeenkomst voortvloeiende verbintenis.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.9")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve heeft het recht de door Opdrachtgever gedane betalingen te laten strekken in de eerste plaats in mindering van de kosten, vervolgens in mindering van de opengevallen rente en tenslotte in mindering van de hoofdsom en de lopende rente. Achieve kan, zonder daardoor in verzuim te komen, een aanbod tot betaling weigeren, indien Opdrachtgever een andere volgorde voor de toerekening van de betaling aanwijst. Achieve kan volledige aflossing van de hoofdsom weigeren, indien daarbij niet eveneens de opengevallen en lopende rente en incassokosten worden voldaan.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("16.10")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Opdrachtgever namens een derde een Overeenkomst is aangegaan, blijft deze Opdrachtgever jegens Achieve aansprakelijk voor nakoming van alle verplichtingen voortvloeiende uit de Overeenkomst. Bij gebreke van betaling door Opdrachtgever is de derde gehouden op eerste verzoek voor betaling aan Achieve zorg te dragen.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-17-overmacht"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 17")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Overmacht")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("17.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve is niet gehouden tot het nakomen van enige verplichting jegens de Opdrachtgever indien hij daartoe gehinderd wordt als gevolg van een omstandigheid die niet is te wijten aan schuld, en noch krachtens de wet, een rechtshandeling of in het verkeer geldende opvattingen voor zijn rekening komt.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("17.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Onder overmacht wordt in deze algemene voorwaarden verstaan, naast hetgeen daaromtrent in de wet en jurisprudentie wordt begrepen, alle van buitenkomende oorzaken, voorzien of niet-voorzien, waarop Achieve geen invloed kan uitoefenen, doch waardoor Achieve niet in staat is zijn verplichtingen na te komen. Werkstakingen in het bedrijf van Achieve of van derden daaronder begrepen. Achieve heeft ook het recht zich op overmacht te beroepen indien de omstandigheid die (verdere) nakoming van de overeenkomst verhindert, intreedt nadat Achieve zijn verbintenis had moeten nakomen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("17.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve kan gedurende de periode dat de overmacht voortduurt de verplichtingen uit de overeenkomst opschorten. Indien deze periode langer duurt dan twee maanden, dan is ieder der partijen gerechtigd de overeenkomst te ontbinden, zonder verplichting tot vergoeding van schade aan de andere partij.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("17.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Voor zoveel Achieve ten tijde van het intreden van overmacht zijn verplichtingen uit de overeenkomst inmiddels gedeeltelijk is nagekomen of deze zal kunnen nakomen, en aan het nagekomen respectievelijk na te komen gedeelte zelfstandige waarde toekomt, is Achieve gerechtigd om het reeds nagekomen respectievelijk na te komen gedeelte separaat te factureren. De Opdrachtgever is gehouden deze factuur te voldoen als ware er sprake van een afzonderlijke overeenkomst.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-18-opschorting"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 18")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Opschorting")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("18.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Bij het achterwege blijven van juiste of tijdige nakoming van een of meer van zijn verplichtingen, zal de Opdrachtgever zonder voorafgaande ingebrekestelling, en zonder dat daar enige aansprakelijkheid van Achieve uit voortvloeit, in verzuim zijn, waardoor de verplichtingen van Achieve tot nakoming van haar eigen verplichtingen automatisch en onmiddellijk opgeschort worden totdat hetgeen de Opdrachtgever verschuldigd is volledig is voldaan, met inbegrip van betaling van eventuele rente en kosten (schadevergoeding daaronder begrepen).",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-19-reclamatie"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 19")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Reclamatie")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("19.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Gedurende de overeengekomen contractperiode zal Achieve naar beste vermogen eventuele technische gebreken in de website en/of webapplicatie gratis herstellen, indien deze gedetailleerd omschreven schriftelijk door de opdrachtgever bij Achieve zijn gemeld. Achieve kan haar gebruikelijke tarieven en kosten in rekening brengen indien sprake is van gebruiksfouten of onoordeelkundig gebruik of van andere niet aan Achieve toe te rekenen oorzaken.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("19.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Achieve behoeft geen gebreken in de website en/of webapplicatie te herstellen indien deze zijn veroorzaakt door Opdrachtgever zelf, door derden of door gewijzigde omstandigheden, waarvan Achieve ten tijde van het sluiten van de overeenkomst niet wist of behoorde te weten.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("19.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "De verplichting zoals vermeld in dit artikel vervalt indien Opdrachtgever zonder toestemming van Achieve wijzigingen in de software en broncodes aanbrengt of doet aanbrengen, alsmede indien de opdrachtgever op enige wijze zelf zonder schriftelijke toestemming van Achieve een gebrek tracht te herstellen.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("19.4")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Reclamatie schort de verplichting van Opdrachtgever tot nakoming van de verplichtingen van opdrachtgever niet op.")}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-20-wijzigingen-in-algemene-voorwaarden"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 20")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Wijzigingen in Algemene Voorwaarden")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("20.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Achieve heeft het recht deze Algemene Voorwaarden te wijzigen.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("20.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Wijzigingen gelden ook ten aanzien van reeds gesloten overeenkomsten met inachtneming van een termijn van 30 dagen na bekendmaking van de wijziging op de website van Achieve of per elektronische berichtgeving.",
                    )}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("20.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Indien Opdrachtgever een wijziging in deze voorwaarden niet wil accepteren, kan hij tot de datum waarop de nieuwe voorwaarden van kracht worden de Overeenkomst ontbinden tegen deze datum of op de ontvangstdatum van de opzegging indien deze na de ingangsdatum van de wijziging is.",
                    )}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="lg-acc"
              id="artikel-21-slotbepalingen"
              style={{ borderRadius: "16px", border: "1px solid #E4E6EA", background: "#FFFFFF" }}
            >
              <summary
                style={{
                  listStyle: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    minWidth: "92px",
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8639FA",
                  }}
                >
                  {t("Artikel 21")}
                </span>
                <span
                  style={{
                    flex: "1",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "22px",
                    lineHeight: "1.2",
                    color: "#1F246C",
                  }}
                >
                  {t("Slotbepalingen")}
                </span>
                <span
                  className="lg-chev"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: "36px",
                    height: "36px",
                    borderRadius: "999px",
                    border: "1px solid #D5DAE3",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1F246C",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <div style={{ padding: "4px 24px 28px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("21.1")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Op de Overeenkomst is Nederlands recht van toepassing.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("21.2")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t("Verandering in management of rechtsvorm hebben geen invloed op de Overeenkomst.")}
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "52px minmax(0, 1fr)", gap: "8px" }}>
                  <span style={{ fontWeight: "700", color: "#1F246C", fontSize: "16px", lineHeight: "1.75" }}>{t("21.3")}</span>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                    {t(
                      "Voor zover door de regels van dwingend recht niet anders wordt voorgeschreven, zullen alle geschillen die mochten ontstaan naar aanleiding van de overeenkomst worden voorgelegd aan de bevoegde rechter te Rotterdam.",
                    )}
                  </p>
                </div>
              </div>
            </details>
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "32px",
              borderRadius: "20px",
              background: "#F2F8FE",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px 24px",
            }}
            className="lg-card"
          >
            <h2
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "26px",
                lineHeight: "1.1",
                color: "#1F246C",
                gridColumn: "1 / -1",
              }}
            >
              {t("Achieve")}
            </h2>
            <p style={{ margin: "0", fontSize: "16px", fontWeight: "600", color: "#1F246C", gridColumn: "1 / -1" }}>
              {t("Correspondentieadres:")}
            </p>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
              {t("Cypresbaan 3")}
              <br />
              {t("2908 LT, Capelle aan den IJssel")}
              <br />
              {t("Nederland")}
            </p>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
              {t("Tel: +31 85 4016590")}
              <br />
              {t("E-mail:")}{" "}
              <a href="mailto:info@achieve.nl" style={{ color: "#1F246C", fontWeight: "600" }}>
                {t("info@achieve.nl")}
              </a>
            </p>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
              {t("KvK nr. 76815889")}
              <br />
              {t("BTW nr. NL003153126B65")}
            </p>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150", gridColumn: "1 / -1" }}>
              {t("Voor vragen over de Algemene Voorwaarden kunt u altijd")}{" "}
              <a href={href("Contact")} style={{ color: "#1F246C", fontWeight: "600" }}>
                {t("contact")}
              </a>{" "}
              {t("met ons opnemen.")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
