"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppInquiryLink("general");

  return (
    <aside aria-label="WhatsApp Concierge" className="fixed bottom-6 right-6 z-50 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2.5 bg-espresso-deep hover:bg-gold-dark text-canvas px-4 py-3 rounded-full shadow-2xl border border-gold/40 transition-all duration-300 transform hover:scale-105"
        aria-label="Chat with Beauty Concierge on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
        <span className="text-xs uppercase tracking-widest font-semibold hidden sm:inline-block">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  );
}
