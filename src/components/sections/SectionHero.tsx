import Image from "next/image";
import type { CSSProperties } from "react";
import FreebieMockup from "../FreebieMockup";
import { Badge, CheckIcon, Container, CtaPill } from "../ui";
import { cta, hero, press, pressMentions, pressMeta, proof } from "@/content/site";

/** Verlagsnamen für die schmale „Bekannt aus"-Leiste, ohne Dopplungen. */
const outlets = Array.from(
  new Set<string>([...press.map((p) => p.outlet), ...pressMentions]),
);

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
 * Vollbild-Foto der Frankfurter Skyline mit dunklem Scrim von links, damit die
 * Copy auf ruhigem Grund steht und das Bild rechts hinter der Box durchkommt.
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
      </div>

      {/* Scrim: links dicht, rechts lässt er das Foto durch; oben und unten Vignette,
          unten links ein Petrol-Schein als Gegenstück zum warmen Licht des Vorbilds. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(45%_55%_at_12%_88%,rgba(21,120,121,0.28)_0%,rgba(21,120,121,0)_70%),linear-gradient(90deg,rgba(11,13,17,0.97)_0%,rgba(11,13,17,0.9)_34%,rgba(11,13,17,0.5)_58%,rgba(11,13,17,0.18)_100%),linear-gradient(180deg,rgba(11,13,17,0.75)_0%,rgba(11,13,17,0)_22%,rgba(11,13,17,0)_70%,rgba(11,13,17,0.85)_100%)]"
      />
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0 -z-10" />

      <Container className="relative z-10 grid items-center gap-16 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-24 lg:pt-10">
        <div>
          <div className="rv" style={delay(200)}>
            <Badge variant="dark">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-petrol-300" aria-hidden="true" />
              {hero.eyebrow}
            </Badge>
          </div>

          <h1
            className="h-display mt-7 max-w-[18ch] text-[clamp(1.95rem,4.2vw,2.9rem)] lg:max-w-none"
            aria-label={`${hero.headline[0]} ${hero.headline[1]}`}
          >
            <span className="block text-white">
              <Words text={hero.headline[0]} start={300} />
            </span>
            <span className="serif block italic text-petrol-300">
              <Words text={hero.headline[1]} start={580} />
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

          {/* Ein einziger CTA, wie im Wireframe – er scrollt zum Opt-in-Formular. */}
          <div className="rv mt-9" style={delay(1400)}>
            <CtaPill href={cta.href}>{cta.primary}</CtaPill>
          </div>

          <p className="rv mt-4 text-[0.85rem] text-white/45" style={delay(1500)}>
            {cta.reassurance}
          </p>
        </div>

        {/* Produktbox mit zwei echten Seiten – steigt als Ganzes auf */}
        <div className="plate-rv" style={delay(520)}>
          <p className="mb-8 text-center text-[0.72rem] font-bold uppercase tracking-[0.2em] text-petrol-300 lg:mb-10">
            {hero.mockupLabel}
          </p>
          <FreebieMockup />
        </div>
      </Container>

      {/* Proof-Leiste */}
      <div className="relative z-10 border-t border-white/10 bg-ink/40 backdrop-blur-[2px]">
        {/* Drei Kennzahlen, wie im Wireframe. Der vierte Wert („< 60 Min.")
            steht weiterhin in site.ts und laesst sich jederzeit dazunehmen. */}
        <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-3">
          {proof.slice(0, 3).map((p) => (
            <div key={p.label}>
              <p className="h-display text-[1.6rem] text-white sm:text-[1.9rem]">
                {p.value}
                <span className="text-petrol-300">{p.suffix}</span>
              </p>
              <p className="mt-1 text-[0.78rem] leading-snug text-white/45">{p.label}</p>
            </div>
          ))}
        </Container>
      </div>

      {/* „Bekannt aus" – belegte redaktionelle Erwähnungen, der Pressespiegel
          mit den Artikel-Screenshots steht weiter unten in SectionProof. */}
      <div className="relative z-10 border-t border-white/10 bg-black/40">
        <Container className="flex flex-col items-center gap-4 py-6 lg:flex-row lg:gap-8">
          <p className="eyebrow shrink-0 text-white/35">Bekannt aus</p>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-2 lg:justify-start">
            {outlets.map((name) => (
              <span
                key={name}
                className="font-[family-name:var(--font-head)] text-[0.85rem] font-bold text-white/30"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="shrink-0 text-[0.7rem] text-white/25">{pressMeta.summary}</p>
        </Container>
      </div>
    </section>
  );
}
