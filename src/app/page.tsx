import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        {/* Empty space so the cube floats freely initially */}
        <section className="w-full h-[150vh] flex flex-col justify-end pb-32 items-center pointer-events-none">
          <h1 className="text-4xl md:text-6xl text-white font-mono uppercase tracking-tighter opacity-0 translate-y-10" id="hero-title">
            The Ecosystem
          </h1>
        </section>

        {/* Services Section to scroll to */}
        <section id="services-section" className="w-full h-[200vh] relative z-10">
          <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start pt-32 pointer-events-none">
             <h2 className="text-3xl md:text-5xl text-white font-mono font-bold tracking-tight uppercase">
               Core Services
             </h2>
             <p className="text-white/60 mt-4 max-w-md text-center font-sans">
               Everything your brand needs under one roof.
             </p>
          </div>
        </section>
      </MainContentWrapper>
    </>
  );
}
