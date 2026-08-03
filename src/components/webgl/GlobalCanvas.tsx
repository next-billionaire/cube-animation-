"use client";

import { Canvas } from "@react-three/fiber";
import { Background } from "@/components/background";

export function GlobalCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <Background />
      </Canvas>
    </div>
  );
}
