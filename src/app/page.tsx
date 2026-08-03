import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        <Hero />
        {/* Scrollable empty space to demonstrate Lenis and the fixed background */}
        <section className="h-[200vh] w-full" />
      </MainContentWrapper>
    </>
  );
}
