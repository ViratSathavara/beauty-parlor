export const SITE_CONFIG = {
  name: "Elegance Beauty Sanctuary",
  tagline: "Look Beautiful. Feel Confident.",
  description: "Premier luxury beauty and salon sanctuary. Bespoke bridal makeup, medical-grade skin treatments, restorative hair spa, and artisanal nail care.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://elegancebeauty.in",
  phone: process.env.NEXT_PUBLIC_SALON_PHONE || "+91 98765 43210",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  email: "hello@elegancebeauty.in",
  address: {
    street: "42, Galleria Boulevard, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    country: "IN",
  },
  geo: {
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHours: [
    { days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:30", closes: "20:30" },
  ],
};

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "image": `${SITE_CONFIG.url}/images/salon-interior.jpg`,
    "@id": SITE_CONFIG.url,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.phone,
    "priceRange": "₹₹ - ₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.address.street,
      "addressLocality": SITE_CONFIG.address.city,
      "addressRegion": SITE_CONFIG.address.state,
      "postalCode": SITE_CONFIG.address.postalCode,
      "addressCountry": SITE_CONFIG.address.country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": SITE_CONFIG.geo.latitude,
      "longitude": SITE_CONFIG.geo.longitude,
    },
    "openingHoursSpecification": SITE_CONFIG.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days,
      "opens": h.opens,
      "closes": h.closes,
    })),
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  price: number;
  slug: string;
  durationMinutes: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Beauty Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "BeautySalon",
      "name": SITE_CONFIG.name,
      "telephone": SITE_CONFIG.phone,
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": service.price.toString(),
      "availability": "https://schema.org/InStock",
      "url": `${SITE_CONFIG.url}/services/${service.slug}`,
    },
  };
}
