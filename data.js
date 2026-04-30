/* ============================================================
   Le Porte di Sardegna v2 — DATA
   Exposes a single global: window.FH_DATA
   Copy: IT only (structure leaves room for EN/FR/DE later)
   ============================================================ */

(function () {
  'use strict';

  // Local image helper for Alghero (real photos ported from V1)
  var ALG = function (slug) {
    return 'img/alghero/appartamento-alghero-' + slug + '.jpeg';
  };

  // Local image helper for Stintino (foto reali della villa)
  var STI = function (slug) {
    return 'img/stintino/villa-stintino-' + slug + '.jpg';
  };

  // Local image helper for Stintino "dintorni" (spiagge, borgo, cucina)
  var STID = function (slug) {
    return 'img/stintino/dintorni/' + slug + '.png';
  };

  var houses = [
    {
      id: 'villa-stintino',
      name: 'Villa La Mimosa',
      location: 'Stintino',
      region: 'Sardegna',
      province: 'Sassari',
      address: 'Via Le Vele 9, Stintino (Loc. Cala Lupo)',
      cin: 'IT090089C2000T0180', // CIN ministeriale BDSR — verificato 2026-04-30. Titolare BDSR: Careddu Maria Carmela.
      cinHolder: 'Careddu Maria Carmela',
      type: {
        it: 'Villa con giardino', en: 'Villa with garden',
        fr: 'Villa avec jardin',  de: 'Villa mit Garten'
      },
      subtitle: {
        it: 'A 5 minuti a piedi dalla Pelosa.',
        en: 'Five minutes on foot from La Pelosa.',
        fr: 'À cinq minutes à pied de La Pelosa.',
        de: 'Fünf Minuten zu Fuß von La Pelosa.'
      },
      beds: 4, totalBeds: 6, guests: 8, baths: 2, sqm: 90,
      prices: { giugno: 800, luglio: 1200, agosto: 1500, settembre: 700 },
      priceFrom: 700, cleaning: 0, deposit: 300,
      year_restored: null,
      tags: ['mare', 'pelosa', 'giardino', 'famiglia'],
      // Coordinate fornite da Fabio (2026-04-30) — pin esatto della villa via maps.app.goo.gl/j3sW5yuV3edGMheD6
      geo: { lat: 40.9463725, lng: 8.2326289, zoom: 16 },
      gmaps: 'https://maps.app.goo.gl/j3sW5yuV3edGMheD6',
      poi: [
        { lat: 40.9573, lng: 8.1987, name: 'Spiaggia della Pelosa',
          slug: 'spiaggia-la-pelosa',
          image: 'img/stintino/dintorni/spiaggia-la-pelosa.png',
          desc: { it: "Una delle spiagge più belle d'Europa. Prenotazione obbligatoria 15 mag–15 ott.", en: "One of Europe's most beautiful beaches. Booking required 15 May–15 Oct.", fr: "L'une des plus belles plages d'Europe. Réservation obligatoire 15 mai–15 oct.", de: 'Einer der schönsten Strände Europas. Reservierung erforderlich 15. Mai–15. Okt.' },
          link: 'https://www.spiaggialapelosa.it',
          wiki: 'https://it.wikipedia.org/wiki/Spiaggia_della_Pelosa',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+La+Pelosa+Stintino' },
        { lat: 40.9621, lng: 8.1931, name: 'Torre della Pelosa',
          desc: { it: 'Torre aragonese del XVI secolo sull\'isolotto antistante la spiaggia.', en: '16th-century Aragonese tower on the islet off the beach.', fr: 'Tour aragonaise du XVIᵉ siècle sur l\'îlot en face de la plage.', de: 'Aragonesischer Turm aus dem 16. Jahrhundert auf der vorgelagerten Insel.' },
          wiki: 'https://it.wikipedia.org/wiki/Spiaggia_della_Pelosa',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Torre+Pelosa+Stintino' },
        { lat: 40.9652, lng: 8.1966, name: 'Torre di Capo Falcone',
          desc: { it: 'Sentiero di 4 km A/R con vista sul Golfo dell\'Asinara.', en: '4 km return trail with views over the Gulf of Asinara.', fr: "Sentier de 4 km A/R avec vue sur le Golfe de l'Asinara.", de: '4 km Hin- und Rückweg mit Blick auf den Golf von Asinara.' },
          wiki: 'https://it.wikipedia.org/wiki/Capo_Falcone',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Capo+Falcone+Stintino' },
        { lat: 40.9356, lng: 8.2291, name: 'Porto di Stintino',
          slug: 'porto-stintino',
          image: 'img/stintino/dintorni/stintino-paese.png',
          desc: { it: 'Due porticcioli, Porto Mannu e Porto Minore, cuore del borgo. Imbarchi per l\'Asinara, ristoranti di pesce, passeggiata serale.', en: 'Two small harbours, Porto Mannu and Porto Minore, heart of the village. Ferries to Asinara, seafood restaurants, evening promenade.', fr: "Deux petits ports, Porto Mannu et Porto Minore, cœur du village. Embarquements pour l'Asinara, restaurants de poisson, promenade du soir.", de: 'Zwei kleine Häfen, Porto Mannu und Porto Minore, Herz des Dorfes. Fähren zur Asinara, Fischrestaurants, Abendpromenade.' },
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Porto+Stintino' },
        { lat: 41.0736, lng: 8.2828, name: 'Parco Nazionale Asinara',
          slug: 'parco-asinara',
          image: 'img/stintino/dintorni/parco-nazionale-asinara.png',
          desc: { it: 'Isola-parco con asini albini, mufloni, acque turchesi. Traghetto dal porto.', en: 'Island-park with albino donkeys, mouflons, turquoise waters. Ferry from the harbour.', fr: "Île-parc avec ânes albinos, mouflons, eaux turquoise. Ferry depuis le port.", de: 'Inselpark mit Albino-Eseln, Mufflons, türkisfarbenem Wasser. Fähre vom Hafen.' },
          link: 'https://www.parcoasinara.org/',
          wiki: 'https://it.wikipedia.org/wiki/Isola_dell%27Asinara',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Parco+Nazionale+Asinara' },
        { lat: 40.9366, lng: 8.2278, name: 'Museo delle Tonnare',
          slug: 'museo-tonnare',
          image: 'img/stintino/dintorni/museo-tonnare.png',
          desc: { it: "Storia della pesca al tonno rosso nel magazzino restaurato. Aperto luglio–agosto, ingresso 3–5 €, ideale nelle ore più calde.", en: 'History of bluefin tuna fishing in the restored warehouse. Open July–August, admission €3–5, best in the hottest hours.', fr: "Histoire de la pêche au thon rouge dans l'entrepôt restauré. Ouvert juillet–août, entrée 3–5 €, idéal aux heures chaudes.", de: 'Geschichte der Roten-Thun-Fischerei im restaurierten Lager. Juli–August geöffnet, Eintritt 3–5 €, ideal in den heißesten Stunden.' },
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Museo+Tonnara+Stintino' },
        { lat: 40.9189, lng: 8.2503, name: 'Spiaggia Le Saline',
          slug: 'spiaggia-le-saline',
          image: 'img/stintino/dintorni/spiaggia-le-saline.png',
          desc: { it: 'Lunga spiaggia sabbiosa esposta al Maestrale, ottima per windsurf.', en: 'Long sandy beach exposed to the Mistral — ideal for windsurfing.', fr: 'Longue plage de sable exposée au Mistral, idéale pour le windsurf.', de: 'Langer Sandstrand, dem Maestrale ausgesetzt — ideal zum Windsurfen.' },
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Le+Saline+Stintino' },
        { lat: 40.9164, lng: 8.2208, name: 'Spiaggia Ezzi Mannu',
          slug: 'spiaggia-ezzi-mannu',
          image: 'img/stintino/dintorni/spiaggia-ezzi-mannu.png',
          desc: { it: 'Spiaggia selvaggia, ventosa, a sud di Stintino. Kitesurf.', en: 'Wild, windy beach south of Stintino. Kitesurfing spot.', fr: 'Plage sauvage et venteuse au sud de Stintino. Spot de kitesurf.', de: 'Wilder, windiger Strand südlich von Stintino. Kitesurf-Spot.' },
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Ezzi+Mannu+Stintino' },
        { lat: 40.7812, lng: 8.4446, name: "Nuraghe Monte d'Accoddi",
          slug: 'monte-accoddi',
          image: 'img/stintino/dintorni/nuraghe-monte-accoddi.jpg',
          desc: { it: "Altare preistorico del 4000 a.C., unico in Europa. 30 min in auto.", en: "Prehistoric altar from 4000 BC, unique in Europe. 30 min by car.", fr: "Autel préhistorique de 4000 av. J.-C., unique en Europe. 30 min en voiture.", de: "Prähistorischer Altar aus dem Jahr 4000 v. Chr., einzigartig in Europa. 30 Min. mit dem Auto." },
          link: 'https://www.sardegnaturismo.it/it/esplora/altare-prenuragico-di-monte-d-accoddi',
          wiki: 'https://it.wikipedia.org/wiki/Altare_preistorico_di_Monte_d%27Accoddi',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Altare+Monte+Accoddi' },
        { lat: 40.9096, lng: 8.7061, name: 'Castelsardo',
          slug: 'castelsardo',
          image: 'img/stintino/dintorni/castelsardo.jpg',
          desc: { it: "Borgo medievale su roccia di trachite rossa, uno dei più belli d'Italia. 1 ora in auto.", en: "Medieval village on a red trachyte rock, among the most beautiful in Italy. 1 hour by car.", fr: "Bourg médiéval sur une roche de trachyte rouge, l'un des plus beaux d'Italie. 1 heure en voiture.", de: "Mittelalterliches Dorf auf rotem Trachyt-Felsen, eines der schönsten Italiens. 1 Stunde mit dem Auto." },
          link: 'https://www.castelsardo.it/',
          wiki: 'https://it.wikipedia.org/wiki/Castelsardo',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Castelsardo' },
        { lat: 40.8437, lng: 8.4010, name: 'Porto Torres',
          desc: { it: 'Traghetti da/per Genova (Tirrenia, GNV), Civitavecchia, Barcellona.', en: 'Ferries to/from Genoa (Tirrenia, GNV), Civitavecchia, Barcelona.', fr: 'Ferries depuis/vers Gênes (Tirrenia, GNV), Civitavecchia, Barcelone.', de: 'Fähren von/nach Genua (Tirrenia, GNV), Civitavecchia, Barcelona.' },
          wiki: 'https://it.wikipedia.org/wiki/Porto_Torres',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Porto+Torres' },
        { lat: 40.6320, lng: 8.2908, name: 'Aeroporto Alghero-Fertilia',
          desc: { it: 'Aeroporto di riferimento, 45–60 min in auto dalla villa.', en: 'Reference airport, 45–60 min by car from the villa.', fr: 'Aéroport de référence, 45–60 min en voiture de la villa.', de: 'Referenz-Flughafen, 45–60 Min. mit dem Auto von der Villa.' },
          link: 'https://www.aeroportodialghero.it/',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Aeroporto+Alghero+Fertilia' }
      ],
      hero: STI('hero-giardino'),
      heroFocus: 'center 60%',
      gallery: [
        STI('hero-giardino'),
        STI('giardino-vialetto-01'),
        STI('soggiorno-01'),
        STI('giardino-barbecue'),
        STI('cucina-01'),
        STI('giardino-pergolato'),
        STI('soggiorno-02'),
        STI('bagno-01'),
        STI('scala-corridoio'),
        STI('giardino-vialetto-02'),
        STI('giardino-prato'),
        STI('giardino-scultura-roccia'),
        STI('giardino-cancello'),
        STI('giardino-vialetto-03'),
        STI('giardino-vialetto-04'),
        STI('giardino-rocce-01'),
        STI('giardino-panorama'),
        STI('patio'),
        STI('giardino-tartaruga'),
        STI('esterno-muretto-mimosa'),
        STI('dettaglio-centrotavola')
      ],
      amenities: [
        { it: 'Aria condizionata',    en: 'Air conditioning',   fr: 'Climatisation',         de: 'Klimaanlage' },
        { it: 'Cucina attrezzata',    en: 'Full kitchen',        fr: 'Cuisine équipée',        de: 'Voll ausgestattete Küche' },
        { it: 'Lavatrice',            en: 'Washing machine',     fr: 'Lave-linge',             de: 'Waschmaschine' },
        { it: 'TV Smart',             en: 'Smart TV',            fr: 'TV connectée',           de: 'Smart-TV' },
        { it: 'Barbecue esterno',     en: 'Outdoor barbecue',    fr: 'Barbecue extérieur',     de: 'Außengrill' },
        { it: 'Giardino e veranda',   en: 'Garden and veranda',  fr: 'Jardin et véranda',      de: 'Garten und Veranda' },
        { it: 'Parcheggio privato',   en: 'Private parking',     fr: 'Stationnement privé',    de: 'Privater Parkplatz' },
        { it: 'WiFi fibra',           en: 'Fibre WiFi',          fr: 'WiFi fibre',             de: 'Glasfaser-WLAN' },
        { it: 'Biancheria inclusa',   en: 'Linen included',      fr: 'Linge inclus',           de: 'Wäsche inklusive' },
        { it: 'Culla disponibile',    en: 'Cot available',       fr: 'Berceau disponible',     de: 'Babybett verfügbar' }
      ],
      story: {
        it: "Villa La Mimosa è una proprietà immersa nel verde della macchia mediterranea, a cinque minuti a piedi dalla Spiaggia della Pelosa — sabbia bianchissima, acqua trasparente, la Torre aragonese sullo sfondo. Intorno alla villa un giardino privato con veranda, barbecue, tavoli da esterno e ombrelloni. Dentro, un soggiorno luminoso con angolo cottura completo, quattro camere da letto per un totale di sei posti letto e due bagni con doccia. Climatizzazione in ogni stanza, fino a otto ospiti. È il punto di partenza giusto per il nord-ovest della Sardegna: dal porto di Stintino partono i traghetti per l'Asinara, poco lontano il sentiero di Capo Falcone, il Museo della Tonnara e i ristoranti di pesce del borgo. Alghero è a un'ora d'auto, comoda per una gita di un giorno.",
        en: "Villa La Mimosa sits immersed in the Mediterranean scrub, five minutes on foot from La Pelosa beach — brilliant white sand, crystal-clear water, the Aragonese tower in the background. Around the villa, a private garden with veranda, barbecue, outdoor tables and parasols. Inside, a bright living room with a full kitchenette, four bedrooms with six beds in total and two shower bathrooms. Air conditioning in every room, sleeps up to eight. It's the right base for Sardinia's north-west: the ferries to Asinara leave from Stintino's harbour, just nearby you'll find the Capo Falcone trail, the Tuna Fishery Museum and the village's seafood restaurants. Alghero is an hour's drive — comfortable for a day trip.",
        fr: "Villa La Mimosa est nichée dans le maquis méditerranéen, à cinq minutes à pied de la plage de La Pelosa — sable d'un blanc éclatant, eau transparente, la tour aragonaise en toile de fond. Autour de la villa, un jardin privé avec véranda, barbecue, tables extérieures et parasols. À l'intérieur, un séjour lumineux avec kitchenette complète, quatre chambres pour un total de six couchages et deux salles de bain avec douche. Climatisation dans chaque pièce, jusqu'à huit personnes. C'est la bonne base pour le nord-ouest de la Sardaigne : les ferries pour l'Asinara partent du port de Stintino, tout près se trouvent le sentier de Capo Falcone, le Musée de la Tonnara et les restaurants de poisson du village. Alghero est à une heure de route, parfaite pour une excursion d'une journée.",
        de: 'Villa La Mimosa liegt eingebettet in die mediterrane Macchia, fünf Minuten zu Fuß vom Strand La Pelosa — leuchtend weißer Sand, kristallklares Wasser, der aragonesische Turm im Hintergrund. Rund um die Villa ein privater Garten mit Veranda, Grill, Tischen und Sonnenschirmen. Innen ein heller Wohnraum mit voll ausgestatteter Kochnische, vier Schlafzimmer mit insgesamt sechs Schlafplätzen und zwei Duschbäder. Klimaanlage in jedem Raum, bis zu acht Gäste. Der richtige Ausgangspunkt für den Nordwesten Sardiniens: Vom Hafen in Stintino fahren die Fähren zur Asinara, ganz in der Nähe liegen der Capo-Falcone-Wanderweg, das Thunfisch-Museum und die Fischrestaurants des Dorfes. Alghero erreicht man in einer Stunde mit dem Auto — angenehm für einen Tagesausflug.'
      },
      bestFor: [
        { it: 'Famiglie', en: 'Families', fr: 'Familles', de: 'Familien' },
        { it: 'Mare',     en: 'Sea',      fr: 'Mer',      de: 'Meer' },
        { it: 'Pelosa',   en: 'La Pelosa', fr: 'La Pelosa', de: 'La Pelosa' }
      ],
      season: {
        it: 'Giugno — Settembre', en: 'June — September',
        fr: 'Juin — Septembre',    de: 'Juni — September'
      },
      rules: [
        { it: 'Check-in dalle 16:00 / Check-out entro le 10:00',
          en: 'Check-in from 16:00 / Check-out by 10:00',
          fr: 'Arrivée à partir de 16h00 / Départ avant 10h00',
          de: 'Check-in ab 16:00 Uhr / Check-out bis 10:00 Uhr' },
        { it: "Vietato fumare all'interno",
          en: 'No smoking indoors',
          fr: "Interdiction de fumer à l'intérieur",
          de: 'Rauchverbot im Haus' },
        { it: 'Animali non ammessi',
          en: 'Pets not allowed',
          fr: 'Animaux non admis',
          de: 'Haustiere nicht erlaubt' },
        { it: 'No feste o eventi. Silenzio dopo le 23:00',
          en: 'No parties or events. Quiet after 23:00',
          fr: 'Pas de fêtes ni événements. Silence après 23h00',
          de: 'Keine Partys oder Veranstaltungen. Ruhe nach 23:00 Uhr' },
        { it: 'Caparra cauzionale € 300, resa alla partenza',
          en: 'Refundable deposit €300, returned on departure',
          fr: 'Caution remboursable de 300 €, rendue au départ',
          de: 'Rückerstattbare Kaution 300 €, Rückgabe bei Abreise' },
        { it: 'Pulizie finali incluse nel prezzo',
          en: 'Final cleaning included in the price',
          fr: 'Ménage final inclus dans le prix',
          de: 'Endreinigung im Preis enthalten' },
        { it: 'WiFi fibra ~100 Mbps incluso',
          en: '~100 Mbps fibre WiFi included',
          fr: 'WiFi fibre ~100 Mbps inclus',
          de: 'Glasfaser-WLAN ~100 Mbit/s inklusive' },
        { it: 'Biancheria da letto e da bagno inclusa',
          en: 'Bed and bath linen included',
          fr: 'Linge de lit et de bain inclus',
          de: 'Bett- und Handwäsche inklusive' }
      ],
      activities: [
        {
          id: 'la-pelosa',
          slug: 'spiaggia-la-pelosa',
          title: {
            it: 'Spiaggia La Pelosa', en: 'La Pelosa beach',
            fr: 'Plage de La Pelosa', de: 'Strand La Pelosa'
          },
          distance: {
            it: '5 min a piedi', en: '5 min on foot',
            fr: '5 min à pied',  de: '5 Min. zu Fuß'
          },
          image: STID('spiaggia-la-pelosa'),
          description: {
            it: "La Spiaggia della Pelosa è universalmente considerata una delle più belle d'Europa — e chi ci arriva capisce subito perché. Un'acqua turchese quasi irreale, sabbia bianca finissima e, sullo sfondo, la Torre della Pelosa aragonese del XVI secolo che emerge dall'acqua come in una cartolina.",
            en: "La Pelosa is widely considered one of the most beautiful beaches in Europe — and when you arrive, you understand why immediately. An almost unreal turquoise water, fine white sand and, in the background, the sixteenth-century Aragonese Pelosa Tower rising from the sea like a postcard.",
            fr: "La plage de La Pelosa est universellement considérée comme l'une des plus belles d'Europe — et en y arrivant, on comprend tout de suite pourquoi. Une eau turquoise presque irréelle, un sable blanc très fin et, en arrière-plan, la tour aragonaise de La Pelosa du XVIᵉ siècle qui émerge de l'eau comme sur une carte postale.",
            de: 'La Pelosa gilt als einer der schönsten Strände Europas — und wer ankommt, begreift sofort warum. Ein fast unwirklich türkisfarbenes Wasser, feinster weißer Sand und im Hintergrund der aragonesische Turm aus dem 16. Jahrhundert, der wie auf einer Postkarte aus dem Wasser ragt.'
          },
          practical: {
            it: "Accessi regolamentati dal 15 maggio al 15 ottobre: prenotazione obbligatoria su spiaggialapelosa.it (€ 3,50 a persona, massimo 1.500 accessi al giorno). Il consiglio è arrivare entro le 9:30 per goderla ancora tranquilla, con la luce del mattino.",
            en: 'Access is regulated from 15 May to 15 October: booking is mandatory on spiaggialapelosa.it (€3.50 per person, max 1,500 entries per day). Our tip: arrive by 9:30 to enjoy it still quiet, in the morning light.',
            fr: "Accès réglementé du 15 mai au 15 octobre : réservation obligatoire sur spiaggialapelosa.it (3,50 € par personne, 1 500 entrées par jour maximum). Notre conseil : arriver avant 9h30 pour en profiter encore tranquille, dans la lumière du matin.",
            de: 'Zugang vom 15. Mai bis 15. Oktober geregelt: Buchung auf spiaggialapelosa.it ist verpflichtend (3,50 € pro Person, max. 1.500 Zutritte pro Tag). Unser Tipp: bis 9:30 Uhr kommen, um ihn noch ruhig und im Morgenlicht zu erleben.'
          }
        },
        {
          id: 'asinara',
          slug: 'parco-asinara',
          title: {
            it: "Parco Nazionale dell'Asinara", en: 'Asinara National Park',
            fr: "Parc National de l'Asinara",  de: 'Nationalpark Asinara'
          },
          distance: {
            it: 'Traghetto dal porto', en: 'Ferry from the harbour',
            fr: 'Ferry depuis le port', de: 'Fähre ab Hafen'
          },
          image: STID('parco-nazionale-asinara'),
          description: {
            it: "L'Asinara è un'isola-parco nazionale dal 1997, rimasta intatta grazie alla sua storia di colonia penale e poi carcere di massima sicurezza. Oggi ospita asini bianchi albini unici al mondo, mufloni, capre selvatiche e una straordinaria varietà di uccelli migratori.",
            en: "Asinara has been a national-park island since 1997, preserved thanks to its past as a penal colony and then a high-security prison. Today it's home to the world's only albino white donkeys, mouflons, wild goats and an extraordinary variety of migratory birds.",
            fr: "L'Asinara est une île-parc national depuis 1997, restée intacte grâce à son passé de colonie pénitentiaire puis de prison de haute sécurité. On y trouve aujourd'hui des ânes blancs albinos uniques au monde, des mouflons, des chèvres sauvages et une extraordinaire variété d'oiseaux migrateurs.",
            de: 'Die Asinara ist seit 1997 eine Nationalparkinsel, bewahrt durch ihre Geschichte als Strafkolonie und später Hochsicherheitsgefängnis. Heute beherbergt sie die weltweit einzigen weißen Albino-Esel, Mufflons, wilde Ziegen und eine außergewöhnliche Vielfalt an Zugvögeln.'
          },
          practical: {
            it: 'Traghetto dal porto di Stintino o di Porto Torres (circa 20 minuti). Escursioni disponibili da aprile a ottobre, tra giro in bici, tour in fuoristrada elettrico e snorkeling nelle baie protette. Prenota con anticipo nei weekend di agosto.',
            en: 'Ferry from Stintino or Porto Torres harbour (around 20 minutes). Excursions available from April to October: bike rides, electric off-road tours, snorkelling in protected bays. Book ahead on August weekends.',
            fr: "Ferry depuis le port de Stintino ou de Porto Torres (environ 20 minutes). Excursions d'avril à octobre : tours à vélo, 4×4 électrique, snorkeling dans les baies protégées. Réservez à l'avance les week-ends d'août.",
            de: 'Fähre vom Hafen Stintino oder Porto Torres (ca. 20 Minuten). Ausflüge von April bis Oktober: Radtouren, Elektro-Offroad-Touren, Schnorcheln in geschützten Buchten. An August-Wochenenden frühzeitig buchen.'
          }
        },
        {
          id: 'stintino-paese',
          slug: 'porto-stintino',
          title: {
            it: 'Il borgo di Stintino',       en: 'The village of Stintino',
            fr: 'Le village de Stintino',     de: 'Das Dorf Stintino'
          },
          distance: {
            it: '10 min a piedi', en: '10 min on foot',
            fr: '10 min à pied',  de: '10 Min. zu Fuß'
          },
          image: STID('stintino-paese'),
          description: {
            it: "Stintino è un piccolo borgo di pescatori fondato nel 1885, quando le famiglie dell'Asinara dovettero abbandonare l'isola per fare posto alla colonia penale. Da quella migrazione forzata è nato un paese che conserva ancora oggi l'anima marinara: case basse affacciate sui due porticcioli, reti stese al sole, un dialetto — il \"stintinese\" — che fonde ligure, sardo e catalano. La passeggiata serale sul lungomare tra Porto Mannu e Porto Minore è un rito locale.",
            en: "Stintino is a small fishing village founded in 1885, when the families of Asinara had to leave the island to make way for the penal colony. That forced migration gave birth to a village that still keeps its seafaring soul: low houses lining the two small harbours, nets drying in the sun, a local dialect — \"stintinese\" — blending Ligurian, Sardinian and Catalan. The evening stroll along the seafront between Porto Mannu and Porto Minore is a local ritual.",
            fr: "Stintino est un petit village de pêcheurs fondé en 1885, lorsque les familles de l'Asinara ont dû quitter l'île pour laisser place à la colonie pénitentiaire. De cette migration forcée est né un village qui conserve encore son âme marine : maisons basses sur les deux petits ports, filets étendus au soleil, un dialecte — le « stintinese » — mêlant ligure, sarde et catalan. La promenade du soir sur le front de mer entre Porto Mannu et Porto Minore est un rituel local.",
            de: "Stintino ist ein kleines Fischerdorf, gegründet 1885, als die Familien der Asinara die Insel verlassen mussten, um der Strafkolonie Platz zu machen. Aus dieser erzwungenen Abwanderung entstand ein Ort, der bis heute seine maritime Seele bewahrt: niedrige Häuser an den zwei kleinen Häfen, Netze, die in der Sonne trocknen, ein Dialekt — das „Stintinese\" — das Ligurisch, Sardisch und Katalanisch vereint. Der abendliche Spaziergang an der Uferpromenade zwischen Porto Mannu und Porto Minore ist ein festes Ritual."
          },
          practical: {
            it: "Il momento migliore è il tardo pomeriggio: luce morbida sulle case, aperitivo al porto, cena in una delle trattorie di pesce del centro. In estate il centro è a traffico limitato — si lascia l'auto nei parcheggi all'ingresso del borgo e si gira a piedi. Mercato settimanale il giovedì mattina. Il mercoledì sera d'agosto, serate di musica dal vivo sul lungomare.",
            en: "The best moment is late afternoon: soft light on the houses, aperitivo at the harbour, dinner at one of the fish trattorias in the centre. In summer the centre has limited traffic — leave the car at the car parks at the village entrance and walk. Weekly market on Thursday morning. On August Wednesday evenings, live-music nights along the seafront.",
            fr: "Le meilleur moment, c'est la fin d'après-midi : lumière douce sur les maisons, apéritif au port, dîner dans l'une des trattorias de poisson du centre. En été, le centre est en circulation limitée — on laisse la voiture aux parkings à l'entrée du village et on marche. Marché hebdomadaire le jeudi matin. Les mercredis soirs d'août, concerts sur le front de mer.",
            de: "Am schönsten ist der späte Nachmittag: weiches Licht auf den Häusern, Aperitif am Hafen, Abendessen in einer Fisch-Trattoria im Zentrum. Im Sommer ist das Zentrum verkehrsberuhigt — das Auto an den Parkplätzen am Ortseingang abstellen und zu Fuß gehen. Wochenmarkt am Donnerstagvormittag. An Mittwochabenden im August Live-Musik an der Promenade."
          }
        },
        {
          id: 'snorkeling-windsurf',
          slug: 'snorkeling-windsurf',
          title: {
            it: 'Snorkeling e windsurf', en: 'Snorkelling and windsurfing',
            fr: 'Snorkeling et planche à voile', de: 'Schnorcheln und Windsurfen'
          },
          distance: {
            it: '10 min a piedi', en: '10 min on foot',
            fr: '10 min à pied',  de: '10 Min. zu Fuß'
          },
          image: STID('snorkeling-windsurf-stintino'),
          description: {
            it: "Il Golfo dell'Asinara è un paradiso per gli sport acquatici. I fondali di posidonia oceanica — patrimonio UNESCO — ospitano un ecosistema ricco: saraghi, polpi, murene, cernie e, con un po' di fortuna, tartarughe Caretta caretta. L'acqua è cristallina, la visibilità spesso superiore ai quindici metri.",
            en: "The Gulf of Asinara is a paradise for water sports. The Posidonia seagrass beds — a UNESCO heritage — host a rich ecosystem: sea breams, octopuses, moray eels, groupers and, if you're lucky, Caretta caretta turtles. The water is crystal-clear, visibility often over fifteen metres.",
            fr: "Le Golfe de l'Asinara est un paradis pour les sports nautiques. Les fonds de posidonie — patrimoine UNESCO — abritent un écosystème riche : sargues, poulpes, murènes, mérous et, avec un peu de chance, des tortues Caretta caretta. L'eau est cristalline, la visibilité souvent supérieure à quinze mètres.",
            de: 'Der Golf von Asinara ist ein Paradies für Wassersport. Die Posidonia-Seegraswiesen — UNESCO-Erbe — beherbergen ein reiches Ökosystem: Geißbrassen, Oktopus, Muränen, Zackenbarsche und, mit etwas Glück, Unechte Karettschildkröten. Das Wasser ist kristallklar, die Sicht oft über fünfzehn Meter.'
          },
          practical: {
            it: 'In superficie, il vento del Maestrale rende la baia una delle migliori della Sardegna per windsurf e kitesurf. Scuole e noleggio attrezzatura sul lungomare. Noleggio snorkeling da circa 10 €, lezioni windsurf da circa 50 €/h. Maestrale più costante nel pomeriggio; snorkeling meglio al mattino.',
            en: "Above water, the Mistral wind makes the bay one of Sardinia's best for windsurfing and kitesurfing. Schools and equipment rental along the seafront. Snorkel rental from around €10, windsurfing lessons from around €50/hour. The Mistral is steadiest in the afternoon; snorkelling is best in the morning.",
            fr: "En surface, le Mistral fait de la baie l'une des meilleures de Sardaigne pour la planche à voile et le kitesurf. Écoles et location de matériel sur le front de mer. Location snorkeling à partir d'environ 10 €, cours de windsurf à partir d'environ 50 €/h. Mistral plus régulier l'après-midi ; snorkeling plutôt le matin.",
            de: 'An der Oberfläche macht der Maestrale die Bucht zu einer der besten Sardiniens fürs Windsurfen und Kitesurfen. Schulen und Verleih an der Strandpromenade. Schnorchel-Verleih ab ca. 10 €, Windsurf-Kurse ab ca. 50 €/h. Der Maestrale ist nachmittags am beständigsten; Schnorcheln morgens am besten.'
          }
        },
        {
          id: 'capo-falcone',
          slug: 'capo-falcone',
          title: {
            it: 'Torre di Capo Falcone', en: 'Capo Falcone Tower',
            fr: 'Tour de Capo Falcone',  de: 'Turm von Capo Falcone'
          },
          distance: {
            it: '15 min a piedi o bici', en: '15 min on foot or bike',
            fr: '15 min à pied ou à vélo', de: '15 Min. zu Fuß oder mit dem Rad'
          },
          image: STID('capo-falcone'),
          description: {
            it: "La Torre di Capo Falcone è un gioiello storico-naturalistico a pochi minuti dalla villa. Edificata dagli Aragonesi nel XVI secolo come torre d'avvistamento, domina dall'alto il Golfo dell'Asinara con una vista che toglie il fiato: la Pelosa in basso, l'isola dell'Asinara di fronte, la costa nord-occidentale fino all'orizzonte.",
            en: "Capo Falcone Tower is a historical and natural gem a few minutes from the villa. Built by the Aragonese in the sixteenth century as a watchtower, it overlooks the Gulf of Asinara with a breathtaking view: La Pelosa below, Asinara island in front, the north-west coast all the way to the horizon.",
            fr: "La Tour de Capo Falcone est un joyau historique et naturel à quelques minutes de la villa. Érigée par les Aragonais au XVIᵉ siècle comme tour de guet, elle domine le Golfe de l'Asinara avec une vue à couper le souffle : La Pelosa en bas, l'île de l'Asinara en face, la côte nord-ouest jusqu'à l'horizon.",
            de: 'Der Turm von Capo Falcone ist ein historisch-landschaftliches Juwel wenige Minuten von der Villa. Im 16. Jahrhundert von den Aragonesen als Wachturm errichtet, überblickt er den Golf von Asinara mit atemberaubender Aussicht: La Pelosa unten, die Insel Asinara gegenüber, die Nordwestküste bis zum Horizont.'
          },
          practical: {
            it: 'Sentiero sempre accessibile, gratuito. Quattro chilometri andata e ritorno, centoventi metri di dislivello, circa un\'ora di cammino. Al tramonto la luce radente sulle rocce granitiche è spettacolare — scarpe da ginnastica consigliate.',
            en: 'Trail always accessible, free of charge. Four kilometres round trip, 120 metres of elevation, about an hour\'s walk. At sunset the raking light on the granite rocks is spectacular — trainers recommended.',
            fr: "Sentier toujours accessible, gratuit. Quatre kilomètres aller-retour, cent vingt mètres de dénivelé, environ une heure de marche. Au coucher du soleil, la lumière rasante sur le granit est spectaculaire — baskets conseillées.",
            de: 'Wanderweg jederzeit zugänglich, kostenlos. Vier Kilometer hin und zurück, hundertzwanzig Höhenmeter, rund eine Stunde Gehzeit. Bei Sonnenuntergang ist das Streiflicht auf den Granitfelsen spektakulär — Turnschuhe empfohlen.'
          }
        },
        {
          id: 'cucina-sarda',
          slug: 'cucina-sarda',
          title: {
            it: 'Cucina sarda tipica', en: 'Traditional Sardinian cuisine',
            fr: 'Cuisine sarde typique', de: 'Typische sardische Küche'
          },
          distance: {
            it: '10–15 min a piedi', en: '10–15 min on foot',
            fr: '10–15 min à pied',   de: '10–15 Min. zu Fuß'
          },
          image: STID('cucina-sarda-stintino'),
          description: {
            it: 'A Stintino la cucina del mare è protagonista assoluta. Aragosta alla catalana, fregola con arselle, zuppa di pesce alla stintinese, polpo in galera: ogni ristorante del borgo ha le sue ricette tramandate di generazione in generazione. Da non perdere la "tumbarella", dolce locale di pasta di mandorle e miele amaro.',
            en: 'In Stintino, the seafood cuisine takes centre stage. Catalan-style lobster, fregola with clams, Stintino fish soup, "polpo in galera": every restaurant in the village has its own recipes, passed down through generations. Don\'t miss the local "tumbarella", a sweet made from almond paste and bitter honey.',
            fr: "À Stintino, la cuisine de la mer est la vedette. Langouste à la catalane, fregola aux palourdes, soupe de poisson stintinoise, « polpo in galera » : chaque restaurant du village a ses recettes transmises de génération en génération. À ne pas manquer : la « tumbarella », douceur locale à base de pâte d'amandes et de miel amer.",
            de: 'In Stintino steht die Küche des Meeres im Mittelpunkt. Katalanischer Hummer, Fregola mit Venusmuscheln, Stintiner Fischsuppe, „polpo in galera": Jedes Restaurant hat seine Rezepte, über Generationen weitergegeben. Nicht verpassen: die „tumbarella", eine lokale Süßspeise aus Mandelpaste und bitterem Honig.'
          },
          practical: {
            it: 'Ristoranti concentrati lungo il porto e nel centro storico. Cena 19:30–23:00, pranzo 12:30–14:30. Antipasto + primo + secondo + vino 35–55 € a persona. In agosto prenota sempre, anche con due-tre giorni di anticipo. Abbina con un calice di Vermentino di Sardegna DOC.',
            en: 'Restaurants cluster along the harbour and in the old town. Dinner 19:30–23:00, lunch 12:30–14:30. Starter + first + second + wine €35–55 per person. In August always book, even two or three days ahead. Pair with a glass of Vermentino di Sardegna DOC.',
            fr: "Restaurants concentrés le long du port et dans le centre historique. Dîner 19h30–23h00, déjeuner 12h30–14h30. Antipasti + primo + secondo + vin 35–55 € par personne. En août, réservez toujours, même deux ou trois jours à l'avance. À accompagner d'un verre de Vermentino di Sardegna DOC.",
            de: 'Die Restaurants reihen sich am Hafen und in der Altstadt. Abendessen 19:30–23:00, Mittagessen 12:30–14:30. Antipasto + Primo + Secondo + Wein 35–55 € pro Person. Im August immer reservieren, auch zwei bis drei Tage im Voraus. Dazu ein Glas Vermentino di Sardegna DOC.'
          }
        }
      ],
      guide: [
        {
          id: 'eat', icon: '🍽️',
          items: [
            {
              name: 'Ristorante Il Porticciolo',
              desc: { it: 'Pesce fresco sul porto, specialità locali sarde', en: 'Fresh fish on the harbour, local Sardinian specialities', fr: 'Poisson frais sur le port, spécialités sardes locales', de: 'Frischer Fisch am Hafen, lokale sardische Spezialitäten' },
              href: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Il+Porticciolo+Stintino'
            },
            {
              name: 'Trattoria La Rete',
              desc: { it: 'Cucina casalinga, fregola con arselle e bottarga', en: 'Home-style cooking, fregola with clams and bottarga', fr: 'Cuisine familiale, fregola aux palourdes et boutargue', de: 'Hausmannskost, Fregola mit Venusmuscheln und Bottarga' },
              href: 'https://www.google.com/maps/search/?api=1&query=Trattoria+La+Rete+Stintino'
            },
            {
              name: 'Ristorante Silvestrino',
              desc: { it: 'Vista sul mare, menu degustazione di pesce', en: 'Sea view, fish tasting menu', fr: 'Vue sur la mer, menu dégustation de poisson', de: 'Meerblick, Fisch-Degustationsmenü' },
              href: 'https://www.google.com/maps/search/?api=1&query=Ristorante+Silvestrino+Stintino'
            },
            {
              name: 'Bar del Porto',
              desc: { it: 'Colazione e aperitivo, la migliore granita di Stintino', en: 'Breakfast and aperitivo, the best granita in Stintino', fr: 'Petit-déjeuner et apéritif, la meilleure granita de Stintino', de: 'Frühstück und Aperitif, die beste Granita in Stintino' },
              href: 'https://www.google.com/maps/search/?api=1&query=Bar+del+Porto+Stintino'
            }
          ]
        },
        {
          id: 'excursions', icon: '⛵',
          items: [
            {
              name: { it: "Gite in barca all'Asinara", en: 'Boat trips to Asinara', fr: "Excursions en bateau à l'Asinara", de: 'Bootsausflüge zur Asinara' },
              desc: { it: 'Parco Nazionale, acque turchesi, fauna protetta', en: 'National Park, turquoise waters, protected wildlife', fr: 'Parc National, eaux turquoise, faune protégée', de: 'Nationalpark, türkisblaues Wasser, geschützte Tierwelt' },
              href: 'https://www.parcoasinara.org/'
            },
            {
              name: 'Asinara Scuba Diving',
              desc: { it: 'Immersioni nel Parco Nazionale e snorkeling, corsi per tutti i livelli', en: 'Diving in the National Park and snorkelling, courses for all levels', fr: 'Plongée dans le Parc National et snorkeling, cours pour tous niveaux', de: 'Tauchen im Nationalpark und Schnorcheln, Kurse für alle Niveaus' },
              href: 'https://www.asinarascubadiving.com/'
            },
            {
              name: { it: 'Noleggio windsurf — Centro Velico', en: 'Windsurf rental — Centro Velico', fr: 'Location de planche à voile — Centro Velico', de: 'Windsurf-Verleih — Centro Velico' },
              desc: { it: 'Windsurf, kitesurf e vela: scuola e noleggio attrezzatura sul Golfo dell\'Asinara', en: 'Windsurfing, kitesurfing and sailing: school and equipment rental on the Gulf of Asinara', fr: 'Planche à voile, kitesurf et voile : école et location de matériel sur le Golfe de l\'Asinara', de: 'Windsurfen, Kitesurfen und Segeln: Schule und Materialverleih am Golf von Asinara' },
              href: 'http://www.windsurfingcenter.it/centro-velico'
            },
            {
              name: { it: 'Prenotazione Pelosa', en: 'La Pelosa booking', fr: 'Réservation La Pelosa', de: 'La-Pelosa-Buchung' },
              desc: { it: 'Obbligatoria da maggio a ottobre — max 1.500 ingressi al giorno', en: 'Mandatory from May to October — max 1,500 entries per day', fr: 'Obligatoire de mai à octobre — 1 500 entrées par jour maximum', de: 'Verpflichtend von Mai bis Oktober — max. 1.500 Zutritte pro Tag' },
              href: 'https://www.spiaggialapelosa.it'
            }
          ]
        },
        {
          id: 'services', icon: '🛒',
          items: [
            {
              name: 'Supermercato Nonna Isa',
              desc: { it: 'Via Sassari 23, in paese — pochi minuti in auto dalla villa, aperto tutti i giorni in estate', en: 'Via Sassari 23, in the village — a few minutes by car from the villa, open every day in summer', fr: 'Via Sassari 23, au village — à quelques minutes en voiture de la villa, ouvert tous les jours en été', de: 'Via Sassari 23, im Ort — wenige Autominuten von der Villa, im Sommer täglich geöffnet' },
              href: 'https://www.google.com/maps/search/?api=1&query=Supermercato+Nonna+Isa+Via+Sassari+23+Stintino'
            },
            {
              name: { it: 'Farmacia di Stintino', en: 'Stintino pharmacy', fr: 'Pharmacie de Stintino', de: 'Apotheke Stintino' },
              desc: { it: 'Centro paese, turno notturno in estate', en: 'Village centre, night-duty service in summer', fr: 'Centre du village, service de nuit en été', de: 'Ortszentrum, Nachtdienst im Sommer' },
              href: 'https://www.google.com/maps/search/?api=1&query=Farmacia+Stintino'
            },
            {
              name: { it: 'Noleggio auto — Aeroporto', en: 'Car rental — Airport', fr: 'Location de voiture — Aéroport', de: 'Autovermietung — Flughafen' },
              desc: { it: 'Tutti i principali operatori a Fertilia (10 km da Stintino)', en: 'All the major companies at Fertilia (10 km from Stintino)', fr: "Tous les grands opérateurs à Fertilia (10 km de Stintino)", de: 'Alle großen Anbieter in Fertilia (10 km von Stintino)' },
              href: 'https://www.aeroportodialghero.it/en/rent-a-car.html'
            },
            {
              name: { it: 'Traghetti Porto Torres', en: 'Porto Torres ferries', fr: 'Ferries Porto Torres', de: 'Fähren Porto Torres' },
              desc: { it: 'Genova (Tirrenia, GNV) e Barcellona (Grimaldi) — porto a 30 km', en: 'Genoa (Tirrenia, GNV) and Barcelona (Grimaldi) — port 30 km away', fr: 'Gênes (Tirrenia, GNV) et Barcelone (Grimaldi) — port à 30 km', de: 'Genua (Tirrenia, GNV) und Barcelona (Grimaldi) — Hafen 30 km entfernt' },
              href: 'https://www.directferries.it/porto_torres_traghetto.htm'
            }
          ]
        }
      ]
    },
    {
      id: 'appartamento-alghero',
      name: 'La Porta del Lido',
      location: 'Alghero',
      region: 'Sardegna',
      province: 'Sassari',
      address: 'Via Goceano 23, Alghero',
      cin: 'IT090003C2000U2044', // CIN ministeriale BDSR — verificato 2026-04-30. Denominazione BDSR: LA PORTA DEL LIDO.
      cinHolder: null,
      type: {
        it: 'Appartamento in centro', en: 'Apartment in the centre',
        fr: 'Appartement au centre',  de: 'Wohnung im Zentrum'
      },
      subtitle: {
        it: 'Nel cuore della Riviera del Corallo.',
        en: 'In the heart of the Coral Riviera.',
        fr: 'Au cœur de la Riviera du Corail.',
        de: 'Im Herzen der Korallenriviera.'
      },
      beds: 2, totalBeds: 4, guests: 6, baths: 1, sqm: 70,
      prices: { giugno: 600, luglio: 900, agosto: 1100, settembre: 550 },
      priceFrom: 550, cleaning: 0, deposit: 200,
      year_restored: null,
      tags: ['città', 'centro', 'balcone', 'catalana'],
      // Coordinate da Nominatim su Via Goceano 23, Alghero (2026-04-30)
      geo: { lat: 40.5640468, lng: 8.3209460, zoom: 16 },
      gmaps: 'https://www.google.com/maps/search/?api=1&query=Via+Goceano+23+Alghero',
      poi: [
        { lat: 40.5711, lng: 8.3303, name: 'Spiaggia del Lido',
          slug: 'spiaggia-del-lido',
          image: 'img/alghero/dintorni/lido-alghero.jpg',
          desc: { it: 'Spiaggia urbana sabbiosa, 10 min a piedi dall\'appartamento.', en: 'Urban sandy beach, 10 min on foot from the apartment.', fr: "Plage urbaine de sable, 10 min à pied de l'appartement.", de: 'Städtischer Sandstrand, 10 Min. zu Fuß von der Wohnung.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/lido-di-san-giovanni',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Lido+Alghero' },
        { lat: 40.5810, lng: 8.2560, name: 'Spiaggia delle Bombarde',
          slug: 'spiaggia-bombarde',
          image: 'img/alghero/dintorni/spiaggia-bombarde.jpg',
          desc: { it: 'Sabbia dorata, acqua verde smeraldo. 10 km a ovest.', en: 'Golden sand, emerald water. 10 km west.', fr: 'Sable doré, eau vert émeraude. 10 km à l\'ouest.', de: 'Goldener Sand, smaragdgrünes Wasser. 10 km westlich.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/le-bombarde',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+delle+Bombarde+Alghero' },
        { lat: 40.5791, lng: 8.2464, name: 'Spiaggia del Lazzaretto',
          slug: 'spiaggia-lazzaretto',
          image: 'img/alghero/dintorni/spiaggia-lazzaretto.jpg',
          desc: { it: 'Piccola baia a forma di mezzaluna, sabbia bianca.', en: 'Small crescent-shaped bay, white sand.', fr: 'Petite baie en demi-lune, sable blanc.', de: 'Kleine halbmondförmige Bucht, weißer Sand.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/lazzaretto-alghero',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Lazzaretto+Alghero' },
        { lat: 40.5845, lng: 8.2500, name: 'Spiaggia La Stalla',
          slug: 'spiaggia-la-stalla',
          image: 'img/alghero/dintorni/spiaggia-la-stalla.jpg',
          desc: { it: 'Piccola caletta tra Lazzaretto e Bombarde, riparata dal vento.', en: 'Small cove between Lazzaretto and Bombarde, sheltered from the wind.', fr: 'Petite crique entre Lazzaretto et Bombarde, abritée du vent.', de: 'Kleine Bucht zwischen Lazzaretto und Bombarde, windgeschützt.' },
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+La+Stalla+Alghero' },
        { lat: 40.5817, lng: 8.2994, name: 'Spiaggia Maria Pia',
          slug: 'spiaggia-maria-pia',
          image: 'img/alghero/dintorni/spiaggia-maria-pia.jpg',
          desc: { it: 'Sabbia fine tra le dune e la pineta. Ideale per famiglie.', en: 'Fine sand between dunes and pine forest. Ideal for families.', fr: 'Sable fin entre dunes et pinède. Idéale pour les familles.', de: 'Feiner Sand zwischen Dünen und Pinienwald. Ideal für Familien.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/maria-pia',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Maria+Pia+Alghero' },
        { lat: 40.5969, lng: 8.2117, name: 'Spiaggia Mugoni',
          slug: 'spiaggia-mugoni',
          image: 'img/alghero/dintorni/spiaggia-mugoni.jpg',
          desc: { it: 'Lunga spiaggia nella baia di Porto Conte, acqua bassa.', en: 'Long beach in the Porto Conte bay, shallow water.', fr: 'Longue plage dans la baie de Porto Conte, eau peu profonde.', de: 'Langer Strand in der Bucht von Porto Conte, flaches Wasser.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/mugoni',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Mugoni+Alghero' },
        { lat: 40.6441, lng: 8.2345, name: 'Spiaggia di Porto Ferro',
          slug: 'spiaggia-porto-ferro',
          image: 'img/alghero/dintorni/spiaggia-porto-ferro.jpg',
          desc: { it: 'Baia selvaggia con dune, a 20 km. Ideale per il tramonto.', en: 'Wild bay with sand dunes, 20 km away. Ideal at sunset.', fr: 'Baie sauvage avec dunes, à 20 km. Idéale au coucher du soleil.', de: 'Wilde Bucht mit Dünen, 20 km entfernt. Ideal zum Sonnenuntergang.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/porto-ferro',
          wiki: 'https://it.wikipedia.org/wiki/Porto_Ferro',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Porto+Ferro' },
        { lat: 40.5606, lng: 8.3114, name: 'Centro storico e Bastioni',
          slug: 'centro-storico-bastioni',
          image: 'img/alghero/dintorni/bastioni-marco-polo.jpg',
          desc: { it: 'Mura aragonesi, belvedere sul mare, chiese. 5 min a piedi.', en: 'Aragonese walls, seafront belvedere, churches. 5 min on foot.', fr: 'Remparts aragonais, belvédère sur la mer, églises. 5 min à pied.', de: 'Aragonesische Stadtmauern, Aussichtspunkt am Meer, Kirchen. 5 Min. zu Fuß.' },
          wiki: 'https://it.wikipedia.org/wiki/Torri_e_bastioni_di_Alghero#Bastioni',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Bastioni+Alghero' },
        { lat: 40.5698, lng: 8.3118, name: 'Cattedrale di Santa Maria',
          slug: 'cattedrale-santa-maria',
          image: 'img/alghero/dintorni/centro-storico-alghero.jpg',
          desc: { it: 'Cattedrale del XVI secolo, facciata neoclassica. Centro storico.', en: '16th-century cathedral, neoclassical façade. Old town.', fr: 'Cathédrale du XVIᵉ siècle, façade néoclassique. Centre historique.', de: 'Kathedrale aus dem 16. Jahrhundert, neoklassizistische Fassade. Altstadt.' },
          wiki: 'https://it.wikipedia.org/wiki/Cattedrale_di_Santa_Maria_(Alghero)',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Cattedrale+Alghero' },
        { lat: 40.5578, lng: 8.1603, name: 'Grotte di Nettuno',
          slug: 'grotte-di-nettuno',
          image: 'img/alghero/dintorni/grotte-di-nettuno.jpg',
          desc: { it: 'Caverne carsiche a Capo Caccia. In barca o Scala del Cabirol (656 gradini).', en: 'Karst caves at Capo Caccia. By boat or down the Cabirol stairway (656 steps).', fr: 'Grottes karstiques à Capo Caccia. En bateau ou par l\'Escala del Cabirol (656 marches).', de: 'Karsthöhlen bei Capo Caccia. Per Boot oder über die Escala del Cabirol (656 Stufen).' },
          link: 'https://grottadinettuno.it/',
          wiki: 'https://it.wikipedia.org/wiki/Grotte_di_Nettuno',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Grotte+di+Nettuno' },
        { lat: 40.5593, lng: 8.1632, name: 'Capo Caccia',
          slug: 'capo-caccia',
          image: 'img/alghero/dintorni/capo-caccia.jpg',
          desc: { it: 'Scogliera a strapiombo, riserva marina, panorami mozzafiato.', en: 'Sheer cliff, marine reserve, breathtaking views.', fr: 'Falaise à pic, réserve marine, panoramas à couper le souffle.', de: 'Steilklippe, Meeresschutzgebiet, atemberaubende Ausblicke.' },
          link: 'https://www.sardegnaturismo.it/it/esplora/capo-caccia-isola-piana',
          wiki: 'https://it.wikipedia.org/wiki/Capo_Caccia',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Capo+Caccia' },
        { lat: 40.6017, lng: 8.2431, name: 'Nuraghe Palmavera',
          slug: 'nuraghe-palmavera',
          image: 'img/alghero/dintorni/nuraghe-palmavera.jpg',
          desc: { it: 'Complesso nuragico di 3.500 anni fa. 10 km a ovest.', en: '3,500-year-old Nuragic complex. 10 km west.', fr: 'Complexe nuragique de 3 500 ans. 10 km à l\'ouest.', de: '3.500 Jahre alter Nuraghen-Komplex. 10 km westlich.' },
          link: 'https://nuraghepalmavera.it/',
          wiki: 'https://it.wikipedia.org/wiki/Nuraghe_Palmavera',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Nuraghe+Palmavera' },
        { lat: 40.6134, lng: 8.2253, name: 'Parco di Porto Conte',
          slug: 'parco-porto-conte',
          image: 'img/alghero/dintorni/parco-porto-conte.jpg',
          desc: { it: 'Area naturale protetta, trekking, mufloni, falchi pellegrini.', en: 'Protected nature area, hiking, mouflons, peregrine falcons.', fr: 'Aire naturelle protégée, randonnée, mouflons, faucons pèlerins.', de: 'Geschütztes Naturgebiet, Wandern, Mufflons, Wanderfalken.' },
          link: 'https://www.algheroparks.it/',
          wiki: 'https://it.wikipedia.org/wiki/Parco_regionale_di_Porto_Conte',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Parco+di+Porto+Conte' },
        { lat: 40.6062, lng: 8.2830, name: 'Cantina Sella & Mosca',
          slug: 'cantina-sella-mosca',
          image: 'img/alghero/dintorni/cantina-sella-mosca.jpg',
          imageFocus: 'top', // watermark "esperienza" e bougainville in basso: zoom su vigneti
          desc: { it: '650 ettari di vigneti. Torbato, Cannonau, Vermentino. Tour su prenotazione.', en: '650 hectares of vineyards. Torbato, Cannonau, Vermentino. Tours by reservation.', fr: '650 hectares de vignes. Torbato, Cannonau, Vermentino. Visites sur réservation.', de: '650 Hektar Weinberge. Torbato, Cannonau, Vermentino. Führungen auf Voranmeldung.' },
          link: 'https://www.sellaemosca.com/site/it/la_cantina/',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Cantine+Sella+%26+Mosca' },
        { lat: 40.6320, lng: 8.2908, name: 'Aeroporto Alghero-Fertilia',
          desc: { it: 'Aeroporto a 10 min in auto dall\'appartamento. Voli da tutta Europa.', en: 'Airport 10 min by car from the apartment. Flights from across Europe.', fr: 'Aéroport à 10 min en voiture de l\'appartement. Vols depuis toute l\'Europe.', de: 'Flughafen 10 Autominuten von der Wohnung. Flüge aus ganz Europa.' },
          link: 'https://www.aeroportodialghero.it/',
          gmaps: 'https://www.google.com/maps/search/?api=1&query=Aeroporto+Alghero+Fertilia' }
      ],
      hero:    'img/alghero/appartamento-alghero-hero.jpg',
      heroFocus: 'center center',
      videoTour: {
        src:    'video/video-tour-alghero.mp4',
        poster: 'video/video-tour-alghero-poster.jpg',
        duration: '1 min 20 s'
      },
      // Order narrativo: ingresso → zone comuni → cucina → camere → bagno → balcone → benvenuto
      gallery: [
        ALG('soggiorno-01'),
        ALG('soggiorno-02'),
        ALG('soggiorno-03'),
        ALG('soggiorno-04'),
        ALG('soggiorno-tv'),
        ALG('zona-giorno-01'),
        ALG('zona-giorno-02'),
        ALG('cucina-01'),
        ALG('corridoio-01'),
        ALG('corridoio-02'),
        ALG('camera-matrimoniale-01'),
        ALG('camera-matrimoniale-02'),
        ALG('camera-matrimoniale-03'),
        ALG('camera-doppia-01'),
        ALG('camera-doppia-02'),
        ALG('bagno-01'),
        ALG('bagno-02'),
        ALG('balcone-piante'),
        ALG('benvenuto-frutta'),
        ALG('benvenuto-prosecco')
      ],
      amenities: [
        { it: 'Aria condizionata',      en: 'Air conditioning',   fr: 'Climatisation',            de: 'Klimaanlage' },
        { it: 'Cucina attrezzata',      en: 'Full kitchen',        fr: 'Cuisine équipée',           de: 'Voll ausgestattete Küche' },
        { it: 'Lavatrice',              en: 'Washing machine',     fr: 'Lave-linge',                de: 'Waschmaschine' },
        { it: 'TV Smart',               en: 'Smart TV',            fr: 'TV connectée',              de: 'Smart-TV' },
        { it: 'Balcone privato',        en: 'Private balcony',     fr: 'Balcon privé',              de: 'Privater Balkon' },
        { it: 'Ascensore',              en: 'Lift',                fr: 'Ascenseur',                 de: 'Aufzug' },
        { it: 'Parcheggio gratuito su strada', en: 'Free on-street parking', fr: 'Stationnement gratuit en rue', de: 'Kostenlose Parkplätze auf der Straße' },
        { it: 'WiFi fibra',             en: 'Fibre WiFi',          fr: 'WiFi fibre',                de: 'Glasfaser-WLAN' },
        { it: 'Biancheria inclusa',     en: 'Linen included',      fr: 'Linge inclus',              de: 'Wäsche inklusive' },
        { it: 'Culla disponibile',      en: 'Cot available',       fr: 'Berceau disponible',        de: 'Babybett verfügbar' }
      ],
      story: {
        it: "La Porta del Lido è in posizione centralissima, a dieci minuti a piedi dal Lido e a cinque dal centro storico catalano. L'edificio è dotato di ascensore; parcheggio gratuito su strada nelle vie circostanti. Dentro: un soggiorno ampio con cucina a vista completamente attrezzata, due camere da letto — una matrimoniale e una doppia — per un totale di quattro posti letto, e un bagno con doccia. Il balcone dà su un cortile interno tranquillo. Fino a sei ospiti. Dalla porta di casa si arriva a piedi alle mura medievali e ai bastioni sul mare, alle vie pedonali del centro vecchio, al porto turistico, alla Cattedrale. Con l'auto, in venti-quaranta minuti, ci sono le Grotte di Nettuno, Capo Caccia, il Parco di Porto Conte e le cantine di Vermentino.",
        en: "La Porta del Lido is in a very central position, ten minutes on foot from the Lido and five from the Catalan old town. The building has a lift; free on-street parking in the surrounding roads. Inside: a spacious living room with a full open-plan kitchen, two bedrooms — a double and a twin — with four beds in total, and a shower bathroom. The balcony looks onto a quiet inner courtyard. Sleeps up to six. From the front door you reach, on foot, the medieval walls and the sea-facing bastions, the pedestrian streets of the old town, the marina and the cathedral. By car, in twenty to forty minutes, you reach the Grottoes of Neptune, Capo Caccia, the Porto Conte park and the Vermentino wineries.",
        fr: "La Porta del Lido se trouve en position très centrale, à dix minutes à pied du Lido et à cinq du centre historique catalan. L'immeuble dispose d'un ascenseur ; stationnement gratuit en rue dans les voies environnantes. À l'intérieur : un vaste séjour avec cuisine ouverte entièrement équipée, deux chambres — une double et une à deux lits — pour quatre couchages au total, et une salle de bain avec douche. Le balcon donne sur une cour intérieure tranquille. Jusqu'à six personnes. Depuis la porte d'entrée, on rejoint à pied les remparts médiévaux et les bastions côté mer, les rues piétonnes de la vieille ville, le port de plaisance et la cathédrale. En voiture, en vingt à quarante minutes, on atteint les Grottes de Neptune, Capo Caccia, le parc de Porto Conte et les caves de Vermentino.",
        de: 'La Porta del Lido liegt zentral, zehn Minuten zu Fuß vom Lido und fünf von der katalanischen Altstadt. Das Gebäude verfügt über einen Aufzug; kostenlose Parkplätze auf der Straße in den umliegenden Gassen. Innen: ein großzügiger Wohnraum mit voll ausgestatteter offener Küche, zwei Schlafzimmer — ein Doppel- und ein Zweibettzimmer — mit insgesamt vier Schlafplätzen, und ein Duschbad. Der Balkon geht auf einen ruhigen Innenhof. Bis zu sechs Gäste. Von der Haustür erreicht man zu Fuß die mittelalterlichen Stadtmauern und die Meer-Bastionen, die Fußgängerstraßen der Altstadt, den Jachthafen und die Kathedrale. Mit dem Auto sind in zwanzig bis vierzig Minuten die Neptungrotten, Capo Caccia, der Porto-Conte-Park und die Vermentino-Weingüter erreichbar.'
      },
      bestFor: [
        { it: 'Coppie',         en: 'Couples',   fr: 'Couples',     de: 'Paare' },
        { it: 'Città',          en: 'City',      fr: 'Ville',       de: 'Stadt' },
        { it: 'Centro storico', en: 'Old town',  fr: 'Vieille ville', de: 'Altstadt' }
      ],
      season: {
        it: 'Giugno — Settembre', en: 'June — September',
        fr: 'Juin — Septembre',    de: 'Juni — September'
      },
      rules: [
        { it: 'Check-in dalle 16:00 / Check-out entro le 10:00',
          en: 'Check-in from 16:00 / Check-out by 10:00',
          fr: 'Arrivée à partir de 16h00 / Départ avant 10h00',
          de: 'Check-in ab 16:00 Uhr / Check-out bis 10:00 Uhr' },
        { it: "Vietato fumare all'interno",
          en: 'No smoking indoors',
          fr: "Interdiction de fumer à l'intérieur",
          de: 'Rauchverbot im Haus' },
        { it: 'Animali non ammessi (regolamento condominiale)',
          en: 'Pets not allowed (building rules)',
          fr: 'Animaux non admis (règlement de copropriété)',
          de: 'Haustiere nicht erlaubt (Hausordnung)' },
        { it: 'No feste. Rispettare il silenzio condominiale',
          en: 'No parties. Please respect the building quiet hours',
          fr: 'Pas de fêtes. Respecter le silence de la copropriété',
          de: 'Keine Partys. Bitte Ruhezeiten einhalten' },
        { it: 'Caparra cauzionale € 200, resa alla partenza',
          en: 'Refundable deposit €200, returned on departure',
          fr: 'Caution remboursable de 200 €, rendue au départ',
          de: 'Rückerstattbare Kaution 200 €, Rückgabe bei Abreise' },
        { it: 'Pulizie finali incluse nel prezzo',
          en: 'Final cleaning included in the price',
          fr: 'Ménage final inclus dans le prix',
          de: 'Endreinigung im Preis enthalten' },
        { it: 'WiFi fibra ~100 Mbps incluso',
          en: '~100 Mbps fibre WiFi included',
          fr: 'WiFi fibre ~100 Mbps inclus',
          de: 'Glasfaser-WLAN ~100 Mbit/s inklusive' },
        { it: 'Biancheria da letto e da bagno inclusa',
          en: 'Bed and bath linen included',
          fr: 'Linge de lit et de bain inclus',
          de: 'Bett- und Handwäsche inklusive' }
      ],
      activities: [
        {
          id: 'spiagge-riviera',
          slug: 'spiagge-riviera',
          title: {
            it: 'Spiagge della Riviera', en: 'Beaches of the Riviera',
            fr: 'Plages de la Riviera',  de: 'Strände der Riviera'
          },
          distance: {
            it: '10 min a piedi / 10–20 km', en: '10 min on foot / 10–20 km',
            fr: '10 min à pied / 10–20 km',  de: '10 Min. zu Fuß / 10–20 km'
          },
          image: 'img/alghero/dintorni/lido-alghero.jpg',
          description: {
            it: 'Alghero offre una varietà di spiagge per ogni esigenza. Il Lido di Alghero (Lido San Giovanni) è la spiaggia urbana: ampia, sabbiosa, attrezzata con lettini e stabilimenti, raggiungibile in dieci minuti a piedi. A 10 km le Bombarde e Lazzaretto, sabbia dorata e acqua verde smeraldo da cartolina caraibica. Per chi ama la natura selvaggia, Porto Ferro (20 km) è una baia incontaminata con dune di sabbia e acqua cristallina.',
            en: "Alghero offers a variety of beaches for every taste. The Lido di Alghero (Lido San Giovanni) is the urban beach: wide, sandy, with loungers and beach clubs, ten minutes on foot. Ten kilometres away, Le Bombarde and Lazzaretto — golden sand and emerald water straight from a Caribbean postcard. For those who love wild nature, Porto Ferro (20 km) is an unspoilt bay with sand dunes and crystal water.",
            fr: "Alghero propose une variété de plages pour tous les goûts. Le Lido di Alghero (Lido San Giovanni) est la plage urbaine : large, sableuse, équipée de transats et d'établissements, à dix minutes à pied. À 10 km, Le Bombarde et Lazzaretto, sable doré et eau vert émeraude dignes d'une carte postale des Caraïbes. Pour les amateurs de nature sauvage, Porto Ferro (20 km) est une baie intacte aux dunes de sable et à l'eau cristalline.",
            de: 'Alghero bietet eine Vielfalt an Stränden für jeden Geschmack. Der Lido di Alghero (Lido San Giovanni) ist der Stadtstrand: breit, sandig, mit Liegen und Strandbädern, zehn Minuten zu Fuß. Zehn Kilometer entfernt Le Bombarde und Lazzaretto, goldener Sand und smaragdgrünes Wasser wie eine Karibik-Postkarte. Für Liebhaber wilder Natur ist Porto Ferro (20 km) eine unberührte Bucht mit Sanddünen und kristallklarem Wasser.'
          },
          practical: {
            it: 'Lido a piedi (10 min). Bombarde in auto o bus (20 min). Porto Ferro in auto (30 min). Stagione balneare giugno–settembre. Lettini ~20–30 €/giorno, spiagge libere gratuite. Arriva alle Bombarde entro le 9:30 per trovare parcheggio; Porto Ferro è ideale per il tramonto.',
            en: 'Lido on foot (10 min). Bombarde by car or bus (20 min). Porto Ferro by car (30 min). Beach season June–September. Sunloungers ~€20–30/day, free beaches at no cost. Arrive at Bombarde by 9:30 to find parking; Porto Ferro is ideal at sunset.',
            fr: "Lido à pied (10 min). Bombarde en voiture ou en bus (20 min). Porto Ferro en voiture (30 min). Saison balnéaire juin–septembre. Transats ~20–30 €/jour, plages libres gratuites. Arrivez aux Bombarde avant 9h30 pour le parking ; Porto Ferro est idéale au coucher du soleil.",
            de: 'Lido zu Fuß (10 Min.). Bombarde mit Auto oder Bus (20 Min.). Porto Ferro mit Auto (30 Min.). Badesaison Juni–September. Liegen ~20–30 €/Tag, freie Strände kostenlos. An den Bombarde bis 9:30 ankommen, um einen Parkplatz zu finden; Porto Ferro ist ideal zum Sonnenuntergang.'
          }
        },
        {
          id: 'centro-bastioni',
          slug: 'centro-storico-bastioni',
          title: {
            it: 'Centro storico e Bastioni', en: 'Old town and Bastions',
            fr: 'Vieille ville et bastions', de: 'Altstadt und Bastionen'
          },
          distance: {
            it: '5 min a piedi', en: '5 min on foot',
            fr: '5 min à pied',  de: '5 Min. zu Fuß'
          },
          image: 'img/alghero/dintorni/bastioni-marco-polo.jpg',
          description: {
            it: "Alghero è unica in Sardegna: una città murata di fondazione catalano-aragonese del XV secolo, dove ancora oggi una piccola comunità parla l'algherese — dialetto catalano riconosciuto dall'UNESCO come lingua in pericolo. I Bastioni aragonesi sul lato mare sono il luogo ideale per il tramonto: dal belvedere della Maddalena la vista abbraccia il golfo, le Bombarde e, nelle giornate limpide, Capo Caccia all'orizzonte.",
            en: "Alghero is unique in Sardinia: a walled town of fifteenth-century Catalan-Aragonese origin, where a small community still speaks Algherese — a Catalan dialect recognised by UNESCO as an endangered language. The Aragonese bastions facing the sea are the perfect spot for sunset: from the Maddalena viewpoint, the view stretches over the gulf, Le Bombarde and, on clear days, Capo Caccia on the horizon.",
            fr: "Alghero est unique en Sardaigne : une ville fortifiée d'origine catalano-aragonaise du XVᵉ siècle, où une petite communauté parle encore l'alguerès — dialecte catalan reconnu par l'UNESCO comme langue en danger. Les bastions aragonais côté mer sont le lieu idéal pour le coucher du soleil : depuis le belvédère de la Maddalena, la vue embrasse le golfe, Le Bombarde et, par temps clair, Capo Caccia à l'horizon.",
            de: 'Alghero ist einzigartig in Sardinien: eine Stadt mit Stadtmauer katalanisch-aragonesischer Gründung aus dem 15. Jahrhundert, in der eine kleine Gemeinschaft bis heute Algherese spricht — einen von der UNESCO als gefährdet anerkannten katalanischen Dialekt. Die aragonesischen Bastionen zum Meer sind der ideale Ort für den Sonnenuntergang: Vom Aussichtspunkt Maddalena umfasst der Blick den Golf, Le Bombarde und an klaren Tagen Capo Caccia am Horizont.'
          },
          practical: {
            it: 'Sempre accessibile. Chiese aperte 9:00–12:30 / 16:30–19:00, gratuite (alcune chiedono un obolo volontario). Il tramonto sui Bastioni in luglio–agosto è uno spettacolo: arriva trenta minuti prima per trovare posto sulle mura.',
            en: 'Always accessible. Churches open 9:00–12:30 / 16:30–19:00, free of charge (some request a small voluntary donation). Sunset on the Bastions in July–August is spectacular — arrive thirty minutes early to get a spot on the walls.',
            fr: 'Toujours accessible. Églises ouvertes 9h00–12h30 / 16h30–19h00, gratuites (certaines demandent une petite participation). Le coucher de soleil sur les bastions en juillet–août est un spectacle : arrivez trente minutes avant pour trouver une place sur les remparts.',
            de: 'Immer zugänglich. Kirchen geöffnet 9:00–12:30 / 16:30–19:00, kostenlos (manche erbitten einen kleinen freiwilligen Beitrag). Der Sonnenuntergang auf den Bastionen im Juli–August ist ein Spektakel — dreißig Minuten früher kommen, um auf der Mauer einen Platz zu finden.'
          }
        },
        {
          id: 'grotte-nettuno',
          slug: 'grotte-di-nettuno',
          title: {
            it: 'Grotte di Nettuno', en: 'Grottoes of Neptune',
            fr: 'Grottes de Neptune', de: 'Neptungrotten'
          },
          distance: {
            it: 'A Capo Caccia · 24 km', en: 'At Capo Caccia · 24 km',
            fr: 'À Capo Caccia · 24 km', de: 'An Capo Caccia · 24 km'
          },
          image: 'img/alghero/dintorni/grotte-di-nettuno.jpg',
          description: {
            it: 'Le Grotte di Nettuno sono tra le più spettacolari cavità carsiche del Mediterraneo, scavate per millenni dal mare nella scogliera a strapiombo di Capo Caccia. Il complesso si estende per oltre 2,5 km: stalattiti e stalagmiti alte fino a venti metri, laghi sotterranei silenziosi e sale di rara bellezza.',
            en: 'The Grottoes of Neptune are among the most spectacular karst caves in the Mediterranean, carved over millennia by the sea into the sheer cliff of Capo Caccia. The complex runs for over 2.5 km: stalactites and stalagmites up to twenty metres tall, silent underground lakes, and chambers of rare beauty.',
            fr: "Les Grottes de Neptune comptent parmi les plus spectaculaires cavités karstiques de la Méditerranée, creusées pendant des millénaires par la mer dans la falaise à pic de Capo Caccia. Le complexe s'étend sur plus de 2,5 km : stalactites et stalagmites jusqu'à vingt mètres, lacs souterrains silencieux et salles d'une rare beauté.",
            de: 'Die Neptungrotten gehören zu den spektakulärsten Karsthöhlen des Mittelmeerraums, über Jahrtausende vom Meer in die Steilklippe von Capo Caccia gegraben. Der Komplex erstreckt sich über 2,5 km: Stalaktiten und Stalagmiten bis zu zwanzig Meter hoch, stille unterirdische Seen und Hallen von seltener Schönheit.'
          },
          practical: {
            it: "Due modi per arrivarci: in barca da Alghero (trenta minuti di navigazione lungo la costa, consigliato) oppure a piedi scendendo l'Escala del Cabirol, 656 gradini scavati nella roccia a picco sul mare. Aperte aprile–ottobre 9:00–19:00. Ingresso ~16 € adulti, 8 € bambini; barca ~13 € A/R. Con mare mosso le barche non partono.",
            en: "Two ways to get there: by boat from Alghero (thirty minutes' sailing along the coast, recommended) or on foot down the Escala del Cabirol, 656 steps carved into the cliff above the sea. Open April–October 9:00–19:00. Admission ~€16 adults, €8 children; boat ~€13 return. Boats do not run in rough seas.",
            fr: "Deux façons d'y accéder : en bateau depuis Alghero (trente minutes de navigation le long de la côte, recommandé) ou à pied par l'Escala del Cabirol, 656 marches taillées dans la roche au-dessus de la mer. Ouvertes avril–octobre 9h00–19h00. Entrée ~16 € adultes, 8 € enfants ; bateau ~13 € A/R. Par mer agitée, les bateaux ne partent pas.",
            de: 'Zwei Wege dorthin: mit dem Boot von Alghero (dreißig Minuten Fahrt entlang der Küste, empfohlen) oder zu Fuß über die Escala del Cabirol, 656 in den Fels gehauene Stufen oberhalb des Meeres. Geöffnet April–Oktober 9:00–19:00. Eintritt ~16 € Erwachsene, 8 € Kinder; Boot ~13 € hin und zurück. Bei rauer See fahren keine Boote.'
          }
        },
        {
          id: 'porto-conte',
          slug: 'parco-porto-conte',
          title: {
            it: 'Parco di Porto Conte', en: 'Porto Conte Park',
            fr: 'Parc de Porto Conte',  de: 'Porto-Conte-Park'
          },
          distance: {
            it: '15 km in auto', en: '15 km by car',
            fr: '15 km en voiture', de: '15 km mit dem Auto'
          },
          image: 'img/alghero/dintorni/parco-porto-conte.jpg',
          description: {
            it: 'Il Parco Naturale Regionale di Porto Conte abbraccia la penisola di Capo Caccia e la Riserva "Le Prigionette". All\'interno si trova il Nuraghe Palmavera, uno dei nuraghi megalitici meglio conservati della Sardegna, costruito oltre 3.500 anni fa. Il parco è perfetto per trekking e cicloturismo: sentieri nella macchia mediterranea di corbezzolo, lentisco e olivastro, con volpi, martore, falchi pellegrini e i mufloni delle Prigionette.',
            en: 'The Regional Natural Park of Porto Conte covers the Capo Caccia peninsula and the "Le Prigionette" reserve. Inside stands the Palmavera nuraghe, one of the best-preserved megalithic nuraghi in Sardinia, built over 3,500 years ago. The park is perfect for hiking and cycling: trails through Mediterranean scrub of strawberry tree, mastic and wild olive, with foxes, martens, peregrine falcons and the Prigionette mouflons.',
            fr: "Le Parc Naturel Régional de Porto Conte englobe la presqu'île de Capo Caccia et la réserve « Le Prigionette ». À l'intérieur se trouve le nuraghe Palmavera, l'un des nuraghes mégalithiques les mieux conservés de Sardaigne, construit il y a plus de 3 500 ans. Le parc est parfait pour la randonnée et le vélo : sentiers dans le maquis méditerranéen (arbousier, lentisque, olivier sauvage), avec renards, martres, faucons pèlerins et les mouflons des Prigionette.",
            de: 'Der Regionale Naturpark Porto Conte umfasst die Halbinsel Capo Caccia und das Reservat „Le Prigionette". Im Inneren steht der Nuraghe Palmavera, einer der am besten erhaltenen megalithischen Nuraghen Sardiniens, vor über 3.500 Jahren erbaut. Der Park ist ideal für Wandern und Radfahren: Wege durch die mediterrane Macchia aus Erdbeerbaum, Mastix und wildem Olivenbaum, mit Füchsen, Mardern, Wanderfalken und den Mufflons von Prigionette.'
          },
          practical: {
            it: 'Parco sempre aperto, accesso gratuito. Nuraghe Palmavera 9:00–19:00 d\'estate, ingresso ~5 €. Tour "Le Prigionette" su prenotazione, ~10 €. Visita il nuraghe nelle prime ore del mattino per evitare il caldo; porta acqua e scarpe comode.',
            en: 'Park always open, free entry. Palmavera nuraghe 9:00–19:00 in summer, admission ~€5. "Le Prigionette" tour by reservation, ~€10. Visit the nuraghe early in the morning to avoid the heat; bring water and sturdy shoes.',
            fr: "Parc toujours ouvert, accès gratuit. Nuraghe Palmavera 9h00–19h00 en été, entrée ~5 €. Tour « Le Prigionette » sur réservation, ~10 €. Visitez le nuraghe tôt le matin pour éviter la chaleur ; prévoyez de l'eau et de bonnes chaussures.",
            de: 'Park immer geöffnet, Eintritt frei. Nuraghe Palmavera 9:00–19:00 im Sommer, Eintritt ~5 €. Tour „Le Prigionette" auf Voranmeldung, ~10 €. Besuchen Sie den Nuraghe früh am Morgen, um die Hitze zu vermeiden; Wasser und feste Schuhe mitnehmen.'
          }
        },
        {
          id: 'aragosta-catalana',
          slug: 'cucina-catalana',
          title: {
            it: 'Aragosta alla catalana', en: 'Catalan-style lobster',
            fr: 'Langouste à la catalane', de: 'Hummer nach katalanischer Art'
          },
          distance: {
            it: '5 min a piedi', en: '5 min on foot',
            fr: '5 min à pied',  de: '5 Min. zu Fuß'
          },
          image: 'img/alghero/dintorni/aragosta-alla-catalana.webp',
          description: {
            it: "L'aragosta alla catalana è il piatto simbolo di Alghero e uno dei più celebri della cucina sarda. La ricetta d'ispirazione catalana prevede l'aragosta bollita servita a temperatura ambiente su un letto di pomodori a fette, cipolla rossa, prezzemolo e un filo d'olio extravergine sardo. Semplice, ma di una bontà straordinaria quando l'aragosta è fresca e pescata localmente.",
            en: "Catalan-style lobster is Alghero's signature dish and one of the most celebrated in Sardinian cuisine. The Catalan-inspired recipe calls for boiled lobster served at room temperature on a bed of sliced tomatoes, red onion, parsley and a drizzle of Sardinian extra-virgin olive oil. Simple, but extraordinary when the lobster is fresh and locally caught.",
            fr: "La langouste à la catalane est le plat symbole d'Alghero et l'un des plus célèbres de la cuisine sarde. La recette d'inspiration catalane consiste en une langouste bouillie servie à température ambiante sur un lit de tomates tranchées, oignon rouge, persil et un filet d'huile d'olive sarde extra vierge. Simple, mais d'une bonté extraordinaire quand la langouste est fraîche et pêchée localement.",
            de: 'Hummer nach katalanischer Art ist das Wahrzeichengericht Algheros und eines der berühmtesten der sardischen Küche. Das katalanisch inspirierte Rezept: gekochter Hummer, zimmerwarm serviert auf einem Bett aus Tomatenscheiben, roter Zwiebel, Petersilie und einem Spritzer sardischem Olivenöl extra vergine. Einfach, aber außergewöhnlich, wenn der Hummer frisch und lokal gefangen ist.'
          },
          practical: {
            it: 'Ristoranti del centro storico e del porto famosi per la qualità dei prodotti ittici. Cena 19:30–23:00, pranzo 12:30–14:30 (non sempre disponibile). Aragosta intera ~40–60 € a persona a seconda del peso. Chiedi sempre il prezzo al chilo prima di ordinare; in alta stagione prenota con due-tre giorni di anticipo. Abbinamento ideale: Torbato di Alghero DOC.',
            en: 'Restaurants in the old town and harbour are known for the quality of their seafood. Dinner 19:30–23:00, lunch 12:30–14:30 (not always available). Whole lobster ~€40–60 per person depending on weight. Always ask the price per kilo before ordering; in high season book two or three days ahead. Ideal pairing: Torbato di Alghero DOC.',
            fr: "Restaurants du centre historique et du port réputés pour la qualité de leurs produits de la mer. Dîner 19h30–23h00, déjeuner 12h30–14h30 (pas toujours disponible). Langouste entière ~40–60 € par personne selon le poids. Demandez toujours le prix au kilo avant de commander ; en haute saison, réservez deux ou trois jours à l'avance. Accord idéal : Torbato di Alghero DOC.",
            de: 'Restaurants in der Altstadt und am Hafen sind für die Qualität ihrer Meeresfrüchte bekannt. Abendessen 19:30–23:00, Mittagessen 12:30–14:30 (nicht immer verfügbar). Ganzer Hummer ~40–60 € pro Person je nach Gewicht. Fragen Sie immer den Kilopreis vor der Bestellung; in der Hochsaison zwei bis drei Tage im Voraus reservieren. Perfekte Begleitung: Torbato di Alghero DOC.'
          }
        },
        {
          id: 'sella-mosca',
          slug: 'cantina-sella-mosca',
          title: {
            it: 'Cantina Sella & Mosca', en: 'Sella & Mosca winery',
            fr: 'Cave Sella & Mosca',    de: 'Weingut Sella & Mosca'
          },
          distance: {
            it: '5 km in auto', en: '5 km by car',
            fr: '5 km en voiture', de: '5 km mit dem Auto'
          },
          image: 'img/alghero/dintorni/cantina-sella-mosca.jpg',
          description: {
            it: "La Cantina Sella & Mosca è uno dei monumenti enogastronomici della Sardegna: fondata nel 1899, si estende su oltre 650 ettari di vigneti alle porte di Alghero, una delle più grandi tenute vinicole a conduzione unitaria d'Europa. Qui si producono il Torbato di Alghero (vitigno autoctono recuperato), il Cannonau di Sardegna, il Vermentino e le Terre Rare.",
            en: 'The Sella & Mosca winery is one of Sardinia\'s food-and-wine landmarks: founded in 1899, it stretches over 650 hectares of vineyards at the gates of Alghero — one of Europe\'s largest single-estate wine properties. Here they produce Torbato di Alghero (a recovered native grape), Cannonau di Sardegna, Vermentino and Terre Rare.',
            fr: "La cave Sella & Mosca est l'un des monuments œnogastronomiques de la Sardaigne : fondée en 1899, elle s'étend sur plus de 650 hectares de vignes aux portes d'Alghero, l'un des plus grands domaines viticoles d'un seul tenant d'Europe. On y produit le Torbato di Alghero (cépage autochtone réhabilité), le Cannonau di Sardegna, le Vermentino et les Terre Rare.",
            de: 'Das Weingut Sella & Mosca ist eines der önogastronomischen Wahrzeichen Sardiniens: 1899 gegründet, erstreckt es sich über mehr als 650 Hektar Weinberge vor den Toren Algheros — eines der größten geschlossenen Weingüter Europas. Hier entstehen Torbato di Alghero (eine wiederentdeckte autochthone Rebsorte), Cannonau di Sardegna, Vermentino und Terre Rare.'
          },
          practical: {
            it: 'Lunedì–sabato 9:00–18:00 (aprile–ottobre), tour guidati su prenotazione. Degustazione ~15–25 € a persona, include tre-quattro vini. Prenota online con anticipo, soprattutto in agosto. A 200 metri dalla cantina c\'è la Necropoli di Anghelu Ruju, tombe ipogeiche del 3.500 a.C. — combina le due visite.',
            en: 'Monday–Saturday 9:00–18:00 (April–October), guided tours by reservation. Tasting ~€15–25 per person, includes three or four wines. Book online in advance, especially in August. 200 metres from the winery stands the Anghelu Ruju necropolis, hypogeum tombs from 3,500 BC — combine the two visits.',
            fr: "Lundi–samedi 9h00–18h00 (avril–octobre), visites guidées sur réservation. Dégustation ~15–25 € par personne, trois à quatre vins inclus. Réservez en ligne à l'avance, surtout en août. À 200 mètres de la cave se trouve la nécropole d'Anghelu Ruju, tombes hypogées de 3 500 av. J.-C. — à combiner avec la visite.",
            de: 'Montag–Samstag 9:00–18:00 (April–Oktober), Führungen nach Voranmeldung. Verkostung ~15–25 € pro Person, umfasst drei bis vier Weine. Online im Voraus buchen, besonders im August. 200 Meter vom Weingut liegt die Nekropole von Anghelu Ruju, Hypogäengräber aus 3.500 v. Chr. — die beiden Besuche kombinieren.'
          }
        }
      ],
      guide: [
        {
          id: 'eat', icon: '🍽️',
          items: [
            {
              name: 'Al Tuguri',
              desc: { it: 'Cucina catalana storica, centro storico — prenota sempre', en: 'Historic Catalan cuisine, old town — always book ahead', fr: 'Cuisine catalane historique, vieille ville — réservez toujours', de: 'Historische katalanische Küche, Altstadt — immer reservieren' },
              href: 'https://www.google.com/maps/search/?api=1&query=Al+Tuguri+Alghero'
            },
            {
              name: 'Il Pavone',
              desc: { it: 'Piazza Civica, vista bastioni, pesce e carne sarda', en: 'Piazza Civica, bastion view, fish and Sardinian meat', fr: 'Piazza Civica, vue sur les bastions, poisson et viande sarde', de: 'Piazza Civica, Blick auf die Bastionen, Fisch und sardisches Fleisch' },
              href: 'https://www.google.com/maps/search/?api=1&query=Il+Pavone+Alghero'
            },
            {
              name: 'Ristorante La Piazzetta',
              desc: { it: 'Cucina di mare, ottimo rapporto qualità-prezzo', en: 'Seafood cuisine, excellent value for money', fr: 'Cuisine de la mer, excellent rapport qualité-prix', de: 'Meeresküche, hervorragendes Preis-Leistungs-Verhältnis' },
              href: 'https://www.google.com/maps/search/?api=1&query=Ristorante+La+Piazzetta+Alghero'
            },
            {
              name: 'Trattoria Lo Quarter',
              desc: { it: 'Cucina sarda tradizionale, malloreddus e pecorino', en: 'Traditional Sardinian cuisine, malloreddus and pecorino', fr: 'Cuisine sarde traditionnelle, malloreddus et pecorino', de: 'Traditionelle sardische Küche, Malloreddus und Pecorino' },
              href: 'https://www.google.com/maps/search/?api=1&query=Trattoria+Lo+Quarter+Alghero'
            }
          ]
        },
        {
          id: 'excursions', icon: '⛵',
          items: [
            {
              name: { it: 'Grotte di Nettuno', en: 'Grottoes of Neptune', fr: 'Grottes de Neptune', de: 'Neptungrotten' },
              desc: { it: 'In barca da Alghero (45 min) o via Scala del Cabirol', en: 'By boat from Alghero (45 min) or via the Escala del Cabirol', fr: "En bateau depuis Alghero (45 min) ou par l'Escala del Cabirol", de: 'Mit dem Boot von Alghero (45 Min.) oder über die Escala del Cabirol' },
              href: 'https://grottadinettuno.it/'
            },
            {
              name: 'Nuraghe Palmavera',
              desc: { it: 'Complesso nuragico a 10 km: torre centrale, 3.500 anni di storia', en: 'Nuraghic complex 10 km away: central tower, 3,500 years of history', fr: 'Complexe nuragique à 10 km : tour centrale, 3 500 ans d\'histoire', de: 'Nuraghen-Komplex 10 km entfernt: Zentralturm, 3.500 Jahre Geschichte' },
              href: 'https://nuraghepalmavera.it/'
            },
            {
              name: { it: 'Cantine Sella & Mosca', en: 'Sella & Mosca winery', fr: 'Cave Sella & Mosca', de: 'Weingut Sella & Mosca' },
              desc: { it: 'Degustazione Vermentino e Cannonau, visita vigneti', en: 'Vermentino and Cannonau tasting, vineyard visit', fr: 'Dégustation Vermentino et Cannonau, visite des vignes', de: 'Verkostung von Vermentino und Cannonau, Besuch der Weinberge' },
              href: 'https://www.sellaemosca.com/site/it/la_cantina/'
            },
            {
              name: { it: 'Parco di Porto Conte', en: 'Porto Conte Park', fr: 'Parc de Porto Conte', de: 'Porto-Conte-Park' },
              desc: { it: 'Area marina protetta, trekking e avvistamento animali', en: 'Marine protected area, trekking and wildlife watching', fr: 'Aire marine protégée, randonnée et observation de la faune', de: 'Meeresschutzgebiet, Wandern und Tierbeobachtung' },
              href: 'https://www.algheroparks.it/'
            }
          ]
        },
        {
          id: 'services', icon: '🛒',
          items: [
            {
              name: 'Supermercato Lidl / Conad',
              desc: { it: "A 10 min dall'appartamento, ampia scelta di prodotti locali", en: '10 min from the apartment, wide choice of local products', fr: "À 10 min de l'appartement, large choix de produits locaux", de: '10 Min. von der Wohnung, große Auswahl an lokalen Produkten' },
              href: 'https://www.google.com/maps/search/?api=1&query=Supermercato+Alghero'
            },
            {
              name: { it: 'Farmacia Centrale', en: 'Central pharmacy', fr: 'Pharmacie centrale', de: 'Zentrale Apotheke' },
              desc: { it: 'Centro storico, turno notturno in estate', en: 'Old town, night-duty service in summer', fr: 'Vieille ville, service de nuit en été', de: 'Altstadt, Nachtdienst im Sommer' },
              href: 'https://www.google.com/maps/search/?api=1&query=Farmacia+Centrale+Alghero'
            },
            {
              name: 'Bike Alghero',
              desc: { it: 'Noleggio bici ed e-bike, consegna e ritiro su richiesta', en: 'Bike and e-bike rental, delivery and pick-up on request', fr: 'Location de vélos et VAE, livraison et retrait sur demande', de: 'Fahrrad- und E-Bike-Verleih, Lieferung und Abholung auf Anfrage' },
              href: 'https://www.bikealghero.com/it/'
            },
            {
              name: { it: 'Aeroporto di Fertilia', en: 'Fertilia Airport', fr: 'Aéroport de Fertilia', de: 'Flughafen Fertilia' },
              desc: { it: "A soli 10 minuti dall'appartamento in auto", en: 'Just 10 minutes by car from the apartment', fr: "À seulement 10 minutes de l'appartement en voiture", de: 'Nur 10 Autominuten von der Wohnung entfernt' },
              href: 'https://www.aeroportodialghero.it/'
            }
          ]
        }
      ]
    }
  ];

  // "Cosa è incluso" — real amenities, universally inclusive + a couple per-house.
  // Tag: Incluso | Su richiesta. Glyphs stay coherent with V2 design language.
  var included = [
    {
      id: 'aria', icon: '☌', tag: 'Incluso',
      name: {
        it: 'Aria condizionata',  en: 'Air conditioning',
        fr: 'Climatisation',      de: 'Klimaanlage'
      },
      one_line: {
        it: 'In ogni stanza, inclusa nel prezzo.',
        en: 'In every room, included in the price.',
        fr: 'Dans chaque pièce, inclus dans le prix.',
        de: 'In jedem Zimmer, im Preis enthalten.'
      },
      body: {
        it: 'Climatizzazione caldo/freddo in tutte le camere e nella zona giorno. In luglio e agosto, quando la Sardegna supera i trenta gradi, è una cosa che conta davvero.',
        en: 'Heating and cooling in every bedroom and the living area. In July and August, when Sardinia pushes past thirty degrees, it really matters.',
        fr: "Chauffage et climatisation dans chaque chambre et dans le séjour. En juillet et août, quand la Sardaigne dépasse les trente degrés, ça compte vraiment.",
        de: 'Heizung und Kühlung in jedem Zimmer und im Wohnbereich. Im Juli und August, wenn Sardinien über dreißig Grad klettert, zählt das wirklich.'
      }
    },
    {
      id: 'cucina', icon: '⌗', tag: 'Incluso',
      name: {
        it: 'Cucina attrezzata', en: 'Full kitchen',
        fr: 'Cuisine équipée',    de: 'Voll ausgestattete Küche'
      },
      one_line: {
        it: 'Piatti, pentole, macchinetta del caffè, lavastoviglie.',
        en: 'Plates, pots, coffee machine, dishwasher.',
        fr: 'Vaisselle, casseroles, machine à café, lave-vaisselle.',
        de: 'Geschirr, Töpfe, Kaffeemaschine, Geschirrspüler.'
      },
      body: {
        it: "Tutto quello che serve per cucinare sul serio, non per arrangiarsi. Forno, piano cottura, frigorifero grande, stoviglie per il numero di ospiti massimo della casa.",
        en: "Everything you need to cook properly, not just get by. Oven, hob, large fridge, enough tableware for the maximum number of guests the house holds.",
        fr: "Tout ce qu'il faut pour vraiment cuisiner, pas pour se débrouiller. Four, plaques, grand frigo, vaisselle pour le nombre maximum d'hôtes de la maison.",
        de: 'Alles, was man zum richtigen Kochen braucht — nicht nur zum Improvisieren. Backofen, Kochfeld, großer Kühlschrank, Geschirr für die maximale Belegung des Hauses.'
      }
    },
    {
      id: 'biancheria', icon: '≈', tag: 'Incluso',
      name: {
        it: 'Biancheria e pulizie finali', en: 'Linen and final cleaning',
        fr: 'Linge et ménage final',        de: 'Wäsche und Endreinigung'
      },
      one_line: {
        it: 'Lenzuola, asciugamani, pulizia a fine soggiorno.',
        en: 'Sheets, towels, cleaning at the end of your stay.',
        fr: 'Draps, serviettes, ménage en fin de séjour.',
        de: 'Bettwäsche, Handtücher, Reinigung am Ende des Aufenthalts.'
      },
      body: {
        it: 'Biancheria da letto e da bagno inclusa, cambio al giro letto per soggiorni lunghi. Le pulizie finali sono a carico nostro: voi chiudete la porta e basta.',
        en: 'Bed and bath linen included, a mid-stay change for longer visits. Final cleaning is on us — you just close the door on the way out.',
        fr: 'Linge de lit et de bain inclus, un changement à mi-séjour pour les longs séjours. Le ménage final est pour nous : vous fermez simplement la porte en partant.',
        de: 'Bett- und Handwäsche inklusive, bei längeren Aufenthalten ein Wechsel in der Mitte. Die Endreinigung übernehmen wir — Sie schließen einfach die Tür hinter sich ab.'
      }
    },
    {
      id: 'wifi', icon: '→', tag: 'Incluso',
      name: {
        it: 'WiFi fibra', en: 'Fibre WiFi',
        fr: 'WiFi fibre', de: 'Glasfaser-WLAN'
      },
      one_line: {
        it: 'Connessione a circa 100 Mbps in tutta la casa.',
        en: 'About 100 Mbps throughout the house.',
        fr: 'Environ 100 Mbps dans toute la maison.',
        de: 'Rund 100 Mbit/s im ganzen Haus.'
      },
      body: {
        it: 'Una linea che regge lo streaming, le videochiamate e il lavoro da remoto in bassa stagione. Non pensavate di lavorare? Nemmeno noi — ma se serve, funziona.',
        en: "A line that handles streaming, video calls and remote work in the shoulder season. Weren't planning on working? Neither were we — but if you need to, it holds up.",
        fr: "Une ligne qui supporte le streaming, la visio et le télétravail en basse saison. Vous ne pensiez pas travailler ? Nous non plus — mais si besoin, ça marche.",
        de: 'Eine Leitung, die Streaming, Videocalls und Fernarbeit in der Nebensaison trägt. Sie wollten gar nicht arbeiten? Wir auch nicht — aber falls doch, funktioniert es.'
      }
    },
    {
      id: 'lavatrice', icon: '✽', tag: 'Incluso',
      name: {
        it: 'Lavatrice',     en: 'Washing machine',
        fr: 'Lave-linge',    de: 'Waschmaschine'
      },
      one_line: {
        it: 'Utile dopo una settimana fra mare e sabbia.',
        en: 'Useful after a week of sand and sea.',
        fr: 'Utile après une semaine entre mer et sable.',
        de: 'Nützlich nach einer Woche zwischen Meer und Sand.'
      },
      body: {
        it: "Carica libera, detersivo di cortesia per il primo lavaggio. Stendere fuori si può, il sole sardo fa il suo lavoro in un paio d'ore.",
        en: 'Top-load, complimentary detergent for your first wash. You can hang the laundry outside — the Sardinian sun does its job in a couple of hours.',
        fr: "Chargement libre, lessive de courtoisie pour le premier cycle. On peut étendre dehors, le soleil sarde fait le travail en deux heures.",
        de: 'Frei beladbar, Waschmittel für den ersten Gang als Willkommen. Draußen aufhängen geht gut — die sardische Sonne erledigt den Rest in zwei Stunden.'
      }
    },
    {
      id: 'tv', icon: '◦', tag: 'Incluso',
      name: {
        it: 'TV Smart', en: 'Smart TV',
        fr: 'TV Smart', de: 'Smart-TV'
      },
      one_line: {
        it: 'Streaming, app, canali nazionali.',
        en: 'Streaming, apps, national channels.',
        fr: 'Streaming, applis, chaînes nationales.',
        de: 'Streaming, Apps, nationale Sender.'
      },
      body: {
        it: 'Smart TV nel soggiorno con accesso alle principali piattaforme. Non vi giudicheremo se passerete una serata di pioggia a guardarla.',
        en: "Smart TV in the living room with all the main platforms. We won't judge if you spend a rainy evening watching it.",
        fr: "TV connectée au salon, toutes les grandes plateformes. On ne vous jugera pas si vous passez une soirée de pluie devant.",
        de: 'Smart-TV im Wohnzimmer mit allen wichtigen Plattformen. Kein böses Wort, wenn Sie einen Regenabend davor verbringen.'
      }
    },
    {
      id: 'parcheggio', icon: '☌', tag: 'Incluso',
      name: {
        it: 'Parcheggio',    en: 'Parking',
        fr: 'Stationnement', de: 'Parkplatz'
      },
      one_line: {
        it: 'Privato a Stintino, gratuito su strada ad Alghero.',
        en: 'Private in Stintino, free on the street in Alghero.',
        fr: 'Privé à Stintino, gratuit en rue à Alghero.',
        de: 'Privat in Stintino, kostenlos auf der Straße in Alghero.'
      },
      body: {
        it: "A Stintino trovate posto dentro il giardino della villa. Ad Alghero parcheggio gratuito su strada nelle vie attorno al palazzo, di solito senza problemi anche in alta stagione.",
        en: "In Stintino you park inside the villa's garden. In Alghero there's free on-street parking in the roads around the building — usually no trouble finding a spot even in high season.",
        fr: "À Stintino, on se gare dans le jardin de la villa. À Alghero, stationnement gratuit en rue dans les voies autour de l'immeuble — généralement sans souci même en haute saison.",
        de: 'In Stintino parken Sie im Garten der Villa. In Alghero gibt es kostenlose Parkplätze auf der Straße in den umliegenden Gassen — auch in der Hochsaison meist problemlos.'
      }
    },
    {
      id: 'extra', icon: '⌗', tag: 'Incluso',
      name: {
        it: 'Barbecue, balcone, ascensore',
        en: 'Barbecue, balcony, lift',
        fr: 'Barbecue, balcon, ascenseur',
        de: 'Grill, Balkon, Aufzug'
      },
      one_line: {
        it: 'Per la casa giusta, quello che la rende giusta.',
        en: "For each house, what makes it right.",
        fr: "Pour chaque maison, ce qui la rend juste.",
        de: 'Für jedes Haus das, was es ausmacht.'
      },
      body: {
        it: 'A Stintino: barbecue, lettini e tavolo da pranzo in giardino. Ad Alghero: balcone sul cortile interno, ascensore per risparmiarsi i piani a fine giornata.',
        en: "In Stintino: barbecue, sunloungers and a dining table in the garden. In Alghero: balcony over the inner courtyard, and a lift to save you the stairs at the end of the day.",
        fr: "À Stintino : barbecue, chaises longues et table dans le jardin. À Alghero : balcon sur la cour intérieure, ascenseur pour s'épargner les étages en fin de journée.",
        de: 'In Stintino: Grill, Liegen und Esstisch im Garten. In Alghero: Balkon zum Innenhof und Aufzug, um sich die Treppen am Abend zu sparen.'
      }
    },
    {
      id: 'culla', icon: '≈', tag: 'Su richiesta',
      name: {
        it: 'Culla e seggiolone',   en: 'Cot and high chair',
        fr: 'Berceau et chaise haute', de: 'Babybett und Hochstuhl'
      },
      one_line: {
        it: 'Per chi viaggia con bambini piccoli.',
        en: 'For guests travelling with small children.',
        fr: 'Pour les hôtes qui voyagent avec de jeunes enfants.',
        de: 'Für Gäste, die mit kleinen Kindern reisen.'
      },
      body: {
        it: "Culla da campeggio e seggiolone disponibili in entrambe le case. Ci segnalate l'età del bambino quando prenotate e li troviamo in camera all'arrivo.",
        en: "Travel cot and high chair available in both houses. Let us know the child's age when you book and we'll have them ready in the room on arrival.",
        fr: "Lit parapluie et chaise haute disponibles dans les deux maisons. Dites-nous l'âge de l'enfant à la réservation et nous les trouverez dans la chambre à l'arrivée.",
        de: 'Reisebett und Hochstuhl in beiden Häusern verfügbar. Teilen Sie uns bei der Buchung das Alter des Kindes mit — sie stehen bei Ankunft bereit.'
      }
    }
  ];

  // Ticker: Sardinian places only — stop pretending we have six regions
  var tickerWords = [
    'Stintino', 'Alghero', 'Pelosa', 'Capo Falcone', 'Asinara',
    'Capo Caccia', 'Porto Conte', 'Riviera del Corallo',
    'Bombarde', 'Lazzaretto', 'Vermentino', 'Torbato'
  ];

  // FAQs: 5 cross-cutting, adapted from V1 Alghero+Stintino real FAQs
  var faqs = [
    {
      q: {
        it: 'Come si effettua la prenotazione?',
        en: 'How do I book?',
        fr: 'Comment réserver ?',
        de: 'Wie buche ich?'
      },
      a: {
        it: "Scrivici dal modulo di contatto o via email. Rispondiamo entro ventiquattro ore con disponibilità e condizioni. Il trenta percento di caparra conferma la data; il saldo una settimana prima dell'arrivo.",
        en: 'Write to us through the contact form or by email. We reply within twenty-four hours with availability and terms. A thirty percent deposit confirms the dates; the balance is paid a week before arrival.',
        fr: "Écrivez-nous via le formulaire de contact ou par e-mail. Réponse sous vingt-quatre heures avec les disponibilités et les conditions. Un acompte de trente pour cent confirme les dates ; le solde est réglé une semaine avant l'arrivée.",
        de: 'Schreiben Sie uns über das Kontaktformular oder per E-Mail. Antwort innerhalb von vierundzwanzig Stunden mit Verfügbarkeit und Konditionen. Eine Anzahlung von dreißig Prozent bestätigt die Daten; der Rest wird eine Woche vor Anreise bezahlt.'
      }
    },
    {
      q: {
        it: 'Sono ammessi animali domestici?',
        en: 'Are pets allowed?',
        fr: 'Les animaux sont-ils acceptés ?',
        de: 'Sind Haustiere erlaubt?'
      },
      a: {
        it: 'Al momento no, in nessuna delle due case — ad Alghero è il regolamento condominiale a impedirlo, a Stintino è una scelta nostra. Per casi particolari, scriveteci: ne parliamo.',
        en: "For now, no — in neither house. In Alghero the building rules forbid it, in Stintino it's our choice. For exceptional cases, write to us and we'll talk it through.",
        fr: "Pour l'instant non, dans aucune des deux maisons — à Alghero c'est le règlement de la copropriété, à Stintino c'est notre choix. Cas particuliers : écrivez-nous, on en parle.",
        de: 'Derzeit nein, in keinem der beiden Häuser — in Alghero verbietet es die Hausordnung, in Stintino ist es unsere Entscheidung. Für besondere Fälle schreiben Sie uns: wir sprechen darüber.'
      }
    },
    {
      q: {
        it: 'Cosa è incluso nel prezzo?',
        en: "What's included in the price?",
        fr: 'Que comprend le prix ?',
        de: 'Was ist im Preis enthalten?'
      },
      a: {
        it: "Soggiorno, biancheria da letto e da bagno, pulizia finale, WiFi in fibra, aria condizionata, utenze. La tassa di soggiorno comunale è a parte e si salda all'arrivo.",
        en: 'The stay, bed and bath linen, final cleaning, fibre WiFi, air conditioning, utilities. The municipal tourist tax is separate and paid on arrival.',
        fr: "Le séjour, le linge de lit et de bain, le ménage final, le WiFi fibre, la climatisation, les charges. La taxe de séjour communale est à part et se règle à l'arrivée.",
        de: 'Der Aufenthalt, Bett- und Handwäsche, Endreinigung, Glasfaser-WLAN, Klimaanlage, Nebenkosten. Die kommunale Kurtaxe ist separat und wird bei der Anreise bezahlt.'
      }
    },
    {
      q: {
        it: 'Come funzionano le cancellazioni?',
        en: 'How do cancellations work?',
        fr: 'Comment fonctionnent les annulations ?',
        de: 'Wie funktionieren Stornierungen?'
      },
      a: {
        it: 'Fino a trenta giorni prima dell\'arrivo: rimborso completo meno dieci percento. Fra trenta e quattordici giorni: rimborso del cinquanta percento. Sotto i quattordici giorni: nessun rimborso, ma proviamo sempre a rivendere le date e vi ricontattiamo.',
        en: "Up to thirty days before arrival: full refund less ten percent. Between thirty and fourteen days: fifty percent refund. Under fourteen days: no refund, but we always try to re-book the dates and we'll get back to you.",
        fr: "Jusqu'à trente jours avant l'arrivée : remboursement intégral moins dix pour cent. Entre trente et quatorze jours : remboursement de cinquante pour cent. Moins de quatorze jours : pas de remboursement, mais on essaie toujours de relouer les dates et on vous recontacte.",
        de: 'Bis dreißig Tage vor Anreise: vollständige Rückerstattung abzüglich zehn Prozent. Zwischen dreißig und vierzehn Tagen: fünfzig Prozent Rückerstattung. Unter vierzehn Tagen: keine Rückerstattung, aber wir versuchen immer, die Termine neu zu vermieten, und melden uns bei Ihnen.'
      }
    },
    {
      q: {
        it: 'Come funziona il check-in?',
        en: 'How does check-in work?',
        fr: 'Comment se passe le check-in ?',
        de: 'Wie funktioniert der Check-in?'
      },
      a: {
        it: "Check-in dalle sedici, check-out entro le dieci. Possiamo organizzare arrivi tardivi (entro mezzanotte) o check-in autonomo con cassetta di sicurezza. Segnalateci l'orario stimato il giorno prima: ci sentiamo direttamente.",
        en: 'Check-in from four in the afternoon, check-out by ten in the morning. We can arrange late arrivals (up to midnight) or self check-in with a lockbox. Let us know the estimated time the day before — we stay in direct touch.',
        fr: "Check-in à partir de seize heures, check-out avant dix heures. On peut organiser les arrivées tardives (jusqu'à minuit) ou un check-in autonome avec boîte à clés. Indiquez-nous l'heure estimée la veille — on est en contact direct.",
        de: 'Check-in ab sechzehn Uhr, Check-out bis zehn Uhr. Späte Anreisen (bis Mitternacht) oder Self-Check-in mit Schlüsselbox sind möglich. Teilen Sie uns die ungefähre Uhrzeit am Vortag mit — wir bleiben in direktem Kontakt.'
      }
    },
    {
      q: {
        it: 'Come si arriva?',
        en: 'How do I get there?',
        fr: 'Comment y arriver ?',
        de: 'Wie kommt man hin?'
      },
      a: {
        it: "L'aeroporto più vicino è Alghero-Fertilia (AHO): dieci minuti in auto dall'appartamento di Alghero, un'ora dalla villa di Stintino. Voli diretti da tutta Europa. In alternativa, traghetti per Porto Torres (30 km da Stintino) da Genova, Civitavecchia e Barcellona, oppure Olbia (due ore d'auto). Consigliamo sempre di noleggiare un'auto in aeroporto: le distanze fra le due case e i posti più belli del nord-ovest si coprono comode con la macchina.",
        en: "The nearest airport is Alghero-Fertilia (AHO): ten minutes by car from the apartment in Alghero, an hour from the villa in Stintino. Direct flights from across Europe. As an alternative, ferries to Porto Torres (30 km from Stintino) from Genoa, Civitavecchia and Barcelona, or to Olbia (two hours by car). We always recommend renting a car at the airport: distances between the two houses and the finest spots in the north-west are most comfortable by car.",
        fr: "L'aéroport le plus proche est Alghero-Fertilia (AHO) : dix minutes en voiture depuis l'appartement d'Alghero, une heure depuis la villa de Stintino. Vols directs depuis toute l'Europe. En alternative, ferries pour Porto Torres (30 km de Stintino) depuis Gênes, Civitavecchia et Barcelone, ou pour Olbia (deux heures en voiture). Nous conseillons toujours de louer une voiture à l'aéroport : les distances entre les deux maisons et les plus beaux endroits du nord-ouest se parcourent confortablement en voiture.",
        de: 'Der nächste Flughafen ist Alghero-Fertilia (AHO): zehn Autominuten von der Wohnung in Alghero, eine Stunde von der Villa in Stintino. Direktflüge aus ganz Europa. Als Alternative Fähren nach Porto Torres (30 km von Stintino) aus Genua, Civitavecchia und Barcelona, oder nach Olbia (zwei Autostunden). Wir empfehlen immer, am Flughafen ein Auto zu mieten: Die Entfernungen zwischen beiden Häusern und den schönsten Orten des Nordwestens lassen sich bequem mit dem Auto zurücklegen.'
      }
    }
  ];

  // --------------------------------------------------------------------
  // LUOGHI — pagine interne di approfondimento per il carosello "Luoghi
  // da vedere" della pagina Stintino (route: #/luogo/:slug).
  // Contenuti pensati in ottica SEO: H1/H2 chiare, testi lunghi ricchi
  // di parole chiave naturali, distanze da Stintino esplicite.
  // --------------------------------------------------------------------
  var luoghi = [
    {
      slug: 'spiaggia-la-pelosa',
      parent: 'villa-stintino',
      name: {
        it: 'Spiaggia della Pelosa',
        en: 'La Pelosa beach',
        fr: 'Plage de La Pelosa',
        de: 'Strand La Pelosa'
      },
      subtitle: {
        it: 'Una delle spiagge più belle d\'Europa, a cinque minuti dalla villa',
        en: 'One of the most beautiful beaches in Europe, five minutes from the villa',
        fr: 'L\'une des plus belles plages d\'Europe, à cinq minutes de la villa',
        de: 'Einer der schönsten Strände Europas, fünf Minuten von der Villa'
      },
      location: {
        it: 'Stintino · Golfo dell\'Asinara',
        en: 'Stintino · Gulf of Asinara',
        fr: 'Stintino · Golfe de l\'Asinara',
        de: 'Stintino · Golf von Asinara'
      },
      distance: {
        it: '5 minuti a piedi dalla villa',
        en: '5 minutes on foot from the villa',
        fr: '5 minutes à pied de la villa',
        de: '5 Minuten zu Fuß von der Villa'
      },
      hero: 'img/stintino/dintorni/spiaggia-la-pelosa.png',
      heroFocus: 'center center',
      intro: {
        it: "La Spiaggia della Pelosa è il simbolo di Stintino e una delle spiagge più fotografate al mondo: sabbia bianca finissima, acqua trasparente con gradazioni che vanno dal verde al turchese più acceso, un fondale di posidonia che ondeggia appena sotto la superficie e, sullo sfondo, la Torre della Pelosa aragonese del XVI secolo che sembra galleggiare su un piccolo isolotto. A soli cinque minuti a piedi dalla villa, è la prima meta per chi soggiorna da noi — ma è anche un ecosistema fragile, protetto da un regolamento d'accesso che vale la pena conoscere prima di arrivare.",
        en: "La Pelosa beach is the symbol of Stintino and one of the most photographed beaches in the world: fine white sand, transparent water shifting from green to the brightest turquoise, a seagrass bed swaying just below the surface, and in the background the 16th-century Aragonese Pelosa Tower seeming to float on a small islet. Just five minutes on foot from the villa, it's the first destination for those staying with us — but it is also a fragile ecosystem, protected by access rules worth knowing before you arrive.",
        fr: "La plage de La Pelosa est le symbole de Stintino et l'une des plages les plus photographiées au monde : sable blanc très fin, eau transparente aux nuances allant du vert au turquoise le plus vif, un fond de posidonie qui ondule juste sous la surface et, en arrière-plan, la tour aragonaise de La Pelosa du XVIᵉ siècle qui semble flotter sur un petit îlot. À seulement cinq minutes à pied de la villa, c'est la première destination pour qui séjourne chez nous — mais c'est aussi un écosystème fragile, protégé par un règlement d'accès qu'il vaut la peine de connaître avant d'arriver.",
        de: "Der Strand La Pelosa ist das Wahrzeichen Stintinos und einer der meistfotografierten Strände der Welt: feinster weißer Sand, durchsichtiges Wasser mit Nuancen von Grün bis leuchtendem Türkis, ein Seegrasbett, das knapp unter der Oberfläche wogt, und im Hintergrund der aragonesische Pelosa-Turm aus dem 16. Jahrhundert, der auf einer kleinen Insel zu schweben scheint. Nur fünf Minuten zu Fuß von der Villa entfernt, ist er das erste Ziel für alle, die bei uns wohnen — zugleich ein empfindliches Ökosystem, das durch eine Zugangsregelung geschützt wird, die man vor der Ankunft kennen sollte."
      },
      sections: [
        {
          id: 'paesaggio',
          h2: { it: 'L\'acqua, la sabbia, la torre', en: 'The water, the sand, the tower', fr: 'L\'eau, le sable, la tour', de: 'Das Wasser, der Sand, der Turm' },
          body: {
            it: "La spiaggia è una mezzaluna di sabbia chiara lunga circa quattrocento metri, protetta dalle correnti grazie all'<strong>Isola Piana</strong> e all'<strong>Asinara</strong> che le fanno da frangiflutti naturali. L'acqua è bassissima per decine di metri — ideale per chi va con bambini — e il fondale sabbioso mantiene la trasparenza anche nelle giornate ventose. La <strong>Torre della Pelosa</strong>, costruita nel 1578 come parte del sistema difensivo costiero aragonese contro le incursioni dei pirati barbareschi, sorge su un isolotto davanti alla spiaggia e ne è l'immagine simbolo. Dietro la spiaggia si estende la <strong>riserva naturale</strong>, con la macchia mediterranea bassa e i ginepri che profumano al sole.",
            en: "The beach is a crescent of pale sand about four hundred metres long, sheltered from currents by <strong>Piana island</strong> and <strong>Asinara</strong>, which act as natural breakwaters. The water is very shallow for tens of metres — ideal with children — and the sandy bottom keeps its clarity even on windy days. The <strong>Pelosa Tower</strong>, built in 1578 as part of the Aragonese coastal defence system against Barbary pirate raids, stands on an islet just off the shore and is the beach's signature image. Behind the beach lies the <strong>nature reserve</strong>, with low Mediterranean scrub and junipers fragrant in the sun.",
            fr: "La plage est un croissant de sable clair long d'environ quatre cents mètres, protégé des courants par l'<strong>Isola Piana</strong> et l'<strong>Asinara</strong> qui jouent le rôle de brise-lames naturels. L'eau est très peu profonde sur des dizaines de mètres — idéal avec les enfants — et le fond sableux conserve sa transparence même les jours venteux. La <strong>Tour de La Pelosa</strong>, construite en 1578 dans le cadre du système défensif côtier aragonais contre les incursions des pirates barbaresques, se dresse sur un îlot face à la plage et en est l'image emblématique. Derrière la plage s'étend la <strong>réserve naturelle</strong>, avec le maquis méditerranéen bas et les genévriers qui embaument au soleil.",
            de: "Der Strand ist eine Sichel aus hellem Sand von etwa vierhundert Metern Länge, durch die Inseln <strong>Piana</strong> und <strong>Asinara</strong> wie durch natürliche Wellenbrecher vor Strömungen geschützt. Das Wasser ist auf Dutzende Meter sehr flach — ideal mit Kindern — und der sandige Grund bewahrt seine Klarheit auch an windigen Tagen. Der <strong>Pelosa-Turm</strong>, 1578 als Teil des aragonesischen Küstenverteidigungssystems gegen die Einfälle der Barbareskenpiraten errichtet, steht auf einer der Küste vorgelagerten Insel und ist das Wahrzeichen des Strandes. Hinter dem Strand erstreckt sich das <strong>Naturschutzgebiet</strong> mit niedriger Mittelmeermacchia und in der Sonne duftenden Wacholdern."
          }
        },
        {
          id: 'prenotazione',
          h2: { it: 'La prenotazione obbligatoria', en: 'The mandatory booking', fr: 'La réservation obligatoire', de: 'Die verpflichtende Reservierung' },
          body: {
            it: "Dal 2020, per tutelare l'ecosistema, l'accesso alla Pelosa è <strong>regolamentato tra il 15 maggio e il 15 ottobre</strong>: servono biglietto e prenotazione sul sito ufficiale <strong>spiaggialapelosa.it</strong>. Il costo è di 3,50 € a persona, con un tetto massimo di <strong>1.500 accessi al giorno</strong>. Si paga online con carta e si riceve un QR code da mostrare all'ingresso della spiaggia. Nelle giornate più calde di luglio e agosto i posti si esauriscono con giorni di anticipo: il consiglio è di prenotare appena si conosce la data di arrivo. I bambini sotto i dodici anni non pagano, ma vanno comunque registrati al momento della prenotazione.",
            en: "Since 2020, to protect the ecosystem, access to La Pelosa is <strong>regulated from 15 May to 15 October</strong>: you need a ticket and booking on the official site <strong>spiaggialapelosa.it</strong>. The price is €3.50 per person, with a cap of <strong>1,500 entries per day</strong>. You pay online by card and receive a QR code to show at the beach entrance. On the hottest days of July and August, slots sell out days in advance — we suggest booking as soon as you know your arrival date. Children under twelve do not pay but still need to be registered at the time of booking.",
            fr: "Depuis 2020, pour protéger l'écosystème, l'accès à La Pelosa est <strong>réglementé du 15 mai au 15 octobre</strong> : il faut un billet et une réservation sur le site officiel <strong>spiaggialapelosa.it</strong>. Le prix est de 3,50 € par personne, avec un plafond de <strong>1 500 entrées par jour</strong>. On paie en ligne par carte et on reçoit un QR code à présenter à l'entrée de la plage. Les jours les plus chauds de juillet et d'août, les places se vendent plusieurs jours à l'avance : réservez dès que vous connaissez votre date d'arrivée. Les enfants de moins de douze ans ne paient pas mais doivent être enregistrés au moment de la réservation.",
            de: "Seit 2020 ist der Zugang zu La Pelosa zum Schutz des Ökosystems <strong>vom 15. Mai bis 15. Oktober reglementiert</strong>: Ticket und Reservierung sind auf der offiziellen Website <strong>spiaggialapelosa.it</strong> erforderlich. Der Preis beträgt 3,50 € pro Person, mit einer Obergrenze von <strong>1.500 Zutritten pro Tag</strong>. Die Zahlung erfolgt online per Karte, danach erhält man einen QR-Code, den man am Strandeingang vorzeigt. An den heißesten Tagen im Juli und August sind die Plätze Tage im Voraus ausverkauft — unser Tipp: buchen Sie, sobald Sie Ihr Ankunftsdatum kennen. Kinder unter zwölf Jahren zahlen nicht, müssen aber bei der Buchung registriert werden."
          }
        },
        {
          id: 'quando-andare',
          h2: { it: 'Quando andare, cosa portare', en: 'When to go, what to bring', fr: 'Quand y aller, que prendre', de: 'Wann hingehen, was mitnehmen' },
          body: {
            it: "Il momento migliore è <strong>la prima mattina</strong>, fra le 7:30 e le 10:30, quando la luce è radente, il vento quasi sempre assente e la spiaggia ancora semivuota. Nel tardo pomeriggio, dopo le 17:00, si svuota di nuovo e si gode del tramonto dietro l'Asinara. Nel cuore della giornata, in alta stagione, il caldo si fa sentire molto: c'è poca ombra naturale. Il regolamento vieta <strong>asciugamani a contatto con la sabbia</strong> (serve una stuoia di paglia o un telo tecnico permeabile), <strong>pinne, attrezzi rigidi, sigarette e fumo</strong>. Al ritorno si sciacquano i piedi nelle docce a disposizione — anche qui, senza sapone, per non alterare l'ecosistema. Portate acqua, cappello e crema solare: non ci sono bar sulla spiaggia, ma solo subito fuori.",
            en: "The best time is <strong>early morning</strong>, between 7:30 and 10:30, when the light is raking, the wind almost always absent and the beach still half empty. In the late afternoon, after 17:00, it empties again and you can enjoy sunset behind Asinara. In the middle of the day in high season the heat is intense: there's little natural shade. The rules forbid <strong>towels touching the sand</strong> (you need a straw mat or a permeable technical cloth), <strong>fins, rigid equipment, cigarettes and smoking</strong>. On the way back, rinse your feet at the showers provided — here too, no soap, to avoid altering the ecosystem. Bring water, a hat and sunscreen: there are no bars on the beach, only just outside.",
            fr: "Le meilleur moment, c'est <strong>tôt le matin</strong>, entre 7h30 et 10h30, quand la lumière est rasante, le vent presque toujours absent et la plage encore à moitié vide. En fin d'après-midi, après 17h00, elle se vide à nouveau et on profite du coucher de soleil derrière l'Asinara. Au milieu de la journée en haute saison, la chaleur est forte : il y a peu d'ombre naturelle. Le règlement interdit les <strong>serviettes en contact avec le sable</strong> (il faut une natte en paille ou un tissu technique perméable), les <strong>palmes, équipements rigides, cigarettes et fumée</strong>. Au retour, on rince les pieds aux douches prévues — là aussi sans savon, pour ne pas altérer l'écosystème. Emportez eau, chapeau et crème solaire : pas de bars sur la plage, seulement juste en dehors.",
            de: "Die beste Zeit ist der <strong>frühe Morgen</strong>, zwischen 7:30 und 10:30 Uhr, wenn das Licht streift, der Wind fast immer abwesend und der Strand noch halb leer ist. Am späten Nachmittag, nach 17:00 Uhr, leert er sich erneut, und man genießt den Sonnenuntergang hinter der Asinara. In der Mittagszeit der Hochsaison ist die Hitze groß: natürlicher Schatten ist knapp. Die Regeln verbieten <strong>Handtücher direkt auf dem Sand</strong> (eine Strohmatte oder durchlässiges Technikhandtuch ist nötig), <strong>Flossen, starres Gerät, Zigaretten und Rauchen</strong>. Auf dem Rückweg spült man die Füße an den vorhandenen Duschen ab — auch hier ohne Seife, um das Ökosystem nicht zu belasten. Bringen Sie Wasser, Hut und Sonnencreme mit: Bars gibt es auf dem Strand keine, nur unmittelbar außerhalb."
          }
        }
      ],
      relatedLuoghi: [
        'spiaggia-le-saline',
        'spiaggia-ezzi-mannu'
      ],
      links: {
        official: 'https://www.spiaggialapelosa.it',
        wiki: 'https://it.wikipedia.org/wiki/Spiaggia_della_Pelosa',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+La+Pelosa+Stintino'
      }
    },

    {
      slug: 'porto-stintino',
      parent: 'villa-stintino',
      name: {
        it: 'Porto di Stintino',
        en: 'Port of Stintino',
        fr: 'Port de Stintino',
        de: 'Hafen von Stintino'
      },
      subtitle: {
        it: 'Porto Mannu e Porto Minore, il cuore marinaro del borgo',
        en: 'Porto Mannu and Porto Minore, the seafaring heart of the village',
        fr: 'Porto Mannu et Porto Minore, le cœur marin du village',
        de: 'Porto Mannu und Porto Minore, das maritime Herz des Dorfes'
      },
      location: {
        it: 'Stintino · centro storico',
        en: 'Stintino · old town',
        fr: 'Stintino · centre historique',
        de: 'Stintino · Altstadt'
      },
      distance: {
        it: '10 minuti a piedi dalla villa',
        en: '10 minutes on foot from the villa',
        fr: '10 minutes à pied de la villa',
        de: '10 Minuten zu Fuß von der Villa'
      },
      hero: 'img/stintino/dintorni/stintino-paese.png',
      heroFocus: 'center 40%',
      intro: {
        it: "Il Porto di Stintino è in realtà due porti, e questo raddoppio è il segno dell'identità marinara del borgo. A sud si apre <strong>Porto Mannu</strong>, il porto grande, attivo e trafficato: da qui salpano i traghetti per l'Asinara, attraccano gli yacht estivi, si allineano le banchine dei ristoranti di pesce più frequentati. A nord si nasconde <strong>Porto Minore</strong>, raccolto e pittoresco, ancora oggi dominio delle barche dei pescatori con gli scafi dipinti di azzurro e bianco. Fra i due, il centro storico del borgo, nato nel 1885 quando le famiglie dell'Asinara dovettero abbandonare l'isola per fare posto alla colonia penale.",
        en: "The Port of Stintino is actually two ports, and this doubling is the sign of the village's seafaring identity. To the south opens <strong>Porto Mannu</strong>, the big, busy, active harbour: the ferries to Asinara set off from here, summer yachts dock, and the quays line up with the most popular fish restaurants. To the north lies <strong>Porto Minore</strong>, intimate and picturesque, still today the domain of fishing boats with their blue and white painted hulls. Between the two, the old town, founded in 1885 when the families of Asinara were forced to leave the island to make way for the penal colony.",
        fr: "Le Port de Stintino est en réalité deux ports, et ce dédoublement est le signe de l'identité marine du village. Au sud s'ouvre <strong>Porto Mannu</strong>, le grand port animé et actif : les ferries pour l'Asinara partent d'ici, les yachts estivaux y accostent, les quais s'alignent avec les restaurants de poisson les plus fréquentés. Au nord se cache <strong>Porto Minore</strong>, intime et pittoresque, encore aujourd'hui le domaine des bateaux de pêcheurs aux coques peintes en bleu et blanc. Entre les deux, le centre historique, né en 1885 lorsque les familles de l'Asinara ont dû quitter l'île pour laisser place à la colonie pénitentiaire.",
        de: "Der Hafen von Stintino besteht eigentlich aus zwei Häfen, und diese Verdopplung ist das Zeichen der maritimen Identität des Dorfes. Im Süden öffnet sich <strong>Porto Mannu</strong>, der große, geschäftige Haupthafen: Von hier legen die Fähren zur Asinara ab, Sommeryachten vertäuen, und die Kaimauern sind gesäumt von den beliebtesten Fischrestaurants. Im Norden verbirgt sich <strong>Porto Minore</strong>, klein und malerisch, bis heute Revier der Fischerboote mit ihren blau-weiß bemalten Rümpfen. Zwischen beiden liegt die Altstadt, entstanden 1885, als die Familien der Asinara die Insel verlassen mussten, um der Strafkolonie zu weichen."
      },
      sections: [
        {
          id: 'due-porti',
          h2: { it: 'I due porticcioli', en: 'The two small harbours', fr: 'Les deux petits ports', de: 'Die zwei kleinen Häfen' },
          body: {
            it: "Porto Mannu è il punto di riferimento per chiunque arrivi a Stintino dal mare: ospita gli imbarchi per le escursioni all'Asinara, il noleggio di barche e gommoni, le scuole di diving e i charter per la pesca sportiva. Lungo il suo lungomare si affacciano i locali più animati del borgo. Porto Minore, invece, racconta un'altra storia: qui le reti si stendono ancora al sole sulle banchine, i pescatori riparano motori e scafi come si faceva cinquant'anni fa, e al tramonto il silenzio è rotto solo dal verso dei gabbiani. Una passeggiata di quindici minuti porta da uno all'altro, attraverso le viuzze del centro — ed è proprio in questo contrasto che si capisce l'anima di Stintino.",
            en: "Porto Mannu is the reference point for anyone arriving in Stintino by sea: it hosts departures for Asinara excursions, boat and dinghy rentals, diving schools and sport-fishing charters. Along its seafront, the liveliest bars in the village open up. Porto Minore, instead, tells another story: here nets still dry in the sun on the quays, fishermen repair engines and hulls as they did fifty years ago, and at sunset the silence is broken only by the cry of seagulls. A fifteen-minute walk takes you from one to the other through the alleys of the centre — and it's exactly in this contrast that you grasp Stintino's soul.",
            fr: "Porto Mannu est le point de référence pour qui arrive à Stintino par la mer : embarquements pour les excursions à l'Asinara, location de bateaux et pneumatiques, écoles de plongée et charters de pêche sportive. Sur son front de mer s'ouvrent les lieux les plus animés du village. Porto Minore, au contraire, raconte une autre histoire : ici les filets sèchent encore au soleil sur les quais, les pêcheurs réparent moteurs et coques comme il y a cinquante ans, et au coucher du soleil le silence n'est rompu que par le cri des goélands. Une marche de quinze minutes mène de l'un à l'autre à travers les ruelles du centre — et c'est précisément dans ce contraste qu'on saisit l'âme de Stintino.",
            de: "Porto Mannu ist die Anlaufstelle für alle, die Stintino vom Meer aus erreichen: Hier starten die Ausflüge zur Asinara, es gibt Boots- und Schlauchbootverleih, Tauchschulen und Hochseeangel-Charter. An seiner Uferpromenade öffnen sich die lebhaftesten Lokale des Dorfes. Porto Minore dagegen erzählt eine andere Geschichte: Hier trocknen die Netze noch auf den Kaimauern in der Sonne, die Fischer reparieren Motoren und Rümpfe wie vor fünfzig Jahren, und bei Sonnenuntergang wird die Stille nur vom Schrei der Möwen durchbrochen. Ein fünfzehnminütiger Spaziergang durch die Gassen des Zentrums führt vom einen zum anderen — und gerade in diesem Kontrast versteht man die Seele Stintinos."
          }
        },
        {
          id: 'imbarchi',
          h2: { it: 'Imbarchi per l\'Asinara e gite in barca', en: 'Ferries to Asinara and boat trips', fr: 'Embarquements pour l\'Asinara et excursions en bateau', de: 'Fähren zur Asinara und Bootsausflüge' },
          body: {
            it: "Dal Porto Mannu partono tutti i collegamenti con il <strong>Parco Nazionale dell'Asinara</strong>: venti minuti di traversata, fra aprile e ottobre, con partenze ogni giorno alle 9:00 e alle 15:30. Oltre al traghetto tradizionale, numerose cooperative locali offrono <strong>escursioni in giornata</strong> in fuoristrada elettrico, in bici o con attrezzatura snorkeling inclusa. I prezzi variano da 40 a 80 € a persona a seconda della formula. Per chi preferisce esplorare in autonomia, diversi operatori noleggiano <strong>gommoni, barche a motore con e senza patente, catamarani</strong>: una giornata in mare fra le cale della costa occidentale e le spiagge dell'Asinara è una delle esperienze più richieste dell'estate stintinese. Nei weekend di agosto è indispensabile prenotare con almeno una settimana di anticipo.",
            en: "All connections to the <strong>Asinara National Park</strong> leave from Porto Mannu: a twenty-minute crossing from April to October, with daily departures at 9:00 and 15:30. In addition to the traditional ferry, many local cooperatives offer <strong>day excursions</strong> with electric off-road vehicles, bicycles or snorkelling gear included. Prices range from €40 to €80 per person depending on the package. For those who prefer to explore independently, operators rent <strong>dinghies, motorboats (with and without licence), catamarans</strong>: a day at sea among the coves of the western coast and the beaches of Asinara is one of the most sought-after experiences of the Stintino summer. On August weekends it is essential to book at least a week in advance.",
            fr: "Toutes les liaisons avec le <strong>Parc National de l'Asinara</strong> partent de Porto Mannu : traversée de vingt minutes d'avril à octobre, avec départs tous les jours à 9h00 et 15h30. Outre le ferry traditionnel, de nombreuses coopératives locales proposent des <strong>excursions à la journée</strong> en 4×4 électrique, à vélo ou avec matériel de snorkeling inclus. Les prix varient de 40 à 80 € par personne selon la formule. Pour qui préfère explorer en autonomie, divers opérateurs louent <strong>pneumatiques, bateaux à moteur avec ou sans permis, catamarans</strong> : une journée en mer parmi les criques de la côte ouest et les plages de l'Asinara est l'une des expériences les plus demandées de l'été stintinese. Les week-ends d'août, il est indispensable de réserver au moins une semaine à l'avance.",
            de: "Vom Porto Mannu gehen alle Verbindungen in den <strong>Nationalpark Asinara</strong>: zwanzigminütige Überfahrt von April bis Oktober, tägliche Abfahrten um 9:00 und 15:30 Uhr. Neben der klassischen Fähre bieten zahlreiche lokale Kooperativen <strong>Tagesausflüge</strong> mit Elektro-Offroadern, Fahrrädern oder inklusive Schnorchelausrüstung an. Die Preise reichen je nach Angebot von 40 bis 80 € pro Person. Für alle, die selbständig erkunden möchten, vermieten Anbieter <strong>Schlauchboote, Motorboote (mit und ohne Führerschein), Katamarane</strong>: Ein Tag auf See zwischen den Buchten der Westküste und den Stränden der Asinara ist eines der begehrtesten Erlebnisse des Stintino-Sommers. An Wochenenden im August ist eine Reservierung mindestens eine Woche im Voraus unerlässlich."
          }
        },
        {
          id: 'mangiare',
          h2: { it: 'Dove mangiare sul porto', en: 'Where to eat at the harbour', fr: 'Où manger au port', de: 'Wo am Hafen essen' },
          body: {
            it: "La cucina di Stintino è cucina di mare, e il porto è il suo palcoscenico naturale. Lungo il lungomare Cristoforo Colombo si alternano trattorie storiche e ristoranti di nuova generazione: <strong>Silvestrino</strong> — istituzione del borgo dal 1960 — è famoso per la zuppa di pesce e la pasta con bottarga di muggine; <strong>Il Porticciolo</strong> propone una cucina di pesce contemporanea con vista sul Porto Mannu; <strong>La Rete</strong> è la scelta per chi cerca piatti casalinghi come la fregola con arselle e il polpo in galera. Per un pranzo veloce, i chioschi del porto servono panini con tonno fresco e frittura di paranza. La specialità dolce è la <strong>tumbarella</strong>, a base di pasta di mandorle e miele amaro di corbezzolo. Un calice di Vermentino di Sardegna DOC è l'abbinamento più classico.",
            en: "Stintino's cuisine is seafood cuisine, and the harbour is its natural stage. Along the Cristoforo Colombo seafront, historic trattorias and new-generation restaurants alternate: <strong>Silvestrino</strong> — a village institution since 1960 — is famous for its fish soup and pasta with grey mullet bottarga; <strong>Il Porticciolo</strong> offers contemporary seafood cuisine with a view over Porto Mannu; <strong>La Rete</strong> is the choice for home-style dishes such as fregola with clams and \"polpo in galera\". For a quick lunch, the harbour kiosks serve fresh-tuna sandwiches and mixed fried seafood. The sweet speciality is <strong>tumbarella</strong>, made with almond paste and bitter strawberry-tree honey. A glass of Vermentino di Sardegna DOC is the classic pairing.",
            fr: "La cuisine de Stintino est une cuisine de la mer, et le port en est la scène naturelle. Le long du front de mer Cristoforo Colombo alternent des trattorias historiques et des restaurants de nouvelle génération : <strong>Silvestrino</strong> — institution du village depuis 1960 — est célèbre pour sa soupe de poisson et ses pâtes à la boutargue de muge ; <strong>Il Porticciolo</strong> propose une cuisine de poisson contemporaine avec vue sur Porto Mannu ; <strong>La Rete</strong> est le choix pour des plats familiaux comme la fregola aux palourdes et le « polpo in galera ». Pour un déjeuner rapide, les kiosques du port servent des sandwichs au thon frais et des fritures de poissons. La spécialité sucrée est la <strong>tumbarella</strong>, à base de pâte d'amandes et de miel amer d'arbousier. Un verre de Vermentino di Sardegna DOC est l'accord le plus classique.",
            de: "Stintinos Küche ist Meeresküche, und der Hafen ist ihre natürliche Bühne. Entlang der Uferpromenade Cristoforo Colombo wechseln sich historische Trattorien und Restaurants neuer Generation ab: <strong>Silvestrino</strong> — seit 1960 eine Institution des Dorfes — ist bekannt für seine Fischsuppe und Nudeln mit Meeräschen-Bottarga; <strong>Il Porticciolo</strong> bietet zeitgenössische Fischküche mit Blick auf Porto Mannu; <strong>La Rete</strong> ist die Wahl für hausgemachte Gerichte wie Fregola mit Venusmuscheln und „polpo in galera\". Für ein schnelles Mittagessen servieren die Kioske am Hafen Sandwiches mit frischem Thunfisch und gebratene kleine Meeresfische. Die süße Spezialität ist die <strong>Tumbarella</strong>, aus Mandelteig und bitterem Erdbeerbaumhonig. Ein Glas Vermentino di Sardegna DOC ist die klassische Begleitung."
          }
        },
        {
          id: 'vita-porto',
          h2: { it: 'Vivere il porto', en: 'Life at the harbour', fr: 'Vivre le port', de: 'Das Hafenleben' },
          body: {
            it: "Il porto è il salotto del borgo. La <strong>passeggiata serale</strong>, lunga circa un chilometro, è un rito condiviso: la si fa dopo cena, dalle 21:00 in poi, fra banchetti di artigianato, musicisti di strada e un aperitivo al volo. In agosto il mercoledì sera il lungomare si trasforma in palcoscenico con <strong>concerti dal vivo gratuiti</strong>. Il mercato settimanale si tiene il <strong>giovedì mattina</strong> lungo la via centrale del centro nuovo, a pochi passi dal porto. Per chi ama la pesca sportiva, il Porto Mannu è il punto di partenza per battute di traina al tonno, mentre il Porto Minore è perfetto per imparare a pescare con le mani dei vecchi pescatori — basta chiedere, e qualcuno sarà lieto di raccontarlo.",
            en: "The harbour is the village's living room. The <strong>evening stroll</strong>, about one kilometre long, is a shared ritual: it's taken after dinner, from 21:00 onwards, among craft stalls, street musicians and an impromptu drink. In August, on Wednesday evenings, the seafront turns into a stage with <strong>free live concerts</strong>. The weekly market is held on <strong>Thursday morning</strong> along the main street of the new town, a short walk from the harbour. For sport-fishing enthusiasts, Porto Mannu is the starting point for tuna trolling trips, while Porto Minore is perfect for learning to fish with the hands of the old fishermen — just ask, and someone will gladly share the story.",
            fr: "Le port est le salon du village. La <strong>promenade du soir</strong>, d'environ un kilomètre, est un rituel partagé : on la fait après le dîner, à partir de 21h00, entre stands d'artisanat, musiciens de rue et apéritif improvisé. En août, le mercredi soir, le front de mer se transforme en scène avec des <strong>concerts en direct gratuits</strong>. Le marché hebdomadaire a lieu le <strong>jeudi matin</strong> le long de la rue principale de la ville nouvelle, à deux pas du port. Pour les amateurs de pêche sportive, Porto Mannu est le point de départ des sorties de traîne au thon, tandis que Porto Minore est parfait pour apprendre à pêcher avec les mains des vieux pêcheurs — il suffit de demander, et quelqu'un sera ravi de le raconter.",
            de: "Der Hafen ist das Wohnzimmer des Dorfes. Der <strong>Abendspaziergang</strong>, etwa einen Kilometer lang, ist ein gemeinsames Ritual: Man macht ihn nach dem Abendessen, ab 21:00 Uhr, zwischen Handwerksständen, Straßenmusikern und einem spontanen Aperitif. Im August verwandelt sich die Promenade mittwochabends in eine Bühne mit <strong>kostenlosen Live-Konzerten</strong>. Der Wochenmarkt findet <strong>donnerstagvormittags</strong> entlang der Hauptstraße der Neustadt statt, wenige Schritte vom Hafen entfernt. Für Hochseeangler ist Porto Mannu der Ausgangspunkt für Schleppangelfahrten auf Thunfisch, während Porto Minore ideal ist, um mit den alten Fischern das Angeln von Hand zu lernen — einfach fragen, jemand wird gern davon erzählen."
          }
        }
      ],
      links: {
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Porto+Stintino'
      }
    },

    {
      slug: 'parco-asinara',
      parent: 'villa-stintino',
      name: {
        it: "Parco Nazionale dell'Asinara",
        en: 'Asinara National Park',
        fr: "Parc National de l'Asinara",
        de: 'Nationalpark Asinara'
      },
      subtitle: {
        it: 'Un\'isola-parco dove il tempo si è fermato, a 20 minuti di traghetto',
        en: 'An island-park where time has stopped, 20 minutes by ferry',
        fr: 'Une île-parc où le temps s\'est arrêté, à 20 minutes en ferry',
        de: 'Eine Insel-Parkanlage, auf der die Zeit stehengeblieben ist, 20 Minuten mit der Fähre'
      },
      location: {
        it: "Isola dell'Asinara · Golfo omonimo",
        en: 'Island of Asinara · homonymous gulf',
        fr: "Île de l'Asinara · golfe éponyme",
        de: 'Insel Asinara · gleichnamiger Golf'
      },
      distance: {
        it: '20 min di traghetto dal Porto di Stintino',
        en: '20 min ferry from the Port of Stintino',
        fr: '20 min de ferry depuis le Port de Stintino',
        de: '20 Min. Fähre vom Hafen Stintino'
      },
      hero: 'img/stintino/dintorni/parco-nazionale-asinara.png',
      heroFocus: 'center center',
      intro: {
        it: "L'<strong>Asinara</strong> è un'isola-parco di cinquantuno chilometri quadrati che si staglia davanti al Golfo di Stintino, raggiungibile in venti minuti di traghetto dal Porto Mannu. Il suo nome deriva dagli <strong>asinelli bianchi albini</strong> — unici al mondo — che ancora la popolano, ma la sua vera peculiarità è la storia: dalla fine dell'Ottocento al 1997, l'Asinara è stata <strong>colonia penale agricola</strong> e poi <strong>carcere di massima sicurezza</strong>, inaccessibile a chiunque non fosse detenuto o agente di custodia. Questo isolamento forzato ha salvato l'isola da qualsiasi urbanizzazione: oggi, diventata Parco Nazionale, è un tuffo nella Sardegna di cento anni fa — cale deserte, coste a strapiombo, una macchia mediterranea intatta e un silenzio raro in Europa.",
        en: "<strong>Asinara</strong> is an island-park of fifty-one square kilometres standing off the Gulf of Stintino, reachable in twenty minutes by ferry from Porto Mannu. Its name comes from the <strong>albino white donkeys</strong> — unique in the world — that still populate it, but its true peculiarity is its history: from the end of the 19th century until 1997, Asinara was an <strong>agricultural penal colony</strong> and then a <strong>maximum-security prison</strong>, inaccessible to anyone who was not an inmate or a prison officer. This forced isolation saved the island from any urbanisation: now a National Park, it is a plunge into the Sardinia of a hundred years ago — deserted coves, sheer coastlines, an intact Mediterranean scrub and a silence rare in Europe.",
        fr: "L'<strong>Asinara</strong> est une île-parc de cinquante-et-un kilomètres carrés qui se dresse devant le Golfe de Stintino, accessible en vingt minutes de ferry depuis Porto Mannu. Son nom vient des <strong>ânes blancs albinos</strong> — uniques au monde — qui la peuplent encore, mais sa véritable particularité est son histoire : de la fin du XIXᵉ siècle à 1997, l'Asinara a été <strong>colonie pénitentiaire agricole</strong> puis <strong>prison de haute sécurité</strong>, inaccessible à quiconque n'était ni détenu ni agent pénitentiaire. Cet isolement forcé a sauvé l'île de toute urbanisation : devenue aujourd'hui Parc National, c'est une plongée dans la Sardaigne d'il y a cent ans — criques désertes, côtes à pic, maquis méditerranéen intact et silence rare en Europe.",
        de: "<strong>Asinara</strong> ist eine Insel-Parkanlage von einundfünfzig Quadratkilometern, die sich vor dem Golf von Stintino erhebt und in zwanzig Minuten mit der Fähre vom Porto Mannu zu erreichen ist. Ihr Name stammt von den <strong>weißen Albino-Eseln</strong> — weltweit einzigartig —, die sie noch immer bevölkern, doch ihre wahre Besonderheit ist ihre Geschichte: Von Ende des 19. Jahrhunderts bis 1997 war die Asinara <strong>landwirtschaftliche Strafkolonie</strong> und dann <strong>Hochsicherheitsgefängnis</strong>, unzugänglich für jeden, der nicht Häftling oder Justizbeamter war. Diese erzwungene Abgeschiedenheit bewahrte die Insel vor jeder Bebauung: Heute Nationalpark, ist sie ein Sprung in das Sardinien vor hundert Jahren — einsame Buchten, schroffe Küsten, unberührte Mittelmeermacchia und eine in Europa seltene Stille."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'Dalla colonia penale al Parco Nazionale', en: 'From penal colony to National Park', fr: 'De la colonie pénitentiaire au Parc National', de: 'Von der Strafkolonie zum Nationalpark' },
          body: {
            it: "Nel 1885, gli stessi anni in cui nasceva Stintino, il governo italiano espropriò le famiglie pescatrici che abitavano l'Asinara per destinare l'isola a <strong>colonia penale agricola</strong> — una struttura dove i detenuti vivevano in regime semilibero, lavoravano la terra e allevavano bestiame. Durante la Prima Guerra Mondiale ospitò fino a 24.000 prigionieri austro-ungarici, molti dei quali morirono di colera. Nel 1975, dopo la rivolta di alcuni istituti peninsulari, l'Asinara fu trasformata in <strong>carcere di massima sicurezza</strong>: qui furono detenuti boss di mafia come Totò Riina e Leoluca Bagarella, terroristi delle Brigate Rosse e della camorra. Il carcere venne chiuso nel 1997 e l'anno successivo l'isola fu dichiarata <strong>Parco Nazionale</strong>. Oggi si possono ancora visitare i diversi bracci penitenziari di Cala d'Oliva, Fornelli e Trabuccato, oggi testimonianza di un'epoca recente.",
            en: "In 1885 — the same years when Stintino was being born — the Italian government expropriated the fishing families who lived on Asinara, assigning the island to an <strong>agricultural penal colony</strong>: a facility where inmates lived in a semi-open regime, worked the land and kept livestock. During the First World War it held up to 24,000 Austro-Hungarian prisoners, many of whom died of cholera. In 1975, after the uprising in some mainland prisons, Asinara was turned into a <strong>maximum-security prison</strong>: here mafia bosses such as Totò Riina and Leoluca Bagarella, Red Brigades and Camorra terrorists were held. The prison was closed in 1997, and the following year the island was declared a <strong>National Park</strong>. You can still visit the different prison sectors at Cala d'Oliva, Fornelli and Trabuccato, today witnesses of a recent era.",
            fr: "En 1885 — les mêmes années où naissait Stintino — le gouvernement italien exproprie les familles de pêcheurs qui habitaient l'Asinara pour destiner l'île à une <strong>colonie pénitentiaire agricole</strong> : une structure où les détenus vivent en semi-liberté, cultivent la terre et élèvent du bétail. Pendant la Première Guerre mondiale, elle abritera jusqu'à 24 000 prisonniers austro-hongrois, dont beaucoup mourront du choléra. En 1975, après les révoltes dans certaines prisons péninsulaires, l'Asinara est transformée en <strong>prison de haute sécurité</strong> : y sont incarcérés des parrains de la mafia comme Totò Riina et Leoluca Bagarella, des terroristes des Brigades rouges et de la Camorra. La prison est fermée en 1997 et l'année suivante l'île est déclarée <strong>Parc National</strong>. On peut encore visiter les différents quartiers pénitentiaires de Cala d'Oliva, Fornelli et Trabuccato, aujourd'hui témoins d'une époque récente.",
            de: "1885 — in denselben Jahren, in denen Stintino entstand — enteignete die italienische Regierung die Fischerfamilien, die auf der Asinara lebten, und bestimmte die Insel zur <strong>landwirtschaftlichen Strafkolonie</strong>: einer Einrichtung, in der die Häftlinge halb offen lebten, das Land bestellten und Vieh hielten. Während des Ersten Weltkriegs beherbergte sie bis zu 24.000 österreichisch-ungarische Gefangene, von denen viele an Cholera starben. 1975, nach dem Aufstand in einigen Gefängnissen auf dem Festland, wurde die Asinara zum <strong>Hochsicherheitsgefängnis</strong>: Hier wurden Mafiabosse wie Totò Riina und Leoluca Bagarella, Terroristen der Roten Brigaden und der Camorra eingesperrt. Das Gefängnis wurde 1997 geschlossen, und im Jahr darauf wurde die Insel zum <strong>Nationalpark</strong> erklärt. Noch heute lassen sich die verschiedenen Haftabschnitte von Cala d'Oliva, Fornelli und Trabuccato besichtigen, Zeugnisse einer jüngsten Epoche."
          }
        },
        {
          id: 'fauna',
          h2: { it: 'Fauna e paesaggio', en: 'Wildlife and landscape', fr: 'Faune et paysage', de: 'Tierwelt und Landschaft' },
          body: {
            it: "L'Asinara è uno degli ecosistemi più integri del Mediterraneo. Vi si trovano i famosi <strong>asini bianchi albini</strong> (Equus asinus var. albina) — circa centoventi esemplari, che si incontrano liberi sui pascoli dell'isola — insieme a <strong>mufloni</strong>, <strong>cinghiali</strong>, <strong>capre selvatiche</strong> e una straordinaria varietà di uccelli marini e di passo: marangoni dal ciuffo, falchi pellegrini, berte minori, gabbiani corsi. Le acque che circondano l'isola sono <strong>Area Marina Protetta</strong> e ospitano posidonia, cernie, dentici, saraghi e, con un po' di fortuna, tartarughe Caretta caretta e delfini. Il paesaggio alterna coste granitiche a strapiombo (soprattutto sul versante occidentale), cale sabbiose (Cala Sabina, Cala dei Ponzesi, Cala Sant'Andrea), pianure coltivate a vigneto nel tratto meridionale e boschi di lecci.",
            en: "Asinara is one of the most intact ecosystems in the Mediterranean. Here you'll find the famous <strong>albino white donkeys</strong> (Equus asinus var. albina) — about one hundred and twenty specimens, encountered free on the island's pastures — together with <strong>mouflons</strong>, <strong>wild boar</strong>, <strong>wild goats</strong> and an extraordinary variety of seabirds and migratory species: shags, peregrine falcons, Mediterranean shearwaters, Audouin's gulls. The waters around the island are a <strong>Marine Protected Area</strong> and host seagrass, groupers, dentex, sea breams and, with some luck, Caretta caretta turtles and dolphins. The landscape alternates sheer granite coasts (especially on the western side), sandy coves (Cala Sabina, Cala dei Ponzesi, Cala Sant'Andrea), vineyards on the southern plain and holm-oak woods.",
            fr: "L'Asinara est l'un des écosystèmes les plus intacts de Méditerranée. On y trouve les célèbres <strong>ânes blancs albinos</strong> (Equus asinus var. albina) — environ cent vingt spécimens, que l'on rencontre libres sur les pâturages de l'île — ainsi que des <strong>mouflons</strong>, <strong>sangliers</strong>, <strong>chèvres sauvages</strong> et une extraordinaire variété d'oiseaux marins et migrateurs : cormorans huppés, faucons pèlerins, puffins yelkouans, goélands d'Audouin. Les eaux qui entourent l'île sont <strong>Aire Marine Protégée</strong> et abritent la posidonie, mérous, dentis, sargues et, avec un peu de chance, tortues Caretta caretta et dauphins. Le paysage alterne côtes granitiques à pic (surtout sur le versant occidental), criques sableuses (Cala Sabina, Cala dei Ponzesi, Cala Sant'Andrea), plaines cultivées en vignes dans la partie méridionale et bois de chênes verts.",
            de: "Die Asinara gehört zu den intaktesten Ökosystemen des Mittelmeers. Hier findet man die berühmten <strong>weißen Albino-Esel</strong> (Equus asinus var. albina) — etwa hundertzwanzig Exemplare, die frei auf den Weiden der Insel anzutreffen sind — sowie <strong>Mufflons</strong>, <strong>Wildschweine</strong>, <strong>wilde Ziegen</strong> und eine außergewöhnliche Vielfalt an Meeres- und Zugvögeln: Krähenscharben, Wanderfalken, Yelkouan-Sturmtaucher, Korallenmöwen. Die Gewässer rund um die Insel sind <strong>geschütztes Meeresgebiet</strong> und beherbergen Neptungras, Zackenbarsche, Zahnbrassen, Meerbrassen und mit etwas Glück Unechte Karettschildkröten und Delfine. Die Landschaft wechselt zwischen senkrechten Granitküsten (vor allem an der Westseite), Sandbuchten (Cala Sabina, Cala dei Ponzesi, Cala Sant'Andrea), mit Reben bestellten Ebenen im Süden und Steineichenwäldern."
          }
        },
        {
          id: 'visita',
          h2: { it: 'Come visitare l\'isola', en: 'How to visit the island', fr: 'Comment visiter l\'île', de: 'Wie man die Insel besucht' },
          body: {
            it: "L'Asinara si visita solo nel contesto di <strong>escursioni organizzate</strong> — non è consentito approdare liberamente con imbarcazioni proprie. Le formule più richieste sono il <strong>tour in fuoristrada elettrico</strong> (circa 6 ore, 45 €) che tocca i punti chiave da Fornelli a Cala d'Oliva; il <strong>tour in bicicletta</strong> (circa 6 ore, 35 €, bici inclusa), adatto a chi vuole muoversi in autonomia su ritmi lenti; e le <strong>escursioni in barca con snorkeling</strong> nelle cale più belle (mezza giornata, 50–80 €). Tutte le cooperative hanno banchetti al Porto Mannu. Portate acqua, cappello, scarpe comode (per il fuoristrada anche costume sotto i vestiti — le soste in cala sono previste): sull'isola non ci sono supermercati, solo un bar-ristoro a Cala d'Oliva aperto nei mesi caldi. In agosto è <strong>indispensabile prenotare con almeno una settimana di anticipo</strong>.",
            en: "Asinara can only be visited as part of <strong>organised excursions</strong> — private boats cannot dock freely. The most popular options are the <strong>electric off-road tour</strong> (about 6 hours, €45), which covers key points from Fornelli to Cala d'Oliva; the <strong>bike tour</strong> (about 6 hours, €35, bike included), for those who want to move independently at a slower pace; and <strong>boat excursions with snorkelling</strong> in the most beautiful coves (half a day, €50–80). All cooperatives have kiosks at Porto Mannu. Bring water, a hat, comfortable shoes (for the off-road tour, also wear a swimsuit under your clothes — cove stops are planned): there are no supermarkets on the island, only a bar-restaurant at Cala d'Oliva open in the warmer months. In August it is <strong>essential to book at least a week in advance</strong>.",
            fr: "L'Asinara ne se visite que dans le cadre d'<strong>excursions organisées</strong> — l'accostage libre avec embarcation privée n'est pas autorisé. Les formules les plus demandées sont le <strong>tour en 4×4 électrique</strong> (environ 6 heures, 45 €), qui touche les points clés de Fornelli à Cala d'Oliva ; le <strong>tour à vélo</strong> (environ 6 heures, 35 €, vélo inclus), adapté à qui veut évoluer en autonomie à un rythme lent ; et les <strong>excursions en bateau avec snorkeling</strong> dans les plus belles criques (demi-journée, 50–80 €). Toutes les coopératives ont des stands à Porto Mannu. Emportez eau, chapeau, chaussures confortables (pour le 4×4, maillot de bain sous les vêtements — des arrêts en crique sont prévus) : sur l'île il n'y a pas de supermarchés, juste un bar-restaurant à Cala d'Oliva ouvert les mois chauds. En août, il est <strong>indispensable de réserver au moins une semaine à l'avance</strong>.",
            de: "Die Asinara kann nur im Rahmen <strong>organisierter Ausflüge</strong> besucht werden — privates Anlegen ist nicht erlaubt. Die beliebtesten Angebote sind die <strong>Elektro-Offroad-Tour</strong> (rund 6 Stunden, 45 €), die die wichtigsten Punkte von Fornelli bis Cala d'Oliva abdeckt; die <strong>Fahrradtour</strong> (rund 6 Stunden, 35 €, Rad inklusive), geeignet für alle, die sich in ruhigem Tempo selbständig bewegen möchten; und die <strong>Bootsausflüge mit Schnorcheln</strong> in den schönsten Buchten (halber Tag, 50–80 €). Alle Kooperativen haben Stände am Porto Mannu. Nehmen Sie Wasser, Hut, bequeme Schuhe mit (für die Offroad-Tour auch Badesachen unter der Kleidung — Badepausen in Buchten sind vorgesehen): auf der Insel gibt es keine Supermärkte, nur eine Bar-Gaststätte in Cala d'Oliva, die in den warmen Monaten geöffnet ist. Im August ist es <strong>unerlässlich, mindestens eine Woche im Voraus zu reservieren</strong>."
          }
        }
      ],
      links: {
        booking: 'https://www.escursioniasinara.it/',
        official: 'https://www.parcoasinara.org/',
        wiki: 'https://it.wikipedia.org/wiki/Isola_dell%27Asinara',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Parco+Nazionale+Asinara'
      }
    },

    {
      slug: 'museo-tonnare',
      parent: 'villa-stintino',
      name: {
        it: 'Museo delle Tonnare (MuT)',
        en: 'Museum of the Tuna Fisheries (MuT)',
        fr: 'Musée des Tonnara (MuT)',
        de: 'Thunfischerei-Museum (MuT)'
      },
      subtitle: {
        it: 'La memoria della pesca al tonno rosso di Stintino',
        en: 'The memory of Stintino\'s bluefin tuna fishing',
        fr: 'La mémoire de la pêche au thon rouge de Stintino',
        de: 'Das Gedächtnis des Roten-Thun-Fischfangs von Stintino'
      },
      location: {
        it: 'Stintino · centro storico',
        en: 'Stintino · old town',
        fr: 'Stintino · centre historique',
        de: 'Stintino · Altstadt'
      },
      distance: {
        it: '10 minuti a piedi dalla villa',
        en: '10 minutes on foot from the villa',
        fr: '10 minutes à pied de la villa',
        de: '10 Minuten zu Fuß von der Villa'
      },
      hero: 'img/stintino/dintorni/museo-tonnare.png',
      heroFocus: 'center center',
      intro: {
        it: "Il <strong>Museo delle Tonnare di Stintino</strong>, conosciuto anche come <strong>MuT</strong>, è uno dei musei etno-antropologici più interessanti della Sardegna. Ospitato nel vecchio edificio della MaTer (Manifattura Tabacchi) accuratamente restaurato nel centro storico del borgo, raccoglie e custodisce la memoria di un mestiere antichissimo che ha plasmato Stintino per secoli: la <strong>pesca al tonno rosso</strong> con la tonnara fissa. Fino agli anni Ottanta del Novecento, i pescatori stintinesi calavano le reti nelle acque antistanti <strong>Capo Falcone</strong> e <strong>Punta Negra</strong>, attendendo che i banchi di tonni vi entrassero durante la migrazione primaverile dal Mediterraneo verso l'Atlantico. Una vicenda di lavoro duro, solidarietà e riti che il museo racconta in tutta la sua intensità.",
        en: "The <strong>Stintino Tuna Museum</strong>, also known as the <strong>MuT</strong>, is one of Sardinia's most interesting ethno-anthropological museums. Housed in the carefully restored old MaTer building (former Tobacco Factory) in the village's old town, it gathers and preserves the memory of an ancient trade that shaped Stintino for centuries: <strong>bluefin tuna fishing</strong> with the fixed tonnara. Until the 1980s, Stintino's fishermen set their nets in the waters off <strong>Capo Falcone</strong> and <strong>Punta Negra</strong>, waiting for the tuna shoals to enter during the spring migration from the Mediterranean to the Atlantic. A story of hard work, solidarity and ritual that the museum tells in all its intensity.",
        fr: "Le <strong>Musée des Tonnara de Stintino</strong>, également connu sous le nom de <strong>MuT</strong>, est l'un des musées ethno-anthropologiques les plus intéressants de Sardaigne. Installé dans l'ancien bâtiment de la MaTer (ex-Manufacture des Tabacs) soigneusement restauré au cœur du centre historique du village, il rassemble et conserve la mémoire d'un métier ancestral qui a façonné Stintino pendant des siècles : la <strong>pêche au thon rouge</strong> avec la tonnara fixe. Jusqu'aux années 1980, les pêcheurs stintinesi calaient les filets dans les eaux face à <strong>Capo Falcone</strong> et à <strong>Punta Negra</strong>, attendant que les bancs de thons y pénètrent lors de la migration printanière de la Méditerranée vers l'Atlantique. Une histoire de travail acharné, de solidarité et de rites que le musée raconte dans toute son intensité.",
        de: "Das <strong>Thunfischerei-Museum von Stintino</strong>, auch <strong>MuT</strong> genannt, ist eines der interessantesten ethno-anthropologischen Museen Sardiniens. Untergebracht im sorgfältig restaurierten alten MaTer-Gebäude (ehemalige Tabakmanufaktur) im Herzen der Altstadt, sammelt und bewahrt es die Erinnerung an ein uraltes Handwerk, das Stintino über Jahrhunderte prägte: den <strong>Fang des Roten Thuns</strong> mit der festen Tonnara. Bis in die 1980er Jahre legten die stintinesischen Fischer ihre Netze in den Gewässern vor <strong>Capo Falcone</strong> und <strong>Punta Negra</strong> aus und warteten darauf, dass die Thunfischschwärme während der Frühjahrswanderung vom Mittelmeer in den Atlantik hineinzogen. Eine Geschichte harter Arbeit, Solidarität und ritueller Praxis, die das Museum in ihrer ganzen Intensität erzählt."
      },
      sections: [
        {
          id: 'pesca',
          h2: { it: 'La pesca al tonno rosso', en: 'Bluefin tuna fishing', fr: 'La pêche au thon rouge', de: 'Der Rote-Thun-Fang' },
          body: {
            it: "La <strong>tonnara fissa</strong> — tecnica di origine araba diffusasi nel Mediterraneo a partire dal X secolo — è una complessa struttura di reti ancorate sul fondale che incanala i tonni in una serie di camere sempre più piccole, fino all'ultima detta \"<strong>camera della morte</strong>\". Ogni primavera, quando i tonni rossi migravano verso le zone di riproduzione, i <strong>tonnaroti</strong> di Stintino calavano a mare più di venti chilometri di reti, centinaia di ancore e migliaia di galleggianti: un lavoro che impegnava decine di uomini per settimane. Il <strong>rais</strong>, capo riconosciuto della tonnara, leggeva il mare e decideva quando era il momento di \"levare\" — cioè di chiudere le reti e procedere alla cattura. Il museo ripercorre tutti i passaggi attraverso attrezzi originali, modelli in scala delle imbarcazioni (il <strong>vascello</strong>, il <strong>bastardo</strong>, le <strong>palischermi</strong>) e le mappe dei calamenti usati negli ultimi decenni di attività.",
            en: "The <strong>fixed tonnara</strong> — a technique of Arab origin that spread through the Mediterranean from the 10th century onwards — is a complex structure of nets anchored to the seabed which funnels the tuna into a series of ever smaller chambers, down to the last, known as the \"<strong>chamber of death</strong>\". Every spring, when the bluefin tuna migrated to their spawning grounds, Stintino's <strong>tonnaroti</strong> lowered more than twenty kilometres of nets, hundreds of anchors and thousands of floats into the sea: work that occupied dozens of men for weeks. The <strong>rais</strong>, the acknowledged head of the tonnara, read the sea and decided when it was time to \"raise\" — that is, close the nets and proceed with the catch. The museum retraces every step through original tools, scale models of the boats (the <strong>vascello</strong>, the <strong>bastardo</strong>, the <strong>palischermi</strong>) and the maps of the net layouts used in the last decades of activity.",
            fr: "La <strong>tonnara fixe</strong> — technique d'origine arabe diffusée en Méditerranée à partir du Xᵉ siècle — est une structure complexe de filets ancrés au fond qui canalisent les thons dans une série de chambres de plus en plus petites, jusqu'à la dernière dite « <strong>chambre de la mort</strong> ». Chaque printemps, quand les thons rouges migraient vers les zones de reproduction, les <strong>tonnaroti</strong> de Stintino mettaient à l'eau plus de vingt kilomètres de filets, des centaines d'ancres et des milliers de flotteurs : un travail qui occupait des dizaines d'hommes pendant des semaines. Le <strong>rais</strong>, chef reconnu de la tonnara, lisait la mer et décidait quand il était temps de « lever » — c'est-à-dire de refermer les filets et de procéder à la capture. Le musée retrace toutes les étapes à travers des outils d'origine, des maquettes des bateaux (le <strong>vascello</strong>, le <strong>bastardo</strong>, les <strong>palischermi</strong>) et les cartes des calages utilisés dans les dernières décennies d'activité.",
            de: "Die <strong>feste Tonnara</strong> — eine Technik arabischen Ursprungs, die sich ab dem 10. Jahrhundert im Mittelmeer verbreitete — ist eine komplexe, am Meeresboden verankerte Netzkonstruktion, die die Thunfische in eine Reihe immer kleinerer Kammern leitet, bis zur letzten, der sogenannten \"<strong>Kammer des Todes</strong>\". Jedes Frühjahr, wenn der Rote Thun zu den Laichgebieten zog, ließen Stintinos <strong>tonnaroti</strong> mehr als zwanzig Kilometer Netze, Hunderte von Ankern und Tausende von Schwimmern ins Meer: eine Arbeit, die Dutzende Männer wochenlang beschäftigte. Der <strong>Rais</strong>, der anerkannte Chef der Tonnara, las das Meer und entschied, wann es Zeit war \"aufzuholen\" — also die Netze zu schließen und den Fang durchzuführen. Das Museum verfolgt jede Etappe nach anhand originaler Gerätschaften, Modellen der Boote (<strong>vascello</strong>, <strong>bastardo</strong>, <strong>palischermi</strong>) und Karten der Netzlegungen aus den letzten Jahrzehnten der Aktivität."
          }
        },
        {
          id: 'mattanza',
          h2: { it: 'La mattanza: lavoro e rito', en: 'The mattanza: work and ritual', fr: 'La mattanza : travail et rite', de: 'Die Mattanza: Arbeit und Ritual' },
          body: {
            it: "La <strong>mattanza</strong> — dalla parola spagnola per \"macello\" — era l'atto finale della pesca: quando le reti erano piene, i tonnaroti chiudevano la camera della morte e issavano lentamente il fondo. I tonni, animali potenti che possono superare i duecento chili, emergevano in superficie in uno spazio sempre più ristretto, finché gli uomini non li catturavano con lunghe fiocine. Era un lavoro durissimo e pericoloso, accompagnato da <strong>canti corali in dialetto stintinese</strong> — antichi come gli arabi che li insegnarono, trasmessi di padre in figlio — che servivano a scandire i ritmi, tenere uniti gli equipaggi e, si diceva, placare il mare. Il museo dedica una sala intera a <strong>filmati d'archivio degli anni '70 e '80</strong>, con immagini della mattanza e interviste ai pescatori: è la parte più toccante della visita.",
            en: "The <strong>mattanza</strong> — from the Spanish word for \"slaughter\" — was the final act of the fishing: when the nets were full, the tonnaroti closed the chamber of death and slowly hauled up the bottom. The tuna, powerful animals that can exceed two hundred kilos, surfaced into an increasingly narrow space until the men captured them with long harpoons. It was extremely hard and dangerous work, accompanied by <strong>choral chants in the Stintino dialect</strong> — as old as the Arabs who taught them, handed down from father to son — which served to set the rhythms, keep the crews together and, it was said, soothe the sea. The museum devotes an entire room to <strong>archive films from the 1970s and 80s</strong>, with images of the mattanza and interviews with the fishermen: it is the most moving part of the visit.",
            fr: "La <strong>mattanza</strong> — du mot espagnol pour « abattage » — était l'acte final de la pêche : quand les filets étaient pleins, les tonnaroti fermaient la chambre de la mort et remontaient lentement le fond. Les thons, bêtes puissantes pouvant dépasser deux cents kilos, émergeaient en surface dans un espace de plus en plus restreint, jusqu'à ce que les hommes les capturent avec de longues fouines. C'était un travail extrêmement dur et dangereux, accompagné de <strong>chants choraux en dialecte stintinese</strong> — aussi anciens que les Arabes qui les enseignèrent, transmis de père en fils — qui servaient à cadencer les rythmes, maintenir l'unité des équipages et, disait-on, apaiser la mer. Le musée consacre une salle entière à des <strong>films d'archives des années 1970 et 1980</strong>, avec des images de la mattanza et des interviews des pêcheurs : c'est la partie la plus émouvante de la visite.",
            de: "Die <strong>Mattanza</strong> — vom spanischen Wort für \"Schlachtung\" — war der letzte Akt des Fangs: Wenn die Netze voll waren, schlossen die tonnaroti die Kammer des Todes und zogen langsam den Grund hoch. Die Thunfische, kräftige Tiere, die über zweihundert Kilo wiegen können, tauchten in einem immer enger werdenden Raum an die Oberfläche, bis die Männer sie mit langen Harpunen erlegten. Es war extrem harte, gefährliche Arbeit, begleitet von <strong>Chorgesängen im stintinesischen Dialekt</strong> — so alt wie die Araber, die sie lehrten, von Vater zu Sohn weitergegeben —, die den Takt vorgaben, die Mannschaften zusammenhielten und, so hieß es, das Meer besänftigten. Das Museum widmet einen ganzen Saal <strong>Archivfilmen aus den 1970er und 80er Jahren</strong> mit Bildern der Mattanza und Interviews mit den Fischern: der ergreifendste Teil des Besuchs."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Informazioni pratiche', en: 'Practical information', fr: 'Informations pratiques', de: 'Praktische Informationen' },
          body: {
            it: "Il MuT si trova in via Lepanto, nel centro storico di Stintino, a dieci minuti a piedi dalla villa. <strong>Orari estivi</strong> (luglio–settembre): tutti i giorni 10:00–13:00 e 18:00–24:00. <strong>Orari di bassa stagione</strong>: contattare il museo, con apertura ridotta. <strong>Biglietto</strong>: 5 € intero, 3 € ridotto (bambini 6–14 anni, over 65, gruppi), gratuito sotto i 6 anni. La visita dura circa un'ora ed è completamente bilingue italiano–inglese, con pannelli anche in francese e tedesco. Il museo è <strong>accessibile a persone con mobilità ridotta</strong> (ascensore interno). Il consiglio è visitarlo nelle ore centrali della giornata o alla sera: nelle giornate calde di agosto è il modo migliore per trascorrere un paio d'ore fuori dal sole. All'interno anche una libreria con volumi di storia locale e piccolo bookshop.",
            en: "The MuT is located in via Lepanto, in Stintino's old town, ten minutes on foot from the villa. <strong>Summer hours</strong> (July–September): every day 10:00–13:00 and 18:00–24:00. <strong>Off-season hours</strong>: contact the museum, with reduced opening. <strong>Ticket</strong>: €5 full price, €3 reduced (children 6–14, over-65s, groups), free for under-sixes. The visit lasts about an hour and is fully bilingual Italian–English, with panels also in French and German. The museum is <strong>accessible to people with reduced mobility</strong> (internal lift). Our tip is to visit it in the middle of the day or in the evening: on hot August days it is the best way to spend a couple of hours out of the sun. Inside there's also a bookshop with local-history volumes and souvenirs.",
            fr: "Le MuT se trouve via Lepanto, dans le centre historique de Stintino, à dix minutes à pied de la villa. <strong>Horaires d'été</strong> (juillet–septembre) : tous les jours 10h00–13h00 et 18h00–24h00. <strong>Horaires hors saison</strong> : contacter le musée, avec ouverture réduite. <strong>Billet</strong> : 5 € plein tarif, 3 € tarif réduit (enfants 6–14 ans, plus de 65 ans, groupes), gratuit pour les moins de 6 ans. La visite dure environ une heure et est entièrement bilingue italien–anglais, avec des panneaux aussi en français et allemand. Le musée est <strong>accessible aux personnes à mobilité réduite</strong> (ascenseur interne). Notre conseil : le visiter aux heures chaudes de la journée ou en soirée : les journées d'août, c'est la meilleure manière de passer deux heures hors du soleil. À l'intérieur également une librairie avec des volumes d'histoire locale et une petite boutique.",
            de: "Das MuT liegt in der Via Lepanto im historischen Zentrum Stintinos, zehn Minuten zu Fuß von der Villa. <strong>Sommeröffnungszeiten</strong> (Juli–September): täglich 10:00–13:00 und 18:00–24:00 Uhr. <strong>Nebensaison</strong>: Kontakt mit dem Museum, reduzierte Öffnungszeiten. <strong>Eintritt</strong>: 5 € Vollpreis, 3 € ermäßigt (Kinder 6–14 Jahre, über 65, Gruppen), frei unter 6 Jahren. Der Besuch dauert rund eine Stunde und ist vollständig zweisprachig Italienisch–Englisch, mit Tafeln auch in Französisch und Deutsch. Das Museum ist <strong>für Menschen mit eingeschränkter Mobilität zugänglich</strong> (interner Aufzug). Unser Tipp: Besichtigen Sie es zur Mittagszeit oder am Abend: an heißen Augusttagen ist es die beste Möglichkeit, ein paar Stunden aus der Sonne zu verbringen. Im Inneren auch eine Buchhandlung mit Bänden zur Lokalgeschichte und ein kleiner Shop."
          }
        }
      ],
      links: {
        official: 'https://www.mutstintino.com',
        wiki: 'https://it.wikipedia.org/wiki/Stintino',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Museo+Tonnara+Stintino'
      }
    },

    {
      slug: 'spiaggia-le-saline',
      parent: 'villa-stintino',
      name: {
        it: 'Spiaggia Le Saline',
        en: 'Le Saline beach',
        fr: 'Plage de Le Saline',
        de: 'Strand Le Saline'
      },
      subtitle: {
        it: 'Due chilometri di sabbia e ciottoli, l\'alternativa selvaggia alla Pelosa',
        en: 'Two kilometres of sand and pebbles, the wild alternative to La Pelosa',
        fr: 'Deux kilomètres de sable et de galets, l\'alternative sauvage à La Pelosa',
        de: 'Zwei Kilometer Sand und Kiesel, die wilde Alternative zu La Pelosa'
      },
      location: {
        it: 'Stintino sud · Golfo dell\'Asinara',
        en: 'Southern Stintino · Gulf of Asinara',
        fr: 'Stintino sud · Golfe de l\'Asinara',
        de: 'Stintino Süd · Golf von Asinara'
      },
      distance: {
        it: '10 minuti in auto dalla villa',
        en: '10 minutes by car from the villa',
        fr: '10 minutes en voiture de la villa',
        de: '10 Minuten mit dem Auto von der Villa'
      },
      hero: 'img/stintino/dintorni/spiaggia-le-saline.png',
      heroFocus: 'center center',
      intro: {
        it: "A sud del centro di Stintino, <strong>Le Saline</strong> è la spiaggia che pochi turisti conoscono ma che molti stintinesi preferiscono alla Pelosa. Oltre <strong>due chilometri di arenile</strong> che alterna sabbia chiara, ciottoli bianchi arrotondati dal mare e zone di sabbia più fine, con acqua cristallina, fondale basso vicino a riva che diventa presto più profondo, vista aperta sull'<strong>Asinara</strong> e sulle sue cale. Alle spalle, dune, ginepri e una macchia mediterranea bassa, punteggiata da qualche villa isolata. Niente file di ombrelloni, niente prenotazioni, niente tornelli: qui si arriva, ci si sistema dove si preferisce, ci si resta tutto il giorno.",
        en: "South of the Stintino centre, <strong>Le Saline</strong> is the beach few tourists know but many locals prefer to La Pelosa. Over <strong>two kilometres of shoreline</strong> alternating pale sand, white pebbles smoothed by the sea and stretches of finer sand, with crystal-clear water, shallow near the shore but quickly deeper, and an open view of <strong>Asinara</strong> and its coves. Behind, dunes, junipers and a low Mediterranean scrub dotted with the odd isolated villa. No rows of parasols, no bookings, no turnstiles: here you arrive, settle where you prefer and stay for the whole day.",
        fr: "Au sud du centre de Stintino, <strong>Le Saline</strong> est la plage que peu de touristes connaissent mais que de nombreux Stintinesi préfèrent à La Pelosa. Plus de <strong>deux kilomètres de rivage</strong> alternant sable clair, galets blancs polis par la mer et portions de sable plus fin, avec une eau cristalline, peu profonde près du bord mais qui s'approfondit rapidement, et une vue ouverte sur l'<strong>Asinara</strong> et ses criques. Derrière, dunes, genévriers et un maquis méditerranéen bas, ponctué de quelques villas isolées. Pas de rangées de parasols, pas de réservation, pas de tourniquets : ici on arrive, on s'installe où l'on préfère, on y reste toute la journée.",
        de: "Südlich des Zentrums von Stintino ist <strong>Le Saline</strong> der Strand, den wenige Touristen kennen, den aber viele Stintinesen La Pelosa vorziehen. Über <strong>zwei Kilometer Ufer</strong>, die hellen Sand, vom Meer geschliffene weiße Kiesel und Abschnitte feineren Sandes abwechseln, mit kristallklarem Wasser, flach am Ufer, aber schnell tiefer werdend, und freiem Blick auf die <strong>Asinara</strong> und ihre Buchten. Dahinter Dünen, Wacholder und eine niedrige Mittelmeermacchia, gesprenkelt mit einzelnen Villen. Keine Sonnenschirmreihen, keine Reservierung, keine Drehkreuze: Hier kommt man an, lässt sich nieder, wo man will, und bleibt den ganzen Tag."
      },
      sections: [
        {
          id: 'diversa',
          h2: { it: 'Una spiaggia diversa dalla Pelosa', en: 'A beach different from La Pelosa', fr: 'Une plage différente de La Pelosa', de: 'Ein anderer Strand als La Pelosa' },
          body: {
            it: "Le Saline è l'opposto della Pelosa, e lì sta la sua forza. <strong>Non c'è accesso regolamentato</strong> — si entra e si esce liberamente, a qualsiasi ora, in qualsiasi giorno dell'anno. Non ci sono restrizioni sulla permanenza in acqua né sulle attrezzature. L'ampiezza del litorale fa sì che la spiaggia <strong>non sia mai veramente piena</strong>, nemmeno nei weekend di ferragosto: c'è sempre un tratto tranquillo dove stendersi. Il nome \"Le Saline\" deriva dalle antiche <strong>saline naturali</strong> che occupavano queste zone fino ai primi del Novecento, quando l'estrazione del sale venne abbandonata. Oggi delle saline resta solo il nome: davanti si apre lo Stagno di Casaraccio, zona umida protetta che ospita fenicotteri rosa nei mesi invernali.",
            en: "Le Saline is the opposite of La Pelosa, and that's its strength. There is <strong>no regulated access</strong> — you come and go freely, at any time, on any day of the year. There are no restrictions on how long you can stay in the water or on gear. The sheer width of the shoreline means the beach <strong>is never really full</strong>, not even on August bank-holiday weekends: there's always a quiet stretch where you can lay down your towel. The name \"Le Saline\" comes from the ancient <strong>natural salt pans</strong> that covered these areas until the early 20th century, when salt extraction was abandoned. Today, only the name remains: in front opens the Stagno di Casaraccio, a protected wetland that hosts pink flamingos in the winter months.",
            fr: "Le Saline est l'opposé de La Pelosa, et c'est sa force. <strong>Aucun accès réglementé</strong> — on entre et on sort librement, à toute heure, n'importe quel jour de l'année. Pas de restrictions sur la durée en eau ni sur le matériel. L'ampleur du littoral fait que la plage <strong>n'est jamais vraiment pleine</strong>, même les week-ends du 15 août : il y a toujours un tronçon tranquille pour s'étendre. Le nom « Le Saline » vient des anciennes <strong>salines naturelles</strong> qui occupaient ces zones jusqu'au début du XXᵉ siècle, quand l'extraction du sel fut abandonnée. Aujourd'hui, il n'en reste que le nom : devant s'ouvre le Stagno di Casaraccio, zone humide protégée qui accueille les flamants roses en hiver.",
            de: "Le Saline ist das Gegenteil von La Pelosa, und darin liegt seine Stärke. <strong>Keine regulierten Zugänge</strong> — man kommt und geht frei, zu jeder Zeit, an jedem Tag des Jahres. Keine Einschränkungen bei der Aufenthaltsdauer im Wasser oder bei der Ausrüstung. Die Breite des Ufers sorgt dafür, dass der Strand <strong>nie wirklich voll ist</strong>, nicht einmal an den Wochenenden um Ferragosto: Es gibt immer einen ruhigen Abschnitt, an dem man sich niederlassen kann. Der Name \"Le Saline\" stammt von den alten <strong>natürlichen Salinen</strong>, die diese Gegend bis Anfang des 20. Jahrhunderts bedeckten, als der Salzabbau aufgegeben wurde. Heute bleibt nur der Name: Davor öffnet sich der Stagno di Casaraccio, ein geschütztes Feuchtgebiet, das in den Wintermonaten Rosaflamingos beherbergt."
          }
        },
        {
          id: 'per-chi',
          h2: { it: 'Per chi è Le Saline', en: 'Who Le Saline is for', fr: 'Pour qui est Le Saline', de: 'Für wen Le Saline ist' },
          body: {
            it: "Le Saline è la spiaggia giusta per chi ha <strong>già visto la Pelosa</strong> (o non ha trovato posto), per chi ha <strong>cani</strong> (ammessi nel tratto nord), per chi ama il <strong>windsurf</strong> e il <strong>kitesurf</strong> — il vento del Maestrale entra qui con più forza e regolarità, soprattutto nel pomeriggio. È ottima per le <strong>famiglie</strong>: bambini piccoli stanno benissimo nelle aree sabbiose vicino a riva, senza onde e senza dislivelli bruschi. Non è invece la scelta per chi cerca servizi tipici da spiaggia attrezzata: il litorale è in gran parte libero e <strong>non ci sono bar né docce</strong> lungo gran parte del tratto. Per la sera, è il posto giusto per vedere <strong>il tramonto dietro l'Asinara</strong>: i colori del cielo si riflettono sui ciottoli bianchi e sull'acqua ancora tiepida.",
            en: "Le Saline is the right beach for those who have <strong>already seen La Pelosa</strong> (or couldn't get a slot), those with <strong>dogs</strong> (allowed in the northern section), those who love <strong>windsurfing</strong> and <strong>kitesurfing</strong> — the Mistral wind comes in here more strongly and consistently, especially in the afternoon. It's great for <strong>families</strong>: small children do very well on the sandy areas near the shore, with no waves and no sudden drop-offs. It's not the choice if you're looking for typical equipped-beach services: the shoreline is largely free and there are <strong>no bars or showers</strong> along much of it. In the evening, it's the right place to catch <strong>sunset behind Asinara</strong>: the colours of the sky reflect on the white pebbles and the still-warm water.",
            fr: "Le Saline est la bonne plage pour qui a <strong>déjà vu La Pelosa</strong> (ou n'y a pas trouvé de place), pour ceux qui ont des <strong>chiens</strong> (admis dans la partie nord), pour ceux qui aiment le <strong>windsurf</strong> et le <strong>kitesurf</strong> — le Mistral entre ici avec plus de force et de régularité, surtout l'après-midi. Elle est idéale pour les <strong>familles</strong> : les jeunes enfants sont très bien dans les zones sableuses près du bord, sans vagues ni dénivelés brusques. Ce n'est en revanche pas le choix pour qui cherche des services typiques d'une plage équipée : le littoral est en grande partie libre et il n'y a <strong>ni bars ni douches</strong> sur la majeure partie de la longueur. Le soir, c'est l'endroit idéal pour voir <strong>le coucher de soleil derrière l'Asinara</strong> : les couleurs du ciel se reflètent sur les galets blancs et sur l'eau encore tiède.",
            de: "Le Saline ist der richtige Strand für alle, die <strong>La Pelosa schon gesehen haben</strong> (oder keinen Platz gefunden haben), für die mit <strong>Hunden</strong> (im nördlichen Abschnitt erlaubt), für Liebhaber von <strong>Windsurfen</strong> und <strong>Kitesurfen</strong> — der Maestrale kommt hier stärker und regelmäßiger herein, besonders nachmittags. Er ist hervorragend für <strong>Familien</strong>: Kleine Kinder fühlen sich in den sandigen Bereichen nahe am Ufer sehr wohl, ohne Wellen und ohne plötzliches Tieferwerden. Er ist aber nicht die Wahl für alle, die klassische Dienstleistungen eines ausgestatteten Strands suchen: Das Ufer ist zum Großteil frei, auf weiten Strecken gibt es <strong>weder Bars noch Duschen</strong>. Abends ist er der richtige Ort, um den <strong>Sonnenuntergang hinter der Asinara</strong> zu erleben: Die Farben des Himmels spiegeln sich auf den weißen Kieseln und dem noch warmen Wasser."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Accesso, parcheggio, consigli', en: 'Access, parking, tips', fr: 'Accès, stationnement, conseils', de: 'Zugang, Parken, Tipps' },
          body: {
            it: "Da Stintino si raggiunge in auto in circa dieci minuti percorrendo la <strong>SP34</strong> verso sud, in direzione Porto Torres: numerose strade sterrate scendono dalla provinciale alla spiaggia, tutte segnalate. <strong>Parcheggio</strong> a bordo strada, gratuito fuori dal mese di agosto; in alta stagione alcune aree diventano a pagamento (3–5 € al giorno). C'è un piccolo chiosco-bar sulla spiaggia centrale (<strong>Kiosko Le Saline</strong>) aperto da giugno a settembre — serve panini, gelati, bevande e a pranzo piatti unici di pasta e pesce alla piastra. <strong>Consigli</strong>: portate ombrellone (no ombra naturale), scarpe da scoglio per le zone di ciottoli, acqua in abbondanza. Al mattino presto e dopo le 17:00 il vento cala e la spiaggia è più piena; in pieno pomeriggio il Maestrale è fortissimo ma la folla cala.",
            en: "From Stintino, you reach it by car in about ten minutes along the <strong>SP34</strong> heading south, towards Porto Torres: numerous dirt roads drop from the provincial road down to the beach, all signposted. <strong>Parking</strong> alongside the road, free outside August; in high season some areas become paid (€3–5 per day). There is a small beach bar-kiosk on the central beach (<strong>Kiosko Le Saline</strong>) open from June to September — serving sandwiches, ice cream, drinks and at lunchtime single-plate pasta and grilled fish dishes. <strong>Tips</strong>: bring a parasol (no natural shade), reef shoes for the pebble areas, plenty of water. Early in the morning and after 17:00 the wind drops and the beach is busier; in the middle of the afternoon the Mistral is at its strongest but the crowds thin out.",
            fr: "Depuis Stintino, on y arrive en voiture en une dizaine de minutes en empruntant la <strong>SP34</strong> vers le sud, direction Porto Torres : de nombreuses pistes descendent de la départementale jusqu'à la plage, toutes signalées. <strong>Stationnement</strong> le long de la route, gratuit hors août ; en haute saison certaines zones deviennent payantes (3–5 € par jour). Il y a un petit kiosque-bar sur la plage centrale (<strong>Kiosko Le Saline</strong>) ouvert de juin à septembre — sandwichs, glaces, boissons et, à midi, plats uniques de pâtes et poissons grillés. <strong>Conseils</strong> : emportez un parasol (pas d'ombre naturelle), des chaussures pour les zones de galets, beaucoup d'eau. Tôt le matin et après 17h00 le vent tombe et la plage est plus fréquentée ; en plein après-midi le Mistral est à son maximum mais la foule diminue.",
            de: "Von Stintino aus erreicht man ihn mit dem Auto in etwa zehn Minuten über die <strong>SP34</strong> Richtung Süden, nach Porto Torres: Zahlreiche Schotterwege führen von der Landstraße zum Strand hinunter, alle ausgeschildert. <strong>Parken</strong> am Straßenrand, außerhalb des Augusts kostenlos; in der Hochsaison werden einige Bereiche kostenpflichtig (3–5 € pro Tag). Am zentralen Strand gibt es einen kleinen Kiosk-Bar (<strong>Kiosko Le Saline</strong>), geöffnet von Juni bis September — Sandwiches, Eis, Getränke und mittags einfache Pasta- und Grillfisch-Gerichte. <strong>Tipps</strong>: Sonnenschirm mitbringen (kein natürlicher Schatten), Badeschuhe für die Kiesbereiche, reichlich Wasser. Früh morgens und nach 17:00 Uhr lässt der Wind nach und der Strand ist voller; am Nachmittag ist der Maestrale am stärksten, aber die Menge nimmt ab."
          }
        }
      ],
      links: {
        official: 'https://visitstintino.it/it/portfolio/le-saline/',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Le+Saline+Stintino'
      }
    },

    {
      slug: 'spiaggia-ezzi-mannu',
      parent: 'villa-stintino',
      name: {
        it: 'Spiaggia Ezzi Mannu',
        en: 'Ezzi Mannu beach',
        fr: 'Plage d\'Ezzi Mannu',
        de: 'Strand Ezzi Mannu'
      },
      subtitle: {
        it: 'Spiaggia selvaggia e ventosa, il regno del kitesurf in Sardegna',
        en: 'Wild and windy beach, Sardinia\'s kitesurfing realm',
        fr: 'Plage sauvage et venteuse, le royaume du kitesurf en Sardaigne',
        de: 'Wilder, windiger Strand, das Reich des Kitesurfens auf Sardinien'
      },
      location: {
        it: 'Stintino sud · Stagno di Pilo',
        en: 'Southern Stintino · Pilo lagoon',
        fr: 'Stintino sud · Étang de Pilo',
        de: 'Stintino Süd · Pilo-Lagune'
      },
      distance: {
        it: '15 minuti in auto dalla villa',
        en: '15 minutes by car from the villa',
        fr: '15 minutes en voiture de la villa',
        de: '15 Minuten mit dem Auto von der Villa'
      },
      hero: 'img/stintino/dintorni/spiaggia-ezzi-mannu.png',
      heroFocus: 'center center',
      intro: {
        it: "<strong>Ezzi Mannu</strong> — che in sardo logudorese significa \"Grande Canna\", dalle canne palustri che crescono rigogliose sulle dune — è la spiaggia più selvaggia del territorio di Stintino. Si estende per oltre un chilometro sulla costa occidentale della penisola, a ridosso dello <strong>Stagno di Pilo</strong>, riserva naturale che ospita una straordinaria avifauna migratoria. Sabbia chiara e fine, acqua turchese quando il mare è calmo, ma soprattutto <strong>vento</strong>: è qui che il Maestrale — il vento da nord-ovest che caratterizza il clima sardo — si fa sentire con più forza e costanza, facendo della spiaggia uno degli spot più amati in Europa per il <strong>kitesurf</strong> e il <strong>windsurf avanzato</strong>. Intorno, solo macchia mediterranea, nessuna costruzione, un silenzio rotto solo dal vento e dal richiamo dei fenicotteri.",
        en: "<strong>Ezzi Mannu</strong> — which in Logudorese Sardinian means \"Big Reed\", after the marsh reeds that grow thick on the dunes — is the wildest beach in the Stintino area. It stretches for more than a kilometre along the western coast of the peninsula, right next to the <strong>Pilo lagoon</strong>, a nature reserve hosting extraordinary migratory birdlife. Pale fine sand, turquoise water when the sea is calm, but above all <strong>wind</strong>: this is where the Mistral — the north-westerly wind that shapes the Sardinian climate — blows most strongly and consistently, making the beach one of Europe's most beloved spots for <strong>kitesurfing</strong> and <strong>advanced windsurfing</strong>. All around, just Mediterranean scrub, no buildings, a silence broken only by the wind and the call of flamingos.",
        fr: "<strong>Ezzi Mannu</strong> — qui en sarde logudorien signifie « Grand Roseau », des roseaux palustres qui poussent dru sur les dunes — est la plage la plus sauvage du territoire de Stintino. Elle s'étend sur plus d'un kilomètre le long de la côte occidentale de la péninsule, à proximité de l'<strong>Étang de Pilo</strong>, réserve naturelle qui accueille une extraordinaire avifaune migratrice. Sable clair et fin, eau turquoise quand la mer est calme, mais surtout <strong>vent</strong> : c'est ici que le Mistral — vent de nord-ouest qui caractérise le climat sarde — se fait sentir avec le plus de force et de constance, faisant de la plage l'un des spots les plus aimés d'Europe pour le <strong>kitesurf</strong> et le <strong>windsurf avancé</strong>. Tout autour, maquis méditerranéen, aucune construction, un silence rompu seulement par le vent et le cri des flamants.",
        de: "<strong>Ezzi Mannu</strong> — was auf logudoresischem Sardisch „Großes Schilf\" bedeutet, nach dem Schilfrohr, das auf den Dünen üppig wächst — ist der wildeste Strand des Stintino-Gebiets. Er erstreckt sich über mehr als einen Kilometer entlang der Westküste der Halbinsel, direkt neben der <strong>Lagune von Pilo</strong>, einem Naturschutzgebiet mit außergewöhnlicher Zugvogelwelt. Heller feiner Sand, türkisfarbenes Wasser bei ruhiger See, doch vor allem <strong>Wind</strong>: Hier macht sich der Maestrale — der Nordwestwind, der das sardische Klima prägt — am stärksten und regelmäßigsten bemerkbar und macht den Strand zu einem der in Europa beliebtesten Spots für <strong>Kitesurfen</strong> und <strong>fortgeschrittenes Windsurfen</strong>. Ringsum nur Mittelmeermacchia, keine Bebauung, eine Stille, die nur vom Wind und vom Ruf der Flamingos unterbrochen wird."
      },
      sections: [
        {
          id: 'vento',
          h2: { it: 'Vento, sabbia, solitudine', en: 'Wind, sand, solitude', fr: 'Vent, sable, solitude', de: 'Wind, Sand, Einsamkeit' },
          body: {
            it: "La geografia di Ezzi Mannu spiega la sua unicità. La costa occidentale della penisola di Stintino è <strong>esposta direttamente al Maestrale</strong>, che arriva dal canale fra Sardegna e Corsica senza ostacoli, accelerato dall'effetto Venturi della Bocca di Bonifacio. Il risultato, nei pomeriggi estivi, è un vento <strong>costante fra i 15 e i 25 nodi</strong>, ideale per la vela ma molto impegnativo per chi cerca solo un bagno. In compenso, nelle ore di maggiore calma — prima mattina, sera — la spiaggia rivela un lato completamente diverso: acqua limpidissima, sabbia finissima che scricchiola sotto i piedi, una luce radente che fa emergere ogni dettaglio delle dune. Dietro la spiaggia, lo <strong>Stagno di Pilo</strong> — pochi metri di dune separano mare e stagno — ospita aironi, garzette, svassi e, in inverno e primavera, <strong>fenicotteri rosa</strong> che si riuniscono a centinaia.",
            en: "Ezzi Mannu's geography explains its uniqueness. The western coast of the Stintino peninsula is <strong>directly exposed to the Mistral</strong>, which arrives from the channel between Sardinia and Corsica without obstacles, accelerated by the Venturi effect of the Strait of Bonifacio. The result, on summer afternoons, is a <strong>constant 15 to 25-knot wind</strong>, ideal for sailing but very demanding for those just wanting a swim. By contrast, in the calmer hours — early morning, evening — the beach reveals a completely different side: crystal-clear water, very fine sand that crunches under foot, a raking light that brings out every detail of the dunes. Behind the beach, the <strong>Pilo lagoon</strong> — just a few metres of dunes separate sea and lagoon — hosts herons, little egrets, great crested grebes and, in winter and spring, <strong>pink flamingos</strong> gathering in their hundreds.",
            fr: "La géographie d'Ezzi Mannu explique son unicité. La côte occidentale de la péninsule de Stintino est <strong>directement exposée au Mistral</strong>, qui arrive du canal entre la Sardaigne et la Corse sans obstacles, accéléré par l'effet Venturi des Bouches de Bonifacio. Résultat, les après-midi d'été, un vent <strong>constant entre 15 et 25 nœuds</strong>, idéal pour la voile mais très exigeant pour qui cherche seulement à se baigner. En revanche, aux heures plus calmes — tôt le matin, en soirée — la plage révèle un visage tout autre : eau très limpide, sable très fin qui crisse sous les pieds, lumière rasante qui fait ressortir chaque détail des dunes. Derrière la plage, l'<strong>Étang de Pilo</strong> — seulement quelques mètres de dunes séparent mer et étang — abrite hérons, aigrettes, grèbes huppés et, en hiver et au printemps, <strong>flamants roses</strong> qui se rassemblent par centaines.",
            de: "Die Geografie von Ezzi Mannu erklärt seine Einzigartigkeit. Die Westküste der Halbinsel Stintino ist <strong>direkt dem Maestrale ausgesetzt</strong>, der aus dem Kanal zwischen Sardinien und Korsika ungehindert anrollt, durch den Venturi-Effekt der Straße von Bonifacio beschleunigt. Das Ergebnis an Sommernachmittagen ist ein <strong>konstanter Wind zwischen 15 und 25 Knoten</strong>, ideal zum Segeln, aber sehr anspruchsvoll für alle, die nur baden möchten. Zu den ruhigeren Stunden — früh morgens, abends — zeigt der Strand dagegen eine ganz andere Seite: glasklares Wasser, feinster knirschender Sand unter den Füßen, streifendes Licht, das jedes Detail der Dünen hervorhebt. Hinter dem Strand beherbergt die <strong>Lagune von Pilo</strong> — nur wenige Meter Dünen trennen Meer und Lagune — Reiher, Seidenreiher, Haubentaucher und im Winter und Frühling <strong>Rosaflamingos</strong>, die sich zu Hunderten versammeln."
          }
        },
        {
          id: 'kitesurf',
          h2: { it: 'Il paradiso del kitesurf', en: 'Kitesurfing paradise', fr: 'Le paradis du kitesurf', de: 'Das Kitesurf-Paradies' },
          body: {
            it: "Nella comunità internazionale di kite e windsurf, <strong>Ezzi Mannu è un nome che circola con rispetto</strong>. Lo spot è famoso per la costanza del vento (si dice che sia \"il più regolare d'Italia\") e per la spiaggia ampia, sabbiosa e senza ostacoli, ideale per lancio e atterraggio. <strong>Due scuole</strong> operano sul posto da maggio a ottobre: offrono corsi per principianti (pacchetti da 10 ore, circa 350 €), perfezionamento avanzato e noleggio attrezzatura (kite completo dai 60 €/giorno, tavole da windsurf dai 40 €). I livelli di rider che si incontrano vanno dall'apprendista al professionista internazionale — non è raro assistere a sessioni di freestyle con manovre spettacolari. Per chi non pratica questi sport, basta stendere un asciugamano a qualche metro dalla zona di lancio: il *cielo pieno di aquiloni colorati* è uno spettacolo in sé.",
            en: "In the international kite and windsurf community, <strong>Ezzi Mannu is a name spoken with respect</strong>. The spot is renowned for the consistency of its wind (said to be \"the most reliable in Italy\") and for the wide, sandy, unobstructed beach, ideal for launch and landing. <strong>Two schools</strong> operate here from May to October: they offer courses for beginners (10-hour packages, around €350), advanced improvement and gear rental (full kite from €60/day, windsurf boards from €40). The riders you meet range from learners to international pros — it's not unusual to watch freestyle sessions with spectacular manoeuvres. If you don't practice these sports, just lay a towel out a few metres from the launch area: the *sky full of colourful kites* is a show in itself.",
            fr: "Dans la communauté internationale du kite et du windsurf, <strong>Ezzi Mannu est un nom qui se prononce avec respect</strong>. Le spot est célèbre pour la constance de son vent (on dit qu'il est « le plus régulier d'Italie ») et pour la plage large, sableuse et sans obstacles, idéale pour le décollage et l'atterrissage. <strong>Deux écoles</strong> opèrent sur place de mai à octobre : elles proposent des cours pour débutants (forfaits de 10 heures, environ 350 €), du perfectionnement avancé et de la location de matériel (kite complet à partir de 60 €/jour, planches de windsurf à partir de 40 €). Les niveaux de riders vont de l'apprenti au professionnel international — il n'est pas rare d'assister à des sessions de freestyle aux manœuvres spectaculaires. Pour qui ne pratique pas ces sports, il suffit d'étendre une serviette à quelques mètres de la zone de décollage : le *ciel plein de cerfs-volants colorés* est un spectacle en soi.",
            de: "In der internationalen Kite- und Windsurf-Community ist <strong>Ezzi Mannu ein Name, der mit Respekt ausgesprochen wird</strong>. Der Spot ist berühmt für die Beständigkeit seines Windes (man sagt, er sei „der regelmäßigste Italiens\") und für den breiten, sandigen, hindernisfreien Strand, ideal zum Starten und Landen. <strong>Zwei Schulen</strong> sind hier von Mai bis Oktober aktiv: Sie bieten Anfängerkurse (10-Stunden-Pakete, rund 350 €), Fortgeschrittenentraining und Geräteverleih (kompletter Kite ab 60 €/Tag, Windsurf-Brett ab 40 €). Das Spektrum der Rider reicht vom Einsteiger bis zum internationalen Profi — nicht selten sieht man Freestyle-Sessions mit spektakulären Manövern. Wer diese Sportarten nicht betreibt, breitet einfach ein Handtuch einige Meter von der Startzone entfernt aus: der *Himmel voller bunter Schirme* ist für sich schon ein Schauspiel."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Come arrivare e consigli', en: 'How to get there and tips', fr: 'Comment y arriver et conseils', de: 'Anfahrt und Tipps' },
          body: {
            it: "Da Stintino si raggiunge in auto in circa <strong>quindici minuti</strong>: SP34 verso Porto Torres, poi deviazione segnalata per Ezzi Mannu, ultimi due chilometri su strada sterrata. <strong>Parcheggio</strong> sterrato all'ingresso della spiaggia, gratuito (piccola cifra in agosto, 2–3 €). C'è un chiosco-bar aperto nei mesi estivi che serve panini, bevande fresche e attrezzatura di base. <strong>Consigli</strong>: se venite per nuotare o prendere il sole, arrivate <strong>entro le 11:00</strong> — dalle 12:00 il vento sale progressivamente e rende difficile stare sdraiati; i pomeriggi sono invece il momento giusto se volete vedere il kitesurf in azione. Portate <strong>occhiali da sole e maglietta traspirante</strong> (la sabbia mossa dal vento può essere fastidiosa), e una giacca leggera per la sera. In primavera, controllate lo Stagno di Pilo con binocolo: potreste vedere fenicotteri.",
            en: "From Stintino, you get there by car in about <strong>fifteen minutes</strong>: SP34 towards Porto Torres, then the signposted turn for Ezzi Mannu, the last two kilometres on a dirt road. <strong>Parking</strong> on gravel at the beach entrance, free (small fee in August, €2–3). There is a beach bar-kiosk open in the summer months that serves sandwiches, cold drinks and basic equipment. <strong>Tips</strong>: if you come to swim or sunbathe, arrive <strong>by 11:00</strong> — from 12:00 the wind progressively builds and makes it hard to lie down; afternoons are instead the right time if you want to watch kitesurfing in action. Bring <strong>sunglasses and a breathable shirt</strong> (wind-blown sand can be irritating) and a light jacket for the evening. In spring, scan the Pilo lagoon with binoculars: you might see flamingos.",
            fr: "Depuis Stintino, on y accède en voiture en environ <strong>quinze minutes</strong> : SP34 vers Porto Torres, puis bifurcation signalée pour Ezzi Mannu, les deux derniers kilomètres sur piste. <strong>Stationnement</strong> en gravier à l'entrée de la plage, gratuit (petite somme en août, 2–3 €). Un kiosque-bar est ouvert les mois d'été et sert sandwichs, boissons fraîches et matériel de base. <strong>Conseils</strong> : si vous venez nager ou bronzer, arrivez <strong>avant 11h00</strong> — à partir de midi le vent se lève progressivement et rend difficile de rester allongé ; les après-midi sont en revanche le bon moment pour voir le kitesurf en action. Prenez des <strong>lunettes de soleil et un tee-shirt respirant</strong> (le sable soulevé par le vent peut gêner), et une veste légère pour le soir. Au printemps, scrutez l'Étang de Pilo aux jumelles : vous pourriez apercevoir des flamants.",
            de: "Von Stintino erreicht man ihn mit dem Auto in etwa <strong>fünfzehn Minuten</strong>: SP34 Richtung Porto Torres, dann die ausgeschilderte Abzweigung zu Ezzi Mannu, die letzten zwei Kilometer über Schotterpiste. <strong>Parken</strong> auf Schotter am Stranzugang, kostenlos (kleiner Betrag im August, 2–3 €). Eine Strandbar ist in den Sommermonaten geöffnet und bietet Sandwiches, kühle Getränke und Grundausrüstung. <strong>Tipps</strong>: Wer zum Schwimmen oder Sonnen kommt, sollte <strong>vor 11:00 Uhr</strong> da sein — ab 12:00 Uhr steigt der Wind zunehmend und das Liegen wird schwierig; die Nachmittage sind dagegen der richtige Moment, um Kitesurfen in Aktion zu sehen. Nehmen Sie <strong>Sonnenbrille und atmungsaktives Shirt</strong> mit (vom Wind getragener Sand kann stören) und eine leichte Jacke für den Abend. Im Frühling die Lagune von Pilo mit dem Fernglas beobachten: Es könnten Flamingos zu sehen sein."
          }
        }
      ],
      links: {
        official: 'https://visitstintino.it/it/portfolio/ezzi-mannu/',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Ezzi+Mannu+Stintino'
      }
    },

    {
      slug: 'monte-accoddi',
      parent: 'villa-stintino',
      name: {
        it: "Nuraghe Monte d'Accoddi",
        en: "Monte d'Accoddi altar",
        fr: "Autel de Monte d'Accoddi",
        de: "Altar Monte d'Accoddi"
      },
      subtitle: {
        it: "L'altare preistorico unico in Europa, a 30 minuti da Stintino",
        en: "The prehistoric altar unique in Europe, 30 minutes from Stintino",
        fr: "L'autel préhistorique unique en Europe, à 30 min de Stintino",
        de: "Der einzigartige prähistorische Altar Europas, 30 Minuten von Stintino"
      },
      location: {
        it: 'Sassari · Sardegna nord-occidentale',
        en: 'Sassari · north-west Sardinia',
        fr: 'Sassari · Sardaigne nord-ouest',
        de: 'Sassari · Nordwestsardinien'
      },
      distance: {
        it: '25 km da Stintino — 30 min in auto',
        en: '25 km from Stintino — 30 min by car',
        fr: '25 km de Stintino — 30 min en voiture',
        de: '25 km von Stintino — 30 Min. mit dem Auto'
      },
      // Foto placeholder da Wikimedia Commons (CC BY-SA) — sostituibile
      // con scatto proprio quando disponibile.
      hero: 'img/stintino/dintorni/nuraghe-monte-accoddi.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Il Nuraghe Monte d'Accoddi — nome improprio, in realtà non è un nuraghe ma un altare-tempio — è uno dei monumenti più straordinari e misteriosi della Sardegna preistorica. Costruito tra il 4000 e il 3600 a.C. dalle popolazioni della cultura di Ozieri, è l'unico esempio in tutto il Mediterraneo occidentale di costruzione a gradoni di questo tipo: una piramide tronca in pietra con rampa d'accesso, strutturalmente molto simile alle ziggurat mesopotamiche. Si trova in aperta campagna, fra Sassari e Porto Torres, a soli venticinque chilometri da Stintino: una gita di mezza giornata che porta indietro di seimila anni.",
        en: "The so-called Nuraghe Monte d'Accoddi — the name is misleading, it is not actually a nuraghe but an altar-temple — is one of the most extraordinary and mysterious monuments of prehistoric Sardinia. Built between 4000 and 3600 BC by the peoples of the Ozieri culture, it is the only example in the entire western Mediterranean of a stepped construction of this kind: a truncated stone pyramid with an access ramp, structurally very similar to Mesopotamian ziggurats. It stands in open countryside between Sassari and Porto Torres, just twenty-five kilometres from Stintino — a half-day trip that takes you six thousand years back in time.",
        fr: "Le soi-disant Nuraghe Monte d'Accoddi — le nom est trompeur, ce n'est en réalité pas un nuraghe mais un autel-temple — est l'un des monuments les plus extraordinaires et mystérieux de la Sardaigne préhistorique. Construit entre 4000 et 3600 av. J.-C. par les populations de la culture d'Ozieri, c'est le seul exemple dans toute la Méditerranée occidentale de construction à degrés de ce type : une pyramide tronquée en pierre avec rampe d'accès, structurellement très proche des ziggourats mésopotamiennes. Il se dresse en pleine campagne, entre Sassari et Porto Torres, à seulement vingt-cinq kilomètres de Stintino — une excursion d'une demi-journée qui vous transporte six mille ans en arrière.",
        de: "Der sogenannte Nuraghe Monte d'Accoddi — der Name ist irreführend, es handelt sich nicht um einen Nuraghen, sondern um einen Altartempel — ist eines der außergewöhnlichsten und geheimnisvollsten Monumente des prähistorischen Sardinien. Zwischen 4000 und 3600 v. Chr. von den Völkern der Ozieri-Kultur errichtet, ist er das einzige Beispiel im gesamten westlichen Mittelmeerraum für eine Stufenkonstruktion dieser Art: eine abgestumpfte Steinpyramide mit Zugangsrampe, strukturell den mesopotamischen Zikkurats sehr ähnlich. Er steht in freiem Gelände zwischen Sassari und Porto Torres, nur fünfundzwanzig Kilometer von Stintino entfernt — ein Halbtagesausflug, der sechstausend Jahre in die Vergangenheit führt."
      },
      sections: [
        {
          id: 'storia',
          h2: {
            it: 'Seimila anni di storia',
            en: 'Six thousand years of history',
            fr: 'Six mille ans d\'histoire',
            de: 'Sechstausend Jahre Geschichte'
          },
          body: {
            it: "Il sito ha una storia costruttiva in due fasi. La prima, del Neolitico medio (4000–3600 a.C.), vide l'edificazione di un primo santuario detto \"rosso\" per via dell'ocra che ricopriva le pareti. Una frana lo distrusse e, intorno al 3200 a.C., la comunità costruì sopra le rovine un secondo monumento molto più grande: una piattaforma trapezoidale di ventisette metri per lato e cinque di altezza, con una rampa lunga quarantuno metri. Sulla sommità si svolgevano i riti — libagioni, offerte, probabilmente sacrifici animali — come testimoniano i resti di animali domestici e le coppelle scavate nelle pietre. Il complesso fu abbandonato intorno al 1800 a.C., all'inizio dell'età del bronzo. Riscoperto nel 1954 dall'archeologo Ercole Contu, è stato restaurato negli anni Ottanta ed è oggi area archeologica aperta al pubblico.",
            en: "The site has a two-phase building history. The first, in the middle Neolithic (4000–3600 BC), saw the construction of an initial sanctuary called the \"red temple\" because of the ochre that covered its walls. A landslide destroyed it and, around 3200 BC, the community built a much larger monument on top of the ruins: a trapezoidal platform twenty-seven metres wide and five metres tall, with a forty-one-metre access ramp. On top, rituals took place — libations, offerings, probably animal sacrifices — as attested by the remains of domestic animals and the cupules carved into the stones. The complex was abandoned around 1800 BC, at the start of the Bronze Age. Rediscovered in 1954 by the archaeologist Ercole Contu, it was restored in the 1980s and is now an archaeological site open to the public.",
            fr: "Le site a une histoire de construction en deux phases. La première, au Néolithique moyen (4000–3600 av. J.-C.), a vu l'édification d'un premier sanctuaire appelé « temple rouge » en raison de l'ocre qui en recouvrait les parois. Un glissement de terrain l'a détruit et, vers 3200 av. J.-C., la communauté a construit sur les ruines un monument bien plus grand : une plateforme trapézoïdale de vingt-sept mètres de côté et cinq de hauteur, avec une rampe d'accès de quarante-et-un mètres. Au sommet se déroulaient des rites — libations, offrandes, probablement sacrifices d'animaux — comme en témoignent les restes d'animaux domestiques et les cupules creusées dans les pierres. Le complexe a été abandonné vers 1800 av. J.-C., au début de l'âge du bronze. Redécouvert en 1954 par l'archéologue Ercole Contu, il a été restauré dans les années 1980 et constitue aujourd'hui un site archéologique ouvert au public.",
            de: "Die Anlage hat eine zweiphasige Baugeschichte. In der ersten Phase, dem mittleren Neolithikum (4000–3600 v. Chr.), entstand ein erstes Heiligtum, das wegen des Ockers, der seine Wände bedeckte, „roter Tempel\" genannt wird. Ein Erdrutsch zerstörte es, und um 3200 v. Chr. errichtete die Gemeinschaft auf den Ruinen ein viel größeres Monument: eine trapezförmige Plattform von siebenundzwanzig Metern Seitenlänge und fünf Metern Höhe mit einer einundvierzig Meter langen Zugangsrampe. Auf der Plattform fanden Rituale statt — Trankopfer, Gaben, vermutlich Tieropfer — wie Reste von Haustieren und in die Steine gemeißelte Schälchen belegen. Um 1800 v. Chr., zu Beginn der Bronzezeit, wurde der Komplex aufgegeben. 1954 vom Archäologen Ercole Contu wiederentdeckt, wurde er in den 1980er Jahren restauriert und ist heute eine öffentlich zugängliche archäologische Stätte."
          }
        },
        {
          id: 'cosa-vedere',
          h2: {
            it: 'Cosa si vede sul sito',
            en: 'What you see on site',
            fr: 'Ce que l\'on voit sur le site',
            de: 'Was man vor Ort sieht'
          },
          body: {
            it: "La visita segue un percorso ad anello che si può fare in autonomia o con guida. All'ingresso, il villaggio Ozieri con le capanne rotonde ricostruite. Subito dopo appare il monumento: un enorme altare trapezoidale in blocchi di calcare, con la lunga rampa che sale verso il piano sommitale. Davanti all'altare si trovano tre menhir in trachite rossa — simboli verticali forse legati al culto della fertilità — una sfera di calcare di ottanta chili perfettamente levigata, e la cosiddetta \"pietra ombelicale\", un masso piatto con grandi coppelle usate probabilmente per libagioni. Sul piazzale, pietre da macina, lastre con incisioni rituali e resti di strutture accessorie. Dall'alto della rampa lo sguardo corre sulla piana di Sassari — la stessa terra che i pastori-contadini della cultura Ozieri coltivavano seimila anni fa.",
            en: "The visit follows a loop that you can walk on your own or with a guide. At the entrance, the reconstructed round huts of the Ozieri village. Just beyond, the monument appears: an enormous trapezoidal limestone altar with the long ramp climbing up to the summit. In front of the altar stand three red trachyte menhirs — vertical symbols perhaps linked to a fertility cult — an eighty-kilo perfectly smoothed limestone sphere, and the so-called \"omphalos stone\", a flat block with large cupules probably used for libations. On the esplanade, millstones, slabs with ritual engravings and remains of accessory structures. From the top of the ramp, the view runs across the Sassari plain — the same land the shepherd-farmers of the Ozieri culture cultivated six thousand years ago.",
            fr: "La visite suit une boucle qu'on peut parcourir seul ou avec un guide. À l'entrée, le village d'Ozieri avec ses huttes rondes reconstituées. Juste après apparaît le monument : un énorme autel trapézoïdal en blocs de calcaire, avec la longue rampe qui monte jusqu'au plateau sommital. Devant l'autel se dressent trois menhirs en trachyte rouge — symboles verticaux peut-être liés à un culte de la fertilité — une sphère en calcaire de quatre-vingts kilos parfaitement polie, et la « pierre ombilicale », un bloc plat avec de grandes cupules probablement utilisées pour des libations. Sur l'esplanade, des meules, des dalles à gravures rituelles et des restes de structures annexes. Du haut de la rampe, le regard embrasse la plaine de Sassari — la même terre que les bergers-paysans de la culture d'Ozieri cultivaient il y a six mille ans.",
            de: "Der Rundgang lässt sich auf eigene Faust oder mit Führung machen. Am Eingang das Dorf der Ozieri-Kultur mit seinen rekonstruierten runden Hütten. Gleich dahinter erscheint das Monument: ein riesiger trapezförmiger Altar aus Kalksteinblöcken mit der langen Rampe, die zur Oberseite hinaufführt. Vor dem Altar stehen drei Menhire aus rotem Trachyt — senkrechte Symbole, möglicherweise mit einem Fruchtbarkeitskult verbunden —, eine perfekt geglättete achtzig Kilo schwere Kalksteinkugel und der sogenannte „Nabelstein\", ein flacher Block mit großen Schälchen, die wahrscheinlich für Trankopfer dienten. Auf dem Vorplatz Mahlsteine, Platten mit rituellen Gravuren und Reste von Nebengebäuden. Vom oberen Ende der Rampe schweift der Blick über die Ebene von Sassari — dasselbe Land, das die Hirtenbauern der Ozieri-Kultur vor sechstausend Jahren bestellten."
          }
        },
        {
          id: 'come-arrivare',
          h2: {
            it: 'Come arrivare da Stintino',
            en: 'How to get there from Stintino',
            fr: 'Comment y aller depuis Stintino',
            de: 'Anfahrt von Stintino'
          },
          body: {
            it: "Il modo più comodo è in auto: dalla villa si prende la SP34 verso Porto Torres, si immette sulla SS131 \"Carlo Felice\" direzione Sassari, e dopo poco si esce a \"Ploaghe–Monte d'Accoddi\". Indicazioni chiare fino al parcheggio del sito. Venticinque chilometri in tutto, trenta minuti scarsi. Parcheggio gratuito all'ingresso dell'area archeologica. Non esiste un collegamento diretto in mezzi pubblici da Stintino: l'auto — anche a noleggio — è la scelta obbligata. Per chi volesse abbinare altre tappe, Porto Torres (con la Basilica di San Gavino) è a dieci minuti, e Sassari — capoluogo con centro storico medievale — a un quarto d'ora.",
            en: "The easiest way is by car: from the villa, take the SP34 toward Porto Torres, join the SS131 \"Carlo Felice\" heading for Sassari, and shortly after exit at \"Ploaghe–Monte d'Accoddi\". Clear signs all the way to the site car park. Twenty-five kilometres in total, under thirty minutes. Free parking at the entrance to the archaeological area. There is no direct public transport from Stintino: a car — including a rental — is the only option. If you want to combine stops, Porto Torres (with the Basilica of San Gavino) is ten minutes away, and Sassari — the provincial capital with its medieval old town — fifteen.",
            fr: "Le moyen le plus pratique est la voiture : depuis la villa, prendre la SP34 vers Porto Torres, rejoindre la SS131 « Carlo Felice » direction Sassari, et sortir peu après à « Ploaghe–Monte d'Accoddi ». Indications claires jusqu'au parking du site. Vingt-cinq kilomètres au total, moins de trente minutes. Stationnement gratuit à l'entrée de la zone archéologique. Il n'existe pas de liaison directe en transport public depuis Stintino : la voiture — même de location — est indispensable. Pour combiner plusieurs étapes, Porto Torres (avec la Basilique de San Gavino) est à dix minutes, et Sassari — chef-lieu au centre historique médiéval — à un quart d'heure.",
            de: "Am bequemsten geht es mit dem Auto: von der Villa fährt man auf der SP34 Richtung Porto Torres, wechselt auf die SS131 „Carlo Felice\" Richtung Sassari und verlässt sie kurz darauf bei „Ploaghe–Monte d'Accoddi\". Klare Beschilderung bis zum Parkplatz der Stätte. Fünfundzwanzig Kilometer insgesamt, knappe dreißig Minuten. Kostenloser Parkplatz am Eingang des Areals. Eine direkte Verbindung mit öffentlichen Verkehrsmitteln gibt es von Stintino aus nicht: das Auto — auch ein Mietwagen — ist die einzige Option. Wer Stationen kombinieren möchte: Porto Torres (mit der Basilika San Gavino) ist zehn Minuten entfernt, Sassari — die Provinzhauptstadt mit mittelalterlicher Altstadt — eine Viertelstunde."
          }
        },
        {
          id: 'pratiche',
          h2: {
            it: 'Informazioni pratiche',
            en: 'Practical information',
            fr: 'Informations pratiques',
            de: 'Praktische Informationen'
          },
          body: {
            it: "Il sito è aperto tutti i giorni in estate, dalle 9:30 alle 13:00 e dalle 15:00 alle 19:00 — in inverno solo la mattina e chiusura anticipata. Il lunedì è giorno di chiusura. Il biglietto costa circa 5 € per gli adulti, ridotto per bambini e over 65, gratis sotto i sei anni. La visita dura fra i quarantacinque minuti e un'ora. All'ingresso c'è un piccolo centro accoglienza con pannelli illustrativi in quattro lingue. Il consiglio è arrivare di prima mattina o nel tardo pomeriggio: il sito è quasi completamente esposto al sole, senza alberi, e nelle ore centrali il caldo si fa sentire. Portate acqua, cappello e scarpe comode. Nessuna barriera architettonica per la piattaforma, ma la rampa ha un lieve pendio.",
            en: "The site is open every day in summer, from 9:30 to 13:00 and from 15:00 to 19:00 — in winter only in the morning, with earlier closing. Monday is closing day. Admission is around €5 for adults, reduced for children and over-65s, free for under-sixes. The visit takes between forty-five minutes and an hour. At the entrance, a small visitor centre has interpretive panels in four languages. Our tip: come early in the morning or in the late afternoon. The site is almost completely exposed, with no trees, and the heat is felt during the middle of the day. Bring water, a hat and comfortable shoes. There are no architectural barriers for the platform, but the ramp has a slight slope.",
            fr: "Le site est ouvert tous les jours en été, de 9h30 à 13h00 et de 15h00 à 19h00 — en hiver uniquement le matin et fermeture anticipée. Le lundi est jour de fermeture. L'entrée coûte environ 5 € pour les adultes, tarif réduit pour les enfants et les plus de 65 ans, gratuit pour les moins de six ans. La visite dure entre quarante-cinq minutes et une heure. À l'entrée, un petit centre d'accueil propose des panneaux explicatifs en quatre langues. Notre conseil : venir tôt le matin ou en fin d'après-midi. Le site est presque totalement exposé, sans arbres, et la chaleur se fait sentir aux heures centrales. Apportez eau, chapeau et chaussures confortables. Pas de barrière architecturale pour la plateforme, mais la rampe présente une légère pente.",
            de: "Die Stätte ist im Sommer täglich geöffnet, von 9:30 bis 13:00 Uhr und von 15:00 bis 19:00 Uhr — im Winter nur vormittags und mit früherer Schließung. Montag ist Ruhetag. Der Eintritt kostet rund 5 € für Erwachsene, ermäßigt für Kinder und Personen über 65, kostenlos für Kinder unter sechs Jahren. Der Besuch dauert zwischen fünfundvierzig Minuten und einer Stunde. Am Eingang bietet ein kleines Besucherzentrum Tafeln in vier Sprachen. Unser Tipp: früh morgens oder am späten Nachmittag kommen. Das Gelände ist fast vollständig exponiert, ohne Bäume, in den Mittagsstunden macht sich die Hitze bemerkbar. Bringen Sie Wasser, Hut und bequeme Schuhe mit. Keine architektonischen Hindernisse zur Plattform, die Rampe hat aber eine leichte Steigung."
          }
        }
      ],
      links: {
        official: 'https://nuragando.altervista.org/monte-daccoddi-sassari/',
        wiki: 'https://it.wikipedia.org/wiki/Altare_preistorico_di_Monte_d%27Accoddi',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Altare+Monte+Accoddi'
      }
    },

    {
      slug: 'castelsardo',
      parent: 'villa-stintino',
      name: {
        it: 'Castelsardo',
        en: 'Castelsardo',
        fr: 'Castelsardo',
        de: 'Castelsardo'
      },
      subtitle: {
        it: 'Il borgo medievale sul mare, uno dei più belli d\'Italia',
        en: 'The medieval seaside village, among the most beautiful in Italy',
        fr: 'Le bourg médiéval au bord de la mer, l\'un des plus beaux d\'Italie',
        de: 'Das mittelalterliche Dorf am Meer, eines der schönsten Italiens'
      },
      location: {
        it: 'Castelsardo · Anglona · Sardegna nord-orientale',
        en: 'Castelsardo · Anglona · north-east Sardinia',
        fr: 'Castelsardo · Anglona · Sardaigne nord-est',
        de: 'Castelsardo · Anglona · Nordostsardinien'
      },
      distance: {
        it: '65 km da Stintino — 1 ora in auto',
        en: '65 km from Stintino — 1 hour by car',
        fr: '65 km de Stintino — 1 heure en voiture',
        de: '65 km von Stintino — 1 Stunde mit dem Auto'
      },
      // Foto placeholder da Wikimedia Commons (CC BY-SA) — sostituibile
      // con scatto proprio quando disponibile.
      hero: 'img/stintino/dintorni/castelsardo.jpg',
      heroFocus: 'center 40%',
      intro: {
        it: "Castelsardo è uno dei borghi medievali più belli di tutta la Sardegna, arroccato su un promontorio di trachite rossa che si allunga nel Golfo dell'Asinara. Fondato nel 1102 dalla famiglia genovese dei Doria come avamposto militare e battezzato allora \"Castelgenovese\", divenne \"Castellaragonese\" dopo la conquista aragonese del 1448 e infine \"Castelsardo\" nel 1767 sotto i Savoia. Tre nomi, tre dominazioni, un unico paese che ha mantenuto intatto il suo cuore antico: vicoli ripidi, case bianche che profumano di salsedine, donne anziane che intrecciano cesti di palma nana sui gradini di casa. Dall'alto della rocca, il panorama abbraccia la costa della Sardegna settentrionale fino alla Corsica. Da Stintino è una gita di un giorno imperdibile.",
        en: "Castelsardo is one of the most beautiful medieval villages in all of Sardinia, perched on a headland of red trachyte that juts into the Gulf of Asinara. Founded in 1102 by the Genoese Doria family as a military outpost and first named \"Castelgenovese\", it became \"Castellaragonese\" after the Aragonese conquest of 1448 and finally \"Castelsardo\" in 1767 under the Savoy. Three names, three rulers, one village that has kept its ancient core intact: steep alleyways, white houses smelling of sea salt, elderly women weaving dwarf-palm baskets on their doorsteps. From the top of the rock, the view sweeps over the northern coast of Sardinia all the way to Corsica. From Stintino it makes an unmissable day trip.",
        fr: "Castelsardo est l'un des plus beaux villages médiévaux de toute la Sardaigne, perché sur un promontoire de trachyte rouge qui s'avance dans le Golfe de l'Asinara. Fondé en 1102 par la famille génoise des Doria comme avant-poste militaire et d'abord baptisé « Castelgenovese », il devient « Castellaragonese » après la conquête aragonaise de 1448, puis « Castelsardo » en 1767 sous les Savoie. Trois noms, trois dominations, un seul village qui a gardé son cœur ancien intact : ruelles escarpées, maisons blanches qui sentent l'embrun, vieilles dames qui tressent des paniers en palmier nain sur le pas de leur porte. Du haut du rocher, la vue embrasse la côte nord de la Sardaigne jusqu'à la Corse. Depuis Stintino, c'est une excursion d'une journée à ne pas manquer.",
        de: "Castelsardo ist eines der schönsten mittelalterlichen Dörfer ganz Sardiniens, thronend auf einem Kap aus rotem Trachyt, das in den Golf von Asinara hineinragt. 1102 von der genuesischen Familie Doria als militärischer Vorposten gegründet und zunächst „Castelgenovese\" genannt, wurde es nach der aragonesischen Eroberung 1448 zu „Castellaragonese\" und schließlich 1767 unter den Savoyern zu „Castelsardo\". Drei Namen, drei Herrschaften, ein einziges Dorf, das seinen historischen Kern bewahrt hat: steile Gassen, weiße Häuser, die nach Salzwasser duften, ältere Frauen, die auf den Stufen vor ihren Häusern Körbe aus Zwergpalme flechten. Vom oberen Felsen reicht der Blick über die Nordküste Sardiniens bis nach Korsika. Von Stintino aus ist es ein unverzichtbarer Tagesausflug."
      },
      sections: [
        {
          id: 'cosa-vedere',
          h2: {
            it: 'Cosa vedere nel borgo',
            en: 'What to see in the village',
            fr: 'Ce qu\'il faut voir dans le village',
            de: 'Was man im Dorf sehen sollte'
          },
          body: {
            it: "Il <strong>Castello dei Doria</strong> domina il borgo dall'alto con le sue torri e le mura medievali. Dentro ospita il Museo dell'Intreccio Mediterraneo, dedicato all'antica arte dell'intreccio delle fibre vegetali — un artigianato ancora vivo nelle mani delle donne di Castelsardo. Dalla terrazza del castello, vista a 360 gradi sul Golfo dell'Asinara, l'isola Rossa, la costa corsa nelle giornate limpide. La <strong>Cattedrale di Sant'Antonio Abate</strong>, di fine Quattrocento, si affaccia direttamente sul mare con il suo campanile cilindrico rivestito in maiolica colorata — una delle immagini-simbolo del borgo. Il centro storico è un labirinto di vicoli, scalinate, archi in pietra, piccole botteghe di artigianato e ristoranti affacciati sul Mediterraneo. A cinque chilometri dal centro, la <strong>Roccia dell'Elefante</strong>: un enorme masso di trachite modellato dal vento a forma di pachiderma, all'interno del quale sono scavate *domus de janas*, tombe ipogeiche neolitiche. Merita una piccola deviazione.",
            en: "The <strong>Doria Castle</strong> dominates the village from above with its medieval walls and towers. Inside, the Museum of Mediterranean Weaving is dedicated to the ancient art of plant-fibre weaving — a craft still alive in the hands of Castelsardo's women. From the castle terrace, a 360-degree view over the Gulf of Asinara, the Isola Rossa, and the Corsican coast on clear days. The <strong>Cathedral of Sant'Antonio Abate</strong>, late 15th century, faces the sea directly with its cylindrical bell tower clad in coloured majolica — one of the village's signature images. The old town is a maze of alleys, stairways, stone arches, small craft workshops and restaurants overlooking the Mediterranean. Five kilometres from the centre, the <strong>Elephant Rock</strong>: a huge trachyte boulder shaped by the wind like a pachyderm, inside which *domus de janas*, Neolithic rock-cut tombs, were carved. Worth the short detour.",
            fr: "Le <strong>Château des Doria</strong> domine le village avec ses tours et ses remparts médiévaux. À l'intérieur, le Musée du Tressage Méditerranéen est consacré à l'art ancien du tressage des fibres végétales — un artisanat encore vivant dans les mains des femmes de Castelsardo. Depuis la terrasse du château, vue à 360 degrés sur le Golfe de l'Asinara, l'Isola Rossa et la côte corse par temps clair. La <strong>Cathédrale de Sant'Antonio Abate</strong>, fin du XVᵉ siècle, donne directement sur la mer avec son clocher cylindrique recouvert de majolique colorée — l'une des images emblématiques du village. Le centre historique est un labyrinthe de ruelles, d'escaliers, d'arcs en pierre, de petites boutiques d'artisanat et de restaurants surplombant la Méditerranée. À cinq kilomètres du centre, le <strong>Rocher de l'Éléphant</strong> : un énorme bloc de trachyte sculpté par le vent en forme de pachyderme, dans lequel ont été creusées des *domus de janas*, tombes rupestres néolithiques. Un petit détour qui en vaut la peine.",
            de: "Das <strong>Doria-Schloss</strong> beherrscht das Dorf mit seinen Türmen und mittelalterlichen Mauern. Darin beherbergt es das Museum des Mittelmeerischen Flechthandwerks, das der alten Kunst des Pflanzenfaserflechtens gewidmet ist — ein Handwerk, das in den Händen der Frauen von Castelsardo noch lebendig ist. Von der Schlossterrasse bietet sich ein 360-Grad-Blick über den Golf von Asinara, die Isola Rossa und an klaren Tagen die korsische Küste. Die <strong>Kathedrale Sant'Antonio Abate</strong> aus dem späten 15. Jahrhundert liegt direkt am Meer, mit ihrem zylindrischen, in bunter Majolika verkleideten Glockenturm — eines der Wahrzeichen des Dorfes. Die Altstadt ist ein Labyrinth aus Gassen, Treppen, Steinbögen, kleinen Handwerksläden und Restaurants mit Blick auf das Mittelmeer. Fünf Kilometer außerhalb des Zentrums der <strong>Elefantenfelsen</strong>: ein riesiger, vom Wind in Form eines Dickhäuters geschliffener Trachytblock, in dessen Inneren *Domus de janas*, neolithische Felsgräber, eingehauen wurden. Den kleinen Abstecher ist er wert."
          }
        },
        {
          id: 'eventi',
          h2: {
            it: 'Tradizioni ed eventi',
            en: 'Traditions and events',
            fr: 'Traditions et événements',
            de: 'Traditionen und Veranstaltungen'
          },
          body: {
            it: "L'evento più sentito è <strong>Lunissanti</strong>, il Lunedì Santo: una processione notturna delle tre confraternite — Santa Croce, Santissimo Sacramento, Santa Maria delle Grazie — che percorrono il borgo illuminate solo dalle torce, intonando antichi canti gregoriani in sardo logudorese. È una delle cerimonie pasquali più emozionanti di tutta la Sardegna e richiama visitatori da tutta Europa. In estate il calendario è pieno: concerti nel cortile del castello, sagra del cestino in agosto, mostre d'artigianato, cinema all'aperto. Il mercato settimanale è il venerdì mattina, lungo la via principale del centro nuovo. Da non perdere, in qualunque periodo dell'anno, il tramonto dai bastioni: il sole cala dietro la costa dell'Asinara e la rocca si tinge di rosso — lo stesso rosso della trachite che le dà forma.",
            en: "The most deeply felt event is <strong>Lunissanti</strong>, Holy Monday: a night-time procession of the three brotherhoods — Santa Croce, Santissimo Sacramento, Santa Maria delle Grazie — moving through the village lit only by torches and intoning ancient Gregorian chants in Logudorese Sardinian. It is one of the most moving Easter ceremonies in all of Sardinia and draws visitors from across Europe. In summer, the calendar is packed: concerts in the castle courtyard, the August basket festival, craft exhibitions, open-air cinema. The weekly market is on Friday morning, along the main street of the new town. Whatever the season, don't miss sunset from the ramparts: the sun sinks behind the Asinara coast and the rock turns red — the same red of the trachyte that shapes it.",
            fr: "L'événement le plus intense est <strong>Lunissanti</strong>, le Lundi Saint : une procession nocturne des trois confréries — Santa Croce, Santissimo Sacramento, Santa Maria delle Grazie — qui parcourent le village éclairées uniquement par des torches, entonnant des chants grégoriens anciens en sarde logudorien. C'est l'une des cérémonies pascales les plus émouvantes de toute la Sardaigne et elle attire des visiteurs de toute l'Europe. En été, le calendrier est chargé : concerts dans la cour du château, fête du panier en août, expositions d'artisanat, cinéma en plein air. Le marché hebdomadaire a lieu le vendredi matin, le long de la rue principale de la ville nouvelle. En toute saison, à ne pas manquer : le coucher de soleil depuis les remparts — le soleil descend derrière la côte de l'Asinara et le rocher se teinte de rouge, le même rouge que la trachyte qui le sculpte.",
            de: "Das intensivste Ereignis ist <strong>Lunissanti</strong>, der Heilige Montag: eine nächtliche Prozession der drei Bruderschaften — Santa Croce, Santissimo Sacramento, Santa Maria delle Grazie — die, nur von Fackeln beleuchtet, durch das Dorf ziehen und alte gregorianische Gesänge im logudoresischen Sardisch anstimmen. Es ist eine der ergreifendsten Osterzeremonien ganz Sardiniens und zieht Besucher aus ganz Europa an. Im Sommer ist der Kalender voll: Konzerte im Schlosshof, Korbfest im August, Handwerksausstellungen, Open-Air-Kino. Der Wochenmarkt findet freitagvormittags entlang der Hauptstraße der Neustadt statt. Zu jeder Jahreszeit unverpasslich: der Sonnenuntergang von den Stadtmauern — die Sonne versinkt hinter der Asinara-Küste und der Fels färbt sich rot, im selben Rot des Trachyts, der ihn formt."
          }
        },
        {
          id: 'come-arrivare',
          h2: {
            it: 'Come arrivare da Stintino',
            en: 'How to get there from Stintino',
            fr: 'Comment y aller depuis Stintino',
            de: 'Anfahrt von Stintino'
          },
          body: {
            it: "In auto, dal parcheggio della villa, sessantacinque chilometri per un'ora abbondante di viaggio: si scende su Porto Torres e si prende la SS200 costiera in direzione Sorso–Castelsardo, un tracciato panoramico che costeggia il Golfo dell'Asinara con viste aperte. In alternativa, la SS131 fino a Sassari e poi la SS200 (tempi analoghi, paesaggio meno marino). Il centro storico è Zona a Traffico Limitato: lasciate l'auto nei parcheggi a pagamento sotto le mura — c'è un comodo ascensore pubblico che porta direttamente alla parte alta del borgo. Da Stintino non esistono autobus diretti: il mezzo pubblico richiederebbe un cambio a Sassari e diverse ore di viaggio.",
            en: "By car, from the villa car park, sixty-five kilometres and about an hour's drive: head down to Porto Torres and take the coastal SS200 toward Sorso–Castelsardo, a scenic road that hugs the Gulf of Asinara with open views. Alternatively, the SS131 to Sassari and then the SS200 (similar times, less of a sea view). The old town is a Limited Traffic Zone: leave your car in the paid car parks below the walls — there is a handy public lift straight up to the upper village. There are no direct buses from Stintino: public transport would require a change in Sassari and several hours of travel.",
            fr: "En voiture, depuis le parking de la villa, soixante-cinq kilomètres pour environ une heure de route : descendre sur Porto Torres et prendre la SS200 côtière direction Sorso–Castelsardo, un itinéraire panoramique qui longe le Golfe de l'Asinara avec des vues dégagées. En alternative, la SS131 jusqu'à Sassari puis la SS200 (temps similaires, paysage moins maritime). Le centre historique est Zone à Trafic Limité : laissez la voiture dans les parkings payants sous les remparts — un pratique ascenseur public monte directement vers la partie haute du village. Il n'existe pas de bus direct depuis Stintino : les transports en commun impliqueraient un changement à Sassari et plusieurs heures de trajet.",
            de: "Mit dem Auto vom Villa-Parkplatz fünfundsechzig Kilometer, rund eine Stunde: hinunter nach Porto Torres, dann die Küstenstraße SS200 Richtung Sorso–Castelsardo, eine Panoramastrecke entlang des Golfs von Asinara mit weitem Blick. Alternativ SS131 bis Sassari und dann SS200 (ähnliche Fahrzeit, weniger Meerblick). Die Altstadt ist verkehrsbeschränkte Zone: stellen Sie das Auto auf den gebührenpflichtigen Parkplätzen unterhalb der Mauern ab — ein praktischer öffentlicher Aufzug bringt Sie direkt in den oberen Ortsteil. Von Stintino aus gibt es keine direkten Busse: mit öffentlichen Verkehrsmitteln wären ein Umstieg in Sassari und mehrere Stunden Fahrt nötig."
          }
        },
        {
          id: 'pratiche',
          h2: {
            it: 'Informazioni pratiche',
            en: 'Practical information',
            fr: 'Informations pratiques',
            de: 'Praktische Informationen'
          },
          body: {
            it: "Il Castello dei Doria è aperto tutto l'anno, con orario 9:00–20:00 in estate e chiusura anticipata fuori stagione. Biglietto circa 5 € adulti, ridotto per bambini e gruppi. La visita richiede almeno un'ora, cui aggiungere un'altra ora per perdersi nel dedalo di vicoli. Abbinate la giornata con un pranzo in uno dei ristoranti della rocca — specialità locale: i *ciusòni*, piccoli gnocchetti di semola con sugo di cinghiale, e la *zuppa gallurese*. Per il ritorno a Stintino, puntate a partire verso le 19:00 per godere del tramonto dal belvedere prima di scendere. Se preferite una cena in paese, prenotate: ristoranti molto richiesti nei weekend estivi.",
            en: "The Doria Castle is open all year round, from 9:00 to 20:00 in summer and with earlier closing off-season. Ticket around €5 for adults, reduced for children and groups. Allow at least an hour for the visit, plus another to get lost in the maze of alleys. Pair the day with lunch at one of the rock-top restaurants — local specialities: *ciusòni*, small semolina gnocchi with wild boar sauce, and the *Gallurese soup*. To drive back to Stintino, aim to leave around 19:00 to catch the sunset from the belvedere before heading down. If you prefer dinner in the village, book ahead: restaurants fill up on summer weekends.",
            fr: "Le Château des Doria est ouvert toute l'année, de 9h00 à 20h00 en été, avec fermeture anticipée hors saison. Billet environ 5 € adultes, tarif réduit pour enfants et groupes. Compter au moins une heure pour la visite, plus une autre pour flâner dans le dédale des ruelles. Combinez la journée avec un déjeuner dans l'un des restaurants de la rocca — spécialités locales : les *ciusòni*, petits gnocchis de semoule à la sauce de sanglier, et la *soupe gallurese*. Pour rentrer à Stintino, partez vers 19h00 pour profiter du coucher de soleil depuis le belvédère avant de redescendre. Si vous préférez dîner sur place, réservez : les restaurants sont très demandés les week-ends d'été.",
            de: "Das Doria-Schloss ist ganzjährig geöffnet, im Sommer von 9:00 bis 20:00 Uhr, außerhalb der Saison mit früherer Schließung. Eintritt rund 5 € für Erwachsene, ermäßigt für Kinder und Gruppen. Für den Besuch sollten Sie mindestens eine Stunde einplanen, dazu eine weitere, um sich im Gassenlabyrinth zu verlieren. Verbinden Sie den Tag mit einem Mittagessen in einem der Restaurants auf dem Felsen — lokale Spezialitäten: *ciusòni*, kleine Grießklößchen mit Wildschweinsoße, und die *galluresische Suppe*. Für die Rückfahrt nach Stintino brechen Sie gegen 19:00 Uhr auf, um den Sonnenuntergang vom Aussichtspunkt zu genießen, bevor es hinuntergeht. Wenn Sie lieber im Ort zu Abend essen: reservieren Sie, an Sommerwochenenden sind die Restaurants sehr gefragt."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/luoghi/nord-ovest/castelsardo',
        wiki: 'https://it.wikipedia.org/wiki/Castelsardo',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Castelsardo'
      }
    },

    {
      slug: 'capo-falcone',
      parent: 'villa-stintino',
      name: {
        it: 'Torre di Capo Falcone',
        en: 'Capo Falcone Tower',
        fr: 'Tour de Capo Falcone',
        de: 'Turm von Capo Falcone'
      },
      subtitle: {
        it: 'La torre aragonese del XVI secolo che domina il Golfo dell\'Asinara',
        en: 'The 16th-century Aragonese watchtower overlooking the Gulf of Asinara',
        fr: 'La tour aragonaise du XVIᵉ siècle qui domine le Golfe de l\'Asinara',
        de: 'Der aragonesische Wachturm aus dem 16. Jahrhundert über dem Golf von Asinara'
      },
      location: {
        it: 'Stintino · Capo nord della Sardegna',
        en: 'Stintino · northern cape of Sardinia',
        fr: 'Stintino · cap nord de la Sardaigne',
        de: 'Stintino · Nordkap Sardiniens'
      },
      distance: {
        it: '15 minuti a piedi o in bici dalla villa',
        en: '15 minutes on foot or by bike from the villa',
        fr: '15 minutes à pied ou à vélo de la villa',
        de: '15 Minuten zu Fuß oder mit dem Rad von der Villa'
      },
      hero: 'img/stintino/dintorni/capo-falcone.png',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Torre di Capo Falcone</strong> è il punto più alto e fotografato del nord della Sardegna: una torre cilindrica aragonese costruita nel <strong>1572</strong> sull'estrema punta del promontorio, a <strong>circa 195 metri sul livello del mare</strong>. Da qui lo sguardo abbraccia tutto il Golfo dell'Asinara: la Pelosa appena sotto, l'Isola Piana di fronte, la sagoma scura dell'Asinara all'orizzonte e, nelle giornate limpide, persino la Corsica. È uno dei luoghi più belli per il tramonto in tutta la Sardegna — e si raggiunge a piedi dalla villa in poco più di un quarto d'ora.",
        en: "<strong>Capo Falcone Tower</strong> is the highest and most photographed point in northern Sardinia: a cylindrical Aragonese tower built in <strong>1572</strong> at the very tip of the promontory, <strong>about 195 metres above sea level</strong>. From here the gaze takes in the whole Gulf of Asinara: La Pelosa just below, Piana island opposite, the dark profile of Asinara on the horizon, and on clear days even Corsica. It's one of the finest places for sunset in all of Sardinia — and from the villa it's just over a quarter of an hour on foot.",
        fr: "La <strong>Tour de Capo Falcone</strong> est le point le plus haut et le plus photographié du nord de la Sardaigne : une tour cylindrique aragonaise construite en <strong>1572</strong> à l'extrême pointe du promontoire, à <strong>environ 195 mètres au-dessus du niveau de la mer</strong>. D'ici, le regard embrasse tout le Golfe de l'Asinara : La Pelosa juste en bas, l'Isola Piana en face, la silhouette sombre de l'Asinara à l'horizon et, par temps clair, même la Corse. C'est l'un des plus beaux endroits pour le coucher de soleil de toute la Sardaigne — et depuis la villa, à peine plus d'un quart d'heure à pied.",
        de: "Der <strong>Turm von Capo Falcone</strong> ist der höchste und meistfotografierte Punkt Nordsardiniens: ein zylindrischer aragonesischer Turm, <strong>1572</strong> an der äußersten Spitze des Vorgebirges errichtet, <strong>rund 195 Meter über dem Meeresspiegel</strong>. Von hier umfasst der Blick den gesamten Golf von Asinara: La Pelosa direkt darunter, die Insel Piana gegenüber, der dunkle Umriss der Asinara am Horizont und an klaren Tagen sogar Korsika. Einer der schönsten Orte für den Sonnenuntergang ganz Sardiniens — und von der Villa aus gut eine Viertelstunde zu Fuß."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'La torre e il sistema difensivo aragonese', en: 'The tower and the Aragonese defence system', fr: 'La tour et le système défensif aragonais', de: 'Der Turm und das aragonesische Verteidigungssystem' },
          body: {
            it: "La torre fu costruita nel 1572 dagli <strong>Aragonesi</strong> come parte del sistema di <strong>torri costiere</strong> che cingeva l'intera Sardegna per proteggere i borghi dalle incursioni dei pirati barbareschi. Da Capo Falcone i fuochi notturni segnalavano alla torre di Pelosa, sotto, e all'altra di Porto Torres l'avvicinarsi delle navi nemiche. La struttura, in pietra di trachite locale, ha una pianta circolare di sette metri di diametro e si conserva ancora integra nella parte bassa: la sommità è crollata nel corso dei secoli ma resta visibile la <strong>piattaforma per il cannone</strong> che difendeva l'imboccatura del golfo. Insieme alla Torre della Pelosa e all'Isola Piana, forma un trittico difensivo unico in Sardegna.",
            en: "The tower was built in 1572 by the <strong>Aragonese</strong> as part of the system of <strong>coastal towers</strong> ringing the whole of Sardinia to protect villages from Barbary pirate raids. From Capo Falcone, night-time fires signalled the approach of enemy ships to the Pelosa tower below and to the one at Porto Torres. The structure, in local trachyte stone, is circular with a seven-metre diameter and still preserves its lower section: the top has collapsed over the centuries, but the <strong>cannon platform</strong> that defended the gulf entrance is still visible. Together with the Pelosa Tower and Piana island, it forms a defensive triptych unique in Sardinia.",
            fr: "La tour fut érigée en 1572 par les <strong>Aragonais</strong> dans le cadre du système des <strong>tours côtières</strong> qui ceinturait toute la Sardaigne pour protéger les villages des raids des pirates barbaresques. Depuis Capo Falcone, les feux nocturnes signalaient à la tour de La Pelosa, en contrebas, et à celle de Porto Torres l'approche des navires ennemis. L'édifice, en trachyte locale, est circulaire avec un diamètre de sept mètres et conserve encore sa partie basse : le sommet s'est effondré au fil des siècles, mais la <strong>plate-forme du canon</strong> qui défendait l'entrée du golfe reste visible. Avec la Tour de La Pelosa et l'Isola Piana, elle forme un triptyque défensif unique en Sardaigne.",
            de: "Der Turm wurde 1572 von den <strong>Aragonesen</strong> als Teil des Systems der <strong>Küstentürme</strong> errichtet, das ganz Sardinien umgürtete und die Dörfer vor den Einfällen der Barbareskenpiraten schützen sollte. Von Capo Falcone aus signalisierten nächtliche Feuer dem Turm an der Pelosa und dem in Porto Torres das Herannahen feindlicher Schiffe. Das Bauwerk aus lokalem Trachyt hat einen kreisrunden Grundriss mit sieben Metern Durchmesser, der untere Teil ist noch erhalten: die Spitze ist im Laufe der Jahrhunderte eingestürzt, doch die <strong>Kanonenplattform</strong>, die die Einfahrt des Golfs verteidigte, ist weiterhin sichtbar. Zusammen mit dem Pelosa-Turm und der Insel Piana bildet er ein in Sardinien einmaliges Verteidigungs-Triptychon."
          }
        },
        {
          id: 'sentiero',
          h2: { it: 'Il sentiero e i panorami', en: 'The trail and the views', fr: 'Le sentier et les panoramas', de: 'Der Wanderweg und die Aussicht' },
          body: {
            it: "Dalla villa si prende la strada bianca che sale verso il capo: il sentiero è ben tracciato, con pendenza dolce nei primi cinquecento metri e un ultimo tratto più ripido fra <strong>rocce granitiche, ginepri e cisto</strong>. Dura circa <strong>venti minuti</strong> a piedi, dieci con buon passo o in bici fino al parcheggio basso. Lungo il percorso si attraversa la <strong>macchia mediterranea</strong> profumata di elicriso e finocchio selvatico, con vista sempre più ampia man mano che si sale. In primavera fioriscono le orchidee selvatiche e i piccoli iris sardi. Una volta in cima, una panchina in legno permette di sedersi e godere il <strong>panorama a 360°</strong>: a nord l'Asinara con le sue calette, a est il Golfo dell'Asinara fino a Castelsardo, a ovest l'Isola Piana, a sud la silhouette del paese.",
            en: "From the villa take the unpaved track climbing toward the cape: the path is well marked, with a gentle slope for the first five hundred metres and a steeper final stretch among <strong>granite rocks, junipers and rockrose</strong>. It takes about <strong>twenty minutes</strong> on foot, ten at a brisk pace or by bike to the lower car park. Along the way you cross the <strong>Mediterranean scrub</strong> fragrant with curry-plant and wild fennel, with the view widening as you climb. In spring wild orchids and small Sardinian irises bloom. Once at the top, a wooden bench lets you sit and enjoy the <strong>360° panorama</strong>: to the north Asinara with its coves, to the east the Gulf of Asinara as far as Castelsardo, to the west Piana island, to the south the silhouette of the village.",
            fr: "Depuis la villa, on emprunte la piste qui monte vers le cap : le sentier est bien tracé, avec une pente douce sur les cinq cents premiers mètres et une dernière portion plus raide parmi <strong>rochers de granit, genévriers et cistes</strong>. Il faut environ <strong>vingt minutes</strong> à pied, dix à bon pas ou à vélo jusqu'au parking inférieur. En chemin, on traverse le <strong>maquis méditerranéen</strong> parfumé d'immortelle et de fenouil sauvage, avec une vue qui s'élargit à mesure qu'on monte. Au printemps fleurissent les orchidées sauvages et les petits iris sardes. Une fois au sommet, un banc en bois permet de s'asseoir et de profiter du <strong>panorama à 360°</strong> : au nord l'Asinara avec ses criques, à l'est le Golfe de l'Asinara jusqu'à Castelsardo, à l'ouest l'Isola Piana, au sud la silhouette du village.",
            de: "Von der Villa aus geht es über den Schotterweg, der zum Kap hinaufführt: Der Pfad ist gut markiert, die ersten fünfhundert Meter mit sanftem Anstieg, das letzte Stück steiler zwischen <strong>Granitfelsen, Wacholder und Zistrosen</strong>. Zu Fuß dauert es rund <strong>zwanzig Minuten</strong>, zehn bei zügigem Schritt oder mit dem Rad bis zum unteren Parkplatz. Unterwegs durchquert man die <strong>mediterrane Macchia</strong>, die nach Currystrauch und wildem Fenchel duftet, der Blick wird beim Aufstieg immer weiter. Im Frühling blühen wilde Orchideen und kleine sardische Schwertlilien. Oben angekommen lädt eine Holzbank zum Sitzen und Genießen des <strong>360°-Panoramas</strong> ein: im Norden die Asinara mit ihren Buchten, im Osten der Golf von Asinara bis Castelsardo, im Westen die Insel Piana, im Süden die Silhouette des Dorfes."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Quando andare e cosa portare', en: 'When to go, what to bring', fr: 'Quand y aller, que prendre', de: 'Wann hingehen, was mitnehmen' },
          body: {
            it: "Il momento migliore è il <strong>tardo pomeriggio</strong>: salire un'ora prima del tramonto regala la luce radente sulle rocce e l'orizzonte che si tinge di rosa e oro alle spalle dell'Asinara. In <strong>estate</strong>, evitare le ore centrali (12:00–16:00): non c'è ombra naturale e il caldo è intenso. In <strong>primavera e autunno</strong> la passeggiata è perfetta in qualsiasi momento. <strong>Da portare</strong>: scarpe da ginnastica o sandali chiusi (il tratto finale è roccioso), acqua almeno mezzo litro a testa, una felpa leggera per il vento al tramonto, macchina fotografica. <strong>Accesso libero e gratuito</strong>, sempre aperto. La torre non è visitabile internamente — è un monumento storico vincolato — ma il valore del posto è il panorama dalla base. Adatto anche ai bambini sopra i sei anni; sconsigliato con il passeggino oltre il parcheggio basso.",
            en: "The best time is <strong>late afternoon</strong>: arriving an hour before sunset gives you raking light on the rocks and the horizon turning pink and gold behind Asinara. In <strong>summer</strong>, avoid the middle of the day (12:00–16:00): there's no natural shade and the heat is intense. In <strong>spring and autumn</strong>, the walk is perfect at any time. <strong>Bring</strong>: trainers or closed sandals (the final stretch is rocky), at least half a litre of water per person, a light sweater for the wind at sunset, a camera. <strong>Free entry, always open</strong>. The tower is not open inside — it is a protected historical monument — but the real value is the view from the base. Suitable for children over six; not advisable with a stroller past the lower car park.",
            fr: "Le meilleur moment, c'est la <strong>fin d'après-midi</strong> : monter une heure avant le coucher du soleil offre la lumière rasante sur les rochers et l'horizon qui se teinte de rose et d'or derrière l'Asinara. En <strong>été</strong>, évitez les heures centrales (12h00–16h00) : pas d'ombre naturelle et chaleur intense. Au <strong>printemps et en automne</strong>, la promenade est parfaite à toute heure. <strong>À emporter</strong> : baskets ou sandales fermées (la dernière portion est rocheuse), au moins un demi-litre d'eau par personne, un sweat léger pour le vent au coucher du soleil, un appareil photo. <strong>Accès libre et gratuit</strong>, toujours ouvert. La tour n'est pas visitable à l'intérieur — c'est un monument historique protégé — mais l'intérêt est le panorama depuis la base. Convient aussi aux enfants à partir de six ans ; déconseillé avec une poussette au-delà du parking bas.",
            de: "Die beste Zeit ist der <strong>späte Nachmittag</strong>: eine Stunde vor Sonnenuntergang aufzusteigen schenkt das Streiflicht auf den Felsen und den Horizont, der hinter der Asinara rosa und golden leuchtet. Im <strong>Sommer</strong> die Mittagsstunden meiden (12:00–16:00): natürlicher Schatten fehlt, die Hitze ist groß. Im <strong>Frühling und Herbst</strong> ist der Spaziergang zu jeder Tageszeit perfekt. <strong>Mitbringen</strong>: Turnschuhe oder geschlossene Sandalen (das letzte Stück ist felsig), mindestens einen halben Liter Wasser pro Person, einen leichten Pullover für den Wind beim Sonnenuntergang, Fotoapparat. <strong>Eintritt frei, jederzeit zugänglich</strong>. Der Turm ist nicht von innen besichtbar — er ist ein geschütztes historisches Denkmal — der Wert liegt im Panorama vom Sockel aus. Auch für Kinder ab sechs Jahren geeignet; mit Kinderwagen nur bis zum unteren Parkplatz."
          }
        }
      ],
      links: {
        wiki: 'https://it.wikipedia.org/wiki/Capo_Falcone',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Torre+Capo+Falcone+Stintino'
      }
    },

    {
      slug: 'snorkeling-windsurf',
      parent: 'villa-stintino',
      name: {
        it: 'Snorkeling, immersioni e windsurf',
        en: 'Snorkelling, diving and windsurfing',
        fr: 'Snorkeling, plongée et planche à voile',
        de: 'Schnorcheln, Tauchen und Windsurfen'
      },
      subtitle: {
        it: 'Le acque del Golfo dell\'Asinara, fra fondali UNESCO e vento del Maestrale',
        en: 'The waters of the Gulf of Asinara, between UNESCO seabeds and the Mistral wind',
        fr: 'Les eaux du Golfe de l\'Asinara, entre fonds UNESCO et vent du Mistral',
        de: 'Die Gewässer des Golfs von Asinara, zwischen UNESCO-Seegrund und Maestrale-Wind'
      },
      location: {
        it: 'Stintino · Golfo dell\'Asinara',
        en: 'Stintino · Gulf of Asinara',
        fr: 'Stintino · Golfe de l\'Asinara',
        de: 'Stintino · Golf von Asinara'
      },
      distance: {
        it: 'Dal porto e dalle spiagge di Stintino',
        en: 'From the harbour and beaches of Stintino',
        fr: 'Depuis le port et les plages de Stintino',
        de: 'Vom Hafen und den Stränden Stintinos'
      },
      hero: 'img/stintino/dintorni/snorkeling-windsurf-stintino.png',
      heroFocus: 'center center',
      intro: {
        it: "Il <strong>Golfo dell'Asinara</strong> è uno dei tratti di mare più belli del Mediterraneo per chi ama lo sport in acqua. <strong>Sotto la superficie</strong> si apre un mondo di praterie di <strong>Posidonia oceanica</strong> — ecosistema patrimonio UNESCO — popolato da saraghi, polpi, murene, cernie e, nei mesi estivi, dalle tartarughe Caretta caretta che risalgono per nidificare. <strong>Sopra</strong>, il <strong>Maestrale</strong> che soffia regolare ha reso questa baia una delle palestre di windsurf, kitesurf e vela più rinomate d'Italia. La nostra villa è a pochi minuti dai principali punti di partenza: porto di Stintino per immersioni e barca, Le Saline per snorkeling sicuro coi bambini, Ezzi Mannu per il vento.",
        en: "The <strong>Gulf of Asinara</strong> is one of the finest stretches of sea in the Mediterranean for water-sport lovers. <strong>Below the surface</strong> opens a world of <strong>Posidonia oceanica</strong> meadows — a UNESCO heritage ecosystem — populated by sea breams, octopuses, moray eels, groupers and, in summer, the Caretta caretta turtles that come up to nest. <strong>Above the surface</strong>, the steady <strong>Mistral</strong> has made this bay one of the most renowned windsurf, kitesurf and sailing spots in Italy. Our villa is a few minutes from the main starting points: Stintino harbour for diving and boats, Le Saline for safe snorkelling with children, Ezzi Mannu for the wind.",
        fr: "Le <strong>Golfe de l'Asinara</strong> est l'un des plus beaux plans d'eau de Méditerranée pour les amateurs de sports nautiques. <strong>Sous la surface</strong> s'ouvre un monde de prairies de <strong>Posidonia oceanica</strong> — écosystème inscrit au patrimoine UNESCO — peuplé de sargues, poulpes, murènes, mérous et, en été, des tortues Caretta caretta qui remontent pour nicher. <strong>Au-dessus</strong>, le <strong>Mistral</strong> régulier a fait de cette baie l'un des spots de planche à voile, kitesurf et voile les plus réputés d'Italie. Notre villa est à quelques minutes des principaux points de départ : port de Stintino pour la plongée et le bateau, Le Saline pour le snorkeling en toute sécurité avec les enfants, Ezzi Mannu pour le vent.",
        de: "Der <strong>Golf von Asinara</strong> ist eines der schönsten Meeresgebiete des Mittelmeers für Wassersport-Liebhaber. <strong>Unter der Oberfläche</strong> öffnet sich eine Welt aus <strong>Posidonia oceanica</strong>-Wiesen — ein UNESCO-Erbe-Ökosystem — bevölkert von Geißbrassen, Oktopussen, Muränen, Zackenbarschen und im Sommer den Karettschildkröten, die zum Nisten heraufkommen. <strong>Über Wasser</strong> hat der beständige <strong>Maestrale</strong> diese Bucht zu einem der bekanntesten Windsurf-, Kitesurf- und Segelreviere Italiens gemacht. Unsere Villa liegt wenige Minuten von den wichtigsten Ausgangspunkten entfernt: Hafen Stintino für Tauchen und Boot, Le Saline für sicheres Schnorcheln mit Kindern, Ezzi Mannu für den Wind."
      },
      sections: [
        {
          id: 'snorkeling',
          h2: { it: 'Snorkeling e immersioni', en: 'Snorkelling and diving', fr: 'Snorkeling et plongée', de: 'Schnorcheln und Tauchen' },
          body: {
            it: "I migliori punti per lo <strong>snorkeling</strong> in autonomia sono <strong>Le Saline</strong> (sabbia e roccia bassa, ideale per chi parte da zero), la <strong>Pelosa</strong> appena al largo della Torre (banchi di sabbia e posidonia) e gli scogli laterali di <strong>La Stalla</strong> all'isola Piana, raggiungibile in barca. La visibilità è quasi sempre superiore ai <strong>15 metri</strong>. Per le <strong>immersioni</strong>, il riferimento del territorio è <strong>Asinara Scuba Diving</strong>, con sede al porto di Stintino: organizza uscite quotidiane nel <strong>Parco Nazionale dell'Asinara</strong> dove i fondali — protetti dal 1997 — ospitano cernie brune, ricciole, gorgonie e relitti come quello del <strong>Cathy</strong> e dei resti della seconda guerra. Corsi PADI per principianti (<strong>Open Water</strong> in 4 giorni), uscite per certificati Advanced fino a 30 metri, e immersioni notturne d'estate.",
            en: "The best spots for self-guided <strong>snorkelling</strong> are <strong>Le Saline</strong> (sand and shallow rock, perfect for beginners), <strong>La Pelosa</strong> just off the Tower (sand banks and seagrass) and the side rocks of <strong>La Stalla</strong> by Piana island, reachable by boat. Visibility is almost always over <strong>15 metres</strong>. For <strong>diving</strong>, the local benchmark is <strong>Asinara Scuba Diving</strong>, based at Stintino harbour: it runs daily trips into the <strong>Asinara National Park</strong>, where seabeds — protected since 1997 — host dusky groupers, amberjacks, gorgonians and wrecks such as the <strong>Cathy</strong> and Second World War remains. PADI courses for beginners (<strong>Open Water</strong> in 4 days), trips for Advanced divers down to 30 metres, and night dives in summer.",
            fr: "Les meilleurs spots de <strong>snorkeling</strong> en autonomie sont <strong>Le Saline</strong> (sable et rochers bas, idéal pour débuter), <strong>La Pelosa</strong> au large de la tour (bancs de sable et posidonie) et les rochers latéraux de <strong>La Stalla</strong> près de l'Isola Piana, accessibles en bateau. La visibilité dépasse presque toujours <strong>15 mètres</strong>. Pour la <strong>plongée</strong>, la référence locale est <strong>Asinara Scuba Diving</strong>, au port de Stintino : sorties quotidiennes dans le <strong>Parc National de l'Asinara</strong>, où les fonds — protégés depuis 1997 — abritent mérous bruns, sérioles, gorgones et épaves comme le <strong>Cathy</strong> et des vestiges de la Seconde Guerre. Cours PADI débutants (<strong>Open Water</strong> en 4 jours), sorties pour Advanced jusqu'à 30 mètres, plongées de nuit en été.",
            de: "Die besten Spots für <strong>Schnorcheln</strong> auf eigene Faust sind <strong>Le Saline</strong> (Sand und niedriger Fels, ideal für Anfänger), die <strong>Pelosa</strong> vor dem Turm (Sandbänke und Seegras) und die seitlichen Felsen von <strong>La Stalla</strong> an der Insel Piana, mit dem Boot erreichbar. Die Sicht beträgt fast immer über <strong>15 Meter</strong>. Für das <strong>Tauchen</strong> ist <strong>Asinara Scuba Diving</strong> am Hafen von Stintino die lokale Referenz: tägliche Ausfahrten in den <strong>Nationalpark Asinara</strong>, dessen seit 1997 geschützte Gründe Braune Zackenbarsche, Bernsteinmakrelen, Gorgonien und Wracks wie die <strong>Cathy</strong> und Überreste aus dem Zweiten Weltkrieg beherbergen. PADI-Kurse für Anfänger (<strong>Open Water</strong> in 4 Tagen), Ausfahrten für Advanced-Taucher bis 30 Meter und im Sommer Nachttauchgänge."
          }
        },
        {
          id: 'windsurf',
          h2: { it: 'Windsurf, kitesurf e vela', en: 'Windsurfing, kitesurfing and sailing', fr: 'Planche à voile, kitesurf et voile', de: 'Windsurfen, Kitesurfen und Segeln' },
          body: {
            it: "Il <strong>Maestrale</strong> soffia da nord-ovest in <strong>maggio–settembre</strong> quasi tutti i pomeriggi con una intensità fra i <strong>12 e i 25 nodi</strong> — condizione perfetta per chi pratica vela leggera. <strong>Ezzi Mannu</strong> è la spiaggia degli sport del vento per eccellenza: arenile lungo, fondale basso, vento pulito senza ostacoli. <strong>Le Saline</strong> è più adatta a principianti, con acqua piatta e correnti deboli. Il punto di riferimento è il <strong>Centro Velico di Stintino</strong> (Windsurfing Center): noleggia tavole, vele, kitesurf, paddle board e offre <strong>lezioni</strong> individuali e collettive, inclusi corsi per bambini dagli 8 anni. Per la vela, dal porto partono uscite giornaliere in catamarano e si noleggiano gommoni con o senza skipper. Da maggio a luglio è la stagione migliore: vento costante, mare formato ma non grosso.",
            en: "The <strong>Mistral</strong> blows from the north-west in <strong>May–September</strong> almost every afternoon with intensity between <strong>12 and 25 knots</strong> — the perfect condition for light-sail sports. <strong>Ezzi Mannu</strong> is the wind-sports beach par excellence: long shore, shallow bottom, clean wind with no obstacles. <strong>Le Saline</strong> is more suitable for beginners, with flat water and weak currents. The local reference is the <strong>Stintino Centro Velico</strong> (Windsurfing Center): it rents boards, sails, kitesurf, paddle boards and offers <strong>individual and group lessons</strong>, including courses for children from 8. For sailing, daily catamaran trips leave from the harbour, and you can hire dinghies with or without a skipper. May to July is the best season: steady wind, formed but not heavy sea.",
            fr: "Le <strong>Mistral</strong> souffle du nord-ouest en <strong>mai–septembre</strong> presque tous les après-midi, avec une intensité comprise entre <strong>12 et 25 nœuds</strong> — condition parfaite pour les sports à voile légère. <strong>Ezzi Mannu</strong> est la plage des sports du vent par excellence : long rivage, fond bas, vent propre sans obstacles. <strong>Le Saline</strong> convient mieux aux débutants, avec eau plate et courants faibles. La référence locale est le <strong>Centro Velico de Stintino</strong> (Windsurfing Center) : location de planches, voiles, kitesurf, paddle board et <strong>cours</strong> individuels et collectifs, y compris pour enfants à partir de 8 ans. Pour la voile, des sorties quotidiennes en catamaran partent du port et l'on peut louer des semi-rigides avec ou sans skipper. Mai à juillet est la meilleure période : vent constant, mer formée mais non grosse.",
            de: "Der <strong>Maestrale</strong> weht von <strong>Mai bis September</strong> fast jeden Nachmittag aus Nordwesten mit einer Stärke zwischen <strong>12 und 25 Knoten</strong> — die perfekte Bedingung für Leichtwindsport. <strong>Ezzi Mannu</strong> ist der Windsportstrand par excellence: lange Strandlinie, flacher Grund, sauberer Wind ohne Hindernisse. <strong>Le Saline</strong> eignet sich eher für Anfänger, mit flachem Wasser und schwachen Strömungen. Die lokale Referenz ist das <strong>Centro Velico Stintino</strong> (Windsurfing Center): Verleih von Brettern, Segeln, Kitesurf-, SUP-Equipment und <strong>Einzel- und Gruppenkurse</strong>, einschließlich Kursen für Kinder ab 8 Jahren. Vom Hafen starten täglich Katamaran-Ausfahrten, Schlauchboote sind mit oder ohne Skipper mietbar. Mai bis Juli ist die beste Saison: beständiger Wind, bewegte aber nicht raue See."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Operatori e prenotazioni', en: 'Operators and booking', fr: 'Opérateurs et réservations', de: 'Anbieter und Buchung' },
          body: {
            it: "<strong>Asinara Scuba Diving</strong> — corso Open Water ~ 380 €, immersione singola con attrezzatura ~ 65 €, escursione snorkeling al parco ~ 45 €. Si prenota online su <strong>asinarascubadiving.com</strong> o per WhatsApp: in alta stagione, conviene scrivere già una settimana prima. <strong>Centro Velico Stintino</strong> — noleggio windsurf da 25 € l'ora, kitesurf da 35 €, lezione individuale da 50 €/h, pacchetti settimanali con sconto. Sito: <strong>windsurfingcenter.it/centro-velico</strong>. Entrambi gli operatori parlano italiano, inglese e francese; tedesco su prenotazione. <strong>Da casa</strong>: portiamo noi maschera, pinne e snorkel di base — disponibili in villa per chi vuole esplorare la Pelosa o Le Saline in autonomia. Per attrezzatura più tecnica (muta, pesi) ci si rivolge ai centri.",
            en: "<strong>Asinara Scuba Diving</strong> — Open Water course ~ €380, single dive with equipment ~ €65, snorkelling tour in the park ~ €45. Booking online at <strong>asinarascubadiving.com</strong> or by WhatsApp; in high season, write a week ahead. <strong>Centro Velico Stintino</strong> — windsurf rental from €25 an hour, kitesurf from €35, individual lesson from €50/hr, weekly packages at a discount. Site: <strong>windsurfingcenter.it/centro-velico</strong>. Both operators speak Italian, English and French; German on request. <strong>From the villa</strong>: we provide basic masks, fins and snorkels for those who want to explore Pelosa or Le Saline on their own. For more technical gear (wetsuit, weights) head to the centres.",
            fr: "<strong>Asinara Scuba Diving</strong> — cours Open Water ~ 380 €, plongée simple avec matériel ~ 65 €, sortie snorkeling dans le parc ~ 45 €. Réservation en ligne sur <strong>asinarascubadiving.com</strong> ou par WhatsApp ; en haute saison, écrire une semaine à l'avance. <strong>Centro Velico Stintino</strong> — location de planche à voile à partir de 25 € l'heure, kitesurf à partir de 35 €, cours individuel à partir de 50 €/h, forfaits hebdomadaires à prix réduit. Site : <strong>windsurfingcenter.it/centro-velico</strong>. Les deux opérateurs parlent italien, anglais et français ; allemand sur demande. <strong>À la villa</strong> : nous fournissons masques, palmes et tubas de base pour ceux qui veulent explorer La Pelosa ou Le Saline en autonomie. Pour du matériel plus technique (combinaison, plombs), rendez-vous dans les centres.",
            de: "<strong>Asinara Scuba Diving</strong> — Open-Water-Kurs ~ 380 €, einzelner Tauchgang mit Ausrüstung ~ 65 €, Schnorchelausflug in den Park ~ 45 €. Buchung online auf <strong>asinarascubadiving.com</strong> oder per WhatsApp; in der Hochsaison eine Woche im Voraus anfragen. <strong>Centro Velico Stintino</strong> — Windsurf-Verleih ab 25 € pro Stunde, Kitesurf ab 35 €, Einzelunterricht ab 50 €/h, vergünstigte Wochenpakete. Site: <strong>windsurfingcenter.it/centro-velico</strong>. Beide Anbieter sprechen Italienisch, Englisch und Französisch; Deutsch auf Anfrage. <strong>Von der Villa</strong>: einfache Masken, Flossen und Schnorchel stellen wir bereit, für alle, die La Pelosa oder Le Saline auf eigene Faust erkunden möchten. Für technischere Ausrüstung (Neoprenanzug, Gewichte) bitte die Center kontaktieren."
          }
        }
      ],
      links: {
        diving: 'https://www.asinarascubadiving.com/',
        windsurf: 'http://www.windsurfingcenter.it/centro-velico',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Porto+di+Stintino'
      }
    },

    {
      slug: 'cucina-sarda',
      parent: 'villa-stintino',
      name: {
        it: 'Cucina sarda — i piatti del nord-ovest',
        en: 'Sardinian cuisine — dishes of the north-west',
        fr: 'Cuisine sarde — les plats du nord-ouest',
        de: 'Sardische Küche — die Gerichte des Nordwestens'
      },
      subtitle: {
        it: 'I sapori del mare e della tradizione tra Stintino, Asinara e Riviera del Corallo',
        en: 'Sea and tradition flavours between Stintino, Asinara and the Coral Riviera',
        fr: 'Les saveurs de la mer et de la tradition entre Stintino, Asinara et la Riviera du Corail',
        de: 'Aromen von Meer und Tradition zwischen Stintino, Asinara und Korallenriviera'
      },
      location: {
        it: 'Stintino · centro storico e dintorni',
        en: 'Stintino · old town and surroundings',
        fr: 'Stintino · centre historique et alentours',
        de: 'Stintino · Altstadt und Umgebung'
      },
      distance: {
        it: 'Ristoranti del borgo: 5–10 min a piedi',
        en: 'Restaurants in the village: 5–10 min on foot',
        fr: 'Restaurants du village : 5–10 min à pied',
        de: 'Restaurants im Dorf: 5–10 Min. zu Fuß'
      },
      hero: 'img/stintino/dintorni/cucina-sarda-stintino.png',
      heroFocus: 'center center',
      intro: {
        it: "La cucina di Stintino racconta una <strong>doppia identità</strong>: da una parte la <strong>tradizione marinara</strong> del borgo, nato nel 1885 dai pescatori dell'Asinara — da cui arrivano la pesca del tonno, le ricette di mare, la cura per il pescato del giorno; dall'altra la <strong>cucina sarda d'entroterra</strong> della provincia di Sassari, fatta di pane carasau, formaggi, agnello e vini di carattere. Mangiare qui significa scegliere un porto: un piatto di <strong>fregula con arselle</strong> affacciato sul Porto Mannu, una <strong>cassola alla stintinese</strong> in una trattoria del centro, una pecorino con miele amaro a fine pasto. Le distanze sono brevi e i prezzi onesti — i ristoranti turistici da evitare si vedono dal menu in cinque lingue tutto uguale; quelli buoni hanno la lavagna del giorno scritta a mano.",
        en: "Stintino's cuisine tells a <strong>double identity</strong>: on one side the <strong>seafaring tradition</strong> of the village, born in 1885 from the Asinara fishermen — bringing tuna fishing, sea recipes, care for the catch of the day; on the other the <strong>inland Sardinian cuisine</strong> of Sassari province, of carasau bread, cheeses, lamb and characterful wines. Eating here means choosing a harbour: a plate of <strong>fregula with clams</strong> overlooking Porto Mannu, a <strong>Stintino-style cassola</strong> in a trattoria in the centre, pecorino with bitter honey to close. Distances are short and prices honest — touristy restaurants to avoid have the same menu in five languages; the good ones have a hand-written daily blackboard.",
        fr: "La cuisine de Stintino raconte une <strong>double identité</strong> : d'un côté la <strong>tradition marine</strong> du village, né en 1885 des pêcheurs de l'Asinara — d'où viennent la pêche au thon, les recettes de la mer, le soin pour la pêche du jour ; de l'autre la <strong>cuisine sarde de l'arrière-pays</strong> de la province de Sassari, faite de pain carasau, fromages, agneau et vins de caractère. Manger ici, c'est choisir un port : une assiette de <strong>fregula aux palourdes</strong> face à Porto Mannu, une <strong>cassola à la stintinoise</strong> dans une trattoria du centre, un pecorino au miel amer pour terminer. Les distances sont courtes et les prix honnêtes — les restaurants touristiques à éviter ont le même menu en cinq langues ; les bons ont l'ardoise du jour écrite à la main.",
        de: "Stintinos Küche erzählt eine <strong>doppelte Identität</strong>: einerseits die <strong>Seefahrertradition</strong> des 1885 von den Asinara-Fischern gegründeten Dorfes — daher kommen Thunfischfang, Meeresrezepte, die Sorgfalt für den Tagesfang; andererseits die <strong>sardische Küche des Hinterlandes</strong> der Provinz Sassari mit Pane Carasau, Käsen, Lamm und charakterstarken Weinen. Hier zu essen bedeutet, einen Hafen zu wählen: ein Teller <strong>Fregula mit Venusmuscheln</strong> am Porto Mannu, eine <strong>Cassola alla stintinese</strong> in einer Trattoria im Zentrum, Pecorino mit bitterem Honig zum Abschluss. Die Wege sind kurz und die Preise fair — touristische Restaurants erkennt man am Menü in fünf Sprachen; die guten haben die Tageskarte handgeschrieben."
      },
      sections: [
        {
          id: 'mare',
          h2: { it: 'I piatti del mare', en: 'The dishes of the sea', fr: 'Les plats de la mer', de: 'Die Gerichte des Meeres' },
          body: {
            it: "La <strong>fregula con arselle</strong> (semolino tostato a granellini cotto come un risotto, con vongole veraci) è il primo che meglio racconta il golfo. La <strong>cassola alla stintinese</strong> è la zuppa di pesce della casa: scorfani, gallinella, polpo, gamberi e un fondo di pomodoro fresco — variabile in base al pescato del giorno. Da provare il <strong>polpo in galera</strong>, cotto a lungo in coccio con olive e capperi, e gli <strong>spaghetti ai ricci di mare</strong> quando è stagione (ottobre–aprile). Tradizione storica del borgo: il <strong>tonno rosso</strong>, pescato per secoli con la <strong>tonnara</strong> di Saline e Capo Falcone — oggi presente nei ristoranti come <strong>carpaccio</strong>, <strong>tartare</strong>, <strong>bottarga</strong> o nel classico <strong>tonno alla stintinese</strong> in agrodolce con cipolle. Pesce sempre del giorno: chiedete cosa è arrivato dal porto la mattina.",
            en: "<strong>Fregula with clams</strong> (toasted semolina pearls cooked risotto-style with carpet-shell clams) is the first course that best tells the gulf. The <strong>Stintino-style cassola</strong> is the house fish soup: scorpion fish, gurnard, octopus, prawns and a fresh tomato base — varying with the day's catch. Try <strong>polpo in galera</strong>, slow-cooked octopus in clay with olives and capers, and <strong>spaghetti with sea urchins</strong> when in season (October–April). A village tradition: <strong>bluefin tuna</strong>, fished for centuries with the <strong>tonnara</strong> of Saline and Capo Falcone — today on menus as <strong>carpaccio</strong>, <strong>tartare</strong>, <strong>bottarga</strong>, or the classic <strong>Stintino-style tuna</strong> sweet-and-sour with onions. The fish is always of the day: ask what came in from the harbour that morning.",
            fr: "La <strong>fregula aux palourdes</strong> (semoule torréfiée en grains, cuite comme un risotto, avec des palourdes veraci) est l'entrée qui raconte le mieux le golfe. La <strong>cassola à la stintinoise</strong> est la soupe de poisson de la maison : rascasses, grondin, poulpe, crevettes et un fond de tomate fraîche — variable selon la pêche du jour. À goûter aussi le <strong>polpo in galera</strong>, poulpe cuit lentement en terre cuite avec olives et câpres, et les <strong>spaghettis aux oursins</strong> en saison (octobre–avril). Tradition historique du village : le <strong>thon rouge</strong>, pêché pendant des siècles avec la <strong>tonnara</strong> de Saline et Capo Falcone — aujourd'hui présent dans les restaurants en <strong>carpaccio</strong>, <strong>tartare</strong>, <strong>boutargue</strong> ou dans le classique <strong>thon à la stintinoise</strong> aigre-doux aux oignons. Poisson toujours du jour : demandez ce qui est arrivé du port le matin.",
            de: "<strong>Fregula mit Venusmuscheln</strong> (geröstete Hartweizenkugeln wie Risotto gegart, mit Teppich-Venusmuscheln) ist die erste Speise, die den Golf am besten erzählt. Die <strong>Cassola alla stintinese</strong> ist die Hausfischsuppe: Drachenkopf, Knurrhahn, Tintenfisch, Garnelen und eine Basis aus frischen Tomaten — je nach Tagesfang. Probieren sollte man auch <strong>Polpo in galera</strong>, lange im Tonkrug mit Oliven und Kapern geschmorten Tintenfisch, und <strong>Spaghetti mit Seeigeln</strong> in der Saison (Oktober–April). Tradition des Ortes: der <strong>Rote Thunfisch</strong>, jahrhundertelang mit der <strong>Tonnara</strong> von Saline und Capo Falcone gefangen — heute auf den Karten als <strong>Carpaccio</strong>, <strong>Tatar</strong>, <strong>Bottarga</strong> oder als klassischer <strong>Stintino-Thunfisch</strong> süß-sauer mit Zwiebeln. Fisch immer vom Tag: fragen Sie, was morgens vom Hafen gekommen ist."
          }
        },
        {
          id: 'terra',
          h2: { it: 'Tradizione di terra e dolci', en: 'Inland tradition and desserts', fr: 'Tradition de terre et desserts', de: 'Landtradition und Süßspeisen' },
          body: {
            it: "Per chi non ama il pesce, la <strong>cucina sarda d'entroterra</strong> è altrettanto presente sulle tavole stintinesi. <strong>Malloreddus alla campidanese</strong> (gnocchetti con sugo di salsiccia e zafferano), <strong>culurgiones</strong> (ravioli di patata, pecorino e menta, originari dell'Ogliastra), <strong>agnello al mirto</strong> e <strong>maialetto arrosto</strong> sono i piatti forti. Pane immancabile: il <strong>carasau</strong> (sottilissimo, croccante) e il <strong>pane guttiau</strong>, oliato e salato. Sui formaggi, due da chiedere assolutamente: <strong>pecorino sardo DOP</strong> stagionato, e <strong>fiore sardo</strong>, affumicato, da abbinare al miele amaro di corbezzolo prodotto nelle campagne di Sennori. Fra i dolci, i <strong>seadas</strong> (raviolone fritto con pecorino fresco e miele), gli <strong>amaretti</strong> sardi, i <strong>papassinos</strong> con uvetta e mandorle. La <strong>tumbarella</strong> locale, dolce di pasta di mandorle, si trova solo a Stintino in agosto.",
            en: "For those who don't love fish, <strong>inland Sardinian cuisine</strong> is just as present on Stintino tables. <strong>Malloreddus alla campidanese</strong> (small gnocchi with sausage and saffron sauce), <strong>culurgiones</strong> (potato, pecorino and mint ravioli from Ogliastra), <strong>lamb with myrtle</strong> and <strong>roast suckling pig</strong> are the headliners. Bread is essential: <strong>carasau</strong> (paper-thin, crisp) and <strong>pane guttiau</strong>, oiled and salted. On cheeses, two must-asks: aged <strong>pecorino sardo DOP</strong>, and smoked <strong>fiore sardo</strong>, paired with bitter strawberry-tree honey from the Sennori countryside. Among desserts, <strong>seadas</strong> (fried pastry with fresh pecorino and honey), Sardinian <strong>amaretti</strong>, <strong>papassinos</strong> with raisins and almonds. The local <strong>tumbarella</strong>, an almond-paste sweet, is only made in Stintino in August.",
            fr: "Pour qui n'aime pas le poisson, la <strong>cuisine sarde de l'arrière-pays</strong> est tout aussi présente sur les tables stintinoises. <strong>Malloreddus alla campidanese</strong> (petits gnocchis à la sauce saucisse et safran), <strong>culurgiones</strong> (raviolis de pomme de terre, pecorino et menthe, originaires de l'Ogliastra), <strong>agneau au myrte</strong> et <strong>cochon de lait rôti</strong> sont les plats vedettes. Pain incontournable : le <strong>carasau</strong> (très fin, croquant) et le <strong>pane guttiau</strong>, huilé et salé. Sur les fromages, deux à demander absolument : <strong>pecorino sardo DOP</strong> affiné, et <strong>fiore sardo</strong> fumé, à associer au miel amer d'arbousier produit dans les campagnes de Sennori. Parmi les desserts, les <strong>seadas</strong> (chausson frit au pecorino frais et miel), les <strong>amaretti</strong> sardes, les <strong>papassinos</strong> aux raisins secs et aux amandes. La <strong>tumbarella</strong> locale, une douceur à base de pâte d'amandes, ne se trouve qu'à Stintino en août.",
            de: "Wer Fisch nicht mag, findet auch die <strong>sardische Küche des Hinterlandes</strong> auf Stintinos Tischen. <strong>Malloreddus alla campidanese</strong> (kleine Gnocchi mit Wurst-Safran-Sauce), <strong>Culurgiones</strong> (Ravioli aus Kartoffel, Pecorino und Minze aus der Ogliastra), <strong>Lamm mit Myrte</strong> und <strong>Spanferkel im Ofen</strong> sind die Klassiker. Brot ist unverzichtbar: <strong>Carasau</strong> (papierdünn, knusprig) und <strong>Pane guttiau</strong>, geölt und gesalzen. Bei den Käsen zwei Pflichtkandidaten: gereifter <strong>Pecorino sardo DOP</strong> und geräucherter <strong>Fiore Sardo</strong>, am besten mit bitterem Erdbeerbaumhonig aus dem Hinterland von Sennori. Unter den Süßspeisen die <strong>Seadas</strong> (frittierte Teigtasche mit frischem Pecorino und Honig), die sardischen <strong>Amaretti</strong>, die <strong>Papassinos</strong> mit Rosinen und Mandeln. Die lokale <strong>Tumbarella</strong> aus Mandelpaste gibt es nur in Stintino im August."
          }
        },
        {
          id: 'vini',
          h2: { it: 'Vini e dove mangiare', en: 'Wines and where to eat', fr: 'Vins et où manger', de: 'Weine und wo essen' },
          body: {
            it: "I <strong>vini</strong> della zona sono fra i più premiati di Sardegna. Per il pesce: <strong>Vermentino di Sardegna DOC</strong> (fresco, sapido, perfetto con la fregula) e il <strong>Torbato di Alghero</strong> della cantina Sella & Mosca — vitigno autoctono recuperato, in Italia coltivato quasi solo qui. Per la carne: <strong>Cannonau di Sardegna DOC</strong> (tannico, mediterraneo) e il <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, fra i grandi rossi italiani). <strong>Dove mangiare a Stintino</strong>: Trattoria La Rete (cucina di casa, fregula da provare), Ristorante Silvestrino (pesce, vista mare), Il Porticciolo (pesce sul porto). Bar del Porto per colazione e granita. <strong>Prezzi medi</strong>: pranzo veloce 15–25 €, cena con vino 35–55 € a persona. <strong>In agosto prenotate sempre con due-tre giorni di anticipo</strong>, soprattutto i ristoranti del lungomare. Il <strong>mercato del giovedì mattina</strong> è ottimo per pane, formaggi e prodotti locali da portare in villa.",
            en: "Local <strong>wines</strong> are among Sardinia's most awarded. With fish: <strong>Vermentino di Sardegna DOC</strong> (crisp, savoury, perfect with fregula) and <strong>Torbato di Alghero</strong> from Sella & Mosca — a recovered native grape, grown in Italy almost only here. With meat: <strong>Cannonau di Sardegna DOC</strong> (tannic, Mediterranean) and <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, among Italy's great reds). <strong>Where to eat in Stintino</strong>: Trattoria La Rete (home cooking, the fregula is a must), Ristorante Silvestrino (fish, sea view), Il Porticciolo (fish on the harbour). Bar del Porto for breakfast and granita. <strong>Average prices</strong>: quick lunch €15–25, dinner with wine €35–55 per person. <strong>In August always book two or three days ahead</strong>, especially the seafront restaurants. The <strong>Thursday morning market</strong> is excellent for bread, cheeses and local produce to bring back to the villa.",
            fr: "Les <strong>vins</strong> locaux sont parmi les plus primés de Sardaigne. Avec le poisson : <strong>Vermentino di Sardegna DOC</strong> (frais, sapide, parfait avec la fregula) et <strong>Torbato di Alghero</strong> de la cave Sella & Mosca — cépage autochtone réhabilité, cultivé en Italie presque exclusivement ici. Avec la viande : <strong>Cannonau di Sardegna DOC</strong> (tannique, méditerranéen) et <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, parmi les grands rouges italiens). <strong>Où manger à Stintino</strong> : Trattoria La Rete (cuisine maison, fregula à goûter), Ristorante Silvestrino (poisson, vue mer), Il Porticciolo (poisson sur le port). Bar del Porto pour petit-déjeuner et granita. <strong>Prix moyens</strong> : déjeuner rapide 15–25 €, dîner avec vin 35–55 € par personne. <strong>En août, réservez toujours deux ou trois jours à l'avance</strong>, surtout les restaurants du front de mer. Le <strong>marché du jeudi matin</strong> est excellent pour le pain, les fromages et les produits locaux à rapporter à la villa.",
            de: "Die lokalen <strong>Weine</strong> zählen zu den meistprämierten Sardiniens. Zum Fisch: <strong>Vermentino di Sardegna DOC</strong> (frisch, salzig, perfekt zur Fregula) und <strong>Torbato di Alghero</strong> vom Weingut Sella & Mosca — eine wiederentdeckte autochthone Rebsorte, in Italien fast ausschließlich hier angebaut. Zum Fleisch: <strong>Cannonau di Sardegna DOC</strong> (tanninbetont, mediterran) und <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, einer der großen italienischen Rotweine). <strong>Wo essen in Stintino</strong>: Trattoria La Rete (Hausmannskost, Fregula sehr empfehlenswert), Ristorante Silvestrino (Fisch, Meerblick), Il Porticciolo (Fisch am Hafen). Bar del Porto für Frühstück und Granita. <strong>Durchschnittspreise</strong>: schnelles Mittagessen 15–25 €, Abendessen mit Wein 35–55 € pro Person. <strong>Im August immer zwei bis drei Tage im Voraus reservieren</strong>, vor allem an der Promenade. Der <strong>Markt am Donnerstagvormittag</strong> ist hervorragend für Brot, Käse und lokale Produkte, die man in die Villa mitnehmen kann."
          }
        }
      ],
      links: {
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Ristoranti+Stintino'
      }
    },

    // ========== ALGHERO — LUOGHI DEL CAROSELLO ==========

    {
      slug: 'spiaggia-del-lido',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia del Lido', en: 'Lido beach', fr: 'Plage du Lido', de: 'Lido-Strand' },
      subtitle: {
        it: 'La spiaggia urbana di Alghero, a dieci minuti a piedi dall\'appartamento',
        en: 'Alghero\'s urban beach, ten minutes on foot from the apartment',
        fr: 'La plage urbaine d\'Alghero, à dix minutes à pied de l\'appartement',
        de: 'Algheros Stadtstrand, zehn Minuten zu Fuß von der Wohnung'
      },
      location: { it: 'Alghero · Riviera del Corallo', en: 'Alghero · Coral Riviera', fr: 'Alghero · Riviera du Corail', de: 'Alghero · Korallenriviera' },
      distance: { it: '10 min a piedi dall\'appartamento', en: '10 min on foot from the apartment', fr: '10 min à pied de l\'appartement', de: '10 Min. zu Fuß von der Wohnung' },
      hero: 'img/alghero/dintorni/lido-alghero.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Il <strong>Lido di San Giovanni</strong> è la spiaggia di Alghero città, un lungo arenile sabbioso che si estende per oltre due chilometri fra il porto storico e la pineta di Maria Pia. A meno di dieci minuti a piedi dall'appartamento, è la scelta naturale per chi vuole unire vacanza al mare e vita urbana: bastano cinque minuti per passare dal letto al primo tuffo, un altro quarto d'ora per essere ai Bastioni con un aperitivo in mano.",
        en: "The <strong>Lido di San Giovanni</strong> is Alghero city's beach, a long sandy stretch running over two kilometres between the old harbour and the Maria Pia pine forest. Less than ten minutes on foot from the apartment, it's the natural choice for those who want to combine a seaside holiday with city life: five minutes from bed to first swim, another fifteen to the Bastioni with an aperitivo in hand.",
        fr: "Le <strong>Lido di San Giovanni</strong> est la plage d'Alghero ville, un long rivage sableux qui s'étend sur plus de deux kilomètres entre le port historique et la pinède de Maria Pia. À moins de dix minutes à pied de l'appartement, c'est le choix naturel pour qui veut conjuguer vacances à la mer et vie urbaine : cinq minutes du lit au premier bain, un quart d'heure de plus pour rejoindre les Bastions, apéritif en main.",
        de: "Der <strong>Lido di San Giovanni</strong> ist der Strand der Stadt Alghero, ein langer Sandstrand, der sich über mehr als zwei Kilometer zwischen dem historischen Hafen und dem Pinienwald von Maria Pia erstreckt. Weniger als zehn Minuten zu Fuß von der Wohnung, ist er die natürliche Wahl, um Strandurlaub und Stadtleben zu verbinden: Fünf Minuten vom Bett zum ersten Bad, weitere fünfzehn zu den Bastioni mit einem Aperitif in der Hand."
      },
      sections: [
        {
          id: 'lungomare',
          h2: { it: 'Il Lido e la sua passeggiata', en: 'The Lido and its promenade', fr: 'Le Lido et sa promenade', de: 'Der Lido und seine Promenade' },
          body: {
            it: "Il <strong>lungomare Dante Valsecchi</strong> costeggia la spiaggia con un percorso alberato di palme, ideale per passeggiate e per correre al tramonto. La sabbia è chiara e fine, l'acqua bassa per diversi metri — ottima per i bambini — con un fondale sabbioso che mantiene limpidezza anche nelle giornate un po' ventose. Chioschi, bar, noleggio ombrelloni e sdraio lungo tutto l'arenile, docce pubbliche gratuite, e un'area cani nella parte nord.",
            en: "The <strong>Dante Valsecchi promenade</strong> runs along the beach with a palm-lined path, perfect for strolling and for running at sunset. The sand is pale and fine, the water shallow for several metres — excellent for children — with a sandy bottom that keeps its clarity even on slightly windy days. Kiosks, bars, parasol and sunbed rentals along the whole shore, free public showers, and a dog-friendly area to the north.",
            fr: "Le <strong>front de mer Dante Valsecchi</strong> longe la plage avec une allée bordée de palmiers, idéale pour se promener et courir au coucher du soleil. Le sable est clair et fin, l'eau peu profonde sur plusieurs mètres — parfaite pour les enfants — avec un fond sableux qui garde sa limpidité même les jours un peu venteux. Kiosques, bars, location de parasols et transats sur tout le rivage, douches publiques gratuites, et une zone pour chiens dans la partie nord.",
            de: "Die <strong>Uferpromenade Dante Valsecchi</strong> verläuft entlang des Strandes mit einer palmengesäumten Allee, ideal für Spaziergänge und zum Joggen bei Sonnenuntergang. Der Sand ist hell und fein, das Wasser mehrere Meter weit flach — hervorragend für Kinder — mit einem sandigen Grund, der auch an leicht windigen Tagen klar bleibt. Kioske, Bars, Schirm- und Liegenverleih entlang des gesamten Ufers, kostenlose öffentliche Duschen und ein hundefreundlicher Bereich im Norden."
          }
        },
        {
          id: 'per-chi',
          h2: { it: 'Per chi è la spiaggia del Lido', en: 'Who the Lido beach is for', fr: 'À qui s\'adresse la plage du Lido', de: 'Für wen der Lido-Strand ist' },
          body: {
            it: "È la spiaggia di chi vuole il mare senza rinunciare alla città: <strong>famiglie con bambini piccoli</strong>, sportivi che corrono al mattino presto, chiunque non abbia voglia di prendere l'auto. Servizi completi — bar, pizzerie, rosticcerie — tutt'intorno. D'estate è frequentata, ma la sua estensione permette di trovare sempre un tratto più tranquillo verso nord. Al tramonto l'orizzonte si tinge d'oro, con Capo Caccia che si profila sullo sfondo: uno degli spettacoli serali più belli di Alghero.",
            en: "It's the beach for those who want the sea without giving up the city: <strong>families with young children</strong>, athletes running early in the morning, anyone who doesn't want to get in the car. Full services — bars, pizzerias, rotisseries — all around. In summer it's busy, but its length always lets you find a quieter stretch to the north. At sunset the horizon turns gold, with Capo Caccia silhouetted in the distance: one of Alghero's most beautiful evening shows.",
            fr: "C'est la plage de qui veut la mer sans renoncer à la ville : <strong>familles avec jeunes enfants</strong>, sportifs qui courent tôt le matin, tous ceux qui ne veulent pas prendre la voiture. Services complets — bars, pizzerias, rôtisseries — tout autour. L'été est fréquenté, mais sa longueur permet toujours de trouver une portion plus tranquille vers le nord. Au coucher du soleil l'horizon se teinte d'or, avec Capo Caccia qui se profile au fond : l'un des plus beaux spectacles du soir à Alghero.",
            de: "Der Strand für alle, die das Meer wollen, ohne auf die Stadt zu verzichten: <strong>Familien mit kleinen Kindern</strong>, Sportler, die früh morgens laufen, alle, die nicht ins Auto steigen wollen. Vollständige Dienstleistungen — Bars, Pizzerien, Rotisserien — rundherum. Im Sommer ist es belebt, aber die Länge lässt immer einen ruhigeren Abschnitt im Norden finden. Bei Sonnenuntergang färbt sich der Horizont golden, mit Capo Caccia im Hintergrund: eines der schönsten Abendschauspiele Algheros."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/lido-di-san-giovanni',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Lido+Alghero'
      }
    },

    {
      slug: 'spiaggia-bombarde',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia delle Bombarde', en: 'Le Bombarde beach', fr: 'Plage des Bombarde', de: 'Strand Le Bombarde' },
      subtitle: {
        it: 'Sabbia dorata e acqua smeraldo, la più famosa a ovest di Alghero',
        en: 'Golden sand and emerald water, the most famous beach west of Alghero',
        fr: 'Sable doré et eau émeraude, la plus célèbre à l\'ouest d\'Alghero',
        de: 'Goldener Sand und smaragdgrünes Wasser, der berühmteste Strand westlich von Alghero'
      },
      location: { it: 'Fertilia · Riviera del Corallo', en: 'Fertilia · Coral Riviera', fr: 'Fertilia · Riviera du Corail', de: 'Fertilia · Korallenriviera' },
      distance: { it: '10 km — 15 min in auto', en: '10 km — 15 min by car', fr: '10 km — 15 min en voiture', de: '10 km — 15 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-bombarde.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Spiaggia delle Bombarde</strong>, così chiamata per il rumore del maestrale quando si infrange sugli scogli che la delimitano, è la spiaggia più celebre della costa a ovest di Alghero. Sabbia dorata a grana media, acqua dalle gradazioni che vanno dal verde smeraldo al turchese, pineta retrostante che offre ombra naturale: una combinazione che la rende una delle mete più fotografate della Riviera del Corallo. Si raggiunge in quindici minuti d'auto dall'appartamento.",
        en: "<strong>Le Bombarde beach</strong>, named after the sound of the Mistral wind breaking on the rocks that frame it, is the most famous beach on the coast west of Alghero. Medium-grained golden sand, water shading from emerald green to turquoise, a pine forest behind offering natural shade: a combination that makes it one of the most photographed destinations on the Coral Riviera. Fifteen minutes by car from the apartment.",
        fr: "La <strong>plage des Bombarde</strong>, ainsi nommée pour le bruit du Mistral qui se brise sur les rochers qui l'encadrent, est la plage la plus célèbre de la côte à l'ouest d'Alghero. Sable doré à grain moyen, eau aux nuances vert émeraude et turquoise, pinède à l'arrière offrant une ombre naturelle : une combinaison qui en fait l'une des destinations les plus photographiées de la Riviera du Corail. Quinze minutes en voiture de l'appartement.",
        de: "Der <strong>Strand Le Bombarde</strong>, benannt nach dem Geräusch des Maestrale, der sich an den einrahmenden Felsen bricht, ist der bekannteste Strand der Küste westlich von Alghero. Mittelkörniger goldener Sand, Wasser in Nuancen von Smaragdgrün bis Türkis, ein dahinterliegender Pinienwald, der natürlichen Schatten spendet: Eine Kombination, die ihn zu einem der meistfotografierten Ziele der Korallenriviera macht. Fünfzehn Autominuten von der Wohnung."
      },
      sections: [
        {
          id: 'baia',
          h2: { it: 'La baia e la pineta', en: 'The bay and the pine forest', fr: 'La baie et la pinède', de: 'Die Bucht und der Pinienwald' },
          body: {
            it: "La spiaggia è una mezzaluna di <strong>circa 700 metri</strong> protetta da scogliere basse alle estremità. Il fondale digrada dolcemente per i primi dieci metri — ideale per bambini — poi diventa più profondo e permette buon snorkeling lungo gli scogli laterali. La <strong>pineta di Le Bombarde</strong>, dietro l'arenile, è un oasi di ombra con tavoli da pic-nic liberi: una risorsa preziosa nelle ore più calde di luglio e agosto.",
            en: "The beach is a crescent of <strong>about 700 metres</strong> sheltered by low cliffs at each end. The bottom slopes gently for the first ten metres — ideal for children — then deepens, allowing good snorkelling along the side rocks. The <strong>Le Bombarde pine forest</strong> behind the beach is a shady oasis with free picnic tables: a precious resource in the hottest hours of July and August.",
            fr: "La plage est un croissant d'<strong>environ 700 mètres</strong> protégé par de basses falaises aux extrémités. Le fond descend doucement sur les dix premiers mètres — idéal pour les enfants — puis s'approfondit, permettant un bon snorkeling le long des rochers latéraux. La <strong>pinède des Bombarde</strong>, derrière la plage, est une oasis d'ombre avec tables de pique-nique libres : une ressource précieuse aux heures les plus chaudes de juillet et août.",
            de: "Der Strand ist eine Sichel von <strong>rund 700 Metern</strong>, an den Enden durch niedrige Felsen geschützt. Der Grund fällt die ersten zehn Meter sanft ab — ideal für Kinder — und wird dann tiefer, was gutes Schnorcheln an den seitlichen Felsen ermöglicht. Der <strong>Pinienwald von Le Bombarde</strong> hinter dem Strand ist eine schattige Oase mit frei zugänglichen Picknicktischen: eine wertvolle Ressource in den heißesten Stunden von Juli und August."
          }
        },
        {
          id: 'accesso',
          h2: { it: 'Accesso e consigli', en: 'Access and tips', fr: 'Accès et conseils', de: 'Zugang und Tipps' },
          body: {
            it: "Parcheggio a pagamento su sterrato (3–5 € al giorno), spesso pieno entro le 10:00 di mattina nei mesi di punta: arrivare presto o andare nel tardo pomeriggio. Sulla spiaggia, noleggio ombrelloni e sdraio (15–25 € al giorno), due chioschi-bar con panini e bibite. Il fondo cambia: nella parte destra della baia sabbia con poche alghe, a sinistra qualche scoglio dove pescare con maschera. Il maestrale nei pomeriggi d'agosto può far alzare l'onda: chi cerca mare piatto meglio il mattino.",
            en: "Paid parking on gravel (€3–5 per day), often full by 10:00 in peak months: come early or head there in the late afternoon. On the beach, parasol and sunbed rental (€15–25 per day), two bar-kiosks with sandwiches and drinks. The bottom changes: on the right of the bay sand with little seaweed, on the left some rocks where you can snorkel. The Mistral on August afternoons can raise the waves: if you want flat sea, go in the morning.",
            fr: "Stationnement payant sur terrain stabilisé (3–5 € par jour), souvent plein avant 10h00 en haute saison : venir tôt ou y aller en fin d'après-midi. Sur la plage, location de parasols et transats (15–25 € par jour), deux kiosques-bars avec sandwichs et boissons. Le fond change : à droite de la baie sable avec peu d'algues, à gauche quelques rochers où faire du snorkeling. Le Mistral les après-midi d'août peut lever la houle : qui cherche la mer plate viendra plutôt le matin.",
            de: "Kostenpflichtiges Parken auf Schotter (3–5 € pro Tag), in den Hauptmonaten oft bis 10:00 Uhr voll: früh kommen oder am späten Nachmittag. Am Strand Schirm- und Liegenverleih (15–25 € pro Tag), zwei Kiosk-Bars mit Sandwiches und Getränken. Der Grund wechselt: rechts in der Bucht Sand mit wenig Seegras, links einige Felsen zum Schnorcheln. Der Maestrale an Augustnachmittagen kann Wellen bringen: wer ruhige See sucht, kommt lieber am Morgen."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/le-bombarde',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+delle+Bombarde+Alghero'
      }
    },

    {
      slug: 'spiaggia-lazzaretto',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia del Lazzaretto', en: 'Lazzaretto beach', fr: 'Plage du Lazzaretto', de: 'Strand Lazzaretto' },
      subtitle: {
        it: 'Una mezzaluna di sabbia bianca nella Riviera del Corallo',
        en: 'A crescent of white sand on the Coral Riviera',
        fr: 'Un croissant de sable blanc sur la Riviera du Corail',
        de: 'Eine Sichel aus weißem Sand an der Korallenriviera'
      },
      location: { it: 'Fertilia · Riviera del Corallo', en: 'Fertilia · Coral Riviera', fr: 'Fertilia · Riviera du Corail', de: 'Fertilia · Korallenriviera' },
      distance: { it: '11 km — 15 min in auto', en: '11 km — 15 min by car', fr: '11 km — 15 min en voiture', de: '11 km — 15 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-lazzaretto.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Spiaggia del Lazzaretto</strong> prende il nome dall'antico edificio di quarantena che sorgeva nell'area, usato fra Sette e Ottocento per isolare gli equipaggi in arrivo dal mare. Oggi è una piccola baia a forma di mezzaluna con sabbia bianca finissima e acqua trasparente, considerata una delle più belle del litorale tra Alghero e Fertilia. Molti la preferiscono alle Bombarde per le dimensioni più raccolte e l'atmosfera più quieta.",
        en: "<strong>Lazzaretto beach</strong> takes its name from the ancient quarantine building that once stood in the area, used between the 18th and 19th centuries to isolate crews arriving from the sea. Today it's a small crescent-shaped bay with fine white sand and transparent water, considered one of the most beautiful on the coast between Alghero and Fertilia. Many prefer it to Le Bombarde for its more intimate size and quieter atmosphere.",
        fr: "La <strong>plage du Lazzaretto</strong> tire son nom de l'ancien bâtiment de quarantaine qui se dressait dans la zone, utilisé entre les XVIIIᵉ et XIXᵉ siècles pour isoler les équipages arrivant par la mer. C'est aujourd'hui une petite baie en forme de croissant avec du sable blanc très fin et une eau transparente, considérée comme l'une des plus belles du littoral entre Alghero et Fertilia. Beaucoup la préfèrent aux Bombarde pour ses dimensions plus intimes et son atmosphère plus calme.",
        de: "Der <strong>Strand Lazzaretto</strong> hat seinen Namen vom alten Quarantänegebäude, das einst in diesem Gebiet stand und zwischen dem 18. und 19. Jahrhundert dazu diente, die vom Meer ankommenden Besatzungen zu isolieren. Heute ist es eine kleine sichelförmige Bucht mit feinstem weißem Sand und durchsichtigem Wasser, die zu den schönsten der Küste zwischen Alghero und Fertilia zählt. Viele ziehen ihn Le Bombarde vor, wegen seiner kleineren Dimension und ruhigeren Atmosphäre."
      },
      sections: [
        {
          id: 'baia',
          h2: { it: 'La baia e il suo paesaggio', en: 'The bay and its landscape', fr: 'La baie et son paysage', de: 'Die Bucht und ihre Landschaft' },
          body: {
            it: "La spiaggia misura circa <strong>400 metri</strong>, incastonata fra due promontori rocciosi di calcare bianco. L'acqua è bassa e trasparente per i primi metri, con un fondale sabbioso che poi diventa roccioso verso gli estremi — ottimo per snorkeling lungo le pareti laterali dove si avvistano spesso saraghi, salpe e polpi. Alle spalle, macchia mediterranea bassa e un piccolo chiosco-bar; niente pineta come alle Bombarde, ma la compattezza della baia crea un senso di intimità diverso.",
            en: "The beach is about <strong>400 metres</strong> long, set between two rocky white-limestone promontories. The water is shallow and transparent for the first few metres, with a sandy bottom that becomes rocky towards the ends — excellent for snorkelling along the side walls, where you often spot sea breams, salemas and octopuses. Behind, low Mediterranean scrub and a small bar-kiosk; no pine forest like at Le Bombarde, but the compactness of the bay creates a different kind of intimacy.",
            fr: "La plage mesure environ <strong>400 mètres</strong>, nichée entre deux promontoires rocheux en calcaire blanc. L'eau est peu profonde et transparente sur les premiers mètres, avec un fond sableux qui devient rocheux vers les extrémités — excellent pour le snorkeling le long des parois latérales, où l'on aperçoit souvent sargues, saupes et poulpes. Derrière, maquis méditerranéen bas et un petit kiosque-bar ; pas de pinède comme aux Bombarde, mais la compacité de la baie crée une intimité différente.",
            de: "Der Strand ist rund <strong>400 Meter</strong> lang, zwischen zwei felsigen Kalksteinvorsprüngen eingebettet. Das Wasser ist in den ersten Metern flach und durchsichtig, mit einem sandigen Grund, der zu den Enden hin felsig wird — hervorragend zum Schnorcheln entlang der Seitenwände, wo man oft Meerbrassen, Salpen und Tintenfische sieht. Dahinter niedrige Mittelmeermacchia und ein kleiner Kiosk; kein Pinienwald wie bei Le Bombarde, aber die Kompaktheit der Bucht schafft eine andere Intimität."
          }
        },
        {
          id: 'consigli',
          h2: { it: 'Quando andare e consigli', en: 'When to go and tips', fr: 'Quand y aller et conseils', de: 'Wann hingehen und Tipps' },
          body: {
            it: "Parcheggio a pagamento a pochi metri dalla spiaggia (3–5 € al giorno), spesso completo in agosto già dalle 9:30: meglio arrivare entro le 9:00 o dopo le 17:00. Servizi essenziali: un bar con panini e bibite, noleggio ombrelloni limitato. Portate maschera e boccaglio — la parete rocciosa sinistra è una piccola riserva di vita. In condizioni di maestrale forte la spiaggia è più riparata rispetto alle Bombarde, ma l'acqua si intorbidisce velocemente: in quei giorni meglio optare per La Stalla.",
            en: "Paid parking a few metres from the beach (€3–5 per day), often full in August from 9:30 onwards: better to arrive by 9:00 or after 17:00. Basic services: a bar with sandwiches and drinks, limited parasol rental. Bring mask and snorkel — the left rocky wall is a small reserve of life. In strong Mistral conditions the beach is more sheltered than Le Bombarde, but the water quickly becomes cloudy: on those days better opt for La Stalla.",
            fr: "Stationnement payant à quelques mètres de la plage (3–5 € par jour), souvent plein en août dès 9h30 : mieux vaut arriver avant 9h00 ou après 17h00. Services essentiels : un bar avec sandwichs et boissons, location de parasols limitée. Emportez masque et tuba — la paroi rocheuse de gauche est une petite réserve de vie. Par fort Mistral, la plage est plus abritée que Le Bombarde, mais l'eau se trouble rapidement : ces jours-là, privilégiez La Stalla.",
            de: "Kostenpflichtiges Parken wenige Meter vom Strand (3–5 € pro Tag), im August oft ab 9:30 Uhr voll: besser bis 9:00 Uhr kommen oder nach 17:00 Uhr. Grundlegende Dienste: eine Bar mit Sandwiches und Getränken, begrenzter Schirmverleih. Maske und Schnorchel mitbringen — die linke Felswand ist ein kleines Refugium für Meeresleben. Bei starkem Maestrale ist der Strand geschützter als Le Bombarde, aber das Wasser trübt sich rasch: an solchen Tagen besser La Stalla wählen."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/lazzaretto-alghero',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+del+Lazzaretto+Alghero'
      }
    },

    {
      slug: 'spiaggia-la-stalla',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia La Stalla', en: 'La Stalla beach', fr: 'Plage de La Stalla', de: 'Strand La Stalla' },
      subtitle: {
        it: 'Caletta nascosta fra Lazzaretto e Bombarde, riparata dal vento',
        en: 'Hidden cove between Lazzaretto and Bombarde, sheltered from the wind',
        fr: 'Crique cachée entre Lazzaretto et Bombarde, abritée du vent',
        de: 'Versteckte Bucht zwischen Lazzaretto und Bombarde, windgeschützt'
      },
      location: { it: 'Fertilia · Riviera del Corallo', en: 'Fertilia · Coral Riviera', fr: 'Fertilia · Riviera du Corail', de: 'Fertilia · Korallenriviera' },
      distance: { it: '12 km — 15 min in auto', en: '12 km — 15 min by car', fr: '12 km — 15 min en voiture', de: '12 km — 15 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-la-stalla.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Spiaggia La Stalla</strong> è una piccola caletta che si apre fra Lazzaretto e Bombarde, nascosta dalla vegetazione e spesso sconosciuta ai turisti di passaggio. Proprio per questa sua riservatezza è diventata la preferita di molti algheresi: cinquanta metri di sabbia bianca finissima, acqua cristallina, scogli bassi che chiudono la baia ai lati creando una sorta di piscina naturale. La conformazione la rende <strong>riparata dal maestrale</strong>, un'alternativa preziosa quando il vento soffia forte sulle spiagge esposte.",
        en: "<strong>La Stalla beach</strong> is a small cove that opens between Lazzaretto and Le Bombarde, hidden by the vegetation and often unknown to passing tourists. Precisely because of this discretion, it has become the favourite of many locals: fifty metres of fine white sand, crystal-clear water, low rocks that close the bay at the sides creating a sort of natural swimming pool. Its shape makes it <strong>sheltered from the Mistral</strong>, a precious alternative when the wind blows hard on the exposed beaches.",
        fr: "La <strong>plage de La Stalla</strong> est une petite crique qui s'ouvre entre le Lazzaretto et les Bombarde, cachée par la végétation et souvent méconnue des touristes de passage. Précisément pour cette discrétion, elle est devenue la préférée de nombreux habitants : cinquante mètres de sable blanc très fin, eau cristalline, rochers bas qui ferment la baie latéralement créant une sorte de piscine naturelle. Sa conformation la rend <strong>abritée du Mistral</strong>, une alternative précieuse quand le vent souffle fort sur les plages exposées.",
        de: "Der <strong>Strand La Stalla</strong> ist eine kleine Bucht, die sich zwischen Lazzaretto und Le Bombarde öffnet, von der Vegetation verborgen und durchreisenden Touristen oft unbekannt. Gerade wegen dieser Zurückhaltung ist er der Lieblingsplatz vieler Einheimischer geworden: fünfzig Meter feinster weißer Sand, glasklares Wasser, niedrige Felsen, die die Bucht an den Seiten schließen und eine Art natürliches Schwimmbad bilden. Seine Form macht ihn <strong>vor dem Maestrale geschützt</strong>, eine wertvolle Alternative, wenn der Wind an den ungeschützten Stränden stark weht."
      },
      sections: [
        {
          id: 'caletta',
          h2: { it: 'Una caletta per chi cerca tranquillità', en: 'A cove for those seeking quiet', fr: 'Une crique pour qui cherche la tranquillité', de: 'Eine Bucht für alle, die Ruhe suchen' },
          body: {
            it: "La spiaggia è minuscola — nei weekend d'agosto si riempie rapidamente, ma la rotazione dei bagnanti è veloce perché non c'è spazio per restare tutto il giorno. L'acqua è <strong>bassissima per i primi dieci metri</strong>, ideale per bambini piccoli. Gli scogli laterali offrono ottimo snorkeling: fondale roccioso popolato da saraghi, donzelle, piccoli polpi. Non ci sono servizi sulla spiaggia stessa: per un caffè o un panino, si torna alle Bombarde a pochi minuti di cammino lungo il sentiero costiero.",
            en: "The beach is tiny — on August weekends it fills up quickly, but bather turnover is fast since there's no space to stay all day. The water is <strong>very shallow for the first ten metres</strong>, ideal for small children. The side rocks offer excellent snorkelling: a rocky bottom populated by sea breams, wrasse, small octopuses. There are no services on the beach itself: for coffee or a sandwich, return to Le Bombarde a few minutes' walk along the coastal path.",
            fr: "La plage est minuscule — les week-ends d'août elle se remplit vite, mais la rotation des baigneurs est rapide faute d'espace pour rester toute la journée. L'eau est <strong>très peu profonde sur les dix premiers mètres</strong>, idéale pour les petits enfants. Les rochers latéraux offrent un excellent snorkeling : fond rocheux peuplé de sargues, girelles, petits poulpes. Aucun service sur la plage : pour un café ou un sandwich, revenir aux Bombarde à quelques minutes à pied par le sentier côtier.",
            de: "Der Strand ist winzig — an Augustwochenenden füllt er sich rasch, aber der Wechsel der Badegäste ist schnell, weil kein Platz für den ganzen Tag ist. Das Wasser ist in den ersten zehn Metern <strong>sehr flach</strong>, ideal für kleine Kinder. Die seitlichen Felsen bieten hervorragendes Schnorcheln: felsiger Grund mit Meerbrassen, Lippfischen, kleinen Tintenfischen. Am Strand selbst gibt es keine Dienste: für einen Kaffee oder ein Sandwich geht man zurück zu Le Bombarde, wenige Minuten zu Fuß über den Küstenpfad."
          }
        },
        {
          id: 'arrivarci',
          h2: { it: 'Come arrivarci', en: 'How to get there', fr: 'Comment y arriver', de: 'Anfahrt' },
          body: {
            it: "Non c'è parcheggio dedicato: si lascia l'auto nel parcheggio delle Bombarde o del Lazzaretto e si raggiunge la caletta a piedi seguendo il <strong>sentiero costiero</strong> segnalato (5–10 minuti in entrambi i casi). Scarpe da ginnastica o sandali chiusi: il sentiero passa fra rocce basse. Portate acqua, ombrellone e tutto il necessario — sulla spiaggia non si trova nulla. La Stalla è la scelta giusta per chi preferisce camminare un po' in cambio di una spiaggia davvero tranquilla.",
            en: "There's no dedicated parking: leave the car at Le Bombarde or Lazzaretto and reach the cove on foot along the signposted <strong>coastal path</strong> (5–10 minutes either way). Trainers or closed sandals: the path runs over low rocks. Bring water, parasol and everything you need — on the beach there's nothing. La Stalla is the right choice for those who prefer to walk a little in exchange for a really quiet beach.",
            fr: "Pas de parking dédié : on laisse la voiture au parking des Bombarde ou du Lazzaretto et on rejoint la crique à pied par le <strong>sentier côtier</strong> signalé (5–10 minutes dans les deux cas). Baskets ou sandales fermées : le sentier passe sur des rochers bas. Emportez eau, parasol et tout le nécessaire — sur la plage on ne trouve rien. La Stalla est le bon choix pour qui préfère marcher un peu en échange d'une plage vraiment tranquille.",
            de: "Es gibt keinen eigenen Parkplatz: Das Auto auf dem Parkplatz von Le Bombarde oder Lazzaretto abstellen und die Bucht zu Fuß über den ausgeschilderten <strong>Küstenpfad</strong> erreichen (5–10 Minuten in beide Richtungen). Turnschuhe oder geschlossene Sandalen: der Pfad führt über niedrige Felsen. Wasser, Sonnenschirm und alles Nötige mitbringen — am Strand gibt es nichts. La Stalla ist die richtige Wahl für alle, die gern ein wenig laufen, dafür aber einen wirklich ruhigen Strand genießen."
          }
        }
      ],
      links: {
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+La+Stalla+Alghero'
      }
    },

    {
      slug: 'spiaggia-maria-pia',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia Maria Pia', en: 'Maria Pia beach', fr: 'Plage Maria Pia', de: 'Strand Maria Pia' },
      subtitle: {
        it: 'Sabbia, dune e pineta, la spiaggia più vicina al centro di Alghero',
        en: 'Sand, dunes and pine forest, the beach closest to Alghero centre',
        fr: 'Sable, dunes et pinède, la plage la plus proche du centre d\'Alghero',
        de: 'Sand, Dünen und Pinienwald, der nächstgelegene Strand zum Zentrum Algheros'
      },
      location: { it: 'Alghero · Riviera del Corallo', en: 'Alghero · Coral Riviera', fr: 'Alghero · Riviera du Corail', de: 'Alghero · Korallenriviera' },
      distance: { it: '3 km — 10 min in auto', en: '3 km — 10 min by car', fr: '3 km — 10 min en voiture', de: '3 km — 10 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-maria-pia.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Spiaggia di Maria Pia</strong> si estende per oltre un chilometro a ovest di Alghero, subito dopo il Lido, e rappresenta il passaggio naturale fra la città e il paesaggio della Riviera del Corallo. Si distingue per la <strong>pineta secolare</strong> di ginepri e pini d'Aleppo che arriva praticamente fino al bagnasciuga, offrendo zone d'ombra naturale che scarseggiano sulle altre spiagge. Dune di sabbia chiara, acqua limpida, fondale basso: ideale per famiglie con bambini piccoli.",
        en: "<strong>Maria Pia beach</strong> stretches for over a kilometre west of Alghero, just past the Lido, and marks the natural transition from the city to the Coral Riviera landscape. It stands out for its <strong>centuries-old pine forest</strong> of junipers and Aleppo pines reaching almost to the waterline, offering natural shade zones that are scarce on other beaches. Pale sand dunes, clear water, shallow bottom: ideal for families with young children.",
        fr: "La <strong>plage de Maria Pia</strong> s'étend sur plus d'un kilomètre à l'ouest d'Alghero, juste après le Lido, et marque le passage naturel entre la ville et le paysage de la Riviera du Corail. Elle se distingue par sa <strong>pinède séculaire</strong> de genévriers et pins d'Alep qui arrive pratiquement jusqu'au bord de l'eau, offrant des zones d'ombre naturelle rares sur les autres plages. Dunes de sable clair, eau limpide, fond peu profond : idéale pour les familles avec jeunes enfants.",
        de: "Der <strong>Strand Maria Pia</strong> erstreckt sich über mehr als einen Kilometer westlich von Alghero, gleich nach dem Lido, und markiert den natürlichen Übergang von der Stadt zur Landschaft der Korallenriviera. Er zeichnet sich durch seinen <strong>jahrhundertealten Pinienwald</strong> aus Wacholdern und Aleppokiefern aus, der fast bis zur Wasserlinie reicht und natürliche Schattenzonen bietet, die an anderen Stränden selten sind. Dünen aus hellem Sand, klares Wasser, flacher Grund: ideal für Familien mit kleinen Kindern."
      },
      sections: [
        {
          id: 'pineta',
          h2: { it: 'La pineta e le dune', en: 'The pine forest and the dunes', fr: 'La pinède et les dunes', de: 'Pinienwald und Dünen' },
          body: {
            it: "La pineta di Maria Pia è un ecosistema protetto di macchia mediterranea — ginepri, lentischi, pini d'Aleppo — con <strong>passerelle di legno</strong> che tutelano le dune e guidano verso il mare. È anche un'area picnic ideale, con tavoli liberi fra gli alberi. Le dune, alte qualche metro, creano zone riparate dal vento molto apprezzate quando soffia il maestrale. L'acqua è bassa per almeno venti metri, con fondale di sabbia fine — i bambini giocano tranquilli senza che i genitori debbano guardare di continuo.",
            en: "The Maria Pia pine forest is a protected ecosystem of Mediterranean scrub — junipers, mastic, Aleppo pines — with <strong>wooden boardwalks</strong> that protect the dunes and lead to the sea. It's also an ideal picnic area, with free tables among the trees. The dunes, a few metres tall, create wind-sheltered zones much appreciated when the Mistral blows. The water is shallow for at least twenty metres, with a fine sandy bottom — children play safely without parents having to watch constantly.",
            fr: "La pinède de Maria Pia est un écosystème protégé de maquis méditerranéen — genévriers, lentisques, pins d'Alep — avec des <strong>passerelles en bois</strong> qui protègent les dunes et mènent à la mer. C'est aussi une aire de pique-nique idéale, avec des tables libres entre les arbres. Les dunes, de quelques mètres de hauteur, créent des zones abritées du vent très appréciées quand souffle le Mistral. L'eau est peu profonde sur au moins vingt mètres, avec un fond de sable fin — les enfants jouent tranquillement sans que les parents aient à surveiller en permanence.",
            de: "Der Pinienwald von Maria Pia ist ein geschütztes Ökosystem aus Mittelmeermacchia — Wacholder, Mastix, Aleppokiefern — mit <strong>Holzstegen</strong>, die die Dünen schützen und zum Meer führen. Er ist auch ein idealer Picknickplatz mit frei zugänglichen Tischen zwischen den Bäumen. Die einige Meter hohen Dünen schaffen windgeschützte Bereiche, sehr geschätzt, wenn der Maestrale weht. Das Wasser ist mindestens zwanzig Meter weit flach, mit feinem Sandgrund — Kinder spielen ruhig, ohne dass Eltern ständig aufpassen müssen."
          }
        },
        {
          id: 'accesso',
          h2: { it: 'Accesso e servizi', en: 'Access and services', fr: 'Accès et services', de: 'Zugang und Dienstleistungen' },
          body: {
            it: "Parcheggio sterrato gratuito in varie zone lungo la strada litoranea (occasionale pagamento nei punti più centrali ad agosto, 2–3 €). Un paio di chioschi-bar e un ristorante sulla spiaggia, noleggio ombrelloni in alcune zone. Stabilimenti balneari pochi — la maggior parte della spiaggia è libera. In condizioni di <strong>maestrale</strong> l'onda può alzarsi: le dune riducono il fastidio del vento sulle persone, ma il bagno diventa impegnativo. D'estate attivo anche un <strong>centro nautico</strong> con noleggio SUP, windsurf e kayak.",
            en: "Free gravel parking in various areas along the coastal road (occasional fees at the most central points in August, €2–3). A couple of bar-kiosks and a restaurant on the beach, parasol rental in some sections. Few beach clubs — most of the beach is free-access. In <strong>Mistral</strong> conditions the waves can rise: the dunes reduce the wind's impact on people, but swimming becomes demanding. A <strong>nautical centre</strong> with SUP, windsurf and kayak rental also operates in summer.",
            fr: "Stationnement gratuit sur terrain stabilisé dans diverses zones le long de la route côtière (paiement occasionnel dans les points les plus centraux en août, 2–3 €). Quelques kiosques-bars et un restaurant sur la plage, location de parasols dans certaines zones. Peu d'établissements balnéaires — la majeure partie de la plage est libre. Par conditions de <strong>Mistral</strong>, la houle peut se lever : les dunes réduisent la gêne du vent, mais la baignade devient plus exigeante. En été fonctionne aussi un <strong>centre nautique</strong> avec location de SUP, windsurf et kayaks.",
            de: "Kostenloses Schotterparken in verschiedenen Bereichen entlang der Küstenstraße (gelegentliche Gebühr an den zentralsten Stellen im August, 2–3 €). Einige Kiosk-Bars und ein Restaurant am Strand, Schirmverleih in einigen Abschnitten. Wenige Strandclubs — der größte Teil ist frei zugänglich. Bei <strong>Maestrale</strong>-Bedingungen können die Wellen steigen: Die Dünen mindern den Windeinfluss auf die Personen, doch das Baden wird anspruchsvoller. Im Sommer gibt es auch ein <strong>Wassersportzentrum</strong> mit SUP-, Windsurf- und Kajakverleih."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/maria-pia',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Maria+Pia+Alghero'
      }
    },

    {
      slug: 'spiaggia-mugoni',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia Mugoni', en: 'Mugoni beach', fr: 'Plage Mugoni', de: 'Strand Mugoni' },
      subtitle: {
        it: 'Lunga spiaggia nella Baia di Porto Conte, paradiso delle famiglie',
        en: 'Long beach in the Porto Conte bay, a paradise for families',
        fr: 'Longue plage dans la Baie de Porto Conte, paradis des familles',
        de: 'Langer Strand in der Bucht von Porto Conte, ein Paradies für Familien'
      },
      location: { it: 'Porto Conte · Parco Regionale', en: 'Porto Conte · Regional Park', fr: 'Porto Conte · Parc Régional', de: 'Porto Conte · Regionalpark' },
      distance: { it: '14 km — 20 min in auto', en: '14 km — 20 min by car', fr: '14 km — 20 min en voiture', de: '14 km — 20 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-mugoni.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Spiaggia di Mugoni</strong> si apre per quasi due chilometri sulla <strong>Baia di Porto Conte</strong> — chiamata dai Romani *Nymphaeus Portus*, \"il porto delle ninfe\" — una delle baie più protette di Sardegna. Fa parte del Parco Regionale di Porto Conte, con una pineta di pini d'Aleppo retrostante. L'acqua bassa che rimane tale per decine di metri, le onde assenti per la conformazione della baia e l'ombra della pineta fanno di Mugoni la spiaggia <strong>più amata dalle famiglie con bambini piccoli</strong> della Riviera del Corallo.",
        en: "<strong>Mugoni beach</strong> opens for almost two kilometres on <strong>Porto Conte bay</strong> — called by the Romans *Nymphaeus Portus*, \"port of the nymphs\" — one of the most sheltered bays in Sardinia. It is part of the Porto Conte Regional Park, with an Aleppo-pine forest behind. The shallow water that stays such for tens of metres, the waves absent thanks to the bay's shape, and the shade of the pine forest make Mugoni the <strong>most beloved beach for families with small children</strong> on the Coral Riviera.",
        fr: "La <strong>plage de Mugoni</strong> s'ouvre sur près de deux kilomètres dans la <strong>Baie de Porto Conte</strong> — appelée par les Romains *Nymphaeus Portus*, « port des nymphes » — l'une des baies les plus abritées de Sardaigne. Elle fait partie du Parc Régional de Porto Conte, avec une pinède de pins d'Alep à l'arrière. L'eau peu profonde qui le reste sur des dizaines de mètres, les vagues absentes par la conformation de la baie et l'ombre de la pinède font de Mugoni la plage <strong>la plus aimée des familles avec jeunes enfants</strong> de la Riviera du Corail.",
        de: "Der <strong>Strand Mugoni</strong> öffnet sich über fast zwei Kilometer in der <strong>Bucht von Porto Conte</strong> — von den Römern *Nymphaeus Portus*, „Nymphenhafen\", genannt — einer der am besten geschützten Buchten Sardiniens. Er ist Teil des Regionalparks Porto Conte, mit einem dahinterliegenden Aleppokiefernwald. Das flache Wasser, das auf Dutzende Meter flach bleibt, die aufgrund der Buchtform fehlenden Wellen und der Schatten des Pinienwaldes machen Mugoni zum <strong>beliebtesten Strand für Familien mit kleinen Kindern</strong> an der Korallenriviera."
      },
      sections: [
        {
          id: 'baia-ninfe',
          h2: { it: 'La Baia delle Ninfe', en: 'The Bay of the Nymphs', fr: 'La Baie des Nymphes', de: 'Die Bucht der Nymphen' },
          body: {
            it: "La Baia di Porto Conte è un'insenatura di forma quasi circolare di cinque chilometri di diametro, protetta a nord da <strong>Capo Caccia</strong> e a sud da <strong>Punta Giglio</strong>. Questo la rende una delle poche baie sarde in cui il mare <strong>rimane praticamente sempre calmo</strong>, anche nei pomeriggi di maestrale più forte. L'acqua è cristallina, con fondale di sabbia fine che rende la balneazione sicurissima per i bambini. La pineta retrostante, di circa settecento metri di profondità, è area di picnic e ospita anche campeggi e strutture turistiche storiche — il primo insediamento turistico di Alghero nacque qui negli anni Sessanta.",
            en: "Porto Conte bay is an almost circular inlet five kilometres across, sheltered to the north by <strong>Capo Caccia</strong> and to the south by <strong>Punta Giglio</strong>. This makes it one of the few Sardinian bays where the sea <strong>stays almost always calm</strong>, even on the strongest Mistral afternoons. The water is crystal-clear, with a fine sandy bottom that makes swimming very safe for children. The pine forest behind, about seven hundred metres deep, is a picnic area and home to campsites and historic tourist facilities — Alghero's first tourist development was born here in the 1960s.",
            fr: "La Baie de Porto Conte est une crique de forme presque circulaire de cinq kilomètres de diamètre, protégée au nord par <strong>Capo Caccia</strong> et au sud par <strong>Punta Giglio</strong>. Cela en fait l'une des rares baies sardes où la mer <strong>reste pratiquement toujours calme</strong>, même les après-midi de Mistral les plus forts. L'eau est cristalline, avec un fond de sable fin qui rend la baignade très sûre pour les enfants. La pinède à l'arrière, d'environ sept cents mètres de profondeur, est une aire de pique-nique et abrite aussi des campings et structures touristiques historiques — le premier établissement touristique d'Alghero est né ici dans les années 1960.",
            de: "Die Bucht von Porto Conte ist eine nahezu kreisrunde Einbuchtung von fünf Kilometern Durchmesser, im Norden von <strong>Capo Caccia</strong> und im Süden von <strong>Punta Giglio</strong> geschützt. Das macht sie zu einer der wenigen sardischen Buchten, in denen das Meer <strong>fast immer ruhig bleibt</strong>, selbst an den stärksten Maestrale-Nachmittagen. Das Wasser ist glasklar, mit feinsandigem Grund, der das Baden für Kinder sehr sicher macht. Der dahinterliegende Pinienwald, rund siebenhundert Meter tief, ist Picknickplatz und beherbergt auch Campingplätze und historische Tourismusanlagen — die erste touristische Ansiedlung Algheros entstand hier in den 1960er Jahren."
          }
        },
        {
          id: 'servizi',
          h2: { it: 'Servizi e cosa fare intorno', en: 'Services and what to do around', fr: 'Services et choses à faire aux alentours', de: 'Dienste und was man in der Umgebung tun kann' },
          body: {
            it: "Parcheggio ampio a pagamento (5 € al giorno in estate), noleggio ombrelloni e sdraio, due ristoranti-pizzerie a pochi passi dal mare, chioschi per gelati e panini. Attivo anche un <strong>centro velico</strong> con lezioni e noleggio di vela, SUP e kayak. Nei dintorni meritano la <strong>Cantina Sella & Mosca</strong> (a 6 km) per una visita in vigneto, il <strong>Nuraghe Palmavera</strong> (a 2 km), e il <strong>Parco di Porto Conte</strong> con sentieri di trekking fra macchia e falesie. Un pomeriggio a Mugoni + cena in agriturismo nell'entroterra è una formula molto apprezzata.",
            en: "Large paid parking (€5 per day in summer), parasol and sunbed rental, two restaurant-pizzerias a few steps from the sea, kiosks for ice cream and sandwiches. A <strong>sailing centre</strong> also operates with lessons and rental of sailing boats, SUP and kayaks. Nearby worth visiting are the <strong>Sella & Mosca winery</strong> (6 km away) for a vineyard tour, the <strong>Palmavera nuraghe</strong> (2 km), and the <strong>Porto Conte Park</strong> with trekking trails through scrub and cliffs. An afternoon at Mugoni plus dinner at an inland farm-stay is a much-loved formula.",
            fr: "Vaste parking payant (5 € par jour en été), location de parasols et transats, deux restaurants-pizzerias à quelques pas de la mer, kiosques pour glaces et sandwichs. Un <strong>centre de voile</strong> propose aussi cours et location de voiliers, SUP et kayaks. Aux alentours méritent la <strong>Cantina Sella & Mosca</strong> (à 6 km) pour une visite en vignoble, le <strong>Nuraghe Palmavera</strong> (à 2 km), et le <strong>Parc de Porto Conte</strong> avec ses sentiers de trekking entre maquis et falaises. Un après-midi à Mugoni + dîner dans un agritourisme de l'arrière-pays est une formule très appréciée.",
            de: "Großer kostenpflichtiger Parkplatz (5 € pro Tag im Sommer), Schirm- und Liegenverleih, zwei Restaurants-Pizzerien wenige Schritte vom Meer, Kioske für Eis und Sandwiches. Auch ein <strong>Segelzentrum</strong> mit Kursen und Verleih von Segelbooten, SUP und Kajaks. In der Umgebung lohnen die <strong>Cantina Sella & Mosca</strong> (6 km entfernt) für einen Weinbergsbesuch, der <strong>Nuraghe Palmavera</strong> (2 km) und der <strong>Park Porto Conte</strong> mit Wanderwegen durch Macchia und Klippen. Ein Nachmittag in Mugoni plus Abendessen im Agritourismus im Hinterland ist eine sehr beliebte Kombination."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/mugoni',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Mugoni+Alghero'
      }
    },

    {
      slug: 'spiaggia-porto-ferro',
      parent: 'appartamento-alghero',
      name: { it: 'Spiaggia di Porto Ferro', en: 'Porto Ferro beach', fr: 'Plage de Porto Ferro', de: 'Strand Porto Ferro' },
      subtitle: {
        it: 'Tre chilometri di baia selvaggia con dune ocra e torri aragonesi',
        en: 'Three kilometres of wild bay with ochre dunes and Aragonese towers',
        fr: 'Trois kilomètres de baie sauvage aux dunes ocre et tours aragonaises',
        de: 'Drei Kilometer wilde Bucht mit ockerfarbenen Dünen und aragonesischen Türmen'
      },
      location: { it: 'Riviera del Corallo · costa nord', en: 'Coral Riviera · north coast', fr: 'Riviera du Corail · côte nord', de: 'Korallenriviera · Nordküste' },
      distance: { it: '22 km — 25 min in auto', en: '22 km — 25 min by car', fr: '22 km — 25 min en voiture', de: '22 km — 25 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/spiaggia-porto-ferro.jpg',
      heroFocus: 'center center',
      intro: {
        it: "<strong>Porto Ferro</strong> è la spiaggia selvaggia della Riviera del Corallo: tre chilometri di arenile dorato, dune alte anche dieci metri, macchia mediterranea che arriva fino al mare, e <strong>tre torri aragonesi del XVI secolo</strong> — Torre Negra, Torre Bianca, Torre di Bantine Sale — che sorvegliano la baia come secoli fa. Niente strutture balneari, niente concessioni, nessun locale sul lungomare: è il posto giusto per chi cerca la Sardegna più incontaminata e un tramonto in piena solitudine.",
        en: "<strong>Porto Ferro</strong> is the Coral Riviera's wild beach: three kilometres of golden shore, dunes up to ten metres tall, Mediterranean scrub reaching to the sea, and <strong>three 16th-century Aragonese towers</strong> — Torre Negra, Torre Bianca, Torre di Bantine Sale — watching over the bay as they did centuries ago. No beach facilities, no concessions, no seafront bars: it's the place for those seeking the most unspoiled Sardinia and a sunset in complete solitude.",
        fr: "<strong>Porto Ferro</strong> est la plage sauvage de la Riviera du Corail : trois kilomètres de rivage doré, des dunes jusqu'à dix mètres de haut, un maquis méditerranéen qui arrive jusqu'à la mer, et <strong>trois tours aragonaises du XVIᵉ siècle</strong> — Torre Negra, Torre Bianca, Torre di Bantine Sale — qui veillent sur la baie comme il y a des siècles. Pas d'établissements balnéaires, pas de concessions, aucun bar sur le front de mer : c'est l'endroit pour qui cherche la Sardaigne la plus préservée et un coucher de soleil en pleine solitude.",
        de: "<strong>Porto Ferro</strong> ist der wilde Strand der Korallenriviera: drei Kilometer goldenes Ufer, Dünen bis zu zehn Meter hoch, mediterrane Macchia, die bis ans Meer reicht, und <strong>drei aragonesische Türme aus dem 16. Jahrhundert</strong> — Torre Negra, Torre Bianca, Torre di Bantine Sale — die die Bucht bewachen wie vor Jahrhunderten. Keine Strandanlagen, keine Konzessionen, keine Bars am Ufer: der richtige Ort für alle, die das unberührteste Sardinien und einen Sonnenuntergang in völliger Einsamkeit suchen."
      },
      sections: [
        {
          id: 'paesaggio',
          h2: { it: 'Un paesaggio diverso dal resto della costa', en: 'A landscape unlike the rest of the coast', fr: 'Un paysage différent du reste de la côte', de: 'Eine Landschaft anders als der Rest der Küste' },
          body: {
            it: "A Porto Ferro, la geologia racconta una storia unica. Le <strong>dune ocra</strong> alle spalle della spiaggia, alte fino a dieci metri, sono formate da sabbia di origine ferrifera (da cui il nome) che le colora di un arancio intenso, specialmente al tramonto. Alle tre torri si aggiungono le tracce di antichi insediamenti: il <strong>Nuraghe Ferraliu</strong> poco distante, resti di ville romane, e il piccolo sito archeologico di <strong>Sa Mandra 'e Sa Giua</strong>. Il mare, ventoso e con onda costante, è di un colore <strong>blu cobalto intenso</strong> come raramente si vede nelle baie più riparate della zona.",
            en: "At Porto Ferro, geology tells a unique story. The <strong>ochre dunes</strong> behind the beach, up to ten metres tall, are formed of iron-rich sand (hence the name) that colours them intense orange, especially at sunset. To the three towers are added traces of ancient settlements: the <strong>Ferraliu nuraghe</strong> nearby, remains of Roman villas, and the small archaeological site of <strong>Sa Mandra 'e Sa Giua</strong>. The sea, windy and with steady waves, is an <strong>intense cobalt blue</strong> rarely seen in the area's more sheltered bays.",
            fr: "À Porto Ferro, la géologie raconte une histoire unique. Les <strong>dunes ocre</strong> derrière la plage, hautes jusqu'à dix mètres, sont formées de sable d'origine ferrifère (d'où le nom) qui les colore d'un orange intense, surtout au coucher du soleil. Aux trois tours s'ajoutent des traces d'anciens établissements : le <strong>Nuraghe Ferraliu</strong> à proximité, des restes de villas romaines et le petit site archéologique de <strong>Sa Mandra 'e Sa Giua</strong>. La mer, ventée et à vagues constantes, est d'un <strong>bleu cobalt intense</strong> comme on en voit rarement dans les baies plus abritées de la zone.",
            de: "In Porto Ferro erzählt die Geologie eine einzigartige Geschichte. Die <strong>ockerfarbenen Dünen</strong> hinter dem Strand, bis zu zehn Meter hoch, bestehen aus eisenhaltigem Sand (daher der Name), der sie intensiv orange färbt, besonders bei Sonnenuntergang. Zu den drei Türmen kommen Spuren alter Siedlungen: der nahe <strong>Nuraghe Ferraliu</strong>, Reste römischer Villen und die kleine archäologische Stätte <strong>Sa Mandra 'e Sa Giua</strong>. Das Meer, windig und mit konstantem Wellengang, hat ein <strong>intensives Kobaltblau</strong>, wie man es in den geschützteren Buchten der Gegend selten sieht."
          }
        },
        {
          id: 'consigli',
          h2: { it: 'Come viverla', en: 'How to experience it', fr: 'Comment la vivre', de: 'Wie man ihn erlebt' },
          body: {
            it: "Parcheggio sterrato gratuito in più zone lungo la strada, senza custodia. Un solo chiosco-bar stagionale nella parte centrale: portate acqua, pranzo al sacco, ombrellone. La spiaggia è <strong>ventosa</strong>: il vento da nord-ovest rinforza nel pomeriggio, apprezzato dai surfisti (qui si trovano le uniche <strong>onde surfabili</strong> della zona) ma meno dai bagnanti. La visita serale è imperdibile: arrivate verso le 19:00, fate un bagno, e restate per il tramonto — le dune si incendiano di rosso. Scarpe chiuse consigliate per le piccole passeggiate verso le torri.",
            en: "Free unguarded gravel parking in several areas along the road. Only one seasonal kiosk-bar in the central section: bring water, packed lunch, parasol. The beach is <strong>windy</strong>: the north-west wind strengthens in the afternoon, appreciated by surfers (this is home to the area's only <strong>surfable waves</strong>) but less so by bathers. An evening visit is unmissable: arrive around 19:00, have a swim and stay for sunset — the dunes catch fire with red. Closed shoes recommended for short walks to the towers.",
            fr: "Stationnement gratuit non gardé sur terrain stabilisé dans plusieurs zones le long de la route. Un seul kiosque-bar saisonnier dans la partie centrale : emportez eau, pique-nique, parasol. La plage est <strong>ventée</strong> : le vent de nord-ouest forcit l'après-midi, apprécié des surfeurs (on y trouve les seules <strong>vagues surfables</strong> de la zone) mais moins des baigneurs. La visite du soir est incontournable : arrivez vers 19h00, baignez-vous, et restez pour le coucher du soleil — les dunes s'embrasent de rouge. Chaussures fermées conseillées pour les petites promenades vers les tours.",
            de: "Kostenloses, unbewachtes Schotterparken in mehreren Bereichen entlang der Straße. Nur ein saisonaler Kiosk-Bar im zentralen Abschnitt: Wasser, Brotzeit, Sonnenschirm mitbringen. Der Strand ist <strong>windig</strong>: der Nordwestwind frischt am Nachmittag auf, geschätzt von Surfern (hier gibt es die einzigen <strong>surfbaren Wellen</strong> der Gegend), weniger von Badenden. Ein Abendbesuch ist ein Muss: gegen 19:00 Uhr ankommen, baden und bis zum Sonnenuntergang bleiben — die Dünen leuchten rot. Für kleine Wanderungen zu den Türmen werden geschlossene Schuhe empfohlen."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/porto-ferro',
        wiki: 'https://it.wikipedia.org/wiki/Porto_Ferro',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Spiaggia+Porto+Ferro'
      }
    },

    {
      slug: 'centro-storico-bastioni',
      parent: 'appartamento-alghero',
      name: { it: 'Centro storico e Bastioni di Alghero', en: 'Alghero old town and city walls', fr: 'Centre historique et remparts d\'Alghero', de: 'Altstadt und Stadtmauern von Alghero' },
      subtitle: {
        it: 'Il cuore catalano di Alghero, fra mura aragonesi e campanili gotici',
        en: 'Alghero\'s Catalan heart, between Aragonese walls and Gothic bell towers',
        fr: 'Le cœur catalan d\'Alghero, entre remparts aragonais et clochers gothiques',
        de: 'Das katalanische Herz Algheros, zwischen aragonesischen Mauern und gotischen Glockentürmen'
      },
      location: { it: 'Alghero · centro storico', en: 'Alghero · old town', fr: 'Alghero · centre historique', de: 'Alghero · Altstadt' },
      distance: { it: '5 min a piedi dall\'appartamento', en: '5 min on foot from the apartment', fr: '5 min à pied de l\'appartement', de: '5 Min. zu Fuß von der Wohnung' },
      hero: 'img/alghero/dintorni/bastioni-marco-polo.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Alghero è l'unica città della Sardegna dove ancora si parla <strong>catalano</strong> — qui detto *algherese* — come lingua ufficiale. La ragione è storica: nel 1353 la città fu conquistata dal re Pietro IV d'Aragona che ne espulse la popolazione ligure e genovese e la ripopolò con famiglie catalane. Da allora il catalano è la lingua della città, parlata ancora oggi da circa un quarto degli algheresi. I <strong>Bastioni</strong> — il sistema di mura e torri del XVI secolo che cinge il centro storico — e i <strong>vicoli lastricati</strong> del borgo antico sono l'eredità più visibile di questa identità unica. Da casa bastano cinque minuti a piedi per entrare in un'altra epoca.",
        en: "Alghero is the only town in Sardinia where <strong>Catalan</strong> is still spoken — here called *Alguerese* — as an official language. The reason is historical: in 1353 the city was conquered by King Pedro IV of Aragon, who expelled the Ligurian and Genoese population and repopulated it with Catalan families. Since then, Catalan has been the city's language, still spoken today by about a quarter of its inhabitants. The <strong>Bastioni</strong> — the 16th-century system of walls and towers encircling the old town — and the <strong>cobbled alleys</strong> of the ancient quarter are the most visible legacy of this unique identity. It's a five-minute walk from home into another era.",
        fr: "Alghero est la seule ville de Sardaigne où l'on parle encore le <strong>catalan</strong> — ici appelé *alguerese* — comme langue officielle. La raison est historique : en 1353 la ville fut conquise par le roi Pierre IV d'Aragon, qui en expulsa la population ligure et génoise pour la repeupler de familles catalanes. Depuis lors, le catalan est la langue de la ville, encore parlée aujourd'hui par environ un quart des habitants. Les <strong>Bastioni</strong> — système de remparts et tours du XVIᵉ siècle qui ceinture le centre historique — et les <strong>ruelles pavées</strong> du bourg ancien sont l'héritage le plus visible de cette identité unique. De la maison, cinq minutes à pied suffisent pour entrer dans une autre époque.",
        de: "Alghero ist die einzige Stadt Sardiniens, in der <strong>Katalanisch</strong> — hier *Alguerese* genannt — als offizielle Sprache noch gesprochen wird. Der Grund ist historisch: 1353 wurde die Stadt von König Peter IV. von Aragón erobert, der die ligurische und genuesische Bevölkerung vertrieb und sie mit katalanischen Familien neu besiedelte. Seitdem ist Katalanisch die Sprache der Stadt, noch heute von etwa einem Viertel der Bewohner gesprochen. Die <strong>Bastioni</strong> — das Mauer- und Turmsystem aus dem 16. Jahrhundert rund um die Altstadt — und die <strong>gepflasterten Gassen</strong> des historischen Kerns sind das sichtbarste Erbe dieser einzigartigen Identität. Von zu Hause aus sind es fünf Minuten zu Fuß in eine andere Epoche."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'La città catalana nel cuore della Sardegna', en: 'The Catalan city in the heart of Sardinia', fr: 'La ville catalane au cœur de la Sardaigne', de: 'Die katalanische Stadt im Herzen Sardiniens' },
          body: {
            it: "La conquista aragonese del 1353 segnò una svolta radicale: la vecchia Alghero genovese fu svuotata e riempita di famiglie catalane venute da Valencia e Barcellona. Per cinque secoli la città è rimasta un'enclave catalanofona in un'isola sardofona, fenomeno unico in Europa. L'<strong>UNESCO ha riconosciuto</strong> l'*algherese* come patrimonio linguistico. Lo si sente ancora nelle pescherie, nei bar del porto, nei nomi delle vie (Carrer Major, Plaça Civica, Carrer del Teatre). A Pasqua, la <strong>Setmana Santa</strong> segue il rito catalano-aragonese, con processioni che si svolgono da oltre sei secoli.",
            en: "The Aragonese conquest of 1353 marked a radical turning point: the old Genoese Alghero was emptied and filled with Catalan families from Valencia and Barcelona. For five centuries the city remained a Catalan-speaking enclave on a Sardinian-speaking island, a phenomenon unique in Europe. <strong>UNESCO has recognised</strong> *Alguerese* as linguistic heritage. You still hear it in the fish markets, in the harbour bars, in street names (Carrer Major, Plaça Civica, Carrer del Teatre). At Easter, the <strong>Setmana Santa</strong> follows the Catalan-Aragonese rite, with processions held for over six centuries.",
            fr: "La conquête aragonaise de 1353 marque un tournant radical : la vieille Alghero génoise est vidée et remplie de familles catalanes venues de Valence et Barcelone. Pendant cinq siècles, la ville reste une enclave catalanophone dans une île sardophone, phénomène unique en Europe. L'<strong>UNESCO a reconnu</strong> l'*alguerese* comme patrimoine linguistique. On l'entend encore dans les poissonneries, dans les bars du port, dans les noms de rues (Carrer Major, Plaça Civica, Carrer del Teatre). À Pâques, la <strong>Setmana Santa</strong> suit le rite catalano-aragonais, avec des processions qui se déroulent depuis plus de six siècles.",
            de: "Die aragonesische Eroberung von 1353 war ein radikaler Wendepunkt: Das alte genuesische Alghero wurde geleert und mit katalanischen Familien aus Valencia und Barcelona wiederbesiedelt. Fünf Jahrhunderte lang blieb die Stadt eine katalanischsprachige Enklave auf einer sardischsprachigen Insel, ein in Europa einzigartiges Phänomen. Die <strong>UNESCO hat Alguerese</strong> als sprachliches Erbe anerkannt. Man hört es noch auf den Fischmärkten, in den Hafenbars, in den Straßennamen (Carrer Major, Plaça Civica, Carrer del Teatre). An Ostern folgt die <strong>Setmana Santa</strong> dem katalanisch-aragonesischen Ritus, mit Prozessionen, die seit über sechshundert Jahren begangen werden."
          }
        },
        {
          id: 'bastioni',
          h2: { it: 'I Bastioni al tramonto', en: 'The Bastioni at sunset', fr: 'Les Bastions au coucher du soleil', de: 'Die Bastioni bei Sonnenuntergang' },
          body: {
            it: "Le mura del centro storico si possono percorrere a piedi su un lungomare fortificato che corre lungo il mare per circa un chilometro. Tre bastioni principali — <strong>Marco Polo</strong>, <strong>Magellano</strong>, <strong>Cristoforo Colombo</strong> — intervallati da torri cilindriche e scale che scendono al porto antico. È qui, in particolare sul <strong>Bastione Magellano</strong>, che gli algheresi vanno per il tramonto: il sole cala dietro Capo Caccia e tinge di rosa il calcare delle torri. Lungo i Bastioni si allineano bar, enoteche, ristoranti con i tavoli direttamente sul mare — l'<strong>aperitivo ai Bastioni</strong> è un rito irrinunciabile per chi passa qualche giorno ad Alghero.",
            en: "The old-town walls can be walked along a fortified seafront running about one kilometre beside the sea. Three main bastions — <strong>Marco Polo</strong>, <strong>Magellano</strong>, <strong>Cristoforo Colombo</strong> — interspersed with cylindrical towers and stairs descending to the old harbour. It's here, especially at <strong>Bastione Magellano</strong>, that Alghero residents go for sunset: the sun drops behind Capo Caccia and paints the limestone of the towers pink. Along the Bastioni, bars, wine bars and restaurants line up with tables directly on the sea — an <strong>aperitivo at the Bastioni</strong> is an unmissable ritual for anyone spending a few days in Alghero.",
            fr: "On peut parcourir les remparts du centre historique à pied le long d'un front de mer fortifié qui longe la mer sur environ un kilomètre. Trois bastions principaux — <strong>Marco Polo</strong>, <strong>Magellano</strong>, <strong>Cristoforo Colombo</strong> — entrecoupés de tours cylindriques et d'escaliers qui descendent au port ancien. C'est ici, en particulier sur le <strong>Bastione Magellano</strong>, que les Algherese viennent pour le coucher du soleil : le soleil descend derrière Capo Caccia et teinte de rose le calcaire des tours. Le long des Bastions s'alignent bars, bars à vin, restaurants avec tables directement sur la mer — un <strong>apéritif aux Bastions</strong> est un rituel incontournable pour qui passe quelques jours à Alghero.",
            de: "Die Altstadtmauern lassen sich zu Fuß entlang einer befestigten Uferpromenade begehen, die rund einen Kilometer am Meer verläuft. Drei Hauptbastionen — <strong>Marco Polo</strong>, <strong>Magellano</strong>, <strong>Cristoforo Colombo</strong> — abwechselnd mit zylindrischen Türmen und Treppen, die zum alten Hafen hinabführen. Hier, besonders an der <strong>Bastione Magellano</strong>, gehen die Algheresi zum Sonnenuntergang hin: Die Sonne sinkt hinter Capo Caccia und färbt den Kalkstein der Türme rosa. Entlang der Bastioni reihen sich Bars, Weinlokale und Restaurants mit Tischen direkt am Meer — ein <strong>Aperitif an den Bastioni</strong> ist ein unverzichtbares Ritual für alle, die ein paar Tage in Alghero verbringen."
          }
        },
        {
          id: 'cosa-vedere',
          h2: { it: 'Cosa vedere nel centro storico', en: 'What to see in the old town', fr: 'Que voir dans le centre historique', de: 'Was man in der Altstadt sehen sollte' },
          body: {
            it: "Oltre alla <strong>Cattedrale di Santa Maria</strong> (scheda dedicata nel carosello), meritano la <strong>Chiesa di San Francesco</strong> con il suo chiostro gotico-catalano (XIV secolo), la <strong>Torre di San Giovanni</strong> che ospita il museo della città, la <strong>Torre di Porta Terra</strong> con vista panoramica dalla terrazza, e la piccola <strong>Piazza Civica</strong> dove ha sede il Comune. Da non perdere <strong>Carrer Barceloneta</strong>, la via dei corallari con le botteghe tradizionali del corallo rosso di Alghero — uno dei più pregiati al mondo. Per pranzo, l'<strong>aragosta alla catalana</strong> (bollita e condita con pomodori, cipolle e olio) è il piatto-simbolo: si trova nei ristoranti del centro, <strong>50–80 € a persona</strong>.",
            en: "Besides the <strong>Cathedral of Santa Maria</strong> (dedicated entry in the carousel), also worth visiting are the <strong>Church of San Francesco</strong> with its Catalan-Gothic cloister (14th century), the <strong>San Giovanni Tower</strong> hosting the city museum, the <strong>Porta Terra Tower</strong> with a panoramic view from the terrace, and the small <strong>Piazza Civica</strong> where the town hall stands. Don't miss <strong>Carrer Barceloneta</strong>, the coral-carvers' street with traditional workshops for Alghero red coral — one of the most prized in the world. For lunch, <strong>lobster alla catalana</strong> (boiled and dressed with tomatoes, onions and oil) is the signature dish: available in restaurants in the centre, <strong>€50–80 per person</strong>.",
            fr: "Outre la <strong>Cathédrale de Santa Maria</strong> (fiche dédiée dans le carrousel), méritent aussi l'<strong>Église de San Francesco</strong> avec son cloître gothico-catalan (XIVᵉ siècle), la <strong>Tour de San Giovanni</strong> qui abrite le musée de la ville, la <strong>Tour de Porta Terra</strong> avec sa vue panoramique depuis la terrasse, et la petite <strong>Piazza Civica</strong> où siège la mairie. À ne pas manquer, la <strong>Carrer Barceloneta</strong>, la rue des coralliers avec les boutiques traditionnelles du corail rouge d'Alghero — l'un des plus prisés au monde. Pour le déjeuner, le <strong>homard à la catalane</strong> (bouilli et assaisonné de tomates, oignons et huile) est le plat-symbole : on le trouve dans les restaurants du centre, <strong>50–80 € par personne</strong>.",
            de: "Neben der <strong>Kathedrale Santa Maria</strong> (eigener Eintrag im Karussell) lohnen sich die <strong>Kirche San Francesco</strong> mit ihrem katalanisch-gotischen Kreuzgang (14. Jh.), der <strong>San-Giovanni-Turm</strong> mit dem Stadtmuseum, der <strong>Porta-Terra-Turm</strong> mit Panoramablick von der Terrasse und die kleine <strong>Piazza Civica</strong>, an der das Rathaus steht. Nicht verpassen: <strong>Carrer Barceloneta</strong>, die Straße der Korallenschleifer mit traditionellen Werkstätten für die rote Koralle von Alghero — eine der geschätztesten der Welt. Zum Mittagessen ist <strong>Hummer alla catalana</strong> (gekocht und mit Tomaten, Zwiebeln und Öl angerichtet) das Symbolgericht: in den Restaurants des Zentrums erhältlich, <strong>50–80 € pro Person</strong>."
          }
        }
      ],
      links: {
        wiki: 'https://it.wikipedia.org/wiki/Torri_e_bastioni_di_Alghero',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Bastioni+Alghero'
      }
    },

    {
      slug: 'cattedrale-santa-maria',
      parent: 'appartamento-alghero',
      name: { it: 'Cattedrale di Santa Maria', en: 'Cathedral of Santa Maria', fr: 'Cathédrale de Santa Maria', de: 'Kathedrale Santa Maria' },
      subtitle: {
        it: 'Il Duomo di Alghero, fra gotico catalano e facciata neoclassica',
        en: 'Alghero\'s cathedral, between Catalan Gothic and Neoclassical façade',
        fr: 'La cathédrale d\'Alghero, entre gothique catalan et façade néoclassique',
        de: 'Algheros Dom, zwischen katalanischer Gotik und klassizistischer Fassade'
      },
      location: { it: 'Alghero · centro storico', en: 'Alghero · old town', fr: 'Alghero · centre historique', de: 'Alghero · Altstadt' },
      distance: { it: '5 min a piedi dall\'appartamento', en: '5 min on foot from the apartment', fr: '5 min à pied de l\'appartement', de: '5 Min. zu Fuß von der Wohnung' },
      hero: 'img/alghero/dintorni/centro-storico-alghero.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Cattedrale di Santa Maria</strong>, concattedrale della diocesi di Alghero-Bosa, è un edificio dalla storia stratificata: la costruzione iniziò nel <strong>1530</strong> in stile gotico-catalano, proseguì nel Cinquecento con innesti rinascimentali, e si concluse nell'Ottocento con una <strong>facciata neoclassica</strong> disegnata da Michele Cordella. Il risultato è un racconto architettonico unico: se si entra dal portale principale si pensa di trovarsi in una chiesa neoclassica, ma appena oltre la soglia ci si accorge di essere in una cattedrale gotico-catalana del Cinquecento.",
        en: "The <strong>Cathedral of Santa Maria</strong>, co-cathedral of the diocese of Alghero-Bosa, is a building with a layered history: construction began in <strong>1530</strong> in Catalan-Gothic style, continued through the 16th century with Renaissance additions, and concluded in the 19th century with a <strong>Neoclassical façade</strong> designed by Michele Cordella. The result is a unique architectural narrative: if you enter through the main portal, you think you're in a Neoclassical church, but just past the threshold you realise you're inside a 16th-century Catalan-Gothic cathedral.",
        fr: "La <strong>Cathédrale de Santa Maria</strong>, co-cathédrale du diocèse d'Alghero-Bosa, est un édifice à l'histoire stratifiée : la construction commence en <strong>1530</strong> en style gothique-catalan, se poursuit au XVIᵉ siècle avec des insertions Renaissance, et s'achève au XIXᵉ siècle avec une <strong>façade néoclassique</strong> dessinée par Michele Cordella. Le résultat est un récit architectural unique : si l'on entre par le portail principal, on croit être dans une église néoclassique, mais dès le seuil franchi on se rend compte d'être dans une cathédrale gothique-catalane du XVIᵉ siècle.",
        de: "Die <strong>Kathedrale Santa Maria</strong>, Konkathedrale der Diözese Alghero-Bosa, ist ein Bauwerk mit geschichteter Geschichte: Der Bau begann <strong>1530</strong> im katalanisch-gotischen Stil, wurde im 16. Jahrhundert mit Renaissance-Elementen fortgesetzt und im 19. Jahrhundert mit einer von Michele Cordella entworfenen <strong>klassizistischen Fassade</strong> abgeschlossen. Das Ergebnis ist eine einzigartige Architekturerzählung: Tritt man durch das Hauptportal ein, glaubt man, in einer klassizistischen Kirche zu stehen, doch gleich nach der Schwelle erkennt man: man ist in einer katalanisch-gotischen Kathedrale des 16. Jahrhunderts."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'Le fasi costruttive', en: 'The building phases', fr: 'Les phases de construction', de: 'Die Bauphasen' },
          body: {
            it: "I lavori iniziarono su progetto di <strong>Antoni Carcassona</strong>, maestro catalano, in stile gotico-catalano di matrice barcellonese. La pianta a croce latina, le volte a stella, i pilastri a fascio e il <strong>grande campanile ottagonale</strong> in calcare bianco appartengono a questa fase. Nel Seicento fu aggiunto il presbiterio tardo-rinascimentale, con la volta decorata. Solo nell'Ottocento, con la facciata neoclassica di Cordella (1862), la chiesa assunse l'aspetto attuale. Lo stile gotico-catalano rimane visibile nelle <strong>cappelle laterali</strong>, nelle finestre strombate e nelle volte a crociera del transetto.",
            en: "Work began to a design by <strong>Antoni Carcassona</strong>, a Catalan master, in the Catalan-Gothic Barcelona style. The Latin cross plan, the star vaults, the clustered pillars and the <strong>great octagonal bell tower</strong> in white limestone all belong to this phase. In the 17th century the late-Renaissance presbytery was added, with a decorated vault. Only in the 19th century, with Cordella's Neoclassical façade (1862), did the church take on its present appearance. The Catalan-Gothic style is still visible in the <strong>side chapels</strong>, the splayed windows and the cross vaults of the transept.",
            fr: "Les travaux commencent sur un projet d'<strong>Antoni Carcassona</strong>, maître catalan, en style gothique-catalan d'origine barcelonaise. Le plan en croix latine, les voûtes étoilées, les piliers en faisceau et le <strong>grand clocher octogonal</strong> en calcaire blanc appartiennent à cette phase. Au XVIIᵉ siècle est ajouté le chœur de la Renaissance tardive, à la voûte décorée. C'est seulement au XIXᵉ siècle, avec la façade néoclassique de Cordella (1862), que l'église prend son aspect actuel. Le style gothique-catalan reste visible dans les <strong>chapelles latérales</strong>, les fenêtres ébrasées et les voûtes d'arêtes du transept.",
            de: "Die Arbeiten begannen nach einem Entwurf von <strong>Antoni Carcassona</strong>, einem katalanischen Meister, im katalanisch-gotischen Stil Barceloneser Prägung. Der lateinische Kreuzgrundriss, die Sterngewölbe, die Bündelpfeiler und der <strong>große oktogonale Glockenturm</strong> aus weißem Kalkstein gehören zu dieser Phase. Im 17. Jahrhundert kam das spätrenaissancezeitliche Presbyterium mit verziertem Gewölbe hinzu. Erst im 19. Jahrhundert, mit der klassizistischen Fassade Cordellas (1862), erhielt die Kirche ihr heutiges Aussehen. Der katalanisch-gotische Stil ist noch in den <strong>Seitenkapellen</strong>, in den geschrägten Fenstern und in den Kreuzgewölben des Querschiffs sichtbar."
          }
        },
        {
          id: 'cosa-vedere',
          h2: { it: 'Cosa vedere all\'interno', en: 'What to see inside', fr: 'Ce qu\'il faut voir à l\'intérieur', de: 'Was man im Inneren sieht' },
          body: {
            it: "All'interno, le <strong>cappelle laterali</strong> conservano dipinti di scuola napoletana (XVII–XVIII secolo), un crocifisso ligneo catalano del Cinquecento e il pregevole <strong>coro in radica di noce</strong> intagliato a mano. La <strong>cappella del Sacramento</strong>, prima a destra entrando, ospita una tela della scuola di Guido Reni. Nel <strong>transetto sinistro</strong>, il cenotafio settecentesco del duca di Montferrat. La <strong>torre campanaria</strong>, alta quasi cinquanta metri, si visita salendo a piedi una scala a chiocciola: dalla sommità, la vista abbraccia Alghero, i Bastioni e la costa fino a Capo Caccia.",
            en: "Inside, the <strong>side chapels</strong> hold paintings of the Neapolitan school (17th–18th century), a 16th-century Catalan wooden crucifix, and the fine <strong>hand-carved walnut-burl choir</strong>. The <strong>Chapel of the Sacrament</strong>, first on the right as you enter, hosts a canvas from the school of Guido Reni. In the <strong>left transept</strong>, the 18th-century cenotaph of the Duke of Montferrat. The <strong>bell tower</strong>, almost fifty metres tall, is visited by climbing a spiral staircase: from the top, the view takes in Alghero, the Bastioni and the coast as far as Capo Caccia.",
            fr: "À l'intérieur, les <strong>chapelles latérales</strong> conservent des peintures de l'école napolitaine (XVIIᵉ–XVIIIᵉ siècle), un crucifix en bois catalan du XVIᵉ siècle et le remarquable <strong>chœur en ronce de noyer</strong> sculpté à la main. La <strong>chapelle du Saint-Sacrement</strong>, première à droite en entrant, abrite une toile de l'école de Guido Reni. Dans le <strong>transept gauche</strong>, le cénotaphe du XVIIIᵉ siècle du duc de Montferrat. Le <strong>clocher</strong>, haut de près de cinquante mètres, se visite en gravissant un escalier en colimaçon : du sommet, la vue embrasse Alghero, les Bastions et la côte jusqu'à Capo Caccia.",
            de: "Im Inneren bewahren die <strong>Seitenkapellen</strong> Gemälde der neapolitanischen Schule (17.–18. Jh.), ein katalanisches Holzkruzifix aus dem 16. Jahrhundert und den kostbaren, handgeschnitzten <strong>Chor aus Nussbaummaser</strong>. Die <strong>Sakramentskapelle</strong>, erste rechts beim Eintreten, beherbergt eine Leinwand der Guido-Reni-Schule. Im <strong>linken Querschiff</strong> das Kenotaph des Herzogs von Montferrat aus dem 18. Jahrhundert. Der <strong>Glockenturm</strong> von fast fünfzig Metern Höhe wird über eine Wendeltreppe erklommen: von der Spitze reicht der Blick über Alghero, die Bastioni und die Küste bis Capo Caccia."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Orari e informazioni', en: 'Opening times and information', fr: 'Horaires et informations', de: 'Öffnungszeiten und Informationen' },
          body: {
            it: "La cattedrale è <strong>aperta tutto l'anno</strong>: 7:30–12:30 / 16:30–20:00 nei mesi estivi, orario ridotto in inverno. Ingresso libero alla navata. Il campanile si può visitare dal lunedì al sabato, 10:00–13:00 e 17:00–20:00, biglietto 3 €. In estate si tengono concerti d'organo e di musica sacra serali (mercoledì 21:00, generalmente a ingresso libero). Durante la <strong>Setmana Santa</strong> (Settimana Santa) le processioni partono e arrivano qui: è il momento più intenso dell'anno liturgico ad Alghero, assolutamente da non perdere se capitate in città in quei giorni.",
            en: "The cathedral is <strong>open all year</strong>: 7:30–12:30 / 16:30–20:00 in summer, reduced hours in winter. Free entry to the nave. The bell tower can be visited Monday to Saturday, 10:00–13:00 and 17:00–20:00, ticket €3. In summer, evening organ and sacred-music concerts are held (Wednesdays 21:00, generally free admission). During <strong>Setmana Santa</strong> (Holy Week) the processions depart from and return here: it's the most intense moment of the liturgical year in Alghero, absolutely not to be missed if you're in town those days.",
            fr: "La cathédrale est <strong>ouverte toute l'année</strong> : 7h30–12h30 / 16h30–20h00 en été, horaire réduit en hiver. Entrée libre à la nef. Le clocher se visite du lundi au samedi, 10h00–13h00 et 17h00–20h00, billet 3 €. En été se tiennent des concerts d'orgue et de musique sacrée en soirée (mercredis 21h00, généralement en entrée libre). Pendant la <strong>Setmana Santa</strong> (Semaine Sainte) les processions partent et arrivent ici : c'est le moment le plus intense de l'année liturgique à Alghero, absolument à ne pas manquer si vous êtes en ville ces jours-là.",
            de: "Die Kathedrale ist <strong>ganzjährig geöffnet</strong>: 7:30–12:30 / 16:30–20:00 Uhr im Sommer, reduzierte Zeiten im Winter. Freier Eintritt zum Hauptschiff. Der Glockenturm ist Montag bis Samstag 10:00–13:00 und 17:00–20:00 Uhr zu besichtigen, Ticket 3 €. Im Sommer finden abendliche Orgel- und geistliche Musikkonzerte statt (mittwochs 21:00 Uhr, meist mit freiem Eintritt). Während der <strong>Setmana Santa</strong> (Karwoche) starten und enden die Prozessionen hier: der intensivste Moment des liturgischen Jahres in Alghero, unbedingt zu erleben, wenn Sie in diesen Tagen vor Ort sind."
          }
        }
      ],
      links: {
        wiki: 'https://it.wikipedia.org/wiki/Cattedrale_di_Santa_Maria_(Alghero)',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Cattedrale+Alghero'
      }
    },

    {
      slug: 'grotte-di-nettuno',
      parent: 'appartamento-alghero',
      name: { it: 'Grotte di Nettuno', en: 'Neptune\'s Caves', fr: 'Grottes de Neptune', de: 'Neptungrotten' },
      subtitle: {
        it: 'Il palazzo carsico sotto Capo Caccia, a 14 km da Alghero',
        en: 'The karst palace beneath Capo Caccia, 14 km from Alghero',
        fr: 'Le palais karstique sous Capo Caccia, à 14 km d\'Alghero',
        de: 'Der Karstpalast unter Capo Caccia, 14 km von Alghero'
      },
      location: { it: 'Capo Caccia · Parco di Porto Conte', en: 'Capo Caccia · Porto Conte Park', fr: 'Capo Caccia · Parc de Porto Conte', de: 'Capo Caccia · Park Porto Conte' },
      distance: { it: '14 km — 25 min in auto', en: '14 km — 25 min by car', fr: '14 km — 25 min en voiture', de: '14 km — 25 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/grotte-di-nettuno.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Le <strong>Grotte di Nettuno</strong> sono un complesso di caverne carsiche che si sviluppa per oltre <strong>quattro chilometri</strong> sotto il promontorio di Capo Caccia, di cui 200 metri visitabili. Scoperte nel Settecento da pescatori che cercavano corallo, devono il loro nome alla spettacolare <strong>Sala Smith</strong> dove la volta si innalza di venticinque metri e stalattiti, stalagmiti e colonne creano un'architettura naturale che ricorda una cattedrale sotterranea. Il Lago Lamarmora al loro interno, uno dei più grandi laghi salati d'Europa in grotta, completa lo scenario.",
        en: "<strong>Neptune's Caves</strong> are a karst cave complex extending for over <strong>four kilometres</strong> beneath the Capo Caccia promontory, of which 200 metres are visitable. Discovered in the 18th century by fishermen searching for coral, they owe their name to the spectacular <strong>Smith Hall</strong> where the vault rises twenty-five metres and stalactites, stalagmites and columns create a natural architecture reminiscent of an underground cathedral. Inside, Lake Lamarmora — one of Europe's largest underground salt lakes — completes the scene.",
        fr: "Les <strong>Grottes de Neptune</strong> sont un complexe de cavernes karstiques qui se développent sur plus de <strong>quatre kilomètres</strong> sous le promontoire de Capo Caccia, dont 200 mètres visitables. Découvertes au XVIIIᵉ siècle par des pêcheurs cherchant le corail, elles doivent leur nom à la spectaculaire <strong>Salle Smith</strong> où la voûte s'élève à vingt-cinq mètres et où stalactites, stalagmites et colonnes créent une architecture naturelle qui rappelle une cathédrale souterraine. Le Lac Lamarmora à l'intérieur, l'un des plus grands lacs salés d'Europe en grotte, complète le décor.",
        de: "Die <strong>Neptungrotten</strong> sind ein Karsthöhlenkomplex, der sich über mehr als <strong>vier Kilometer</strong> unter dem Kap Capo Caccia erstreckt, davon 200 Meter zugänglich. Im 18. Jahrhundert von Fischern entdeckt, die nach Korallen suchten, verdanken sie ihren Namen dem spektakulären <strong>Smith-Saal</strong>, wo sich das Gewölbe fünfundzwanzig Meter hoch erhebt und Stalaktiten, Stalagmiten und Säulen eine natürliche Architektur schaffen, die an eine unterirdische Kathedrale erinnert. Der Lamarmora-See im Inneren, einer der größten unterirdischen Salzseen Europas, vervollständigt die Szenerie."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'Storia geologica e scoperta', en: 'Geological history and discovery', fr: 'Histoire géologique et découverte', de: 'Geologische Geschichte und Entdeckung' },
          body: {
            it: "Le grotte si sono formate nel corso di <strong>milioni di anni</strong> per erosione carsica del calcare di Capo Caccia. L'ingresso attuale, a livello del mare, era in passato in parte sommerso. Le prime esplorazioni documentate risalgono al XVIII secolo, quando pescatori di corallo algheresi ne segnalarono l'esistenza. La prima campagna di studi scientifici fu condotta nel 1821 dal geologo <strong>Alberto Ferrero della Marmora</strong> — da cui il lago interno prende il nome. L'apertura al pubblico avvenne nel 1955 con la costruzione della <strong>Scala del Cabirol</strong> (Escala del Cabirol in algherese, \"Scala del Capriolo\"), 656 gradini scavati nella falesia.",
            en: "The caves were formed over <strong>millions of years</strong> by karst erosion of the Capo Caccia limestone. The current entrance, at sea level, was once partly submerged. The first documented explorations date from the 18th century, when Alghero coral fishermen reported their existence. The first scientific survey was conducted in 1821 by the geologist <strong>Alberto Ferrero della Marmora</strong> — from whom the interior lake takes its name. They were opened to the public in 1955 with the construction of the <strong>Cabirol Staircase</strong> (Escala del Cabirol in Alguerese, \"Stairway of the Roe Deer\"), 656 steps cut into the cliff.",
            fr: "Les grottes se sont formées au cours de <strong>millions d'années</strong> par l'érosion karstique du calcaire de Capo Caccia. L'entrée actuelle, au niveau de la mer, était autrefois en partie submergée. Les premières explorations documentées remontent au XVIIIᵉ siècle, quand des pêcheurs de corail algueresi en signalèrent l'existence. La première campagne d'études scientifiques fut menée en 1821 par le géologue <strong>Alberto Ferrero della Marmora</strong> — dont le lac intérieur tire le nom. L'ouverture au public a eu lieu en 1955 avec la construction de l'<strong>Escalier du Cabirol</strong> (Escala del Cabirol en alguerese, « Escalier du chevreuil »), 656 marches creusées dans la falaise.",
            de: "Die Höhlen entstanden über <strong>Jahrmillionen</strong> durch Karsterosion des Kalksteins von Capo Caccia. Der heutige Eingang auf Meereshöhe war früher teilweise überflutet. Die ersten dokumentierten Erkundungen stammen aus dem 18. Jahrhundert, als algheresische Korallenfischer ihre Existenz meldeten. Die erste wissenschaftliche Untersuchungskampagne führte 1821 der Geologe <strong>Alberto Ferrero della Marmora</strong> durch — nach ihm ist der Innensee benannt. Die Öffnung für die Öffentlichkeit erfolgte 1955 mit dem Bau der <strong>Cabirol-Treppe</strong> (Escala del Cabirol auf Alguerese, „Treppe des Rehs\"), 656 in die Felswand gehauene Stufen."
          }
        },
        {
          id: 'interno',
          h2: { it: 'Cosa si vede all\'interno', en: 'What you see inside', fr: 'Ce qu\'on voit à l\'intérieur', de: 'Was man im Inneren sieht' },
          body: {
            it: "Il percorso di visita, di circa <strong>200 metri</strong> e della durata di 45 minuti, tocca tutte le sale più spettacolari. Dopo l'ingresso, si entra nel <strong>Lago Lamarmora</strong> (120 metri di lunghezza, acqua salata come il mare), si supera la colonna \"Acquasantiera\", si raggiunge la <strong>Sala della Reggia</strong> con la grande colonna alta ventidue metri, e infine la <strong>Sala Smith</strong> con le celebri \"organi di pietra\" — stalattiti affusolate che producono un suono quando toccate dal vento. I riflessi luminosi sull'acqua del lago creano effetti cromatici unici. Temperatura interna: costante 15–16 °C tutto l'anno — portate una felpa, anche d'estate.",
            en: "The <strong>200-metre</strong> tour, about 45 minutes long, takes in all the most spectacular halls. After the entrance, you enter <strong>Lake Lamarmora</strong> (120 metres long, salt water like the sea), pass the \"Holy-Water Font\" column, reach the <strong>Royal Hall</strong> with its great column twenty-two metres tall, and finally the <strong>Smith Hall</strong> with the famous \"stone organs\" — slender stalactites that produce sound when touched by the wind. Light reflections on the lake's water create unique colour effects. Interior temperature: a steady 15–16°C all year round — bring a sweatshirt, even in summer.",
            fr: "Le parcours de visite, d'environ <strong>200 mètres</strong> et d'une durée de 45 minutes, touche toutes les salles les plus spectaculaires. Après l'entrée, on pénètre dans le <strong>Lac Lamarmora</strong> (120 mètres de long, eau salée comme la mer), on franchit la colonne « Bénitier », on atteint la <strong>Salle du Palais Royal</strong> avec la grande colonne de vingt-deux mètres, et enfin la <strong>Salle Smith</strong> avec les fameux « orgues de pierre » — stalactites effilées qui produisent un son quand le vent les touche. Les reflets lumineux sur l'eau du lac créent des effets chromatiques uniques. Température intérieure : constante à 15–16 °C toute l'année — prévoyez un pull, même en été.",
            de: "Der rund <strong>200 Meter</strong> lange Rundgang dauert etwa 45 Minuten und führt durch alle spektakulärsten Säle. Nach dem Eingang betritt man den <strong>Lamarmora-See</strong> (120 Meter lang, Salzwasser wie das Meer), passiert die Säule „Weihwasserbecken\", erreicht den <strong>Königssaal</strong> mit der großen, zweiundzwanzig Meter hohen Säule und schließlich den <strong>Smith-Saal</strong> mit den berühmten „Steinorgeln\" — schlanken Stalaktiten, die einen Klang erzeugen, wenn der Wind sie streift. Die Lichtreflexe auf dem Wasser des Sees schaffen einzigartige Farbeffekte. Innentemperatur: konstant 15–16 °C das ganze Jahr über — nehmen Sie eine Jacke mit, auch im Sommer."
          }
        },
        {
          id: 'come-arrivare',
          h2: { it: 'Come arrivare: scala o barca', en: 'How to get there: stairs or boat', fr: 'Comment y aller : escalier ou bateau', de: 'Anfahrt: Treppe oder Boot' },
          body: {
            it: "Due modi di raggiungerle. <strong>In barca</strong>: partenza dal porto di Alghero, traversata di 45 minuti lungo la costa ovest, con vista spettacolare su Capo Caccia. Compagnie Linea Grotte, Navisarda, prezzo 15–20 € a/r + biglietto grotte 14 €. Ideale per chi non vuole affrontare scale e ha voglia di una mini-crociera. <strong>A piedi</strong>: dalla strada di Capo Caccia si scendono i <strong>656 gradini della Scala del Cabirol</strong> — percorso panoramico ma impegnativo, soprattutto in risalita. Parcheggio gratuito in cima. Attenzione: con mare mosso le partenze in barca vengono sospese; in caso di forte vento anche la scala viene chiusa. Prima di partire, controllate il sito <strong>grottadinettuno.it</strong>. Consigliato prenotare in alta stagione.",
            en: "Two ways to reach them. <strong>By boat</strong>: departure from Alghero harbour, 45-minute crossing along the western coast, with spectacular views of Capo Caccia. Linea Grotte and Navisarda companies, price €15–20 return + caves ticket €14. Ideal for those who don't want to face stairs and would like a mini-cruise. <strong>On foot</strong>: from the Capo Caccia road, you descend the <strong>656 Cabirol Staircase steps</strong> — a scenic but demanding route, especially on the way up. Free parking at the top. Note: with rough seas, boat departures are suspended; in strong winds, the staircase also closes. Before setting off, check the site <strong>grottadinettuno.it</strong>. Booking recommended in high season.",
            fr: "Deux manières d'y accéder. <strong>En bateau</strong> : départ du port d'Alghero, traversée de 45 minutes le long de la côte ouest, avec vue spectaculaire sur Capo Caccia. Compagnies Linea Grotte, Navisarda, prix 15–20 € a/r + billet grottes 14 €. Idéal pour qui ne veut pas affronter d'escaliers et souhaite une mini-croisière. <strong>À pied</strong> : depuis la route de Capo Caccia on descend les <strong>656 marches de l'Escalier du Cabirol</strong> — parcours panoramique mais exigeant, surtout à la montée. Stationnement gratuit au sommet. Attention : en mer agitée les départs en bateau sont suspendus ; par vent fort, l'escalier aussi est fermé. Avant de partir, vérifiez le site <strong>grottadinettuno.it</strong>. Réservation recommandée en haute saison.",
            de: "Zwei Wege führen hin. <strong>Mit dem Boot</strong>: Abfahrt vom Hafen Alghero, 45-minütige Überfahrt entlang der Westküste mit spektakulärem Blick auf Capo Caccia. Anbieter Linea Grotte, Navisarda, Preis 15–20 € hin und zurück + Grotteneintritt 14 €. Ideal für alle, die keine Treppen steigen möchten und Lust auf eine Mini-Kreuzfahrt haben. <strong>Zu Fuß</strong>: von der Capo-Caccia-Straße steigt man die <strong>656 Stufen der Cabirol-Treppe</strong> hinunter — landschaftlich reizvoll, aber anspruchsvoll, besonders beim Aufstieg. Kostenloser Parkplatz oben. Hinweis: Bei rauer See werden die Bootsabfahrten ausgesetzt; bei starkem Wind schließt auch die Treppe. Vor der Anreise die Website <strong>grottadinettuno.it</strong> prüfen. Buchung in der Hochsaison empfohlen."
          }
        }
      ],
      links: {
        official: 'https://grottadinettuno.it/',
        wiki: 'https://it.wikipedia.org/wiki/Grotte_di_Nettuno',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Grotte+di+Nettuno'
      }
    },

    {
      slug: 'capo-caccia',
      parent: 'appartamento-alghero',
      name: { it: 'Capo Caccia', en: 'Capo Caccia', fr: 'Capo Caccia', de: 'Capo Caccia' },
      subtitle: {
        it: 'Il promontorio più spettacolare della Sardegna nord-occidentale',
        en: 'The most spectacular promontory in north-west Sardinia',
        fr: 'Le promontoire le plus spectaculaire du nord-ouest de la Sardaigne',
        de: 'Das spektakulärste Kap Nordwestsardiniens'
      },
      location: { it: 'Parco di Porto Conte · Riviera del Corallo', en: 'Porto Conte Park · Coral Riviera', fr: 'Parc de Porto Conte · Riviera du Corail', de: 'Park Porto Conte · Korallenriviera' },
      distance: { it: '15 km — 25 min in auto', en: '15 km — 25 min by car', fr: '15 km — 25 min en voiture', de: '15 km — 25 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/capo-caccia.jpg',
      heroFocus: 'center center',
      intro: {
        it: "<strong>Capo Caccia</strong> è un imponente promontorio di calcare bianco a strapiombo sul mare per <strong>168 metri</strong>, uno dei paesaggi più iconici della Sardegna. Deve il suo nome (\"capo della caccia\") alla pratica medievale della falconeria, che si svolgeva proprio qui. Oggi la zona è area marina protetta e parte del Parco Regionale di Porto Conte, con un ecosistema di grande valore: il nido del grifone sardo (reintrodotto negli anni Ottanta), il falco pellegrino, una flora mediterranea intatta. Un viaggio di venticinque minuti dall'appartamento permette di raggiungere uno dei punti panoramici più fotografati del Mediterraneo.",
        en: "<strong>Capo Caccia</strong> is an imposing white limestone promontory plunging <strong>168 metres</strong> sheer into the sea, one of Sardinia's most iconic landscapes. It owes its name (\"Hunting Cape\") to the medieval practice of falconry, held right here. Today the area is a marine protected area and part of the Porto Conte Regional Park, with an ecosystem of great value: the nest of the Sardinian griffon vulture (reintroduced in the 1980s), the peregrine falcon, intact Mediterranean flora. A twenty-five-minute trip from the apartment takes you to one of the most photographed panoramic points in the Mediterranean.",
        fr: "<strong>Capo Caccia</strong> est un imposant promontoire de calcaire blanc à pic sur la mer de <strong>168 mètres</strong>, l'un des paysages les plus emblématiques de Sardaigne. Il doit son nom (« cap de la chasse ») à la pratique médiévale de la fauconnerie qui s'y déroulait. Aujourd'hui la zone est aire marine protégée et fait partie du Parc Régional de Porto Conte, avec un écosystème de grande valeur : le nid du vautour fauve sarde (réintroduit dans les années 1980), le faucon pèlerin, une flore méditerranéenne intacte. Un voyage de vingt-cinq minutes depuis l'appartement permet d'atteindre l'un des points panoramiques les plus photographiés de Méditerranée.",
        de: "<strong>Capo Caccia</strong> ist ein imposantes weißes Kalksteinkap, das <strong>168 Meter</strong> senkrecht ins Meer abfällt, eine der ikonischsten Landschaften Sardiniens. Seinen Namen („Jagdkap\") verdankt es der mittelalterlichen Falknerei, die genau hier ausgeübt wurde. Heute ist das Gebiet Meeresschutzgebiet und Teil des Regionalparks Porto Conte, mit einem wertvollen Ökosystem: Hier nistet der sardische Gänsegeier (in den 1980er Jahren wieder angesiedelt), der Wanderfalke, eine unberührte Mittelmeerflora. Eine fünfundzwanzigminütige Fahrt von der Wohnung bringt Sie zu einem der meistfotografierten Panoramapunkte des Mittelmeerraums."
      },
      sections: [
        {
          id: 'promontorio',
          h2: { it: 'Il promontorio e le falesie', en: 'The promontory and the cliffs', fr: 'Le promontoire et les falaises', de: 'Das Kap und die Steilwände' },
          body: {
            it: "La <strong>falesia di Capo Caccia</strong> è una muraglia di calcare bianco lunga quattro chilometri che scende verticalmente nel mare. Dal piazzale panoramico in alto — accessibile in auto — lo sguardo si apre sul Golfo di Alghero, sull'<strong>Isola Piana</strong> (piccolo isolotto davanti al capo), sulle <strong>Grotte dei Ricami</strong> e sulla direzione verso l'Asinara nelle giornate più limpide. È il punto di partenza della Scala del Cabirol che scende alle Grotte di Nettuno (vedi scheda dedicata). Nelle falesie nidificano <strong>circa venti coppie di grifoni sardi</strong>, rapaci dall'apertura alare di due metri e mezzo: li si vede volteggiare soprattutto al mattino, quando le correnti ascensionali si alzano contro la roccia.",
            en: "The <strong>Capo Caccia cliff</strong> is a white-limestone wall four kilometres long dropping vertically into the sea. From the panoramic belvedere at the top — reachable by car — the view opens over the Gulf of Alghero, <strong>Isola Piana</strong> (small islet in front of the cape), the <strong>Ricami Caves</strong> and, on clearest days, as far as Asinara. It's the starting point of the Cabirol Staircase descending to Neptune's Caves (see dedicated entry). Some <strong>twenty pairs of Sardinian griffon vultures</strong> nest in the cliffs, raptors with a two-and-a-half-metre wingspan: you see them circling mainly in the morning, when thermals rise against the rock.",
            fr: "La <strong>falaise de Capo Caccia</strong> est un mur de calcaire blanc long de quatre kilomètres qui plonge verticalement dans la mer. Depuis le belvédère panoramique au sommet — accessible en voiture — la vue s'ouvre sur le Golfe d'Alghero, sur l'<strong>Isola Piana</strong> (petit îlot face au cap), sur les <strong>Grottes des Broderies</strong> et, par temps clair, jusqu'en direction de l'Asinara. C'est le point de départ de l'Escalier du Cabirol qui descend aux Grottes de Neptune (voir fiche dédiée). Dans les falaises nichent <strong>une vingtaine de couples de vautours fauves sardes</strong>, rapaces à l'envergure de deux mètres et demi : on les voit planer surtout le matin, quand les courants ascendants s'élèvent contre la roche.",
            de: "Die <strong>Steilwand von Capo Caccia</strong> ist eine vier Kilometer lange weiße Kalksteinmauer, die senkrecht ins Meer abfällt. Vom Panorama-Parkplatz oben — mit dem Auto erreichbar — öffnet sich der Blick auf den Golf von Alghero, auf <strong>Isola Piana</strong> (kleine vorgelagerte Insel), auf die <strong>Ricami-Grotten</strong> und an klarsten Tagen bis in Richtung Asinara. Es ist der Ausgangspunkt der Cabirol-Treppe zu den Neptungrotten (siehe eigenen Eintrag). In den Wänden nisten <strong>rund zwanzig Paare sardischer Gänsegeier</strong>, Greifvögel mit zweieinhalb Metern Flügelspannweite: Man sieht sie vor allem morgens kreisen, wenn die Aufwinde am Fels aufsteigen."
          }
        },
        {
          id: 'cosa-fare',
          h2: { it: 'Cosa fare a Capo Caccia', en: 'What to do at Capo Caccia', fr: 'Que faire à Capo Caccia', de: 'Was man an Capo Caccia unternehmen kann' },
          body: {
            it: "Oltre alla vista dal piazzale, meritano i <strong>sentieri di trekking</strong> dentro il parco — il più bello parte dal faro di Capo Caccia (punta estrema) e attraversa la macchia mediterranea verso la costa; percorribile in circa due ore, con viste ogni pochi metri. Per chi ama il <strong>birdwatching</strong>, mattino presto è il momento dei grifoni e dei falchi pellegrini (binocolo indispensabile). Al tramonto, il piazzale si riempie di spettatori: la luce radente sul promontorio e la silhouette dell'Isola Piana stagliata contro il sole che scende creano una delle scene più fotografate di Sardegna. Portate una giacca leggera: il vento sul capo può essere forte anche nelle giornate calde.",
            en: "Besides the view from the belvedere, the <strong>trekking trails</strong> inside the park are worth it — the finest starts from the Capo Caccia lighthouse (the outermost point) and crosses the Mediterranean scrub towards the coast; doable in about two hours, with views every few metres. For <strong>birdwatchers</strong>, early morning is the time for griffons and peregrine falcons (binoculars essential). At sunset, the belvedere fills with spectators: the raking light on the promontory and the silhouette of Isola Piana against the setting sun create one of Sardinia's most photographed scenes. Bring a light jacket: the wind on the cape can be strong even on warm days.",
            fr: "Outre la vue depuis le belvédère, les <strong>sentiers de trekking</strong> dans le parc méritent — le plus beau part du phare de Capo Caccia (pointe extrême) et traverse le maquis méditerranéen vers la côte ; faisable en deux heures, avec des vues tous les quelques mètres. Pour les amateurs de <strong>birdwatching</strong>, tôt le matin c'est le moment des vautours et faucons pèlerins (jumelles indispensables). Au coucher du soleil, le belvédère se remplit de spectateurs : la lumière rasante sur le promontoire et la silhouette de l'Isola Piana découpée sur le soleil couchant créent l'une des scènes les plus photographiées de Sardaigne. Emportez une veste légère : le vent sur le cap peut être fort même par temps chaud.",
            de: "Neben dem Blick vom Aussichtspunkt lohnen die <strong>Wanderwege</strong> im Park — der schönste startet am Leuchtturm von Capo Caccia (äußerste Spitze) und durchquert die Mittelmeermacchia in Richtung Küste; in rund zwei Stunden zu schaffen, mit Ausblicken alle paar Meter. Für <strong>Birdwatcher</strong> ist der frühe Morgen die Zeit für Geier und Wanderfalken (Fernglas unerlässlich). Bei Sonnenuntergang füllt sich der Panoramaplatz mit Zuschauern: das streifende Licht auf dem Kap und die Silhouette der Isola Piana vor der sinkenden Sonne schaffen eine der meistfotografierten Szenen Sardiniens. Leichte Jacke mitbringen: der Wind am Kap kann auch an warmen Tagen stark sein."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Come arrivare e informazioni', en: 'How to get there and information', fr: 'Comment y arriver et informations', de: 'Anfahrt und Informationen' },
          body: {
            it: "Da Alghero, in auto, percorrere la SP55 direzione Porto Conte e poi proseguire sulla strada panoramica di Capo Caccia — il percorso è molto suggestivo, con curve che svelano via via la costa. Il <strong>parcheggio alla sommità</strong> è gratuito ma piccolo: nelle ore di punta si riempie rapidamente, meglio arrivare entro le 10:00 o nel tardo pomeriggio. Non ci sono bar o chioschi sul posto, solo il faro (non visitabile). Portate acqua e snack. Nessun servizio di bus pubblico diretto; alcuni tour operator di Alghero organizzano escursioni combinate Capo Caccia + Grotte di Nettuno + Mugoni.",
            en: "From Alghero, by car, take the SP55 towards Porto Conte and continue on the scenic Capo Caccia road — a very suggestive route with curves that gradually reveal the coast. <strong>Parking at the top</strong> is free but small: at peak times it fills up quickly, better to arrive by 10:00 or in the late afternoon. There are no bars or kiosks on site, only the lighthouse (not open to visitors). Bring water and snacks. No direct public bus service; some Alghero tour operators run combined excursions Capo Caccia + Neptune's Caves + Mugoni.",
            fr: "D'Alghero, en voiture, emprunter la SP55 direction Porto Conte puis continuer sur la route panoramique de Capo Caccia — parcours très suggestif, avec des virages qui dévoilent peu à peu la côte. Le <strong>parking au sommet</strong> est gratuit mais petit : aux heures de pointe il se remplit vite, mieux vaut arriver avant 10h00 ou en fin d'après-midi. Aucun bar ni kiosque sur place, seulement le phare (non visitable). Emportez eau et en-cas. Aucun bus public direct ; certains tour-opérateurs d'Alghero organisent des excursions combinées Capo Caccia + Grottes de Neptune + Mugoni.",
            de: "Von Alghero mit dem Auto die SP55 Richtung Porto Conte und weiter auf der Panoramastraße nach Capo Caccia — eine sehr eindrucksvolle Route mit Kurven, die nach und nach die Küste freigeben. Der <strong>Parkplatz am Gipfel</strong> ist kostenlos, aber klein: zu Stoßzeiten füllt er sich rasch, besser bis 10:00 Uhr oder am späten Nachmittag kommen. Vor Ort gibt es keine Bars oder Kioske, nur den Leuchtturm (nicht zu besichtigen). Wasser und Snacks mitbringen. Kein direkter öffentlicher Busdienst; einige Alghero-Reiseveranstalter organisieren kombinierte Ausflüge Capo Caccia + Neptungrotten + Mugoni."
          }
        }
      ],
      links: {
        official: 'https://www.sardegnaturismo.it/it/esplora/capo-caccia-isola-piana',
        wiki: 'https://it.wikipedia.org/wiki/Capo_Caccia',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Capo+Caccia'
      }
    },

    {
      slug: 'nuraghe-palmavera',
      parent: 'appartamento-alghero',
      name: { it: 'Nuraghe Palmavera', en: 'Nuraghe Palmavera', fr: 'Nuraghe Palmavera', de: 'Nuraghe Palmavera' },
      subtitle: {
        it: 'Il villaggio nuragico del Bronzo Medio, a dieci chilometri da Alghero',
        en: 'The Middle Bronze Age Nuragic village, ten kilometres from Alghero',
        fr: 'Le village nuragique du Bronze Moyen, à dix kilomètres d\'Alghero',
        de: 'Das nuragische Dorf der mittleren Bronzezeit, zehn Kilometer von Alghero'
      },
      location: { it: 'Fertilia · Parco di Porto Conte', en: 'Fertilia · Porto Conte Park', fr: 'Fertilia · Parc de Porto Conte', de: 'Fertilia · Park Porto Conte' },
      distance: { it: '10 km — 15 min in auto', en: '10 km — 15 min by car', fr: '10 km — 15 min en voiture', de: '10 km — 15 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/nuraghe-palmavera.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Il <strong>Nuraghe Palmavera</strong> è uno dei complessi nuragici meglio conservati della Sardegna nord-occidentale e la porta di accesso ideale alla civiltà dei <strong>nuraghi</strong> — le torri megalitiche costruite in Sardegna tra il 1800 e il 900 a.C. Situato fra Alghero e Fertilia, il sito comprende una <strong>torre centrale</strong> alta originariamente sei metri, un bastione con torri secondarie, e un <strong>villaggio di una cinquantina di capanne</strong> che si estende intorno alla fortificazione. Una visita di un'ora racconta 3.500 anni di storia.",
        en: "<strong>Nuraghe Palmavera</strong> is one of the best-preserved Nuragic complexes in north-west Sardinia and the ideal gateway to the <strong>Nuragic civilisation</strong> — the megalithic towers built in Sardinia between 1800 and 900 BC. Located between Alghero and Fertilia, the site includes a <strong>central tower</strong> originally six metres tall, a bastion with secondary towers, and a <strong>village of about fifty huts</strong> spreading around the fortification. An hour-long visit tells 3,500 years of history.",
        fr: "Le <strong>Nuraghe Palmavera</strong> est l'un des complexes nuragiques les mieux conservés du nord-ouest de la Sardaigne et la porte d'accès idéale à la civilisation des <strong>nuraghi</strong> — tours mégalithiques construites en Sardaigne entre 1800 et 900 av. J.-C. Situé entre Alghero et Fertilia, le site comprend une <strong>tour centrale</strong> haute à l'origine de six mètres, un bastion avec tours secondaires, et un <strong>village d'une cinquantaine de huttes</strong> qui s'étend autour de la fortification. Une visite d'une heure raconte 3 500 ans d'histoire.",
        de: "Der <strong>Nuraghe Palmavera</strong> ist einer der besterhaltenen nuragischen Komplexe im Nordwesten Sardiniens und der ideale Zugang zur <strong>Nuraghenkultur</strong> — den Megalithtürmen, die in Sardinien zwischen 1800 und 900 v. Chr. errichtet wurden. Zwischen Alghero und Fertilia gelegen, umfasst die Anlage einen <strong>zentralen Turm</strong> von ursprünglich sechs Metern Höhe, eine Bastion mit Nebentürmen und ein <strong>Dorf von rund fünfzig Hütten</strong>, das sich um die Festung ausbreitet. Ein einstündiger Besuch erzählt 3.500 Jahre Geschichte."
      },
      sections: [
        {
          id: 'civilta',
          h2: { it: 'La civiltà nuragica', en: 'The Nuragic civilisation', fr: 'La civilisation nuragique', de: 'Die Nuraghenkultur' },
          body: {
            it: "La <strong>civiltà nuragica</strong> è la più antica e caratteristica identità della Sardegna: nasce intorno al 1800 a.C. (Bronzo Medio) e continua fino al 900 a.C. circa, lasciando sull'isola oltre <strong>settemila nuraghi</strong>. Queste costruzioni in pietra a secco — torri tronco-coniche con falsa volta interna — avevano funzioni difensive, residenziali e cerimoniali, al centro di villaggi agro-pastorali. I sardi nuragici erano metallurghi sofisticati (produssero migliaia di bronzetti votivi), costruttori capaci, e commercianti in contatto con Fenici, Micenei e popolazioni italiche. Palmavera è un esempio di nuraghe \"complesso\" — con torre centrale e bastione — della fase matura della cultura.",
            en: "The <strong>Nuragic civilisation</strong> is Sardinia's oldest and most characteristic identity: it emerges around 1800 BC (Middle Bronze Age) and continues until about 900 BC, leaving over <strong>seven thousand nuraghi</strong> on the island. These dry-stone buildings — truncated-cone towers with an internal false vault — had defensive, residential and ceremonial functions at the centre of agro-pastoral villages. The Nuragic Sardinians were sophisticated metalworkers (they produced thousands of votive bronzes), skilled builders, and traders in contact with Phoenicians, Mycenaeans and Italic peoples. Palmavera is an example of a \"complex\" nuraghe — with a central tower and bastion — from the mature phase of the culture.",
            fr: "La <strong>civilisation nuragique</strong> est l'identité la plus ancienne et caractéristique de la Sardaigne : elle naît vers 1800 av. J.-C. (Bronze Moyen) et se poursuit jusqu'à environ 900 av. J.-C., laissant sur l'île plus de <strong>sept mille nuraghi</strong>. Ces constructions en pierre sèche — tours tronconiques à fausse voûte intérieure — avaient des fonctions défensives, résidentielles et cérémonielles, au centre de villages agro-pastoraux. Les Sardes nuragiques étaient des métallurgistes sophistiqués (ils ont produit des milliers de bronzetti votifs), des constructeurs habiles, et des commerçants en contact avec Phéniciens, Mycéniens et populations italiques. Palmavera est un exemple de nuraghe « complexe » — avec tour centrale et bastion — de la phase mature de la culture.",
            de: "Die <strong>Nuraghenkultur</strong> ist Sardiniens älteste und charakteristischste Identität: Sie entsteht um 1800 v. Chr. (mittlere Bronzezeit) und dauert bis etwa 900 v. Chr., wobei sie der Insel über <strong>siebentausend Nuraghen</strong> hinterließ. Diese Trockensteinbauten — kegelstumpfförmige Türme mit innerem Falschgewölbe — hatten defensive, residenzielle und zeremonielle Funktionen im Zentrum agrarischer Dörfer. Die nuragischen Sarden waren raffinierte Metallhandwerker (sie schufen Tausende von Votivbronzen), geschickte Baumeister und Händler mit Kontakten zu Phöniziern, Mykenern und italischen Völkern. Palmavera ist ein Beispiel eines „komplexen\" Nuraghen — mit Zentralturm und Bastion — aus der reifen Phase der Kultur."
          }
        },
        {
          id: 'sito',
          h2: { it: 'Cosa si vede al sito', en: 'What you see at the site', fr: 'Ce qu\'on voit sur le site', de: 'Was man an der Stätte sieht' },
          body: {
            it: "Il <strong>nuraghe centrale</strong>, originariamente alto otto metri, conserva la <strong>tholos</strong> (volta a falsa cupola) perfettamente integra — entrare è come aprire una cassaforte preistorica. Intorno, un <strong>bastione</strong> con due torri secondarie e un cortile interno. Il villaggio circostante, con capanne circolari, si articola su più livelli. Il pezzo più suggestivo è la <strong>Capanna delle Riunioni</strong>: un ambiente cerimoniale ampio con sedili in pietra attorno a un pozzetto centrale e un <strong>modellino in pietra di nuraghe</strong> trovato sul posto, oggi conservato nel museo didattico del sito. Le attività nuragiche — agricoltura, pastorizia, lavorazione dei metalli — sono raccontate con pannelli illustrativi chiari.",
            en: "The <strong>central nuraghe</strong>, originally eight metres tall, preserves the <strong>tholos</strong> (false-dome vault) perfectly intact — entering it is like opening a prehistoric safe. Around it, a <strong>bastion</strong> with two secondary towers and an internal courtyard. The surrounding village, with circular huts, spreads over several levels. The most striking piece is the <strong>Meeting Hut</strong>: a large ceremonial room with stone seats around a central well and a <strong>stone model of a nuraghe</strong> found on site, now kept in the site's educational museum. Nuragic activities — farming, herding, metalworking — are told through clear interpretive panels.",
            fr: "Le <strong>nuraghe central</strong>, haut à l'origine de huit mètres, conserve la <strong>tholos</strong> (voûte en fausse coupole) parfaitement intacte — y entrer, c'est comme ouvrir un coffre-fort préhistorique. Autour, un <strong>bastion</strong> avec deux tours secondaires et une cour intérieure. Le village voisin, avec ses huttes circulaires, s'articule sur plusieurs niveaux. La pièce la plus marquante est la <strong>Hutte des Réunions</strong> : une grande salle cérémonielle avec sièges en pierre autour d'un puits central et un <strong>modèle en pierre de nuraghe</strong> trouvé sur place, aujourd'hui conservé dans le musée didactique du site. Les activités nuragiques — agriculture, élevage, métallurgie — sont racontées par des panneaux explicatifs clairs.",
            de: "Der <strong>zentrale Nuraghe</strong>, ursprünglich acht Meter hoch, bewahrt die <strong>Tholos</strong> (Falschkuppelgewölbe) vollkommen intakt — das Betreten ist wie das Öffnen eines prähistorischen Tresors. Ringsum eine <strong>Bastion</strong> mit zwei Nebentürmen und einem Innenhof. Das umliegende Dorf mit runden Hütten erstreckt sich über mehrere Ebenen. Das eindrucksvollste Stück ist die <strong>Versammlungshütte</strong>: ein großer zeremonieller Raum mit Steinbänken um einen zentralen Brunnen und ein <strong>steinernes Nuraghenmodell</strong>, das vor Ort gefunden wurde und heute im Lehrmuseum der Stätte aufbewahrt wird. Die nuragischen Tätigkeiten — Landwirtschaft, Viehzucht, Metallverarbeitung — werden auf klaren Schautafeln erläutert."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Orari e visita', en: 'Opening times and visit', fr: 'Horaires et visite', de: 'Öffnungszeiten und Besuch' },
          body: {
            it: "Il sito è <strong>aperto tutti i giorni</strong>: aprile–settembre 10:00–19:00, ottobre–marzo 10:00–14:00. Biglietto <strong>5 € intero, 3,50 € ridotto</strong>; gratuito sotto i 7 anni. Audio-guide in quattro lingue incluse nel biglietto. La visita dura circa un'ora ed è adatta a tutti — anche bambini (molto attratti dal mistero dei nuraghi). Consiglio: abbinare la visita a una mattinata alla spiaggia di Mugoni, che è a due chilometri. Per chi vuole approfondire, a Sassari il <strong>Museo Archeologico Nazionale \"G. A. Sanna\"</strong> conserva i reperti più importanti trovati a Palmavera.",
            en: "The site is <strong>open every day</strong>: April–September 10:00–19:00, October–March 10:00–14:00. Ticket <strong>€5 full, €3.50 reduced</strong>; free under 7. Audio guides in four languages included in the ticket. The visit takes about an hour and is suitable for everyone — children included (who are very drawn to the mystery of the nuraghi). Tip: pair the visit with a morning at Mugoni beach, two kilometres away. For those who want to dig deeper, the <strong>G. A. Sanna National Archaeological Museum</strong> in Sassari holds the most important finds from Palmavera.",
            fr: "Le site est <strong>ouvert tous les jours</strong> : avril–septembre 10h00–19h00, octobre–mars 10h00–14h00. Billet <strong>5 € plein, 3,50 € réduit</strong> ; gratuit pour les moins de 7 ans. Audioguides en quatre langues inclus dans le billet. La visite dure environ une heure et convient à tous — enfants compris (très attirés par le mystère des nuraghi). Conseil : associer la visite à une matinée à la plage de Mugoni, à deux kilomètres. Pour approfondir, à Sassari le <strong>Musée Archéologique National \"G. A. Sanna\"</strong> conserve les trouvailles les plus importantes de Palmavera.",
            de: "Die Stätte ist <strong>täglich geöffnet</strong>: April–September 10:00–19:00 Uhr, Oktober–März 10:00–14:00 Uhr. Ticket <strong>5 € Vollpreis, 3,50 € ermäßigt</strong>; frei unter 7 Jahren. Audioguides in vier Sprachen im Ticket enthalten. Der Besuch dauert rund eine Stunde und ist für alle geeignet — auch für Kinder (die das Geheimnis der Nuraghen besonders fasziniert). Tipp: den Besuch mit einem Vormittag am Strand Mugoni kombinieren, zwei Kilometer entfernt. Wer mehr wissen will: in Sassari bewahrt das <strong>Archäologische Nationalmuseum „G. A. Sanna\"</strong> die wichtigsten Funde aus Palmavera."
          }
        }
      ],
      links: {
        official: 'https://nuraghepalmavera.it/',
        wiki: 'https://it.wikipedia.org/wiki/Nuraghe_Palmavera',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Nuraghe+Palmavera'
      }
    },

    {
      slug: 'parco-porto-conte',
      parent: 'appartamento-alghero',
      name: { it: 'Parco Regionale di Porto Conte', en: 'Porto Conte Regional Park', fr: 'Parc Régional de Porto Conte', de: 'Regionalpark Porto Conte' },
      subtitle: {
        it: 'Natura protetta fra Capo Caccia e la baia delle ninfe',
        en: 'Protected nature between Capo Caccia and the bay of the nymphs',
        fr: 'Nature protégée entre Capo Caccia et la baie des nymphes',
        de: 'Geschützte Natur zwischen Capo Caccia und der Nymphenbucht'
      },
      location: { it: 'Alghero–Fertilia · Riviera del Corallo', en: 'Alghero–Fertilia · Coral Riviera', fr: 'Alghero–Fertilia · Riviera du Corail', de: 'Alghero–Fertilia · Korallenriviera' },
      distance: { it: '12 km — 20 min in auto', en: '12 km — 20 min by car', fr: '12 km — 20 min en voiture', de: '12 km — 20 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/parco-porto-conte.jpg',
      heroFocus: 'center center',
      intro: {
        it: "Il <strong>Parco Regionale di Porto Conte</strong>, istituito nel 1999, tutela <strong>5.200 ettari</strong> di territorio fra la Baia di Porto Conte, Capo Caccia, Punta Giglio e i calcarei colli dell'entroterra. L'area è una delle più ricche dal punto di vista ecologico della Sardegna: macchia mediterranea intatta, falesie a picco, pinete storiche, grotte carsiche e un tratto di mare protetto — l'<strong>Area Marina Protetta Capo Caccia-Isola Piana</strong> — che conserva fondali di posidonia fra i più estesi del Mediterraneo. Ospita mufloni, cinghiali, falchi pellegrini, grifoni sardi e oltre un centinaio di specie di uccelli.",
        en: "The <strong>Porto Conte Regional Park</strong>, established in 1999, protects <strong>5,200 hectares</strong> of land between Porto Conte bay, Capo Caccia, Punta Giglio and the limestone hills of the interior. The area is one of the ecologically richest in Sardinia: intact Mediterranean scrub, sheer cliffs, historic pine forests, karst caves and a stretch of protected sea — the <strong>Capo Caccia-Isola Piana Marine Protected Area</strong> — which preserves some of the most extensive Posidonia meadows in the Mediterranean. It hosts mouflons, wild boar, peregrine falcons, Sardinian griffon vultures and over a hundred bird species.",
        fr: "Le <strong>Parc Régional de Porto Conte</strong>, institué en 1999, protège <strong>5 200 hectares</strong> de territoire entre la Baie de Porto Conte, Capo Caccia, Punta Giglio et les collines calcaires de l'arrière-pays. La zone est l'une des plus riches écologiquement de Sardaigne : maquis méditerranéen intact, falaises à pic, pinèdes historiques, grottes karstiques et un tronçon de mer protégée — l'<strong>Aire Marine Protégée Capo Caccia-Isola Piana</strong> — qui conserve des fonds de posidonie parmi les plus étendus de Méditerranée. Elle abrite mouflons, sangliers, faucons pèlerins, vautours fauves sardes et plus d'une centaine d'espèces d'oiseaux.",
        de: "Der <strong>Regionalpark Porto Conte</strong>, 1999 eingerichtet, schützt <strong>5.200 Hektar</strong> Land zwischen der Bucht von Porto Conte, Capo Caccia, Punta Giglio und den Kalksteinhügeln des Hinterlands. Das Gebiet gehört zu den ökologisch reichsten Sardiniens: unberührte Mittelmeermacchia, senkrechte Klippen, historische Pinienwälder, Karsthöhlen und ein geschützter Meeresabschnitt — das <strong>Meeresschutzgebiet Capo Caccia-Isola Piana</strong> — das einige der ausgedehntesten Posidonia-Wiesen des Mittelmeers bewahrt. Er beherbergt Mufflons, Wildschweine, Wanderfalken, sardische Gänsegeier und über hundert Vogelarten."
      },
      sections: [
        {
          id: 'ecosistema',
          h2: { it: 'Il parco e il suo ecosistema', en: 'The park and its ecosystem', fr: 'Le parc et son écosystème', de: 'Der Park und sein Ökosystem' },
          body: {
            it: "Il parco è diviso in quattro zone: la <strong>penisola di Capo Caccia</strong> con le sue falesie e il santuario dei grifoni; la <strong>Baia di Porto Conte</strong> con le sue spiagge e la pineta di Mugoni; il promontorio di <strong>Punta Giglio</strong> con i resti della base militare della Seconda Guerra Mondiale trasformati in rifugio; l'area interna dei <strong>colli di Monte Timidone</strong> con la foresta di Prigionette, dove sono stati reintrodotti cervi e cavalli sardi. L'ecosistema ospita specie endemiche come il <strong>geotritone di Monte Albo</strong>, il <strong>discoglosso sardo</strong> (anfibio unico all'isola), e il <strong>muflone sardo</strong>, simbolo del parco.",
            en: "The park is divided into four zones: the <strong>Capo Caccia peninsula</strong> with its cliffs and griffon-vulture sanctuary; the <strong>Porto Conte bay</strong> with its beaches and the Mugoni pine forest; the <strong>Punta Giglio</strong> promontory with the remains of a WWII military base transformed into a refuge; the inland area of the <strong>Monte Timidone hills</strong> with the Prigionette forest, where Sardinian deer and horses have been reintroduced. The ecosystem hosts endemic species like the <strong>Monte Albo cave salamander</strong>, the <strong>Sardinian discoglossus</strong> (an amphibian found only on the island), and the <strong>Sardinian mouflon</strong>, the park's symbol.",
            fr: "Le parc se divise en quatre zones : la <strong>péninsule de Capo Caccia</strong> avec ses falaises et le sanctuaire des vautours ; la <strong>Baie de Porto Conte</strong> avec ses plages et la pinède de Mugoni ; le promontoire de <strong>Punta Giglio</strong> avec les vestiges de la base militaire de la Seconde Guerre mondiale transformés en refuge ; la zone intérieure des <strong>collines de Monte Timidone</strong> avec la forêt de Prigionette, où des cerfs et chevaux sardes ont été réintroduits. L'écosystème abrite des espèces endémiques comme la <strong>salamandre noire de Monte Albo</strong>, le <strong>discoglosse sarde</strong> (amphibien unique à l'île), et le <strong>mouflon sarde</strong>, symbole du parc.",
            de: "Der Park gliedert sich in vier Zonen: die <strong>Halbinsel Capo Caccia</strong> mit ihren Klippen und dem Gänsegeier-Heiligtum; die <strong>Bucht von Porto Conte</strong> mit ihren Stränden und dem Pinienwald von Mugoni; das Kap <strong>Punta Giglio</strong> mit den in ein Refugium verwandelten Überresten der Militärbasis aus dem Zweiten Weltkrieg; das Binnengebiet der <strong>Monte-Timidone-Hügel</strong> mit dem Wald von Prigionette, wo sardische Hirsche und Pferde wieder angesiedelt wurden. Das Ökosystem beherbergt endemische Arten wie den <strong>Höhlensalamander vom Monte Albo</strong>, den <strong>sardischen Scheibenzüngler</strong> (eine nur auf der Insel vorkommende Amphibie) und den <strong>sardischen Mufflon</strong>, Symbol des Parks."
          }
        },
        {
          id: 'attivita',
          h2: { it: 'Sentieri e attività', en: 'Trails and activities', fr: 'Sentiers et activités', de: 'Wege und Aktivitäten' },
          body: {
            it: "Il parco è attraversato da una rete di <strong>quattordici sentieri</strong> di diversa difficoltà, dal facile al impegnativo, segnalati e descritti sul sito algheroparks.it. Due dei più belli: il <strong>Sentiero dei Grifoni</strong> a Capo Caccia (3 km, facile, osservatorio dei rapaci), e il <strong>Sentiero di Punta Giglio</strong> (5 km, medio, ex batteria antiaerea e punti panoramici sulla baia). Oltre al trekking, si può percorrere il parco in <strong>mountain bike</strong> (noleggio presso le strutture del parco) o a <strong>cavallo</strong> (centro ippico a Tramariglio). Birdwatching con guida specializzata nei mesi da ottobre ad aprile, quando gli uccelli migratori popolano gli stagni costieri.",
            en: "The park is crossed by a network of <strong>fourteen trails</strong> of varying difficulty, from easy to challenging, marked and described on the algheroparks.it website. Two of the best: the <strong>Griffons' Trail</strong> at Capo Caccia (3 km, easy, raptor observatory), and the <strong>Punta Giglio Trail</strong> (5 km, medium, former anti-aircraft battery and panoramic points over the bay). Beyond trekking, you can cross the park by <strong>mountain bike</strong> (rental at park facilities) or on <strong>horseback</strong> (riding centre at Tramariglio). Guided birdwatching in the months from October to April, when migratory birds populate the coastal wetlands.",
            fr: "Le parc est traversé par un réseau de <strong>quatorze sentiers</strong> de difficulté variée, du facile à l'exigeant, balisés et décrits sur le site algheroparks.it. Deux des plus beaux : le <strong>Sentier des Vautours</strong> à Capo Caccia (3 km, facile, observatoire des rapaces), et le <strong>Sentier de Punta Giglio</strong> (5 km, moyen, ancienne batterie antiaérienne et points panoramiques sur la baie). Outre le trekking, on peut parcourir le parc en <strong>VTT</strong> (location auprès des structures du parc) ou à <strong>cheval</strong> (centre équestre à Tramariglio). Birdwatching avec guide spécialisé les mois d'octobre à avril, quand les oiseaux migrateurs peuplent les étangs côtiers.",
            de: "Der Park wird von einem Netz aus <strong>vierzehn Wegen</strong> unterschiedlicher Schwierigkeit durchzogen, von leicht bis anspruchsvoll, markiert und beschrieben auf der Seite algheroparks.it. Zwei der schönsten: der <strong>Geierpfad</strong> an Capo Caccia (3 km, leicht, Greifvogel-Beobachtungspunkt) und der <strong>Pfad von Punta Giglio</strong> (5 km, mittel, ehemalige Flakbatterie und Panoramapunkte über der Bucht). Neben dem Wandern kann man den Park mit dem <strong>Mountainbike</strong> (Verleih in den Parkanlagen) oder zu <strong>Pferd</strong> (Reitzentrum in Tramariglio) erkunden. Geführtes Birdwatching von Oktober bis April, wenn Zugvögel die Küstenfeuchtgebiete bevölkern."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Informazioni pratiche', en: 'Practical information', fr: 'Informations pratiques', de: 'Praktische Informationen' },
          body: {
            it: "Il parco è sempre <strong>accessibile liberamente e gratuitamente</strong>. Il centro visite principale è a <strong>Tramariglio</strong>, dentro l'ex carcere mandamentale trasformato in museo ambientale, aperto da aprile a ottobre. Qui si raccolgono informazioni, si prenotano guide e noleggi, si scoprono i programmi di volontariato per la pulizia dei sentieri. Attività guidate con prezzi fra i 10 e i 25 €. Per chi ama il turismo esperienziale, il parco organizza d'estate <strong>cene stellate nella natura</strong>, yoga sulle falesie e notti in sacco a pelo sotto le stelle (programma su algheroparks.it).",
            en: "The park is always <strong>freely and freely accessible</strong>. The main visitor centre is at <strong>Tramariglio</strong>, inside the former district prison transformed into an environmental museum, open from April to October. Here you can gather information, book guides and rentals, discover volunteer programmes for trail maintenance. Guided activities at prices between €10 and €25. For lovers of experiential tourism, in summer the park organises <strong>starry dinners in nature</strong>, yoga on the cliffs and sleeping-bag nights under the stars (programme at algheroparks.it).",
            fr: "Le parc est toujours <strong>librement et gratuitement accessible</strong>. Le centre d'accueil principal est à <strong>Tramariglio</strong>, dans l'ancienne prison cantonale transformée en musée environnemental, ouvert d'avril à octobre. On y recueille des informations, on y réserve guides et locations, on découvre les programmes de volontariat pour l'entretien des sentiers. Activités guidées à des prix entre 10 et 25 €. Pour les amateurs de tourisme expérientiel, le parc organise en été des <strong>dîners étoilés dans la nature</strong>, du yoga sur les falaises et des nuits en sac de couchage sous les étoiles (programme sur algheroparks.it).",
            de: "Der Park ist jederzeit <strong>frei und kostenlos zugänglich</strong>. Das Hauptbesucherzentrum befindet sich in <strong>Tramariglio</strong>, im ehemaligen Gerichtsgefängnis, das in ein Umweltmuseum umgewandelt wurde und von April bis Oktober geöffnet ist. Hier kann man Informationen einholen, Führungen und Verleihe buchen, Freiwilligenprogramme zur Pfadpflege entdecken. Geführte Aktivitäten zu Preisen zwischen 10 und 25 €. Für Liebhaber von Erlebnistourismus organisiert der Park im Sommer <strong>Sternenessen in der Natur</strong>, Yoga auf den Klippen und Schlafsack-Nächte unter dem Sternenhimmel (Programm auf algheroparks.it)."
          }
        }
      ],
      links: {
        official: 'https://www.algheroparks.it/',
        wiki: 'https://it.wikipedia.org/wiki/Parco_regionale_di_Porto_Conte',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Parco+di+Porto+Conte'
      }
    },

    {
      slug: 'cantina-sella-mosca',
      parent: 'appartamento-alghero',
      name: { it: 'Cantina Sella & Mosca', en: 'Sella & Mosca winery', fr: 'Cave Sella & Mosca', de: 'Weingut Sella & Mosca' },
      subtitle: {
        it: '650 ettari di vigneti, la storica cantina fondata nel 1899',
        en: '650 hectares of vineyards, the historic winery founded in 1899',
        fr: '650 hectares de vignes, la cave historique fondée en 1899',
        de: '650 Hektar Weinberge, das historische Weingut gegründet 1899'
      },
      location: { it: 'Fertilia · Riviera del Corallo', en: 'Fertilia · Coral Riviera', fr: 'Fertilia · Riviera du Corail', de: 'Fertilia · Korallenriviera' },
      distance: { it: '8 km — 15 min in auto', en: '8 km — 15 min by car', fr: '8 km — 15 min en voiture', de: '8 km — 15 Min. mit dem Auto' },
      hero: 'img/alghero/dintorni/cantina-sella-mosca.jpg',
      heroFocus: 'top',
      intro: {
        it: "La <strong>Cantina Sella & Mosca</strong> è la più grande azienda vitivinicola del nord Sardegna e una delle più storiche d'Italia. Fondata nel <strong>1899</strong> dall'avvocato piemontese Edgardo Sella e dall'ingegnere genovese Erminio Mosca, oggi possiede <strong>650 ettari</strong> di vigneti continui — uno dei più vasti corpi vitati d'Europa in un'unica proprietà. Dai suoi filari nascono vini che hanno fatto la storia dell'enologia sarda: il <strong>Torbato</strong>, il <strong>Vermentino di Sardegna DOC</strong>, il <strong>Cannonau di Sardegna</strong>, e il celebre <strong>Marchese di Villamarina</strong>, uno dei rossi più premiati dell'isola. A otto chilometri da Alghero, una visita è quasi obbligatoria per gli appassionati di vino.",
        en: "<strong>Sella & Mosca</strong> is the largest wine producer in northern Sardinia and one of Italy's most historic. Founded in <strong>1899</strong> by the Piedmontese lawyer Edgardo Sella and the Genoese engineer Erminio Mosca, it now owns <strong>650 hectares</strong> of continuous vineyards — one of the largest single-estate wine properties in Europe. Its rows yield wines that have shaped Sardinian oenology: <strong>Torbato</strong>, <strong>Vermentino di Sardegna DOC</strong>, <strong>Cannonau di Sardegna</strong>, and the celebrated <strong>Marchese di Villamarina</strong>, one of the island's most awarded reds. Eight kilometres from Alghero, a visit is almost compulsory for wine lovers.",
        fr: "La <strong>Cave Sella & Mosca</strong> est la plus grande entreprise viticole du nord de la Sardaigne et l'une des plus historiques d'Italie. Fondée en <strong>1899</strong> par l'avocat piémontais Edgardo Sella et l'ingénieur génois Erminio Mosca, elle possède aujourd'hui <strong>650 hectares</strong> de vignes continues — l'un des plus vastes corps plantés d'Europe en une seule propriété. De ses rangs naissent des vins qui ont fait l'histoire de l'œnologie sarde : le <strong>Torbato</strong>, le <strong>Vermentino di Sardegna DOC</strong>, le <strong>Cannonau di Sardegna</strong>, et le célèbre <strong>Marchese di Villamarina</strong>, l'un des rouges les plus primés de l'île. À huit kilomètres d'Alghero, une visite est quasi obligatoire pour les amateurs de vin.",
        de: "Das <strong>Weingut Sella & Mosca</strong> ist der größte Weinproduzent Nordsardiniens und eines der historischsten Italiens. <strong>1899</strong> vom piemontesischen Rechtsanwalt Edgardo Sella und dem genuesischen Ingenieur Erminio Mosca gegründet, besitzt es heute <strong>650 Hektar</strong> zusammenhängende Rebflächen — eine der größten Rebflächen Europas in einer einzigen Domäne. Aus seinen Reihen entstehen Weine, die die sardische Önologie geprägt haben: <strong>Torbato</strong>, <strong>Vermentino di Sardegna DOC</strong>, <strong>Cannonau di Sardegna</strong> und der berühmte <strong>Marchese di Villamarina</strong>, einer der preisgekröntesten Rotweine der Insel. Acht Kilometer von Alghero ist ein Besuch für Weinliebhaber fast Pflicht."
      },
      sections: [
        {
          id: 'storia',
          h2: { it: 'La storia e i vini', en: 'History and wines', fr: 'Histoire et vins', de: 'Geschichte und Weine' },
          body: {
            it: "Sella e Mosca arrivarono ad Alghero nel 1899 alla ricerca di terre adatte alla viticoltura di qualità, dopo che la <strong>filossera</strong> aveva devastato i vigneti europei. La zona di I Piani, in territorio di Alghero, offriva suoli calcareo-argillosi, clima ventilato e un microclima ideale. Nel corso del Novecento l'azienda introdusse il <strong>Torbato</strong> dalla Spagna — vitigno oggi coltivato quasi esclusivamente qui in Italia — e affinò le tecniche di produzione del <strong>Vermentino</strong>, del <strong>Cannonau</strong> e del <strong>Cabernet Sauvignon</strong> con risultati che oggi la collocano fra le eccellenze nazionali. I vini di punta: il <strong>Marchese di Villamarina</strong> (Cabernet 100%), il <strong>Terre Rare</strong> (Carignano del Sulcis), e il <strong>Tanca Farrà</strong> (Cannonau e Cabernet).",
            en: "Sella and Mosca arrived in Alghero in 1899 in search of lands suited to quality wine-growing, after <strong>phylloxera</strong> had devastated European vineyards. The I Piani area in Alghero's territory offered calcareous-clay soils, ventilated climate and an ideal microclimate. Through the 20th century, the estate introduced <strong>Torbato</strong> from Spain — a grape variety now grown almost exclusively here in Italy — and refined production of <strong>Vermentino</strong>, <strong>Cannonau</strong> and <strong>Cabernet Sauvignon</strong>, with results that today place it among Italy's finest. Flagship wines: <strong>Marchese di Villamarina</strong> (100% Cabernet), <strong>Terre Rare</strong> (Carignano del Sulcis), and <strong>Tanca Farrà</strong> (Cannonau and Cabernet).",
            fr: "Sella et Mosca sont arrivés à Alghero en 1899 à la recherche de terres adaptées à la viticulture de qualité, après que le <strong>phylloxéra</strong> avait dévasté les vignobles européens. La zone de I Piani, sur le territoire d'Alghero, offrait des sols calcaire-argileux, un climat ventilé et un microclimat idéal. Au cours du XXᵉ siècle, le domaine a introduit le <strong>Torbato</strong> d'Espagne — cépage aujourd'hui cultivé presque exclusivement ici en Italie — et affiné les techniques de production du <strong>Vermentino</strong>, du <strong>Cannonau</strong> et du <strong>Cabernet Sauvignon</strong>, avec des résultats qui le placent aujourd'hui parmi les excellences nationales. Les vins phares : le <strong>Marchese di Villamarina</strong> (Cabernet 100%), le <strong>Terre Rare</strong> (Carignano del Sulcis), et le <strong>Tanca Farrà</strong> (Cannonau et Cabernet).",
            de: "Sella und Mosca kamen 1899 nach Alghero auf der Suche nach Böden, die für Qualitätsweinbau geeignet waren, nachdem die <strong>Reblaus</strong> die europäischen Weinberge verwüstet hatte. Die Zone I Piani im Gebiet von Alghero bot Kalk-Ton-Böden, luftiges Klima und ein ideales Mikroklima. Im Laufe des 20. Jahrhunderts führte das Gut den <strong>Torbato</strong> aus Spanien ein — eine Rebsorte, die heute in Italien fast ausschließlich hier angebaut wird — und verfeinerte die Produktion von <strong>Vermentino</strong>, <strong>Cannonau</strong> und <strong>Cabernet Sauvignon</strong> mit Ergebnissen, die es heute zu den Spitzenproduzenten des Landes zählen. Aushängeschilder: <strong>Marchese di Villamarina</strong> (100 % Cabernet), <strong>Terre Rare</strong> (Carignano del Sulcis) und <strong>Tanca Farrà</strong> (Cannonau und Cabernet)."
          }
        },
        {
          id: 'visita',
          h2: { it: 'La visita e la degustazione', en: 'The visit and tasting', fr: 'La visite et la dégustation', de: 'Besichtigung und Verkostung' },
          body: {
            it: "La visita guidata tocca tutte le fasi della produzione: si parte dal <strong>museo aziendale</strong>, che racconta la storia di Sella & Mosca con documenti d'archivio e oggetti originali; si prosegue nella <strong>barricaia</strong>, dove oltre <strong>duemila barrique</strong> di rovere francese affinano i vini rossi più importanti; si termina con una degustazione di <strong>cinque o sette vini</strong> (a seconda del pacchetto scelto), accompagnati da pane carasau, olive, formaggi sardi e miele. Il tour dura circa un'ora e mezza. Opzionale: <strong>visita dei vigneti a bordo di un trenino turistico</strong>. La tenuta ospita anche un <strong>wine shop</strong> dove acquistare tutta la produzione a prezzi di cantina.",
            en: "The guided tour covers all the production stages: it starts in the <strong>estate museum</strong>, which tells Sella & Mosca's history with archive documents and original objects; it continues in the <strong>barrel room</strong>, where over <strong>two thousand French-oak barriques</strong> age the most important reds; it ends with a tasting of <strong>five or seven wines</strong> (depending on the package chosen), paired with carasau bread, olives, Sardinian cheeses and honey. The tour lasts about an hour and a half. Optional: <strong>vineyard tour aboard a small tourist train</strong>. The estate also has a <strong>wine shop</strong> where you can buy the entire production at cellar prices.",
            fr: "La visite guidée touche toutes les phases de production : on part du <strong>musée d'entreprise</strong>, qui raconte l'histoire de Sella & Mosca avec documents d'archives et objets d'origine ; on continue dans la <strong>barricaia</strong>, où plus de <strong>deux mille barriques</strong> de chêne français affinent les rouges les plus importants ; on termine par une dégustation de <strong>cinq ou sept vins</strong> (selon le pack choisi), accompagnés de pain carasau, olives, fromages sardes et miel. La visite dure environ une heure et demie. En option : <strong>visite des vignobles à bord d'un petit train touristique</strong>. Le domaine abrite aussi une <strong>wine shop</strong> où acheter toute la production à prix de cave.",
            de: "Die Führung umfasst alle Produktionsschritte: Start im <strong>Weinmuseum</strong>, das die Geschichte von Sella & Mosca mit Archivdokumenten und Originalobjekten erzählt; weiter im <strong>Barriquekeller</strong>, wo über <strong>zweitausend Barriques</strong> aus französischer Eiche die wichtigsten Rotweine ausbauen; Abschluss mit einer Verkostung von <strong>fünf oder sieben Weinen</strong> (je nach gewähltem Paket), begleitet von Pane Carasau, Oliven, sardischen Käsen und Honig. Die Tour dauert rund eineinhalb Stunden. Optional: <strong>Rundfahrt durch die Weinberge mit einem touristischen Kleinzug</strong>. Das Gut beherbergt zudem einen <strong>Wine Shop</strong>, in dem die gesamte Produktion zu Kellerpreisen erhältlich ist."
          }
        },
        {
          id: 'pratiche',
          h2: { it: 'Prenotazione e informazioni', en: 'Booking and information', fr: 'Réservation et informations', de: 'Reservierung und Informationen' },
          body: {
            it: "La visita è <strong>solo su prenotazione</strong> tramite il sito ufficiale <strong>sellaemosca.com</strong>. Orari: dal lunedì al sabato, partenze alle 10:30, 12:00, 15:00, 17:00 (in alta stagione turni aggiuntivi). Chiusa la domenica e festivi. Prezzi: <strong>pacchetto base 20 €</strong> (tour + degustazione 5 vini), <strong>pacchetto premium 45 €</strong> (tour + degustazione 7 vini inclusi Marchese di Villamarina e Terre Rare + tagliere di prodotti sardi). Disponibile anche in inglese, francese, tedesco, spagnolo. L'estate consigliamo il <strong>turno delle 17:00</strong> per godere della luce del tramonto sui vigneti, uno spettacolo a sé.",
            en: "Visits are <strong>by reservation only</strong> through the official site <strong>sellaemosca.com</strong>. Hours: Monday to Saturday, tours at 10:30, 12:00, 15:00, 17:00 (additional slots in high season). Closed Sundays and public holidays. Prices: <strong>basic package €20</strong> (tour + tasting of 5 wines), <strong>premium package €45</strong> (tour + tasting of 7 wines including Marchese di Villamarina and Terre Rare + Sardinian tasting board). Also available in English, French, German, Spanish. In summer we recommend the <strong>17:00 tour</strong> to enjoy the sunset light over the vineyards — a spectacle in itself.",
            fr: "La visite est <strong>uniquement sur réservation</strong> via le site officiel <strong>sellaemosca.com</strong>. Horaires : du lundi au samedi, départs à 10h30, 12h00, 15h00, 17h00 (créneaux supplémentaires en haute saison). Fermé le dimanche et jours fériés. Prix : <strong>forfait de base 20 €</strong> (visite + dégustation 5 vins), <strong>forfait premium 45 €</strong> (visite + dégustation 7 vins dont Marchese di Villamarina et Terre Rare + planche de produits sardes). Disponible aussi en anglais, français, allemand, espagnol. En été, nous recommandons le <strong>créneau de 17h00</strong> pour profiter de la lumière du coucher de soleil sur les vignobles, un spectacle en soi.",
            de: "Besuche <strong>nur mit Reservierung</strong> über die offizielle Website <strong>sellaemosca.com</strong>. Zeiten: Montag bis Samstag, Touren um 10:30, 12:00, 15:00, 17:00 Uhr (zusätzliche Slots in der Hochsaison). Sonn- und Feiertage geschlossen. Preise: <strong>Basispaket 20 €</strong> (Tour + Verkostung von 5 Weinen), <strong>Premiumpaket 45 €</strong> (Tour + Verkostung von 7 Weinen inkl. Marchese di Villamarina und Terre Rare + sardische Produktplatte). Auch auf Englisch, Französisch, Deutsch, Spanisch verfügbar. Im Sommer empfehlen wir die <strong>17:00-Uhr-Tour</strong>, um das Licht des Sonnenuntergangs über den Weinbergen zu genießen — ein eigenes Schauspiel."
          }
        }
      ],
      links: {
        official: 'https://www.sellaemosca.com/',
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Cantine+Sella+%26+Mosca'
      }
    },

    {
      slug: 'spiagge-riviera',
      parent: 'appartamento-alghero',
      name: {
        it: 'Le spiagge della Riviera',
        en: 'Beaches of the Riviera',
        fr: 'Les plages de la Riviera',
        de: 'Die Strände der Riviera'
      },
      subtitle: {
        it: 'La selezione completa, dal Lido di Alghero a Porto Ferro',
        en: 'The full selection, from the Lido of Alghero to Porto Ferro',
        fr: 'La sélection complète, du Lido d\'Alghero à Porto Ferro',
        de: 'Die komplette Auswahl, vom Lido di Alghero bis Porto Ferro'
      },
      location: {
        it: 'Alghero · Riviera del Corallo',
        en: 'Alghero · Coral Riviera',
        fr: 'Alghero · Riviera du Corail',
        de: 'Alghero · Korallenriviera'
      },
      distance: {
        it: 'Da 10 min a piedi a 30 min in auto',
        en: 'From 10 min on foot to 30 min by car',
        fr: 'De 10 min à pied à 30 min en voiture',
        de: 'Von 10 Min. zu Fuß bis 30 Min. mit dem Auto'
      },
      hero: 'img/alghero/dintorni/spiaggia-bombarde.jpg',
      heroFocus: 'center center',
      intro: {
        it: "La <strong>Riviera del Corallo</strong> è uno dei tratti di costa più variegati della Sardegna: in meno di trenta chilometri si passa dalle spiagge urbane di sabbia chiara a baie selvagge fra le falesie, da pinete protette a calette nascoste raggiungibili solo a piedi. Tutte le sette spiagge che abbiamo selezionato sono <strong>a portata di giornata</strong> dall'appartamento di Alghero — la più vicina a dieci minuti a piedi, la più lontana a una mezz'ora d'auto. Ognuna ha un suo carattere: scegli in base al vento del giorno, alla compagnia, all'ora. Qui sotto trovi la guida completa, una scheda per spiaggia con come arrivare, servizi, regole e consigli pratici.",
        en: "The <strong>Coral Riviera</strong> is one of the most varied stretches of coast in Sardinia: in less than thirty kilometres you move from urban pale-sand beaches to wild bays among the cliffs, from protected pine forests to hidden coves reachable only on foot. All seven beaches in our selection are <strong>within day-trip distance</strong> of the Alghero apartment — the closest ten minutes on foot, the furthest half an hour by car. Each has its own character: choose by the day's wind, your companions, the hour. Below is the full guide, one page per beach with how to get there, services, rules and practical tips.",
        fr: "La <strong>Riviera du Corail</strong> est l'un des littoraux les plus variés de Sardaigne : en moins de trente kilomètres on passe des plages urbaines de sable clair à des baies sauvages entre les falaises, des pinèdes protégées à des criques cachées accessibles uniquement à pied. Les sept plages de notre sélection sont toutes <strong>à portée de journée</strong> depuis l'appartement d'Alghero — la plus proche à dix minutes à pied, la plus lointaine à une demi-heure de voiture. Chacune a son caractère : choisissez selon le vent du jour, la compagnie, l'heure. Ci-dessous le guide complet, une fiche par plage avec accès, services, règlement et conseils pratiques.",
        de: "Die <strong>Korallenriviera</strong> ist einer der abwechslungsreichsten Küstenabschnitte Sardiniens: In weniger als dreißig Kilometern wechselt man von urbanen Sandstränden zu wilden Buchten zwischen Felsen, von geschützten Pinienwäldern zu versteckten Buchten, die nur zu Fuß erreichbar sind. Alle sieben Strände unserer Auswahl sind <strong>innerhalb eines Tagesausflugs</strong> von der Wohnung in Alghero erreichbar — der nächste zehn Minuten zu Fuß, der entfernteste eine halbe Autostunde. Jeder hat seinen eigenen Charakter: wählen Sie nach Tageswind, Begleitung, Uhrzeit. Unten der vollständige Leitfaden, eine Seite pro Strand mit Anfahrt, Diensten, Regeln und Praxistipps."
      },
      sections: [
        {
          id: 'come-scegliere',
          h2: { it: 'Come scegliere la spiaggia giusta', en: 'How to choose the right beach', fr: 'Comment choisir la bonne plage', de: 'Den richtigen Strand wählen' },
          body: {
            it: "<strong>Con bambini piccoli</strong>: Lido (urbana, attrezzata, fondale basso) o Maria Pia (pineta, riparata dal vento). <strong>Per il giorno cartolina</strong>: Bombarde e Lazzaretto (sabbia dorata, acqua smeraldo). <strong>Quando soffia il Maestrale</strong>: La Stalla, Lazzaretto o le calette riparate dietro Capo Caccia. <strong>Per la natura selvaggia</strong>: Porto Ferro (dune, mare aperto, tramonti spettacolari). <strong>Per snorkeling sui fondali</strong>: Mugoni e La Stalla, fondali rocciosi pieni di vita. <strong>Per il tramonto</strong>: Porto Ferro e Maria Pia. Il <strong>vento</strong> è la variabile più importante: se il Maestrale è forte, le spiagge esposte (Bombarde, Mugoni, Porto Ferro) hanno mare mosso; quelle riparate (Lazzaretto, Lido) restano calme.",
            en: "<strong>With small children</strong>: Lido (urban, equipped, shallow water) or Maria Pia (pine forest, sheltered from the wind). <strong>For the postcard day</strong>: Bombarde and Lazzaretto (golden sand, emerald water). <strong>When the Mistral blows</strong>: La Stalla, Lazzaretto or the sheltered coves behind Capo Caccia. <strong>For wild nature</strong>: Porto Ferro (dunes, open sea, spectacular sunsets). <strong>For seabed snorkelling</strong>: Mugoni and La Stalla, rocky bottoms full of life. <strong>For sunset</strong>: Porto Ferro and Maria Pia. <strong>Wind</strong> is the most important variable: if the Mistral is strong, exposed beaches (Bombarde, Mugoni, Porto Ferro) get rough sea; sheltered ones (Lazzaretto, Lido) stay calm.",
            fr: "<strong>Avec de jeunes enfants</strong> : Lido (urbaine, équipée, fond peu profond) ou Maria Pia (pinède, abritée du vent). <strong>Pour la journée carte postale</strong> : Bombarde et Lazzaretto (sable doré, eau émeraude). <strong>Quand souffle le Mistral</strong> : La Stalla, Lazzaretto ou les criques abritées derrière Capo Caccia. <strong>Pour la nature sauvage</strong> : Porto Ferro (dunes, mer ouverte, couchers de soleil spectaculaires). <strong>Pour le snorkeling sur les fonds</strong> : Mugoni et La Stalla, fonds rocheux pleins de vie. <strong>Pour le coucher de soleil</strong> : Porto Ferro et Maria Pia. Le <strong>vent</strong> est la variable la plus importante : si le Mistral souffle fort, les plages exposées (Bombarde, Mugoni, Porto Ferro) ont mer agitée ; les plages abritées (Lazzaretto, Lido) restent calmes.",
            de: "<strong>Mit kleinen Kindern</strong>: Lido (urban, mit Service, flaches Wasser) oder Maria Pia (Pinienwald, windgeschützt). <strong>Für den Postkartentag</strong>: Bombarde und Lazzaretto (goldener Sand, smaragdgrünes Wasser). <strong>Wenn der Maestrale weht</strong>: La Stalla, Lazzaretto oder die geschützten Buchten hinter Capo Caccia. <strong>Für wilde Natur</strong>: Porto Ferro (Dünen, offenes Meer, spektakuläre Sonnenuntergänge). <strong>Zum Schnorcheln am Riff</strong>: Mugoni und La Stalla, felsige Gründe voller Leben. <strong>Für den Sonnenuntergang</strong>: Porto Ferro und Maria Pia. Der <strong>Wind</strong> ist die wichtigste Variable: Bei starkem Maestrale haben die exponierten Strände (Bombarde, Mugoni, Porto Ferro) bewegte See; die geschützten (Lazzaretto, Lido) bleiben ruhig."
          }
        }
      ],
      relatedLuoghi: [
        'spiaggia-del-lido',
        'spiaggia-bombarde',
        'spiaggia-lazzaretto',
        'spiaggia-la-stalla',
        'spiaggia-maria-pia',
        'spiaggia-mugoni',
        'spiaggia-porto-ferro'
      ],
      links: {
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Riviera+del+Corallo+Alghero'
      }
    },

    {
      slug: 'cucina-catalana',
      parent: 'appartamento-alghero',
      name: {
        it: 'La cucina di Alghero',
        en: 'The cuisine of Alghero',
        fr: 'La cuisine d\'Alghero',
        de: 'Die Küche von Alghero'
      },
      subtitle: {
        it: 'Cucina catalano-sarda, fra mare e tradizione',
        en: 'Catalan-Sardinian cuisine, between sea and tradition',
        fr: 'Cuisine catalano-sarde, entre mer et tradition',
        de: 'Katalanisch-sardische Küche, zwischen Meer und Tradition'
      },
      location: {
        it: 'Alghero · centro storico e Riviera',
        en: 'Alghero · old town and Riviera',
        fr: 'Alghero · centre historique et Riviera',
        de: 'Alghero · Altstadt und Riviera'
      },
      distance: {
        it: 'Ristoranti del centro storico, 5 min a piedi',
        en: 'Restaurants in the old town, 5 min on foot',
        fr: 'Restaurants du centre historique, 5 min à pied',
        de: 'Restaurants in der Altstadt, 5 Min. zu Fuß'
      },
      hero: 'img/alghero/dintorni/aragosta-alla-catalana.webp',
      heroFocus: 'center center',
      intro: {
        it: "Mangiare ad Alghero significa attraversare due mondi che convivono dal <strong>1354</strong>, anno della conquista catalano-aragonese: la <strong>cucina catalana</strong> del Mediterraneo iberico — aragoste, salse fredde, soffritti generosi — e la <strong>cucina sarda</strong> dell'isola — pane carasau, pecorino, agnello, vini di carattere. Il risultato è un'identità gastronomica unica in Italia, che non si ritrova in nessun'altra città. L'<strong>aragosta alla catalana</strong> è il piatto-simbolo, ma la tavola algherese va molto oltre: dalla <strong>fregula con arselle</strong> della tradizione marinara alla <strong>bottarga di muggine</strong> dello stagno di Calich, dai <strong>cavalleros</strong> (frittelle dolci catalane) alle <strong>seadas</strong> sarde col miele amaro. Qui sotto trovi la guida ai piatti da provare e, in arrivo, la nostra selezione personale di ristoranti — quelli che frequentiamo davvero, non quelli per turisti.",
        en: "Eating in Alghero means crossing two worlds that have coexisted since <strong>1354</strong>, the year of the Catalan-Aragonese conquest: <strong>Catalan cuisine</strong> of the Iberian Mediterranean — lobsters, cold sauces, generous sofrito — and <strong>Sardinian cuisine</strong> of the island — carasau bread, pecorino, lamb, characterful wines. The result is a gastronomic identity unique in Italy, found in no other city. <strong>Catalan-style lobster</strong> is the signature dish, but Alghero's table goes much further: from <strong>fregula with clams</strong> of seafaring tradition to <strong>mullet bottarga</strong> from the Calich pond, from <strong>cavalleros</strong> (Catalan sweet fritters) to Sardinian <strong>seadas</strong> with bitter honey. Below is the guide to dishes to try — and coming soon, our personal restaurant selection: the ones we actually frequent, not the tourist traps.",
        fr: "Manger à Alghero, c'est traverser deux mondes qui coexistent depuis <strong>1354</strong>, année de la conquête catalano-aragonaise : la <strong>cuisine catalane</strong> de la Méditerranée ibérique — langoustes, sauces froides, sofritos généreux — et la <strong>cuisine sarde</strong> de l'île — pain carasau, pecorino, agneau, vins de caractère. Il en résulte une identité gastronomique unique en Italie, qu'on ne retrouve dans aucune autre ville. La <strong>langouste à la catalane</strong> est le plat symbole, mais la table algheraise va bien au-delà : de la <strong>fregula aux palourdes</strong> de tradition marine à la <strong>boutargue de muge</strong> de l'étang du Calich, des <strong>cavalleros</strong> (beignets sucrés catalans) aux <strong>seadas</strong> sardes au miel amer. Voici le guide des plats à goûter — et bientôt, notre sélection personnelle de restaurants : ceux que nous fréquentons vraiment, pas les pièges à touristes.",
        de: "In Alghero zu essen bedeutet, zwei Welten zu durchqueren, die seit <strong>1354</strong>, dem Jahr der katalanisch-aragonesischen Eroberung, koexistieren: die <strong>katalanische Küche</strong> des iberischen Mittelmeers — Hummer, kalte Saucen, üppige Sofritos — und die <strong>sardische Küche</strong> der Insel — Pane Carasau, Pecorino, Lamm, charakterstarke Weine. Das Ergebnis ist eine in Italien einzigartige gastronomische Identität, die man in keiner anderen Stadt findet. Der <strong>Hummer nach katalanischer Art</strong> ist das Wahrzeichengericht, doch die algherische Tafel reicht weit darüber hinaus: von der <strong>Fregula mit Venusmuscheln</strong> der Seefahrertradition bis zur <strong>Meeräschen-Bottarga</strong> aus dem Calich-Teich, von den <strong>Cavalleros</strong> (katalanische süße Krapfen) bis zu den sardischen <strong>Seadas</strong> mit bitterem Honig. Unten finden Sie den Leitfaden zu den Gerichten, die man probieren sollte — und demnächst unsere persönliche Restaurantauswahl: die, die wir wirklich besuchen, nicht die Touristenfallen."
      },
      sections: [
        {
          id: 'identita',
          h2: { it: 'L\'identità catalano-sarda', en: 'The Catalan-Sardinian identity', fr: 'L\'identité catalano-sarde', de: 'Die katalanisch-sardische Identität' },
          body: {
            it: "Alghero è l'unica città in Italia dove ancora oggi una piccola comunità parla <strong>algherese</strong>, dialetto catalano riconosciuto dall'UNESCO come lingua in pericolo. Il dialetto è arrivato qui nel <strong>1354</strong>, quando le truppe di Pietro IV d'Aragona conquistarono la città dai genovesi e ripopolarono il centro storico con coloni catalani provenienti soprattutto da Barcellona, Valencia e Maiorca. Per oltre tre secoli Alghero rimase parte della Corona d'Aragona, e da allora la cultura, l'architettura — i Bastioni, le chiese gotico-catalane, le insegne bilingui — e soprattutto la cucina sono rimaste <strong>bilingue</strong>. Le ricette catalane (aragosta, fideus, escalivada) si sono fuse con la dispensa sarda (formaggio pecorino, miele, mirto, agnello), creando piatti ibridi che non esistono né a Barcellona né a Cagliari.",
            en: "Alghero is the only town in Italy where a small community still speaks <strong>Algherese</strong>, a Catalan dialect recognised by UNESCO as an endangered language. The dialect arrived here in <strong>1354</strong>, when Peter IV of Aragon's troops conquered the city from the Genoese and repopulated the old town with Catalan settlers, mostly from Barcelona, Valencia and Mallorca. For over three centuries Alghero remained part of the Crown of Aragon, and ever since the culture, architecture — the Bastioni, the Gothic-Catalan churches, bilingual signs — and above all the cuisine have stayed <strong>bilingual</strong>. Catalan recipes (lobster, fideus, escalivada) merged with the Sardinian pantry (pecorino cheese, honey, myrtle, lamb), creating hybrid dishes found neither in Barcelona nor in Cagliari.",
            fr: "Alghero est la seule ville d'Italie où une petite communauté parle encore l'<strong>alguerés</strong>, dialecte catalan reconnu par l'UNESCO comme langue en danger. Le dialecte est arrivé ici en <strong>1354</strong>, lorsque les troupes de Pierre IV d'Aragon ont conquis la ville aux Génois et repeuplé le centre historique avec des colons catalans venus surtout de Barcelone, Valence et Majorque. Pendant plus de trois siècles, Alghero est restée partie de la Couronne d'Aragon, et depuis lors la culture, l'architecture — les Bastions, les églises gothiques-catalanes, les enseignes bilingues — et surtout la cuisine sont restées <strong>bilingues</strong>. Les recettes catalanes (langouste, fideus, escalivada) se sont fondues avec le garde-manger sarde (pecorino, miel, myrte, agneau), créant des plats hybrides qu'on ne retrouve ni à Barcelone ni à Cagliari.",
            de: "Alghero ist die einzige Stadt Italiens, in der eine kleine Gemeinschaft noch heute <strong>Algherese</strong> spricht, einen von der UNESCO als gefährdet anerkannten katalanischen Dialekt. Der Dialekt kam <strong>1354</strong> hierher, als die Truppen Peters IV. von Aragon die Stadt von den Genuesen eroberten und die Altstadt mit katalanischen Siedlern vor allem aus Barcelona, Valencia und Mallorca neu besiedelten. Über drei Jahrhunderte gehörte Alghero zur Krone Aragon, und seither blieben Kultur, Architektur — die Bastionen, die katalanisch-gotischen Kirchen, die zweisprachigen Schilder — und vor allem die Küche <strong>zweisprachig</strong>. Katalanische Rezepte (Hummer, Fideus, Escalivada) verschmolzen mit der sardischen Speisekammer (Pecorino, Honig, Myrte, Lamm) zu hybriden Gerichten, die es weder in Barcelona noch in Cagliari gibt."
          }
        },
        {
          id: 'mare',
          h2: { it: 'I piatti di mare', en: 'The dishes of the sea', fr: 'Les plats de la mer', de: 'Die Gerichte des Meeres' },
          body: {
            it: "L'<strong>aragosta alla catalana</strong> è il piatto-icona: aragosta locale bollita, tagliata a pezzi, condita a freddo con pomodoro fresco, cipolla rossa di Tropea, prezzemolo, olio extravergine sardo e sale. Si serve a temperatura ambiente. Costa <strong>40-60 € a persona</strong> (chiedere sempre il prezzo al chilo prima di ordinare). Si abbina al <strong>Torbato di Alghero</strong>, vino bianco autoctono della cantina Sella & Mosca. Altri piatti di mare imperdibili: la <strong>fregula con arselle</strong> (pasta sarda con vongole), la <strong>bottarga</strong> dello stagno di Calich grattugiata su spaghetti o crostino col burro, il <strong>polpo alla griglia</strong> con patate e capperi, la <strong>zuppa di pesce</strong> (cassola) con pesci di scoglio del giorno, il <strong>pesce all'algherese</strong> — branzino o orata cotti al forno con salsa di pomodoro, capperi, olive nere e un pizzico di mirto.",
            en: "The icon dish is <strong>Catalan-style lobster</strong>: local lobster boiled, cut into pieces, dressed cold with fresh tomato, Tropea red onion, parsley, Sardinian extra-virgin olive oil and salt. Served at room temperature. It costs <strong>€40–60 per person</strong> (always ask the price per kilo before ordering). Pair it with <strong>Torbato di Alghero</strong>, the native white wine from the Sella & Mosca winery. Other unmissable seafood dishes: <strong>fregula with clams</strong> (Sardinian pasta with carpet-shell clams), <strong>bottarga</strong> from the Calich pond grated on spaghetti or buttered toast, <strong>grilled octopus</strong> with potatoes and capers, <strong>cassola</strong> fish soup with rock fish of the day, <strong>Alghero-style fish</strong> — bass or sea bream baked with tomato sauce, capers, black olives and a touch of myrtle.",
            fr: "Le plat icône est la <strong>langouste à la catalane</strong> : langouste locale bouillie, coupée en morceaux, assaisonnée à froid avec tomate fraîche, oignon rouge de Tropea, persil, huile d'olive extra vierge sarde et sel. Servie à température ambiante. Elle coûte <strong>40-60 € par personne</strong> (toujours demander le prix au kilo avant de commander). À accompagner du <strong>Torbato di Alghero</strong>, vin blanc autochtone de la cave Sella & Mosca. Autres plats de mer incontournables : la <strong>fregula aux palourdes</strong> (pâtes sardes aux palourdes), la <strong>boutargue</strong> de l'étang du Calich râpée sur des spaghettis ou en tartine au beurre, le <strong>poulpe grillé</strong> avec pommes de terre et câpres, la <strong>cassola</strong> (soupe de poisson) avec poissons de roche du jour, le <strong>poisson à l'algheraise</strong> — bar ou daurade au four avec sauce tomate, câpres, olives noires et une pointe de myrte.",
            de: "Das Wahrzeichengericht ist der <strong>Hummer nach katalanischer Art</strong>: lokaler Hummer gekocht, in Stücke geschnitten, kalt angemacht mit frischer Tomate, Tropea-Zwiebel, Petersilie, sardischem Olivenöl extra vergine und Salz. Zimmerwarm serviert. Er kostet <strong>40–60 € pro Person</strong> (immer den Kilopreis vor dem Bestellen erfragen). Dazu <strong>Torbato di Alghero</strong>, der einheimische Weißwein vom Weingut Sella & Mosca. Weitere unbedingt zu probierende Meeresgerichte: <strong>Fregula mit Venusmuscheln</strong> (sardische Pasta mit Teppich-Venusmuscheln), <strong>Bottarga</strong> aus dem Calich-Teich auf Spaghetti oder Butterbrot gerieben, <strong>Tintenfisch vom Grill</strong> mit Kartoffeln und Kapern, <strong>Cassola</strong>-Fischsuppe mit Felsfischen des Tages, <strong>Fisch auf algherische Art</strong> — Wolfsbarsch oder Dorade im Ofen mit Tomatensauce, Kapern, schwarzen Oliven und einem Hauch Myrte."
          }
        },
        {
          id: 'terra-dolci',
          h2: { it: 'Tradizione di terra, dolci e vini', en: 'Inland tradition, desserts and wines', fr: 'Tradition de terre, desserts et vins', de: 'Landtradition, Süßspeisen und Weine' },
          body: {
            it: "Per chi non ama il pesce, la cucina d'entroterra offre <strong>maialetto sardo</strong> arrosto al mirto, <strong>agnello con i carciofi</strong>, <strong>culurgiones</strong> (ravioli di patata e pecorino), <strong>malloreddus alla campidanese</strong>. Sui formaggi: <strong>pecorino sardo DOP</strong>, <strong>fiore sardo</strong> affumicato, <strong>caciocavallo</strong> della Nurra. <strong>Pane</strong>: il <strong>carasau</strong> (sottilissimo, croccante), il <strong>guttiau</strong> oliato e salato, e il <strong>pane di Alghero</strong> lievitato a lunga maturazione. Tra i <strong>dolci</strong>, l'eredità catalana è netta: i <strong>cavalleros</strong> (frittelle ripiene di crema), i <strong>mostaccioli</strong> speziati, le <strong>tortelle de mel</strong> col miele e — sardesi — le <strong>seadas</strong> (raviolone fritto con pecorino fresco e miele amaro di corbezzolo). Sui <strong>vini</strong>, oltre al Torbato e al Cannonau di Sardegna DOC, vale la pena chiedere il <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, fra i grandi rossi italiani) e il <strong>Vermentino di Sardegna DOCG</strong> della Riviera del Corallo. Caffè a fine pasto: l'<strong>aniseta</strong>, anice locale, è la chiusura tipica.",
            en: "For those who don't love fish, the inland cuisine offers <strong>Sardinian suckling pig</strong> roasted with myrtle, <strong>lamb with artichokes</strong>, <strong>culurgiones</strong> (potato and pecorino ravioli), <strong>malloreddus alla campidanese</strong>. On cheeses: <strong>Pecorino Sardo DOP</strong>, smoked <strong>fiore sardo</strong>, <strong>caciocavallo</strong> from the Nurra. <strong>Bread</strong>: paper-thin <strong>carasau</strong>, oiled and salted <strong>guttiau</strong>, and the long-fermented <strong>Alghero bread</strong>. Among <strong>desserts</strong>, the Catalan legacy is unmistakable: <strong>cavalleros</strong> (cream-filled fritters), spiced <strong>mostaccioli</strong>, <strong>tortelle de mel</strong> with honey — and the Sardinian <strong>seadas</strong> (fried pastry with fresh pecorino and bitter strawberry-tree honey). On <strong>wines</strong>, besides Torbato and Cannonau di Sardegna DOC, ask for <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, among Italy's great reds) and <strong>Vermentino di Sardegna DOCG</strong> from the Coral Riviera. After-dinner: <strong>aniseta</strong>, the local aniseed liqueur, is the typical close.",
            fr: "Pour qui n'aime pas le poisson, la cuisine de l'arrière-pays offre <strong>cochon de lait sarde</strong> rôti à la myrte, <strong>agneau aux artichauts</strong>, <strong>culurgiones</strong> (raviolis de pomme de terre et pecorino), <strong>malloreddus alla campidanese</strong>. Côté fromages : <strong>Pecorino Sardo DOP</strong>, <strong>fiore sardo</strong> fumé, <strong>caciocavallo</strong> de la Nurra. <strong>Pains</strong> : le <strong>carasau</strong> très fin, le <strong>guttiau</strong> huilé et salé, et le <strong>pain d'Alghero</strong> à longue fermentation. Parmi les <strong>desserts</strong>, l'héritage catalan est évident : les <strong>cavalleros</strong> (beignets fourrés à la crème), les <strong>mostaccioli</strong> épicés, les <strong>tortelle de mel</strong> au miel — et les sardes <strong>seadas</strong> (chausson frit au pecorino frais et miel amer d'arbousier). Sur les <strong>vins</strong>, outre le Torbato et le Cannonau di Sardegna DOC, demandez le <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, parmi les grands rouges italiens) et le <strong>Vermentino di Sardegna DOCG</strong> de la Riviera du Corail. Pour finir : l'<strong>aniseta</strong>, anis local, est la conclusion typique.",
            de: "Wer Fisch nicht mag, findet in der Hinterland-Küche <strong>sardisches Spanferkel</strong> mit Myrte, <strong>Lamm mit Artischocken</strong>, <strong>Culurgiones</strong> (Ravioli aus Kartoffel und Pecorino), <strong>Malloreddus alla campidanese</strong>. Bei den Käsen: <strong>Pecorino Sardo DOP</strong>, geräucherter <strong>Fiore Sardo</strong>, <strong>Caciocavallo</strong> aus der Nurra. <strong>Brot</strong>: papierdünner <strong>Carasau</strong>, geölt-gesalzener <strong>Guttiau</strong> und das langgereifte <strong>Pane di Alghero</strong>. Bei den <strong>Süßspeisen</strong> ist das katalanische Erbe unverkennbar: <strong>Cavalleros</strong> (mit Creme gefüllte Krapfen), gewürzte <strong>Mostaccioli</strong>, <strong>Tortelle de mel</strong> mit Honig — und sardische <strong>Seadas</strong> (frittierte Teigtasche mit frischem Pecorino und bitterem Erdbeerbaumhonig). Bei den <strong>Weinen</strong> lohnt neben Torbato und Cannonau di Sardegna DOC auch der <strong>Marchese di Villamarina</strong> (Cabernet Sauvignon, einer der großen italienischen Rotweine) und der <strong>Vermentino di Sardegna DOCG</strong> von der Korallenriviera. Zum Abschluss: <strong>Aniseta</strong>, der lokale Anislikör, ist die typische Wahl."
          }
        }
      ],
      placeholder: {
        h2: {
          it: 'La nostra selezione di ristoranti',
          en: 'Our restaurant selection',
          fr: 'Notre sélection de restaurants',
          de: 'Unsere Restaurantauswahl'
        },
        body: {
          it: "Stiamo finendo di mettere in ordine la nostra selezione personale dei ristoranti di Alghero — solo quelli che frequentiamo davvero, suddivisi per occasione (cena romantica, pranzo veloce, aperitivo, cucina di pesce, cucina di carne) e per zona (centro storico, lungomare, riviera). La pubblichiamo qui appena è pronta. Nel frattempo, scrivici per consigli specifici sul giorno della tua prenotazione.",
          en: "We're finishing our personal selection of Alghero's restaurants — only the ones we actually frequent, sorted by occasion (romantic dinner, quick lunch, aperitivo, fish cuisine, meat cuisine) and area (old town, seafront, riviera). We'll publish it here as soon as it's ready. In the meantime, write to us for specific tips for the day of your booking.",
          fr: "Nous finalisons notre sélection personnelle des restaurants d'Alghero — uniquement ceux que nous fréquentons vraiment, classés par occasion (dîner romantique, déjeuner rapide, apéritif, cuisine de poisson, cuisine de viande) et par zone (centre historique, front de mer, riviera). Nous la publierons ici dès qu'elle sera prête. En attendant, écrivez-nous pour des conseils spécifiques pour le jour de votre réservation.",
          de: "Wir stellen unsere persönliche Auswahl an Restaurants in Alghero fertig — nur die, die wir wirklich besuchen, sortiert nach Anlass (romantisches Abendessen, schnelles Mittagessen, Aperitif, Fischküche, Fleischküche) und Gegend (Altstadt, Promenade, Riviera). Wir veröffentlichen sie hier, sobald sie fertig ist. Schreiben Sie uns in der Zwischenzeit für konkrete Tipps für den Tag Ihrer Reservierung."
        }
      },
      links: {
        gmaps: 'https://www.google.com/maps/search/?api=1&query=Ristoranti+centro+storico+Alghero'
      }
    }
  ];

  window.FH_DATA = {
    houses: houses,
    included: included,
    tickerWords: tickerWords,
    faqs: faqs,
    luoghi: luoghi
  };

  // helper accessor
  window.FH_getHouse = function (id) {
    for (var i = 0; i < houses.length; i++) {
      if (houses[i].id === id) return houses[i];
    }
    return null;
  };

  window.FH_getLuogo = function (slug) {
    for (var i = 0; i < luoghi.length; i++) {
      if (luoghi[i].slug === slug) return luoghi[i];
    }
    return null;
  };

})();
