---
name: build-static-landing
description: Generates a high-converting, responsive 5-section static landing page based on client-spec.json, Zod form engine, and decoupled data contracts.
---

# Objective
Read `client-spec.json` and scaffold a production-ready, ultra-fast static landing page tailored for product waitlists, single events, or quick business launches.

# Workflow Instructions

1. **Ingest Intake Configuration**:
   - Read `client-spec.json` at root.
   - Extract `brand.name`, `brand.vibe`, `brand.tagline`, `contentSummaries`, and `leadCapture`.

2. **Apply Design Tokens**:
   - Follow `.agents/rules/design-tokens.md` according to `brand.vibe`.
   - Update Tailwind configuration and font imports.

3. **Populate Decoupled Content Layer (`src/data/`)**:
   - Write brand configuration to `src/data/siteConfig.ts`.
   - Populate `src/data/hero.ts` with compelling headlines using the AIDA framework.
   - Map 3 to 4 offering items into `src/data/offerings.ts` with matching Lucide icons.
   - Write FAQs into `src/data/faqs.ts`.

4. **Assemble Page Layout (`app/(site)/page.tsx`)**:
   - `Navbar`: Sticky blurred header with brand logo and CTA button.
   - `Hero`: High-impact headline, subline, primary CTA, background visual treatment.
   - `FeatureGrid`: 3-card grid highlighting core offerings with Lucide icons.
   - `ContactSection`: Contact form connected to `submitContactForm` server action.
   - `Footer`: Links, copyright, and social coordinates.

5. **Validation & Verification**:
   - Verify build passes: `npm run build`.
   - Ensure mobile menu functions properly.
