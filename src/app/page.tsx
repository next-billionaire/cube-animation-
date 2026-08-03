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
        <div className="relative w-full h-screen bg-white z-20 overflow-hidden">
          <video 
            src="/video-project.mp4" 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted 
            playsInline 
          />
        </div>
      </MainContentWrapper>
    </>
  );
}
