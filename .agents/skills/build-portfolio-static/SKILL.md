---
name: build-portfolio-static
description: Generates a creative portfolio microsite featuring bento-grid case studies, bio highlights, skill badges, and contact drawer.
---

# Objective
Scaffold a modern, high-converting portfolio website for designers, developers, photographers, or agency consultants.

# Workflow Instructions

1. **Bento-Grid Composition**:
   - Construct asymmetric bento-box grid displaying featured projects with hover overlays.
   - Include quick stat counters (e.g. "50+ Projects Launched", "99.9% Uptime").

2. **Decoupled Data Layer**:
   - Store projects, case study summaries, and tech stacks in `src/data/offerings.ts`.
   - Store testimonials and endorsements in `src/data/testimonials.ts`.

3. **Lead Capture**:
   - Embed quick contact section or modal calling `submitContactForm`.
