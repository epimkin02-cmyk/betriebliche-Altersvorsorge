import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, Container } from "@/components/ui";
import { brand } from "@/content/site";

export const metadata: Metadata = {
  title: "Danke – dein Report ist unterwegs",
  robots: { index: false, follow: false },
};

const nextSteps = [
  {
    no: "1",
    title: "Report checken",
    body: "Der Ratgeber „Die 3 GGF-Hebel“ landet in den nächsten Minuten in deinem Postfach. Falls nicht: kurz in den Spam-Ordner schauen.",
  },
  {
    no: "2",
    title: "Auswertung erhalten",
    body: "Wir prüfen deine Angaben und melden uns mit deinem persönlichen Ergebnis – auf Wunsch direkt per WhatsApp.",
  },
  {
    no: "3",
    title: "Entscheiden",
    body: "Du entscheidest, ob und wie es weitergeht. Kein Verkaufsdruck – wenn der einfachste Weg für dich reicht, sagen wir dir genau das.",
  },
];

export default function DankePage() {
  return (
    <div className="grid-veil relative overflow-hidden bg-ink pt-[68px] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_-8%,rgba(21,120,121,0.5),transparent_64%)]"
      />
      <Container className="relative z-10 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-petrol">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" aria-hidden="true">
              <path
                d="M5 12.5l4.5 4.5L19 7.5"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <h1 className="h-display mt-8 text-[clamp(2rem,4.6vw,3rem)]">Danke – wir haben alles.</h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/65">
            Dein Report ist unterwegs, deine Auswertung läuft. Wir melden uns in der Regel innerhalb
            eines Werktags.
          </p>
        </div>

        <ol className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3">
          {nextSteps.map((s) => (
            <li key={s.no} className="rounded-[14px] border border-white/12 bg-white/[0.045] p-6">
              <span className="h-display text-[1.4rem] text-petrol-300">{s.no}</span>
              <h2 className="h-title mt-3 text-[1.02rem] text-white">{s.title}</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-white/60">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-14 max-w-2xl rounded-[14px] border border-white/12 bg-white/[0.045] p-7 text-center">
          <p className="text-[0.95rem] text-white/70">
            Du hast es eilig oder eine konkrete Frage? Ruf einfach direkt an:
          </p>
          <a
            href={brand.phoneHref}
            className="h-display mt-3 inline-block text-[1.6rem] text-petrol-300 hover:text-white"
          >
            {brand.phone}
          </a>
          <p className="mt-2 text-[0.82rem] text-white/40">
            {brand.person} · {brand.company}, Frankfurt a. M.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 px-6 py-3.5 font-semibold text-white/85 transition-colors hover:border-white/45 hover:text-white"
          >
            Zurück zur Startseite
            <ArrowIcon />
          </Link>
        </div>
      </Container>
    </div>
  );
}
