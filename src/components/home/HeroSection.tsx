"use client";

import { useEffect, useRef, useState } from "react";
import { globalScrollState } from "@/store/scrollState";

const callouts = [
  {title1:'SOCIAL MEDIA', title2:'MARKETING', sub:'ENGAGE. INFLUENCE. GROW.', side:'left', top:16, color:'#00E5FF', icon:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path><line x1="8" y1="12" x2="8.01" y2="12"></line><line x1="12" y1="12" x2="12.01" y2="12"></line><line x1="16" y1="12" x2="16.01" y2="12"></line>'},
  {title1:'BRANDING', title2:'', sub:'DEFINE. DESIGN. DIFFERENTIATE.', side:'left', top:34, color:'#FFB300', icon:'<polygon points="2 22 22 22 18 11 12 16 6 11"></polygon><path d="M6 11l-4 6v5"></path><path d="M18 11l4 6v5"></path>'},
  {title1:'DIGITAL', title2:'MARKETING', sub:'REACH. CONVERT. SCALE.', side:'left', top:54, color:'#FF00FF', icon:'<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>'},
  {title1:'PERFORMANCE', title2:'MARKETING', sub:'DATA-DRIVEN. ROI FOCUSED.', side:'left', top:74, color:'#00FFCC', icon:'<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>'},
  {title1:'SEO', title2:'', sub:'RANK HIGHER. GET FOUND.', side:'right', top:16, color:'#39FF14', icon:'<circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><polyline points="8 12 10 10 12 12 14 8"></polyline>'},
  {title1:'WEBSITE', title2:'DEVELOPMENT', sub:'FAST. RESPONSIVE. RESULTS.', side:'right', top:34, color:'#B700FF', icon:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><polyline points="8 13 6 15 8 17"></polyline><polyline points="16 13 18 15 16 17"></polyline><line x1="13" y1="13" x2="11" y2="17"></line>'},
  {title1:'APP', title2:'DEVELOPMENT', sub:'INNOVATIVE. INTUITIVE. IMPACTFUL.', side:'right', top:54, color:'#FF8C00', icon:'<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'},
  {title1:'CONTENT', title2:'CREATION', sub:'CREATE. CONNECT. COMMUNICATE.', side:'right', top:74, color:'#FF0033', icon:'<path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>'}
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const start = rect.top; 
      const distance = rect.height - window.innerHeight;
      const raw = -start / distance;
      const progress = Math.max(0, Math.min(1, raw));
      
      globalScrollState.targetProgress = progress;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync DOM with the smoothed progress at 60fps
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      // Only trigger a re-render if the value actually changed significantly
      setP((prev) => {
        const curr = globalScrollState.currentProgress;
        return Math.abs(prev - curr) > 0.001 ? curr : prev;
      });
      frameId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Easing and mapping functions
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const mapRange = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

  // --- Phase 1: Hero ---
  // Starts fully visible, fades out as you scroll down
  const heroFadeOut = smooth(mapRange(p, 0.2, 0.3));
  const heroOpacity = 1 - heroFadeOut;
  const heroTransform = `translateX(${-70 * heroFadeOut}px)`;

  // --- Phase 2: Statement ---
  // Fades in after Hero, then fades out before Services
  const stIn = smooth(mapRange(p, 0.3, 0.4));
  const stOut = smooth(mapRange(p, 0.55, 0.65));
  const stOpacity = stIn * (1 - stOut);
  const stTransform = `translateY(${40 * (1 - stIn)}px)`;
  const badgeTransform = `translateY(${-10 * (1 - stIn)}px)`;

  // --- Phase 3: Services / Open Cube ---
  const openAmt = smooth(mapRange(p, 0.65, 0.9));

  return (
    <section ref={containerRef} className="relative w-full z-10" style={{ height: "300vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Phase 1: Hero */}
        <div className="absolute inset-0 flex items-center justify-start pl-[8vw]">
          <div 
            className="max-w-[640px]"
            style={{ opacity: heroOpacity, transform: heroTransform }}
          >
            <span className="block mb-6 font-space-grotesk uppercase tracking-widest text-sm text-neutral-400">
              Brand Masala <em className="text-yellow-500 not-italic">—</em> Studio
            </span>
            <h1 className="font-space-grotesk font-light text-[clamp(30px,4.6vw,58px)] leading-[1.12] tracking-tighter text-white">
              We add the <span className="text-[#F7B500] italic" style={{ textShadow: "0 0 20px rgba(247,181,0,0.5)" }}>masala</span><br/>to your marketing.
            </h1>
            <p className="mt-6 text-[15px] leading-[1.6] text-neutral-400 max-w-[420px] font-light">
              Social media, websites, apps &amp; content — all under one roof.
            </p>
          </div>
        </div>

        {/* Phase 2: Statement */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <span 
            className="absolute top-[14%] left-[8vw] text-[11px] tracking-[.22em] uppercase text-[#F7B500] border border-[#F7B500]/40 py-2 px-4 rounded-full"
            style={{ opacity: stOpacity, transform: badgeTransform }}
          >
            Estd in 2024
          </span>
          <div style={{ opacity: stOpacity, transform: stTransform }}>
            <h2 className="font-space-grotesk font-light text-[clamp(28px,5.6vw,66px)] leading-[1.16] max-w-[900px] text-white">
              To build brands<br/>that <em className="italic text-[#F7B500]">matter</em>.
            </h2>
            <p className="mt-6 mx-auto text-[15px] leading-[1.6] text-neutral-400 max-w-[420px] font-light">
              We boost your brand by
            </p>
          </div>
        </div>

        {/* Phase 3: Services Callouts */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {callouts.map((def, i) => {
              const start = 0.08 + i * 0.07;
              const t = smooth(mapRange(openAmt, start, start + 0.28));
              
              const isLeft = def.side === 'left';
              // Convert vh to px for math
              const yShiftBase = 50 - def.top; 
              
              return (
                <div 
                  key={i}
                  className="absolute flex flex-col"
                  style={{
                    top: `${def.top}%`,
                    left: isLeft ? '8vw' : 'auto',
                    right: !isLeft ? '8vw' : 'auto',
                    opacity: t,
                    // Explode OUT from the center box
                    transform: `translate(${isLeft ? 35 * (1-t) : -35 * (1-t)}vw, ${(50 - def.top) * (1-t)}vh) scale(${0.3 + 0.7*t})`
                  }}
                >
                  <div className={`flex items-center gap-4 ${!isLeft ? 'flex-row-reverse text-right' : ''}`}>
                    <div className="flex items-center justify-center shrink-0">
                      <svg 
                        width="28" height="28" viewBox="0 0 24 24" fill="none" 
                        stroke={def.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                        style={{ filter: `drop-shadow(0 0 6px ${def.color})` }}
                        dangerouslySetInnerHTML={{ __html: def.icon }}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[16px] font-extrabold italic tracking-[0.02em] uppercase whitespace-nowrap text-white">
                        <span>{def.title1}</span> <span style={{ color: def.color }}>{def.title2}</span>
                      </div>
                      <div className="text-[10px] text-white/60 whitespace-nowrap font-medium tracking-[0.04em] uppercase">
                        {def.sub}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[10px] tracking-[.25em] uppercase text-neutral-500 flex flex-col items-center gap-2">
          <span>Scroll</span>
          <div className="w-[1px] h-9 bg-gradient-to-b from-[#F7B500] to-transparent opacity-50 animate-pulse"></div>
        </div>

      </div>
    </section>
  );
}
