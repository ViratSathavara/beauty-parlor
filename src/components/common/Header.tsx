"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Phone, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/bridal", label: "Bridal" },
  { href: "/packages", label: "Packages" },
  { href: "/offers", label: "Offers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b border-border/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] uppercase text-charcoal font-medium group-hover:text-gold-dark transition-colors">
              Elegance
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-charcoal-muted -mt-1 font-sans">
              Beauty Sanctuary
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? "text-gold font-semibold"
                      : "text-charcoal hover:text-gold"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="text-xs uppercase tracking-wider text-charcoal hover:text-gold flex items-center space-x-1.5 px-3 py-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Us</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center space-x-2 bg-charcoal text-canvas hover:bg-gold-hover hover:text-white px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm border border-charcoal hover:border-gold-hover"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            <Link
              href="/book"
              className="bg-charcoal text-canvas px-3 py-1.5 text-[11px] uppercase tracking-wider font-semibold"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-charcoal hover:text-gold focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-canvas border-b border-border px-6 pt-4 pb-8 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-border-subtle ${
                    isActive ? "text-gold font-semibold" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border flex flex-col space-y-3">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center space-x-2 border border-charcoal text-charcoal py-3 text-xs uppercase tracking-widest font-semibold"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Salon ({SITE_CONFIG.phone})</span>
            </a>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center space-x-2 bg-charcoal text-canvas py-3 text-xs uppercase tracking-widest font-semibold"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Book Appointment Online</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
