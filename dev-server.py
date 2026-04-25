"""
Dev server locale con cache disabilitata.
Uso:  python dev-server.py   (default: porta 8000)
      python dev-server.py 8080
Non usare in produzione — serve tutto con no-store.
"""
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'Dev server (no-cache) on http://localhost:{port}/')
    ThreadingHTTPServer(('', port), NoCacheHandler).serve_forever()
