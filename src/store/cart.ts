import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sneaker } from "@/types/sneaker";

type CartItem = {
  sneaker: Sneaker;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  decreaseQuantity: (id: string, size: string) => void;
  addQuantity: (id: string, size: string) => void;

  clearCart: () => void;
};
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        const items = get().items;

        const exists = items.find(
          (i) => i.sneaker.id === item.sneaker.id && i.size === item.size,
        );

        if (exists) {
          set({
            items: items.map((i) =>
              i.sneaker.id === item.sneaker.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      removeFromCart: (id, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.sneaker.id === id && i.size === size),
          ),
        });
      },
      addQuantity: (id, size) => {
        set({
          items: get()
            .items.map((item) =>
              item.sneaker.id === id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        });
      },

      decreaseQuantity: (id, size) => {
        set({
          items: get()
            .items.map((item) =>
              item.sneaker.id === id && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            )
            .filter((item) => item.quantity > 0),
        });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
