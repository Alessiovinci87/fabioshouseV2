# Deploy checklist — Le Porte di Sardegna v2

Tutte le operazioni da fare quando il sito sarà pronto per andare online. Ogni blocco è indipendente, puoi farli in qualsiasi ordine purché l'hosting sia il primo.

## 0. Prerequisiti

- [ ] Fabio conferma che si può procedere
- [ ] Dominio `leportedisardegna.com` registrato e intestato (verificare scadenza e credenziali registrar)
- [ ] Email di servizio (`cosmoalghero@gmail.com`) funzionante — serve per Formspree + test form
- [ ] Un hosting scelto fra:
  - **Netlify** (consigliato: drag & drop, gratis, HTTPS automatico, form handling integrato)
  - **Cloudflare Pages** (gratis, CDN globale, deploy via git)
  - **Vercel** (gratis, deploy via git)
  - **GitHub Pages** (gratis ma senza form handling nativo)

## 1. Git + hosting

- [ ] `git init` nella cartella `Le Porte di Sardegna-v2/`
- [ ] Aggiungi `.gitignore`: `.DS_Store`, `*.output`, cartelle IDE
- [ ] `git add . && git commit -m "Le Porte di Sardegna v2 — initial"`
- [ ] Crea repo GitHub (private va bene) e `git push`
- [ ] Collega il repo a Netlify/Vercel/Cloudflare Pages (auto-deploy su ogni push)
- [ ] Deploy primo — verifica che la home carichi

## 2. Dominio + DNS

- [ ] Aggiungi dominio custom `www.leportedisardegna.com` all'hosting
- [ ] Configura DNS presso il registrar:
  - `A` o `CNAME` del root/www secondo istruzioni dell'hosting
  - Attendi propagazione (minuti/ore)
- [ ] Verifica HTTPS automatico (Let's Encrypt è gestito dall'hosting)
- [ ] Imposta redirect `leportedisardegna.com` → `www.leportedisardegna.com` (o viceversa, ma coerente col `canonical` nell'HTML)
- [ ] Verifica che `/404.html` dia status 404 reale (non 200): su Netlify serve `_redirects` o `_headers`, oppure configurazione "Custom 404"
- [ ] Verifica che `/sitemap.xml` e `/robots.txt` siano raggiungibili

## 3. Form contatti (Formspree)

Il form in `renderContatti` è ora `onsubmit="return false;"` — non invia. Serve integrazione:

- [ ] Crea account Formspree (o FormSubmit, Basin, Getform)
- [ ] Crea un form e ottieni l'endpoint (`https://formspree.io/f/xxxxxxx`)
- [ ] Modifica `pages2.js renderContatti`: il `<form>` deve avere `action="ENDPOINT"` + `method="POST"` e togliere `onsubmit="return false;"`
- [ ] Aggiungi handler JS in `app.js initContactForm` che fa fetch POST dell'endpoint + mostra conferma UI
- [ ] Test: invia da una email di prova → arriva sull'inbox di Fabio? Protezione spam (honeypot + reCAPTCHA v3 se necessario)

## 4. Analytics (opzionale ma consigliato)

Se si sceglie **cookieless** (nessun banner consent richiesto):

- [ ] Plausible (€9/mese) — aggiungi `<script defer data-domain="leportedisardegna.com" src="https://plausible.io/js/script.js"></script>` in `<head>`
- [ ] Umami (self-host gratis o cloud) — simile

Se si sceglie Google Analytics 4:
- [ ] Aggiungi banner consent (es. Klaro, CookieConsent) perché è con cookie personale
- [ ] Privacy policy va aggiornata: menziona GA4

## 5. Google Search Console

- [ ] Verifica proprietà su `https://search.google.com/search-console`:
  - Metodo consigliato: record TXT DNS (permanente)
  - In alternativa: tag HTML aggiunto all'head
- [ ] Submit sitemap: `https://www.leportedisardegna.com/sitemap.xml`
- [ ] Testa i Rich Results con `https://search.google.com/test/rich-results`:
  - [ ] LodgingBusiness La Mimosa
  - [ ] LodgingBusiness La Porta del Lido
  - [ ] FAQPage
  - [ ] BreadcrumbList
  - [ ] ItemList

## 6. Social preview — validazione

- [ ] **Facebook Sharing Debugger** — <https://developers.facebook.com/tools/debug/> → incolla URL home, verifica og:image, og:title, og:description
- [ ] **Twitter Card Validator** — <https://cards-dev.twitter.com/validator>
- [ ] **LinkedIn Post Inspector** — <https://www.linkedin.com/post-inspector/>
- [ ] Condivisione reale su WhatsApp a te stesso: verifica thumbnail + testo

Nota: lo scraper Facebook non esegue JS → vede sempre la versione IT dei meta. Per preview multilingua servirebbe prerendering per-lingua (non prioritario).

## 7. Performance audit

- [ ] Lighthouse (Chrome DevTools → tab Lighthouse) su home e detail
- [ ] Target: ≥95 performance, ≥95 accessibility, ≥95 best practices, 100 SEO
- [ ] Se performance bassa, controlla:
  - Dimensione hero Pelosa (1536×1024, ~ KB) — eventualmente converti a WebP e/o responsive srcset
  - Google Fonts → preload `Fraunces` variable
  - Concatena/minifica i 5 JS (opzionale, low ROI per dimensioni attuali)

## 8. Post-deploy — cose da aggiornare nel tempo

- [ ] Testimonial freschi dopo ogni stagione
- [ ] Foto Stintino quando Fabio le consegna
- [ ] Video tour Stintino (se registrato)
- [ ] P.IVA / CF / CIN nel footer e privacy — sono oggi "IN AGGIORNAMENTO"
- [ ] Indirizzi esatti delle case — per il task mappa POI (v2 attuale usa coordinate comunali generiche)
- [ ] iCal Airbnb/Booking → pagina `#/disponibilita` con calendario, swap CTA "Prenota" homepage

## 9. Sicurezza / hardening (dopo deploy)

- [ ] Verifica headers di sicurezza: `Content-Security-Policy`, `X-Frame-Options`, `Referrer-Policy` (la maggior parte gestita dall'hosting di default)
- [ ] Se aggiungi iframe Google Maps: verifica che non rompa CSP
- [ ] Backup periodico del repo git (già implicito con hosting git-connected)

## 10. Promozione iniziale (quando il sito è live)

- [ ] Invio link a ex-ospiti per recensioni Google
- [ ] Google My Business: crea scheda La Mimosa + La Porta del Lido
- [ ] OTA: aggiorna descrizione Airbnb/Booking con link al sito proprio
- [ ] Social: post Instagram / Facebook di lancio con hero + 3 foto

---

**Note operative**:
- Priorità assoluta: 0 → 1 → 2 → 3. Senza 3 (form) si perdono lead.
- 4 e 5 possono attendere, ma 5 (Search Console) va fatto entro una settimana per accelerare l'indicizzazione.
- 7 (Lighthouse) è diagnostica post-deploy, non blocca il lancio.
