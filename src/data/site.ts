import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import productHero from "@/assets/product-hero.jpg";
import productKeyboard from "@/assets/product-keyboard.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productMouse from "@/assets/product-mouse.jpg";
import productLaptop from "@/assets/product-laptop.jpg";
import productPhone from "@/assets/product-phone.jpg";
import productMonitor from "@/assets/product-monitor.jpg";

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readMinutes: number;
  body: string[];
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  blurb: string;
  specs: { label: string; value: string }[];
};

export const articles: Article[] = [
  {
    slug: "ambient-ai-architecture",
    title: "The Quiet Architecture of Ambient AI",
    category: "Design Ethics",
    excerpt:
      "Why the most powerful intelligence is the one you never notice — and the design language emerging around it.",
    image: article1,
    author: "Elena Voronina",
    date: "2026-05-22",
    readMinutes: 8,
    body: [
      "There is a class of technology so well-tuned that it disappears into the room. Ambient AI is the architectural form of that idea — intelligence rendered as silence.",
      "We spent the last decade rewarding loud interfaces. The next decade will reward restraint. Every blinking indicator, every confirmation toast, every notification is now a tax on attention — and the brands setting the new luxury bar are the ones charging the least of that tax.",
      "The shift is not aesthetic. It is structural. A product designed for ambience cannot lean on the dopamine of a screen. It has to earn its place by reliability, by deference, by quiet competence.",
    ],
  },
  {
    slug: "obsidian-glass-new-luxury",
    title: "Obsidian-Glass: The New Standard in Luxury",
    category: "Future Materials",
    excerpt:
      "Inside the materials lab redefining what premium feels like, one nano-textured surface at a time.",
    image: article2,
    author: "Marcus Kane",
    date: "2026-05-18",
    readMinutes: 6,
    body: [
      "Obsidian-glass is the marketing name. The technical term is a nano-textured aluminosilicate with a sub-micron carbon coating. The result is a surface that reads as black, behaves like glass, and resists fingerprints like nothing else on the market.",
      "It is not the first attempt at a 'better black.' It is the first one that survived contact with real users for more than a quarter.",
    ],
  },
  {
    slug: "haptic-revolution",
    title: "The Haptic Revolution: Feeling at a Distance",
    category: "Bio-Tech",
    excerpt:
      "From surgical robotics to remote intimacy, ultra-precise haptics are quietly rewriting what 'presence' means.",
    image: article3,
    author: "Dr. Iyer Tan",
    date: "2026-05-12",
    readMinutes: 11,
    body: [
      "The technical leap is not in the actuators. It is in the sampling. Modern haptic systems run at refresh rates approaching the threshold of human nerve discrimination — and the experience flips, suddenly, from 'simulated' to 'real.'",
      "When the brain stops correcting for latency, presence emerges. That is the line we just crossed.",
    ],
  },
  {
    slug: "quantum-encryption-10ms",
    title: "Quantum Encryption Achieves 10ms Latency",
    category: "Cybersecurity",
    excerpt:
      "A milestone result from the Aether Lab pushes post-quantum crypto into the realm of real-time apps.",
    image: article2,
    author: "Priya Raman",
    date: "2026-05-08",
    readMinutes: 5,
    body: [
      "The result, replicated three times this month, suggests quantum-secure channels are finally fast enough for consumer messaging.",
    ],
  },
  {
    slug: "aeris-x-hyperloop",
    title: "Aeris-X Hyperloop Opens for VIP Transit",
    category: "Mobility",
    excerpt:
      "The first commercial pod route runs at 0.6 Mach — and the cabin design is borrowed straight from luxury aviation.",
    image: article1,
    author: "Lukas Brandt",
    date: "2026-05-02",
    readMinutes: 7,
    body: [
      "Aeris-X opens its inaugural Geneva–Milan corridor with a cabin design that owes more to a private jet than a train.",
    ],
  },
  {
    slug: "nova-core-aether-chipset",
    title: "Nova Core Releases the 'Aether' Chipset",
    category: "Hardware",
    excerpt: "A 2nm node, on-package memory, and one very interesting neural co-processor.",
    image: article3,
    author: "Sora Akin",
    date: "2026-04-28",
    readMinutes: 9,
    body: [
      "The Aether is not the fastest chip on the market. It is, by a wide margin, the most efficient one — and that distinction is starting to matter more.",
    ],
  },
];

