import Link from "next/link";
import { Container, Tag } from "./ui";
import { brand, legal } from "@/content/site";

/**
 * Footer: Pflichthinweis (gebundener Versicherungsvertreter, vereinfachte
 * Rechenbeispiele), darunter Copyright und Rechtslinks. Sitzt auf den
 * Raster-Schienen wie alle Sections.
 */
export default function Footer() {
  return (
    <footer className="pb-6 pt-2 text-white">
      <Container frame>
        <div className="px-5 py-10 sm:px-8 sm:py-12">
          <Tag>Rechtlicher Hinweis</Tag>
          <p className="mt-4 max-w-4xl text-[0.76rem] leading-relaxed text-white/40">{legal.disclaimer}</p>
        </div>
        <div className="flex flex-col gap-4 border-t border-hair px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="mono text-[0.72rem] uppercase tracking-[0.08em] text-white/40">
            © {new Date().getFullYear()} {brand.name} · {brand.person}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8rem] text-white/55">
            <a className="transition-colors hover:text-mint" href={brand.phoneHref}>{brand.phone}</a>
            <a className="transition-colors hover:text-mint" href={`mailto:${brand.email}`}>{brand.email}</a>
            <Link className="transition-colors hover:text-mint" href="/impressum">Impressum</Link>
            <Link className="transition-colors hover:text-mint" href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
