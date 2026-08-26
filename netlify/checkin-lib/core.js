/* ============================================================
   CHECK-IN OSPITI — logica pura (validazione, tracciato, testi)
   Usata dalla Netlify Function checkin.js. Nessun I/O qui.
   ============================================================ */
'use strict';

const { STATI, COMUNI_DATA } = require('./tabelle');

/* ---------- configurazione strutture ---------- */
const HOUSES = {
  lido:   { name: 'La Porta del Lido', address: 'Via Goceano 23, 07041 Alghero (SS)',  cin: 'IT090003C2000U2044' },
  mimosa: { name: 'Villa La Mimosa',   address: 'Via Le Vele 9, 07040 Stintino (SS)',  cin: 'IT090089C2000T0180' }
};
const TITOLARE = 'Fabio Italo Peigotty';
const SITO_WEB = 'https://www.leportedisardegna.com';

/* ---------- tabelle piccole del Portale ---------- */
const TIPO_ALLOGGIATO = { OSPITE_SINGOLO: '16', CAPO_FAMIGLIA: '17', CAPO_GRUPPO: '18', FAMILIARE: '19', MEMBRO_GRUPPO: '20' };
const TIPO_ALLOGGIATO_LABEL = { '16': 'Ospite singolo', '17': 'Capo famiglia', '18': 'Capo gruppo', '19': 'Familiare', '20': 'Membro gruppo' };
const DOCUMENTI = { IDENT: "CARTA DI IDENTITA'", IDELE: "CARTA IDENTITA' ELETTRONICA", PASOR: 'PASSAPORTO ORDINARIO', PATEN: 'PATENTE DI GUIDA' };
const SESSO = { M: '1', F: '2' };
const SESSO_LABEL = { M: 'Maschio', F: 'Femmina' };
const CODICE_ITALIA = '100000100';

/* ---------- tracciato: layout ufficiale 168 caratteri ---------- */
const TRACCIATO_LAYOUT = [
  { key: 'tipo', len: 2 }, { key: 'dataArrivo', len: 10 }, { key: 'giorni', len: 2 },
  { key: 'cognome', len: 50 }, { key: 'nome', len: 30 }, { key: 'sesso', len: 1 },
  { key: 'dataNascita', len: 10 }, { key: 'comuneNascita', len: 9 }, { key: 'provNascita', len: 2 },
  { key: 'statoNascita', len: 9 }, { key: 'cittadinanza', len: 9 },
  { key: 'docTipo', len: 5 }, { key: 'docNumero', len: 20 }, { key: 'docRilascio', len: 9 }
];
const RECORD_LEN = 168;

/* ============================================================
   VALIDAZIONE
   ============================================================ */
function validatePayload(p) {
  const missing = [];
  if (!p || typeof p !== 'object') return ['payload'];
  const req = (obj, key, label) => { if (!obj || obj[key] == null || String(obj[key]).trim() === '') missing.push(label); };
  const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(String(s || ''));

  if (!HOUSES[p.casa]) missing.push('casa');
  if (!isDate(p.arrivo)) missing.push('arrivo');
  if (!isDate(p.partenza)) missing.push('partenza');
  if (isDate(p.arrivo) && isDate(p.partenza) && p.partenza <= p.arrivo) missing.push('partenza>arrivo');
  if (!p.privacy) missing.push('privacy');

  const c = p.capo || {};
  req(c, 'nome', 'capo.nome');
  req(c, 'cognome', 'capo.cognome');
  if (!SESSO[c.sesso]) missing.push('capo.sesso');
  if (!isDate(c.dataNascita)) missing.push('capo.dataNascita');
  req(c, 'luogoNascita', 'capo.luogoNascita');
  if (!STATI[c.statoNascita]) missing.push('capo.statoNascita');
  if (!STATI[c.cittadinanza]) missing.push('capo.cittadinanza');
  if (!DOCUMENTI[c.docTipo]) missing.push('capo.docTipo');
  req(c, 'docNumero', 'capo.docNumero');
  if (!STATI[c.docStatoRilascio]) missing.push('capo.docStatoRilascio');
  if (c.docStatoRilascio === CODICE_ITALIA) req(c, 'docComuneRilascio', 'capo.docComuneRilascio');

  const comp = Array.isArray(p.componenti) ? p.componenti : [];
  comp.forEach((m, i) => {
    const pre = 'componente' + (i + 1) + '.';
    req(m, 'nome', pre + 'nome');
    req(m, 'cognome', pre + 'cognome');
    if (!SESSO[m.sesso]) missing.push(pre + 'sesso');
    if (!isDate(m.dataNascita)) missing.push(pre + 'dataNascita');
    req(m, 'luogoNascita', pre + 'luogoNascita');
    if (!STATI[m.statoNascita]) missing.push(pre + 'statoNascita');
    if (!STATI[m.cittadinanza]) missing.push(pre + 'cittadinanza');
  });
  if (comp.length > 19) missing.push('troppi componenti');

  const n = parseInt(p.numOspiti, 10);
  if (!(n >= 1) || n !== comp.length + 1) missing.push('numOspiti');
  return missing;
}

