import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { brand, legal } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="serif mt-5 text-lg italic text-petrol-200">„{brand.claim}“</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              Firmenvermögen sicher in Privatvermögen wandeln – für Gesellschafter-Geschäftsführer und Führungskräfte.
            </p>
          </div>

          <div>
            <h3 className="h-title mb-4 text-sm uppercase tracking-[0.14em] text-white/45">Kontakt</h3>
            <address className="space-y-1.5 text-sm not-italic text-white/75">
              <p className="font-semibold text-white">{brand.person}</p>
              <p>{brand.company}</p>
              <p>{brand.street}</p>
              <p>{brand.city}</p>
              <p className="pt-2">
                <a className="hover:text-petrol-200" href={brand.phoneHref}>
                  {brand.phone}
                </a>
              </p>
              <p>
                <a className="hover:text-petrol-200" href={`mailto:${brand.email}`}>
                  {brand.email}
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="h-title mb-4 text-sm uppercase tracking-[0.14em] text-white/45">Rechtliches</h3>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <Link className="hover:text-petrol-200" href="/impressum">
                  Impressum
                </Link>
              </li>
              <li>
                <Link className="hover:text-petrol-200" href="/datenschutz">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link className="hover:text-petrol-200" href="/check">
                  Potenzial prüfen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[0.78rem] leading-relaxed text-white/40">{legal.disclaimer}</p>
          <p className="mt-6 text-[0.78rem] text-white/35">
            © {new Date().getFullYear()} {brand.name} · {brand.person}
          </p>
        </div>
      </Container>
    </footer>
  );
}
