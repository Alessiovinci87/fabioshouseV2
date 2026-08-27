#!/usr/bin/env node
/* ============================================================
   PRERENDER — HTML statico per ogni rotta della SPA.

   Perché: senza questo passaggio ogni URL restituisce lo stesso index.html
   (titolo/testo compaiono solo dopo il JavaScript). Google lo esegue con
   ritardo, Bing/ChatGPT/Perplexity e le anteprime WhatsApp/Facebook no.

   Come: fa girare la stessa app (i18n.js, data.js, pages*.js, app.js) dentro
   jsdom con la URL della rotta, lascia che il router renderizzi #view, i meta,
   canonical, og:*, JSON-LD, e salva il documento risultante.
   Sul client app.js gira comunque e ri-renderizza (stesso HTML): nessuna
   differenza visibile per l'utente.

   Uso:
     node tools/prerender.js            genera prerender/** e aggiorna il blocco
                                        "prerender" di _redirects
     node tools/prerender.js --clean    rimuove prerender/ e svuota il blocco
     node tools/prerender.js --check    non scrive, esce 1 se _redirects è stale

   Netlify esegue questo script ad ogni deploy (vedi netlify.toml). La cartella
   prerender/ è ignorata da git.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'prerender');
const ORIGIN = 'https://www.leportedisardegna.com';
const SCRIPTS = ['i18n.js', 'data.js', 'lang-es.js', 'pages.js', 'pages2.js', 'app.js'];
const REDIRECTS = path.join(ROOT, '_redirects');
const MARK_START = '# --- prerender (generato da tools/prerender.js, non modificare a mano) ---';
const MARK_END = '# --- /prerender ---';

const args = process.argv.slice(2);
const CLEAN = args.includes('--clean');
const CHECK = args.includes('--check');

// Lingue su percorso: IT alla radice, EN/FR/DE con prefisso (/en/case …).
const LANGS = [
  { code: 'it', tag: 'it-IT', prefix: '' },
  { code: 'en', tag: 'en-GB', prefix: 'en' },
  { code: 'fr', tag: 'fr-FR', prefix: 'fr' },
  { code: 'de', tag: 'de-DE', prefix: 'de' },
  { code: 'es', tag: 'es-ES', prefix: 'es' }
];
const STATIC_SITEMAP = ['/privacy.html'];

function readSource(name) {
  return fs.readFileSync(path.join(ROOT, name), 'utf8');
}

function shims(w, langTag) {
  Object.defineProperty(w.navigator, 'language', { value: langTag, configurable: true });
  Object.defineProperty(w.navigator, 'languages', { value: [langTag], configurable: true });
  class Observer {
    constructor(cb) { this.cb = cb; }
    observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
  }
  w.IntersectionObserver = Observer;
  w.ResizeObserver = Observer;
  w.matchMedia = function (q) {
    return { matches: false, media: q, onchange: null,
      addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } };
  };
  w.scrollTo = function () {};
  w.scroll = function () {};
  w.HTMLElement.prototype.scrollIntoView = function () {};
  w.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
  w.HTMLMediaElement.prototype.pause = function () {};
  w.HTMLMediaElement.prototype.load = function () {};
  w.HTMLCanvasElement.prototype.getContext = function () { return null; };
  // Nessuna rete in build: il widget disponibilità (iCal) gestisce l'errore da solo.
  // Promise che non si risolve mai: nessun callback gira dopo window.close().
  w.fetch = function () { return new Promise(function () {}); };
}

/** Elenco rotte dalla stessa sorgente dati del sito (data.js). */
function routesFromData() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
  dom.window.eval(readSource('data.js'));
  const D = dom.window.FH_DATA;
  const routes = ['/', '/case', '/incluso', '/chi-siamo', '/contatti'];
  D.houses.forEach(h => routes.push('/case/' + h.id));
  D.luoghi.forEach(l => routes.push('/luogo/' + l.slug));
  dom.window.close();
  return routes;
}

