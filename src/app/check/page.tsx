import type { Metadata } from "next";
import QuizFunnel from "@/components/QuizFunnel";
import { Container } from "@/components/ui";
import { proof } from "@/content/site";

export const metadata: Metadata = {
  title: "Dein Report in 2 Minuten",
  description:
    "Sechs kurze Fragen, danach kommt der Ratgeber „Die 3 GGF-Hebel“ per E-Mail. Kostenlos, unverbindlich, ohne Verkaufsdruck.",
  robots: { index: false, follow: true },
};

/** Eigenstaendige Quiz-Seite, z. B. als Ziel fuer Anzeigen ohne Landingpage. */
export default function CheckPage() {
  return (
    <div className="grid-veil relative overflow-hidden bg-ink pt-[68px] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_18%_-8%,rgba(21,120,121,0.28),transparent_64%)]"
      />
      <Container className="relative z-10 py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="pill pill--dark"><span className="pill__sep" aria-hidden="true" />In 2 Minuten erledigt</p>
            <h1 className="h-display mt-5 text-[clamp(1.9rem,4.4vw,2.8rem)]">Hol dir deinen Report.</h1>
            <p className="mt-5 max-w-[44ch] text-[1.02rem] leading-relaxed text-white/65">
              Sechs kurze Fragen, danach kommt der Ratgeber „Die 3 GGF-Hebel“ per E-Mail und Marius
              Michael meldet sich mit einer ersten Einschätzung.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              {proof.map((p) => (
                <div key={p.label}>
                  <dt className="h-display text-[1.5rem] text-white">
                    {p.value}
                    <span className="serif ml-1 text-[0.7em] italic text-petrol-300">{p.suffix.trim()}</span>
                  </dt>
                  <dd className="mt-1 text-[0.78rem] leading-snug text-white/45">{p.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-[22px] bg-[#0f1216] p-6 ring-1 ring-white/12 sm:p-9">
            <QuizFunnel />
          </div>
        </div>
      </Container>
    </div>
  );
}
