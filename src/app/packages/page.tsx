import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, ArrowRight, Sparkles } from "lucide-react";
import { getPackages } from "@/services/catalogService";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Curated Packages & Bundled Rituals",
  description: "Explore curated beauty packages bundling facials, hair spas, and manicures with significant savings.",
};

export const revalidate = 60;

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Curated Sanctuary Combinations
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Bespoke Ritual Packages
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Indulge in harmonious combinations of our most celebrated skin, hair, and bridal treatments crafted to deliver comprehensive transformation at substantial savings.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.slug}
              className={`bg-surface-raised border rounded-sm flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl ${
                pkg.isFeatured ? "border-gold ring-1 ring-gold/40 shadow-lg" : "border-border hover:border-gold/50"
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden image-zoom-container bg-border-subtle">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 bg-gold text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                    Save {formatPrice(pkg.savings)}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-xs text-charcoal-muted">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{pkg.durationHours} Hours Dedicated Ritual</span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal font-medium">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {pkg.tagline}
                  </p>

                  <div className="bg-surface p-3.5 border border-border flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-2xl font-medium text-charcoal">
                        {formatPrice(pkg.packagePrice)}
                      </span>
                      <span className="text-xs text-stone-400 line-through pl-2">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal block">
                      Services Included:
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal-muted">
                      {pkg.includedServices.slice(0, 4).map((s, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span className="truncate">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <Link
                  href={`/book?package=${pkg.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
