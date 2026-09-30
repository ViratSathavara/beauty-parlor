"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { SeedService, SeedServiceCategory } from "@/lib/db/seedData";
import { formatPrice, formatDuration } from "@/lib/utils";

interface PopularServicesProps {
  categories: SeedServiceCategory[];
  services: SeedService[];
}

export default function PopularServices({ categories, services }: PopularServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices = activeCategory === "all"
    ? services.slice(0, 6)
    : services.filter((s) => s.categorySlug === activeCategory);

  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Artisanal Sanctuary Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Signature Beauty Rituals
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Every treatment is personalized to your unique anatomy, utilizing clinical-grade botanical formulations and serene ritualistic techniques.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10 mb-14">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 text-xs uppercase tracking-widest transition-all duration-200 border ${
              activeCategory === "all"
                ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-sm"
                : "bg-surface hover:bg-surface-hover text-charcoal-muted border-border"
            }`}
          >
            All Rituals
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 text-xs uppercase tracking-widest transition-all duration-200 border ${
                activeCategory === cat.slug
                  ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-sm"
                : "bg-surface hover:bg-surface-hover text-charcoal-muted border-border"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="group bg-surface-raised border border-border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold/60"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden image-zoom-container bg-border-subtle">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 bg-canvas/90 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-charcoal">
                    {service.categorySlug}
                  </div>
                  {service.discountPrice && (
                    <div className="absolute top-3 right-3 bg-gold text-white px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold">
                      Special Rate
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-charcoal-muted">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{formatDuration(service.durationMinutes)}</span>
                  </div>
                  <h3 className="font-serif text-xl text-charcoal group-hover:text-gold-dark transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Bottom Bar */}
              <div className="px-6 pb-6 pt-2 border-t border-border flex items-center justify-between mt-auto">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-lg font-medium text-charcoal">
                      {formatPrice(service.discountPrice || service.basePrice)}
                    </span>
                    {service.discountPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatPrice(service.basePrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-charcoal-muted uppercase tracking-wider block">
                    Advance: {formatPrice(service.advancePaymentAmount)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs uppercase tracking-wider text-charcoal hover:text-gold font-medium px-2 py-1.5 transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    href={`/book?service=${service.slug}`}
                    className="inline-flex items-center space-x-1.5 bg-charcoal hover:bg-gold text-canvas hover:text-white px-3.5 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Footer Link */}
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-canvas px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300"
          >
            <span>Explore Complete Treatment Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
