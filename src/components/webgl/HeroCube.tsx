"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

export function HeroCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 2]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Solid premium white material */}
      <meshStandardMaterial 
        color="#FFFFFF" 
        roughness={0.1} 
        metalness={0.8} 
      />
      
      {/* Front Face */}
      <Text
        position={[0, 0, 0.501]}
        fontSize={0.18}
        color="#050505"
        anchorX="center"
        anchorY="middle"
      >
        Brand masala.
      </Text>

      {/* Back Face (rotated 180 degrees around Y) */}
      <Text
        position={[0, 0, -0.501]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.18}
        color="#050505"
        anchorX="center"
        anchorY="middle"
      >
        Brand masala.
      </Text>
    </mesh>
  );
}