export const tickerItems = [
  "Quantum Encryption achieves 10ms latency",
  "Aeris-X hyperloop opens for VIP transit",
  "Bio-Digital synthesis reaches 3rd phase",
  "Nova Core releases 'Aether' chipset",
  "Lunar relay achieves 10Gbps downlink",
];

export const products: Product[] = [
  {
    slug: "nova-01-titanium",
    name: "NOVA-01 Titanium",
    category: "Limited Edition",
    price: 4200,
    image: productHero,
    blurb:
      "Our first proprietary piece of hardware. A single block of aerospace titanium, precision-engineered.",
    specs: [
      { label: "Material", value: "Grade 5 Titanium" },
      { label: "Edition", value: "001 / 500" },
      { label: "Warranty", value: "Lifetime" },
    ],
  },
  {
    slug: "matrix-keyboard",
    name: "Matrix Mechanical Keyboard",
    category: "Keyboards",
    price: 249,
    image: productKeyboard,
    blurb: "Optical-switch keyboard with low-profile cyan backlight.",
    specs: [
      { label: "Switches", value: "Optical Linear" },
      { label: "Layout", value: "75% Wireless" },
    ],
  },
  {
    slug: "nova-audio-pro",
    name: "Nova Audio Pro",
    category: "Headphones",
    price: 499,
    image: productHeadphones,
    blurb: "Active spatial noise cancellation in a single-piece machined housing.",
    specs: [
      { label: "Driver", value: "42mm Planar" },
      { label: "Battery", value: "60 hours" },
    ],
  },
  {
    slug: "chronos-watch",
    name: "Chronos Smartwatch",
    category: "Wearables",
    price: 599,
    image: productWatch,
    blurb: "Sapphire crystal, titanium case, always-on luxury timepiece interface.",
    specs: [
      { label: "Case", value: "Titanium 42mm" },
      { label: "Display", value: "AMOLED LTPO" },
    ],
  },
  {
    slug: "phantom-mouse",
    name: "Phantom Gaming Mouse",
    category: "PC Accessories",
    price: 159,
    image: productMouse,
    blurb: "Featherweight wireless mouse with 32K DPI and 8KHz polling.",
    specs: [
      { label: "Weight", value: "54g" },
      { label: "Sensor", value: "PMW-Nova" },
    ],
  },
  {
    slug: "nova-book-pro",
    name: "NovaBook Pro 16",
    category: "Laptops",
    price: 2899,
    image: productLaptop,
    blurb: "ARM-architecture flagship laptop in CNC space-gray aluminum.",
    specs: [
      { label: "Chip", value: "Aether M3" },
      { label: "Display", value: '16" XDR' },
    ],
  },
  {
    slug: "nova-phone-edge",
    name: "Nova Phone Edge",
    category: "Smartphones",
    price: 1199,
    image: productPhone,
    blurb: "Bezel-less titanium smartphone with computational optics.",
    specs: [
      { label: "Display", value: '6.7" LTPO' },
      { label: "Frame", value: "Titanium" },
    ],
  },
  {
    slug: "aurora-ultrawide",
    name: 'Aurora 34" Ultrawide',
    category: "Monitors",
    price: 1399,
    image: productMonitor,
    blurb: 'Curved 34" QD-OLED display for studio-grade color work.',
    specs: [
      { label: "Resolution", value: "5120×2160" },
      { label: "Panel", value: "QD-OLED" },
    ],
  },
];

export const categories = [
  "Keyboards",
  "Headphones",
  "Wearables",
  "Laptops",
  "Smartphones",
  "Monitors",
  "PC Accessories",
];

export const testimonials = [
  {
    quote:
      "TechNova doesn't just report on the future; they define the aesthetic of the next century.",
    author: "Elena Voronina",
    role: "Lead Futurist, Aethelgard",
  },
  {
    quote:
      "The only publication that understands luxury in the digital age is about soul, not just specs.",
    author: "Marcus Kane",
    role: "CEO, Obsidian Dynamics",
  },
];
