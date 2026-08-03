"use client";

import { memo } from "react";
import { LetterReveal } from "./LetterReveal";
import { TaglineReveal } from "./TaglineReveal";

export const LogoReveal = memo(function LogoReveal() {
  return (
    <div className="logo-wrapper flex flex-col items-center justify-center relative z-10 select-none pointer-events-none mix-blend-difference">
      {/* Light Sweep Div */}
      <div 
        className="light-sweep absolute top-0 left-0 w-full h-[200%] -translate-x-full z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
          transform: "translateX(-100%)",
        }}
      />
      
      <div className="flex flex-col items-center">
        {/* "brand" */}
        <LetterReveal 
          text="brand" 
          letterClassName="brand-letter text-white font-mono text-5xl md:text-7xl font-bold tracking-tighter"
        />
        
        {/* "masala." container */}
        <div className="flex items-end -mt-2 md:-mt-4">
          <LetterReveal 
            text="masala" 
            letterClassName="masala-letter text-white font-mono text-5xl md:text-7xl font-bold tracking-tighter"
          />
          <span 
            className="red-dot inline-block text-red-600 font-mono text-5xl md:text-7xl font-bold leading-none scale-0 rounded-full"
            style={{ 
              transformOrigin: "bottom center",
              willChange: "transform, box-shadow" 
            }}
          >
            .
          </span>
        </div>
      </div>
      
      <TaglineReveal />
    </div>
  );
});
