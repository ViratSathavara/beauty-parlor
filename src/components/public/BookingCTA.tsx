import Link from "next/link";
import { Calendar, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export default function BookingCTA() {
  const whatsappUrl = getWhatsAppInquiryLink("general");

  return (
    <section className="py-24 bg-espresso text-canvas relative overflow-hidden border-t border-gold/30">
      {/* Decorative luxury radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
          Your Personal Care Sanctuary
        </span>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
          Ready to Experience Pure Aesthetic Indulgence?
        </h2>

        <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
          Book your private treatment online with our real-time availability engine, choose your preferred specialist, and enjoy seamless reservation.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/book"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gold hover:bg-gold-hover text-charcoal px-9 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-white/10 hover:bg-white/20 text-canvas border border-white/20 px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 backdrop-blur-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 text-stone-300 hover:text-white px-5 py-4 text-xs uppercase tracking-wider transition-colors"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
