import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: true, follow: true },
};

/**
 * ⚠️ TODO · RECHT: Gerüst, keine Rechtsberatung.
 * Die Landingpage verarbeitet über den Quiz-Funnel personenbezogene Daten
 * (Name, Telefonnummer, E-Mail, Angaben zur beruflichen und finanziellen
 * Situation). Vor dem Livegang zwingend:
 *   1. Rechtsgrundlagen, Speicherdauer und Empfänger konkret benennen
 *   2. Auftragsverarbeitungsverträge mit allen eingesetzten Diensten schließen
 *      (Vercel als Hoster, CRM/Automatisierung, WhatsApp-Kontaktaufnahme)
 *   3. Hinweis zu Google Fonts prüfen – aktuell werden die Schriften über
 *      @fontsource selbst ausgeliefert, es entsteht KEINE Verbindung zu Google.
 *   4. Anwaltlich freigeben lassen.
 */
export default function DatenschutzPage() {
  return (
    <div className="bg-white pt-[68px]">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="eyebrow mb-4 text-petrol">Rechtliches</p>
        <h1 className="h-display text-[clamp(1.9rem,4.4vw,2.8rem)]">Datenschutzerklärung</h1>

        <div className="mt-6 rounded-[10px] border border-dashed border-line-strong bg-soft px-5 py-4 text-[0.85rem] leading-relaxed text-ink/60">
          <strong className="text-ink">Hinweis fürs Team:</strong> Diese Seite ist ein Gerüst und
          ersetzt keine Rechtsberatung. Vor dem Livegang durch eine geprüfte Fassung ersetzen –
          insbesondere zu Rechtsgrundlagen, Speicherdauer, Empfängern und der Kontaktaufnahme per
          WhatsApp.
        </div>

        <Block title="1. Verantwortlicher">
          <p>
            {brand.person}, {brand.company}
            <br />
            {brand.street}, {brand.city}
            <br />
            Telefon: {brand.phone} · E-Mail: {brand.email}
          </p>
        </Block>

        <Block title="2. Hosting">
          <p>
            Diese Website wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch notwendige
            Server-Logdaten verarbeitet (u. a. IP-Adresse, Zeitpunkt, abgerufene Seite, Browsertyp)
            – Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO. [Angaben zum Auftragsverarbeitungsvertrag
            und ggf. zur Drittlandübermittlung ergänzen.]
          </p>
        </Block>

        <Block title="3. Schriftarten">
          <p>
            Die verwendeten Schriften (Roboto, Inter, Merriweather) werden lokal vom Server dieser
            Website ausgeliefert. Es wird keine Verbindung zu Servern von Google aufgebaut.
          </p>
        </Block>

        <Block title="4. Förderanspruch-Prüfung (Quiz-Funnel)">
          <p>
            Wenn du die Prüfung nutzt, verarbeiten wir die von dir angegebenen Daten: berufliche
            Position, Einkommensrahmen, bereits genutzte Vorsorgebausteine, dein Freitext sowie
            Name, Mobilnummer und E-Mail-Adresse.
          </p>
          <p>
            Zweck: Auswertung deiner Anfrage, Zusendung des Ratgebers und Kontaktaufnahme per
            E-Mail, Telefon oder – sofern von dir gewünscht – WhatsApp.
          </p>
          <p>
            Rechtsgrundlage: deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die Durchführung
            vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Die Einwilligung kannst du
            jederzeit formlos widerrufen.
          </p>
          <p>Speicherdauer: [konkret ergänzen, inkl. gesetzlicher Aufbewahrungsfristen].</p>
          <p>Empfänger: [CRM, Automatisierungsdienst, E-Mail-Versanddienst ergänzen].</p>
        </Block>

        <Block title="5. Kontaktaufnahme per WhatsApp">
          <p>
            [Falls WhatsApp genutzt wird: Verarbeitung durch WhatsApp Ireland Ltd. / Meta, mögliche
            Drittlandübermittlung und die Alternativen zur Kontaktaufnahme hier beschreiben.]
          </p>
        </Block>

        <Block title="6. Deine Rechte">
          <p>
            Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art.
            17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und
            Widerspruch (Art. 21). Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde
            beschweren.
          </p>
          <p>
            Für alle Anliegen genügt eine formlose Nachricht an{" "}
            <a className="text-petrol underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            .
          </p>
        </Block>
      </Container>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="h-title text-[1.15rem]">{title}</h2>
      <div className="mt-3 space-y-3 text-[0.97rem] leading-relaxed text-ink/70">{children}</div>
    </section>
  );
}
