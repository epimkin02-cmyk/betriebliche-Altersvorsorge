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
  variant,
}: {
  children: ReactNode;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
}) {
  return (
    <CtaPill
      size={size}
      block={block}
      className={className}
      variant={variant}
      onClick={() => {
        onClick?.();
        openQuiz();
      }}
    >
      {children}
    </CtaPill>
  );
}
