# Claude Code Prompt: 3D Algorithmic Art für TRHI Blog
### Vollständiger Produktions-Prompt für Three.js / WebGL Implementierungen

---

## PROMPT (direkt in Claude Code einfügen)

```
Du bist ein Experte für generative 3D-Kunst mit Three.js und WebGL. Erstelle eine vollständig
selbstständige, produktionsreife interaktive 3D-Kunstinstallation für den TRHI Gesundheitsblog.

═══════════════════════════════════════════════════════════════
KONZEPT & THEMA
═══════════════════════════════════════════════════════════════

Thema:    "Cellular Resonance" — das dreidimensionale Innenleben biologischer Vitalität.
          Stell dir vor: du schwebst durch ein lebendes Gewebe auf zellulärer Ebene.
          Organellen pulsieren. Proteinstrukturen rotieren. Energiefelder verbinden
          Zellen wie Synapsen. Das ist kein abstraktes Muster — es ist Biologie als Kunst.

Zielgruppe: Besucher des TRHI Gesundheitsblogs (health-conscious, 25–55 Jahre)
Zweck:      Atmosphärisches Hintergrundelement / interaktives Kunstobjekt auf der Startseite

═══════════════════════════════════════════════════════════════
TECHNISCHE ANFORDERUNGEN
═══════════════════════════════════════════════════════════════

Stack:
- Three.js r158+ (CDN: https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js)
- Vanilla JavaScript, keine Frameworks
- Eine einzige selbstständige .html Datei (alles inline)
- WebGL2 wenn verfügbar, Fallback auf WebGL1

Performance-Ziele:
- 60 fps auf modernen Desktops (RTX 3060 oder besser)
- 30+ fps auf Mid-Range Laptops (Intel Iris Xe)
- Automatische Quality-Reduktion bei niedrigem FPS
- Particle-Limit: max 50.000 für Desktop, auto-scale auf mobile

═══════════════════════════════════════════════════════════════
VISUELLE ANFORDERUNGEN — DETAILLIERT
═══════════════════════════════════════════════════════════════

1. PARTIKEL-SYSTEM (Hauptelement)
   - 30.000 Partikel als WebGL Points mit custom ShaderMaterial
   - Jedes Partikel ist ein "Molekül" mit:
     * Position im 3D-Raum (Perlin-Noise-Feld im 3D)
     * Velocity-Feld basierend auf 3D curl noise
     * Glow-Effekt durch custom Fragment Shader
     * Farbverlauf: Tiefgrün (#1b4332) → Smaragd (#52b788) → Amber (#f4a261)
       abhängig von Geschwindigkeit (slow=grün, fast=amber)
   - Partikel folgen einem 3D-Vektorfeld das sich zeitlich verändert

2. GEOMETRISCHE STRUKTUREN (Hintergrundebene)
   - 3-5 rotierende "Zellorganellen": icosahedron / toroidal shapes
   - Wireframe-Material mit leuchtendem Smaragdgrün
   - Sehr subtil (opacity 0.08-0.15) — Atmosphäre, kein Ablenkung
   - Jede Struktur hat eigene Rotations-Achse und -Geschwindigkeit

3. VERBINDUNGSLINIEN (Synapsen-Effekt)
   - Wenn zwei Partikel sich nähern (< threshold), zeichne eine Linie
   - Linie-Opacity inversely proportional zur Distanz
   - Max 5000 aktive Verbindungen gleichzeitig (Performance)
   - Farbe: weißlich mit 0.3 opacity

4. CAMERA & NAVIGATION
   - OrbitControls: Maus-Drag rotiert, Scroll zoomt
   - Auto-Rotation: langsame, kontinuierliche Rotation wenn idle (5 Sek nach letzter Interaktion)
   - Smooth camera transitions
   - Initial position: (0, 0, 60)
   - FOV: 75

5. POST-PROCESSING (falls WebGL2)
   - Bloom-Effekt für leuchtende Partikel (strength: 1.5, radius: 0.4)
   - Sehr subtile Vignette (opacity 0.3)
   - Filmkorn-Rauschen (minimal, strength 0.02)
   Fallback wenn kein WebGL2: visuelle Annäherung durch Shader

6. BELEUCHTUNG
   - AmbientLight sehr dunkel (0x0a1a0f, intensity 0.4)
   - 2 PointLights: 
     * Smaragdgrün (#52b788) an Position (30, 20, 10), intensity 2
     * Amber (#f4a261) an Position (-20, -15, 20), intensity 1.5
   - Lights rotieren langsam um das Zentrum

═══════════════════════════════════════════════════════════════
SHADER CODE (Basis-Vorlage, die du verfeinern sollst)
═══════════════════════════════════════════════════════════════

Vertex Shader (Partikel):
```glsl
attribute float a_life;        // 0.0 - 1.0 Partikel-Lebenszeit
attribute float a_speed;       // normalisierte Geschwindigkeit
attribute float a_size;        // individuelle Basisgröße

