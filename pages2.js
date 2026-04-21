/* ============================================================
   FabioSHouse v2 — PAGES 2
   Detail, Cosa è incluso, Chi siamo, Contatti, 404
   ============================================================ */

(function () {
  'use strict';

  var D = window.FH_DATA;
  var U = window.FH_UTIL;
  var esc = U.esc;
  var emFirstWord = U.emFirstWord;
  var priceFmt = U.priceFmt;

  // Seasons used by the booking card chips (order matters)
  var SEASONS = [
    { key: 'giugno',    label: 'Giugno'    },
    { key: 'luglio',    label: 'Luglio'    },
    { key: 'agosto',    label: 'Agosto'    },
    { key: 'settembre', label: 'Settembre' }
  ];

  // ------------------------- DETAIL -------------------------
  function renderDetail(id) {
    var h = window.FH_getHouse(id);
    if (!h) return renderNotFound();

    // next house for footer link (only 2, so the other one)
    var idx = D.houses.findIndex(function (x) { return x.id === h.id; });
    var next = D.houses[(idx + 1) % D.houses.length];

    var no = String(idx + 1).padStart(2, '0');

    var amenHtml = h.amenities.map(function (a) {
      return '<li>' + esc(a) + '</li>';
    }).join('');

    var galleryHtml = h.gallery.map(function (src, i) {
      return (
        '<figure class="g g' + (i + 1) + '" data-lightbox-src="' + esc(src) + '" data-lightbox-index="' + i + '" data-lightbox-house="' + esc(h.id) + '">' +
          '<img src="' + esc(src) + '" alt="' + esc(h.name) + ' — foto ' + (i + 1) + '" loading="lazy" />' +
        '</figure>'
      );
    }).join('');

    // --- Booking card (weekly seasonal) ---
    // Pick default season = the one matching priceFrom (usually settembre)
    var defaultKey = SEASONS[3].key;
    SEASONS.forEach(function (s) {
      if (h.prices[s.key] === h.priceFrom) defaultKey = s.key;
    });
    var chipsHtml = SEASONS.map(function (s) {
      var active = s.key === defaultKey ? ' active' : '';
      var p = h.prices[s.key];
      return (
        '<button type="button" class="season-chip' + active + '" data-season="' + s.key + '" data-price="' + p + '">' +
          '<span class="lbl">' + esc(s.label) + '</span>' +
          '<span class="p">' + priceFmt(p) + '</span>' +
        '</button>'
      );
    }).join('');

    var defaultPrice = h.prices[defaultKey];
    var cleaning = h.cleaning || 0; // V1 says pulizie incluse → 0
    var defaultTotal = defaultPrice + cleaning;

    var rulesHtml = (h.rules || []).map(function (r) {
      return '<li>' + esc(r) + '</li>';
    }).join('');

    // --- Dintorni (activities) ---
    var activities = h.activities || [];
    var actHtml = activities.map(function (a, i) {
      var alt = (i % 2 === 1) ? ' alt' : '';
      var practical = a.practical
        ? '<p class="act-practical">' + esc(a.practical) + '</p>'
        : '';
      return (
        '<article class="act-row' + alt + '" data-reveal>' +
          '<div class="act-media">' +
            '<img src="' + esc(a.image) + '" alt="' + esc(a.title) + '" loading="lazy" />' +
          '</div>' +
          '<div class="act-body">' +
            '<div class="act-caption">№ ' + String(i + 1).padStart(2, '0') + ' ✽ ' + esc(a.distance || '') + '</div>' +
            '<h3>' + emFirstWord(a.title) + '</h3>' +
            '<p class="act-desc">' + esc(a.description) + '</p>' +
            practical +
          '</div>' +
        '</article>'
      );
    }).join('');

    // Editorial heading per house
    var dintorniHead = h.id === 'villa-stintino'
      ? { eyebrow: 'Dintorni', h2: 'Intorno alla <em>Pelosa</em>.', lede: 'Sei posti a portata di piede, barca o breve auto. Spiagge, parco, storia e cucina del nord-ovest.' }
      : { eyebrow: 'Dintorni', h2: 'Intorno al <em>Lido</em>.', lede: 'Sei posti tra il centro catalano, le spiagge della Riviera del Corallo e la scogliera di Capo Caccia.' };

    return (
      '<section class="det-head">' +
        '<div class="container">' +
          '<div class="det-head-grid" data-reveal>' +
            '<div>' +
              '<div class="caption">№ ' + no + ' · ' + esc(h.location) + ' · ' + esc(h.type) + '</div>' +
              '<h1>' + emFirstWord(h.name) + '</h1>' +
            '</div>' +
            '<div class="loc-side">' + esc(h.location) + ',<br/>' + esc(h.region) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<div class="det-hero">' +
            '<img src="' + esc(h.hero) + '" alt="' + esc(h.name) + '" style="object-position: ' + esc(h.heroFocus || 'center center') + ';" />' +
            '<button class="gallery-cta" data-scroll-to="#gallery">Vedi galleria (' + h.gallery.length + ') →</button>' +
          '</div>' +
          '<div class="det-stats" data-reveal>' +
            '<div class="cell"><span class="big">' + h.guests + '</span>Ospiti</div>' +
            '<div class="cell"><span class="big">' + h.beds + '</span>Camere</div>' +
            '<div class="cell"><span class="big">' + h.baths + '</span>Bagni</div>' +
            '<div class="cell"><span class="big">' + h.sqm + '</span>M²</div>' +
            '<div class="cell"><span class="big">' + h.rating.toFixed(2) + ' ★</span>Rating</div>' +
            '<div class="cell"><span class="big">' + h.reviews + '</span>Recensioni</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect" style="padding-top: clamp(50px, 6vw, 80px);">' +
        '<div class="container">' +
          '<div class="det-split">' +
            '<div class="det-story" data-reveal>' +
              '<p class="eyebrow">La casa</p>' +
              '<h2 class="mt-md">' + esc(h.subtitle) + '</h2>' +
              '<p class="mt-md">' + esc(h.story) + '</p>' +
              '<div class="det-ameneties">' +
                '<h3>Dotazioni</h3>' +
                '<ul class="amenity-grid">' + amenHtml + '</ul>' +
              '</div>' +
              (rulesHtml ? (
                '<div class="det-rules">' +
                  '<h3>Informazioni pratiche</h3>' +
                  '<ul class="amenity-grid">' + rulesHtml + '</ul>' +
                '</div>'
              ) : '') +
            '</div>' +
            '<aside class="book-card" data-book-card data-house="' + esc(h.id) + '" data-cleaning="' + cleaning + '" data-reveal data-delay="2">' +
              '<div class="bk-price">' +
                '<span class="p" data-bk-price>' + priceFmt(defaultPrice) + '</span>' +
                '<small>/ settimana</small>' +
              '</div>' +
              '<div class="rating"><span class="star">★</span> ' + h.rating.toFixed(2) + ' · ' + h.reviews + ' recensioni</div>' +
              '<div class="season-row" role="tablist" aria-label="Seleziona il mese">' + chipsHtml + '</div>' +
              '<div class="guests"><strong>Ospiti</strong> · fino a ' + h.guests + '</div>' +
              '<div class="breakdown">' +
                '<div class="ln"><span>7 notti × <span data-bk-rate>' + priceFmt(defaultPrice) + '</span> / settimana</span><span data-bk-base>' + priceFmt(defaultPrice) + '</span></div>' +
                '<div class="ln"><span>Pulizie finali</span><span>' + (cleaning === 0 ? 'incluse' : priceFmt(cleaning)) + '</span></div>' +
                '<div class="ln total"><span>Totale settimana</span><span data-bk-total>' + priceFmt(defaultTotal) + '</span></div>' +
              '</div>' +
              '<a href="#/contatti?casa=' + esc(h.id) + '" class="btn-primary">Richiedi disponibilità →</a>' +
              '<p class="nota">Nessun pagamento adesso. Rispondiamo entro 24h.</p>' +
            '</aside>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="container" id="gallery">' +
        '<div class="sect-head" data-reveal style="padding-bottom: clamp(20px, 3vw, 40px);">' +
          '<p class="eyebrow">Galleria</p>' +
          '<h2>Entrate <em>piano</em>.</h2>' +
          '<p class="side-note">Clic su una foto per vederla intera.</p>' +
        '</div>' +
        '<div class="gallery" data-gallery-house="' + esc(h.id) + '">' + galleryHtml + '</div>' +
      '</section>' +

      (actHtml ? (
        '<section class="activities" id="dintorni">' +
          '<div class="container">' +
            '<div class="sect-head" data-reveal>' +
              '<p class="eyebrow">' + esc(dintorniHead.eyebrow) + '</p>' +
              '<h2>' + dintorniHead.h2 + '</h2>' +
              '<p class="side-note">' + esc(dintorniHead.lede) + '</p>' +
            '</div>' +
            '<div class="act-list">' + actHtml + '</div>' +
          '</div>' +
        '</section>'
      ) : '') +

      '<section class="det-foot">' +
        '<div class="container" data-reveal>' +
          '<a href="#/case/' + esc(next.id) + '">' +
            '<small>L\'altra casa</small>' +
            emFirstWord(next.name) + ' →' +
          '</a>' +
        '</div>' +
      '</section>'
    );
  }

  function renderNotFound() {
    return (
      '<section class="sect">' +
        '<div class="container">' +
          '<p class="eyebrow">404</p>' +
          '<h1 style="font-size: clamp(44px, 6vw, 88px);" class="mt-md">Pagina non <em>trovata</em>.</h1>' +
          '<p class="lede mt-md" style="max-width: 50ch;">Il link che seguite non corrisponde a niente di nostro. Può capitare. Tornate alle case o scriveteci.</p>' +
          '<div class="mt-xl"><a href="#/case" class="btn-primary">Tutte le case →</a></div>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- COSA È INCLUSO -------------------------
  function renderIncluded() {
    var rowsHtml = D.included.map(function (s) {
      var incl = s.tag === 'Incluso';
      var badge = incl
        ? '<span class="badge incl">Incluso</span>'
        : '<span class="badge">Su richiesta</span>';
      return (
        '<div class="srv-row" data-reveal>' +
          '<div class="glyph">' + esc(s.icon) + '</div>' +
          '<div><h3>' + esc(s.name) + '</h3><p class="mt-md" style="color: var(--ink-3); font-size: 13px; margin-top: 6px;">' + esc(s.one_line) + '</p></div>' +
          '<p>' + esc(s.body) + '</p>' +
          badge +
        '</div>'
      );
    }).join('');

    // Image break: pick a real interior photo from Alghero
    var breakImg = D.houses[1].gallery[2];

    return (
      '<section class="case-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>Cosa è incluso</p>' +
          '<h1 data-reveal data-delay="1">Il prezzo è <em>quello che vedete</em>.</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width: 58ch;">Tutto quello che trovate sotto è compreso nella tariffa settimanale. Niente supplementi per biancheria, pulizie finali, WiFi, aria condizionata. Solo la tassa di soggiorno si salda all\'arrivo.</p>' +
        '</div>' +
      '</section>' +

      '<section class="srv-list">' +
        '<div class="container">' + rowsHtml + '</div>' +
      '</section>' +

      '<div class="img-break" data-reveal>' +
        '<img src="' + esc(breakImg) + '" alt="Dettaglio di interno ad Alghero" />' +
      '</div>' +

      '<section class="container">' +
        '<div class="net-local">' +
          '<div data-reveal>' +
            '<p class="eyebrow">Cosa non è incluso</p>' +
            '<h2 class="mt-md">Solo poche cose, <em>dette chiare</em>.</h2>' +
          '</div>' +
          '<div data-reveal data-delay="2">' +
            '<p>La tassa di soggiorno comunale, che varia di pochi euro a persona per notte ed è fissata dal Comune. La cauzione rimborsabile alla partenza (trecento euro a Stintino, duecento ad Alghero). Le vostre consumazioni personali, ovviamente — noi lasciamo un benvenuto base, ma la spesa la fate voi.</p>' +
            '<p class="mt-md">Nessun costo nascosto per biancheria, pulizie, utenze. Nessuna piattaforma terza che aggiunge percentuali. Quello che leggete nell\'email di conferma è quello che paghereste.</p>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- CHI SIAMO -------------------------
  function renderChiSiamo() {
    // Use a real photo (hero from Stintino / Alghero) for the image break
    var breakImg = D.houses[0].gallery[0];

    return (
      '<section class="story-hero">' +
        '<div class="narrow">' +
          '<p class="caption" data-reveal>Chi siamo</p>' +
          '<h1 data-reveal data-delay="1">Due case, <em>una famiglia</em>, la stessa Sardegna.</h1>' +
          '<p class="lede" data-reveal data-delay="2">Siamo una famiglia sarda. Le nostre due case — la villa di Stintino, l\'appartamento di Alghero — sono posti dove abbiamo passato le estati, gli inverni di passaggio, i pranzi della domenica. A un certo punto abbiamo deciso di aprirle agli ospiti, perché stavano vuote troppi mesi all\'anno e perché ci piaceva l\'idea che qualcun altro le vivesse.</p>' +
        '</div>' +
      '</section>' +

      '<div class="img-break" data-reveal>' +
        '<img src="' + esc(breakImg) + '" alt="La Pelosa al mattino" />' +
      '</div>' +

      '<section class="container">' +
        '<div class="narrow" style="padding-top: clamp(30px, 4vw, 60px); padding-bottom: clamp(30px, 4vw, 60px);">' +
          '<p class="lede" data-reveal>Le case le teniamo noi. Rispondiamo noi ai messaggi, consegniamo noi le chiavi, e quando c\'è da sistemare qualcosa non chiamiamo una gestione: ci pensiamo. Questa è la differenza che sentite quando ci scrivete — e che speriamo si senta anche una volta arrivati.</p>' +
          '<p class="lede mt-md" data-reveal data-delay="1">Non abbiamo grandi piani di espansione. Due case sono quello che riusciamo a curare davvero, e ci va bene così. Quello che proviamo a dare è una Sardegna onesta: la Pelosa a piedi da una parte, il centro catalano dall\'altra, e la possibilità di viverli senza l\'ansia della prenotazione massiva.</p>' +
          '<p class="lede mt-md" data-reveal data-delay="2">Se state pensando a una settimana da noi, scriveteci. Ci sentiamo direttamente, senza moduli automatici.</p>' +
        '</div>' +
      '</section>' +

      '<section class="final-cta">' +
        '<div class="container">' +
          '<p class="eyebrow" style="color: oklch(72% 0.04 75);" data-reveal>Scriveteci</p>' +
          '<h2 data-reveal data-delay="1">Una domanda, <em>una data</em>, una curiosità.</h2>' +
          '<p class="lede" data-reveal data-delay="2">Rispondiamo noi, entro ventiquattro ore. In italiano, inglese, francese o tedesco, come preferite.</p>' +
          '<a href="#/contatti" class="btn-cream" data-reveal data-delay="3">Scrivere a FabioSHouse →</a>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- CONTATTI -------------------------
  function renderContatti() {
    // House select: only Stintino + Alghero + "Entrambe"
    var caseOptions = D.houses.map(function (h) {
      return '<option value="' + esc(h.id) + '">' + esc(h.name) + '</option>';
    }).join('');

    var faqHtml = D.faqs.map(function (f) {
      return (
        '<details>' +
          '<summary>' + esc(f.q) + '</summary>' +
          '<p>' + esc(f.a) + '</p>' +
        '</details>'
      );
    }).join('');

    return (
      '<section class="cnt-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>Contatti</p>' +
          '<h1 data-reveal data-delay="1">Raccontateci il <em>vostro</em> viaggio.</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width: 58ch;">Un modulo rapido o una mail diretta. Rispondiamo noi, entro ventiquattro ore, in italiano, inglese, francese o tedesco.</p>' +
        '</div>' +
      '</section>' +

      '<section class="container">' +
        '<div class="cnt-split">' +
          '<aside class="cnt-side" data-reveal>' +
            '<div class="block">' +
              '<p class="eyebrow">Email</p>' +
              '<p>info@fabioshouse.it</p>' +
              '<p class="sub">Per disponibilità, preventivi e domande.</p>' +
            '</div>' +
            '<div class="block">' +
              '<p class="eyebrow">Dove</p>' +
              '<p>Sardegna, Italia</p>' +
              '<p class="sub">Stintino (SS) · Alghero (SS)</p>' +
            '</div>' +
            '<div class="block">' +
              '<p class="eyebrow">Lingue</p>' +
              '<p>IT · EN · FR · DE</p>' +
              '<p class="sub">Scriveteci nella lingua che preferite.</p>' +
            '</div>' +
          '</aside>' +
          '<form class="cnt-form" id="cnt-form" data-reveal data-delay="2" onsubmit="return false;">' +
            '<div class="row"><label>Nome e cognome</label><input type="text" name="name" required /></div>' +
            '<div class="row"><label>Email</label><input type="email" name="email" required /></div>' +
            '<div class="row"><label>Telefono (opzionale)</label><input type="tel" name="phone" /></div>' +
            '<div class="row"><label>N. ospiti</label><input type="number" name="guests" min="1" max="6" /></div>' +
            '<div class="row wide"><label>Casa di interesse</label>' +
              '<select name="house">' +
                '<option value="">Non ho ancora deciso</option>' +
                caseOptions +
                '<option value="entrambe">Entrambe</option>' +
              '</select>' +
            '</div>' +
            '<div class="row"><label>Periodo (approssimativo)</label><input type="text" name="arrival" placeholder="es. seconda settimana di luglio" /></div>' +
            '<div class="row"><label>Durata</label><input type="text" name="duration" placeholder="es. 7 notti" /></div>' +
            '<div class="row wide"><label>Raccontateci qualcosa</label><textarea name="message" placeholder="Occasione, ospiti, esigenze particolari, cose che vi starebbero a cuore…"></textarea></div>' +
            '<div class="submit"><button type="submit" class="btn-primary">Inviare la richiesta →</button>' +
            '<p class="nota mono" id="cnt-ok" style="margin-top:14px; color: var(--olive); min-height:18px;"></p></div>' +
          '</form>' +
        '</div>' +
      '</section>' +

      '<section class="faq">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">FAQ</p>' +
            '<h2>Le domande <em>ricorrenti</em>.</h2>' +
            '<p class="side-note">Cinque voci che ci fanno quasi tutti, con risposte non generiche.</p>' +
          '</div>' +
          '<div>' + faqHtml + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  window.FH_PAGES = window.FH_PAGES || {};
  window.FH_PAGES.detail = renderDetail;
  window.FH_PAGES.included = renderIncluded;
  window.FH_PAGES.chiSiamo = renderChiSiamo;
  window.FH_PAGES.contatti = renderContatti;
  window.FH_PAGES.notFound = renderNotFound;

})();
