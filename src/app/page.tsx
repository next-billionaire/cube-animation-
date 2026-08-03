import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        <HeroSection />
        {/* Next Section - Clean White Page */}
        <div className="relative w-full min-h-screen bg-white z-20 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-6xl aspect-video bg-black/5 rounded-2xl overflow-hidden shadow-2xl">
            <video 
              src="/video-project.mp4" 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline 
            />
          </div>
        </div>
      </MainContentWrapper>
    </>
  );
}
