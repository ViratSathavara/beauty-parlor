import { Metadata } from "next";
import { Sparkles, MessageCircle } from "lucide-react";
import { getServices, getStaffMembers } from "@/services/catalogService";
import BookingWizard from "@/components/booking/BookingWizard";
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
    <div className="bg-canvas py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real-Time Reservation Engine</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-charcoal">
            Reserve Your Sanctuary Ritual
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-xl mx-auto font-light">
            Select your preferred treatment, date, specialist, and live time slot below to secure your appointment.
          </p>
        </div>

        {/* 8-Step Interactive Booking Wizard */}
        <BookingWizard
          services={services}
          staffMembers={staff}
          initialServiceSlug={serviceSlug}
          initialCoupon={coupon}
        />

        {/* WhatsApp Concierge Banner */}
        <div className="bg-espresso text-canvas p-6 rounded-sm text-center space-y-3 border border-gold/30">
          <h3 className="font-serif text-xl font-normal">Need Same-Day VIP Booking?</h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto font-light">
            Our WhatsApp concierge team can instantly confirm available time slots or assist with custom bridal consultation scheduling.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all"
          >
            <MessageCircle className="w-4 h-4 text-charcoal" />
            <span>Chat With Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}

