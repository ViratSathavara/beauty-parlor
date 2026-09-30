import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Check, Heart, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { getPackages } from "@/services/catalogService";
import { formatPrice } from "@/lib/utils";
import { getWhatsAppInquiryLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Haute Couture Indian Bridal Suites",
  description: "Bespoke bridal makeup, pre-wedding skin detox, and royal wedding day airbrush styling in our private bridal sanctuary.",
};

export const revalidate = 60;

export default async function BridalPage() {
  const packages = await getPackages();
  const bridalPackages = packages.filter((p) => p.slug.includes("bridal"));
  const whatsappBridal = getWhatsAppInquiryLink("bridal");

  return (
    <div className="bg-canvas">
      {/* Editorial Hero Header */}
      <section className="relative py-24 lg:py-32 bg-espresso text-canvas overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.35em] text-gold font-semibold">
            Bespoke Indian Wedding Couture
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08]">
            The Royal Bridal Sanctuaries
          </h1>
          <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Honoring your once-in-a-lifetime celebration with 4K HD airbrush artistry, biological pre-wedding skin purification, and a dedicated bridal suite reserved exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={whatsappBridal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gold hover:bg-gold-hover text-charcoal px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-xl"
            >
              <MessageCircle className="w-4 h-4 text-charcoal" />
              <span>Request In-Person Bridal Consultation</span>
            </a>
            <Link
              href="/book"
              className="inline-flex items-center space-x-2 border border-white/30 text-canvas hover:bg-white/10 px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              <span>Explore Available Dates</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bridal Packages Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Tailored Wedding Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Select Your Bridal Journey
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed font-light">
            Every bridal package includes personal consultations, shade testing, luxury eyelashes, and complete wardrobe styling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {bridalPackages.map((pkg) => (
            <div
              key={pkg.slug}
              className={`bg-surface-raised border rounded-sm overflow-hidden flex flex-col justify-between shadow-lg ${
                pkg.isFeatured ? "border-gold ring-1 ring-gold/40" : "border-border"
              }`}
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden image-zoom-container bg-border-subtle">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-canvas">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                      {pkg.durationHours} Hours Dedicated Rituals
                    </span>
                    <span className="text-xs text-stone-300">
                      Save {formatPrice(pkg.savings)}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="font-serif text-3xl text-charcoal font-normal">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-charcoal-muted mt-1 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-surface p-4 border border-border flex items-baseline justify-between">
                    <div>
                      <span className="font-serif text-3xl text-charcoal font-medium">
                        {formatPrice(pkg.packagePrice)}
                      </span>
                      <span className="text-xs text-stone-400 line-through pl-2">
                        {formatPrice(pkg.originalPrice)}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gold-dark font-semibold">
                      All Inclusive Package
                    </span>
                  </div>

                  {/* Services Included */}
                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                      Complete Inclusions:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-muted">
                      {pkg.includedServices.map((service, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Terms */}
                  {pkg.terms.length > 0 && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-[11px] text-stone-400 italic">
                        * {pkg.terms.join(" • ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-8 pt-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/book?package=${pkg.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                >
                  <span>Book Bridal Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={whatsappBridal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 border border-charcoal text-charcoal hover:bg-surface-hover py-3 text-xs uppercase tracking-widest font-medium transition-colors"
                >
                  <span>Consult Stylist</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bridal Guarantee & Lounge Spotlight */}
      <section className="py-20 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-3">
              <ShieldCheck className="w-6 h-6 text-gold" />
              <h3 className="font-serif text-lg text-charcoal font-medium">
                Maximum 2 Brides Per Weekend
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We believe your wedding deserves undivided artistic focus. We never rush between venues or squeeze multiple brides simultaneously.
              </p>
            </div>
            <div className="space-y-3">
              <Sparkles className="w-6 h-6 text-gold" />
              <h3 className="font-serif text-lg text-charcoal font-medium">
                Private Luxury Dressing Suite
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Enjoy your own dressing lounge with full-length mirrors, refreshments, private powder room, and steamer facilities for lehenga prep.
              </p>
            </div>
            <div className="space-y-3">
              <Heart className="w-6 h-6 text-gold" />
              <h3 className="font-serif text-lg text-charcoal font-medium">
                Complimentary 30-Day Skin Trial
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Every luxury bridal package includes a personalized skin prep consultation and shade matching test 30 days prior.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
