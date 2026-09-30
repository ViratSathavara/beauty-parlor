import { Metadata } from "next";
import { MapPin, Navigation, Clock, Phone, Car, Train, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sanctuary Location & Directions",
  description: "Find Elegance Beauty Sanctuary on Galleria Boulevard in Indiranagar, Bengaluru. Valet parking and metro access details.",
};

export default function LocationPage() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${SITE_CONFIG.name}, ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}`
  )}`;

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Visit Our Flagship
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            Finding Your Sanctuary
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Conveniently situated in central Indiranagar, Bengaluru with dedicated valet assistance and private entry.
          </p>
        </div>

        {/* Details & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface-raised border border-border p-8 rounded-sm space-y-4">
              <div className="flex items-center space-x-2 text-gold">
                <MapPin className="w-5 h-5" />
                <h3 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
                  Address & Landmarks
                </h3>
              </div>
              <p className="text-sm text-charcoal leading-relaxed">
                {SITE_CONFIG.address.street}, <br />
                Indiranagar, {SITE_CONFIG.address.city}, <br />
                {SITE_CONFIG.address.state} — {SITE_CONFIG.address.postalCode}
              </p>
              <div className="pt-2 text-xs text-charcoal-muted space-y-1 border-t border-border">
                <p>• Landmark: Directly opposite Lotus Park</p>
                <p>• Cross-junction: 100m south of 12th Main Road</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-2">
                <div className="flex items-center space-x-2 text-gold">
                  <Car className="w-4 h-4" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    Valet Parking
                  </h4>
                </div>
                <p className="text-xs text-charcoal-muted">
                  Complimentary valet parking is available at the sanctuary entrance for all guests.
                </p>
              </div>

              <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-2">
                <div className="flex items-center space-x-2 text-gold">
                  <Train className="w-4 h-4" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    Metro Transit
                  </h4>
                </div>
                <p className="text-xs text-charcoal-muted">
                  350 meters from Indiranagar Metro Station (Purple Line). A peaceful 4-minute walk.
                </p>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
              >
                <Navigation className="w-4 h-4 text-gold" />
                <span>Launch Google Maps Navigation</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-surface-hover py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Sanctuary Desk</span>
              </a>
            </div>
          </div>

          {/* Right Map Canvas Presentation */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border shadow-2xl bg-surface-raised flex items-center justify-center p-8 text-center">
              <div className="space-y-4 max-w-sm">
                <div className="w-16 h-16 mx-auto rounded-full bg-charcoal text-gold flex items-center justify-center shadow-lg border border-gold/40">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Galleria Boulevard, Indiranagar Flagship, Bengaluru.
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark hover:text-charcoal font-semibold transition-colors pt-2"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
