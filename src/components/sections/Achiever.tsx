"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Accent } from "@/components/ui/Accent";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function Achiever() {
  const { t, ta, href } = useTr();

  return (
    <>
      <section
        id="achiever"
        className="hero-dark"
        style={{ position: "relative", overflow: "hidden", background: "#1F246C", color: "#FFFFFF" }}
      >
        <LazyVideo
          preload="none"
          src="/media/video/achiever.mp4"
          poster="/media/video/achiever-poster.webp"
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            background: "linear-gradient(90deg, rgba(31, 36, 108, 0.93) 0%, rgba(31, 36, 108, 0.86) 50%, rgba(31, 36, 108, 0.93) 100%)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "120px 40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 64px",
            alignItems: "stretch",
          }}
        >
          <div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px", position: "relative" }}>
            <p
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#FAE84E",
              }}
            >
              {t("Heb jij een 5 sterren mindset?")}
            </p>
            <h2
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
              }}
            >
              {t("Ambitie is een hele")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span style={{ color: "#FFFFFF" }}>{t("bewuste keuze.")}</span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "19px", lineHeight: "1.6", color: "#FFFFFF", maxWidth: "520px" }}>
              {t("Of je nu net begint of al jaren onderneemt: het gaat om wat je wilt bereiken en de energie die je erin steekt.")}
            </p>
          </div>
          <div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", flexDirection: "column", gap: "32px" }}>
            <ul style={{ margin: "0", padding: "0", listStyle: "none" }}>
              <li
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "21px",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je gaat voor het beste resultaat.")}</span>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "21px",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je ziet overal kansen.")}</span>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "21px",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je wilt groei die je kunt meten.")}</span>
              </li>
              <li
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  padding: "24px 0",
                  borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "21px",
                  lineHeight: "1.4",
                  fontWeight: "500",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Je zoekt een team dat met je meegroeit.")}</span>
              </li>
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center" }}>
              <span style={{ position: "relative", display: "inline-block" }}>
                <a
                  href="https://calendly.com/vrijblijvendgesprek/"
                  target="_blank"
                  rel="noopener"
                  className="btn-glass"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "56px",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    textDecoration: "none",
                    padding: "0 28px",
                    borderRadius: "8px",
                    border: "1px solid #FFFFFF",
                    fontWeight: "700",
                    fontSize: "18px",
                  }}
                >
                  <span style={{ position: "relative" }}>{t("Laten we beginnen")}</span>
                  <svg
                    className="slide-arrow"
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
              </span>
              <a
                href="tel:+31854016590"
                className="btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "56px",
                  padding: "0 24px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.7)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "17px",
                }}
              >
                {t("Bel 085 401 6590")}
                <svg
                  className="slide-arrow"
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
              <span style={{ fontSize: "17px", color: "#FFFFFF" }}>{t("Herken je jezelf? Dan weten wij wat de volgende stap is.")}</span>
            </div>
          </div>
          <div
            style={{
              flex: "1 1 100%",
              minWidth: "0",
              marginTop: "24px",
              paddingTop: "36px",
              borderTop: "1px solid rgba(255, 255, 255, 0.18)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "24px 48px",
            }}
          >
            <p
              style={{
                margin: "0",
                flex: "0 0 260px",
                fontFamily: "var(--font-display)",
                fontSize: "24px",
                lineHeight: "1.15",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              {t("Deze ondernemers maakten die keuze al.")}
            </p>
            <LogoMarquee speed={14} direction="left" style={{ flex: "1 1 420px", minWidth: "0" }} />
          </div>
        </div>
      </section>
    </>
  );
}
