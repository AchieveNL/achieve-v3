"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useTick } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";

export function Approach() {
  const { t, ta, href } = useTr();

  // Steps light up one by one (01 → 04), hold, then start over.
  const [tick, setTick] = useState<number | null>(null);
  useEffect(() => {
    const id = setTimeout(() => setTick(0), 0);
    return () => clearTimeout(id);
  }, []);
  useTick(5000, () => setTick((v) => ((v ?? 0) + 1) % 6));
  const si = tick === null ? 3 : Math.min(tick, 3);
  const h = { op0: si === 0 ? 1 : 0, op1: si === 1 ? 1 : 0, op2: si === 2 ? 1 : 0, op3: si === 3 ? 1 : 0 };
  return (
    <>
      <section id="werkwijze" style={{ background: "#FFFFFF" }}>
        <div
          className="ww-grid"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "112px 40px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
            gap: "56px 80px",
            alignItems: "start",
          }}
        >
          <div className="ww-intro" style={{ display: "flex", flexDirection: "column", gap: "28px", position: "sticky", top: "120px" }}>
            <p
              style={{
                margin: "0",
                fontSize: "15px",
                fontWeight: "700",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8639FA",
              }}
            >
              {t("Onze werkwijze")}
            </p>
            <h2
              style={{
                margin: "0",
                color: "#1F246C",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(36px, 4.5vw, 60px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
                maxWidth: "520px",
              }}
            >
              {t("Goede beslissingen beginnen met een")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={{ color: "#8639FA" }}>
                  {t("goed gesprek.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "20px", lineHeight: "1.5", color: "#3A4150", maxWidth: "440px" }}>
              {t("Jij bepaalt de richting. Wij bouwen de weg.")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "14px" }}>
              <a
                href="https://calendly.com/vrijblijvendgesprek/"
                target="_blank"
                rel="noopener"
                className="glow d2"
                style={{
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "18px 30px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "19px",
                }}
              >
                {t("Plan je groeigesprek")}
              </a>
              <span style={{ fontSize: "15px", color: "#3A4150" }}>{t("Vrijblijvend kennismaken.")}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", minWidth: "0" }}>
            <ol style={{ margin: "0", padding: "0", listStyle: "none", borderBottom: "1px solid #E4E6EA" }}>
              <li
                className="ww-row"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                  padding: "32px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    background: "linear-gradient(90deg, #8639FA, #0F8AE5)",
                    transformOrigin: "left",
                    opacity: h.op0,
                    transition: "opacity 1.2s ease-in-out",
                  }}
                ></span>
                <span
                  className="ww-num"
                  style={{
                    position: "relative",
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "72px",
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px #7FBEF0" }}>{t("01")}</span>
                  <span
                    aria-hidden="true"
                    className="grad-text"
                    style={{ position: "absolute", top: "0", left: "0", opacity: h.op0, transition: "opacity 1.2s ease-in-out" }}
                  >
                    {t("01")}
                  </span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <h3
                    style={{
                      margin: "0",
                      color: "#1F246C",
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: "700",
                      lineHeight: "1.15",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("Jouw verhaal")}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150", maxWidth: "540px" }}>
                    {t("We leren jou en je organisatie kennen. Waar je vandaan komt, wat er speelt en de stip op de horizon.")}
                  </p>
                </div>
              </li>
              <li
                className="ww-row"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                  padding: "32px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    background: "linear-gradient(90deg, #8639FA, #0F8AE5)",
                    transformOrigin: "left",
                    opacity: h.op1,
                    transition: "opacity 1.2s ease-in-out",
                  }}
                ></span>
                <span
                  className="ww-num"
                  style={{
                    position: "relative",
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "72px",
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px #7FBEF0" }}>{t("02")}</span>
                  <span
                    aria-hidden="true"
                    className="grad-text"
                    style={{ position: "absolute", top: "0", left: "0", opacity: h.op1, transition: "opacity 1.2s ease-in-out" }}
                  >
                    {t("02")}
                  </span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <h3
                    style={{
                      margin: "0",
                      color: "#1F246C",
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: "700",
                      lineHeight: "1.15",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("Het speelveld")}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150", maxWidth: "540px" }}>
                    {t("We duiken in je branche, je concurrenten en je klanten. Zo weten we precies waar de kansen liggen.")}
                  </p>
                </div>
              </li>
              <li
                className="ww-row"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                  padding: "32px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    background: "linear-gradient(90deg, #8639FA, #0F8AE5)",
                    transformOrigin: "left",
                    opacity: h.op2,
                    transition: "opacity 1.2s ease-in-out",
                  }}
                ></span>
                <span
                  className="ww-num"
                  style={{
                    position: "relative",
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "72px",
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px #7FBEF0" }}>{t("03")}</span>
                  <span
                    aria-hidden="true"
                    className="grad-text"
                    style={{ position: "absolute", top: "0", left: "0", opacity: h.op2, transition: "opacity 1.2s ease-in-out" }}
                  >
                    {t("03")}
                  </span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <h3
                    style={{
                      margin: "0",
                      color: "#1F246C",
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: "700",
                      lineHeight: "1.15",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("Het groeiplan")}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150", maxWidth: "540px" }}>
                    {t("Je krijgt een helder voorstel met doelen, stappen, planning en prijs. Je weet precies waar je aan toe bent.")}
                  </p>
                </div>
              </li>
              <li
                className="ww-row"
                style={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: "120px minmax(0, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                  padding: "32px 0",
                  borderTop: "1px solid #E4E6EA",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "0",
                    right: "0",
                    height: "2px",
                    background: "linear-gradient(90deg, #8639FA, #0F8AE5)",
                    transformOrigin: "left",
                    opacity: h.op3,
                    transition: "opacity 1.2s ease-in-out",
                  }}
                ></span>
                <span
                  className="ww-num"
                  style={{
                    position: "relative",
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "72px",
                    lineHeight: "0.85",
                    letterSpacing: "-0.03em",
                  }}
                >
                  <span style={{ color: "transparent", WebkitTextStroke: "1.5px #7FBEF0" }}>{t("04")}</span>
                  <span
                    aria-hidden="true"
                    className="grad-text"
                    style={{ position: "absolute", top: "0", left: "0", opacity: h.op3, transition: "opacity 1.2s ease-in-out" }}
                  >
                    {t("04")}
                  </span>
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "0" }}>
                  <h3
                    style={{
                      margin: "0",
                      color: "#1F246C",
                      fontFamily: "var(--font-display)",
                      fontSize: "28px",
                      fontWeight: "700",
                      lineHeight: "1.15",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {t("Samen groeien")}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150", maxWidth: "540px" }}>
                    {t("We bouwen, lanceren en optimaliseren op data. Tot de resultaten voor zich spreken.")}
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
