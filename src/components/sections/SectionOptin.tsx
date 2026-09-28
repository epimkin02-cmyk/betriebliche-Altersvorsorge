import Image from "next/image";
import QuizTrigger from "../QuizTrigger";
import Reveal from "../Reveal";
import SectionHead from "../blocks/SectionHead";
import Parallax from "../Parallax";
import { Container } from "../ui";
import type { CSSProperties } from "react";
import { cta, optin } from "@/content/site";

/**
 * SECTION 3 · Opt-in
 * Drei Zellen nebeneinander: das Cover auf dem Spotlight, die drei Kapitel
 * des Ratgebers, der Einstieg in den Quiz-Funnel (Popup, sechs Fragen,
 * danach Report per Mail). Der Lead geht ueber /api/lead an die Webhooks.
 */

const flow = [
  { n: "1", title: "Sechs kurze Fragen", body: "Wo du stehst, was du schon nutzt und was dich bremst. Etwa zwei Minuten." },
  { n: "2", title: "Report per E-Mail", body: "„Die 3 GGF-Hebel“ auf 18 Seiten, sofort nach dem Absenden." },
  { n: "3", title: "Persönliche Einschätzung", body: "Marius Michael sieht deine Antworten und meldet sich mit einer ersten Einordnung." },
];

export default function SectionOptin() {
  return (
    <section id="ratgeber" className="atmo relative scroll-mt-16 py-4 text-white">
      {/* Nav-Anker „Die Lösung": der Ratgeber ist sie. Der CTA nutzt weiter #ratgeber. */}
      <span id="loesung" className="absolute top-0" aria-hidden="true" />
      <Container frame>
        <Reveal>
          <SectionHead
            n="04"
            tag={optin.eyebrow}
            headline={
              <>
                {optin.headline[0]}
                <span className="serif block italic text-mint">{optin.headline[1]}</span>
              </>
            }
            aside={optin.lead}
          />

          <div className="grid lg:grid-cols-12">
            {/* Buch auf der Bühne, eine Münze rollt dahinter vorbei */}
            <Parallax className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-b border-hair px-8 py-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-14 [background-image:linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:50%_33.34%]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="coin left-[-14%] top-[-6%] w-[52%]" style={{ "--depth": 18, "--dur": "11s" } as CSSProperties}>
                  <Image src="/3d/coin-b.webp" alt="" width={1400} height={1389} sizes="260px" className="h-auto w-full" />
                </div>
                <div className="coin left-[66%] top-[62%] w-[38%]" style={{ "--depth": 30, "--dur": "9s", "--off": "-4s" } as CSSProperties}>
                  <Image src="/3d/coin-a.webp" alt="" width={1398} height={1400} sizes="200px" className="h-auto w-full" />
                </div>
              </div>
              <div className="relative w-[270px] sm:w-[340px]">
                <Image
                  src="/ratgeber-stapel-3.png"
                  alt="Der Ratgeber „Die 3 GGF-Hebel“ als Buch, ein Exemplar an einen Stapel gelehnt"
                  width={1200}
                  height={927}
                  sizes="300px"
                  className="h-auto w-full drop-shadow-[0_40px_50px_rgba(0,0,0,0.85)]"
                />
              </div>
            </Parallax>

            {/* Kapitel */}
            <ol className="flex flex-col divide-y divide-hair border-b border-hair lg:col-span-4 lg:border-b-0 lg:border-r">
              {optin.chapters.map((c) => (
                <li key={c.n} className="glass glass--deep spot relative flex-1 border-0 px-5 py-7 sm:px-8">
                  <span className="mono block text-[0.68rem] uppercase tracking-[0.12em] text-mint">Kapitel {c.n}</span>
                  <span className="h-title mt-3 block text-[1.15rem] text-white">{c.title}</span>
                  <span className="mt-1.5 block max-w-[38ch] text-[0.9rem] leading-relaxed text-white/55">{c.body}</span>
                </li>
              ))}
            </ol>

            {/* Einstieg ins Quiz */}
            <div className="glass flex flex-col border-0 px-5 py-8 sm:px-8 lg:col-span-4 lg:py-10">
              <h3 className="h-title text-[1.15rem] text-white">{optin.title}</h3>
              <ol className="mt-6 space-y-5">
                {flow.map((f) => (
                  <li key={f.n} className="grid grid-cols-[2rem_1fr] gap-x-3">
                    <span className="mono pt-0.5 text-[0.8rem] text-mint">0{f.n}</span>
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-white">{f.title}</span>
                      <span className="mt-0.5 block text-[0.84rem] leading-relaxed text-white/55">{f.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <QuizTrigger block>{cta.primary}</QuizTrigger>
              </div>
              <p className="mono mt-3 text-center text-[0.64rem] uppercase tracking-[0.1em] text-white/45">{optin.microcopy}</p>
              <p className="mt-6 text-[0.72rem] leading-relaxed text-white/35">{optin.consent}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
