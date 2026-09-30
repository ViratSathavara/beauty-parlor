import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

export default function Footer() {
  return (
    <footer className="bg-espresso-deep text-stone-300 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl tracking-[0.2em] uppercase text-canvas font-medium">
                Elegance
              </span>
              <span className="block text-[9px] uppercase tracking-[0.4em] text-gold -mt-1 font-sans">
                Beauty Sanctuary
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              An architectural aesthetic sanctuary crafting bespoke Indian bridal transformations, restorative cellular hair spas, medical hydra-dermabrasion, and bespoke nail couture.
            </p>
            <div className="pt-2">
              <Link
                href="/book"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold hover:text-white font-semibold group transition-colors"
              >
                <span>Reserve An Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-canvas font-semibold">
              Signature Rituals
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services/signature-hydra-glow-facial" className="hover:text-gold transition-colors">
                  Signature Hydra Facial
                </Link>
              </li>
              <li>
                <Link href="/services/caviar-argan-hair-spa" className="hover:text-gold transition-colors">
                  Caviar Restorative Hair Spa
                </Link>
              </li>
              <li>
                <Link href="/services/brazilian-keratin-treatment" className="hover:text-gold transition-colors">
                  Keratin Protein Infusion
                </Link>
              </li>
              <li>
                <Link href="/services/gel-sculpting-nail-art" className="hover:text-gold transition-colors">
                  Artisanal Gel Nail Art
                </Link>
              </li>
              <li>
                <Link href="/services/full-body-satin-waxing" className="hover:text-gold transition-colors">
                  Botanical Satin Waxing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Bridal & Packages */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-canvas font-semibold">
              Boutique Curations
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link href="/bridal" className="hover:text-gold transition-colors">
                  Royal Bridal Suite
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-gold transition-colors">
                  Curated Packages
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-gold transition-colors">
                  Privilege Offers & Codes
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">
                  Lookbook & Gallery
                </Link>
              </li>
              <li>
                <Link href="/gallery/before-after" className="hover:text-gold transition-colors">
                  Before / After Showcase
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-gold transition-colors">
                  Verified Client Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-canvas font-semibold">
              Sanctuary Details
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address.street}, {SITE_CONFIG.address.city}, {SITE_CONFIG.address.postalCode}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start space-x-2.5 pt-1">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <p>Tue – Sun: 09:30 AM – 08:30 PM</p>
                  <p className="text-stone-400">Monday: Closed for Sanctuary Sanitization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-xs uppercase tracking-wider">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-gold transition-colors">
              Refund & Cancellation
            </Link>
            <Link href="/location" className="hover:text-gold transition-colors">
              Find Sanctuary
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
