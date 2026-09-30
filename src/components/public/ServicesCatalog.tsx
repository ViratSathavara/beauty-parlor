"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Clock, ArrowRight, Sparkles, Filter } from "lucide-react";
import { SeedService, SeedServiceCategory } from "@/lib/db/seedData";
import { formatPrice, formatDuration } from "@/lib/utils";

interface ServicesCatalogProps {
  categories: SeedServiceCategory[];
  services: SeedService[];
}

export default function ServicesCatalog({ categories, services }: ServicesCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "duration">("featured");

  const filteredServices = useMemo(() => {
    return services
      .filter((s) => {
        const matchesCategory = selectedCategory === "all" || s.categorySlug === selectedCategory;
        const matchesSearch =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice);
        }
        if (sortBy === "price-desc") {
          return (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice);
        }
        if (sortBy === "duration") {
          return a.durationMinutes - b.durationMinutes;
        }
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [services, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="bg-surface-raised border border-border p-4 sm:p-6 rounded-sm shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search treatments (e.g., Hydra Facial, Keratin, Bridal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-canvas border border-border text-charcoal text-xs placeholder:text-stone-400 focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Sort Select */}
        <div className="flex items-center space-x-3 text-xs">
          <label htmlFor="sort-services" className="text-charcoal-muted uppercase tracking-wider shrink-0 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </label>
          <select
            id="sort-services"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-canvas border border-border px-3 py-2 text-xs text-charcoal focus:outline-none focus:border-gold"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="duration">Treatment Duration</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
            selectedCategory === "all"
              ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-sm"
              : "bg-surface hover:bg-surface-hover text-charcoal-muted border-border"
          }`}
        >
          All Categories ({services.length})
        </button>
        {categories.map((cat) => {
          const count = services.filter((s) => s.categorySlug === cat.slug).length;
          return (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
                selectedCategory === cat.slug
                  ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-sm"
                  : "bg-surface hover:bg-surface-hover text-charcoal-muted border-border"
              }`}
            >
              {cat.name} ({count})
            </button>
          );
        })}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="py-20 text-center bg-surface-raised border border-border p-8 rounded-sm">
          <p className="font-serif text-2xl text-charcoal font-normal">
            No Treatments Found
          </p>
          <p className="text-xs text-charcoal-muted mt-2">
            Try adjusting your search keywords or resetting category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="mt-6 inline-block bg-charcoal text-canvas px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="group bg-surface-raised border border-border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gold/60"
            >
              <div>
                {/* Image */}
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
                      Special Privilege
                    </div>
                  )}
                </div>

                {/* Details */}
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
              <div className="px-6 pb-6 pt-3 border-t border-border flex items-center justify-between mt-auto">
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className="font-serif text-xl font-medium text-charcoal">
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
      )}
    </div>
  );
}
