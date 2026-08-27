"""
Dev server locale con cache disabilitata + SPA fallback.
Uso:  python dev-server.py   (default: porta 8000)
      python dev-server.py 8080
Non usare in produzione — serve tutto con no-store.

SPA fallback: per qualsiasi path che non corrisponde a un file reale e che
NON ha estensione (es. /case/villa-stintino, /incluso, ecc.), serve
index.html con status 200. Replica il comportamento del file `_redirects`
di Netlify in produzione.

Mock Netlify Function `/.netlify/functions/calendar`: il dev server Python
non esegue le Netlify Functions, quindi qui finta la risposta con ranges
busy fittizi per stintino|alghero così il widget disponibilità si vede
funzionante in locale. Per il test della function reale: `netlify dev`
oppure deploy preview Netlify.
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs


# Pattern di occupazione fittizia (offset in giorni da oggi).
# Realistico: settimanali estivi pieni, qualche weekend sparso.
MOCK_BUSY_OFFSETS = {
    'stintino': [
        (5, 12),    # settimana fra ~1 sett
        (20, 27),   # settimana fra ~3 sett
        (45, 59),   # 2 settimane (alta stagione)
        (70, 84),   # 2 settimane
        (100, 107),
    ],
    'alghero': [
        (3, 7),     # long weekend
        (15, 22),
        (35, 42),
        (55, 62),
        (90, 97),
    ],
}


_RULES_CACHE = {'mtime': None, 'rules': {}}


def _redirect_rules():
    """Legge da _redirects le sole regole `/path  /file  200` (senza splat)."""
    fp = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_redirects')
    try:
        mtime = os.path.getmtime(fp)
    except OSError:
        return {}
    if _RULES_CACHE['mtime'] != mtime:
        rules = {}
        with open(fp, encoding='utf-8') as f:
            for line in f:
                parts = line.split()
                if len(parts) >= 3 and parts[2].startswith('200') and '*' not in parts[0] and ':' not in parts[0]:
                    rules[parts[0]] = parts[1]
        _RULES_CACHE.update(mtime=mtime, rules=rules)
    return _RULES_CACHE['rules']


def _build_mock_ranges(property_name):
    today = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    out = []
    for start_off, end_off in MOCK_BUSY_OFFSETS.get(property_name, []):
        start = today + timedelta(days=start_off)
        end = today + timedelta(days=end_off)
        out.append([start.strftime('%Y-%m-%d'), end.strftime('%Y-%m-%d')])
    return out


class NoCacheSpaHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(body)

    def _handle_mock_calendar(self, query):
        property_name = (query.get('property') or [''])[0]
        if property_name not in MOCK_BUSY_OFFSETS:
            self._send_json(400, {
                'error': 'invalid property',
                'allowed': list(MOCK_BUSY_OFFSETS.keys()),
                'mock': True,
            })
            return
        now_iso = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z')
        self._send_json(200, {
            'property': property_name,
            'ranges': _build_mock_ranges(property_name),
            'fetchedAt': now_iso,
            'mock': True,
        })

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        # Mock Netlify Functions — intercetta PRIMA del filesystem check.
        if path == '/.netlify/functions/calendar':
            self._handle_mock_calendar(parse_qs(parsed.query))
            return
        # Path -> filesystem
        fs_path = self.translate_path(path)
        # Se il file esiste OPPURE l'URL ha un'estensione (.css/.js/.png/.html)
        # serve normalmente (lascia la SimpleHTTPRequestHandler fare il suo).
        is_file = os.path.isfile(fs_path)
        is_dir_with_index = os.path.isdir(fs_path) and os.path.isfile(os.path.join(fs_path, 'index.html'))
        last_segment = path.rstrip('/').rsplit('/', 1)[-1]
        has_extension = '.' in last_segment
        # Regole "200" esplicite di _redirects (pagine prerenderizzate): come su
        # Netlify, la regola vale solo se il file di destinazione esiste.
        target = _redirect_rules().get(path.rstrip('/') or '/')
        if target and os.path.isfile(self.translate_path(target)):
            self.path = target
            return super().do_GET()
        if is_file or is_dir_with_index or has_extension:
            return super().do_GET()
        # SPA fallback: serve index.html con la URL originale
        self.path = '/index.html'
        return super().do_GET()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Dev server (no-cache + SPA fallback + mock calendar) on http://localhost:{port}/')
    ThreadingHTTPServer(('', port), NoCacheSpaHandler).serve_forever()
