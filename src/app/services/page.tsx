import { Metadata } from "next";
import ServicesCatalog from "@/components/public/ServicesCatalog";
import { getCategories, getServices } from "@/services/catalogService";

export const metadata: Metadata = {
  title: "Bespoke Treatment Menu & Services",
  description: "Explore our complete menu of biological facial therapies, restorative caviar hair spas, royal bridal makeup, and gel nail architecture.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const [categories, services] = await Promise.all([
    getCategories(),
    getServices(),
  ]);

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            The Treatment Sanctuary Menu
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Bespoke Beauty & Wellness Rituals
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Every service is meticulously tailored to your anatomy with medical-grade hygiene, certified organic botanicals, and unrushed artisanal dedication.
          </p>
        </div>

        {/* Interactive Catalog */}
        <ServicesCatalog categories={categories} services={services} />
      </div>
    </div>
  );
}
