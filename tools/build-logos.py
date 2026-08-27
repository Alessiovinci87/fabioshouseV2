#!/usr/bin/env python3
"""
Genera tutte le varianti del marchio a partire dai file sorgente in stampa/loghi/
(consegnati il 27-08-2026, sfondo bianco/crema pieno, 1254 px).

Uso:   python tools/build-logos.py
Richiede: Pillow, numpy.

Output
  img/logo/marchio.png                 marchio sito, sfondo trasparente, 512 px
  img/logo/marchio-96.png              idem, 96 px (navbar)
  img/logo/alghero.png / stintino.png  marchi casa, trasparenti, 512 px (+ -160.png)
  img/logo/le-porte-di-sardegna.png    logo completo con scritta, trasparente, 1400 px
  img/logo/*-quadrato.png              1024×1024 su bianco: JSON-LD Organization/LodgingBusiness,
                                       Google Business, Apple Business Connect
  img/favicon-16x16.png, favicon-32x32.png, favicon-48x48.png, apple-touch-icon.png,
  img/icon-192.png, img/icon-512.png, favicon.ico (radice)
  img/og-home.jpg, og-villa-stintino.jpg, og-appartamento-alghero.jpg  1200×630
"""
import os
import sys
import numpy as np
from PIL import Image, ImageFont, ImageDraw

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'stampa', 'loghi')
OUT = os.path.join(ROOT, 'img', 'logo')
IMG = os.path.join(ROOT, 'img')
os.makedirs(OUT, exist_ok=True)

CREAM = (244, 239, 227)   # --paper / theme-color #f4efe3
INK = (42, 36, 29)
INK3 = (128, 118, 106)
TERRA = (184, 83, 47)

FONT_DISPLAY = os.path.join(ROOT, 'fonts', 'fraunces-normal-latin.woff2')
FONT_ITALIC = os.path.join(ROOT, 'fonts', 'fraunces-italic-latin.woff2')
FONT_SANS = os.path.join(ROOT, 'fonts', 'geist-latin.woff2')


def p(*parts):
    return os.path.join(*parts)


def transparentize(im, pad=0.06):
    """Rende trasparente lo sfondo uniforme (campionato dagli angoli) preservando
    l'antialiasing dei bordi, poi ritaglia al contenuto con un margine."""
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    h, w, _ = a.shape
    corners = np.concatenate([a[:8, :8].reshape(-1, 3), a[:8, -8:].reshape(-1, 3),
                              a[-8:, :8].reshape(-1, 3), a[-8:, -8:].reshape(-1, 3)])
    bg = corners.mean(axis=0)
    dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
    # 0 → sfondo, >= T → pieno; in mezzo antialiasing
    T = 70.0
    near = dist < T
    # Solo lo sfondo ESTERNO (connesso al bordo) diventa trasparente: le zone chiare
    # interne al marchio (sabbia, cielo nell'arco) restano opache.
    from PIL import ImageDraw as _ID
    mask = Image.fromarray(np.where(near, 255, 0).astype(np.uint8), 'L').copy()  # copy: buffer scrivibile per floodfill
    for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if mask.getpixel(seed) == 255:
            _ID.floodfill(mask, seed, 128)
    exterior = np.asarray(mask) == 128
    alpha = np.where(exterior, np.clip(dist / T, 0, 1), 1.0)
    # de-premultiply verso il colore vero del tratto
    safe = np.where(alpha > 0.02, alpha, 1)[..., None]
    rgb = bg + (a - bg) / safe
    rgb = np.clip(rgb, 0, 255)
    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    out = Image.fromarray(rgba, 'RGBA')
    bbox = Image.fromarray((alpha * 255).astype(np.uint8)).point(lambda v: 255 if v > 12 else 0).getbbox()
    out = out.crop(bbox)
    if pad:
        m = int(max(out.size) * pad)
        canvas = Image.new('RGBA', (out.width + 2 * m, out.height + 2 * m), (0, 0, 0, 0))
        canvas.paste(out, (m, m), out)
        out = canvas
    return out


def fit(im, box):
    """Ridimensiona proporzionalmente dentro (w, h)."""
    r = min(box[0] / im.width, box[1] / im.height)
    return im.resize((max(1, round(im.width * r)), max(1, round(im.height * r))), Image.LANCZOS)


def square_on(im, size, bg, scale=0.82):
    canvas = Image.new('RGB', (size, size), bg)
    m = fit(im, (int(size * scale), int(size * scale)))
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas


def save_png(im, path, size=None):
    if size:
        im = fit(im, (size, size))
    im.save(path, 'PNG', optimize=True)
    print('  ', os.path.relpath(path, ROOT), im.size)


