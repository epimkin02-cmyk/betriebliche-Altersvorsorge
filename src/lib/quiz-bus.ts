/** Oeffnet das Quiz-Popup von ueberall (Header, Hero, Sticky-CTA, Opt-in). */
export const QUIZ_OPEN_EVENT = "quiz:open";

export function openQuiz() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUIZ_OPEN_EVENT));
}
