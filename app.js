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
      case 'incluso':    return { name: 'included' };
      case 'chi-siamo':  return { name: 'chiSiamo' };
      case 'contatti':   return { name: 'contatti' };
      default:           return { name: 'home' };
    }
  }

  function renderRoute() {
    var r = parseHash();
    var html = '';
    switch (r.name) {
      case 'home':     html = P.home();       break;
      case 'case':     html = P.case();       break;
      case 'detail':   html = P.detail(r.id); break;
      case 'included': html = P.included();   break;
      case 'chiSiamo': html = P.chiSiamo();   break;
      case 'contatti': html = P.contatti();   break;
      default:         html = P.notFound();
    }
    view.innerHTML = html;
    window.scrollTo({ top: 0, behavior: 'auto' });

    // persist
    try { localStorage.setItem('fh_route', location.hash || '#/'); } catch (e) {}

    updateActiveNav(r);
    initReveal();
    initPageSpecific(r);
  }

  function updateActiveNav(r) {
    if (!navLinks) return;
    var links = navLinks.querySelectorAll('a[data-route]');
    links.forEach(function (a) {
      var route = a.getAttribute('data-route');
      var active = false;
      if (route === '/' && r.name === 'home') active = true;
      else if (route === '/case' && (r.name === 'case' || r.name === 'detail')) active = true;
      else if (route === '/incluso'   && r.name === 'included') active = true;
      else if (route === '/chi-siamo' && r.name === 'chiSiamo') active = true;
      else if (route === '/' + r.name) active = true;
      a.classList.toggle('active', active);
    });
  }

  window.addEventListener('hashchange', renderRoute);

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

  // --------------------------- PAGE-SPECIFIC ---------------------------
  function initPageSpecific(r) {
    if (r.name === 'home')     initHeroCarousel();
    if (r.name === 'case')     initCaseFilters();
    if (r.name === 'detail')   { initGallery(r.id); initBookingCard(); }
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
