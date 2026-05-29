import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-16 px-6 bg-black border-t border-platinum/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <div className="font-display font-extrabold text-3xl tracking-tighter mb-4">TECHNOVA</div>
          <p className="text-[10px] text-platinum/30 max-w-[240px] leading-relaxed uppercase tracking-widest">
            © {new Date().getFullYear()} TechNova Media Group. All human and digital rights
            reserved.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
          <FCol
            label="Network"
            links={[
              { to: "/news", label: "Journal" },
              { to: "/shop", label: "Store" },
              { to: "/about", label: "About" },
            ]}
          />
          <FCol
            label="Legal"
            links={[
              { to: "/privacy", label: "Privacy" },
              { to: "/terms", label: "Terms" },
              { to: "/contact", label: "Contact" },
            ]}
          />
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-cyber mb-2 uppercase tracking-widest">
              Social
            </span>
            {["X.com", "Instagram", "YouTube"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[10px] text-platinum/40 uppercase tracking-widest hover:text-platinum"
              >
                {s}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold text-cyber mb-2 uppercase tracking-widest">
              Contact
            </span>
            <a
              href="mailto:hello@technova.media"
              className="text-[10px] text-platinum/40 uppercase tracking-widest hover:text-platinum"
            >
              hello@technova.media
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FCol({ label, links }: { label: string; links: { to: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-bold text-cyber mb-2 uppercase tracking-widest">
        {label}
      </span>
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="text-[10px] text-platinum/40 uppercase tracking-widest hover:text-platinum"
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
