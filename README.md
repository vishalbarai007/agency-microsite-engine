# Agency Microsite Engine 🚀

A production-ready starter engine and autonomous AI agent framework designed for agencies to deliver high-converting micro-websites (landing pages, portfolios, real estate showcases, 3D experiences, and lightweight CMS/e-commerce sites) in **5 to 7 days flat**.

[![Documentation Portal](https://img.shields.io/badge/Docs_Portal-Open_Darkmode_Hub-38bdf8?style=for-the-badge)](./docs/index.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-34d399?style=for-the-badge)](LICENSE)

---

## 💡 Why This Engine Exists
Traditional agency web projects stall because of endless client revisions, unstructured content handoffs, and cumbersome CMS setups. 

This engine eliminates those bottlenecks through 4 pillars:
1. **Minimum Client Intake (`client-spec.json`)**: Build a complete, tailored website from just 6 intake questions. AI agents extrapolate copy, icons, and royalty-free imagery automatically.
2. **Decoupled Content Layer (`src/data/*.ts`)**: All text, links, and photos live in isolated, strictly typed data files. Future client revisions take under 60 seconds with zero risk of breaking UI code.
3. **Multi-Destination Lead Ingestion**: Form submissions validate with Zod and simultaneously broadcast to **Google Sheets** (free spreadsheet database via Google Apps Script) and **Email** (instant sales notifications via Resend API).
4. **Autonomous AI Agent Skills (`.agents/skills/`)**: Pre-calibrated skills for Google Antigravity and Claude Code to scaffold specialized archetypes on command.

---

## 📚 Complete Technical Documentation & Visual Guides

Every architectural module has a detailed technical specification (`.md`) and a standalone, beautifully styled dark-mode visual viewer (`.html`) for non-technical stakeholders:

| Module | Technical Specification | Darkmode Visual Viewer | Core Tech Stack |
| :--- | :--- | :--- | :--- |
| **Documentation Portal** | [docs/index.html](./docs/index.html) | [Open Portal](./docs/index.html) | Modern Dark UI, Search Filter |
| **Contact Form & Routing** | [ContactValidation.md](./docs/functions/ContactValidation.md) | [ContactValidation.html](./docs/functions/ContactValidation.html) | Zod, React Hook Form, Honeypot |
| **Google Sheets Database** | [GoogleSheetsIntegration.md](./docs/functions/GoogleSheetsIntegration.md) | [GoogleSheetsIntegration.html](./docs/functions/GoogleSheetsIntegration.html) | Google Apps Script, Webhook |
| **Real-Time Email Dispatch** | [EmailDispatch.md](./docs/functions/EmailDispatch.md) | [EmailDispatch.html](./docs/functions/EmailDispatch.html) | Resend API, Next.js Server Actions |
| **Decoupled Content Layer** | [DecoupledDataLayer.md](./docs/functions/DecoupledDataLayer.md) | [DecoupledDataLayer.html](./docs/functions/DecoupledDataLayer.html) | TypeScript Contracts, `src/data/` |
| **Design Tokens & Themes** | [DesignTokensAndTheming.md](./docs/functions/DesignTokensAndTheming.md) | [DesignTokensAndTheming.html](./docs/functions/DesignTokensAndTheming.html) | Tailwind CSS, Font Pairings |
| **Client Intake Spec** | [ClientSpecIntake.md](./docs/functions/ClientSpecIntake.md) | [ClientSpecIntake.html](./docs/functions/ClientSpecIntake.html) | `client-spec.json`, AIDA Copywriting |
| **Sanity Headless CMS** | [SanityCMSIntegration.md](./docs/functions/SanityCMSIntegration.md) | [SanityCMSIntegration.html](./docs/functions/SanityCMSIntegration.html) | Sanity v3, GROQ, On-Demand ISR |
| **Scroll & Cinematic Motion**| [ScrollAndAnimations.md](./docs/functions/ScrollAndAnimations.md) | [ScrollAndAnimations.html](./docs/functions/ScrollAndAnimations.html) | GSAP, ScrollTrigger, Lenis |
| **3D Interactive WebGL** | [ThreeJsInteraction.md](./docs/functions/ThreeJsInteraction.md) | [ThreeJsInteraction.html](./docs/functions/ThreeJsInteraction.html) | Three.js, React Three Fiber, Drei |
| **Real Estate Showcase** | [RealEstateShowcase.md](./docs/functions/RealEstateShowcase.md) | [RealEstateShowcase.html](./docs/functions/RealEstateShowcase.html) | Radix Dialog, Floor Plan Lightbox |
| **Micro-Ecommerce & Cart** | [MicroEcommerce.md](./docs/functions/MicroEcommerce.md) | [MicroEcommerce.html](./docs/functions/MicroEcommerce.html) | Zustand, WhatsApp Checkout, Stripe |
| **7-Day Sprint Playbook** | [SevenDaySprintPlaybook.md](./docs/functions/SevenDaySprintPlaybook.md) | [SevenDaySprintPlaybook.html](./docs/functions/SevenDaySprintPlaybook.html) | Agency SOP, 80% Margin Framework |

---

## 🤖 Autonomous AI Agent Skills (`.agents/skills/`)

Trigger these skills inside Google Antigravity or Claude Code to scaffold complete archetypes:

- `@build-static-landing`: High-speed single-page conversion landing page for waitlists and launches.
- `@build-brand-gsap`: Luxury brand showcase with Lenis smooth scroll and GSAP pinned narratives.
- `@build-interactive-3d`: 3D canvas hero and rotatable GLTF model viewer using React Three Fiber.
- `@build-real-estate`: Architectural apartment inventory with floor plan modal and viewing scheduler.
- `@build-portfolio-static`: Creative bento-grid portfolio with case study tabs and client endorsements.
- `@build-sanity-cms`: Corporate editorial blog with PortableText and on-demand ISR revalidation.
- `@build-micro-ecommerce`: Boutique product drop with persistent Zustand cart and WhatsApp order routing.

---

## ⚡ Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/agency-microsite-engine.git
cd agency-microsite-engine
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Sheets Webhook URL and Resend API key (see [Google Sheets Guide](./docs/functions/GoogleSheetsIntegration.md)).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live site.
Open [docs/index.html](./docs/index.html) in your browser to explore the documentation.

---

## 💼 The 7-Day Sprint Playbook
1. **Day 1**: Client fills 6-question form &rarr; Developer pastes answers into `client-spec.json`.
2. **Day 2**: AI Agent scaffolds complete site and copy using matching archetype skill.
3. **Day 3–4**: Developer swaps logo vector, fine-tunes typography, and tests form delivery.
4. **Day 5**: Deploy preview link on Vercel &rarr; Client receives 1 consolidated revision round.
5. **Day 6–7**: Apply text updates in `src/data/`, map client's custom domain, and hand over.
