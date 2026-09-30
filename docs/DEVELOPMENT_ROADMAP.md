# Beauty Parlor — Development Roadmap & Implementation Plan

## 1. Roadmap Strategy & Phase Sequencing

In accordance with strict production-grade engineering principles, features are delivered in **isolated, verified, and testable phases**. Each phase must complete type-checking, linting, tests, and documentation before advancing to the subsequent phase.

```
[Phase 1: Foundation]
        |
        v
[Phase 2: Public Website & Boutique]
        |
        v
[Phase 3: Real-Time Booking Engine]
        |
        v
[Phase 4: Razorpay Payments & Ledgers]
        |
        v
[Phase 5: Admin Operations & Calendar]
        |
        v
[Phase 6: Customer Portal & Retention]
        |
        v
[Phase 7: Multi-Channel Notifications]
        |
        v
[Phase 8: Resilient Google Sheets Sync]
        |
        v
[Phase 9: Business Analytics & Cohorts]
        |
        v
[Phase 10: Testing, Hardening & a11y]
        |
        v
[Phase 11: Production Deployment]
```

---

## 2. Granular Phase Breakdown

### Phase 1: Foundation & Core Infrastructure
* [ ] Initialize Next.js 15+ App Router project with TypeScript strict mode.
* [ ] Configure Tailwind CSS, CSS variables, and design tokens for luxury palette.
* [ ] Establish Prisma ORM configuration with complete 35+ entity schema and relations.
* [ ] Implement NextAuth.js / Auth.js with JWT session strategy and bcrypt hashing.
* [ ] Create Edge Middleware for RBAC route protection (`/account`, `/staff`, `/admin`).
* [ ] Set up standardized API response envelopes, error boundaries (`error.tsx`), and 404 (`not-found.tsx`).
* [ ] Implement structured logger and database health check endpoint.
* [ ] Create comprehensive seed script with realistic Indian beauty parlor services, categories, staff, and admin accounts.

### Phase 2: Public Website & Editorial Experience
* [ ] Build responsive luxury navigation header with announcement bar and booking CTA.
* [ ] Build editorial Homepage:
  - Hero section with subtle typography motion, parallax background, and dual CTA buttons.
  - Trust indicators, popular treatments, and seasonal highlights.
  - Interactive Before / After transformation slider.
  - Featured beauticians, customer reviews carousel, and Instagram visual grid.
  - Salon location, operating hours, and luxury footer with WhatsApp concierge.
* [ ] Build Services catalog (`/services`) with category tabs, search, and duration/price tags.
* [ ] Build Service detail page (`/services/[slug]`) with inclusions, specialist cards, FAQs, and schema.org JSON-LD.
* [ ] Build Bridal package showcase (`/bridal` and `/packages`).
* [ ] Build Interactive Before/After gallery (`/gallery/before-after`).
* [ ] Build Contact form (`/contact`) and Location page (`/location`) with embedded Google Map.
* [ ] Build Legal pages (`/privacy-policy`, `/terms`, `/refund-policy`).
* [ ] Configure dynamic `sitemap.xml` and `robots.txt`.

### Phase 3: Real-Time Booking & Scheduling Engine
* [ ] Implement backend `AvailabilityService` computing valid time slots:
  - Intersecting business hours, holidays, staff shifts, breaks, and existing appointments.
  - Enforcing 15-minute turnaround buffer and minimum 2-hour advance booking rule.
* [ ] Implement PostgreSQL row-locking concurrency guard to prevent simultaneous slot collisions.
* [ ] Build 8-Step interactive mobile-first booking wizard:
  - Step 1: Service & Add-ons selection.
  - Step 2: Interactive date picker with holiday blackouts.
  - Step 3: Beautician selector ("Any Available" or specific specialist).
  - Step 4: Live time slot selector.
  - Step 5: Customer information form with guest-to-account auto-provisioning.
  - Step 6: Promo coupon validation and loyalty point discount selector.
  - Step 7: Deposit vs. Full payment toggle with live receipt breakdown.
  - Step 8: Confirmed pass view with appointment ID, calendar export, and directions.
