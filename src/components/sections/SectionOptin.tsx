import Image from "next/image";
import QuizTrigger from "../QuizTrigger";
import Reveal from "../Reveal";
import { Container } from "../ui";
import { cta, optin } from "@/content/site";

/**
 * SECTION 3 · Opt-in
 * Links das echte Cover und die drei Kapitel des Ratgebers, rechts der
 * Einstieg in den Quiz-Funnel (Popup, sechs Fragen, danach Report per Mail).
 * Das fruehere Zwei-Felder-Formular ist durch das Quiz ersetzt; der Lead
 * geht ueber /api/lead an Speicher und CRM-Webhooks.
 */

const flow = [
  { n: "1", title: "Sechs kurze Fragen", body: "Wo du stehst, was du schon nutzt und was dich bremst. Etwa zwei Minuten." },
  { n: "2", title: "Report per E-Mail", body: "„Die 3 GGF-Hebel“ auf 18 Seiten, sofort nach dem Absenden." },
  { n: "3", title: "Persönliche Einschätzung", body: "Marius Michael sieht deine Antworten und meldet sich mit einer ersten Einordnung." },
];

export default function SectionOptin() {
  return (
    <section
      id="ratgeber"
      className="grid-veil relative scroll-mt-20 overflow-hidden bg-ink text-white"
    >
      {/* Nav-Anker „Die Lösung": der Ratgeber ist sie. Der CTA nutzt weiter #ratgeber. */}
      <span id="loesung" className="absolute top-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0c1a1a_0%,#101217_55%,#0a0d11_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-12%,rgba(21,120,121,0.32),transparent_66%)]"
      />

      <Container className="relative z-10 py-20 sm:py-28">
        <Reveal>
          <div className="spot mx-auto grid max-w-5xl overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Links: Cover + Kapitel */}
            <div className="relative overflow-hidden bg-[linear-gradient(160deg,rgba(21,120,121,0.28)_0%,rgba(21,120,121,0.06)_50%,transparent_100%)] p-8 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-petrol/30 blur-3xl"
              />
              <div className="relative flex items-start gap-6 sm:gap-8">
                <div className="hidden w-[132px] shrink-0 rotate-[-4deg] overflow-hidden rounded-[6px] shadow-[0_24px_40px_-14px_rgba(0,0,0,0.9)] ring-1 ring-white/15 sm:block">
                  <Image src="/ratgeber-cover.png" alt="Cover des Ratgebers" width={848} height={1200} sizes="132px" className="h-auto w-full" />
                </div>
                <div className="min-w-0">
                  <p><span className="pill pill--dark"><span className="pill__index">04</span><span className="pill__sep" aria-hidden="true" />{optin.eyebrow}</span></p>
                  <h2 className="h-display mt-4 text-[clamp(1.6rem,3.2vw,2.2rem)] text-white">
                    {optin.headline[0]}
                    <span className="serif shine block italic text-petrol-300">{optin.headline[1]}</span>
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[0.96rem] leading-relaxed text-white/60">{optin.lead}</p>
                </div>
              </div>

              <ol className="relative mt-9 divide-y divide-white/10 border-t border-white/10">
                {optin.chapters.map((c) => (
                  <li key={c.n} className="grid grid-cols-[2.4rem_1fr] gap-x-3 py-4">
                    <span className="eyebrow pt-0.5 text-petrol-300">{c.n}</span>
                    <span>
                      <span className="h-title block text-[0.96rem] text-white">{c.title}</span>
                      <span className="mt-0.5 block text-[0.86rem] leading-relaxed text-white/50">{c.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Rechts: Einstieg ins Quiz */}
            <div className="border-t border-white/10 bg-black/25 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="h-title text-[1.15rem] text-white">{optin.title}</h3>

              <ol className="mt-6 space-y-4">
                {flow.map((f) => (
                  <li key={f.n} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-petrol/20 text-[0.8rem] font-bold text-petrol-300 ring-1 ring-petrol-300/30">
                      {f.n}
                    </span>
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-white">{f.title}</span>
                      <span className="mt-0.5 block text-[0.84rem] leading-relaxed text-white/50">{f.body}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <QuizTrigger block>{cta.primary}</QuizTrigger>
              </div>
              <p className="mt-3 text-center text-[0.78rem] text-white/45">{optin.microcopy}</p>
              <p className="mt-6 text-[0.72rem] leading-relaxed text-white/35">{optin.consent}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
