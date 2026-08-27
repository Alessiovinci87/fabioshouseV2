#!/usr/bin/env python3
"""
Riduce i font variabili Fraunces ai soli assi/pesi usati dal sito.

Sorgenti (subset latin di Google Fonts, completi) in tools/fonts-src/;
output in fonts/ con lo stesso nome, così fonts.css non cambia.
Il sito usa Fraunces solo con font-weight 300–400: restringiamo l'asse wght a
quell'intervallo e fissiamo SOFT/WONK ai valori di default; opsz resta variabile
(titoli grandi e corsivi piccoli hanno disegni diversi).

Uso:  python tools/build-fonts.py
Richiede: fonttools, brotli.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, 'tools', 'fonts-src')
OUT = os.path.join(ROOT, 'fonts')
FILES = ['fraunces-normal-latin.woff2', 'fraunces-italic-latin.woff2']
AXES = {'wght': (300, 400)}   # gli altri assi (opsz, SOFT, WONK) vengono gestiti sotto

for name in FILES:
    src = os.path.join(SRC, name)
    f = TTFont(src)
    axes = {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in f['fvar'].axes}
    limits = dict(AXES)
    for tag, (mn, df, mx) in axes.items():
        if tag in limits or tag == 'opsz':
            continue
        limits[tag] = df   # SOFT, WONK: fissati al default
    inst = instancer.instantiateVariableFont(f, limits, inplace=False, updateFontNames=False)
    inst.flavor = 'woff2'
    out = os.path.join(OUT, name)
    inst.save(out)
    print(f'{name}: {os.path.getsize(src)//1024} KB -> {os.path.getsize(out)//1024} KB  (assi: {", ".join(a.axisTag for a in inst["fvar"].axes)})')
