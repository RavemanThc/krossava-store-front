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
  addToCart: (item: CartItem) => boolean;
  removeFromCart: (id: string, size: string) => void;
  decreaseQuantity: (id: string, size: string) => void;
  addQuantity: (id: string, size: string) => void;

  clearCart: () => void;
};
export const getStock = (sneaker: Sneaker, size: string) =>
  Math.max(0, Math.floor(sneaker.sizes.find(s => s.size === size)?.quantity ?? 0));

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        if (!item.sneaker.id) return false;
        const stock = getStock(item.sneaker, item.size);
        const items = get().items;

        const exists = items.find(
          (i) => i.sneaker.id === item.sneaker.id && i.size === item.size,
        );

        if (stock <= (exists?.quantity ?? 0)) return false;
        if (exists) {
          set({
            items: items.map((i) =>
              i.sneaker.id === item.sneaker.id && i.size === item.size
                ? { ...i, sneaker: item.sneaker, quantity: i.quantity + 1 }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] });
        }
        return true;
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
                ? { ...item, quantity: Math.min(item.quantity + 1, getStock(item.sneaker, item.size)) }
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
      version: 1,
      migrate: (persisted) => {
        const state = persisted as { items?: CartItem[] };
        return { items: (state.items || []).map(item => ({
          ...item,
          sneaker: { ...item.sneaker, id: item.sneaker.id || (item.sneaker as Sneaker & { _id?: string })._id || "" },
          quantity: Math.min(item.quantity, getStock(item.sneaker, item.size)),
        })).filter(item => item.sneaker.id && item.quantity > 0) };
      },
    },
  ),
);
