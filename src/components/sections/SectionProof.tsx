import Image from "next/image";
import Reveal from "../Reveal";
import PressWall from "../blocks/PressWall";
import SectionHead from "../blocks/SectionHead";
import TestimonialMarquee from "../blocks/TestimonialMarquee";
import { Container, Cross, Tag } from "../ui";
import { about, brand, reviews } from "@/content/site";

/**
 * SECTION 2 · Trust & Proof
 * Fachpresse → Zum Autor → Stimmen, alles im Raster: jede Gruppe beginnt
 * mit einer Kopfzeile (Laufnummer, Label, Headline), darunter Zellen mit
 * Hairlines. Keine Glasflaechen, keine Farbverlaeufe.
 */

function Stars({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-mint" aria-label="5 von 5 Sternen">
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
    <section id="vertrauen" className="atmo atmo--soft relative scroll-mt-16 py-4 text-white">
      <Container frame className="space-y-4">
        {/* ---------------------------------------------------------- Presse */}
        <Reveal className="overflow-hidden rounded-[12px] border border-white/12">
          <SectionHead
            n="01"
            tag="Fachpresse"
            headline="Was die Fachpresse über Marius Michael schreibt"
            aside="Vier von zehn redaktionellen Beiträgen, im Ausschnitt."
          />
          <PressWall />
        </Reveal>

        {/* ----------------------------------------------------------- Autor */}
        <Reveal className="overflow-hidden rounded-[12px] border border-white/12">
          <SectionHead n="02" tag={about.eyebrow} headline={about.headline} />

          <figure className="relative aspect-[4/5] w-full overflow-hidden border-b border-hair sm:aspect-[16/9] lg:aspect-[1920/760]">
            <Image
              src="/marius-michael-buero.jpg"
              alt={`${brand.person}, ${brand.role}, in seinem Büro in Frankfurt`}
              fill
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="object-cover object-[72%_center]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.55)_0%,rgba(10,10,11,0.05)_45%,transparent_70%),linear-gradient(180deg,transparent_60%,rgba(10,10,11,0.9)_100%)]"
            />
            <figcaption className="glass absolute bottom-5 left-5 flex flex-col gap-1 rounded-[10px] px-5 py-5 sm:bottom-8 sm:left-8 sm:px-7 sm:py-6">
              <Tag mint>{brand.company}, Frankfurt am Main</Tag>
              <span className="h-display mt-2 block text-[1.6rem] text-white sm:text-[2rem]">{brand.person}</span>
              <span className="block text-[0.86rem] text-white/60 sm:text-[0.92rem]">{brand.role}</span>
            </figcaption>
            <Cross at="tr" />
          </figure>

          <div className="grid border-b border-hair lg:grid-cols-2">
            <div className="px-5 py-8 sm:px-8 lg:border-r lg:border-hair lg:py-12">
              <div className="space-y-5">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[58ch] text-[1.02rem] leading-relaxed text-white/72">
                    {p}
                  </p>
                ))}
              </div>
              <blockquote className="relative mt-10 border-l-2 border-mint pl-6">
                <p className="serif text-[1.22rem] italic leading-relaxed text-white/88">{about.quote}</p>
                <footer className="mt-4">
                  <Tag>{brand.person}</Tag>
                </footer>
              </blockquote>
            </div>

            {/* Werte als drei Zellen untereinander, grosse Laufnummer links */}
            <ol className="flex flex-col divide-y divide-hair border-t border-hair lg:border-t-0">
              {about.values.map((v, i) => (
                <li key={v.title} className="glass glass--deep spot relative grid flex-1 grid-cols-[4.5rem_1fr] items-center gap-x-4 border-0 px-5 py-7 sm:px-8">
                  <span className="mono text-[2rem] leading-none tracking-[-0.04em] text-mint/80">0{i + 1}</span>
                  <span>
                    <span className="h-title block text-[1.1rem] text-white">{v.title}</span>
                    <span className="mt-1 block max-w-[40ch] text-[0.9rem] leading-relaxed text-white/55">{v.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* --------------------------------------------------------- Stimmen */}
        <Reveal className="overflow-hidden rounded-[12px] border border-white/12">
          {/* Neutral formuliert: die Rezensenten haben ihre Funktion nicht
              angegeben, „Geschäftsführer" wäre eine unbelegte Zuschreibung. */}
          <SectionHead
            n="03"
            tag="Stimmen"
            headline="Was Kundinnen und Kunden sagen"
            aside={
              <a
                href={reviews.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-5 text-white"
              >
                <span className="h-display text-[3rem] leading-none text-white">{reviews.rating}</span>
                <span className="flex flex-col gap-1.5">
                  <Stars />
                  <span className="text-[0.8rem] text-white/60">
                    {reviews.count} {reviews.platform}-Bewertungen
                    <span className="text-white/35"> · {reviews.countAll} inkl. eKomi</span>
                  </span>
                  <span className="mono text-[0.68rem] uppercase tracking-[0.1em] text-mint underline-offset-4 group-hover:underline">
                    Auf {reviews.platform} nachlesen ↗
                  </span>
                </span>
              </a>
            }
          />
          <TestimonialMarquee />
          <p className="border-t border-hair px-5 py-5 text-[0.74rem] leading-relaxed text-white/35 sm:px-8">
            Echte {reviews.platform}-Bewertungen der {brand.company} {brand.person}, im Wortlaut zitiert. Stand: September 2026.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
