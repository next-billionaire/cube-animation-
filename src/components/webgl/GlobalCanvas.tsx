"use client";

import { Canvas } from "@react-three/fiber";
import { Background } from "@/components/background";
import { HeroCube } from "./HeroCube";

export function GlobalCanvas() {
  return (
    <div 
      id="canvas-container"
      className="fixed inset-0 w-full h-full -z-10"
      style={{ pointerEvents: "none" }} // Container ignores pointer events so you can scroll
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true, // Need anti-aliasing for the 3D cube edges
          powerPreference: "high-performance",
          alpha: true,
        }}
        dpr={[1, 2]}
        // Route events from the document body to the canvas for 3D interactions
        // while the canvas itself stays pointer-events: none
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <spotLight 
          position={[-10, -10, -10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={0.5} 
        />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />

        <HeroCube />
        <Background />
      </Canvas>
    </div>
  );
}
