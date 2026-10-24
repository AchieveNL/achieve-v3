"use client";

import { useTr } from "@/i18n/I18nProvider";
import { Fragment, useState } from "react";
import { projectFilters, projects as ALL } from "@/data/projects";
import { Accent } from "@/components/ui/Accent";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function ProjectGrid() {
  const { t, ta, href } = useTr();

  const [flt, setFlt] = useState<string>("alle");
  const [cardGal, setCardGal] = useState<Record<string, number>>({});
  const list = ALL.filter((p) => flt === "alle" || p.cats.includes(flt));
  const h = {
    countLabel: list.length + (list.length === 1 ? " project" : " projecten"),
    filters: projectFilters.map((f) => {
      const on = f.id === flt;
      const n = f.id === "alle" ? ALL.length : ALL.filter((p) => p.cats.includes(f.id)).length;
      return {
        label: f.label,
        count: String(n),
        pressed: on,
        bg: on ? "#1F246C" : "#FFFFFF",
        color: on ? "#FFFFFF" : "#1F246C",
        border: on ? "#1F246C" : "#D5DAE3",
        pick: () => setFlt(f.id),
      };
    }),
    projects: list.map((p) => {
      const g = p.gallery || (p.img ? [{ img: p.img, alt: p.alt }] : []);
      const n = g.length;
      const gi = (cardGal[p.name] || 0) % Math.max(n, 1);
      const go = (d: number) => () => setCardGal((c) => ({ ...c, [p.name]: ((((c[p.name] || 0) + d) % n) + n) % n }));
      return {
        ...p,
        href: href(p.href),
        multi: n > 1,
        slides: g.map((x, i) => ({ ...x, isVid: !!x.video, isImg: !x.video, op: i === gi ? "1" : "0", hidden: i !== gi })),
        prev: go(-1),
        next: go(1),
        counter: `${gi + 1} / ${n}`,
        segs: g.map((_x, i) => ({ w: i <= gi ? "100%" : "0%" })),
        segGap: n > 8 ? "2px" : "4px",
        prevLabel: "Vorige foto van " + p.name,
        nextLabel: "Volgende foto van " + p.name,
      };
    }),
  };
  return (
    <>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "48px 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "end", justifyContent: "space-between", gap: "20px 40px" }}>
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
              {t("Ondernemers zoals")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span className="grad-text">{t("jij.")}</span>
              </Accent>
            </h2>
            <span aria-live="polite" style={{ fontSize: "15px", color: "#5A6273" }}>
              {t(String(h.countLabel))}
            </span>
          </div>
          <div
            className="pj-filters"
            role="group"
            aria-label={ta("Filter op dienst")}
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {h.filters.map((f, f_i) => (
              <Fragment key={f_i}>
                <button
                  type="button"
                  className="pj-chip"
                  onClick={f.pick}
                  aria-pressed={f.pressed}
                  style={{
                    font: "inherit",
                    minHeight: "44px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    border: `1px solid ${f.border}`,
                    background: f.bg,
                    color: f.color,
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {t(String(f.label))}
                  <span style={{ fontSize: "12px", fontWeight: "600", opacity: "0.7" }}>{t(String(f.count))}</span>
                </button>
              </Fragment>
            ))}
          </div>
          <div className="pj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" }}>
            {h.projects.map((p, p_i) => (
              <Fragment key={p_i}>
                <article
                  className="pj-card story-card"
                  style={{ display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: "20px", overflow: "hidden" }}
                >
                  <div style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", background: p.tile }}>
                    {p.hasImg && (
                      <>
                        {p.slides.map((g, g_i) => (
                          <Fragment key={g_i}>
                            {g.isImg && (
                              <>
                                <img
                                  className="story-img gal-img"
                                  src={g.img}
                                  alt={ta(String(g.alt))}
                                  aria-hidden={g.hidden}
                                  style={{
                                    position: "absolute",
                                    inset: "0",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    opacity: g.op,
                                  }}
                                />
                              </>
                            )}
                            {g.isVid && (
                              <>
                                <LazyVideo
                                  preload="none"
                                  className="story-img gal-img"
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
                                    opacity: g.op,
                                  }}
                                />
                              </>
                            )}
                          </Fragment>
                        ))}
                      </>
                    )}
                    {p.multi && (
                      <>
                        <div
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            height: "4px",
                            display: "flex",
                            gap: p.segGap,
                          }}
                        >
                          {p.segs.map((q, q_i) => (
                            <Fragment key={q_i}>
                              <div
                                style={{
                                  flex: "1 1 0",
                                  minWidth: "0",
                                  height: "4px",
                                  background: "rgba(255, 255, 255, 0.3)",
                                  overflow: "hidden",
                                }}
                              >
                                <div style={{ height: "4px", width: q.w, background: "#FFFFFF", transition: "width .3s ease" }}></div>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            bottom: "18px",
                            transform: "translateX(-50%)",
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                            padding: "4px",
                            borderRadius: "999px",
                            background: "#FFFFFF",
                            boxShadow: "0 6px 20px rgba(14, 17, 40, 0.18)",
                          }}
                        >
                          <button
                            type="button"
                            className="gal-btn"
                            onClick={p.prev}
                            aria-label={ta(String(p.prevLabel))}
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
                              padding: "0 6px",
                              minWidth: "44px",
                              textAlign: "center",
                              fontVariantNumeric: "tabular-nums",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t(String(p.counter))}
                          </span>
                          <button
                            type="button"
                            className="gal-btn"
                            onClick={p.next}
                            aria-label={ta(String(p.nextLabel))}
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
                      </>
                    )}
                    {p.noImg && (
                      <>
                        <div
                          className="story-img"
                          style={{
                            position: "absolute",
                            inset: "0",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "14px",
                          }}
                        >
                          <span
                            aria-hidden="true"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: "700",
                              fontSize: "72px",
                              lineHeight: "1",
                              letterSpacing: "-0.03em",
                              color: "rgba(255, 255, 255, 0.92)",
                            }}
                          >
                            {t(String(p.initials))}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: "#FFFFFF",
                              border: "1px dashed rgba(255, 255, 255, 0.6)",
                              borderRadius: "999px",
                              padding: "6px 12px",
                            }}
                          >
                            {t("[Projectbeeld volgt]")}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ flex: "1 1 auto", padding: "24px 26px 26px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {p.tags.map((tt, tt_i) => (
                        <Fragment key={tt_i}>
                          <span
                            translate="no"
                            style={{
                              fontSize: "11px",
                              fontWeight: "600",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                              color: tt.color,
                              background: tt.bg,
                              padding: "4px 10px",
                              borderRadius: "999px",
                            }}
                          >
                            {tt.label}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <h3
                        style={{
                          margin: "0",
                          fontFamily: "var(--font-display)",
                          fontSize: "24px",
                          fontWeight: "700",
                          lineHeight: "1.15",
                          color: "#1F246C",
                        }}
                      >
                        {t(String(p.name))}
                      </h3>
                      <span style={{ fontSize: "14px", color: "#5A6273" }}>{t(String(p.sector))}</span>
                    </div>
                    <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.4", fontWeight: "600", color: "#1F246C" }}>
                      {t(String(p.result))}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#8639FA",
                        }}
                      >
                        {t("Uitdaging")}
                      </span>
                      <p className="pj-challenge" style={{ margin: "0", fontSize: "15px", lineHeight: "1.6", color: "#3A4150" }}>
                        {t(String(p.challenge))}
                      </p>
                    </div>
                    <a
                      href={p.href}
                      className="about-link"
                      style={{
                        marginTop: "auto",
                        paddingTop: "6px",
                        alignSelf: "flex-start",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        minHeight: "44px",
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#1F246C",
                        textDecoration: "none",
                      }}
                    >
                      <span className="l2-txt">{t("Lees wat werkte")}</span>{" "}
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
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
