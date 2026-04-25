/* ============================================================
   FabioSHouse v2 — PAGES (home + case list)
   Each page function returns an HTML string to be mounted in #view
   ============================================================ */

(function () {
  'use strict';

  var D = window.FH_DATA;
  // Helper i18n: t(stringKey) o t({it,en,...}). Degrada gracefully se FH_I18N non caricato.
  var t = function (v) {
    return (window.FH_I18N && window.FH_I18N.t) ? window.FH_I18N.t(v)
      : (typeof v === 'string' ? v : (v && (v.it || Object.values(v)[0])) || '');
  };

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
            '<span class="price">' + t('home.prop.from') + ' ' + priceFmt(h.priceFrom) + ' ' + t('home.prop.per_week') + '</span>' +
            '<span class="loc">' + esc(h.location) + ' · ' + esc(h.type) + '</span>' +
          '</div>' +
        '</a>'
      );
    }).join('');

    // how we work points — chiavi i18n
    var howPoints = [
      { n: '01', hKey: 'home.how.pt1.h', tKey: 'home.how.pt1.t' },
      { n: '02', hKey: 'home.how.pt2.h', tKey: 'home.how.pt2.t' },
      { n: '03', hKey: 'home.how.pt3.h', tKey: 'home.how.pt3.t' },
      { n: '04', hKey: 'home.how.pt4.h', tKey: 'home.how.pt4.t' }
    ];
    var howHtml = howPoints.map(function (p) {
      return (
        '<div class="pt">' +
          '<div class="n">' + p.n + '</div>' +
          '<h4>' + t(p.hKey) + '</h4>' +
          '<p>' + t(p.tKey) + '</p>' +
        '</div>'
      );
    }).join('');

    // testimonials — privilegia la lingua attiva, poi completa con altre + mix per casa
    var curLang = (window.FH_I18N && window.FH_I18N.current) || 'it';
    var inLang  = D.testimonials.filter(function (x) { return x.lang === curLang; });
    var other   = D.testimonials.filter(function (x) { return x.lang !== curLang; });
    // dedup per casa se possibile: una per Stintino, una per Alghero, più libera
    function pickOnePerHouse(list) {
      var seen = {}, out = [];
      list.forEach(function (x) { if (!seen[x.houseId]) { seen[x.houseId] = 1; out.push(x); } });
      return out;
    }
    var combined = pickOnePerHouse(inLang).concat(pickOnePerHouse(other)).concat(inLang, other);
    // dedup finale per author + limita a 3
    var used = {};
    var picks = [];
    combined.forEach(function (x) {
      var key = x.author + '·' + x.city;
      if (!used[key] && picks.length < 3) { used[key] = 1; picks.push(x); }
    });
    var quotesHtml = picks.map(function (q) {
      return (
        '<figure data-reveal>' +
          '<blockquote>' + esc(q.quote) + '</blockquote>' +
          '<figcaption>' + esc(q.author) + ' — ' + esc(q.city) + ', ' + t('home.sect3.by') + ' <em>' + esc(q.casa) + '</em></figcaption>' +
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
              '<p class="eyebrow" data-reveal>' + t('home.eyebrow') + '</p>' +
              '<h1 data-reveal data-delay="1">' + t('home.h1') + '</h1>' +
            '</div>' +
            '<p class="side-note" data-reveal data-delay="2">' + t('home.side_note') + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="hero-frame" id="hero-carousel">' +
          slidesHtml +
          '<div class="hero-overlay">' +
            '<div>' +
              '<div class="tag">' + t('home.hero.tag') + '</div>' +
              '<h2>' + t('home.hero.h2') + '</h2>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<div class="hero-stats" data-reveal>' +
            '<div class="stat">2 <small>' + t('home.stats.houses') + '</small></div>' +
            '<div class="stat">' + t('home.stats.season_val') + ' <small>' + t('home.stats.season_label') + '</small></div>' +
            '<div class="stat">4.92 ★ <small>' + t('home.stats.rating') + '</small></div>' +
            '<div class="stat">&lt; 24h <small>' + t('home.stats.response') + '</small></div>' +
            '<a href="#/case" class="btn-primary">' + t('home.stats.cta') + '</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="ticker" aria-hidden="true">' +
        '<div class="ticker-track">' + tickerHtml + '</div>' +
      '</section>' +

      '<section class="how">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">' + t('home.how.eyebrow') + '</p>' +
            '<h2>' + t('home.how.h2') + '</h2>' +
            '<p class="side-note">' + t('home.how.lede') + '</p>' +
          '</div>' +
          '<div class="how-split">' +
            '<div>' +
              '<p class="lede" data-reveal>' + t('home.how.intro') + '</p>' +
              '<div class="how-points">' + howHtml + '</div>' +
            '</div>' +
            '<div class="how-img-wrap" data-reveal data-delay="2">' +
              '<img src="' + esc(howImg) + '" alt="' + esc(D.houses[1].name) + '" loading="lazy" />' +
              '<div class="how-cite">' +
                '<blockquote>' + t('home.cite.q') + '</blockquote>' +
                '<cite>' + t('home.cite.by') + '</cite>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">' + t('home.sect2.eyebrow') + '</p>' +
            '<h2>' + t('home.sect2.h2') + '</h2>' +
            '<p class="side-note">' + t('home.sect2.lede') + '</p>' +
          '</div>' +
          '<div class="prop-grid">' + propHtml + '</div>' +
          '<div class="prop-grid-foot" data-reveal>' +
            '<a href="#/case" class="btn-ghost">' + t('home.sect2.cta') + '</a>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">' + t('home.sect3.eyebrow') + '</p>' +
            '<h2>' + t('home.sect3.h2') + '</h2>' +
            '<p class="side-note">' + t('home.sect3.lede') + '</p>' +
          '</div>' +
          '<div class="quotes">' + quotesHtml + '</div>' +
        '</div>' +
      '</section>' +

      '<section class="final-cta">' +
        '<div class="container">' +
          '<p class="eyebrow" style="color: oklch(72% 0.04 75);" data-reveal>' + t('home.final.eyebrow') + '</p>' +
          '<h2 data-reveal data-delay="1">' + t('home.final.h2') + '</h2>' +
          '<p class="lede" data-reveal data-delay="2">' + t('home.final.lede') + '</p>' +
          '<a href="#/contatti" class="btn-cream" data-reveal data-delay="3">' + t('home.final.cta') + '</a>' +
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
      '<button class="chip active" data-region="all">' + t('case.chip_all') + '</button>' +
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
            '<a href="#/case/' + esc(h.id) + '"><img src="' + esc(h.hero) + '" alt="' + esc(t(h.name)) + '" loading="lazy" /></a>' +
          '</div>' +
          '<div class="cr-body">' +
            '<div class="cr-caption">№ ' + no + ' · ' + esc(h.location) + ' · ' + esc(t(h.type)) + '</div>' +
            '<h2>' + emFirstWord(t(h.name)) + '</h2>' +
            '<p class="lede">' + esc(t(h.story).split('.')[0]) + '.</p>' +
            '<div class="stats-strip">' +
              '<div class="s"><span class="num">' + h.guests + '</span>' + t('case.row.guests') + '</div>' +
              '<div class="s"><span class="num">' + h.beds   + '</span>' + t('case.row.beds') + '</div>' +
              '<div class="s"><span class="num">' + h.baths  + '</span>' + t('case.row.baths') + '</div>' +
              '<div class="s"><span class="num">' + h.sqm    + '</span>' + t('case.row.sqm') + '</div>' +
            '</div>' +
            '<div class="cr-foot">' +
              '<div class="price">' + t('home.prop.from') + ' ' + priceFmt(h.priceFrom) + ' <small>' + t('home.prop.per_week') + '</small></div>' +
              '<a href="#/case/' + esc(h.id) + '" class="btn-ghost">' + t('case.row.explore') + '</a>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    return (
      '<section class="case-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>' + t('case.eyebrow') + '</p>' +
          '<h1 data-reveal data-delay="1">' + t('case.h1') + '</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width:58ch;">' + t('case.lede') + '</p>' +
        '</div>' +
      '</section>' +

      '<div class="container">' +
        '<div class="case-filters" id="case-filters">' +
          chipsHtml +
          '<span class="spacer"></span>' +
          '<select id="case-sort" aria-label="' + esc(t('case.sort_aria')) + '">' +
            '<option value="featured">'  + t('case.sort.featured')  + '</option>' +
            '<option value="priceAsc">'  + t('case.sort.priceAsc')  + '</option>' +
            '<option value="priceDesc">' + t('case.sort.priceDesc') + '</option>' +
            '<option value="guests">'    + t('case.sort.guests')    + '</option>' +
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
