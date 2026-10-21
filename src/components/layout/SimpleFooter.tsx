import type { ServerTr } from "@/i18n/server";

export function SimpleFooter({ tr }: { tr: ServerTr }) {
  const { t, ta, href } = tr;

  const h = { curYear: String(new Date().getFullYear()) };
  return (
    <>
      <footer className="ty-wrap" style={{ background: "#1F246C", color: "#D5DAE3", padding: "28px 40px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
            fontSize: "14px",
          }}
        >
          <span>
            {t("Copyright ©")} <span translate="no">{h.curYear}</span> {t("Achieve. All rights reserved.")}
          </span>
          <span
            translate="no"
            className="ai-pill"
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 10px",
              padding: "5px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              background: "rgba(255, 255, 255, 0.06)",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.06em",
              color: "#FFFFFF",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#B48DFF"
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
            <span aria-hidden="true" style={{ width: "1px", height: "14px", background: "rgba(255, 255, 255, 0.25)" }}></span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5EC0FA"
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
          <span>
            {t("Cypresbaan 3, 2908 LT Capelle aan den IJssel ·")}{" "}
            <a href="mailto:info@achieve.nl" style={{ color: "#FFFFFF" }}>
              {t("info@achieve.nl")}
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
