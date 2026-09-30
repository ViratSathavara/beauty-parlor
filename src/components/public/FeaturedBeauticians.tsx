import Link from "next/link";
import Image from "next/image";
import { Star, ArrowRight, Award } from "lucide-react";
import { SeedStaff } from "@/lib/db/seedData";

interface FeaturedBeauticiansProps {
  staff: SeedStaff[];
}

export default function FeaturedBeauticians({ staff }: FeaturedBeauticiansProps) {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Master Artisans & Specialists
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Meet Your Beauty Curators
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Our certified specialists combine clinical dermatology knowledge with high-fashion runway artistry to curate an experience exclusively devoted to you.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {staff.filter((s) => s.isFeatured).map((specialist) => (
            <div
              key={specialist.id}
              className="group bg-canvas border border-border overflow-hidden rounded-sm flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-gold/60"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden image-zoom-container bg-border-subtle">
                  <Image
                    src={specialist.avatarUrl}
                    alt={specialist.fullName}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-canvas">
                    <span className="text-xs uppercase tracking-wider text-gold font-semibold flex items-center space-x-1">
                      <Award className="w-3.5 h-3.5" />
                      <span>{specialist.experienceYears} Years Exp.</span>
                    </span>
                    <div className="flex items-center space-x-1 text-xs">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span className="font-semibold">{specialist.ratingAvg.toFixed(2)}</span>
                      <span className="text-stone-300 text-[10px]">({specialist.ratingCount})</span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl text-charcoal font-medium">
                      {specialist.fullName}
                    </h3>
                    <p className="text-xs text-gold-dark font-medium uppercase tracking-wider mt-0.5">
                      {specialist.title}
                    </p>
                  </div>

                  <p className="text-xs text-charcoal-muted leading-relaxed line-clamp-3">
                    {specialist.bio}
                  </p>

                  {/* Specialization Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {specialist.specializations.map((spec, i) => (
                      <span
                        key={i}
                        className="bg-surface px-2.5 py-1 text-[10px] uppercase tracking-wider text-charcoal font-medium border border-border"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2 border-t border-border mt-auto">
                <Link
                  href={`/book?staffId=${specialist.id}`}
                  className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold text-canvas hover:text-white py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-200"
                >
                  <span>Book With {specialist.fullName.split(" ")[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
