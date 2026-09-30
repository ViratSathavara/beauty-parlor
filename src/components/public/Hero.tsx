"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Star, Sparkles } from "lucide-react";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export default function Hero() {
  const whatsappUrl = getWhatsAppInquiryLink("general");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-canvas py-20 lg:py-28">
      {/* Subtle architectural background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5DFD5_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Decorative luxury gradient blurs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blush/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-gold/40 bg-surface-raised text-charcoal text-xs uppercase tracking-[0.25em]"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Bespoke Indian Aesthetics & Sanctuary</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-charcoal leading-[1.08]">
                Look Beautiful. <br />
                <span className="italic font-light text-espresso">Feel Confident.</span>
              </h1>
              <p className="text-base sm:text-lg text-charcoal-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-light pt-2">
                Premium beauty and salon services designed around you. Experience medical-grade hydra-facials, royal bridal couture, caviar hair rituals, and artisanal nail care in an ambiance of pure serenity.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5 pt-2"
            >
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-charcoal hover:bg-gold-dark text-canvas px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md group border border-charcoal hover:border-gold-dark"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 bg-surface hover:bg-surface-hover text-charcoal border border-border px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Trust Micro-Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-charcoal-muted border-t border-border-subtle"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
                <span className="font-semibold text-charcoal pl-1">4.98 / 5.0</span>
              </div>
              <span className="text-border">|</span>
              <span>Over 5,000+ Verified Transformations</span>
            </motion.div>
          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Primary Editorial Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border border-border/80 image-zoom-container">
                <Image
                  src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1200&q=85"
                  alt="Elegance Beauty Sanctuary Salon Interior and Treatment"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-canvas/90 backdrop-blur-md p-4 border border-white/60 shadow-lg rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                    Signature Highlight
                  </p>
                  <p className="font-serif text-lg text-charcoal font-medium">
                    The Royal Maharani Bridal Suite
                  </p>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Bespoke HD airbrush makeup & private dressing suite
                  </p>
                </div>
              </div>

              {/* Offset Accent Card */}
              <div className="hidden sm:block absolute -top-6 -left-6 bg-surface-raised border border-border p-4 shadow-xl max-w-[200px]">
                <p className="font-serif text-2xl font-light text-charcoal">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-charcoal-muted">
                  Organic & Cruelty-Free Botanical Formulations
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
