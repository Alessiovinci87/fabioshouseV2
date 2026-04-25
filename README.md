# FabioSHouse v2

Sito vetrina statico per due case vacanze in Sardegna, gestite da una famiglia:

- **Villa Stintino** — villa con giardino, 6 ospiti, a 5 min dalla Pelosa
- **La Porta del Lido** — appartamento nel centro catalano di Alghero, 4 ospiti

Dominio: `www.fabioshouse.it`

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

- 9 blocchi **JSON-LD**: WebSite, Organization, LodgingBusiness×2 (Villa Stintino + La Porta del Lido, con `aggregateRating`, `amenityFeature`, `geo`), VideoObject, ItemList, BreadcrumbList×2, FAQPage
- Meta **title + description** dinamici per-route (aggiornati da `applyRouteMeta` in `app.js`)
- Open Graph + Twitter Card (con `data-i18n-attr` → seguono la lingua)
- `hreflang` IT/EN/FR/DE + `x-default`
- `canonical` + `preload` LCP hero con `fetchpriority="high"`
- Sitemap con 8 URL, lastmod aggiornato

## Dev server locale

```bash
python dev-server.py        # porta 8000 (default)
python dev-server.py 8080   # porta custom
```

Il dev server invia `Cache-Control: no-store`: niente stale cache durante lo sviluppo. NON usarlo in produzione.

Apri `http://localhost:8000/` — basta F5 per vedere le modifiche.

## Struttura directory

```
FabioSHouse-v2/
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
