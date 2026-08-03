/**
 * Bildmarke (Schild + Krawatte) und Logo-Lockup.
 * Regeln aus der Brand Guideline, Kapitel 03:
 * – „FÜHRUNGS“ in Tiefschwarz (bzw. Weiß auf Dunkel), „VORSORGE“ in Petrol
 * – beide Wörter immer untereinander, bündig links, in Versalien
 * – nie verzerren, neu einfärben oder mit Effekten versehen
 */

export function Mark({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true" focusable="false">
      <path
        d="M50 14C44 18 34 19 20 18C16.5 17.8 14 20 14 23.5L14 62C14 86 30 102 50 113C70 102 86 86 86 62L86 23.5C86 20 83.5 17.8 80 18C66 19 56 18 50 14Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        d="M45.5 41 L54.5 41 L53 51 L47 51 Z M47 51 L53 51 L57 85 L50 95 L43 85 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  variant = "light",
  className = "",
  size = "md",
}: {
  /** light = auf hellem Grund · dark = auf dunklem Grund */
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const markSize = size === "sm" ? "h-7" : size === "lg" ? "h-12" : "h-9";
  const textSize = size === "sm" ? "text-[0.72rem]" : size === "lg" ? "text-lg" : "text-[0.85rem]";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Mark className={`${markSize} w-auto text-petrol`} />
      <span
        className={`font-[family-name:var(--font-head)] font-black uppercase leading-[1.02] tracking-[0.01em] ${textSize}`}
      >
        <span className={variant === "dark" ? "block text-white" : "block text-ink"}>Führungs</span>
        <span className="block text-petrol">Vorsorge</span>
      </span>
      <span className="sr-only">Führungsvorsorge</span>
    </span>
  );
}
