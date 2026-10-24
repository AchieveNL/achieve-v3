"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";

export function DisclaimerContent() {
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
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("Disclaimer.")}</span>
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
                  href="#algemeen"
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
                  {t("Algemeen")}
                </a>
              </li>
              <li>
                <a
                  href="#gebruik-van-de-website"
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
                  {t("Gebruik van de website")}
                </a>
              </li>
              <li>
                <a
                  href="#diensten-en-informatie"
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
                  {t("Diensten en informatie")}
                </a>
              </li>
              <li>
                <a
                  href="#externe-links"
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
                  {t("Externe links")}
                </a>
              </li>
              <li>
                <a
                  href="#intellectuele-eigendomsrechten"
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
                  {t("Intellectuele eigendomsrechten")}
                </a>
              </li>
              <li>
                <a
                  href="#wijzigingen"
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
                  {t("Wijzigingen")}
                </a>
              </li>
              <li>
                <a
                  href="#aansprakelijkheid"
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
                  {t("Aansprakelijkheid")}
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
            <section
              id="algemeen"
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
                {t("Algemeen")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "De informatie op deze website en in andere communicatie-uitingen van Achieve - Digital Agency is uitsluitend bedoeld voor algemene informatiedoeleinden. Hoewel wij grote zorg besteden aan de inhoud van onze website en communicatie, kunnen wij niet garanderen dat alle informatie volledig, juist en actueel is. Aan de inhoud van deze website kunnen dan ook geen rechten worden ontleend.",
                )}
              </p>
            </section>
            <section
              id="gebruik-van-de-website"
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
                {t("Gebruik van de website")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Het gebruik van deze website en de daarop beschikbare informatie is volledig op eigen risico. Achieve - Digital Agency aanvaardt geen aansprakelijkheid voor enige schade die voortvloeit uit het gebruik van de website, de onmogelijkheid om de website te gebruiken, of het vertrouwen op informatie die op deze website wordt verstrekt.",
                )}
              </p>
            </section>
            <section
              id="diensten-en-informatie"
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
                {t("Diensten en informatie")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "De informatie over diensten, prijzen, resultaten of voorbeelden op deze website is indicatief en kan zonder voorafgaande kennisgeving worden gewijzigd. Achieve - Digital Agency streeft naar transparante communicatie, maar kan niet garanderen dat alle informatie op ieder moment volledig of foutloos is.",
                )}
              </p>
            </section>
            <section
              id="externe-links"
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
                {t("Externe links")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Deze website kan links bevatten naar websites van derden. Achieve - Digital Agency heeft geen controle over de inhoud, werking of het privacybeleid van deze websites en aanvaardt hiervoor geen verantwoordelijkheid of aansprakelijkheid. Het gebruik van externe websites gebeurt volledig op eigen risico.",
                )}
              </p>
            </section>
            <section
              id="intellectuele-eigendomsrechten"
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
                {t("Intellectuele eigendomsrechten")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Alle intellectuele eigendomsrechten met betrekking tot de inhoud van deze website, waaronder maar niet beperkt tot teksten, afbeeldingen, ontwerpen, logo's, grafische elementen, video's en software, berusten bij Achieve - Digital Agency of haar licentiegevers. Het is niet toegestaan om (delen van) de inhoud zonder voorafgaande schriftelijke toestemming te kopiëren, reproduceren, publiceren, verspreiden of anderszins commercieel te gebruiken.",
                )}
              </p>
            </section>
            <section
              id="wijzigingen"
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
                {t("Wijzigingen")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Achieve - Digital Agency behoudt zich het recht voor om de inhoud van deze website, de aangeboden diensten en deze disclaimer op elk moment en zonder voorafgaande aankondiging te wijzigen.",
                )}
              </p>
            </section>
            <section
              id="aansprakelijkheid"
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
                {t("Aansprakelijkheid")}
              </h2>
              <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                {t(
                  "Voor zover wettelijk toegestaan is Achieve - Digital Agency niet aansprakelijk voor enige directe of indirecte schade die voortvloeit uit of verband houdt met het gebruik van deze website, de beschikbaarheid van de website, of de inhoud daarvan.",
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