/* ============================================================
   TRACCIATO
   ============================================================ */
function buildTracciato(p) {
  const warnings = [];
  const comp = Array.isArray(p.componenti) ? p.componenti : [];
  const isGroup = p.tipoGruppo === 'gruppo';
  let tipoCapo, tipoMembro;
  if (comp.length === 0) { tipoCapo = TIPO_ALLOGGIATO.OSPITE_SINGOLO; tipoMembro = null; }
  else if (isGroup)      { tipoCapo = TIPO_ALLOGGIATO.CAPO_GRUPPO;    tipoMembro = TIPO_ALLOGGIATO.MEMBRO_GRUPPO; }
  else                   { tipoCapo = TIPO_ALLOGGIATO.CAPO_FAMIGLIA;  tipoMembro = TIPO_ALLOGGIATO.FAMILIARE; }

  let giorni = daysBetween(p.arrivo, p.partenza);
  if (giorni < 1) giorni = 1;
  if (giorni > 30) { warnings.push(`Permanenza di ${giorni} giorni: il Portale accetta massimo 30, nel tracciato è stato indicato 30.`); giorni = 30; }

  const records = [personRecord(p.capo, tipoCapo, p, giorni, true, warnings, 'Capofamiglia')];
  comp.forEach((m, i) => records.push(personRecord(m, tipoMembro, p, giorni, false, warnings, 'Componente ' + (i + 1))));
  records.forEach((r, i) => { if (r.line.length !== RECORD_LEN) throw new Error(`Record ${i + 1} di lunghezza ${r.line.length} (attesi ${RECORD_LEN})`); });
  return { text: records.map(r => r.line).join('\r\n'), records, warnings };
}

function personRecord(x, tipo, p, giorni, hasDoc, warnings, who) {
  const f = {
    tipo, dataArrivo: fmtDateIT(p.arrivo), giorni: String(giorni).padStart(2, '0'),
    cognome: normName(x.cognome), nome: normName(x.nome), sesso: SESSO[x.sesso] || '',
    dataNascita: fmtDateIT(x.dataNascita), comuneNascita: '', provNascita: '',
    statoNascita: x.statoNascita, cittadinanza: x.cittadinanza, docTipo: '', docNumero: '', docRilascio: ''
  };
  let comuneLabel = '', docLabel = '';
  if (x.statoNascita === CODICE_ITALIA) {
    const c = lookupComune(x.luogoNascita);
    if (c) {
      f.comuneNascita = c.code; f.provNascita = c.prov; comuneLabel = `${c.name} (${c.prov})`;
      if (c.ambiguous) warnings.push(`${who}: il comune di nascita "${x.luogoNascita}" esiste in più province, scelto ${comuneLabel}. Verificare.`);
      if (c.expired) warnings.push(`${who}: il comune di nascita "${comuneLabel}" risulta soppresso (usato il codice storico). Verificare.`);
    } else warnings.push(`${who}: comune di nascita "${x.luogoNascita}" NON trovato nella tabella del Portale. Campo lasciato vuoto: da completare a mano.`);
  }
  if (hasDoc) {
    f.docTipo = x.docTipo; f.docNumero = normDocNumber(x.docNumero);
    if (x.docStatoRilascio === CODICE_ITALIA) {
      const cr = lookupComune(x.docComuneRilascio);
      if (cr) {
        f.docRilascio = cr.code; docLabel = `${cr.name} (${cr.prov})`;
        if (cr.ambiguous) warnings.push(`${who}: il comune di rilascio "${x.docComuneRilascio}" esiste in più province, scelto ${docLabel}. Verificare.`);
      } else warnings.push(`${who}: comune di rilascio documento "${x.docComuneRilascio}" NON trovato nella tabella del Portale. Campo lasciato vuoto: da completare a mano.`);
    } else { f.docRilascio = x.docStatoRilascio; docLabel = STATI[x.docStatoRilascio] || ''; }
  }
  const line = TRACCIATO_LAYOUT.map(fld => fixed(f[fld.key], fld.len)).join('');
  return { line, fields: f, comuneLabel, docLabel, tipoLabel: TIPO_ALLOGGIATO_LABEL[tipo] };
}

