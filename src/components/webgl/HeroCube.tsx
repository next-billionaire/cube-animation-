"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, BoxGeometry, MeshPhysicalMaterial, Points, PointLight, MeshBasicMaterial } from "three";
import { Text } from "@react-three/drei";
import { globalScrollState } from "@/store/scrollState";

export function HeroCube() {
  const groupRef = useRef<Group>(null);
  const topHalfRef = useRef<Mesh>(null);
  const bottomHalfRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);
  const coreLightRef = useRef<PointLight>(null);
  const glowMatRef = useRef<MeshBasicMaterial>(null);

  // Geometry
  const halfGeo = useMemo(() => new BoxGeometry(2, 0.98, 2), []);
  
  // Materials
  const faceMats = useMemo(() => [
    new MeshPhysicalMaterial({color: 0xF7B500, transparent:true, opacity:0.12, roughness:0.1, metalness:0.3}),
    new MeshPhysicalMaterial({color: 0xFF3B30, transparent:true, opacity:0.12, roughness:0.1, metalness:0.3}),
    new MeshPhysicalMaterial({color: 0x111111, transparent:true, opacity:0.15, roughness:0.1, metalness:0.5}),
    new MeshPhysicalMaterial({color: 0x111111, transparent:true, opacity:0.15, roughness:0.1, metalness:0.5}),
    new MeshPhysicalMaterial({color: 0x000000, transparent:true, opacity:0.02, roughness:0.1, metalness:0.5}),
    new MeshPhysicalMaterial({color: 0x222222, transparent:true, opacity:0.15, roughness:0.1, metalness:0.5})
  ], []);

  // Particles
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 700 ? 260 : 650;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount; i++) {
      pos[i*3] = (Math.random()-0.5)*18;
      pos[i*3+1] = (Math.random()-0.5)*10;
      pos[i*3+2] = (Math.random()-0.5)*10 - 2;
    }
    return pos;
  }, [particleCount]);

  // Pointer State
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const autoRotY = useRef(0);

  // Helper for smooth easing
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const mapRange = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Read global state (0 to 1)
    const p = globalScrollState.heroProgress;
    
    // Cube X Position
    // Starts at 1.7 (right side). Moves to 0 (center) between p=0.2 and p=0.3
    const moveCenterProgress = smooth(mapRange(p, 0.2, 0.3));
    const cubeX = 1.7 * (1 - moveCenterProgress);

    // Open Amount
    // Splits open between p=0.65 and 0.9
    const openAmt = smooth(mapRange(p, 0.65, 0.9));

    autoRotY.current += 0.0032;
    const targetRotY = autoRotY.current + pointer.x * 0.5;
    const targetRotX = pointer.y * 0.3;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;

    // Shift cube horizontally
    groupRef.current.position.x += (cubeX - groupRef.current.position.x) * 0.09;

    // Split the cube
    const openDist = openAmt * 0.9;
    if (topHalfRef.current && bottomHalfRef.current) {
      topHalfRef.current.position.y = 0.5 + openDist;
      bottomHalfRef.current.position.y = -0.5 - openDist;
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2.0 + openAmt * 3.2;
    }

    if (glowMatRef.current) {
      glowMatRef.current.opacity = openAmt * 0.5;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <>
      <ambientLight color={0x1a1408} intensity={1.2} />
      <pointLight ref={coreLightRef} color={0xF7B500} intensity={2.4} distance={12} decay={2} position={[0,0,0]} />
      <pointLight color={0xFF3B30} intensity={0.5} distance={14} position={[-4,-2,3]} />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={0xFAFAFA} size={0.018} transparent opacity={0.55} sizeAttenuation={true} />
      </points>

      <group ref={groupRef}>
        {/* Top Half */}
        <mesh ref={topHalfRef} geometry={halfGeo} material={faceMats} position={[0, 0.5, 0]}>
          <lineSegments>
            <edgesGeometry attach="geometry" args={[halfGeo]} />
            <lineBasicMaterial attach="material" color={0xF7B500} transparent opacity={0.95} />
          </lineSegments>
          <lineSegments scale={1.06}>
            <edgesGeometry attach="geometry" args={[halfGeo]} />
            <lineBasicMaterial attach="material" color={0xF7B500} transparent opacity={0.25} />
          </lineSegments>
          
          <group position={[0, -0.1, 1.01]}>
            <Text position={[-0.55, 0, 0]} fontSize={0.28} color="#FFFFFF" fontWeight={700}>brand</Text>
            <Text position={[0.55, 0, 0]} fontSize={0.28} color="#F7B500" fontWeight={700}>masala.</Text>
          </group>
        </mesh>

        {/* Bottom Half */}
        <mesh ref={bottomHalfRef} geometry={halfGeo} material={faceMats} position={[0, -0.5, 0]}>
          <lineSegments>
            <edgesGeometry attach="geometry" args={[halfGeo]} />
            <lineBasicMaterial attach="material" color={0xF7B500} transparent opacity={0.95} />
          </lineSegments>
          <lineSegments scale={1.06}>
            <edgesGeometry attach="geometry" args={[halfGeo]} />
            <lineBasicMaterial attach="material" color={0xF7B500} transparent opacity={0.25} />
          </lineSegments>
        </mesh>

        {/* Glow Plane */}
        <mesh rotation={[-Math.PI/2, 0, 0]}>
          <planeGeometry args={[1.9, 1.9]} />
          <meshBasicMaterial ref={glowMatRef} color={0xF7B500} transparent opacity={0} />
        </mesh>
      </group>
    </>
  );
}
