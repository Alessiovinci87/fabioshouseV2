# Check-in ospiti — Guida di setup

Form di registrazione ospiti per **Villa La Mimosa** (Stintino) e **La Porta del Lido** (Alghero).
A ogni invio il sito genera un **PDF riepilogativo** e lo manda **via email** a `cosmoalghero@gmail.com`.
Niente Google, niente fogli, niente database: tutto gira dentro Netlify (dove è già ospitato il sito).

```
ospite compila il form   ──►   Netlify Function del sito   ──►   email con PDF allegato
checkin-<casa>.html            netlify/functions/checkin.js       → cosmoalghero@gmail.com
                               (genera il PDF in memoria,
                                spedisce via SMTP, non salva nulla)
```

## File

| File | Cosa è |
|---|---|
| `checkin-la-porta-del-lido.html`, `checkin-villa-la-mimosa.html` | Il form, una pagina per casa (IT/EN/FR/ES, bandiere SVG). Pagine "invisibili": `noindex`, non in menu, non in sitemap. Si condividono solo via link. **Non modificarle a mano**: sono generate da `tools/checkin.template.html` con `node tools/build-checkin.js`. |
| `privacy-checkin.html` | Informativa GDPR del check-in (4 lingue), linkata dal checkbox del form. |
| `netlify/functions/checkin.js` | La funzione che riceve i dati, crea il PDF e invia l'email. |
| `netlify/checkin-lib/core.js` | Validazione, tabelle, tracciato Alloggiati (168 caratteri), testi email. |
| `netlify/checkin-lib/pdf.js` | Impaginazione del PDF (libreria `pdf-lib`). |
| `netlify/checkin-lib/tabelle.js` | Tabelle ufficiali Comuni/Stati del Portale Alloggiati (scaricate il 26/08/2026). |
| `package.json` | Dipendenze: `pdf-lib`, `nodemailer`. Netlify le installa da solo a ogni deploy. |

---

## 1. Scegliere la casella MITTENTE (l'unica cosa da decidere)

Per spedire email serve una casella di posta "vera" che faccia da mittente. **Non deve essere quella di Fabio**: basta una qualsiasi casella a cui hai accesso tu. Il destinatario resta `cosmoalghero@gmail.com`.

Tre opzioni, dalla più semplice:

| Opzione | Cosa serve | Note |
|---|---|---|
| **A. Una casella che hai già** (es. `info@picsnails.com`, o la posta del dominio) | I parametri SMTP del provider: host, porta, utente, password | Nessun account nuovo. Chiedi al tuo provider "parametri SMTP per l'invio" (spesso `smtp.tuodominio.it`, porta 587 o 465). |
| **B. Un Gmail qualsiasi a cui accedi tu** | Attivare la verifica in 2 passaggi → creare una **"Password per le app"** (myaccount.google.com → Sicurezza → Password per le app) | host `smtp.gmail.com`, porta `587`, utente = l'indirizzo Gmail, password = la password per le app (16 lettere). Limite ~500 email/giorno. |
| **C. Brevo (gratis, 300 email/giorno)** | Registrarsi su brevo.com con la tua email, confermare il mittente, generare una chiave SMTP | host `smtp-relay.brevo.com`, porta `587`, utente = login Brevo, password = chiave SMTP. Ideale se non vuoi usare caselle personali. |

## 2. Inserire i parametri su Netlify (5 minuti)

1. Vai su <https://app.netlify.com> → il sito **leportedisardegna** → **Site configuration** → **Environment variables** → **Add a variable**.
2. Aggiungi queste variabili (una per riga, "Same value for all deploy contexts"):

| Variabile | Valore |
|---|---|
| `SMTP_HOST` | es. `smtp.gmail.com` |
| `SMTP_PORT` | `587` (oppure `465` se il provider lo richiede) |
| `SMTP_USER` | l'utente della casella mittente (di solito l'indirizzo email) |
| `SMTP_PASS` | la password (Gmail: password per le app) |
| `MAIL_FROM` | *(facoltativo)* come appare il mittente, es. `Check-in Le Porte di Sardegna <info@tuodominio.it>` |
| `MAIL_TO` | *(facoltativo)* destinatario; se manca è `cosmoalghero@gmail.com`. Più indirizzi separati da virgola. |
| `INVIA_TRACCIATO_TXT` | *(facoltativo)* `true` per allegare anche il file `.txt` per il Portale Alloggiati. Se manca: solo PDF. |

3. Dopo aver salvato le variabili: **Deploys → Trigger deploy → Deploy site** (le variabili valgono dal deploy successivo).

## 3. Pubblicare i file

Il sito è su Netlify collegato a GitHub (`Alessiovinci87/fabioshouseV2`): ogni `git push` su `main` pubblica in automatico.

```bash
git add -A
git commit -m "Check-in ospiti: form + funzione Netlify PDF/email + informativa"
git push
```

Dopo 1–2 minuti il form è online. **Link da mandare agli ospiti** (uno per casa):

```
https://www.leportedisardegna.com/checkin-la-porta-del-lido
https://www.leportedisardegna.com/checkin-villa-la-mimosa
```

Ogni link apre la pagina della sua casa (titolo e anteprima WhatsApp "Check-in ospiti | La Porta del Lido" / "… | Villa La Mimosa"); la struttura è già impostata e non si può sbagliare. I link senza `.html` sono definiti in `_redirects`. Aggiungi `?lang=en` / `fr` / `es` per aprirlo già nella lingua dell'ospite (viene comunque rilevata dal browser e ricordata).
La pagina non compare nel menu né nella sitemap e ha `noindex`: chi non ha il link non la trova. **Manda il link agli ospiti via WhatsApp/email.**

