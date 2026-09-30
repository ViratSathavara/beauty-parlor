"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Copy, Check, ArrowRight } from "lucide-react";

export default function FeaturedOffer() {
  const [copied, setCopied] = useState(false);
  const couponCode = "FACIAL20";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-16 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-espresso text-canvas p-8 sm:p-12 lg:p-16 rounded-sm shadow-2xl border border-gold/30">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Seasonal Privilege</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                20% Off Your First Signature Hydra-Glow Facial
              </h3>
              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-light leading-relaxed">
                Indulge in vortex water-suction pore extraction, pure antioxidant infusion, and cryo-globe soothing. Reserved exclusively for new sanctuary guests.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-end space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-4">
              {/* Coupon Box */}
              <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-300 block">
                    Use Promo Code
                  </span>
                  <span className="font-mono text-xl font-bold tracking-widest text-gold">
                    {couponCode}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2.5 bg-white/10 hover:bg-gold hover:text-charcoal rounded-sm transition-colors text-white"
                  title="Copy coupon code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Action */}
              <Link
                href={`/book?coupon=${couponCode}`}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md"
              >
                <span>Claim Offer & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