/* ---------- lookup comuni ---------- */
let COMUNI_INDEX = null;
function comuniIndex() {
  if (COMUNI_INDEX) return COMUNI_INDEX;
  const idx = {};
  for (const row of COMUNI_DATA) {
    const parts = row.split(';');
    const rec = { code: parts[0], name: parts[1], prov: parts[2], expired: parts[3] === 'X' };
    const k = normKey(rec.name);
    (idx[k] = idx[k] || []).push(rec);
  }
  return (COMUNI_INDEX = idx);
}
const COMUNI_ALIAS = {
  "REGGIO NELL'EMILIA": 'REGGIO EMILIA', 'REGGIO DI CALABRIA': 'REGGIO CALABRIA', 'BOZEN': 'BOLZANO', 'AOSTE': 'AOSTA',
  'ROME': 'ROMA', 'MILAN': 'MILANO', 'NAPLES': 'NAPOLI', 'TURIN': 'TORINO', 'VENICE': 'VENEZIA', 'GENOA': 'GENOVA',
  'FLORENCE': 'FIRENZE', 'FLORENCIA': 'FIRENZE', 'NAPOLES': 'NAPOLI', 'GENES': 'GENOVA', 'VENISE': 'VENEZIA',
  'PADUA': 'PADOVA', 'SYRACUSE': 'SIRACUSA', 'LEGHORN': 'LIVORNO', 'MANTUA': 'MANTOVA'
};
// La tabella del Portale usa ancora le vecchie province sarde (Olbia → SS, Lanusei → NU, Carbonia → CA)
const PROV_ALIAS = {
  SS: ['SS', 'OT', 'NU'], OT: ['OT', 'SS', 'NU'], NU: ['NU', 'OG', 'OT'], OG: ['OG', 'NU'],
  CA: ['CA', 'SU', 'VS', 'CI'], SU: ['SU', 'CA', 'VS', 'CI'], VS: ['VS', 'CA'], CI: ['CI', 'CA'],
  FC: ['FC', 'FO'], FO: ['FO', 'FC'], PU: ['PU', 'PS'], PS: ['PS', 'PU'], MB: ['MB', 'MI'],
  BT: ['BT', 'BA', 'FG'], FM: ['FM', 'AP'], VB: ['VB', 'NO'], LC: ['LC', 'CO', 'BG'], LO: ['LO', 'MI'],
  RN: ['RN', 'FO', 'FC'], PO: ['PO', 'FI'], KR: ['KR', 'CZ'], VV: ['VV', 'CZ'], BI: ['BI', 'VC']
};
function lookupComune(input) {
  let s = String(input || '').trim();
  if (!s) return null;
  let provHint = null;
  const m = s.match(/\(([A-Za-z]{2})\)\s*$/) || s.match(/[,\-]\s*([A-Za-z]{2})\s*$/);
  if (m) { provHint = m[1].toUpperCase(); s = s.slice(0, m.index).trim(); }
  const idx = comuniIndex();
  const tries = [s];
  const up = stripAccents(s).toUpperCase().replace(/\s+/g, ' ').trim();
  if (COMUNI_ALIAS[up]) tries.push(COMUNI_ALIAS[up]);
  tries.push(s.replace(/\bS\.\s*/gi, 'SAN ').replace(/\bSS\.\s*/gi, 'SANTI '));
  tries.push(s.replace(/\bS\.\s*/gi, 'SANTA '));
  tries.push(s.replace(/\bST\.?\s*/gi, 'SAN ').replace(/\bSTA\.?\s*/gi, 'SANTA '));
  let list = null;
  for (let i = 0; i < tries.length && !list; i++) list = idx[normKey(tries[i])];
  if (!list || !list.length) return null;
  let cands = list.slice();
  if (provHint) {
    const group = PROV_ALIAS[provHint] || [provHint];
    const byProv = cands.filter(r => group.includes(r.prov));
    if (byProv.length) cands = byProv;
  }
  const valid = cands.filter(r => !r.expired);
  const pool = valid.length ? valid : cands;
  const pick = pool[0];
  return { code: pick.code, name: pick.name, prov: pick.prov, expired: pick.expired, ambiguous: pool.length > 1 };
}

