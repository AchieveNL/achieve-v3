import type { ReactNode } from "react";

/**
 * Jargon explainer (style guide rule 12): dark-blue "i" right after the word,
 * explanation in plain language on hover/focus/tap. Max two sentences.
 * `plain` resets uppercase/letter-spacing when used inside labels.
 */
export function Tip({ children, plain = false, label = "Uitleg" }: { children: ReactNode; plain?: boolean; label?: string }) {
  return (
    <span className="tf-tip" tabIndex={0} role="button" aria-label={label}>
      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="10.5" y="4" width="3" height="3" rx="1.5" fill="currentColor" />
        <rect x="10.5" y="9.5" width="3" height="10.5" rx="1.5" fill="currentColor" />
      </svg>
      <span
        className="tf-tip-box"
        role="tooltip"
        style={plain ? { textTransform: "none", letterSpacing: "normal", fontWeight: 400 } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
