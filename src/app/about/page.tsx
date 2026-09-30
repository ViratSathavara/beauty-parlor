import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Our Sanctuary",
  description: "Learn about the heritage, philosophy, and master specialists behind Elegance Beauty Sanctuary in Indiranagar, Bengaluru.",
};

export default function AboutPage() {
  return (
    <div className="bg-canvas">
      {/* Editorial Header */}
      <section className="py-20 lg:py-28 bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Where Modern Aesthetics Meets Ancient Mindfulness
          </h1>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed font-light pt-2">
            Founded with a singular vision: to dismantle the chaotic, chemical-laden experience of conventional salons and create an architectural sanctuary devoted to biological skin health, restorative hair care, and celebratory bridal artistry.
          </p>
        </div>
      </section>

      {/* Philosophy & Narrative */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl border border-border">
            <Image
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80"
              alt="Elegance Beauty Sanctuary interior treatment space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
              The Sanctuary Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Mindful Treatments Tailored to Your Cellular Biology
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              Conventional salons prioritize speed and superficial covers. At Elegance, we take an architectural, diagnostic approach. Before any blade or serum touches your skin or scalp, we evaluate your moisture barrier, hormonal cycles, and environmental lifestyle.
            </p>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
              Every appointment is conducted inside sound-insulated private suites scented with cold-pressed jasmine and damascena rose. We believe true radiance requires emotional stillness as much as clinical precision.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-border">
              <div className="space-y-1">
                <span className="font-serif text-3xl text-charcoal font-light">100%</span>
                <span className="text-xs uppercase tracking-wider text-charcoal-muted block">
                  Cruelty-Free Botanicals
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-3xl text-charcoal font-light">Zero</span>
                <span className="text-xs uppercase tracking-wider text-charcoal-muted block">
                  Aggressive Bleaching
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards of Hygiene & Purity */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
              Clinical Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
              Our Non-Negotiable Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-canvas border border-border p-8 rounded-sm space-y-4">
              <div className="p-3 bg-surface rounded-full text-gold w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-medium">
                Hospital-Grade Autoclave Sterilization
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                All metallic shears, cuticle nippers, and extraction probes undergo medical dry-heat autoclaving sealed in sterilized pouches opened strictly in your presence.
              </p>
            </div>

            <div className="bg-canvas border border-border p-8 rounded-sm space-y-4">
              <div className="p-3 bg-surface rounded-full text-gold w-fit">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-medium">
                Ethical Organic Sourcing
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We partner with certified organic biodynamic farms for our botanical extracts. Zero petrochemicals, parabens, formaldehydes, or synthetic fragrance oils.
              </p>
            </div>

            <div className="bg-canvas border border-border p-8 rounded-sm space-y-4">
              <div className="p-3 bg-surface rounded-full text-gold w-fit">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-charcoal font-medium">
                Unrushed Artisanal Dedication
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We never double-book or rush appointments. A 15-minute sanctuary buffer is automatically appended after each service to sanitize suites and ensure peaceful transitions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-canvas">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
            Experience Our Sanctuary In Person
          </h2>
          <p className="text-sm text-charcoal-muted font-light leading-relaxed">
            Reserve your consultation or ritual today and discover a higher dimension of personal beauty care.
          </p>
          <div className="pt-2">
            <Link
              href="/book"
              className="inline-flex items-center space-x-2 bg-charcoal hover:bg-gold text-canvas px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            >
              <span>Schedule Your Treatment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
