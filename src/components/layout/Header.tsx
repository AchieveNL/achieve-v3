"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { localeNames, navSection, pathFor, type Locale } from "@/i18n/config";
import { Tip } from "@/components/ui/Tip";

export function Header() {
  const { t, ta, href } = useTr();

  const { locale, page } = useTr();
  const headRef = useRef<HTMLDivElement>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [dienstenOpen, setDienstenOpen] = useState(false);
  const [tarievenOpen, setTarievenOpen] = useState(false);
  const navOpenRef = useRef(false);
  useEffect(() => {
    navOpenRef.current = navOpen;
  }, [navOpen]);

  // Hide the sticky header while scrolling down on tablet/phone, show it again when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY || 0;
    const onScroll = () => {
      const el = headRef.current;
      if (!el) return;
      const y = window.scrollY || 0;
      const d = y - lastY;
      if (window.innerWidth > 1024 || navOpenRef.current || y < 80) el.classList.remove("is-hidden");
      else if (d > 6) el.classList.add("is-hidden");
      else if (d < -6) el.classList.remove("is-hidden");
      if (Math.abs(d) > 6 || y < 80) lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the language menu on outside click / Escape.
  useEffect(() => {
    if (!langOpen) return;
    const onDoc = () => setLangOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  const tapMobile = (set: (f: (v: boolean) => boolean) => void) => (e: MouseEvent) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      set((v) => !v);
    }
  };
  const pick = (l: Locale) => () => {
    setLangOpen(false);
    window.location.assign(pathFor(l, page) + window.location.hash);
  };
  const cur = locale.toUpperCase();
  const flag = (l: Locale) => ({
    Bg: locale === l ? "#F2F8FE" : "transparent",
    Weight: locale === l ? "700" : "400",
  });
  const h = {
    lang: cur,
    langName: localeNames[locale],
    langOpen,
    toggleLang: () => setLangOpen((v) => !v),
    navOpen,
    navClosed: !navOpen,
    navCls: navOpen ? "is-open" : "",
    toggleNav: () => setNavOpen((v) => !v),
    dienstenOpen,
    dienstenCls: dienstenOpen ? "is-open" : "",
    tapDiensten: tapMobile(setDienstenOpen),
    tarievenOpen,
    tarievenCls: tarievenOpen ? "is-open" : "",
    tapTarieven: tapMobile(setTarievenOpen),
    isNL: locale === "nl",
    isEN: locale === "en",
    isES: locale === "es",
    isFR: locale === "fr",
    isDE: locale === "de",
    isPL: locale === "pl",
    isTR: locale === "tr",
    isAR: locale === "ar",
    nlBg: flag("nl").Bg,
    nlWeight: flag("nl").Weight,
    enBg: flag("en").Bg,
    enWeight: flag("en").Weight,
    esBg: flag("es").Bg,
    esWeight: flag("es").Weight,
    frBg: flag("fr").Bg,
    frWeight: flag("fr").Weight,
    deBg: flag("de").Bg,
    deWeight: flag("de").Weight,
    plBg: flag("pl").Bg,
    plWeight: flag("pl").Weight,
    trBg: flag("tr").Bg,
    trWeight: flag("tr").Weight,
    arBg: flag("ar").Bg,
    arWeight: flag("ar").Weight,
    pickNL: pick("nl"),
    pickEN: pick("en"),
    pickES: pick("es"),
    pickFR: pick("fr"),
    pickDE: pick("de"),
    pickPL: pick("pl"),
    pickTR: pick("tr"),
    pickAR: pick("ar"),
  };
  return (
    <>
      <div
        className="site-head"
        ref={headRef}
        style={{
          position: "sticky",
          top: "0",
          zIndex: "50",
          background: "rgba(255, 255, 255, 0.55)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          backdropFilter: "blur(18px) saturate(160%)",
          borderBottom: "1px solid rgba(31, 36, 108, 0.08)",
        }}
      >
        <header
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "20px 40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href={href("Main")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              color: "#0E1116",
              textDecoration: "none",
              padding: "4px 0",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-logo)",
                fontWeight: "700",
                fontSize: "28px",
                letterSpacing: "0.14em",
                paddingLeft: "0.14em",
                lineHeight: "1",
              }}
            >
              {t("ACHIEVE")}
            </span>
            <span
              style={{
                fontFamily: "var(--font-logo-sub)",
                fontWeight: "400",
                fontSize: "11.5px",
                letterSpacing: "0.28em",
                paddingLeft: "0.28em",
                lineHeight: "1",
              }}
            >
              {t("DIGITAL AGENCY")}
            </span>
          </a>
          <div className="nav-tools" style={{ alignItems: "center", gap: "4px" }}>
            <div className="lang-m" style={{ position: "relative" }}>
              <button
                type="button"
                onClick={h.toggleLang}
                aria-haspopup="true"
                aria-expanded={h.langOpen}
                aria-label={ta(String(`Taal kiezen, huidige taal ${h.langName}`))}
                style={{
                  font: "inherit",
                  fontWeight: "700",
                  fontSize: "15px",
                  color: "#0E1116",
                  background: "transparent",
                  border: "none",
                  padding: "12px 10px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                {h.isNL && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
                        <rect width="9" height="2" fill="#AE1C28"></rect>
                        <rect y="2" width="9" height="2" fill="#FFFFFF"></rect>
                        <rect y="4" width="9" height="2" fill="#21468B"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isEN && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
                        <rect width="60" height="30" fill="#012169"></rect>
                        <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2"></path>
                        <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10"></path>
                        <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6"></path>
                      </svg>
                    </span>
                  </>
                )}
                {h.isES && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                        <rect width="3" height="2" fill="#AA151B"></rect>
                        <rect y="0.5" width="3" height="1" fill="#F1BF00"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isFR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                        <rect width="1" height="2" fill="#0055A4"></rect>
                        <rect x="1" width="1" height="2" fill="#FFFFFF"></rect>
                        <rect x="2" width="1" height="2" fill="#EF4135"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isDE && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
                        <rect width="5" height="1" fill="#000000"></rect>
                        <rect y="1" width="5" height="1" fill="#DD0000"></rect>
                        <rect y="2" width="5" height="1" fill="#FFCE00"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isPL && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 8 5" preserveAspectRatio="xMidYMid slice">
                        <rect width="8" height="2.5" fill="#FFFFFF"></rect>
                        <rect y="2.5" width="8" height="2.5" fill="#DC143C"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isTR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                        <rect width="1200" height="800" fill="#E30A17"></rect>
                        <circle cx="500" cy="400" r="200" fill="#FFFFFF"></circle>
                        <circle cx="550" cy="400" r="160" fill="#E30A17"></circle>
                        <polygon
                          points="590.0,400.0 659.3,377.7 659.1,304.9 701.7,363.9 770.9,341.2 728.0,400.0 770.9,458.8 701.7,436.1 659.1,495.1 659.3,422.3"
                          fill="#FFFFFF"
                        ></polygon>
                      </svg>
                    </span>
                  </>
                )}
                {h.isAR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 12 6" preserveAspectRatio="xMinYMid slice">
                        <rect width="12" height="2" fill="#00732F"></rect>
                        <rect y="2" width="12" height="2" fill="#FFFFFF"></rect>
                        <rect y="4" width="12" height="2" fill="#000000"></rect>
                        <rect width="2.4" height="6" fill="#FF0000"></rect>
                      </svg>
                    </span>
                  </>
                )}
                <span>{t(String(h.lang))}</span>
                <svg
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
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </button>
              {h.langOpen && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "0",
                      zIndex: "10",
                      background: "#FFFFFF",
                      border: "1px solid #E4E6EA",
                      borderRadius: "5px",
                      boxShadow: "0 8px 24px rgba(14, 17, 22, 0.12)",
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      minWidth: "150px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={h.pickNL}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.nlWeight,
                        background: h.nlBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
                          <rect width="9" height="2" fill="#AE1C28"></rect>
                          <rect y="2" width="9" height="2" fill="#FFFFFF"></rect>
                          <rect y="4" width="9" height="2" fill="#21468B"></rect>
                        </svg>
                      </span>
                      {t("Nederlands")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickEN}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.enWeight,
                        background: h.enBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
                          <rect width="60" height="30" fill="#012169"></rect>
                          <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6"></path>
                          <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2"></path>
                          <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10"></path>
                          <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6"></path>
                        </svg>
                      </span>
                      {t("English")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickES}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.esWeight,
                        background: h.esBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                          <rect width="3" height="2" fill="#AA151B"></rect>
                          <rect y="0.5" width="3" height="1" fill="#F1BF00"></rect>
                        </svg>
                      </span>
                      {t("Español")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickFR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.frWeight,
                        background: h.frBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                          <rect width="1" height="2" fill="#0055A4"></rect>
                          <rect x="1" width="1" height="2" fill="#FFFFFF"></rect>
                          <rect x="2" width="1" height="2" fill="#EF4135"></rect>
                        </svg>
                      </span>
                      {t("Français")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickDE}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.deWeight,
                        background: h.deBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
                          <rect width="5" height="1" fill="#000000"></rect>
                          <rect y="1" width="5" height="1" fill="#DD0000"></rect>
                          <rect y="2" width="5" height="1" fill="#FFCE00"></rect>
                        </svg>
                      </span>
                      {t("Deutsch")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickPL}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.plWeight,
                        background: h.plBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 8 5" preserveAspectRatio="xMidYMid slice">
                          <rect width="8" height="2.5" fill="#FFFFFF"></rect>
                          <rect y="2.5" width="8" height="2.5" fill="#DC143C"></rect>
                        </svg>
                      </span>
                      {t("Polski")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickTR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.trWeight,
                        background: h.trBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                          <rect width="1200" height="800" fill="#E30A17"></rect>
                          <circle cx="500" cy="400" r="200" fill="#FFFFFF"></circle>
                          <circle cx="550" cy="400" r="160" fill="#E30A17"></circle>
                          <polygon
                            points="590.0,400.0 659.3,377.7 659.1,304.9 701.7,363.9 770.9,341.2 728.0,400.0 770.9,458.8 701.7,436.1 659.1,495.1 659.3,422.3"
                            fill="#FFFFFF"
                          ></polygon>
                        </svg>
                      </span>
                      {t("Türkçe")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickAR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.arWeight,
                        background: h.arBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 12 6" preserveAspectRatio="xMinYMid slice">
                          <rect width="12" height="2" fill="#00732F"></rect>
                          <rect y="2" width="12" height="2" fill="#FFFFFF"></rect>
                          <rect y="4" width="12" height="2" fill="#000000"></rect>
                          <rect width="2.4" height="6" fill="#FF0000"></rect>
                        </svg>
                      </span>
                      <span lang="ar" dir="rtl">
                        {t("العربية")}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              className="nav-burger"
              onClick={h.toggleNav}
              aria-expanded={h.navOpen}
              aria-controls="hoofdmenu"
              aria-label={ta("Menu")}
              style={{
                font: "inherit",
                width: "48px",
                height: "48px",
                border: "1px solid #E4E6EA",
                borderRadius: "10px",
                background: "#FFFFFF",
                color: "#1F246C",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {h.navClosed && (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M4 7h16M4 12h16M4 17h16"></path>
                  </svg>
                </>
              )}
              {h.navOpen && (
                <>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18"></path>
                  </svg>
                </>
              )}
            </button>
          </div>
          <nav
            id="hoofdmenu"
            aria-label={ta("Hoofdmenu")}
            className={`main-nav ${h.navCls}`}
            style={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}
          >
            <div className={`nav-dd ${h.dienstenCls}`}>
              <a
                href={href("Main", "diensten")}
                aria-haspopup="true"
                aria-expanded={h.dienstenOpen}
                onClick={h.tapDiensten}
                style={{
                  color: "#0E1116",
                  textDecoration: "none",
                  padding: "12px 12px",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {t("Diensten")}
                <svg
                  className="nav-dd-chev"
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
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </a>
              <div className="nav-dd-panel" aria-label={ta("Alle diensten")}>
                <div className="nav-dd-feature">
                  <div>
                    <span className="nav-dd-feature-bar" aria-hidden="true"></span>
                    <p className="nav-dd-feature-title">{t("Alles in huis om je ambitie waar te maken.")}</p>
                    <p className="nav-dd-feature-text">{t("Van strategie tot advertenties: kies waar je wilt beginnen.")}</p>
                  </div>
                  <a href="https://calendly.com/vrijblijvendgesprek/" className="nav-dd-feature-cta" target="_blank" rel="noopener">
                    {t("Plan je groeigesprek")}
                    <svg
                      className=""
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
                  <div className="nav-dd-media" data-svc="brand-strategy" aria-hidden="true">
                    <img src="/media/nav/strategy.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Strategy")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="legal" aria-hidden="true">
                    <img src="/media/nav/legal.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Legal")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="brand-book" aria-hidden="true">
                    <img src="/media/nav/brand-book.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Brand Book")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="web-development" aria-hidden="true">
                    <img src="/media/nav/web-development.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Web Development")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="search-engine-advertising" aria-hidden="true">
                    <img src="/media/nav/search-engine-advertising.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Search Engine Advertising")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="social-media-advertising" aria-hidden="true">
                    <img src="/media/nav/social-media-advertising.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Social Media Advertising")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="social-media-management" aria-hidden="true">
                    <img src="/media/nav/social-media-management.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Social Media Management")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="email-marketing" aria-hidden="true">
                    <img src="/media/nav/email-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Email Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="video-marketing" aria-hidden="true">
                    <img src="/media/nav/video-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Video Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="ugc-marketing" aria-hidden="true">
                    <img src="/media/nav/ugc-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("UGC Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="dashboard" aria-hidden="true">
                    <img src="/media/nav/dashboard.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Dashboard")}</span>
                  </div>
                </div>
                <div className="nav-dd-grid">
                  <a href={href("DienstStrategy")} className="nav-dd-link" data-svc="brand-strategy">
                    <span className="nav-dd-name">
                      {t("Strategy")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Positionering en merkrichting")}</span>
                  </a>
                  <a href={href("DienstLegal")} className="nav-dd-link" data-svc="legal">
                    <span className="nav-dd-name">
                      {t("Legal")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Algemene voorwaarden en contracten")}</span>
                  </a>
                  <a href={href("DienstBrandBook")} className="nav-dd-link" data-svc="brand-book">
                    <span className="nav-dd-name">
                      {t("Brand Book")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Huisstijl vastgelegd in één boek")}</span>
                  </a>
                  <a href={href("DienstWebDevelopment")} className="nav-dd-link" data-svc="web-development">
                    <span className="nav-dd-name">
                      {t("Web Development")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Websites en webshops die converteren")}</span>
                  </a>
                  <a href={href("DienstEmailMarketing")} className="nav-dd-link" data-svc="email-marketing">
                    <span className="nav-dd-name">
                      {t("Email Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Nieuwsbrieven en automatische flows")}
                      <Tip label={ta("Uitleg")} plain>
                        {t("Flow: een reeks e-mails die automatisch verstuurd wordt na een actie, zoals een aankoop of inschrijving.")}
                      </Tip>
                    </span>
                  </a>
                  <a href={href("DienstVideoMarketing")} className="nav-dd-link" data-svc="video-marketing">
                    <span className="nav-dd-name">
                      {t("Video Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Video's die je verhaal vertellen")}</span>
                  </a>
                  <a href={href("DienstUGCMarketing")} className="nav-dd-link" data-svc="ugc-marketing">
                    <span className="nav-dd-name">
                      {t("UGC Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Echte content van echte mensen")}</span>
                  </a>
                  <a href={href("DienstSEA")} className="nav-dd-link" data-svc="search-engine-advertising">
                    <span className="nav-dd-name">
                      {t("Search Engine Advertising")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Gevonden worden in Google")}</span>
                  </a>
                  <a href={href("DienstSMA")} className="nav-dd-link" data-svc="social-media-advertising">
                    <span className="nav-dd-name">
                      {t("Social Media Advertising")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Advertenties op Meta, TikTok en LinkedIn")}</span>
                  </a>
                  <a href={href("DienstSMM")} className="nav-dd-link" data-svc="social-media-management">
                    <span className="nav-dd-name">
                      {t("Social Media Management")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Content en community op je kanalen")}</span>
                  </a>
                  <a href={href("DienstDashboard")} className="nav-dd-link" data-svc="dashboard">
                    <span className="nav-dd-name">
                      {t("Dashboard")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">{t("Al je resultaten in één overzicht")}</span>
                  </a>
                </div>
              </div>
            </div>
            <a
              href={href("Projecten")}
              aria-current={navSection(page) === "Projecten" ? "page" : undefined}
              className={navSection(page) === "Projecten" ? "nav-current" : undefined}
              style={{ color: "#0E1116", textDecoration: "none", padding: "12px 12px", fontWeight: "500" }}
            >
              {t("Projecten")}
            </a>
            <div className={`nav-dd ${h.tarievenCls}`}>
              <a
                href={href("Tarieven")}
                aria-haspopup="true"
                aria-expanded={h.tarievenOpen}
                onClick={h.tapTarieven}
                style={{
                  color: "#0E1116",
                  textDecoration: "none",
                  padding: "12px 12px",
                  fontWeight: "500",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {t("Tarieven")}
                <svg
                  className="nav-dd-chev"
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
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </a>
              <div className="nav-dd-panel" aria-label={ta("Tarieven per dienst")}>
                <div className="nav-dd-feature">
                  <div>
                    <span className="nav-dd-feature-bar" aria-hidden="true"></span>
                    <p className="nav-dd-feature-title">{t("Vooraf weten waar je aan toe bent.")}</p>
                    <p className="nav-dd-feature-text">
                      {t("Heldere vanaf-prijzen per dienst. In je voorstel zie je precies wat jouw traject kost.")}
                    </p>
                  </div>
                  <a href="https://calendly.com/vrijblijvendgesprek/" className="nav-dd-feature-cta" target="_blank" rel="noopener">
                    {t("Plan je groeigesprek")}
                    <svg
                      className=""
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
                  <div className="nav-dd-media" data-svc="brand-strategy" aria-hidden="true">
                    <img src="/media/nav/strategy.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Strategy")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="legal" aria-hidden="true">
                    <img src="/media/nav/legal.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Legal")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="brand-book" aria-hidden="true">
                    <img src="/media/nav/brand-book.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Brand Book")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="custom-website" aria-hidden="true">
                    <img src="/media/nav/web-development.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Custom website")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="shopify-webshop" aria-hidden="true">
                    <img src="/media/nav/web-development.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Shopify webshop")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="search-engine-advertising" aria-hidden="true">
                    <img src="/media/nav/search-engine-advertising.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Search Engine Advertising")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="social-media-advertising" aria-hidden="true">
                    <img src="/media/nav/social-media-advertising.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Social Media Advertising")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="social-media-management" aria-hidden="true">
                    <img src="/media/nav/social-media-management.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Social Media Management")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="email-marketing" aria-hidden="true">
                    <img src="/media/nav/email-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Email Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="video-marketing" aria-hidden="true">
                    <img src="/media/nav/video-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Video Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="ugc-marketing" aria-hidden="true">
                    <img src="/media/nav/ugc-marketing.webp" alt="" />
                    <span className="nav-dd-media-label">{t("UGC Marketing")}</span>
                  </div>
                  <div className="nav-dd-media" data-svc="dashboard" aria-hidden="true">
                    <img src="/media/nav/dashboard.webp" alt="" />
                    <span className="nav-dd-media-label">{t("Dashboard")}</span>
                  </div>
                </div>
                <div className="nav-dd-grid">
                  <a href={href("DienstStrategy")} className="nav-dd-link" data-svc="brand-strategy">
                    <span className="nav-dd-name">
                      {t("Strategy")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€1.747")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="legal">
                    <span className="nav-dd-name">
                      {t("Legal")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€197")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="brand-book">
                    <span className="nav-dd-name">
                      {t("Brand Book")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€1.497")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="custom-website">
                    <span className="nav-dd-name">
                      {t("Custom website")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€4.497")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="shopify-webshop">
                    <span className="nav-dd-name">
                      {t("Shopify webshop")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€4.497")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="email-marketing">
                    <span className="nav-dd-name">
                      {t("Email Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€997")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="video-marketing">
                    <span className="nav-dd-name">
                      {t("Video Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€1.447")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="ugc-marketing">
                    <span className="nav-dd-name">
                      {t("UGC Marketing")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€997")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="search-engine-advertising">
                    <span className="nav-dd-name">
                      {t("Search Engine Advertising")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€1.197")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="social-media-advertising">
                    <span className="nav-dd-name">
                      {t("Social Media Advertising")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€497")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="social-media-management">
                    <span className="nav-dd-name">
                      {t("Social Media Management")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€497")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                  <a href={href("Tarieven")} className="nav-dd-link" data-svc="dashboard">
                    <span className="nav-dd-name">
                      {t("Dashboard")}
                      <svg
                        className="nav-dd-arrow"
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
                    </span>
                    <span className="nav-dd-desc">
                      {t("Vanaf")} <strong style={{ color: "#1F246C", fontWeight: "700" }}>{t("€997")}</strong> {t("ex. btw")}
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <a
              href={href("WerkenBij")}
              aria-current={navSection(page) === "WerkenBij" ? "page" : undefined}
              className={navSection(page) === "WerkenBij" ? "nav-current" : undefined}
              style={{ color: "#0E1116", textDecoration: "none", padding: "12px 12px", fontWeight: "500" }}
            >
              {t("Werken bij")}
            </a>
            <a
              href={href("OverOns")}
              aria-current={navSection(page) === "OverOns" ? "page" : undefined}
              className={navSection(page) === "OverOns" ? "nav-current" : undefined}
              style={{ color: "#0E1116", textDecoration: "none", padding: "12px 12px", fontWeight: "500" }}
            >
              {t("Over ons")}
            </a>
            <a
              href={href("Contact")}
              aria-current={navSection(page) === "Contact" ? "page" : undefined}
              className={navSection(page) === "Contact" ? "nav-current" : undefined}
              style={{ color: "#0E1116", textDecoration: "none", padding: "12px 12px", fontWeight: "500" }}
            >
              {t("Contact")}
            </a>
            <div style={{ position: "relative", marginLeft: "4px" }}>
              <button
                type="button"
                onClick={h.toggleLang}
                aria-haspopup="true"
                aria-expanded={h.langOpen}
                aria-label={ta(String(`Taal kiezen, huidige taal ${h.langName}`))}
                style={{
                  font: "inherit",
                  fontWeight: "700",
                  fontSize: "15px",
                  color: "#0E1116",
                  background: "transparent",
                  border: "none",
                  padding: "12px 10px",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                {h.isNL && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
                        <rect width="9" height="2" fill="#AE1C28"></rect>
                        <rect y="2" width="9" height="2" fill="#FFFFFF"></rect>
                        <rect y="4" width="9" height="2" fill="#21468B"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isEN && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
                        <rect width="60" height="30" fill="#012169"></rect>
                        <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6"></path>
                        <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2"></path>
                        <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10"></path>
                        <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6"></path>
                      </svg>
                    </span>
                  </>
                )}
                {h.isES && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                        <rect width="3" height="2" fill="#AA151B"></rect>
                        <rect y="0.5" width="3" height="1" fill="#F1BF00"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isFR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                        <rect width="1" height="2" fill="#0055A4"></rect>
                        <rect x="1" width="1" height="2" fill="#FFFFFF"></rect>
                        <rect x="2" width="1" height="2" fill="#EF4135"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isDE && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
                        <rect width="5" height="1" fill="#000000"></rect>
                        <rect y="1" width="5" height="1" fill="#DD0000"></rect>
                        <rect y="2" width="5" height="1" fill="#FFCE00"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isPL && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 8 5" preserveAspectRatio="xMidYMid slice">
                        <rect width="8" height="2.5" fill="#FFFFFF"></rect>
                        <rect y="2.5" width="8" height="2.5" fill="#DC143C"></rect>
                      </svg>
                    </span>
                  </>
                )}
                {h.isTR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                        <rect width="1200" height="800" fill="#E30A17"></rect>
                        <circle cx="500" cy="400" r="200" fill="#FFFFFF"></circle>
                        <circle cx="550" cy="400" r="160" fill="#E30A17"></circle>
                        <polygon
                          points="590.0,400.0 659.3,377.7 659.1,304.9 701.7,363.9 770.9,341.2 728.0,400.0 770.9,458.8 701.7,436.1 659.1,495.1 659.3,422.3"
                          fill="#FFFFFF"
                        ></polygon>
                      </svg>
                    </span>
                  </>
                )}
                {h.isAR && (
                  <>
                    <span
                      style={{
                        display: "inline-flex",
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        flexShrink: "0",
                        overflow: "hidden",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 12 6" preserveAspectRatio="xMinYMid slice">
                        <rect width="12" height="2" fill="#00732F"></rect>
                        <rect y="2" width="12" height="2" fill="#FFFFFF"></rect>
                        <rect y="4" width="12" height="2" fill="#000000"></rect>
                        <rect width="2.4" height="6" fill="#FF0000"></rect>
                      </svg>
                    </span>
                  </>
                )}
                <span>{t(String(h.lang))}</span>
                <svg
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
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </button>
              {h.langOpen && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: "0",
                      zIndex: "10",
                      background: "#FFFFFF",
                      border: "1px solid #E4E6EA",
                      borderRadius: "5px",
                      boxShadow: "0 8px 24px rgba(14, 17, 22, 0.12)",
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      minWidth: "150px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={h.pickNL}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.nlWeight,
                        background: h.nlBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 9 6" preserveAspectRatio="xMidYMid slice">
                          <rect width="9" height="2" fill="#AE1C28"></rect>
                          <rect y="2" width="9" height="2" fill="#FFFFFF"></rect>
                          <rect y="4" width="9" height="2" fill="#21468B"></rect>
                        </svg>
                      </span>
                      {t("Nederlands")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickEN}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.enWeight,
                        background: h.enBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
                          <rect width="60" height="30" fill="#012169"></rect>
                          <path d="M0 0L60 30M60 0L0 30" stroke="#FFFFFF" strokeWidth="6"></path>
                          <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="2"></path>
                          <path d="M30 0V30M0 15H60" stroke="#FFFFFF" strokeWidth="10"></path>
                          <path d="M30 0V30M0 15H60" stroke="#C8102E" strokeWidth="6"></path>
                        </svg>
                      </span>
                      {t("English")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickES}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.esWeight,
                        background: h.esBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                          <rect width="3" height="2" fill="#AA151B"></rect>
                          <rect y="0.5" width="3" height="1" fill="#F1BF00"></rect>
                        </svg>
                      </span>
                      {t("Español")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickFR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.frWeight,
                        background: h.frBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                          <rect width="1" height="2" fill="#0055A4"></rect>
                          <rect x="1" width="1" height="2" fill="#FFFFFF"></rect>
                          <rect x="2" width="1" height="2" fill="#EF4135"></rect>
                        </svg>
                      </span>
                      {t("Français")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickDE}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.deWeight,
                        background: h.deBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 5 3" preserveAspectRatio="xMidYMid slice">
                          <rect width="5" height="1" fill="#000000"></rect>
                          <rect y="1" width="5" height="1" fill="#DD0000"></rect>
                          <rect y="2" width="5" height="1" fill="#FFCE00"></rect>
                        </svg>
                      </span>
                      {t("Deutsch")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickPL}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.plWeight,
                        background: h.plBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 8 5" preserveAspectRatio="xMidYMid slice">
                          <rect width="8" height="2.5" fill="#FFFFFF"></rect>
                          <rect y="2.5" width="8" height="2.5" fill="#DC143C"></rect>
                        </svg>
                      </span>
                      {t("Polski")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickTR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.trWeight,
                        background: h.trBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
                          <rect width="1200" height="800" fill="#E30A17"></rect>
                          <circle cx="500" cy="400" r="200" fill="#FFFFFF"></circle>
                          <circle cx="550" cy="400" r="160" fill="#E30A17"></circle>
                          <polygon
                            points="590.0,400.0 659.3,377.7 659.1,304.9 701.7,363.9 770.9,341.2 728.0,400.0 770.9,458.8 701.7,436.1 659.1,495.1 659.3,422.3"
                            fill="#FFFFFF"
                          ></polygon>
                        </svg>
                      </span>
                      {t("Türkçe")}
                    </button>
                    <button
                      type="button"
                      onClick={h.pickAR}
                      style={{
                        font: "inherit",
                        fontSize: "15px",
                        color: "#0E1116",
                        border: "none",
                        borderRadius: "4px",
                        padding: "12px 14px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontWeight: h.arWeight,
                        background: h.arBg,
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          flexShrink: "0",
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <svg width="18" height="18" viewBox="0 0 12 6" preserveAspectRatio="xMinYMid slice">
                          <rect width="12" height="2" fill="#00732F"></rect>
                          <rect y="2" width="12" height="2" fill="#FFFFFF"></rect>
                          <rect y="4" width="12" height="2" fill="#000000"></rect>
                          <rect width="2.4" height="6" fill="#FF0000"></rect>
                        </svg>
                      </span>
                      <span lang="ar" dir="rtl">
                        {t("العربية")}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              className="glow"
              style={{
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                textDecoration: "none",
                padding: "12px 22px",
                marginLeft: "8px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "19px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {t("Plan je groeigesprek")}
            </a>
          </nav>
        </header>
      </div>
    </>
  );
}
