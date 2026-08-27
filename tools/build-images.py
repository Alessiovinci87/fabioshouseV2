#!/usr/bin/env python3
"""
Varianti responsive WebP per le foto delle case e della home.

Per ogni .jpg/.jpeg in img/home, img/stintino, img/alghero (solo primo livello)
genera <base>-400.webp, -800.webp, -1200.webp, -1600.webp (qualità 80).
Se l'originale è più stretto della larghezza richiesta NON viene ingrandito:
il file viene comunque scritto alla larghezza originale, così ogni nome esiste
e il codice (window.FH_IMG in pages.js) può costruire il srcset senza manifest.

Uso:  python tools/build-images.py          (rigenera solo ciò che manca o è più vecchio)
      python tools/build-images.py --force  (rigenera tutto)
"""
import os, sys
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DIRS = ['img/home', 'img/stintino', 'img/alghero']
WIDTHS = [400, 800, 1200, 1600]
FORCE = '--force' in sys.argv

def build(src):
    base, _ = os.path.splitext(src)
    im = None
    made = 0
    for w in WIDTHS:
        out = f'{base}-{w}.webp'
        if not FORCE and os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
            continue
        if im is None:
            im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
        tw = min(w, im.width)
        th = round(im.height * tw / im.width)
        im.resize((tw, th), Image.LANCZOS).save(out, 'WEBP', quality=80, method=6)
        made += 1
    return made

total = 0
for d in DIRS:
    full = os.path.join(ROOT, d)
    for f in sorted(os.listdir(full)):
        if f.lower().endswith(('.jpg', '.jpeg')):
            n = build(os.path.join(full, f))
            total += n
            if n: print(f'  {d}/{f}: {n} varianti')
print(f'{total} file WebP generati')
