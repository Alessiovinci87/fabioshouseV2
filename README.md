# Le Porte di Sardegna v2

Sito vetrina statico per due case vacanze in Sardegna, gestite da una famiglia:

- **La Mimosa** — villa con giardino, 8 ospiti, a 5 min in auto dalla Pelosa (Villaggio Cala Lupo)
- **La Porta del Lido** — appartamento nel centro catalano di Alghero, 6 ospiti

Dominio: `www.leportedisardegna.com`

## Stack

Puro HTML / CSS / JS — **nessun framework, nessun build step**.

- `index.html` — SPA con routing hash (`#/`, `#/case`, `#/case/<id>`, `#/incluso`, `#/chi-siamo`, `#/contatti`)
- `privacy.html` — pagina legale standalone
- `404.html` — fallback per hosting statico (dà HTTP 404 reale ai crawler)
- `manifest.json` — PWA manifest (Add to Home Screen)
- `sitemap.xml`, `robots.txt` — crawl
- `styles.css` — ~1500 righe, media query a 520/640/860/960/1000px
- 5 file JS caricati in ordine:
  1. `i18n.js` — motore traduzioni (IT/EN/FR/DE) + dizionario centrale UI chrome
  2. `data.js` — dati site (houses, included, testimonials, faqs) con campi narrativi multilingua inline
  3. `pages.js` — `renderHome()`, `renderCase()`
  4. `pages2.js` — `renderDetail()`, `renderIncluded()`, `renderChiSiamo()`, `renderContatti()`, `renderNotFound()`
  5. `app.js` — router, reveal, gallery+lightbox, booking card, video tour, toast, share, copy

## Internazionalizzazione

4 lingue: **IT** (default) / **EN** / **FR** / **DE**. Il tono dev'essere caldo e familiare in tutte le lingue (preservare "gestito da famiglia", non corporate).

- UI chrome (nav, footer, pulsanti, label) via chiavi in `i18n.js` `DICT`
- Contenuti lunghi (story casa, activities, guide items, amenities, rules, FAQ) come oggetti `{it,en,fr,de}` inline in `data.js`
- Helper `t(key | obj)` — accetta entrambi i formati, fallback a IT
- Attributi HTML: `data-i18n="key"` (innerHTML) e `data-i18n-attr="content:key|title:key2"` (setAttribute)
- Language switcher: persiste in URL (`?lang=`) e `localStorage.fh.lang`
- `<html lang>` aggiornato dinamicamente + `hreflang` statici nell'head

## SEO

- 9 blocchi **JSON-LD**: WebSite, Organization, LodgingBusiness×2 (La Mimosa + La Porta del Lido, con `aggregateRating`, `amenityFeature`, `geo`), VideoObject, ItemList, BreadcrumbList×2, FAQPage
- Meta **title + description** dinamici per-route (aggiornati da `applyRouteMeta` in `app.js`)
- Open Graph + Twitter Card (con `data-i18n-attr` → seguono la lingua)
- **Lingue su percorso** (da agosto 2026): IT alla radice, EN/FR/DE su `/en/…`, `/fr/…`, `/de/…`. La URL è l'unica fonte di verità per la lingua (niente auto-redirect da browser/localStorage, così i crawler vedono sempre la lingua della URL); i vecchi link `?lang=xx` vengono normalizzati in percorso da `i18n.js`. I link interni scritti in IT (`/case`, `/luogo/…`) vengono prefissati a runtime da `FH_I18N.localizeLinks`; `app.js` toglie il prefisso in `parseRoute` e scrive canonical + `hreflang` per rotta. Il prerender genera le 4 versioni (136 pagine) e la sitemap con `xhtml:link` alternates.
- `hreflang` IT/EN/FR/DE + `x-default`, per rotta
- `canonical` + `preload` LCP hero con `fetchpriority="high"`
- Sitemap con 35 URL, lastmod aggiornato
- **Prerendering** (`tools/prerender.js`, eseguito da Netlify ad ogni deploy — vedi `netlify.toml`): fa girare la SPA in jsdom per ognuna delle 34 rotte e salva l'HTML completo in `prerender/` (ignorata da git). Le regole `200` in `_redirects` (blocco generato, tra i marker) servono quel file al posto di `index.html`; il client poi ri-renderizza con `app.js` come sempre. Così Bing/ChatGPT, anteprime social e Google al primo passaggio vedono titolo, testo e JSON-LD di ogni pagina. In locale: `node tools/prerender.js` (il dev server applica le stesse regole), `--clean` per rimuovere tutto, `--check` per verificare che `_redirects` sia allineato. Aggiunta una casa o un luogo in `data.js` → rilanciare lo script (aggiorna anche le regole; la sitemap resta da aggiornare a mano, lo script avvisa se divergono).

