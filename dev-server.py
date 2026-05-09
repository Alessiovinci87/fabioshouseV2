"""
Dev server locale con cache disabilitata + SPA fallback.
Uso:  python dev-server.py   (default: porta 8000)
      python dev-server.py 8080
Non usare in produzione — serve tutto con no-store.

SPA fallback: per qualsiasi path che non corrisponde a un file reale e che
NON ha estensione (es. /case/villa-stintino, /incluso, ecc.), serve
index.html con status 200. Replica il comportamento del file `_redirects`
di Netlify in produzione.
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheSpaHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Strip query string per check sul filesystem
        path = self.path.split('?', 1)[0]
        # Path -> filesystem
        fs_path = self.translate_path(path)
        # Se il file esiste OPPURE l'URL ha un'estensione (.css/.js/.png/.html)
        # serve normalmente (lascia la SimpleHTTPRequestHandler fare il suo).
        is_file = os.path.isfile(fs_path)
        is_dir_with_index = os.path.isdir(fs_path) and os.path.isfile(os.path.join(fs_path, 'index.html'))
        last_segment = path.rstrip('/').rsplit('/', 1)[-1]
        has_extension = '.' in last_segment
        if is_file or is_dir_with_index or has_extension:
            return super().do_GET()
        # SPA fallback: serve index.html con la URL originale
        self.path = '/index.html'
        return super().do_GET()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Dev server (no-cache + SPA fallback) on http://localhost:{port}/')
    ThreadingHTTPServer(('', port), NoCacheSpaHandler).serve_forever()
