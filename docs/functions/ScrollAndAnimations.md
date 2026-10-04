# Scroll & Cinematic Animations (GSAP + Lenis + Framer Motion)

## 1. Executive Summary
High-end agency websites, luxury fashion brands, and design studios require cinematic motion to establish prestige and justify premium pricing ($1,500–$3,500+). 

This module delivers a battle-tested animation architecture combining:
- **Lenis Smooth Scroll**: Normalized, momentum-based scrolling that eliminates browser scroll stutters.
- **GSAP & ScrollTrigger**: Hardware-accelerated pinned horizontal scrubs, image parallax, and scroll-linked progress indicators.
- **Framer Motion**: Micro-interactions, button hover states, drawer slide-overs, and route view transitions.
- **Mobile Responsive Degradation**: Automatically switches off pinning and heavy scrubs on mobile devices (`< 768px`) to prevent scroll jank and iOS Safari address-bar jitter.

---

## 2. Tech Stack & Dependencies

| Package | Purpose | Advantage |
| :--- | :--- | :--- |
| **`lenis`** (`@studio-freight/lenis`) | Momentum smooth scroll | Ultra-lightweight, 60fps smoothness, perfect ScrollTrigger synchronization |
| **`gsap`** | Core animation tween engine | Sub-millisecond execution, GPU hardware acceleration |
| **`@gsap/react`** | React hooks (`useGSAP`) | Automatic cleanup and context isolation on component unmount |
| **`framer-motion`** | Declarative UI animations | Smooth entry/exit animations, hover dynamics, layout animations |

---

## 3. Smooth Scroll Provider (`src/components/animations/SmoothScrollProvider.tsx`)

The root layout wraps all site pages in a client provider that boots Lenis and binds it to GSAP's ticker:

```typescript
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis with GSAP's internal 60fps ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0); // Prevent animation snapping on heavy tab switching

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
```

---

## 4. Reusable Animation Components

### 4.1 Parallax Image Wrapper
Scans the viewport and creates a gentle optical depth effect as the user scrolls past:

```typescript
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ParallaxImage({ children, speed = 0.2 }: { children: React.ReactNode; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only enable parallax on desktop to preserve mobile battery & performance
    if (window.innerWidth < 768) return;

    gsap.to(targetRef.current, {
      yPercent: 30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="overflow-hidden relative">
      <div ref={targetRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
```

### 4.2 Pinned Horizontal Narrative Section
Pins the entire screen in place while the user scrolls through a horizontal sequence of case studies or architectural renderings:

```typescript
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function HorizontalNarrative({ slides }: { slides: { title: string; image: string; desc: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.innerWidth < 1024) return; // Retain normal vertical card stack on tablets/mobile

    const track = trackRef.current;
    if (!track) return;

    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-slate-950 py-20">
      <div ref={trackRef} className="flex flex-col lg:flex-row gap-8 px-6 lg:px-20 w-fit">
        {slides.map((s, idx) => (
          <div key={idx} className="w-full lg:w-[70vw] h-[75vh] flex-shrink-0 bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col justify-end relative overflow-hidden">
            <img src={s.image} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
            <div className="relative z-10 max-w-lg">
              <span className="text-sky-400 font-mono text-sm uppercase">Phase 0{idx + 1}</span>
              <h3 className="text-3xl font-extrabold text-white mt-2">{s.title}</h3>
              <p className="text-slate-300 text-sm mt-3">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 5. Performance & Mobile Best Practices

1. **`will-change: transform`**: Applied selectively only during active scrolling to prevent excessive GPU memory consumption.
2. **Context Cleanup**: Always wrap animations in `useGSAP()` or explicit `cleanup()` returns to avoid memory leaks during client-side navigation.
3. **Reduced Motion Support**: Inspect `window.matchMedia("(prefers-reduced-motion: reduce)")` to disable large translate effects for users with vestibular sensitivities.
