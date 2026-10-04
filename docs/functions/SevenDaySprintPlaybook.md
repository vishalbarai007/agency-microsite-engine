# The 7-Day Sprint Playbook (Agency Operational SOP)

## 1. Executive Summary
Traditional web design agencies suffer from margin collapse because 4-week projects stretch into 4-month nightmares of endless client revisions. 

The **7-Day Sprint Playbook** is a strict, repeatable Standard Operating Procedure (SOP) that condenses the entire microsite delivery cycle into **5 to 7 business days**. By pairing automated AI agent scaffolding with rigid scope boundaries, agencies achieve **75% to 85% gross profit margins** while delivering exceptional client satisfaction.

---

## 2. Sprint Timeline & Operational Roadmap

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    DAY 1     │     │    DAY 2     │     │   DAY 3-4    │     │    DAY 5     │     │   DAY 6-7    │
│ Intake Form  │────►│ AI Codegen   │────►│ Human Polish │────►│ Client Review│────►│ Custom Domain│
│ & Spec JSON  │     │ & Scaffold   │     │ & QA Testing │     │ & 1 Revision │     │  & Handover  │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
```

### Day 1: Intake & Repository Initialization (Total Dev Time: 45 Mins)
1. Send client the 6-question onboarding Google Form.
2. Clone `agency-microsite-engine` starter template into new client repository:
   ```bash
   git clone git@github.com:your-agency/agency-microsite-engine.git client-project-name
   cd client-project-name
   npm install
   ```
3. Copy client's intake responses into `client-spec.json`.
4. Deploy the Google Apps Script webhook for Google Sheets lead ingestion (5 minutes).

### Day 2: Autonomous Agent Generation (Total Dev Time: 1 to 2 Hours)
1. Open project in Antigravity or Claude Code.
2. Invoke matching archetype skill (e.g. `@build-brand-gsap` or `@build-static-landing`).
3. Agent reads `client-spec.json`, populates `src/data/*.ts`, tunes Tailwind design tokens, and connects `submitContactForm.ts`.
4. Verify local development build passes: `npm run build`.

### Day 3–4: Developer Polish & Asset Integration (Total Dev Time: 3 to 4 Hours)
1. **Asset Swaps**: Replace placeholder SVG logo with the client's official vector logo in `public/assets/logo.svg`.
2. **Typography Check**: Ensure heading sizes scale fluidly from iPhone SE (375px) up to 4K desktop (2560px).
3. **Motion Calibration**: Fine-tune GSAP scrub durations and Framer Motion hover states.
4. **Form Integration Testing**: Submit 2 test inquiries to verify:
   - Row appears in Google Sheets within 3 seconds.
   - Email alert arrives in test inbox with clickable reply-to link.
   - Spam honeypot correctly catches bot submissions.

### Day 5: Staging Deployment & Unified Revision (Total Dev Time: 30 Mins)
1. Push to Vercel/Netlify to generate a live preview URL:
   `https://velox-studio-preview.vercel.app`
2. Send review link to client via email with the **Strict One-Round Revision Policy**:
   > *"Attached is your live staging preview! Please test on your phone and desktop. Review with your stakeholders and send us your one consolidated punch-list of text and photo adjustments by Day 6 at 12:00 PM."*

### Day 6–7: Launch, DNS Mapping & Handover (Total Dev Time: 1 to 2 Hours)
1. Apply the client's revision punch-list (Devs or AI agents modify only `src/data/*.ts` files).
2. Connect the client's custom domain (e.g. `www.veloxstudio.com`):
   - Add Vercel `A` record (`76.76.21.21`) or `CNAME` (`cname.vercel-dns.com`) in Cloudflare, GoDaddy, or Namecheap.
3. Confirm automatic SSL certificate issuance.
4. Deliver the completion handover email along with an offer for the **Monthly Care & Hosting Retainer**.

---

## 3. Revenue Optimization & Pricing Packages

| Package Tier | Scope Included | Recommended Price | Target Client |
| :--- | :--- | :--- | :--- |
| **Express Static Launch** | 5-section landing page, Zod form, Google Sheet lead ingestion | **$750 – $1,200** | Early-stage startups, event promos, book waitlists |
| **Luxury Brand Showcase** | GSAP ScrollTrigger, Lenis smooth scroll, editorial typography | **$1,500 – $2,500** | High-end interior designers, luxury villas, fashion studios |
| **Enterprise / CMS Portal** | Sanity CMS blog, team directory, on-demand ISR revalidation | **$2,500 – $4,500** | B2B service firms, venture capital, commercial real estate |

---

## 4. The Monthly Care Retainer ($49 to $149 / Month)
Never hand over a website and walk away. Transition every client into recurring monthly cashflow:
- **Managed Hosting & SSL**: Host on Vercel/Netlify Pro with zero maintenance overhead.
- **Form Deliverability Guarantee**: Weekly automated health-check verifying Google Sheets webhook uptime.
- **30-Minute Monthly Content Buffer**: Include up to 30 minutes of text/photo updates per month. Because content is isolated in `src/data/*.ts`, these updates take agency developers less than 5 minutes to complete.
- **Agency Retention**: 20 microsite clients at $99/mo = **$1,980/month in 95% margin passive recurring revenue**.
