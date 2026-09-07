"use client";

import { useState } from "react";
import { brand, reviews, testimonials } from "@/content/site";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const perView = 3;
  const maxIndex = Math.max(0, testimonials.length - perView);

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Vorherige Stimmen"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-petrol hover:text-petrol disabled:cursor-not-allowed disabled:opacity-35"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          disabled={index >= maxIndex}
          aria-label="Weitere Stimmen"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-petrol hover:text-petrol disabled:cursor-not-allowed disabled:opacity-35"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="overflow-hidden">
        <ul
          className="flex gap-5 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(${-index} * (100% / ${perView} + 1.25rem * ${1 / perView})))`,
          }}
        >
          {testimonials.map((t) => (
            <li
              key={t.name}
              className="w-[85%] shrink-0 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <figure className="flex h-full flex-col rounded-[14px] border border-line bg-white p-7">
                <div className="flex gap-0.5 text-petrol" aria-label="5 von 5 Sternen">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M10 1.6l2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L10 1.6z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="serif mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink/75">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-petrol-100 text-[0.82rem] font-bold text-petrol-700">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-[0.9rem] font-semibold text-ink">{t.name}</span>
                    <span className="block text-[0.8rem] text-graybrand">
                      {reviews.platform}-Bewertung · {t.date}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Quellenangabe – macht die Stimmen überprüfbar statt behauptet. */}
      <p className="mt-6 text-[0.8rem] leading-relaxed text-graybrand">
        Echte {reviews.platform}-Bewertungen der {brand.company} {brand.person}, im Wortlaut
        zitiert.{" "}
        <a
          href={reviews.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-petrol underline-offset-4 hover:underline"
        >
          {reviews.note}
        </a>
      </p>
    </div>
  );
}
