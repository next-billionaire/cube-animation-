"use client";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between pointer-events-auto">
      <div className="font-space-grotesk text-xl tracking-tight text-white uppercase font-bold flex flex-col leading-none">
        <span>BRAND</span>
        <span className="text-[#DCA92A]">MASALA<span className="text-[#FF3B30]">.</span></span>
      </div>
      <div 
        className="relative" 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="text-white/70 text-sm font-sans tracking-wide uppercase cursor-pointer py-2 hover:text-white transition-colors">
          Menu
        </div>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-black/90 border border-white/10 backdrop-blur-md rounded-lg p-2 flex flex-col gap-1 shadow-2xl">
            <button 
              onClick={() => scrollTo('home')} 
              className="text-left px-4 py-3 text-white/80 hover:text-[#DCA92A] hover:bg-white/5 rounded-md text-sm uppercase tracking-wide transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollTo('section1')} 
              className="text-left px-4 py-3 text-white/80 hover:text-[#DCA92A] hover:bg-white/5 rounded-md text-sm uppercase tracking-wide transition-colors"
            >
              Section 1
            </button>
            <button 
              onClick={() => scrollTo('section2')} 
              className="text-left px-4 py-3 text-white/80 hover:text-[#DCA92A] hover:bg-white/5 rounded-md text-sm uppercase tracking-wide transition-colors"
            >
              Section 2
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
