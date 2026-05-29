import { tickerItems } from "@/data/site";

export function NewsTicker() {
  const loop = [...tickerItems, ...tickerItems];
  return (
    <div className="border-y border-platinum/10 py-4 overflow-hidden bg-white/2">
      <div className="flex w-max gap-20 items-center text-[10px] font-bold uppercase tracking-[0.3em] text-platinum/50 animate-ticker pl-6">
        {loop.map((item, i) => (
          <div key={i} className="flex gap-3 items-center whitespace-nowrap">
            <span className="text-cyber">●</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}
