import Image from "next/image";
import Reveal from "../Reveal";
import PressWall from "../blocks/PressWall";
import { Container, Overline } from "../ui";
import { about, brand, reviews, testimonials } from "@/content/site";

/**
 * SECTION 2 · Trust & Proof
 * Aufbau nach dem Figma-Wireframe „Landingpage · Freebie-Optin":
 * Fachpresse → Zum Autor → Stimmen. Alles auf einer dunklen Fläche.
 */

/** Initialen für den Avatar-Kreis, z. B. „Helmut Weidmann" → „HW". */
function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
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
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Overline variant="dark">Bekannt aus der Fachpresse</Overline>
            </div>
            <h2 className="h-display text-[clamp(1.8rem,4vw,2.7rem)]">Was die Fachpresse schreibt</h2>
          </div>
          <div className="mt-12">
            <PressWall />
          </div>
        </Reveal>

        {/* ----------------------------------------------------------- Autor */}
        <div className="mt-28 grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,#12302f_0%,#0f1a1c_55%,#0b0d11_100%)] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
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
            </div>
            <div className="mt-4 rounded-[14px] bg-white/[0.04] px-6 py-5 ring-1 ring-white/10">
              <p className="text-[0.9rem] font-semibold text-white">{brand.person}</p>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-white/55">
                {brand.role} · {brand.company}, Frankfurt a. M.
              </p>
            </div>
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

            <blockquote className="mt-8 rounded-r-[12px] border-l-[3px] border-petrol bg-white/[0.04] px-6 py-5">
              <p className="serif text-[1.02rem] leading-relaxed text-white/85">{about.quote}</p>
            </blockquote>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {about.values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] p-5 ring-1 ring-white/10"
                >
                  <h3 className="h-title text-[0.98rem] text-petrol-300">{v.title}</h3>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-white/60">{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* --------------------------------------------------------- Stimmen */}
        <div className="mt-28">
          <Reveal>
            <div className="max-w-xl">
              <Overline variant="dark">Stimmen</Overline>
              {/* Neutral formuliert: die Rezensenten haben ihre Funktion nicht
                  angegeben, „Geschäftsführer" wäre eine unbelegte Zuschreibung. */}
              <h2 className="h-display text-[clamp(1.7rem,3.6vw,2.5rem)]">
                Was Kundinnen und Kunden sagen
              </h2>
              <p className="mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-white/60">
                {reviews.rating} von 5 bei {reviews.count} {reviews.platform}-Bewertungen. Nachlesbar,
                nicht behauptet.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {featured.map((t) => (
                <li key={t.name}>
                  <figure className="flex h-full flex-col rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] p-7 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                    <div className="flex gap-0.5 text-[#fbbc04]" aria-label="5 von 5 Sternen">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                          <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="serif mt-5 flex-1 text-[0.95rem] leading-relaxed text-white/75">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol/25 text-[0.82rem] font-bold text-petrol-300 ring-1 ring-petrol-300/30">
                        {initials(t.name)}
                      </span>
                      <span>
                        <span className="block text-[0.9rem] font-semibold text-white">{t.name}</span>
                        <span className="block text-[0.8rem] text-white/45">
                          {reviews.platform}-Bewertung · {t.date}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[0.8rem] leading-relaxed text-white/45">
              Echte {reviews.platform}-Bewertungen der {brand.company} {brand.person}, im Wortlaut
              zitiert.{" "}
              <a
                href={reviews.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-petrol-300 underline-offset-4 hover:underline"
              >
                {reviews.note}
              </a>
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
