import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/sites/SiteShell";
import { articles } from "@/data/site";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return {};
    return {
      meta: [
        { title: `${a.title} — TechNova` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: a.image },
        { property: "og:url", content: `/news/${a.slug}` },
      ],
      links: [{ rel: "canonical", href: `/news/${a.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            image: [a.image],
            datePublished: a.date,
            author: { "@type": "Person", name: a.author },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="px-6 py-32 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
        <Link to="/news" className="text-cyber text-xs uppercase tracking-widest mt-6 inline-block">
          ← Back to journal
        </Link>
      </div>
    </SiteShell>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <SiteShell>
      <article>
        <header className="px-6 pt-16 pb-12 max-w-3xl mx-auto">
          <Link
            to="/news"
            className="text-cyber text-[10px] uppercase tracking-widest hover:text-platinum"
          >
            ← Journal
          </Link>
          <span className="text-cyber text-[10px] font-bold uppercase tracking-widest block mt-8">
            {article.category}
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.05] mt-4">
            {article.title}
          </h1>
          <p className="text-platinum/50 text-lg mt-6 leading-relaxed">{article.excerpt}</p>
          <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-widest text-platinum/40">
            <span>By {article.author}</span>
            <span className="size-1 rounded-full bg-platinum/30" />
            <time>
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span className="size-1 rounded-full bg-platinum/30" />
            <span>{article.readMinutes} min read</span>
          </div>
        </header>

        <div className="px-6 max-w-5xl mx-auto">
          <div className="aspect-video bg-slate-gray overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="px-6 py-16 max-w-3xl mx-auto prose prose-invert">
          {article.body.map((p, i) => (
            <p key={i} className="text-platinum/80 text-lg leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>

        {/* Related */}
        <section className="px-6 py-20 border-t border-platinum/10 max-w-7xl mx-auto">
          <h2 className="font-display text-2xl mb-10">Continue reading</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link key={r.slug} to="/news/$slug" params={{ slug: r.slug }} className="group block">
                <div className="aspect-3/2 bg-slate-gray overflow-hidden mb-4">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="text-cyber text-[10px] font-bold uppercase tracking-widest">
                  {r.category}
                </span>
                <h3 className="font-display text-xl mt-2 group-hover:text-cyber transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
