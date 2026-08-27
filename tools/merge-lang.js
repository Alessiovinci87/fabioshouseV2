#!/usr/bin/env node
/* Genera lang-<xx>.js a partire dai JSON di traduzione ({ "dict:chiave"|"data:percorso": "testo" }).
   Uso: node tools/merge-lang.js es file1.json file2.json …
   Il file generato va caricato dopo data.js: aggiunge la lingua a DICT (FH_I18N.extend)
   e agli oggetti localizzati di FH_DATA, senza toccare i18n.js e data.js. */
'use strict';
const fs = require('fs');
const path = require('path');
const [lang, ...files] = process.argv.slice(2);
if (!lang || !files.length) { console.error('uso: node tools/merge-lang.js <lingua> <json…>'); process.exit(1); }
const dict = {}, data = {};
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [k, v] of Object.entries(j)) {
    if (typeof v !== 'string' || !v.trim()) continue;
    if (k.startsWith('dict:')) dict[k.slice(5)] = v;
    else if (k.startsWith('data.')) data[k.slice(5)] = v;
  }
}
const out = `/* ============================================================
   Le Porte di Sardegna — lingua "${lang}" (generato da tools/merge-lang.js: non modificare a mano,
   modifica i JSON in tools/lang/${lang}/ e rilancia lo script)
   Aggiunge le traduzioni a DICT (i18n.js) e a FH_DATA (data.js) dopo il caricamento.
   ============================================================ */
(function () {
  'use strict';
  var DICT = ${JSON.stringify(dict, null, 1)};
  var DATA = ${JSON.stringify(data, null, 1)};
  window.FH_LANG_LOADED = window.FH_LANG_LOADED || {};
  window.FH_LANG_LOADED.${lang} = true;
  if (window.FH_I18N && window.FH_I18N.extend) {
    var patch = {};
    Object.keys(DICT).forEach(function (k) { patch[k] = { ${lang}: DICT[k] }; });
    window.FH_I18N.extend(patch);
  }
  if (window.FH_DATA) {
    Object.keys(DATA).forEach(function (p) {
      var parts = p.split('.'), o = window.FH_DATA;
      for (var i = 0; i < parts.length && o; i++) o = o[parts[i]];
      if (o && typeof o === 'object') o.${lang} = DATA[p];
    });
  }
})();
`;
fs.writeFileSync(path.join(__dirname, '..', 'lang-' + lang + '.js'), out);
console.log('lang-' + lang + '.js:', Object.keys(dict).length, 'voci dizionario,', Object.keys(data).length, 'voci dati');
