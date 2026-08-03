import SectionHero from "@/components/sections/SectionHero";
import SectionProblem from "@/components/sections/SectionProblem";
import SectionSolution from "@/components/sections/SectionSolution";
import SectionTrust from "@/components/sections/SectionTrust";
import StickyCta from "@/components/StickyCta";

/**
 * Die Startseite besteht aus genau vier Sections – auch optisch, jede mit
 * genau einem Hintergrund:
 *   1. Hero       (dunkel) – Claim, Nutzen, 3D-Mockup, Proof
 *   2. Problem    (weiß)   – die 5 Halbwahrheiten, Sofort-Test, Vergleichsrechner
 *   3. Lösung     (dunkel) – Vermögensbrücke und die Hebel
 *   4. Vertrauen  (soft)   – Abgrenzung, Berater, Stimmen, FAQ, finaler CTA
 */
export default function Home() {
  return (
    <>
      <SectionHero />
      <SectionProblem />
      <SectionSolution />
      <SectionTrust />
      <StickyCta />
    </>
  );
}
