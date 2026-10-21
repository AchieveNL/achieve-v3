/** Reviews from Google and Trustpilot. Quotes are shown as written by the client (never edited, shortening allowed). */
export type ReviewSource = "google" | "trustpilot";
export type Review = { name: string; role: string; quote: string; tags: string; src: ReviewSource };

export const reviews: Review[] = [
  {
    name: "Boris Boot",
    role: "Webshopeigenaar",
    quote:
      "“Nog nooit zo snel een goede band met een agency opgebouwd. Eerste pilotmaand met alleen Google Shopping en meteen 6,4 ROAS. Bewijs praat dus voor zichzelf.”",
    tags: "SEA · SMA",
    src: "google",
  },
  {
    name: "Özlem Saraç",
    role: "Advocaat",
    quote:
      "“Karim is duidelijk, professioneel en kundig in zijn vakgebied. Hij legt vaktermen op een begrijpelijke wijze uit. Communicatielijnen zijn kort en hij is altijd bereid om mee te denken.”",
    tags: "Custom Website · SEA",
    src: "google",
  },
  {
    name: "Sarbjit Singh Mann",
    role: "Sportschooleigenaar",
    quote: "“Achieve heeft voor ons een top website gecreëerd die op dag 1 al heeft gezorgd voor nieuwe klanten.”",
    tags: "WordPress Website",
    src: "google",
  },
  {
    name: "Jim Davids",
    role: "Sportschooleigenaar",
    quote: "“Ben blij dat we gekozen hebben voor kwaliteit. Een absolute aanrader.”",
    tags: "Video Marketing",
    src: "trustpilot",
  },
  {
    name: "Kevin Hermans",
    role: "Eigenaar uitzendbureau",
    quote:
      "“Achieve heeft voor mij een professionele marketingvideo gemaakt. Ik ben super tevreden en kan iedereen aanraden om samen te werken met deze betrouwbare partij. Klasse!”",
    tags: "Video Marketing",
    src: "google",
  },
  {
    name: "Rutger Jenner",
    role: "Duurzaamheidsadviseur",
    quote:
      "“Mijn uitdaging was dat ik zelf nog niet realiseerde waar ik naar op zoek was. Ik had een website nodig, zo ver was ik, maar er komt natuurlijk veel meer bij kijken. Karim wist de juiste vragen te stellen op het juiste moment waardoor we scherp kregen waar mijn behoefte precies lag. Wat eerst chaos was, werd structuur. We zijn begonnen met een website en een huisstijl handboek, die staat nu en daarmee voel ik nu ook mijn identiteit als bedrijf. Karim is in staat het hele plaatje te overzien en alle stappen in de juiste volgorde te nemen. Helemaal geweldig, heel dankbaar, thanks!”",
    tags: "Brand Book · Custom Website",
    src: "trustpilot",
  },
  {
    name: "Deniz Karadirek-Kibaroglu",
    role: "Eigenaar stichting",
    quote:
      "“Achieve wist mijn wensen te vertalen naar een leuke functionele website. Karim had na ons eerste gesprek al een leuke conceptversie, met een paar kleine aanpassingen was mijn website online.”",
    tags: "Custom Website",
    src: "google",
  },
  {
    name: "Sofia Hu",
    role: "Eigenaar kinderspeelparadijs",
    quote:
      "“Ik heb meerdere opdrachten geplaatst bij Achieve, waaronder het ontwerp van onze website en raamstickering, en ik ben ontzettend tevreden met het resultaat. Het is echt prachtig geworden. Wat ik vooral waardeer, is hoe hun team mij van A tot Z heeft begeleid. Van het eerste idee tot de uiteindelijke oplevering werd er goed meegedacht! Aanrader!”",
    tags: "Window Graphics · Custom Website",
    src: "google",
  },
  {
    name: "Mark van Zijp",
    role: "Corporate recruiter",
    quote: "“Super tof vacaturefilmpje gemaakt samen met Achieve.”",
    tags: "Video Marketing",
    src: "google",
  },
  {
    name: "Adem Karadirek",
    role: "Eigenaar automaterialenwinkel",
    quote:
      "“Achieve heeft een prachtige website opgeleverd die aansloot bij onze wensen op het gebied van (digitale) strategie en branding. De persoonlijke communicatie zorgde ervoor dat het project soepel verliep.”",
    tags: "WordPress Website · Photoshoot",
    src: "google",
  },
  {
    name: "Davio Dakhouka",
    role: "Oprichter crypto-community",
    quote:
      "“Uiterste tevreden over de samenwerking met Achieve Agency voor de ontwikkelingen van mijn webapplicatie. Vanaf het eerste contactmoment tot de oplevering was de communicatie helder en professioneel. Het team denkt actief mee , komt met waardevolle suggesties en weet wensen te verlaten naar een visueel aantrekkelijk eindproduct.”",
    tags: "Web App",
    src: "google",
  },
  {
    name: "Murat Bolat",
    role: "Investeerder",
    quote:
      "“Achieve is betrouwbaar, eerlijk, geeft duidelijke uitleg en is altijd ala minuut bereikbaar en dit allemaal ook nog betaalbaar. Ik raad iedereen Achieve aan.”",
    tags: "Custom Website · Email Marketing",
    src: "google",
  },
  {
    name: "Souhaib Aouini",
    role: "Directeur bij Qartago",
    quote:
      "“Het niveau van betrokkenheid, snelheid en interactie was erg hoog en hun vasthoudendheid in het nastreven van een succesvol resultaat is ongeëvenaard. Het voelde zeker als een verlengstuk van onze IT-ontwikkelings- en onze marketingteams.”",
    tags: "Custom Website · Email Marketing · SEA · SMA",
    src: "google",
  },
  {
    name: "Moustafa Nasr",
    role: "Webshopeigenaar",
    quote:
      "“Ik heb al een aantal jaren ervaring in e-commerce. Ik heb ook met meerdere marketing bedrijven gewerkt om mijn campagnes uit te besteden, maar ik heb nog nooit zoveel goede resultaten geboekt als met Achieve. Het is ook een heel mooi sneeuwbal effect want het word maandelijks beter.”",
    tags: "SEA · SMA",
    src: "trustpilot",
  },
  {
    name: "J.S Konings",
    role: "Webshopeigenaar",
    quote: "“Goede communicatie en kwaliteit! Nemen ook de tijd voor je. Aanrader 100%”",
    tags: "SEA · SMA",
    src: "google",
  },
  {
    name: "Nick Polder",
    role: "Eigenaar relatiegeschenkenbedrijf",
    quote:
      "“Fijne partij om mee samen te werken! Reageren snel, hebben veel expertise in huis en leveren goed werk. Erg leuke samenwerking met Karim”",
    tags: "Brand Book · Custom Website · Photoshoot",
    src: "google",
  },
  {
    name: "Ricardo Puriel",
    role: "Marketeer",
    quote:
      "“Zeer goede ervaring! Achieve heeft onze website custom ge-designed en ook een compleet brandbook opgeleverd. Nu dat dit staat is onze communicatie naar onze klanten erg duidelijk en consistent. Achieve reageert extreem snel en denken goed mee. Zeker voor herhaling vatbaar!”",
    tags: "Brand Book · Custom Website",
    src: "google",
  },
  {
    name: "Ron van Dam",
    role: "Kunstenaar",
    quote:
      "“Karim en zijn team zijn top! Achieve heeft gezorgd voor een overzichtelijke en goed functionerende website voor al mijn mixed media portretten. Daarnaast is het contact altijd super makkelijk en fijn. Karim reageert altijd snel op mijn vragen en gaat direct aan de slag met mijn wensen voor de website. Zie het resultaat!”",
    tags: "Custom Website",
    src: "google",
  },
  {
    name: "W Feng",
    role: "Mede-eigenaar sushirestaurant",
    quote:
      "“Ik was erg blij om een zeer verantwoordelijk en geduldig bedrijf te vinden, het was een prettige ervaring, de communicatie met de ontwerper was heel duidelijk, het ontwerp van de website is eenvoudig en vrijgevig, precies wat ik wilde. De ontwerper gaf ook veel nuttig en prachtig advies, ik raad het iedereen oprecht aan! Ik zal het zeker aanbevelen aan mijn vrienden”",
    tags: "Custom Website · UGC Marketing · SEA · SMA",
    src: "google",
  },
  {
    name: "Shaquille Jarmohamed",
    role: "Marketeer",
    quote:
      "“Achieve werkt ontzettend snel, vullen goed aan bij mijn behoeftes en denken ook mee met het behalen van mijn doelstellingen. Hele fijne samenwerking!”",
    tags: "Graphic Design · SMA",
    src: "google",
  },
  {
    name: "Melike Cagan",
    role: "Docente",
    quote: "“Ze doen geweldig werk. Dankzij hen heb ik nu een zeer stijlvolle, moderne en creatieve website. 😇”",
    tags: "Custom Website",
    src: "google",
  },
  {
    name: "Sara Kamah",
    role: "Eigenaar huidkliniek",
    quote: "“Super tevreden met de service en kwaliteit van de geleverde diensten. We krijgen altijd snel antwoord! Top bedrijf”",
    tags: "SEA",
    src: "google",
  },
  {
    name: "Mohammed Abdel Nasser",
    role: "Reisleider",
    quote:
      "“Het team is professioneel, denkt mee, en is erg betrokken bij ons project. Ze hebben ons uitstekend geholpen met onze online strategie en we zijn zeer tevreden met de resultaten. Zeker een aanrader!”",
    tags: "Strategy",
    src: "google",
  },
  {
    name: "Ali Alshamary",
    role: "Eigenaar taxibedrijf",
    quote:
      "“Ik ben zeer tevreden met de service, de manager helpt me sinds het begin van mijn project. Waarom ik Achieve zou aanraden: Super professioneel, altijd extra advies die je business kan beïnvloeden, goed bereikbaar en natuurlijk sale’s want daar gaat het om. Met achieve heb ik heel veel sale’s kunnen maken waardoor mijn business steeds groter en groter wordt.”",
    tags: "Custom Website · SEA",
    src: "google",
  },
  {
    name: "Ovik Pogosjan",
    role: "Eigenaar bouwbedrijf",
    quote:
      "“Werk al sinds 2020 met Kareem. Ik kan je zeggen dat hij echt veel verstand heeft. Kareem denkt mee met alles en wilt altijd het gevoel geven dat alles top is en waar bij vele dat niet lukt, lukt het bij hem wel gelukkig. Echt een aanrader!”",
    tags: "Custom Website · SEA",
    src: "google",
  },
  {
    name: "Mandy den Breejen",
    role: "Marketeer",
    quote:
      "“Super fijn om met Karim en zijn team samen te werken tijdens onze relatiedag! Er is keihard gewerkt en het eindresultaat mag er wezen!”",
    tags: "Video Marketing",
    src: "google",
  },
  {
    name: "Nasser",
    role: "Webshopeigenaar",
    quote:
      "“Het bedrijf heeft mijn website, dat zeer amateuristisch was, omgetoverd in een professionele en mooie website. En tijdens het process hebben ze mij op de hoogte gehouden van elke stap en gevraagd over mijn voorkeuren voor bepaalde aspecten van mijn website”",
    tags: "Shopify Webshop",
    src: "trustpilot",
  },
  {
    name: "Mark van Zijp",
    role: "Corporate recruiter",
    quote:
      "“We hebben het genoegen gehad om samen te werken met Achieve voor het creëren van twee vacaturefilmpjes. Vanaf het begin merkten we hun professionele houding op, gekoppeld aan een vlotte communicatie die het hele proces soepel liet verlopen. Wat ons echter het meest heeft verrast, is het prachtige eindresultaat. De filmpjes waren niet alleen informatief, maar ook visueel aantrekkelijk!”",
    tags: "Video Marketing",
    src: "trustpilot",
  },
  {
    name: "Paul Johannes",
    role: "",
    quote:
      "“Bij het opzetten van meerdere Shopify stores heeft Achieve belangrijk werk voor ons verricht. Het opzetten van alle marketing campagnes en het ontwikkelen van de nieuwe brand identiteit voor twee winkels is zeer geslaagd. Wij raden iedereen aan Achieve voor digital marketing in te huren.”",
    tags: "Brand Book · Shopify Webshop · SEA · SMA",
    src: "trustpilot",
  },
  {
    name: "Thomas",
    role: "Eigenaar tv-reparatiebedrijf",
    quote:
      "“Ik kan met vertrouwen zeggen dat Achieve een uitstekende keuze is voor het creëren en optimaliseren van online campagnes om bedrijven en merken te laten groeien. Ze hebben mijn bedrijf erg goed geholpen en laten groeien!”",
    tags: "",
    src: "trustpilot",
  },
  {
    name: "Steffen de Back",
    role: "Videograaf & editor",
    quote:
      "“Achieve heeft iets heel moois bereikt ;). Ik heb een prettige samenwerking gehad. Dit bedrijf heeft mij als ZZP’er goed geholpen met mijn online branding. Ze denken goed mee en komen met creatieve oplossingen. Zeker een aanrader!”",
    tags: "Strategy",
    src: "trustpilot",
  },
  {
    name: "NPG Games",
    role: "Professioneel gamer",
    quote:
      "“Top Marketing. Erg fijn bedrijf om mee samen te werken. Heeft mij geholpen om meer mensen te bereiken door middel van sociale media. Verder helpt Achieve echt met het bereiken van je doelen door mee te denken.”",
    tags: "SMA",
    src: "trustpilot",
  },
];

