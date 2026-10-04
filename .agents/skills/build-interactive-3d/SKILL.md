---
name: build-interactive-3d
description: Generates a modern tech landing page featuring an interactive WebGL 3D canvas hero, model viewer, and particle fields using React Three Fiber.
---

# Objective
Scaffold an advanced 3D interactive experience using Three.js, `@react-three/fiber`, and `@react-three/drei` tailored for AI startups, Web3 platforms, or hardware showcases.

# Workflow Instructions

1. **Canvas Architecture**:
   - Construct `src/components/animations/Hero3DCanvas.tsx` using `@react-three/fiber`.
   - Wrap interactive geometry inside `<Float>` and `<Suspense>`.
   - Implement mouse-tracking lerp inside `useFrame`.

2. **Performance Constraints**:
   - Enforce pixel ratio clamp `dpr={[1, 1.5]}` to protect mobile GPUs and laptops.
   - Provide a percentage loader skeleton while 3D assets download.

3. **Page Composition**:
   - Layer high-impact headline and CTAs over or alongside the 3D canvas with `z-10` glassmorphism.
   - Build 3-card tech architecture grid in `src/components/sections/FeatureGrid.tsx`.
   - Connect lead capture form in footer.
