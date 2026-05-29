import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/sites/SiteShell";
import { formatPrice, useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — TechNova" },
      { name: "description", content: "Securely complete your TechNova order." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <SiteShell>
        <section className="px-6 py-32 text-center max-w-md mx-auto">
          <h1 className="font-display text-4xl">Nothing to check out.</h1>
          <p className="text-platinum/50 mt-4">Your cart is empty.</p>
          <Link
            to="/shop"
            className="mt-8 inline-block px-8 py-4 bg-cyber text-obsidian font-bold text-xs uppercase tracking-widest"
          >
            Explore store
          </Link>
        </section>
      </SiteShell>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Order placed — confirmation sent to your inbox.");
      clear();
      navigate({ to: "/" });
    }, 900);
  };

  return (
    <SiteShell>
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <p className="text-cyber text-[10px] font-bold uppercase tracking-widest">Secure Channel</p>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold mt-4">Checkout</h1>

        <form onSubmit={submit} className="grid lg:grid-cols-3 gap-12 mt-12">
          <div className="lg:col-span-2 space-y-10">
            <Section title="Contact">
              <Input label="Email" type="email" name="email" required />
            </Section>
            <Section title="Shipping address">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" name="first" required />
                <Input label="Last name" name="last" required />
              </div>
              <Input label="Address" name="address" required />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" name="city" required />
                <Input label="State" name="state" required />
                <Input label="Postal code" name="zip" required />
              </div>
            </Section>
            <Section title="Payment">
              <Input label="Card number" name="card" placeholder="4242 4242 4242 4242" required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiry" name="exp" placeholder="MM/YY" required />
                <Input label="CVC" name="cvc" placeholder="123" required />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-platinum/40">
                Demo checkout — no payment is processed.
              </p>
            </Section>
          </div>

          <aside className="border border-platinum/10 p-8 h-fit space-y-6">
            <h2 className="font-display text-xl">Order</h2>
            <div className="space-y-4">
              {detailed.map(({ product, qty }) => (
                <div key={product.slug} className="flex gap-3 text-sm">
                  <div className="size-14 bg-slate-gray shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{product.name}</p>
                    <p className="text-platinum/50 text-xs">× {qty}</p>
                  </div>
                  <span className="text-sm">{formatPrice(product.price * qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-platinum/10 pt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value={formatPrice(shipping)} />
              <div className="flex justify-between pt-2 border-t border-platinum/10">
                <span className="uppercase text-xs font-bold tracking-widest">Total</span>
                <span className="text-cyber font-bold">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-cyber text-obsidian font-bold uppercase tracking-[0.3em] text-xs hover:bg-platinum transition-colors disabled:opacity-50"
            >
              {submitting ? "Processing…" : "Place order"}
            </button>
          </aside>
        </form>
      </section>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({
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
        className="w-full bg-transparent border border-platinum/15 px-4 py-3 text-sm outline-none focus:border-cyber transition-colors"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-platinum/50 uppercase text-xs tracking-widest">{label}</span>
      <span>{value}</span>
    </div>
  );
}
