import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/sites/SiteShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — TechNova" },
      { name: "description", content: "How TechNova collects, uses, and protects your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-8 border-b border-platinum/10">
        <div className="max-w-4xl mx-auto">
          <p className="text-cyber text-[10px] font-bold uppercase tracking-widest mb-4">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold">Privacy Policy</h1>
          <p className="text-platinum/40 mt-4 text-xs uppercase tracking-widest">
            Last updated: May 2026
          </p>
        </div>
      </section>
      <section className="px-6 py-16 max-w-3xl mx-auto space-y-8 text-platinum/75 leading-relaxed">
        <Block title="Information we collect">
          We collect information you provide directly (account details, orders, newsletter
          subscriptions) and limited analytics about how you use TechNova (page views, device type,
          referring source).
        </Block>
        <Block title="How we use it">
          To deliver journalism and orders, improve the product, respond to support, and send the
          weekly newsletter if you opt in. We never sell your personal data.
        </Block>
        <Block title="Cookies & ads">
          We use first-party cookies for essential functionality and aggregated analytics. Display
          advertising via Google AdSense may set additional cookies — you can opt out in your
          browser or via your Google ad settings.
        </Block>
        <Block title="Your rights">
          You may request access to, correction of, or deletion of your personal data at any time by
          emailing privacy@technova.media.
        </Block>
        <Block title="Contact">Questions about this policy? Email privacy@technova.media.</Block>
      </section>
    </SiteShell>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-3 text-platinum">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
