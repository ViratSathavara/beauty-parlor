import Link from "next/link";
import { Phone, Clock, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

export default function AnnouncementBar() {
  return (
    <div className="bg-espresso-deep text-canvas text-xs tracking-wider uppercase py-2 px-4 border-b border-white/10 hidden sm:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-stone-300">
            <Clock className="w-3.5 h-3.5 text-gold" />
            <span>Tue – Sun: 09:30 AM – 08:30 PM (Mon Closed)</span>
          </div>
          <a
            href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
            className="flex items-center space-x-2 text-stone-300 hover:text-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-gold" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
        </div>
        <div className="flex items-center space-x-2 text-stone-300">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Seasonal Privilege: 20% off on First Hydra-Facial with code </span>
          <span className="font-semibold text-gold tracking-widest pl-1">FACIAL20</span>
        </div>
      </div>
    </div>
  );
}
