// Proxy iCal Airbnb → JSON, evita CORS lato browser e nasconde i token .ics.
// Endpoint: /.netlify/functions/calendar?property=stintino|alghero
// Risposta:
//   200 { property, ranges: [[isoStart, isoEndExclusive], ...], fetchedAt }
//   400 { error: 'invalid property' }
//   502 { error: 'upstream', detail }

'use strict';

const ICS_URLS = {
  stintino: 'https://www.airbnb.com/calendar/ical/34134377.ics?t=d5fcd2cefcd646d39ed32353ad44df7b&locale=it',
  alghero:  'https://www.airbnb.com/calendar/ical/1666911024163147226.ics?t=a2ecd9d833934b0aaa9083177976a299&locale=it'
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function jsonResponse(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: Object.assign(
      { 'Content-Type': 'application/json; charset=utf-8' },
      CORS_HEADERS,
      extraHeaders || {}
    ),
    body: JSON.stringify(body)
  };
}

// VALUE=DATE → "YYYYMMDD"; oggetto Date in UTC midnight.
function parseIcsDate(raw) {
  if (!raw) return null;
  // Estrai "YYYYMMDD" all'inizio (alcuni VEVENT hanno DTSTART:20260612T140000Z)
  const m = raw.match(/^(\d{4})(\d{2})(\d{2})/);
  if (!m) return null;
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

function isoDay(d) {
  return d.toISOString().slice(0, 10);
}

// Parser .ics minimale: estrae [start, end) per ogni VEVENT.
// Gestisce line-folding (continuation con space/tab a inizio riga successiva).
function parseIcs(text) {
  const ranges = [];
  // Unfold linee piegate (RFC 5545)
  const unfolded = text.replace(/\r?\n[ \t]/g, '');
  const lines = unfolded.split(/\r?\n/);
  let inEvent = false;
  let dtStart = null;
  let dtEnd = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === 'BEGIN:VEVENT') {
      inEvent = true; dtStart = null; dtEnd = null;
      continue;
    }
    if (line === 'END:VEVENT') {
      if (dtStart && dtEnd && dtEnd > dtStart) {
        ranges.push([isoDay(dtStart), isoDay(dtEnd)]);
      }
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;
    // DTSTART o DTSTART;VALUE=DATE
    if (line.startsWith('DTSTART')) {
      const v = line.split(':')[1];
      dtStart = parseIcsDate(v);
    } else if (line.startsWith('DTEND')) {
      const v = line.split(':')[1];
      dtEnd = parseIcsDate(v);
    }
  }
  return ranges;
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return jsonResponse(405, { error: 'method not allowed' });
  }
  const property = (event.queryStringParameters && event.queryStringParameters.property) || '';
  const url = ICS_URLS[property];
  if (!url) {
    return jsonResponse(400, { error: 'invalid property', allowed: Object.keys(ICS_URLS) });
  }
  try {
    const ctl = (typeof AbortController === 'function') ? new AbortController() : null;
    const timeout = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
    const res = await fetch(url, {
      signal: ctl ? ctl.signal : undefined,
      headers: { 'User-Agent': 'LePortediSardegna-AvailabilityProxy/1.0' }
    });
    if (timeout) clearTimeout(timeout);
    if (!res.ok) {
      return jsonResponse(502, { error: 'upstream', status: res.status });
    }
    const ics = await res.text();
    const ranges = parseIcs(ics);
    return jsonResponse(200, {
      property,
      ranges,
      fetchedAt: new Date().toISOString()
    }, {
      // 5 minuti di cache CDN — aggiornamenti Airbnb non sono real-time
      'Cache-Control': 'public, max-age=300, s-maxage=300'
    });
  } catch (err) {
    return jsonResponse(502, { error: 'upstream', detail: String(err && err.message || err) });
  }
};
