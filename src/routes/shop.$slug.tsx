import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/sites/SiteShell";
import { ProductCard } from "@/components/sites/ProductCard";
import { products } from "@/data/site";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — TechNova Store` },
        { name: "description", content: p.blurb },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.blurb },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.image },
        { property: "og:url", content: `/shop/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/shop/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            image: [p.image],
            description: p.blurb,
            offers: {
              "@type": "Offer",
              priceCurrency: "USD",
              price: p.price,
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="text-cyber text-xs uppercase tracking-widest mt-6 inline-block">
          ← Back to store
        </Link>
      </div>
    </SiteShell>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <SiteShell>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <Link
          to="/shop"
          className="text-cyber text-[10px] uppercase tracking-widest hover:text-platinum"
        >
          ← Store
        </Link>
        <div className="grid lg:grid-cols-2 gap-12 mt-8">
          <div className="aspect-square bg-slate-gray outline-1 -outline-offset-1 outline-white/5 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-cyber text-[10px] font-bold uppercase tracking-widest">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-3">
              {product.name}
            </h1>
            <p className="text-platinum/60 mt-6 leading-relaxed">{product.blurb}</p>

            <div className="mt-10 flex flex-col gap-5">
              {product.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between border-b border-platinum/10 pb-4"
                >
                  <span className="uppercase text-xs font-bold tracking-widest text-platinum/60">
                    {s.label}
                  </span>
                  <span className="uppercase text-xs tracking-widest">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between border-b border-platinum/10 pb-4">
                <span className="uppercase text-xs font-bold tracking-widest text-platinum/60">
                  Price
                </span>
                <span className="uppercase text-sm tracking-widest font-bold text-cyber">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex border border-platinum/20">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-white/5"
                >
                  −
                </button>
                <span className="px-6 py-3 text-sm">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 hover:bg-white/5">
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.slug, qty);
                  toast.success(`${product.name} × ${qty} added to cart`);
                }}
                className="flex-1 py-4 bg-cyber text-obsidian font-bold uppercase tracking-[0.3em] text-xs hover:bg-platinum transition-all"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 max-w-7xl mx-auto border-t border-platinum/10">
        <h2 className="font-display text-2xl mb-10">You may also like</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((r) => (
            <ProductCard key={r.slug} product={r} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
