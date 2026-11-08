"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";
import { privacySections, privacyUpdated, privacyLeading } from "@/data/privacy";

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
          <p style={{ margin: "0", fontSize: "15px", fontWeight: "600", color: "#5A6273" }}>{t(privacyUpdated)}</p>
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
              {privacySections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
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
                    {t(sec.title)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <article style={{ flex: "999 1 560px", minWidth: "0", maxWidth: "760px", display: "flex", flexDirection: "column", gap: "28px" }}>
            {h.notNL && (
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
                {t(privacyLeading)}
              </p>
            )}
            {privacySections.map((sec, i) => (
              <section
                key={sec.id}
                id={sec.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  paddingTop: i === 0 ? "0" : "36px",
                  borderTop: i === 0 ? "none" : "1px solid #E4E6EA",
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
                  {t(sec.title)}
                </h2>
                {sec.blocks.map((bl, j) =>
                  "p" in bl ? (
                    <p key={j} style={{ margin: "0", fontSize: "17px", lineHeight: "1.75", color: "#3A4150" }}>
                      {t(bl.p)}
                    </p>
                  ) : (
                    <ul key={j} style={{ margin: "0", padding: "0 0 0 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      {bl.list.map((it, k) => (
                        <li key={k} style={{ fontSize: "17px", lineHeight: "1.7", color: "#3A4150" }}>
                          {it.b && <strong style={{ color: "#1F246C", fontWeight: "600" }}>{t(it.b)} </strong>}
                          {t(it.text)}
                        </li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
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
