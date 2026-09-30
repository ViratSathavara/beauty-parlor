"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Copy, Check, ArrowRight, Tag, Calendar, Percent } from "lucide-react";

interface OfferItem {
  code: string;
  title: string;
  tagline: string;
  discount: string;
  minSpend: string;
  validUntil: string;
  applicableTo: string;
  category: string;
}

const OFFERS: OfferItem[] = [
  {
    code: "FACIAL20",
    title: "New Guest Hydra-Facial Privilege",
    tagline: "Receive 20% off on your first Signature Hydra-Glow or Rose Pearl facial.",
    discount: "20% OFF",
    minSpend: "Min. spend ₹1,500",
    validUntil: "31 Dec 2026",
    applicableTo: "All Skin Care & Facial Rituals",
    category: "Skin",
  },
  {
    code: "BRIDAL10",
    title: "Early Bride Suite Booking",
    tagline: "Book your luxury bridal package at least 60 days in advance to unlock ₹3,000 extra savings.",
    discount: "Flat ₹3,000 OFF",
    minSpend: "Min. spend ₹25,000",
    validUntil: "Ongoing 2026",
    applicableTo: "Royal Maharani & Essential Glow Bridal Packages",
    category: "Bridal",
  },
  {
    code: "FESTIVE15",
    title: "Festive Celebration Hair & Nails",
    tagline: "Pair any Caviar Hair Spa or Keratin treatment with gel nail sculpting for an instant 15% reduction.",
    discount: "15% OFF",
    minSpend: "Min. spend ₹3,000",
    validUntil: "30 Nov 2026",
    applicableTo: "Hair Spa, Keratin & Gel Nail Art",
    category: "Hair & Nails",
  },
  {
    code: "RELAX500",
    title: "Midweek Sanctuary Refresh",
    tagline: "Enjoy a flat ₹500 discount on appointments scheduled for Tuesday, Wednesday, or Thursday.",
    discount: "Flat ₹500 OFF",
    minSpend: "Min. spend ₹2,000",
    validUntil: "Valid Tue - Thu Only",
    applicableTo: "All Treatments",
    category: "All",
  },
];

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Privileges</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Promotional Vouchers & Codes
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Copy any active sanctuary code below to apply instant discounts during step 6 of your online booking.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((offer) => (
            <div
              key={offer.code}
              className="bg-surface-raised border border-border p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-sm hover:border-gold/60 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-surface px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-charcoal border border-border">
                    {offer.category}
                  </span>
                  <span className="font-serif text-2xl font-medium text-gold-dark">
                    {offer.discount}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {offer.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {offer.tagline}
                </p>

                <div className="text-[11px] text-stone-500 space-y-1 border-t border-border pt-3">
                  <p>• Applicable: {offer.applicableTo}</p>
                  <p>• {offer.minSpend}</p>
                  <p>• Valid Until: {offer.validUntil}</p>
                </div>
              </div>

              {/* Coupon Box & Action */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto bg-canvas border border-dashed border-gold px-4 py-2.5 rounded-sm flex items-center justify-between space-x-4">
                  <span className="font-mono text-base font-bold text-charcoal tracking-widest">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => handleCopy(offer.code)}
                    className="text-charcoal hover:text-gold transition-colors"
                    title="Copy Code"
                  >
                    {copiedCode === offer.code ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>COPIED</span>
                      </span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <Link
                  href={`/book?coupon=${offer.code}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-2.5 px-5 text-xs uppercase tracking-widest font-semibold transition-all duration-200"
                >
                  <span>Apply & Book</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
