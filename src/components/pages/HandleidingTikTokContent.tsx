"use client";

import { GuidePage, type Guide } from "./handleiding/GuidePage";

/** Business Center-ID van Achieve in TikTok (AchieveNL, Karim 18 nov 2026). */
const BUSINESS_ID = "7325794331707736066";
const BC = "https://business.tiktok.com/";

/**
 * Dutch source text; translations in src/i18n/dict/<taal>/HandleidingTikTok.json. Markup: see handleiding/rich.tsx.
 * TikTok shows its menus in English, so menu names (Accounts, Add partner …) stay English in every language.
 */
const guide: Guide = {
  store: "achieve-tiktok-stappen",
  id: BUSINESS_ID,
  links: { bc: BC },
  eyebrow: "Handleiding · TikTok-advertenties",
  brand: "TikTok.",
  intro:
    "Met deze stappen zet je alles klaar om op TikTok te adverteren, en geef je Achieve veilig toegang. Je deelt geen wachtwoorden en je blijft zelf eigenaar van alles.",
  need: [
    ["Een TikTok for Business-account", "Daarmee log je in op het Business Center. Heb je er nog geen, dan maak je die in stap 1 aan met je zakelijke e-mailadres.", <><circle key="a" cx="12" cy="8" r="4" /><path key="b" d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>],
    ["Het TikTok-account van je bedrijf", "Op je telefoon, ingelogd in de TikTok-app. Je scant er in stap 3 een QR-code mee.", <><rect key="a" x="7" y="2" width="10" height="20" rx="3" /><path key="b" d="M11 18h2" /></>],
    ["Je bedrijfsgegevens", "Bedrijfsnaam zoals op je facturen, en eventueel je KvK-nummer. TikTok kan erom vragen bij het advertentieaccount.", <><rect key="a" x="4" y="3" width="16" height="18" rx="3" /><path key="b" d="M8 8h8M8 12h8M8 16h5" /></>],
    ["Een betaalmethode", "Bijvoorbeeld een creditcard of PayPal. TikTok schrijft de advertentiekosten daar rechtstreeks van af.", <><rect key="a" x="2" y="5" width="20" height="14" rx="3" /><path key="b" d="M2 10h20M6 15h4" /></>],
  ],
  idLabel: "Het Business Center-ID van Achieve",
  stepsHead: "In vier stappen",
  stepsIntro:
    "Alles gebeurt op [business.tiktok.com](~bc) (TikTok Business Center). Bij elke stap staat een knop die het Business Center opent in een nieuw tabblad. Vink een stap af als hij klaar is; deze pagina onthoudt waar je bent.",
  multiNote:
    "Heb je meer dan één Business Center? Kies dan eerst het Business Center van je bedrijf. Doe de stappen op je computer; alleen de QR-code in stap 3 scan je met je telefoon.",
  steps: [
    {
      title: "Maak een TikTok Business Center aan",
      why: "Het Business Center is de centrale plek waar je TikTok-account, advertentieaccount en pixel samenkomen, en waar je bepaalt wie erbij mag.",
      skip: "Heb je al een Business Center? Ga naar stap 2.",
      open: { link: "bc", label: "Open TikTok Business Center" },
      todo: [
        "Ga naar [business.tiktok.com](bc) en log in met je TikTok for Business-account. Nog geen account? Klik op **Sign up** en maak er een aan met je zakelijke e-mailadres.",
        "Klik op **Create** (Business Center maken) en vul de naam van je bedrijf in, zoals die ook op je facturen staat.",
        "Kies tijdzone **Amsterdam** en bevestig. Je bent nu automatisch beheerder (Admin).",
      ],
      note: {
        text: "**Tip:** zet tweestapsverificatie aan en voeg een tweede beheerder uit je eigen bedrijf toe. Dan kom je er altijd in, ook als één account niet werkt.",
      },
    },
    {
      title: "Maak een advertentieaccount aan",
      why: "Hier draaien je campagnes en hier betaal je de advertentiekosten. Het account staat op jouw naam.",
      skip: "Adverteer je al op TikTok? Kies bij punt 3 dan **Transfer** om je bestaande account naar je Business Center te halen.",
      path: ["Accounts", "Advertiser accounts"],
      open: { link: "bc", label: "Open TikTok Business Center" },
      todo: [
        "Klik in het menu links op **Accounts** en kies **Advertiser accounts**.",
        "Klik op **Add advertiser account**.",
        "Kies **Create new** en klik op **Next**.",
        "Vul de naam van je bedrijf in, kies land **Nederland**, tijdzone **Amsterdam** en valuta **Euro (EUR)**, en bevestig.",
        "Open het advertentieaccount en voeg onder **Payment** een betaalmethode toe.",
      ],
      note: { warn: true, text: "Land, tijdzone en valuta kun je later **niet meer wijzigen**. Controleer ze goed voordat je bevestigt." },
    },
    {
      title: "Koppel je TikTok-account",
      why: "Zo verschijnen je advertenties met de naam en profielfoto van je eigen TikTok-account, en kunnen we bestaande video's als advertentie inzetten.",
      path: ["Accounts", "TikTok accounts"],
      open: { link: "bc", label: "Open TikTok Business Center" },
      todo: [
        "Klik in het menu links op **Accounts** en kies **TikTok accounts**.",
        "Klik op **Add a TikTok account** en kies **Link an existing TikTok account**.",
        "Kies **Send a QR code** en klik op **Next**.",
        "Scan de QR-code met de TikTok-app op je telefoon, ingelogd op het account van je bedrijf, en keur het verzoek goed.",
      ],
      note: { text: "Nog geen TikTok-account voor je bedrijf? Maak er eerst een aan in de TikTok-app en kom dan terug naar deze stap." },
    },
    {
      title: "Geef Achieve toegang als partner",
      why: "De laatste stap. Je koppelt ons Business Center aan jouw account, zonder dat je wachtwoorden deelt. Je kunt de toegang altijd weer intrekken.",
      path: ["Partners", "Add partner"],
      open: { link: "bc", label: "Open TikTok Business Center" },
      todo: [
        "Klik in het menu links op **Partners** (soms onder **Users**) en klik op **Add partner**.",
        "Vul ons Business Center-ID in: {ID} en klik op **Next**.",
        "TikTok vraagt of dit bureau je advertenties beheert. Kies **Yes**.",
        "Kies je **advertentieaccount** en geef het de rol **Admin**. Kies ook je **TikTok-account**.",
        "Klik op **Confirm**.",
      ],
      note: {
        text: "Je geeft ons alleen toegang tot deze onderdelen, niet tot je hele Business Center. TikTok toont de menu's vaak in het Engels; heet iets bij jou net anders, kijk dan in het menu links.",
      },
    },
  ],
  faq: [
    ["Blijf ik eigenaar van mijn TikTok-account en advertentieaccount?", "Ja. Alles staat in jouw Business Center en op jouw naam. Wij krijgen alleen toegang om voor je te werken. Wil je stoppen, dan haal je ons weg via Partners in je Business Center."],
    ["Moet ik mijn wachtwoord met jullie delen?", "Nee, nooit. Juist daarom werkt het via een partnerkoppeling: wij loggen in met onze eigen accounts. Vraagt iemand namens ons om je wachtwoord, neem dan contact met ons op."],
    ["En de TikTok-pixel?", "Die hoef je niet zelf aan te maken. Wij maken hem aan in jouw advertentieaccount, zodat hij van jou blijft, en zetten hem samen met je op je website."],
    ["Ik zie “Partners” niet.", "Dan ben je waarschijnlijk geen beheerder (Admin) van het Business Center. Vraag de persoon die het beheert om stap 4 te doen, of om jou beheerder te maken."],
    ["Mijn advertentieaccount staat al bij een ander Business Center, bijvoorbeeld van een vorig bureau.", "Een advertentieaccount kan maar in één Business Center staan. Vraag het vorige bureau om het account vrij te geven, zodat jij het met Transfer naar je eigen Business Center haalt. Lukt dat niet, laat het ons weten; dan kijken we samen naar de beste route."],
    ["Wie betaalt de advertenties?", "De advertentiekosten betaal je rechtstreeks aan TikTok, via de betaalmethode in jouw advertentieaccount. Zo zie je altijd precies wat er wordt uitgegeven."],
  ],
  mailSubject: "Toegang TikTok gegeven",
};

export function HandleidingTikTokContent() {
  return <GuidePage g={guide} />;
}