/* ---------- helper ---------- */
function stripAccents(s) {
  s = String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');
  return s.replace(/[ßẞ]/g, 'SS').replace(/[Øø]/g, 'O').replace(/[Đđ]/g, 'D').replace(/[Łł]/g, 'L').replace(/[Ææ]/g, 'AE').replace(/[Œœ]/g, 'OE');
}
const normKey = (s) => stripAccents(s).toUpperCase().replace(/[^A-Z0-9]+/g, '');
const normName = (s) => stripAccents(s).toUpperCase().replace(/[’`´]/g, "'").replace(/[^A-Z' \-]+/g, ' ').replace(/\s+/g, ' ').trim();
const normDocNumber = (s) => stripAccents(s).toUpperCase().replace(/[^A-Z0-9]+/g, '');
function fixed(v, len) { let s = String(v == null ? '' : v); if (s.length > len) s = s.slice(0, len); return s.padEnd(len, ' '); }
function fmtDateIT(iso) { const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? `${m[3]}/${m[2]}/${m[1]}` : ''; }
function daysBetween(a, b) { return Math.round((new Date(b + 'T00:00:00Z') - new Date(a + 'T00:00:00Z')) / 86400000); }
const slug = (s) => stripAccents(s).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function nowRome() {
  try { return new Intl.DateTimeFormat('it-IT', { timeZone: 'Europe/Rome', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date()); }
  catch (_) { return new Date().toISOString(); }
}

/* ============================================================
   META (oggetto, nomi file) + CORPO EMAIL
   ============================================================ */
function buildMeta(p, tr, opts) {
  const house = HOUSES[p.casa];
  const arr = fmtDateIT(p.arrivo), dep = fmtDateIT(p.partenza);
  const short = (d) => d.slice(0, 5);
  const cognome = normName(p.capo.cognome);
  const cognomeNice = cognome.charAt(0) + cognome.slice(1).toLowerCase();
  const flag = (opts.inviaTracciato && tr.warnings.length) ? '[VERIFICARE] ' : '';
  const n = tr.records.length;
  return {
    house,
    subject: `${flag}Check-in ${house.name} — ${cognomeNice}, ${short(arr)} -> ${short(dep)} (${n} ${n === 1 ? 'ospite' : 'ospiti'})`,
    pdfName: `checkin-${slug(house.name)}-${slug(cognomeNice)}-${p.arrivo}.pdf`,
    txtName: `tracciato-${slug(house.name)}-${p.arrivo}.txt`,
    arrivo: arr, partenza: dep, notti: daysBetween(p.arrivo, p.partenza), timestamp: nowRome()
  };
}

function buildMailBody(p, tr, meta, opts) {
  const h = meta.house, L = [];
  L.push(`CHECK-IN — ${h.name}`);
  L.push(`${h.address} · CIN ${h.cin}`);
  L.push(`Registrazione ricevuta il ${meta.timestamp} (lingua form: ${p.lang || 'it'})`);
  L.push('');
  L.push('SOGGIORNO');
  L.push(`  Arrivo:   ${meta.arrivo}`);
  L.push(`  Partenza: ${meta.partenza}  (${meta.notti} notti)`);
  L.push(`  Ospiti:   ${tr.records.length}${tr.records.length > 1 ? (p.tipoGruppo === 'gruppo' ? ' — gruppo' : ' — famiglia') : ''}`);
  L.push('');
  tr.records.forEach((r, i) => {
    const x = i === 0 ? p.capo : p.componenti[i - 1];
    L.push(`${i === 0 ? 'CAPOFAMIGLIA' : 'COMPONENTE ' + i} (${r.tipoLabel})`);
    L.push(`  ${normName(x.cognome)} ${normName(x.nome)} · ${SESSO_LABEL[x.sesso]} · nato/a il ${fmtDateIT(x.dataNascita)} a ${x.luogoNascita} (${STATI[x.statoNascita]})`);
    L.push(`  Cittadinanza: ${STATI[x.cittadinanza]}`);
    if (i === 0) L.push(`  Documento: ${DOCUMENTI[x.docTipo]} n. ${normDocNumber(x.docNumero)} rilasciato a ${x.docStatoRilascio === CODICE_ITALIA ? x.docComuneRilascio + ' (Italia)' : STATI[x.docStatoRilascio]}`);
    L.push('');
  });
  if (opts.inviaTracciato && tr.warnings.length) {
    L.push('ATTENZIONE — verificare prima del caricamento sul Portale:');
    tr.warnings.forEach(w => L.push('  * ' + w));
    L.push('');
  }
  L.push('ALLEGATI');
  L.push(`  1. ${meta.pdfName} — riepilogo leggibile`);
  if (opts.inviaTracciato) L.push(`  2. ${meta.txtName} — tracciato per Portale Alloggiati Web (menu "Invio File")`);
  L.push('');
  L.push('Ricorda la comunicazione alla Questura entro 24 ore dall\'arrivo: https://alloggiatiweb.poliziadistato.it');
  L.push(`Messaggio generato automaticamente dal form di check-in di ${SITO_WEB}`);
  return L.join('\n');
}

module.exports = {
  HOUSES, TITOLARE, SITO_WEB, STATI, DOCUMENTI, SESSO_LABEL, CODICE_ITALIA,
  validatePayload, buildTracciato, buildMeta, buildMailBody, lookupComune,
  normName, normDocNumber, fmtDateIT
};
