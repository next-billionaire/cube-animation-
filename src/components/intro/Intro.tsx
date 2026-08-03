"use client";

import { useEffect, useState } from "react";
import { useIntro } from "@/hooks/useIntro";
import { LogoReveal } from "./LogoReveal";
import { createIntroTimeline } from "@/animations/introTimeline";

export function Intro() {
  const { shouldPlayIntro, isReady, markIntroPlayed } = useIntro();
  const [timelineFinished, setTimelineFinished] = useState(false);

  useEffect(() => {
    if (isReady && shouldPlayIntro) {
      // Prevent body scrolling during intro
      document.body.style.overflow = "hidden";

      const tl = createIntroTimeline(() => {
        setTimelineFinished(true);
        markIntroPlayed();
        document.body.style.overflow = "";
      });

      return () => {
        tl.kill();
        document.body.style.overflow = "";
      };
    }
  }, [isReady, shouldPlayIntro, markIntroPlayed]);

  if (!isReady) return null; // Avoid hydration mismatch

  // If we shouldn't play the intro and timeline is not running, render nothing
  // The global layout will just render the Hero normally.
  if (!shouldPlayIntro) return null;

  // We keep the wrapper around if it hasn't finished, 
  // or it fades out in the timeline itself.
  if (timelineFinished) return null;

  return (
    <div className="intro-wrapper fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <LogoReveal />
    </div>
  );
}
