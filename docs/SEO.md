# Beauty Parlor — Search Engine Optimization (SEO) & Local Dominance

## 1. Technical SEO Architecture

The platform leverages Next.js App Router's built-in **Metadata API** to deliver optimized search crawler discovery with zero client-side JavaScript execution required for indexing.

```
+--------------------------------------------------------------------------+
|                             SEO STRATEGY STACK                           |
+------------------------------------+-------------------------------------+
| TECHNICAL SEO                      | LOCAL SEO                           |
+------------------------------------+-------------------------------------+
| * Server-side Meta Tags & Titles   | * LocalBusiness / BeautySalon Schema|
| * Dynamic Canonical URLs           | * NAP (Name, Address, Phone) Guard  |
| * OpenGraph & Twitter Cards        | * Geo-coordinates & Opening Hours   |
| * Auto-generated sitemap.xml       | * Google Business Profile Sync Link |
| * Structured JSON-LD Snippets      | * Hyper-local keyword integration   |
+------------------------------------+-------------------------------------+
```

---

## 2. Schema.org JSON-LD Structured Data

High-priority JSON-LD graphs are injected directly into Server Component HTML:

### 2.1 BeautySalon / LocalBusiness Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Elegance Luxury Beauty Parlor & Spa",
  "image": "https://beauty-parlor.example.com/images/salon-interior.jpg",
  "@id": "https://beauty-parlor.example.com",
  "url": "https://beauty-parlor.example.com",
  "telephone": "+91 98765 43210",
  "priceRange": "₹₹ - ₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "42, Galleria Boulevard, Indiranagar",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560038",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:30",
      "closes": "20:30"
    }
  ],
  "sameAs": [
    "https://instagram.com/beautyparlor",
    "https://facebook.com/beautyparlor"
  ]
}
```

### 2.2 Service Schema (`/services/[slug]`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Skin Care",
  "name": "Signature Hydra Facial Treatment",
  "description": "Multi-step medical-grade facial combining hydra-dermabrasion, deep extraction, and hyaluronic acid hydration.",
  "provider": {
    "@type": "BeautySalon",
    "name": "Elegance Luxury Beauty Parlor"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "price": "3500.00",
    "availability": "https://schema.org/InStock"
  }
}
```

---

## 3. Local SEO Strategy

1. **NAP Consistency**: The Name, Address, and Phone number configured in `/admin/settings` are globally synced across the footer, contact page, location page, and Schema.org metadata.
2. **Local Intent Keywords**: Natural, editorial incorporation of search queries:
   - *"Luxury beauty parlour in Indiranagar Bengaluru"*
   - *"Best bridal makeup artist in Bangalore"*
   - *"Keratin hair treatment and organic hair spa near me"*
3. **Directions & Google Maps**: Clean embed component with direct link to launch Google Maps navigation on mobile devices.

---

## 4. Dynamic Sitemaps & Robots (`sitemap.ts` & `robots.ts`)

* **`sitemap.xml`**: Automatically queries PostgreSQL to include all active categories, individual service detail slugs, and bridal packages with last modified dates and daily change frequencies.
* **`robots.txt`**: Grants full crawl access to public landing pages while explicitly disallowing indexing of private SaaS paths:
  ```
  User-agent: *
  Disallow: /admin/
  Disallow: /staff/
  Disallow: /account/
  Disallow: /api/
  Allow: /
  Sitemap: https://beauty-parlor.example.com/sitemap.xml
  ```
