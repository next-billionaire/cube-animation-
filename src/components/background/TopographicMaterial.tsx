"use client";

import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { topographicVertexShader, topographicFragmentShader } from "@/shaders/topographic";

export const TopographicMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorBg: new THREE.Color("#FFFFFF"),
    uColorLine: new THREE.Color("#E5E2DB"),
  },
  topographicVertexShader,
  topographicFragmentShader
);

extend({ TopographicMaterial });

// Add types for TypeScript
import { ReactThreeFiber } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    topographicMaterial: any;
  }
}
