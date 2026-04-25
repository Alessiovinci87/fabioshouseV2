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
  var t = function (v) {
    return (window.FH_I18N && window.FH_I18N.t) ? window.FH_I18N.t(v)
      : (typeof v === 'string' ? v : (v && (v.it || Object.values(v)[0])) || '');
  };

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
      return '<li>' + esc(t(a)) + '</li>';
    }).join('');

    // Mosaic mostra max 8 foto "hero"; il lightbox ha accesso a tutta h.gallery
    var MOSAIC_LIMIT = 8;
    var mosaicPhotos = h.gallery.slice(0, MOSAIC_LIMIT);
    var hiddenCount = Math.max(0, h.gallery.length - MOSAIC_LIMIT);
    var galleryHtml = mosaicPhotos.map(function (src, i) {
      var isLastWithMore = (i === mosaicPhotos.length - 1) && hiddenCount > 0;
      var overlay = isLastWithMore
        ? '<span class="g-more-overlay" aria-hidden="true">' +
            '<span class="g-more-num">+' + hiddenCount + '</span>' +
            '<span class="g-more-lbl">' + t('det.gallery.morelbl') + '</span>' +
          '</span>'
        : '';
      var cls = 'g g' + (i + 1) + (isLastWithMore ? ' g-has-more' : '');
      var clickIdx = isLastWithMore ? MOSAIC_LIMIT : i;
      return (
        '<figure class="' + cls + '" data-lightbox-src="' + esc(src) + '" data-lightbox-index="' + clickIdx + '" data-lightbox-house="' + esc(h.id) + '">' +
          '<img src="' + esc(src) + '" alt="' + esc(t(h.name)) + ' — ' + (i + 1) + '" loading="lazy" />' +
          overlay +
        '</figure>'
      );
    }).join('');
    var galleryMoreHtml = hiddenCount > 0
      ? ('<div class="gallery-more" data-reveal>' +
           '<button type="button" class="btn-primary" data-open-lightbox="0">' +
             '<span aria-hidden="true" style="margin-right:8px;">⌗</span>' +
             t('det.gallery.openall').replace('%n', h.gallery.length) +
           '</button>' +
         '</div>')
      : '';

    // --- Booking card (weekly seasonal) ---
    var defaultKey = SEASONS[3].key;
    SEASONS.forEach(function (s) {
      if (h.prices[s.key] === h.priceFrom) defaultKey = s.key;
    });
    var chipsHtml = SEASONS.map(function (s) {
      var active = s.key === defaultKey ? ' active' : '';
      var p = h.prices[s.key];
      return (
        '<button type="button" class="season-chip' + active + '" data-season="' + s.key + '" data-price="' + p + '">' +
          '<span class="lbl">' + t('det.book.month.' + s.key) + '</span>' +
          '<span class="p">' + priceFmt(p) + '</span>' +
        '</button>'
      );
    }).join('');

    var defaultPrice = h.prices[defaultKey];
    var cleaning = h.cleaning || 0;
    var defaultTotal = defaultPrice + cleaning;

    var rulesHtml = (h.rules || []).map(function (r) {
      return '<li>' + esc(t(r)) + '</li>';
    }).join('');

    // --- Dintorni (activities) ---
    var activities = h.activities || [];
    var actHtml = activities.map(function (a, i) {
      var alt = (i % 2 === 1) ? ' alt' : '';
      var practicalStr = t(a.practical);
      var practical = practicalStr
        ? '<p class="act-practical">' + esc(practicalStr) + '</p>'
        : '';
      var moreBtn = a.slug
        ? '<p class="act-more"><a class="btn-ghost" href="#/luogo/' + esc(a.slug) + '">' + t('det.dintorni.cta') + ' →</a></p>'
        : '';
      return (
        '<article class="act-row' + alt + '" data-reveal>' +
          '<div class="act-media">' +
            '<img src="' + esc(a.image) + '" alt="' + esc(t(a.title)) + '" loading="lazy" />' +
          '</div>' +
          '<div class="act-body">' +
            '<div class="act-caption">№ ' + String(i + 1).padStart(2, '0') + ' ✽ ' + esc(t(a.distance || '')) + '</div>' +
            '<h3>' + emFirstWord(t(a.title)) + '</h3>' +
            '<p class="act-desc">' + esc(t(a.description)) + '</p>' +
            practical +
            moreBtn +
          '</div>' +
        '</article>'
      );
    }).join('');

    // Heading dintorni — chiavi DICT per casa
    var dintorniHead = h.id === 'villa-stintino'
      ? { h2: t('det.dintorni.stintino_h2'), lede: t('det.dintorni.stintino_lede') }
      : { h2: t('det.dintorni.alghero_h2'),  lede: t('det.dintorni.alghero_lede') };

    // --- Guida locale ---
    var guide = h.guide || [];
    var guideHtml = guide.map(function (card) {
      var cardTitle = card.id
        ? t('det.guide.card.' + card.id)
        : t(card.title || '');
      var itemsHtml = (card.items || []).map(function (it) {
        var href = it.href ? esc(it.href) : '#';
        var rel = (it.href && it.href.indexOf('google.com') > -1) ? 'noopener' : 'noopener nofollow';
        var nameStr = t(it.name);
        return (
          '<li class="guide-item">' +
            '<div class="guide-item-info">' +
              '<strong>' + esc(nameStr) + '</strong>' +
              '<span>' + esc(t(it.desc)) + '</span>' +
            '</div>' +
            '<a class="guide-link" href="' + href + '" target="_blank" rel="' + rel + '" aria-label="' + esc(nameStr) + ' — ' + esc(t('det.guide.link_aria')) + '">→</a>' +
          '</li>'
        );
      }).join('');
      return (
        '<article class="guide-card" data-reveal>' +
          '<header class="guide-card-head">' +
            '<span class="guide-icon" aria-hidden="true">' + esc(card.icon || '') + '</span>' +
            '<h3>' + esc(cardTitle) + '</h3>' +
          '</header>' +
          '<ul class="guide-list">' + itemsHtml + '</ul>' +
        '</article>'
      );
    }).join('');
    var guideHead = h.id === 'villa-stintino'
      ? { h2: t('det.guide.stintino_h2'), lede: t('det.guide.stintino_lede') }
      : { h2: t('det.guide.alghero_h2'),  lede: t('det.guide.alghero_lede') };

    return (
      '<nav class="det-breadcrumb" aria-label="' + esc(t('det.breadcrumb_aria')) + '">' +
        '<div class="container">' +
          '<ol>' +
            '<li><a href="#/">' + t('nav.home') + '</a></li>' +
            '<li><a href="#/case">' + t('nav.cases') + '</a></li>' +
            '<li aria-current="page">' + esc(t(h.name)) + '</li>' +
          '</ol>' +
        '</div>' +
      '</nav>' +

      '<section class="det-head">' +
        '<div class="container">' +
          '<div class="det-head-grid" data-reveal>' +
            '<div>' +
              '<div class="caption">№ ' + no + ' · ' + esc(h.location) + ' · ' + esc(t(h.type)) + '</div>' +
              '<h1>' + emFirstWord(t(h.name)) + '</h1>' +
            '</div>' +
            '<div class="loc-side">' +
              '<span class="loc-txt">' + esc(h.location) + ', ' + esc(h.region) + '</span>' +
              '<button type="button" class="share-btn" data-share-house="' + esc(h.id) + '" aria-label="' + esc(t('det.share')) + '">' +
                '<span aria-hidden="true">↗</span> <span class="share-lbl">' + esc(t('det.share')) + '</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="container">' +
          '<div class="det-hero">' +
            '<img src="' + esc(h.hero) + '" alt="' + esc(t(h.name)) + '" style="object-position: ' + esc(h.heroFocus || 'center center') + ';" />' +
            '<button class="gallery-cta" data-scroll-to="#gallery">' + t('det.gallery_cta') + ' (' + h.gallery.length + ') →</button>' +
          '</div>' +
          '<div class="det-stats" data-reveal>' +
            '<div class="cell"><span class="big">' + h.guests + '</span>' + t('det.stats.guests') + '</div>' +
            '<div class="cell"><span class="big">' + h.beds   + '</span>' + t('det.stats.beds') + '</div>' +
            '<div class="cell"><span class="big">' + h.baths  + '</span>' + t('det.stats.baths') + '</div>' +
            '<div class="cell"><span class="big">' + h.sqm    + '</span>' + t('det.stats.sqm') + '</div>' +
            '<div class="cell"><span class="big">' + h.rating.toFixed(2) + ' ★</span>' + t('det.stats.rating') + '</div>' +
            '<div class="cell"><span class="big">' + h.reviews + '</span>' + t('det.stats.reviews') + '</div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="sect" style="padding-top: clamp(50px, 6vw, 80px);">' +
        '<div class="container">' +
          '<div class="det-split">' +
            '<div class="det-story" data-reveal>' +
              '<p class="eyebrow">' + t('det.thehouse') + '</p>' +
              '<h2 class="mt-md">' + esc(t(h.subtitle)) + '</h2>' +
              '<p class="mt-md">' + esc(t(h.story)) + '</p>' +
              '<div class="det-ameneties">' +
                '<h3>' + t('det.amenities') + '</h3>' +
                '<ul class="amenity-grid">' + amenHtml + '</ul>' +
              '</div>' +
              (rulesHtml ? (
                '<div class="det-rules">' +
                  '<h3>' + t('det.practical') + '</h3>' +
                  '<ul class="amenity-grid">' + rulesHtml + '</ul>' +
                '</div>'
              ) : '') +
            '</div>' +
            '<aside class="book-card" data-book-card data-house="' + esc(h.id) + '" data-cleaning="' + cleaning + '" data-reveal data-delay="2">' +
              '<div class="bk-price">' +
                '<span class="p" data-bk-price>' + priceFmt(defaultPrice) + '</span>' +
                '<small>' + t('det.book.perweek') + '</small>' +
              '</div>' +
              '<div class="rating"><span class="star">★</span> ' + h.rating.toFixed(2) + ' · ' + h.reviews + ' ' + t('det.book.reviews') + '</div>' +
              '<div class="season-row" role="tablist" aria-label="' + esc(t('det.book.season_aria')) + '">' + chipsHtml + '</div>' +
              '<div class="guests"><strong>' + t('det.book.guests') + '</strong> · ' + t('det.book.guests_up_to') + ' ' + h.guests + '</div>' +
              '<div class="breakdown">' +
                '<div class="ln"><span>' + t('det.book.nights') + ' <span data-bk-rate>' + priceFmt(defaultPrice) + '</span> ' + t('det.book.perweek') + '</span><span data-bk-base>' + priceFmt(defaultPrice) + '</span></div>' +
                '<div class="ln"><span>' + t('det.book.cleaning') + '</span><span>' + (cleaning === 0 ? t('det.book.included') : priceFmt(cleaning)) + '</span></div>' +
                '<div class="ln total"><span>' + t('det.book.total') + '</span><span data-bk-total>' + priceFmt(defaultTotal) + '</span></div>' +
              '</div>' +
              '<a href="#/contatti?casa=' + esc(h.id) + '" class="btn-primary">' + t('det.book.cta') + '</a>' +
              '<p class="nota">' + t('det.book.note') + '</p>' +
            '</aside>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="container" id="gallery">' +
        '<div class="sect-head" data-reveal style="padding-bottom: clamp(20px, 3vw, 40px);">' +
          '<p class="eyebrow">' + t('det.gallery.eyebrow') + '</p>' +
          '<h2>' + t('det.gallery.h2') + '</h2>' +
          '<p class="side-note">' + t('det.gallery.sub') + '</p>' +
        '</div>' +
        '<div class="gallery" data-gallery-house="' + esc(h.id) + '">' + galleryHtml + '</div>' +
        galleryMoreHtml +
      '</section>' +

      (h.videoTour ? (
        '<section class="video-tour" id="tour">' +
          '<div class="container">' +
            '<div class="vt-grid">' +
              '<div class="vt-phone" data-reveal>' +
                '<div class="vt-phone-frame">' +
                  '<span class="vt-phone-notch" aria-hidden="true"></span>' +
                  '<div class="vt-phone-screen">' +
                    '<video controls preload="none" playsinline ' +
                      'poster="' + esc(h.videoTour.poster) + '" ' +
                      'aria-label="Video tour — ' + esc(t(h.name)) + '">' +
                      '<source src="' + esc(h.videoTour.src) + '" type="video/mp4" />' +
                      '<a href="' + esc(h.videoTour.src) + '">' + esc(t(h.name)) + ' · video</a>' +
                    '</video>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="vt-copy" data-reveal data-delay="2">' +
                '<p class="eyebrow">' + t('det.tour.eyebrow') + '</p>' +
                '<h2 class="mt-md">' + t('det.tour.h2') + '</h2>' +
                '<p class="lede mt-md">' + t('det.tour.lede') + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</section>'
      ) : '') +

      (actHtml ? (
        '<section class="activities" id="dintorni">' +
          '<div class="container">' +
            '<div class="sect-head" data-reveal>' +
              '<p class="eyebrow">' + t('det.dintorni.eyebrow') + '</p>' +
              '<h2>' + dintorniHead.h2 + '</h2>' +
              '<p class="side-note">' + esc(dintorniHead.lede) + '</p>' +
            '</div>' +
            '<div class="act-list">' + actHtml + '</div>' +
          '</div>' +
        '</section>'
      ) : '') +

      (guideHtml ? (
        '<section class="guide" id="guida">' +
          '<div class="container">' +
            '<div class="sect-head" data-reveal>' +
              '<p class="eyebrow">' + t('det.guide.eyebrow') + '</p>' +
              '<h2>' + guideHead.h2 + '</h2>' +
              '<p class="side-note">' + esc(guideHead.lede) + '</p>' +
            '</div>' +
            '<div class="guide-grid">' + guideHtml + '</div>' +
            '<p class="guide-note" data-reveal>' + t('det.guide.note') + '</p>' +
          '</div>' +
        '</section>'
      ) : '') +

      (function () {
        // Carosello visuale "Luoghi da vedere" — solo POI con foto locale
        var withImg = (h.poi || []).filter(function (p) { return !!p.image; });
        if (!withImg.length) return '';
        var cardsHtml = withImg.map(function (p) {
          var name = esc(t(p.name));
          var desc = esc(t(p.desc || ''));
          // Se il POI ha slug, puntiamo alla pagina interna dedicata (SEO first).
          // Altrimenti, fallback al link esterno con target=_blank.
          var internal = !!p.slug;
          var primary = internal ? ('#/luogo/' + p.slug)
                                 : (p.link || p.wiki || p.gmaps || '#');
          var ctaKey = internal ? 'det.places.moreinfo'
                      : p.link  ? 'det.places.moreinfo'
                      : p.wiki  ? 'det.places.moreinfo'
                      : 'det.places.openmap';
          var linkAttrs = internal
            ? ''
            : ' target="_blank" rel="noopener"';
          var imgClass = 'place-img' + (p.imageFocus ? ' place-img--focus-' + esc(p.imageFocus) : '');
          return (
            '<a class="place-card" href="' + esc(primary) + '"' + linkAttrs + ' aria-label="' + name + '">' +
              '<div class="' + imgClass + '"><img src="' + esc(p.image) + '" alt="' + name + '" loading="lazy" /></div>' +
              '<div class="place-body">' +
                '<h3>' + name + '</h3>' +
                (desc ? '<p>' + desc + '</p>' : '') +
                '<span class="place-cta mono">' + esc(t(ctaKey)) + '</span>' +
              '</div>' +
            '</a>'
          );
        }).join('');
        var placesH2 = h.id === 'villa-stintino' ? 'det.places.stintino_h2' : 'det.places.alghero_h2';
        return (
          '<section class="det-places" id="luoghi">' +
            '<div class="container">' +
              '<div class="sect-head" data-reveal>' +
                '<p class="eyebrow">' + t('det.places.eyebrow') + '</p>' +
                '<h2>' + t(placesH2) + '</h2>' +
                '<p class="side-note">' + t('det.places.lede') + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="places-track" role="list">' + cardsHtml + '</div>' +
          '</section>'
        );
      })() +

      (h.geo && h.poi ? (
        '<section class="det-map-section" id="mappa">' +
          '<div class="container">' +
            '<div class="sect-head" data-reveal>' +
              '<p class="eyebrow">' + t('det.map.eyebrow') + '</p>' +
              '<h2>' + t(h.id === 'villa-stintino' ? 'det.map.stintino_h2' : 'det.map.alghero_h2') + '</h2>' +
              '<p class="side-note">' + t('det.map.lede') + '</p>' +
            '</div>' +
            '<div class="det-map-wrap" data-reveal>' +
              '<div id="det-map" data-map-house="' + esc(h.id) + '" role="application" aria-label="' + esc(t('det.map.lede')) + '"></div>' +
              '<p class="det-map-note mono">' + t('det.map.approx') + '</p>' +
            '</div>' +
          '</div>' +
        '</section>'
      ) : '') +

      '<section class="det-foot">' +
        '<div class="container" data-reveal>' +
          '<a href="#/case/' + esc(next.id) + '">' +
            '<small>' + t('det.other') + '</small>' +
            emFirstWord(t(next.name)) + ' →' +
          '</a>' +
        '</div>' +
      '</section>'
    );
  }

  function renderNotFound() {
    return (
      '<section class="sect">' +
        '<div class="container">' +
          '<p class="eyebrow">' + t('nf.eyebrow') + '</p>' +
          '<h1 style="font-size: clamp(44px, 6vw, 88px);" class="mt-md">' + t('nf.h1') + '</h1>' +
          '<p class="lede mt-md" style="max-width: 50ch;">' + t('nf.lede') + '</p>' +
          '<div class="mt-xl" style="display:flex; gap:16px; flex-wrap:wrap;">' +
            '<a href="#/case" class="btn-primary">' + t('nf.cta.cases') + '</a>' +
            '<a href="#/contatti" class="btn-ghost">' + t('nf.cta.contact') + '</a>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- COSA È INCLUSO -------------------------
  function renderIncluded() {
    var rowsHtml = D.included.map(function (s) {
      // s.tag può essere stringa legacy ('Incluso'/'Su richiesta') o oggetto multilingua
      var tagStr = typeof s.tag === 'string' ? s.tag : t(s.tag);
      var incl = tagStr === 'Incluso' || s.tag === 'Incluso' || (s.tag && s.tag.it === 'Incluso');
      var badge = incl
        ? '<span class="badge incl">' + t('inc.badge.included')  + '</span>'
        : '<span class="badge">'      + t('inc.badge.onrequest') + '</span>';
      return (
        '<div class="srv-row" data-reveal>' +
          '<div class="glyph">' + esc(s.icon) + '</div>' +
          '<div><h3>' + esc(t(s.name)) + '</h3><p class="mt-md" style="color: var(--ink-3); font-size: 13px; margin-top: 6px;">' + esc(t(s.one_line)) + '</p></div>' +
          '<p>' + esc(t(s.body)) + '</p>' +
          badge +
        '</div>'
      );
    }).join('');

    // Image break: pick a real interior photo from Alghero
    var breakImg = D.houses[1].gallery[2];

    return (
      '<section class="case-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>' + t('inc.eyebrow') + '</p>' +
          '<h1 data-reveal data-delay="1">' + t('inc.h1') + '</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width: 58ch;">' + t('inc.lede') + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="srv-list">' +
        '<div class="container">' + rowsHtml + '</div>' +
      '</section>' +

      '<div class="img-break" data-reveal>' +
        '<img src="' + esc(breakImg) + '" alt="" />' +
      '</div>' +

      '<section class="container">' +
        '<div class="net-local">' +
          '<div data-reveal>' +
            '<p class="eyebrow">' + t('inc.notinc.eyebrow') + '</p>' +
            '<h2 class="mt-md">' + t('inc.notinc.h2') + '</h2>' +
          '</div>' +
          '<div data-reveal data-delay="2">' +
            '<p>' + t('inc.notinc.body1') + '</p>' +
            '<p class="mt-md">' + t('inc.notinc.body2') + '</p>' +
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
          '<p class="caption" data-reveal>' + t('about.eyebrow') + '</p>' +
          '<h1 data-reveal data-delay="1">' + t('about.h1') + '</h1>' +
          '<p class="lede" data-reveal data-delay="2">' + t('about.lede1') + '</p>' +
        '</div>' +
      '</section>' +

      '<div class="img-break" data-reveal>' +
        '<img src="' + esc(breakImg) + '" alt="' + esc(t('about.img_alt')) + '" />' +
      '</div>' +

      '<section class="container">' +
        '<div class="narrow" style="padding-top: clamp(30px, 4vw, 60px); padding-bottom: clamp(30px, 4vw, 60px);">' +
          '<p class="lede" data-reveal>' + t('about.body1') + '</p>' +
          '<p class="lede mt-md" data-reveal data-delay="1">' + t('about.body2') + '</p>' +
          '<p class="lede mt-md" data-reveal data-delay="2">' + t('about.body3') + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="final-cta">' +
        '<div class="container">' +
          '<p class="eyebrow" style="color: oklch(72% 0.04 75);" data-reveal>' + t('about.cta.eyebrow') + '</p>' +
          '<h2 data-reveal data-delay="1">' + t('about.cta.h2') + '</h2>' +
          '<p class="lede" data-reveal data-delay="2">' + t('about.cta.lede') + '</p>' +
          '<a href="#/contatti" class="btn-cream" data-reveal data-delay="3">' + t('home.final.cta') + '</a>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- CONTATTI -------------------------
  function renderContatti() {
    // House select: only Stintino + Alghero + "Entrambe"
    var caseOptions = D.houses.map(function (h) {
      return '<option value="' + esc(h.id) + '">' + esc(t(h.name)) + '</option>';
    }).join('');

    var faqHtml = D.faqs.map(function (f) {
      return (
        '<details>' +
          '<summary>' + esc(t(f.q)) + '</summary>' +
          '<p>' + esc(t(f.a)) + '</p>' +
        '</details>'
      );
    }).join('');

    return (
      '<section class="cnt-head">' +
        '<div class="container">' +
          '<p class="eyebrow" data-reveal>' + t('contact.eyebrow') + '</p>' +
          '<h1 data-reveal data-delay="1">' + t('contact.h1') + '</h1>' +
          '<p class="lede mt-md" data-reveal data-delay="2" style="max-width: 58ch;">' + t('contact.lede') + '</p>' +
        '</div>' +
      '</section>' +

      '<section class="container">' +
        '<div class="cnt-split">' +
          '<aside class="cnt-side" data-reveal>' +
            '<div class="block">' +
              '<p class="eyebrow">' + t('contact.side.email') + '</p>' +
              '<p><a class="email-copy" href="mailto:info@fabioshouse.it" data-copy-email="info@fabioshouse.it" title="' + esc(t('contact.email.copy')) + '">info@fabioshouse.it</a></p>' +
              '<p class="sub">' + t('contact.side.email_sub') + '</p>' +
            '</div>' +
            '<div class="block">' +
              '<p class="eyebrow">' + t('contact.side.where') + '</p>' +
              '<p>' + t('contact.side.where_val') + '</p>' +
              '<p class="sub">' + t('contact.side.where_sub') + '</p>' +
            '</div>' +
            '<div class="block">' +
              '<p class="eyebrow">' + t('contact.side.languages') + '</p>' +
              '<p>IT · EN · FR · DE</p>' +
              '<p class="sub">' + t('contact.side.languages_sub') + '</p>' +
            '</div>' +
          '</aside>' +
          '<form class="cnt-form" id="cnt-form" data-reveal data-delay="2" onsubmit="return false;">' +
            '<div class="row"><label>' + t('contact.form.name') + '</label><input type="text" name="name" required /></div>' +
            '<div class="row"><label>' + t('contact.side.email') + '</label><input type="email" name="email" required /></div>' +
            '<div class="row"><label>' + t('contact.form.phone') + '</label><input type="tel" name="phone" /></div>' +
            '<div class="row"><label>' + t('contact.form.guests') + '</label><input type="number" name="guests" min="1" max="6" /></div>' +
            '<div class="row wide"><label>' + t('contact.form.house') + '</label>' +
              '<select name="house">' +
                '<option value="">' + t('contact.form.undecided') + '</option>' +
                caseOptions +
                '<option value="entrambe">' + t('contact.form.both') + '</option>' +
              '</select>' +
            '</div>' +
            '<div class="row"><label>' + t('contact.form.arrival') + '</label><input type="text" name="arrival" placeholder="' + esc(t('contact.form.arrival_ph')) + '" /></div>' +
            '<div class="row"><label>' + t('contact.form.duration') + '</label><input type="text" name="duration" placeholder="' + esc(t('contact.form.duration_ph')) + '" /></div>' +
            '<div class="row wide"><label>' + t('contact.form.message') + '</label><textarea name="message" placeholder="' + esc(t('contact.form.message_ph')) + '"></textarea></div>' +
            '<div class="submit"><button type="submit" class="btn-primary">' + t('contact.form.submit') + '</button>' +
            '<p class="nota mono" id="cnt-ok" style="margin-top:14px; color: var(--olive); min-height:18px;"></p></div>' +
          '</form>' +
        '</div>' +
      '</section>' +

      '<section class="faq">' +
        '<div class="container">' +
          '<div class="sect-head" data-reveal>' +
            '<p class="eyebrow">' + t('contact.faq.eyebrow') + '</p>' +
            '<h2>' + t('contact.faq.h2') + '</h2>' +
            '<p class="side-note">' + t('contact.faq.lede') + '</p>' +
          '</div>' +
          '<div>' + faqHtml + '</div>' +
        '</div>' +
      '</section>'
    );
  }

  // ------------------------- LUOGO (pagina interna) -------------------------
  // Usata per approfondimenti SEO di POI importanti (es. Monte d'Accoddi,
  // Castelsardo). Struttura: breadcrumb → header con titolo/subtitle/distanza
  // → hero immagine (se disponibile) → intro → sezioni H2+body markdown-lite
  // → link ufficiali/wiki/gmaps → CTA ritorno alla pagina proprietà.
  function renderLuogo(slug) {
    var L = window.FH_getLuogo ? window.FH_getLuogo(slug) : null;
    if (!L) return renderNotFound();

    // Casa "padre" (per breadcrumb e CTA di rientro)
    var parentHouse = L.parent ? window.FH_getHouse(L.parent) : null;

    // Inline: esc HTML, ma riammette <strong>...</strong> dal sorgente.
    // Niente paragrafi.
    function inlineMd(str) {
      return esc(str)
        .replace(/&lt;strong&gt;/g, '<strong>')
        .replace(/&lt;\/strong&gt;/g, '</strong>');
    }
    // Block: come inlineMd, più paragrafi da doppio a-capo.
    function bodyHtml(str) {
      var s = inlineMd(str);
      var parts = s.split(/\n\n+/);
      return parts.map(function (p) { return '<p>' + p + '</p>'; }).join('');
    }

    var sectionsHtml = (L.sections || []).map(function (sec, i) {
      var alt = (i % 2 === 1) ? ' luogo-sect--alt' : '';
      return (
        '<section class="luogo-sect' + alt + '" data-reveal>' +
          '<div class="container narrow">' +
            '<h2>' + esc(t(sec.h2)) + '</h2>' +
            '<div class="luogo-body">' + bodyHtml(t(sec.body)) + '</div>' +
          '</div>' +
        '</section>'
      );
    }).join('');

    // Pagine-indice: griglia di card che linkano ad altre pagine luogo.
    var relatedHtml = '';
    if (L.relatedLuoghi && L.relatedLuoghi.length && window.FH_getLuogo) {
      var cards = L.relatedLuoghi.map(function (slug) {
        var R = window.FH_getLuogo(slug);
        if (!R) return '';
        var name = esc(t(R.name));
        var sub  = esc(t(R.subtitle || ''));
        var img  = R.hero
          ? '<div class="place-img"><img src="' + esc(R.hero) + '" alt="' + name + '" loading="lazy" /></div>'
          : '';
        return (
          '<a class="place-card" href="#/luogo/' + esc(slug) + '" aria-label="' + name + '">' +
            img +
            '<div class="place-body">' +
              '<h3>' + name + '</h3>' +
              (sub ? '<p>' + sub + '</p>' : '') +
              '<span class="place-cta mono">' + esc(t('det.places.moreinfo')) + '</span>' +
            '</div>' +
          '</a>'
        );
      }).join('');
      if (cards) {
        relatedHtml = (
          '<section class="luogo-related" data-reveal>' +
            '<div class="container">' +
              '<div class="sect-head">' +
                '<p class="eyebrow">' + t('luogo.related.eyebrow') + '</p>' +
                '<h2>' + t('luogo.related.h2') + '</h2>' +
              '</div>' +
              '<div class="luogo-grid">' + cards + '</div>' +
            '</div>' +
          '</section>'
        );
      }
    }

    // Sezione placeholder (es. "selezione ristoranti in arrivo").
    var placeholderHtml = '';
    if (L.placeholder) {
      placeholderHtml = (
        '<section class="luogo-placeholder" data-reveal>' +
          '<div class="container narrow">' +
            '<p class="eyebrow">' + t('luogo.placeholder.eyebrow') + '</p>' +
            '<h2 class="mt-md">' + esc(t(L.placeholder.h2)) + '</h2>' +
            '<p class="lede mt-md">' + esc(t(L.placeholder.body)) + '</p>' +
          '</div>' +
        '</section>'
      );
    }

    // Link esterni (ufficiale / wiki / gmaps)
    var lk = L.links || {};
    var linkBtns = [];
    if (lk.booking)  linkBtns.push('<a class="btn-primary" href="' + esc(lk.booking)  + '" target="_blank" rel="noopener">' + t('luogo.link.booking')  + ' →</a>');
    if (lk.diving)   linkBtns.push('<a class="btn-primary" href="' + esc(lk.diving)   + '" target="_blank" rel="noopener">' + t('luogo.link.diving')   + ' →</a>');
    if (lk.windsurf) linkBtns.push('<a class="btn-primary" href="' + esc(lk.windsurf) + '" target="_blank" rel="noopener">' + t('luogo.link.windsurf') + ' →</a>');
    if (lk.official) {
      var hasPrimary = !!(lk.booking || lk.diving || lk.windsurf);
      var officialClass = hasPrimary ? 'btn-ghost' : 'btn-primary';
      linkBtns.push('<a class="' + officialClass + '" href="' + esc(lk.official) + '" target="_blank" rel="noopener">' + t('luogo.link.official') + ' →</a>');
    }
    if (lk.wiki)     linkBtns.push('<a class="btn-ghost"  href="' + esc(lk.wiki)     + '" target="_blank" rel="noopener">' + t('luogo.link.wiki') + ' →</a>');
    if (lk.gmaps)    linkBtns.push('<a class="btn-ghost"  href="' + esc(lk.gmaps)    + '" target="_blank" rel="noopener">' + t('luogo.link.gmaps') + ' →</a>');

    var heroImg = L.hero
      ? '<div class="luogo-hero" data-reveal><img src="' + esc(L.hero) + '" alt="' + esc(t(L.name)) + '" style="object-position: ' + esc(L.heroFocus || 'center center') + ';" /></div>'
      : '';

    var breadcrumbParent = parentHouse
      ? '<li><a href="#/case/' + esc(parentHouse.id) + '">' + esc(t(parentHouse.name)) + '</a></li>'
      : '';

    return (
      '<nav class="det-breadcrumb" aria-label="' + esc(t('det.breadcrumb_aria')) + '">' +
        '<div class="container">' +
          '<ol>' +
            '<li><a href="#/">' + t('nav.home') + '</a></li>' +
            '<li><a href="#/case">' + t('nav.cases') + '</a></li>' +
            breadcrumbParent +
            '<li aria-current="page">' + esc(t(L.name)) + '</li>' +
          '</ol>' +
        '</div>' +
      '</nav>' +

      '<section class="luogo-head">' +
        '<div class="container">' +
          '<div data-reveal>' +
            '<p class="eyebrow">' + esc(t(L.location)) + '</p>' +
            '<h1>' + emFirstWord(t(L.name)) + '</h1>' +
            '<p class="lede mt-md" style="max-width: 58ch;">' + esc(t(L.subtitle)) + '</p>' +
            '<p class="caption mt-md mono">✽ ' + esc(t(L.distance)) + '</p>' +
          '</div>' +
        '</div>' +
      '</section>' +

      heroImg +

      '<section class="luogo-intro" data-reveal>' +
        '<div class="container narrow">' +
          '<p class="lede">' + inlineMd(t(L.intro)) + '</p>' +
        '</div>' +
      '</section>' +

      sectionsHtml +

      relatedHtml +

      placeholderHtml +

      (linkBtns.length ? (
        '<section class="luogo-links" data-reveal>' +
          '<div class="container narrow">' +
            '<p class="eyebrow">' + t('luogo.links.eyebrow') + '</p>' +
            '<h2 class="mt-md">' + t('luogo.links.h2') + '</h2>' +
            '<div class="luogo-link-row mt-md">' + linkBtns.join('') + '</div>' +
          '</div>' +
        '</section>'
      ) : '') +

      (parentHouse ? (
        '<section class="det-foot">' +
          '<div class="container" data-reveal>' +
            '<a href="#/case/' + esc(parentHouse.id) + '">' +
              '<small>' + t('luogo.back.small') + '</small>' +
              emFirstWord(t(parentHouse.name)) + ' →' +
            '</a>' +
          '</div>' +
        '</section>'
      ) : '')
    );
  }

  window.FH_PAGES = window.FH_PAGES || {};
  window.FH_PAGES.detail = renderDetail;
  window.FH_PAGES.luogo = renderLuogo;
  window.FH_PAGES.included = renderIncluded;
  window.FH_PAGES.chiSiamo = renderChiSiamo;
  window.FH_PAGES.contatti = renderContatti;
  window.FH_PAGES.notFound = renderNotFound;

})();
