"use client";

import { useTr } from "@/i18n/I18nProvider";
import { sendLead } from "@/lib/sendLead";
import { useRef, useState, type MouseEvent } from "react";
import { useMotion, useTick } from "@/components/motion/MotionProvider";
import { reviews } from "@/data/reviews";
import { Accent } from "@/components/ui/Accent";
import { LogoMarquee } from "@/components/ui/LogoMarquee";

export function ContactCta() {
  const { t, ta, href } = useTr();

  const { paused, toggle } = useMotion();
  const ctaStart = Math.max(
    0,
    reviews.findIndex((r) => r.name === "Sara Kamah"),
  );
  const [revIdx, setRevIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  useTick(6000, () => !hovered && setRevIdx((i) => i + 1));
  const thanksLinkRef = useRef<HTMLAnchorElement>(null);
  const rv = reviews[(ctaStart + revIdx) % reviews.length];

  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<{ naam: boolean; email: boolean; consent: boolean } | null>(null);
  const clr = (k: "naam" | "email" | "consent") => () => err?.[k] && setErr({ ...err, [k]: false });

  // Same validation as the design, then the lead goes to info@achieve.nl (see lib/sendLead) and the thank-you page.
  const send = async (e: MouseEvent<HTMLButtonElement>) => {
    const box = e.currentTarget.parentNode as HTMLElement | null;
    const q = <T extends Element>(nm: string) => box?.querySelector<T>(`[name="${nm}"]`) ?? null;
    const naam = q<HTMLInputElement>("naam"),
      mail = q<HTMLInputElement>("email"),
      ok = q<HTMLInputElement>("toestemming");
    const tel = q<HTMLInputElement>("telefoon"),
      msg = q<HTMLTextAreaElement>("bericht");
    const vNaam = !!naam && naam.value.trim().length > 0;
    const vMail = !!mail && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim());
    const vOk = !!ok?.checked;
    if (!(vNaam && vMail && vOk)) {
      setErr({ naam: !vNaam, email: !vMail, consent: !vOk });
      requestAnimationFrame(() => (!vNaam ? naam : !vMail ? mail : ok)?.focus());
      return;
    }
    setErr(null);
    setSent(true);
    await sendLead(
      {
        naam: naam!.value,
        email: mail!.value,
        telefoon: tel?.value ?? "",
        bericht: msg?.value ?? "",
        toestemming: "ja",
        bron: window.location.pathname,
      },
      href("Bedankt"),
    );
  };
  const h = {
    motionPaused: paused,
    motionRunning: !paused,
    motionPressed: paused,
    motionLabel: paused ? "Animaties afspelen" : "Animaties pauzeren",
    toggleMotion: toggle,
    ctaRevQuote: rv.quote,
    ctaRevName: rv.name,
    ctaRevRole: rv.role,
    ctaRevHasRole: !!rv.role,
    ctaRevLogo: rv.src === "trustpilot" ? "/media/icons/trustpilot.svg" : "/media/icons/google.svg",
    ctaRevPause: () => setHovered(true),
    ctaRevPlay: () => setHovered(false),
    ctaSent: sent,
    ctaOpen: !sent,
    ctaSend: send,
    errNaam: !!err?.naam,
    errEmail: !!err?.email,
    errConsent: !!err?.consent,
    errNaamA: !!err?.naam,
    errEmailA: !!err?.email,
    errConsentA: !!err?.consent,
    naamBorder: err?.naam ? "#C2261A" : "#D5D8E3",
    emailBorder: err?.email ? "#C2261A" : "#D5D8E3",
    clrNaam: clr("naam"),
    clrEmail: clr("email"),
    clrConsent: clr("consent"),
  };
  return (
    <>
      <section className="cta-arrows" style={{ background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)", color: "#FFFFFF" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "112px 40px 72px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "48px 72px",
          }}
        >
          <div style={{ flex: "1 1 440px", minWidth: "0", display: "flex", flexDirection: "column", gap: "22px" }}>
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
              {t("Laten we")}{" "}
              <Accent from="#FAE84E" to="#F2C811">
                <span style={{ color: "#FAE84E" }}>{t("samen")}</span>
              </Accent>{" "}
              {t("iets moois neerzetten.")}
            </h2>
            <p style={{ margin: "0", maxWidth: "480px", fontSize: "18px", lineHeight: "1.6", color: "#FFFFFF" }}>
              {t("Jij vertelt waar je naartoe wilt. Wij laten zien hoe je er komt.")}
            </p>
            <ul style={{ margin: "8px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Op werkdagen binnen 4 uur aan de lijn")}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Vrijblijvend en volledig op maat")}</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "17px", fontWeight: "500" }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FAE84E"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12.5l5 5L20 6.5"></path>
                </svg>
                <span>{t("Eerlijk advies over je volgende stap")}</span>
              </li>
            </ul>
            <figure
              className="cta-quote"
              onMouseEnter={h.ctaRevPause}
              onMouseLeave={h.ctaRevPlay}
              aria-live="polite"
              style={{
                margin: "12px 0 0",
                maxWidth: "480px",
                padding: "20px 22px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.24)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span role="img" aria-label={ta("5 van 5 sterren")} style={{ display: "inline-flex", gap: "2px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#FAE84E"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#FAE84E"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#FAE84E"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#FAE84E"
                      ></path>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        fill="#FAE84E"
                      ></path>
                    </svg>
                  </span>
                  <img
                    src={h.ctaRevLogo}
                    alt=""
                    style={{
                      width: "16px",
                      height: "16px",
                      background: "#FFFFFF",
                      borderRadius: "50%",
                      padding: "2px",
                      boxSizing: "content-box",
                    }}
                  />
                </span>
                <button
                  type="button"
                  className="motion-toggle"
                  onClick={h.toggleMotion}
                  aria-pressed={h.motionPressed}
                  aria-label={ta(String(h.motionLabel))}
                  title={ta(String(h.motionLabel))}
                  style={{
                    flexShrink: "0",
                    borderRadius: "999px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "1px solid rgba(255, 255, 255, 0.35)",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    width: "36px",
                    height: "36px",
                    margin: "-6px -8px -6px 0",
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
              </span>
              <blockquote
                className="cta-quote-text"
                style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", fontWeight: "500", color: "#FFFFFF" }}
              >
                {t(String(h.ctaRevQuote))}
              </blockquote>
              <figcaption style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.85)" }}>
                <strong style={{ color: "#FFFFFF", fontWeight: "600" }}>{t(String(h.ctaRevName))}</strong>
                {h.ctaRevHasRole && (
                  <>
                    {" "}
                    {t("·")} <span>{t(String(h.ctaRevRole))}</span>
                  </>
                )}
              </figcaption>
            </figure>
          </div>
          <div
            style={{
              flex: "0 1 440px",
              minWidth: "0",
              background: "#FFFFFF",
              borderRadius: "28px",
              padding: "36px",
              color: "#1F246C",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.25)",
            }}
          >
            <a href={href("Bedankt")} ref={thanksLinkRef} tabIndex={-1} aria-hidden="true" style={{ display: "none" }}>
              {t("Bedankt")}
            </a>
            {h.ctaSent && (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    padding: "24px 0",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 12.5l5 5L20 6.5"></path>
                    </svg>
                  </span>
                  <h3 style={{ margin: "0", fontFamily: "var(--font-display)", fontSize: "28px", fontWeight: "700" }}>
                    {t("Top, we spreken je snel!")}
                  </h3>
                  <p style={{ margin: "0", fontSize: "16px", lineHeight: "1.6", color: "#3A4150" }}>
                    {t("Op werkdagen nemen we binnen 4 uur contact met je op.")}
                  </p>
                </div>
              </>
            )}
            {h.ctaOpen && (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: "700" }}>
                    {t("Plan je groeigesprek")}
                  </h3>
                  <label
                    style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
                  >
                    {t("Naam")}
                    <input
                      type="text"
                      name="naam"
                      autoComplete="name"
                      required
                      aria-invalid={h.errNaamA}
                      onInput={h.clrNaam}
                      style={{
                        font: "inherit",
                        fontSize: "16px",
                        padding: "15px 16px",
                        borderRadius: "10px",
                        border: `1px solid ${h.naamBorder}`,
                        background: "#FFFFFF",
                        color: "#1F246C",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                    {h.errNaam && (
                      <>
                        <span
                          role="alert"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#C2261A",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M12 7.5v5.5M12 16.5h.01"></path>
                          </svg>
                          {t("Vul je naam in.")}
                        </span>
                      </>
                    )}
                  </label>
                  <label
                    style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
                  >
                    {t("E-mailadres")}
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      aria-invalid={h.errEmailA}
                      onInput={h.clrEmail}
                      style={{
                        font: "inherit",
                        fontSize: "16px",
                        padding: "15px 16px",
                        borderRadius: "10px",
                        border: `1px solid ${h.emailBorder}`,
                        background: "#FFFFFF",
                        color: "#1F246C",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                    {h.errEmail && (
                      <>
                        <span
                          role="alert"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#C2261A",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="9"></circle>
                            <path d="M12 7.5v5.5M12 16.5h.01"></path>
                          </svg>
                          {t("Vul een geldig e-mailadres in.")}
                        </span>
                      </>
                    )}
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
                  <label
                    style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "14px", fontWeight: "600", color: "#1F246C" }}
                  >
                    <span>
                      {t("Waar kunnen we je mee helpen?")} <span style={{ fontWeight: "400", color: "#5A6273" }}>{t("(optioneel)")}</span>
                    </span>
                    <textarea
                      name="bericht"
                      rows={3}
                      placeholder={ta("Bijv. een nieuwe website, meer leads of een rebrand")}
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
                        minHeight: "96px",
                      }}
                    ></textarea>
                  </label>
                  <label
                    className="cta-consent"
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
                      aria-invalid={h.errConsentA}
                      onChange={h.clrConsent}
                      style={{
                        width: "18px",
                        height: "18px",
                        margin: "1px 0 0",
                        flexShrink: "0",
                        accentColor: "#8639FA",
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      {t("Ik ga akkoord dat Achieve mijn gegevens gebruikt om contact met me op te nemen. Lees onze")}{" "}
                      <a href={href("Privacy")} style={{ color: "#1F246C", fontWeight: "600" }}>
                        {t("privacyverklaring")}
                      </a>
                      {t(".")}
                    </span>
                  </label>
                  {h.errConsent && (
                    <>
                      <span
                        role="alert"
                        style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: "500", color: "#C2261A" }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="9"></circle>
                          <path d="M12 7.5v5.5M12 16.5h.01"></path>
                        </svg>
                        {t("Vink dit aan, dan mogen we contact met je opnemen.")}
                      </span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={h.ctaSend}
                    className="glow"
                    style={{
                      marginTop: "6px",
                      font: "inherit",
                      fontSize: "18px",
                      fontWeight: "700",
                      padding: "16px 24px",
                      borderRadius: "8px",
                      border: "2px solid transparent",
                      background: "linear-gradient(90deg, #8639FA 0%, #0F8AE5 100%)",
                      color: "#FFFFFF",
                      cursor: "pointer",
                    }}
                  >
                    {t("Plan je groeigesprek")}
                  </button>
                  <span style={{ fontSize: "14px", color: "#5A6273", textAlign: "center" }}>
                    {t("Liever direct bellen?")}{" "}
                    <a href="tel:+31854016590" style={{ color: "#1F246C", fontWeight: "600" }}>
                      {t("085 401 6590")}
                    </a>
                  </span>
                  <span style={{ fontSize: "14px", color: "#5A6273", textAlign: "center", marginTop: "-8px" }}>
                    {t("Nog vragen?")}{" "}
                    <a href={href("Tarieven", "faq")} style={{ color: "#1F246C", fontWeight: "600" }}>
                      {t("Bekijk de veelgestelde vragen")}
                    </a>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        <div aria-label={ta("Klanten")} style={{ padding: "0 0 56px" }}>
          <LogoMarquee speed={18} direction="right" style={{ width: "100%" }} />
        </div>
      </section>
    </>
  );
}
