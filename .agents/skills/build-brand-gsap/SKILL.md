---
name: build-brand-gsap
description: Generates an interactive, brand-focused landing page with GSAP ScrollTrigger animations, smooth scrolling (Lenis), and editorial typography.
---

# Objective
Scaffold a high-interaction, luxury agency or architectural website featuring momentum smooth scrolling, pinned storytelling sequences, and parallax visual depth.

# Workflow Instructions

1. **Provider Setup**:
   - Wrap `app/(site)/layout.tsx` in `<SmoothScrollProvider>`.
   - Register `ScrollTrigger` and tie into the Lenis scroll loop.

2. **Typography & Styling**:
   - Apply editorial serif typography (Cormorant Garamond / Playfair Display) paired with Plus Jakarta Sans.
   - Use high-contrast obsidian backgrounds (`#0F0F11`) with champagne gold or lime accents.

3. **Motion Architecture**:
   - Hero: Parallax scroll on background image using `gsap.to(..., { yPercent: 20 })`.
   - Narrative Section: 3-slide horizontal card scrub pinned with `ScrollTrigger.create({ pin: true, scrub: 1 })`.
   - Staggered split-text reveals on value proposition headers.

4. **Data Contract Compliance**:
   - Populate showcase cards in `src/data/offerings.ts`.
   - The UI components in `src/components/sections/` must only read and iterate over this data.

5. **Form Integration**:
   - Place a dark-mode VIP access inquiry form in the footer calling `submitContactForm`.