## 4. Prova

1. Apri `https://www.leportedisardegna.com/checkin-la-porta-del-lido`, compila con dati di prova (1 ospite basta), spunta la privacy, invia.
2. Deve comparire la schermata verde "Registrazione completata" con il pulsante **Visita il sito**.
3. Su `cosmoalghero@gmail.com` arriva **"Check-in La Porta del Lido — Rossi, 12/07 -> 15/07 (1 ospite)"** con il PDF allegato. Controlla anche lo spam la prima volta.

Se il form dice **"Invio non riuscito"** → su Netlify apri **Logs → Functions → checkin**: lì c'è l'errore. Quasi sempre è una variabile SMTP sbagliata (host/porta/password) o non ancora "deployata" (punto 2.3).

## 5. Vederlo in locale (senza pubblicare)

```bash
python dev-server.py
```
poi <http://localhost:8000/checkin-la-porta-del-lido.html>. Si vede e si prova tutto il form (lingue, validazione), ma l'invio in locale dà "Invio non riuscito" perché il server locale non esegue le funzioni Netlify: l'invio vero si prova sul sito pubblicato (punto 4).

## 6. Cosa arriva in email

- **Oggetto**: `Check-in [CASA] — [Cognome], gg/mm -> gg/mm (N ospiti)` — la stessa casella riceve entrambe le case, l'oggetto dice subito quale.
- **Corpo**: riepilogo testuale di soggiorno e ospiti.
- **PDF** (allegato): intestazione con struttura, indirizzo, CIN e titolare; soggiorno; una scheda per ogni ospite (capofamiglia con documento, componenti con dati anagrafici); nota legale in fondo.
- **`.txt`** solo se `INVIA_TRACCIATO_TXT=true`: tracciato per il Portale Alloggiati Web (168 caratteri/riga, tipi 16/17/19/18/20, codici comuni e stati ufficiali) da caricare in *Invio File*. In tal caso, se un comune di nascita non è stato riconosciuto, l'oggetto inizia con `[VERIFICARE]` e l'email spiega cosa controllare.

Ricorda: la comunicazione alla Questura va fatta **entro 24 ore** dall'arrivo su <https://alloggiatiweb.poliziadistato.it> (con i dati del PDF, inserimento on-line, oppure con il `.txt`).

## 7. Modifiche future

- **Cambiare destinatario**: variabile `MAIL_TO` su Netlify, poi "Trigger deploy". Nessun codice da toccare.
- **Aggiungere una casa**: `HOUSES` in `netlify/checkin-lib/core.js` + la `<option>` e `CONFIG.houses` nel form.
- **Modificare il form**: edita `tools/checkin.template.html`, poi `node tools/build-checkin.js` rigenera le due pagine.
- **Aggiornare le tabelle del Portale**: scarica da <https://alloggiatiweb.poliziadistato.it/portalealloggiati/tabelle.aspx> (Comuni ID=0, Stati ID=1) e rigenera `tabelle.js` (formato `CODICE;NOME;PROV`).

## 8. Privacy — cosa è già a posto

- `privacy-checkin.html`: informativa art. 13 GDPR (obbligo di legge art. 109 TULPS + D.M. 7/1/2013), 4 lingue, titolare, indirizzi, CIN, conservazione 5 anni.
- `privacy.html` del sito: aggiunta una voce che rimanda all'informativa del check-in.
- Il form non salva nulla nel browser tranne la lingua (`localStorage["fh.checkin.lang"]`). Nessun cookie. Honeypot anti-spam invisibile.
- La funzione Netlify non scrive su nessun archivio: riceve, genera il PDF, spedisce, dimentica.
- Consiglio: la casella mittente e quella destinataria contengono dati di documenti d'identità → attiva la verifica in 2 passaggi su entrambe.

## 9. Cartoncini da stampare (QR check-in + recensione Google)

Cartella `stampa/` (uso interno: online questi indirizzi mostrano la home, non sono raggiungibili):

- `stampa/cartoncini-porta-del-lido.html`
- `stampa/cartoncini-villa-la-mimosa.html`

Apri il file con doppio clic → pulsante **Stampa / Salva PDF**: formato **A5**, un cartoncino per foglio (nella finestra di stampa scegli carta A5, oppure A4 con "2 pagine per foglio"). I QR sono generati dai link in cima allo script (`LIDO_CHECKIN`, `LIDO_REVIEW`, `MIMOSA_CHECKIN`, `MIMOSA_REVIEW`): se cambi un link, riapri la pagina e il QR si aggiorna. Serve la connessione internet all'apertura (libreria QR da CDN).

**Versione mobile** (stessi cartoncini, ma con un pulsante al posto del QR — da mandare via WhatsApp agli ospiti, che sono già sul telefono):

```
https://www.leportedisardegna.com/benvenuto-la-porta-del-lido
https://www.leportedisardegna.com/benvenuto-villa-la-mimosa
```

Pulsanti "Registra il soggiorno →" e "Lascia una recensione →" (etichetta nella lingua del telefono: IT/EN/FR/ES). Si può linkare anche direttamente la seconda card: `…/benvenuto-villa-la-mimosa#recensione`. File: `benvenuto-la-porta-del-lido.html`, `benvenuto-villa-la-mimosa.html` (noindex, non in menu).
