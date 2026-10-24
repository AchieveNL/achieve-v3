"use client";

import { useTr } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { localeNames, pathFor, type Locale } from "@/i18n/config";

export function SimpleHeader() {
  const { t, ta, href } = useTr();

  const { locale, page } = useTr();
  const [langOpen, setLangOpen] = useState(false);
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
  const pick = (l: Locale) => () => {
    setLangOpen(false);
    window.location.assign(pathFor(l, page) + window.location.hash);
  };
  const flag = (l: Locale) => ({ Bg: locale === l ? "#F2F8FE" : "transparent", Weight: locale === l ? "700" : "400" });
  const h = {
    lang: locale.toUpperCase(),
    langName: localeNames[locale],
    langOpen,
    toggleLang: () => setLangOpen((v) => !v),
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
      <header
        className="ty-wrap"
        style={{
          maxWidth: "1280px",
          width: "100%",
          boxSizing: "border-box",
          margin: "0 auto",
          padding: "20px 40px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href={href("Main")}
          aria-label={ta("Achieve, naar de homepage")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2px",
            color: "#1F246C",
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
        <div className="ty-head-r">
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
                padding: "12px 12px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
                    boxShadow: "0 10px 28px rgba(31, 36, 108, 0.18)",
                    padding: "8px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
                      padding: "12px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
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
            href={href("Main")}
            className="ty-back"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
              minHeight: "44px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#1F246C",
              textDecoration: "none",
            }}
          >
            <span className="ty-arr" aria-hidden="true">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M11 6l-6 6 6 6"></path>
              </svg>
            </span>
            <span className="l2-txt">{t("Terug naar home")}</span>
          </a>
        </div>
      </header>
    </>
  );
}
