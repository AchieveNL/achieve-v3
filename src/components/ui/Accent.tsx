import type { ReactNode } from "react";

/**
 * Brush underline under the accent word of a heading (style guide: "streepjes onder koppen").
 * Colours: purple → blue on light (default), light purple → light blue on dark,
 * white or yellow on colour. Pass the styled word as children.
 */
export function Accent({
  children,
  from = "#8639FA",
  to = "#0F8AE5",
  wide = false,
  thin = "0.75",
}: {
  children: ReactNode;
  from?: string;
  to?: string;
  /** Full-width, slightly lower stroke (used on a few big numbers). */
  wide?: boolean;
  /** Opacity of the second, thinner stroke. */
  thin?: string;
}) {
  const id = `acc-${from}-${to}`.replace(/[^a-zA-Z0-9-]/g, "");
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        style={
          wide
            ? { position: "absolute", left: 0, bottom: "-0.16em", width: "100%", height: "0.24em", overflow: "visible" }
            : { position: "absolute", left: 0, bottom: "-0.22em", width: "94%", height: "0.26em", overflow: "visible" }
        }
      >
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <path d="M4 9 C 60 4, 130 3, 196 7" stroke={`url(#${id})`} strokeWidth="7" fill="none" strokeLinecap="round" />
        <path
          d="M38 16 C 90 12.5, 140 12.5, 182 14.5"
          stroke={`url(#${id})`}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          opacity={thin}
        />
      </svg>
    </span>
  );
}
