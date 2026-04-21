/* ============================================================
   FabioSHouse v2 — PAGES (home + case list)
   Each page function returns an HTML string to be mounted in #view
   ============================================================ */

(function () {
  'use strict';

  var D = window.FH_DATA;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // italicize first word of a house name for headings
  function emFirstWord(name) {
    var parts = esc(name).split(' ');
    if (parts.length === 1) return '<em>' + parts[0] + '</em>';
    return '<em>' + parts[0] + '</em> ' + parts.slice(1).join(' ');
  }

  function priceFmt(n) {
    return '€' + n.toLocaleString('it-IT');
  }

  // ------------------------- HOME -------------------------
  function renderHome() {
    // Static landscape hero — the service first, specific houses later in the page.
    // Uses the real Pelosa photo ported from V1 (img/home/hero-home-spiaggia-pelosa.jpg).
    var slidesHtml =
      '<div class="slide active" data-slide="0">' +
        '<img src="img/home/hero-home-spiaggia-pelosa.jpg" alt="La Pelosa, Stintino — nord-ovest della Sardegna" loading="eager" style="object-position: center 55%;" />' +
      '</div>';
    var dotsHtml = ''; // no carousel anymore — single hero frame

    // ticker: repeat twice for seamless loop
    var tWords = D.tickerWords.concat(D.tickerWords);
    var tickerHtml = tWords.map(function (w, i) {
      return (i === 0 ? '' : '<span class="sep">✽</span>') + '<span>' + esc(w) + '</span>';
    }).join('');

    // property grid (2 cards, custom spans via .pc-1 / .pc-2)
    var propHtml = D.houses.map(function (h, i) {
      var no = String(i + 1).padStart(2, '0');
      return (
        '<a href="#/case/' + esc(h.id) + '" class="prop-card pc-' + (i + 1) + '" data-reveal data-delay="' + ((i % 4) + 1) + '">' +
          '<div class="tag-row"><span class="no">№ ' + no + '</span><span class="region">' + esc(h.location) + '</span></div>' +
          '<div class="prop-frame"><img src="' + esc(h.hero) + '" alt="' + esc(h.name) + '" loading="lazy" /></div>' +
          '<div class="prop-meta">' +
            '<h3>' + emFirstWord(h.name) + '</h3>' +
            '<span class="price">da ' + priceFmt(h.priceFrom) + ' / settimana</span>' +
            '<span class="loc">' + esc(h.location) + ' · ' + esc(h.type) + '</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    // how we work points — honest rewrite for a family-run 2-house operation
    var howPoints = [
      { n: '01', h: 'Due case, stessa mano', t: 'Le gestiamo noi, direttamente. Le chiavi le diamo noi, rispondiamo noi ai messaggi.' },
      { n: '02', h: 'Sardegna vera',         t: 'Pelosa a piedi a Stintino, centro catalano ad Alghero. Due pezzi di isola diversi, entrambi autentici.' },
      { n: '03', h: 'Ospiti, non clienti',   t: 'Vi rispondiamo entro ventiquattro ore, in italiano, inglese, francese o tedesco. Nessun automatismo.' },
      { n: '04', h: 'Tutto incluso',         t: 'Biancheria, pulizie finali, WiFi in fibra, aria condizionata. Il prezzo sul sito è quello che pagate.' }
    ];
    var howHtml = howPoints.map(function (p) {
      return (
        '<div class="pt">' +
          '<div class="n">' + p.n + '</div>' +
          '<h4>' + esc(p.h) + '</h4>' +
          '<p>' + esc(p.t) + '</p>' +
        '</div>'
      );
    }).join('');

    // testimonials — pick 3 strongest (one per language is nice)
    var picks = [D.testimonials[0], D.testimonials[3], D.testimonials[2]];
    var quotesHtml = picks.map(function (t) {
      return (
        '<figure data-reveal>' +
          '<blockquote>' + esc(t.quote) + '</blockquote>' +
          '<figcaption>' + esc(t.author) + ' — ' + esc(t.city) + ', ospiti a <em>' + esc(t.casa) + '</em></figcaption>' +
        '</figure>'
      );
    }).join('');

    // how-split image: use a real Alghero photo
    var howImg = D.houses[1].gallery[1];

    return (
      '<section class="hero-top">' +
        '<div class="container">' +
          '<div class="head-grid">' +
            '<div>' +
              '<p class="eyebrow" data-reveal>Sardegna · due case, due mari</p>' +
              '<h1 data-reveal data-delay="1">La tua estate <em>tra Stintino</em> e Alghero.</h1>' +
            '</div>' +
            '<p class="side-note" data-reveal data-delay="2">Due case gestite da una famiglia: una villa a cinque minuti dalla Pelosa, un appartamento nel centro catalano di Alghero. La stessa cura in posti che non si somigliano.</p>' +
          '</div>' +
        '</div>' +
        '<div class="hero-frame" id="hero-carousel">' +
          slidesHtml +
          '<div class="hero-overlay">' +
            '<div>' +
              '<div class="tag">La Pelosa · Stintino</div>' +
              '<h2>Tra le spiagge <em>più belle</em> d\'Europa.</h2>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<div class="hero-stats" data-reveal>' +
            '<div class="stat">2 <small>Case</small></div>' +
            '<div class="stat">Giu–Set <small>Stagione</small></div>' +
            '<div class="stat">4.92 ★ <small>Rating medio</small></div>' +
            '<div class="stat">&lt; 24h <small>Tempo risposta</small></div>' +
            '<a href="#/case" class="btn-primary">Esplora le case →</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ticker" aria-hidden="true">' +
        '<div class="ticker-track">' + tickerHtml + '</div>' +
      '</section>' +

      '<section class="how">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">01 — Come lavoriamo</p>' +
            '<h2>Piccolo, <em>apposta</em>.</h2>' +
            '<p class="side-note">Due case e basta. Preferiamo curarle bene che averne dieci da tenere a metà.</p>' +
          '</div>' +
          '<div class="how-split">' +
            '<div>' +
              '<p class="lede" data-reveal>Una famiglia che da qualche anno affitta le proprie due case sarde a chi vuole passare un\'estate nel nord-ovest dell\'isola. Rispondiamo noi ai messaggi, consegniamo noi le chiavi, e se serve qualcosa durante il soggiorno basta una telefonata.</p>' +
              '<div class="how-points">' + howHtml + '</div>' +
            '</div>' +
            '<div class="how-img-wrap" data-reveal data-delay="2">' +
              '<img src="' + esc(howImg) + '" alt="Dettaglio di interno" loading="lazy" />' +
              '<div class="how-cite">' +
                '<blockquote>"Sono case che conosciamo a memoria. Le teniamo come le terremmo per noi."</blockquote>' +
                '<cite>— Fabio</cite>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">02 — Le nostre case</p>' +
            '<h2>Due proprietà, <em>una sola famiglia</em>.</h2>' +
            '<p class="side-note">Una villa con giardino a Stintino, un appartamento in centro ad Alghero. Stessa cura, due vacanze molto diverse.</p>' +
          '</div>' +
          '<div class="prop-grid">' + propHtml + '</div>' +
          '<div class="prop-grid-foot" data-reveal>' +
            '<a href="#/case" class="btn-ghost">Vedi entrambe le case →</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">03 — Testimonial</p>' +
            '<h2>Hanno <em>dormito da noi</em>.</h2>' +
            '<p class="side-note">Tre voci su più di cinquanta famiglie che sono passate. Nessuna ritoccata.</p>' +
          '</div>' +
          '<div class="quotes">' + quotesHtml + '</div>' +
        '</div>' +
      '</section>' +

      '<section class="final-cta">' +
        '<div class="container">' +
          '<p class="eyebrow" style="color: oklch(72% 0.04 75);" data-reveal>Raccontateci</p>' +
          '<h2 data-reveal data-delay="1">State pensando a una settimana, <em>a una famiglia</em>, a un mare.</h2>' +
          '<p class="lede" data-reveal data-delay="2">Scriveteci quando volete. Rispondiamo entro ventiquattro ore, in italiano, inglese, francese o tedesco. Nessun modulo di preventivo finto.</p>' +
          '<a href="#/contatti" class="btn-cream" data-reveal data-delay="3">Scrivere a FabioSHouse →</a>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- CASE (list) -------------------------
  function renderCase() {
    // Only one region (Sardegna) → use location chips instead: Tutte / Stintino / Alghero
    var locations = [];
    D.houses.forEach(function (h) {
      if (locations.indexOf(h.location) === -1) locations.push(h.location);
    });

    var chipsHtml =
      '<button class="chip active" data-region="all">Tutte</button>' +
      locations.map(function (r) {
        return '<button class="chip" data-region="' + esc(r) + '">' + esc(r) + '</button>';
      }).join('');

    var rowsHtml = D.houses.map(function (h, i) {
      var no = String(i + 1).padStart(2, '0');
      var alt = i % 2 === 1 ? ' alt' : '';
      // For the list we filter on location (not region, all are Sardegna)
      return (
        '<article class="case-row' + alt + '" data-region="' + esc(h.location) + '" data-price="' + h.priceFrom + '" data-rating="' + h.rating + '" data-guests="' + h.guests + '" data-featured-order="' + i + '" data-reveal>' +
          '<div class="cr-media">' +
            '<a href="#/case/' + esc(h.id) + '"><img src="' + esc(h.hero) + '" alt="' + esc(h.name) + '" loading="lazy" /></a>' +
          '</div>' +
          '<div class="cr-body">' +
            '<div class="cr-caption">№ ' + no + ' · ' + esc(h.location) + ' · ' + esc(h.type) + '</div>' +
            '<h2>' + emFirstWord(h.name) + '</h2>' +
            '<p class="lede">' + esc(h.story.split('.')[0]) + '.</p>' +
            '<div class="stats-strip">' +
              '<div class="s"><span class="num">' + h.guests + '</span>Ospiti</div>' +
              '<div class="s"><span class="num">' + h.beds + '</span>Camere</div>' +
              '<div class="s"><span class="num">' + h.baths + '</span>Bagni</div>' +
              '<div class="s"><span class="num">' + h.sqm + '</span>M²</div>' +
            '</div>' +
            '<div class="cr-foot">' +
              '<div class="price">da ' + priceFmt(h.priceFrom) + ' <small>/ settimana</small></div>' +
              '<a href="#/case/' + esc(h.id) + '" class="btn-ghost">Esplora →</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    return (
      '<section class="case-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>Sardegna · due case</p>' +
          '<h1 data-reveal data-delay="1">Le <em>Case</em>.</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width:58ch;">Una villa di novanta metri quadri a Stintino, cinque minuti a piedi dalla Pelosa. Un appartamento di settanta metri quadri nel centro storico di Alghero. Stessa cura, due vacanze molto diverse.</p>' +
        '</div>' +
      '</section>' +

      '<div class="container">' +
        '<div class="case-filters" id="case-filters">' +
          chipsHtml +
          '<span class="spacer"></span>' +
          '<select id="case-sort" aria-label="Ordina le case">' +
            '<option value="featured">In evidenza</option>' +
            '<option value="priceAsc">Prezzo · crescente</option>' +
            '<option value="priceDesc">Prezzo · decrescente</option>' +
            '<option value="guests">Capienza</option>' +
          '</select>' +
        '</div>' +
      '</div>' +

      '<section class="case-list">' +
        '<div class="container" id="case-list-container">' + rowsHtml + '</div>' +
      '</section>'
    );
  }

  window.FH_PAGES = window.FH_PAGES || {};
  window.FH_PAGES.home = renderHome;
  window.FH_PAGES.case = renderCase;

  // shared helpers
  window.FH_UTIL = {
    esc: esc,
    emFirstWord: emFirstWord,
    priceFmt: priceFmt
  };

})();
