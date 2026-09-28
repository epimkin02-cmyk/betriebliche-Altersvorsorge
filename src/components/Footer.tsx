import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui";
import { brand, legal } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-hair bg-ink text-white">
      <Container className="py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[300px]">
            <Logo size="sm" variant="dark" />
            <p className="mt-4 text-[0.88rem] leading-relaxed text-muted">{brand.claim}</p>
            <p className="mt-4 text-[0.84rem] text-faint">
              {brand.company} · {brand.street}, {brand.city}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.88rem] text-muted">
            <a className="transition-colors hover:text-white" href={brand.phoneHref}>{brand.phone}</a>
            <a className="transition-colors hover:text-white" href={`mailto:${brand.email}`}>{brand.email}</a>
            <Link className="transition-colors hover:text-white" href="/impressum">Impressum</Link>
            <Link className="transition-colors hover:text-white" href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
        <p className="mt-12 max-w-4xl text-[0.76rem] leading-relaxed text-faint">{legal.disclaimer}</p>
        <p className="mt-8 border-t border-hair pt-6 text-[0.8rem] text-faint">
          © {new Date().getFullYear()} {brand.name} · {brand.person}
        </p>
      </Container>
    </footer>
  );
}
