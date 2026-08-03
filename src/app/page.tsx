import { Intro } from "@/components/intro/Intro";
import { MainContentWrapper } from "@/components/layout/MainContentWrapper";

export default function Home() {
  return (
    <>
      <Intro />
      <MainContentWrapper>
        <div className="w-full min-h-screen"></div>
      </MainContentWrapper>
    </>
  );
}
