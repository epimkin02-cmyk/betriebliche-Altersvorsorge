/**
 * ============================================================================
 * ZENTRALE INHALTS-DATEI · Führungsvorsorge Landingpage
 * ============================================================================
 * Alle Texte, Zahlen und Links der Seite liegen hier. Wer Inhalte ändern will,
 * muss nur diese Datei anfassen – nicht die Komponenten.
 *
 * ANGLE: Firmenvermögen sicher in Privatvermögen umwandeln.
 * Zielgruppe sind Gesellschafter-Geschäftsführer, in deren GmbH mehr Kapital
 * liegt, als sie privat je entnommen haben. Inhaltliche Quelle: der Ratgeber
 * "Die 3 GGF-Hebel" und die Battle-Card.
 *
 * COMPLIANCE-LEITPLANKE (Brand Guideline, Kapitel 07):
 * Förder- und Steuerbeträge IMMER als "bis zu" + "je nach individueller
 * Situation". Keine garantierten Renditen. Nachgelagerte Besteuerung offen
 * benennen. Marius Michael ist gebundener Versicherungsvertreter gem.
 * § 34d Abs. 7 GewO.
 * ============================================================================
 */

export const brand = {
  name: "Führungsvorsorge",
  claim: "Du führst, wir sichern ab.",
  person: "Marius Michael",
  role: "Spezialist für finanzielle Vorsorge",
  company: "Allianz Hauptvertretung",
  street: "Kurhessenstraße 1–3",
  city: "60431 Frankfurt am Main",
  phone: "069 284878",
  phoneHref: "tel:+4969284878",
  email: "hilfe@fuehrungsvorsorge.de",
  domain: "fuehrungsvorsorge.de",
  url: "https://fuehrungsvorsorge.de",
} as const;

/** Proof-Punkte – ausschließlich belegte Werte aus der Brand Guideline. */
export const proof = [
  { value: "21", suffix: " Jahre", label: "Erfahrung im Finanz- & Versicherungsmarkt" },
  { value: "77,8", suffix: " %", label: "Weiterempfehlungsquote" },
  { value: "IHK", suffix: "", label: "zertifizierte Beratung" },
  { value: "< 60", suffix: " Min.", label: "von der Analyse bis zur Umsetzung" },
] as const;

export const cta = {
  primary: "Potenzial kostenlos prüfen",
  primaryShort: "Potenzial prüfen",
  reassurance: "Kostenlos & unverbindlich · 2 Minuten · Ergebnis per WhatsApp",
  reassuranceShort: "Kostenlos & unverbindlich",
  href: "/check",
} as const;

/* -------------------------------------------------------------------------- */
/* SECTION 1 · HERO                                                            */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Für Gesellschafter-Geschäftsführer",
  headline: ["GmbH-Vermögen sicher", "ins Privatvermögen."],
  sub: "Von 100 € aus deiner GmbH kommen auf dem klassischen Weg nur rund 51 bis 53 € privat an. Es geht besser – legal, planbar und ohne Blick über die Schulter.",
  bullets: [
    "Ab 8.112 € pro Jahr komplett steuerfrei dotierbar",
    "Fünfstellige Jahresbeträge, ohne die Bilanz zu belasten",
    "Betriebsprüfungsfest – gemeinsam mit deiner Steuerberatung",
  ],
  note: "Alle Angaben als „bis zu“ und je nach individueller Situation. Rechengrößen 2026.",
  mockupLabel: "Gratis dazu · dein Ratgeber",
} as const;

