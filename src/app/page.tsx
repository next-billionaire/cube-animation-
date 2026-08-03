import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        <HeroSection />
        {/* We keep this block for subsequent sections to pad out scroll if needed, but HeroSection is 300vh */}
        <div className="w-full h-screen"></div>
      </MainContentWrapper>
    </>
  );
}
