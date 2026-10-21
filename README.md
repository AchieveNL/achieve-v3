# Achieve v3 — achieve.nl

Next.js 16 (App Router) + Tailwind 4, gebouwd vanuit het Claude Design-canvas
"Achieve.nl – nieuwe website".

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productie-build (zelfde als Vercel)
```

## Structuur

```
src/
  app/[locale]/        pagina's per taal (nl op de root, /en, /es, /fr, /de, /pl, /tr, /ar)
  app/api/contact/     contactformulier → CONTACT_WEBHOOK_URL
  components/
    layout/            Header (menu, dropdowns, taalkiezer), Footer, PageShell
    sections/          homepage-secties (Hero, Achiever, Services, Approach,
                       FeaturedCases, Team, Reviews, ContactCta)
    ui/                kleine bouwstenen: Accent (penseelstreep), Tip (i-bolletje),
                       LogoMarquee, LazyVideo
    motion/            één pauzeknop voor alle animaties + prefers-reduced-motion
    behavior/          Calendly-popup, slepen/swipen in rijen
  data/                logo's en reviews
  i18n/                talen: config, vertaal-functie, woordenboeken per pagina
  styles/achieve.css   CSS uit het design (hover-effecten, knoppen, responsive)
public/media/          logo's (SVG, wit), teamportretten, video's, foto's
tools/design-port/     scripts om canvas-artboards om te zetten naar componenten
```

## Talen

Nederlands is de brontaal. Elke tekst staat als `t("Nederlandse zin")` in de
code en wordt opgezocht in `src/i18n/dict/<taal>/<Pagina>.json` (dezelfde
woordenboeken als in het design). Labels, klantnamen, logo en tagline worden
niet vertaald.

## Omgevingsvariabelen

| Naam | Waarvoor |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Waar aanvragen uit het contactformulier heen gaan (Make, Zapier, n8n of CRM). |