## Marchio e loghi

Sorgenti consegnate (agosto 2026) in `stampa/loghi/` (non raggiungibili online). `python tools/build-logos.py` genera da lì: `img/logo/` (marchio sito, marchi Alghero/Stintino con sfondo trasparente, logo completo, versioni quadrate su bianco per schema.org e Google Business), favicon/icone PWA (`favicon.ico`, `img/favicon-*.png`, `img/icon-*.png`, `apple-touch-icon.png`) e le immagini social 1200×630 (`img/og-home.jpg`, `og-villa-stintino.jpg`, `og-appartamento-alghero.jpg`). I marchi casa sono in `data.js` (`logo`, `logoSmall`, `og`) e compaiono in lista case, scheda casa, copertina guide, cartoncini e anteprime social.

## Dev server locale

```bash
python dev-server.py        # porta 8000 (default)
python dev-server.py 8080   # porta custom
```

Il dev server invia `Cache-Control: no-store`: niente stale cache durante lo sviluppo. NON usarlo in produzione.

Apri `http://localhost:8000/` — basta F5 per vedere le modifiche.

## Struttura directory

```
Le Porte di Sardegna-v2/
├── index.html, privacy.html, 404.html
├── manifest.json, sitemap.xml, robots.txt
├── styles.css
├── i18n.js, data.js, pages.js, pages2.js, app.js
├── dev-server.py
├── img/
│   ├── favicon.svg, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png
│   ├── home/hero-home-spiaggia-pelosa.jpg
│   ├── alghero/  (interni app. + dintorni)
│   ├── stintino/ (foto villa + dintorni)
│   └── shared/
├── video/
│   └── video-tour-alghero.mp4 + poster
└── README.md, DEPLOY.md
```

## TODO — in attesa di dati da Fabio

- **Video tour Stintino** (se girato): basta aggiungere `videoTour: { src, poster }` all'oggetto casa in `data.js`
- **Dati legali** footer + privacy: P.IVA, CF, CIN, indirizzo titolare
- **Indirizzi esatti** delle due case per mappa POI
- **iCal** Airbnb/Booking per calendario disponibilità → swap del CTA Home da `#contatti` a `#disponibilita`
- **Recensioni aggiornate** testimonial (attuali sono 6 da v1)
- **Selezione ristoranti Alghero** — placeholder già pronto nella pagina `#/luogo/cucina-catalana`

## Feature list (per ciascuna casa)

- Galleria mosaic 8 foto + overlay `+N` + lightbox carosello full-screen (keyboard + touch swipe)
- Video tour dentro mockup smartphone (aspect adattato al video via JS)
- Sezione Dintorni (6 activity narrative)
- Guida locale (3 card: Mangiare, Escursioni, Servizi — con link esterni reali: Grotte di Nettuno, Sella & Mosca, Pelosa prenotazione, bikealghero, Parco Asinara, ecc.)
- Booking card sticky con prezzi stagionali e breakdown settimanale
- Share button (Web Share API con copy fallback)
- JSON-LD per-casa con rating e amenities

## Regole editoriali

- **Tono**: caldo, familiare, diretto. Rispettare lo stile di v2 esistente quando aggiungi copy.
- **Niente microcopy tecnica** nei testi visibili: no durate video, "formato verticale", "lazy-load", "mostriamo 8 di 20". Il bottone parla da solo.
- **Alghero/Stintino parity**: modifiche strutturali vanno replicate sempre su entrambe le detail page.
