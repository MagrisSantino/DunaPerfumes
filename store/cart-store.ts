'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  subtotal: () => number;
  totalItems: () => number;
  cashTotal: () => number;
  cashDiscount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (product, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock || 99) } : i,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                productId: product.id,
                slug: product.slug,
                brand: product.brand,
                model: product.model,
                size: product.size,
                price: product.price,
                cashPrice: product.cashPrice,
                image: product.images[0] || '',
                quantity,
              },
            ],
          });
        }
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
        } else {
          set({ items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)) });
        }
      },
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
      totalItems: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      cashTotal: () => get().items.reduce((acc, i) => acc + i.cashPrice * i.quantity, 0),
      cashDiscount: () => {
        const total = get().items.reduce((acc, i) => acc + i.price * i.quantity, 0);
        const cash = get().items.reduce((acc, i) => acc + i.cashPrice * i.quantity, 0);
        return total - cash;
      },
    }),
    {
      name: 'duna-cart',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : (undefined as unknown as Storage))),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
