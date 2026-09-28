import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Container */

export function Container({
  children,
  className = "",
  size = "lg",
}: {
  children: ReactNode;
  className?: string;
  /** lg = 1200, md = 1040, sm = 760 */
  size?: "lg" | "md" | "sm";
  frame?: boolean;
}) {
  const w = { lg: "max-w-[1200px]", md: "max-w-[1040px]", sm: "max-w-[760px]" }[size];
  return <div className={`mx-auto w-full ${w} px-5 sm:px-8 ${className}`}>{children}</div>;
}

/* ---------------------------------------------------------------- Label     */

/** Kleines Label mit Punkt: „Fachpresse“ */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>;
}

export function Tag({ children, className = "" }: { children: ReactNode; n?: string; mint?: boolean; className?: string }) {
  return <span className={`label ${className}`}>{children}</span>;
}

export function Overline({ children }: { children: ReactNode; variant?: "light" | "dark"; index?: string }) {
  return (
    <p className="mb-4">
      <Label>{children}</Label>
    </p>
  );
}

/* ---------------------------------------------------------------- Buttons   */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "onDark";
  className?: string;
  size?: "md" | "lg";
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const cls =
    variant === "primary" || variant === "onDark"
      ? "cta"
      : "btn-ghost";
  if (cls === "cta") {
    return (
      <Link href={href} className={`cta ${className}`}>
        <span className="cta__body">{children}</span>
      </Link>
    );
  }
  return (
    <Link href={href} className={`${cls} ${className}`}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- CtaPill   */

type CtaPillProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  variant?: "solid" | "outline";
};

/** Haupt-CTA: weisse Pille mit Pfeil. Styles als .cta* in globals.css. */
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
    const pc = `btn-ghost ${block ? "w-full justify-center" : ""} ${className}`;
    return href ? (
      <Link href={href} className={pc} onClick={onClick}>{children}</Link>
    ) : (
      <button type={type} className={pc} onClick={onClick} disabled={disabled}>{children}</button>
    );
  }
  const cls = ["cta", size === "sm" ? "cta--sm" : "", block ? "cta--block" : "", className].filter(Boolean).join(" ");
  const inner = (
    <span className="cta__body">
      <span className="cta__label">{children}</span>
      <span className="cta__icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
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
  return <span className="pill">{children}</span>;
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
  const pads = { lg: "py-24 sm:py-32", md: "py-16 sm:py-24", none: "" };
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
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <path d="M6.2 10.3l2.5 2.5L14 7.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
