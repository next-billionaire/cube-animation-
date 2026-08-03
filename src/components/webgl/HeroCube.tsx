"use client";

import { useRef, useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceCard3D } from "./ServiceCard3D";

// Materials
const cubeMaterial = new THREE.MeshPhysicalMaterial({
  color: "#111111",
  metalness: 0.2,
  roughness: 0.8,
  clearcoat: 0.1,
  clearcoatRoughness: 0.2,
  side: THREE.DoubleSide,
});

// A single face that hinges along an edge
const CubeFace = forwardRef<THREE.Group, { 
  position: [number, number, number];
  rotation: [number, number, number];
  meshOffset: [number, number, number];
  name: string;
  serviceData: any;
}>(({ position, rotation, meshOffset, name, serviceData }, ref) => {
  return (
    <group ref={ref} position={position} rotation={rotation} name={name}>
      <mesh position={meshOffset} material={cubeMaterial} receiveShadow castShadow>
        <planeGeometry args={[2, 2]} />
        {/* The DOM Card attached to the inside face */}
        <ServiceCard3D data={serviceData} />
      </mesh>
    </group>
  );
});

CubeFace.displayName = "CubeFace";

export function HeroCube() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for the 6 faces
  const faceRefs = useRef<(THREE.Group | null)[]>([]);

  // Initial slow continuous rotation state
  const idleRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!groupRef.current) return;
    
    const ctx = gsap.context(() => {
      // 1. Initial fade in for the cube
      gsap.from(groupRef.current.position, {
        y: -5,
        duration: 2,
        ease: "power3.out",
        delay: 4.5, // After the intro finishes
      });

      // 2. The Unfolding Timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#services-section",
          start: "top bottom", 
          end: "top top",
          scrub: 1, // Smooth damping
        }
      });

      // Stop idle rotation and lock to isometric view, move closer
      tl.to(groupRef.current.rotation, {
        x: Math.PI / 6,
        y: -Math.PI / 4,
        z: 0,
        duration: 1,
        ease: "power2.inOut"
      }, 0);
      
      tl.to(groupRef.current.position, {
        z: 3, // Dolly in
        duration: 1,
        ease: "power2.inOut"
      }, 0);

      // 3. Mechanical unfolding of faces
      // Front (0), Back (1), Left (2), Right (3), Top (4), Bottom (5)
      // Front Face swings down
      tl.to(faceRefs.current[0]!.rotation, { x: Math.PI / 2, duration: 1, ease: "power2.inOut" }, 0.5);
      // Back Face swings down
      tl.to(faceRefs.current[1]!.rotation, { x: Math.PI / 2, duration: 1, ease: "power2.inOut" }, 0.6);
      // Left Face swings out
      tl.to(faceRefs.current[2]!.rotation, { z: -Math.PI / 2, duration: 1, ease: "power2.inOut" }, 0.7);
      // Right Face swings out
      tl.to(faceRefs.current[3]!.rotation, { z: Math.PI / 2, duration: 1, ease: "power2.inOut" }, 0.8);
      // Top Face swings up
      tl.to(faceRefs.current[4]!.rotation, { x: Math.PI / 2, duration: 1, ease: "power2.inOut" }, 0.9);
      // Bottom Face stays put or drops
      tl.to(faceRefs.current[5]!.position, { y: -2, duration: 1, ease: "power2.inOut" }, 1.0);

    });

    return () => ctx.revert();
  }, []);

  useFrame((state, delta) => {
    // Only apply idle rotation if we haven't scrolled down (ScrollTrigger handles rotation later)
    // We can check if scroll is at top, or just let GSAP override it if we use a proxy object.
    // To prevent fighting with GSAP, we only rotate if window.scrollY is low.
    if (window.scrollY < 100 && groupRef.current) {
      idleRotation.current.y += delta * 0.2;
      idleRotation.current.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      
      groupRef.current.rotation.y = idleRotation.current.y;
      groupRef.current.rotation.x = idleRotation.current.x;
    }
  });

  const services = [
    { title: "Branding", icon: "✨" }, // Front
    { title: "Content Creation", icon: "📸" }, // Back
    { title: "Mobile App Dev", icon: "📱" }, // Left
    { title: "Website Dev", icon: "💻" }, // Right
    { title: "Social Media", icon: "📱" }, // Top
    { title: "Performance", icon: "📈" } // Bottom
  ];

  return (
    <group ref={groupRef} name="hero-cube-group">
      <CubeFace 
        ref={(el) => { faceRefs.current[0] = el }}
        name="face-front"
        position={[0, -1, 1]} 
        rotation={[0, 0, 0]} 
        meshOffset={[0, 1, 0]} 
        serviceData={services[0]}
      />
      <CubeFace 
        ref={(el) => { faceRefs.current[1] = el }}
        name="face-back"
        position={[0, -1, -1]} 
        rotation={[0, Math.PI, 0]} 
        meshOffset={[0, 1, 0]} 
        serviceData={services[1]}
      />
      <CubeFace 
        ref={(el) => { faceRefs.current[2] = el }}
        name="face-left"
        position={[-1, -1, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        meshOffset={[0, 1, 0]}
        serviceData={services[2]} 
      />
      <CubeFace 
        ref={(el) => { faceRefs.current[3] = el }}
        name="face-right"
        position={[1, -1, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        meshOffset={[0, 1, 0]} 
        serviceData={services[3]}
      />
      <CubeFace 
        ref={(el) => { faceRefs.current[4] = el }}
        name="face-top"
        position={[0, 1, -1]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        meshOffset={[0, 1, 0]} 
        serviceData={services[4]}
      />
      <CubeFace 
        ref={(el) => { faceRefs.current[5] = el }}
        name="face-bottom"
        position={[0, -1, -1]} 
        rotation={[Math.PI / 2, 0, 0]} 
        meshOffset={[0, -1, 0]} 
        serviceData={services[5]}
      />
    </group>
  );
}
