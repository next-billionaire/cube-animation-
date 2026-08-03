"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  { id: 1, title: "Project Alpha", desc: "A branding redesign for a modern tech startup." },
  { id: 2, title: "Beta App", desc: "A sleek, high-conversion mobile application." },
  { id: 3, title: "Gamma Web", desc: "A fast, immersive e-commerce platform." },
  { id: 4, title: "Delta Social", desc: "Viral social media campaigns and growth." }
];

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !containerRef.current) return;
    
    // The total distance to scroll horizontally
    // It's the width of the container minus the viewport width
    const scrollWidth = containerRef.current.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // smooth scrubbing
          end: () => `+=${scrollWidth}`, // Pinned duration
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="section2" ref={sectionRef} className="relative w-full h-screen bg-transparent overflow-hidden border-t border-white/10 pt-20 z-20">
      <div className="absolute top-12 left-8 md:left-16 z-30">
        <h2 className="font-space-grotesk text-3xl md:text-5xl font-light tracking-tight text-[#DCA92A]">
          Our Portfolio
        </h2>
        <p className="text-neutral-400 font-light mt-2 max-w-md">
          A selection of brands we've built, transformed, and scaled.
        </p>
      </div>

      {/* 
        This container needs w-max so it can be as wide as its children combined. 
        It flexes items in a row.
      */}
      <div ref={containerRef} className="flex h-full items-center pt-24 px-8 md:px-16 gap-12 w-max relative z-20">
        {projects.map((proj) => (
          <div key={proj.id} className="w-[85vw] max-w-[700px] h-[65vh] bg-[#111]/80 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl shrink-0 group hover:border-[#DCA92A]/50 transition-colors duration-500">
            {/* Placeholder Image Area */}
            <div className="flex-1 bg-black/60 flex items-center justify-center border-b border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#DCA92A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="text-neutral-700 font-space-grotesk text-sm uppercase tracking-widest z-10">Image Placeholder</span>
            </div>
            {/* Info Area */}
            <div className="p-8 bg-[#0a0a0a]/90">
              <h3 className="font-space-grotesk text-2xl text-white font-medium mb-2">{proj.title}</h3>
              <p className="text-neutral-400 font-light leading-relaxed">{proj.desc}</p>
            </div>
          </div>
        ))}
        {/* Padding element at the end so the last card doesn't stick directly to the edge */}
        <div className="w-[8vw] shrink-0" />
      </div>
    </div>
  );
}
