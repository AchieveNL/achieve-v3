/** Projects page data (from the design canvas). Text is Dutch; it is translated through the page dictionary. */
export type Tag = { label: string; color: string; bg: string };
export type Media = { img?: string; video?: string; poster?: string; alt?: string; pos?: string };
export type Project = {
  name: string;
  /** Page id of the case page (see i18n/config routes). */
  href: string;
  year: number;
  sector: string;
  cats: string[];
  tags: Tag[];
  result: string;
  quote: string;
  challenge: string;
  initials: string;
  tile: string;
  hasImg: boolean;
  noImg: boolean;
  img?: string;
  alt?: string;
  gallery?: Media[];
  /** Shown as the featured case above the grid; in the grid only under a matching filter (not under "Alle"). */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "PlanLes",
    href: "CasePlanLes",
    year: 2025,
    sector: "Rijschool",
    cats: ["web", "brand"],
    tags: [
      {
        label: "Branding",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "Mobile App",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "App om rijlessen te plannen, betalen en volgen",
    quote: "",
    challenge: "Leerlingen en instructeurs in één app: lessen plannen, pakketten kopen, facturen betalen en voortgang volgen, zonder dat het ingewikkeld wordt.",
    initials: "PL",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/planles-01.webp",
    alt: "Schermen van de PlanLes-app op zes telefoons: inloggen, lespakketten, rijles plannen en lesoverzicht",
  },
  {
    name: "Cherries",
    href: "CaseCherries",
    year: 2025,
    sector: "Accessoires",
    cats: ["web", "brand"],
    tags: [
      {
        label: "Branding",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "Shopify Webshop",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Speelse webshop voor trendy telefoonaccessoires",
    quote: "",
    challenge: "Een jong merk met kleurrijke telefoonaccessoires wilde een webshop die energiek aanvoelt, maar overzichtelijk blijft op elk apparaat.",
    initials: "C",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/cherries-03.webp",
    alt: "De mobiele webshop van Cherries op twee telefoons",
    gallery: [
      { img: "/media/projects/cherries-03.webp", alt: "De mobiele webshop van Cherries op twee telefoons" },
      { img: "/media/projects/cherries-01.webp", alt: "De homepage van Cherries op een laptop, met een rood telefoonhoesje aan een koord" },
      { img: "/media/projects/cherries-02.webp", alt: "De webshop van Cherries op een desktop en een laptop, tussen verse kersen" },
    ],
  },
  {
    name: "BioNippy",
    href: "CaseBioNippy",
    year: 2023,
    sector: "Food",
    cats: ["web"],
    tags: [
      {
        label: "Custom Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Coming soon-website voor de lancering van een duurzame boodschappenapp",
    quote: "",
    challenge: "Een duurzaam boodschappenplatform bereidt de lancering van zijn app voor. Er was een website nodig die het merk alvast neerzet en interesse wekt.",
    initials: "BN",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/bionippy-01.webp",
    alt: "De coming soon-website van BioNippy op twee laptops, tussen planten en vers fruit",
    gallery: [
      { img: "/media/projects/bionippy-01.webp", alt: "De coming soon-website van BioNippy op twee laptops, tussen planten en vers fruit" },
      { img: "/media/projects/bionippy-02.webp", alt: "De duurzame doelen die BioNippy steunt, op drie telefoons" },
      { img: "/media/projects/bionippy-03.webp", alt: "De nieuwspagina van BioNippy op een tablet" },
    ],
  },
  {
    name: "HuisartsenSpoedpost De Limes",
    href: "CaseDeLimes",
    year: 2025,
    sector: "Zorg",
    cats: ["video"],
    tags: [
      {
        label: "Video Marketing",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "Twee wervingsvideo's voor triagisten",
    quote: "",
    challenge: "Een huisartsenspoedpost zoekt triagisten. Kandidaten moesten zien hoe het werk echt voelt, verteld door collega's zelf.",
    initials: "DL",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/de-limes-cover.webp",
    alt: "Triagist Lotte aan de telefoon terwijl junior triagist Bas meekijkt",
    gallery: [
      {
        video: "/media/projects/de-limes-hero.mp4",
        poster: "/media/projects/de-limes-cover.webp",
        alt: "Triagisten aan het werk op HuisartsenSpoedpost De Limes",
      },
    ],
  },
  {
    name: "BouwvergunningDirect",
    href: "CaseBouwvergunningDirect",
    year: 2026,
    sector: "Bouw",
    cats: ["web"],
    tags: [
      {
        label: "WordPress Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Een heldere website die het vergunningstraject eenvoudig maakt",
    quote: "",
    challenge: "Complexe regelgeving, bouwkundige details en gemeentelijke eisen: voor veel mensen overweldigend. Die inhoud moest overzichtelijk en begrijpelijk worden, zonder in te leveren op expertise.",
    initials: "BD",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/bouwvergunningdirect-01.webp",
    alt: "De nieuwe website van BouwvergunningDirect op een laptop, tussen bouwtekeningen en een maquette",
    gallery: [
      {
        img: "/media/projects/bouwvergunningdirect-01.webp",
        alt: "De nieuwe website van BouwvergunningDirect op een laptop, tussen bouwtekeningen en een maquette",
      },
      {
        img: "/media/projects/bouwvergunningdirect-02.webp",
        alt: "Het dienstenoverzicht van BouwvergunningDirect op een tablet en een telefoon",
      },
    ],
  },
  {
    name: "RCpeptides",
    href: "CaseRCpeptides",
    year: 2026,
    sector: "Life sciences",
    cats: ["ads"],
    featured: true,
    tags: [
      {
        label: "SEA",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "8,3x ROAS in de eerste maand",
    quote: "",
    challenge: "Een jonge webshop, nog zonder bewezen advertentiekanaal.",
    initials: "RC",
    tile: "linear-gradient(135deg, #1F246C 0%, #8639FA 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/rcpeptides-03.webp",
    alt: "De webshop RCpeptides op een laptop en een telefoon in een modern lab",
    gallery: [
      {
        img: "/media/projects/rcpeptides-03.webp",
        alt: "De webshop RCpeptides op een laptop en een telefoon in een modern lab",
      },
      {
        img: "/media/projects/rcpeptides-04.webp",
        alt: "De productpagina van RCpeptides op een laptop en een telefoon in een modern lab",
      },
    ],
  },
  {
    name: "Beddenenzo",
    href: "CaseBeddenenzo",
    year: 2026,
    sector: "Slaapcomfort",
    cats: ["brand", "web", "ads"],
    tags: [
      {
        label: "Branding",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "Custom Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
      {
        label: "SEA",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "Zichtbaar in Google met Search en Shopping",
    quote: "",
    challenge: "Een online beddenspecialist in een markt vol concurrenten. Klanten vergelijken veel, waardoor het lastig was om in Google op te vallen bij de juiste kopers.",
    initials: "B",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "",
    alt: "",
    gallery: [
      {
        video: "/media/projects/beddenenzo-01.mp4",
        poster: "/media/projects/beddenenzo-02.webp",
        alt: "",
      },
    ],
  },
  {
    name: "Zorggroep Haarlemmermeer",
    href: "CaseZorggroepHaarlemmermeer",
    year: 2025,
    sector: "Zorg",
    cats: ["video"],
    tags: [
      {
        label: "Video Marketing",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "Aftermovie van het congres Praktijk van de Toekomst 2025",
    quote: "",
    challenge: "Een regionaal zorgcongres in Hoofddorp voor professionals uit de zorg, het sociaal domein en de lokale overheid. De essentie van de dag moest vastgelegd worden in een boeiende aftermovie.",
    initials: "ZH",
    tile: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/zorggroep-haarlemmermeer-01.webp",
    alt: "Volle zaal tijdens het congres Praktijk van de Toekomst 2025 met sprekers op het podium",
    gallery: [
      {
        video: "/media/projects/zorggroep-haarlemmermeer-hero.mp4",
        poster: "/media/projects/zorggroep-haarlemmermeer-01.webp",
        alt: "Sfeerbeelden van het congres Praktijk van de Toekomst 2025",
      },
    ],
  },
  {
    name: "Minimasters Playground",
    href: "CaseMinimasters",
    sector: "Recreatie",
    cats: ["web", "brand"],
    tags: [
      {
        label: "Window Graphics",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "Custom Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Website en raamstickering, van idee tot oplevering",
    quote: "“Wat ik vooral waardeer, is hoe hun team mij van A tot Z heeft begeleid.”",
    challenge: "Een volledig nieuw concept, zonder bestaande basis. Het merk moest ouders direct vertrouwen geven en kinderen een speelse, leerzame wereld.",
    initials: "K",
    tile: "linear-gradient(135deg, #0F8AE5 0%, #1F246C 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/minimasters-playground-01.webp",
    alt: "Kinderen spelen verkleed als kok, verpleegkundige, brandweer en politie in Minimasters Playground",
    gallery: [
      {
        img: "/media/projects/minimasters-playground-01.webp",
        alt: "Kinderen spelen verkleed als kok, verpleegkundige, brandweer en politie in Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-02.webp",
        alt: "Kinderen in veiligheidshesjes sleutelen aan speelgoedauto's in de garagehoek van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-03.webp",
        alt: "Ouders met dienbladen eten en kinderen lopen mee in het restaurant van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-04.webp",
        alt: "Kinderen spelen dierenarts met knuffels in de dierenkliniek van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-05.webp",
        alt: "Kinderen rijden in speelgoedautootjes langs het politiebureau en de brandweerkazerne van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-06.webp",
        alt: "Baby's spelen met zachte blokken en speelgoed in de babyzone van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-07.webp",
        alt: "Kinderen spelen in de ballenbak bij de glijbaan van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-08.webp",
        alt: "Kinderen in politie-uniform in de speelgoedpolitieauto van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-09.webp",
        alt: "Kinderen koken als kleine chefs in de keuken van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-10.webp",
        alt: "Kinderen spelen kapper en nagelstudio in de roze salon van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-11.webp",
        alt: "Kinderen doen boodschappen met winkelwagentjes in de supermarkt van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-12.webp",
        alt: "Kinderen als brandweer, dokter en politie bij de brandweerwagen van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-13.webp",
        alt: "Peuters in brandweerpakjes bij de brandweerwagen van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-14.webp",
        alt: "Kinderen kopen ijs en fruit in het winkelstraatje van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-15.webp",
        alt: "Verklede kinderen spelen bij de bouwmuur en het ijskarretje van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-16.webp",
        alt: "Kinderen in verschillende beroepskostuums spelen bij de bouwmuur en glijbaan van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-17.webp",
        alt: "Kinderen in lichtblauwe politie-uniforms bij de politieauto van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-18.webp",
        alt: "Kinderen springen op de trampolines en rijden in loopautootjes in Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-19.webp",
        alt: "Kinderen bouwen op de bouwmuur, kopen ijs en glijden van de glijbaan in Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-20.webp",
        alt: "Peuters spelen bij de dierenkliniek, babyzone en het politiebureau van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-21.webp",
        alt: "Peuters in hesjes sleutelen aan auto's in de garage van Minimasters Playground",
      },
      {
        img: "/media/projects/minimasters-playground-22.webp",
        alt: "Kinderen glijden lachend de ballenbak in bij Minimasters Playground",
      },
    ],
    year: 2026,
  },
  {
    name: "Sharkys",
    href: "CaseSharkys",
    sector: "Sport",
    cats: ["web", "brand"],
    tags: [
      {
        label: "Branding",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "WordPress Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Nieuwe website, gekoppeld aan het ledensysteem van de gym",
    quote: "“Achieve heeft voor ons een top website gecreëerd die op dag 1 al heeft gezorgd voor nieuwe klanten.”",
    challenge: "Meer leden binnenhalen, maar de oude website was geen goed visitekaartje: bezoekers zagen niet snel wat Sharkys aanbiedt.",
    gallery: [
      {
        video: "/media/cases/sharkys.mp4",
        poster: "/media/cases/sharkys-poster.webp",
        alt: "",
      },
    ],
    initials: "S",
    tile: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    year: 2025,
  },
  {
    name: "Sushi Today",
    href: "CaseSushiToday",
    sector: "Horeca",
    cats: ["video"],
    tags: [
      {
        label: "Photoshoot",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
      {
        label: "UGC Marketing",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "Fotoshoot en content met foodie influencers",
    quote: "“Het ontwerp van de website is eenvoudig en vrijgevig, precies wat ik wilde.”",
    challenge: "Door de lockdowns moest het restaurant tijdelijk dicht. Het aantal bezoekers en de naamsbekendheid liepen sterk terug.",
    initials: "ST",
    tile: "linear-gradient(135deg, #8639FA 0%, #0F8AE5 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/sushi-today-01.webp",
    alt: "Het interieur van Sushi Today met groene banken, houten tafels en een kleurrijk lichtplafond",
    year: 2025,
  },
  {
    name: "Ron van Dam",
    href: "CaseRonVanDam",
    sector: "Kunst",
    cats: ["web"],
    tags: [
      {
        label: "Shopify Webshop",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
    ],
    result: "Webshop voor mixed media portretten",
    quote: "“Achieve heeft gezorgd voor een overzichtelijke en goed functionerende website voor al mijn mixed media portretten.”",
    challenge: "Een kunstenaar die zijn werk rechtstreeks wilde verkopen, via een webshop die hij zelf kan bijhouden en waarin de kunst centraal staat.",
    initials: "RV",
    tile: "linear-gradient(135deg, #1F246C 0%, #8639FA 100%)",
    hasImg: true,
    noImg: false,
    img: "/media/projects/ron-van-dam-01.webp",
    alt: "Detail van een mixed media portret van Ron van Dam",
    gallery: [
      {
        video: "/media/projects/ron-van-dam-02.mp4",
        poster: "/media/projects/ron-van-dam-01.webp",
        alt: "Detail van een mixed media portret van Ron van Dam",
      },
    ],
    year: 2023,
  },
  {
    name: "A-direct Automaterialen",
    href: "CaseADirect",
    sector: "Automotive",
    cats: ["web", "brand"],
    tags: [
      {
        label: "Brand Strategy",
        color: "#6B2BD9",
        bg: "#EFE8FD",
      },
      {
        label: "WordPress Website",
        color: "#0B6DB8",
        bg: "#E3F1FD",
      },
      {
        label: "Photoshoot",
        color: "#6E5A00",
        bg: "#FFF6C7",
      },
    ],
    result: "Nieuw merk en website in eigen huisstijl",
    quote: "“De persoonlijke communicatie zorgde ervoor dat het project soepel verliep.”",
    challenge: "Een familiebedrijf met een breed aanbod, van onderdelen tot kentekenplaten, maar zonder heldere structuur en met een verouderde uitstraling.",
    img: "/media/projects/a-direct-automaterialen-01.webp",
    alt: "Bedrijfsbus van A-direct Autoparts met logo en belettering",
    initials: "AD",
    tile: "linear-gradient(135deg, #1F246C 0%, #8639FA 100%)",
    hasImg: true,
    noImg: false,
    gallery: [
      {
        img: "/media/projects/a-direct-automaterialen-01.webp",
        alt: "Bedrijfsbus van A-direct Autoparts met logo en belettering",
      },
      {
        img: "/media/cases/a-direct-pand.webp",
        alt: "Het pand van A-direct Autoparts met bedrijfsbussen voor de deur",
      },
      {
        img: "/media/projects/a-direct-automaterialen-02.webp",
        alt: "De winkelingang van A-direct Autoparts met raambelettering in eigen huisstijl",
      },
      {
        img: "/media/projects/a-direct-automaterialen-03.webp",
        alt: "Gevelbord met het logo van A-direct Autoparts",
      },
      {
        img: "/media/projects/a-direct-automaterialen-04.webp",
        alt: "Het team van A-direct Autoparts achter de balie in de winkel",
      },
      {
        img: "/media/projects/a-direct-automaterialen-05.webp",
        alt: "Medewerker van A-direct Autoparts pakt een band uit het bandenrek",
      },
      {
        img: "/media/projects/a-direct-automaterialen-06.webp",
        alt: "Medewerker rijdt een steekwagen met banden door het bandenmagazijn",
      },
      {
        img: "/media/projects/a-direct-automaterialen-07.webp",
        alt: "Medewerker controleert de voorraad remschijven en filters in het magazijn",
      },
      {
        img: "/media/projects/a-direct-automaterialen-08.webp",
        alt: "Medewerker met adembeschermingsmasker achter de verfmengmachine",
      },
      {
        img: "/media/projects/a-direct-automaterialen-09.webp",
        alt: "Medewerker aan het werk in de verfmengkamer van A-direct Autoparts",
      },
      {
        img: "/media/projects/a-direct-automaterialen-10.webp",
        alt: "Medewerker laadt onderdelen in een bedrijfsbus van A-direct Autoparts",
      },
      {
        img: "/media/projects/a-direct-automaterialen-11.webp",
        alt: "Medewerker achter de kassa met wanden vol gereedschap",
      },
      {
        img: "/media/projects/a-direct-automaterialen-12.webp",
        alt: "Medewerker scant een Mann-filter aan de balie",
      },
      {
        img: "/media/projects/a-direct-automaterialen-13.webp",
        alt: "Schappen met Liqui Moly-additieven en autopoetsmiddelen in de winkel",
      },
      {
        img: "/media/projects/a-direct-automaterialen-14.webp",
        alt: "Gangpad met schappen vol motorolie en transmissieolie",
      },
      {
        img: "/media/projects/a-direct-automaterialen-15.webp",
        alt: "Wand met dopsleutels en gereedschap in de winkel",
      },
    ],
    year: 2022,
  },
];

export type HeroProject = {
  name: string;
  sector: string;
  sub: string;
  tag: string;
  bg: string;
  initials: string;
  img?: string;
  video?: string;
  poster?: string;
  /** Thumbnail in the hero strip; defaults to img. */
  thumb?: string;
  pool?: string[];
};
/** Slides in the hero of the projects page: the first one always, plus a random selection of the others per visit (see ProjectsHero). `pool`: one random photo is picked per visit. */
export const heroProjects: HeroProject[] = [
  {
    name: "RCpeptides",
    sector: "Life sciences",
    sub: "Zoekadvertenties en Shopping voor een webshop: 8,3x ROAS in de eerste maand.",
    tag: "SEA",
    img: "/media/cases/rcpeptides-lab.webp",
    video: "/media/projects/rcpeptides-01.mp4",
    poster: "/media/projects/rcpeptides-02.webp",
    initials: "RC",
    bg: "#2B3190",
  },
  {
    name: "Minimasters Playground",
    sector: "Recreatie",
    sub: "Website en raamstickering voor een kinderspeelparadijs, van idee tot oplevering.",
    tag: "Window Graphics · Custom Website",
    bg: "linear-gradient(135deg, #0F8AE5 0%, #1F246C 100%)",
    initials: "MP",
    img: "/media/projects/minimasters-playground-01.webp",
    pool: [
      "/media/projects/minimasters-playground-01.webp",
      "/media/projects/minimasters-playground-02.webp",
      "/media/projects/minimasters-playground-03.webp",
      "/media/projects/minimasters-playground-04.webp",
      "/media/projects/minimasters-playground-05.webp",
      "/media/projects/minimasters-playground-06.webp",
      "/media/projects/minimasters-playground-07.webp",
      "/media/projects/minimasters-playground-08.webp",
      "/media/projects/minimasters-playground-09.webp",
      "/media/projects/minimasters-playground-10.webp",
      "/media/projects/minimasters-playground-11.webp",
      "/media/projects/minimasters-playground-12.webp",
      "/media/projects/minimasters-playground-13.webp",
      "/media/projects/minimasters-playground-14.webp",
      "/media/projects/minimasters-playground-15.webp",
      "/media/projects/minimasters-playground-16.webp",
      "/media/projects/minimasters-playground-17.webp",
      "/media/projects/minimasters-playground-18.webp",
      "/media/projects/minimasters-playground-19.webp",
      "/media/projects/minimasters-playground-20.webp",
      "/media/projects/minimasters-playground-21.webp",
      "/media/projects/minimasters-playground-22.webp",
    ],
  },
  {
    name: "Sharkys",
    sector: "Sport",
    sub: "Een nieuwe website voor een sportschool, die op dag 1 al nieuwe klanten opleverde.",
    tag: "Branding · WordPress Website",
    img: "/media/projects/sharkys-01.webp",
    initials: "S",
    bg: "#2B3190",
    video: "/media/cases/sharkys.mp4",
    poster: "/media/cases/sharkys-poster.webp",
    thumb: "/media/projects/sharkys-thumb.webp",
  },
  {
    name: "Sushi Today",
    sector: "Horeca",
    sub: "Fotoshoot en content met foodie influencers voor een sushirestaurant.",
    tag: "Photoshoot · UGC Marketing",
    bg: "linear-gradient(135deg, #2B3190 0%, #8639FA 100%)",
    initials: "ST",
    img: "/media/projects/sushi-today-01.webp",
  },
  {
    name: "Ron van Dam",
    sector: "Kunst",
    sub: "Een webshop in Shopify voor een kunstenaar met mixed media portretten.",
    tag: "Shopify Webshop",
    bg: "linear-gradient(135deg, #8639FA 0%, #2B3190 100%)",
    initials: "RV",
    img: "/media/projects/ron-van-dam-01.webp",
    video: "/media/projects/ron-van-dam-02.mp4",
    poster: "/media/projects/ron-van-dam-01.webp",
  },
  {
    name: "A-direct Automaterialen",
    sector: "Automotive",
    sub: "Een nieuw merk en een website in eigen huisstijl voor een specialist in auto-onderdelen.",
    tag: "Brand Strategy · WordPress Website · Photoshoot",
    img: "/media/projects/a-direct-automaterialen-01.webp",
    initials: "AD",
    bg: "#2B3190",
  },
  {
    name: "Beddenenzo",
    sector: "Slaapcomfort",
    sub: "Zoekadvertenties en Shopping voor een online beddenspecialist, zichtbaar bij de juiste kopers.",
    tag: "Branding · Custom Website · SEA",
    img: "/media/projects/beddenenzo-02.webp",
    video: "/media/projects/beddenenzo-01.mp4",
    poster: "/media/projects/beddenenzo-02.webp",
    initials: "B",
    bg: "linear-gradient(135deg, #1F246C 0%, #0F8AE5 100%)",
  },
  {
    name: "Zorggroep Haarlemmermeer",
    sector: "Zorg",
    sub: "Een aftermovie van het regionale zorgcongres Praktijk van de Toekomst 2025.",
    tag: "Video Marketing",
    img: "/media/projects/zorggroep-haarlemmermeer-01.webp",
    video: "/media/projects/zorggroep-haarlemmermeer-hero.mp4",
    poster: "/media/projects/zorggroep-haarlemmermeer-01.webp",
    initials: "ZH",
    bg: "#2B3190",
  },
  {
    name: "PlanLes",
    sector: "Rijschool",
    sub: "Een app die rijlessen plannen, betalen en volgen eenvoudig maakt.",
    tag: "Branding · Mobile App",
    img: "/media/projects/planles-01.webp",
    initials: "PL",
    bg: "#2B3190",
  },
  {
    name: "Cherries",
    sector: "Accessoires",
    sub: "Een speelse Shopify-webshop voor trendy telefoonaccessoires.",
    tag: "Branding · Shopify Webshop",
    img: "/media/projects/cherries-03.webp",
    initials: "C",
    bg: "#2B3190",
  },
  {
    name: "BioNippy",
    sector: "Food",
    sub: "Een coming soon-website voor een duurzaam boodschappenplatform.",
    tag: "Custom Website",
    img: "/media/projects/bionippy-01.webp",
    initials: "BN",
    bg: "#2B3190",
  },
  {
    name: "HuisartsenSpoedpost De Limes",
    sector: "Zorg",
    sub: "Twee wervingsvideo's waarin triagisten zelf vertellen over hun werk.",
    tag: "Video Marketing",
    img: "/media/projects/de-limes-cover.webp",
    video: "/media/projects/de-limes-hero.mp4",
    poster: "/media/projects/de-limes-cover.webp",
    initials: "DL",
    bg: "#2B3190",
  },
  {
    name: "BouwvergunningDirect",
    sector: "Bouw",
    sub: "Een heldere WordPress-website die het vergunningstraject eenvoudig maakt.",
    tag: "WordPress Website",
    img: "/media/projects/bouwvergunningdirect-01.webp",
    initials: "BD",
    bg: "#2B3190",
  },
];

/** Gallery of the featured case (RCpeptides). */
export const featuredGallery: Media[] = [
  {
    video: "/media/projects/rcpeptides-01.mp4",
    poster: "/media/projects/rcpeptides-02.webp",
    alt: "",
    pos: "center",
  },
  {
    img: "/media/projects/rcpeptides-03.webp",
    alt: "De webshop RCpeptides op een laptop en een telefoon in een modern lab",
    pos: "center",
  },
  {
    img: "/media/projects/rcpeptides-04.webp",
    alt: "De productpagina van RCpeptides op een laptop en een telefoon in een modern lab",
    pos: "center",
  },
];

export const projectFilters = [
  {
    id: "alle",
    label: "Alle",
  },
  {
    id: "brand",
    label: "Branding",
  },
  {
    id: "web",
    label: "Website & webshop",
  },
  {
    id: "video",
    label: "Video & content",
  },
  {
    id: "ads",
    label: "Advertising",
  },
] as const;
