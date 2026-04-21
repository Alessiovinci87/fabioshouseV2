/* ============================================================
   FabioSHouse v2 — DATA
   Exposes a single global: window.FH_DATA
   Copy: IT only (structure leaves room for EN/FR/DE later)
   ============================================================ */

(function () {
  'use strict';

  // Unsplash helper (used only for Stintino — no local photos yet)
  var UNSPLASH = function (id, w) {
    w = w || 1400;
    return 'https://images.unsplash.com/photo-' + id + '?w=' + w + '&q=80&auto=format&fit=crop';
  };

  // Local image helper for Alghero (real photos ported from V1)
  var ALG = function (slug) {
    return 'img/alghero/appartamento-alghero-' + slug + '.jpeg';
  };

  var houses = [
    {
      id: 'villa-stintino',
      name: 'Villa Stintino',
      location: 'Stintino',
      region: 'Sardegna',
      province: 'Sassari',
      type: 'Villa con giardino',
      subtitle: 'A 5 minuti a piedi dalla Pelosa.',
      beds: 3, guests: 6, baths: 2, sqm: 90,
      // Seasonal weekly pricing (EUR)
      prices: { giugno: 800, luglio: 1200, agosto: 1500, settembre: 700 },
      priceFrom: 700,       // min weekly price
      cleaning: 0,          // already included per V1 (pulizie finali incluse)
      deposit: 300,
      rating: 4.95, reviews: 38,
      year_restored: null,  // not disclosed
      tags: ['mare', 'pelosa', 'giardino', 'famiglia'],
      hero: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
      heroFocus: 'center center',
      gallery: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop',
        UNSPLASH('1507525428034-b723cf961d3e'),
        UNSPLASH('1519046904884-53103b34b206'),
        UNSPLASH('1469474968028-56623f02e42e'),
        UNSPLASH('1504674900247-0877df9cc836'),
        UNSPLASH('1540541338287-41700207dee6')
      ],
      amenities: [
        'Aria condizionata',
        'Cucina attrezzata',
        'Lavatrice',
        'TV Smart',
        'Barbecue esterno',
        'Lettini da giardino',
        'Parcheggio privato',
        'WiFi fibra',
        'Biancheria inclusa',
        'Culla disponibile'
      ],
      story:
        'La Villa Stintino è una proprietà immersa nel verde della macchia mediterranea, a cinque minuti a piedi dalla Spiaggia della Pelosa — sabbia bianchissima, acqua trasparente, la Torre aragonese sullo sfondo. Intorno alla villa un giardino privato con barbecue, tavoli da esterno e ombrelloni. ' +
        'Dentro, un soggiorno luminoso con angolo cottura completo, tre camere da letto (una matrimoniale, una doppia, una con letti singoli) e due bagni con doccia. Climatizzazione in ogni stanza. ' +
        'È il punto di partenza giusto per il nord-ovest della Sardegna: dal porto di Stintino partono i traghetti per l\'Asinara, poco lontano il sentiero di Capo Falcone, il Museo della Tonnara e i ristoranti di pesce del borgo. Alghero è a un\'ora d\'auto, comoda per una gita di un giorno.',
      bestFor: ['Famiglie', 'Mare', 'Pelosa'],
      season: 'Giugno — Settembre',
      rules: [
        'Check-in dalle 16:00 / Check-out entro le 10:00',
        'Vietato fumare all\'interno',
        'Animali non ammessi',
        'No feste o eventi. Silenzio dopo le 23:00',
        'Caparra cauzionale € 300, resa alla partenza',
        'Pulizie finali incluse nel prezzo',
        'WiFi fibra ~100 Mbps incluso',
        'Biancheria da letto e da bagno inclusa'
      ],
      activities: [
        {
          id: 'la-pelosa',
          title: 'Spiaggia La Pelosa',
          distance: '5 min a piedi',
          image: UNSPLASH('1507525428034-b723cf961d3e'),
          description: 'La Spiaggia della Pelosa è universalmente considerata una delle più belle d\'Europa — e chi ci arriva capisce subito perché. Un\'acqua turchese quasi irreale, sabbia bianca finissima e, sullo sfondo, la Torre della Pelosa aragonese del XVI secolo che emerge dall\'acqua come in una cartolina.',
          practical: 'Accessi regolamentati dal 15 maggio al 15 ottobre: prenotazione obbligatoria su spiaggialapelosa.it (€ 3,50 a persona, massimo 1.500 accessi al giorno). Il consiglio è arrivare entro le 9:30 per goderla ancora tranquilla, con la luce del mattino.'
        },
        {
          id: 'asinara',
          title: 'Parco Nazionale dell\'Asinara',
          distance: 'Traghetto dal porto',
          image: UNSPLASH('1469474968028-56623f02e42e'),
          description: 'L\'Asinara è un\'isola-parco nazionale dal 1997, rimasta intatta grazie alla sua storia di colonia penale e poi carcere di massima sicurezza. Oggi ospita asini bianchi albini unici al mondo, mufloni, capre selvatiche e una straordinaria varietà di uccelli migratori.',
          practical: 'Traghetto dal porto di Stintino o di Porto Torres (circa 20 minuti). Escursioni disponibili da aprile a ottobre, tra giro in bici, tour in fuoristrada elettrico e snorkeling nelle baie protette. Prenota con anticipo nei weekend di agosto.'
        },
        {
          id: 'capo-falcone',
          title: 'Torre di Capo Falcone',
          distance: '15 min a piedi o bici',
          image: UNSPLASH('1506905925346-21bda4d32df4'),
          description: 'La Torre di Capo Falcone è un gioiello storico-naturalistico a pochi minuti dalla villa. Edificata dagli Aragonesi nel XVI secolo come torre d\'avvistamento, domina dall\'alto il Golfo dell\'Asinara con una vista che toglie il fiato: la Pelosa in basso, l\'isola dell\'Asinara di fronte, la costa nord-occidentale fino all\'orizzonte.',
          practical: 'Sentiero sempre accessibile, gratuito. Quattro chilometri andata e ritorno, centoventi metri di dislivello, circa un\'ora di cammino. Al tramonto la luce radente sulle rocce granitiche è spettacolare — scarpe da ginnastica consigliate.'
        },
        {
          id: 'snorkeling-windsurf',
          title: 'Snorkeling e windsurf',
          distance: '10 min a piedi',
          image: UNSPLASH('1519046904884-53103b34b206'),
          description: 'Il Golfo dell\'Asinara è un paradiso per gli sport acquatici. I fondali di posidonia oceanica — patrimonio UNESCO — ospitano un ecosistema ricco: saraghi, polpi, murene, cernie e, con un po\' di fortuna, tartarughe Caretta caretta. L\'acqua è cristallina, la visibilità spesso superiore ai quindici metri.',
          practical: 'In superficie, il vento del Maestrale rende la baia una delle migliori della Sardegna per windsurf e kitesurf. Scuole e noleggio attrezzatura sul lungomare. Noleggio snorkeling da circa 10 €, lezioni windsurf da circa 50 €/h. Maestrale più costante nel pomeriggio; snorkeling meglio al mattino.'
        },
        {
          id: 'museo-tonnare',
          title: 'Museo delle Tonnare',
          distance: '10 min a piedi',
          image: UNSPLASH('1469474968028-56623f02e42e'),
          description: 'Il Museo delle Tonnare di Stintino racconta secoli di storia della pesca al tonno rosso attraverso strumenti originali, fotografie d\'epoca, modelli di imbarcazioni e testimonianze dei pescatori locali. La "mattanza" è stata praticata a Stintino fino agli anni \'90.',
          practical: 'Ospitato nell\'antico magazzino delle tonnare restaurato, nel centro storico. Aperto luglio–agosto 10:00–13:00 / 17:00–22:00, fuori stagione verificare. Ingresso 3–5 € adulti, ridotto per bambini. Visita ideale nelle ore centrali, quando il caldo sconsiglia la spiaggia.'
        },
        {
          id: 'cucina-sarda',
          title: 'Cucina sarda tipica',
          distance: '10–15 min a piedi',
          image: UNSPLASH('1504674900247-0877df9cc836'),
          description: 'A Stintino la cucina del mare è protagonista assoluta. Aragosta alla catalana, fregola con arselle, zuppa di pesce alla stintinese, polpo in galera: ogni ristorante del borgo ha le sue ricette tramandate di generazione in generazione. Da non perdere la "tumbarella", dolce locale di pasta di mandorle e miele amaro.',
          practical: 'Ristoranti concentrati lungo il porto e nel centro storico. Cena 19:30–23:00, pranzo 12:30–14:30. Antipasto + primo + secondo + vino 35–55 € a persona. In agosto prenota sempre, anche con due-tre giorni di anticipo. Abbina con un calice di Vermentino di Sardegna DOC.'
        }
      ]
    },
    {
      id: 'appartamento-alghero',
      name: 'La Porta del Lido',
      location: 'Alghero',
      region: 'Sardegna',
      province: 'Sassari',
      type: 'Appartamento in centro',
      subtitle: 'Nel cuore della Riviera del Corallo.',
      beds: 2, guests: 4, baths: 1, sqm: 70,
      prices: { giugno: 600, luglio: 900, agosto: 1100, settembre: 550 },
      priceFrom: 550,
      cleaning: 0,
      deposit: 200,
      rating: 4.90, reviews: 46,
      year_restored: null,
      tags: ['città', 'centro', 'balcone', 'catalana'],
      hero:    'img/alghero/appartamento-alghero-zona-giorno-01-1200.webp',
      heroFocus: 'center center',
      gallery: [
        ALG('soggiorno-01'),
        ALG('zona-giorno-01'),
        ALG('cucina-01'),
        ALG('camera-matrimoniale-01'),
        ALG('camera-doppia-01'),
        ALG('bagno-01'),
        ALG('balcone-piante'),
        ALG('benvenuto-prosecco')
      ],
      amenities: [
        'Aria condizionata',
        'Cucina attrezzata',
        'Lavatrice',
        'TV Smart',
        'Balcone privato',
        'Ascensore',
        'Parcheggio condominiale',
        'WiFi fibra',
        'Biancheria inclusa',
        'Culla disponibile'
      ],
      story:
        'La Porta del Lido è in posizione centralissima, a dieci minuti a piedi dal Lido e a cinque dal centro storico catalano. L\'edificio è dotato di ascensore e parcheggio condominiale. ' +
        'Dentro: un soggiorno ampio con cucina a vista completamente attrezzata, due camere da letto — una matrimoniale e una doppia — e un bagno con doccia. Il balcone dà su un cortile interno tranquillo. ' +
        'Dalla porta di casa si arriva a piedi alle mura medievali e ai bastioni sul mare, alle vie pedonali del centro vecchio, al porto turistico, alla Cattedrale. Con l\'auto, in venti-quaranta minuti, ci sono le Grotte di Nettuno, Capo Caccia, il Parco di Porto Conte e le cantine di Vermentino.',
      bestFor: ['Coppie', 'Città', 'Centro storico'],
      season: 'Giugno — Settembre',
      rules: [
        'Check-in dalle 16:00 / Check-out entro le 10:00',
        'Vietato fumare all\'interno',
        'Animali non ammessi (regolamento condominiale)',
        'No feste. Rispettare il silenzio condominiale',
        'Caparra cauzionale € 200, resa alla partenza',
        'Pulizie finali incluse nel prezzo',
        'WiFi fibra ~100 Mbps incluso',
        'Biancheria da letto e da bagno inclusa'
      ],
      activities: [
        {
          id: 'spiagge-riviera',
          title: 'Spiagge della Riviera',
          distance: '10 min a piedi / 10–20 km',
          image: 'img/alghero/dintorni/lido-alghero.jpg',
          description: 'Alghero offre una varietà di spiagge per ogni esigenza. Il Lido di Alghero (Lido San Giovanni) è la spiaggia urbana: ampia, sabbiosa, attrezzata con lettini e stabilimenti, raggiungibile in dieci minuti a piedi. A 10 km le Bombarde e Lazzaretto, sabbia dorata e acqua verde smeraldo da cartolina caraibica. Per chi ama la natura selvaggia, Porto Ferro (20 km) è una baia incontaminata con dune di sabbia e acqua cristallina.',
          practical: 'Lido a piedi (10 min). Bombarde in auto o bus (20 min). Porto Ferro in auto (30 min). Stagione balneare giugno–settembre. Lettini ~20–30 €/giorno, spiagge libere gratuite. Arriva alle Bombarde entro le 9:30 per trovare parcheggio; Porto Ferro è ideale per il tramonto.'
        },
        {
          id: 'centro-bastioni',
          title: 'Centro storico e Bastioni',
          distance: '5 min a piedi',
          image: 'img/alghero/dintorni/bastioni-marco-polo.jpg',
          description: 'Alghero è unica in Sardegna: una città murata di fondazione catalano-aragonese del XV secolo, dove ancora oggi una piccola comunità parla l\'algherese — dialetto catalano riconosciuto dall\'UNESCO come lingua in pericolo. I Bastioni aragonesi sul lato mare sono il luogo ideale per il tramonto: dal belvedere della Maddalena la vista abbraccia il golfo, le Bombarde e, nelle giornate limpide, Capo Caccia all\'orizzonte.',
          practical: 'Sempre accessibile. Chiese aperte 9:00–12:30 / 16:30–19:00, gratuite (alcune chiedono un obolo volontario). Il tramonto sui Bastioni in luglio–agosto è uno spettacolo: arriva trenta minuti prima per trovare posto sulle mura.'
        },
        {
          id: 'grotte-nettuno',
          title: 'Grotte di Nettuno',
          distance: 'A Capo Caccia · 24 km',
          image: 'img/alghero/dintorni/grotte-di-nettuno.jpg',
          description: 'Le Grotte di Nettuno sono tra le più spettacolari cavità carsiche del Mediterraneo, scavate per millenni dal mare nella scogliera a strapiombo di Capo Caccia. Il complesso si estende per oltre 2,5 km: stalattiti e stalagmiti alte fino a venti metri, laghi sotterranei silenziosi e sale di rara bellezza.',
          practical: 'Due modi per arrivarci: in barca da Alghero (trenta minuti di navigazione lungo la costa, consigliato) oppure a piedi scendendo l\'Escala del Cabirol, 656 gradini scavati nella roccia a picco sul mare. Aperte aprile–ottobre 9:00–19:00. Ingresso ~16 € adulti, 8 € bambini; barca ~13 € A/R. Con mare mosso le barche non partono.'
        },
        {
          id: 'porto-conte',
          title: 'Parco di Porto Conte',
          distance: '15 km in auto',
          image: 'img/alghero/dintorni/parco-porto-conte.jpg',
          description: 'Il Parco Naturale Regionale di Porto Conte abbraccia la penisola di Capo Caccia e la Riserva "Le Prigionette". All\'interno si trova il Nuraghe Palmavera, uno dei nuraghi megalitici meglio conservati della Sardegna, costruito oltre 3.500 anni fa. Il parco è perfetto per trekking e cicloturismo: sentieri nella macchia mediterranea di corbezzolo, lentisco e olivastro, con volpi, martore, falchi pellegrini e i mufloni delle Prigionette.',
          practical: 'Parco sempre aperto, accesso gratuito. Nuraghe Palmavera 9:00–19:00 d\'estate, ingresso ~5 €. Tour "Le Prigionette" su prenotazione, ~10 €. Visita il nuraghe nelle prime ore del mattino per evitare il caldo; porta acqua e scarpe comode.'
        },
        {
          id: 'aragosta-catalana',
          title: 'Aragosta alla catalana',
          distance: '5 min a piedi',
          image: 'img/alghero/dintorni/aragosta-alla-catalana.webp',
          description: 'L\'aragosta alla catalana è il piatto simbolo di Alghero e uno dei più celebri della cucina sarda. La ricetta d\'ispirazione catalana prevede l\'aragosta bollita servita a temperatura ambiente su un letto di pomodori a fette, cipolla rossa, prezzemolo e un filo d\'olio extravergine sardo. Semplice, ma di una bontà straordinaria quando l\'aragosta è fresca e pescata localmente.',
          practical: 'Ristoranti del centro storico e del porto famosi per la qualità dei prodotti ittici. Cena 19:30–23:00, pranzo 12:30–14:30 (non sempre disponibile). Aragosta intera ~40–60 € a persona a seconda del peso. Chiedi sempre il prezzo al chilo prima di ordinare; in alta stagione prenota con due-tre giorni di anticipo. Abbinamento ideale: Torbato di Alghero DOC.'
        },
        {
          id: 'sella-mosca',
          title: 'Cantina Sella & Mosca',
          distance: '5 km in auto',
          image: 'img/alghero/dintorni/cantina-sella-mosca.jpg',
          description: 'La Cantina Sella & Mosca è uno dei monumenti enogastronomici della Sardegna: fondata nel 1899, si estende su oltre 650 ettari di vigneti alle porte di Alghero, una delle più grandi tenute vinicole a conduzione unitaria d\'Europa. Qui si producono il Torbato di Alghero (vitigno autoctono recuperato), il Cannonau di Sardegna, il Vermentino e le Terre Rare.',
          practical: 'Lunedì–sabato 9:00–18:00 (aprile–ottobre), tour guidati su prenotazione. Degustazione ~15–25 € a persona, include tre-quattro vini. Prenota online con anticipo, soprattutto in agosto. A 200 metri dalla cantina c\'è la Necropoli di Anghelu Ruju, tombe ipogeiche del 3.500 a.C. — combina le due visite.'
        }
      ]
    }
  ];

  // "Cosa è incluso" — real amenities, universally inclusive + a couple per-house.
  // Tag: Incluso | Su richiesta. Glyphs stay coherent with V2 design language.
  var included = [
    {
      id: 'aria',       name: 'Aria condizionata',
      icon: '☌',
      one_line: 'In ogni stanza, inclusa nel prezzo.',
      body: 'Climatizzazione caldo/freddo in tutte le camere e nella zona giorno. In luglio e agosto, quando la Sardegna supera i trenta gradi, è una cosa che conta davvero.',
      tag: 'Incluso'
    },
    {
      id: 'cucina',     name: 'Cucina attrezzata',
      icon: '⌗',
      one_line: 'Piatti, pentole, macchinetta del caffè, lavastoviglie.',
      body: 'Tutto quello che serve per cucinare sul serio, non per arrangiarsi. Forno, piano cottura, frigorifero grande, stoviglie per il numero di ospiti massimo della casa.',
      tag: 'Incluso'
    },
    {
      id: 'biancheria', name: 'Biancheria e pulizie finali',
      icon: '≈',
      one_line: 'Lenzuola, asciugamani, pulizia a fine soggiorno.',
      body: 'Biancheria da letto e da bagno inclusa, cambio al giro letto per soggiorni lunghi. Le pulizie finali sono a carico nostro: voi chiudete la porta e basta.',
      tag: 'Incluso'
    },
    {
      id: 'wifi',       name: 'WiFi fibra',
      icon: '→',
      one_line: 'Connessione a circa 100 Mbps in tutta la casa.',
      body: 'Una linea che regge lo streaming, le videochiamate e il lavoro da remoto in bassa stagione. Non pensavate di lavorare? Nemmeno noi — ma se serve, funziona.',
      tag: 'Incluso'
    },
    {
      id: 'lavatrice',  name: 'Lavatrice',
      icon: '✽',
      one_line: 'Utile dopo una settimana fra mare e sabbia.',
      body: 'Carica libera, detersivo di cortesia per il primo lavaggio. Stendere fuori si può, il sole sardo fa il suo lavoro in un paio d\'ore.',
      tag: 'Incluso'
    },
    {
      id: 'tv',         name: 'TV Smart',
      icon: '◦',
      one_line: 'Streaming, app, canali nazionali.',
      body: 'Smart TV nel soggiorno con accesso alle principali piattaforme. Non vi giudicheremo se passerete una serata di pioggia a guardarla.',
      tag: 'Incluso'
    },
    {
      id: 'parcheggio', name: 'Parcheggio',
      icon: '☌',
      one_line: 'Privato a Stintino, condominiale ad Alghero.',
      body: 'A Stintino trovate posto dentro il giardino della villa. Ad Alghero il palazzo ha un\'area condominiale a pochi metri dall\'ingresso. In entrambi i casi l\'auto la scaricate solo una volta.',
      tag: 'Incluso'
    },
    {
      id: 'extra',      name: 'Barbecue, balcone, ascensore',
      icon: '⌗',
      one_line: 'Per la casa giusta, quello che la rende giusta.',
      body: 'A Stintino: barbecue, lettini e tavolo da pranzo in giardino. Ad Alghero: balcone sul cortile interno, ascensore per risparmiarsi i piani a fine giornata.',
      tag: 'Incluso'
    },
    {
      id: 'culla',      name: 'Culla e seggiolone',
      icon: '≈',
      one_line: 'Per chi viaggia con bambini piccoli.',
      body: 'Culla da campeggio e seggiolone disponibili in entrambe le case. Ci segnalate l\'età del bambino quando prenotate e li troviamo in camera all\'arrivo.',
      tag: 'Su richiesta'
    }
  ];

  // Testimonials: 6 real reviews from V1 (3 per house). Format: author · city · casa
  var testimonials = [
    {
      quote: 'Villa splendida, esattamente come nelle foto. A 5 minuti dalla Pelosa — impagabile. Fabio è gentilissimo e sempre disponibile. Torneremo sicuramente.',
      author: 'Marco R.', city: 'Milano', casa: 'Villa Stintino', houseId: 'villa-stintino'
    },
    {
      quote: 'Séjour parfait. La villa est très agréable, calme et bien équipée. La plage de La Pelosa est tout simplement magique. On recommande vivement.',
      author: 'Sophie L.', city: 'Lyon', casa: 'Villa Stintino', houseId: 'villa-stintino'
    },
    {
      quote: 'Traumurlaub in Stintino. Das Haus ist top ausgestattet, der Garten wunderschön. La Pelosa ist wirklich einer der schönsten Strände Europas.',
      author: 'Klaus M.', city: 'München', casa: 'Villa Stintino', houseId: 'villa-stintino'
    },
    {
      quote: 'Appartamento pulitissimo in posizione perfetta. In dieci minuti a piedi si raggiungono spiaggia e centro storico. Fabio risponde sempre subito.',
      author: 'Anna B.', city: 'Roma', casa: 'La Porta del Lido', houseId: 'appartamento-alghero'
    },
    {
      quote: 'Great apartment, very clean and well-equipped. The location is unbeatable — close to the beach and the gorgeous old town. Will definitely return.',
      author: 'James T.', city: 'London', casa: 'La Porta del Lido', houseId: 'appartamento-alghero'
    },
    {
      quote: 'Appartement charmant et très bien situé. Alghero est une ville magnifique. Le propriétaire est très réactif et de bon conseil.',
      author: 'Céline D.', city: 'Paris', casa: 'La Porta del Lido', houseId: 'appartamento-alghero'
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
      q: 'Come si effettua la prenotazione?',
      a: 'Scrivici dal modulo di contatto o via email. Rispondiamo entro ventiquattro ore con disponibilità e condizioni. Il trenta percento di caparra conferma la data; il saldo una settimana prima dell\'arrivo.'
    },
    {
      q: 'Sono ammessi animali domestici?',
      a: 'Al momento no, in nessuna delle due case — ad Alghero è il regolamento condominiale a impedirlo, a Stintino è una scelta nostra. Per casi particolari, scriveteci: ne parliamo.'
    },
    {
      q: 'Cosa è incluso nel prezzo?',
      a: 'Soggiorno, biancheria da letto e da bagno, pulizia finale, WiFi in fibra, aria condizionata, utenze. La tassa di soggiorno comunale è a parte e si salda all\'arrivo.'
    },
    {
      q: 'Come funzionano le cancellazioni?',
      a: 'Fino a trenta giorni prima dell\'arrivo: rimborso completo meno dieci percento. Fra trenta e quattordici giorni: rimborso del cinquanta percento. Sotto i quattordici giorni: nessun rimborso, ma proviamo sempre a rivendere le date e vi ricontattiamo.'
    },
    {
      q: 'Come funziona il check-in?',
      a: 'Check-in dalle sedici, check-out entro le dieci. Possiamo organizzare arrivi tardivi (entro mezzanotte) o check-in autonomo con cassetta di sicurezza. Segnalateci l\'orario stimato il giorno prima: ci sentiamo direttamente.'
    }
  ];

  window.FH_DATA = {
    houses: houses,
    included: included,
    testimonials: testimonials,
    tickerWords: tickerWords,
    faqs: faqs
  };

  // helper accessor
  window.FH_getHouse = function (id) {
    for (var i = 0; i < houses.length; i++) {
      if (houses[i].id === id) return houses[i];
    }
    return null;
  };

})();
