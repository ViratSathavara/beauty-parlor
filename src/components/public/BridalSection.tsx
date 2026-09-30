import Link from "next/link";
import Image from "next/image";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { SeedPackage } from "@/lib/db/seedData";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

interface BridalSectionProps {
  packages: SeedPackage[];
}

export default function BridalSection({ packages }: BridalSectionProps) {
  const whatsappBridal = getWhatsAppInquiryLink("bridal");

  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Couture Bridal Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            The Royal Bridal Suites
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Designed for the discerning Indian bride. Complete pre-bridal cellular detox, sangeet glamour, and wedding day 4K HD airbrush artistry in a private dressing suite.
          </p>
        </div>

        {/* Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className={`relative bg-surface-raised border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                pkg.isFeatured
                  ? "border-gold ring-1 ring-gold/40 shadow-xl"
                  : "border-border hover:border-gold/50"
              }`}
            >
              {pkg.isFeatured && (
                <div className="bg-espresso-deep text-gold text-center py-2 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-gold/30">
                  Most Coveted Haute Suite
                </div>
              )}

              <div>
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden image-zoom-container bg-border-subtle">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-canvas">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold block">
                      {pkg.durationHours} Hours Dedicated Rituals
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal font-medium">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-surface p-4 border border-border rounded-sm">
                    <div className="flex items-baseline space-x-3">
                      <span className="font-serif text-3xl font-medium text-charcoal">
                        {formatPrice(pkg.packagePrice)}
                      </span>
                      <span className="text-sm text-stone-400 line-through">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block mt-1">
                      You Save {formatPrice(pkg.savings)} with Package
                    </span>
                  </div>

                  {/* Inclusions List */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                      Suite Inclusions:
                    </h4>
                    <ul className="space-y-2 text-xs text-charcoal-muted">
                      {pkg.includedServices.slice(0, 6).map((service, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="p-6 sm:p-8 pt-0 space-y-3 mt-auto">
                <Link
                  href={`/book?package=${pkg.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold-dark text-canvas py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                >
                  <span>Reserve Bridal Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={whatsappBridal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 text-charcoal hover:text-gold text-xs uppercase tracking-wider font-medium py-1.5 transition-colors"
                >
                  <span>Book In-Person Consultation</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 bg-surface p-6 border border-border flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-muted space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <span>Dedicated bridal trials available 30 days prior. Maximum 2 brides accepted per calendar weekend.</span>
          </div>
          <Link
            href="/bridal"
            className="text-xs uppercase tracking-widest text-charcoal font-semibold hover:text-gold shrink-0 transition-colors"
          >
            Learn More About Our Bridal Philosophy →
          </Link>
        </div>
      </div>
    </section>
  );
}
