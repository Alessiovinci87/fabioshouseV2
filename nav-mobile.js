/* ============================================================
   Le Porte di Sardegna v2 — MOBILE DRAWER
   Toggle hamburger ↔ aside drawer.
   Caricato in index.html, 404.html, privacy.html.
   ============================================================ */
(function () {
  'use strict';

  var burger = document.getElementById('nav-burger');
  var drawer = document.getElementById('mobile-drawer');
  var backdrop = document.getElementById('drawer-backdrop');
  if (!burger || !drawer) return;

  function setOpen(open) {
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
    if (backdrop) backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('drawer-open', open);
  }

  burger.addEventListener('click', function () {
    var isOpen = burger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  if (backdrop) {
    backdrop.addEventListener('click', function () { setOpen(false); });
  }

  // Chiusura su ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });

  // Click su link nel drawer → chiudi
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Resize sopra 860 → chiudi (evita stato inconsistente quando si ruota)
  if (window.matchMedia) {
    var mql = window.matchMedia('(min-width: 861px)');
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);
  }

  // ?menu=1 → apri drawer all'avvio (utile per test responsive)
  if (/[?&]menu=1\b/.test(location.search || '')) setOpen(true);

  // ============================================================
  // LANG MOBILE DROPDOWN — selettore lingua compatto in navbar mobile
  // ============================================================
  var langToggle = document.getElementById('lang-mobile-toggle');
  var langPanel = document.getElementById('lang-mobile-panel');
  if (langToggle && langPanel) {
    function langClose() {
      langPanel.hidden = true;
      langToggle.setAttribute('aria-expanded', 'false');
    }
    function langOpen() {
      langPanel.hidden = false;
      langToggle.setAttribute('aria-expanded', 'true');
    }
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (langPanel.hidden) langOpen(); else langClose();
    });
    langPanel.addEventListener('click', function (e) {
      // chiudi dopo aver selezionato una lingua (l'i18n handler globale fa il setLang)
      if (e.target.closest('[data-lang-btn]')) langClose();
    });
    document.addEventListener('click', function (e) {
      if (langPanel.hidden) return;
      if (langToggle.contains(e.target) || langPanel.contains(e.target)) return;
      langClose();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !langPanel.hidden) langClose();
    });
  }
})();
