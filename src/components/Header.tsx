"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Container, CtaPill } from "./ui";
import { cta } from "@/content/site";

/* Reihenfolge wie im Figma-Wireframe. „Das Problem" und „Die Lösung" sind
   seit dem Umbau auf drei Sections keine eigenen Bloecke mehr; die Anker
   zeigen auf die Stellen, wo das Thema jetzt steht: die Problem-Aussage im
   Hero und der Ratgeber als Loesung. */
const nav = [
  { href: "/#problem", label: "Das Problem" },
  { href: "/#loesung", label: "Die Lösung" },
  { href: "/#vertrauen", label: "Berater & Presse" },
];

/** Seiten mit dunklem Hero – dort steht der Header zunächst auf Dunkel. */
const darkHeroRoutes = ["/", "/danke"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /* Startseite und Danke-Seite sind durchgehend dunkel – der Header bleibt es
     deshalb auch nach dem Scrollen. Nur das mobile Menue kippt auf Hell. */
  const darkRoute = darkHeroRoutes.includes(pathname);
  const onDark = darkRoute && !open;

  /* Der Header-CTA erscheint erst, wenn der Hero durchgescrollt ist – im Hero
     steht der grosse Button ohnehin, zwei davon gleichzeitig konkurrieren nur.
     Auf Seiten ohne Hero (#start) ist er von Anfang an da. */
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const heroEl = document.getElementById("start");
      setPastHero(heroEl ? window.scrollY >= heroEl.offsetHeight - 68 : true);
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? darkRoute && !open
            ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
            : "border-b border-line bg-white/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="Führungsvorsorge – zur Startseite" className="shrink-0">
          <Logo size="sm" variant={onDark ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-[0.9rem] font-medium transition-colors ${
                onDark
                  ? "text-white/70 hover:bg-white/10 hover:text-white"
                  : "text-ink/70 hover:bg-petrol-50 hover:text-ink"
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
            <CtaPill href={cta.href} size="sm">
              {cta.primaryShort}
            </CtaPill>
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] border lg:hidden ${
              onDark ? "border-white/25 text-white" : "border-line text-ink"
            }`}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-ink/80 hover:bg-petrol-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2">
              <CtaPill href={cta.href} onClick={() => setOpen(false)} block>
                {cta.primary}
              </CtaPill>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
