"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";

export function BedanktContent() {
  const { t, ta, href } = useTr();

  const h = {};
  return (
    <>
      <section className="ty-wrap ty-hero" style={{ background: "#F2F8FE", padding: "88px 40px 96px" }}>
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
          <span className="ty-ill" aria-hidden="true" style={{ display: "block" }}>
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
                <linearGradient id="tyL" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#B48DFF"></stop>
                  <stop offset="1" stopColor="#5EC0FA"></stop>
                </linearGradient>
                <linearGradient id="tyF" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#8639FA"></stop>
                  <stop offset="1" stopColor="#0F8AE5"></stop>
                </linearGradient>
              </defs>
              <circle cx="210" cy="215" r="150" fill="#2E3590"></circle>
              <circle
                className="ty-a-ring"
                cx="210"
                cy="215"
                r="176"
                stroke="url(#tyF)"
                strokeWidth="2"
                strokeDasharray="4 10"
                strokeLinecap="round"
                opacity="0.55"
              ></circle>
              <circle className="ty-a-tw1" cx="70" cy="300" r="5" fill="#5EC0FA"></circle>
              <path className="ty-a-tw2" d="M356 318l8 0M360 314l0 8" stroke="#FAE84E" strokeWidth="3" strokeLinecap="round"></path>
              <g className="ty-a-env">
                <rect
                  x="112"
                  y="186"
                  width="196"
                  height="132"
                  rx="18"
                  stroke="url(#tyL)"
                  strokeWidth="2.5"
                  transform="rotate(-7 210 252)"
                ></rect>
                <rect x="126" y="180" width="196" height="132" rx="18" fill="#FFFFFF"></rect>
                <path d="M130 190l94 66 94-66" stroke="url(#tyF)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M134 304l66-50M314 304l-66-50" stroke="#D5DAE3" strokeWidth="3" strokeLinecap="round"></path>
              </g>
              <g className="ty-a-cal">
                <g transform="rotate(-8 127 136)">
                  <rect x="86" y="96" width="82" height="80" rx="14" fill="#FFFFFF"></rect>
                  <path d="M86 110a14 14 0 0 1 14-14h54a14 14 0 0 1 14 14v12H86z" fill="url(#tyF)"></path>
                  <rect x="106" y="88" width="6" height="16" rx="3" fill="#FAE84E"></rect>
                  <rect x="142" y="88" width="6" height="16" rx="3" fill="#FAE84E"></rect>
                  <circle cx="106" cy="140" r="6" fill="#D5DAE3"></circle>
                  <circle cx="127" cy="140" r="6" fill="#D5DAE3"></circle>
                  <circle className="ty-a-day" cx="148" cy="140" r="6" fill="url(#tyF)"></circle>
                  <circle cx="106" cy="160" r="6" fill="#D5DAE3"></circle>
                  <circle cx="127" cy="160" r="6" fill="#D5DAE3"></circle>
                </g>
              </g>
              <g className="ty-a-party">
                <path
                  className="ty-a-rays"
                  d="M300 58v22M260 88l14 12M340 88l-14 12"
                  stroke="#FAE84E"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength="1"
                ></path>
                <path
                  className="ty-a-star"
                  d="M300 96l6 14 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z"
                  fill="#FAE84E"
                  stroke="#FAE84E"
                  strokeWidth="2"
                  strokeLinejoin="round"
                ></path>
                <circle className="ty-a-conf" style={{ "--dx": "50px", "--dy": "-4px" }} cx="250" cy="120" r="7" fill="#5EC0FA"></circle>
                <rect
                  className="ty-a-conf"
                  style={{ "--dx": "-48px", "--dy": "-18px", animationDelay: "1.9s, 3s" }}
                  x="342"
                  y="128"
                  width="12"
                  height="12"
                  rx="3"
                  fill="#B48DFF"
                  transform="rotate(20 348 134)"
                ></rect>
                <circle
                  className="ty-a-conf"
                  style={{ "--dx": "-64px", "--dy": "36px", animationDelay: "1.95s, 2.8s" }}
                  cx="364"
                  cy="80"
                  r="5"
                  fill="#FFFFFF"
                ></circle>
                <rect
                  className="ty-a-conf"
                  style={{ "--dx": "63px", "--dy": "41px", animationDelay: "2s, 3.2s" }}
                  x="232"
                  y="70"
                  width="10"
                  height="10"
                  rx="2"
                  fill="#FFFFFF"
                  transform="rotate(-25 237 75)"
                ></rect>
              </g>
              <g className="ty-a-badge">
                <circle cx="300" cy="300" r="36" fill="url(#tyF)" stroke="#FFFFFF" strokeWidth="4"></circle>
                <path
                  className="ty-a-check"
                  d="M283 300l12 12 22-25"
                  stroke="#FAE84E"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                ></path>
              </g>
              <circle className="ty-a-tw3" cx="352" cy="190" r="8" fill="#FAE84E"></circle>
            </svg>
          </span>
          <p
            style={{
              margin: "8px 0 0",
              fontFamily: "var(--font-display)",
              fontSize: "20px",
              fontWeight: "700",
              fontStyle: "italic",
              color: "#8639FA",
            }}
          >
            {t("Ambition, delivered.")}
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
            {t("Bedankt, we hebben je aanvraag")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("ontvangen!")}</span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "560px", fontSize: "18px", lineHeight: "1.6", color: "#3A4150" }}>
            {t("Op werkdagen nemen we binnen 4 uur contact met je op om je groeigesprek in te plannen.")}
          </p>
        </div>
      </section>
      <section className="ty-wrap" style={{ padding: "88px 40px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
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
            {t("Dit gebeurt er")}{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text">{t("nu.")}</span>
            </Accent>
          </h2>
          <ol
            className="ty-steps"
            style={{
              margin: "0",
              padding: "0",
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "24px",
            }}
          >
            <li
              style={{
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "44px", lineHeight: "1", color: "#8639FA" }}>
                {t("01")}
              </span>
              <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>{t("We bellen je")}</h3>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("Op werkdagen neemt iemand van ons team binnen 4 uur contact met je op om kennis te maken en een moment te prikken.")}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "44px", lineHeight: "1", color: "#8639FA" }}>
                {t("02")}
              </span>
              <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>{t("Je groeigesprek")}</h3>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("Persoonlijk en vrijblijvend. We leren jou en je ambitie kennen, en kijken samen waar de kansen liggen.")}
              </p>
            </li>
            <li
              style={{
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "44px", lineHeight: "1", color: "#8639FA" }}>
                {t("03")}
              </span>
              <h3 style={{ margin: "0", fontSize: "20px", fontWeight: "600", color: "#1F246C" }}>{t("Je groeiplan")}</h3>
              <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                {t("Je ontvangt een helder voorstel met doelen, stappen, planning en prijs. Zo weet je precies waar je aan toe bent.")}
              </p>
            </li>
          </ol>
          <div
            className="ty-cta"
            style={{
              borderRadius: "24px",
              background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
              color: "#FFFFFF",
              padding: "40px 48px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px 40px",
            }}
          >
            <div style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexDirection: "column", gap: "8px" }}>
              <h2
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "30px",
                  lineHeight: "1.1",
                  color: "#FFFFFF",
                }}
              >
                {t("Liever direct zelf een moment")}{" "}
                <Accent from="#FAE84E" to="#F2C811">
                  <span style={{ color: "#FAE84E" }}>{t("kiezen?")}</span>
                </Accent>
              </h2>
              <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#FFFFFF" }}>
                {t("Plan je groeigesprek meteen in onze agenda, of bel ons gewoon even.")}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <a
                href="https://calendly.com/vrijblijvendgesprek/"
                target="_blank"
                rel="noopener"
                className="ty-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "56px",
                  padding: "0 28px",
                  borderRadius: "8px",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  fontWeight: "700",
                  fontSize: "18px",
                  textDecoration: "none",
                }}
              >
                {t("Kies een moment")}
                <svg
                  className="ty-sa"
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
              <a
                href="tel:+31854016590"
                className="ty-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "56px",
                  padding: "0 24px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.7)",
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: "17px",
                  textDecoration: "none",
                }}
              >
                {t("Bel 085 401 6590")}
                <svg
                  className="ty-sa"
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
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px 28px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#1F246C",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <img src="/media/icons/google.svg" alt="" style={{ width: "18px", height: "18px" }} />
              <span>
                <strong style={{ fontWeight: "700" }}>{t("5,0")}</strong> {t("op Google")}
              </span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <img src="/media/icons/trustpilot.svg" alt="" style={{ width: "18px", height: "18px" }} />
              <span>
                <strong style={{ fontWeight: "700" }}>{t("4,5")}</strong> {t("op Trustpilot")}
              </span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
