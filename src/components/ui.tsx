import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Container */

/**
 * Seitenbreite. Mit `frame` wird der Inhalt zu einem gerahmten Panel
 * (runde Ecken, Hairline), wie die Bühne im Hero.
 */
export function Container({
  children,
  className = "",
  frame = false,
}: {
  children: ReactNode;
  className?: string;
  frame?: boolean;
}) {
  if (frame) {
    return (
      <div className={`mx-auto w-full max-w-[1280px] px-4 sm:px-8 ${className}`}>
        <div className="relative overflow-hidden rounded-[12px] border border-white/12 bg-[rgba(255,255,255,0.015)]">{children}</div>
      </div>
    );
  }
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/* ---------------------------------------------------------------- Tag       */

/** Klammer-Label „[ 01 · Fachpresse ]“ */
export function Tag({
  children,
  n,
  mint = false,
  className = "",
}: {
  children: ReactNode;
  n?: string;
  mint?: boolean;
  className?: string;
}) {
  return (
    <span className={`tag ${mint ? "tag--mint" : ""} ${className}`}>
      {n && (
        <>
          <span className="tag__n">{n}</span>
          <span aria-hidden="true">·</span>
        </>
      )}
      {children}
    </span>
  );
}

/** Kompatibel zum frueheren Overline-Aufruf: Tag mit Abstand nach unten */
export function Overline({
  children,
  index,
}: {
  children: ReactNode;
  variant?: "light" | "dark";
  index?: string;
}) {
  return (
    <p className="mb-5">
      <Tag n={index} mint>
        {children}
      </Tag>
    </p>
  );
}

/* ---------------------------------------------------------------- Cross     */

/** Kreuzmarke an einer Zellen-Ecke: <Cross at="tl" /> */
export function Cross({ at }: { at: "tl" | "tr" | "bl" | "br" }) {
  const pos = {
    tl: "-left-[6px] -top-[6px]",
    tr: "-right-[6px] -top-[6px]",
    bl: "-left-[6px] -bottom-[6px]",
    br: "-right-[6px] -bottom-[6px]",
  }[at];
  return <span aria-hidden="true" className={`cross ${pos}`} />;
}

/* ---------------------------------------------------------------- Buttons   */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
  size?: "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint";

const sizes = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base sm:text-[1.05rem]",
};

const variants = {
  primary: "bg-mint text-ink hover:brightness-110",
  secondary: "border border-hair-2 bg-ink-2 text-white hover:border-mint/60",
  ghost: "text-white/70 hover:text-white",
  onDark: "bg-white text-ink hover:bg-mint-2",
};

export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- CtaPill   */

type CtaPillProps = {
  children: ReactNode;
  /** Mit href wird ein Link gerendert, ohne href ein <button>. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  /** solid = Mint-Feld (.cta), outline = Nexo-Pille mit weissem Pfeilkreis (.pillcta) */
  variant?: "solid" | "outline";
};

/**
 * Der Haupt-Button der Seite: eckiges Mint-Feld mit Pfeilkasten rechts.
 * Styles als .cta* in globals.css (Sheen und Hover ueber Pseudo-Elemente).
 */
export function CtaPill({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  size = "md",
  block,
  className = "",
  variant = "solid",
}: CtaPillProps) {
  if (variant === "outline") {
    const pc = `pillcta ${block ? "w-full justify-between" : ""} ${className}`;
    const pin = (
      <>
        <span>{children}</span>
        <span className="pillcta__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h12M8.5 2.5 14 8l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </>
    );
    return href ? (
      <Link href={href} className={pc} onClick={onClick}>{pin}</Link>
    ) : (
      <button type={type} className={pc} onClick={onClick} disabled={disabled}>{pin}</button>
    );
  }
  const cls = ["cta", size === "sm" ? "cta--sm" : "", block ? "cta--block" : "", className]
    .filter(Boolean)
    .join(" ");
  const inner = (
    <>
      <span className="cta__ring" aria-hidden="true" />
      <span className="cta__body">
        <span className="cta__label">{children}</span>
        <span className="cta__icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8h12M8.5 2.5 14 8l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

/* ---------------------------------------------------------------- Badge     */

export function Badge({ children }: { children: ReactNode; variant?: "light" | "dark" }) {
  return <span className="tag">{children}</span>;
}

/* ---------------------------------------------------------------- Section   */

export function Section({
  id,
  children,
  className = "",
  as: Tag = "section",
  pad = "lg",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "dark";
  as?: "section" | "div";
  pad?: "lg" | "md" | "none";
}) {
  const pads = { lg: "py-20 sm:py-28", md: "py-14 sm:py-20", none: "" };
  return (
    <Tag id={id} className={`scroll-mt-20 ${pads[pad]} ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- Icons     */

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M4 10.4l3.6 3.6L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path d="M2.5 8h11m0 0L9.5 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
