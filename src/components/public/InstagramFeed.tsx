import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";

const INSTAGRAM_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    caption: "Architectural bridal hair sculpt with delicate fresh jasmine buds.",
  },
  {
    image: "https://images.unsplash.com/photo-1512290900672-1f55b9e0350d?auto=format&fit=crop&w=600&q=80",
    caption: "The calm before the wedding: Hydra-infusion glow therapy.",
  },
  {
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    caption: "Traditional royal vermillion bride with 24-hr transfer-proof airbrush.",
  },
  {
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    caption: "Bespoke gold chrome French tips by master nail artist Kavita.",
  },
  {
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&q=80",
    caption: "Aromatherapy steam infusion during our Caviar Restorative Hair Spa.",
  },
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    caption: "Evening reception glam with soft smokey bronze eyes.",
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-border space-y-4 sm:space-y-0 text-center sm:text-left">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
              Editorial Visual Chronicle
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal font-normal mt-1">
              Follow Our Daily Artistry @elegancebeauty
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-canvas px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
          >
            <Instagram className="w-4 h-4 text-gold" />
            <span>Join Our Circle</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6-Col Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {INSTAGRAM_POSTS.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-border-subtle rounded-sm"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center text-canvas">
                <Instagram className="w-6 h-6 text-gold mb-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
