"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, Phone, Calendar, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

const NAV_LINKS = [
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-canvas/98 backdrop-blur-md border-b border-border/80 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo with Generous Separation */}
          <Link href="/" className="flex flex-col group shrink-0 mr-10 lg:mr-16">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.16em] uppercase text-charcoal font-medium group-hover:text-gold-dark transition-colors leading-tight">
              Elegance
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-charcoal-muted font-sans -mt-0.5">
              Beauty Sanctuary
            </span>
          </Link>

          {/* Desktop Navigation (Centering & Perfect Margins) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-xs uppercase tracking-[0.18em] font-medium">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 whitespace-nowrap ${
                    isActive
                      ? "text-gold-dark font-semibold"
                      : "text-charcoal hover:text-gold-dark"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0 ml-auto">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="text-xs uppercase tracking-wider text-charcoal hover:text-gold-dark flex items-center space-x-1.5 px-3 py-2 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-gold-dark" />
              <span className="hidden xl:inline">Call Us</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center space-x-2 bg-charcoal text-canvas hover:bg-gold-dark hover:text-white px-5 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-sm border border-charcoal hover:border-gold-dark rounded-sm"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Navigation Trigger (< 1024px) */}
          <div className="lg:hidden flex items-center space-x-3 ml-auto">
            <Link
              href="/book"
              className="bg-charcoal text-canvas px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm sm:hidden"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-charcoal hover:text-gold-dark focus:outline-none flex items-center space-x-1.5 border border-border rounded-sm bg-surface"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[11px] uppercase tracking-wider font-semibold hidden sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[80px] bg-canvas/98 backdrop-blur-xl border-b border-border shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)] z-50">
          <div className="max-w-3xl mx-auto px-6 pt-6 pb-10 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs uppercase tracking-widest font-medium">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3.5 border rounded-sm flex items-center justify-between transition-all ${
                  pathname === "/"
                    ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-xs"
                    : "bg-surface text-charcoal border-border hover:bg-surface-hover"
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`p-3.5 border rounded-sm flex items-center justify-between transition-all ${
                      isActive
                        ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-xs"
                        : "bg-surface text-charcoal border-border hover:bg-surface-hover"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isActive ? "text-gold" : "text-charcoal-muted"}`} />
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                className="flex-1 flex items-center justify-center space-x-2 border border-charcoal text-charcoal py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-surface-hover transition-all"
              >
                <Phone className="w-4 h-4 text-gold-dark" />
                <span>Call Salon ({SITE_CONFIG.phone})</span>
              </a>
              <Link
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center space-x-2 bg-gold hover:bg-gold-dark text-charcoal hover:text-canvas py-3.5 text-xs uppercase tracking-widest font-bold transition-all rounded-sm shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reserve Online Appointment</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
