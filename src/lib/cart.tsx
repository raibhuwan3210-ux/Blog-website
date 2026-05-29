import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/site";

export type CartItem = { slug: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  detailed: { product: Product; qty: number }[];
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartCtx | null>(null);
const STORAGE_KEY = "technova_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const add = (slug: string, qty = 1) =>
      setItems((cur) => {
        const i = cur.find((c) => c.slug === slug);
        if (i) return cur.map((c) => (c.slug === slug ? { ...c, qty: c.qty + qty } : c));
        return [...cur, { slug, qty }];
      });
    const remove = (slug: string) => setItems((cur) => cur.filter((c) => c.slug !== slug));
    const setQty = (slug: string, qty: number) =>
      setItems((cur) =>
        qty <= 0
          ? cur.filter((c) => c.slug !== slug)
          : cur.map((c) => (c.slug === slug ? { ...c, qty } : c)),
      );
    const clear = () => setItems([]);

    const detailed = items
      .map((i) => {
        const product = products.find((p) => p.slug === i.slug);
        return product ? { product, qty: i.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    const subtotal = detailed.reduce((s, d) => s + d.product.price * d.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);

    return { items, add, remove, setQty, clear, detailed, subtotal, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
