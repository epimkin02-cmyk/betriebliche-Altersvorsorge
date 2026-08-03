/**
 * Quiz-Funnel · Fragenkatalog
 * ---------------------------------------------------------------------------
 * Basis: die interne Funnel-Planung (Typeform-Quiz) mit dem Angle
 * "Firmenvermögen in Privatvermögen umwandeln". Wer keine eigene GmbH hat,
 * bekommt in Frage 3 eine passende Alternativliste.
 *
 * Ziel: qualifizierte Eintragung → Ratgeber "Die 3 GGF-Hebel" per Mail
 * → Datensatz im CRM.
 */

export type Choice = { value: string; label: string; hint?: string };

export const positions: Choice[] = [
  {
    value: "ggf",
    label: "Gesellschafter-Geschäftsführer",
    hint: "Du bist an deiner GmbH beteiligt",
  },
  {
    value: "gf",
    label: "Angestellter Geschäftsführer",
    hint: "Fremdgeschäftsführer ohne Beteiligung",
  },
  {
    value: "selbststaendig",
    label: "Selbstständig oder Freiberuflich",
    hint: "Einzelunternehmen, Partnerschaft, Praxis",
  },
  {
    value: "angestellt",
    label: "Angestellte Führungskraft",
    hint: "Bereichs- oder Abteilungsleitung, Prokura, Vorstand",
  },
];

/** Wie viel Netto wird jährlich aus der Gesellschaft entnommen? */
export const incomes: Choice[] = [
  { value: "u50", label: "25.000 – 50.000 €" },
  { value: "50-100", label: "50.000 – 100.000 €" },
  { value: "100-250", label: "100.000 – 250.000 €" },
  { value: "250-500", label: "250.000 – 500.000 €" },
  { value: "500-1000", label: "500.000 € – 1 Mio." },
  { value: "ue1000", label: "über 1 Mio. €" },
];

/** Was wird heute schon genutzt? – Antworten je nach Position. */
export const measuresOwner: Choice[] = [
  { value: "holding", label: "Ich habe eine Holding-Struktur" },
  { value: "immobilie-gmbh", label: "Ich finanziere private Immobilien über meine GmbH" },
  { value: "gehaltsbausteine", label: "Ich nutze steuerfreie Gehaltsbausteine" },
  { value: "lohnsteuer", label: "Ich nutze das Lohnsteuerermäßigungsverfahren" },
  { value: "pkv", label: "Ich setze meine PKV von der Steuer ab" },
  { value: "bav", label: "Ich habe eine betriebliche Altersvorsorge" },
  { value: "depot", label: "Meine Firma investiert in Fonds oder Gold" },
  { value: "nichts", label: "Nichts davon – genau deshalb bin ich hier" },
];

export const measuresEmployee: Choice[] = [
  { value: "bav", label: "Betriebliche Altersvorsorge oder Entgeltumwandlung" },
  { value: "direktversicherung", label: "Direktversicherung über den Arbeitgeber" },
  { value: "ruerup", label: "Basisrente (Rürup) oder private Rentenversicherung" },
  { value: "depot", label: "ETF- oder Wertpapierdepot" },
  { value: "immobilie", label: "Vermietete Immobilie" },
  { value: "nichts", label: "Nichts davon – genau deshalb bin ich hier" },
];

export const timing: Choice[] = [
  { value: "sofort", label: "So schnell wie möglich" },
  { value: "quartal", label: "In den nächsten 3 Monaten" },
  { value: "jahr", label: "Dieses Jahr noch" },
  { value: "info", label: "Ich sammle erst mal Informationen" },
];
