import Image from "next/image";
import type { CSSProperties } from "react";
import CountUp from "../CountUp";
import Parallax from "../Parallax";
import QuizTrigger from "../QuizTrigger";
import { Tag } from "../ui";
import { cta, hero, outlets, proof } from "@/content/site";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Headline Wort für Wort aus der Unschärfe. */
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

const metaTags = hero.mockupMeta.split(" · ");

/* Kreuze an den inneren Knoten des 4x3-Rasters (nur Desktop) */
const crosses = [25, 50, 75].flatMap((x) => [33.333, 66.666].map((y) => ({ x, y })));

/**
 * SECTION 1 · Hero als Bühne
 * Ein 4x3-Kachelraster in einem Rahmen. Links die Copy über drei Reihen,
 * rechts Milchglas-Kacheln mit den drei Nutzen, dazwischen schweben drei
 * Chrom-Münzen, die von den Glaskacheln weich angeschnitten werden. Die
 * Münzen reagieren leicht auf den Zeiger (Parallax), der CTA sitzt als
 * Pille unten rechts. Darunter Kennzahlen und „Bekannt aus“.
 */
export default function SectionHero() {
  return (
    <section id="start" className="atmo relative overflow-hidden pt-[68px] text-white">
      <Parallax className="relative mx-auto w-full max-w-[1280px] px-4 pb-4 pt-4 sm:px-8 sm:pt-6">
        <div
          className="relative grid grid-cols-2 overflow-hidden rounded-[12px] border border-white/15 bg-[rgba(255,255,255,0.015)] lg:min-h-[calc(100svh-130px)] lg:grid-cols-4 lg:grid-rows-3 [background-image:linear-gradient(90deg,rgba(255,255,255,0.11)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.11)_1px,transparent_1px)] [background-size:50%_100%] lg:[background-size:25%_33.34%]"
        >
          {/* Kreuze an den Rasterknoten */}
          {crosses.map((c) => (
            <span
              key={`${c.x}-${c.y}`}
              aria-hidden="true"
              className="cross z-20 hidden lg:block"
              style={{ left: `calc(${c.x}% - 6px)`, top: `calc(${c.y}% - 6px)`, color: "rgba(255,255,255,0.6)" }}
            />
          ))}

          {/* ---------------------------------------------------- Münzen
              Desktop: ueber die ganze Buehne gelegt. Mobil: eigene Zeile
              zwischen Copy und Glaskacheln, damit nichts den Text verdeckt. */}
          <div aria-hidden="true" className="pointer-events-none relative order-2 col-span-2 h-[300px] border-t border-white/10 lg:absolute lg:inset-0 lg:z-10 lg:order-none lg:col-auto lg:h-auto lg:border-0">
            <div className="coin left-[28%] top-[2%] w-[56%] lg:left-[51%] lg:top-[24%] lg:w-[30%]" style={{ "--depth": 14, "--dur": "10s" } as CSSProperties}>
              <Image src="/3d/coin-a.webp" alt="" width={1398} height={1400} priority sizes="(min-width:1024px) 420px, 60vw" className="h-auto w-full" />
            </div>
            <div className="coin left-[-2%] top-[26%] w-[34%] lg:left-[81%] lg:top-[-7%] lg:w-[21%]" style={{ "--depth": 26, "--dur": "12s", "--off": "-3s" } as CSSProperties}>
              <Image src="/3d/coin-b.webp" alt="" width={1400} height={1389} priority sizes="(min-width:1024px) 260px, 40vw" className="h-auto w-full" />
            </div>
            <div className="coin left-[74%] top-[48%] w-[22%] lg:left-[66%] lg:top-[66%] lg:w-[14%]" style={{ "--depth": 34, "--dur": "8s", "--off": "-5s" } as CSSProperties}>
              <Image src="/3d/coin-c.webp" alt="" width={1130} height={1400} sizes="(min-width:1024px) 180px, 30vw" className="h-auto w-full" />
            </div>
          </div>

          {/* ------------------------------------------------------ Copy */}
          <div className="relative z-30 order-1 col-span-2 px-6 py-10 sm:px-10 sm:py-14 lg:order-none lg:col-span-2 lg:row-span-3 lg:px-12 lg:py-16">
            <p className="rv" style={delay(150)}>
              <Tag mint>{hero.eyebrow}</Tag>
            </p>
            <h1 className="h-display mt-7 text-[clamp(2.2rem,4.4vw,3.5rem)] text-white" aria-label={`${hero.headline[0]} ${hero.headline[1]}`}>
              <Words text={hero.headline[0]} start={260} />
              <span className="serif rv block pt-1 text-[1.12em] italic text-mint" style={delay(720)}>
                {hero.headline[1]}
              </span>
            </h1>
            <p id="problem" className="h-title mt-7 max-w-[30ch] scroll-mt-28 text-[clamp(1.1rem,1.7vw,1.35rem)] font-medium text-white/85" aria-label={hero.headlineKicker}>
              <Words text={hero.headlineKicker} start={820} step={26} />
            </p>
            <p className="rv mt-6 max-w-[50ch] text-[1rem] leading-relaxed text-white/60 sm:text-[1.05rem]" style={delay(1120)}>
              {hero.sub}
            </p>
            <div className="rv mt-9 lg:hidden" style={delay(1300)}>
              <QuizTrigger variant="outline">{cta.primary}</QuizTrigger>
              <p className="mono mt-4 text-[0.64rem] uppercase tracking-[0.1em] text-white/45">{cta.reassurance}</p>
            </div>
          </div>

          {/* --------------------------------------------- Glaskacheln */}
          {hero.bullets.map((b, i) => {
            const pos = ["lg:col-start-3 lg:row-start-1", "lg:col-start-4 lg:row-start-2", "lg:col-start-3 lg:row-start-3"][i];
            return (
              <div key={b} className={`relative z-20 order-3 border-t border-white/10 lg:order-none lg:border-0 ${pos} ${i === 2 ? "col-span-2 lg:col-span-1" : ""}`}>
                <div className="glass fd flex h-full min-h-[150px] flex-col justify-between p-5 sm:p-6" style={delay(1250 + i * 160)}>
                  <span className="mono text-[0.66rem] text-white/45">0{i + 1}</span>
                  <p className="h-title mt-8 text-[1.05rem] leading-snug text-white sm:text-[1.15rem]">{b}</p>
                </div>
              </div>
            );
          })}

          {/* Meta-Tags oben rechts */}
          <div className="fd relative z-20 order-last hidden flex-wrap content-end gap-x-4 gap-y-3 p-6 lg:col-start-4 lg:row-start-1 lg:flex" style={delay(1700)}>
            {metaTags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {/* CTA unten rechts */}
          <div className="fd relative z-20 hidden flex-col items-end justify-end gap-3 p-6 lg:col-start-4 lg:row-start-3 lg:flex" style={delay(1500)}>
            <QuizTrigger variant="outline">{cta.primary}</QuizTrigger>
            <p className="mono max-w-[30ch] text-right text-[0.62rem] uppercase leading-relaxed tracking-[0.1em] text-white/45">{cta.reassurance}</p>
          </div>

          {/* Mobile: Meta-Tags als Zeile */}
          <div className="relative z-20 order-4 col-span-2 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/10 px-6 py-4 lg:hidden">
            {metaTags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </Parallax>

      {/* ------------------------------------------------- Kennzahlen */}
      <div className="mx-auto w-full max-w-[1280px] px-4 pb-4 sm:px-8">
        <dl className="grid overflow-hidden rounded-[12px] border border-white/12 sm:grid-cols-2 lg:grid-cols-4">
          {proof.map((p, i) => (
            <div
              key={p.label}
              className={`glass glass--deep spot relative px-6 py-7 sm:px-8 ${
                i > 0 ? "border-t border-white/10 sm:border-t-0" : ""
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
        <div className="mt-4 flex flex-col overflow-hidden rounded-[12px] border border-white/12 lg:flex-row">
          <div className="flex items-center border-b border-white/10 px-6 py-4 sm:px-8 lg:border-b-0 lg:border-r">
            <Tag>Bekannt aus</Tag>
          </div>
          <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-5 px-6 py-5 sm:px-8 lg:justify-between lg:gap-x-6">
            {outlets.map((o) => (
              <li key={o.name} className="flex shrink-0 items-center opacity-55 transition-opacity duration-300 hover:opacity-100" title={o.name}>
                {"logo" in o ? (
                  <Image src={o.logo} alt={o.name} width={o.width} height={o.height} className="w-auto" style={{ height: `${Math.round(18 * o.scale)}px` }} />
                ) : (
                  <span className="font-[family-name:var(--font-head)] text-[0.84rem] font-bold uppercase tracking-[0.02em] text-white">{o.wordmark}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
