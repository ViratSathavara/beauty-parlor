import { connectToDatabase } from "@/lib/db/mongodb";
import { Service, IService } from "@/lib/db/models/Service";
import { ServiceCategory, IServiceCategory } from "@/lib/db/models/ServiceCategory";
import { Staff, IStaff } from "@/lib/db/models/Staff";
import { Package, IPackage } from "@/lib/db/models/Package";
import { Review, IReview } from "@/lib/db/models/Review";
import {
  SEED_CATEGORIES,
  SEED_SERVICES,
  SEED_STAFF,
  SEED_PACKAGES,
  SEED_REVIEWS,
  SEED_BEFORE_AFTER,
  SEED_FAQS,
  SeedService,
  SeedServiceCategory,
  SeedStaff,
  SeedPackage,
  SeedReview,
  SeedBeforeAfter,
} from "@/lib/db/seedData";

export async function getCategories(): Promise<SeedServiceCategory[]> {
  try {
    await connectToDatabase();
    const categories = await ServiceCategory.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    if (categories && categories.length > 0) {
      return categories.map((c) => ({
        id: c._id.toString(),
        name: c.name,
        slug: c.slug,
        description: c.description || "",
        imageUrl: c.imageUrl || "",
        sortOrder: c.sortOrder || 0,
      }));
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed categories:", (error as Error).message);
  }
  return SEED_CATEGORIES;
}

export async function getServices(categorySlug?: string): Promise<SeedService[]> {
  try {
    await connectToDatabase();
    const query: any = { isActive: true };
    if (categorySlug && categorySlug !== "all") {
      query.categorySlug = categorySlug;
    }
    const services = await Service.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();
    if (services && services.length > 0) {
      return services.map((s) => ({
        name: s.name,
        slug: s.slug,
        categorySlug: s.categorySlug,
        description: s.description,
        benefits: s.benefits || [],
        inclusions: s.inclusions || [],
        durationMinutes: s.durationMinutes,
        basePrice: s.basePrice,
        discountPrice: s.discountPrice,
        advancePaymentAmount: s.advancePaymentAmount || 500,
        imageUrl: s.imageUrl || "",
        isFeatured: s.isFeatured,
        addons: (s.addons || []).map((a) => ({
          name: a.name,
          price: a.price,
          durationMinutes: a.durationMinutes || 0,
        })),
      }));
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed services:", (error as Error).message);
  }

  if (categorySlug && categorySlug !== "all") {
    return SEED_SERVICES.filter((s) => s.categorySlug === categorySlug);
  }
  return SEED_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<SeedService | null> {
  try {
    await connectToDatabase();
    const service = await Service.findOne({ slug, isActive: true }).lean();
    if (service) {
      return {
        name: service.name,
        slug: service.slug,
        categorySlug: service.categorySlug,
        description: service.description,
        benefits: service.benefits || [],
        inclusions: service.inclusions || [],
        durationMinutes: service.durationMinutes,
        basePrice: service.basePrice,
        discountPrice: service.discountPrice,
        advancePaymentAmount: service.advancePaymentAmount || 500,
        imageUrl: service.imageUrl || "",
        isFeatured: service.isFeatured,
        addons: (service.addons || []).map((a) => ({
          name: a.name,
          price: a.price,
          durationMinutes: a.durationMinutes || 0,
        })),
      };
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed service:", (error as Error).message);
  }

  const found = SEED_SERVICES.find((s) => s.slug === slug);
  return found || null;
}

export async function getStaffMembers(): Promise<SeedStaff[]> {
  try {
    await connectToDatabase();
    const staff = await Staff.find({ isActive: true }).sort({ isFeatured: -1 }).lean();
    if (staff && staff.length > 0) {
      return staff.map((st) => ({
        id: st._id.toString(),
        fullName: st.fullName,
        title: st.title,
        experienceYears: st.experienceYears,
        bio: st.bio,
        avatarUrl: st.avatarUrl || "",
        ratingAvg: st.ratingAvg || 5.0,
        ratingCount: st.ratingCount || 0,
        specializations: st.specializations || [],
        isFeatured: st.isFeatured,
      }));
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed staff:", (error as Error).message);
  }
  return SEED_STAFF;
}

export async function getPackages(): Promise<SeedPackage[]> {
  try {
    await connectToDatabase();
    const packages = await Package.find({ isActive: true }).sort({ packagePrice: -1 }).lean();
    if (packages && packages.length > 0) {
      return packages.map((p) => ({
        name: p.name,
        slug: p.slug,
        tagline: p.tagline,
        description: p.description,
        originalPrice: p.originalPrice,
        packagePrice: p.packagePrice,
        savings: p.savings,
        durationHours: p.durationHours,
        imageUrl: p.imageUrl || "",
        includedServices: p.includedServices || [],
        terms: p.terms || [],
        isFeatured: p.isFeatured,
      }));
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed packages:", (error as Error).message);
  }
  return SEED_PACKAGES;
}

export async function getReviews(): Promise<SeedReview[]> {
  try {
    await connectToDatabase();
    const reviews = await Review.find({ status: "APPROVED" }).sort({ createdAt: -1 }).lean();
    if (reviews && reviews.length > 0) {
      return reviews.map((r) => ({
        customerName: r.customerName,
        serviceName: r.serviceName,
        rating: r.rating,
        comment: r.comment,
        date: r.date,
        avatarUrl: r.avatarUrl,
        isFeatured: r.isFeatured,
      }));
    }
  } catch (error) {
    console.warn("MongoDB query fallback to seed reviews:", (error as Error).message);
  }
  return SEED_REVIEWS;
}

export function getBeforeAfterItems(): SeedBeforeAfter[] {
  return SEED_BEFORE_AFTER;
}

export function getFAQs() {
  return SEED_FAQS;
}
