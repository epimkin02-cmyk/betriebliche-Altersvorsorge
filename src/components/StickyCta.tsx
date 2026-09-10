"use client";

import { useEffect, useState } from "react";
import { CtaPill } from "./ui";
import { cta } from "@/content/site";

/** Mobile Sticky-CTA – erscheint, sobald der Hero verlassen wurde. */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <CtaPill href={cta.href} size="sm" block>
        {cta.primary}
      </CtaPill>
      <p className="mt-1.5 text-center text-[0.72rem] text-white/45">{cta.reassuranceShort} · 2 Min.</p>
    </div>
  );
}
