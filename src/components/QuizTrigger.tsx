"use client";

import type { ReactNode } from "react";
import { CtaPill } from "./ui";
import { openQuiz } from "@/lib/quiz-bus";

/** CTA-Pille, die statt zu scrollen das Quiz-Popup oeffnet. */
export default function QuizTrigger({
  children,
  size = "md",
  block,
  className,
  onClick,
}: {
  children: ReactNode;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <CtaPill
      size={size}
      block={block}
      className={className}
      onClick={() => {
        onClick?.();
        openQuiz();
      }}
    >
      {children}
    </CtaPill>
  );
}
