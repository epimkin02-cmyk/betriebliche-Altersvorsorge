import Image from "next/image";
import Reveal from "../Reveal";
import PressWall from "../blocks/PressWall";
import { Container, Overline } from "../ui";
import { about, brand, reviews, testimonials } from "@/content/site";

/**
 * SECTION 2 · Trust & Proof
 * Aufbau nach dem Figma-Wireframe „Landingpage · Freebie-Optin":
 * Fachpresse → Zum Autor → Stimmen. Eine dunkle Flaeche, editorial gesetzt:
 * linksbuendige Ueberschriften, duenne Linien statt Kaesten, eine Akzentfarbe.
 */

/** Initialen für den Avatar-Kreis, z. B. „Helmut Weidmann" → „HW". */
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

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

/** Das Wireframe zeigt drei Stimmen nebeneinander. Der Rest liegt in site.ts. */
const featured = testimonials.slice(0, 3);

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
              <Overline variant="dark">Fachpresse</Overline>
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
        <div className="mt-28 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <figure className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,#12302f_0%,#0f1a1c_55%,#0b0d11_100%)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_320px_at_74%_-6%,rgba(21,120,121,0.55),transparent_66%)]"
              />
              <Image
                src="/marius-michael.png"
                alt={`${brand.person}, ${brand.role}`}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-contain object-bottom"
              />
              {/* Name und Rolle liegen im Bild, nicht in einem zweiten Kasten */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(11,13,17,0.92)_60%)] px-6 pb-5 pt-16">
                <span className="h-title block text-[1.05rem] text-white">{brand.person}</span>
                <span className="mt-1 block text-[0.84rem] text-white/60">
                  {brand.role} · {brand.company}, Frankfurt
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <Overline variant="dark">{about.eyebrow}</Overline>
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

            {/* Zitat frei gesetzt: grosses Anfuehrungszeichen in Petrol statt Box */}
            <blockquote className="relative mt-10 max-w-[56ch] pl-10">
              <span
                aria-hidden="true"
                className="serif absolute -top-1 left-0 text-[3.6rem] leading-none text-petrol-300/80"
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

        {/* --------------------------------------------------------- Stimmen */}
        <div className="mt-28">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-xl">
                <Overline variant="dark">Stimmen</Overline>
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
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((t) => (
                <li key={t.name}>
                  <figure className="relative flex h-full flex-col rounded-[16px] bg-white/[0.035] p-7 pt-12 ring-1 ring-white/10 transition-colors duration-300 hover:ring-petrol-300/35">
                    <span
                      aria-hidden="true"
                      className="serif absolute left-6 top-4 text-[3.2rem] leading-none text-petrol-300/50"
                    >
                      “
                    </span>
                    <blockquote className="serif relative flex-1 text-[0.96rem] leading-relaxed text-white/78">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol/25 text-[0.8rem] font-bold text-petrol-300 ring-1 ring-petrol-300/30">
                        {initials(t.name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.9rem] font-semibold text-white">{t.name}</span>
                        <span className="block text-[0.78rem] text-white/45">{t.date}</span>
                      </span>
                      <Stars className="h-3 w-3" />
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

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
