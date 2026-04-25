/* ============================================================
   FabioSHouse v2 — APP
   Router, reveal, lightbox, hover-cue, tweaks, nav, hero carousel,
   booking-card season chips
   ============================================================ */

(function () {
  'use strict';

  var D = window.FH_DATA;
  var P = window.FH_PAGES;

  var view = document.getElementById('view');
  var nav = document.getElementById('nav');
  var navLinks = document.getElementById('nav-links');

  // --------------------------- ROUTER ---------------------------
  // Old V2 routes we silently redirect (giornale removed entirely;
  // servizi → incluso; storia → chi-siamo)
  var REDIRECTS = {
    giornale:  '/',
    servizi:   '/incluso',
    storia:    '/chi-siamo'
  };

  function parseHash() {
    var raw = (location.hash || '#/').replace(/^#/, '');
    // strip query string for routing
    var h = raw.split('?')[0];
    if (!h || h === '/') return { name: 'home' };
    var parts = h.split('/').filter(Boolean); // ['case','id']
    var head = parts[0];

    // handle redirects
    if (REDIRECTS[head] != null) {
      var target = '#' + REDIRECTS[head];
      history.replaceState(null, '', target);
      return parseHash();
    }

    switch (head) {
      case 'case':
        if (parts[1]) return { name: 'detail', id: parts[1] };
        return { name: 'case' };
      case 'luogo':
        if (parts[1]) return { name: 'luogo', slug: parts[1] };
        return { name: 'home' };
      case 'incluso':    return { name: 'included' };
      case 'chi-siamo':  return { name: 'chiSiamo' };
      case 'contatti':   return { name: 'contatti' };
      default:           return { name: 'home' };
    }
  }

  // Aggiunge un <link rel="preload" as="image" fetchpriority="high"> per la
  // hero della pagina target (detail/luogo) prima del render del DOM. Il
  // browser inizia il fetch in parallelo al parsing/render, riducendo l'LCP.
  function preloadRouteHero(r) {
    var existing = document.getElementById('preload-route-hero');
    if (existing) existing.remove();
    var src = null;
    if (r.name === 'detail' && window.FH_getHouse) {
      var h = window.FH_getHouse(r.id);
      if (h && h.hero) src = h.hero;
    } else if (r.name === 'luogo' && window.FH_getLuogo) {
      var L = window.FH_getLuogo(r.slug);
      if (L && L.hero) src = L.hero;
    }
    if (!src) return;
    var link = document.createElement('link');
    link.id = 'preload-route-hero';
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
  }

  function renderRoute() {
    var r = parseHash();
    preloadRouteHero(r);
    var html = '';
    switch (r.name) {
      case 'home':     html = P.home();       break;
      case 'case':     html = P.case();       break;
      case 'detail':   html = P.detail(r.id); break;
      case 'luogo':    html = P.luogo(r.slug); break;
      case 'included': html = P.included();   break;
      case 'chiSiamo': html = P.chiSiamo();   break;
      case 'contatti': html = P.contatti();   break;
      default:         html = P.notFound();
    }
    view.innerHTML = html;

    // Ripristino scroll quando si torna alla detail dal carosello "Luoghi
    // da vedere" (click su .place-card → salviamo houseId+scrollY in
    // sessionStorage; qui li consumiamo se la casa coincide).
    var restored = false;
    if (r.name === 'detail') {
      try {
        var raw = sessionStorage.getItem('fh_places_return');
        if (raw) {
          var p = JSON.parse(raw);
          if (p && p.houseId === r.id && typeof p.scrollY === 'number') {
            sessionStorage.removeItem('fh_places_return');
            restored = true;
            // due rAF per dare tempo al layout (immagini cached) di stabilizzarsi
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                window.scrollTo({ top: p.scrollY, behavior: 'auto' });
              });
            });
          }
        }
      } catch (e) {}
    }
    if (!restored) window.scrollTo({ top: 0, behavior: 'auto' });

    // persist
    try { localStorage.setItem('fh_route', location.hash || '#/'); } catch (e) {}

    updateActiveNav(r);
    // applica i18n ai [data-i18n] appena renderizzati
    if (window.FH_I18N && window.FH_I18N.translateDom) window.FH_I18N.translateDom(view);
    applyRouteMeta(r);
    applyLuogoJsonLd(r);
    updateWhatsApp(r);
    initReveal();
    initPageSpecific(r);
  }

  // Origin assoluto per og:image / canonical / JSON-LD: in produzione
  // forziamo il dominio finale anche quando l'utente naviga su localhost.
  var SITE_ORIGIN = 'https://www.fabioshouse.it';
  var DEFAULT_OG_IMAGE = SITE_ORIGIN + '/img/og-home.jpg';

  function absUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//.test(path)) return path;
    return SITE_ORIGIN + '/' + String(path).replace(/^\/+/, '');
  }

  // SEO per route: aggiorna <title> + meta description + og:title/description/image
  // coerenti con la route SPA attiva e la lingua corrente.
  function applyRouteMeta(r) {
    if (!window.FH_I18N) return;
    var t = window.FH_I18N.t;
    var key;
    var ogImage = DEFAULT_OG_IMAGE;
    // Rotte "luogo": titolo/description/og:image generati dal dato del luogo,
    // non da una chiave i18n: ogni luogo nuovo funziona senza toccare i dict.
    if (r.name === 'luogo' && window.FH_getLuogo) {
      var L = window.FH_getLuogo(r.slug);
      if (L) {
        var tt = (L.name && (t(L.name) || L.name.it)) || '';
        var ds = (L.subtitle && (t(L.subtitle) || L.subtitle.it)) || '';
        if (tt) document.title = tt + ' — Fabio\'s House';
        setMeta('name',     'description',       ds);
        setMeta('property', 'og:title',          tt);
        setMeta('property', 'og:description',    ds);
        setMeta('name',     'twitter:title',     tt);
        setMeta('name',     'twitter:description', ds);
        if (L.hero) {
          ogImage = absUrl(L.hero);
          setMeta('property', 'og:image',       ogImage);
          setMeta('name',     'twitter:image',  ogImage);
        } else {
          setMeta('property', 'og:image',       DEFAULT_OG_IMAGE);
          setMeta('name',     'twitter:image',  DEFAULT_OG_IMAGE);
        }
        return;
      }
    }
    // Rotte "detail": og:image dalla foto hero della casa.
    if (r.name === 'detail' && window.FH_getHouse) {
      var h = window.FH_getHouse(r.id);
      if (h && h.hero) ogImage = absUrl(h.hero);
    }
    switch (r.name) {
      case 'home':     key = null; break; // meta base già a posto (meta.title/description)
      case 'case':     key = 'meta.route.case';    break;
      case 'detail':
        if      (r.id === 'villa-stintino')       key = 'meta.route.stintino';
        else if (r.id === 'appartamento-alghero') key = 'meta.route.alghero';
        else                                       key = null;
        break;
      case 'included': key = 'meta.route.incluso';   break;
      case 'chiSiamo': key = 'meta.route.chisiamo';  break;
      case 'contatti': key = 'meta.route.contatti';  break;
      default:         key = 'meta.nf';              break;
    }
    // se non abbiamo override, uso i meta base della home
    var titleKey = key ? key + '.title'       : 'meta.title';
    var descKey  = key ? key + '.description' : 'meta.description';
    var title = t(titleKey);
    var desc  = t(descKey);
    if (title) document.title = title;
    setMeta('name',     'description',      desc);
    setMeta('property', 'og:title',         title);
    setMeta('property', 'og:description',   desc);
    setMeta('name',     'twitter:title',    title);
    setMeta('name',     'twitter:description', desc);
    setMeta('property', 'og:image',         ogImage);
    setMeta('name',     'twitter:image',    ogImage);
  }
  function setMeta(attr, val, content) {
    if (!content) return;
    var el = document.querySelector('meta[' + attr + '="' + val + '"]');
    if (el) el.setAttribute('content', content);
  }

  // JSON-LD TouristAttraction per ogni pagina luogo. Lo iniettiamo come
  // <script id="jsonld-luogo"> e lo rimuoviamo quando si lascia la route.
  function applyLuogoJsonLd(r) {
    var existing = document.getElementById('jsonld-luogo');
    if (r.name !== 'luogo' || !window.FH_getLuogo) {
      if (existing) existing.remove();
      return;
    }
    var L = window.FH_getLuogo(r.slug);
    if (!L) { if (existing) existing.remove(); return; }
    var t = (window.FH_I18N && window.FH_I18N.t) || function (x) { return x && x.it; };
    var h = L.parent && window.FH_getHouse ? window.FH_getHouse(L.parent) : null;
    var areaName = (h && h.location) ||
                   (L.parent === 'villa-stintino' ? 'Stintino' :
                    L.parent === 'appartamento-alghero' ? 'Alghero' : 'Sardegna');
    var url = SITE_ORIGIN + '/#/luogo/' + r.slug;
    var img = L.hero ? absUrl(L.hero) : DEFAULT_OG_IMAGE;
    var data = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      '@id': url,
      name: t(L.name) || (L.name && L.name.it) || r.slug,
      description: t(L.subtitle) || (L.subtitle && L.subtitle.it) || '',
      image: img,
      url: url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: areaName,
        addressRegion: 'Sardegna',
        addressCountry: 'IT'
      },
      isAccessibleForFree: true
    };
    if (h) {
      data.containedInPlace = {
        '@type': 'LodgingBusiness',
        '@id': SITE_ORIGIN + '/#/case/' + h.id,
        name: (typeof h.name === 'string') ? h.name : t(h.name)
      };
    }
    if (existing) existing.remove();
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'jsonld-luogo';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  // Permette a i18n.setLang() di richiedere un re-render della route corrente
  window.FH_rerender = renderRoute;

  function updateActiveNav(r) {
    if (!navLinks) return;
    var links = navLinks.querySelectorAll('a[data-route]');
    links.forEach(function (a) {
      var route = a.getAttribute('data-route');
      var active = false;
      if (route === '/' && r.name === 'home') active = true;
      else if (route === '/case' && (r.name === 'case' || r.name === 'detail' || r.name === 'luogo')) active = true;
      else if (route === '/incluso'   && r.name === 'included') active = true;
      else if (route === '/chi-siamo' && r.name === 'chiSiamo') active = true;
      else if (route === '/' + r.name) active = true;
      a.classList.toggle('active', active);
    });
  }

  window.addEventListener('hashchange', renderRoute);

  // Salva la posizione della detail quando si entra in una pagina luogo
  // (qualsiasi link a #/luogo/<slug>: card del carosello, "Scopri di più"
  // delle activity, ecc.) così al ritorno si riapre allo scroll del click
  // invece che in cima alla pagina.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#/luogo/"]');
    if (!a) return;
    var r = parseHash();
    if (r.name !== 'detail' || !r.id) return;
    try {
      sessionStorage.setItem('fh_places_return', JSON.stringify({
        houseId: r.id,
        scrollY: window.scrollY || window.pageYOffset || 0
      }));
    } catch (err) {}
  }, true);

  // --------------------------- REVEAL ---------------------------
  var revealObs = null;
  function initReveal() {
    if (revealObs) revealObs.disconnect();
    var els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { revealObs.observe(e); });
  }

  // --------------------------- WHATSAPP FLOAT ---------------------------
  // Aggiorna link WhatsApp in base a route + lingua.
  var waEl = document.getElementById('wa-float');
  function updateWhatsApp(r) {
    if (!waEl) return;
    var num = waEl.getAttribute('data-wa-number');
    if (!num) return;
    var msgKey = 'ui.wa.msg_home';
    if (r) {
      if (r.name === 'detail' && r.id === 'villa-stintino')       msgKey = 'ui.wa.msg_stintino';
      else if (r.name === 'detail' && r.id === 'appartamento-alghero') msgKey = 'ui.wa.msg_alghero';
    }
    var msg = (window.FH_I18N && window.FH_I18N.t) ? window.FH_I18N.t(msgKey) : '';
    waEl.href = 'https://wa.me/' + num + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }
  // init all'avvio
  updateWhatsApp(null);

  // --------------------------- BACK-TO-TOP ---------------------------
  var btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    var onScroll = function () {
      var show = window.scrollY > 500;
      btt.classList.toggle('show', show);
      btt.setAttribute('aria-hidden', show ? 'false' : 'true');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --------------------------- TOAST + CLIPBOARD ---------------------------
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // fallback legacy
    return new Promise(function (res, rej) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); ta.remove(); res();
      } catch (e) { rej(e); }
    });
  }
  var ti18n = function (k) { return (window.FH_I18N && window.FH_I18N.t) ? window.FH_I18N.t(k) : k; };

  // Delegation: share + copy-email buttons lavorano ovunque nella SPA
  document.addEventListener('click', function (e) {
    var shareBtn = e.target.closest && e.target.closest('[data-share-house]');
    if (shareBtn) {
      e.preventDefault();
      var houseId = shareBtn.getAttribute('data-share-house');
      var h = window.FH_getHouse(houseId);
      var url = location.origin + location.pathname + '#/case/' + houseId;
      var title = (h && ti18n(h.name)) || 'FabioSHouse';
      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function () {});
      } else {
        copyToClipboard(url).then(function () {
          toast(ti18n('det.share.copied'));
        }, function () {
          toast(ti18n('det.share.fail'));
        });
      }
      return;
    }
    var emailBtn = e.target.closest && e.target.closest('[data-copy-email]');
    if (emailBtn) {
      e.preventDefault();
      var addr = emailBtn.getAttribute('data-copy-email');
      copyToClipboard(addr).then(function () {
        toast(ti18n('contact.email.copied'));
      }, function () {
        toast(ti18n('det.share.fail'));
      });
    }
  });

  // --------------------------- PAGE-SPECIFIC ---------------------------
  function initPageSpecific(r) {
    if (r.name === 'home')     initHeroCarousel();
    if (r.name === 'case')     initCaseFilters();
    if (r.name === 'detail')   { initGallery(r.id); initBookingCard(); initVideoTour(); initDetailMap(r.id); }
    if (r.name === 'contatti') { initContactForm(); prefillContactHouse(); }

    // "Vedi galleria" scroll
    var scrollBtn = document.querySelector('[data-scroll-to]');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function () {
        var target = document.querySelector(scrollBtn.getAttribute('data-scroll-to'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    // hover cue for property cards (home)
    initHoverCue();
  }

  // --------------------------- HERO CAROUSEL ---------------------------
  var carouselTimer = null;
  function initHeroCarousel() {
    var car = document.getElementById('hero-carousel');
    if (!car) return;
    var slides = car.querySelectorAll('.slide');
    var dotsWrap = car.querySelector('.hero-paginator');
    var dots = dotsWrap ? dotsWrap.querySelectorAll('button') : [];
    var nameEl = document.getElementById('hero-name');
    var heroSlides = D.houses.slice(); // one per house — currently 2
    var cur = 0;

    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === cur); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === cur); });
      if (nameEl && heroSlides[cur]) nameEl.textContent = heroSlides[cur].name;
    }

    function next() { go(cur + 1); }

    if (carouselTimer) clearInterval(carouselTimer);
    // Static single-slide hero — no rotation, no dots bound
    if (slides.length <= 1) return;
    carouselTimer = setInterval(next, 5000);

    dots.forEach(function (d, idx) {
      d.addEventListener('click', function () {
        go(idx);
        if (carouselTimer) clearInterval(carouselTimer);
        carouselTimer = setInterval(next, 5000);
      });
    });

    car.addEventListener('mouseenter', function () {
      if (carouselTimer) { clearInterval(carouselTimer); carouselTimer = null; }
    });
    car.addEventListener('mouseleave', function () {
      if (!carouselTimer) carouselTimer = setInterval(next, 5000);
    });
  }

  // --------------------------- BOOKING CARD (season chips) ---------------------------
  function initBookingCard() {
    var card = document.querySelector('[data-book-card]');
    if (!card) return;
    var chips = card.querySelectorAll('.season-chip');
    var priceEl = card.querySelector('[data-bk-price]');
    var rateEl  = card.querySelector('[data-bk-rate]');
    var baseEl  = card.querySelector('[data-bk-base]');
    var totalEl = card.querySelector('[data-bk-total]');
    var cleaning = parseInt(card.getAttribute('data-cleaning') || '0', 10);

    function priceFmt(n) { return '€' + Number(n).toLocaleString('it-IT'); }

    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
        var p = parseInt(c.getAttribute('data-price'), 10);
        if (priceEl) priceEl.textContent = priceFmt(p);
        if (rateEl)  rateEl.textContent  = priceFmt(p);
        if (baseEl)  baseEl.textContent  = priceFmt(p);
        if (totalEl) totalEl.textContent = priceFmt(p + cleaning);
      });
    });
  }

  // --------------------------- CASE FILTERS ---------------------------
  function initCaseFilters() {
    var bar = document.getElementById('case-filters');
    var container = document.getElementById('case-list-container');
    var sort = document.getElementById('case-sort');
    if (!bar || !container) return;

    var activeRegion = 'all';
    var activeSort = 'featured';

    function applyFilters() {
      var rows = Array.prototype.slice.call(container.querySelectorAll('.case-row'));
      rows.forEach(function (row) {
        var reg = row.getAttribute('data-region');
        var show = (activeRegion === 'all') || (reg === activeRegion);
        row.style.display = show ? '' : 'none';
      });
      var sorted = rows.slice().sort(function (a, b) {
        switch (activeSort) {
          case 'priceAsc':  return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
          case 'priceDesc': return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
          case 'guests':    return parseInt(b.dataset.guests, 10) - parseInt(a.dataset.guests, 10);
          default:          return parseInt(a.dataset.featuredOrder, 10) - parseInt(b.dataset.featuredOrder, 10);
        }
      });
      sorted.forEach(function (r, idx) {
        r.classList.toggle('alt', idx % 2 === 1);
        container.appendChild(r);
      });
    }

    bar.addEventListener('click', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('chip')) {
        var chips = bar.querySelectorAll('.chip');
        chips.forEach(function (c) { c.classList.remove('active'); });
        t.classList.add('active');
        activeRegion = t.getAttribute('data-region');
        applyFilters();
      }
    });
    if (sort) {
      sort.addEventListener('change', function () {
        activeSort = sort.value;
        applyFilters();
      });
    }
  }

  // --------------------------- MAP (Leaflet, lazy-loaded) ---------------------------
  // Carica Leaflet da CDN solo quando si apre una detail page con geo+poi.
  var _leafletPromise = null;
  function loadLeaflet() {
    if (_leafletPromise) return _leafletPromise;
    _leafletPromise = new Promise(function (resolve, reject) {
      if (window.L) return resolve(window.L);
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      css.crossOrigin = '';
      document.head.appendChild(css);
      var js = document.createElement('script');
      js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      js.crossOrigin = '';
      js.onload = function () { resolve(window.L); };
      js.onerror = reject;
      document.head.appendChild(js);
    });
    return _leafletPromise;
  }

  function initDetailMap(houseId) {
    var h = window.FH_getHouse(houseId);
    if (!h || !h.geo || !h.poi) return;
    var el = document.getElementById('det-map');
    if (!el) return;
    var ti = function (v) { return (window.FH_I18N && window.FH_I18N.t) ? window.FH_I18N.t(v) : (typeof v === 'string' ? v : (v && v.it) || ''); };

    loadLeaflet().then(function (L) {
      if (!el.isConnected) return; // route già cambiata
      el.innerHTML = '';
      var map = L.map(el, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([h.geo.lat, h.geo.lng], h.geo.zoom || 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(map);

      // Pin "casa" — icona custom CSS
      var houseIcon = L.divIcon({
        className: 'fh-pin fh-pin-house',
        html: '<span class="fh-pin-dot"></span><span class="fh-pin-ring"></span>',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });
      var homePopup =
        '<strong>' + ti(h.name) + '</strong><br/>' +
        '<span style="color:#666; font-size:12px;">' + ti('det.map.here') + ' · ' + h.location + '</span>';
      L.marker([h.geo.lat, h.geo.lng], { icon: houseIcon, title: ti(h.name), zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(homePopup);

      // POI pins
      var poiIcon = L.divIcon({
        className: 'fh-pin fh-pin-poi',
        html: '<span class="fh-pin-dot"></span>',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });
      var bounds = [[h.geo.lat, h.geo.lng]];
      h.poi.forEach(function (p) {
        var name = ti(p.name);
        var desc = ti(p.desc);
        var parts = [];
        if (p.gmaps) parts.push('<a href="' + p.gmaps + '" target="_blank" rel="noopener">→ ' + ti('det.map.directions') + '</a>');
        if (p.link)  parts.push('<a href="' + p.link  + '" target="_blank" rel="noopener">' + ti('det.map.info') + '</a>');
        if (p.wiki)  parts.push('<a href="' + p.wiki  + '" target="_blank" rel="noopener">' + ti('det.map.wiki') + '</a>');
        var links = parts.join(' · ');
        var html =
          '<strong>' + name + '</strong>' +
          (desc ? '<br/><span style="color:#555; font-size:12px;">' + desc + '</span>' : '') +
          (links ? '<br/><span style="font-size:12px;">' + links + '</span>' : '');
        L.marker([p.lat, p.lng], { icon: poiIcon, title: name })
          .addTo(map)
          .bindPopup(html);
        bounds.push([p.lat, p.lng]);
      });

      // fit alle bounds tenendo un pad
      try { map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 }); } catch (_) {}

      // salvo reference per cleanup su route change
      el._fhMap = map;
    }).catch(function () {
      el.innerHTML = '<p style="padding:40px; text-align:center; color:var(--ink-3);">Mappa non disponibile.</p>';
    });
  }

  // --------------------------- VIDEO TOUR (phone mockup) ---------------------------
  // Adatta l'aspect del mockup leggendo le dimensioni reali del poster,
  // così il video riempie lo schermo senza bande nere anche se non è 9:16 esatto.
  function initVideoTour() {
    var phones = document.querySelectorAll('.vt-phone');
    phones.forEach(function (phone) {
      var video = phone.querySelector('video');
      if (!video) return;
      var poster = video.getAttribute('poster');
      if (!poster) return;
      var img = new Image();
      img.onload = function () {
        if (!img.naturalWidth || !img.naturalHeight) return;
        phone.style.setProperty('--video-ar', img.naturalWidth + ' / ' + img.naturalHeight);
      };
      img.src = poster;
    });
  }

  // --------------------------- GALLERY + LIGHTBOX ---------------------------
  var lbState = { images: [], idx: 0, open: false };

  function initGallery(houseId) {
    var h = window.FH_getHouse(houseId);
    if (!h) return;
    var gal = document.querySelector('[data-gallery-house]');
    if (!gal) return;
    lbState.images = h.gallery.slice();
    var figs = gal.querySelectorAll('.g');
    figs.forEach(function (f) {
      f.addEventListener('click', function () {
        var idx = parseInt(f.getAttribute('data-lightbox-index'), 10) || 0;
        openLightbox(idx);
      });
    });
    // "Vedi tutte le N foto" — apre il lightbox all'indice richiesto
    document.querySelectorAll('[data-open-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.getAttribute('data-open-lightbox'), 10) || 0;
        openLightbox(idx);
      });
    });
  }

  var lb = document.getElementById('lightbox');
  var lbImg = lb ? lb.querySelector('.lb-img') : null;
  var lbN = document.getElementById('lb-n');
  var lbM = document.getElementById('lb-m');

  function openLightbox(idx) {
    if (!lb || !lbState.images.length) return;
    lbState.open = true;
    lbState.idx = idx;
    showLbImage();
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    if (!lb) return;
    lbState.open = false;
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function showLbImage() {
    if (!lbImg) return;
    var src = lbState.images[lbState.idx];
    lbImg.src = src;
    if (lbN) lbN.textContent = (lbState.idx + 1);
    if (lbM) lbM.textContent = lbState.images.length;
    // Preload vicine per transizioni senza flash
    var n = lbState.images.length;
    if (n > 1) {
      [ (lbState.idx + 1) % n, (lbState.idx - 1 + n) % n ].forEach(function (i) {
        var img = new Image();
        img.src = lbState.images[i];
      });
    }
  }
  function lbPrev() {
    if (!lbState.images.length) return;
    lbState.idx = (lbState.idx - 1 + lbState.images.length) % lbState.images.length;
    showLbImage();
  }
  function lbNext() {
    if (!lbState.images.length) return;
    lbState.idx = (lbState.idx + 1) % lbState.images.length;
    showLbImage();
  }

  if (lb) {
    lb.addEventListener('click', function (e) {
      var act = e.target && e.target.getAttribute && e.target.getAttribute('data-lb');
      if (act === 'close' || e.target === lb) closeLightbox();
      else if (act === 'prev') lbPrev();
      else if (act === 'next') lbNext();
    });

    // Touch/swipe: pointer events coprono touch, pen, mouse.
    // Soglia 40px orizzontale, verticale tollerante (evita trigger durante scroll).
    var sw = { active: false, sx: 0, sy: 0 };
    lb.addEventListener('pointerdown', function (e) {
      if (!lbState.open) return;
      if (e.target && e.target.getAttribute && e.target.getAttribute('data-lb')) return;
      sw.active = true; sw.sx = e.clientX; sw.sy = e.clientY;
    });
    lb.addEventListener('pointerup', function (e) {
      if (!sw.active) return;
      sw.active = false;
      var dx = e.clientX - sw.sx;
      var dy = e.clientY - sw.sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) lbNext(); else lbPrev();
      }
    });
    lb.addEventListener('pointercancel', function () { sw.active = false; });
  }
  document.addEventListener('keydown', function (e) {
    if (!lbState.open) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') lbPrev();
    else if (e.key === 'ArrowRight') lbNext();
  });

  // --------------------------- CONTACT FORM ---------------------------
  function initContactForm() {
    var form = document.getElementById('cnt-form');
    var ok = document.getElementById('cnt-ok');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (ok) ok.textContent = 'Grazie — rispondiamo entro 24 ore.';
      form.reset();
    });
  }

  // Pre-fill "casa di interesse" when coming from a detail page CTA
  // (#/contatti?casa=<id>)
  function prefillContactHouse() {
    var raw = (location.hash || '').split('?')[1] || '';
    if (!raw) return;
    var params = {};
    raw.split('&').forEach(function (p) {
      var kv = p.split('=');
      if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    });
    if (!params.casa) return;
    var sel = document.querySelector('form#cnt-form select[name="house"]');
    if (!sel) return;
    var opt = sel.querySelector('option[value="' + params.casa + '"]');
    if (opt) sel.value = params.casa;
  }

  // --------------------------- HOVER CUE ---------------------------
  var cue = document.getElementById('hover-cue');
  var cueX = 0, cueY = 0, cueActive = false;

  function initHoverCue() {
    if (!cue) return;
    // attach listeners at document level, test target at runtime (works across route changes)
  }

  document.addEventListener('mousemove', function (e) {
    if (!cue) return;
    cueX = e.clientX;
    cueY = e.clientY;
    cue.style.left = cueX + 'px';
    cue.style.top = cueY + 'px';
    var t = e.target;
    var card = t && t.closest ? t.closest('.prop-card') : null;
    var shouldShow = !!card;
    if (shouldShow !== cueActive) {
      cueActive = shouldShow;
      cue.classList.toggle('on', cueActive);
    }
  });
  document.addEventListener('mouseleave', function () {
    if (!cue) return;
    cue.classList.remove('on');
    cueActive = false;
  });

  // --------------------------- NAV SCROLL ---------------------------
  window.addEventListener('scroll', function () {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  // --------------------------- TWEAKS PANEL ---------------------------
  var tweaksToggle = document.getElementById('tweaks-toggle');
  var tweaks = document.getElementById('tweaks');
  var tweaksClose = tweaks ? tweaks.querySelector('.tw-close') : null;

  var accents = {
    terra: { terra: 'oklch(52% 0.14 42)',  deep: 'oklch(42% 0.13 38)' },
    olive: { terra: 'oklch(48% 0.07 115)', deep: 'oklch(40% 0.06 115)' },
    sky:   { terra: 'oklch(56% 0.10 230)', deep: 'oklch(44% 0.09 230)' },
    plum:  { terra: 'oklch(42% 0.12 340)', deep: 'oklch(32% 0.10 340)' }
  };
  var motions = { full: 1, calm: 1.8, off: 0.0001 };

  var fontStylesheets = {
    fraunces: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..700,0..100;1,9..144,300..700,0..100&display=swap',
    playfair: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap',
    dmserif:  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap'
  };
  var fontFamilies = {
    fraunces: "'Fraunces', Georgia, serif",
    playfair: "'Playfair Display', Georgia, serif",
    dmserif:  "'DM Serif Display', Georgia, serif"
  };

  var tweaksDefault = {
    accent: 'terra',
    paper: 'avorio',
    font: 'fraunces',
    motion: 'full',
    radius: 'sharp'
  };

  function readTweaks() {
    try {
      var raw = localStorage.getItem('fh_tweaks');
      if (raw) return Object.assign({}, tweaksDefault, JSON.parse(raw));
    } catch (e) {}
    return Object.assign({}, tweaksDefault);
  }
  function saveTweaks(t) {
    try { localStorage.setItem('fh_tweaks', JSON.stringify(t)); } catch (e) {}
  }

  function applyTweaks(t) {
    var root = document.documentElement;
    var a = accents[t.accent] || accents.terra;
    root.style.setProperty('--terra', a.terra);
    root.style.setProperty('--terra-deep', a.deep);
    root.style.setProperty('--accent', a.terra);
    document.body.setAttribute('data-paper', t.paper);
    var link = document.getElementById('font-display');
    if (link && fontStylesheets[t.font]) link.href = fontStylesheets[t.font];
    root.style.setProperty('--font-display', fontFamilies[t.font] || fontFamilies.fraunces);
    root.style.setProperty('--t-mult', motions[t.motion] != null ? motions[t.motion] : 1);
    document.body.setAttribute('data-radius', t.radius);

    if (!tweaks) return;
    tweaks.querySelectorAll('.tw-sw').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-accent') === t.accent);
    });
    tweaks.querySelectorAll('.tw-pill').forEach(function (b) {
      if (b.hasAttribute('data-paper'))  b.classList.toggle('active', b.getAttribute('data-paper')  === t.paper);
      if (b.hasAttribute('data-font'))   b.classList.toggle('active', b.getAttribute('data-font')   === t.font);
      if (b.hasAttribute('data-motion')) b.classList.toggle('active', b.getAttribute('data-motion') === t.motion);
      if (b.hasAttribute('data-radius')) b.classList.toggle('active', b.getAttribute('data-radius') === t.radius);
    });
  }

  var currentTweaks = readTweaks();
  applyTweaks(currentTweaks);

  if (tweaksToggle && tweaks) {
    tweaksToggle.addEventListener('click', function () {
      var open = tweaks.getAttribute('aria-hidden') === 'false';
      tweaks.setAttribute('aria-hidden', open ? 'true' : 'false');
    });
  }
  if (tweaksClose) {
    tweaksClose.addEventListener('click', function () {
      tweaks.setAttribute('aria-hidden', 'true');
    });
  }
  if (tweaks) {
    tweaks.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.getAttribute) return;
      var updated = false;
      if (t.classList.contains('tw-sw')) {
        currentTweaks.accent = t.getAttribute('data-accent'); updated = true;
      } else if (t.classList.contains('tw-pill')) {
        if (t.hasAttribute('data-paper'))       { currentTweaks.paper  = t.getAttribute('data-paper');  updated = true; }
        else if (t.hasAttribute('data-font'))   { currentTweaks.font   = t.getAttribute('data-font');   updated = true; }
        else if (t.hasAttribute('data-motion')) { currentTweaks.motion = t.getAttribute('data-motion'); updated = true; }
        else if (t.hasAttribute('data-radius')) { currentTweaks.radius = t.getAttribute('data-radius'); updated = true; }
      }
      if (updated) {
        applyTweaks(currentTweaks);
        saveTweaks(currentTweaks);
      }
    });
  }

  // --------------------------- BOOTSTRAP ---------------------------
  try {
    var saved = localStorage.getItem('fh_route');
    if (saved && !location.hash) {
      history.replaceState(null, '', saved);
    }
  } catch (e) {}

  renderRoute();

})();
