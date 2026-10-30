"use client";

import { useTr } from "@/i18n/I18nProvider";
import { srcSet, IMG_SIZES } from "@/lib/img";
import { Fragment, useEffect, useState } from "react";
import { useMotion, useTick } from "@/components/motion/MotionProvider";
import { heroProjects as ALL_HERO } from "@/data/projects";

/** Slides shown per visit. The first project stays put (it is the LCP image); the others are a random pick. */
const SHOW = 6;
import { LazyVideo } from "@/components/ui/LazyVideo";

export function ProjectsHero() {
  const { t, ta, href } = useTr();

  // Full-screen slides of recent projects; every 6 s the next one wipes in. Thumbnails pick a slide.
  const { paused, toggle } = useMotion();
  // Server render: the first SHOW projects. After load, every visit gets a different selection in random order.
  const [order, setOrder] = useState<number[]>(() => ALL_HERO.slice(0, SHOW).map((_, i) => i));
  useEffect(() => {
    const id = setTimeout(() => {
      const rest = ALL_HERO.map((_, i) => i).slice(1);
      for (let j = rest.length - 1; j > 0; j--) {
        const r = Math.floor(Math.random() * (j + 1));
        [rest[j], rest[r]] = [rest[r], rest[j]];
      }
      setOrder([0, ...rest.slice(0, SHOW - 1)]);
    }, 0);
    return () => clearTimeout(id);
  }, []);
  const heroProjects = order.map((i) => ALL_HERO[i]);
  const N = heroProjects.length;
  const [st, setSt] = useState({ i: 0, prev: -1, dir: "R" as "L" | "R" });
  const [pool, setPool] = useState<Record<string, string>>({});
  // Projects with a photo pool show a random photo each time they come up (client only, so SSR stays stable).
  const curPool = heroProjects[st.i].pool;
  const curName = heroProjects[st.i].name;
  useEffect(() => {
    const p = curPool;
    if (!p?.length) return;
    const id = setTimeout(() => setPool((o) => ({ ...o, [curName]: p[Math.floor(Math.random() * p.length)] })), 0);
    return () => clearTimeout(id);
  }, [curName, curPool]);
  useTick(6000, () => setSt((s) => ({ i: (s.i + 1) % N, prev: s.i, dir: "R" })));
  const cur = heroProjects[st.i];
  const h = {
    heroDim: "0.5",
    heroSlides: heroProjects.map((p, i) => {
      const img = pool[p.name] ?? p.img;
      return {
        ...p,
        img,
        thumb: p.thumb ?? img,
        hasImg: !!img,
        noImg: !img && !p.video,
        showImg: !!img && !p.video,
        hasVid: !!p.video,
        // Only the current and the next slide load their media; the rest waits until it is (almost) shown.
        load: i === st.i || i === (st.i + 1) % N || i === st.prev,
        active: i === st.i, // only the visible slide downloads and plays its video
        cls: i === st.i ? "is-active" + (st.dir === "L" ? " from-left" : "") : i === st.prev ? "is-prev" : "",
        tcls: i === st.i ? "is-active" : "",
        pressed: i === st.i,
        pick: () => i !== st.i && setSt({ i, prev: st.i, dir: i < st.i ? "L" : "R" }),
      };
    }),
    heroName: cur.name,
    heroSub: cur.sub,
    heroSector: cur.tag,
    stripRunning: !paused,
    stripStopped: paused,
    stripPressed: paused,
    stripLabel: paused ? "Projecten afspelen" : "Projecten pauzeren",
    toggleStrip: toggle,
  };
  return (
    <>
      <section
        className="hero-dark pjh"
        style={{ position: "relative", overflow: "hidden", background: "#1F246C", color: "#FFFFFF", height: "820px" }}
      >
        <div className="pjh-bg" aria-hidden="true" style={{ position: "absolute", inset: "0", zIndex: "0" }}>
          {h.heroSlides.map((hh, hh_i) => (
            <Fragment key={hh_i}>
              <div className={`pjh-slide ${hh.cls}`} style={{ position: "absolute", inset: "0", background: hh.bg }}>
                {hh.showImg && (
                  <>
                    <img
                      className="pjh-slide-img"
                      fetchPriority={hh_i === 0 ? "high" : "low"}
                      decoding={hh_i === 0 ? undefined : "async"}
                      src={hh.load ? hh.img : undefined}
                      srcSet={hh.load ? srcSet(hh.img) : undefined}
                      sizes={IMG_SIZES}
                      alt=""
                      style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </>
                )}
                {hh.hasVid && (
                  <>
                    <LazyVideo
                      preload="none"
                      className="pjh-slide-vid"
                      src={hh.active ? hh.video : undefined}
                      poster={hh.load ? hh.poster : undefined}
                      posterPriority={hh_i === 0}
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                      style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </>
                )}
                {hh.noImg && (
                  <>
                    <span
                      className="pjh-slide-img"
                      style={{
                        position: "absolute",
                        right: "6%",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontFamily: "var(--font-display)",
                        fontWeight: "700",
                        fontSize: "420px",
                        lineHeight: "1",
                        letterSpacing: "-0.05em",
                        color: "rgba(255, 255, 255, 0.14)",
                      }}
                    >
                      {t(String(hh.initials))}
                    </span>
                  </>
                )}
              </div>
            </Fragment>
          ))}
        </div>
        <div
          className="pjh-dim"
          aria-hidden="true"
          style={{ position: "absolute", inset: "0", pointerEvents: "none", background: `rgba(0, 0, 0, ${h.heroDim})` }}
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "rgba(31, 36, 108, 0.05)",
          }}
        ></div>
        <div
          className="pj-wrap pjh-top"
          style={{
            position: "absolute",
            zIndex: "2",
            top: "0",
            left: "0",
            right: "0",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "28px 40px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <nav aria-label={ta("Kruimelpad")} style={{ fontSize: "14px", color: "#C9CFF0" }}>
            <a href={href("Main")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Home")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 8px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {t("Projecten")}
            </span>
          </nav>
          <button
            type="button"
            onClick={h.toggleStrip}
            aria-pressed={h.stripPressed}
            aria-label={ta(String(h.stripLabel))}
            title={ta(String(h.stripLabel))}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              background: "rgba(255, 255, 255, 0.08)",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {h.stripRunning && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1"></rect>
                  <rect x="14" y="5" width="4" height="14" rx="1"></rect>
                </svg>
              </>
            )}
            {h.stripStopped && (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"></path>
                </svg>
              </>
            )}
          </button>
        </div>
        <div
          className="pj-wrap pjh-bottom"
          style={{
            position: "absolute",
            zIndex: "2",
            left: "0",
            right: "0",
            bottom: "0",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px 166px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1040px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}>
              {t(String(h.heroSector))}
            </span>
            <h1
              aria-live="polite"
              style={{
                margin: "0",
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontWeight: "700",
                fontSize: "clamp(48px, 7.2vw, 112px)",
                lineHeight: "0.92",
                letterSpacing: "-0.035em",
                overflowWrap: "break-word",
                hyphens: "auto",
                textShadow: "0 4px 32px rgba(14, 17, 40, 0.35)",
              }}
            >
              {t(String(h.heroName))}
            </h1>
            <p style={{ margin: "0 auto", maxWidth: "620px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
              {t(String(h.heroSub))}
            </p>
          </div>
        </div>
        <div
          className="pjh-thumbs-wrap"
          style={{
            position: "absolute",
            zIndex: "3",
            left: "0",
            right: "0",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "0 24px",
          }}
        >
          <div
            className="pjh-thumbs"
            role="group"
            aria-label={ta("Kies een project")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              maxWidth: "100%",
              overflow: "visible",
              padding: "12px 16px",
              scrollbarWidth: "none",
            }}
          >
            {h.heroSlides.map((hh, hh_i) => (
              <Fragment key={hh_i}>
                <button
                  type="button"
                  className={`pjh-thumb ${hh.tcls}`}
                  onClick={hh.pick}
                  aria-pressed={hh.pressed}
                  aria-label={ta(String(`Toon project ${hh.name}`))}
                  style={{
                    position: "relative",
                    flexShrink: "0",
                    width: "96px",
                    height: "96px",
                    padding: "0",
                    border: "none",
                    borderRadius: "8px",
                    background: hh.bg,
                    cursor: "pointer",
                    overflow: "visible",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      inset: "0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {hh.hasImg && (
                      <>
                        <img src={hh.thumb} srcSet={srcSet(hh.thumb)} sizes="120px" loading="lazy" decoding="async" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </>
                    )}
                    {hh.noImg && (
                      <>
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: "700",
                            fontSize: "32px",
                            color: "rgba(255, 255, 255, 0.92)",
                          }}
                        >
                          {t(String(hh.initials))}
                        </span>
                      </>
                    )}
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
