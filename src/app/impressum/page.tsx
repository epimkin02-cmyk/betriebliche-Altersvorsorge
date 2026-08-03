import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

/**
 * ⚠️ TODO · RECHT: Dieses Impressum ist ein GERÜST, keine Rechtsberatung.
 * Als Versicherungsvermittler gelten zusätzliche Pflichtangaben nach
 * § 15 VersVermV. Vor dem Livegang bitte durch die vorhandenen, geprüften
 * Angaben von fuehrungsvorsorge.de ersetzen bzw. anwaltlich freigeben lassen.
 * Alle mit [ ] markierten Stellen müssen gefüllt werden.
 */
export default function ImpressumPage() {
  return (
    <div className="bg-white pt-[68px]">
      <Container className="max-w-3xl py-16 sm:py-24">
        <p className="eyebrow mb-4 text-petrol">Rechtliches</p>
        <h1 className="h-display text-[clamp(1.9rem,4.4vw,2.8rem)]">Impressum</h1>

        <div className="mt-6 rounded-[10px] border border-dashed border-line-strong bg-soft px-5 py-4 text-[0.85rem] leading-relaxed text-ink/60">
          <strong className="text-ink">Hinweis fürs Team:</strong> Diese Seite ist ein Gerüst. Vor dem
          Livegang die geprüften Pflichtangaben (u. a. nach § 5 DDG und § 15 VersVermV) einsetzen und
          rechtlich freigeben lassen. Alle Platzhalter sind mit eckigen Klammern markiert.
        </div>

        <Block title="Angaben gemäß § 5 DDG">
          <p>{brand.person}</p>
          <p>{brand.company}</p>
          <p>{brand.street}</p>
          <p>{brand.city}</p>
        </Block>

        <Block title="Kontakt">
          <p>
            Telefon:{" "}
            <a className="text-petrol underline" href={brand.phoneHref}>
              {brand.phone}
            </a>
          </p>
          <p>
            E-Mail:{" "}
            <a className="text-petrol underline" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
          </p>
        </Block>

        <Block title="Berufsrechtliche Angaben (Versicherungsvermittlung)">
          <p>
            Berufsbezeichnung: Gebundener Versicherungsvertreter gemäß § 34d Abs. 7 GewO
            (Bundesrepublik Deutschland)
          </p>
          <p>Vertretenes Versicherungsunternehmen: Allianz [vollständige Firmierung ergänzen]</p>
          <p>Registrierungsnummer im Vermittlerregister: [Nummer ergänzen]</p>
          <p>
            Registerstelle: Deutscher Industrie- und Handelskammertag (DIHK) e. V., Charlottenstraße
            35/36, 10117 Berlin · www.vermittlerregister.info
          </p>
          <p>Zuständige Aufsichtsbehörde: [IHK ergänzen]</p>
          <p>Umsatzsteuer-Identifikationsnummer: [falls vorhanden ergänzen]</p>
        </Block>

        <Block title="Schlichtungsstelle / Streitbeilegung">
          <p>[Zuständige Schlichtungsstelle für Versicherungsvermittlung ergänzen]</p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen. [Formulierung prüfen und ggf. anpassen.]
          </p>
        </Block>

        <Block title="Verantwortlich für den Inhalt">
          <p>
            {brand.person}, {brand.street}, {brand.city}
          </p>
        </Block>

        <Block title="Haftung für Inhalte und Links">
          <p>[Standardklauseln einsetzen bzw. durch die geprüfte Fassung ersetzen.]</p>
        </Block>
      </Container>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="h-title text-[1.15rem]">{title}</h2>
      <div className="mt-3 space-y-1.5 text-[0.97rem] leading-relaxed text-ink/70">{children}</div>
    </section>
  );
}
