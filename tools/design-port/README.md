# Design-port tools

Scripts used to turn the Claude Design canvas (`*.dc.html` artboards) into the
React components in `src/`. They keep the markup, inline styles, holes and
translations of the design 1:1, so the site matches the canvas.

- `h2jsx.py` — converts a `.dc.html` template fragment to JSX. Text becomes
  `t("…")`, aria-label/alt/title/placeholder become `ta("…")`, `{{hole}}`
  becomes `h.hole`, `<sc-if>`/`<sc-for>` become conditionals/maps, links to
  `X.dc.html` become `href("X")`. Repeated design atoms are swapped for
  components: brush underline → `<Accent>`, jargon "i" → `<Tip>`.
- `gen.py` — wraps converted JSX into a component file with a hand-written
  preamble (state, effects and the `h` object with the values for the holes).
- `post.py` — replaces logo marquees with `<LogoMarquee>` and lazy videos with `<LazyVideo>`.
- `extract_i18n.js` — pulls the 7 translation dictionaries out of every artboard
  into `src/i18n/dict/<locale>/<Page>.json`.

Workflow for a new page: export its artboard, split it into sections, convert,
wrap each section with `gen.py`, wire the holes in the preamble, then add the
route under `src/app/[locale]/`.
