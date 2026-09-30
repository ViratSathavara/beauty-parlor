import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ArrowRight, CheckCircle2 } from "lucide-react";
import { getReviews } from "@/services/catalogService";

export const metadata: Metadata = {
  title: "Client Reviews & Verified Ratings",
  description: "Read authentic customer reviews and ratings for Elegance Beauty Sanctuary services in Indiranagar, Bengaluru.",
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header & Rating Summary */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Verified Sanctuary Praise
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Client Reflections & Ratings
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Every review is submitted by a verified guest following a completed treatment at our Indiranagar sanctuary.
          </p>

          {/* Rating Summary Card */}
          <div className="mt-8 p-8 bg-surface-raised border border-border rounded-sm max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="text-center">
              <span className="font-serif text-5xl font-light text-charcoal block">
                4.98
              </span>
              <div className="flex items-center justify-center space-x-1 mt-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-[11px] uppercase tracking-wider text-charcoal-muted block mt-1">
                Out of 5.0 Stars
              </span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-8 space-y-1.5 text-xs text-charcoal-muted text-left">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>5,000+ Completed Treatments</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>99.4% Recommendation Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Verified Guest Submissions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-surface-raised border border-border p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-sm hover:border-gold/50 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-300" />
                </div>

                <p className="text-sm text-charcoal-muted leading-relaxed font-light italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center space-x-3.5">
                {rev.avatarUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border shrink-0">
                    <Image
                      src={rev.avatarUrl}
                      alt={rev.customerName}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    {rev.customerName}
                  </h4>
                  <p className="text-[11px] text-gold-dark font-medium">
                    {rev.serviceName}
                  </p>
                  <span className="text-[10px] text-stone-400">
                    {rev.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <Link
            href="/book"
            className="inline-flex items-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-3.5 px-8 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
          >
            <span>Experience Our 5-Star Care</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
