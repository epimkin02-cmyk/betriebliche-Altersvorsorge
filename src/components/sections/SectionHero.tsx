import Image from "next/image";
import type { CSSProperties } from "react";
import FreebieMockup from "../FreebieMockup";
import HeroVideo from "../HeroVideo";
import CountUp from "../CountUp";
import QuizTrigger from "../QuizTrigger";
import { Container, Cross, Tag } from "../ui";
import { cta, hero, outlets, proof } from "@/content/site";

/** Verzögerung als CSS-Variable, gelesen von .wd / .rv / .plate-rv in globals.css. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Headline Wort für Wort aus der Unschärfe, jedes Wort mit eigener Verzögerung. */
function Words({ text, start, step = 50 }: { text: string; start: number; step?: number }) {
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

/* Die Meta-Zeile des Mockups („18 Seiten · PDF · kostenfrei · Ausgabe 2026“)
   wird in ihre vier Teile zerlegt und an die Ecken der Objekt-Zelle gesetzt. */
const metaTags = hero.mockupMeta.split(" · ");
const corner = ["left-5 top-5 sm:left-7 sm:top-7", "right-5 top-5 sm:right-7 sm:top-7", "bottom-5 left-5 sm:bottom-7 sm:left-7", "bottom-5 right-5 sm:bottom-7 sm:right-7"];

/**
 * SECTION 1 · Hero
 * Zwei Zellen auf den Raster-Schienen: links die Copy, rechts das Buch auf
 * dem Spotlight, dahinter die Frankfurter Skyline als stark abgedunkelter
 * Schwarzweiss-Loop. Darunter die Kennzahlen als vier Zellen und die
 * „Bekannt aus“-Leiste. Headline, Copy und Button steigen gestaffelt auf.
 */
export default function SectionHero() {
  return (
    <section id="start" className="relative bg-ink pt-[68px] text-white">
      <Container frame>
        <div className="mesh mesh--right relative grid lg:grid-cols-12">
          {/* ------------------------------------------------------ Copy */}
          <div className="relative px-5 pb-12 pt-16 sm:px-8 lg:col-span-6 lg:py-24 lg:pr-12">
            <p className="rv" style={delay(150)}>
              <Tag mint>{hero.eyebrow}</Tag>
            </p>

            <h1
              className="h-display mt-8 text-[clamp(2.3rem,4.7vw,3.6rem)] text-white"
              aria-label={`${hero.headline[0]} ${hero.headline[1]}`}
            >
              <Words text={hero.headline[0]} start={260} />
              <span className="serif rv block italic text-mint" style={delay(720)}>
                {hero.headline[1]}
              </span>
            </h1>

            {/* Nav-Anker „Das Problem": der Kicker benennt es. */}
            <p
              id="problem"
              className="h-title mt-7 max-w-[30ch] scroll-mt-28 text-[clamp(1.15rem,1.9vw,1.45rem)] font-medium text-white/85"
              aria-label={hero.headlineKicker}
            >
              <Words text={hero.headlineKicker} start={820} step={26} />
            </p>

            <p className="rv mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-white/58 sm:text-[1.05rem]" style={delay(1120)}>
              {hero.sub}
            </p>

            {/* Nutzen als drei Zeilen mit Laufnummer und Hairlines */}
            <ol className="rv mt-9 border-t border-hair" style={delay(1220)}>
              {hero.bullets.map((b, i) => (
                <li key={b} className="grid grid-cols-[2.4rem_1fr] items-baseline gap-x-2 border-b border-hair py-3.5 text-[0.95rem] text-white/85">
                  <span className="mono text-[0.68rem] text-mint">0{i + 1}</span>
                  <span>{b}</span>
                </li>
              ))}
            </ol>

            <div className="rv mt-9" style={delay(1420)}>
              <QuizTrigger>{cta.primary}</QuizTrigger>
              <p className="mono mt-4 text-[0.64rem] uppercase tracking-[0.1em] text-white/45">{cta.reassurance}</p>
            </div>
          </div>

          {/* ---------------------------------------------------- Objekt */}
          <div className="relative overflow-hidden border-t border-hair lg:col-span-6 lg:border-l lg:border-t-0">
            {/* Skyline als abgedunkelter Schwarzweiss-Loop, nach links und unten ausgeblendet */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.32] grayscale [mask-image:linear-gradient(180deg,#000_30%,transparent_95%),linear-gradient(90deg,transparent,#000_30%)] [mask-composite:intersect] [-webkit-mask-composite:source-in]"
            >
              <Image src="/hero-frankfurt.jpg" alt="" fill priority sizes="50vw" className="object-cover object-[70%_45%]" />
              <HeroVideo src="/hero-frankfurt.mp4" poster="/hero-frankfurt.jpg" />
            </div>

            <div className="plate-rv relative flex min-h-[420px] items-center justify-center px-8 py-16 sm:min-h-[520px] sm:px-14 lg:h-full lg:min-h-0 lg:px-12 lg:py-20" style={delay(480)}>
              <FreebieMockup className="w-full max-w-[560px]" />
            </div>

            {metaTags.map((t, i) => (
              <span key={t} className={`rv absolute ${corner[i]}`} style={delay(1500 + i * 90)}>
                <Tag>{t}</Tag>
              </span>
            ))}
            <Cross at="tl" />
            <Cross at="bl" />
          </div>
        </div>

        {/* ------------------------------------------------- Kennzahlen */}
        <dl className="grid border-t border-hair sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((p, i) => (
            <div
              key={p.label}
              className={`spot relative px-5 py-7 sm:px-8 sm:py-8 ${
                i > 0 ? "border-t border-hair sm:border-t-0" : ""
              } ${i % 2 === 1 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t" : ""} lg:border-t-0 ${i > 0 ? "lg:border-l" : ""}`}
            >
              <dt className="mono text-[0.64rem] uppercase tracking-[0.12em] text-white/40">0{i + 1}</dt>
              <dd className="mt-4 flex items-baseline gap-2">
                <span className="h-display text-[2.6rem] leading-none text-white sm:text-[3rem]">
                  <CountUp value={p.value} />
                </span>
                {p.suffix && <span className="serif text-[1.3rem] italic text-mint sm:text-[1.5rem]">{p.suffix.trim()}</span>}
              </dd>
              <dd className="mt-2 max-w-[22ch] text-[0.84rem] leading-snug text-white/55">{p.label}</dd>
            </div>
          ))}
        </dl>

        {/* ------------------------------------------------ Bekannt aus */}
        <div className="flex flex-col border-t border-hair lg:flex-row">
          <div className="flex items-center border-b border-hair px-5 py-4 sm:px-8 lg:border-b-0 lg:border-r">
            <Tag>Bekannt aus</Tag>
          </div>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-5 px-5 py-5 sm:px-8 lg:justify-between lg:gap-x-6">
            {outlets.map((o) => (
              <li key={o.name} className="flex shrink-0 items-center opacity-50 transition-opacity duration-300 hover:opacity-100" title={o.name}>
                {"logo" in o ? (
                  <Image src={o.logo} alt={o.name} width={o.width} height={o.height} className="w-auto" style={{ height: `${Math.round(18 * o.scale)}px` }} />
                ) : (
                  <span className="font-[family-name:var(--font-head)] text-[0.84rem] font-bold uppercase tracking-[0.02em] text-white">{o.wordmark}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
