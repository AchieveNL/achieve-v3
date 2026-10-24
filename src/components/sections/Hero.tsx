"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useRef, useState } from "react";
import { useFrame, useMotion, useTick } from "@/components/motion/MotionProvider";
import { Accent } from "@/components/ui/Accent";
import { Tip } from "@/components/ui/Tip";

export function Hero() {
  const { t, ta, href } = useTr();

  const fc0Ref = useRef<HTMLDivElement>(null),
    fc1Ref = useRef<HTMLDivElement>(null),
    fc2Ref = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null),
    orb2Ref = useRef<HTMLDivElement>(null),
    orbWRef = useRef<HTMLDivElement>(null);
  const { paused, toggle } = useMotion();
  const [ti, setTi] = useState(0);
  useTick(5000, () => setTi((i) => (i + 1) % 4));

  // Floating review cards: visible from first paint (CSS entrance in achieve.css,
  // so they don't wait for JavaScript), then bob gently once the page is live.
  // The three orbs drift and shift colour behind them.
  useFrame((now, _dt, t) => {
    const cards = [
      [fc0Ref.current, 0, 10],
      [fc1Ref.current, 1.6, 12],
      [fc2Ref.current, 3.2, 9],
    ] as const;
    const ramp = Math.min(1, t / 1.2);
    for (const [el, ph, amp] of cards) {
      if (!el) continue;
      el.style.transform = `translateY(${(Math.sin(t * 0.9 + ph) * amp * ramp).toFixed(2)}px)`;
    }
    const cols = [
      [134, 57, 250],
      [232, 170, 240],
      [15, 138, 229],
      [140, 200, 255],
      [134, 57, 250],
    ];
    const orbs = [
      [orbRef.current, 0, 0.5, 0, 15, 16, 0.8],
      [orb2Ref.current, 2, 0.42, Math.PI, 15, 16, 0.8],
    ] as const;
    for (const [el, off, sp, ph0, rx, ry, wa] of orbs) {
      if (!el) continue;
      const cyc = (t / 14 + off) % 4,
        ci = Math.floor(cyc),
        f = cyc - ci;
      const sm = f * f * (3 - 2 * f);
      const c = cols[ci].map((v, j) => Math.round(v + (cols[ci + 1][j] - v) * sm));
      const al = (0.36 + 0.2 * ((c[0] + c[1] + c[2]) / 765)).toFixed(2);
      const wx = (50 + Math.cos(t * 0.6 + off * 3) * 18).toFixed(1),
        wy = (50 + Math.sin(t * 0.6 + off * 3) * 18).toFixed(1);
      el.style.background = `radial-gradient(circle 150px at ${wx}% ${wy}%, rgba(255,255,255,${wa}) 0%, rgba(255,255,255,${(wa * 0.45).toFixed(2)}) 50%, rgba(255,255,255,0) 100%), radial-gradient(closest-side, rgba(${c.join(",")},${al}) 30%, rgba(${c.join(",")},0) 100%)`;
      const th = t * 0.16 + ph0;
      el.style.left = (50 + Math.cos(th) * rx).toFixed(2) + "%";
      el.style.top = (52 + Math.sin(th) * ry).toFixed(2) + "%";
      el.style.transform = `scale(${(1 + Math.sin(t * sp + off) * 0.06).toFixed(3)})`;
    }
    const w = orbWRef.current;
    if (w) {
      w.style.left = (50 + Math.sin(t * 0.23) * 12).toFixed(2) + "%";
      w.style.top = (52 + Math.cos(t * 0.19) * 12).toFixed(2) + "%";
      w.style.transform = `scale(${(1 + Math.sin(t * 0.37) * 0.08).toFixed(3)})`;
    }
    void now;
  });

  const h = {
    t0: ti === 0,
    t1: ti === 1,
    t2: ti === 2,
    t3: ti === 3,
    motionPaused: paused,
    motionRunning: !paused,
    motionPressed: paused,
    motionLabel: paused ? "Animaties afspelen" : "Animaties pauzeren",
    toggleMotion: toggle,
  };
  return (
    <>
      <section style={{ background: "#FFFFFF", color: "#0E1116" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "88px 40px 112px",
            display: "flex",
            flexWrap: "wrap",
            gap: "56px",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: "0", display: "flex", flexDirection: "column", gap: "32px" }}>
            <span
              translate="no"
              className="ai-pill hero-pill"
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px 12px",
                padding: "8px 16px",
                borderRadius: "999px",
                border: "1px solid #E4E6EA",
                background: "#FFFFFF",
                fontSize: "13px",
                fontWeight: "700",
                letterSpacing: "0.06em",
                color: "#1F246C",
                marginBottom: "-12px",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
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
              <span aria-hidden="true" style={{ width: "1px", height: "14px", background: "#D3D1E8" }}></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F8AE5"
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
            <p
              className="hero-rate"
              style={{
                margin: "0",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "8px 20px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#1F246C",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <img className="hero-rate-logo" src="/media/icons/google.svg" alt="" style={{ width: "16px", height: "16px" }} />
                <span role="img" aria-label={ta("5 van 5 sterren op Google")} style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                </span>
                <span>
                  <strong style={{ fontWeight: "700" }}>{t("5,0")}</strong>
                  <span className="hero-rate-name"> {t("Google")}</span>
                </span>
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <img className="hero-rate-logo" src="/media/icons/trustpilot.svg" alt="" style={{ width: "16px", height: "16px" }} />
                <span role="img" aria-label={ta("4,5 van 5 sterren op Trustpilot")} style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <clipPath id="sh">
                        <rect x="0" y="0" width="12" height="24"></rect>
                      </clipPath>
                    </defs>
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#E4E6EA"
                    ></path>
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                      clipPath="url(#sh)"
                    ></path>
                  </svg>
                </span>
                <span>
                  <strong style={{ fontWeight: "700" }}>{t("4,5")}</strong>
                  <span className="hero-rate-name"> {t("Trustpilot")}</span>
                </span>
              </span>
            </p>
            <h1
              style={{
                margin: "0",
                color: "#1F246C",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(40px, 4.8vw, 68px)",
                lineHeight: "1",
                letterSpacing: "-0.025em",
                maxWidth: "1100px",
                minHeight: "2em",
              }}
            >
              {h.t0 && (
                <>
                  <span className="rot-in" style={{ display: "block" }}>
                    {t("Groot denken.")}
                    <br />
                    <Accent from="#8639FA" to="#0F8AE5">
                      <span className="grad-text" style={{ color: "#8639FA" }}>
                        {t("Groots doen.")}
                      </span>
                    </Accent>
                  </span>
                </>
              )}
              {h.t1 && (
                <>
                  <span className="rot-in" style={{ display: "block" }}>
                    {t("Met een plan wordt je doel")}{" "}
                    <Accent from="#8639FA" to="#0F8AE5">
                      <span className="grad-text" style={{ color: "#8639FA" }}>
                        {t("werkelijkheid.")}
                      </span>
                    </Accent>
                  </span>
                </>
              )}
              {h.t2 && (
                <>
                  <span className="rot-in" style={{ display: "block" }}>
                    {t("Elke dag een stap dichter bij je")}{" "}
                    <Accent from="#8639FA" to="#0F8AE5">
                      <span className="grad-text" style={{ color: "#8639FA" }}>
                        {t("doel.")}
                      </span>
                    </Accent>
                  </span>
                </>
              )}
              {h.t3 && (
                <>
                  <span className="rot-in" style={{ display: "block" }}>
                    {t("Jij de visie, wij de")}{" "}
                    <Accent from="#8639FA" to="#0F8AE5">
                      <span className="grad-text" style={{ color: "#8639FA" }}>
                        {t("uitvoering.")}
                      </span>
                    </Accent>
                  </span>
                </>
              )}
            </h1>
            <p style={{ margin: "0", fontSize: "21px", lineHeight: "1.55", color: "#3A4150", maxWidth: "640px" }}>
              {t("Jij hebt de ambitie. Wij bouwen alles wat nodig is om het waar te maken.")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingTop: "8px" }}>
              <a
                href="https://calendly.com/vrijblijvendgesprek/"
                target="_blank"
                rel="noopener"
                className="glow d2 m-hero-k1"
                style={{
                  background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  padding: "20px 32px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "19px",
                }}
              >
                {t("Plan je groeigesprek")}
              </a>
              <a
                href="#werk"
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
                {t("Ontdek hoe zij groeiden")}
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
              <button
                type="button"
                className="motion-toggle"
                onClick={h.toggleMotion}
                aria-pressed={h.motionPressed}
                aria-label={ta(String(h.motionLabel))}
                title={ta(String(h.motionLabel))}
                style={{
                  flexShrink: "0",
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "1px solid #D5DAE3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  alignSelf: "center",
                }}
              >
                {h.motionRunning && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                      <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                    </svg>
                  </>
                )}
                {h.motionPaused && (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"></path>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
          <div style={{ flex: "1 1 380px", minWidth: "0", maxWidth: "540px", position: "relative", height: "480px" }}>
            <div
              aria-hidden="true"
              className="hero-orb"
              ref={orbRef}
              style={{
                position: "absolute",
                top: "38%",
                left: "62%",
                width: "440px",
                height: "440px",
                margin: "-220px 0 0 -220px",
                borderRadius: "50%",
                background: "radial-gradient(closest-side, rgba(134, 57, 250, 0.42), rgba(134, 57, 250, 0) 100%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            ></div>
            <div
              aria-hidden="true"
              className="hero-orb"
              ref={orb2Ref}
              style={{
                position: "absolute",
                top: "66%",
                left: "36%",
                width: "440px",
                height: "440px",
                margin: "-220px 0 0 -220px",
                borderRadius: "50%",
                background: "radial-gradient(closest-side, rgba(134, 57, 250, 0.42), rgba(134, 57, 250, 0) 100%)",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            ></div>
            <div
              aria-hidden="true"
              className="hero-orb"
              ref={orbWRef}
              style={{
                position: "absolute",
                top: "52%",
                left: "50%",
                width: "300px",
                height: "300px",
                margin: "-150px 0 0 -150px",
                borderRadius: "50%",
                background:
                  "radial-gradient(closest-side, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.6) 45%, rgba(255, 255, 255, 0) 100%)",
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            ></div>
            <div
              ref={fc0Ref}
              className="hero-card-in"
              style={{
                animationDelay: "0s",
                boxSizing: "border-box",
                position: "absolute",
                top: "0",
                left: "0",
                width: "84%",
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "36px",
                boxShadow: "0 2px 4px rgba(31, 36, 108, 0.04), 0 16px 32px rgba(31, 36, 108, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src="/media/icons/google.svg"
                    alt=""
                    width="16"
                    height="16"
                    style={{ display: "block", width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>{t("Google review")}</span>
                </span>
              </span>
              <p
                style={{
                  margin: "0",
                  fontFamily: "var(--font-display)",
                  fontWeight: "700",
                  fontSize: "27px",
                  lineHeight: "1.25",
                  color: "#1F246C",
                }}
              >
                {t("“Nog nooit zo snel een goede band met een agency opgebouwd.”")}
              </p>
              <span style={{ fontSize: "15px", color: "#3A4150" }}>
                <strong style={{ color: "#1F246C", fontWeight: "600" }}>{t("Boris Boot")}</strong> {t("· Webshopeigenaar")}
              </span>
            </div>
            <div
              ref={fc1Ref}
              className="result-arrows hero-card-in"
              style={{
                animationDelay: ".12s",
                zIndex: "3",
                boxSizing: "border-box",
                position: "absolute",
                top: "172px",
                right: "0",
                width: "66%",
                background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
                borderRadius: "20px",
                padding: "32px",
                color: "#FFFFFF",
                boxShadow: "0 2px 4px rgba(31, 36, 108, 0.04), 0 16px 32px rgba(31, 36, 108, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase", color: "#FAE84E" }}>
                {t("Resultaat")}
              </span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: "700", fontSize: "68px", lineHeight: "1" }}>{t("8,3x")}</span>
              <span style={{ fontSize: "17px", lineHeight: "1.4", color: "#FFFFFF" }}>
                {t("ROAS")}
                <Tip label={ta("Uitleg")}>
                  {t("ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.")}
                </Tip>{" "}
                {t("in de eerste maand met zoekadvertenties en Shopping")}
              </span>
            </div>
            <div
              ref={fc2Ref}
              className="hero-card-in"
              style={{
                animationDelay: ".24s",
                zIndex: "2",
                boxSizing: "border-box",
                position: "absolute",
                top: "344px",
                left: "4%",
                width: "80%",
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "28px 32px",
                boxShadow: "0 2px 4px rgba(31, 36, 108, 0.04), 0 16px 32px rgba(31, 36, 108, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="url(#sgStar)"
                    ></path>
                  </svg>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                  <img
                    src="/media/icons/google.svg"
                    alt=""
                    width="16"
                    height="16"
                    style={{ display: "block", width: "16px", height: "16px" }}
                  />
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>{t("Google review")}</span>
                </span>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "0" }}>
                <strong style={{ fontSize: "14px", color: "#1F246C", fontWeight: "600", lineHeight: "1.45" }}>
                  {t("“Doen precies wat ik wil met mijn visie en sturen bij waar hun ervaring goed van pas komt.”")}
                </strong>
                <span style={{ fontSize: "13px", color: "#3A4150" }}>{t("Boris Boot · Webshopeigenaar")}</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
