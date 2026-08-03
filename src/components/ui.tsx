import Link from "next/link";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------- Container */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

/* ---------------------------------------------------------------- Overline  */

export function Overline({
  children,
  variant = "light",
}: {
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <p
      className={`eyebrow mb-4 flex items-center gap-2.5 ${
        variant === "dark" ? "text-petrol-300" : "text-petrol"
      }`}
    >
      <span
        className={`inline-block h-[7px] w-[7px] rounded-full ${
          variant === "dark" ? "bg-petrol-300" : "bg-petrol"
        }`}
        aria-hidden="true"
      />
      {children}
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

const base =
  "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-petrol";

const sizes = {
  md: "px-5 py-3 text-[0.95rem]",
  lg: "px-7 py-4 text-base sm:text-[1.05rem]",
};

const variants = {
  primary: "bg-petrol text-white shadow-[0_8px_24px_rgba(21,120,121,0.28)] hover:bg-petrol-600 hover:shadow-[0_10px_30px_rgba(21,120,121,0.36)] hover:-translate-y-0.5",
  secondary: "border border-petrol/35 bg-white text-petrol-700 hover:border-petrol hover:bg-petrol-50",
  ghost: "text-petrol-700 hover:bg-petrol-50",
  onDark: "bg-white text-ink hover:bg-petrol-50 hover:-translate-y-0.5",
};

export function Button({ href, children, variant = "primary", size = "md", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- Badge     */

export function Badge({
  children,
  variant = "light",
}: {
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold ${
        variant === "dark"
          ? "bg-white/10 text-petrol-200 ring-1 ring-white/15"
          : "bg-petrol-100 text-petrol-700"
      }`}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Section   */

export function Section({
  id,
  children,
  className = "",
  tone = "white",
  as: Tag = "section",
  pad = "lg",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "white" | "soft" | "dark";
  /** Die Seite hat bewusst nur vier <section>-Elemente – innere Blöcke laufen als "div". */
  as?: "section" | "div";
  pad?: "lg" | "md" | "none";
}) {
  const tones = {
    white: "bg-white",
    soft: "bg-soft",
    dark: "bg-ink text-white",
  };
  const pads = {
    lg: "py-20 sm:py-28",
    md: "py-14 sm:py-20",
    none: "",
  };
  return (
    <Tag id={id} className={`scroll-mt-20 ${pads[pad]} ${tones[tone]} ${className}`}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- Icons     */

export function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
      <path
        d="M6 10.4l2.6 2.6L14 7.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M2.5 8h11m0 0L9.5 4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
