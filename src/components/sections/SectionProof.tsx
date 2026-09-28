import Image from "next/image";
import Reveal from "../Reveal";
import PressWall from "../blocks/PressWall";
import TestimonialMarquee from "../blocks/TestimonialMarquee";
import { CheckIcon, Container, Label } from "../ui";
import { about, brand, reviews } from "@/content/site";

/**
 * SECTION 2 · Trust & Proof
 * Fachpresse → Zum Autor → Stimmen. Ruhige Blöcke mit viel Luft:
 * Label, Headline, Inhalt. Karten mit feinem Rand, keine Effekte.
 */

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-white" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden="true">
          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function SectionProof() {
  return (
    <section id="vertrauen" className="scroll-mt-16 border-t border-hair bg-ink text-white">
      {/* ------------------------------------------------------------ Presse */}
      <Container className="py-24 sm:py-32">
        <Reveal>
          <div className="mx-auto max-w-[720px] text-center">
            <Label>Fachpresse</Label>
            <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,3rem)]">Was die Fachpresse über Marius Michael schreibt</h2>
            <p className="mt-4 text-[1rem] text-muted">Vier von zehn redaktionellen Beiträgen, im Ausschnitt.</p>
          </div>
          <div className="mt-14">
            <PressWall />
          </div>
        </Reveal>
      </Container>

      {/* ------------------------------------------------------------- Autor */}
      <div className="border-t border-hair">
        <Container className="py-24 sm:py-32">
          <Reveal>
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <figure className="card relative aspect-[4/5] overflow-hidden rounded-[20px] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src="/marius-michael-buero.jpg"
                  alt={`${brand.person}, ${brand.role}, in seinem Büro in Frankfurt`}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover object-[72%_center]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(5,5,5,0.9))] px-6 pb-6 pt-16 sm:px-7">
                  <span className="block text-[1.15rem] font-semibold text-white">{brand.person}</span>
                  <span className="mt-0.5 block text-[0.88rem] text-white/65">{brand.role} · {brand.company}, Frankfurt am Main</span>
                </figcaption>
              </figure>

              <div className="lg:pt-4">
                <Label>{about.eyebrow}</Label>
                <h2 className="h-display mt-5 max-w-[18ch] text-[clamp(1.9rem,3.6vw,2.7rem)]">{about.headline}</h2>
                <div className="mt-6 space-y-4">
                  {about.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)} className="max-w-[58ch] text-[1.02rem] leading-relaxed text-muted">{p}</p>
                  ))}
                </div>
                <blockquote className="card mt-8 max-w-[58ch] p-6">
                  <p className="text-[1rem] leading-relaxed text-white/85">„{about.quote}“</p>
                  <footer className="mt-3 text-[0.82rem] text-faint">{brand.person}</footer>
                </blockquote>
                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {about.values.map((v) => (
                    <li key={v.title}>
                      <span className="flex items-center gap-2 text-[0.95rem] font-semibold text-white">
                        <CheckIcon className="h-4 w-4 text-mint" />
                        {v.title}
                      </span>
                      <span className="mt-1.5 block text-[0.86rem] leading-relaxed text-muted">{v.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* ----------------------------------------------------------- Stimmen */}
      <div className="border-t border-hair">
        <Container className="py-24 sm:py-32">
          <Reveal>
            <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
              <Label>Stimmen</Label>
              {/* Neutral formuliert: die Rezensenten haben ihre Funktion nicht
                  angegeben, „Geschäftsführer" wäre eine unbelegte Zuschreibung. */}
              <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,3rem)]">Was Kundinnen und Kunden sagen</h2>
              <a
                href={reviews.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group mt-6 inline-flex items-center gap-4 rounded-full border border-hair px-5 py-3 transition-colors hover:border-hair-2"
              >
                <span className="h-display text-[1.6rem] leading-none text-white">{reviews.rating}</span>
                <Stars className="h-3.5 w-3.5" />
                <span className="text-[0.84rem] text-muted">
                  {reviews.count} {reviews.platform}-Bewertungen · {reviews.countAll} inkl. eKomi
                </span>
              </a>
            </div>
          </Reveal>
        </Container>
        <Reveal>
          <TestimonialMarquee />
          <Container className="pb-24 pt-6 sm:pb-32">
            <p className="text-center text-[0.78rem] text-faint">
              Echte {reviews.platform}-Bewertungen der {brand.company} {brand.person}, im Wortlaut zitiert. Stand: September 2026.
            </p>
          </Container>
        </Reveal>
      </div>
    </section>
  );
}
