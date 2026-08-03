import LeverTabs from "../blocks/LeverTabs";
import { Container, Overline } from "../ui";
import { bridge, levers } from "@/content/site";

/**
 * SECTION 3 · Die Lösung (dunkler Grund)
 * Vermögensbrücke als Grundprinzip, danach die Hebel als Tab-Modul.
 */
export default function SectionSolution() {
  return (
    <section
      id="loesung"
      className="grid-veil relative scroll-mt-20 overflow-hidden bg-ink py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_20%_-5%,rgba(21,120,121,0.35),transparent_62%)]"
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Overline variant="dark">{bridge.eyebrow}</Overline>
          </div>
          <h2 className="h-display text-[clamp(1.9rem,4.2vw,2.9rem)] text-white">
            {bridge.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-white/60">
            {bridge.lede}
          </p>
        </div>

        {/* Firma → drei Pfeiler → Privat */}
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,2.4fr)_minmax(0,0.72fr)]">
          <div className="flex flex-col justify-center rounded-[14px] border border-white/12 bg-white/[0.04] p-6 text-center">
            <p className="eyebrow text-white/40">{bridge.from.label}</p>
            <p className="h-title mt-3 text-[1.1rem] text-white">{bridge.from.title}</p>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-white/50">{bridge.from.body}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {bridge.pillars.map((p) => (
              <article
                key={p.no}
                className="flex flex-col rounded-[14px] border border-petrol/40 bg-petrol/12 p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="h-display text-[1.5rem] text-petrol-300">{p.no}</span>
                <h3 className="h-title mt-3 text-[1.05rem] text-white">{p.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-white/65">{p.body}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col justify-center rounded-[14px] bg-petrol p-6 text-center">
            <p className="eyebrow text-white/60">{bridge.to.label}</p>
            <p className="h-title mt-3 text-[1.1rem] text-white">{bridge.to.title}</p>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-white/80">{bridge.to.body}</p>
          </div>
        </div>

        {/* Ehrlichkeits-Callout */}
        <div className="mx-auto mt-10 max-w-3xl rounded-[10px] border-l-4 border-petrol bg-white/[0.05] px-7 py-6">
          <h3 className="h-title text-[1.05rem] text-white">{bridge.honesty.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{bridge.honesty.body}</p>
        </div>

        {/* Die Hebel */}
        <div className="mt-20">
          <div className="max-w-2xl">
            <Overline variant="dark">{levers.eyebrow}</Overline>
            <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)] text-white">
              {levers.headline}
            </h2>
            <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-white/60">
              {levers.lede}
            </p>
          </div>

          <div className="mt-10">
            <LeverTabs />
          </div>

          <p className="mt-12 max-w-4xl border-t border-white/10 pt-6 text-[0.76rem] leading-relaxed text-white/35">
            {levers.footnote}
          </p>
        </div>
      </Container>
    </section>
  );
}
