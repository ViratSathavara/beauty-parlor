export interface SeedServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
}

export interface SeedService {
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  benefits: string[];
  inclusions: string[];
  durationMinutes: number;
  basePrice: number;
  discountPrice?: number;
  advancePaymentAmount: number;
  imageUrl: string;
  isFeatured: boolean;
  addons: { name: string; price: number; durationMinutes: number }[];
}

export interface SeedStaff {
  id: string;
  fullName: string;
  title: string;
  experienceYears: number;
  bio: string;
  avatarUrl: string;
  ratingAvg: number;
  ratingCount: number;
  specializations: string[];
  isFeatured: boolean;
}

export interface SeedPackage {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  originalPrice: number;
  packagePrice: number;
  savings: number;
  durationHours: number;
  imageUrl: string;
  includedServices: string[];
  terms: string[];
  isFeatured: boolean;
}

export interface SeedBeforeAfter {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface SeedReview {
  customerName: string;
  serviceName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  isFeatured: boolean;
}

export const SEED_CATEGORIES: SeedServiceCategory[] = [
  {
    id: "cat-hair",
    name: "Hair",
    slug: "hair",
    description: "Couture cuts, intensive cellular hair spas, keratin smoothening, and botanical gloss rituals.",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    sortOrder: 1,
  },
  {
    id: "cat-skin",
    name: "Skin",
    slug: "skin",
    description: "Advanced hydra-dermabrasion, organic brightening peels, de-tan therapies, and deep cellular facials.",
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    sortOrder: 2,
  },
  {
    id: "cat-makeup",
    name: "Makeup",
    slug: "makeup",
    description: "HD airbrush bridal aesthetics, cocktail glamour, engagement elegance, and luminous editorial finishes.",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    sortOrder: 3,
  },
  {
    id: "cat-nails",
    name: "Nails",
    slug: "nails",
    description: "Sculpted gel extensions, organic milk & honey pedicures, and bespoke luxury nail art.",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    sortOrder: 4,
  },
  {
    id: "cat-other",
    name: "Essential Care",
    slug: "other",
    description: "Gentle lavender waxing, precision organic threading, and defined eyebrow architectural shaping.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    sortOrder: 5,
  },
];

export const SEED_SERVICES: SeedService[] = [
  // Hair
  {
    name: "Signature Precision Haircut & Styling",
    slug: "haircut-and-styling",
    categorySlug: "hair",
    description: "A customized architectural hair sculpt tailored to facial symmetry, followed by a clarifying botanical wash, blowout, and luxury heat styling.",
    benefits: ["Personalized facial contour framing", "Deep split-end eradication", "Effortless home maintainability"],
    inclusions: ["Consultation", "Invigorating scalp wash", "Precision cut", "Blowdry & thermal styling"],
    durationMinutes: 60,
    basePrice: 1800,
    discountPrice: 1499,
    advancePaymentAmount: 300,
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [
      { name: "Moroccanoil Deep Mask", price: 600, durationMinutes: 15 },
      { name: "Split-End Thermal Seal", price: 800, durationMinutes: 20 },
    ],
  },
  {
    name: "Caviar & Argan Restorative Hair Spa",
    slug: "caviar-argan-hair-spa",
    categorySlug: "hair",
    description: "An ultra-nourishing therapeutic ritual utilizing cold-pressed argan oil and marine caviar extract to reverse thermal and environmental damage.",
    benefits: ["Deep cuticle hydration", "Tension-relief scalp acupressure", "Glass-like hair luster"],
    inclusions: ["Steam infusion", "25-min hot oil scalp massage", "Deep-repair mask", "Silk rinse"],
    durationMinutes: 75,
    basePrice: 2800,
    discountPrice: 2400,
    advancePaymentAmount: 500,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [
      { name: "High-Frequency Ozone Scalp Detox", price: 700, durationMinutes: 15 },
    ],
  },
  {
    name: "Brazilian Keratin Protein Infusion",
    slug: "brazilian-keratin-treatment",
    categorySlug: "hair",
    description: "Formaldehyde-free organic keratin protein reconstructor that eliminates frizz, delivers 100% weather-resistant softness, and locks in mirror shine.",
    benefits: ["Frizz elimination for up to 5 months", "50% cut in blow-dry time", "Intense humidity shield"],
    inclusions: ["Clarifying prep wash", "Infusion application", "Micro-steam activation", "Precision sealing"],
    durationMinutes: 180,
    basePrice: 7500,
    discountPrice: 6499,
    advancePaymentAmount: 1000,
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [
      { name: "Post-Treatment Home Care Shield Kit", price: 1800, durationMinutes: 0 },
    ],
  },
  {
    name: "Botanical Balayage & Glossing",
    slug: "botanical-balayage-glossing",
    categorySlug: "hair",
    description: "Freehand painterly lightening designed with gentle bond-preserving botanicals, finished with a customized high-gloss tone bath.",
    benefits: ["Seamless sun-kissed regrowth", "Zero demarcation lines", "Customized tone balance"],
    inclusions: ["Color consultation", "Bond builder infusion", "Custom gloss", "Hydrating lock rinse"],
    durationMinutes: 210,
    basePrice: 8500,
    discountPrice: 7500,
    advancePaymentAmount: 1500,
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },

  // Skin
  {
    name: "Medical-Grade Signature Hydra-Glow Facial",
    slug: "signature-hydra-glow-facial",
    categorySlug: "skin",
    description: "A 7-step advanced medical facial using vortex water-suction extraction, antioxidant infusion, hyaluronic saturation, and cold-laser tightening.",
    benefits: ["Painless blackhead & comedone extraction", "Instant glass-skin luminosity", "Plumped fine lines"],
    inclusions: ["Lymphatic drainage", "Vortex vacuum peel", "Painless extraction", "Hyaluronic peptide ultrasound", "LED light therapy"],
    durationMinutes: 75,
    basePrice: 4200,
    discountPrice: 3500,
    advancePaymentAmount: 500,
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f55b9e0350d?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [
      { name: "Cryo-Globe Eye De-Puffing Treatment", price: 650, durationMinutes: 15 },
      { name: "Pure 24K Gold Hydrojelly Mask", price: 950, durationMinutes: 15 },
    ],
  },
  {
    name: "Kojic & Berry Botanical De-Tan Therapy",
    slug: "kojic-berry-de-tan-therapy",
    categorySlug: "skin",
    description: "Natural multi-fruit enzyme exfoliator combining wild blueberries, kojic acid, and pure aloe vera to gently lift sun oxidation.",
    benefits: ["Even skin tone restoration", "Gentle on sensitive barrier", "No harsh chemical bleaching"],
    inclusions: ["Enzyme scrub", "De-tan emulsion wrap", "Cooling cucumber compress", "Ceramide barrier cream"],
    durationMinutes: 45,
    basePrice: 1900,
    discountPrice: 1599,
    advancePaymentAmount: 300,
    imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },
  {
    name: "Organic Rose & Pearl Radiance Cleanup",
    slug: "rose-pearl-radiance-cleanup",
    categorySlug: "skin",
    description: "An express purifying facial with pure damascena rose hydrosol, crushed pearl micro-polishing, and gentle botanical extraction.",
    benefits: ["Instant pore decongestion", "Refined skin texture", "Natural radiant flush"],
    inclusions: ["Double cleanse", "Aromatherapy steam", "Extraction", "Rose pearl pack"],
    durationMinutes: 45,
    basePrice: 1600,
    discountPrice: 1350,
    advancePaymentAmount: 300,
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },

  // Makeup
  {
    name: "Royal Indian HD Bridal Makeup Experience",
    slug: "royal-bridal-makeup",
    categorySlug: "makeup",
    description: "The gold standard for the modern Indian bride. Sweat-proof, 24-hour transfer-resistant HD & airbrush finish with bespoke draping, jewellery fixing, and luxury eyelashes.",
    benefits: ["Flawless 4K photographic finish", "Transfer-proof & tear-proof longevity", "Complete wardrobe & jewelry styling"],
    inclusions: ["Pre-makeup skin prep", "HD airbrush foundation", "Premium mink lashes", "Dupatta draping", "Hair styling with real florals"],
    durationMinutes: 180,
    basePrice: 16000,
    discountPrice: 14500,
    advancePaymentAmount: 2500,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [
      { name: "Mother of the Bride Minimalist Glam", price: 4500, durationMinutes: 60 },
      { name: "Saree Draping Perfectionist Add-on", price: 1200, durationMinutes: 30 },
    ],
  },
  {
    name: "Celebration Engagement & Sangeet Makeup",
    slug: "engagement-sangeet-makeup",
    categorySlug: "makeup",
    description: "Luminous, high-fashion celebratory glam designed for vibrant evening lighting, complete with architectural contouring and editorial eye artistry.",
    benefits: ["Luminous glass radiance", "Bold camera-ready eyes", "Volume blowdry styling"],
    inclusions: ["Skin hydration cocktail", "Custom pigment matching", "Feather lashes", "Saree/Lehenga styling"],
    durationMinutes: 120,
    basePrice: 8500,
    discountPrice: 7500,
    advancePaymentAmount: 1500,
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [],
  },

  // Nails
  {
    name: "Artisanal Gel Sculpting & Bespoke Nail Art",
    slug: "gel-sculpting-nail-art",
    categorySlug: "nails",
    description: "Non-damaging Japanese gel architecture with custom hand-painted minimalist or metallic chrome editorial designs.",
    benefits: ["Up to 4 weeks of chip-free wear", "Natural nail reinforcement", "Tailored length & apex"],
    inclusions: ["Dry Russian manicure", "Gel sculpting", "Hand-painted art", "Cuticle elixir nourishment"],
    durationMinutes: 90,
    basePrice: 2800,
    discountPrice: 2400,
    advancePaymentAmount: 500,
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    isFeatured: true,
    addons: [
      { name: "Swarovski Crystal Accent Stones", price: 400, durationMinutes: 10 },
      { name: "Paraffin Softening Hand Mask", price: 600, durationMinutes: 15 },
    ],
  },
  {
    name: "Luxury Botanical Milk & Jasmine Spa Pedicure",
    slug: "luxury-jasmine-spa-pedicure",
    categorySlug: "nails",
    description: "A sensory foot sanctuary featuring warm almond milk soak, Himalayan salt exfoliation, hot stone therapy, and callus smoothing.",
    benefits: ["Deep heel crack restoration", "Tension and circulatory relief", "Silky soft feet"],
    inclusions: ["Herbal foot bath", "Callus smoothing", "Hot stone massage", "Nail shaping & buffing"],
    durationMinutes: 60,
    basePrice: 1900,
    discountPrice: 1600,
    advancePaymentAmount: 300,
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },

  // Essential Care
  {
    name: "Precision Organic Threading & Brow Architecture",
    slug: "brow-architecture-threading",
    categorySlug: "other",
    description: "Golden ratio facial mapping combined with anti-bacterial organic cotton threading and cooling rosewater compress.",
    benefits: ["Defined brow arch", "Zero chemical irritation", "Crisp symmetry"],
    inclusions: ["Brow mapping", "Precision threading", "Aloe vera soothing gel"],
    durationMinutes: 25,
    basePrice: 350,
    advancePaymentAmount: 100,
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },
  {
    name: "Satin Smooth Peel-Off Waxing Ritual (Full Body)",
    slug: "full-body-satin-waxing",
    categorySlug: "other",
    description: "Infused with calming lavender and azulene oils, this low-heat stripless wax guarantees painless hair removal even on delicate areas.",
    benefits: ["90% reduction in ingrown hairs", "Minimal redness", "Silky skin for 4 weeks"],
    inclusions: ["Pre-wax sanitization", "Painless stripless wax", "Post-wax cooling lotus oil"],
    durationMinutes: 90,
    basePrice: 3600,
    discountPrice: 2999,
    advancePaymentAmount: 500,
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
    isFeatured: false,
    addons: [],
  },
];

export const SEED_PACKAGES: SeedPackage[] = [
  {
    name: "Essential Glow Bridal Package",
    slug: "essential-glow-bridal",
    tagline: "Tailored elegance for the intimate wedding celebration.",
    description: "A refined bridal program encompassing comprehensive pre-bridal skincare, precision hair sculpt, and signature wedding day HD makeup with dupatta styling.",
    originalPrice: 24000,
    packagePrice: 18999,
    savings: 5001,
    durationHours: 6.5,
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    includedServices: [
      "Signature Hydra-Glow Facial (Pre-Bridal)",
      "Full Body Lavender Waxing & Botanical De-Tan",
      "Caviar & Argan Restorative Hair Spa",
      "Luxury Milk & Jasmine Spa Pedicure",
      "Wedding Day HD Bridal Makeup with Mink Lashes",
      "Jewelry Setting & Saree/Dupatta Draping",
    ],
    terms: ["Requires 50% booking deposit", "Valid up to 6 months from booking", "Complimentary skin consultation included"],
    isFeatured: false,
  },
  {
    name: "The Royal Maharani Luxury Bridal Suite",
    slug: "royal-maharani-luxury-bridal",
    tagline: "The definitive bespoke couture experience for the grand Indian wedding.",
    description: "Our crown-jewel bridal suite covering 3 appointments: pre-wedding skin detox, sangeet/cocktail editorial glam, and complete wedding day royal airbrush transformation with lead specialists.",
    originalPrice: 48000,
    packagePrice: 36999,
    savings: 11001,
    durationHours: 14.0,
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
    includedServices: [
      "Advanced Multi-Step Oxygen & Hydra Detox Facial",
      "Complete 24K Gold Body Polish & Botanical De-Tan",
      "Artisanal Gel Nail Sculpting with Swarovski Accents",
      "Caviar Deep Cellular Hair Reconstruct Spa",
      "Sangeet / Cocktail Glam Makeup & Architectural Hair",
      "Wedding Day 4K Airbrush Bridal Makeup with Senior Lead Artist",
      "Bridal Suite Dedicated Beautician & Touch-up Kit",
      "Complimentary Mother-of-the-Bride Express Makeover",
    ],
    terms: ["Limited to 2 bookings per weekend", "Personalized trials available 30 days prior", "Dedicated private bridal lounge"],
    isFeatured: true,
  },
  {
    name: "Weekend Wellness & Rejuvenation Ritual",
    slug: "weekend-wellness-ritual",
    tagline: "Restore radiance and calm your mind in an afternoon of indulgence.",
    description: "Designed for busy professionals needing restorative care: signature facial, caviar hair spa, and botanical spa pedicure bundled at substantial savings.",
    originalPrice: 8900,
    packagePrice: 6499,
    savings: 2401,
    durationHours: 3.5,
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    includedServices: [
      "Signature Hydra-Glow Facial",
      "Caviar & Argan Restorative Hair Spa",
      "Luxury Jasmine Spa Pedicure",
      "Scalp & Shoulder Acupressure Massage",
    ],
    terms: ["Available Tuesday through Sunday", "Cannot be combined with other promotional coupons"],
    isFeatured: false,
  },
];

export const SEED_STAFF: SeedStaff[] = [
  {
    id: "staff-priya",
    fullName: "Priya Patel",
    title: "Head Bridal Makeup Artist",
    experienceYears: 10,
    bio: "Internationally certified editorial makeup artist specializing in royal Indian bridal aesthetics, 4K airbrush contouring, and luminous glass skin.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    ratingAvg: 4.98,
    ratingCount: 142,
    specializations: ["Bridal Airbrush", "Editorial Makeup", "Saree Draping"],
    isFeatured: true,
  },
  {
    id: "staff-ananya",
    fullName: "Ananya Sen",
    title: "Senior Aesthetician & Skin Specialist",
    experienceYears: 8,
    bio: "Dermatology-certified skin care expert with clinical mastery in medical hydra-facials, dermal rejuvenation, and organic peel protocols.",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    ratingAvg: 4.95,
    ratingCount: 118,
    specializations: ["Hydra Facial", "De-tan Therapy", "Anti-Aging Peels"],
    isFeatured: true,
  },
  {
    id: "staff-meera",
    fullName: "Meera Krishnan",
    title: "Creative Hair Director",
    experienceYears: 12,
    bio: "Trained in London and Mumbai, Meera blends precision British haircutting architecture with bespoke botanical balayage and deep caviar restorative rituals.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    ratingAvg: 4.97,
    ratingCount: 185,
    specializations: ["Balayage", "Keratin Infusion", "Couture Cuts"],
    isFeatured: true,
  },
  {
    id: "staff-kavita",
    fullName: "Kavita Rao",
    title: "Master Nail Stylist & Spa Therapist",
    experienceYears: 7,
    bio: "Master of Japanese dry manicure techniques, architectural gel sculpting, and restorative reflexology spa pedicures.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    ratingAvg: 4.92,
    ratingCount: 96,
    specializations: ["Gel Nails", "Nail Art", "Hot Stone Pedicure"],
    isFeatured: false,
  },
];

export const SEED_BEFORE_AFTER: SeedBeforeAfter[] = [
  {
    id: "ba-1",
    title: "Royal Bridal Transformation",
    category: "Bridal",
    beforeImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
    description: "Flawless HD airbrush skin preparation, architectural brows, and traditional royal red bridal styling by Priya Patel.",
  },
  {
    id: "ba-2",
    title: "Cellular Hydra-Glow Facial Result",
    category: "Skin",
    beforeImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1512290900672-1f55b9e0350d?auto=format&fit=crop&w=800&q=80",
    description: "Significant reduction in T-zone congestion, deep hydration saturation, and natural glass-like glow.",
  },
  {
    id: "ba-3",
    title: "Keratin Protein Restorative Therapy",
    category: "Hair",
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    afterImage: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80",
    description: "Complete elimination of coarse humidity frizz into smooth, silky, high-mirror reflection locks.",
  },
];

export const SEED_REVIEWS: SeedReview[] = [
  {
    customerName: "Rhea Singhania",
    serviceName: "Royal Indian HD Bridal Makeup",
    rating: 5,
    comment: "Priya made me feel like royalty on my wedding day! The airbrush makeup stayed untouched through tears, dancing, and 12 hours of rituals. I received compliments all evening. The private bridal suite was pure tranquility.",
    date: "2 weeks ago",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    customerName: "Dr. Shalini Varma",
    serviceName: "Signature Hydra-Glow Facial",
    rating: 5,
    comment: "As a dermatologist, I am very cautious about salon facials. Elegance uses medical-grade sterilization and top-tier formulations. Ananya’s technique is immaculate. My skin looked luminous for weeks.",
    date: "1 month ago",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    customerName: "Tanvi Kapoor",
    serviceName: "Caviar & Argan Hair Spa",
    rating: 5,
    comment: "The best scalp massage and hair spa experience in Bengaluru. The aesthetic of the salon feels like a 5-star Kyoto boutique. Peaceful, fragrant, and deeply restorative.",
    date: "3 weeks ago",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
  {
    customerName: "Arundhati Roy",
    serviceName: "Artisanal Gel Sculpting",
    rating: 5,
    comment: "Precision is unmatched. Kavita takes her time with dry Russian cuticle prep and the nail art is true artistry. 4 weeks later, not a single chip.",
    date: "Just yesterday",
    avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
    isFeatured: true,
  },
];

export const SEED_FAQS = [
  {
    question: "How far in advance should I book my bridal consultation?",
    answer: "We recommend booking your bridal consultation 3 to 6 months prior to your wedding dates. We restrict our bridal artist bookings to a maximum of 2 brides per weekend to ensure uncompromised dedication.",
  },
  {
    question: "What is your appointment cancellation and rescheduling policy?",
    answer: "You can reschedule or cancel your appointment free of charge up to 24 hours prior through your online customer portal or by contacting us via WhatsApp. Cancellations within 24 hours will have the advance deposit credited to your salon loyalty ledger.",
  },
  {
    question: "Do you offer partial advance deposits for online booking?",
    answer: "Yes! You can reserve any service with an advance booking deposit (typically ₹300 - ₹1,500 depending on treatment duration). The remaining balance can be settled at the salon via Cash, UPI, or Card POS upon completion.",
  },
  {
    question: "Are your hair and skin formulations organic and cruelty-free?",
    answer: "Yes, 100% of our hair care, facial protocols, and spa oils are sourced from certified organic, sulfate-free, and cruelty-free botanical laboratories.",
  },
];
