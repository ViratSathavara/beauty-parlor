import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";
import { SeedReview } from "@/lib/db/seedData";

interface CustomerReviewsProps {
  reviews: SeedReview[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Client Testimonials & Praise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Echoes of Indulgence
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Read unprompted experiences shared by our valued brides, executives, and skincare connoisseurs across Bengaluru.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-surface-raised border border-border p-6 rounded-sm flex flex-col justify-between space-y-6 hover:border-gold/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300" />
                </div>

                {/* Review Text */}
                <p className="text-xs text-charcoal-muted leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border flex items-center space-x-3">
                {rev.avatarUrl && (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border shrink-0">
                    <Image
                      src={rev.avatarUrl}
                      alt={rev.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="overflow-hidden">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal truncate">
                    {rev.customerName}
                  </h4>
                  <p className="text-[10px] text-gold-dark truncate">
                    {rev.serviceName}
                  </p>
                  <span className="text-[9px] text-stone-400 block">
                    {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Reviews page */}
        <div className="mt-12 text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal hover:text-gold font-semibold transition-colors"
          >
            <span>Read All Verified Customer Experiences</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
