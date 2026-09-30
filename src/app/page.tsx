import Hero from "@/components/public/Hero";
import TrustIndicators from "@/components/public/TrustIndicators";
import PopularServices from "@/components/public/PopularServices";
import FeaturedOffer from "@/components/public/FeaturedOffer";
import BridalSection from "@/components/public/BridalSection";
import BeforeAfterSlider from "@/components/public/BeforeAfterSlider";
import WhyChooseUs from "@/components/public/WhyChooseUs";
import FeaturedBeauticians from "@/components/public/FeaturedBeauticians";
import CustomerReviews from "@/components/public/CustomerReviews";
import MembershipPreview from "@/components/public/MembershipPreview";
import LoyaltyPreview from "@/components/public/LoyaltyPreview";
import InstagramFeed from "@/components/public/InstagramFeed";
import LocationAndHours from "@/components/public/LocationAndHours";
import BookingCTA from "@/components/public/BookingCTA";

import {
  getCategories,
  getServices,
  getPackages,
  getStaffMembers,
  getReviews,
  getBeforeAfterItems,
} from "@/services/catalogService";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const [categories, services, packages, staff, reviews] = await Promise.all([
    getCategories(),
    getServices(),
    getPackages(),
    getStaffMembers(),
    getReviews(),
  ]);

  const beforeAfterItems = getBeforeAfterItems();

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust Indicators */}
      <TrustIndicators />

      {/* 3. Popular Services with Category Filtering */}
      <PopularServices categories={categories} services={services} />

      {/* 4. Featured Offer with Code */}
      <FeaturedOffer />

      {/* 5. Bridal Packages Section */}
      <BridalSection packages={packages} />

      {/* 6. Before / After Interactive Slider */}
      <BeforeAfterSlider items={beforeAfterItems} />

      {/* 7. Why Choose Us (Editorial Pillars) */}
      <WhyChooseUs />

      {/* 8. Featured Beauticians & Specialists */}
      <FeaturedBeauticians staff={staff} />

      {/* 9. Verified Customer Reviews */}
      <CustomerReviews reviews={reviews} />

      {/* 10. VIP Membership Tiers */}
      <MembershipPreview />

      {/* 11. Sanctuary Loyalty Ledger & Referrals */}
      <LoyaltyPreview />

      {/* 12. Editorial Social / Instagram Chronicle */}
      <InstagramFeed />

      {/* 13. Location, Driving Directions & Opening Hours */}
      <LocationAndHours />

      {/* 14. Full-Width Booking CTA */}
      <BookingCTA />
    </div>
  );
}
