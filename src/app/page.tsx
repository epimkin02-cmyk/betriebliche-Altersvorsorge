import SectionHero from "@/components/sections/SectionHero";
import SectionProof from "@/components/sections/SectionProof";
import SectionOptin from "@/components/sections/SectionOptin";
import StickyCta from "@/components/StickyCta";

/**
 * Die Startseite besteht aus genau drei Sections – so wie im Figma-Wireframe
 * „Landingpage · Freebie-Optin · 1440":
 *   1. Hero          – Claim, Nutzen, 3D-Mockup, Kennzahlen, „Bekannt aus"
 *   2. Trust & Proof – Fachpresse, Zum Autor, Stimmen
 *   3. Opt-in        – Vorname + E-Mail, der Ratgeber geht raus
 *
 * Bewusst kurz: die Seite empfängt kalten Meta-Traffic für einen Lead-Magneten.
 * Die früheren Langform-Sections (5 Halbwahrheiten, Vergleichsrechner,
 * Vermögensbrücke, Hebel-Tabs, FAQ) sind auf Wunsch entfernt; sie liegen in der
 * Git-Historie vor Commit „layout: Startseite auf drei Sections" und lassen sich
 * jederzeit zurückholen.
 */
export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionProof />
      <SectionOptin />
      <StickyCta />
    </>
  );
}
