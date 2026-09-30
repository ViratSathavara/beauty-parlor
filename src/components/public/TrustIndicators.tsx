import { ShieldCheck, Award, Sparkles, HeartHandshake, Leaf } from "lucide-react";

const TRUST_METRICS = [
  {
    icon: Leaf,
    title: "100% Organic Botanicals",
    description: "Sulfate-free, gentle formulations safe for delicate skin",
  },
  {
    icon: Award,
    title: "Master Certified Artists",
    description: "Trained in London, Mumbai & Tokyo aesthetics",
  },
  {
    icon: ShieldCheck,
    title: "Hospital-Grade Sterilization",
    description: "Autoclaved instruments & single-use disposable kits",
  },
  {
    icon: Sparkles,
    title: "Private Luxury Lounges",
    description: "Dedicated suites for bridal & deep relaxation rituals",
  },
  {
    icon: HeartHandshake,
    title: "Transparent Pricing",
    description: "Zero hidden charges, optional online advance deposits",
  },
];

export default function TrustIndicators() {
  return (
    <section className="border-y border-border bg-surface py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center sm:text-left">
          {TRUST_METRICS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="p-2.5 rounded-full bg-surface-raised border border-border text-gold shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    {item.title}
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
