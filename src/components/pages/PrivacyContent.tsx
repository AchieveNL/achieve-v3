"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";

export function PrivacyContent() {
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
            {t("Privacy")}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("verklaring.")}</span>
            </Accent>
          </h1>
          <p style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#5A6273" }}>{t("Laatst gewijzigd op 29 september 2021")}</p>
          <nav
            aria-label={ta("Juridische pagina's")}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", paddingTop: "12px" }}
          >
            <a
              href={href("Privacy")}
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
              {t("Privacyverklaring")}
            </a>
            <a
              href={href("Voorwaarden")}
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
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "56px" }}>
          <aside
            className="lg-aside"
            style={{ flex: "1 1 240px", maxWidth: "280px", display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <p
              style={{
                margin: "0",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#5A6273",
              }}
            >
              {t("Op deze pagina")}
            </p>
            <ul style={{ margin: "0", padding: "0 0 0 16px", listStyle: "none", borderLeft: "2px solid #E4E6EA" }}>
              <li>
                <a
                  href="#persoonsgegevens-die-wij-verwerken"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Persoonsgegevens die wij verwerken")}
                </a>
              </li>
              <li>
                <a
                  href="#met-welk-doel-en-op-basis-van-welke-grondslag-wi"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken")}
                </a>
              </li>
              <li>
                <a
                  href="#geautomatiseerde-besluitvorming"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Geautomatiseerde besluitvorming")}
                </a>
              </li>
              <li>
                <a
                  href="#het-bewaren-van-persoonsgegevens"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Het bewaren van persoonsgegevens")}
                </a>
              </li>
              <li>
                <a
                  href="#delen-van-persoonsgegevens-met-derden"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Delen van persoonsgegevens met derden")}
                </a>
              </li>
              <li>
                <a
                  href="#cookies-of-vergelijkbare-technieken-die-wij-gebr"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Cookies, of vergelijkbare technieken, die wij gebruiken")}
                </a>
              </li>
              <li>
                <a
                  href="#gegevens-inzien-aanpassen-of-verwijderen"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Gegevens inzien, aanpassen of verwijderen")}
                </a>
              </li>
              <li>
                <a
                  href="#toegang-tot-accounts"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Toegang tot accounts")}
                </a>
              </li>
              <li>
                <a
                  href="#hoe-wij-persoonsgegevens-beveiligen"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Hoe wij persoonsgegevens beveiligen")}
                </a>
              </li>
              <li>
                <a
                  href="#wijziging-van-deze-verklaring"
                  className="lg-toc"
                  style={{
                    display: "block",
                    padding: "8px 0",
                    color: "#1F246C",
                    textDecoration: "none",
                    fontSize: "15px",
                    lineHeight: "1.4",
                    fontWeight: "500",
                  }}
                >
                  {t("Wijziging van deze Verklaring")}
                </a>
              </li>
            </ul>
          </aside>
          <article style={{ flex: "999 1 560px", minWidth: "0", maxWidth: "760px", display: "flex", flexDirection: "column", gap: "28px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.7", color: "#1F246C" }}>
                {t(
                  "U bezoekt een website die deel uitmaakt van het online netwerk van Achieve Deze privacyverklaring is van toepassing op alle websites die behoren tot het netwerk van Achieve, hierna te noemen Achieve, tenzij anders vermeld. Achieve is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacy verklaring.",
                )}
              </p>
            </div>
            <section
              id="persoonsgegevens-die-wij-verwerken"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Persoonsgegevens die wij verwerken")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:",
                )}
              </p>
              <ul
                className="lg-list"
                style={{
                  margin: "0",
                  padding: "0",
                  listStyle: "none",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "12px 24px",
                }}
              >
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Bedrijfsnaam")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Aanhef")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Voor-en achternaam")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Telefoonnummer")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("E-mailadres")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Bedrijfsadres")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Betaalgegevens")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Gegevens over uw activiteiten op onze website")}</span>
                </li>
                <li
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "17px", lineHeight: "1.5", color: "#3A4150" }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: "8px",
                      height: "8px",
                      marginTop: "8px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                    }}
                  ></span>
                  <span>{t("Bijzondere en/of gevoelige persoonsgegevens die wij verwerken")}</span>
                </li>
              </ul>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op via",
                )}{" "}
                <a href="mailto:info@achieve.nl" style={{ color: "#1F246C", fontWeight: "600" }}>
                  {t("info@achieve.nl")}
                </a>{" "}
                {t("dan verwijderen wij deze informatie.")}
              </p>
            </section>
            <section
              id="met-welk-doel-en-op-basis-van-welke-grondslag-wi"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Als u een bestelling plaatst, hebben we uw bedrijfsnaam, eigen naam, e-mailadres, bedrijfsadres en betaalgegevens nodig om uw bestelling uit te voeren en u van het verloop daarvan op de hoogte te houden. Om het orderverloop bij Achieve zo aangenaam mogelijk te laten verlopen, slaan wij met uw toestemming uw persoonlijke gegevens en de gegevens met betrekking tot uw bestelling en uw gebruik van onze diensten op. Hierdoor kunnen wij de website personaliseren en in uw voordeel verbeteren.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Wij gebruiken uw e-mailadres om u te informeren over de ontwikkeling van haar website en om u op de hoogte te houden van speciale aanbiedingen en acties. Wanneer u hier niet langer prijs op stelt, kunt u zich uitschrijven op onze website.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Gegevens over het gebruik van onze site en de feedback die we krijgen van onze bezoekers helpen ons om onze site verder te ontwikkelen en te verbeteren.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Als u besluit een recensie te schrijven, kunt u zelf kiezen of u uw naam of andere persoonlijke gegevens toevoegt. We zijn benieuwd naar de meningen van onze bezoekers. Wel behouden wij het recht van moderatie in bijdragen die niet aan onze sitevoorwaarden voldoen.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Bij het verzenden van een online formulier of offerteaanvraag, vragen wij naar uw contactgegevens zodat wij terug kunnen komen op uw vraag/offerte. Bij het afstaan van uw e-mailadres en/of telefoonnummer geeft u toestemming dat wij u persoonlijk mogen benaderen voor de opvolging.",
                )}
              </p>
            </section>
            <section
              id="geautomatiseerde-besluitvorming"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Geautomatiseerde besluitvorming")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve neemt niet op basis van geautomatiseerde verwerkingen besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die worden genomen door computerprogramma’s of -systemen, zonder dat daar een mens (bijvoorbeeld een medewerker van Achieve) tussen zit.",
                )}
              </p>
            </section>
            <section
              id="het-bewaren-van-persoonsgegevens"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Het bewaren van persoonsgegevens")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld.",
                )}
              </p>
            </section>
            <section
              id="delen-van-persoonsgegevens-met-derden"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Delen van persoonsgegevens met derden")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve verstrekt in het beginsel geen gegevens aan derden. Enkel wanneer dit nodig is om te voldoen aan een wettelijke verplichting. Of voor de uitvoering van onze overeenkomst met u.",
                )}
              </p>
            </section>
            <section
              id="cookies-of-vergelijkbare-technieken-die-wij-gebr"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Cookies, of vergelijkbare technieken, die wij gebruiken")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve gebruikt technische en functionele cookies. Voor meer informatie hierover verwijzen wij u graag naar ons Cookie beleid.",
                )}
              </p>
            </section>
            <section
              id="gegevens-inzien-aanpassen-of-verwijderen"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Gegevens inzien, aanpassen of verwijderen")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door Achieve en heeft u het recht op gegevensoverdraagbaarheid. Dat betekent dat u bij ons een verzoek kunt indienen om de persoonsgegevens die wij van u beschikken in een computerbestand naar u of een ander, door u genoemde organisatie, te sturen.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "U kunt een verzoek tot inzage, correctie, verwijdering, gegevensoverdraging van uw persoonsgegevens of verzoek tot intrekking van uw toestemming of bezwaar op de verwerking van uw persoonsgegevens sturen naar",
                )}{" "}
                <a href="mailto:info@achieve.nl" style={{ color: "#1F246C", fontWeight: "600" }}>
                  {t("info@achieve.nl")}
                </a>
                {t(
                  ". Om er zeker van te zijn dat het verzoek tot inzage door u is gedaan, vragen wij u een kopie van uw identiteitsbewijs met het verzoek mee te sturen. Maak in deze kopie uw pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort), paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van uw privacy. We reageren zo snel mogelijk, maar binnen vier weken, op uw verzoek.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve wil u er tevens op wijzen dat u de mogelijkheid heeft om een klacht in te dienen bij de nationale toezichthouder, de Autoriteit Persoonsgegevens. Dat kan via de volgende link:",
                )}{" "}
                <a
                  href="https://autoriteitpersoonsgegevens.nl/nl/contact-met-de-autoriteit-persoonsgegevens/tip-ons"
                  target="_blank"
                  rel="noopener"
                  style={{ color: "#1F246C", fontWeight: "600" }}
                >
                  {t("hier")}
                </a>
                {t(".")}
              </p>
            </section>
            <section
              id="toegang-tot-accounts"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Toegang tot accounts")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Om op een zo veilige mogelijke manier toegang tot u account te krijgen werken wij zonder gebruik van uw inloggegevens. U kunt via uw eigen account tijdelijk toegang geven aan ons. Daar zijn geen inloggegevens mee gemoeid. Op deze manier waarborgen we de veiligheid van uw gegevens. Tijdens analyses van uw campagne wijzigen wij vanzelfsprekend niets in uw account. Na de analyse kunt u gemakkelijk onze toegang tot uw account intrekken. De analyseresultaten worden enkel gedeeld met u als vast contactpersoon.",
                )}
              </p>
            </section>
            <section
              id="hoe-wij-persoonsgegevens-beveiligen"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Hoe wij persoonsgegevens beveiligen")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Achieve maakt gebruik van diverse veiligheidsprocedures en de website zijn zodanig beveiligd dat deze omgeving zonder inlogcodes niet van buitenaf te benaderen is. Persoonsgegevens zijn verder beveiligd tegen ongewenst gebruik via een gebruikersnaam en een wachtwoord. Je kan je wachtwoord op elk ogenblik wijzigen in je Account.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Daarnaast is de omgeving zelf ook beveiligd. Deze beveiliging is te herkennen aan de vermelding 'https' in de URL (de webadres-balk) van uw browser alsmede door middel van de afbeelding van een gesloten slotje voor de domeinnaam.",
                )}
              </p>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op met onze klantenservice of via",
                )}{" "}
                <a href="mailto:info@achieve.nl" style={{ color: "#1F246C", fontWeight: "600" }}>
                  {t("info@achieve.nl")}
                </a>
              </p>
            </section>
            <section
              id="wijziging-van-deze-verklaring"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                paddingTop: "36px",
                borderTop: "1px solid #E4E6EA",
                scrollMarginTop: "24px",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "28px",
                  lineHeight: "1.15",
                  letterSpacing: "-0.01em",
                  color: "#1F246C",
                }}
              >
                {t("Wijziging van deze Verklaring")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve behoudt zich het recht voor om wijzigingen aan te brengen in deze Privacy verklaring. Elke aanpassing zal op deze pagina worden gepubliceerd. Wij raden u aan deze Privacy verklaring geregeld te raadplegen, zodat u altijd van de inhoud van de geldende Privacy verklaring op de hoogte bent. Deze Privacy verklaring is voor het laatst gewijzigd op 29 september 2021.",
                )}
              </p>
            </section>
            <div
              style={{
                marginTop: "16px",
                padding: "32px",
                borderRadius: "20px",
                background: "#F2F8FE",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: "1 1 320px" }}>
                <h2
                  style={{
                    margin: "0",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "26px",
                    lineHeight: "1.1",
                    color: "#1F246C",
                  }}
                >
                  {t("Vragen?")}
                </h2>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                  {t("Mail ons op")}{" "}
                  <a href="mailto:info@achieve.nl" style={{ color: "#1F246C", fontWeight: "600" }}>
                    {t("info@achieve.nl")}
                  </a>{" "}
                  {t("of bel")}{" "}
                  <a href="tel:+31854016590" style={{ color: "#1F246C", fontWeight: "600" }}>
                    {t("085 401 6590")}
                  </a>
                  {t(".")}
                </p>
              </div>
              <a
                href={href("Contact")}
                className="k3-out"
                style={{
                  color: "#1F246C",
                  textDecoration: "none",
                  padding: "16px 28px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "16px",
                  border: "1px solid #1F246C",
                }}
              >
                {t("Naar contact")}
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
          </article>
        </div>
      </section>
    </>
  );
}
