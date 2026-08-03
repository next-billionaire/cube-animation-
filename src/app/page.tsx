import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        <HeroSection />
        {/* Next Section - Clean White Page with Full-Bleed Video */}
        <div id="section1" className="relative w-full h-screen bg-white z-20 overflow-hidden">
          <video 
            src="/video-project.mp4" 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        </div>

        {/* Third Section */}
        <div id="section2" className="relative w-full min-h-screen bg-[#111] z-20 flex flex-col items-center justify-center p-8 text-white border-t border-white/10">
          <h2 className="font-space-grotesk text-4xl md:text-6xl font-light tracking-tight mb-4 text-[#DCA92A]">
            Section 2
          </h2>
          <p className="text-neutral-400 font-light max-w-md text-center leading-relaxed">
            Welcome to the third page of the experience. The journey continues.
          </p>
        </div>
      </MainContentWrapper>
    </>
  );
}
