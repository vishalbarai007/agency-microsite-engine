---
name: build-micro-ecommerce
description: Generates a boutique product drop microsite featuring persistent Zustand cart drawer, WhatsApp direct checkout, and optional Stripe payment session.
---

# Objective
Scaffold a boutique product sales microsite for limited merchandise drops, artisanal wares, or pre-orders with zero monthly SaaS platform subscriptions.

# Workflow Instructions

1. **State Store Configuration**:
   - Construct `src/lib/store/useCartStore.ts` using `zustand` with `persist` middleware.

2. **Cart Drawer Component**:
   - Build slide-over cart drawer with quantity increments, variant selectors, and item removal.

3. **Dual Checkout Flow**:
   - Generate WhatsApp direct order links via `generateWhatsAppOrderUrl()`.
   - Setup optional Stripe Checkout Server Action (`createCheckoutSession.ts`).

4. **Product Catalog**:
   - Store product catalog in `src/data/offerings.ts`.
