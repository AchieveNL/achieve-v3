"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useRef } from "react";
import { useFrame } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";

export function Team() {
  const { t, ta, href } = useTr();

  // Team portraits slowly orbit around "Jouw ambitie".
  const root = useRef<HTMLElement | null>(null);
  const ORDER = ["Karim", "Abdelmonim", "Niek", "Seyma", "Jonas", "Denise"];
  useFrame((_now, _dt, t) => {
    const r = root.current;
    if (!r) return;
    const bubbles = Array.from(r.querySelectorAll<HTMLElement>(".team-bubble"));
    const N = bubbles.length || 6,
      R = 44,
      SPEED = 4,
      W = 23;
    bubbles.forEach((el) => {
      const img = el.querySelector("img");
      const slot = Math.max(0, ORDER.indexOf(el.dataset.name || (img?.getAttribute("data-name") ?? "")));
      const ang = ((-135 + slot * (360 / N) + t * SPEED) * Math.PI) / 180;
      const cx = 50 + Math.cos(ang) * R,
        cy = 50 + Math.sin(ang) * R;
      // Anchor at the centre and move with `translate` (sub-pixel smooth), not left/top (snaps to pixels and jitters).
      const box = el.offsetParent as HTMLElement | null;
      const bw = box?.clientWidth ?? 0,
        bh = box?.clientHeight ?? 0;
      el.style.transition = "none";
      el.style.right = "auto";
      el.style.bottom = "auto";
      el.style.left = 50 - W / 2 + "%";
      el.style.top = 50 - W / 2 + "%";
      el.style.width = W + "%";
      el.style.willChange = "translate";
      el.style.translate = `${(((cx - 50) * bw) / 100).toFixed(2)}px ${(((cy - 50) * bh) / 100).toFixed(2)}px`;
    });
    r.querySelectorAll("[data-orbit]").forEach((el) => el.setAttribute("transform", `rotate(${((t * 4) % 360).toFixed(2)} 50 50)`));
  });
  return (
    <>
      <section id="over-ons" ref={root} style={{ background: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "112px 40px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "48px 80px",
          }}
        >
          <div style={{ flex: "1 1 460px", minWidth: "0" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: "560px", aspectRatio: "1 / 1", margin: "0 auto" }}>
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", overflow: "visible" }}
              >
                <circle
                  data-orbit="1"
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#DCCBFD"
                  strokeWidth="0.35"
                  strokeDasharray="1.2 1.6"
                ></circle>
                <circle cx="50" cy="50" r="28" fill="none" stroke="#CDE5FB" strokeWidth="0.35"></circle>
                <circle cx="50" cy="50" r="17" fill="#F8F5FE"></circle>
              </svg>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "32%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  lineHeight: "1",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "clamp(16px, 2vw, 22px)", color: "#1F246C" }}
                >
                  {t("Jouw")}
                </span>
                <span
                  className="grad-text"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "clamp(24px, 3.2vw, 36px)",
                    letterSpacing: "-0.02em",
                    color: "#8639FA",
                    paddingBottom: "0.08em",
                  }}
                >
                  {t("ambitie")}
                </span>
              </div>
              <div
                className="team-bubble"
                data-name="Karim"
                style={{ position: "absolute", left: "7.387%", top: "7.387%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#EFE8FD",
                    }}
                  >
                    <img
                      src="/media/team/karim.svg"
                      alt={ta("Portret van Karim")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Karim")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Owner / Digital Creative")}</span>
                </div>
              </div>
              <div
                className="team-bubble"
                data-name="Abdelmonim"
                style={{ position: "absolute", left: "49.888%", top: "-4.001%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#E3F1FD",
                    }}
                  >
                    <img
                      src="/media/team/abdelmonim.svg"
                      alt={ta("Portret van Abdelmonim")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Abdelmonim")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Full stack developer")}</span>
                </div>
              </div>
              <div
                className="team-bubble"
                data-name="Niek"
                style={{ position: "absolute", left: "81.001%", top: "27.112%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#FFF6C7",
                    }}
                  >
                    <img
                      src="/media/team/niek.svg"
                      alt={ta("Portret van Niek")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Niek")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Performance marketer")}</span>
                </div>
              </div>
              <div
                className="team-bubble"
                data-name="Jonas"
                style={{ position: "absolute", left: "27.112%", top: "81.001%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#E3F1FD",
                    }}
                  >
                    <img
                      src="/media/team/jonas.svg"
                      alt={ta("Portret van Jonas")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Jonas")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Videographer")}</span>
                </div>
              </div>
              <div
                className="team-bubble"
                data-name="Seyma"
                style={{ position: "absolute", left: "69.613%", top: "69.613%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#EFE8FD",
                    }}
                  >
                    <img
                      src="/media/team/seyma.svg"
                      alt={ta("Portret van Seyma")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Seyma")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Graphic designer")}</span>
                </div>
              </div>
              <div
                className="team-bubble"
                data-name="Denise"
                style={{ position: "absolute", left: "-4.001%", top: "49.888%", width: "23%", aspectRatio: "1 / 1" }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    padding: "0",
                    boxSizing: "border-box",
                    background: "transparent",
                    boxShadow: "0 6px 18px rgba(31, 36, 108, 0.10)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#FFF6C7",
                    }}
                  >
                    <img
                      src="/media/team/denise.svg"
                      alt={ta("Portret van Denise")}
                      className="team-img"
                      style={{ maxWidth: "none", position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "calc(100% - 18px)",
                    transform: "translateX(-50%)",
                    background: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    boxShadow: "0 10px 24px rgba(31, 36, 108, 0.14)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <strong style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "700", color: "#1F246C" }}>
                    {t("Denise")}
                  </strong>
                  <span style={{ fontSize: "12px", fontWeight: "600", color: "#8639FA" }}>{t("Growth advisor")}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 460px", minWidth: "0", display: "flex", flexDirection: "column", gap: "24px" }}>
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
              {t("Ons team")}
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
              }}
            >
              {t("Omring je met mensen die je")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text" style={{ color: "#8639FA" }}>
                  {t("verder")}
                </span>
              </Accent>{" "}
              {t("brengen.")}
            </h2>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.7", color: "#3A4150" }}>
              {t(
                "Achieve is de digital agency voor ondernemers die meer willen. Onze strategen, designers, developers en marketeers werken als één team aan één doel: jouw ambitie waarmaken.",
              )}
            </p>
            <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.7", color: "#3A4150" }}>
              {t(
                "Wij geloven dat succes begint bij een helder doel en de discipline om ervoor te gaan. Die mindset brengen we in elk project: we luisteren eerst, zijn altijd eerlijk en blijven elke dag leren. Zo maken we van ambitie resultaat.",
              )}
            </p>
            <a
              href={href("OverOns")}
              className="about-link"
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                minHeight: "44px",
                marginTop: "8px",
                fontSize: "16px",
                fontWeight: "600",
                color: "#1F246C",
                textDecoration: "none",
              }}
            >
              <span className="l2-txt">{t("Ontdek ons verhaal")}</span>{" "}
              <span
                className="svc-arrow"
                aria-hidden="true"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "999px",
                  border: "1px solid #D5DAE3",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
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
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
