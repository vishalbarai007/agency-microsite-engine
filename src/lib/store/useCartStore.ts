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
