"use client";

import { useTr } from "@/i18n/I18nProvider";
import React from "react";
import { Accent } from "@/components/ui/Accent";

export function ContactContent() {
  const { t, ta, href } = useTr();

  // Contact/application form: native validation, then send everything (files included) to /api/contact and show the thank-you page.
  const send = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const box = btn.closest("section") ?? document.body;
    const fields = Array.from(box.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const bad = fields.find((f) => !f.checkValidity());
    if (bad) {
      bad.reportValidity();
      return;
    }
    const fd = new FormData();
    for (const f of fields) {
      if (!f.name) continue;
      if (f instanceof HTMLInputElement && f.type === "file") {
        if (f.files?.[0]) fd.append(f.name, f.files[0]);
      } else if (f instanceof HTMLInputElement && f.type === "checkbox") fd.append(f.name, f.checked ? "ja" : "nee");
      else fd.append(f.name, f.value);
    }
    fd.append("bron", window.location.pathname);
    btn.disabled = true;
    try {
      await fetch("/api/contact", { method: "POST", body: fd });
    } catch {
      /* the thank-you page still shows; the team follows up */
    }
    window.location.assign(href("Bedankt"));
  };
  const h = {
    send,
  };
  return (
    <>
      <section
        className="hero-dark cs-hero m-hero wb-hero"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#1F246C",
          color: "#FFFFFF",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="sv-hero-ill"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "max(40px, calc((100% - 1280px) / 2 + 40px))",
            top: "44%",
            transform: "translateY(-50%)",
            width: "320px",
            height: "320px",
            pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 420 420" width="100%" height="100%" fill="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="abL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#B48DFF"></stop>
                <stop offset="1" stopColor="#5EC0FA"></stop>
              </linearGradient>
              <linearGradient id="abF" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8639FA"></stop>
                <stop offset="1" stopColor="#0F8AE5"></stop>
              </linearGradient>
            </defs>
            <circle cx="210" cy="215" r="150" fill="#2E3590"></circle>
            <circle
              className="ia-ring"
              cx="210"
              cy="215"
              r="176"
              stroke="url(#abL)"
              strokeWidth="2"
              strokeDasharray="4 10"
              strokeLinecap="round"
              opacity="0.7"
            ></circle>
            <circle className="ia-tw" style={{ "--d": "0.0s" }} cx="92" cy="110" r="9" fill="#FAE84E"></circle>
            <circle className="ia-tw" style={{ "--d": "0.9s" }} cx="344" cy="118" r="12" stroke="url(#abL)" strokeWidth="3"></circle>
            <circle className="ia-tw" style={{ "--d": "0.5s" }} cx="78" cy="300" r="5" fill="#5EC0FA"></circle>
            <path
              className="ia-tw"
              style={{ "--d": "1.4s" }}
              d="M354 300l6 0M357 297l0 6"
              stroke="#FAE84E"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <rect
              x="80"
              y="116"
              width="180"
              height="112"
              rx="24"
              stroke="url(#abL)"
              strokeWidth="2.5"
              transform="rotate(-7 170 172)"
            ></rect>
            <path
              className="ia-march"
              style={{ "--d": "0.0s" }}
              d="M126 228c6 40 60 96 150 86"
              stroke="#FAE84E"
              strokeWidth="4"
              strokeDasharray="2 11"
              strokeLinecap="round"
            ></path>
            <rect x="96" y="104" width="180" height="112" rx="24" fill="#FFFFFF"></rect>
            <path d="M126 212l-4 34 32-34z" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round"></path>
            <circle className="ia-type" style={{ "--d": "0.8s" }} cx="146" cy="160" r="12" fill="#8639FA"></circle>
            <circle className="ia-type" style={{ "--d": "1.0s" }} cx="186" cy="160" r="12" fill="url(#abF)"></circle>
            <circle className="ia-type" style={{ "--d": "1.2s" }} cx="226" cy="160" r="12" fill="#0F8AE5"></circle>
            <ellipse className="ia-pop" style={{ "--d": "1.1s" }} cx="312" cy="318" rx="28" ry="7" fill="#FFFFFF" opacity="0.18"></ellipse>
            <path
              className="ia-drop"
              style={{ "--d": "0.7s" }}
              d="M312 316c-30-34-48-58-48-80a48 48 0 0 1 96 0c0 22-18 46-48 80z"
              fill="url(#abF)"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
            ></path>
            <circle className="ia-drop" style={{ "--d": "0.7s" }} cx="312" cy="236" r="20" fill="#FFFFFF"></circle>
            <circle className="ia-pop" style={{ "--d": "1.2s" }} cx="312" cy="236" r="9" fill="#FAE84E"></circle>
          </svg>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "0",
            pointerEvents: "none",
            background:
              "radial-gradient(60% 70% at 85% 20%, rgba(134, 57, 250, 0.45) 0%, rgba(134, 57, 250, 0) 70%), radial-gradient(50% 60% at 70% 95%, rgba(15, 138, 229, 0.35) 0%, rgba(15, 138, 229, 0) 70%)",
          }}
        ></div>
        <div
          className="pj-wrap"
          style={{
            position: "relative",
            zIndex: "2",
            width: "100%",
            maxWidth: "1280px",
            boxSizing: "border-box",
            margin: "0 auto",
            padding: "28px 40px 0",
          }}
        >
          <nav aria-label={ta("Kruimelpad")} style={{ fontSize: "14px", color: "#C9CFF0" }}>
            <a href={href("Main")} style={{ color: "#C9CFF0", textDecoration: "none" }}>
              {t("Home")}
            </a>{" "}
            <span aria-hidden="true" style={{ margin: "0 6px" }}>
              {t("/")}
            </span>{" "}
            <span aria-current="page" style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {t("Contact")}
            </span>
          </nav>
        </div>
        <div
          className="pj-wrap cs-hero-body"
          style={{
            position: "relative",
            zIndex: "2",
            marginTop: "auto",
            width: "100%",
            maxWidth: "1280px",
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto",
            padding: "0 40px 140px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "22px",
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: "#FAE84E" }}>
            {t("Contact")}
          </span>
          <h1
            style={{
              margin: "0",
              maxWidth: "960px",
              color: "#FFFFFF",
              fontFamily: "var(--font-display)",
              fontWeight: "700",
              fontSize: "clamp(48px, 6.4vw, 96px)",
              lineHeight: "0.95",
              letterSpacing: "-0.035em",
            }}
          >
            {t("Vertel ons waar je naartoe")}{" "}
            <Accent from="#B48DFF" to="#5EC0FA">
              <span
                className="grad-text"
                style={{
                  background: "linear-gradient(90deg, #B48DFF 0%, #5EC0FA 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("wilt.")}
              </span>
            </Accent>
          </h1>
          <p style={{ margin: "0", maxWidth: "640px", fontSize: "20px", lineHeight: "1.55", color: "#FFFFFF" }}>
            {t("Plan een vrijblijvend groeigesprek, bel ons of stuur een bericht. Op werkdagen heb je binnen 4 uur antwoord.")}
          </p>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div
          className="ct-ways"
          style={{
            position: "relative",
            zIndex: "3",
            maxWidth: "1280px",
            margin: "-96px auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "24px",
          }}
        >
          <div
            className="ct-card"
            style={{
              boxSizing: "border-box",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              background: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
              color: "#FFFFFF",
            }}
          >
            <h2
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: "700",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
              }}
            >
              {t("Plan je groeigesprek")}
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.6", color: "#FFFFFF" }}>
              {t("Kies zelf een moment in de agenda. Vrijblijvend, en daarna weet je wat je volgende stap is.")}
            </p>
            <a
              href="https://calendly.com/vrijblijvendgesprek/"
              target="_blank"
              rel="noopener"
              style={{
                marginTop: "auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "52px",
                padding: "0 24px",
                borderRadius: "8px",
                background: "#FFFFFF",
                color: "#1F246C",
                fontSize: "17px",
                fontWeight: "700",
                textDecoration: "none",
              }}
            >
              {t("Kies een moment")}
            </a>
          </div>
          <div
            className="ct-card"
            style={{
              boxSizing: "border-box",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              background: "#FFFFFF",
            }}
          >
            <h2
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: "700",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
                color: "#1F246C",
              }}
            >
              {t("Bel ons")}
            </h2>
            <a
              href="tel:+31854016590"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "30px",
                fontWeight: "700",
                lineHeight: "1.1",
                color: "#1F246C",
                textDecoration: "none",
              }}
            >
              {t("085 401 6590")}
            </a>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#5A6273" }}>
              {t("Direct contact met ons team.")}
              <br />
              {t("Maandag – vrijdag, 09:00 – 17:30")}
            </p>
          </div>
          <div
            className="ct-card"
            style={{
              boxSizing: "border-box",
              borderRadius: "24px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",
              background: "#FFFFFF",
            }}
          >
            <h2
              style={{
                margin: "0",
                fontFamily: "var(--font-display)",
                fontSize: "26px",
                fontWeight: "700",
                lineHeight: "1.1",
                letterSpacing: "-0.01em",
                color: "#1F246C",
              }}
            >
              {t("Mail ons")}
            </h2>
            <a
              href="mailto:info@achieve.nl"
              translate="no"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "30px",
                fontWeight: "700",
                lineHeight: "1.1",
                color: "#1F246C",
                textDecoration: "none",
              }}
            >
              {"info@achieve.nl"}
            </a>
            <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#5A6273" }}>{t("Reactie binnen 4 uur op werkdagen.")}</p>
          </div>
        </div>
      </section>
      <section id="bericht" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div
          className="ct-form"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
            gap: "48px 72px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "sticky", top: "120px" }}>
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
              {t("Stuur ons een")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span
                  className="grad-text"
                  style={{
                    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("bericht.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t("Vertel kort waar je nu staat en waar je naartoe wilt. We nemen snel contact met je op.")}
            </p>
            <ul style={{ margin: "8px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span style={{ position: "relative" }}>{t("Reactie binnen 4 uur op werkdagen")}</span>
              </li>
              <li style={{ display: "flex", gap: "12px", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8639FA"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  style={{ flexShrink: "0", marginTop: "4px" }}
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Vrijblijvend, je zit nergens aan vast")}</span>
              </li>
            </ul>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "4px",
                padding: "14px 18px",
                borderRadius: "16px",
                background: "#FFFFFF",
                border: "1px solid #E4E6EA",
                alignSelf: "flex-start",
              }}
            >
              <span className="ct-faces" aria-hidden="true" style={{ flexShrink: "0" }}>
                <span style={{ display: "flex" }}>
                  <span
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#EFE8FD",
                      border: "2px solid #FFFFFF",
                      boxSizing: "border-box",
                      marginLeft: "0px",
                      zIndex: "10",
                      flexShrink: "0",
                    }}
                  >
                    <img
                      src="/media/team/karim.svg"
                      alt=""
                      style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </span>
                  <span
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#FFF6CC",
                      border: "2px solid #FFFFFF",
                      boxSizing: "border-box",
                      marginLeft: "-12px",
                      zIndex: "9",
                      flexShrink: "0",
                    }}
                  >
                    <img
                      src="/media/team/denise.svg"
                      alt=""
                      style={{ position: "absolute", left: "-5%", top: "0", width: "110%", height: "auto" }}
                    />
                  </span>
                  <span
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#E3F1FD",
                      border: "2px solid #FFFFFF",
                      boxSizing: "border-box",
                      marginLeft: "-12px",
                      zIndex: "8",
                      flexShrink: "0",
                    }}
                  >
                    <img
                      src="/media/team/abdelmonim.svg"
                      alt=""
                      style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </span>
                  <span
                    style={{
                      position: "relative",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#FFF6CC",
                      border: "2px solid #FFFFFF",
                      boxSizing: "border-box",
                      marginLeft: "-12px",
                      zIndex: "7",
                      flexShrink: "0",
                    }}
                  >
                    <img
                      src="/media/team/niek.svg"
                      alt=""
                      style={{ position: "absolute", left: "-14%", top: "0", width: "128%", height: "auto" }}
                    />
                  </span>
                </span>
              </span>
              <span style={{ fontSize: "16px", fontWeight: "600", lineHeight: "1.4", color: "#1F246C" }}>
                {t("We kijken uit naar je verhaal")}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", marginTop: "8px" }}>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#1F246C" }}
              >
                <img src="/media/icons/google.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                <span style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                </span>
                {t("5,0 op Google")}
              </span>
              <span
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#1F246C" }}
              >
                <img src="/media/icons/trustpilot.svg" alt="" style={{ display: "block", width: "18px", height: "18px" }} />
                <span style={{ display: "inline-flex", gap: "2px" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#F2C811"
                    ></path>
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      fill="#E4E6EA"
                    ></path>
                  </svg>
                </span>
                {t("4,5 op Trustpilot")}
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              boxShadow: "0 20px 50px rgba(31, 36, 108, 0.08)",
            }}
          >
            <div className="ct-two" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
              >
                <span>
                  {t("Naam")}
                  <span aria-hidden="true" style={{ color: "#8639FA", marginLeft: "2px" }}>
                    {t("*")}
                  </span>
                </span>
                <input
                  type="text"
                  name="naam"
                  autoComplete="name"
                  required
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    padding: "15px 16px",
                    borderRadius: "10px",
                    border: "1px solid #D5D8E3",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
              >
                {t("Bedrijfsnaam")}
                <input
                  type="text"
                  name="bedrijf"
                  autoComplete="organization"
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    padding: "15px 16px",
                    borderRadius: "10px",
                    border: "1px solid #D5D8E3",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
              >
                <span>
                  {t("E-mailadres")}
                  <span aria-hidden="true" style={{ color: "#8639FA", marginLeft: "2px" }}>
                    {t("*")}
                  </span>
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    padding: "15px 16px",
                    borderRadius: "10px",
                    border: "1px solid #D5D8E3",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
              >
                {t("Telefoonnummer")}
                <input
                  type="tel"
                  name="telefoon"
                  autoComplete="tel"
                  style={{
                    font: "inherit",
                    fontSize: "16px",
                    padding: "15px 16px",
                    borderRadius: "10px",
                    border: "1px solid #D5D8E3",
                    background: "#FFFFFF",
                    color: "#1F246C",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </label>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Waar kunnen we je mee helpen?")}
              <select
                name="dienst"
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "15px 16px",
                  borderRadius: "10px",
                  border: "1px solid #D5D8E3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                  appearance: "auto",
                }}
              >
                <option value="">{t("Kies een dienst")}</option>
                <option translate="no">{"Strategy"}</option>
                <option translate="no">{"Legal"}</option>
                <option translate="no">{"Brand Book"}</option>
                <option translate="no">{"Custom website"}</option>
                <option translate="no">{"Shopify webshop"}</option>
                <option translate="no">{"Email Marketing"}</option>
                <option translate="no">{"UGC Marketing"}</option>
                <option translate="no">{"Video Marketing"}</option>
                <option translate="no">{"Search Engine Advertising"}</option>
                <option translate="no">{"Social Media Advertising"}</option>
                <option translate="no">{"Social Media Management"}</option>
                <option translate="no">{"Dashboard"}</option>
                <option>{t("Weet ik nog niet")}</option>
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}>
              {t("Je bericht")}
              <textarea
                name="bericht"
                rows={5}
                style={{
                  font: "inherit",
                  fontSize: "16px",
                  padding: "15px 16px",
                  borderRadius: "10px",
                  border: "1px solid #D5D8E3",
                  background: "#FFFFFF",
                  color: "#1F246C",
                  width: "100%",
                  boxSizing: "border-box",
                  resize: "vertical",
                  minHeight: "140px",
                }}
              ></textarea>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "13px",
                fontWeight: "400",
                lineHeight: "1.5",
                color: "#5A6273",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              <input
                type="checkbox"
                name="toestemming"
                required
                style={{ width: "18px", height: "18px", margin: "1px 0 0", flexShrink: "0", accentColor: "#8639FA", cursor: "pointer" }}
              />
              <span>
                {t("Ik ga akkoord dat Achieve mijn gegevens gebruikt om contact met me op te nemen. Lees onze")}{" "}
                <a href={href("Privacy")} style={{ color: "#1F246C", fontWeight: "600" }}>
                  {t("privacyverklaring")}
                </a>
                {t(".")}
              </span>
            </label>
            <button
              type="button"
              className="glow"
              onClick={h.send}
              style={{
                alignSelf: "flex-start",
                marginTop: "6px",
                font: "inherit",
                fontSize: "18px",
                fontWeight: "700",
                padding: "16px 28px",
                borderRadius: "8px",
                border: "2px solid transparent",
                background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              {t("Verstuur bericht")}
            </button>
          </div>
        </div>
      </section>
      <section id="locatie" className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "720px" }}>
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
              {t("Kom gezellig langs op")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span
                  className="grad-text"
                  style={{
                    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("kantoor.")}
                </span>
              </Accent>
            </h2>
            <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.65", color: "#3A4150" }}>
              {t(
                "Ons kantoor in Capelle aan den IJssel, vlak bij Rotterdam. Kom je langs? Laat het even weten, dan staat de koffie klaar.",
              )}
            </p>
          </div>
          <div
            className="wb-map"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2.1fr)", gap: "24px", alignItems: "stretch" }}
          >
            <div
              className="wb-photo-box"
              style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "16 / 9", background: "#E3E8F2" }}
            >
              <img
                className="wb-photo"
                src="/media/kantoor-kaart.jpg"
                alt={ta("Het kantoorpand van Achieve aan de Cypresbaan 3 in Capelle aan den IJssel, met terras voor de ingang")}
                style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 50%" }}
              />
            </div>
            <div
              className="wb-map-card"
              style={{
                order: "-1",
                background: "#FFFFFF",
                borderRadius: "24px",
                padding: "36px 34px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <strong translate="no" style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "700", color: "#1F246C" }}>
                {"Achieve"}
              </strong>
              <span translate="no" style={{ fontSize: "15px", lineHeight: "1.5", color: "#3A4150" }}>
                {"Cypresbaan 3"}
                <br />
                {"2908 LT Capelle aan den IJssel"}
              </span>
              <span style={{ marginTop: "8px", fontSize: "14px", lineHeight: "1.6", color: "#5A6273" }}>
                {t("Maandag – vrijdag: 09:00 – 17:30")}
                <br />
                {t("Zaterdag – zondag: gesloten")}
              </span>
              <div style={{ marginTop: "6px" }}>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Achieve,+Cypresbaan+3,+2908+LT+Capelle+aan+den+IJssel"
                  className="about-link"
                  style={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "44px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1F246C",
                    textDecoration: "none",
                  }}
                >
                  <span className="l2-txt">{t("Plan je route")}</span>{" "}
                  <span
                    className="svc-arrow"
                    aria-hidden="true"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "999px",
                      border: "1px solid #D5D8E3",
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
          </div>
        </div>
      </section>
      <section className="pj-wrap pj-sec" style={{ background: "#F2F8FE", padding: "0 40px 112px" }}>
        <div
          className="ct-wb"
          style={{
            boxSizing: "border-box",
            maxWidth: "1280px",
            margin: "0 auto",
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "36px 48px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px 32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "700", color: "#1F246C" }}>
              {t("Op zoek naar een")}{" "}
              <Accent from="#8639FA" to="#0F8AE5">
                <span
                  className="grad-text"
                  style={{
                    background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("stage?")}
                </span>
              </Accent>
            </strong>
            <span style={{ fontSize: "16px", color: "#5A6273" }}>{t("We hebben plek voor een sales- en een contentstagiair.")}</span>
          </div>
          <a
            href={href("WerkenBij", "vacatures")}
            className="about-link"
            style={{
              alignSelf: "center",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              minHeight: "44px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#1F246C",
              textDecoration: "none",
            }}
          >
            <span className="l2-txt">{t("Bekijk de vacatures")}</span>{" "}
            <span
              className="svc-arrow"
              aria-hidden="true"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "999px",
                border: "1px solid #D5D8E3",
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
      </section>
    </>
  );
}
