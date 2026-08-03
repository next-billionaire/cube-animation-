"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export function HeroCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe={true} 
        transparent 
        opacity={0.8}
      />
    </mesh>
  );
}
