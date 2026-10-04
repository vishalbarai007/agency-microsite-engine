# Micro-Ecommerce & WhatsApp Checkout Engine

## 1. Executive Summary
Many agency clients don't need a bulky 500-page Shopify store. They sell 1 to 10 curated products, limited merchandise drops, pre-order books, or boutique artisanal goods. 

This module provides a high-converting, lightweight **Micro-Ecommerce Engine** featuring:
- **Zustand Cart State**: Fast, persistent client cart with zero re-render lag and automatic `localStorage` synchronization.
- **Slide-Over Cart Drawer**: Responsive cart drawer with item count badges, quantity increments, and item removal.
- **Dual Checkout Routing**:
  1. **Direct WhatsApp Checkout**: Converts the cart into a pre-filled, formatted WhatsApp message. Perfect for boutique brands, international markets, and high-touch concierge sales.
  2. **Stripe Checkout**: Generates a secure hosted Stripe Checkout session for automated credit card processing.

---

## 2. Tech Stack & Dependencies

| Tool | Purpose | Rationale |
| :--- | :--- | :--- |
| **`zustand`** | Global Cart Store | 1KB bundle size, zero React Context wrapper boilerplate, built-in persistence |
| **`zustand/middleware`** | `persist` middleware | Saves cart contents in `localStorage` across page reloads |
| **`lucide-react`** | Cart, Bag, Trash icons | High-performance SVG icons |
| **Stripe Node SDK** | Credit card processing | Safe, PCI-compliant hosted checkout sessions |

---

## 3. Zustand Cart Store (`src/lib/store/useCartStore.ts`)

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, delta: number, variant?: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (newItem) => {
        const items = get().items;
        const existingIdx = items.findIndex(
          (i) => i.id === newItem.id && i.variant === newItem.variant
        );

        if (existingIdx > -1) {
          const updated = [...items];
          updated[existingIdx].quantity += 1;
          set({ items: updated, isOpen: true });
        } else {
          set({ items: [...items, { ...newItem, quantity: 1 }], isOpen: true });
        }
      },

      removeItem: (id, variant) => {
        set({
          items: get().items.filter((i) => !(i.id === id && i.variant === variant))
        });
      },

      updateQuantity: (id, delta, variant) => {
        const items = get().items;
        const updated = items
          .map((i) => {
            if (i.id === id && i.variant === variant) {
              const newQty = i.quantity + delta;
              return newQty > 0 ? { ...i, quantity: newQty } : null;
            }
            return i;
          })
          .filter(Boolean) as CartItem[];

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      totalCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: "agency-microsite-cart"
    }
  )
);
```

---

## 4. Multi-Channel Checkout Mechanisms

### 4.1 Channel A: Direct WhatsApp Order Generation
Generates a pre-formatted WhatsApp Click-to-Chat URL containing line items, quantities, subtotal, and buyer instructions:

```typescript
export function generateWhatsAppOrderUrl(phoneNumber: string, items: CartItem[], total: number): string {
  // Format message
  let text = `*NEW ORDER INQUIRY*\n`;
  text += `────────────────────\n`;
  
  items.forEach((item, idx) => {
    text += `${idx + 1}. *${item.title}* ${item.variant ? `(${item.variant})` : ""}\n`;
    text += `   Qty: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
  });

  text += `────────────────────\n`;
  text += `*TOTAL AMOUNT: $${total.toFixed(2)}*\n\n`;
  text += `Please confirm availability and share payment/shipping instructions.`;

  // Clean phone number (e.g., +15550192)
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
```

### 4.2 Channel B: Stripe Checkout Session (`app/actions/createCheckoutSession.ts`)
```typescript
"server-only";
"use server";

import Stripe from "stripe";
import { CartItem } from "@/lib/store/useCartStore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20"
});

export async function createCheckoutSession(items: CartItem[]): Promise<{ url?: string; error?: string }> {
  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: item.imageUrl ? [item.imageUrl] : []
        },
        unit_amount: Math.round(item.price * 100) // cents
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`
    });

    return { url: session.url || undefined };
  } catch (err: any) {
    console.error("[Stripe Session Error]:", err);
    return { error: err.message };
  }
}
```

---

## 5. Agency Advantages

- **Zero Monthly Platform Fees**: Clients avoid Shopify's $39/mo base subscription + app fees.
- **Conversion Power**: In emerging markets (India, UAE, Southeast Asia, Latin America), **WhatsApp checkout converts 3x higher** than traditional card forms.
- **5-Day Launch**: A boutique 3-item merchandise drop can be designed, coded, and live on a custom domain in 48 hours.
