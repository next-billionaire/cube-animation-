"use client";

import { memo } from "react";
import { cn } from "@/utils/cn";
import { LetterReveal } from "./LetterReveal";

export const TaglineReveal = memo(function TaglineReveal() {
  const text = "A BRAND CONSULTANCY FIRM";
  const letters = text.split("");

  return (
    <div className="tagline-wrapper mt-4 overflow-hidden text-center" style={{ letterSpacing: "normal", willChange: "letter-spacing" }}>
      {letters.map((char, index) => (
        <span
          key={index}
          className="tagline-letter inline-block opacity-0 font-sans text-[10px] md:text-xs text-white/50 font-medium tracking-widest"
          style={{ willChange: "opacity" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
});
