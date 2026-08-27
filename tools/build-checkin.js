#!/usr/bin/env node
/* ============================================================
   Genera le pagine di check-in (una per casa) dal template unico.
   Uso:   node tools/build-checkin.js
   Input: tools/checkin.template.html   (segnaposto {{HOUSE_KEY}}, {{HOUSE_NAME}}, {{HOUSE_PLACE}}, {{SLUG}}, {{OG_IMAGE}})
   Output: checkin-la-porta-del-lido.html, checkin-villa-la-mimosa.html
   I link "puliti" (senza .html) sono definiti in _redirects.
   Per modificare il form: edita il template e rilancia questo script.
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATE = path.join(__dirname, 'checkin.template.html');

const HOUSES = [
  { key: 'lido',   name: 'La Porta del Lido', place: 'Alghero',  slug: 'checkin-la-porta-del-lido', og: 'https://www.leportedisardegna.com/img/og-appartamento-alghero.jpg' },
  { key: 'mimosa', name: 'Villa La Mimosa',   place: 'Stintino', slug: 'checkin-villa-la-mimosa', og: 'https://www.leportedisardegna.com/img/og-villa-stintino.jpg' }
];

const tpl = fs.readFileSync(TEMPLATE, 'utf8');
for (const h of HOUSES) {
  const out = tpl
    .split('{{HOUSE_KEY}}').join(h.key)
    .split('{{HOUSE_NAME}}').join(h.name)
    .split('{{HOUSE_PLACE}}').join(h.place)
    .split('{{SLUG}}').join(h.slug)
    .split('{{OG_IMAGE}}').join(h.og);
  if (/\{\{[A-Z_]+\}\}/.test(out)) throw new Error('Segnaposto non sostituito in ' + h.slug);
  const file = path.join(ROOT, h.slug + '.html');
  fs.writeFileSync(file, out);
  console.log('scritto', path.relative(ROOT, file), out.length, 'bytes');
}
