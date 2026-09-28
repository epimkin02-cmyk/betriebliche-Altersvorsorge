"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import QuizTrigger from "./QuizTrigger";
import { Container } from "./ui";
import { cta } from "@/content/site";

/* Reihenfolge wie im Figma-Wireframe. Die Anker zeigen auf die Stellen, wo
   das Thema steht: Problem-Aussage im Hero, Berater & Presse, der Ratgeber
   als Loesung. */
const nav = [
  { href: "/#problem", label: "Das Problem" },
  { href: "/#vertrauen", label: "Berater & Presse" },
  { href: "/#loesung", label: "Die Lösung" },
];

/** Seiten, die durchgehend dunkel sind. Impressum und Datenschutz bleiben hell. */
const darkRoutes = ["/", "/danke", "/check"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dark = darkRoutes.includes(pathname);

  /* Der Header-CTA erscheint erst, wenn der Hero durchgescrollt ist. */
  const [pastHero, setPastHero] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const heroEl = document.getElementById("start");
      setPastHero(heroEl ? window.scrollY >= heroEl.offsetHeight - 68 : true);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        dark
          ? solid
            ? "border-b border-hair bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
          : solid
            ? "border-b border-line bg-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* Lesefortschritt als Mint-Linie am unteren Rand */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left bg-mint transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ transform: `scaleX(${progress})` }}
      />
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="Führungsvorsorge – zur Startseite" className="shrink-0">
          <Logo size="sm" variant={dark ? "dark" : "light"} />
        </Link>

        {/* Navigation als eigene Zelle in der Mitte */}
        <nav
          className={`hidden items-center rounded-[4px] border p-1 lg:flex ${
            dark ? "border-hair-2 bg-ink-2/80" : "border-line bg-white"
          }`}
          aria-label="Hauptnavigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[3px] px-4 py-2 text-[0.86rem] font-medium transition-colors ${
                dark ? "text-white/70 hover:bg-white/[0.06] hover:text-white" : "text-ink/70 hover:bg-soft hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className={`hidden transition-all duration-500 ease-out sm:inline-block ${
              pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
            }`}
            aria-hidden={!pastHero}
          >
            <QuizTrigger size="sm">{cta.primaryShort}</QuizTrigger>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[4px] border lg:hidden ${
              dark ? "border-hair-2 text-white" : "border-line text-ink"
            }`}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className={`border-t lg:hidden ${dark ? "border-hair bg-ink" : "border-line bg-white"}`}
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-[4px] px-3 py-3 text-base font-medium ${
                  dark ? "text-white/85 hover:bg-white/[0.06]" : "text-ink/80 hover:bg-soft"
                }`}
              >
                <span className="mono text-[0.7rem] text-mint">0{i + 1}</span>
                {item.label}
              </Link>
            ))}
            <div className="mt-3">
              <QuizTrigger onClick={() => setOpen(false)} block>
                {cta.primary}
              </QuizTrigger>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
