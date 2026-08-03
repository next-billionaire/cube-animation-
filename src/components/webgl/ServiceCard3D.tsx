"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";

export function ServiceCard3D({ data }: { data: any }) {
  const [hovered, setHovered] = useState(false);

  return (
    // We offset the Html slightly inside the cube so it doesn't z-fight with the face
    <Html
      transform
      position={[0, 0, -0.01]} // Positioned just behind the mesh surface (inside)
      rotation={[0, Math.PI, 0]} // Flipped so it faces inside the cube
      occlude="blending" // Hides the HTML when behind other 3D objects
      style={{
        transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        transform: hovered ? "scale(1.05) translateZ(10px)" : "scale(1)",
      }}
    >
      <div 
        className="service-card flex flex-col items-center justify-center w-64 h-64 p-6 rounded-2xl cursor-pointer pointer-events-auto"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: hovered 
            ? "0 20px 40px -10px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)" 
            : "0 10px 30px -10px rgba(0,0,0,0.5)",
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => console.log(`Clicked ${data.title}`)}
      >
        <span className="text-4xl mb-4 opacity-80">{data.icon}</span>
        <h3 className="text-white text-center text-xl font-medium tracking-wide">
          {data.title}
        </h3>
        
        {/* Subtle glow effect on hover */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
            opacity: hovered ? 1 : 0
          }}
        />
      </div>
    </Html>
  );
}
