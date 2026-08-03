import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { HeroSection } from "@/components/home/HeroSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";

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

        {/* Third Section - Horizontal Scroll Portfolio */}
        <PortfolioSection />
      </MainContentWrapper>
    </>
  );
}
