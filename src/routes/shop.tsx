import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/sites/SiteShell";
import { ProductCard } from "@/components/sites/ProductCard";
import { products } from "@/data/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Store — TechNova" },
      {
        name: "description",
        content:
          "TechNova Store: curated keyboards, headphones, laptops, smartphones, wearables, and premium PC accessories.",
      },
      { property: "og:title", content: "Store — TechNova" },
      { property: "og:description", content: "Curated premium hardware." },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

const ALL = "All";

function ShopPage() {
  const cats = useMemo(() => [ALL, ...Array.from(new Set(products.map((p) => p.category)))], []);
  const [category, setCategory] = useState(ALL);
  const filtered = category === ALL ? products : products.filter((p) => p.category === category);

  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-12 border-b border-platinum/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-cyber text-[10px] font-bold uppercase tracking-widest mb-4">
            Lab Store
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-none">
            Hardware, distilled.
          </h1>
          <p className="text-platinum/50 mt-6 max-w-xl leading-relaxed">
            A short list of objects we'd actually live with. Every product is reviewed in-house.
          </p>
        </div>
      </section>

      <section className="px-6 py-6 border-b border-platinum/10 bg-white/2 sticky top-20 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-all ${
                category === c
                  ? "bg-cyber text-obsidian border-cyber"
                  : "border-platinum/15 text-platinum/60 hover:border-cyber hover:text-cyber"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
