import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/data/site";
import { formatPrice, useCart } from "@/lib/cart";

export function ProductCard({ product, light = false }: { product: Product; light?: boolean }) {
  const { add } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.slug);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
      <div
        className={`relative aspect-square overflow-hidden ${light ? "bg-platinum/5" : "bg-slate-gray"} outline outline-1 -outline-offset-1 outline-white/5`}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <button
          onClick={handleAdd}
          className="absolute bottom-3 left-3 right-3 bg-cyber text-obsidian text-[10px] font-bold uppercase tracking-widest py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-platinum"
        >
          Add to Cart
        </button>
      </div>
      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <span className="text-cyber text-[10px] font-bold uppercase tracking-widest">
            {product.category}
          </span>
          <h4 className="font-display text-lg mt-1 group-hover:text-cyber transition-colors">
            {product.name}
          </h4>
        </div>
        <span className="text-sm font-semibold whitespace-nowrap">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
