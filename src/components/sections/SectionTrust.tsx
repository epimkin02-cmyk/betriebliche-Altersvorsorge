import Link from "next/link";
import Reveal from "../Reveal";
import FaqList from "../blocks/FaqList";
import TestimonialSlider from "../blocks/TestimonialSlider";
import { ArrowIcon, CheckIcon, Container, Overline } from "../ui";
import { about, brand, cta, difference, faq, finalCta, freebie, steps } from "@/content/site";

/**
 * SECTION 4 · Vertrauen & Abschluss (weicher Grund)
 * Abgrenzung, Berater, Stimmen, FAQ, Ablauf und der finale Call-to-Action –
 * bewusst auf einer Fläche, damit die Seite vier Blöcke bleibt.
 */
export default function SectionTrust() {
  return (
    <section id="vertrauen" className="scroll-mt-20 bg-soft py-20 sm:py-28">
      <Container>
        {/* Abgrenzung */}
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Overline>{difference.eyebrow}</Overline>
            </div>
            <h2 className="h-display text-[clamp(1.9rem,4.2vw,2.9rem)]">{difference.headline}</h2>
            <p className="mx-auto mt-4 max-w-[48ch] text-[1rem] leading-relaxed text-ink/65">
              {difference.lede}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 overflow-hidden rounded-[14px] border border-line bg-white">
            <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] border-b border-line bg-soft md:grid">
              <div className="px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-graybrand">
                Kriterium
              </div>
              <div className="px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-graybrand">
                Viele Anbieter am Markt
              </div>
              <div className="bg-petrol-50 px-6 py-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-petrol-700">
                Führungsvorsorge
              </div>
            </div>

            {difference.rows.map((r) => (
              <div
                key={r.topic}
                className="grid border-b border-line last:border-b-0 md:grid-cols-[1fr_1.3fr_1.3fr]"
              >
                <div className="px-6 pt-5 pb-2 md:py-5">
                  <span className="h-title text-[0.98rem]">{r.topic}</span>
                </div>
                <div className="flex items-start gap-3 px-6 pb-3 md:py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5 text-[0.72rem] font-bold text-ink/40"
                  >
                    ✕
                  </span>
                  <span className="text-[0.92rem] leading-relaxed text-ink/55">{r.others}</span>
                </div>
                <div className="flex items-start gap-3 bg-petrol-50 px-6 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-petrol text-[0.72rem] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span className="text-[0.92rem] font-medium leading-relaxed text-petrol-800">
                    {r.us}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Berater */}
        <div className="mt-24 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            {/* TODO · MARIUS: Porträtfoto einsetzen (public/marius.jpg) und diesen
                Platzhalter durch <Image /> ersetzen. Briefing: ruhiger Hintergrund,
                Petrol-Akzent, Augenhöhe statt Verkäufer-Pose. */}
            <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-[14px] border border-dashed border-line-strong bg-white p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-petrol-100">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-petrol" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    d="M4.6 20c1.2-3.6 4-5.4 7.4-5.4S18.2 16.4 19.4 20"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="h-title mt-5 text-[1rem] text-ink/70">Platzhalter · Porträt</p>
              <p className="mt-2 max-w-[26ch] text-[0.85rem] leading-relaxed text-graybrand">
                Souveränes Porträt von Marius Michael – ruhiger Hintergrund, Petrol-Akzent,
                Augenhöhe statt Verkäufer-Pose.
              </p>
            </div>
            <div className="mt-4 rounded-[14px] border border-line bg-white px-6 py-5">
              <p className="text-[0.85rem] font-semibold text-ink">{brand.person}</p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink/60">
                {brand.role} · {brand.company}, Frankfurt a. M.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <Overline>{about.eyebrow}</Overline>
            <h2 className="h-display max-w-[16ch] text-[clamp(1.7rem,3.6vw,2.5rem)]">
              {about.headline}
            </h2>

            <div className="mt-6 space-y-5">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[58ch] text-[1.02rem] leading-relaxed text-ink/70">
                  {p}
                </p>
              ))}
            </div>

            <blockquote className="mt-8 border-l-4 border-petrol bg-white px-6 py-5">
              <p className="serif text-[1.02rem] leading-relaxed text-ink/85">{about.quote}</p>
            </blockquote>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {about.values.map((v) => (
                <div key={v.title} className="rounded-[14px] border border-line bg-white p-5">
                  <h3 className="h-title text-[0.98rem] text-petrol-700">{v.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink/60">{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Stimmen */}
        <div className="mt-24">
          <Reveal>
            <div className="max-w-xl">
              <Overline>Stimmen</Overline>
              <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)]">
                Was Geschäftsführer danach sagen
              </h2>
              <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink/60">
                77,8 % Weiterempfehlungsquote – hier sprechen die Menschen dahinter.
              </p>
            </div>
          </Reveal>
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <Overline>Klartext</Overline>
            <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)]">
              Die Fragen, die du dir gerade stellst
            </h2>
            <p className="mt-5 max-w-[40ch] text-[1rem] leading-relaxed text-ink/60">
              Auch die unbequemen. Wenn eine Antwort fehlt, ruf einfach an:{" "}
              <a className="font-medium text-petrol" href={brand.phoneHref}>
                {brand.phone}
              </a>
            </p>
            <p className="mt-6 text-[0.82rem] text-graybrand">{faq.length} Antworten</p>
          </Reveal>
          <Reveal delay={100}>
            <FaqList />
          </Reveal>
        </div>

        {/* Finaler CTA als Karte – kein eigener Farbblock, damit es vier Sections bleiben */}
        <Reveal delay={60}>
          <div className="grid-veil relative mt-24 overflow-hidden rounded-[18px] bg-ink px-7 py-14 text-white sm:px-12 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_50%_-15%,rgba(21,120,121,0.55),transparent_62%)]"
            />
            <div className="relative z-10">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="h-display mx-auto max-w-[20ch] text-[clamp(1.8rem,4vw,2.8rem)]">
                  {finalCta.headline}
                </h2>
                <p className="mx-auto mt-5 max-w-[52ch] text-[1.02rem] leading-relaxed text-white/65">
                  {finalCta.sub}
                </p>
              </div>

              <ol className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
                {steps.items.map((s) => (
                  <li key={s.no} className="rounded-[12px] border border-white/12 bg-white/[0.05] p-5">
                    <span className="h-display text-[1.25rem] text-petrol-300">{s.no}</span>
                    <h3 className="h-title mt-2 text-[0.98rem] text-white">{s.title}</h3>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-white/60">{s.body}</p>
                  </li>
                ))}
              </ol>

              <div className="mx-auto mt-8 max-w-3xl rounded-[12px] border border-petrol/45 bg-petrol/12 p-6">
                <p className="eyebrow text-petrol-300">{freebie.eyebrow}</p>
                <h3 className="h-title mt-2 text-[1.05rem] text-white">{freebie.title}</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {freebie.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[0.88rem] text-white/70">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-petrol-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col items-center gap-3">
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-petrol px-8 py-4 text-[1.05rem] font-semibold text-white shadow-[0_16px_44px_rgba(21,120,121,0.5)] transition-all hover:-translate-y-0.5 hover:bg-petrol-600"
                >
                  {cta.primary}
                  <ArrowIcon />
                </Link>
                <p className="text-[0.85rem] text-white/45">{cta.reassurance}</p>
              </div>

              <p className="serif mx-auto mt-12 max-w-[48ch] text-center text-[0.98rem] italic leading-relaxed text-petrol-200">
                {finalCta.ps}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
