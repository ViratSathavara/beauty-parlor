import { connectToDatabase } from "./mongodb";
import { ServiceCategory } from "./models/ServiceCategory";
import { Service } from "./models/Service";
import { Staff } from "./models/Staff";
import { Package } from "./models/Package";
import { Review } from "./models/Review";
import {
  SEED_CATEGORIES,
  SEED_SERVICES,
  SEED_STAFF,
  SEED_PACKAGES,
  SEED_REVIEWS,
} from "./seedData";

async function seed() {
  console.log("🌸 Connecting to MongoDB...");
  await connectToDatabase();
  console.log("Connected successfully!");

  console.log("Clearing existing catalog collections...");
  await ServiceCategory.deleteMany({});
  await Service.deleteMany({});
  await Staff.deleteMany({});
  await Package.deleteMany({});
  await Review.deleteMany({});

  console.log("Seeding Service Categories...");
  const categoryDocs = await ServiceCategory.insertMany(
    SEED_CATEGORIES.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description,
      imageUrl: c.imageUrl,
      sortOrder: c.sortOrder,
      isActive: true,
    }))
  );

  const categoryMap = new Map<string, any>();
  categoryDocs.forEach((doc) => {
    categoryMap.set(doc.slug, doc._id);
  });

  console.log("Seeding Services...");
  await Service.insertMany(
    SEED_SERVICES.map((s) => ({
      categoryId: categoryMap.get(s.categorySlug) || categoryDocs[0]._id,
      categorySlug: s.categorySlug,
      name: s.name,
      slug: s.slug,
      description: s.description,
      benefits: s.benefits,
      inclusions: s.inclusions,
      durationMinutes: s.durationMinutes,
      bufferMinutes: 15,
      basePrice: s.basePrice,
      discountPrice: s.discountPrice,
      advancePaymentAmount: s.advancePaymentAmount,
      imageUrl: s.imageUrl,
      isFeatured: s.isFeatured,
      isActive: true,
      bookingEnabled: true,
      addons: s.addons,
    }))
  );

  console.log("Seeding Staff Members...");
  await Staff.insertMany(
    SEED_STAFF.map((st) => ({
      fullName: st.fullName,
      title: st.title,
      experienceYears: st.experienceYears,
      bio: st.bio,
      avatarUrl: st.avatarUrl,
      ratingAvg: st.ratingAvg,
      ratingCount: st.ratingCount,
      specializations: st.specializations,
      isFeatured: st.isFeatured,
      isActive: true,
      workingHours: [
        { dayOfWeek: 0, startTime: "09:30", endTime: "20:00", isOffDay: false },
        { dayOfWeek: 1, startTime: "09:30", endTime: "20:00", isOffDay: true }, // Monday closed
        { dayOfWeek: 2, startTime: "09:30", endTime: "20:00", isOffDay: false },
        { dayOfWeek: 3, startTime: "09:30", endTime: "20:00", isOffDay: false },
        { dayOfWeek: 4, startTime: "09:30", endTime: "20:00", isOffDay: false },
        { dayOfWeek: 5, startTime: "09:30", endTime: "20:00", isOffDay: false },
        { dayOfWeek: 6, startTime: "09:30", endTime: "20:00", isOffDay: false },
      ],
    }))
  );

  console.log("Seeding Bridal & Bundled Packages...");
  await Package.insertMany(
    SEED_PACKAGES.map((p) => ({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      description: p.description,
      originalPrice: p.originalPrice,
      packagePrice: p.packagePrice,
      savings: p.savings,
      durationHours: p.durationHours,
      imageUrl: p.imageUrl,
      includedServices: p.includedServices,
      terms: p.terms,
      isFeatured: p.isFeatured,
      isActive: true,
    }))
  );

  console.log("Seeding Reviews...");
  await Review.insertMany(
    SEED_REVIEWS.map((r) => ({
      customerName: r.customerName,
      serviceName: r.serviceName,
      rating: r.rating,
      comment: r.comment,
      date: r.date,
      avatarUrl: r.avatarUrl,
      status: "APPROVED",
      isFeatured: r.isFeatured,
    }))
  );

  console.log("✨ Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