/** Cards in the scrolling review rows. `open` points at the full review in `reviews` (-1 = quote is already complete). */
export type ReviewCard = {
  name: string;
  role: string;
  quote: string;
  open: number;
  src: ReviewSource;
  tags: { t: string; c: string; b: string }[];
};
export const reviewCards: ReviewCard[] = [
  {
    name: "Boris Boot",
    role: "Webshopeigenaar",
    quote:
      "“Nog nooit zo snel een goede band met een agency opgebouwd. Eerste pilotmaand met alleen Google Shopping en meteen 6,4 ROAS. Bewijs praat dus voor zichzelf.”",
    open: 0,
    src: "google",
    tags: [
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Özlem Saraç",
    role: "Advocaat",
    quote:
      "“Karim is duidelijk, professioneel en kundig in zijn vakgebied. Hij legt vaktermen op een begrijpelijke wijze uit. Communicatielijnen zijn kort en hij is altijd bereid om mee te denken.”",
    open: 1,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Sarbjit Singh Mann",
    role: "Sportschooleigenaar",
    quote: "“Achieve heeft voor ons een top website gecreëerd die op dag 1 al heeft gezorgd voor nieuwe klanten.”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Jim Davids",
    role: "Sportschooleigenaar",
    quote: "“Ben blij dat we gekozen hebben voor kwaliteit. Een absolute aanrader.”",
    open: -1,
    src: "trustpilot",
    tags: [
      {
        t: "Video Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Kevin Hermans",
    role: "Eigenaar uitzendbureau",
    quote:
      "“Achieve heeft voor mij een professionele marketingvideo gemaakt. Ik ben super tevreden en kan iedereen aanraden om samen te werken met deze betrouwbare partij. Klasse!”",
    open: 4,
    src: "google",
    tags: [
      {
        t: "Video Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Rutger Jenner",
    role: "Duurzaamheidsadviseur",
    quote:
      "“Mijn uitdaging was dat ik zelf nog niet realiseerde waar ik naar op zoek was. Ik had een website nodig, zo ver was ik, maar er komt natuurlijk veel meer bij kijken. Karim wist de juiste vragen te stellen op het juiste moment waardoor we scherp kregen waar mijn behoefte precies lag. Wat eerst chaos was, werd structuur. We zijn begonnen met een website en een huisstijl handboek, die staat nu en daarmee voel ik nu ook mijn identiteit als bedrijf. Karim is in staat het hele plaatje te overzien en alle stappen in de juiste volgorde te nemen. Helemaal geweldig, heel dankbaar, thanks!”",
    open: 5,
    src: "trustpilot",
    tags: [
      {
        t: "Brand Book",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Deniz Karadirek-Kibaroglu",
    role: "Eigenaar stichting",
    quote:
      "“Achieve wist mijn wensen te vertalen naar een leuke functionele website. Karim had na ons eerste gesprek al een leuke conceptversie, met een paar kleine aanpassingen was mijn website online.”",
    open: 6,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Sofia Hu",
    role: "Eigenaar kinderspeelparadijs",
    quote:
      "“Ik heb meerdere opdrachten geplaatst bij Achieve, waaronder het ontwerp van onze website en raamstickering, en ik ben ontzettend tevreden met het resultaat. Het is echt prachtig geworden. Wat ik vooral waardeer, is hoe hun team mij van A tot Z heeft begeleid. Van het eerste idee tot de uiteindelijke oplevering werd er goed meegedacht! Aanrader!”",
    open: 7,
    src: "google",
    tags: [
      {
        t: "Window Graphics",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Mark van Zijp",
    role: "Corporate recruiter",
    quote: "“Super tof vacaturefilmpje gemaakt samen met Achieve.”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Video Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Adem Karadirek",
    role: "Eigenaar automaterialenwinkel",
    quote:
      "“Achieve heeft een prachtige website opgeleverd die aansloot bij onze wensen op het gebied van (digitale) strategie en branding. De persoonlijke communicatie zorgde ervoor dat het project soepel verliep.”",
    open: 9,
    src: "google",
    tags: [
      {
        t: "Photoshoot",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "WordPress Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Davio Dakhouka",
    role: "Oprichter crypto-community",
    quote:
      "“Uiterste tevreden over de samenwerking met Achieve Agency voor de ontwikkelingen van mijn webapplicatie. Vanaf het eerste contactmoment tot de oplevering was de communicatie helder en professioneel. Het team denkt actief mee , komt met waardevolle suggesties en weet wensen te verlaten naar een visueel aantrekkelijk eindproduct.”",
    open: 10,
    src: "google",
    tags: [
      {
        t: "Web App",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Murat Bolat",
    role: "Investeerder",
    quote:
      "“Achieve is betrouwbaar, eerlijk, geeft duidelijke uitleg en is altijd ala minuut bereikbaar en dit allemaal ook nog betaalbaar. Ik raad iedereen Achieve aan.”",
    open: 11,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "Email Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Souhaib Aouini",
    role: "Directeur bij Qartago",
    quote:
      "“Het niveau van betrokkenheid, snelheid en interactie was erg hoog en hun vasthoudendheid in het nastreven van een succesvol resultaat is ongeëvenaard. Het voelde zeker als een verlengstuk van onze IT-ontwikkelings- en onze marketingteams.”",
    open: 12,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Moustafa Nasr",
    role: "Webshopeigenaar",
    quote:
      "“Ik heb al een aantal jaren ervaring in e-commerce. Ik heb ook met meerdere marketing bedrijven gewerkt om mijn campagnes uit te besteden, maar ik heb nog nooit zoveel goede resultaten geboekt als met Achieve. Het is ook een heel mooi sneeuwbal effect want het word maandelijks beter.”",
    open: 13,
    src: "trustpilot",
    tags: [
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "J.S Konings",
    role: "Webshopeigenaar",
    quote: "“Goede communicatie en kwaliteit! Nemen ook de tijd voor je. Aanrader 100%”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Nick Polder",
    role: "Eigenaar relatiegeschenkenbedrijf",
    quote:
      "“Fijne partij om mee samen te werken! Reageren snel, hebben veel expertise in huis en leveren goed werk. Erg leuke samenwerking met Karim”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Brand Book",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "Photoshoot",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Ricardo Puriel",
    role: "Marketeer",
    quote:
      "“Zeer goede ervaring! Achieve heeft onze website custom ge-designed en ook een compleet brandbook opgeleverd. Nu dat dit staat is onze communicatie naar onze klanten erg duidelijk en consistent. Achieve reageert extreem snel en denken goed mee. Zeker voor herhaling vatbaar!”",
    open: 16,
    src: "google",
    tags: [
      {
        t: "Brand Book",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Ron van Dam",
    role: "Kunstenaar",
    quote:
      "“Karim en zijn team zijn top! Achieve heeft gezorgd voor een overzichtelijke en goed functionerende website voor al mijn mixed media portretten. Daarnaast is het contact altijd super makkelijk en fijn. Karim reageert altijd snel op mijn vragen en gaat direct aan de slag met mijn wensen voor de website. Zie het resultaat!”",
    open: 17,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "W Feng",
    role: "Mede-eigenaar sushirestaurant",
    quote:
      "“Ik was erg blij om een zeer verantwoordelijk en geduldig bedrijf te vinden, het was een prettige ervaring, de communicatie met de ontwerper was heel duidelijk, het ontwerp van de website is eenvoudig en vrijgevig, precies wat ik wilde. De ontwerper gaf ook veel nuttig en prachtig advies, ik raad het iedereen oprecht aan! Ik zal het zeker aanbevelen aan mijn vrienden”",
    open: 18,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "UGC Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Shaquille Jarmohamed",
    role: "Marketeer",
    quote:
      "“Achieve werkt ontzettend snel, vullen goed aan bij mijn behoeftes en denken ook mee met het behalen van mijn doelstellingen. Hele fijne samenwerking!”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Graphic Design",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Melike Cagan",
    role: "Docente",
    quote: "“Ze doen geweldig werk. Dankzij hen heb ik nu een zeer stijlvolle, moderne en creatieve website. 😇”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Sara Kamah",
    role: "Eigenaar huidkliniek",
    quote: "“Super tevreden met de service en kwaliteit van de geleverde diensten. We krijgen altijd snel antwoord! Top bedrijf”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Mohammed Abdel Nasser",
    role: "Reisleider",
    quote:
      "“Het team is professioneel, denkt mee, en is erg betrokken bij ons project. Ze hebben ons uitstekend geholpen met onze online strategie en we zijn zeer tevreden met de resultaten. Zeker een aanrader!”",
    open: 22,
    src: "google",
    tags: [
      {
        t: "Strategy",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
    ],
  },
  {
    name: "Ali Alshamary",
    role: "Eigenaar taxibedrijf",
    quote:
      "“Ik ben zeer tevreden met de service, de manager helpt me sinds het begin van mijn project. Waarom ik Achieve zou aanraden: Super professioneel, altijd extra advies die je business kan beïnvloeden, goed bereikbaar en natuurlijk sale’s want daar gaat het om. Met achieve heb ik heel veel sale’s kunnen maken waardoor mijn business steeds groter en groter wordt.”",
    open: 23,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Ovik Pogosjan",
    role: "Eigenaar bouwbedrijf",
    quote:
      "“Werk al sinds 2020 met Kareem. Ik kan je zeggen dat hij echt veel verstand heeft. Kareem denkt mee met alles en wilt altijd het gevoel geven dat alles top is en waar bij vele dat niet lukt, lukt het bij hem wel gelukkig. Echt een aanrader!”",
    open: 24,
    src: "google",
    tags: [
      {
        t: "Custom Website",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Mandy den Breejen",
    role: "Marketeer",
    quote:
      "“Super fijn om met Karim en zijn team samen te werken tijdens onze relatiedag! Er is keihard gewerkt en het eindresultaat mag er wezen!”",
    open: -1,
    src: "google",
    tags: [
      {
        t: "Video Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Nasser",
    role: "Webshopeigenaar",
    quote:
      "“Het bedrijf heeft mijn website, dat zeer amateuristisch was, omgetoverd in een professionele en mooie website. En tijdens het process hebben ze mij op de hoogte gehouden van elke stap en gevraagd over mijn voorkeuren voor bepaalde aspecten van mijn website”",
    open: 26,
    src: "trustpilot",
    tags: [
      {
        t: "Shopify Webshop",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
    ],
  },
  {
    name: "Mark van Zijp",
    role: "Corporate recruiter",
    quote:
      "“We hebben het genoegen gehad om samen te werken met Achieve voor het creëren van twee vacaturefilmpjes. Vanaf het begin merkten we hun professionele houding op, gekoppeld aan een vlotte communicatie die het hele proces soepel liet verlopen. Wat ons echter het meest heeft verrast, is het prachtige eindresultaat. De filmpjes waren niet alleen informatief, maar ook visueel aantrekkelijk!”",
    open: 27,
    src: "trustpilot",
    tags: [
      {
        t: "Video Marketing",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Paul Johannes",
    role: "",
    quote:
      "“Bij het opzetten van meerdere Shopify stores heeft Achieve belangrijk werk voor ons verricht. Het opzetten van alle marketing campagnes en het ontwikkelen van de nieuwe brand identiteit voor twee winkels is zeer geslaagd. Wij raden iedereen aan Achieve voor digital marketing in te huren.”",
    open: 28,
    src: "trustpilot",
    tags: [
      {
        t: "Brand Book",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
      {
        t: "Shopify Webshop",
        c: "#0B6DB8",
        b: "#E3F1FD",
      },
      {
        t: "SEA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
  {
    name: "Thomas",
    role: "Eigenaar tv-reparatiebedrijf",
    quote:
      "“Ik kan met vertrouwen zeggen dat Achieve een uitstekende keuze is voor het creëren en optimaliseren van online campagnes om bedrijven en merken te laten groeien. Ze hebben mijn bedrijf erg goed geholpen en laten groeien!”",
    open: 29,
    src: "trustpilot",
    tags: [],
  },
  {
    name: "Steffen de Back",
    role: "Videograaf & editor",
    quote:
      "“Achieve heeft iets heel moois bereikt ;). Ik heb een prettige samenwerking gehad. Dit bedrijf heeft mij als ZZP’er goed geholpen met mijn online branding. Ze denken goed mee en komen met creatieve oplossingen. Zeker een aanrader!”",
    open: 30,
    src: "trustpilot",
    tags: [
      {
        t: "Strategy",
        c: "#6B2BD9",
        b: "#EFE8FD",
      },
    ],
  },
  {
    name: "NPG Games",
    role: "Professioneel gamer",
    quote:
      "“Top Marketing. Erg fijn bedrijf om mee samen te werken. Heeft mij geholpen om meer mensen te bereiken door middel van sociale media. Verder helpt Achieve echt met het bereiken van je doelen door mee te denken.”",
    open: 31,
    src: "trustpilot",
    tags: [
      {
        t: "SMA",
        c: "#6E5A00",
        b: "#FFF6C7",
      },
    ],
  },
];

export const reviewLinks = {
  google: "https://maps.app.goo.gl/gG6kKMrUMjbeg3ZPA",
  trustpilot: "https://nl.trustpilot.com/review/achieve.nl",
} as const;

/** Label colours (T1 purple = brand, T2 blue = web, T3 yellow = marketing). [text, background] */
export const tagColors: Record<string, [string, string]> = {
  SEA: ["#6E5A00", "#FFF6C7"],
  SMA: ["#6E5A00", "#FFF6C7"],
  "Custom Website": ["#0B6DB8", "#E3F1FD"],
  "Video Marketing": ["#6E5A00", "#FFF6C7"],
  "Brand Book": ["#6B2BD9", "#EFE8FD"],
  "Window Graphics": ["#6B2BD9", "#EFE8FD"],
  Photoshoot: ["#6E5A00", "#FFF6C7"],
  "Web App": ["#0B6DB8", "#E3F1FD"],
  "Email Marketing": ["#6E5A00", "#FFF6C7"],
  "UGC Marketing": ["#6E5A00", "#FFF6C7"],
  "Graphic Design": ["#6B2BD9", "#EFE8FD"],
  Strategy: ["#6B2BD9", "#EFE8FD"],
  "Shopify Webshop": ["#0B6DB8", "#E3F1FD"],
  "WordPress Website": ["#0B6DB8", "#E3F1FD"],
};
export const tagColor = (t: string): [string, string] => tagColors[t] ?? ["#6E5A00", "#FFF6C7"];
