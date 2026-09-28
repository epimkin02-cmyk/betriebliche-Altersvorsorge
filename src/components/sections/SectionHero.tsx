import Image from "next/image";
import type { CSSProperties } from "react";
import CountUp from "../CountUp";
import HeroVideo from "../HeroVideo";
import QuizTrigger from "../QuizTrigger";
import { CheckIcon, Container, Label } from "../ui";
import { cta, hero, outlets, proof } from "@/content/site";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * SECTION 1 · Hero
 * Zentrierte Copy, darunter ein grosses Medienfeld mit dem Ratgeber auf
 * ruhigem Grund (die Frankfurter Skyline sehr dunkel dahinter). Dann die
 * vier Kennzahlen und die Logos. Alles steigt kurz und leise auf.
 */
export default function SectionHero() {
  return (
    <section id="start" className="relative bg-ink pt-[68px] text-white">
      <Container className="pb-8 pt-16 sm:pt-24">
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <p className="rv" style={delay(0)}>
            <Label>{hero.eyebrow}</Label>
          </p>
          <h1 className="h-display rv mt-6 text-[clamp(2.4rem,5.6vw,4.4rem)] text-white" style={delay(80)}>
            {hero.headline[0]}{" "}
            <span className="whitespace-nowrap text-mint">{hero.headline[1]}</span>
          </h1>
          <p id="problem" className="rv mt-6 max-w-[40ch] scroll-mt-28 text-[clamp(1.05rem,1.6vw,1.3rem)] font-medium leading-snug text-white/80" style={delay(160)}>
            {hero.headlineKicker}
          </p>
          <p className="rv mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-muted" style={delay(220)}>
            {hero.sub}
          </p>
          <div className="rv mt-9 flex flex-col items-center gap-3" style={delay(300)}>
            <QuizTrigger>{cta.primary}</QuizTrigger>
            <p className="text-[0.82rem] text-faint">{cta.reassurance}</p>
          </div>
          <ul className="rv mt-8 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-7" style={delay(380)}>
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-left text-[0.9rem] text-white/75">
                <CheckIcon className="h-4.5 w-4.5 shrink-0 text-mint" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Medienfeld */}
        <div className="rv mt-14 sm:mt-20" style={delay(460)}>
          <div className="card relative overflow-hidden rounded-[20px] sm:rounded-[24px]">
            <div aria-hidden="true" className="absolute inset-0 opacity-[0.22] grayscale">
              <Image src="/hero-frankfurt.jpg" alt="" fill priority sizes="1200px" className="object-cover object-[70%_45%]" />
              <HeroVideo src="/hero-frankfurt.mp4" poster="/hero-frankfurt.jpg" />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.75)_100%)]" />
            <div className="relative flex items-center justify-center px-6 pb-4 pt-10 sm:px-12 sm:pt-16 lg:pt-20">
              <Image
                src="/ratgeber-stapel-3.png"
                alt="Der Ratgeber „Die 3 GGF-Hebel“ als Buch, ein Exemplar an einen Stapel gelehnt"
                width={1200}
                height={927}
                priority
                sizes="(min-width: 1024px) 720px, 90vw"
                className="h-auto w-full max-w-[720px] drop-shadow-[0_40px_60px_rgba(0,0,0,0.7)]"
              />
            </div>
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-4 sm:px-8">
              <span className="text-[0.84rem] text-white/70">{hero.mockupMeta}</span>
              <span className="text-[0.84rem] text-white/45">{cta.reassuranceShort}</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Kennzahlen */}
      <Container className="pt-10 sm:pt-16">
        <dl className="grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((p, i) => (
            <div key={p.label} className={`px-1 lg:px-8 ${i > 0 ? "lg:border-l lg:border-hair" : ""} ${i === 0 ? "lg:pl-0" : ""}`}>
              <dd className="h-display flex items-baseline gap-1.5 text-[2.6rem] leading-none text-white sm:text-[3rem]">
                <CountUp value={p.value} />
                {p.suffix && <span className="text-[1.3rem] font-medium tracking-normal text-mint sm:text-[1.5rem]">{p.suffix.trim()}</span>}
              </dd>
              <dt className="mt-3 max-w-[22ch] text-[0.9rem] leading-snug text-muted">{p.label}</dt>
            </div>
          ))}
        </dl>
      </Container>

      {/* Bekannt aus */}
      <Container className="pb-24 pt-16 sm:pb-32 sm:pt-20">
        <p className="text-center text-[0.82rem] text-faint">Bekannt aus</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {outlets.map((o) => (
            <li key={o.name} className="flex shrink-0 items-center opacity-45 transition-opacity duration-300 hover:opacity-90" title={o.name}>
              {"logo" in o ? (
                <Image src={o.logo} alt={o.name} width={o.width} height={o.height} className="w-auto" style={{ height: `${Math.round(18 * o.scale)}px` }} />
              ) : (
                <span className="text-[0.82rem] font-bold uppercase tracking-[0.02em] text-white">{o.wordmark}</span>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
