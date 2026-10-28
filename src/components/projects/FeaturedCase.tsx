"use client";

import { useTr } from "@/i18n/I18nProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFrame } from "@/components/motion/MotionProvider";
import { featuredGallery as GAL } from "@/data/projects";
import { Tip } from "@/components/ui/Tip";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function FeaturedCase() {
  const { t, ta, href } = useTr();

  // Featured case gallery plays by itself: 5.5 s per photo, holds on hover; segments fill up like stories.
  const GAL_MS = 5500;
  const [gi, setGi] = useState(0);
  const [hover, setHover] = useState(false);
  const galBarRef = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    elapsed.current = 0;
  }, [gi]);
  useFrame((_now, dt) => {
    if (!hover) elapsed.current += dt * 1000;
    const p = Math.min(1, elapsed.current / GAL_MS);
    galBarRef.current?.querySelectorAll<HTMLElement>(".gal-seg-fill").forEach((f, k) => {
      f.style.width = (k < gi ? 100 : k === gi ? p * 100 : 0).toFixed(2) + "%";
    });
    if (p >= 1 && GAL.length > 1) {
      elapsed.current = 0;
      setGi((i) => (i + 1) % GAL.length);
    }
  }, true, galBarRef);
  const h = {
    galSlides: GAL.map((g, i) => ({ ...g, isVid: !!g.video, isImg: !g.video, op: i === gi ? "1" : "0", hidden: i !== gi })),
    galSegs: GAL.map((_g, i) => ({ w: i < gi ? "100%" : "0%" })),
    galHoverOn: () => setHover(true),
    galHoverOff: () => setHover(false),
    galLabel: `Afbeelding ${gi + 1} van ${GAL.length}`,
    galCounter: `${gi + 1} / ${GAL.length}`,
    galPrev: () => setGi((i) => (i - 1 + GAL.length) % GAL.length),
    galNext: () => setGi((i) => (i + 1) % GAL.length),
  };
  return (
    <>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "96px 40px 48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}>
            {t("Uitgelichte case")}
          </span>
          <article
            className="pj-card"
            style={{ display: "flex", flexWrap: "wrap", background: "#FFFFFF", borderRadius: "24px", overflow: "hidden" }}
          >
            <div
              className="story-card"
              onMouseEnter={h.galHoverOn}
              onMouseLeave={h.galHoverOff}
              style={{ flex: "1 1 520px", minWidth: "0", position: "relative", minHeight: "440px", overflow: "hidden" }}
            >
              {h.galSlides.map((g, g_i) => (
                <Fragment key={g_i}>
                  {g.isImg && (
                    <>
                      <img
                        className="story-img gal-img"
                        loading="lazy"
                        decoding="async"
                        src={g.img}
                        srcSet={srcSet(g.img)}
                        sizes={IMG_SIZES}
                        alt={ta(String(g.alt))}
                        aria-hidden={g.hidden}
                        style={{
                          position: "absolute",
                          inset: "0",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: g.pos,
                          opacity: g.op,
                        }}
                      />
                    </>
                  )}
                  {g.isVid && (
                    <>
                      <LazyVideo
                        preload="none"
                        className="gal-img"
                        src={g.video}
                        poster={g.poster}
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: "0",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: g.pos,
                          opacity: g.op,
                        }}
                      />
                    </>
                  )}
                </Fragment>
              ))}
              <div
                aria-hidden="true"
                ref={galBarRef}
                style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "4px", display: "flex", gap: "4px" }}
              >
                {h.galSegs.map((q, q_i) => (
                  <Fragment key={q_i}>
                    <div
                      style={{ flex: "1 1 0", minWidth: "0", height: "4px", background: "rgba(255, 255, 255, 0.3)", overflow: "hidden" }}
                    >
                      <div className="gal-seg-fill" style={{ height: "4px", width: q.w, background: "#FFFFFF" }}></div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "24px",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  padding: "4px",
                  borderRadius: "999px",
                  background: "#FFFFFF",
                  boxShadow: "0 10px 28px rgba(31, 36, 108, 0.18)",
                }}
              >
                <button
                  type="button"
                  className="gal-btn"
                  onClick={h.galPrev}
                  aria-label={ta("Vorige afbeelding")}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid transparent",
                    background: "transparent",
                    color: "#1F246C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: "0",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M15 18l-6-6 6-6"></path>
                  </svg>
                </button>
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1F246C",
                    padding: "0 8px",
                    minWidth: "44px",
                    textAlign: "center",
                    fontVariantNumeric: "tabular-nums",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(String(h.galCounter))}
                </span>
                <span
                  aria-live="polite"
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    clip: "rect(0 0 0 0)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(String(h.galLabel))}
                </span>
                <button
                  type="button"
                  className="gal-btn"
                  onClick={h.galNext}
                  aria-label={ta("Volgende afbeelding")}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid transparent",
                    background: "transparent",
                    color: "#1F246C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: "0",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18l6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div
              className="pj-feat-body"
              style={{ flex: "1 1 480px", minWidth: "0", padding: "48px 52px", display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <strong
                    style={{ fontFamily: "var(--font-display)", fontSize: "30px", fontWeight: "700", color: "#1F246C", lineHeight: "1.1" }}
                  >
                    <a href={href("CaseRCpeptides")} className="pj-title">
                      {t("RCpeptides")}
                    </a>
                  </strong>
                  <span style={{ fontSize: "15px", color: "#5A6273" }}>{t("Life sciences")}</span>
                </span>
                <span style={{ display: "flex", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#6E5A00",
                      background: "#FFF6C7",
                      padding: "4px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {t("SEA")}
                  </span>
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", position: "relative" }}>
                <span
                  className="grad-text pj-feat-kpi"
                  style={{
                    alignSelf: "flex-start",
                    fontFamily: "var(--font-display)",
                    fontWeight: "700",
                    fontSize: "80px",
                    lineHeight: "0.95",
                    letterSpacing: "-0.03em",
                    color: "#8639FA",
                  }}
                >
                  {t("8,3x")}
                </span>
                <span style={{ fontSize: "17px", fontWeight: "600", color: "#1F246C" }}>
                  {t("ROAS")}
                  <Tip label={ta("Uitleg")}>
                    {t(
                      "ROAS (return on ad spend): hoeveel omzet elke euro aan advertenties oplevert. 8,3x betekent € 8,30 omzet per euro.",
                    )}
                  </Tip>{" "}
                  {t("in de eerste maand")}
                </span>
              </div>
              <div className="pj-feat-cols" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}
                  >
                    {t("Uitdaging")}
                  </span>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                    {t("Een jonge webshop, nog zonder bewezen advertentiekanaal.")}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8639FA" }}
                  >
                    {t("Aanpak")}
                  </span>
                  <p style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                    {t("Een eerste maand met zoekadvertenties en Shopping")}
                    <Tip label={ta("Uitleg")}>
                      {t(
                        "Zoekadvertenties: tekstadvertenties boven de zoekresultaten in Google. Shopping: advertenties met productfoto en prijs.",
                      )}
                    </Tip>
                    {t(", dagelijks bijgestuurd.")}
                  </p>
                </div>
              </div>
              <blockquote
                style={{
                  margin: "auto 0 0",
                  padding: "28px 32px",
                  borderRadius: "16px",
                  background: "#F8F5FE",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#F2C811"
                      ></path>
                    </svg>
                  </span>
                  <img
                    src="/media/icons/google.svg"
                    alt={ta("Google review")}
                    width="20"
                    height="20"
                    style={{ display: "block", width: "20px", height: "20px" }}
                  />
                </div>
                <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.7", fontWeight: "500", color: "#1F246C" }}>
                  {t(
                    "“Nog nooit zo snel een goede band met een agency opgebouwd. Eerste pilotmaand met alleen Google Shopping en meteen 6,4 ROAS. Bewijs praat dus voor zichzelf.”",
                  )}
                </p>
                <footer style={{ paddingTop: "20px", borderTop: "1px solid #E6DEFA" }}>
                  <cite style={{ fontStyle: "normal", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
                    {t("Boris Boot · Webshopeigenaar")}
                  </cite>
                </footer>
              </blockquote>
              <div className="cta-duo" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 24px" }}>
                <a
                  href={href("CaseRCpeptides")}
                  className="feat-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    minHeight: "52px",
                    padding: "0 28px",
                    borderRadius: "8px",
                    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    fontWeight: "700",
                    fontSize: "16px",
                  }}
                >
                  {t("Lees wat werkte")}{" "}
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
                <a
                  href="https://calendly.com/vrijblijvendgesprek/"
                  target="_blank"
                  rel="noopener"
                  className="feat-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "44px",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                    textUnderlineOffset: "4px",
                  }}
                >
                  {t("Plan je groeigesprek")}
                  <svg
                    className="l1-ar"
                    width="16"
                    height="16"
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
          </article>
        </div>
      </section>
    </>
  );
}
