"use client";

import { useIntro } from "@/hooks/useIntro";
import { ReactNode } from "react";

export function MainContentWrapper({ children }: { children: ReactNode }) {
  const { isReady, shouldPlayIntro } = useIntro();

  // During SSR and before we know if the intro should play, 
  // we assume it will play to prevent flashing the hero content.
  const isHidden = !isReady || shouldPlayIntro;

  return (
    <div
      id="main-content"
      style={{
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? "translateY(100vh)" : "translateY(0)",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
