# Beauty Parlor — Database Architecture & MongoDB Mongoose Schemas

## 1. Overview & Architecture Transition

As configured for the Next.js full-stack platform, **MongoDB** is utilized as the primary database with **Mongoose** as the Object Document Mapper (ODM).

### Key Architectural Strengths with MongoDB:
1. **Document-Oriented Domain Models**: Complex nested structures such as staff working shifts, recurring breaks, service add-ons, appointment item details, and status history logs are embedded naturally as subdocuments, reducing excessive joins while ensuring atomic single-document updates.
2. **ACID Transactions**: Multi-document transactions (`session.withTransaction()`) are utilized for critical multi-entity operations (e.g. reserving slots, applying coupons, deducting loyalty points, and generating invoices).
3. **High-Performance Compound Indexes**: Fast query performance on sparse indexes: `bookingNumber`, `date + staffId + status`, `userId`, `slug`, and `referralCode`.
4. **Connection Pooling in Next.js Serverless / Node**: Global connection caching across hot module reloads in Next.js to prevent connection exhaustion.

---

## 2. Core Collections & Schema Definitions

```
+-------------------------------------------------------------------------+
|                           MONGODB COLLECTIONS                           |
+------------------------------------+------------------------------------+
| 1. users                           | 7. coupons & coupon_usages         |
| 2. customer_profiles               | 8. reviews                         |
| 3. staff                           | 9. gallery_items & before_after    |
| 4. service_categories              | 10. contact_inquiries              |
| 5. services                        | 11. website_content & settings     |
| 6. appointments & payments         | 12. integration_sync_jobs          |
+------------------------------------+------------------------------------+
```

### 2.1 Users & Customer Profiles (`User`, `CustomerProfile`)
* **`users` Collection**:
  - `_id`: ObjectId
  - `email`: String (unique, indexed, lowercase)
  - `phone`: String (unique, sparse, indexed)
  - `passwordHash`: String
  - `role`: Enum `['CUSTOMER', 'STAFF', 'ADMIN', 'SUPER_ADMIN']` (default: `'CUSTOMER'`)
  - `status`: Enum `['ACTIVE', 'SUSPENDED']` (default: `'ACTIVE'`)
  - `name`: String
  - `image`: String
  - `timestamps`: `createdAt`, `updatedAt`
* **`customer_profiles` Collection**:
  - `_id`: ObjectId
  - `userId`: ObjectId (ref: `'User'`, unique, indexed)
  - `gender`: String
  - `dob`: Date
  - `anniversaryDate`: Date
  - `marketingConsentEmail`: Boolean (default: true)
  - `marketingConsentWhatsApp`: Boolean (default: true)
  - `referralCode`: String (unique, indexed, e.g. `BP-XXXXX`)
  - `referredBy`: ObjectId (ref: `'CustomerProfile'`, optional)
  - `loyaltyPointsBalance`: Number (default: 0)
  - `membership`: Subdocument `{ tier: 'Silver' | 'Gold' | 'Platinum', validUntil: Date, status: 'ACTIVE' | 'EXPIRED' }`

### 2.2 Service Categories & Services (`ServiceCategory`, `Service`)
* **`service_categories` Collection**:
  - `name`: String (unique, e.g. `"Hair"`, `"Skin"`, `"Makeup"`, `"Nails"`, `"Other"`)
  - `slug`: String (unique, indexed)
  - `description`: String
  - `imageUrl`: String
  - `sortOrder`: Number
  - `isActive`: Boolean (default: true)
* **`services` Collection**:
  - `categoryId`: ObjectId (ref: `'ServiceCategory'`, indexed)
  - `name`: String
  - `slug`: String (unique, indexed)
  - `description`: String
  - `durationMinutes`: Number (e.g. 60)
  - `bufferMinutes`: Number (default: 15)
  - `basePrice`: Number
  - `discountPrice`: Number (optional)
  - `advancePaymentAmount`: Number (optional deposit)
  - `imageUrl`: String
  - `isFeatured`: Boolean (default: false)
  - `isActive`: Boolean (default: true)
  - `bookingEnabled`: Boolean (default: true)
  - `addons`: Array of Subdocuments `[{ name: String, price: Number, durationMinutes: Number }]`
  - `eligibleStaff`: Array of ObjectIds (ref: `'Staff'`)

### 2.3 Staff & Schedules (`Staff`)
* **`staff` Collection**:
  - `userId`: ObjectId (ref: `'User'`, optional/indexed)
  - `fullName`: String
  - `title`: String (e.g. `"Senior Hair Stylist"`, `"Lead Bridal Artist"`)
  - `experienceYears`: Number
  - `bio`: String
  - `avatarUrl`: String
  - `isFeatured`: Boolean
  - `ratingAvg`: Number (default: 5.0)
  - `ratingCount`: Number (default: 0)
  - `isActive`: Boolean (default: true)
  - `specializations`: [String]
  - `workingHours`: Array of Subdocuments:
    `[{ dayOfWeek: Number (0-6), startTime: String ("09:00"), endTime: String ("19:00"), isOffDay: Boolean }]`
  - `breaks`: Array of Subdocuments:
    `[{ startTime: String ("13:00"), endTime: String ("14:00"), label: String }]`
  - `blockedSlots`: Array of Subdocuments:
    `[{ startTime: Date, endTime: Date, reason: String }]`

### 2.4 Appointments (`Appointment`)
* **`appointments` Collection**:
  - `bookingNumber`: String (unique, indexed, e.g. `"BP-2026-1024"`)
  - `customerId`: ObjectId (ref: `'User'`, indexed)
  - `customerDetails`: `{ name: String, email: String, phone: String }` (denormalized snapshot)
  - `staffId`: ObjectId (ref: `'Staff'`, indexed)
  - `serviceId`: ObjectId (ref: `'Service'`, indexed)
  - `date`: Date (indexed)
  - `startTime`: Date (indexed)
  - `endTime`: Date (indexed)
  - `status`: Enum `['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED']` (indexed)
  - `totalAmount`: Number
  - `discountAmount`: Number
  - `advanceAmount`: Number
  - `dueAmount`: Number
  - `customerNotes`: String
  - `staffNotes`: String
  - `paymentStatus`: Enum `['CREATED', 'PENDING', 'PAID', 'FAILED', 'REFUNDED']`
  - `razorpayOrderId`: String (sparse, indexed)
  - `razorpayPaymentId`: String (sparse, indexed)
  - `statusHistory`: Array of `[{ oldStatus: String, newStatus: String, changedBy: String, reason: String, timestamp: Date }]`

### 2.5 Reviews, Inquiries, Packages, and CMS
* **`packages` Collection**: Bundled services (e.g. Basic Bridal, Luxury Royal Bridal) with services list, package price, savings.
* **`reviews` Collection**: Rating (1-5), comment, customerName, photo, status (`'PENDING' | 'APPROVED' | 'REJECTED'`), featured.
* **`contact_inquiries` Collection**: Submissions from contact form with name, email, phone, message, status (`'NEW' | 'CONTACTED' | 'CONVERTED'`).
* **`website_content` Collection**: Dynamic CMS key-value store for hero heading, salon address, phone, WhatsApp number, opening hours, social links.
* **`integration_sync_jobs` Collection**: Background jobs for Google Sheets and notifications (`PENDING`, `SUCCESS`, `FAILED`, retry count).

---

## 3. Database Connection Utility (`src/lib/db/mongodb.ts`)

Next.js App Router executes code across multiple invocations. A global cached connection pattern is implemented:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/beauty_parlor';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```