uniform float u_time;
uniform float u_pulseRate;
uniform float u_pointScale;    // für responsive scaling

varying float v_life;
varying float v_speed;

void main() {
  v_life  = a_life;
  v_speed = a_speed;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  // Pulsierendes Atmen — Herzrhythmus (Sinus)
  float pulse = sin(u_time * u_pulseRate + position.x * 0.1) * 0.5 + 0.5;
  float size  = a_size * (0.7 + pulse * 0.5) * a_life;
  
  gl_PointSize = size * u_pointScale * (300.0 / -mvPosition.z);
  gl_Position  = projectionMatrix * mvPosition;
}
```

Fragment Shader (Partikel):
```glsl
uniform vec3 u_colorRest;    // tiefes Grün
uniform vec3 u_colorActive;  // Smaragd
uniform vec3 u_colorEnergy;  // Amber/Gold

varying float v_life;
varying float v_speed;

void main() {
  // Kreismaske — runde Partikel
  vec2 uv   = gl_PointCoord * 2.0 - 1.0;
  float d   = dot(uv, uv);
  if (d > 1.0) discard;
  
  // Glow: hell in der Mitte, transparent am Rand
  float glow = 1.0 - smoothstep(0.0, 1.0, d);
  glow = pow(glow, 1.8);
  
  // Farbinterpolation nach Geschwindigkeit
  vec3 color;
  if (v_speed < 0.5) {
    color = mix(u_colorRest, u_colorActive, v_speed * 2.0);
  } else {
    color = mix(u_colorActive, u_colorEnergy, (v_speed - 0.5) * 2.0);
  }
  
  // HDR-ähnliche Helligkeit für Glow-Effekt
  color *= 1.5;
  
  gl_FragColor = vec4(color, glow * v_life * 0.85);
}
```

═══════════════════════════════════════════════════════════════
3D CURL NOISE VEKTORFELD (Implementierungsanleitung)
═══════════════════════════════════════════════════════════════

Verwende 3D Curl Noise für das Partikelfeld:
```javascript
// Curl Noise: mathematisch divergenzfrei (Partikel verlassen keine Region dauerhaft)
function curlNoise3D(x, y, z, t, epsilon = 0.001) {
  // Partiell ableiten der Noise-Funktion
  const dFx_dy = (snoise(x, y + epsilon, z, t) - snoise(x, y - epsilon, z, t)) / (2 * epsilon);
  const dFx_dz = (snoise(x, y, z + epsilon, t) - snoise(x, y, z - epsilon, t)) / (2 * epsilon);
  const dFy_dz = (snoise(x + epsilon, y, z, t) - snoise(x - epsilon, y, z, t)) / (2 * epsilon);
  const dFy_dx = (snoise(x, y, z + epsilon, t) - snoise(x, y, z - epsilon, t)) / (2 * epsilon);
  const dFz_dx = (snoise(x, y + epsilon, z, t) - snoise(x, y - epsilon, z, t)) / (2 * epsilon);
  const dFz_dy = (snoise(x + epsilon, y, z, t) - snoise(x, y, z - epsilon, t)) / (2 * epsilon);
  
  return new THREE.Vector3(
    dFx_dy - dFx_dz,
    dFy_dz - dFy_dx,
    dFz_dx - dFz_dy
  );
}
// Verwende dafür eine schnelle Simplex-Noise Implementierung inline
```

═══════════════════════════════════════════════════════════════
UI / INTERAKTIVE STEUERUNG
═══════════════════════════════════════════════════════════════

Erstelle eine minimalistische, halb-transparente Kontrollleiste:
- Rechts unten, 200px breit, blur-Hintergrund
- Slider: Partikeldichte, Pulsrate, Glow-Stärke
- Toggle: Auto-Rotation an/aus
- Button: "Snapshot" (canvas.toDataURL → Download als PNG)
- Seed-Anzeige mit "Neuer Seed" Button (für neue zufällige Konfiguration)
- Styling: Anthropic-Ästhetik (Poppins Font, orange Akzente #d97757)

═══════════════════════════════════════════════════════════════
DATEISTRUKTUR & OUTPUT
═══════════════════════════════════════════════════════════════

Erstelle EINE einzige Datei: cellular-resonance-3d.html
Speicherpfad: C:\Users\dinod\Documents\Claude\Projects\TRHI BLOG\art\cellular-resonance-3d.html

Die Datei muss enthalten:
1. Three.js via CDN (r128, da r158 nicht auf cdnjs verfügbar)
2. Alle Shader als <script type="x-shader"> Tags
3. Simplex Noise Implementierung inline (kopiere eine bewährte JS-Version)
4. Haupt-JavaScript alles inline in <script>
5. CSS inline in <style>
6. KEIN externes Loading nötig außer CDN

Struktur:
<!DOCTYPE html>
<html>
  <head>
    <style> /* alle Styles */ </style>
    <script src="three.js CDN"></script>
    <script type="x-shader/x-vertex" id="particleVert"> /* Vertex Shader */ </script>
    <script type="x-shader/x-fragment" id="particleFrag"> /* Fragment Shader */ </script>
  </head>
  <body>
    <canvas id="three-canvas"></canvas>
    <div id="controls"> /* UI */ </div>
    <script> /* alles andere */ </script>
  </body>
</html>

═══════════════════════════════════════════════════════════════
QUALITÄTSSTANDARDS
═══════════════════════════════════════════════════════════════

- Kein Code ohne Kommentar — erkläre jeden nicht-trivialen Algorithmus
- Error handling: Fange WebGL-Fehler, zeige User-freundliche Meldung
- Mobile: reduziere Partikel auf 8000 wenn window.innerWidth < 768
- requestAnimationFrame mit delta-time für frame-rate-unabhängige Animation
- dispose() alle Three.js Ressourcen bei Seed-Reset (Memory-Leaks vermeiden)
- Starte mit FPS-Monitor: wenn <25 fps, reduziere Partikelzahl um 20%

═══════════════════════════════════════════════════════════════
NACH FERTIGSTELLUNG
═══════════════════════════════════════════════════════════════

1. Teste in Chrome (Entwicklertools → Performance Tab → 60fps check)
2. Teste auf Mobile (Responsive)
3. Berichte: Welche Seed-Werte produzieren die schönsten Ergebnisse?
4. Erkläre wie man die Kunst in das bestehende Blog-HTML einbettet (iframe oder direkte Integration)
```

---

## TIPPS FÜR DIE VERWENDUNG MIT CLAUDE CODE

1. **Führe den Prompt iterativ aus** — erst Grundstruktur, dann Shader, dann UI
2. **Verwende `/clear` zwischen Iterationen** wenn du größere Architekturänderungen machst
3. **Fange mit niedrigem Partikelcount an** (5000) und teste Performance, dann erhöhe
4. **Three.js Version beachten:** r128 ist auf cdnjs verfügbar, neuere Versionen ggf. nicht
5. **OrbitControls separat laden:** `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/controls/OrbitControls.js`

## ALTERNATIVE VARIANTEN (andere Prompts)

**Variante A — Minimal (schneller):** Ersetze "30.000 Partikel" durch "8.000" und streiche Post-Processing

**Variante B — Morphing Geometry:** Ersetze das Partikelsystem durch morphende 3D-Mesh-Strukturen (Icosahedron → Sphere → Torus)

**Variante C — Blog-Header:** Frage Claude Code, den Canvas als fixed-position Hintergrund mit `pointer-events: none` zu implementieren, sodass er hinter dem Blog-Content erscheint
