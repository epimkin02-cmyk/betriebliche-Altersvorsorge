import Reveal from "../Reveal";
import CompareCalculator from "../blocks/CompareCalculator";
import { Container, Overline } from "../ui";
import { calculator, problem } from "@/content/site";

/**
 * SECTION 2 · Das Problem (heller Grund)
 * Die fünf Halbwahrheiten, der Sofort-Test und der Vergleichs-Rechner –
 * alles auf einer Fläche, damit die Seite als vier Blöcke lesbar bleibt.
 */
export default function SectionProblem() {
  return (
    <section id="problem" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <Overline>{problem.eyebrow}</Overline>
            <h2 className="h-display max-w-[18ch] text-[clamp(1.9rem,4.2vw,2.9rem)]">
              {problem.headline}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[1.05rem] leading-relaxed text-ink/65 lg:mt-3">{problem.lede}</p>
            <p className="serif mt-6 border-l-4 border-petrol pl-5 text-[1.1rem] italic leading-relaxed text-ink/85">
              {problem.hook}
            </p>
          </Reveal>
        </div>

        {/* Die fünf Halbwahrheiten */}
        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {problem.myths.map((m, i) => (
            <Reveal
              key={m.claim}
              delay={i * 70}
              as="li"
              className={i === problem.myths.length - 1 ? "md:col-span-2" : ""}
            >
              <article className="flex h-full flex-col rounded-[14px] border border-line bg-soft p-7 transition-colors duration-300 hover:border-petrol-200">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-petrol-700">
                    {m.tag}
                  </span>
                  <span className="text-[0.7rem] font-bold text-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="serif mt-4 text-[1.05rem] italic leading-snug text-ink/45 line-through decoration-petrol/40 decoration-2">
                  {m.claim}
                </p>

                <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{m.reality}</p>

                <p className="mt-5 border-t border-line-strong pt-4 text-[0.9rem] font-medium leading-relaxed text-petrol-800">
                  {m.note}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Sofort-Test */}
        <Reveal delay={80}>
          <div className="mt-14 rounded-[14px] border border-petrol-200 bg-petrol-50 p-7 sm:p-9">
            <h3 className="h-title text-[1.1rem] text-petrol-800">{problem.testTitle}</h3>
            <ol className="mt-6 grid gap-5 md:grid-cols-3">
              {problem.tests.map((t, i) => (
                <li key={t} className="flex gap-3.5">
                  <span className="h-display shrink-0 text-[1.3rem] text-petrol-300">
                    {i + 1}
                  </span>
                  <span className="text-[0.93rem] leading-relaxed text-ink/75">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* Vergleichs-Rechner */}
        <div className="mt-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex justify-center">
                <Overline>{calculator.eyebrow}</Overline>
              </div>
              <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)]">{calculator.headline}</h2>
              <p className="mx-auto mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-ink/65">
                {calculator.lede}
              </p>
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <CompareCalculator />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
