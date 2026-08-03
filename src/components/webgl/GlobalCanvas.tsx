"use client";

import { Canvas } from "@react-three/fiber";
import { Background } from "@/components/background";
import { HeroCube } from "./HeroCube";

export function GlobalCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Background />
        <HeroCube />
      </Canvas>
    </div>
  );
}
