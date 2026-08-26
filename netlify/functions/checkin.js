// Check-in ospiti → PDF riepilogativo → email al titolare. Nessun database, nessun Google.
// Endpoint: POST /.netlify/functions/checkin   (body JSON dal form checkin-*.html)
// Risposta:
//   200 { ok: true, struttura, ospiti, warnings }
//   400 { ok: false, error, missing: [...] }
//   500 { ok: false, error }
//
// Variabili d'ambiente (Netlify → Site configuration → Environment variables):
//   SMTP_HOST      es. smtp.gmail.com / smtp-relay.brevo.com / mail.tuodominio.it
//   SMTP_PORT      587 (STARTTLS, default) oppure 465 (SSL)
//   SMTP_USER      utente della casella mittente
//   SMTP_PASS      password (per Gmail: "password per le app")
//   MAIL_FROM      mittente mostrato, es. "Check-in Le Porte di Sardegna <info@tuodominio.it>" (default: SMTP_USER)
//   MAIL_TO        destinatario, default cosmoalghero@gmail.com (più indirizzi separati da virgola)
//   INVIA_TRACCIATO_TXT   "true" per allegare anche il tracciato .txt per il Portale Alloggiati (default: solo PDF)

'use strict';

const nodemailer = require('nodemailer');
const core = require('../checkin-lib/core');
const { buildPdf } = require('../checkin-lib/pdf');

const DEFAULT_TO = 'cosmoalghero@gmail.com';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};
const json = (statusCode, body) => ({ statusCode, headers: HEADERS, body: JSON.stringify(body) });

function makeTransport() {
  if (process.env.MAIL_TRANSPORT === 'stream') {           // solo per test locali: non spedisce, restituisce il messaggio
    return nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
  }
  const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) throw new Error('SMTP non configurato: impostare SMTP_HOST, SMTP_USER, SMTP_PASS nelle variabili d\'ambiente Netlify');
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: HEADERS, body: '' };
  if (event.httpMethod !== 'POST') return json(405, { ok: false, error: 'Usa POST' });

  let payload;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body || '', 'base64').toString('utf8') : (event.body || '');
    payload = JSON.parse(raw);
  } catch (_) {
    return json(400, { ok: false, error: 'JSON non valido' });
  }

  // Honeypot anti-spam: il campo nascosto deve restare vuoto
  if (payload && payload._gotcha) return json(200, { ok: true, struttura: '', ospiti: 0, warnings: [] });

  const missing = core.validatePayload(payload);
  if (missing.length) return json(400, { ok: false, error: 'Campi mancanti o non validi', missing });

  const opts = { inviaTracciato: String(process.env.INVIA_TRACCIATO_TXT || '').toLowerCase() === 'true' };

  try {
    const tr = core.buildTracciato(payload);
    const meta = core.buildMeta(payload, tr, opts);
    const pdf = await buildPdf(payload, tr, meta, opts);

    const attachments = [{ filename: meta.pdfName, content: pdf, contentType: 'application/pdf' }];
    if (opts.inviaTracciato) attachments.push({ filename: meta.txtName, content: Buffer.from(tr.text, 'latin1'), contentType: 'text/plain' });

    const info = await makeTransport().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER || 'checkin@leportedisardegna.com',
      to: process.env.MAIL_TO || DEFAULT_TO,
      subject: meta.subject,
      text: core.buildMailBody(payload, tr, meta, opts),
      attachments
    });

    const out = { ok: true, struttura: meta.house.name, ospiti: tr.records.length, warnings: tr.warnings };
    if (process.env.MAIL_TRANSPORT === 'stream') out._debug = { subject: meta.subject, pdfName: meta.pdfName, pdfBytes: pdf.length, message: info.message.toString() };
    return json(200, out);
  } catch (err) {
    console.error('checkin error', err);
    return json(500, { ok: false, error: String(err && err.message || err) });
  }
};
