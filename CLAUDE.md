# TRHI Blog – Claude Code Instructions

## Was ist dieses Projekt?
Statischer Gesundheits- und Fitness-Blog für die TRHI-Website.
Alle Inhalte sind fertige HTML-Dateien, kein Build-Step nötig.

## Deployment-Ziel
GitHub Pages, Netlify **oder** Vercel (alles konfiguriert, siehe unten).

---

## Neue Artikel online stellen

Wenn ein neuer Artikel (`.html`-Datei) hinzukommt, führe diese Schritte aus:

```bash
# 1. Status prüfen
git status

# 2. Neue Dateien hinzufügen
git add .

# 3. Commit mit Datum und Thema
git commit -m "Add article: [DATEINAME]"

# 4. Pushen → löst automatisches Deployment aus
git push origin main
```

Das war's. Netlify/Vercel deployen automatisch nach jedem Push.

---

## Projekt-Struktur

```
TRHI BLOG/
├── CLAUDE.md                          ← diese Datei (Anweisungen für Claude Code)
├── index.html                         ← Blog-Übersichtsseite (Startseite)
├── netlify.toml                       ← Netlify-Konfiguration
├── vercel.json                        ← Vercel-Konfiguration
├── .gitignore                         ← Git-Ignore
├── quiz.js                            ← Quiz-Hilfsskript
├── trhi-hero.html                     ← Hero-Komponente
├── art/                               ← Bilder und Assets
│
├── 2026-06-01_sportvielfalt-sterblichkeit.md
├── 2026-06-08_vitamin-d-immunsystem-quiz.html
├── 2026-06-08_darmgesundheit-sport-mikrobiom.html
├── 2026-06-11_adhs-amphetamine-wie-wirkts.html
├── 2026-06-22_omega-3-gehirn-demenzpraevention.html
├── 2026-06-26_covid-impfstoffe-senat-faktencheck.html   ← NEU (Deutsch)
└── 2026-06-26_covid-vaccines-senate-factcheck.html      ← NEU (Englisch)
```

---

## Artikel-Namenskonvention

```
YYYY-MM-DD_thema-auf-deutsch-mit-bindestrichen.html
```

Beispiele:
- `2026-06-26_covid-impfstoffe-senat-faktencheck.html`
- `2026-07-06_magnesium-schlaf-muskeln.html`

---

## Wenn ein Repo noch nicht existiert (Ersteinrichtung)

```bash
# Im Ordner "TRHI BLOG" ausführen:
git init
git add .
git commit -m "Initial commit: TRHI Blog"

# GitHub: Neues Repo anlegen (z.B. trhi-blog), dann:
git remote add origin https://github.com/DEIN-USERNAME/trhi-blog.git
git branch -M main
git push -u origin main
```

**Netlify:** trhi-blog Repo verknüpfen → Build command: *(leer lassen)* → Publish directory: `.` (Root)

**Vercel:** Repo importieren → Framework: *Other* → Root directory: `.`

**GitHub Pages:** Repository Settings → Pages → Source: `main` Branch → `/` (root)

---

## index.html aktualisieren

Wenn ein neuer Artikel hinzukommt, muss `index.html` manuell oder automatisch aktualisiert werden.
Füge in der Artikelliste einen neuen Eintrag hinzu (Vorlage siehe Kommentare in index.html).

---

## Wichtige Hinweise

- Alle Artikel sind **self-contained HTML** – kein Framework, kein Build nötig
- Affiliate-Links sind als Platzhalter `#` markiert → müssen manuell ersetzt werden
- Jeder Artikel hat einen **Disclaimer** am Ende (medizinischer Hinweis)
- Artikel mit Faktencheck-Tag enthalten potenzielle Falschinformationen aus zitierten Quellen (explizit markiert)