/* -------------------------------------------------------------------------- */
/* SECTION 2 · DAS PROBLEM                                                     */
/* -------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "Das Problem",
  headline: "Zwischen deiner GmbH und deinem Privatkonto steht das Finanzamt.",
  lede: "Dein Problem ist nicht, dass du zu wenig verdienst. Dein Problem ist, dass dir gerade überall geniale Auswege verkauft werden, die bei genauem Hinsehen keine sind. Fünf davon solltest du kennen, bevor du unterschreibst.",
  hook: "Rausholen ist leicht. Sicher rausholen ist die Kunst.",

  /** Die 5 Halbwahrheiten aus dem Ratgeber und der Battle-Card. */
  myths: [
    {
      tag: "Stundung ≠ Entnahme",
      claim: "Mit einer Holding entnimmst du fast steuerfrei.",
      reality:
        "Die Holding verschiebt dein Geld nur in die nächste GmbH (§ 8b KStG). Privat wird es erst bei der Ausschüttung – voll besteuert mit rund 26 % Abgeltungsteuer. Dazu laufende Doppelkosten und eine 7-Jahres-Sperrfrist (§ 22 UmwStG).",
      note: "Ein starkes Reinvestitions-Werkzeug – aber kein Weg ins Privatvermögen.",
    },
    {
      tag: "vGA-Risiko",
      claim: "Lass doch die Firma deinen Lebensstil zahlen.",
      reality:
        "Uhr, Reise, überhöhtes Gehalt: Was einem fremden Dritten nicht gewährt worden wäre, ist eine verdeckte Gewinnausschüttung (§ 8 Abs. 3 KStG) – nachversteuert auf Firmen- und Privatebene, plus Zinsen.",
      note: "Das Finanzamt fragt immer: Hätte ein ordentlicher Geschäftsleiter das einem Dritten gewährt?",
    },
    {
      tag: "Bleibt Firmengeld",
      claim: "Investier einfach über die GmbH in Fonds oder Gold.",
      reality:
        "Als Anlage im Betriebsvermögen erstklassig – aber es bleibt Firmengeld. Wer das Depot privat nutzen oder entnehmen will, löst Ausschüttung oder vGA aus. Bei Gold entfällt zusätzlich das private Steuerfrei-nach-einem-Jahr komplett.",
      note: "Ein Verstärker – keine fertige Lösung.",
    },
    {
      tag: "Teurer Ausstieg",
      claim: "Die Immobilie in die GmbH, das spart Steuern.",
      reality:
        "Keine private Spekulationsfrist – jeder Veräußerungsgewinn ist voll körperschaftsteuerpflichtig, die Entnahme zum Privatgebrauch ist eine vGA. Rein kommt sie leicht, raus kommt sie teuer.",
      note: "Vor jedem Rein den Ausstieg ins Private durchrechnen.",
    },
    {
      tag: "Prognose ≠ Garantie",
      claim: "Unbegrenzt steuerfrei vorsorgen.",
      reality:
        "Steuerfrei ist übertrieben – die Auszahlung wird nachgelagert besteuert, im Alter meist niedriger, aber nicht null. Und Werbe-Prozente sind eine Prognose, keine Garantie; das Kapitalmarktrisiko trägt der Unternehmer.",
      note: "Seriös ist, wer die nachgelagerte Besteuerung offen benennt.",
    },
  ],

  /** Die drei Fragen, die einen unsicheren Plan entlarven. */
  testTitle: "Sofort-Test: drei Fragen, die einen unsicheren Plan entlarven",
  tests: [
    "Kommt das Geld am Ende wirklich privat an – oder nur in der nächsten Gesellschaft?",
    "Hält die Gestaltung einer Betriebsprüfung stand? (Angemessenheit, Erdienbarkeit, Dokumentation)",
    "Sind die Zahlen garantiert – oder nur eine schöne Prognose?",
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Vergleichs-Rechner (Teil von Section 2)                                     */
/* -------------------------------------------------------------------------- */

export const calculator = {
  eyebrow: "Der Vergleich",
  headline: "Was kommt bei dir wirklich privat an?",
  lede: "Verschiebe den Regler und sieh, was der klassische Weg kostet. Grobe Orientierung, keine Berechnung deines Einzelfalls – die echte Prüfung dauert zwei Minuten.",
  /**
   * Rechenlogik (bewusst konservativ, vereinfacht und offen ausgewiesen):
   * – Ausschüttung: ~30 % auf Unternehmensebene (KSt + GewSt), danach
   *   26,375 % Abgeltungsteuer inkl. Soli auf den Rest → rund 51,5 % netto.
   * – Gehalt/Tantieme: rund 48 % Gesamtbelastung beim Empfänger → rund 52 %.
   * – Versorgung: Beitrag ist Betriebsausgabe, es arbeitet die volle Summe;
   *   versteuert wird nachgelagert im Ruhestand.
   */
  netQuoteAusschuettung: 0.515,
  netQuoteTantieme: 0.52,
  disclaimer:
    "Stark vereinfachte Orientierungswerte (Annahmen: rund 30 % Steuer auf Unternehmensebene plus 26,375 % Abgeltungsteuer bzw. rund 48 % Gesamtbelastung bei Sofortauszahlung). Die Versorgung wird im Ruhestand nachgelagert besteuert – meist niedriger, aber nicht null. Keine Steuer-, Rechts- oder Anlageberatung; die tatsächliche Wirkung hängt von deiner individuellen Situation ab.",
} as const;

/* -------------------------------------------------------------------------- */
/* SECTION 3 · DIE LÖSUNG                                                      */
/* -------------------------------------------------------------------------- */

export const bridge = {
  eyebrow: "Die Methode",
  headline: "Die Vermögensbrücke",
  lede: "Alle Hebel nutzen dieselbe Mechanik – eine Brücke mit drei Pfeilern, die dein Geld steuerlich begleitet von der Firma ins Private trägt.",
  from: { label: "Firma", title: "Liquidität & Gewinn", body: "Steuerlich weitgehend gefangen" },
  to: { label: "Privat", title: "Deine Versorgung", body: "Persönlich, planbar, geschützt" },
  pillars: [
    {
      no: "01",
      title: "Der Sofort-Effekt",
      body: "Jeder Beitrag ist Betriebsausgabe – senkt den Gewinn und spart sofort Körperschaft- und Gewerbesteuer.",
    },
    {
      no: "02",
      title: "Der Zinseszins-Effekt",
      body: "Das Kapital wächst ohne jährlichen Steuerabzug auf die Erträge. Über 15, 20, 25 Jahre der größte Hebel überhaupt.",
    },
    {
      no: "03",
      title: "Der Tarif-Effekt",
      body: "Versteuert wird erst im Ruhestand – nachgelagert, meist niedriger; bei Kapitalauszahlung hilft die Fünftelregelung.",
    },
  ],
  honesty: {
    title: "Warum hier bewusst nicht steuerfrei steht",
    body: "Die Auszahlung wird später besteuert – im Alter meist niedriger, aber nicht null. Wer dir etwas anderes erzählt, verkauft dir Halbwahrheit Nummer fünf. Der Vorteil liegt im Zusammenspiel der drei Effekte, nicht in einem Märchen.",
  },
} as const;

export const levers = {
  eyebrow: "Die Hebel",
  headline: "Drei Wege, bei denen der Staat mitfinanziert",
  lede: "Es geht selten um entweder–oder. Die stärkste Wirkung entsteht im Zusammenspiel. Welcher Mix zu deiner GmbH passt, ist genau die Frage für das Erstgespräch.",
  items: [
    {
      tag: "Das Fundament",
      title: "Direktversicherung",
      claim: "Bis zu 8.112 € pro Jahr steuerfrei aus der GmbH",
      body: "Deine GmbH schließt eine Renten- oder Lebensversicherung auf dein Leben ab. Die Firma zahlt als Betriebsausgabe – bezugsberechtigt bist ausschließlich du. So wandert Monat für Monat Kapital aus der Gesellschaft in einen Vertrag, der wirtschaftlich dir gehört.",
      facts: [
        "8.112 € p. a. steuerfrei (§ 3 Nr. 63 EStG, Stand 2026) – das sind bis zu 676 € im Monat",
        "davon 4.056 € zusätzlich sozialabgabenfrei",
        "Rechenbeispiel: 676 € Beitrag, minus 307 € Steuerersparnis bei 42 % Grenzsteuersatz – dein effektiver Eigenanteil liegt bei rund 369 €",
      ],
      limit:
        "der Rahmen ist gedeckelt und für große Summen zu klein, das Kapital ist bis zum Ruhestand gebunden.",
    },
    {
      tag: "Der Volumen-Verstärker",
      title: "Unterstützungskasse",
      claim: "Fünfstellig aufbauen – die Bilanz bleibt sauber",
      body: "Wird der Rahmen zu eng, übernimmt die rückgedeckte Unterstützungskasse: ein externer Versorgungsträger, an den deine GmbH Zuwendungen zahlt. Weil die Versorgung ausgelagert ist, entsteht keine Pensionsrückstellung in deiner Bilanz.",
      facts: [
        "keine starre 8.112-€-Grenze – auch fünfstellige Jahresbeiträge sind steuerwirksam",
        "vollständig bilanzneutral: gut für Rating, Bonität und einen späteren Verkauf",
        "Insolvenzschutz über die Verpfändung der Rückdeckung an dich",
      ],
      limit:
        "etwas mehr Aufwand in der Einrichtung – und ohne Verpfändung fehlt dein Insolvenzschutz.",
    },
    {
      tag: "Der Tantieme-Turbo",
      title: "Pensionszusage",
      claim: "Aus 50.000 € Tantieme werden 50.000 € Versorgung",
      body: "Die Königslösung für Spitzenverdiener: Deine GmbH sagt dir die Versorgung direkt zu und bildet eine Pensionsrückstellung. Die mindert den Gewinn heute, das Kapital bleibt im Unternehmen und arbeitet weiter.",
      facts: [
        "Sofort auszahlen: nach Spitzensteuer und Soli bleiben rund 26.000 €",
        "Umwandeln: es arbeiten volle 50.000 € für dich",
        "Die 3 Spielregeln: Angemessenheit (rund 75 % der letzten Aktivbezüge), Erdienbarkeit, Schriftform & Gesellschafterbeschluss",
      ],
      limit:
        "ohne fremdvergleichsfeste Dokumentation wird daraus eine verdeckte Gewinnausschüttung – und beim Unternehmensverkauf ist die Rückstellung ein eigenes Kapitel.",
    },
    {
      tag: "Der Bonus",
      title: "Fonds-Booster",
      claim: "Bis zu 80 % der Erträge körperschaftsteuerfrei",
      body: "Liquidität, die du nicht operativ brauchst, muss nicht unverzinst auf dem Geschäftskonto liegen. Investiert deine GmbH in breit gestreute Aktienfonds, bleiben bis zu 80 % der Erträge körperschaftsteuerfrei – Privatanleger bekommen nur 30 %.",
      facts: [
        "Teilfreistellung Aktienfonds: 80 % auf Körperschaftsebene statt 30 % privat",
        "Fondsvermögen ist Sondervermögen und bei Insolvenz der Fondsgesellschaft geschützt",
        "ideal zum Aufbau von Reserven und als Rückdeckung einer Pensionszusage",
      ],
      limit:
        "ein Park- und Aufbau-Verstärker, kein Ausweg: das Depot bleibt Firmengeld. Und Kursschwankungen bleiben Kursschwankungen.",
    },
  ],
  footnote:
    "Vereinfachte Rechenbeispiele (Annahmen: 42 % Grenzsteuersatz, rund 48 % Gesamtbelastung bei Sofortauszahlung). Tatsächliche Werte je nach individueller Situation; Investmentfonds unterliegen Kursschwankungen. Die Gestaltung erfolgt immer gemeinsam mit deiner Steuerberatung – wir arbeiten mit ihr, nicht gegen sie.",
} as const;

/* -------------------------------------------------------------------------- */
/* SECTION 4 · VERTRAUEN & ABSCHLUSS                                           */
/* -------------------------------------------------------------------------- */

export const difference = {
  eyebrow: "Der Unterschied",
  headline: "Woran du seriöse GGF-Beratung erkennst",
  lede: "Prüf jedes Angebot an diesen sechs Punkten – auch unseres.",
  rows: [
    {
      topic: "Versprechen",
      others: "Über 100 % mehr, unbegrenzt steuerfrei",
      us: "bis zu, ehrlich gerechnet, nachgelagerte Besteuerung offen benannt",
    },
    {
      topic: "Verkaufsdruck",
      others: "Angst: Sie haften persönlich!",
      us: "Souveräne Analyse deiner Zahlen – keine Panikmache",
    },
    {
      topic: "Unabhängigkeit",
      others: "100 % unabhängig – Bindung erst im Kleingedruckten",
      us: "Allianz Hauptvertretung – offen gesagt, im zweiten Satz",
    },
    {
      topic: "Fokus",
      others: "Bauchladen: alles für jeden",
      us: "Ein Thema, richtig: Vorsorge für Führungskräfte und GGF",
    },
    {
      topic: "Prozess",
      others: "Papier, Termine, Wochen",
      us: "100 % digital, Analyse bis Umsetzung unter 60 Minuten",
    },
    {
      topic: "Prüfbarkeit",
      others: "Vertrau mir",
      us: "Sicher-Check zum Selbstprüfen – auch für unser Angebot",
    },
  ],
} as const;

export const about = {
  eyebrow: "Wer hier berät",
  headline: "Kein Verkäufer. Ein Berater auf Augenhöhe.",
  paragraphs: [
    "Ich bin Marius Michael, Gründer von Führungsvorsorge und seit 21 Jahren im Finanz- und Versicherungsmarkt. Ich führe eine Allianz Hauptvertretung in Frankfurt am Main – und sage das so offen, weil ich von versteckten Abhängigkeiten nichts halte.",
    "Bei Gesellschafter-Geschäftsführern ist der Effekt am extremsten: sechsstelliges Kapital in der GmbH, aber kein Plan, wie es sicher privat wird. Genau da setze ich an – gemeinsam mit deiner Steuerberatung, nicht an ihr vorbei.",
  ],
  quote:
    "Ich habe in zwei Jahrzehnten viele geniale Konstrukte kommen und gehen sehen. Was bleibt, ist immer dasselbe: Der sichere Weg schlägt den cleveren Trick – jedes Mal. Deshalb baue ich Vorsorge, die eine Betriebsprüfung langweilig findet.",
  values: [
    { title: "Spezialisiert", body: "Ein Thema, dafür richtig: Vorsorge für GGF und Führungskräfte." },
    { title: "Verlässlich", body: "IHK-zertifiziert, gebunden an die Allianz, 21 Jahre Markterfahrung." },
    { title: "Effizient", body: "Digitaler Prozess, klare Sprache, kein unnötiger Aufwand." },
  ],
} as const;

export const steps = {
  eyebrow: "So läuft's",
  headline: "Drei Schritte. Zwei Minuten. Null Verpflichtung.",
  items: [
    {
      no: "1",
      title: "Ein paar Fragen",
      body: "Beteiligung, Größenordnung, was du heute schon nutzt. Dauert keine zwei Minuten.",
    },
    {
      no: "2",
      title: "Analyse",
      body: "Wir prüfen Status, Lücke und Spielraum deiner GmbH – mit deinen Zahlen, nicht mit Pauschalen.",
    },
    {
      no: "3",
      title: "Dein Fahrplan",
      body: "Welcher Hebel-Mix passt und was das in Euro pro Jahr bedeutet – auf Wunsch per WhatsApp.",
    },
  ],
} as const;

export const freebie = {
  eyebrow: "Dein Ratgeber",
  badge: "Kostenfreier Ratgeber · Ausgabe 2026",
  title: "3 Hebel, um GmbH-Vermögen sicher in Privatvermögen zu wandeln",
  titleShort: "Die 3 GGF-Hebel",
  sub: "18 Seiten Klartext: die fünf Halbwahrheiten, die dich fünfstellig kosten, die Vermögensbrücke mit echten Zahlen – und der Sicher-Check, mit dem du jedes Angebot in neun Punkten prüfst. Auch unseres.",
  coverSub:
    "Ohne die Hälfte ans Finanzamt zu verlieren – und ohne Konstrukte, die bei der nächsten Betriebsprüfung zusammenfallen.",
  bullets: [
    "Die 5 Halbwahrheiten, die GGF jedes Jahr fünf- bis sechsstellig kosten",
    "Die Vermögensbrücke: das Grundprinzip hinter allen drei Hebeln",
    "Rechenbeispiele mit echten Zahlen – vereinfacht, aber ehrlich",
    "Der Sicher-Check: 9 Punkte für jedes Beratungsgespräch",
  ],
  cta: "Ratgeber kostenlos sichern",
} as const;

/**
 * Kundenstimmen – echte, öffentlich einsehbare Google-Bewertungen der Allianz
 * Hauptvertretung Marius Michael, im Wortlaut übernommen.
 * Quelle: vertretung.allianz.de/marius.michael (Stand: September 2026)
 *
 * ⚠️ BEWUSST OHNE BERUFSBEZEICHNUNG: Die Rezensenten haben ihre Funktion nicht
 * angegeben. Titel wie „Geschäftsführer“ wären erfunden – auf einer Seite, die
 * mit Seriosität wirbt, ist das keine Option. Statt der Rolle steht die
 * überprüfbare Quelle (Plattform + Datum). Wenn Marius für einzelne Kunden eine
 * Funktionsangabe schriftlich freigeben lässt, kann sie hier ergänzt werden.
 */
export const reviews = {
  platform: "Google",
  rating: "5,0",
  count: 57,
  countAll: 231,
  note: "5,0 von 5 bei 57 Google-Bewertungen (231 inkl. eKomi). Stand: September 2026.",
  profileUrl: "https://vertretung.allianz.de/marius.michael/#kundenbewertungen",
} as const;

export const testimonials = [
  {
    name: "Helmut Weidmann",
    date: "19.03.2025",
    quote:
      "Wir sind seit vielen Jahren Kunde bei Marius Michael und haben sowohl unsere Unternehmens- als auch unsere privaten Versicherungen bei ihm abgeschlossen. Die Beratung ist stets kompetent, individuell und auf unsere Bedürfnisse abgestimmt. Besonders schätzen wir die schnelle Erreichbarkeit und die zuverlässige Unterstützung bei allen Fragen. Ein absolut vertrauenswürdiger Ansprechpartner – wir können ihn uneingeschränkt weiterempfehlen!",
  },
  {
    name: "Lydia Gür",
    date: "27.04.2026",
    quote:
      "Bei Herrn Michael habe ich mich von Anfang an sehr gut aufgehoben gefühlt. Er nimmt sich viel Zeit und berücksichtigt persönliche Situationen und individuelle Bedürfnisse. Man erhält passende und durchdachte Angebote. Vor allem war die Beratung sehr transparent, ehrlich und verständlich! Bei komplexeren Themen und Nachfragen wurde immer alles geduldig erklärt. Insgesamt eine Beratung auf einem sehr hohen Niveau, vertrauenswürdig und kompetent. Klare Weiterempfehlung!",
  },
  {
    name: "Patricia",
    date: "26.08.2024",
    quote:
      "Seit mittlerweile 15 Jahren ist Marius Michael mein absolut vertrauenswürdiger Berater in allen Belangen. Er nimmt sich immer die notwendige Zeit, um auf meine individuellen Bedürfnisse einzugehen, was mir das Gefühl gibt, dass er sich wirklich um meine Anliegen kümmert. Durch seine kompetente, einfühlsame und geduldige Art habe ich über die Jahre großes Vertrauen in seine Expertise gewonnen.",
  },
  {
    name: "Sabrina Kaemper",
    date: "26.03.2025",
    quote:
      "Sehr netter und kompetenter Berater, hilft wo er kann und ist sehr bemüht für einen die richtige Versicherung zu finden. Was mir sehr gefällt, ist dass er in keinster Weise aufdringlich ist oder versucht einem etwas aufzuschwätzen, ich fühle mich rund um sehr gut betreut und bin meiner Meinung nach in den besten Händen.",
  },
  {
    name: "Patrizia Ardizzone",
    date: "24.10.2025",
    quote:
      "Ich bin super zufrieden mit Marius Michael. Ehrlich, kompetent und immer für einen da. Bei ihm fühlt man sich einfach gut aufgehoben. Er nimmt sich Zeit und findet immer die passende Lösung. Ich kann ihn absolut weiterempfehlen.",
  },
  {
    name: "Ben Logan",
    date: "26.11.2025",
    quote:
      "Marius hat viel Zeit für mich genommen und wirklich alles erklärt bei dem Wechsel. Ich kannte das private Krankenversicherungssystem überhaupt nicht vorher, aber es hat sich wirklich für mich gelohnt und Sinn gemacht. Ich kann Marius nur weiterempfehlen, klasse!",
  },
  {
    name: "Lucas",
    date: "23.04.2025",
    quote:
      "Vorbildliche Beratung von Herrn Michael, sehr freundlich und professionell. Alle Fragen wurden sorgfältig beantwortet, auch wenn es sehr fachlich wurde. Gerne wieder!",
  },
  {
    name: "Julia-Maria Symalla",
    date: "07.04.2024",
    quote:
      "Wir kennen es alle. Nicht jeder weiß auf Anhieb, welche Versicherungen definitiv notwendig sind oder wofür diese überhaupt da sind. Marius Michael führt einen auf einfachem Wege ausführlich in die Welt der Versicherungen ein. Die Zufriedenheit seiner Kunden liegt ihm sehr am Herzen.",
  },
  {
    name: "Anna",
    date: "29.04.2025",
    quote:
      "Herr Michael ist ein sehr netter und kompetenter Berater. Er hilft, wo er kann, und ist immer sehr bemüht, die richtige Lösung zu finden. Das Ganze aber nie aufdringlich. Wir sind mit der ganzen Familie schon Jahre bei Herrn Michael und können ihn zu hundert Prozent weiterempfehlen.",
  },
  {
    name: "Torben Jahn",
    date: "07.12.2025",
    quote: "Super nette, verständliche Beratung und sehr gut erreichbar.",
  },
] as const;

/**
 * Presse – belegte redaktionelle Erwähnungen.
 * ⚠️ TODO · MARIUS: Artikel-URLs ergänzen, dann werden die Kacheln verlinkt.
 * Die Screenshots liegen unter /public/presse und stammen aus dem Figma-Board.
 */
export const press = [
  {
    outlet: "wallstreet:ONLINE",
    headline: "Interview mit Marius Michael",
    image: "/presse/wallstreet-online.png",
    url: "",
  },
  {
    outlet: "Frankfurt Live",
    headline:
      "Mitarbeiter finden und binden – eine betriebliche Krankenversicherung hilft",
    image: "/presse/frankfurt-live.png",
    url: "",
  },
  {
    outlet: "Mittelstand Nachrichten",
    headline: "Betriebliche Krankenversicherung & Altersvorsorge",
    image: "/presse/mittelstand-nachrichten.png",
    url: "",
  },
  {
    outlet: "unternehmen-heute.de",
    headline:
      "Allianz-Experte Marius Michael – Employer Branding dank smarter Gehalts-Extras",
    image: "/presse/unternehmen-heute.png",
    url: "",
  },
] as const;

/** Weitere Medien ohne Screenshot – als Textzeile unter dem Pressespiegel. */
export const pressMentions = [
  "Allgemeine Zeitung",
  "Mitteldeutsche Zeitung",
  "Mittelstand Nachrichten",
  "Starting Up",
  "PT-MAGAZIN",
] as const;

export const pressMeta = {
  summary: "10 redaktionelle Beiträge in 9 Medien · 2022–2023",
  note: "Die Nennungen kennzeichnen redaktionelle Erwähnungen und sind Eigentum der jeweiligen Verlage.",
} as const;

export const faq = [
  {
    q: "Du bist an die Allianz gebunden – bist du dann überhaupt objektiv?",
    a: "Ich bin gebundener Versicherungsvertreter – und sage dir das im zweiten Satz, nicht im Kleingedruckten. Was du dafür bekommst: die Produktwelt und Finanzstärke eines der größten Versicherer Europas, klare Verantwortlichkeit statt Vermittler-Kette, und einen Berater, der seit 21 Jahren denselben Namen trägt. Ob meine Lösung zu dir passt, prüfst du im Erstgespräch – mit dem Sicher-Check aus dem Ratgeber in der Hand.",
  },
  {
    q: "Ersetzt das meine Steuerberatung?",
    a: "Nein – und Vorsicht vor jedem, der das behauptet. Die Gestaltung erfolgt immer gemeinsam mit deiner Steuerberatung. Ich bringe die Versorgungs-Expertise, sie die steuerliche Würdigung deines Einzelfalls.",
  },
  {
    q: "Ich habe schon eine Holding. Brauche ich das dann noch?",
    a: "Ja, denn beides löst verschiedene Aufgaben. Die Holding ist ein starkes Reinvestitions-Werkzeug – sie bringt dein Geld aber nicht ins Privatvermögen, sondern in die nächste Gesellschaft. Die Vermögensbrücke zielt von Anfang an auf die private Ebene. In der Praxis ergänzen sich die beiden.",
  },
  {
    q: "Ist die Auszahlung wirklich steuerfrei?",
    a: "Nein, und wer das behauptet, verkauft dir eine Halbwahrheit. Die Auszahlung wird nachgelagert besteuert – im Alter meist niedriger, aber nicht null. Der Vorteil entsteht aus dem Zusammenspiel von Sofort-, Zinseszins- und Tarif-Effekt, nicht aus einem Steuer-aus-Schalter.",
  },
  {
    q: "Wie lange ist das Geld gebunden?",
    a: "Kapital in der geförderten Versorgung ist bis zum Ruhestand gebunden – das ist der Preis für die steuerliche Begünstigung. Deshalb dimensionieren wir die Beiträge so, dass deine Liquidität nicht leidet. Wie viel sinnvoll ist, ist Teil der Analyse.",
  },
  {
    q: "Was passiert beim Unternehmensverkauf?",
    a: "Das gehört von Anfang an mitgedacht. Direktversicherung und Unterstützungskasse sind bilanzneutral und stören einen Verkauf nicht. Eine Pensionszusage bildet dagegen eine Rückstellung – die ist beim Exit ein eigenes Kapitel und will sauber vorbereitet sein.",
  },
  {
    q: "Für wen lohnt sich das nicht?",
    a: "Wenn du einen Trick suchst, um morgen steuerfrei eine große Summe zu entnehmen: den gibt es nicht, und wer ihn verspricht, verkauft dir eine der fünf Halbwahrheiten. Und wenn du bereit wärst, für ein paar Prozent Optimierung eine Betriebsprüfung zu riskieren, passen wir nicht zusammen.",
  },
] as const;

export const finalCta = {
  headline: "Lass uns deinen Weg rechnen – mit deinen Zahlen.",
  sub: "Wie groß ist dein Spielraum? Welcher Hebel-Mix passt? Und was bedeutet das in Euro pro Jahr? Genau das klären wir – kostenlos, unverbindlich und ohne Verkaufsdruck.",
  ps: "Der steuerfreie Rahmen von 8.112 € gilt pro Jahr. Jedes Jahr, in dem du ihn nicht nutzt, ist er unwiederbringlich weg.",
} as const;

export const legal = {
  disclaimer:
    "Diese Seite dient ausschließlich der allgemeinen, unverbindlichen Information und stellt keine individuelle Steuer-, Rechts- oder Anlageberatung dar. Alle Rechenbeispiele sind stark vereinfacht; tatsächliche Werte hängen von der individuellen Situation ab. Förder- und Steuerangaben stets als „bis zu“; gesetzliche Rechengrößen 2026, jährlich anpassbar. Investmentfonds unterliegen Kursschwankungen; frühere Wertentwicklungen lassen keine Rückschlüsse auf künftige Erträge zu. Marius Michael ist gebundener Versicherungsvertreter gem. § 34d Abs. 7 GewO (Allianz Hauptvertretung). Vor jeder Entscheidung qualifizierten Rat durch Steuerberatung oder Rechtsanwalt einholen.",
} as const;
