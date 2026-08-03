"use client";

import { useState, useEffect } from "react";

export function useIntro() {
  const [shouldPlayIntro, setShouldPlayIntro] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    // Check if the intro has already been played in this session
    const hasPlayed = sessionStorage.getItem("introPlayed");
    
    if (!hasPlayed) {
      setShouldPlayIntro(true);
      // We don't set it to true immediately here, we let the intro component set it 
      // after it finishes, but to prevent double renders, we just know it should play.
    }
    
    setIsReady(true);
  }, []);

  const markIntroPlayed = () => {
    sessionStorage.setItem("introPlayed", "true");
  };

  return { shouldPlayIntro, isReady, markIntroPlayed };
}
