"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";

export function NietGevondenContent() {
  const { t, ta, href } = useTr();

  const h = {};
  return (
    <>
      <section className="ty-wrap ty-hero" style={{ background: "#F2F8FE", padding: "72px 40px 96px" }}>
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
          }}
        >
          <span className="nf-ill" aria-hidden="true" style={{ display: "block" }}>
            <svg
              viewBox="0 0 420 420"
              width="100%"
              height="100%"
              fill="none"
              aria-hidden="true"
              focusable="false"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="nfL" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#B48DFF"></stop>
                  <stop offset="1" stopColor="#5EC0FA"></stop>
                </linearGradient>
                <linearGradient id="nfF" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8639FA"></stop>
                  <stop offset="1" stopColor="#0F8AE5"></stop>
                </linearGradient>
              </defs>
              <circle cx="210" cy="215" r="150" fill="#2E3590"></circle>
              <circle
                className="nf-ring"
                cx="210"
                cy="215"
                r="176"
                stroke="url(#nfF)"
                strokeWidth="2"
                strokeDasharray="4 10"
                strokeLinecap="round"
                opacity="0.55"
              ></circle>
              <circle className="nf-tw" cx="92" cy="110" r="9" fill="#FAE84E"></circle>
              <circle className="nf-tw" style={{ "--d": ".5s" }} cx="78" cy="300" r="5" fill="#5EC0FA"></circle>
              <path
                className="nf-tw"
                style={{ "--d": "1.3s" }}
                d="M354 318l8 0M358 314l0 8"
                stroke="#FAE84E"
                strokeWidth="3"
                strokeLinecap="round"
              ></path>
              <path className="nf-ground" d="M120 330c40-22 140-22 180 0" stroke="url(#nfL)" strokeWidth="3" strokeLinecap="round"></path>
              <rect className="nf-post" x="200" y="120" width="14" height="210" rx="7" fill="#FFFFFF"></rect>
              <g className="nf-b1">
                <path d="M214 136h96l22 20-22 20h-96z" fill="url(#nfF)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round"></path>
                <path d="M232 156h50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.7"></path>
              </g>
              <g className="nf-b2">
                <path d="M200 190h-90l-22 20 22 20h90z" fill="#FFFFFF"></path>
                <path d="M126 210h50" stroke="#D5DAE3" strokeWidth="6" strokeLinecap="round"></path>
              </g>
              <g className="nf-b3">
                <path d="M214 246h70l20 18-20 18h-70z" fill="#FAE84E"></path>
                <path d="M228 264h36" stroke="#1F246C" strokeWidth="6" strokeLinecap="round" opacity="0.35"></path>
              </g>
              <circle className="nf-tw" style={{ "--d": ".9s" }} cx="344" cy="118" r="12" stroke="url(#nfL)" strokeWidth="3"></circle>
            </svg>
          </span>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#8639FA",
            }}
          >
            {t("404 · Pagina niet gevonden")}
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
            {t("Even de weg")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("kwijt?")}</span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "560px", fontSize: "18px", lineHeight: "1.6", color: "#3A4150" }}>
            {t("De pagina die je zoekt bestaat niet (meer) of is verhuisd. Geen zorgen: we helpen je weer op weg.")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", paddingTop: "8px" }}>
            <a
              href={href("Main")}
              className="k3-out"
              style={{
                color: "#1F246C",
                textDecoration: "none",
                padding: "20px 28px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "17px",
                border: "1px solid #1F246C",
              }}
            >
              {t("Naar de homepage")}
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
        </div>
      </section>
      <section className="ty-wrap" style={{ padding: "80px 40px 96px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "36px" }}>
          <h2
            style={{
              margin: "0",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(30px, 3.5vw, 44px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              color: "#1F246C",
            }}
          >
            {t("Hier vind je je weg")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("terug.")}</span>
            </Accent>
          </h2>
          <div className="nf-links" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "20px" }}>
            <a
              href={href("Main", "diensten")}
              className="nf-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "28px 28px 24px",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                textDecoration: "none",
                color: "#1F246C",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", lineHeight: "1.1" }}>
                {t("Onze diensten")}
              </span>
              <span style={{ fontSize: "15px", lineHeight: "1.55", color: "#3A4150" }}>{t("Van strategie tot advertenties.")}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span className="l2-txt">{t("Bekijk")}</span>
                <span className="ty-arr" aria-hidden="true">
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
                </span>
              </span>
            </a>
            <a
              href={href("Projecten")}
              className="nf-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "28px 28px 24px",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                textDecoration: "none",
                color: "#1F246C",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", lineHeight: "1.1" }}>
                {t("Ons werk")}
              </span>
              <span style={{ fontSize: "15px", lineHeight: "1.55", color: "#3A4150" }}>{t("Lees wat werkte bij andere ondernemers.")}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span className="l2-txt">{t("Bekijk")}</span>
                <span className="ty-arr" aria-hidden="true">
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
                </span>
              </span>
            </a>
            <a
              href={href("Tarieven")}
              className="nf-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "28px 28px 24px",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                textDecoration: "none",
                color: "#1F246C",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", lineHeight: "1.1" }}>
                {t("Tarieven")}
              </span>
              <span style={{ fontSize: "15px", lineHeight: "1.55", color: "#3A4150" }}>{t("Vooraf weten waar je aan toe bent.")}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span className="l2-txt">{t("Bekijk")}</span>
                <span className="ty-arr" aria-hidden="true">
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
                </span>
              </span>
            </a>
            <a
              href={href("Contact")}
              className="nf-card"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "28px 28px 24px",
                borderRadius: "20px",
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                textDecoration: "none",
                color: "#1F246C",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "22px", lineHeight: "1.1" }}>
                {t("Contact")}
              </span>
              <span style={{ fontSize: "15px", lineHeight: "1.55", color: "#3A4150" }}>{t("Vertel ons waar je naartoe wilt.")}</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "auto",
                  paddingTop: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                <span className="l2-txt">{t("Bekijk")}</span>
                <span className="ty-arr" aria-hidden="true">
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
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
