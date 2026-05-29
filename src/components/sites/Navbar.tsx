import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/news", label: "The Journal" },
  { to: "/shop", label: "Store" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-obsidian/80 backdrop-blur-md border-b border-platinum/10">
      <div className="container-edge h-20 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-extrabold text-2xl tracking-tighter flex items-center gap-2"
        >
          <div className="size-6 bg-cyber" aria-hidden />
          TECHNOVA
        </Link>

        <div className="hidden md:flex gap-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-platinum/60">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-cyber transition-colors"
              activeProps={{ className: "text-cyber" }}
            >
              {n.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            aria-label="Search"
            className="size-9 grid place-items-center text-platinum/60 hover:text-cyber transition-colors"
          >
            <Search className="size-4" />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative size-9 grid place-items-center text-platinum/60 hover:text-cyber transition-colors"
          >
            <ShoppingBag className="size-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyber text-obsidian text-[10px] font-bold size-4 grid place-items-center">
                {count}
              </span>
            )}
          </Link>
          <button className="hidden sm:inline-flex px-5 py-2 border border-platinum/20 text-[10px] uppercase tracking-widest hover:border-cyber hover:text-cyber transition-all">
            Membership
          </button>
          <button
            className="md:hidden size-9 grid place-items-center text-platinum"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-platinum/10 bg-obsidian">
          <div className="container-edge py-6 flex flex-col gap-5 text-sm uppercase tracking-[0.2em] text-platinum/70">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="hover:text-cyber"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
