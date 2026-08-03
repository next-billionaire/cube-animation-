"use client";

import { memo } from "react";

export const TaglineReveal = memo(function TaglineReveal() {
  const tagline = "digital experience";
  const letters = tagline.split("");

  return (
    <div className="tagline-container overflow-hidden mt-6 md:mt-8 flex justify-center w-full">
      <div className="flex">
        {letters.map((char, index) => (
          <span
            key={`tagline-${index}`}
            className="tagline-letter inline-block opacity-0 font-sans text-xs md:text-sm text-black/50 font-medium tracking-widest uppercase"
            style={{ willChange: "opacity, transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
});
