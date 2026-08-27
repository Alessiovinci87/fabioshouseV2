#!/usr/bin/env node
/* ============================================================
   INDEXNOW — segnala a Bing/Yandex/Naver/Seznam le URL da (ri)indicizzare.
   Uso:  node tools/indexnow.js            invia tutte le URL della sitemap
         node tools/indexnow.js /case /luogo/capo-caccia   solo alcune
   La chiave è il file <chiave>.txt nella radice del sito (deve rispondere 200).
   Da rilanciare dopo ogni deploy che cambia contenuti.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const HOST = 'www.leportedisardegna.com';
const keyFile = fs.readdirSync(ROOT).find(f => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error('File chiave IndexNow non trovato nella radice'); process.exit(1); }
const key = keyFile.replace(/\.txt$/, '');
let urls = process.argv.slice(2).map(u => 'https://' + HOST + u);
if (!urls.length) {
  const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}
(async () => {
  const check = await fetch(`https://${HOST}/${keyFile}`);
  if (!check.ok || (await check.text()).trim() !== key) { console.error('La chiave non è ancora online (' + check.status + '): aspetta il deploy'); process.exitCode = 1; return; }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList: urls })
  });
  console.log('IndexNow:', res.status, res.statusText, '·', urls.length, 'URL inviate');
  // niente process.exit(): su Windows crasha con connessioni fetch ancora aperte
  process.exitCode = (res.status === 200 || res.status === 202) ? 0 : 1;
})();
