# 3D Interactive Canvas & Model Viewer (Three.js + R3F)

## 1. Executive Summary
Modern tech companies, creative agencies, and luxury hardware products frequently demand interactive 3D components in their hero sections (e.g., interactive 3D logos, floating particle nebulas, or rotatable GLTF/GLB product models). 

This module provides a declarative **React Three Fiber (R3F)** and **Three.js** canvas architecture engineered for 60fps performance, battery conservation, and mobile responsiveness.

---

## 2. Tech Stack & Dependencies

| Library | Purpose | Rationale |
| :--- | :--- | :--- |
| **`three`** | WebGL graphics engine | Industry standard 3D library |
| **`@react-three/fiber` (R3F)** | React renderer for Three.js | Declarative, reactive scene graphs with automatic state binding |
| **`@react-three/drei`** | Helper primitives & loaders | Production-ready orbit controls, float wrappers, and GLTF model loaders |

---

## 3. High-Performance Interactive 3D Hero Canvas

### 3.1 Interactive Floating Mesh Component (`src/components/animations/FloatingScene.tsx`)
```typescript
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Html, useProgress } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-sky-400 font-mono text-xs uppercase tracking-widest bg-slate-950/80 px-4 py-2 rounded-full border border-sky-500/20 backdrop-blur-md">
        Loading 3D Engine &bull; {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function AnimatedMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Mouse tracking with smooth linear interpolation (lerp)
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 6;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#38bdf8"
          roughness={0.15}
          metalness={0.8}
          distort={0.4}
          speed={2.5}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3DCanvas() {
  return (
    <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        // Performance guard: Clamp DPR between 1 and 1.5 to prevent GPU melting on 4K retina displays
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#818cf8" />
        
        <Suspense fallback={<Loader />}>
          <AnimatedMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

---

## 4. Architectural GLTF/GLB Model Viewer

For real estate villa models or boutique merchandise showcases, load optimized binary GLTF files with automated camera positioning:

```typescript
"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Center } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function ModelViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-[500px] bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden relative">
      <Canvas shadows camera={{ position: [4, 2, 5], fov: 50 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Center>
              <Model url={modelUrl} />
            </Center>
          </Stage>
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={true} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1 rounded border border-slate-800 pointer-events-none">
        Drag to Orbit &bull; Scroll to Zoom
      </div>
    </div>
  );
}
```

---

## 5. Mobile & Battery Optimization Rules

1. **Pixel Ratio Clamping**: Always configure `dpr={[1, 1.5]}`. Never use unbounded window pixel ratio (`dpr={window.devicePixelRatio}`), which forces 3x rendering on iPhones and overheats devices.
2. **Intersection Invalidation**: Use `frameloop="demand"` or pause R3F rendering when the canvas scrolls out of the active browser viewport using `IntersectionObserver`.
3. **Texture Compression**: Convert all `.glb` textures to KTX2 / Basis Universal compression to reduce download payload from 50MB to <3MB.
