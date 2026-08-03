import type { Metadata } from "next";
import CheckFunnel from "@/components/CheckFunnel";
import { Container } from "@/components/ui";
import { proof } from "@/content/site";

export const metadata: Metadata = {
  title: "Förderanspruch prüfen",
  description:
    "In 2 Minuten prüfen, welche staatliche Förderung dir als Führungskraft zusteht – kostenlos, unverbindlich und ohne Verkaufsdruck.",
  robots: { index: false, follow: true },
};

export default function CheckPage() {
  return (
    <div className="bg-soft pt-[68px]">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-4 text-petrol">In 2 Minuten erledigt</p>
            <h1 className="h-display text-[clamp(1.9rem,4.4vw,2.8rem)]">
              Prüf dein Potenzial.
            </h1>
            <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-ink/65">
              Sechs kurze Fragen – danach wissen wir, welcher Hebel-Mix zu deiner GmbH passt.
              Dein Ergebnis bekommst du zusammen mit dem Ratgeber „Die 3 GGF-Hebel“.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line-strong pt-8">
              {proof.map((p) => (
                <div key={p.label}>
                  <dt className="h-display text-[1.5rem] text-petrol">
                    {p.value}
                    {p.suffix}
                  </dt>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-graybrand">{p.label}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-10 max-w-[42ch] text-[0.78rem] leading-relaxed text-graybrand">
              Deine Angaben nutzen wir ausschließlich zur Bearbeitung deiner Anfrage. Keine
              Weitergabe an Dritte, kein Newsletter ohne deine Zustimmung.
            </p>
          </div>

          <CheckFunnel />
        </div>
      </Container>
    </div>
  );
}
