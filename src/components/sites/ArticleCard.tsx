import { Link } from "@tanstack/react-router";
import type { Article } from "@/data/site";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to="/news/$slug" params={{ slug: article.slug }} className="group block">
      <div className="w-full aspect-[3/4] bg-slate-gray mb-6 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <span className="text-cyber text-[10px] font-bold uppercase tracking-widest">
        {article.category}
      </span>
      <h3 className="font-display text-2xl mt-3 leading-tight group-hover:text-cyber transition-colors">
        {article.title}
      </h3>
      <p className="text-platinum/50 text-sm mt-3 leading-relaxed line-clamp-2">
        {article.excerpt}
      </p>
    </Link>
  );
}
