/**
 * Quiz-Funnel · Fragenkatalog
 * ---------------------------------------------------------------------------
 * Quelle: Funnel-Planung (Meta-Kampagne → Umfrage → Freebie „Die 3 GGF-Hebel").
 * Reihenfolge und Wortlaut der Fragen 1–3 und 6 exakt nach Vorgabe.
 *
 * ⚠️ TODO · MARIUS/EGOR: Die Staffeln fuer Frage 4 (Steuerberater) und 5
 * (Unternehmensberatung) sind PLATZHALTER, bis die eigenen Staffeln kommen.
 * Nur die beiden Listen unten tauschen, der Rest bleibt.
 */

export type Choice = { value: string; label: string; hint?: string };

/** 1 · Was machst du bereits, um Firmenvermoegen in Privatvermoegen umzuwandeln? (Mehrfachauswahl) */
export const measures: Choice[] = [
  { value: "holding", label: "Ich habe eine Holding-Struktur" },
  { value: "immobilie-gmbh", label: "Ich finanziere private Immobilien über meine GmbH" },
  { value: "gehaltsbausteine", label: "Ich nutze steuerfreie Gehaltsbausteine" },
  { value: "lohnsteuer", label: "Ich nutze das Lohnsteuerermäßigungsverfahren" },
  { value: "pkv", label: "Ich setze meine PKV von der Steuer ab" },
  { value: "bav", label: "Ich habe eine betriebliche Altersvorsorge" },
  /* Ergaenzt, damit auch jemand ohne Massnahmen weiterkommt (schliesst die anderen aus) */
  { value: "nichts", label: "Noch nichts davon" },
];

/** 3 · Wie viel Netto ziehst du dir jaehrlich aus der GmbH raus? */
export const incomes: Choice[] = [
  { value: "25-50", label: "25.000 – 50.000 €" },
  { value: "50-100", label: "50.000 – 100.000 €" },
  { value: "100-250", label: "100.000 – 250.000 €" },
  { value: "250-500", label: "250.000 – 500.000 €" },
  { value: "500-1000", label: "500.000 € – 1 Mio. €" },
  { value: "ue1000", label: "über 1 Mio. €" },
];

/** 4 · Wie viel zahlst du deinem Steuerberater pro Monat? ⚠️ PLATZHALTER-STAFFEL */
export const taxAdvisorFees: Choice[] = [
  { value: "u250", label: "unter 250 €" },
  { value: "250-500", label: "250 – 500 €" },
  { value: "500-1000", label: "500 – 1.000 €" },
  { value: "1000-2500", label: "1.000 – 2.500 €" },
  { value: "ue2500", label: "über 2.500 €" },
];

/** 5 · Wie viel zahlst du deiner Unternehmensberatung pro Monat? ⚠️ PLATZHALTER-STAFFEL */
export const consultingFees: Choice[] = [
  { value: "keine", label: "Ich habe keine" },
  { value: "u1000", label: "unter 1.000 €" },
  { value: "1000-2500", label: "1.000 – 2.500 €" },
  { value: "2500-5000", label: "2.500 – 5.000 €" },
  { value: "ue5000", label: "über 5.000 €" },
];

export const quizCopy = {
  total: 6,
  steps: [
    {
      title: "Was machst du bereits, um Firmenvermögen in Privatvermögen umzuwandeln?",
      sub: "Mehrfachauswahl möglich.",
    },
    {
      title: "Was sind aktuell deine größten Engpässe, um mehr Privatvermögen aus der GmbH zu ziehen?",
      sub: "Ein, zwei Sätze reichen.",
    },
    {
      title: "Wie viel Netto ziehst du dir jährlich aus der GmbH raus?",
      sub: "Ein grober Rahmen genügt.",
    },
    {
      title: "Wie viel zahlst du deinem Steuerberater pro Monat?",
      sub: "",
    },
    {
      title: "Wie viel zahlst du deiner Unternehmensberatung pro Monat?",
      sub: "",
    },
    {
      title: "Hol dir jetzt deinen Report",
      sub: "Der Ratgeber „Die 3 GGF-Hebel“ geht sofort per E-Mail raus.",
    },
  ],
  fields: { name: "Vollständiger Name", phone: "Handynummer", email: "Deine beste E-Mail-Adresse" },
  consent:
    "Ich bin einverstanden, dass Führungsvorsorge mir den Report per E-Mail schickt und mich zu meinen Angaben per E-Mail, Telefon oder WhatsApp kontaktieren darf. Widerruf jederzeit möglich.",
  next: "Weiter",
  back: "Zurück",
  submit: "Report jetzt anfordern",
  submitting: "Wird gesendet …",
  error: "Das hat gerade nicht geklappt. Bitte versuch es noch einmal oder ruf kurz an: 069 284878.",
  bottleneckPlaceholder:
    "z. B.: In der GmbH liegt Kapital, aber niemand rechnet mir konkret vor, wie es sicher privat wird.",
} as const;
