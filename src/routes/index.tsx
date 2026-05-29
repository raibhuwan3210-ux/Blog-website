import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/sites/SiteShell";
import { NewsTicker } from "@/components/sites/NewsTicker";
import { ArticleCard } from "@/components/sites/ArticleCard";
import { ProductCard } from "@/components/sites/ProductCard";
import { articles, products, categories, testimonials } from "@/data/site";
import heroImg from "@/assets/hero-artifact.jpg";
import productHero from "@/assets/product-hero.jpg";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechNova — The Intelligence Issue" },
      {
        name: "description",
        content:
          "Luxury technology journalism and curated hardware. Deep editorial on AI, materials, and the future of computing.",
      },
      { property: "og:title", content: "TechNova — The Intelligence Issue" },
      {
        property: "og:description",
        content: "Luxury technology journalism and curated hardware.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = articles.slice(0, 3);
  const limited = products[0];
  const grid = products.slice(1, 5);

  return (
    <SiteShell>
      {/* Hero */}
      <header className="relative py-20 lg:py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="inline-block px-3 py-1 bg-cyber/10 text-cyber text-[10px] font-bold uppercase tracking-widest mb-6">
              Volume 01 · The Singularity Issue
            </div>
            <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
              BEYOND
              <br />
              <span className="text-platinum/30 border-t border-b border-platinum/20 py-2 inline-block italic">
                SYNTHETIC
              </span>
            </h1>
            <p className="text-platinum/60 text-lg max-w-md leading-relaxed mb-10">
              Exploring the intersection of high-luxury craftsmanship and the bleeding edge of
              sentient hardware.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/news"
                className="px-8 py-4 bg-platinum text-obsidian font-bold text-xs uppercase tracking-widest hover:bg-cyber transition-colors inline-flex items-center gap-3"
              >
                Read the Journal <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/shop"
                className="px-8 py-4 border border-platinum/20 text-xs uppercase tracking-widest hover:bg-white/5 hover:border-cyber transition-all"
              >
                Explore Store
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="w-full aspect-4/5 bg-slate-gray outline-1 -outline-offset-1 outline-white/5 overflow-hidden">
              <img
                src={heroImg}
                alt="Titanium neural interface — TechNova hero artifact"
                width={1000}
                height={1216}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cyber p-6 text-obsidian">
              <p className="font-display font-extrabold text-3xl">98.4%</p>
              <p className="text-[9px] uppercase font-bold tracking-widest opacity-80">
                Synchronization Rate
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      <NewsTicker />

      {/* Featured Articles */}
      <section className="py-20 lg:py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight">Intellect &amp; Form</h2>
            <p className="text-platinum/40 mt-2 text-xs uppercase tracking-widest">
              Recent dispatches from the front
            </p>
          </div>
          <Link
            to="/news"
            className="text-cyber text-xs uppercase tracking-widest border-b border-cyber/30 pb-1 hover:text-platinum hover:border-platinum/30 transition-colors"
          >
            View Journal →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* Limited-Edition Showcase (light section, prototype-faithful) */}
      <section className="bg-platinum text-obsidian py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="size-12 bg-obsidian mb-8" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-obsidian/50 mb-4">
              {limited.category}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              {limited.name.split(" ")[0]}
              <br />
              {limited.name.split(" ").slice(1).join(" ")}
            </h2>
            <p className="text-obsidian/60 text-lg mb-10 leading-relaxed max-w-md">
              {limited.blurb}
            </p>
            <div className="flex flex-col gap-5">
              {limited.specs.map((s) => (
                <div
                  key={s.label}
                  className="flex justify-between border-b border-obsidian/10 pb-4"
                >
                  <span className="uppercase text-xs font-bold tracking-widest">{s.label}</span>
                  <span className="uppercase text-xs tracking-widest">{s.value}</span>
                </div>
              ))}
              <div className="flex justify-between border-b border-obsidian/10 pb-4">
                <span className="uppercase text-xs font-bold tracking-widest">Price</span>
                <span className="uppercase text-xs tracking-widest font-bold">
                  {formatPrice(limited.price)}
                </span>
              </div>
            </div>
            <Link
              to="/shop/$slug"
              params={{ slug: limited.slug }}
              className="mt-12 w-full inline-flex justify-center py-5 bg-obsidian text-platinum font-bold uppercase tracking-[0.3em] text-xs hover:bg-cyber hover:text-obsidian transition-all"
            >
              Acquire Now
            </Link>
          </div>
          <div className="w-full aspect-square bg-white outline-1 -outline-offset-1 outline-black/5 overflow-hidden">
            <img
              src={productHero}
              alt={limited.name}
              width={1216}
              height={1216}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured products grid */}
      <section className="py-20 lg:py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight">The Lab Store</h2>
            <p className="text-platinum/40 mt-2 text-xs uppercase tracking-widest">
              Curated hardware for the high-performance enthusiast
            </p>
          </div>
          <Link
            to="/shop"
            className="text-cyber text-xs uppercase tracking-widest border-b border-cyber/30 pb-1"
          >
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {grid.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-platinum/10 bg-white/2 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              className="px-5 py-2 border border-platinum/15 text-[10px] uppercase tracking-widest text-platinum/60 hover:text-cyber hover:border-cyber transition-all"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 border-b border-platinum/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl mb-6">Stay Synced.</h2>
          <p className="text-platinum/40 mb-10 text-xs leading-relaxed uppercase tracking-widest">
            Exclusive insights into the future, delivered weekly.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              import("sonner").then(({ toast }) =>
                toast.success("Subscribed. Welcome to the signal."),
              );
              (e.target as HTMLFormElement).reset();
            }}
            className="flex flex-col sm:flex-row gap-2 p-1 border border-platinum/20"
          >
            <input
              type="email"
              required
              placeholder="EMAIL ADDRESS"
              className="bg-transparent px-6 py-4 grow outline-none text-xs uppercase tracking-widest placeholder:text-platinum/20"
            />
            <button className="px-10 py-4 bg-platinum text-obsidian font-bold text-[10px] uppercase tracking-widest hover:bg-cyber transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
          {testimonials.map((t, i) => (
            <div
              key={t.author}
              className={`pl-10 border-l ${i === 0 ? "border-cyber/50" : "border-platinum/10"}`}
            >
              <p className="text-2xl font-display italic mb-6 leading-snug">"{t.quote}"</p>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-platinum/40">
                {t.author} — {t.role}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
