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
    projects/          Projecten-pagina (hero, logostrook, uitgelichte case, grid, quotes, CTA)
    cases/             de 7 case-pagina's
    services/          de dienstpagina's (+ ServicePage-shell)
    pages/             Tarieven, Contact, Werken bij, vacatures, Bedankt, 404, juridisch
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

## Pagina's

| Pagina | NL-adres |
| --- | --- |
| Home | `/` |
| Projecten + 7 cases | `/projecten`, `/projecten/sharkys` … |
| Diensten (13 + SMA-looptijd) | `/diensten/strategy` … `/diensten/social-media-advertising/looptijd` |
| Tarieven, Contact | `/tarieven`, `/contact` |
| Werken bij + vacatures | `/werken-bij`, `/werken-bij/sales`, `/werken-bij/content` |
| Bedankt, juridisch | `/bedankt`, `/privacy`, `/voorwaarden`, `/disclaimer` |

Andere talen: zet de taalcode ervoor (`/en/tarieven`). Onbekende adressen tonen de 404-pagina in de juiste taal.
Sitemap: `/sitemap.xml` (alle pagina's × 8 talen, met hreflang).

## Talen

Nederlands is de brontaal. Elke tekst staat als `t("Nederlandse zin")` in de
code en wordt opgezocht in `src/i18n/dict/<taal>/<Pagina>.json` (dezelfde
woordenboeken als in het design). Labels, klantnamen, logo en tagline worden
niet vertaald.

## Omgevingsvariabelen

| Naam | Waarvoor |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | Waar aanvragen uit het contactformulier, het CTA-formulier en sollicitaties (met cv) heen gaan (Make, Zapier, n8n of CRM). |
