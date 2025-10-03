import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  size?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string) => void;
  updateItemQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const getCartItemKey = (id: string, size?: string) => {
  return size ? `${id}-${size}` : id;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem: CartItem) => {
        const items = get().items;
        const existingItem = items.find(
          (item) =>
            getCartItemKey(item.id, item.size) ===
            getCartItemKey(newItem.id, newItem.size)
        );
        if (existingItem) {
          set({
            items: items.map((item) =>
              getCartItemKey(item.id, item.size) ===
              getCartItemKey(newItem.id, newItem.size)
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },
      removeItem: (id: string, size?: string) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              getCartItemKey(item.id, item.size) !== getCartItemKey(id, size)
          ),
        })),
      updateItemQuantity: (id: string, quantity: number, size?: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            getCartItemKey(item.id, item.size) === getCartItemKey(id, size)
              ? { ...item, quantity }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        const items = get().items;
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      getTotalItems: () => {
        const items = get().items;
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