* [ ] Implement appointment lifecycle state machine (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`, `RESCHEDULED`).

### Phase 4: Razorpay Payments & Financial Transactions
* [ ] Integrate Razorpay Node.js SDK on server route `/api/payments/create-order`.
* [ ] Implement client-side checkout integration loading Razorpay standard modal.
* [ ] Implement HMAC-SHA256 payment signature verification endpoint `/api/payments/verify`.
* [ ] Build Razorpay webhook listener (`/api/payments/webhook`) handling `payment.captured` and `payment.failed`.
* [ ] Implement refund processing service for cancellations according to policy timeline.
* [ ] Generate sequential GST-compliant invoice numbers (`INV-2026-XXXX`).

### Phase 5: Admin Operations & SaaS Management Portal
* [ ] Build responsive admin layout with collapsible sidebar, notification bell, and user drawer.
* [ ] Implement Live Operations Calendar:
  - Day, week, and month views.
  - Staff swimlanes showing assigned appointments with status color coding.
  - Modal to manually create, reschedule, cancel, or add internal notes.
* [ ] Build Catalog & Pricing management (Categories, Services, Add-ons, Durations).
* [ ] Build Staff management (Profiles, Photos, Weekly shifts, Breaks, Leaves).
* [ ] Build Marketing & Promotions management (Coupons, Flash Offers, Bridal Packages).
* [ ] Build Review Moderation module (`PENDING`, `APPROVED`, `REJECTED`).
* [ ] Build Inquiry CRM for triage of incoming contact submissions.
* [ ] Build No-Code CMS & Business Settings manager (Opening hours, contact phone, hero copy, social links).
* [ ] Build Immutable Audit Log viewer.

### Phase 6: Customer Portal & Retention Engine
* [ ] Build Customer Dashboard (`/account`):
  - Upcoming appointment pass with countdown timer and rescheduling/cancellation actions.
  - Past appointment history with invoice download and review submission triggers.
* [ ] Build Double-Entry Loyalty Ledger:
  - Transaction history (`EARN`, `REDEEM`, `ADJUST`, `EXPIRE`).
  - Progress bar towards tier perks.
* [ ] Build Multi-Tier Membership module (`Silver`, `Gold`, `Platinum`) showing active validity and discount benefits.
* [ ] Build Referral program hub with personal code (e.g. `JILU200`), shareable links, and reward tracking.
* [ ] Build Profile & Marketing communication consent toggles.

### Phase 7: Multi-Channel Notifications & Communications
* [ ] Build responsive HTML email templates in `/emails` (Appointment Confirmed, Reminder, Receipt, Cancellation, Birthday Offer).
* [ ] Implement Resend/SMTP email dispatcher.
* [ ] Build WhatsApp click-to-chat link generators with dynamic contextual strings.
* [ ] Implement automated WhatsApp Cloud API provider abstraction (`IWhatsAppProvider`).
* [ ] Implement 24-hour appointment reminder scheduler.
* [ ] Implement Admin in-app notification center.

### Phase 8: External Integrations & Operational Google Sheets Sync
* [ ] Implement Google Sheets API v4 service syncing confirmed bookings.
* [ ] Implement resilient background queue (`IntegrationSyncJob`) with exponential retry backoff.
* [ ] Build Admin integration status dashboard showing sync health and manual retry trigger.
* [ ] Implement one-click Google Calendar & `.ics` file generator.

### Phase 9: Business Analytics & Cohort Diagnostics
* [ ] Build Analytics dashboard with date range filters (Today, 7D, 30D, 3M, 1Y).
* [ ] Time-series revenue charts and booking volume metrics.
* [ ] Service category popularity breakdown and staff utilization metrics.
* [ ] Cohort retention analysis identifying dormant customers inactive for 30, 60, or 90 days.

### Phase 10: Testing, Hardening & Accessibility Audit
* [ ] Unit tests for availability engine, slot collisions, coupon limits, and loyalty ledgers.
* [ ] Integration tests for API routes and Prisma transactions.
* [ ] End-to-end Playwright tests for complete customer booking and payment flows.
* [ ] Security scan (Rate limiting, CSP headers, XSS prevention, sanitized inputs).
* [ ] Accessibility (WCAG 2.1 AA) audit: keyboard navigability, focus rings, contrast, and `prefers-reduced-motion`.

### Phase 11: Production Deployment & Verification
* [ ] Configure production database on managed PostgreSQL with PgBouncer.
* [ ] Deploy to Vercel or containerized cloud host with SSL.
* [ ] Configure production DNS, webhooks, and third-party API credentials.
* [ ] Perform smoke tests on live domain and verify end-to-end booking.
