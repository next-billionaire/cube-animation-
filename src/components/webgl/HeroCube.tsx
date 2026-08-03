"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, BoxGeometry, MeshPhysicalMaterial, Points, PointLight, LineBasicMaterial } from "three";
import { Text, Edges } from "@react-three/drei";
import { globalScrollState } from "@/store/scrollState";

export function HeroCube() {
  const groupRef = useRef<Group>(null);
  
  const coreRef = useRef<Mesh>(null);
  const topPanelRef = useRef<Mesh>(null);
  const bottomPanelRef = useRef<Mesh>(null);
  const leftPanelRef = useRef<Mesh>(null);
  const rightPanelRef = useRef<Mesh>(null);
  
  const particlesRef = useRef<Points>(null);
  const coreLightRef = useRef<PointLight>(null);

  // Geometries for the 5 pieces
  const coreGeo = useMemo(() => new BoxGeometry(1.9, 1.9, 1.9), []);
  const topBottomGeo = useMemo(() => new BoxGeometry(2.1, 0.1, 2.1), []);
  const leftRightGeo = useMemo(() => new BoxGeometry(0.1, 1.9, 2.1), []);
  
  // Materials: Glossy dark glass/obsidian
  const darkGlossMat = useMemo(() => new MeshPhysicalMaterial({
    color: 0x050505,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  }), []);

  // Golden glowing edges
  const goldEdgeMat = useMemo(() => new LineBasicMaterial({
    color: 0xF7B500,
    transparent: true,
    opacity: 0.8,
    linewidth: 2,
  }), []);

  // Particles (dust/sparks)
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 700 ? 150 : 400;
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

    // Apply "scrub: 1" style momentum for buttery smoothness
    globalScrollState.currentProgress += (globalScrollState.targetProgress - globalScrollState.currentProgress) * 0.08;
    const p = globalScrollState.currentProgress;
    
    // Cube X Position (Starts right, moves center)
    const moveCenterProgress = smooth(mapRange(p, 0.2, 0.3));
    const cubeX = 1.7 * (1 - moveCenterProgress);

    // Open Amount (Splits open between p=0.65 and 0.9)
    const openAmt = smooth(mapRange(p, 0.65, 0.9));

    // Rotation
    autoRotY.current += 0.0032;
    const targetRotY = autoRotY.current + pointer.x * 0.5;
    const targetRotX = pointer.y * 0.3;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.06;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.06;

    // Sync horizontal position
    groupRef.current.position.x = cubeX;

    // Explode the shell panels
    const openDist = openAmt * 1.2;
    if (topPanelRef.current) topPanelRef.current.position.y = 1.0 + openDist;
    if (bottomPanelRef.current) bottomPanelRef.current.position.y = -1.0 - openDist;
    if (leftPanelRef.current) leftPanelRef.current.position.x = -1.0 - openDist;
    if (rightPanelRef.current) rightPanelRef.current.position.x = 1.0 + openDist;

    // Light up the core
    if (coreLightRef.current) {
      coreLightRef.current.intensity = 1.0 + openAmt * 5.0;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#F7B500" />
      
      {/* Golden sparks/particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#F7B500" size={0.03} transparent opacity={0.6} sizeAttenuation />
      </points>

      <group ref={groupRef} position={[1.7, 0, 2]}>
        
        {/* Inner Glowing Core */}
        <mesh ref={coreRef} geometry={coreGeo} material={darkGlossMat}>
          <Edges geometry={coreGeo} material={goldEdgeMat} />
          
          <group position={[0, -0.05, 0.96]}>
            <Text position={[0, 0.3, 0]} fontSize={0.3} color="#FFFFFF" fontWeight={700}>brand</Text>
            <Text position={[0, 0.05, 0]} fontSize={0.3} color="#F7B500" fontWeight={700}>masala.</Text>
            <Text position={[0, -0.25, 0]} fontSize={0.08} color="#A0A0A0" letterSpacing={0.1}>A BRAND CONSULTANCY FIRM</Text>
          </group>
        </mesh>

        <pointLight ref={coreLightRef} color="#F7B500" intensity={1.0} distance={5} position={[0,0,1]} />

        {/* Outer Shell Panels */}
        <mesh ref={topPanelRef} geometry={topBottomGeo} material={darkGlossMat} position={[0, 1.0, 0]}>
          <Edges geometry={topBottomGeo} material={goldEdgeMat} />
        </mesh>

        <mesh ref={bottomPanelRef} geometry={topBottomGeo} material={darkGlossMat} position={[0, -1.0, 0]}>
          <Edges geometry={topBottomGeo} material={goldEdgeMat} />
        </mesh>

        <mesh ref={leftPanelRef} geometry={leftRightGeo} material={darkGlossMat} position={[-1.0, 0, 0]}>
          <Edges geometry={leftRightGeo} material={goldEdgeMat} />
        </mesh>

        <mesh ref={rightPanelRef} geometry={leftRightGeo} material={darkGlossMat} position={[1.0, 0, 0]}>
          <Edges geometry={leftRightGeo} material={goldEdgeMat} />
        </mesh>

      </group>
    </group>
  );
}
