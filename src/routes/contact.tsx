import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { SiteShell } from "@/components/sites/SiteShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TechNova" },
      {
        name: "description",
        content:
          "Get in touch with the TechNova editorial team, store support, or business inquiries.",
      },
      { property: "og:title", content: "Contact — TechNova" },
      { property: "og:description", content: "Talk to the TechNova team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Most orders ship within 24 hours. Delivery is 2–5 business days domestically and 7–14 internationally.",
  },
  {
    q: "Do you write sponsored content?",
    a: "No. Editorial is fully independent. Sponsored placements are clearly labeled and never appear in reviews.",
  },
  {
    q: "Can I pitch a story?",
    a: "Yes — email pitches to editorial@technova.media with a one-paragraph summary and your relevant work.",
  },
  { q: "Where are you based?", a: "Editorial in Berlin, Lab Store fulfillment from Rotterdam." },
];

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent. We'll reply within 48 hours.");
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 700);
  };

  return (
    <SiteShell>
      <section className="px-6 pt-16 pb-12 border-b border-platinum/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-cyber text-[10px] font-bold uppercase tracking-widest mb-4">
            Open a channel
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-none">Contact</h1>
          <p className="text-platinum/50 mt-6 max-w-xl leading-relaxed">
            Editorial pitches, store support, partnership inquiries. We read every message.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-white/2 border border-platinum/10 backdrop-blur p-8 lg:p-12">
          <h2 className="font-display text-2xl mb-8">Send a message</h2>
          <form onSubmit={submit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" required />
              <Field label="Email" type="email" name="email" required />
            </div>
            <Field label="Subject" name="subject" required />
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest text-platinum/50 block mb-2">
                Message
              </span>
              <textarea
                required
                rows={6}
                maxLength={2000}
                className="w-full bg-transparent border border-platinum/15 px-4 py-3 text-sm outline-none focus:border-cyber transition-colors resize-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-4 bg-cyber text-obsidian font-bold text-xs uppercase tracking-[0.3em] hover:bg-platinum transition-colors disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
        <aside className="space-y-8">
          <Info icon={<Mail className="size-4" />} label="Email" value="hello@technova.media" />
          <Info
            icon={<MessageSquare className="size-4" />}
            label="Editorial"
            value="editorial@technova.media"
          />
          <Info
            icon={<MapPin className="size-4" />}
            label="Studio"
            value="Mehringdamm 32, Berlin"
          />
          <div className="aspect-square bg-slate-gray overflow-hidden">
            <iframe
              title="TechNova studio map"
              src="https://www.google.com/maps?q=Mehringdamm+32+Berlin&output=embed"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
            />
          </div>
        </aside>
      </section>

      <section className="px-6 py-20 border-t border-platinum/10 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl mb-10">Frequently asked</h2>
        <div className="divide-y divide-platinum/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="cursor-pointer flex justify-between items-center font-medium hover:text-cyber transition-colors">
                {f.q}
                <span className="text-cyber group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-platinum/60 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest text-platinum/50 block mb-2">
        {label}
      </span>
      <input
        {...rest}
        maxLength={200}
        className="w-full bg-transparent border border-platinum/15 px-4 py-3 text-sm outline-none focus:border-cyber transition-colors"
      />
    </label>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <div className="size-10 grid place-items-center bg-cyber/10 text-cyber shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-platinum/50">{label}</p>
        <p className="text-sm mt-1">{value}</p>
      </div>
    </div>
  );
}
