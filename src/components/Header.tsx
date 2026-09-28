"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import QuizTrigger from "./QuizTrigger";
import { Container } from "./ui";
import { cta } from "@/content/site";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          ? solid ? "border-b border-hair bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
          : solid ? "border-b border-line bg-white/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <Link href="/" aria-label="Führungsvorsorge – zur Startseite" className="shrink-0">
          <Logo size="sm" variant={dark ? "dark" : "light"} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                dark ? "text-white/65 hover:text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block">
            <QuizTrigger size="sm">{cta.primaryShort}</QuizTrigger>
          </span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
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
        <div id="mobile-nav" className={`border-t lg:hidden ${dark ? "border-hair bg-ink" : "border-line bg-white"}`}>
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${dark ? "text-white/85" : "text-ink/80"}`}
              >
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
