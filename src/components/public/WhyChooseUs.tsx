import { Sparkles, Flower2, Clock, ShieldCheck, Gem } from "lucide-react";

const PILLARS = [
  {
    icon: Flower2,
    number: "01",
    title: "Bio-Cellular Botanical Formulations",
    description: "We strictly reject aggressive chemical bleaching and synthetic silicones. Every hair mask, facial peeling serum, and nail polish is organically certified, sulfate-free, and ethically sourced from premier European and Japanese laboratories.",
  },
  {
    icon: Gem,
    number: "02",
    title: "Artisanal Precision & Master Specialists",
    description: "Our senior stylists and bridal aestheticians possess an average of 9+ years of rigorous training. From architectural brow geometry to 24-hour sweat-proof HD airbrushing, treatments are executed with surgical care.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Private Acoustically-Isolated Suites",
    description: "Escape the noise of generic multi-chair parlors. Indulge in private temperature-controlled treatment rooms, soothing aromatherapy misting, warm herbal teas, and meditative soundscapes designed for true restoration.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Hospital-Grade Cleanliness Standards",
    description: "Your health and skin barrier are paramount. All metallic instruments undergo 3-stage medical autoclave sterilization. Nail files, waxing applicators, and facial sponges are strictly single-use and opened in your presence.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Title & Manifesto */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
              The Elegance Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
              An Architectural Approach to Modern Indian Beauty
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              We founded Elegance on the belief that beauty rituals should never feel rushed or industrial. We treat skincare, hair reconstruction, and bridal couture as mindful craft — celebrating your organic essence with understated sophistication.
            </p>
            <div className="pt-2 border-t border-border flex items-center space-x-8">
              <div>
                <span className="font-serif text-3xl text-charcoal font-light">12+</span>
                <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted mt-0.5">
                  Years of Mastery
                </span>
              </div>
              <div className="border-l border-border pl-8">
                <span className="font-serif text-3xl text-charcoal font-light">99.4%</span>
                <span className="block text-[10px] uppercase tracking-wider text-charcoal-muted mt-0.5">
                  Client Satisfaction
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Pillars Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-surface-raised border border-border p-8 rounded-sm space-y-4 hover:border-gold/60 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-full bg-surface border border-border text-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-stone-400 font-semibold">
                      {pillar.number}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg text-charcoal font-medium">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
