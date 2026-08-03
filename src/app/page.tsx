import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      {/* Scrollable empty space to demonstrate Lenis and the fixed background */}
      <section className="h-[200vh] w-full" />
    </>
  );
}
