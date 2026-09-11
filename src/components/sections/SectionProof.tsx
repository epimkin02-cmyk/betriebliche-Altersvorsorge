import Image from "next/image";
import Reveal from "../Reveal";
import PressWall from "../blocks/PressWall";
import TestimonialMarquee from "../blocks/TestimonialMarquee";
import { Container, Overline } from "../ui";
import { about, brand, reviews } from "@/content/site";

/**
 * SECTION 2 · Trust & Proof
 * Aufbau nach dem Figma-Wireframe „Landingpage · Freebie-Optin":
 * Fachpresse → Zum Autor → Stimmen. Eine dunkle Flaeche, editorial gesetzt:
 * linksbuendige Ueberschriften, duenne Linien statt Kaesten, eine Akzentfarbe.
 */

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-[#fbbc04]" aria-label="5 von 5 Sternen">
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
    <section
      id="vertrauen"
      className="grid-veil relative scroll-mt-20 overflow-hidden bg-ink text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0c1a1a_0%,#101217_55%,#0a0d11_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_18%_-8%,rgba(21,120,121,0.28),transparent_64%)]"
      />

      <Container className="relative z-10 py-20 sm:py-28">
        {/* ---------------------------------------------------------- Presse */}
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Overline variant="dark" index="01">Fachpresse</Overline>
              <h2 className="h-display max-w-[16ch] text-[clamp(1.8rem,4vw,2.7rem)]">
                Was die Fachpresse über Marius Michael schreibt
              </h2>
            </div>
            <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-white/55 lg:pb-1.5 lg:text-right">
              Vier von zehn redaktionellen Beiträgen, im Ausschnitt.
            </p>
          </div>
          <div className="mt-12">
            <PressWall />
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- Autor */}
        {/* Foto quer ueber die volle Breite (Buero-Aufnahme von der Allianz-
            Vertretungsseite), Name und Rolle im Bild; darunter Text links,
            Zitat und Werte rechts. Auf kleinen Viewports wird das Bild
            hochformatig beschnitten, die Person bleibt rechts im Bild. */}
        <div className="mt-28">
          <Reveal>
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:aspect-[16/9] lg:aspect-[1920/738]">
              <Image
                src="/marius-michael-buero.jpg"
                alt={`${brand.person}, ${brand.role}, in seinem Büro in Frankfurt`}
                fill
                sizes="(min-width: 1280px) 1152px, 100vw"
                className="object-cover object-[72%_center]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,13,17,0.55)_0%,rgba(11,13,17,0.1)_45%,transparent_70%),linear-gradient(180deg,transparent_55%,rgba(11,13,17,0.85)_100%)]"
              />
              <figcaption className="absolute bottom-0 left-0 px-6 pb-6 sm:px-8 sm:pb-7 lg:px-10 lg:pb-8">
                <span className="h-display block text-[1.5rem] text-white sm:text-[1.9rem]">{brand.person}</span>
                <span className="mt-1.5 block text-[0.88rem] text-white/70 sm:text-[0.95rem]">
                  {brand.role} · {brand.company}, Frankfurt am Main
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <Overline variant="dark" index="02">{about.eyebrow}</Overline>
              <h2 className="h-display max-w-[18ch] text-[clamp(1.7rem,3.6vw,2.5rem)]">
                {about.headline}
              </h2>
              <div className="mt-6 space-y-5">
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[58ch] text-[1.02rem] leading-relaxed text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100}>
              {/* Zitat frei gesetzt: grosses Anfuehrungszeichen in Petrol statt Box */}
              <blockquote className="relative max-w-[56ch] pl-10 lg:pt-2">
                <span
                  aria-hidden="true"
                  className="serif absolute -top-1 left-0 text-[3.6rem] leading-none text-petrol-300/80 lg:top-1"
                >
                  “
                </span>
                <p className="serif text-[1.18rem] italic leading-relaxed text-white/85">{about.quote}</p>
              </blockquote>

              {/* Werte als nummerierte Liste mit Trennlinien, nicht als drei Kacheln */}
              <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
                {about.values.map((v, i) => (
                  <li key={v.title} className="grid grid-cols-[2.6rem_1fr] gap-x-3 py-4 sm:grid-cols-[2.6rem_9rem_1fr]">
                    <span className="eyebrow pt-0.5 text-petrol-300">0{i + 1}</span>
                    <span className="h-title text-[0.98rem] text-white">{v.title}</span>
                    <span className="col-start-2 text-[0.9rem] leading-relaxed text-white/55 sm:col-start-3">{v.body}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        {/* --------------------------------------------------------- Stimmen */}
        <div className="mt-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-xl">
                <Overline variant="dark" index="03">Stimmen</Overline>
                {/* Neutral formuliert: die Rezensenten haben ihre Funktion nicht
                    angegeben, „Geschäftsführer" wäre eine unbelegte Zuschreibung. */}
                <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)]">
                  Was Kundinnen und Kunden sagen
                </h2>
              </div>
              {/* Bewertungs-Block: die Zahl traegt, der Rest ordnet ein */}
              <a
                href={reviews.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-5 self-start rounded-[14px] border border-white/10 px-5 py-4 transition-colors hover:border-petrol-300/40 lg:self-end"
              >
                <span className="h-display text-[2.6rem] leading-none text-white">{reviews.rating}</span>
                <span className="flex flex-col gap-1.5">
                  <Stars />
                  <span className="text-[0.82rem] text-white/60">
                    {reviews.count} {reviews.platform}-Bewertungen
                    <span className="text-white/35"> · {reviews.countAll} inkl. eKomi</span>
                  </span>
                  <span className="text-[0.78rem] font-semibold text-petrol-300 underline-offset-4 group-hover:underline">
                    Auf {reviews.platform} nachlesen ↗
                  </span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-12">
              <TestimonialMarquee />
            </div>

            <p className="mt-6 text-[0.76rem] leading-relaxed text-white/35">
              Echte {reviews.platform}-Bewertungen der {brand.company} {brand.person}, im Wortlaut zitiert.
              Stand: September 2026.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
