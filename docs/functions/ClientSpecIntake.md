# Client Intake & Specification Mapping (`client-spec.json`)

## 1. Executive Summary
Traditional web development projects stall during discovery because clients fail to deliver copy, wireframes, and high-resolution assets. 

The Agency Microsite Engine bypasses this bottleneck using a **Minimum Data Intake Model**. Clients fill out a simple 6-question intake form (via Google Form or Typeform). The developer copies those answers into a single configuration file: `client-spec.json`. 

From just **6 data points**, AI agents (Antigravity/Claude) automatically extrapolate professional marketing copy (using AIDA/PAS copywriting frameworks), map aesthetic design tokens, match Lucide icons, and inject contextual Unsplash CDN imagery.

---

## 2. The 6-Question Client Intake Questionnaire

When onboarding a new client, send them this exact 6-question form:

| # | Question Prompt | Example Client Answer |
| :- | :--- | :--- |
| **Q1** | **Brand Name & Industry** | *Velox Studio — Luxury Architectural Design & Planning* |
| **Q2** | **Aesthetic Vibe** | *Premium & Editorial (Muted gold, obsidian black, minimalist)* |
| **Q3** | **One-Sentence Tagline** | *Crafting bespoke living spaces that blur art and architecture.* |
| **Q4** | **3 to 4 Core Services / Offerings** | *1. Turnkey Residential Villas, 2. Spatial 3D Planning, 3. Interior Curation* |
| **Q5** | **Primary Call to Action** | *Book a Private Consultation / hello@veloxstudio.com* |
| **Q6** | **Where should leads be delivered?** | *Google Sheets and our sales inbox (leads@veloxstudio.com)* |

---

## 3. Specification Blueprint (`client-spec.json`)

The developer pastes the client's answers into `client-spec.json` at the root of the project:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "archetype": "brand-showcase",
  "brand": {
    "name": "Velox Studio",
    "industry": "Architecture & Luxury Residences",
    "vibe": "premium",
    "palette": {
      "primary": "#0F0F11",
      "accent": "#C5A880",
      "background": "dark"
    },
    "tagline": "Crafting bespoke living spaces that blur art and architecture.",
    "logoUrl": "/placeholder/logo.svg"
  },
  "navigation": [
    { "label": "Offerings", "href": "#services" },
    { "label": "Projects", "href": "#showcase" },
    { "label": "Philosophy", "href": "#philosophy" },
    { "label": "Inquire", "href": "#contact" }
  ],
  "leadCapture": {
    "destinations": ["google_sheets", "email"],
    "fields": ["fullName", "email", "phone", "service", "message"]
  },
  "contentSummaries": {
    "heroHeadline": "Architecture That Commands Stillness",
    "heroSubheadline": "Curated residential developments and architectural planning tailored to natural topography across Mumbai and Goa.",
    "coreOfferings": [
      {
        "title": "Turnkey Residential Villas",
        "description": "Custom waterfront sanctuaries built with sustainable stone and bioclimatic ventilation."
      },
      {
        "title": "Spatial 3D Planning",
        "description": "Comprehensive volumetric blueprints, sunlight simulations, and structural approvals."
      },
      {
        "title": "Interior Curation",
        "description": "Bespoke millwork, acoustic balancing, and custom artisan furniture manufacturing."
      }
    ]
  }
}
```

---

## 4. How AI Agents Autonomously Fill the Gaps

When an agent reads `client-spec.json`, it follows these automated expansion rules:

1. **Aesthetic Mapping**: Reading `"vibe": "premium"` instructs the agent to import Cormorant Garamond serif fonts, assign `#C5A880` to buttons, and inject soft ambient shadows.
2. **Copywriting Framework**: The agent applies the **PAS (Problem, Agitate, Solve)** framework to write the "Philosophy" and "FeatureGrid" sections, turning brief bullet points into persuasive sales copy.
3. **Imagery Sourcing**: The agent constructs contextual Unsplash CDN image URLs using exact topic query parameters (e.g. `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80`) so the site never renders empty broken image frames.
4. **Form Wiring**: Reading `"destinations": ["google_sheets", "email"]` ensures the agent generates the multi-destination Server Action in `app/actions/submitContactForm.ts`.
