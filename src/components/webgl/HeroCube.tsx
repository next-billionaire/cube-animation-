"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Text } from "@react-three/drei";

function BrandFace({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
  // A clean, bold font to closely match the brand typography
  const fontUrl = "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2";
  
  return (
    <group position={position} rotation={rotation}>
      {/* "brand" */}
      <Text
        position={[0, 0.12, 0]}
        fontSize={0.25}
        color="#050505"
        anchorX="center"
        anchorY="middle"
        font={fontUrl}
      >
        brand
      </Text>
      
      {/* "masala." container */}
      <group position={[0, -0.1, 0]}>
        <Text
          position={[-0.04, 0, 0]}
          fontSize={0.25}
          color="#050505"
          anchorX="center"
          anchorY="middle"
          font={fontUrl}
        >
          masala
        </Text>
        <Text
          position={[0.39, 0, 0]}
          fontSize={0.25}
          color="#DC2626" // Tailwind red-600
          anchorX="center"
          anchorY="middle"
          font={fontUrl}
        >
          .
        </Text>
      </group>
    </group>
  );
}

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
      {/* Pure white material that reacts beautifully to the directional light */}
      <meshStandardMaterial 
        color="#FFFFFF" 
        roughness={0.4} 
        metalness={0.1} 
      />
      
      {/* Front Face */}
      <BrandFace position={[0, 0, 0.501]} />

      {/* Back Face */}
      <BrandFace position={[0, 0, -0.501]} rotation={[0, Math.PI, 0]} />
    </mesh>
  );
}
