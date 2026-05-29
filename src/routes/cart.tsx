import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { SiteShell } from "@/components/sites/SiteShell";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — TechNova" },
      { name: "description", content: "Review your TechNova selection before checkout." },
      { name: "robots", content: "noindex" },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, subtotal, setQty, remove } = useCart();
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  return (
    <SiteShell>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <p className="text-cyber text-[10px] font-bold uppercase tracking-widest">Acquisition</p>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold mt-4">Your Cart</h1>

        {detailed.length === 0 ? (
          <div className="mt-16 border border-platinum/10 p-16 text-center">
            <p className="text-platinum/50">Your cart is empty.</p>
            <Link
              to="/shop"
              className="mt-8 inline-block px-8 py-4 bg-cyber text-obsidian font-bold text-xs uppercase tracking-widest hover:bg-platinum transition-colors"
            >
              Explore the store
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 mt-12">
            <div className="lg:col-span-2 space-y-6">
              {detailed.map(({ product, qty }) => (
                <div
                  key={product.slug}
                  className="flex gap-6 border border-platinum/10 p-4 items-center"
                >
                  <Link
                    to="/shop/$slug"
                    params={{ slug: product.slug }}
                    className="size-24 sm:size-32 bg-slate-gray shrink-0 overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-cyber text-[10px] font-bold uppercase tracking-widest">
                      {product.category}
                    </p>
                    <Link
                      to="/shop/$slug"
                      params={{ slug: product.slug }}
                      className="font-display text-lg hover:text-cyber transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-platinum/50 text-sm mt-1">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex border border-platinum/20">
                      <button
                        onClick={() => setQty(product.slug, qty - 1)}
                        className="px-3 py-1 hover:bg-white/5"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm">{qty}</span>
                      <button
                        onClick={() => setQty(product.slug, qty + 1)}
                        className="px-3 py-1 hover:bg-white/5"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(product.slug)}
                      aria-label="Remove"
                      className="text-platinum/40 hover:text-cyber transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="border border-platinum/10 p-8 h-fit">
              <h2 className="font-display text-xl">Summary</h2>
              <div className="mt-6 space-y-4 text-sm">
                <Row label="Subtotal" value={formatPrice(subtotal)} />
                <Row label="Shipping" value={formatPrice(shipping)} />
                <div className="border-t border-platinum/10 pt-4 flex justify-between">
                  <span className="uppercase text-xs font-bold tracking-widest">Total</span>
                  <span className="text-cyber font-bold">{formatPrice(total)}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="mt-8 block w-full text-center py-4 bg-cyber text-obsidian font-bold uppercase tracking-[0.3em] text-xs hover:bg-platinum transition-colors"
              >
                Checkout
              </Link>
              <Link
                to="/shop"
                className="mt-4 block text-center text-xs uppercase tracking-widest text-platinum/50 hover:text-cyber"
              >
                Continue browsing
              </Link>
            </aside>
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-platinum/50 uppercase text-xs tracking-widest">{label}</span>
      <span>{value}</span>
    </div>
  );
}
