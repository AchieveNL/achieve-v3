import type { ServerTr } from "@/i18n/server";

import { navSection } from "@/i18n/config";
export function Footer({ tr }: { tr: ServerTr }) {
  const { t, ta, href } = tr;

  const { page } = tr;
  const h = { curYear: String(new Date().getFullYear()) };
  return (
    <>
      <footer id="contact" style={{ background: "#1F246C", color: "#D5DAE3" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 40px 0" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "32px 56px",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "40px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.16)",
            }}
          >
            <span
              className="foot-logo"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", color: "#FFFFFF", marginLeft: "-5.6px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-logo)",
                  fontWeight: "700",
                  fontSize: "40px",
                  letterSpacing: "0.14em",
                  paddingLeft: "0.14em",
                  lineHeight: "1",
                }}
              >
                {t("ACHIEVE")}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-logo-sub)",
                  fontWeight: "400",
                  fontSize: "16px",
                  letterSpacing: "0.28em",
                  paddingLeft: "0.28em",
                  lineHeight: "1",
                }}
              >
                {t("DIGITAL AGENCY")}
              </span>
            </span>
            <div
              style={{
                flex: "0 1 820px",
                maxWidth: "820px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px 0",
              }}
            >
              <div
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  minWidth: "0",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BFCC" }}>
                  {t("Bel ons")}
                </span>
                <a
                  href="tel:+31854016590"
                  className="foot-link"
                  style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", textDecoration: "none" }}
                >
                  {t("085 401 6590")}
                </a>
                <span style={{ fontSize: "14px", color: "#B8BFCC" }}>{t("Direct contact met ons team")}</span>
              </div>
              <div
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  minWidth: "0",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BFCC" }}>
                  {t("Mail ons")}
                </span>
                <a
                  href="mailto:info@achieve.nl"
                  className="foot-link"
                  style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", textDecoration: "none" }}
                >
                  {t("info@achieve.nl")}
                </a>
                <span style={{ fontSize: "14px", color: "#B8BFCC" }}>{t("Reactie binnen 4 uur op werkdagen")}</span>
              </div>
              <div
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  minWidth: "0",
                }}
              >
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BFCC" }}>
                  {t("Bezoek ons")}
                </span>
                <span style={{ fontSize: "18px", fontWeight: "600", color: "#FFFFFF", textDecoration: "none" }}>{t("Cypresbaan 3")}</span>
                <span style={{ fontSize: "14px", color: "#B8BFCC" }}>{t("2908 LT Capelle aan den IJssel")}</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "48px 56px", justifyContent: "space-between", padding: "56px 0" }}>
            <div style={{ flex: "1.3 1 260px", minWidth: "0", display: "flex", flexDirection: "column", gap: "20px" }}>
              <span
                className="foot-tagline"
                style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", fontStyle: "italic", color: "#FAE84E" }}
              >
                {t("Ambition, delivered.")}
              </span>
              <div className="foot-social" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px", maxWidth: "300px" }}>
                <a
                  href="https://www.facebook.com/achieve.nl/"
                  target="_blank"
                  rel="noopener"
                  className="foot-link social-btn"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  {t("Facebook")}
                  <svg
                    className="slide-arrow"
                    width="14"
                    height="14"
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
                <a
                  href="https://www.instagram.com/achieve.nl/"
                  target="_blank"
                  rel="noopener"
                  className="foot-link social-btn"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  {t("Instagram")}
                  <svg
                    className="slide-arrow"
                    width="14"
                    height="14"
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
                <a
                  href="https://www.linkedin.com/company/achieve-nl/"
                  target="_blank"
                  rel="noopener"
                  className="foot-link social-btn"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  {t("LinkedIn")}
                  <svg
                    className="slide-arrow"
                    width="14"
                    height="14"
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
                <a
                  href="https://www.youtube.com/@achievenl"
                  target="_blank"
                  rel="noopener"
                  className="foot-link social-btn"
                  style={{
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "8px",
                  }}
                >
                  {t("YouTube")}
                  <svg
                    className="slide-arrow"
                    width="14"
                    height="14"
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
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BFCC" }}>
                  {t("Wat klanten zeggen")}
                </span>
                <p
                  style={{
                    margin: "0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "12px",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span role="img" aria-label={ta("5 van 5 sterren op Google")} style={{ display: "inline-flex", gap: "2px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <img src="/media/icons/google.svg" alt="" style={{ width: "16px", height: "16px", display: "block" }} />
                      <span>
                        <strong style={{ fontWeight: "700" }}>{t("5,0")}</strong> {t("Google")}
                      </span>
                    </span>
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span role="img" aria-label={ta("4,5 van 5 sterren op Trustpilot")} style={{ display: "inline-flex", gap: "2px" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="#F2C811"
                        ></path>
                      </svg>
                      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                        <defs>
                          <linearGradient id="ft-half" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stopColor="#F2C811"></stop>
                            <stop offset="50%" stopColor="rgba(255,255,255,0.28)"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          fill="url(#ft-half)"
                        ></path>
                      </svg>
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                      <img src="/media/icons/trustpilot.svg" alt="" style={{ width: "16px", height: "16px", display: "block" }} />
                      <span>
                        <strong style={{ fontWeight: "700" }}>{t("4,5")}</strong> {t("Trustpilot")}
                      </span>
                    </span>
                  </span>
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", color: "#B8BFCC" }}>
                  {t("Openingstijden")}
                </span>
                <dl
                  style={{
                    margin: "0",
                    display: "grid",
                    gridTemplateColumns: "max-content max-content",
                    gap: "8px 24px",
                    fontSize: "15px",
                  }}
                >
                  <dt style={{ color: "#D5DAE3" }}>{t("Maandag – vrijdag")}</dt>
                  <dd style={{ margin: "0", color: "#FFFFFF", fontWeight: "600" }}>{t("09:00 – 17:30")}</dd>
                  <dt style={{ color: "#D5DAE3" }}>{t("Zaterdag – zondag")}</dt>
                  <dd style={{ margin: "0", color: "#B8BFCC" }}>{t("Gesloten")}</dd>
                </dl>
              </div>
            </div>
            <div
              style={{
                flex: "0 1 820px",
                maxWidth: "820px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px 0",
                alignItems: "start",
              }}
            >
              <nav
                aria-label={ta("Menu")}
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  minWidth: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "24px",
                    color: "#FFFFFF",
                    margin: "0",
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {t("Menu")}
                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "40px", height: "4px", borderRadius: "2px", background: "#FAE84E" }}
                  ></span>
                </h2>
                <ul
                  style={{
                    margin: "0",
                    padding: "0",
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "16px",
                  }}
                >
                  <li>
                    <a
                      href={href("Main")}
                      aria-current={navSection(page) === "Main" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Home")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Main", "diensten")}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Diensten")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Projecten")}
                      aria-current={navSection(page) === "Projecten" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Projecten")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Tarieven")}
                      aria-current={navSection(page) === "Tarieven" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Tarieven")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("WerkenBij")}
                      aria-current={navSection(page) === "WerkenBij" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Werken bij")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("OverOns")}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Over ons")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Contact")}
                      aria-current={navSection(page) === "Contact" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Contact")}
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                aria-label={ta("Onze diensten")}
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  minWidth: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "24px",
                    color: "#FFFFFF",
                    margin: "0",
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {t("Onze diensten")}
                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "40px", height: "4px", borderRadius: "2px", background: "#FAE84E" }}
                  ></span>
                </h2>
                <ul
                  style={{
                    margin: "0",
                    padding: "0",
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "16px",
                  }}
                >
                  <li>
                    <a
                      href={href("DienstStrategy")}
                      aria-current={navSection(page) === "DienstStrategy" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Brand Strategy")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstLegal")}
                      aria-current={navSection(page) === "DienstLegal" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Legal")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstBrandBook")}
                      aria-current={navSection(page) === "DienstBrandBook" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Brand Book")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstWebDevelopment")}
                      aria-current={navSection(page) === "DienstWebDevelopment" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Web Development")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstEmailMarketing")}
                      aria-current={navSection(page) === "DienstEmailMarketing" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Email Marketing")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstVideoMarketing")}
                      aria-current={navSection(page) === "DienstVideoMarketing" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Video Marketing")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstUGCMarketing")}
                      aria-current={navSection(page) === "DienstUGCMarketing" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("UGC Marketing")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstSEA")}
                      aria-current={navSection(page) === "DienstSEA" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Search Engine Advertising")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstSMA")}
                      aria-current={navSection(page) === "DienstSMA" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Social Media Advertising")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstSMM")}
                      aria-current={navSection(page) === "DienstSMM" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Social Media Management")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("DienstDashboard")}
                      aria-current={navSection(page) === "DienstDashboard" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Dashboard")}
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                aria-label={ta("Over Achieve")}
                style={{
                  borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
                  padding: "4px 0 4px 32px",
                  minWidth: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "24px",
                    color: "#FFFFFF",
                    margin: "0",
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {t("Over Achieve")}
                  <span
                    aria-hidden="true"
                    style={{ display: "block", width: "40px", height: "4px", borderRadius: "2px", background: "#FAE84E" }}
                  ></span>
                </h2>
                <ul
                  style={{
                    margin: "0",
                    padding: "0",
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    fontSize: "16px",
                  }}
                >
                  <li>
                    <a
                      href={href("FAQ")}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("FAQ")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Disclaimer")}
                      aria-current={navSection(page) === "Disclaimer" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Disclaimer")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Privacy")}
                      aria-current={navSection(page) === "Privacy" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Privacy Policy")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Voorwaarden")}
                      aria-current={navSection(page) === "Voorwaarden" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Terms & Conditions")}
                    </a>
                  </li>
                  <li>
                    <a
                      href={href("Contact")}
                      aria-current={navSection(page) === "Contact" ? "page" : undefined}
                      className="foot-link"
                      style={{ color: "#D5DAE3", textDecoration: "none", padding: "8px 0", display: "inline-block" }}
                    >
                      {t("Contact")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div
          className="foot-bottom"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 40px 40px",
            borderTop: "1px solid rgba(255, 255, 255, 0.16)",
            fontSize: "14px",
            color: "#B8BFCC",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 24px",
            justifyContent: "space-between",
          }}
        >
          <span>
            {t("Copyright ©")} <span translate="no">{h.curYear}</span> {t("Achieve. All rights reserved.")}
          </span>
          <span
            translate="no"
            className="ai-pill"
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 12px",
              padding: "4px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              background: "rgba(255, 255, 255, 0.06)",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              color: "#FFFFFF",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B48DFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: "0" }}
              >
                <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"></path>
              </svg>
              {"100% AI BUILT"}
            </span>
            <span aria-hidden="true" style={{ width: "1px", height: "14px", background: "rgba(255, 255, 255, 0.25)" }}></span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5EC0FA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: "0" }}
              >
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>
              {"100% HUMAN CHOICES"}
            </span>
          </span>
          <span>{t("KvK 76815889 · BTW NL003153126B65")}</span>
        </div>
      </footer>
      <div
        className="m-cta-bar"
        style={{
          position: "fixed",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "50",
          padding: "12px 16px calc(12px + env(safe-area-inset-bottom))",
          background: "#FFFFFF",
          boxShadow: "0 -8px 24px rgba(31, 36, 108, 0.12)",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <a
          href="https://calendly.com/vrijblijvendgesprek/"
          target="_blank"
          rel="noopener"
          className="k1-bar"
          style={{
            flex: "1 1 auto",
            minHeight: "48px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
            color: "#FFFFFF",
            textDecoration: "none",
            fontWeight: "700",
            fontSize: "17px",
          }}
        >
          {t("Plan je groeigesprek")}
        </a>
        <a
          href="tel:+31854016590"
          aria-label={ta("Bel ons")}
          style={{
            flex: "0 0 48px",
            width: "48px",
            height: "48px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            border: "1px solid #D5DAE3",
            color: "#1F246C",
            textDecoration: "none",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"></path>
          </svg>
        </a>
      </div>
    </>
  );
}
