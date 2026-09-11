import Image from "next/image";
import type { CSSProperties } from "react";
import FreebieMockup from "../FreebieMockup";
import HeroVideo from "../HeroVideo";
import CountUp from "../CountUp";
import QuizTrigger from "../QuizTrigger";
import { CheckIcon, Container } from "../ui";
import { cta, hero, outlets, proof } from "@/content/site";


/** Verzögerung als CSS-Variable, gelesen von .wd / .rv / .plate-rv in globals.css. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Zerlegt einen Satz in Wörter, jedes mit eigener Verzögerung – so kommt die
 * Headline Wort für Wort aus der Unschärfe, statt als Block einzublenden.
 */
function Words({ text, start, step = 55 }: { text: string; start: number; step?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="wd" style={delay(start + i * step)}>
            {word}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

/**
 * SECTION 1 · Hero
 * Vollbild-Foto der Frankfurter Skyline (auf Desktop als Cinemagraph-Loop)
 * mit dunklem Scrim von links, damit die
 * Copy auf ruhigem Grund steht und das Bild rechts hinter dem Buch durchkommt.
 * Darüber ein Punktraster, das nach außen ausläuft. Headline, Copy, Button und
 * die Produktbox steigen gestaffelt auf – Reihenfolge über --d.
 */
export default function SectionHero() {
  return (
    <section id="start" className="relative isolate overflow-hidden bg-ink pt-[68px] text-white">
      {/* Foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-30">
        <Image
          src="/hero-frankfurt.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_45%] saturate-[1.05]"
        />
        {/* Cinemagraph (8 s Loop, stumm) ueber dem Foto; ab md und ohne
            reduced-motion. Das JPG bleibt Poster und Fallback. */}
        <HeroVideo src="/hero-frankfurt.mp4" poster="/hero-frankfurt.jpg" />
      </div>

      {/* Scrim: links dicht, rechts lässt er das Foto durch; oben und unten Vignette,
          unten links ein Petrol-Schein als Gegenstück zum warmen Licht des Vorbilds. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(45%_55%_at_12%_88%,rgba(21,120,121,0.28)_0%,rgba(21,120,121,0)_70%),linear-gradient(90deg,rgba(11,13,17,0.97)_0%,rgba(11,13,17,0.9)_34%,rgba(11,13,17,0.5)_58%,rgba(11,13,17,0.18)_100%),linear-gradient(180deg,rgba(11,13,17,0.75)_0%,rgba(11,13,17,0)_22%,rgba(11,13,17,0)_70%,rgba(11,13,17,0.85)_100%)]"
      />
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 -z-10" />

      <Container className="relative z-10 grid items-center gap-16 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-24 lg:pt-10">
        <div>
          <div className="rv" style={delay(200)}>
            <span className="pill pill--dark">
              <span className="pill__sep" aria-hidden="true" />
              {hero.eyebrow}
            </span>
          </div>

          <h1
            className="h-display mt-7 max-w-[18ch] text-[clamp(1.95rem,4.2vw,2.9rem)] lg:max-w-none"
            aria-label={`${hero.headline[0]} ${hero.headline[1]}`}
          >
            <span className="block text-white">
              <Words text={hero.headline[0]} start={300} />
            </span>
            {/* Akzentzeile mit Glanz: als Ganzes aufsteigend, nicht Wort fuer Wort,
                weil der Verlauf auf den Text geclippt wird (siehe .shine). */}
            <span className="serif shine rv block italic text-petrol-300" style={delay(640)}>
              {hero.headline[1]}
            </span>
          </h1>

          {/* Nav-Anker „Das Problem": der Kicker benennt es. */}
          <p
            id="problem"
            className="h-display mt-5 max-w-[22ch] scroll-mt-28 text-[clamp(1.4rem,2.9vw,2rem)] text-white/90 lg:max-w-[24ch]"
            aria-label={hero.headlineKicker}
          >
            <Words text={hero.headlineKicker} start={720} step={28} />
          </p>

          <p className="rv mt-6 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-[1.08rem]" style={delay(1080)}>
            {hero.sub}
          </p>

          <ul className="mt-8 space-y-3">
            {hero.bullets.map((b, i) => (
              <li
                key={b}
                className="rv flex items-start gap-3 text-[0.98rem] text-white/85"
                style={delay(1160 + i * 70)}
              >
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-petrol-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Ein einziger CTA, wie im Wireframe – er oeffnet das Quiz-Popup. */}
          <div className="rv mt-9" style={delay(1400)}>
            <QuizTrigger>{cta.primary}</QuizTrigger>
          </div>

          <p className="rv mt-4 text-[0.85rem] text-white/45" style={delay(1500)}>
            {cta.reassurance}
          </p>
        </div>

        {/* Buch-Mockup – steigt als Ganzes auf, danach ruhig */}
        <div className="plate-rv" style={delay(520)}>
          <FreebieMockup />
        </div>
      </Container>

      {/* Proof-Band: vier Kennzahlen in einer Leiste, grosse Ziffern, Suffix
          in der Akzentschrift, Hairlines statt Kaesten. 21 und 77,8 zaehlen
          beim ersten Sichtkontakt hoch (CountUp), IHK und < 60 stehen. */}
      <div className="relative z-10 border-t border-white/10 bg-ink/50 backdrop-blur-[2px]">
        <Container className="py-8 sm:py-10">
          <dl className="spot relative grid overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(255,255,255,0.055)_0%,rgba(255,255,255,0.015)_100%)] ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(134,185,186,0.8)_30%,rgba(134,185,186,0.8)_70%,transparent)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-[12%] h-56 w-[40%] rounded-full bg-petrol/25 blur-3xl"
            />
            {proof.map((p, i) => (
              <div
                key={p.label}
                className={`relative flex flex-col px-7 py-7 sm:px-8 sm:py-9 lg:px-9 lg:py-10 ${
                  i > 0 ? "border-t border-white/10 lg:border-l lg:border-t-0" : ""
                } ${i % 2 === 1 ? "sm:border-l" : ""} ${i < 2 ? "sm:border-t-0" : ""}`}
              >
                <dd className="flex items-baseline gap-2">
                  <span className="h-display text-[2.7rem] leading-none tracking-[-0.03em] text-white sm:text-[3.1rem]">
                    <CountUp value={p.value} />
                  </span>
                  {p.suffix && (
                    <span className="serif text-[1.35rem] italic text-petrol-300 sm:text-[1.55rem]">{p.suffix.trim()}</span>
                  )}
                </dd>
                <dt className="mt-3 max-w-[20ch] text-[0.84rem] leading-snug text-white/55">{p.label}</dt>
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-9 h-9 w-[3px] rounded-r bg-[linear-gradient(180deg,#86B9BA,#157879)] lg:top-11"
                />
              </div>
            ))}
          </dl>
        </Container>
      </div>

      {/* „Bekannt aus" – echte Wortmarken der Verlage, einfarbig weiss, eine
          Reihe. Der Pressespiegel mit den Artikel-Screenshots steht in
          SectionProof. */}
      <div className="relative z-10 border-t border-white/10 bg-black/40">
        <Container className="flex flex-col items-center gap-5 py-7 lg:flex-row lg:gap-10">
          <p className="eyebrow shrink-0 text-white/35">Bekannt aus</p>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-5 lg:flex-nowrap lg:justify-between lg:gap-x-6">
            {outlets.map((o) => (
              <li
                key={o.name}
                className="flex shrink-0 items-center opacity-55 transition-opacity duration-300 hover:opacity-100"
                title={o.name}
              >
                {"logo" in o ? (
                  <Image
                    src={o.logo}
                    alt={o.name}
                    width={o.width}
                    height={o.height}
                    className="w-auto"
                    style={{ height: `${Math.round(20 * o.scale)}px` }}
                  />
                ) : (
                  <span className="font-[family-name:var(--font-head)] text-[0.9rem] font-black uppercase tracking-[0.02em] text-white">
                    {o.wordmark}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