function outFileFor(route, lang) {
  const base = route === '/' ? 'home' : route.replace(/^\//, '');
  return path.join('prerender', lang.prefix ? lang.code : '', base + '.html').replace(/\\/g, '/');
}

function render(shell, route, lang) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => {
    const msg = String(e && e.message || e);
    if (/not implemented|Could not load/i.test(msg)) return;
    console.warn(`  [${route}] jsdom: ${msg.split('\n')[0]}`);
  });
  const url = ORIGIN + (lang.prefix ? '/' + lang.prefix : '') + (route === '/' ? '/' : route);
  const dom = new JSDOM(shell, { url, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  shims(w, lang.tag);
  for (const f of SCRIPTS) {
    try {
      w.eval(readSource(f));
    } catch (e) {
      // app.js renderizza già durante l'eval; un errore in un init secondario
      // (mappa, video, observer) non invalida titolo/meta/contenuto.
      console.warn(`  [${route}] ${f}: ${e.message}`);
    }
  }
  const doc = w.document;
  // In jsdom DOMContentLoaded scatta in modo asincrono, dopo il nostro salvataggio:
  // lo emettiamo ora così i18n.init() traduce nav/footer e prefissa i link.
  doc.dispatchEvent(new w.Event('DOMContentLoaded', { bubbles: true }));
  const view = doc.getElementById('view');
  if (!view || !view.innerHTML.trim()) throw new Error(`#view vuoto per ${route}`);
  doc.body.classList.remove('has-tweaks');
  view.setAttribute('data-prerendered', route);

  // --- Rifiniture del <head> per la pagina statica ---
  // 1) jsdom non serializza la proprietà `as` del preload creato da app.js.
  doc.querySelectorAll('link[rel="preload"]:not([as])').forEach(l => l.setAttribute('as', 'image'));
  // 2) L'hero della home è precaricato nello shell: inutile sulle altre rotte.
  if (route !== '/') {
    doc.querySelectorAll('link[rel="preload"][href*="hero-home-"]').forEach(l => l.remove());
  }
  // (hreflang e canonical li scrive app.js in base al percorso)
  const langAttr = doc.documentElement.getAttribute('lang');
  if (langAttr !== lang.code) throw new Error(`lingua attesa ${lang.code}, trovata ${langAttr} per ${url}`);
  const html = dom.serialize();
  w.close();
  return { html, title: doc.title, words: view.textContent.split(/\s+/).filter(Boolean).length };
}

function updateRedirects(rules) {
  const src = fs.readFileSync(REDIRECTS, 'utf8');
  const block = rules.length
    ? [MARK_START, ...rules, MARK_END].join('\n')
    : [MARK_START, MARK_END].join('\n');
  let out;
  if (src.includes(MARK_START) && src.includes(MARK_END)) {
    const re = new RegExp(escapeRe(MARK_START) + '[\\s\\S]*?' + escapeRe(MARK_END));
    out = src.replace(re, block);
  } else {
    // inserisci prima del fallback SPA ("/*  /index.html  200"), commento incluso
    const m = src.match(/(?:^#[^\n]*\n)*^\/\*\s+\/index\.html\s+200\s*$/m);
    const idx = m ? m.index : -1;
    out = idx >= 0 ? src.slice(0, idx) + block + '\n\n' + src.slice(idx) : src + '\n' + block + '\n';
  }
  return { changed: out !== src, out };
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function pubPath(route, lang) {
  if (!lang.prefix) return route;
  return '/' + lang.prefix + (route === '/' ? '' : route);
}

/** sitemap.xml: una <url> per lingua, con xhtml:link hreflang. lastmod,
 *  changefreq e priority vengono conservati dalla sitemap precedente (per
 *  rotta base); le rotte nuove prendono la data di oggi. */
function writeSitemap(routes) {
  const file = path.join(ROOT, 'sitemap.xml');
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const prev = {};
  for (const m of old.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const block = m[1];
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1];
    if (!loc) continue;
    let p = loc.replace(ORIGIN, '') || '/';
    p = p.replace(/^\/(en|fr|de)(?=\/|$)/, '') || '/';
    if (prev[p]) continue;
    prev[p] = {
      lastmod: (block.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1],
      changefreq: (block.match(/<changefreq>([^<]+)<\/changefreq>/) || [])[1],
      priority: (block.match(/<priority>([^<]+)<\/priority>/) || [])[1]
    };
  }
  const today = new Date().toISOString().slice(0, 10);
  const entries = [];
  const alternates = route => LANGS.map(l => `      <xhtml:link rel="alternate" hreflang="${l.code}" href="${ORIGIN}${pubPath(route, l)}"/>`)
    .concat([`      <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${route}"/>`]).join('\n');
  for (const route of routes) {
    const meta = prev[route] || {};
    const lastmod = meta.lastmod || today;
    const changefreq = meta.changefreq || (route.startsWith('/luogo/') ? 'monthly' : 'weekly');
    const priority = meta.priority || (route === '/' ? '1.0' : route.startsWith('/case') ? '0.9' : route.startsWith('/luogo/') ? '0.5' : '0.6');
    for (const l of LANGS) {
      entries.push(`  <url>\n    <loc>${ORIGIN}${pubPath(route, l)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates(route)}\n  </url>`);
    }
  }
  for (const p of STATIC_SITEMAP) {
    const meta = prev[p] || {};
    entries.push(`  <url>\n    <loc>${ORIGIN}${p}</loc>\n    <lastmod>${meta.lastmod || today}</lastmod>\n    <changefreq>${meta.changefreq || 'yearly'}</changefreq>\n    <priority>${meta.priority || '0.2'}</priority>\n  </url>`);
  }
  const out = `<?xml version="1.0" encoding="UTF-8"?>\n<!-- Generata da tools/prerender.js: non modificare a mano -->\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
  if (out === old) return false;
  fs.writeFileSync(file, out);
  return true;
}

function main() {
  if (CLEAN) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
    const r = updateRedirects([]);
    if (r.changed) fs.writeFileSync(REDIRECTS, r.out);
    console.log('prerender/ rimossa, blocco _redirects svuotato');
    return;
  }

  const shell = readSource('index.html');
  const routes = routesFromData();
  const rules = [];
  const stats = [];

  for (const lang of LANGS) {
    for (const route of routes) {
      const rel = outFileFor(route, lang);
      const from = pubPath(route, lang);
      // "/" ha già index.html come file statico: serve la regola forzata (200!)
      rules.push(`${from.padEnd(34)} /${rel}   ${from === '/' ? '200!' : '200'}`);
      // /en → anche con slash finale
      if (lang.prefix && route === '/') rules.push(`${(from + '/').padEnd(34)} /${rel}   200`);
      if (CHECK) continue;
      const res = render(shell, route, lang);
      const abs = path.join(ROOT, rel);
      fs.mkdirSync(path.dirname(abs), { recursive: true });
      fs.writeFileSync(abs, res.html);
      stats.push({ route: from, title: res.title, words: res.words });
    }
  }

  const r = updateRedirects(rules);
  if (CHECK) {
    if (r.changed) { console.error('_redirects non aggiornato: esegui node tools/prerender.js'); process.exit(1); }
    console.log('_redirects aggiornato (' + rules.length + ' regole)');
    return;
  }
  if (r.changed) fs.writeFileSync(REDIRECTS, r.out);

  // Sitemap con alternates hreflang, rigenerata dalle stesse rotte.
  const smChanged = writeSitemap(routes);
  if (smChanged) console.log('  sitemap.xml aggiornata');

  stats.forEach(s => console.log(`  ${s.route.padEnd(34)} ${String(s.words).padStart(5)} parole  ${s.title}`));
  console.log(`${stats.length} pagine in prerender/ · ${rules.length} regole in _redirects${r.changed ? ' (aggiornato)' : ''}`);
}

// Callback asincroni dell'app che scattano dopo window.close() (timer del
// carosello, promise dei video) non riguardano l'HTML già scritto su disco.
process.on('uncaughtException', function (e) {
  const msg = String(e && e.message);
  if (/document|window|null|undefined/.test(msg)) return;
  console.error(e);
  process.exit(1);
});

main();
