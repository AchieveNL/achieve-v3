"use client";

import type { CSSProperties } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { useTr } from "@/i18n/I18nProvider";

/**
 * Pause/play button on top of a background video (WCAG 2.2.2), same look as on the case pages.
 * It uses the one motion switch, so it pauses every video and animation on the page.
 * The parent needs position: relative; pass style to move it (default: bottom right).
 */
export function VidButton({ style }: { style?: CSSProperties }) {
  const { paused, toggle } = useMotion();
  const { ta } = useTr();
  const label = ta(paused ? "Video afspelen" : "Video pauzeren");
  return (
    <button
      type="button"
      className="vid-btn"
      onClick={toggle}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      style={{
        position: "absolute",
        zIndex: "3",
        right: "40px",
        bottom: "32px",
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        background: "rgba(14, 17, 40, 0.45)",
        color: "#FFFFFF",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "0",
        ...style,
      }}
    >
      {paused ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"></path>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1"></rect>
          <rect x="14" y="5" width="4" height="14" rx="1"></rect>
        </svg>
      )}
    </button>
  );
}
