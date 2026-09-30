import Link from "next/link";
import { Crown, Check, ArrowRight } from "lucide-react";

const TIERS = [
  {
    name: "Silver Privilege",
    tagline: "Essential quarterly renewal and priority booking",
    price: "₹4,999",
    period: "Annual",
    discount: "10% Off All Services",
    benefits: [
      "10% privileged discount across all hair & skin rituals",
      "1 Complimentary Signature Facial per year",
      "Priority weekend appointment reservation",
      "Exclusive birthday month privilege voucher",
    ],
    isFeatured: false,
  },
  {
    name: "Gold Royale",
    tagline: "Our premier tier for devoted beauty aficionados",
    price: "₹9,999",
    period: "Annual",
    discount: "20% Off All Services",
    benefits: [
      "20% privileged discount across all salon rituals",
      "2 Complimentary Signature Hydra-Glow Facials",
      "1 Complimentary Caviar Hair Spa & Blowout",
      "Dedicated Senior Specialist assignment",
      "Invitation to seasonal private trunk shows",
      "Complimentary private dressing suite access",
    ],
    isFeatured: true,
  },
  {
    name: "Platinum Haute",
    tagline: "Unrestricted luxury couture with bespoke privileges",
    price: "₹18,999",
    period: "Annual",
    discount: "25% Off All Services",
    benefits: [
      "25% privileged discount across all services & retail products",
      "4 Complimentary Luxury Facials & Hair Spas per year",
      "Unlimited express eyebrow & threading services",
      "Guaranteed same-day emergency slot reservation",
      "Personal Beauty Concierge on WhatsApp",
      "1 Complimentary Full-Glam Makeover for an accompanying guest",
    ],
    isFeatured: false,
  },
];

export default function MembershipPreview() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Crown className="w-3.5 h-3.5" />
            <span>The Elegance Circle</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            VIP Membership Privileges
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Enjoy sustained personal care and substantial annual savings with our curated sanctuary membership tiers.
          </p>
        </div>

        {/* Membership Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-canvas border rounded-sm p-8 flex flex-col justify-between space-y-8 transition-all duration-300 hover:shadow-2xl ${
                tier.isFeatured
                  ? "border-gold shadow-xl ring-1 ring-gold/40"
                  : "border-border hover:border-gold/50"
              }`}
            >
              {tier.isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-charcoal text-gold px-4 py-1 text-[10px] uppercase tracking-[0.25em] font-bold border border-gold/40">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-1">
                    {tier.tagline}
                  </p>
                </div>

                <div className="bg-surface p-4 border border-border">
                  <div className="flex items-baseline space-x-1">
                    <span className="font-serif text-4xl text-charcoal font-normal">
                      {tier.price}
                    </span>
                    <span className="text-xs text-charcoal-muted">
                      / {tier.period}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gold-dark block mt-1">
                    {tier.discount}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-charcoal-muted">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href="/contact?topic=membership"
                  className={`w-full inline-flex items-center justify-center space-x-2 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
                    tier.isFeatured
                      ? "bg-charcoal hover:bg-gold text-canvas"
                      : "border border-charcoal text-charcoal hover:bg-charcoal hover:text-canvas"
                  }`}
                >
                  <span>Inquire for Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
