"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import "./TopographicMaterial";

export function Background() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      {/* 
        Using viewport.width and viewport.height ensures 
        the plane perfectly covers the screen at z=0. 
      */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <topographicMaterial 
        ref={materialRef} 
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
