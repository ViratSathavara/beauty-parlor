import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/public/ContactForm";
import { SITE_CONFIG } from "@/lib/seo";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Consultations",
  description: "Connect with Elegance Beauty Sanctuary in Indiranagar, Bengaluru. Inquire about bespoke bridal bookings, skincare therapies, and VIP memberships.",
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppInquiryLink("general");

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Personal Concierge & Inquiries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Connect With Our Sanctuary
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Whether planning your wedding aesthetics, inquiring about tailored memberships, or reserving private treatments, our concierge is at your service.
          </p>
        </div>

        {/* Form and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Right Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick WhatsApp Box */}
            <div className="bg-espresso text-canvas p-8 rounded-sm space-y-4 border border-gold/30">
              <span className="text-[10px] uppercase tracking-widest text-gold font-semibold block">
                Immediate Response
              </span>
              <h3 className="font-serif text-2xl font-normal">
                Prefer Instant Messaging?
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                Chat directly with our front-desk concierge on WhatsApp for quick slot inquiries, service recommendations, or photo consultations.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-charcoal" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Salon Details */}
            <div className="bg-surface-raised border border-border p-8 rounded-sm space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                Flagship Indiranagar Sanctuary
              </h4>

              <div className="space-y-4 text-xs text-charcoal-muted">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Address:</p>
                    <p>{SITE_CONFIG.address.street}, Indiranagar, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} — {SITE_CONFIG.address.postalCode}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">Valet Parking Available at Entrance</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-charcoal">Phone:</p>
                    <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <div>
                    <p className="font-medium text-charcoal">Email:</p>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-border">
                  <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-charcoal">Operating Hours:</p>
                    <p>Tuesday – Sunday: 09:30 AM – 08:30 PM</p>
                    <p className="text-stone-400">Monday: Closed for deep sanitization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
