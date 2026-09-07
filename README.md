# Führungsvorsorge · Landingpage & Freebie-Funnel

Landingpage für **Führungsvorsorge by Marius Michael** – steueroptimierte Altersvorsorge
für Führungskräfte, Geschäftsführer und Top-Verdiener.

**Angle:** Firmenvermögen sicher in Privatvermögen umwandeln. Zielgruppe sind
Gesellschafter-Geschäftsführer, in deren GmbH mehr Kapital liegt, als sie privat je
entnommen haben.

Ziel der Seite: kalten Meta-Traffic in qualifizierte Leads verwandeln. Der Besucher
durchläuft einen sechsstufigen Quiz-Funnel („Potenzial prüfen"), erhält im Anschluss den
Ratgeber **„Die 3 GGF-Hebel"** und landet als Datensatz im CRM.

---

## Stack

| Baustein   | Wahl                                                                                         |
| ---------- | -------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, TypeScript)                                                          |
| Styling    | Tailwind CSS v4 mit Design-Tokens aus der Brand Guideline                                     |
| Schriften  | `@fontsource` (Roboto, Inter, Merriweather) – selbst gehostet, **keine** Verbindung zu Google |
| Deployment | Vercel                                                                                        |

---

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
npm run lint     # ESLint
```

---

## Deployment auf Vercel

1. Auf [vercel.com/new](https://vercel.com/new) das Repository
   `epimkin02-cmyk/betriebliche-Altersvorsorge` importieren.
2. Framework-Preset: **Next.js** (wird automatisch erkannt). Keine weitere Konfiguration nötig.
3. Unter **Settings → Environment Variables** die Variable `LEAD_WEBHOOK_URL` setzen
   (siehe `.env.example`).
4. Deploy. Jeder Push auf `main` löst automatisch ein neues Deployment aus.

---

## Aufbau der Startseite

Die Seite besteht bewusst aus **genau vier Sections**:

| #   | Section                             | Grund   | Inhalt                                                                  |
| --- | ----------------------------------- | ------- | ----------------------------------------------------------------------- |
| 1   | `#start` · `SectionHero.tsx`        | dunkel  | Claim, Nutzen, Haupt-CTA, **3D-Mockup des Ratgebers**, Proof, Presse    |
| 2   | `#problem` · `SectionProblem.tsx`   | weiß    | Die 5 Halbwahrheiten, Sofort-Test, Vergleichs-Rechner                    |
| 3   | `#loesung` · `SectionSolution.tsx`  | dunkel  | Vermögensbrücke und die Hebel (Direktversicherung, U-Kasse, Zusage, Fonds) |
| 4   | `#vertrauen` · `SectionTrust.tsx`   | soft    | Abgrenzung, Berater, Stimmen, FAQ, Ablauf, finaler CTA                   |

Jede Section hat genau **einen Hintergrund** – die Seite liest sich dadurch auch optisch als
vier Blöcke, nicht nur im Markup. Wiederverwendbare Teile liegen in
`src/components/blocks/` (Rechner, Hebel-Tabs, Testimonial-Slider, FAQ).

### Das 3D-Mockup austauschen

`src/components/FreebieMockup.tsx` ist der einzige Ort, an dem das Mockup lebt. Der aktuelle
CSS-Nachbau ist ein **Platzhalter**. Zum Ersetzen genügt es, die Funktion `MockupArt` am Ende
der Datei auszutauschen – gegen ein Bild aus `public/`, ein Loop-Video, eine Lottie-/Rive-Datei
oder eine three.js-Szene. Die Maus-Parallax-Hülle drumherum kann bleiben oder entfallen; auf
Touch-Geräten und bei `prefers-reduced-motion` ist sie ohnehin aus.

---

## Wo liegt was?

```
src/
├─ app/
│  ├─ page.tsx              Startseite (setzt die vier Sections zusammen)
│  ├─ check/page.tsx        Quiz-Funnel („Förderanspruch prüfen")
│  ├─ danke/page.tsx        Danke-Seite nach dem Absenden
│  ├─ impressum/            ⚠️ Gerüst – muss rechtlich geprüft werden
│  ├─ datenschutz/          ⚠️ Gerüst – muss rechtlich geprüft werden
│  ├─ api/lead/route.ts     Nimmt den Lead entgegen, leitet an den Webhook weiter
│  └─ globals.css           Design-Tokens (Farben, Schriften, Radien, Schatten)
├─ components/
│  ├─ sections/             Die vier Sections + ihre Inhaltsblöcke
│  ├─ FreebieMockup.tsx     ⭐ 3D-Mockup im Hero (hier austauschen)
│  ├─ CheckFunnel.tsx       Mehrstufiges Quiz-Formular
│  ├─ GapChart.tsx          Animierte Versorgungslücken-Grafik
│  └─ Header / Footer / StickyCta / Logo / Reveal / ui.tsx
└─ content/
   ├─ site.ts               ⭐ ALLE Texte und Zahlen der Seite
   └─ quiz.ts               Fragen und Antwortoptionen des Funnels
```

