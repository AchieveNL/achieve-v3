/**
 * Privacyverklaring (Karim, 8 nov 2026). Dutch is the source text; translations live in
 * src/i18n/dict/<locale>/Privacy.json. Keep the canvas page (Privacy.dc.html) in sync.
 */
export type PrivacyItem = { b?: string; text: string };
export type PrivacyBlock = { p: string } | { list: PrivacyItem[] };
export type PrivacySection = { id: string; title: string; blocks: PrivacyBlock[] };

export const privacyUpdated = "Laatst gewijzigd op 8 november 2026";
export const privacyLeading = "Bij verschillen tussen de vertalingen is de Nederlandse tekst leidend.";

export const privacySections: PrivacySection[] = [
  {
    id: "wie-wij-zijn",
    title: "Wie wij zijn",
    blocks: [
      {
        p: "Achieve, Cypresbaan 3, 2908 LT Capelle aan den IJssel, KvK 76815889. Wij zijn verantwoordelijk voor de verwerking van je persoonsgegevens via achieve.nl. Vragen? Mail info@achieve.nl of bel 085 401 6590.",
      },
    ],
  },
  {
    id: "welke-gegevens",
    title: "Welke gegevens we gebruiken en waarom",
    blocks: [
      {
        list: [
          {
            b: "Contact- en aanvraagformulier:",
            text: "je naam, e-mailadres, telefoonnummer, bedrijfsnaam, de dienst die je kiest en je bericht. Daarmee beantwoorden we je vraag en nemen we contact met je op. Grondslag: jouw toestemming, die je geeft met het vinkje in het formulier.",
          },
          {
            b: "Groeigesprek plannen:",
            text: "via Calendly geef je je naam, e-mailadres en een moment op. Daarmee plannen en voeren we het gesprek. Grondslag: jouw verzoek.",
          },
          {
            b: "Solliciteren:",
            text: "je naam, contactgegevens, cv en motivatiebrief. Daarmee beoordelen we je sollicitatie. Grondslag: jouw verzoek en ons gerechtvaardigd belang.",
          },
          {
            b: "Klanten:",
            text: "contact-, bedrijfs- en factuurgegevens. Daarmee voeren we de opdracht uit en factureren we. Grondslag: de overeenkomst en de wet (fiscale bewaarplicht).",
          },
          {
            b: "Nieuwsbrief:",
            text: "je naam en e-mailadres, als je klant bij ons bent. Je kunt je in elke mail afmelden. Grondslag: ons gerechtvaardigd belang om klanten op de hoogte te houden.",
          },
          {
            b: "Advertentieaccounts:",
            text: "werken we aan je campagnes, dan geef je ons toegang via je eigen account, zonder je inloggegevens te delen. Je kunt die toegang altijd intrekken.",
          },
        ],
      },
      { p: "We nemen geen besluiten die alleen door een computer worden genomen." },
    ],
  },
  {
    id: "bewaren",
    title: "Hoe lang we gegevens bewaren",
    blocks: [
      {
        list: [
          { b: "Aanvragen zonder opdracht:", text: "6 maanden." },
          { b: "Sollicitaties:", text: "4 weken na de procedure, of 1 jaar als je daar toestemming voor geeft." },
          { b: "Klant- en factuurgegevens:", text: "7 jaar, omdat de wet dat verplicht." },
          { b: "Nieuwsbrief:", text: "tot je je afmeldt." },
        ],
      },
    ],
  },
  {
    id: "derden",
    title: "Wie je gegevens nog meer verwerkt",
    blocks: [
      { p: "We verkopen je gegevens nooit. We werken wel met een paar vaste dienstverleners die ze namens ons verwerken:" },
      {
        list: [
          { b: "FormSubmit:", text: "stuurt formulieren door naar ons" },
          { b: "Calendly:", text: "afspraken" },
          { b: "Vercel:", text: "hosting van de website" },
          { b: "Hosting.com:", text: "e-mail en bestanden, op servers in Amsterdam" },
          { b: "Klaviyo:", text: "nieuwsbrief" },
        ],
      },
      {
        p: "FormSubmit, Calendly, Vercel en Klaviyo zijn Amerikaanse bedrijven. Gaan gegevens buiten de EU, dan gebeurt dat alleen met passende waarborgen, zoals de standaardcontractbepalingen van de Europese Commissie of het EU-VS Data Privacy Framework. Verder delen we gegevens alleen als de wet ons daartoe verplicht.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies",
    blocks: [
      {
        p: "Achieve.nl plaatst geen cookies om je te volgen of te analyseren. Open je de agenda voor een groeigesprek, dan kan Calendly eigen cookies plaatsen die nodig zijn om de agenda te laten werken.",
      },
    ],
  },
  {
    id: "rechten",
    title: "Jouw rechten",
    blocks: [
      {
        p: "Je mag je gegevens inzien, laten aanpassen of laten verwijderen. Je mag je toestemming intrekken, bezwaar maken, of je gegevens laten overdragen. Stuur je verzoek naar info@achieve.nl; we reageren binnen vier weken.",
      },
      {
        p: "Ben je niet tevreden over hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
      },
    ],
  },
  {
    id: "beveiliging",
    title: "Beveiliging",
    blocks: [
      {
        p: "De site gebruikt een beveiligde verbinding (https). Alleen de mensen die je gegevens nodig hebben voor hun werk kunnen erbij. Denk je dat er iets mis is met de beveiliging? Mail dan info@achieve.nl.",
      },
    ],
  },
  {
    id: "jonger-dan-16",
    title: "Jonger dan 16?",
    blocks: [
      {
        p: "Dan vragen we toestemming van een ouder of voogd. Denk je dat we zonder die toestemming gegevens van een kind hebben? Laat het ons weten, dan verwijderen we ze.",
      },
    ],
  },
  {
    id: "wijzigingen",
    title: "Wijzigingen",
    blocks: [
      {
        p: "We passen deze verklaring aan als de site of onze werkwijze verandert. De datum bovenaan laat zien wanneer dat voor het laatst gebeurde.",
      },
    ],
  },
];
