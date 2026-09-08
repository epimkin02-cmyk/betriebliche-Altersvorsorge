import Link from "next/link";
import FreebieMockup from "../FreebieMockup";
import { ArrowIcon, Badge, CheckIcon, Container } from "../ui";
import { cta, hero, press, pressMentions, pressMeta, proof } from "@/content/site";

/** Verlagsnamen für die schmale „Bekannt aus"-Leiste, ohne Dopplungen. */
const outlets = Array.from(
  new Set<string>([...press.map((p) => p.outlet), ...pressMentions]),
);

/**
 * SECTION 1 · Hero
 * Enthält: Claim, Nutzen, Haupt-CTA, das 3D-Mockup des Reports,
 * die Proof-Leiste und die „Bekannt aus"-Zeile.
 */
export default function SectionHero() {
  return (
    <section
      id="start"
      className="grid-veil relative overflow-hidden bg-ink pt-[68px] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#0c1a1a_0%,#101217_55%,#0a0d11_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_640px_at_78%_-10%,rgba(21,120,121,0.4),transparent_62%)]"
      />

      <Container className="relative z-10 grid items-center gap-16 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-24">
        <div>
          <Badge variant="dark">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-petrol-300" aria-hidden="true" />
            {hero.eyebrow}
          </Badge>

          <h1 className="h-display mt-7 max-w-[18ch] text-[clamp(1.95rem,4.2vw,2.9rem)] lg:max-w-none">
            <span className="block text-white">{hero.headline[0]}</span>
            <span className="serif block italic text-petrol-300">{hero.headline[1]}</span>
          </h1>

          <p className="h-display mt-5 max-w-[22ch] text-[clamp(1.4rem,2.9vw,2rem)] text-white/90 lg:max-w-[24ch]">
            {hero.headlineKicker}
          </p>

          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-white/65 sm:text-[1.08rem]">
            {hero.sub}
          </p>

          <ul className="mt-8 space-y-3">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[0.98rem] text-white/85">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-petrol-300" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Ein einziger CTA, wie im Wireframe – er scrollt zum Opt-in-Formular. */}
          <div className="mt-9">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(90deg,#157879_0%,#1fa096_100%)] px-7 py-4 text-[1.02rem] font-semibold text-white shadow-[0_14px_40px_rgba(21,120,121,0.45)] transition-all hover:-translate-y-0.5"
            >
              {cta.primary}
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-4 text-[0.85rem] text-white/45">{cta.reassurance}</p>
        </div>

        {/* 3D-Mockup des Reports */}
        <div>
          <p className="mb-8 text-center text-[0.72rem] font-bold uppercase tracking-[0.2em] text-petrol-300 lg:mb-10">
            {hero.mockupLabel}
          </p>
          <FreebieMockup />
        </div>
      </Container>

      {/* Proof-Leiste */}
      <div className="relative z-10 border-t border-white/10">
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
          mit den Artikel-Screenshots steht weiter unten in SectionPress. */}
      <div className="relative z-10 border-t border-white/10 bg-black/25">
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
