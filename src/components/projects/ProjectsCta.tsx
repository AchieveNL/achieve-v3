import type { ServerTr } from "@/i18n/server";

import { Accent } from "@/components/ui/Accent";
export function ProjectsCta({ tr }: { tr: ServerTr }) {
  const { t, ta, href } = tr;

  return (
    <>
      <section
        className="pj-wrap cta-arrows"
        style={{ background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)", color: "#FFFFFF", padding: "96px 40px" }}
      >
        <div
          className="pj-cta"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
          }}
        >
          <p
            style={{
              margin: "0",
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: "700",
              fontStyle: "italic",
              color: "#FAE84E",
            }}
          >
            {t("Ambition, delivered.")}
          </p>
          <h2
            style={{
              margin: "0",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: "1",
              letterSpacing: "-0.025em",
            }}
          >
            {t("Ben jij de volgende")}{" "}
            <Accent from="#FAE84E" to="#F2C811">
              <span style={{ color: "#FAE84E" }}>{t("Achiever?")}</span>
            </Accent>
          </h2>
          <p style={{ margin: "0", maxWidth: "560px", fontSize: "18px", lineHeight: "1.6", color: "#FFFFFF" }}>
            {t("Vertel ons waar je naartoe wilt. Wij laten zien hoe je er komt.")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", paddingTop: "8px" }}>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="btn-white"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "56px",
                padding: "0 32px",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#1F246C",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "19px",
              }}
            >
              {t("Plan je groeigesprek")}
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
            <a
              href="tel:+31854016590"
              className="btn-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "56px",
                padding: "0 28px",
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
          </div>
          <div className="cta-team" style={{ display: "flex", alignItems: "center", gap: "16px", paddingTop: "8px" }}>
            <span style={{ display: "flex" }}>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#EFE8FD",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "0px",
                  zIndex: "10",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/small/karim.webp"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FFF6C7",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-16px",
                  zIndex: "9",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/small/denise.webp"
                  alt=""
                  style={{ position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#E3F1FD",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-16px",
                  zIndex: "8",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/small/abdelmonim.webp"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#FFF6C7",
                  border: "3px solid #FFFFFF",
                  boxSizing: "border-box",
                  marginLeft: "-16px",
                  zIndex: "7",
                  flexShrink: "0",
                }}
              >
                <img
                  src="/media/team/small/niek.webp"
                  alt=""
                  style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                />
              </span>
            </span>
            <span style={{ textAlign: "left", fontSize: "15px", lineHeight: "1.45", color: "#FFFFFF" }}>
              <b>{t("We kijken uit naar je verhaal.")}</b>
              <br />
              {t("Reactie binnen 4 uur op werkdagen.")}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
