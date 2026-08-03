"use client";

import { Canvas } from "@react-three/fiber";
import { Background } from "@/components/background";

export function GlobalCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        // Explicitly requesting standard derivatives if possible via context attributes
        // but typically R3F handles it automatically.
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