**Texte ändern?** Fast immer reicht `src/content/site.ts`. Die Komponenten müssen dafür
nicht angefasst werden.

---

## ⚠️ Vor dem Livegang erledigen

Diese Punkte sind bewusst als sichtbare Platzhalter angelegt, damit nichts Unbelegtes
online geht:

- [x] **Testimonials** – ersetzt durch zehn echte, öffentlich einsehbare Google-Bewertungen
      (Quelle: `vertretung.allianz.de/marius.michael`). Bewusst **ohne** Berufsbezeichnung:
      die Rezensenten haben ihre Funktion nicht angegeben, „Geschäftsführer" wäre erfunden.
      Statt der Rolle steht Plattform + Datum, darunter die verlinkte Quellenangabe.
      Wenn Marius für einzelne Kunden eine Funktionsangabe **schriftlich** freigeben lässt,
      kann sie in `testimonials` in `site.ts` ergänzt werden.
- [x] **„Bekannt aus"** – echte Verlagsnamen statt `[Medium 2–9]`, dazu ein neuer
      Pressespiegel (`components/blocks/PressWall.tsx`) mit den vier Artikel-Ausschnitten
      aus `public/presse`. ⚠️ Offen: die **Artikel-URLs** in `press[].url` in `site.ts`.
      Sobald dort eine URL steht, wird die Kachel automatisch verlinkt.
- [x] **Porträtfoto** eingesetzt (`public/marius-michael.png`, freigestellt, aus dem
      Ratgeber-Cover). Steht auf einem Petrol-Verlauf, damit Seite und Freebie
      dieselbe Bildsprache haben.
- [x] **3D-Mockup** – der CSS-Nachbau ist raus, `FreebieMockup.tsx` zeigt jetzt die echte
      Titelseite (`public/ratgeber-cover.png`). Seitenstapel, Schnittkante und
      Maus-Parallax bleiben.
- [ ] **Impressum & Datenschutz** durch die geprüften Fassungen ersetzen – inklusive der
      Pflichtangaben für Versicherungsvermittler (§ 15 VersVermV) und der Registernummer.
- [ ] **`LEAD_WEBHOOK_URL`** in Vercel setzen, sonst geht jeder Lead verloren.
- [ ] **Report-Versand** anbinden (Webhook → E-Mail mit PDF) und einmal end-to-end testen.
- [ ] **Domain** verbinden und `brand.url` in `site.ts` prüfen.
- [ ] **OG-Bild** hinterlegen (`src/app/opengraph-image.png`, 1200 × 630 px).
- [ ] **Cookie-/Consent-Banner** ergänzen, sobald Tracking (Meta-Pixel, Analytics)
      eingebaut wird. Aktuell läuft die Seite ohne Tracking und ohne Cookies.

---

## Marken- und Compliance-Leitplanken

Aus der Brand Guideline v1.0 und dem Freebie übernommen – bitte bei jeder Textänderung
mitdenken:

- Förder- und Steuerbeträge **immer** als „bis zu" und „je nach individueller Situation".
- Keine garantierten Renditen, keine pauschalen Versprechen.
- Die nachgelagerte Besteuerung wird offen benannt – das ist ein Differenzierungsmerkmal,
  kein Schönheitsfehler.
- Die Allianz-Bindung wird offen kommuniziert, nicht im Kleingedruckten versteckt.
- Tonalität: per Du, klar statt kompliziert, souverän statt laut, konkret mit Zahlen,
  entlastend. Keine Panikmache, kein Fachchinesisch.
- Marius Michael ist gebundener Versicherungsvertreter gem. § 34d Abs. 7 GewO.

---

## Design-Tokens

| Token           | Wert      | Einsatz                         |
| --------------- | --------- | ------------------------------- |
| Führungs-Petrol | `#157879` | Primärfarbe, CTAs, Akzente      |
| Tiefschwarz     | `#101217` | Headlines, Text, dunkle Flächen |
| Deep Petrol     | `#0D2820` | Tiefe & Premium-Akzent          |
| Petrol-Nebel    | `#D4DEDE` | Linien, Trenner                 |
| Soft Background | `#F4F8F8` | Karten- & Sektionshintergründe  |

Farbverhältnis 60 / 30 / 10: viel Weißraum, Anthrazit für Text, Petrol sparsam als Akzent.
Schriften: Roboto (Headlines & UI), Inter (Fließtext), Merriweather (Claim & Zitate).
