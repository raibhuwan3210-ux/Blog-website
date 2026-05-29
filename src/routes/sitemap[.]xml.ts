import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { articles, products } from "@/data/site";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/news", "/shop", "/contact", "/about", "/privacy", "/terms"];
        const articlePaths = articles.map((a) => `/news/${a.slug}`);
        const productPaths = products.map((p) => `/shop/${p.slug}`);

        const urls = [...staticPaths, ...articlePaths, ...productPaths]
          .map(
            (p) =>
              `  <url>\n    <loc>${BASE_URL}${p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
