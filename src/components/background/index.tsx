"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./TopographicMaterial"; // Ensure it's imported and registered

export function Background() {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <topographicMaterial 
        ref={materialRef} 
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
