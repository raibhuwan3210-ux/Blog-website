import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/sites/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TechNova" },
      {
        name: "description",
        content:
          "TechNova is a luxury technology publication and curated hardware store, founded in 2025.",
      },
      { property: "og:title", content: "About — TechNova" },
      { property: "og:description", content: "About the TechNova publication and store." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-12 border-b border-platinum/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyber text-[10px] font-bold uppercase tracking-widest mb-4">
            Manifesto
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95]">
            A luxury publication for the post-screen era.
          </h1>
        </div>
      </section>

      <section className="px-6 py-20 max-w-3xl mx-auto space-y-8 text-lg leading-relaxed text-platinum/80">
        <p>
          TechNova was founded on a single thesis: the next era of consumer technology will be
          judged less by raw performance and more by the quality of its restraint. We cover the
          products, materials, and ideas that earn that standard.
        </p>
        <p>
          Our editorial team — based in Berlin, Tokyo, and San Francisco — publishes long-form
          reviews, opinion, and dispatches from the front of computing, AI, mobility, and bio-tech.
          The TechNova Lab Store is a small, deliberately curated selection of objects we'd live
          with personally.
        </p>
        <p>
          We don't run programmatic ads on review pages, we don't accept payment for placements, and
          we disclose every commercial relationship. If a product on the store gets a poor review,
          the review still runs.
        </p>
        <p>Welcome to the signal.</p>
      </section>
    </SiteShell>
  );
}
