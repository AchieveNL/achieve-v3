/** Shared SVG gradients referenced by id (review stars use url(#sgStar)). */
export function SvgDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <linearGradient id="sgStar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDEF6A" />
          <stop offset="100%" stopColor="#F2C811" />
        </linearGradient>
      </defs>
    </svg>
  );
}
