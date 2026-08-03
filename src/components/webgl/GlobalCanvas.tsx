"use client";

import { Canvas } from "@react-three/fiber";
import { Background } from "@/components/background";
import { HeroCube } from "./HeroCube";

export function GlobalCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        <Background />
        <HeroCube />
      </Canvas>
    </div>
  );
}
