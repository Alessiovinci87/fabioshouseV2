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

  var LANGS = ['it', 'en', 'fr', 'de'];
  var DEFAULT = 'it';
  var state = { lang: DEFAULT };

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
      it: 'Due case gestite da una famiglia: una villa a cinque minuti dalla Pelosa, un appartamento nel centro catalano di Alghero. La stessa cura in posti che non si somigliano.',
      en: "Two houses run by a family: a villa five minutes from La Pelosa, and an apartment in the Catalan heart of Alghero. The same care in two places that couldn't be more different.",
      fr: "Deux maisons tenues par une famille : une villa à cinq minutes de La Pelosa, un appartement dans le centre catalan d'Alghero. La même attention, dans deux endroits qui ne se ressemblent pas.",
      de: 'Zwei Häuser, geführt von einer Familie: eine Villa fünf Minuten von La Pelosa entfernt, eine Wohnung im katalanischen Zentrum von Alghero. Dieselbe Sorgfalt an zwei ganz unterschiedlichen Orten.'
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
      it: "Una famiglia che da qualche anno affitta le proprie due case sarde a chi vuole passare un'estate nel nord-ovest dell'isola. Rispondiamo noi ai messaggi, consegniamo noi le chiavi, e se serve qualcosa durante il soggiorno basta una telefonata.",
      en: "A family that, for a few years now, has been renting out its two Sardinian houses to people who want to spend a summer in the island's north-west. We reply to your messages, we hand over the keys, and if you need anything during your stay, a single phone call is enough.",
      fr: "Une famille qui, depuis quelques années, loue ses deux maisons sardes à ceux qui veulent passer un été dans le nord-ouest de l'île. C'est nous qui répondons aux messages, qui remettons les clés, et s'il vous faut quoi que ce soit pendant le séjour, un coup de fil suffit.",
      de: 'Eine Familie, die seit einigen Jahren ihre beiden sardischen Häuser an Gäste vermietet, die einen Sommer im Nordwesten der Insel verbringen möchten. Wir beantworten Ihre Nachrichten selbst, übergeben die Schlüssel persönlich, und wenn während des Aufenthalts etwas nötig ist, genügt ein Anruf.'
    },
    'home.how.pt1.h': { it: 'Due case, stessa mano',  en: 'Two houses, one pair of hands', fr: 'Deux maisons, une seule main', de: 'Zwei Häuser, eine Hand' },
    'home.how.pt1.t': {
      it: 'Le gestiamo noi, direttamente. Le chiavi le diamo noi, rispondiamo noi ai messaggi.',
      en: 'We manage them directly. We hand over the keys, we answer your messages.',
      fr: 'On les gère nous-mêmes. C\'est nous qui donnons les clés, qui répondons aux messages.',
      de: 'Wir verwalten sie selbst. Wir übergeben die Schlüssel, wir antworten auf Nachrichten.'
    },
    'home.how.pt2.h': { it: 'Sardegna vera', en: 'The real Sardinia', fr: 'La vraie Sardaigne', de: 'Echtes Sardinien' },
    'home.how.pt2.t': {
      it: 'Pelosa a piedi a Stintino, centro catalano ad Alghero. Due pezzi di isola diversi, entrambi autentici.',
      en: 'La Pelosa on foot from Stintino, the Catalan old town in Alghero. Two different corners of the island — both genuine.',
      fr: 'La Pelosa à pied depuis Stintino, le centre catalan à Alghero. Deux morceaux d\'île différents, tous deux authentiques.',
      de: 'La Pelosa zu Fuß von Stintino, die katalanische Altstadt in Alghero. Zwei ganz unterschiedliche Ecken der Insel — beide echt.'
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
      it: 'Biancheria, pulizie finali, WiFi in fibra, aria condizionata. Il prezzo sul sito è quello che pagate.',
      en: 'Linen, final cleaning, fibre WiFi, air conditioning. The price on the site is the price you pay.',
      fr: 'Linge, ménage final, WiFi fibre, climatisation. Le prix affiché est le prix payé.',
      de: 'Wäsche, Endreinigung, Glasfaser-WLAN, Klimaanlage. Der Preis auf der Seite ist der Preis, den Sie zahlen.'
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
      it: 'Una villa di novanta metri quadri a Stintino, cinque minuti a piedi dalla Pelosa. Un appartamento di settanta metri quadri nel centro storico di Alghero. Stessa cura, due vacanze molto diverse.',
      en: 'A ninety-square-metre villa in Stintino, five minutes on foot from La Pelosa. A seventy-square-metre apartment in the old town of Alghero. Same care, two very different holidays.',
      fr: 'Une villa de quatre-vingt-dix mètres carrés à Stintino, à cinq minutes à pied de La Pelosa. Un appartement de soixante-dix mètres carrés dans la vieille ville d\'Alghero. Même soin, deux vacances bien différentes.',
      de: 'Eine Villa mit neunzig Quadratmetern in Stintino, fünf Minuten zu Fuß von La Pelosa. Eine Wohnung mit siebzig Quadratmetern in der Altstadt von Alghero. Dieselbe Sorgfalt, zwei sehr unterschiedliche Urlaube.'
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
    'det.book.cleaning': { it: 'Pulizie finali', en: 'Final cleaning', fr: 'Ménage final', de: 'Endreinigung' },
    'det.book.included': { it: 'incluse',   en: 'included', fr: 'inclus',   de: 'inbegriffen' },
    'det.book.total':   { it: 'Totale settimana', en: 'Weekly total', fr: 'Total semaine', de: 'Wochentotal' },
    'det.book.month.giugno':     { it: 'Giugno',    en: 'June',      fr: 'Juin',      de: 'Juni' },
    'det.book.month.luglio':     { it: 'Luglio',    en: 'July',      fr: 'Juillet',   de: 'Juli' },
    'det.book.month.agosto':     { it: 'Agosto',    en: 'August',    fr: 'Août',      de: 'August' },
    'det.book.month.settembre':  { it: 'Settembre', en: 'September', fr: 'Septembre', de: 'September' },
    'det.book.cta':     { it: 'Richiedi disponibilità →', en: 'Check availability →', fr: 'Vérifier la disponibilité →', de: 'Verfügbarkeit anfragen →' },
    'det.book.note':    { it: 'Nessun pagamento adesso. Rispondiamo entro 24h.', en: 'No payment now. We reply within 24 hours.', fr: 'Aucun paiement maintenant. Nous répondons sous 24 heures.', de: 'Keine Zahlung jetzt. Wir antworten innerhalb von 24 Stunden.' },
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
      it: 'Avete un posto preferito che qui non trovate? <a href="#/contatti">Scriveteci</a> — lo aggiungiamo volentieri.',
      en: 'Got a favourite spot that\'s not on the list? <a href="#/contatti">Write to us</a> — we\'ll gladly add it.',
      fr: 'Un endroit préféré qui n\'est pas ici ? <a href="#/contatti">Écrivez-nous</a> — on l\'ajoute volontiers.',
      de: 'Haben Sie einen Lieblingsort, der hier fehlt? <a href="#/contatti">Schreiben Sie uns</a> — wir fügen ihn gern hinzu.'
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
      it: "Tutto quello che trovate sotto è compreso nella tariffa settimanale. Niente supplementi per biancheria, pulizie finali, WiFi, aria condizionata. Solo la tassa di soggiorno si salda all'arrivo.",
      en: 'Everything below is included in the weekly rate. No extras for linen, final cleaning, WiFi or air conditioning. Only the tourist tax is paid on arrival.',
      fr: 'Tout ce qui figure ci-dessous est compris dans le tarif hebdomadaire. Aucun supplément pour le linge, le ménage final, le WiFi ou la climatisation. Seule la taxe de séjour est réglée à l\'arrivée.',
      de: 'Alles, was Sie unten finden, ist im Wochenpreis enthalten. Keine Zuschläge für Wäsche, Endreinigung, WLAN oder Klimaanlage. Nur die Kurtaxe wird bei der Ankunft bezahlt.'
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
      it: 'La tassa di soggiorno comunale, che varia di pochi euro a persona per notte ed è fissata dal Comune. La cauzione rimborsabile alla partenza (trecento euro a Stintino, duecento ad Alghero). Le vostre consumazioni personali, ovviamente — noi lasciamo un benvenuto base, ma la spesa la fate voi.',
      en: 'The municipal tourist tax, a few euros per person per night, set by the town hall. The refundable deposit, paid back at check-out (three hundred euros in Stintino, two hundred in Alghero). Your own groceries, of course — we leave a small welcome basket, but the shopping is yours.',
      fr: 'La taxe de séjour communale, quelques euros par personne et par nuit, fixée par la mairie. La caution remboursable au départ (trois cents euros à Stintino, deux cents à Alghero). Vos consommations personnelles, bien entendu — nous laissons un petit panier d\'accueil, mais les courses sont à votre charge.',
      de: 'Die kommunale Kurtaxe, einige Euro pro Person und Nacht, festgelegt von der Gemeinde. Die Kaution, die bei der Abreise zurückerstattet wird (dreihundert Euro in Stintino, zweihundert in Alghero). Ihre persönlichen Einkäufe natürlich — wir lassen einen kleinen Willkommensgruß da, den Einkauf übernehmen Sie.'
    },
    'inc.notinc.body2': {
      it: "Nessun costo nascosto per biancheria, pulizie, utenze. Nessuna piattaforma terza che aggiunge percentuali. Quello che leggete nell'email di conferma è quello che paghereste.",
      en: 'No hidden costs for linen, cleaning or utilities. No third-party platforms adding fees. What you read in the confirmation email is what you pay.',
      fr: 'Aucun coût caché pour le linge, le ménage ou les charges. Aucune plateforme tierce qui ajoute des pourcentages. Ce que vous lisez dans l\'e-mail de confirmation, c\'est ce que vous payez.',
      de: 'Keine versteckten Kosten für Wäsche, Reinigung oder Nebenkosten. Keine Drittanbieter-Plattformen, die Gebühren hinzufügen. Was in der Bestätigungs-E-Mail steht, zahlen Sie.'
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
      it: "Le case le teniamo noi. Rispondiamo noi ai messaggi, consegniamo noi le chiavi, e quando c'è da sistemare qualcosa non chiamiamo una gestione: ci pensiamo. Questa è la differenza che sentite quando ci scrivete — e che speriamo si senta anche una volta arrivati.",
      en: 'We look after the houses ourselves. We reply to messages, we hand over the keys, and when something needs fixing we don\'t call a management company — we do it. That\'s the difference you notice when you write to us, and one we hope you\'ll feel once you arrive.',
      fr: 'Nous nous occupons nous-mêmes des maisons. Nous répondons aux messages, nous remettons les clés, et quand il faut réparer quelque chose, nous n\'appelons pas de gestionnaire : nous le faisons. C\'est la différence que vous sentez quand vous nous écrivez — et que nous espérons vous faire sentir une fois arrivés.',
      de: 'Wir kümmern uns selbst um die Häuser. Wir antworten auf Nachrichten, übergeben die Schlüssel, und wenn etwas zu reparieren ist, rufen wir keine Verwaltung an — wir machen es. Das ist der Unterschied, den Sie spüren, wenn Sie uns schreiben — und den Sie hoffentlich auch spüren, wenn Sie angekommen sind.'
    },
    'about.body2': {
      it: 'Non abbiamo grandi piani di espansione. Due case sono quello che riusciamo a curare davvero, e ci va bene così. Quello che proviamo a dare è una Sardegna onesta: la Pelosa a piedi da una parte, il centro catalano dall\'altra, e la possibilità di viverli senza l\'ansia della prenotazione massiva.',
      en: 'We have no grand plans to expand. Two houses is what we can look after properly, and we\'re fine with that. What we try to offer is an honest Sardinia: La Pelosa on foot on one side, the Catalan old town on the other, and the chance to enjoy them without the pressure of mass bookings.',
      fr: 'Nous n\'avons pas de grands projets d\'expansion. Deux maisons, c\'est ce que nous arrivons à vraiment bien tenir, et cela nous convient. Ce que nous essayons d\'offrir, c\'est une Sardaigne honnête : La Pelosa à pied d\'un côté, le centre catalan de l\'autre, et la possibilité d\'en profiter sans l\'angoisse de la réservation de masse.',
      de: 'Wir haben keine großen Expansionspläne. Zwei Häuser sind das, was wir wirklich gut betreuen können, und das passt uns so. Was wir anbieten möchten, ist ein ehrliches Sardinien: La Pelosa zu Fuß auf der einen Seite, die katalanische Altstadt auf der anderen — und die Möglichkeit, sie ohne Massenbuchungs-Stress zu erleben.'
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
      it: 'Sei voci che ci fanno quasi tutti, con risposte non generiche.',
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
    // Home (index.html)
    'meta.title': {
      it: 'Le Porte di Sardegna — Due case in Sardegna · Stintino e Alghero',
      en: 'Le Porte di Sardegna — Two houses in Sardinia · Stintino and Alghero',
      fr: 'Le Porte di Sardegna — Deux maisons en Sardaigne · Stintino et Alghero',
      de: 'Le Porte di Sardegna — Zwei Häuser auf Sardinien · Stintino und Alghero'
    },
    'meta.description': {
      it: "Due case vacanze in Sardegna, gestite da una famiglia. Villa La Mimosa a cinque minuti dalla Pelosa, La Porta del Lido nel centro catalano di Alghero. Giugno–Settembre.",
      en: 'Two holiday houses in Sardinia, run by a family. Villa La Mimosa five minutes from La Pelosa, La Porta del Lido in the Catalan heart of Alghero. June–September.',
      fr: "Deux maisons de vacances en Sardaigne, tenues par une famille. Villa La Mimosa à cinq minutes de La Pelosa, La Porta del Lido au cœur catalan d'Alghero. Juin–Septembre.",
      de: 'Zwei Ferienhäuser auf Sardinien, geführt von einer Familie. Villa La Mimosa fünf Minuten von La Pelosa, La Porta del Lido im katalanischen Zentrum von Alghero. Juni–September.'
    },
    'meta.og.title': {
      it: 'Le Porte di Sardegna — Due case in Sardegna · Stintino e Alghero',
      en: 'Le Porte di Sardegna — Two houses in Sardinia · Stintino and Alghero',
      fr: 'Le Porte di Sardegna — Deux maisons en Sardaigne · Stintino et Alghero',
      de: 'Le Porte di Sardegna — Zwei Häuser auf Sardinien · Stintino und Alghero'
    },
    'meta.og.description': {
      it: 'Una villa a cinque minuti dalla Pelosa, un appartamento nel centro catalano di Alghero. Gestite direttamente, senza intermediari. Giugno–Settembre.',
      en: 'A villa five minutes from La Pelosa, an apartment in the Catalan heart of Alghero. Managed directly, no middlemen. June–September.',
      fr: "Une villa à cinq minutes de La Pelosa, un appartement au cœur catalan d'Alghero. Gérées en direct, sans intermédiaires. Juin–Septembre.",
      de: 'Eine Villa fünf Minuten von La Pelosa, eine Wohnung im katalanischen Zentrum von Alghero. Direkt verwaltet, ohne Mittelsmänner. Juni–September.'
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
      it: 'Le Porte di Sardegna — Due case in Sardegna',
      en: 'Le Porte di Sardegna — Two houses in Sardinia',
      fr: 'Le Porte di Sardegna — Deux maisons en Sardaigne',
      de: 'Le Porte di Sardegna — Zwei Häuser auf Sardinien'
    },
    'meta.twitter.description': {
      it: 'Villa La Mimosa a cinque minuti dalla Pelosa, La Porta del Lido nel centro catalano di Alghero. Due case, una famiglia.',
      en: 'Villa La Mimosa five minutes from La Pelosa, La Porta del Lido in the Catalan heart of Alghero. Two houses, one family.',
      fr: "Villa La Mimosa à cinq minutes de La Pelosa, La Porta del Lido au cœur catalan d'Alghero. Deux maisons, une famille.",
      de: 'Villa La Mimosa fünf Minuten von La Pelosa, La Porta del Lido im katalanischen Zentrum von Alghero. Zwei Häuser, eine Familie.'
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
      it: 'Le Case · Villa La Mimosa e La Porta del Lido | Le Porte di Sardegna',
      en: 'The Houses · Villa La Mimosa and La Porta del Lido | Le Porte di Sardegna',
      fr: 'Les Maisons · Villa La Mimosa et La Porta del Lido | Le Porte di Sardegna',
      de: 'Die Häuser · Villa La Mimosa und La Porta del Lido | Le Porte di Sardegna'
    },
    'meta.route.case.description': {
      it: 'Due case in Sardegna: una villa di 90 m² a Stintino a 5 min dalla Pelosa, un appartamento di 70 m² nel centro storico di Alghero. Stessa cura, due vacanze molto diverse.',
      en: 'Two houses in Sardinia: a 90 m² villa in Stintino, 5 min from La Pelosa, and a 70 m² apartment in the old town of Alghero. Same care, two very different holidays.',
      fr: "Deux maisons en Sardaigne : une villa de 90 m² à Stintino, à 5 min de La Pelosa, et un appartement de 70 m² dans la vieille ville d'Alghero. Même soin, deux vacances bien différentes.",
      de: 'Zwei Häuser auf Sardinien: eine 90 m² Villa in Stintino, 5 Min. von La Pelosa, und eine 70 m² Wohnung in der Altstadt von Alghero. Dieselbe Sorgfalt, zwei sehr unterschiedliche Urlaube.'
    },
    'meta.route.stintino.title': {
      it: 'Villa La Mimosa · Casa vacanze a 5 min dalla Pelosa | Le Porte di Sardegna',
      en: 'Villa La Mimosa · Holiday home 5 min from La Pelosa | Le Porte di Sardegna',
      fr: 'Villa La Mimosa · Maison de vacances à 5 min de La Pelosa | Le Porte di Sardegna',
      de: 'Villa La Mimosa · Ferienhaus 5 Min. von La Pelosa | Le Porte di Sardegna'
    },
    'meta.route.stintino.description': {
      it: 'Villa di 90 m² a Stintino, Sardegna: quattro camere, sei posti letto, due bagni, fino a otto ospiti, giardino con veranda e barbecue, cinque minuti a piedi dalla Spiaggia della Pelosa. Giugno–Settembre.',
      en: 'A 90 m² villa in Stintino, Sardinia: four bedrooms, six beds, two bathrooms, sleeps up to eight, garden with veranda and barbecue, five minutes on foot from La Pelosa beach. June–September.',
      fr: 'Villa de 90 m² à Stintino, Sardaigne : quatre chambres, six couchages, deux salles de bain, jusqu\'à huit personnes, jardin avec véranda et barbecue, à cinq minutes à pied de la plage de La Pelosa. Juin–Septembre.',
      de: 'Villa mit 90 m² in Stintino, Sardinien: vier Schlafzimmer, sechs Schlafplätze, zwei Bäder, bis zu acht Gäste, Garten mit Veranda und Grill, fünf Minuten zu Fuß vom Strand La Pelosa. Juni–September.'
    },
    'meta.route.alghero.title': {
      it: 'La Porta del Lido · Appartamento nel centro di Alghero | Le Porte di Sardegna',
      en: 'La Porta del Lido · Apartment in the centre of Alghero | Le Porte di Sardegna',
      fr: 'La Porta del Lido · Appartement au centre d\'Alghero | Le Porte di Sardegna',
      de: 'La Porta del Lido · Wohnung im Zentrum von Alghero | Le Porte di Sardegna'
    },
    'meta.route.alghero.description': {
      it: 'Appartamento di 70 m² ad Alghero, Sardegna: due camere, quattro posti letto, un bagno, fino a sei ospiti, ascensore, balcone, a dieci minuti a piedi dal Lido e cinque dal centro storico catalano. Giugno–Settembre.',
      en: 'A 70 m² apartment in Alghero, Sardinia: two bedrooms, four beds, one bathroom, sleeps up to six, lift, balcony, ten minutes on foot from the Lido and five from the Catalan old town. June–September.',
      fr: "Appartement de 70 m² à Alghero, Sardaigne : deux chambres, quatre couchages, une salle de bain, jusqu'à six personnes, ascenseur, balcon, à dix minutes à pied du Lido et cinq du centre historique catalan. Juin–Septembre.",
      de: 'Wohnung mit 70 m² in Alghero, Sardinien: zwei Schlafzimmer, vier Schlafplätze, ein Bad, bis zu sechs Gäste, Aufzug, Balkon, zehn Minuten zu Fuß vom Lido und fünf von der katalanischen Altstadt. Juni–September.'
    },
    'meta.route.incluso.title': {
      it: 'Cosa è incluso · Biancheria, pulizie, WiFi, aria | Le Porte di Sardegna',
      en: 'What\'s included · Linen, cleaning, WiFi, A/C | Le Porte di Sardegna',
      fr: 'Ce qui est inclus · Linge, ménage, WiFi, clim | Le Porte di Sardegna',
      de: 'Inbegriffene Leistungen · Wäsche, Reinigung, WLAN, Klima | Le Porte di Sardegna'
    },
    'meta.route.incluso.description': {
      it: 'Tutto quello che è compreso nella tariffa settimanale: biancheria, pulizie finali, WiFi in fibra, aria condizionata. Nessun costo nascosto, solo la tassa di soggiorno a parte.',
      en: 'Everything included in the weekly rate: linen, final cleaning, fibre WiFi, air conditioning. No hidden costs — only the tourist tax is paid separately.',
      fr: "Tout ce qui est compris dans le tarif hebdomadaire : linge, ménage final, WiFi fibre, climatisation. Aucun coût caché, seule la taxe de séjour est à part.",
      de: 'Alles, was im Wochenpreis enthalten ist: Wäsche, Endreinigung, Glasfaser-WLAN, Klimaanlage. Keine versteckten Kosten — nur die Kurtaxe wird separat bezahlt.'
    },
    'meta.route.chisiamo.title': {
      it: 'Chi siamo · Una famiglia, due case, la stessa Sardegna | Le Porte di Sardegna',
      en: 'About us · One family, two houses, the same Sardinia | Le Porte di Sardegna',
      fr: 'À propos · Une famille, deux maisons, la même Sardaigne | Le Porte di Sardegna',
      de: 'Über uns · Eine Familie, zwei Häuser, dasselbe Sardinien | Le Porte di Sardegna'
    },
    'meta.route.chisiamo.description': {
      it: 'Siamo una famiglia sarda che gestisce direttamente due case vacanze nel nord-ovest dell\'isola: la villa di Stintino e l\'appartamento nel centro catalano di Alghero.',
      en: 'We are a Sardinian family managing two holiday houses in the island\'s north-west directly: the villa in Stintino and the apartment in the Catalan heart of Alghero.',
      fr: "Nous sommes une famille sarde qui gère directement deux maisons de vacances dans le nord-ouest de l'île : la villa de Stintino et l'appartement au cœur catalan d'Alghero.",
      de: 'Wir sind eine sardische Familie, die zwei Ferienhäuser im Nordwesten der Insel direkt verwaltet: die Villa in Stintino und die Wohnung im katalanischen Zentrum von Alghero.'
    },
    'meta.route.contatti.title': {
      it: 'Contatti · Scriveteci per disponibilità e prenotazioni | Le Porte di Sardegna',
      en: 'Contact · Write to us for availability and bookings | Le Porte di Sardegna',
      fr: 'Contact · Écrivez-nous pour disponibilité et réservations | Le Porte di Sardegna',
      de: 'Kontakt · Schreiben Sie uns für Verfügbarkeit und Buchungen | Le Porte di Sardegna'
    },
    'meta.route.contatti.description': {
      it: 'Modulo di contatto e email diretta per prenotazioni a Villa La Mimosa e La Porta del Lido. Rispondiamo entro 24 ore, in italiano, inglese, francese o tedesco.',
      en: 'Contact form and direct email for bookings at Villa La Mimosa and La Porta del Lido. We reply within 24 hours, in Italian, English, French or German.',
      fr: 'Formulaire de contact et e-mail direct pour les réservations à Villa La Mimosa et La Porta del Lido. Réponse sous 24 heures, en italien, anglais, français ou allemand.',
      de: 'Kontaktformular und direkte E-Mail für Buchungen in Villa La Mimosa und La Porta del Lido. Antwort innerhalb von 24 Stunden — auf Italienisch, Englisch, Französisch oder Deutsch.'
    }
  };

  // ----------------------------------------------------------
  // core
  // ----------------------------------------------------------
  function detectLang() {
    try {
      var u = new URL(location.href);
      var q = u.searchParams.get('lang');
      if (q && LANGS.indexOf(q) >= 0) return q;
    } catch (_) {}
    try {
      var s = localStorage.getItem('fh.lang');
      if (s && LANGS.indexOf(s) >= 0) return s;
    } catch (_) {}
    var n = (navigator.language || DEFAULT).slice(0, 2).toLowerCase();
    if (LANGS.indexOf(n) >= 0) return n;
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

  function setLang(lang) {
    if (LANGS.indexOf(lang) < 0 || lang === state.lang) return;
    state.lang = lang;
    try { localStorage.setItem('fh.lang', lang); } catch (_) {}
    document.documentElement.setAttribute('lang', lang);
    try {
      var u = new URL(location.href);
      u.searchParams.set('lang', lang);
      history.replaceState(null, '', u.toString());
    } catch (_) {}
    // aggiorna language switcher UI
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    // ri-traduci DOM statico
    translateDom(document);
    // ri-renderizza SPA
    if (window.FH_rerender) window.FH_rerender();
  }

  // 1) Rileva lingua SUBITO al load del modulo — prima che app.js esegua renderRoute().
  //    Altrimenti il primo render userebbe 'it' e la pagina tornerebbe in IT al refresh.
  state.lang = detectLang();
  document.documentElement.setAttribute('lang', state.lang);

  function init() {
    // DOM è pronto: traduci gli elementi statici (nav, footer) e aggancia eventi
    translateDom(document);
    document.addEventListener('click', function (e) {
      var btn = e.target.closest && e.target.closest('[data-lang-btn]');
      if (!btn) return;
      e.preventDefault();
      setLang(btn.getAttribute('data-lang-btn'));
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === state.lang);
    });
  }

  window.FH_I18N = {
    get current() { return state.lang; },
    langs: LANGS,
    t: t,
    setLang: setLang,
    translateDom: translateDom
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
