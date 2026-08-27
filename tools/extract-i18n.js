#!/usr/bin/env node
/* Estrae tutte le stringhe localizzate (oggetti {it,en,…}) da i18n.js (DICT) e data.js
   con il loro percorso, per produrre le traduzioni di una nuova lingua.
   Uso: node tools/extract-i18n.js <lingua> > out.json   → { "dict:chiave" | "data:percorso": "testo IT" }
   Vengono estratte solo le voci che NON hanno ancora la lingua richiesta. */
'use strict';
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const ROOT = path.join(__dirname, '..');
const lang = process.argv[2] || 'es';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://www.leportedisardegna.com/', runScripts: 'outside-only' });
const w = dom.window;
w.eval(fs.readFileSync(path.join(ROOT, 'i18n.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(ROOT, 'data.js'), 'utf8'));
if (fs.existsSync(path.join(ROOT, 'lang-' + lang + '.js'))) w.eval(fs.readFileSync(path.join(ROOT, 'lang-' + lang + '.js'), 'utf8'));
const out = {};
const isLoc = o => o && typeof o === 'object' && !Array.isArray(o) && typeof o.it === 'string' && typeof o.en === 'string';
function walk(o, p) {
  if (isLoc(o)) { if (typeof o[lang] !== 'string') out[p] = o.it; return; }
  if (Array.isArray(o)) o.forEach((v, i) => walk(v, p + '.' + i));
  else if (o && typeof o === 'object') Object.keys(o).forEach(k => walk(o[k], p + '.' + k));
}
Object.keys(w.FH_I18N.dict).forEach(k => { const v = w.FH_I18N.dict[k]; if (isLoc(v) && typeof v[lang] !== 'string') out['dict:' + k] = v.it; });
walk(w.FH_DATA, 'data');
process.stdout.write(JSON.stringify(out, null, 1));
