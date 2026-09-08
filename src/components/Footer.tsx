import Link from "next/link";
import { Container } from "./ui";
import { brand, legal } from "@/content/site";

/**
 * Footer – schmal, wie im Figma-Wireframe: eine Trennlinie, links das
 * Copyright, rechts die Rechtslinks.
 *
 * Der Pflichthinweis darüber bleibt bewusst stehen: Marius Michael ist
 * gebundener Versicherungsvertreter gem. § 34d Abs. 7 GewO, und die
 * Rechenbeispiele auf der Seite sind vereinfacht. Das gehört zur Seite,
 * auch wenn das Wireframe nur die Copyright-Zeile zeigt.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="py-12">
        <p className="max-w-4xl text-[0.74rem] leading-relaxed text-white/35">{legal.disclaimer}</p>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.8rem] text-white/40">
            © {new Date().getFullYear()} {brand.name} · {brand.person}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8rem] text-white/50">
            <a className="transition-colors hover:text-petrol-300" href={brand.phoneHref}>
              {brand.phone}
            </a>
            <a className="transition-colors hover:text-petrol-300" href={`mailto:${brand.email}`}>
              {brand.email}
            </a>
            <Link className="transition-colors hover:text-petrol-300" href="/impressum">
              Impressum
            </Link>
            <Link className="transition-colors hover:text-petrol-300" href="/datenschutz">
              Datenschutz
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
