import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, Calendar, Clock, ArrowRight, MessageCircle } from "lucide-react";
import { getServices, getStaffMembers } from "@/services/catalogService";
import { formatPrice, formatDuration } from "@/lib/utils";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Online Appointment Booking",
  description: "Reserve your bespoke beauty treatment or consultation online at Elegance Beauty Sanctuary.",
};

export const revalidate = 60;

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; package?: string; staffId?: string; coupon?: string }>;
}) {
  const { service: serviceSlug, package: packageSlug, staffId, coupon } = await searchParams;
  const [services, staff] = await Promise.all([getServices(), getStaffMembers()]);
  const whatsappUrl = getWhatsAppInquiryLink("general");

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Reservation Engine</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Reserve Your Sanctuary Ritual
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light max-w-xl mx-auto">
            Choose your desired ritual below to launch our real-time availability calendar. (Full Phase 3 Concurrency Engine & Razorpay Checkout will integrate into this wizard).
          </p>
        </div>

        {coupon && (
          <div className="bg-surface p-4 border border-gold/40 rounded-sm text-center text-xs text-charcoal flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Active Promotion Applied: <strong className="font-mono text-gold-dark font-bold">{coupon}</strong></span>
          </div>
        )}

        {/* Services Quick Selection Grid */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
            Step 1: Select Your Treatment
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.slice(0, 8).map((s) => {
              const isSelected = serviceSlug === s.slug;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className={`p-5 rounded-sm border transition-all duration-200 flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "bg-charcoal text-canvas border-charcoal shadow-md"
                      : "bg-surface-raised hover:bg-surface-hover text-charcoal border-border"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-medium">{s.name}</h4>
                      <p className={`text-xs mt-0.5 ${isSelected ? "text-stone-300" : "text-charcoal-muted"}`}>
                        {formatDuration(s.durationMinutes)} • {s.categorySlug.toUpperCase()}
                      </p>
                    </div>
                    <span className={`font-serif text-base font-semibold ${isSelected ? "text-gold" : "text-charcoal"}`}>
                      {formatPrice(s.discountPrice || s.basePrice)}
                    </span>
                  </div>

                  <div className={`pt-2 border-t flex items-center justify-between text-xs ${isSelected ? "border-white/20" : "border-border"}`}>
                    <span className="text-[10px] uppercase tracking-wider">
                      Advance: {formatPrice(s.advancePaymentAmount)}
                    </span>
                    <span className="font-semibold flex items-center space-x-1">
                      <span>View Slot Calendar</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Fast-Track Concierge */}
        <div className="bg-espresso text-canvas p-8 rounded-sm text-center space-y-4 border border-gold/30">
          <h3 className="font-serif text-2xl font-normal">
            Need Immediate Same-Day Booking?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto font-light leading-relaxed">
            Our WhatsApp concierge can instantly confirm slots for today or assist with custom bridal package scheduling.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal px-7 py-3.5 text-xs uppercase tracking-widest font-bold transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-charcoal" />
            <span>Chat With Concierge Now</span>
          </a>
        </div>
      </div>
    </div>
  );
}
