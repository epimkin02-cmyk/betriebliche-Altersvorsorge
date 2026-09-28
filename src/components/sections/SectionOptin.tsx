import Image from "next/image";
import QuizTrigger from "../QuizTrigger";
import Reveal from "../Reveal";
import { Container, Label } from "../ui";
import { cta, optin } from "@/content/site";

/**
 * SECTION 3 · Opt-in
 * Eine grosse Karte: links das Cover mit den drei Kapiteln, rechts der
 * Einstieg in den Quiz-Funnel (Popup, sechs Fragen, danach Report per Mail).
 */

const flow = [
  { n: "1", title: "Sechs kurze Fragen", body: "Wo du stehst, was du schon nutzt und was dich bremst. Etwa zwei Minuten." },
  { n: "2", title: "Report per E-Mail", body: "„Die 3 GGF-Hebel“ auf 18 Seiten, sofort nach dem Absenden." },
  { n: "3", title: "Persönliche Einschätzung", body: "Marius Michael sieht deine Antworten und meldet sich mit einer ersten Einordnung." },
];

export default function SectionOptin() {
  return (
    <section id="ratgeber" className="relative scroll-mt-16 border-t border-hair bg-ink text-white">
      <span id="loesung" className="absolute top-0" aria-hidden="true" />
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <Label>{optin.eyebrow}</Label>
            <h2 className="h-display mt-6 text-[clamp(1.9rem,4vw,3rem)]">
              {optin.headline[0]}
              <span className="block text-mint">{optin.headline[1]}</span>
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-muted">{optin.lead}</p>
          </div>

          <div className="card card--hover mt-16 grid overflow-hidden rounded-[20px] lg:grid-cols-[1.05fr_0.95fr]">
            {/* Cover + Kapitel */}
            <div className="flex flex-col gap-8 p-6 sm:p-10 lg:border-r lg:border-hair">
              <div className="flex items-start gap-6">
                <div className="w-[120px] shrink-0 overflow-hidden rounded-[6px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.9)] ring-1 ring-white/10 sm:w-[150px]">
                  <Image src="/ratgeber-cover.png" alt="Cover des Ratgebers „Die 3 GGF-Hebel“" width={848} height={1200} sizes="150px" className="h-auto w-full" />
                </div>
                <div className="pt-1">
                  <span className="text-[0.84rem] text-faint">Inhalt</span>
                  <ol className="mt-3 space-y-4">
                    {optin.chapters.map((c) => (
                      <li key={c.n} className="flex gap-3">
                        <span className="mono w-6 shrink-0 text-[0.82rem] text-mint">{c.n}</span>
                        <span>
                          <span className="block text-[0.95rem] font-semibold text-white">{c.title}</span>
                          <span className="mt-1 block text-[0.86rem] leading-relaxed text-muted">{c.body}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Einstieg ins Quiz */}
            <div className="flex flex-col border-t border-hair bg-ink-3/60 p-6 sm:p-10 lg:border-t-0">
              <h3 className="text-[1.1rem] font-semibold text-white">{optin.title}</h3>
              <ol className="mt-6 space-y-5">
                {flow.map((f) => (
                  <li key={f.n} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hair-2 text-[0.78rem] font-semibold text-white">{f.n}</span>
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-white">{f.title}</span>
                      <span className="mt-1 block text-[0.86rem] leading-relaxed text-muted">{f.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <QuizTrigger block>{cta.primary}</QuizTrigger>
              </div>
              <p className="mt-4 text-center text-[0.8rem] text-faint">{optin.microcopy}</p>
              <p className="mt-8 text-[0.74rem] leading-relaxed text-faint">{optin.consent}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
