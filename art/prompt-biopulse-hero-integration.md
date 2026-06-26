# Claude Code Prompt — Biopulse Emergence als TRHI Hero-Hintergrund

> **Ziel:** Die generative Kunst aus `biopulse-emergence.html` läuft live hinter dem schwarzen
> Hero-Text-Feld „Keine Diät. Kein Programm. Ein Aufruf."

---

## PROMPT (direkt in Claude Code einfügen)

```
Lese zuerst diese Datei vollständig:
  C:\Users\dinod\Documents\Claude\Projects\TRHI BLOG\art\biopulse-emergence.html

Darin ist eine p5.js-Partikelkunst implementiert (Klasse Particle, Funktion generateFlowField,
Funktion initSystem). Extrahiere daraus:
  - das params-Objekt
  - die Klasse Particle (update + draw)
  - generateFlowField()
  - initSystem()
  - die Animationslogik aus draw()

Erstelle danach eine neue, in sich geschlossene HTML-Datei:
  C:\Users\dinod\Documents\Claude\Projects\TRHI BLOG\trhi-hero.html

══════════════════════════════════════════════════════════════════
VISUELLE ANFORDERUNG — genau so, nicht anders
══════════════════════════════════════════════════════════════════

Die Seite besteht aus einem einzigen Vollbild-Block (100vw × 100vh):

  ┌──────────────────────────────────────────────────────┐
  │  [p5.js canvas, position:absolute, inset:0, z:0]    │
  │  ← Biopulse-Partikel fließen hier durch              │
  │                                                      │
  │        ╔══════════════════════════════╗              │
  │        ║  schwarzes Feld              ║              │
  │        ║  (rgba 0,0,0 / 0.72)        ║              │
  │        ║  backdrop-filter: blur(2px) ║              │
  │        ║                              ║              │
  │        ║  Keine Diät.                 ║              │
  │        ║  Kein Programm.              ║              │
  │        ║  Ein Aufruf.                 ║              │
  │        ╚══════════════════════════════╝              │
  └──────────────────────────────────────────────────────┘

Das schwarze Feld:
  - position: absolute, zentriert (top 50%, left 50%, transform -50% -50%)
  - z-index: 10
  - padding: 48px 56px
  - border-radius: 4px
  - border-left: 3px solid rgba(82,183,136,0.5)   ← smaragdgrüner Akzent

Text-Styling:
  - Font: 'Lora', serif  (Google Fonts CDN)
  - Farbe: #faf9f5 (cremeweiß)
  - Jede Zeile ist ein eigenes <p>-Element
  - font-size: clamp(2rem, 5vw, 3.6rem)
  - font-weight: 400
  - line-height: 1.25
  - letter-spacing: -0.01em
  - "Ein Aufruf." bekommt color: #52b788 (Smaragdgrün) und font-style: italic

══════════════════════════════════════════════════════════════════
TECHNISCHE ANFORDERUNGEN
══════════════════════════════════════════════════════════════════

1. p5.js via CDN:
   https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js

2. Der canvas muss exakt die Fenstergröße füllen.
   Implementiere windowResized() { resizeCanvas(windowWidth, windowHeight); }

3. Der Canvas-Hintergrund ist #080f0a (sehr dunkles Grün/Schwarz).
   Partikel nutzen blendMode(ADD) für Glow-Effekt — genau wie in der Quelldatei.

4. Aus dem params-Objekt werden NUR diese Werte übernommen:
     seed:         7842
     particleCount: 1400   ← reduziert für Performance als Hintergrund
     pulseRate:    0.7
     noiseScale:   0.004
     fadeAmount:   8        ← leichte Transparenz, Text bleibt lesbar
     flowSpeed:    1.2
   Alle UI-Controls (Sidebar, Slider, Buttons) werden NICHT übernommen.

5. Kein eigenes UI. Keine Buttons. Keine Sidebar. Reine Atmosphäre.

6. Am Ende der Datei füge diesen Kommentar ein:
   <!-- EMBED-TIP: Als iframe in die TRHI-Site einbetten:
        <iframe src="trhi-hero.html" style="position:absolute;inset:0;width:100%;height:100%;border:none;z-index:0;pointer-events:none"></iframe>
        Darüber den Text-Container mit position:relative; z-index:10 legen. -->

══════════════════════════════════════════════════════════════════
QUALITÄTS-CHECK (führe selbst aus bevor du fertig bist)
══════════════════════════════════════════════════════════════════

Öffne die fertige Datei gedanklich und prüfe:
  ✓ Partikel fließen im Vollbild-Hintergrund (kein weißer Rand, kein Overflow)
  ✓ Schwarzes Feld ist lesbar über den Partikeln
  ✓ Text ist in drei Zeilen gesetzt, "Ein Aufruf." ist grün und kursiv
  ✓ Kein UI-Element sichtbar (kein Sidebar, kein Button, kein Seed-Display)
  ✓ Datei ist vollständig selbstständig (kein externes Asset außer CDNs)

Speicherpfad:
  C:\Users\dinod\Documents\Claude\Projects\TRHI BLOG\trhi-hero.html
```

---

## Ergebnis das du erhältst

Eine fertige `trhi-hero.html` mit diesem visuellen Effekt:

```
┌────────────────────────── TRHI Hero ──────────────────────────┐
│  ··· ·· Partikel in Smaragd/Amber fließen durch Dunkelheit ···│
│                                                                │
│              ┌───────────────────────────┐                    │
│              │                           │                    │
│              │  Keine Diät.              │                    │
│              │  Kein Programm.           │                    │
│              │  Ein Aufruf.  ←grün/kurs. │                    │
│              │                           │                    │
│              └───────────────────────────┘                    │
│  ··· ·····  Partikel pulsieren weiter  ····· ···              │
└────────────────────────────────────────────────────────────────┘
```

## iframe-Einbettung in bestehende TRHI-Site

Sobald die Datei existiert, kannst du sie in jede Seite einbetten:

```html
<section style="position:relative; width:100vw; height:100vh; overflow:hidden;">
  <!-- Biopulse Hintergrund -->
  <iframe src="art/trhi-hero.html"
    style="position:absolute;inset:0;width:100%;height:100%;border:none;pointer-events:none;">
  </iframe>

  <!-- Text darüber -->
  <div style="position:relative;z-index:10; /* dein eigenes Styling */">
    <p>Keine Diät.</p>
    <p>Kein Programm.</p>
    <p style="color:#52b788;font-style:italic">Ein Aufruf.</p>
  </div>
</section>
```
