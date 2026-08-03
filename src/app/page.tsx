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
        <div className="relative w-full min-h-screen bg-white z-20 flex flex-col items-center justify-center p-8 text-black">
          <h2 className="font-space-grotesk text-4xl md:text-6xl font-light tracking-tight mb-4">
            Next Chapter
          </h2>
          <p className="text-neutral-500 font-light max-w-md text-center leading-relaxed">
            This is a clean, full white page. The dark 3D world has been smoothly scrolled away above us.
          </p>
        </div>
      </MainContentWrapper>
    </>
  );
}
