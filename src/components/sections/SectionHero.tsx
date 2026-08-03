import Link from "next/link";
import FreebieMockup from "../FreebieMockup";
import { ArrowIcon, Badge, CheckIcon, Container } from "../ui";
import { cta, hero, press, proof } from "@/content/site";

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

          <h1 className="h-display mt-7 max-w-[13ch] text-[clamp(2.1rem,4.9vw,3.25rem)] lg:max-w-none">
            <span className="block text-white">{hero.headline[0]}</span>
            <span className="block text-petrol-300">{hero.headline[1]}</span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/70 sm:text-[1.15rem]">
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

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-petrol px-7 py-4 text-[1.02rem] font-semibold text-white shadow-[0_14px_40px_rgba(21,120,121,0.45)] transition-all hover:-translate-y-0.5 hover:bg-petrol-600"
            >
              {cta.primary}
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-white/20 px-6 py-4 text-[0.98rem] font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
            >
              Wie es funktioniert
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
        <Container className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:grid-cols-4">
          {proof.map((p) => (
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

      {/* „Bekannt aus" – ⚠️ TODO · MARIUS: echte Verlags-Logos & Artikel-Links */}
      <div className="relative z-10 border-t border-white/10 bg-black/25">
        <Container className="flex flex-col items-center gap-4 py-6 lg:flex-row lg:gap-8">
          <p className="eyebrow shrink-0 text-white/35">Bekannt aus</p>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-7 gap-y-2 lg:justify-start">
            {press.map((p) => (
              <span
                key={p}
                className="font-[family-name:var(--font-head)] text-[0.85rem] font-bold text-white/30"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="shrink-0 text-[0.7rem] text-white/25">10 Beiträge · 9 Medien · 2022–2023</p>
        </Container>
      </div>
    </section>
  );
}
