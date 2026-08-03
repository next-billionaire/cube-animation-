"use client";

import { memo } from "react";
import { cn } from "@/utils/cn";

interface LetterRevealProps {
  text: string;
  className?: string;
  letterClassName?: string;
}

export const LetterReveal = memo(function LetterReveal({
  text,
  className,
  letterClassName,
}: LetterRevealProps) {
  const letters = text.split("");

  return (
    <div className={cn("flex overflow-hidden", className)}>
      {letters.map((char, index) => (
        <span
          key={index}
          className={cn(
            // Initial state: translated down, blurred, invisible
            "inline-block translate-y-[100%] opacity-0 blur-[10px]",
            letterClassName
          )}
          style={{ willChange: "transform, opacity, filter, color" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
});
