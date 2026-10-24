"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useMotion } from "@/components/motion/MotionProvider";
import { reviewCards, reviewLinks, reviews, tagColor } from "@/data/reviews";
import { Accent } from "@/components/ui/Accent";

export function Reviews() {
  const { t, ta, href } = useTr();

  const revTrackRef = useRef<HTMLDivElement>(null);
  const revTrack2Ref = useRef<HTMLDivElement>(null);
  const { paused, toggle } = useMotion();
  const [openIdx, setOpenIdx] = useState(-1);
  const [hovered, setHovered] = useState(false);

  // Three copies of all cards per row; each row shows its own shuffled half.
  const revCards = useMemo(() => {
    const list = [];
    for (let copy = 0; copy < 3; copy++) {
      for (const c of reviewCards) {
        const g = c.src !== "trustpilot";
        list.push({
          name: c.name,
          role: c.role,
          hasRole: !!c.role,
          noRole: !c.role,
          quote: c.quote,
          long: c.open >= 0,
          short: c.open < 0,
          open: c.open >= 0 ? () => setOpenIdx(c.open) : undefined,
          hasTags: c.tags.length > 0,
          tags: c.tags,
          wrap: "nowrap" as const,
          hid: copy !== 0,
          srcHref: g ? reviewLinks.google : reviewLinks.trustpilot,
          srcLabel: g ? "Bekijk onze reviews op Google" : "Bekijk onze reviews op Trustpilot",
          srcImg: g ? "/media/icons/google.svg" : "/media/icons/trustpilot.svg",
          srcName: g ? "Google" : "Trustpilot",
        });
      }
    }
    return list;
  }, []);

  const pos = useRef([0, 0]);
  const counts = useRef<[number, number]>([0, 0]);
  useEffect(() => {
    // Shuffle once on the client and split the cards over the two rows.
    const N = reviewCards.length,
      n1 = Math.ceil(N / 2);
    counts.current = [n1, N - n1];
    const perm = Array.from({ length: N }, (_, j) => j);
    for (let j = N - 1; j > 0; j--) {
      const r = Math.floor(Math.random() * (j + 1));
      [perm[j], perm[r]] = [perm[r], perm[j]];
    }
    const split = [perm.slice(0, n1), perm.slice(n1)];
    [revTrackRef.current, revTrack2Ref.current].forEach((tr, k) => {
      if (!tr) return;
      const mine = split[k];
      Array.from(tr.querySelectorAll<HTMLElement>(":scope > article")).forEach((el, idx) => {
        const p = mine.indexOf(idx % N);
        if (p < 0) el.style.display = "none";
        else {
          el.style.display = "";
          el.style.order = String(Math.floor(idx / N) * mine.length + p);
        }
      });
    });
  }, []);
  // Rows drift slowly in opposite directions; they hold still while hovered or while a review is open.
  useFrame((_now, dt) => {
    const a = revTrackRef.current,
      b = revTrack2Ref.current;
    if (!a && !b) return;
    const step = window.innerWidth <= 600 ? 340 : 540;
    const still = hovered || openIdx >= 0;
    pos.current = pos.current.map((p, k) => {
      const L = (counts.current[k] || 4) * step;
      const np = still ? p : p + 18 * dt;
      return np >= L ? np - L : np;
    });
    const L0 = counts.current[0] * step;
    if (a) a.style.transform = `translate3d(${(-L0 + pos.current[0]).toFixed(2)}px,0,0)`;
    if (b) b.style.transform = `translate3d(${(-pos.current[1] - step / 2).toFixed(2)}px,0,0)`;
  });

  const close = () => setOpenIdx(-1);
  useEffect(() => {
    if (openIdx < 0) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(-1);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIdx]);
  const rv = openIdx >= 0 ? reviews[openIdx] : null;
  const rvt = rv && rv.tags ? rv.tags.split(" · ") : [];
  const tg = (i: number) => ({ has: !!rvt[i], t: rvt[i] || "", c: tagColor(rvt[i] || "")[0], b: tagColor(rvt[i] || "")[1] });
  const h = {
    revCards,
    motionPaused: paused,
    motionRunning: !paused,
    motionPressed: paused,
    motionLabel: paused ? "Animaties afspelen" : "Animaties pauzeren",
    toggleMotion: toggle,
    pauseRev: () => setHovered(true),
    playRev: () => setHovered(false),
    closeRev: close,
    revOpen: rv !== null,
    revName: rv?.name ?? "",
    revRole: rv?.role ?? "",
    revQuote: rv?.quote ?? "",
    revHas0: tg(0).has,
    revTag0: tg(0).t,
    revTagC0: tg(0).c,
    revTagB0: tg(0).b,
    revHas1: tg(1).has,
    revTag1: tg(1).t,
    revTagC1: tg(1).c,
    revTagB1: tg(1).b,
    revHas2: tg(2).has,
    revTag2: tg(2).t,
    revTagC2: tg(2).c,
    revTagB2: tg(2).b,
    revHas3: tg(3).has,
    revTag3: tg(3).t,
    revTagC3: tg(3).c,
    revTagB3: tg(3).b,
    revLink: rv?.src === "trustpilot" ? reviewLinks.trustpilot : reviewLinks.google,
    revLinkLabel: rv?.src === "trustpilot" ? "Bekijk op Trustpilot" : "Bekijk op Google",
  };
  return (
    <>
      <section
        id="reviews"
        style={{ fontFamily: "var(--font-body)", color: "#0E1116", position: "relative", background: "#F2F8FE", padding: "64px 0 56px" }}
      >
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="rvStar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDEF6A"></stop>
              <stop offset="100%" stopColor="#F2C811"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px 32px", textAlign: "center" }}>
          <h2
            style={{
              margin: "0",
              color: "#1F246C",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(34px, 4vw, 52px)",
              lineHeight: "1",
              letterSpacing: "-0.025em",
            }}
          >
            <span>{t("Een beetje")}</span>{" "}
            <Accent from="#8639FA" to="#0F8AE5">
              <span className="grad-text" style={{ color: "#8639FA" }}>
                {t("opscheppen")}
              </span>
            </Accent>{" "}
            <span>{t("moet kunnen.")}</span>
          </h2>
        </div>
        <div
          onMouseEnter={h.pauseRev}
          onMouseLeave={h.playRev}
          style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "4px 0 8px" }}
        >
          <div className="rev-wrap" style={{ overflow: "hidden" }}>
            <div ref={revTrackRef} style={{ display: "flex", width: "max-content", alignItems: "stretch" }}>
              {h.revCards.map((c, c_i) => (
                <Fragment key={c_i}>
                  <article
                    aria-hidden={c.hid}
                    style={{
                      position: "relative",
                      boxSizing: "border-box",
                      width: "520px",
                      minHeight: "420px",
                      flexShrink: "0",
                      marginRight: "20px",
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "36px 40px 92px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="44"
                      height="34"
                      viewBox="0 0 56 44"
                      style={{ position: "absolute", top: "24px", right: "28px" }}
                    >
                      <path
                        d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                        fill="#EFE8FD"
                      ></path>
                    </svg>
                    <h3
                      style={{
                        margin: "0",
                        paddingRight: "56px",
                        fontFamily: "var(--font-body)",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#1F246C",
                      }}
                    >
                      {t(String(c.name))}
                    </h3>
                    {c.hasRole && (
                      <>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", marginTop: "4px" }}>
                          <span style={{ fontSize: "15px", lineHeight: "1.3", color: "#8639FA" }}>{t(String(c.role))}</span>
                          <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
                            <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "3px" }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                            </span>
                            <a
                              href={c.srcHref}
                              target="_blank"
                              rel="noopener"
                              aria-label={ta(String(c.srcLabel))}
                              title={ta(String(c.srcLabel))}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                textDecoration: "none",
                                padding: "4px",
                                margin: "-4px",
                                borderRadius: "6px",
                              }}
                            >
                              <img
                                className="rev-source"
                                src={c.srcImg}
                                alt=""
                                style={{ display: "block", width: "18px", height: "18px" }}
                              />
                              <span className="rev-src-name" style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>
                                {t(String(c.srcName))}
                              </span>
                            </a>
                          </span>
                        </div>
                      </>
                    )}
                    {c.noRole && (
                      <>
                        <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", marginTop: "12px" }}>
                          <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "3px" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                          </span>
                          <a
                            href={c.srcHref}
                            target="_blank"
                            rel="noopener"
                            aria-label={ta(String(c.srcLabel))}
                            title={ta(String(c.srcLabel))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              textDecoration: "none",
                              padding: "4px",
                              margin: "-4px",
                              borderRadius: "6px",
                            }}
                          >
                            <img className="rev-source" src={c.srcImg} alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                            <span className="rev-src-name" style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>
                              {t(String(c.srcName))}
                            </span>
                          </a>
                        </span>
                      </>
                    )}
                    {c.long && (
                      <>
                        <div className="rev-qwrap">
                          <p
                            className="rev-q rev-fade"
                            style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: "34px", color: "#3A4150" }}
                          >
                            {t(String(c.quote))}
                          </p>
                          <button
                            type="button"
                            className="rev-more"
                            onClick={c.open}
                            aria-label={ta(String(`Lees de hele review van ${c.name}`))}
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
                              <path d="M12 5v14M5 12h14"></path>
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                    {c.short && (
                      <>
                        <p className="rev-q" style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: "34px", color: "#3A4150" }}>
                          {t(String(c.quote))}
                        </p>
                      </>
                    )}
                    {c.hasTags && (
                      <>
                        <div
                          aria-label={ta("Wat we deden")}
                          style={{
                            position: "absolute",
                            left: "40px",
                            right: "40px",
                            bottom: "32px",
                            display: "flex",
                            flexWrap: c.wrap,
                            gap: "8px",
                            margin: "0",
                            padding: "0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.tags.map((tt, tt_i) => (
                            <Fragment key={tt_i}>
                              <span
                                translate="no"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                  color: tt.c,
                                  background: tt.b,
                                  padding: "4px 10px",
                                  borderRadius: "999px",
                                }}
                              >
                                {tt.t}
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )}
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="rev-wrap" style={{ overflow: "hidden" }}>
            <div ref={revTrack2Ref} style={{ display: "flex", width: "max-content", alignItems: "stretch" }}>
              {h.revCards.map((c, c_i) => (
                <Fragment key={c_i}>
                  <article
                    aria-hidden={c.hid}
                    style={{
                      position: "relative",
                      boxSizing: "border-box",
                      width: "520px",
                      minHeight: "420px",
                      flexShrink: "0",
                      marginRight: "20px",
                      background: "#FFFFFF",
                      borderRadius: "20px",
                      padding: "36px 40px 92px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      width="44"
                      height="34"
                      viewBox="0 0 56 44"
                      style={{ position: "absolute", top: "24px", right: "28px" }}
                    >
                      <path
                        d="M4 44V26C4 12 10 4 24 0l2 6c-8 3-11 8-11 14h9v24zM32 44V26c0-14 6-22 20-26l2 6c-8 3-11 8-11 14h9v24z"
                        fill="#EFE8FD"
                      ></path>
                    </svg>
                    <h3
                      style={{
                        margin: "0",
                        paddingRight: "56px",
                        fontFamily: "var(--font-body)",
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#1F246C",
                      }}
                    >
                      {t(String(c.name))}
                    </h3>
                    {c.hasRole && (
                      <>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", marginTop: "4px" }}>
                          <span style={{ fontSize: "15px", lineHeight: "1.3", color: "#8639FA" }}>{t(String(c.role))}</span>
                          <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
                            <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "3px" }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                  fill="url(#rvStar)"
                                ></path>
                              </svg>
                            </span>
                            <a
                              href={c.srcHref}
                              target="_blank"
                              rel="noopener"
                              aria-label={ta(String(c.srcLabel))}
                              title={ta(String(c.srcLabel))}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                textDecoration: "none",
                                padding: "4px",
                                margin: "-4px",
                                borderRadius: "6px",
                              }}
                            >
                              <img
                                className="rev-source"
                                src={c.srcImg}
                                alt=""
                                style={{ display: "block", width: "18px", height: "18px" }}
                              />
                              <span className="rev-src-name" style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>
                                {t(String(c.srcName))}
                              </span>
                            </a>
                          </span>
                        </div>
                      </>
                    )}
                    {c.noRole && (
                      <>
                        <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", marginTop: "12px" }}>
                          <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "3px" }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                fill="url(#rvStar)"
                              ></path>
                            </svg>
                          </span>
                          <a
                            href={c.srcHref}
                            target="_blank"
                            rel="noopener"
                            aria-label={ta(String(c.srcLabel))}
                            title={ta(String(c.srcLabel))}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              textDecoration: "none",
                              padding: "4px",
                              margin: "-4px",
                              borderRadius: "6px",
                            }}
                          >
                            <img className="rev-source" src={c.srcImg} alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                            <span className="rev-src-name" style={{ fontSize: "13px", fontWeight: "600", color: "#3A4150" }}>
                              {t(String(c.srcName))}
                            </span>
                          </a>
                        </span>
                      </>
                    )}
                    {c.long && (
                      <>
                        <div className="rev-qwrap">
                          <p
                            className="rev-q rev-fade"
                            style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: "34px", color: "#3A4150" }}
                          >
                            {t(String(c.quote))}
                          </p>
                          <button
                            type="button"
                            className="rev-more"
                            onClick={c.open}
                            aria-label={ta(String(`Lees de hele review van ${c.name}`))}
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
                              <path d="M12 5v14M5 12h14"></path>
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                    {c.short && (
                      <>
                        <p className="rev-q" style={{ margin: "12px 0 0", fontSize: "16px", lineHeight: "34px", color: "#3A4150" }}>
                          {t(String(c.quote))}
                        </p>
                      </>
                    )}
                    {c.hasTags && (
                      <>
                        <div
                          aria-label={ta("Wat we deden")}
                          style={{
                            position: "absolute",
                            left: "40px",
                            right: "40px",
                            bottom: "32px",
                            display: "flex",
                            flexWrap: c.wrap,
                            gap: "8px",
                            margin: "0",
                            padding: "0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {c.tags.map((tt, tt_i) => (
                            <Fragment key={tt_i}>
                              <span
                                translate="no"
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "600",
                                  letterSpacing: "0.06em",
                                  textTransform: "uppercase",
                                  color: tt.c,
                                  background: tt.b,
                                  padding: "4px 10px",
                                  borderRadius: "999px",
                                }}
                              >
                                {tt.t}
                              </span>
                            </Fragment>
                          ))}
                        </div>
                      </>
                    )}
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
          <div
            className="rev-links"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px 40px",
              padding: "24px 40px 0",
              fontFamily: "var(--font-display)",
              fontSize: "18px",
              color: "#1F246C",
            }}
          >
            <a href="https://maps.app.goo.gl/gG6kKMrUMjbeg3ZPA" target="_blank" rel="noopener">
              <img src="/media/icons/google.svg" alt="" style={{ width: "22px", height: "22px" }} />
              <span>
                <strong>{t("5,0")}</strong> {t("op Google")}
              </span>
              <span className="rl-cta">
                {t("Lees alle reviews")}
                <span className="rl-arr">{t("→")}</span>
              </span>
            </a>
            <a href="https://nl.trustpilot.com/review/achieve.nl" target="_blank" rel="noopener">
              <img src="/media/icons/trustpilot.svg" alt="" style={{ width: "22px", height: "22px" }} />
              <span>
                <strong>{t("4,5")}</strong> {t("op Trustpilot")}
              </span>
              <span className="rl-cta">
                {t("Lees alle reviews")}
                <span className="rl-arr">{t("→")}</span>
              </span>
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
        {h.revOpen && (
          <>
            <div
              className="rev-backdrop"
              onClick={h.closeRev}
              style={{ position: "absolute", inset: "0", zIndex: "60", background: "rgba(15,18,60,0.55)" }}
            ></div>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="rev-dlg-name"
              className="rev-dlg"
              style={{
                position: "absolute",
                zIndex: "61",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "min(680px, calc(100% - 32px))",
                maxHeight: "calc(100% - 32px)",
                overflowY: "auto",
                boxSizing: "border-box",
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "44px 48px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "0 30px 80px rgba(15,18,60,0.35)",
              }}
            >
              <button
                type="button"
                className="rev-close"
                onClick={h.closeRev}
                aria-label={ta("Sluiten")}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  width: "44px",
                  height: "44px",
                  border: "0",
                  borderRadius: "999px",
                  background: "#F2F8FE",
                  color: "#1F246C",
                  cursor: "pointer",
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
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18"></path>
                </svg>
              </button>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingRight: "48px" }}>
                <h3
                  id="rev-dlg-name"
                  style={{ margin: "0", fontFamily: "var(--font-body)", fontSize: "26px", fontWeight: "600", color: "#1F246C" }}
                >
                  {t(String(h.revName))}
                </h3>
                <span style={{ fontSize: "16px", color: "#8639FA" }}>{t(String(h.revRole))}</span>
              </div>
              <span role="img" aria-label={ta("5 van 5 sterren")} style={{ fontSize: "20px", letterSpacing: "2px", color: "#F2C811" }}>
                {t("★★★★★")}
              </span>
              <p style={{ margin: "0", fontSize: "18px", lineHeight: "34px", color: "#3A4150" }}>{t(String(h.revQuote))}</p>
              <a
                className="feat-link"
                href={h.revLink}
                target="_blank"
                rel="noopener"
                style={{
                  alignSelf: "flex-start",
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
                {t(String(h.revLinkLabel))}
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
              <div aria-label={ta("Wat we deden")} style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {h.revHas0 && (
                  <>
                    <span
                      translate="no"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: h.revTagC0,
                        background: h.revTagB0,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {h.revTag0}
                    </span>
                  </>
                )}
                {h.revHas1 && (
                  <>
                    <span
                      translate="no"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: h.revTagC1,
                        background: h.revTagB1,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {h.revTag1}
                    </span>
                  </>
                )}
                {h.revHas2 && (
                  <>
                    <span
                      translate="no"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: h.revTagC2,
                        background: h.revTagB2,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {h.revTag2}
                    </span>
                  </>
                )}
                {h.revHas3 && (
                  <>
                    <span
                      translate="no"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: h.revTagC3,
                        background: h.revTagB3,
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      {h.revTag3}
                    </span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}
