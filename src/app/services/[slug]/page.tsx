import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Check, Sparkles, ShieldCheck, ArrowRight, Star, Plus } from "lucide-react";
import { getServiceBySlug, getServices, getStaffMembers } from "@/services/catalogService";
import { formatPrice, formatDuration } from "@/lib/utils";
import { getServiceSchema } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found" };
  }
  return {
    title: `${service.name} — ${formatPrice(service.discountPrice || service.basePrice)}`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const [allServices, staff] = await Promise.all([
    getServices(service.categorySlug),
    getStaffMembers(),
  ]);

  const relatedServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);
  const serviceSchema = getServiceSchema({
    name: service.name,
    description: service.description,
    price: service.discountPrice || service.basePrice,
    slug: service.slug,
    durationMinutes: service.durationMinutes,
  });

  return (
    <div className="bg-canvas py-12 sm:py-20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-wider text-charcoal-muted flex items-center space-x-2">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
          <span>/</span>
          <span className="text-charcoal font-semibold">{service.name}</span>
        </nav>

        {/* Hero Product Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Photography & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-border bg-border-subtle image-zoom-container">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-canvas/90 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest font-semibold text-charcoal">
                {service.categorySlug}
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-2 gap-4 text-xs text-charcoal-muted">
              <div className="bg-surface-raised border border-border p-4 rounded-sm flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                <span>Autoclave Sterilized Instruments</span>
              </div>
              <div className="bg-surface-raised border border-border p-4 rounded-sm flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-gold shrink-0" />
                <span>100% Certified Organic Botanicals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Duration & Booking CTA Card */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-gold-dark font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration: {formatDuration(service.durationMinutes)}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
                {service.name}
              </h1>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
                {service.description}
              </p>
            </div>

            {/* Pricing Box */}
            <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="font-serif text-3xl sm:text-4xl font-medium text-charcoal">
                  {formatPrice(service.discountPrice || service.basePrice)}
                </span>
                {service.discountPrice && (
                  <span className="text-base text-stone-400 line-through">
                    {formatPrice(service.basePrice)}
                  </span>
                )}
              </div>
              <div className="text-xs text-charcoal-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-border pt-3">
                <span>
                  Online Advance Deposit: <strong className="text-charcoal">{formatPrice(service.advancePaymentAmount)}</strong>
                </span>
                <span className="text-emerald-700 font-medium">
                  Remaining balance payable at salon
                </span>
              </div>

              {/* Primary Book CTA */}
              <div className="pt-2">
                <Link
                  href={`/book?service=${service.slug}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold-dark text-canvas py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md"
                >
                  <span>Select Date & Book Treatment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Inclusions & Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                  What's Included:
                </h3>
                <ul className="space-y-2 text-xs text-charcoal-muted">
                  {service.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                  Key Benefits:
                </h3>
                <ul className="space-y-2 text-xs text-charcoal-muted">
                  {service.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add-ons Available */}
            {service.addons && service.addons.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                  Enhancement Add-Ons:
                </h3>
                <div className="space-y-2">
                  {service.addons.map((addon, i) => (
                    <div
                      key={i}
                      className="bg-surface p-3 border border-border rounded-sm flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <Plus className="w-3.5 h-3.5 text-gold" />
                        <span className="font-medium text-charcoal">{addon.name}</span>
                        {addon.durationMinutes > 0 && (
                          <span className="text-[10px] text-charcoal-muted">
                            (+{addon.durationMinutes} mins)
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-charcoal">
                        +{formatPrice(addon.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Specialists */}
        <section className="pt-16 border-t border-border space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
              Specialist Availability
            </span>
            <h2 className="font-serif text-3xl text-charcoal font-normal">
              Specialists Who Perform This Treatment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staff.slice(0, 3).map((st) => (
              <div key={st.id} className="bg-surface-raised border border-border p-5 rounded-sm flex items-center space-x-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-gold/40 shrink-0">
                  <Image src={st.avatarUrl} alt={st.fullName} fill className="object-cover" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-sm font-semibold text-charcoal truncate">{st.fullName}</h4>
                  <p className="text-xs text-gold-dark truncate">{st.title}</p>
                  <p className="text-[10px] text-charcoal-muted">{st.experienceYears} Years Experience</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Treatments */}
        {relatedServices.length > 0 && (
          <section className="pt-16 border-t border-border space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold">
                Explore Complements
              </span>
              <h2 className="font-serif text-3xl text-charcoal font-normal">
                Frequently Paired Treatments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((rel) => (
                <div key={rel.slug} className="bg-surface-raised border border-border rounded-sm overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden image-zoom-container">
                      <Image src={rel.imageUrl} alt={rel.name} fill className="object-cover" />
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-serif text-lg text-charcoal line-clamp-1">{rel.name}</h4>
                      <p className="text-xs text-charcoal-muted line-clamp-2">{rel.description}</p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-border mt-auto">
                    <span className="font-serif text-lg text-charcoal">
                      {formatPrice(rel.discountPrice || rel.basePrice)}
                    </span>
                    <Link
                      href={`/services/${rel.slug}`}
                      className="text-xs uppercase tracking-wider text-charcoal hover:text-gold font-semibold transition-colors flex items-center space-x-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
