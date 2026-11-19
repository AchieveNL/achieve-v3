"use client";

import { GuidePage, type Guide } from "./handleiding/GuidePage";

/** Bedrijfsportfolio-ID van Achieve in Meta (Karim, 18 nov 2026). */
const BUSINESS_ID = "1552343925160219";
const S = "https://business.facebook.com/latest/settings/";

/** Dutch source text; translations in src/i18n/dict/<taal>/HandleidingMeta.json. Markup: see handleiding/rich.tsx. */
const guide: Guide = {
  store: "achieve-meta-stappen",
  id: BUSINESS_ID,
  links: { bs: "https://business.facebook.com/", settings: S, adaccounts: S + "ad_accounts", partners: S + "partners" },
  eyebrow: "Handleiding · Facebook- en Instagram-advertenties",
  brand: "Meta.",
  intro:
    "Met deze stappen zet je alles klaar om op Facebook en Instagram te adverteren, en geef je Achieve veilig toegang. Je deelt geen wachtwoorden en je blijft zelf eigenaar van alles.",
  need: [
    ["Je eigen Facebook-account", "Meta werkt alleen met een persoonlijk account om in te loggen. Niemand ziet je profiel; het is alleen je sleutel.", <><circle key="a" cx="12" cy="8" r="4" /><path key="b" d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>],
    ["Beheer over je Facebook-pagina", "Je moet volledige controle (beheerder) hebben over de pagina van je bedrijf.", <><rect key="a" x="4" y="3" width="16" height="18" rx="3" /><path key="b" d="M8 8h8M8 12h8M8 16h5" /></>],
    ["Inloggegevens van Instagram", "Gebruikersnaam en wachtwoord van het Instagram-account van je bedrijf. Die vul je alleen zelf in bij Meta.", <><rect key="a" x="3" y="3" width="18" height="18" rx="5" /><circle key="b" cx="12" cy="12" r="4" /><path key="c" d="M17.5 6.5h.01" /></>],
    ["Een betaalmethode", "Bijvoorbeeld een creditcard of PayPal. Meta schrijft de advertentiekosten daar rechtstreeks van af.", <><rect key="a" x="2" y="5" width="20" height="14" rx="3" /><path key="b" d="M2 10h20M6 15h4" /></>],
  ],
  idLabel: "Het bedrijfs-ID van Achieve",
  stepsHead: "In zes stappen",
  stepsIntro:
    "Alles gebeurt op [business.facebook.com](~bs) (Meta Business Suite). Bij elke stap staat een knop die het juiste scherm in Meta opent in een nieuw tabblad. Vink een stap af als hij klaar is; deze pagina onthoudt waar je bent.",
  multiNote:
    "Heb je meer dan één bedrijfsportfolio? Kies dan linksboven in Meta eerst het portfolio van je bedrijf. Kom je op een ander scherm uit, klik dan in het menu links op het onderdeel dat bij de stap staat.",
  steps: [
    {
      title: "Maak een bedrijfsportfolio aan",
      why: "Het bedrijfsportfolio (vroeger Business Manager) is de centrale plek waar je pagina, Instagram en advertenties samenkomen.",
      skip: "Heb je al een bedrijfsportfolio of Business Manager? Ga naar stap 2.",
      open: { link: "bs", label: "Open Meta Business Suite" },
      todo: [
        "Ga naar [business.facebook.com](bs) en log in met je persoonlijke Facebook-account.",
        "Klik op **Account maken** (of **Bedrijfsportfolio maken**).",
        "Vul de naam van je bedrijf, je eigen naam en je zakelijke e-mailadres in.",
        "Bevestig je e-mailadres via de mail die Meta je stuurt.",
      ],
      note: {
        text: "**Tip:** zet tweestapsverificatie aan en voeg een tweede beheerder uit je eigen bedrijf toe. Dan kom je er altijd in, ook als één account wordt geblokkeerd.",
      },
    },
    {
      title: "Voeg je Facebook-pagina toe",
      why: "Advertenties verschijnen altijd namens een pagina. Daarom moet die in je bedrijfsportfolio staan.",
      path: ["Instellingen", "Accounts", "Pagina's"],
      open: { link: "settings", label: "Open Instellingen in Meta" },
      todo: [
        "Open [Instellingen](settings) (of klik linksonder op het **tandwiel**).",
        "Ga naar **Accounts** en kies **Pagina's**.",
        "Klik op **Toevoegen** en kies **Een bestaande Facebook-pagina toevoegen**.",
        "Kies je pagina of typ de naam, en bevestig.",
      ],
      note: { text: "Nog geen pagina? Kies dan **Een nieuwe Facebook-pagina maken** en vul naam, categorie en logo in." },
    },
    {
      title: "Voeg je Instagram-account toe",
      why: "Zo kunnen je advertenties ook op Instagram draaien, met je eigen naam en profielfoto.",
      path: ["Instellingen", "Accounts", "Instagram-accounts"],
      open: { link: "settings", label: "Open Instellingen in Meta" },
      todo: [
        "Ga in [Instellingen](settings) naar **Accounts** en kies **Instagram-accounts**.",
        "Klik op **Toevoegen**, ga akkoord met de voorwaarden en klik op **Instagram-account toevoegen**.",
        "Log in met de gegevens van het Instagram-account van je bedrijf.",
      ],
      note: {
        warn: true,
        text: "Je Instagram moet een **professioneel account** zijn (zakelijk of creator). Is het nog privé? Zet het om in de Instagram-app via **Instellingen › Accounttype en tools › Overschakelen naar professioneel account**.",
      },
    },
    {
      title: "Maak een advertentieaccount aan",
      why: "Hier draaien je campagnes en hier betaal je de advertentiekosten. Het account staat op jouw naam.",
      skip: "Heb je al een advertentieaccount? Kies bij punt 3 dan **Een advertentieaccount toevoegen**.",
      path: ["Instellingen", "Accounts", "Advertentieaccounts"],
      open: { link: "adaccounts", label: "Open Advertentieaccounts in Meta" },
      todo: [
        "Ga in [Instellingen](settings) naar **Accounts** en kies [Advertentieaccounts](adaccounts).",
        "Klik op **Toevoegen**.",
        "Kies **Een nieuw advertentieaccount maken**.",
        "Geef het een duidelijke naam (bijvoorbeeld je bedrijfsnaam), kies tijdzone **Europe/Amsterdam** en valuta **Euro (EUR)**.",
        "Kies dat het account voor **je eigen bedrijf** is en klik op **Maken**.",
        "Ga naar **Facturering en betalingen** en klik op **Betaalmethode toevoegen**.",
      ],
      note: { warn: true, text: "Tijdzone en valuta kun je later **niet meer wijzigen**. Controleer ze goed voordat je op Maken klikt." },
    },
    {
      title: "Maak een dataset aan (de Meta-pixel)",
      why: "Met een dataset zie je wat bezoekers van je advertenties op je website doen, zoals een aankoop of aanvraag. Zo meten we wat werkt.",
      skip: "Heb je al een pixel of dataset? Ga naar stap 6.",
      path: ["Instellingen", "Gegevensbronnen", "Datasets"],
      open: { link: "settings", label: "Open Instellingen in Meta" },
      todo: [
        "Ga in [Instellingen](settings) naar **Gegevensbronnen** en kies **Datasets**.",
        "Klik op **Toevoegen**, geef de dataset de naam van je bedrijf en klik op **Maken**.",
      ],
      note: { text: "Meer hoef je niet te doen. Het koppelen aan je advertentieaccount en het plaatsen op je website regelen wij, zodra we toegang hebben." },
    },
    {
      title: "Geef Achieve toegang als partner",
      why: "De laatste stap. Je koppelt ons bedrijf aan jouw bedrijfsmiddelen, zonder dat je wachtwoorden deelt. Je kunt de toegang altijd weer intrekken.",
      path: ["Instellingen", "Gebruikers", "Partners"],
      open: { link: "partners", label: "Open Partners in Meta" },
      todo: [
        "Ga in [Instellingen](settings) naar **Gebruikers** en kies [Partners](partners).",
        "Klik rechtsboven op **Toevoegen** en kies **Een partner toegang geven tot je bedrijfsmiddelen**.",
        "Vul bij **Bedrijfs-ID van partner** ons ID in: {ID} en klik op **Volgende**.",
        "Kies links per soort bedrijfsmiddel en vink aan: je **Facebook-pagina**, je **Instagram-account**, je **advertentieaccount** en je **dataset**.",
        "Zet bij elk bedrijfsmiddel rechts **Volledige controle** aan.",
        "Klik rechtsonder op **Bedrijfsmiddelen toewijzen**.",
      ],
      note: {
        text: "Je geeft ons alleen toegang tot deze vier onderdelen, niet tot je hele bedrijfsportfolio. Meta past menu's soms aan; heet iets bij jou net anders, zoek dan in Instellingen op **Partners**.",
      },
    },
  ],
  faq: [
    ["Blijf ik eigenaar van mijn pagina en advertentieaccount?", "Ja. Alles staat in jouw bedrijfsportfolio en op jouw naam. Wij krijgen alleen toegang om voor je te werken. Wil je stoppen, dan haal je ons weg via [Instellingen › Gebruikers › Partners](~partners)."],
    ["Moet ik mijn wachtwoord met jullie delen?", "Nee, nooit. Juist daarom werkt het via een partnerkoppeling: wij loggen in met onze eigen accounts. Vraagt iemand namens ons om je wachtwoord, neem dan contact met ons op."],
    ["Ik zie “Partners” niet in mijn instellingen.", "Dan heb je waarschijnlijk geen volledige toegang tot het bedrijfsportfolio. Vraag de persoon die het beheert (bijvoorbeeld een collega of compagnon) om stap 6 te doen, of om jou volledige toegang te geven."],
    ["Mijn pagina staat al bij een ander portfolio, bijvoorbeeld van een vorig bureau.", "Een pagina kan maar in één bedrijfsportfolio staan. Vraag het vorige bureau om de pagina (en eventueel het advertentieaccount) uit hun portfolio te verwijderen, zodat jij hem kunt toevoegen. Lukt dat niet, laat het ons weten; dan kijken we samen naar de beste route."],
    ["Datasets staat grijs of ik kan geen advertentieaccount maken.", "Bij een nieuw bedrijfsportfolio zet Meta sommige functies pas na een tijdje vrij. Doe de stappen die wel lukken, geef ons toegang tot wat er al staat, en laat ons weten wat nog ontbreekt. Dan voegen we het later samen toe."],
    ["Wie betaalt de advertenties?", "De advertentiekosten betaal je rechtstreeks aan Meta, via de betaalmethode in jouw advertentieaccount. Zo zie je altijd precies wat er wordt uitgegeven."],
  ],
  mailSubject: "Toegang Meta gegeven",
};

export function HandleidingMetaContent() {
  return <GuidePage g={guide} />;
}