def cover(photo, box, focus=(0.5, 0.5)):
    """Ritaglio tipo object-fit: cover con punto di fuoco."""
    w, h = box
    r = max(w / photo.width, h / photo.height)
    im = photo.resize((round(photo.width * r), round(photo.height * r)), Image.LANCZOS)
    x = int((im.width - w) * focus[0])
    y = int((im.height - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


def font(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            axes = f.get_variation_axes()
            vals = []
            for ax in axes:
                tag = ax.get('name', b'')
                tag = tag.decode() if isinstance(tag, bytes) else str(tag)
                if 'eight' in tag:
                    vals.append(weight)
                elif 'ptical' in tag:
                    vals.append(ax['maximum'])
                else:
                    vals.append(ax['default'])
            f.set_variation_by_axes(vals)
        except Exception:
            pass
    return f


def wrap(draw, text, f, maxw):
    words, lines, cur = text.split(), [], ''
    for w in words:
        t = (cur + ' ' + w).strip()
        if draw.textlength(t, font=f) <= maxw or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def og_image(mark, title, subtitle, photo_path, focus, out_path, url='leportedisardegna.com'):
    W, H = 1200, 630
    PANEL = 500
    im = Image.new('RGB', (W, H), CREAM)
    photo = Image.open(photo_path).convert('RGB')
    im.paste(cover(photo, (W - PANEL, H), focus), (PANEL, 0))
    # filo terracotta di separazione
    d = ImageDraw.Draw(im)
    d.rectangle((PANEL - 3, 0, PANEL - 1, H), fill=TERRA)

    m = fit(mark, (300, 250))
    im.paste(m, ((PANEL - m.width) // 2, 52), m)

    f_title = font(FONT_DISPLAY, 50, 500)
    f_sub = font(FONT_SANS, 22, 400)
    f_url = font(FONT_SANS, 17, 500)
    x, maxw = 56, PANEL - 112
    y = 52 + 250 + 34
    lines = wrap(d, title, f_title, maxw)
    if len(lines) > 2:
        f_title = font(FONT_DISPLAY, 42, 500)
        lines = wrap(d, title, f_title, maxw)
    for ln in lines:
        d.text((x, y), ln, font=f_title, fill=INK)
        y += int(f_title.size * 1.08)
    y += 14
    for ln in wrap(d, subtitle, f_sub, maxw):
        d.text((x, y), ln, font=f_sub, fill=INK3)
        y += int(f_sub.size * 1.4)
    d.text((x, H - 56 - 17), url, font=f_url, fill=TERRA)
    im.save(out_path, 'JPEG', quality=88, optimize=True, progressive=True)
    print('  ', os.path.relpath(out_path, ROOT), im.size)


def main():
    print('Marchi trasparenti')
    mark = transparentize(Image.open(p(SRC, 'logo-solo-immagine-sito.png')))
    alg = transparentize(Image.open(p(SRC, 'logo-alghero.png')))
    sti = transparentize(Image.open(p(SRC, 'logo-stintino.png')))
    full = transparentize(Image.open(p(SRC, 'logo-completo-sito.png')), pad=0.04)

    save_png(mark, p(OUT, 'marchio.png'), 512)
    save_png(mark, p(OUT, 'marchio-96.png'), 96)
    save_png(mark, p(OUT, 'marchio-160.png'), 160)
    save_png(alg, p(OUT, 'alghero.png'), 512)
    save_png(alg, p(OUT, 'alghero-160.png'), 160)
    save_png(sti, p(OUT, 'stintino.png'), 512)
    save_png(sti, p(OUT, 'stintino-160.png'), 160)
    save_png(full, p(OUT, 'le-porte-di-sardegna.png'), 1400)
    save_png(full, p(OUT, 'le-porte-di-sardegna-600.png'), 600)

    print('Quadrati su bianco (schema.org, Google Business)')
    square_on(mark, 1024, (255, 255, 255)).save(p(OUT, 'le-porte-di-sardegna-quadrato.png'), optimize=True)
    square_on(alg, 1024, (255, 255, 255)).save(p(OUT, 'alghero-quadrato.png'), optimize=True)
    square_on(sti, 1024, (255, 255, 255)).save(p(OUT, 'stintino-quadrato.png'), optimize=True)

    print('Favicon e icone PWA')
    base = square_on(mark, 1024, CREAM, scale=0.86)
    for name, size in [('favicon-16x16.png', 16), ('favicon-32x32.png', 32), ('favicon-48x48.png', 48),
                       ('apple-touch-icon.png', 180), ('icon-192.png', 192), ('icon-512.png', 512)]:
        base.resize((size, size), Image.LANCZOS).save(p(IMG, name), optimize=True)
        print('  ', 'img/' + name, size)
    base.resize((48, 48), Image.LANCZOS).save(p(ROOT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
    print('   favicon.ico 16/32/48')

    print('Immagini social 1200×630')
    og_image(mark, 'Le Porte di Sardegna', 'Due case, due mari — Stintino e Alghero. Affitto diretto dalla famiglia, senza intermediari.',
             p(IMG, 'home', 'hero-home-spiaggia-pelosa.jpg'), (0.5, 0.45), p(IMG, 'og-home.jpg'))
    og_image(sti, 'Villa La Mimosa', 'Stintino — villa con giardino a cinque minuti dalla Spiaggia della Pelosa. Otto posti letto.',
             p(IMG, 'stintino', 'villa-stintino-hero-giardino.jpg'), (0.5, 0.6), p(IMG, 'og-villa-stintino.jpg'))
    og_image(alg, 'La Porta del Lido', 'Alghero — appartamento nel centro catalano, a due passi dai bastioni e dal Lido.',
             p(IMG, 'alghero', 'appartamento-alghero-hero.jpg'), (0.5, 0.5), p(IMG, 'og-appartamento-alghero.jpg'))


if __name__ == '__main__':
    main()
