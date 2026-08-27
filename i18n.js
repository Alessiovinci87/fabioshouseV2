/* ============================================================
   Le Porte di Sardegna v2 — i18n
   - Rileva lingua da ?lang=, localStorage, navigator, fallback 'it'
   - Persiste scelta in localStorage + URL
   - Aggiorna <html lang> dinamicamente
   - Espone window.FH_I18N con:
       current (getter)   → lingua attiva
       t(key|obj)         → stringa tradotta
       setLang(lang)      → cambia lingua e rerender
       translateDom(root) → applica [data-i18n] agli elementi
   - Al boot: traduce tutti i [data-i18n] nel DOM statico (nav, footer)
   ============================================================ */
(function () {
  'use strict';

  var LANGS = ['it', 'en', 'fr', 'de', 'es'];
  var DEFAULT = 'it';
  var state = { lang: DEFAULT };

  // ----------------------------------------------------------
  // Lingue su percorso: /en/…, /fr/…, /de/…; l'italiano resta alla radice.
  // La URL è l'unica fonte di verità per la lingua (niente auto-redirect da
  // browser/localStorage: i crawler devono vedere sempre la lingua della URL;
  // Google manda gli utenti alla versione giusta tramite hreflang).
  // ----------------------------------------------------------
  var PATH_RE = /^\/(en|fr|de|es)(?=\/|$)/;
  function pathLang(p) {
    var m = PATH_RE.exec(p == null ? (location.pathname || '/') : p);
    return m ? m[1] : null;
  }
  function basePath(p) {
    p = (p == null ? location.pathname : p) || '/';
    p = p.replace(PATH_RE, '');
    return p || '/';
  }
  function localizePath(p, lang) {
    lang = lang || state.lang;
    var base = basePath(p);
    if (lang === DEFAULT) return base;
    return '/' + lang + (base === '/' ? '' : base);
  }
  // Riscrive i link interni delle rotte SPA con il prefisso della lingua
  // corrente (i link statici sono scritti in IT: /case, /luogo/…).
  var ROUTABLE = /^\/(?:$|case(?:\/|$)|luogo\/|incluso$|chi-siamo$|contatti$)/;
  function localizeLinks(root) {
    (root || document).querySelectorAll('a[href^="/"]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var m = /^([^?#]*)(.*)$/.exec(href);
      var path = m[1], rest = m[2];
      var base = basePath(path);
      if (!ROUTABLE.test(base)) return;
      var loc = localizePath(base);
      if (loc !== path) a.setAttribute('href', loc + rest);
    });
  }
  function searchWithoutLang() {
    try {
      var u = new URL(location.href);
      u.searchParams.delete('lang');
      return u.search;
    } catch (_) { return ''; }
  }

  // ----------------------------------------------------------
  // DIZIONARIO CENTRALE (UI chrome + home)
  // Contenuti lunghi (house.story, activities, guide) restano
  // come oggetti multilingua inline in data.js.
  // ----------------------------------------------------------
  var DICT = {
    // -------- nav + cta --------
    'nav.home':     { it: 'Home',           en: 'Home',               fr: 'Accueil',             de: 'Start' },
    'nav.cases':    { it: 'Le Case',        en: 'The Houses',         fr: 'Les Maisons',         de: 'Die Häuser' },
    'nav.included': { it: 'Cosa è incluso', en: "What's included",    fr: 'Ce qui est inclus',   de: 'Leistungen' },
    'nav.about':    { it: 'Chi siamo',      en: 'About',              fr: 'À propos',            de: 'Wir' },
    'nav.contact':  { it: 'Contatti',       en: 'Contact',            fr: 'Contact',             de: 'Kontakt' },
    'nav.book':     { it: 'Prenota',        en: 'Book',               fr: 'Réserver',            de: 'Buchen' },

    // -------- footer --------
    'foot.brand_tag': {
      it: 'Due case esclusive a Stintino e Alghero per la tua estate sarda.',
      en: 'Two exclusive houses in Stintino and Alghero for your Sardinian summer.',
      fr: 'Deux maisons exclusives à Stintino et Alghero pour votre été sarde.',
      de: 'Zwei besondere Häuser in Stintino und Alghero für Ihren sardischen Sommer.'
    },
    'foot.navigate':  { it: 'Navigare',    en: 'Browse',       fr: 'Naviguer',       de: 'Navigation' },
    'foot.tellus':    { it: 'Raccontarci', en: 'Talk to us',   fr: 'Nous parler',    de: 'Erzählen Sie uns' },
    'foot.writeus':   { it: 'Scriveteci',  en: 'Write to us',  fr: 'Écrivez-nous',   de: 'Schreiben Sie uns' },
    'foot.privacy':   { it: 'Privacy & Cookie', en: 'Privacy & Cookies', fr: 'Confidentialité & Cookies', de: 'Datenschutz & Cookies' },
    'foot.location':  { it: 'Sardegna · Italia', en: 'Sardinia · Italy', fr: 'Sardaigne · Italie', de: 'Sardinien · Italien' },
    'foot.updating':  { it: 'IN AGGIORNAMENTO',  en: 'BEING UPDATED',    fr: 'EN COURS DE MISE À JOUR', de: 'WIRD AKTUALISIERT' },
    'foot.rights':    { it: 'Tutti i diritti riservati', en: 'All rights reserved', fr: 'Tous droits réservés', de: 'Alle Rechte vorbehalten' },

    // -------- home: hero --------
    'home.eyebrow': {
      it: 'Sardegna · due case, due mari',
      en: 'Sardinia · two houses, two seas',
      fr: 'Sardaigne · deux maisons, deux mers',
      de: 'Sardinien · zwei Häuser, zwei Meere'
    },
    'home.h1': {
      it: 'La tua estate <em>tra Stintino</em> e Alghero.',
      en: 'Your summer <em>between Stintino</em> and Alghero.',
      fr: 'Votre été <em>entre Stintino</em> et Alghero.',
      de: 'Ihr Sommer <em>zwischen Stintino</em> und Alghero.'
    },
    'home.side_note': {
      it: 'Due case gestite da una famiglia: una villa a cinque minuti in auto dalla Pelosa, un appartamento nel centro catalano di Alghero. La stessa cura in posti che non si somigliano.',
      en: "Two houses run by a family: a villa five minutes by car from La Pelosa, and an apartment in the Catalan heart of Alghero. The same care in two places that couldn't be more different.",
      fr: "Deux maisons tenues par une famille : une villa à cinq minutes en voiture de La Pelosa, un appartement dans le centre catalan d'Alghero. La même attention, dans deux endroits qui ne se ressemblent pas.",
      de: 'Zwei Häuser, geführt von einer Familie: eine Villa fünf Autominuten von La Pelosa entfernt, eine Wohnung im katalanischen Zentrum von Alghero. Dieselbe Sorgfalt an zwei ganz unterschiedlichen Orten.'
    },
    'home.hero.tag': {
      it: 'La Pelosa · Stintino', en: 'La Pelosa · Stintino',
      fr: 'La Pelosa · Stintino', de: 'La Pelosa · Stintino'
    },
    'home.hero.h2': {
      it: "Tra le spiagge <em>più belle</em> d'Europa.",
      en: 'Among the <em>finest beaches</em> in Europe.',
      fr: "Parmi les <em>plus belles plages</em> d'Europe.",
      de: 'Zu den <em>schönsten Stränden</em> Europas.'
    },

    // -------- home: stats strip --------
    'home.stats.houses':       { it: 'Case',          en: 'Houses',          fr: 'Maisons',         de: 'Häuser' },
    'home.stats.season_label': { it: 'Stagione',      en: 'Season',          fr: 'Saison',          de: 'Saison' },
    'home.stats.season_val':   { it: 'Giu–Set',       en: 'Jun–Sep',         fr: 'Juin–Sep',        de: 'Jun–Sep' },
    'home.stats.rating':       { it: 'Rating medio',  en: 'Average rating',  fr: 'Note moyenne',    de: 'Ø Bewertung' },
    'home.stats.response':     { it: 'Tempo risposta', en: 'Response time',  fr: 'Temps de réponse', de: 'Antwortzeit' },
    'home.stats.cta':          { it: 'Esplora le case →', en: 'Explore the houses →', fr: 'Découvrir les maisons →', de: 'Häuser entdecken →' },

    // -------- home: how we work --------
    'home.how.eyebrow': {
      it: '01 — Come lavoriamo', en: '01 — How we work',
      fr: '01 — Notre façon de faire', de: '01 — Wie wir arbeiten'
    },
    'home.how.h2': {
      it: 'Piccolo, <em>apposta</em>.',
      en: 'Small, <em>on purpose</em>.',
      fr: 'Petit, <em>volontairement</em>.',
      de: 'Klein, <em>mit Absicht</em>.'
    },
    'home.how.lede': {
      it: 'Due case e basta. Preferiamo curarle bene che averne dieci da tenere a metà.',
      en: "Two houses, that's it. We'd rather look after both properly than manage ten only halfway.",
      fr: "Deux maisons, pas plus. On préfère bien s'en occuper que d'en avoir dix, gérées à moitié.",
      de: 'Zwei Häuser, mehr nicht. Wir kümmern uns lieber richtig um sie, als zehn halbherzig zu verwalten.'
    },
    'home.how.intro': {
      it: "Una famiglia che da qualche anno affitta le proprie due case sarde a chi vuole passare un'estate nel nord-ovest dell'isola. Rispondiamo noi ai messaggi, prepariamo la casa per il vostro arrivo e le chiavi vi aspettano nella cassetta di sicurezza: vi sistemate con i vostri tempi, senza attese. Se serve qualcosa durante il soggiorno basta una telefonata.",
      en: "A family that, for a few years now, has been renting out its two Sardinian houses to people who want to spend a summer in the island's north-west. We reply to your messages ourselves, we get the house ready for your arrival, and the keys wait for you in a secure key safe: you settle in at your own pace, with no waiting. If you need anything during your stay, a single phone call is enough.",
      fr: "Une famille qui, depuis quelques années, loue ses deux maisons sardes à ceux qui veulent passer un été dans le nord-ouest de l'île. C'est nous qui répondons aux messages, qui préparons la maison pour votre arrivée, et les clés vous attendent dans une boîte sécurisée : vous vous installez à votre rythme, sans attendre. S'il vous faut quoi que ce soit pendant le séjour, un coup de fil suffit.",
      de: 'Eine Familie, die seit einigen Jahren ihre beiden sardischen Häuser an Gäste vermietet, die einen Sommer im Nordwesten der Insel verbringen möchten. Wir beantworten Ihre Nachrichten selbst, bereiten das Haus für Ihre Ankunft vor, und die Schlüssel warten in einer Schlüsselbox auf Sie: Sie ziehen in Ihrem eigenen Tempo ein, ohne zu warten. Wenn während des Aufenthalts etwas nötig ist, genügt ein Anruf.'
    },
    'home.how.pt1.h': { it: 'Due case, stessa mano',  en: 'Two houses, one pair of hands', fr: 'Deux maisons, une seule main', de: 'Zwei Häuser, eine Hand' },
    'home.how.pt1.t': {
      it: 'Le gestiamo noi, direttamente. Rispondiamo noi ai messaggi e all\'arrivo le chiavi sono già in cassetta di sicurezza: vi sistemate con i vostri tempi, senza attese.',
      en: 'We manage them directly. We answer messages ourselves, and on arrival the keys are already in a secure key safe: you settle in at your own pace, with no waiting.',
      fr: 'On les gère nous-mêmes. C\'est nous qui répondons aux messages, et à l\'arrivée les clés sont déjà dans la boîte sécurisée : vous vous installez à votre rythme, sans attendre.',
      de: 'Wir verwalten sie selbst. Wir antworten auf Nachrichten, und bei der Ankunft liegen die Schlüssel bereits in der Schlüsselbox: Sie ziehen in Ihrem eigenen Tempo ein, ohne zu warten.'
    },
    'home.how.pt2.h': { it: 'Sardegna vera', en: 'The real Sardinia', fr: 'La vraie Sardaigne', de: 'Echtes Sardinien' },
    'home.how.pt2.t': {
      it: 'La Pelosa a un quarto d\'ora di bus o cinque minuti d\'auto a Stintino, centro catalano a piedi ad Alghero. Due pezzi di isola diversi, entrambi autentici.',
      en: 'La Pelosa a fifteen-minute bus ride or five-minute drive from Stintino, the Catalan old town on foot in Alghero. Two different corners of the island — both genuine.',
      fr: 'La Pelosa à un quart d\'heure de bus ou cinq minutes en voiture depuis Stintino, le centre catalan à pied à Alghero. Deux morceaux d\'île différents, tous deux authentiques.',
      de: 'La Pelosa eine Viertelstunde mit dem Bus oder fünf Autominuten von Stintino, die katalanische Altstadt zu Fuß in Alghero. Zwei ganz unterschiedliche Ecken der Insel — beide echt.'
    },
    'home.how.pt3.h': { it: 'Ospiti, non clienti', en: 'Guests, not customers', fr: 'Hôtes, pas clients', de: 'Gäste, keine Kunden' },
    'home.how.pt3.t': {
      it: 'Vi rispondiamo entro ventiquattro ore, in italiano, inglese, francese o tedesco. Nessun automatismo.',
      en: 'We reply within twenty-four hours — in Italian, English, French or German. No automated messages.',
      fr: 'Réponse sous vingt-quatre heures, en italien, anglais, français ou allemand. Rien d\'automatique.',
      de: 'Antwort innerhalb von vierundzwanzig Stunden — auf Italienisch, Englisch, Französisch oder Deutsch. Nichts Automatisches.'
    },
    'home.how.pt4.h': { it: 'Tutto incluso', en: 'Everything included', fr: 'Tout compris', de: 'Alles inklusive' },
    'home.how.pt4.t': {
      it: 'WiFi, aria condizionata, utenze. Niente sorprese all\'arrivo.',
      en: 'WiFi, air conditioning, utilities. No surprises on arrival.',
      fr: 'WiFi, climatisation, charges. Aucune surprise à l\'arrivée.',
      de: 'WLAN, Klimaanlage, Nebenkosten. Keine Überraschungen bei der Ankunft.'
    },
    'home.cite.q': {
      it: '"Sono case che conosciamo a memoria. Le teniamo come le terremmo per noi."',
      en: '"We know these houses by heart. We look after them the way we\'d look after them for ourselves."',
      fr: '"Ce sont des maisons qu\'on connaît par cœur. On les tient comme on les tiendrait pour nous."',
      de: '"Das sind Häuser, die wir in- und auswendig kennen. Wir pflegen sie so, wie wir sie für uns selbst pflegen würden."'
    },
    'home.cite.by': { it: '— Fabio', en: '— Fabio', fr: '— Fabio', de: '— Fabio' },

    // -------- home: sect2 "Le nostre case" --------
    'home.sect2.eyebrow': { it: '02 — Le nostre case', en: '02 — Our houses', fr: '02 — Nos maisons', de: '02 — Unsere Häuser' },
    'home.sect2.h2': {
      it: 'Due proprietà, <em>una sola famiglia</em>.',
      en: 'Two properties, <em>one family</em>.',
      fr: 'Deux propriétés, <em>une seule famille</em>.',
      de: 'Zwei Objekte, <em>eine Familie</em>.'
    },
    'home.sect2.lede': {
      it: 'Una villa con giardino a Stintino, un appartamento in centro ad Alghero. Stessa cura, due vacanze molto diverse.',
      en: 'A villa with garden in Stintino, an apartment in the centre of Alghero. Same care, two very different holidays.',
      fr: 'Une villa avec jardin à Stintino, un appartement au centre d\'Alghero. Même soin, deux vacances bien différentes.',
      de: 'Eine Villa mit Garten in Stintino, eine Wohnung im Zentrum von Alghero. Dieselbe Sorgfalt, zwei sehr unterschiedliche Urlaube.'
    },
    'home.sect2.cta': { it: 'Vedi entrambe le case →', en: 'See both houses →', fr: 'Voir les deux maisons →', de: 'Beide Häuser ansehen →' },

    // -------- home: prop-card micro labels --------
    'home.prop.from':      { it: 'da',           en: 'from',     fr: 'à partir de', de: 'ab' },
    'home.prop.per_week':  { it: '/ settimana',  en: '/ week',   fr: '/ semaine',   de: '/ Woche' },
    'home.prop.cta_open_door': { it: 'Apri la porta', en: 'Open the door', fr: 'Ouvrir la porte', de: 'Tür öffnen' },

    // -------- home: sect3 "Testimonial" --------
    'home.sect3.eyebrow': { it: '03 — Testimonial', en: '03 — Guests say', fr: '03 — Témoignages', de: '03 — Gästestimmen' },
    'home.sect3.h2': {
      it: 'Hanno <em>dormito da noi</em>.',
      en: 'They <em>stayed with us</em>.',
      fr: 'Ils ont <em>dormi chez nous</em>.',
      de: 'Sie waren <em>bei uns zu Gast</em>.'
    },
    'home.sect3.lede': {
      it: 'Tre voci su più di cinquanta famiglie che sono passate. Nessuna ritoccata.',
      en: "Three voices out of more than fifty families who've passed through. Not a single one edited.",
      fr: 'Trois voix parmi plus de cinquante familles qui sont passées par ici. Aucune retouchée.',
      de: 'Drei Stimmen aus über fünfzig Familien, die hier zu Gast waren. Keine einzige bearbeitet.'
    },
    'home.sect3.by': { it: 'ospiti a', en: 'guests at', fr: 'hôtes chez', de: 'Gäste bei' },

    // -------- home: disponibilità calendari --------
    'home.avail.eyebrow': {
      it: 'Disponibilità · aggiornata da Airbnb',
      en: 'Availability · synced from Airbnb',
      fr: 'Disponibilités · synchronisées avec Airbnb',
      de: 'Verfügbarkeit · synchron mit Airbnb'
    },
    'home.avail.h2': {
      it: 'Quando potete <em>venire</em>.',
      en: 'When you can <em>come</em>.',
      fr: 'Quand vous pouvez <em>venir</em>.',
      de: 'Wann Sie <em>kommen</em> können.'
    },
    'home.avail.lede': {
      it: 'Le date occupate qui sotto vengono dai calendari Airbnb delle due case. Se vedete un periodo libero che vi piace, scriveteci: rispondiamo entro ventiquattro ore.',
      en: 'The busy dates below come straight from the Airbnb calendars of the two houses. See a free period you like? Write to us — we reply within twenty-four hours.',
      fr: 'Les dates occupées ci-dessous proviennent directement des calendriers Airbnb des deux maisons. Une période libre vous plaît ? Écrivez-nous — nous répondons sous vingt-quatre heures.',
      de: 'Die belegten Daten unten stammen direkt aus den Airbnb-Kalendern der beiden Häuser. Sehen Sie einen freien Zeitraum, der Ihnen gefällt? Schreiben Sie uns — Antwort innerhalb von vierundzwanzig Stunden.'
    },

    // -------- home: final CTA --------
    'home.final.eyebrow': { it: 'Raccontateci', en: 'Tell us', fr: 'Écrivez-nous', de: 'Erzählen Sie uns' },
    'home.final.h2': {
      it: 'State pensando a una settimana, <em>a una famiglia</em>, a un mare.',
      en: "You're thinking of a week, <em>of a family</em>, of a sea.",
      fr: 'Vous pensez à une semaine, <em>à une famille</em>, à une mer.',
      de: 'Sie denken an eine Woche, <em>an eine Familie</em>, an ein Meer.'
    },
    'home.final.lede': {
      it: 'Scriveteci quando volete. Rispondiamo entro ventiquattro ore, in italiano, inglese, francese o tedesco. Nessun modulo di preventivo finto.',
      en: "Write whenever you like. We'll reply within twenty-four hours — in Italian, English, French or German. No fake quote forms.",
      fr: "Écrivez-nous quand vous voulez. Réponse en vingt-quatre heures, en italien, anglais, français ou allemand. Aucun formulaire de devis truqué.",
      de: 'Schreiben Sie uns, wann immer Sie möchten. Antwort innerhalb von vierundzwanzig Stunden — auf Italienisch, Englisch, Französisch oder Deutsch. Keine fingierten Angebotsformulare.'
    },
    'home.final.cta': {
      it: 'Scrivere a Le Porte di Sardegna →',
      en: 'Write to Le Porte di Sardegna →',
      fr: 'Écrire à Le Porte di Sardegna →',
      de: 'An Le Porte di Sardegna schreiben →'
    },

    // -------- case list --------
    'case.eyebrow': { it: 'Sardegna · due case', en: 'Sardinia · two houses', fr: 'Sardaigne · deux maisons', de: 'Sardinien · zwei Häuser' },
    'case.h1':      { it: 'Le <em>Case</em>.',   en: 'The <em>Houses</em>.',  fr: 'Les <em>Maisons</em>.',    de: 'Die <em>Häuser</em>.' },
    'case.lede': {
      it: 'Una villa di novanta metri quadri a Stintino, cinque minuti in auto dalla Pelosa. Un appartamento di settanta metri quadri nel centro storico di Alghero. Stessa cura, due vacanze molto diverse.',
      en: 'A ninety-square-metre villa in Stintino, five minutes by car from La Pelosa. A seventy-square-metre apartment in the old town of Alghero. Same care, two very different holidays.',
      fr: 'Une villa de quatre-vingt-dix mètres carrés à Stintino, à cinq minutes en voiture de La Pelosa. Un appartement de soixante-dix mètres carrés dans la vieille ville d\'Alghero. Même soin, deux vacances bien différentes.',
      de: 'Eine Villa mit neunzig Quadratmetern in Stintino, fünf Autominuten von La Pelosa. Eine Wohnung mit siebzig Quadratmetern in der Altstadt von Alghero. Dieselbe Sorgfalt, zwei sehr unterschiedliche Urlaube.'
    },
    'case.chip_all':       { it: 'Tutte',            en: 'All',          fr: 'Toutes',            de: 'Alle' },
    'case.sort_aria':      { it: 'Ordina le case',   en: 'Sort houses',  fr: 'Trier les maisons', de: 'Häuser sortieren' },
    'case.sort.featured':  { it: 'In evidenza',      en: 'Featured',     fr: 'En avant',          de: 'Empfohlen' },
    'case.sort.priceAsc':  { it: 'Prezzo · crescente',   en: 'Price · low to high', fr: 'Prix · croissant',   de: 'Preis · aufsteigend' },
    'case.sort.priceDesc': { it: 'Prezzo · decrescente', en: 'Price · high to low', fr: 'Prix · décroissant', de: 'Preis · absteigend' },
    'case.sort.guests':    { it: 'Capienza',         en: 'Guests',       fr: 'Capacité',          de: 'Gäste' },
    'case.row.guests':     { it: 'Ospiti',           en: 'Guests',       fr: 'Hôtes',             de: 'Gäste' },
    'case.row.beds':       { it: 'Camere',           en: 'Bedrooms',     fr: 'Chambres',          de: 'Zimmer' },
    'case.row.baths':      { it: 'Bagni',            en: 'Bathrooms',    fr: 'Salles de bain',    de: 'Bäder' },
    'case.row.sqm':        { it: 'M²',               en: 'sq m',         fr: 'm²',                de: 'm²' },
    'case.row.explore':    { it: 'Esplora →',        en: 'Explore →',    fr: 'Découvrir →',       de: 'Entdecken →' },

    // -------- detail (hero, sections, gallery, tour, guide, book-card) --------
    'det.gallery_cta':  { it: 'Vedi galleria', en: 'View gallery', fr: 'Voir la galerie', de: 'Galerie ansehen' },
    'det.stats.guests':    { it: 'Ospiti',        en: 'Guests',       fr: 'Hôtes',           de: 'Gäste' },
    'det.stats.beds':      { it: 'Camere',        en: 'Bedrooms',     fr: 'Chambres',        de: 'Zimmer' },
    'det.stats.totalBeds': { it: 'Letti',         en: 'Beds',         fr: 'Couchages',       de: 'Schlafplätze' },
    'det.stats.baths':     { it: 'Bagni',         en: 'Bathrooms',    fr: 'Salles de bain',  de: 'Bäder' },
    'det.stats.sqm':     { it: 'M²',            en: 'sq m',         fr: 'm²',              de: 'm²' },
    'det.stats.rating':  { it: 'Rating',        en: 'Rating',       fr: 'Note',            de: 'Bewertung' },
    'det.stats.reviews': { it: 'Recensioni',    en: 'Reviews',      fr: 'Avis',            de: 'Bewertungen' },
    'det.thehouse':    { it: 'La casa',          en: 'The house',     fr: 'La maison',       de: 'Das Haus' },
    'det.amenities':   { it: 'Dotazioni',        en: 'Amenities',     fr: 'Équipements',     de: 'Ausstattung' },
    'det.practical':   { it: 'Informazioni pratiche', en: 'Practical info', fr: 'Informations pratiques', de: 'Praktische Infos' },
    'det.gallery.eyebrow': { it: 'Galleria',     en: 'Gallery',       fr: 'Galerie',         de: 'Galerie' },
    'det.gallery.h2':      { it: 'Entrate <em>piano</em>.', en: 'Step in <em>slowly</em>.', fr: 'Entrez <em>doucement</em>.', de: 'Kommen Sie <em>langsam</em> herein.' },
    'det.gallery.sub':     { it: 'Clic su una foto per vederla intera.', en: 'Click a photo to view it full-size.', fr: 'Cliquez sur une photo pour la voir en entier.', de: 'Klicken Sie auf ein Foto, um es vollständig zu sehen.' },
    'det.gallery.openall': {
      it: 'Apri tutte le %n foto',
      en: 'Open all %n photos',
      fr: 'Voir les %n photos',
      de: 'Alle %n Fotos ansehen'
    },
    'det.gallery.morelbl': { it: 'foto', en: 'photos', fr: 'photos', de: 'Fotos' },
    'det.tour.eyebrow': { it: 'Il tour', en: 'The tour', fr: 'La visite', de: 'Die Tour' },
    'det.tour.h2': {
      it: 'Un giro <em>dentro casa</em>, col telefono in mano.',
      en: 'A walk <em>inside the house</em>, phone in hand.',
      fr: 'Un tour <em>à l\'intérieur</em>, téléphone en main.',
      de: 'Ein Rundgang <em>durchs Haus</em>, mit dem Handy in der Hand.'
    },
    'det.tour.lede': {
      it: 'Niente luce cinematografica, niente voce fuori campo. Fabio che cammina per l\'appartamento con il telefono, prima che arriviate. Quello che vedete nel video è quello che trovate entrando.',
      en: 'No cinematic lighting, no voice-over. Fabio walking through the apartment with his phone before you arrive. What you see in the video is what you find when you walk in.',
      fr: 'Pas de lumière cinématographique, pas de voix off. Fabio qui parcourt l\'appartement avec son téléphone, avant votre arrivée. Ce que vous voyez dans la vidéo, c\'est ce que vous trouverez en entrant.',
      de: 'Kein Filmlicht, keine Off-Stimme. Fabio geht mit dem Handy durch die Wohnung, bevor Sie ankommen. Was Sie im Video sehen, finden Sie genau so vor, wenn Sie hereinkommen.'
    },
    'det.book.perweek': { it: '/ settimana', en: '/ week', fr: '/ semaine', de: '/ Woche' },
    'det.book.reviews': { it: 'recensioni',  en: 'reviews', fr: 'avis',     de: 'Bewertungen' },
    'det.book.season_aria': { it: 'Seleziona il mese', en: 'Select the month', fr: 'Choisir le mois', de: 'Monat wählen' },
    'det.book.guests':  { it: 'Ospiti',     en: 'Guests',   fr: 'Hôtes',    de: 'Gäste' },
    'det.book.guests_up_to': { it: 'fino a', en: 'up to',   fr: "jusqu'à", de: 'bis zu' },
    'det.book.nights':  { it: '7 notti ×',  en: '7 nights ×', fr: '7 nuits ×', de: '7 Nächte ×' },
    'det.book.included': { it: 'incluse',   en: 'included', fr: 'inclus',   de: 'inbegriffen' },
    'det.book.total':   { it: 'Totale settimana', en: 'Weekly total', fr: 'Total semaine', de: 'Wochentotal' },
    'det.book.month.giugno':     { it: 'Giugno',    en: 'June',      fr: 'Juin',      de: 'Juni' },
    'det.book.month.luglio':     { it: 'Luglio',    en: 'July',      fr: 'Juillet',   de: 'Juli' },
    'det.book.month.agosto':     { it: 'Agosto',    en: 'August',    fr: 'Août',      de: 'August' },
    'det.book.month.settembre':  { it: 'Settembre', en: 'September', fr: 'Septembre', de: 'September' },
    'det.book.cta':     { it: 'Richiedi disponibilità →', en: 'Check availability →', fr: 'Vérifier la disponibilité →', de: 'Verfügbarkeit anfragen →' },
    'det.book.note':    { it: 'Nessun pagamento adesso. Rispondiamo entro 24h.', en: 'No payment now. We reply within 24 hours.', fr: 'Aucun paiement maintenant. Nous répondons sous 24 heures.', de: 'Keine Zahlung jetzt. Wir antworten innerhalb von 24 Stunden.' },

    // -------- detail: availability widget (calendario iCal Airbnb) --------
    'det.avail.eyebrow': { it: 'Disponibilità', en: 'Availability', fr: 'Disponibilité', de: 'Verfügbarkeit' },
    'det.avail.h2': {
      it: 'Verifica <em>le date</em>.',
      en: 'Check <em>the dates</em>.',
      fr: 'Vérifiez <em>les dates</em>.',
      de: 'Termine <em>prüfen</em>.'
    },
    'det.avail.lede': {
      it: 'Il calendario si aggiorna in tempo reale dal nostro Airbnb. I giorni in scuro sono già occupati, quelli chiari sono liberi. Quando trovate le date giuste, scriveteci.',
      en: 'The calendar updates in real time from our Airbnb. Dark days are already booked, light ones are free. When you find the right dates, write to us.',
      fr: 'Le calendrier se met à jour en temps réel depuis notre Airbnb. Les jours en sombre sont déjà occupés, les clairs sont libres. Quand vous trouvez les bonnes dates, écrivez-nous.',
      de: 'Der Kalender wird in Echtzeit von unserem Airbnb aktualisiert. Dunkle Tage sind bereits belegt, helle frei. Wenn Sie die richtigen Termine gefunden haben, schreiben Sie uns.'
    },
    'det.avail.legend.free': { it: 'Disponibile', en: 'Available', fr: 'Disponible', de: 'Verfügbar' },
    'det.avail.legend.busy': { it: 'Occupato',    en: 'Booked',    fr: 'Réservé',   de: 'Belegt' },
    'det.avail.loading': {
      it: 'Carico le disponibilità…',
      en: 'Loading availability…',
      fr: 'Chargement des disponibilités…',
      de: 'Verfügbarkeit wird geladen…'
    },
    'det.avail.error': {
      it: 'Non riesco a caricare il calendario in questo momento. Scriveteci, vi confermiamo noi le date.',
      en: "Can't load the calendar right now. Write to us — we'll confirm the dates directly.",
      fr: 'Impossible de charger le calendrier pour le moment. Écrivez-nous, nous confirmerons les dates directement.',
      de: 'Der Kalender lässt sich gerade nicht laden. Schreiben Sie uns — wir bestätigen die Termine direkt.'
    },
    'det.avail.prev': { it: 'Mese precedente', en: 'Previous month', fr: 'Mois précédent', de: 'Vormonat' },
    'det.avail.next': { it: 'Mese successivo', en: 'Next month',     fr: 'Mois suivant',   de: 'Folgemonat' },
    'det.avail.cta':  { it: 'Scriveteci per prenotare', en: 'Write to book', fr: 'Écrivez pour réserver', de: 'Schreiben zum Buchen' },
    'det.dintorni.eyebrow': { it: 'Dintorni', en: 'Nearby', fr: 'Aux alentours', de: 'In der Nähe' },
    'det.dintorni.cta':     { it: 'Scopri di più', en: 'Find out more', fr: 'En savoir plus', de: 'Mehr erfahren' },
    'det.dintorni.stintino_h2': {
      it: 'Intorno alla <em>Villa</em>.',
      en: 'Around the <em>Villa</em>.',
      fr: 'Autour de la <em>Villa</em>.',
      de: 'Rund um die <em>Villa</em>.'
    },
    'det.dintorni.stintino_lede': {
      it: 'Sei posti a portata di piede, barca o breve auto. Spiagge, parco, storia e cucina del nord-ovest.',
      en: 'Six places within walking, boat or short-drive distance. Beaches, park, history and the food of the north-west.',
      fr: 'Six lieux accessibles à pied, en bateau ou en voiture. Plages, parc, histoire et cuisine du nord-ouest.',
      de: 'Sechs Orte, zu Fuß, per Boot oder mit dem Auto erreichbar. Strände, Park, Geschichte und Küche des Nordwestens.'
    },
    'det.dintorni.alghero_h2': {
      it: 'Intorno all\'<em>Appartamento</em>.',
      en: 'Around the <em>Apartment</em>.',
      fr: 'Autour de l\'<em>Appartement</em>.',
      de: 'Rund um die <em>Wohnung</em>.'
    },
    'det.dintorni.alghero_lede': {
      it: 'Sei posti tra il centro catalano, le spiagge della Riviera del Corallo e la scogliera di Capo Caccia.',
      en: 'Six places between the Catalan old town, the beaches of the Coral Riviera and the Capo Caccia cliffs.',
      fr: 'Six lieux entre le centre catalan, les plages de la Riviera du Corail et les falaises de Capo Caccia.',
      de: 'Sechs Orte zwischen der katalanischen Altstadt, den Stränden der Korallenriviera und den Klippen von Capo Caccia.'
    },
    'det.guide.eyebrow': { it: 'Guida locale',  en: 'Local guide',   fr: 'Guide local',    de: 'Lokaler Guide' },
    'det.guide.stintino_h2': {
      it: 'La nostra <em>guida</em> di Stintino.',
      en: 'Our <em>guide</em> to Stintino.',
      fr: 'Notre <em>guide</em> de Stintino.',
      de: 'Unser <em>Guide</em> für Stintino.'
    },
    'det.guide.stintino_lede': {
      it: 'I posti che consigliamo agli ospiti: dove si mangia bene, cosa fare vicino e i servizi utili del borgo.',
      en: 'The places we recommend to our guests: good food, things to do nearby, and useful services in the village.',
      fr: 'Les endroits que nous recommandons : où bien manger, quoi faire à proximité et les services utiles du village.',
      de: 'Was wir unseren Gästen empfehlen: gutes Essen, was man in der Nähe unternehmen kann und nützliche Dienste im Ort.'
    },
    'det.guide.alghero_h2': {
      it: 'La nostra <em>guida</em> di Alghero.',
      en: 'Our <em>guide</em> to Alghero.',
      fr: 'Notre <em>guide</em> d\'Alghero.',
      de: 'Unser <em>Guide</em> für Alghero.'
    },
    'det.guide.alghero_lede': {
      it: 'I posti che consigliamo agli ospiti: ristoranti del centro, escursioni sulla Riviera del Corallo, servizi utili a portata di mano.',
      en: 'The places we recommend: restaurants in the old town, excursions along the Coral Riviera, useful services close at hand.',
      fr: 'Nos recommandations : restaurants du centre, excursions sur la Riviera du Corail, services utiles à portée de main.',
      de: 'Unsere Empfehlungen: Restaurants in der Altstadt, Ausflüge entlang der Korallenriviera, nützliche Dienste in der Nähe.'
    },
    'det.guide.card.eat':        { it: 'Dove mangiare', en: 'Where to eat', fr: 'Où manger',      de: 'Wo essen' },
    'det.guide.card.excursions': { it: 'Escursioni',    en: 'Excursions',   fr: 'Excursions',     de: 'Ausflüge' },
    'det.guide.card.services':   { it: 'Servizi utili', en: 'Useful services', fr: 'Services utiles', de: 'Nützliche Dienste' },
    'det.guide.note': {
      it: 'Avete un posto preferito che qui non trovate? <a href="/contatti">Scriveteci</a> — lo aggiungiamo volentieri.',
      en: 'Got a favourite spot that\'s not on the list? <a href="/contatti">Write to us</a> — we\'ll gladly add it.',
      fr: 'Un endroit préféré qui n\'est pas ici ? <a href="/contatti">Écrivez-nous</a> — on l\'ajoute volontiers.',
      de: 'Haben Sie einen Lieblingsort, der hier fehlt? <a href="/contatti">Schreiben Sie uns</a> — wir fügen ihn gern hinzu.'
    },
    'det.guide.link_aria': { it: 'apri in nuova scheda', en: 'open in a new tab', fr: 'ouvrir dans un nouvel onglet', de: 'in neuem Tab öffnen' },
    'det.other': { it: "L'altra casa", en: 'The other house', fr: "L'autre maison", de: 'Das andere Haus' },
    'det.breadcrumb_aria': { it: 'Percorso', en: 'Breadcrumb', fr: "Fil d'Ariane", de: 'Navigationspfad' },

    // Luogo (pagine interne di approfondimento POI)
    'luogo.links.eyebrow': { it: 'Approfondisci', en: 'Go deeper', fr: 'Pour aller plus loin', de: 'Mehr erfahren' },
    'luogo.links.h2':      { it: 'Link utili e risorse ufficiali', en: 'Useful links and official resources', fr: 'Liens utiles et ressources officielles', de: 'Nützliche Links und offizielle Quellen' },
    'luogo.link.booking':  { it: 'Prenota le escursioni', en: 'Book the tours', fr: 'Réserver les excursions', de: 'Touren buchen' },
    'luogo.link.diving':   { it: 'Prenota le immersioni', en: 'Book diving', fr: 'Réserver la plongée', de: 'Tauchen buchen' },
    'luogo.link.windsurf': { it: 'Noleggio windsurf', en: 'Windsurf rental', fr: 'Location de planche à voile', de: 'Windsurf-Verleih' },
    'luogo.link.official': { it: 'Sito ufficiale',    en: 'Official website', fr: 'Site officiel',  de: 'Offizielle Website' },
    'luogo.link.wiki':     { it: 'Wikipedia',         en: 'Wikipedia',        fr: 'Wikipédia',       de: 'Wikipedia' },
    'luogo.link.gmaps':    { it: 'Indicazioni stradali', en: 'Directions',    fr: 'Itinéraire',      de: 'Wegbeschreibung' },
    'luogo.back.small':    { it: 'Torna alla casa · ', en: 'Back to the house · ', fr: 'Retour à la maison · ', de: 'Zurück zum Haus · ' },
    'luogo.related.eyebrow': { it: 'La selezione', en: 'The selection', fr: 'La sélection', de: 'Die Auswahl' },
    'luogo.related.h2':      { it: 'Tutte le pagine selezionate', en: 'All selected pages', fr: 'Toutes les pages sélectionnées', de: 'Alle ausgewählten Seiten' },
    'luogo.placeholder.eyebrow': { it: 'In arrivo', en: 'Coming soon', fr: 'À venir', de: 'Demnächst' },

    'ui.back_to_top': { it: 'Torna su', en: 'Back to top', fr: 'Retour en haut', de: 'Nach oben' },
    'ui.wa.label':    { it: 'WhatsApp', en: 'WhatsApp',  fr: 'WhatsApp',       de: 'WhatsApp' },
    'ui.hover_cue_open': { it: 'Apri →', en: 'Open →', fr: 'Ouvrir →', de: 'Öffnen →' },
    'ui.wa.msg_home': {
      it: "Buongiorno, vorrei informazioni sulle vostre case in Sardegna.",
      en: 'Hello, I\'d like some information about your houses in Sardinia.',
      fr: 'Bonjour, je souhaiterais des informations sur vos maisons en Sardaigne.',
      de: 'Guten Tag, ich hätte gerne Informationen zu Ihren Häusern auf Sardinien.'
    },
    'ui.wa.msg_stintino': {
      it: "Buongiorno, vorrei informazioni su Villa La Mimosa.",
      en: 'Hello, I\'d like information about Villa La Mimosa.',
      fr: 'Bonjour, je souhaiterais des informations sur Villa La Mimosa.',
      de: 'Guten Tag, ich hätte gerne Informationen zu Villa La Mimosa.'
    },
    'ui.wa.msg_alghero': {
      it: "Buongiorno, vorrei informazioni su La Porta del Lido ad Alghero.",
      en: "Hello, I'd like information about La Porta del Lido in Alghero.",
      fr: "Bonjour, je souhaiterais des informations sur La Porta del Lido à Alghero.",
      de: 'Guten Tag, ich hätte gerne Informationen zu La Porta del Lido in Alghero.'
    },
    'det.places.eyebrow': { it: 'Luoghi da vedere', en: 'Places to see', fr: 'Lieux à voir', de: 'Sehenswertes' },
    'det.places.stintino_h2': { it: 'Un giro <em>intorno</em>.', en: 'A look <em>around</em>.', fr: 'Un tour <em>alentour</em>.', de: 'Ein Blick <em>ringsum</em>.' },
    'det.places.alghero_h2':  { it: 'Spiagge e <em>posti</em> vicini.', en: 'Beaches and <em>spots</em> nearby.', fr: 'Plages et <em>lieux</em> à proximité.', de: 'Strände und <em>Orte</em> in der Nähe.' },
    'det.places.lede': {
      it: 'Scorri per vedere. Click sulla foto per aprire le indicazioni stradali.',
      en: 'Scroll to browse. Click a photo to open driving directions.',
      fr: "Faites défiler. Cliquez sur une photo pour ouvrir l'itinéraire.",
      de: 'Zum Stöbern scrollen. Klick auf ein Foto öffnet die Wegbeschreibung.'
    },
    'det.places.openmap':  { it: 'Apri su Google Maps →', en: 'Open in Google Maps →', fr: 'Ouvrir dans Google Maps →', de: 'In Google Maps öffnen →' },
    'det.places.moreinfo': { it: 'Scopri di più →',       en: 'Learn more →',         fr: 'En savoir plus →',          de: 'Mehr erfahren →' },
    'det.map.info':        { it: 'Approfondimento',       en: 'Learn more',           fr: 'En savoir plus',            de: 'Mehr erfahren' },
    'det.map.eyebrow':   { it: 'Sulla mappa', en: 'On the map', fr: 'Sur la carte', de: 'Auf der Karte' },
    'det.map.stintino_h2': { it: 'La <em>casa</em> e i dintorni.', en: 'The <em>house</em> and the area.', fr: 'La <em>maison</em> et les environs.', de: 'Das <em>Haus</em> und die Umgebung.' },
    'det.map.alghero_h2':  { it: 'L\'<em>appartamento</em> e i dintorni.', en: 'The <em>apartment</em> and the area.', fr: "L'<em>appartement</em> et les environs.", de: 'Die <em>Wohnung</em> und die Umgebung.' },
    'det.map.lede': {
      it: 'Click su un pin per nome, descrizione e indicazioni stradali.',
      en: 'Click a pin for name, description and driving directions.',
      fr: 'Cliquez sur un repère pour le nom, la description et l\'itinéraire.',
      de: 'Klicken Sie auf einen Pin für Name, Beschreibung und Wegbeschreibung.'
    },
    'det.map.here': { it: 'Siamo qui', en: 'We are here', fr: 'Nous sommes ici', de: 'Wir sind hier' },
    'det.map.approx': {
      it: 'Pin sulla mappa indicativo. L\'indirizzo esatto è riportato in alto.',
      en: 'The map pin is approximate. The exact address is shown above.',
      fr: "L'épingle sur la carte est indicative. L'adresse exacte figure plus haut.",
      de: 'Pin auf der Karte ist nur ungefähr. Die genaue Adresse steht oben.'
    },
    'det.map.directions': { it: 'Indicazioni', en: 'Directions', fr: 'Itinéraire', de: 'Wegbeschreibung' },
    'det.map.open_gmaps': { it: 'Apri in Google Maps', en: 'Open in Google Maps', fr: 'Ouvrir dans Google Maps', de: 'In Google Maps öffnen' },
    'det.map.wiki':       { it: 'Wikipedia', en: 'Wikipedia', fr: 'Wikipédia', de: 'Wikipedia' },
    'det.share':           { it: 'Condividi',        en: 'Share',            fr: 'Partager',         de: 'Teilen' },
    'det.share.copied':    { it: 'Link copiato',     en: 'Link copied',      fr: 'Lien copié',       de: 'Link kopiert' },
    'det.share.fail':      { it: 'Copia non riuscita', en: 'Copy failed',    fr: 'Copie échouée',    de: 'Kopieren fehlgeschlagen' },
    'contact.email.copy':    { it: 'Clicca per copiare',  en: 'Click to copy', fr: 'Cliquez pour copier', de: 'Zum Kopieren klicken' },
    'contact.email.copied':  { it: 'Email copiata',       en: 'Email copied',  fr: 'E-mail copié',        de: 'E-Mail kopiert' },

    // -------- cosa è incluso --------
    'inc.eyebrow': { it: 'Cosa è incluso', en: "What's included", fr: 'Ce qui est inclus', de: 'Inbegriffene Leistungen' },
    'inc.h1': {
      it: 'Il prezzo è <em>quello che vedete</em>.',
      en: 'The price is <em>what you see</em>.',
      fr: 'Le prix, <em>c\'est celui que vous voyez</em>.',
      de: 'Der Preis ist <em>der, den Sie sehen</em>.'
    },
    'inc.lede': {
      it: "Tutto quello che trovate sotto è compreso. Niente supplementi per WiFi, aria condizionata o utenze. Solo la tassa di soggiorno si salda all'arrivo.",
      en: 'Everything below is included. No extras for WiFi, air conditioning or utilities. Only the tourist tax is paid on arrival.',
      fr: 'Tout ce qui figure ci-dessous est compris. Aucun supplément pour le WiFi, la climatisation ou les charges. Seule la taxe de séjour est réglée à l\'arrivée.',
      de: 'Alles, was Sie unten finden, ist enthalten. Keine Zuschläge für WLAN, Klimaanlage oder Nebenkosten. Nur die Kurtaxe wird bei der Ankunft bezahlt.'
    },
    'inc.badge.included':  { it: 'Incluso',     en: 'Included',   fr: 'Inclus',     de: 'Inbegriffen' },
    'inc.badge.onrequest': { it: 'Su richiesta', en: 'On request', fr: 'Sur demande', de: 'Auf Anfrage' },
    'inc.notinc.eyebrow':  { it: 'Cosa non è incluso', en: "What's not included", fr: 'Ce qui n\'est pas inclus', de: 'Nicht inbegriffen' },
    'inc.notinc.h2': {
      it: 'Solo poche cose, <em>dette chiare</em>.',
      en: 'Just a few things, <em>stated plainly</em>.',
      fr: 'Peu de choses, <em>dites clairement</em>.',
      de: 'Nur ein paar Dinge, <em>klar benannt</em>.'
    },
    'inc.notinc.body1': {
      it: 'La tassa di soggiorno comunale, che varia di pochi euro a persona per notte ed è fissata dal Comune. Le vostre consumazioni personali, ovviamente — noi lasciamo un benvenuto base, ma la spesa la fate voi.',
      en: 'The municipal tourist tax, a few euros per person per night, set by the town hall. Your own groceries, of course — we leave a small welcome basket, but the shopping is yours.',
      fr: 'La taxe de séjour communale, quelques euros par personne et par nuit, fixée par la mairie. Vos consommations personnelles, bien entendu — nous laissons un petit panier d\'accueil, mais les courses sont à votre charge.',
      de: 'Die kommunale Kurtaxe, einige Euro pro Person und Nacht, festgelegt von der Gemeinde. Ihre persönlichen Einkäufe natürlich — wir lassen einen kleinen Willkommensgruß da, den Einkauf übernehmen Sie.'
    },
    'inc.notinc.body2': {
      it: "Niente costi nascosti su WiFi, aria condizionata o utenze. Nessuna piattaforma terza che aggiunge percentuali.",
      en: 'No hidden costs for WiFi, air conditioning or utilities. No third-party platforms adding fees.',
      fr: 'Aucun coût caché pour le WiFi, la climatisation ou les charges. Aucune plateforme tierce qui ajoute des pourcentages.',
      de: 'Keine versteckten Kosten für WLAN, Klimaanlage oder Nebenkosten. Keine Drittanbieter-Plattformen, die Gebühren hinzufügen.'
    },

    // -------- chi siamo --------
    'about.eyebrow': { it: 'Chi siamo', en: 'About us', fr: 'À propos', de: 'Über uns' },
    'about.h1': {
      it: 'Due case, <em>una famiglia</em>, la stessa Sardegna.',
      en: 'Two houses, <em>one family</em>, the same Sardinia.',
      fr: 'Deux maisons, <em>une famille</em>, la même Sardaigne.',
      de: 'Zwei Häuser, <em>eine Familie</em>, dasselbe Sardinien.'
    },
    'about.lede1': {
      it: "Siamo una famiglia sarda. Le nostre due case — la villa di Stintino, l'appartamento di Alghero — sono posti dove abbiamo passato le estati, gli inverni di passaggio, i pranzi della domenica. A un certo punto abbiamo deciso di aprirle agli ospiti, perché stavano vuote troppi mesi all'anno e perché ci piaceva l'idea che qualcun altro le vivesse.",
      en: 'We are a Sardinian family. Our two houses — the villa in Stintino, the apartment in Alghero — are places where we\'ve spent our summers, our stop-over winters, our Sunday lunches. At some point we decided to open them up to guests, because they sat empty too many months a year and we liked the idea of someone else living in them.',
      fr: 'Nous sommes une famille sarde. Nos deux maisons — la villa de Stintino, l\'appartement d\'Alghero — sont des lieux où nous avons passé nos étés, nos hivers de passage, nos déjeuners du dimanche. À un moment donné, nous avons décidé de les ouvrir aux hôtes, parce qu\'elles restaient vides trop de mois par an et que l\'idée que d\'autres y vivent nous plaisait.',
      de: 'Wir sind eine sardische Familie. Unsere beiden Häuser — die Villa in Stintino, die Wohnung in Alghero — sind Orte, an denen wir unsere Sommer, unsere kurzen Winteraufenthalte, unsere Sonntagsessen verbracht haben. Irgendwann beschlossen wir, sie für Gäste zu öffnen, weil sie zu viele Monate im Jahr leer standen — und weil uns die Vorstellung gefiel, dass jemand anderes sie bewohnt.'
    },
    'about.img_alt': { it: 'La Pelosa al mattino', en: 'La Pelosa in the morning', fr: 'La Pelosa au matin', de: 'La Pelosa am Morgen' },
    'about.body1': {
      it: "Le case le teniamo noi. Rispondiamo noi ai messaggi, prepariamo tutto per il vostro arrivo — le chiavi le trovate nella cassetta di sicurezza, così vi sistemate quando volete senza attese — e quando c'è da sistemare qualcosa non chiamiamo una gestione: ci pensiamo. Questa è la differenza che sentite quando ci scrivete — e che speriamo si senta anche una volta arrivati.",
      en: 'We look after the houses ourselves. We reply to messages, we get everything ready for your arrival — you\'ll find the keys in a secure key safe, so you can settle in whenever you like with no waiting — and when something needs fixing we don\'t call a management company: we do it. That\'s the difference you notice when you write to us, and one we hope you\'ll feel once you arrive.',
      fr: 'Nous nous occupons nous-mêmes des maisons. Nous répondons aux messages, nous préparons tout pour votre arrivée — vous trouvez les clés dans une boîte sécurisée, vous vous installez ainsi quand vous voulez sans attendre — et quand il faut réparer quelque chose, nous n\'appelons pas de gestionnaire : nous le faisons. C\'est la différence que vous sentez quand vous nous écrivez — et que nous espérons vous faire sentir une fois arrivés.',
      de: 'Wir kümmern uns selbst um die Häuser. Wir antworten auf Nachrichten, bereiten alles für Ihre Ankunft vor — die Schlüssel finden Sie in einer Schlüsselbox, so ziehen Sie ein, wann Sie möchten, ohne zu warten — und wenn etwas zu reparieren ist, rufen wir keine Verwaltung an: wir machen es. Das ist der Unterschied, den Sie spüren, wenn Sie uns schreiben — und den Sie hoffentlich auch spüren, wenn Sie angekommen sind.'
    },
    'about.body2': {
      it: 'Non abbiamo grandi piani di espansione. Due case sono quello che riusciamo a curare davvero, e ci va bene così. Quello che proviamo a dare è una Sardegna onesta: la Pelosa da una parte, il centro catalano dall\'altra, e la possibilità di viverli senza l\'ansia della prenotazione massiva.',
      en: 'We have no grand plans to expand. Two houses is what we can look after properly, and we\'re fine with that. What we try to offer is an honest Sardinia: La Pelosa on one side, the Catalan old town on the other, and the chance to enjoy them without the pressure of mass bookings.',
      fr: 'Nous n\'avons pas de grands projets d\'expansion. Deux maisons, c\'est ce que nous arrivons à vraiment bien tenir, et cela nous convient. Ce que nous essayons d\'offrir, c\'est une Sardaigne honnête : La Pelosa d\'un côté, le centre catalan de l\'autre, et la possibilité d\'en profiter sans l\'angoisse de la réservation de masse.',
      de: 'Wir haben keine großen Expansionspläne. Zwei Häuser sind das, was wir wirklich gut betreuen können, und das passt uns so. Was wir anbieten möchten, ist ein ehrliches Sardinien: La Pelosa auf der einen Seite, die katalanische Altstadt auf der anderen — und die Möglichkeit, sie ohne Massenbuchungs-Stress zu erleben.'
    },
    'about.body3': {
      it: 'Se state pensando a una settimana da noi, scriveteci. Ci sentiamo direttamente, senza moduli automatici.',
      en: 'If you\'re thinking of spending a week with us, just write. We\'ll talk directly — no automated forms.',
      fr: 'Si vous pensez à une semaine chez nous, écrivez-nous. Nous nous parlons directement, sans formulaire automatique.',
      de: 'Wenn Sie an eine Woche bei uns denken, schreiben Sie uns einfach. Wir sprechen direkt miteinander — keine automatischen Formulare.'
    },
    'about.cta.eyebrow': { it: 'Scriveteci', en: 'Write to us', fr: 'Écrivez-nous', de: 'Schreiben Sie uns' },
    'about.cta.h2': {
      it: 'Una domanda, <em>una data</em>, una curiosità.',
      en: 'A question, <em>a date</em>, a curiosity.',
      fr: 'Une question, <em>une date</em>, une curiosité.',
      de: 'Eine Frage, <em>ein Datum</em>, eine Neugier.'
    },
    'about.cta.lede': {
      it: 'Rispondiamo noi, entro ventiquattro ore. In italiano, inglese, francese o tedesco, come preferite.',
      en: 'We reply personally, within twenty-four hours. In Italian, English, French or German — whichever you prefer.',
      fr: 'Nous répondons nous-mêmes, en vingt-quatre heures. En italien, anglais, français ou allemand, comme vous préférez.',
      de: 'Wir antworten persönlich, innerhalb von vierundzwanzig Stunden. Auf Italienisch, Englisch, Französisch oder Deutsch — wie Sie möchten.'
    },

    // -------- contatti --------
    'contact.eyebrow': { it: 'Contatti', en: 'Contact', fr: 'Contact', de: 'Kontakt' },
    'contact.h1': {
      it: 'Raccontateci il <em>vostro</em> viaggio.',
      en: 'Tell us about <em>your</em> trip.',
      fr: 'Racontez-nous <em>votre</em> voyage.',
      de: 'Erzählen Sie uns von <em>Ihrer</em> Reise.'
    },
    'contact.lede': {
      it: 'Un modulo rapido o una mail diretta. Rispondiamo noi, entro ventiquattro ore, in italiano, inglese, francese o tedesco.',
      en: 'A quick form or a direct email. We reply personally, within twenty-four hours, in Italian, English, French or German.',
      fr: 'Un formulaire rapide ou un e-mail direct. Nous répondons nous-mêmes, en vingt-quatre heures, en italien, anglais, français ou allemand.',
      de: 'Ein kurzes Formular oder eine direkte E-Mail. Wir antworten persönlich innerhalb von vierundzwanzig Stunden — auf Italienisch, Englisch, Französisch oder Deutsch.'
    },
    'contact.side.email':      { it: 'Email', en: 'Email', fr: 'E-mail', de: 'E-Mail' },
    'contact.side.email_sub':  { it: 'Per disponibilità, preventivi e domande.', en: 'For availability, quotes and questions.', fr: 'Pour la disponibilité, les devis et les questions.', de: 'Für Verfügbarkeit, Angebote und Fragen.' },
    'contact.side.where':      { it: 'Dove',  en: 'Where', fr: 'Où',    de: 'Wo' },
    'contact.side.where_val':  { it: 'Sardegna, Italia', en: 'Sardinia, Italy', fr: 'Sardaigne, Italie', de: 'Sardinien, Italien' },
    'contact.side.where_sub':  { it: 'Stintino (SS) · Alghero (SS)', en: 'Stintino (SS) · Alghero (SS)', fr: 'Stintino (SS) · Alghero (SS)', de: 'Stintino (SS) · Alghero (SS)' },
    'contact.side.languages':  { it: 'Lingue', en: 'Languages', fr: 'Langues', de: 'Sprachen' },
    'contact.side.languages_sub': { it: 'Scriveteci nella lingua che preferite.', en: 'Write to us in the language you prefer.', fr: 'Écrivez-nous dans la langue de votre choix.', de: 'Schreiben Sie uns in der Sprache, die Sie bevorzugen.' },
    'contact.form.name':       { it: 'Nome e cognome', en: 'Full name', fr: 'Nom et prénom', de: 'Vor- und Nachname' },
    'contact.form.phone':      { it: 'Telefono (opzionale)', en: 'Phone (optional)', fr: 'Téléphone (facultatif)', de: 'Telefon (optional)' },
    'contact.form.guests':     { it: 'N. ospiti', en: 'Number of guests', fr: "Nombre d'hôtes", de: 'Anzahl der Gäste' },
    'contact.form.house':      { it: 'Casa di interesse', en: 'House of interest', fr: 'Maison qui vous intéresse', de: 'Gewünschtes Haus' },
    'contact.form.undecided':  { it: 'Non ho ancora deciso', en: 'Still deciding', fr: "Je n'ai pas encore choisi", de: 'Noch unentschieden' },
    'contact.form.both':       { it: 'Entrambe', en: 'Both', fr: 'Les deux', de: 'Beide' },
    'contact.form.arrival':    { it: 'Periodo (approssimativo)', en: 'Dates (approximate)', fr: 'Période (approximative)', de: 'Zeitraum (ungefähr)' },
    'contact.form.arrival_ph': { it: 'es. seconda settimana di luglio', en: 'e.g. second week of July', fr: 'ex : deuxième semaine de juillet', de: 'z. B. zweite Juliwoche' },
    'contact.form.duration':   { it: 'Durata', en: 'Duration', fr: 'Durée', de: 'Dauer' },
    'contact.form.duration_ph':{ it: 'es. 7 notti', en: 'e.g. 7 nights', fr: 'ex : 7 nuits', de: 'z. B. 7 Nächte' },
    'contact.form.message':    { it: 'Raccontateci qualcosa', en: 'Tell us a bit more', fr: 'Racontez-nous un peu', de: 'Erzählen Sie uns etwas' },
    'contact.form.message_ph': {
      it: 'Occasione, ospiti, esigenze particolari, cose che vi starebbero a cuore…',
      en: 'Occasion, guests, special needs, anything you care about…',
      fr: 'Occasion, hôtes, besoins particuliers, ce qui vous tient à cœur…',
      de: 'Anlass, Gäste, besondere Bedürfnisse, worauf Sie Wert legen…'
    },
    'contact.form.submit':     { it: 'Inviare la richiesta →', en: 'Send request →', fr: 'Envoyer la demande →', de: 'Anfrage senden →' },
    'contact.form.sending':    { it: 'Invio in corso…', en: 'Sending…', fr: 'Envoi en cours…', de: 'Wird gesendet…' },
    'contact.form.success': {
      it: 'Grazie! Abbiamo ricevuto la richiesta — vi rispondiamo entro 24 ore.',
      en: "Thank you! We've received your request — we'll reply within 24 hours.",
      fr: 'Merci ! Nous avons reçu votre demande — réponse sous 24 heures.',
      de: 'Vielen Dank! Wir haben Ihre Anfrage erhalten — Antwort innerhalb von 24 Stunden.'
    },
    'contact.form.error': {
      it: 'Qualcosa è andato storto. Riprovate tra poco o scriveteci a cosmoalghero@gmail.com.',
      en: "Something went wrong. Please try again shortly or write to cosmoalghero@gmail.com.",
      fr: "Une erreur s'est produite. Réessayez sous peu ou écrivez à cosmoalghero@gmail.com.",
      de: 'Etwas ist schiefgelaufen. Versuchen Sie es gleich erneut oder schreiben Sie an cosmoalghero@gmail.com.'
    },
    'contact.form.privacy_notice': {
      it: "Inviando il modulo dichiari di aver letto l'",
      en: 'By submitting this form you confirm you have read the ',
      fr: "En envoyant ce formulaire, vous déclarez avoir lu l'",
      de: 'Durch das Absenden bestätigen Sie, die '
    },
    'contact.form.privacy_link': {
      it: 'informativa sul trattamento dei dati',
      en: 'privacy policy',
      fr: 'politique de confidentialité',
      de: 'Datenschutzerklärung gelesen zu haben'
    },
    'contact.faq.eyebrow':     { it: 'FAQ', en: 'FAQ', fr: 'FAQ', de: 'FAQ' },
    'contact.faq.h2': {
      it: 'Le domande <em>ricorrenti</em>.',
      en: 'The <em>recurring</em> questions.',
      fr: 'Les questions <em>récurrentes</em>.',
      de: 'Die <em>häufigen</em> Fragen.'
    },
    'contact.faq.lede': {
      it: 'Sei domande che ci fanno quasi tutti, con risposte non generiche.',
      en: "Six questions almost everyone asks us — with answers that aren't generic.",
      fr: 'Six questions que presque tous nous posent — avec des réponses qui ne sont pas génériques.',
      de: 'Sechs Fragen, die uns fast alle stellen — mit Antworten, die nicht allgemein gehalten sind.'
    },

    // -------- 404 --------
    'nf.eyebrow': { it: '404', en: '404', fr: '404', de: '404' },
    'nf.h1': {
      it: 'Pagina non <em>trovata</em>.',
      en: 'Page <em>not found</em>.',
      fr: 'Page <em>introuvable</em>.',
      de: 'Seite <em>nicht gefunden</em>.'
    },
    'nf.lede': {
      it: 'Il link che avete seguito non corrisponde a niente di nostro. Può capitare. Tornate alla home, alle nostre case, oppure scriveteci e vi rispondiamo noi.',
      en: 'The link you followed doesn\'t match anything of ours. These things happen. Head back home, to our houses — or just write to us and we\'ll reply.',
      fr: 'Le lien que vous avez suivi ne correspond à rien chez nous. Cela peut arriver. Revenez à l\'accueil, à nos maisons, ou écrivez-nous et nous vous répondons.',
      de: 'Der Link, dem Sie gefolgt sind, passt zu nichts auf unserer Seite. Kommt vor. Zurück zur Startseite, zu unseren Häusern — oder schreiben Sie uns und wir antworten.'
    },
    'nf.cta.cases':   { it: 'Le nostre case →', en: 'Our houses →', fr: 'Nos maisons →', de: 'Unsere Häuser →' },
    'nf.cta.contact': { it: 'Scriverci →',      en: 'Write to us →', fr: 'Nous écrire →', de: 'Schreiben →' },

    // -------- privacy (header + nota multilingua) --------
    'priv.eyebrow': { it: 'Informativa legale', en: 'Legal notice', fr: 'Mentions légales', de: 'Rechtliche Hinweise' },
    'priv.h1': {
      it: 'Privacy Policy &amp; <em>Cookie Policy</em>',
      en: 'Privacy &amp; <em>Cookie Policy</em>',
      fr: 'Politique de Confidentialité &amp; <em>Cookies</em>',
      de: 'Datenschutz &amp; <em>Cookie-Richtlinie</em>'
    },
    'priv.lang_note': {
      it: '',
      en: 'The authoritative version of this policy is in Italian. The full legal text is kept in Italian for compliance reasons — if anything is unclear, write to cosmoalghero@gmail.com.',
      fr: 'La version faisant foi de cette politique est en italien. Le texte juridique complet est conservé en italien pour des raisons de conformité — pour toute question, écrivez à cosmoalghero@gmail.com.',
      de: 'Die verbindliche Fassung dieser Richtlinie ist auf Italienisch. Der vollständige Rechtstext wird aus Compliance-Gründen auf Italienisch gehalten — bei Fragen schreiben Sie an cosmoalghero@gmail.com.'
    },
    'priv.back': { it: '← Torna alla home', en: '← Back to home', fr: "← Retour à l'accueil", de: '← Zur Startseite' },

    // -------- SEO meta (per pagina, per lingua) --------
    // Home (index.html). Title in stile commerciale (keyword 'case vacanze',
    // 'Stintino', 'Alghero'); description ibrida — keyword presenti ma con
    // il tono editoriale-familiare del brand.
    'meta.title': {
      it: 'Le Porte di Sardegna — Affitto Case Vacanze a Stintino e Alghero',
      en: 'Le Porte di Sardegna — Holiday Homes for Rent in Stintino and Alghero, Sardinia',
      fr: 'Le Porte di Sardegna — Locations de Vacances à Stintino et Alghero, Sardaigne',
      de: 'Le Porte di Sardegna — Ferienhäuser zur Miete in Stintino und Alghero, Sardinien'
    },
    'meta.description': {
      it: "Due case vacanze in Sardegna gestite direttamente da una famiglia: Villa La Mimosa a cinque minuti in auto dalla Spiaggia della Pelosa (Stintino) e La Porta del Lido nel centro catalano di Alghero. Affitto diretto, senza intermediari. Giugno–Settembre.",
      en: 'Two holiday homes in Sardinia run directly by a family: Villa La Mimosa five minutes by car from La Pelosa beach (Stintino) and La Porta del Lido in the Catalan heart of Alghero. Direct rental, no middlemen. June–September.',
      fr: "Deux maisons de vacances en Sardaigne gérées directement par une famille : Villa La Mimosa à cinq minutes en voiture de la plage de La Pelosa (Stintino) et La Porta del Lido au cœur catalan d'Alghero. Location directe, sans intermédiaires. Juin–Septembre.",
      de: 'Zwei Ferienhäuser auf Sardinien, direkt von einer Familie geführt: Villa La Mimosa fünf Autominuten vom Strand La Pelosa (Stintino) und La Porta del Lido im katalanischen Zentrum von Alghero. Direktvermietung, ohne Mittelsmänner. Juni–September.'
    },
    'meta.og.title': {
      it: 'Le Porte di Sardegna — Affitto Case Vacanze a Stintino e Alghero',
      en: 'Le Porte di Sardegna — Holiday Homes for Rent in Stintino and Alghero, Sardinia',
      fr: 'Le Porte di Sardegna — Locations de Vacances à Stintino et Alghero, Sardaigne',
      de: 'Le Porte di Sardegna — Ferienhäuser zur Miete in Stintino und Alghero, Sardinien'
    },
    'meta.og.description': {
      it: 'Una villa con giardino a cinque minuti in auto dalla Pelosa, un appartamento nel centro catalano di Alghero. Gestite direttamente, senza intermediari. Giugno–Settembre.',
      en: 'A villa with garden five minutes by car from La Pelosa, an apartment in the Catalan heart of Alghero. Managed directly, no middlemen. June–September.',
      fr: "Une villa avec jardin à cinq minutes en voiture de La Pelosa, un appartement au cœur catalan d'Alghero. Gérées en direct, sans intermédiaires. Juin–Septembre.",
      de: 'Eine Villa mit Garten fünf Autominuten von La Pelosa, eine Wohnung im katalanischen Zentrum von Alghero. Direkt verwaltet, ohne Mittelsmänner. Juni–September.'
    },
    'meta.og.image_alt': {
      it: "La Pelosa, Stintino — Torre aragonese e barca a vela sull'acqua turchese",
      en: 'La Pelosa, Stintino — Aragonese tower and sailing boat on turquoise water',
      fr: 'La Pelosa, Stintino — tour aragonaise et voilier sur une eau turquoise',
      de: 'La Pelosa, Stintino — aragonesischer Turm und Segelboot auf türkisfarbenem Wasser'
    },
    'meta.og.locale': {
      it: 'it_IT', en: 'en_GB', fr: 'fr_FR', de: 'de_DE'
    },
    'meta.twitter.title': {
      it: 'Le Porte di Sardegna — Affitto Case Vacanze a Stintino e Alghero',
      en: 'Le Porte di Sardegna — Holiday Homes in Stintino and Alghero',
      fr: 'Le Porte di Sardegna — Locations de Vacances à Stintino et Alghero',
      de: 'Le Porte di Sardegna — Ferienhäuser in Stintino und Alghero'
    },
    'meta.twitter.description': {
      it: 'Villa La Mimosa a cinque minuti dalla Pelosa, La Porta del Lido nel centro catalano di Alghero. Due case vacanze in Sardegna, una famiglia.',
      en: 'Villa La Mimosa five minutes from La Pelosa, La Porta del Lido in the Catalan heart of Alghero. Two holiday homes in Sardinia, one family.',
      fr: "Villa La Mimosa à cinq minutes de La Pelosa, La Porta del Lido au cœur catalan d'Alghero. Deux maisons de vacances en Sardaigne, une famille.",
      de: 'Villa La Mimosa fünf Minuten von La Pelosa, La Porta del Lido im katalanischen Zentrum von Alghero. Zwei Ferienhäuser auf Sardinien, eine Familie.'
    },

    // Privacy (privacy.html)
    'meta.priv.title': {
      it: 'Privacy & Cookie Policy | Le Porte di Sardegna',
      en: 'Privacy & Cookie Policy | Le Porte di Sardegna',
      fr: 'Politique de Confidentialité & Cookies | Le Porte di Sardegna',
      de: 'Datenschutz & Cookie-Richtlinie | Le Porte di Sardegna'
    },
    'meta.priv.description': {
      it: "Informativa sulla privacy e sulla gestione dei cookie del sito Le Porte di Sardegna — affitti case vacanze in Sardegna.",
      en: 'Privacy and cookie policy for the Le Porte di Sardegna website — holiday rentals in Sardinia.',
      fr: "Politique de confidentialité et de cookies du site Le Porte di Sardegna — locations de vacances en Sardaigne.",
      de: 'Datenschutz- und Cookie-Richtlinie der Le Porte di Sardegna-Website — Ferienvermietungen auf Sardinien.'
    },

    // 404 (404.html)
    'meta.nf.title': {
      it: 'Pagina non trovata · Le Porte di Sardegna',
      en: 'Page not found · Le Porte di Sardegna',
      fr: 'Page introuvable · Le Porte di Sardegna',
      de: 'Seite nicht gefunden · Le Porte di Sardegna'
    },
    'meta.nf.description': {
      it: 'La pagina che cercavate non esiste o è stata spostata. Tornate alla home o alle nostre due case in Sardegna.',
      en: "The page you're looking for doesn't exist or has been moved. Head back home or to our two houses in Sardinia.",
      fr: 'La page que vous cherchez n\'existe pas ou a été déplacée. Revenez à l\'accueil ou à nos deux maisons en Sardaigne.',
      de: 'Die gesuchte Seite existiert nicht oder wurde verschoben. Zurück zur Startseite oder zu unseren beiden Häusern auf Sardinien.'
    },

    // -------- SEO: title + description per ogni route SPA --------
    'meta.route.case.title': {
      it: 'Le Nostre Case Vacanze in Sardegna — Stintino e Alghero | Le Porte di Sardegna',
      en: 'Our Holiday Homes in Sardinia — Stintino and Alghero | Le Porte di Sardegna',
      fr: 'Nos Maisons de Vacances en Sardaigne — Stintino et Alghero | Le Porte di Sardegna',
      de: 'Unsere Ferienhäuser auf Sardinien — Stintino und Alghero | Le Porte di Sardegna'
    },
    'meta.route.case.description': {
      it: 'Villa La Mimosa a Stintino (90 m², fino a 8 ospiti, 5 min in auto dalla Pelosa) e La Porta del Lido ad Alghero (70 m², fino a 6 ospiti, centro storico catalano). Due case vacanze, una sola famiglia che le gestisce.',
      en: 'Villa La Mimosa in Stintino (90 m², up to 8 guests, 5 min by car from La Pelosa) and La Porta del Lido in Alghero (70 m², up to 6 guests, Catalan old town). Two holiday homes, one family running them.',
      fr: "Villa La Mimosa à Stintino (90 m², jusqu'à 8 personnes, 5 min en voiture de La Pelosa) et La Porta del Lido à Alghero (70 m², jusqu'à 6 personnes, vieille ville catalane). Deux maisons de vacances, une seule famille qui les gère.",
      de: 'Villa La Mimosa in Stintino (90 m², bis zu 8 Gäste, 5 Autominuten von La Pelosa) und La Porta del Lido in Alghero (70 m², bis zu 6 Gäste, katalanische Altstadt). Zwei Ferienhäuser, eine Familie, die sie führt.'
    },
    'meta.route.stintino.title': {
      it: 'Villa La Mimosa — Casa Vacanze a Stintino vicino alla Pelosa | Le Porte di Sardegna',
      en: 'Villa La Mimosa — Holiday Home in Stintino near La Pelosa Beach | Le Porte di Sardegna',
      fr: 'Villa La Mimosa — Maison de Vacances à Stintino près de La Pelosa | Le Porte di Sardegna',
      de: 'Villa La Mimosa — Ferienhaus in Stintino in der Nähe von La Pelosa | Le Porte di Sardegna'
    },
    'meta.route.stintino.description': {
      it: 'Villa con giardino e veranda nel Villaggio Cala Lupo a Stintino, cinque minuti in auto dalla Spiaggia della Pelosa. Quattro camere, fino a otto ospiti, barbecue, parcheggio privato, aria condizionata. Affitto diretto giugno–settembre.',
      en: 'Villa with garden and veranda in Cala Lupo, Stintino, five minutes by car from La Pelosa beach. Four bedrooms, sleeps up to eight, BBQ, private parking, air conditioning. Direct rental June–September.',
      fr: "Villa avec jardin et véranda dans le hameau de Cala Lupo à Stintino, à cinq minutes en voiture de la plage de La Pelosa. Quatre chambres, jusqu'à huit personnes, barbecue, parking privé, climatisation. Location directe juin–septembre.",
      de: 'Villa mit Garten und Veranda im Weiler Cala Lupo in Stintino, fünf Autominuten vom Strand La Pelosa. Vier Schlafzimmer, bis zu acht Gäste, Grill, Privatparkplatz, Klimaanlage. Direktvermietung Juni–September.'
    },
    'meta.route.alghero.title': {
      it: 'La Porta del Lido — Appartamento Vacanze ad Alghero Centro | Le Porte di Sardegna',
      en: 'La Porta del Lido — Holiday Apartment in Alghero Old Town | Le Porte di Sardegna',
      fr: 'La Porta del Lido — Appartement de Vacances au Centre d\'Alghero | Le Porte di Sardegna',
      de: 'La Porta del Lido — Ferienwohnung im Zentrum von Alghero | Le Porte di Sardegna'
    },
    'meta.route.alghero.description': {
      it: 'Appartamento nel centro storico catalano di Alghero, a dieci minuti a piedi dal Lido e cinque dal centro. Due camere, fino a sei ospiti, balcone, aria condizionata. Casa vacanze ad Alghero in affitto diretto, giugno–settembre.',
      en: 'Apartment in the Catalan old town of Alghero, ten minutes on foot from the Lido and five from the centre. Two bedrooms, sleeps up to six, balcony, air conditioning. Holiday apartment in Alghero, direct rental, June–September.',
      fr: "Appartement dans la vieille ville catalane d'Alghero, à dix minutes à pied du Lido et cinq du centre. Deux chambres, jusqu'à six personnes, balcon, climatisation. Appartement de vacances à Alghero en location directe, juin–septembre.",
      de: 'Wohnung in der katalanischen Altstadt von Alghero, zehn Minuten zu Fuß vom Lido und fünf vom Zentrum. Zwei Schlafzimmer, bis zu sechs Gäste, Balkon, Klimaanlage. Ferienwohnung in Alghero zur Direktvermietung, Juni–September.'
    },
    'meta.route.incluso.title': {
      it: 'Cosa è Incluso — Servizi e Dotazioni delle Case Vacanze | Le Porte di Sardegna',
      en: 'What\'s Included — Services and Amenities of Our Holiday Homes | Le Porte di Sardegna',
      fr: 'Ce qui est Inclus — Services et Équipements des Maisons de Vacances | Le Porte di Sardegna',
      de: 'Was ist Inbegriffen — Leistungen und Ausstattung der Ferienhäuser | Le Porte di Sardegna'
    },
    'meta.route.incluso.description': {
      it: 'WiFi, aria condizionata, utenze: tutto quello che è compreso nel soggiorno alle nostre case vacanze in Sardegna. Niente costi nascosti, solo la tassa di soggiorno si salda a parte all\'arrivo.',
      en: 'WiFi, air conditioning, utilities: everything included in a stay at our holiday homes in Sardinia. No hidden costs — only the tourist tax is paid separately on arrival.',
      fr: "WiFi, climatisation, charges : tout ce qui est compris dans le séjour dans nos maisons de vacances en Sardaigne. Aucun coût caché, seule la taxe de séjour se règle à part à l'arrivée.",
      de: 'WLAN, Klimaanlage, Nebenkosten: alles, was im Aufenthalt in unseren Ferienhäusern auf Sardinien enthalten ist. Keine versteckten Kosten — nur die Kurtaxe wird bei der Ankunft separat bezahlt.'
    },
    'meta.route.chisiamo.title': {
      it: 'Chi Siamo — La Famiglia dietro Le Porte di Sardegna',
      en: 'About Us — The Family behind Le Porte di Sardegna',
      fr: 'À Propos — La Famille derrière Le Porte di Sardegna',
      de: 'Über Uns — Die Familie hinter Le Porte di Sardegna'
    },
    'meta.route.chisiamo.description': {
      it: 'Siamo una famiglia sarda che affitta direttamente le proprie case vacanze a Stintino e Alghero. Nessun intermediario. Risposta garantita entro 24 ore in italiano, inglese, francese e tedesco.',
      en: 'We are a Sardinian family renting our own holiday homes directly in Stintino and Alghero. No middlemen. Reply guaranteed within 24 hours in Italian, English, French and German.',
      fr: "Nous sommes une famille sarde qui loue directement ses propres maisons de vacances à Stintino et Alghero. Aucun intermédiaire. Réponse garantie sous 24 heures en italien, anglais, français et allemand.",
      de: 'Wir sind eine sardische Familie, die ihre eigenen Ferienhäuser in Stintino und Alghero direkt vermietet. Keine Mittelsmänner. Antwort garantiert innerhalb von 24 Stunden auf Italienisch, Englisch, Französisch und Deutsch.'
    },
    'meta.route.contatti.title': {
      it: 'Contatti e Prenotazioni — Le Porte di Sardegna | Stintino e Alghero',
      en: 'Contact and Bookings — Le Porte di Sardegna | Stintino and Alghero',
      fr: 'Contact et Réservations — Le Porte di Sardegna | Stintino et Alghero',
      de: 'Kontakt und Buchungen — Le Porte di Sardegna | Stintino und Alghero'
    },
    'meta.route.contatti.description': {
      it: 'Contattaci per disponibilità e prenotazioni di Villa La Mimosa (Stintino) e La Porta del Lido (Alghero). Rispondiamo entro 24 ore in italiano, inglese, francese o tedesco — via email o WhatsApp.',
      en: 'Contact us for availability and bookings of Villa La Mimosa (Stintino) and La Porta del Lido (Alghero). We reply within 24 hours in Italian, English, French or German — via email or WhatsApp.',
      fr: 'Contactez-nous pour la disponibilité et les réservations de Villa La Mimosa (Stintino) et La Porta del Lido (Alghero). Réponse sous 24 heures en italien, anglais, français ou allemand — par e-mail ou WhatsApp.',
      de: 'Kontaktieren Sie uns für Verfügbarkeit und Buchungen von Villa La Mimosa (Stintino) und La Porta del Lido (Alghero). Antwort innerhalb von 24 Stunden auf Italienisch, Englisch, Französisch oder Deutsch — per E-Mail oder WhatsApp.'
    }
  };

  // ----------------------------------------------------------
  // core
  // ----------------------------------------------------------
  function detectLang() {
    // 1) prefisso nel percorso (/en/…)
    var pl = pathLang();
    if (pl) return pl;
    // 2) ?lang= (link vecchi): viene normalizzato subito in percorso
    try {
      var u = new URL(location.href);
      var q = u.searchParams.get('lang');
      if (q && LANGS.indexOf(q) >= 0) return q;
    } catch (_) {}
    return DEFAULT;
  }

  function t(val) {
    if (val == null) return '';
    if (typeof val === 'string') {
      // look up in DICT
      if (DICT[val]) return DICT[val][state.lang] || DICT[val][DEFAULT] || '';
      // not a dict key — return as-is (already localized or literal)
      return val;
    }
    if (typeof val === 'object') {
      return val[state.lang] || val[DEFAULT] || Object.values(val)[0] || '';
    }
    return '';
  }

  function translateDom(root) {
    root = root || document;
    var nodes = root.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!key) return;
      var val = t(key);
      if (el.tagName === 'TITLE') {
        el.textContent = val;
        document.title = val; // sincronizza tab title
      } else {
        // permette em/strong/a nei valori del dizionario
        el.innerHTML = val;
      }
    });
    // attributi: [data-i18n-attr="aria-label:key|title:key2"]
    var attrNodes = root.querySelectorAll('[data-i18n-attr]');
    attrNodes.forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr') || '';
      spec.split('|').forEach(function (pair) {
        var idx = pair.indexOf(':');
        if (idx < 0) return;
        var attr = pair.slice(0, idx).trim();
        var key  = pair.slice(idx + 1).trim();
        if (!attr || !key) return;
        el.setAttribute(attr, t(key));
      });
    });
  }

  // Lingue servite da un file separato (generato da tools/merge-lang.js).
  // index.html lo include solo sulle URL /xx/…; qui lo carichiamo al volo
  // quando l'utente cambia lingua dal pulsante.
  var PACKS = { es: 'lang-es.js' };
  function ensurePack(lang, cb) {
    var loaded = window.FH_LANG_LOADED || {};
    if (!PACKS[lang] || loaded[lang]) { cb(); return; }
    var s = document.createElement('script');
    s.src = PACKS[lang];
    s.onload = cb;
    s.onerror = cb; // meglio la pagina in italiano che nessuna pagina
    document.head.appendChild(s);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0 || lang === state.lang) return;
    if (PACKS[lang] && !(window.FH_LANG_LOADED && window.FH_LANG_LOADED[lang])) {
      ensurePack(lang, function () { setLang(lang); });
      return;
    }
    state.lang = lang;
    try { localStorage.setItem('fh.lang', lang); } catch (_) {}
    document.documentElement.setAttribute('lang', lang);
    try {
      history.replaceState(null, '', localizePath(location.pathname, lang) + searchWithoutLang() + location.hash);
    } catch (_) {}
    // aggiorna language switcher UI
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    // aggiorna codice lingua visibile (toggle dropdown mobile)
    document.querySelectorAll('[data-lang-current]').forEach(function (el) {
      el.textContent = lang.toUpperCase();
    });
    // ri-traduci DOM statico e riscrivi i link con il nuovo prefisso
    translateDom(document);
    localizeLinks(document);
    // ri-renderizza SPA
    if (window.FH_rerender) window.FH_rerender();
  }

  // 0) Pacchetti lingua caricati PRIMA di questo file (lang-xx.js via document.write
  //    in <head>): li uniamo al dizionario adesso.
  try {
    var packs = window.FH_LANG_PACKS || {};
    Object.keys(packs).forEach(function (lang) {
      var d = packs[lang].dict || {};
      Object.keys(d).forEach(function (k) {
        if (!DICT[k]) DICT[k] = {};
        DICT[k][lang] = d[k];
      });
    });
  } catch (_) {}

  // 1) Rileva lingua SUBITO al load del modulo — prima che app.js esegua renderRoute().
  //    Altrimenti il primo render userebbe 'it' e la pagina tornerebbe in IT al refresh.
  state.lang = detectLang();
  document.documentElement.setAttribute('lang', state.lang);
  // Normalizza la URL: ?lang=xx → /xx/…  (e toglie il parametro)
  try {
    if (pathLang() !== (state.lang === DEFAULT ? null : state.lang) || /[?&]lang=/.test(location.search)) {
      history.replaceState(null, '', localizePath(location.pathname, state.lang) + searchWithoutLang() + location.hash);
    }
  } catch (_) {}

  function init() {
    // DOM è pronto: traduci gli elementi statici (nav, footer) e aggancia eventi
    translateDom(document);
    localizeLinks(document);
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-lang-btn]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.getAttribute('data-lang-btn'));
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === state.lang);
    });
    document.querySelectorAll('[data-lang-current]').forEach(function (el) {
      el.textContent = state.lang.toUpperCase();
    });
  }

  window.FH_I18N = {
    get current() { return state.lang; },
    langs: LANGS,
    t: t,
    setLang: setLang,
    translateDom: translateDom,
    // Estensione del dizionario da file esterni (es. lang-es.js): { chiave: { es: '…' } }
    extend: function (patch) {
      Object.keys(patch || {}).forEach(function (k) {
        if (!DICT[k]) DICT[k] = {};
        Object.assign(DICT[k], patch[k]);
      });
    },
    dict: DICT,
    pathLang: pathLang,
    basePath: basePath,
    localizePath: localizePath,
    localizeLinks: localizeLinks
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
