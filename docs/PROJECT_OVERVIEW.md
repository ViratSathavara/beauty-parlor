# Beauty Parlor — Project Overview & Product Vision

## 1. Executive Summary

**Beauty Parlor** is an enterprise-grade, luxury full-stack business management and customer engagement platform architected for modern high-end Indian beauty parlors and aesthetic salons. 

Unlike generic template salon websites or basic CRUD booking scripts, this platform bridges the gap between an **editorial, immersive digital boutique** (reminiscent of Aesop, Glossier, and luxury architectural studios) and a **mission-critical SaaS enterprise suite** (handling multi-staff scheduling, double-booking prevention, Razorpay payments, ledger-based loyalty points, multi-tier memberships, automated WhatsApp/Email communications, resilient Google Sheets operational sync, and fine-grained Role-Based Access Control).

---

## 2. Core Pillars

```
+-----------------------------------------------------------------------------------+
|                               BEAUTY PARLOR PLATFORM                              |
+------------------------------------+----------------------------------------------+
|        PUBLIC DIGITAL BOUTIQUE     |            BUSINESS ENGINE & SAAS            |
+------------------------------------+----------------------------------------------+
| * Editorial Luxury Aesthetics      | * Real-Time Concurrency-Safe Booking Engine  |
| * Fluid Motion & Micro-interactions| * Staff Shift & Leave Management             |
| * Interactive Before/After Gallery | * Razorpay Full & Split-Deposit Checkout     |
| * Service Discovery & Rich Details | * Double-Entry Loyalty Ledger & Referrals    |
| * Instant WhatsApp & Call Triggers | * Multi-Tier Memberships (Silver/Gold/Plat)  |
| * Local SEO & JSON-LD Structured   | * Google Sheets Resilient Operational Sync   |
|   Rich Snippets                    | * Multi-Provider Notifications (Email/WA)    |
| * Fully Responsive & Accessible    | * Granular RBAC (Admin, Staff, Customer)     |
+------------------------------------+----------------------------------------------+
```

### 2.1 Aesthetic & Brand Identity
* **Palette**: Warm White (`#FDFBF7`), Pure Ivory (`#FFFFF0`), Soft Linen/Beige (`#EFECE6`, `#E5DFD5`), Charcoal Noir (`#1A1A1A`), Deep Espresso (`#2C221E`), and Champagne Gold Accents (`#C5A880`, `#B89758`) with subtle Rose-Blush whispers (`#F9ECE8`).
* **Typography**: High-fashion editorial display serifs (Playfair Display / Cormorant) paired with hyper-legible geometric modern sans-serif body type (Plus Jakarta Sans).
* **Interactions**: Subtle physics-based motion via Framer Motion, layout transitions, interactive before/after image comparison sliders, responsive drawer navigation, and accessible keyboard-navigable widgets.

### 2.2 Operational Resilience
* **Zero Double-Bookings**: PostgreSQL database-level isolation and serializable transactional slot validation.
* **Fail-Safe Third-Party Integrations**: Decoupled asynchronous job execution for Google Sheets and notifications. If an external service is down, customer bookings succeed without disruption, and background workers retry with exponential backoff.
* **Strict Role-Based Access Control (RBAC)**: Enforced both at Next.js middleware and within the API/Service layers.

---

## 3. User Personas & Core Journeys

### 3.1 Customer (Client)
1. **Discovery & Inspiration**: Explores services by category, views real before/after transformations, checks bridal packages, and reads verified client reviews.
2. **Seamless Frictionless Booking**: 8-step wizard on mobile or desktop; selects service, selects preferred beautician (or "Any Available"), chooses date/time slot calculated against live availability, applies promo coupon or loyalty points, pays deposit or full amount via Razorpay.
3. **Account & Retention**: Tracks upcoming appointments, reschedules or cancels within policy rules, views membership tier perks, checks ledger-based loyalty points, refers friends via personal code, and leaves moderated reviews.

### 3.2 Staff (Beautician / Stylist)
1. **Daily Roster**: Views daily and weekly assigned appointments with service details, duration, and customer service notes.
2. **Execution**: Updates appointment progression (`CONFIRMED` -> `IN_PROGRESS` -> `COMPLETED`).
3. **Availability Control**: Views working shifts, logs breaks, requests planned leave, and manages assigned specializations.

### 3.3 Salon Administrator / Owner
1. **Live Operations Calendar**: Drag-and-drop or slot-based calendar across day, week, and month views broken down by staff member.
2. **Catalog & Pricing**: Manages categories, services, duration, add-ons, pricing, and staff eligibility.
3. **Growth Engine**: Configures coupons, flash offers, bridal packages, and loyalty reward rules.
4. **Analytics**: Real-time revenue reports, cancellation rates, beautician utilization rates, and client retention cohorts.
5. **No-Code CMS**: Edits hero banners, business hours, emergency announcements, holiday closures, and FAQs without touching code.

---

## 4. Key Differentiators

| Feature | Generic Salon Templates | Our Production Platform |
| :--- | :--- | :--- |
| **Booking Slots** | Static, hardcoded time pills | Live computed availability engine factoring shifts, breaks, leaves, buffer times, and existing bookings |
| **Concurrency** | Race condition prone; allows duplicate bookings | PostgreSQL transactional locks & conflict detection preventing simultaneous slot collisions |
| **Payments** | Mock UI or uncontrolled client redirects | Server-generated Razorpay Orders with cryptographic HMAC-SHA256 signature verification & webhooks |
| **External Sync** | Directly blocks request; crashes on failure | Asynchronous queue with dead-letter & retry logic; booking is never aborted due to Sheets/Email downtime |
| **Loyalty Engine** | Single editable number field | Double-entry audit ledger (`EARN`, `REDEEM`, `EXPIRE`, `ADJUST`) guaranteeing balance integrity |
| **CMS** | Hardcoded text in React JSX | Database-backed dynamic business settings & content editable from admin portal |

---

## 5. High-Level Technology Blueprint

* **Framework**: Next.js 15+ (App Router, Server Components, Route Handlers, Server Actions)
* **Language**: TypeScript Strict Mode (`noImplicitAny`, strict null checks)
* **Styling**: Tailwind CSS, CSS Variables for theming, Lucide Icons, Radix UI primitives
* **Database & ORM**: PostgreSQL with Prisma ORM (35+ strongly-typed relational entities)
* **Authentication**: NextAuth.js / Auth.js with JWT session strategy, bcrypt password hashing, and granular RBAC
* **Payments**: Razorpay Node SDK with server-side order generation and signature verification
* **Communications**: Resend/SMTP email engine with modular HTML templates + WhatsApp Business API abstraction
* **Integrations**: Google Sheets API v4 with resilient retry worker
* **Testing**: Vitest for unit/integration tests, Playwright for end-to-end critical booking paths
