import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/sites/SiteShell";
import { ArticleCard } from "@/components/sites/ArticleCard";
import { articles } from "@/data/site";
import { Search } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Journal — TechNova" },
      {
        name: "description",
        content:
          "The TechNova Journal: deep editorial on AI, hardware, cybersecurity, mobility, and the future of computing.",
      },
      { property: "og:title", content: "Journal — TechNova" },
      { property: "og:description", content: "Editorial on the future of technology." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

const ALL = "All";

function NewsPage() {
  const cats = useMemo(() => [ALL, ...Array.from(new Set(articles.map((a) => a.category)))], []);
  const [category, setCategory] = useState(ALL);
  const [q, setQ] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = category === ALL || a.category === category;
    const matchQ = !q || (a.title + a.excerpt).toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-12 border-b border-platinum/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-cyber text-[10px] font-bold uppercase tracking-widest mb-4">
            The Journal
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-none">
            Latest Intelligence
          </h1>
          <p className="text-platinum/50 mt-6 max-w-xl leading-relaxed">
            Deep reviews, opinion, and dispatches from the frontier of consumer technology.
          </p>
        </div>
      </section>

      <section className="px-6 py-8 border-b border-platinum/10 bg-white/2 sticky top-20 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
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
          <div className="flex items-center gap-2 border border-platinum/15 px-4 py-2 max-w-xs">
            <Search className="size-3.5 text-platinum/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="SEARCH"
              className="bg-transparent outline-none text-xs uppercase tracking-widest placeholder:text-platinum/30 w-full"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-platinum/50 py-20 text-center">No articles found.</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Featured */}
            {featured && (
              <Link
                to="/news/$slug"
                params={{ slug: featured.slug }}
                className="lg:col-span-2 group block"
              >
                <div className="aspect-16/10 bg-slate-gray overflow-hidden mb-8">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <span className="text-cyber text-[10px] font-bold uppercase tracking-widest">
                  {featured.category}
                </span>
                <h2 className="font-display text-4xl mt-3 group-hover:text-cyber transition-colors">
                  {featured.title}
                </h2>
                <p className="text-platinum/50 mt-4 max-w-2xl leading-relaxed">
                  {featured.excerpt}
                </p>
                <p className="text-platinum/40 text-[10px] uppercase tracking-widest mt-6">
                  {featured.author} · {featured.readMinutes} min read
                </p>
              </Link>
            )}
            {/* Sidebar trending */}
            <aside className="space-y-8 lg:border-l lg:border-platinum/10 lg:pl-10">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-platinum/40">
                Trending
              </h3>
              {rest.slice(0, 4).map((a) => (
                <Link
                  key={a.slug}
                  to="/news/$slug"
                  params={{ slug: a.slug }}
                  className="block group border-b border-platinum/10 pb-6"
                >
                  <span className="text-cyber text-[10px] font-bold uppercase tracking-widest">
                    {a.category}
                  </span>
                  <h4 className="font-display text-lg mt-2 group-hover:text-cyber transition-colors leading-tight">
                    {a.title}
                  </h4>
                  <p className="text-platinum/40 text-[10px] uppercase tracking-widest mt-2">
                    {a.readMinutes} min · {a.author}
                  </p>
                </Link>
              ))}
            </aside>
          </div>
        )}

        {rest.length > 4 && (
          <div className="grid md:grid-cols-3 gap-10 mt-20 pt-16 border-t border-platinum/10">
            {rest.slice(4).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
