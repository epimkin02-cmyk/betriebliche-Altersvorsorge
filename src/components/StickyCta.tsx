"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "./ui";
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
      <Link
        href={cta.href}
        className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(90deg,#157879_0%,#1fa096_100%)] px-5 py-3.5 font-semibold text-white"
      >
        {cta.primary}
        <ArrowIcon />
      </Link>
      <p className="mt-1.5 text-center text-[0.72rem] text-white/45">{cta.reassuranceShort} · 2 Min.</p>
    </div>
  );
}
