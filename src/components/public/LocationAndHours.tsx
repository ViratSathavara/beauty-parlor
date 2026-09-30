import { MapPin, Clock, Phone, Navigation, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";

export default function LocationAndHours() {
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${SITE_CONFIG.name}, ${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}`
  )}`;

  return (
    <section className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
                Sanctuary Presence
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal mt-2 leading-tight">
                Visit Our Indiranagar Sanctuary
              </h2>
              <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light mt-3">
                Nestled on Galleria Boulevard, our sanctuary provides a serene architectural oasis equipped with valet parking and private dressing lounges.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Address Card */}
              <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-3">
                <div className="flex items-center space-x-2 text-gold">
                  <MapPin className="w-5 h-5" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    Address
                  </h4>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {SITE_CONFIG.address.street}, <br />
                  Indiranagar, {SITE_CONFIG.address.city}, <br />
                  {SITE_CONFIG.address.state} — {SITE_CONFIG.address.postalCode}
                </p>
                <p className="text-[11px] text-stone-400">
                  Landmark: Opposite Lotus Park, 200m from Metro Station
                </p>
              </div>

              {/* Hours Card */}
              <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-3">
                <div className="flex items-center space-x-2 text-gold">
                  <Clock className="w-5 h-5" />
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                    Sanctuary Hours
                  </h4>
                </div>
                <div className="text-xs text-charcoal-muted space-y-1">
                  <p className="font-medium text-charcoal">Tuesday – Sunday:</p>
                  <p>09:30 AM – 08:30 PM</p>
                  <p className="pt-2 text-rose-800 font-medium">Monday: Closed</p>
                  <p className="text-[10px] text-stone-400">Reserved for deep botanical sanitation</p>
                </div>
              </div>
            </div>

            {/* Direct Action Link */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-charcoal hover:bg-gold text-canvas py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                <Navigation className="w-4 h-4 text-gold" />
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </a>

              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-surface-hover py-3.5 px-6 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Front Desk</span>
              </a>
            </div>
          </div>

          {/* Right Map Visual Canvas */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-border shadow-2xl bg-surface-raised flex items-center justify-center p-8 text-center">
              <div className="space-y-4 max-w-sm">
                <div className="w-14 h-14 mx-auto rounded-full bg-charcoal text-gold flex items-center justify-center shadow-lg border border-gold/40">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal font-medium">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Indiranagar Flagship Sanctuary, Bengaluru. Valet parking available on arrival.
                </p>
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark hover:text-charcoal font-semibold transition-colors pt-2"
                >
                  <span>Open Interactive Google Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
