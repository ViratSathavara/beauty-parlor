# Beauty Parlor — System Requirements Specification (SRS)

## 1. Scope & Purpose

This document provides the definitive functional and non-functional requirements for the **Beauty Parlor** platform. It serves as the baseline contract for frontend, backend, database, testing, and deployment engineering.

---

## 2. Functional Requirements

### 2.1 Public Experience & Boutique Presentation
* **REQ-PUB-01: Responsive Editorial Showcase**: The platform must present an editorial homepage, about page, categorized service catalog, bridal package showcases, and before/after transformations.
* **REQ-PUB-02: Fluid Motion & Micro-interactions**: Must incorporate subtle scroll-reveals, hover states, and smooth layout transitions respecting `prefers-reduced-motion`.
* **REQ-PUB-03: Real-Time Before/After Image Comparison**: An interactive dual-layer slider allowing users to compare client transformation photographs with keyboard, touch, and mouse support.
* **REQ-PUB-04: Category & Service Exploration**: Dynamic search, category filtering (Hair, Skin, Makeup, Nails, Other), service duration, starting prices, and detailed descriptions with expandable FAQs and client reviews.
* **REQ-PUB-05: Bridal & Package Inquiry**: Dedicated showcase for tiered bridal packages (Basic, Premium, Luxury) with transparent inclusion lists, savings calculators, and direct consultation booking.
* **REQ-PUB-06: Contact & Location**: Contact inquiry form with real-time field validation, operational hours, landmark indications, interactive/embedded Google Map, and instant WhatsApp & phone click-to-contact actions.

### 2.2 Online Appointment Booking Engine
* **REQ-BKG-01: Multi-Step Intuitive Wizard**: An 8-step mobile-first booking flow:
  1. Service & Add-ons Selection
  2. Date Selection (with calendar bounds and holiday blackouts)
  3. Live Time Slot Picker (computed dynamically)
  4. Beautician Selection (specific staff member or "Any Available")
  5. Customer Information (Guest details or auto-filled for logged-in users)
  6. Promotional Code & Loyalty Points Application
  7. Payment Method (Deposit / Advance vs. Full Payment via Razorpay)
  8. Cryptographic Verification & Instant Booking Confirmation
* **REQ-BKG-02: Dynamic Availability Computation**: Real-time slot calculation that computes intervals based on:
  - Salon business operating hours and active business holidays.
  - Staff weekly shifts, active breaks, and approved leaves.
  - Existing appointments with duration + configurable turnaround buffer (default 15 minutes).
  - Explicit admin-created blocked slots.
* **REQ-BKG-03: Concurrency & Double-Booking Prevention**: Backend slot reservation must execute inside a PostgreSQL serializable transaction or advisory lock to prevent race conditions when two clients checkout the same staff slot simultaneously.
* **REQ-BKG-04: Booking Policies**: System must enforce:
  - Minimum advance booking notice (e.g., minimum 2 hours in advance).
  - Maximum booking window (e.g., up to 60 days in advance).
  - Configurable advance deposit percentage/fixed amount.
  - Cancellation & rescheduling deadlines (e.g., minimum 4 hours prior).

### 2.3 User Accounts & Authentication
* **REQ-AUTH-01: Authentication Modes**: Email/password registration and login, with optional Google OAuth.
* **REQ-AUTH-02: Password Security**: Strong password enforcement (minimum 8 characters, mixed case, number, symbol), hashed using bcrypt (cost factor >= 10).
* **REQ-AUTH-03: Role-Based Authorization**: Enforce 4 distinct roles: `CUSTOMER`, `STAFF`, `ADMIN`, `SUPER_ADMIN`.
* **REQ-AUTH-04: Session Management**: Secure HTTP-only cookies, signed JWTs with automatic refresh and CSRF protection.

### 2.4 Customer Self-Service Portal (`/account`)
* **REQ-CUST-01: Booking Management**: View upcoming and historical appointments, download appointment passes, initiate rescheduling, or cancel with reason capture.
* **REQ-CUST-02: Loyalty Ledger Tracking**: View current point balance, lifetime earned, expiring points, and complete double-entry transaction history (`EARN`, `REDEEM`, `EXPIRE`, `ADJUST`).
* **REQ-CUST-03: Membership Perks**: View active tier status (Silver, Gold, Platinum), validity dates, redeemed benefits, and renewal prompts.
* **REQ-CUST-04: Referral Hub**: Personal alphanumeric referral code (e.g., `JILU200`), shareable links, referral stats, and reward status.
* **REQ-CUST-05: Profile & Marketing Preferences**: Manage phone, address, anniversary, birthday (locked after initial set to prevent abuse), and communication consent (Email, WhatsApp, SMS).

### 2.5 Staff Portal (`/staff`)
* **REQ-STAF-01: Dedicated Schedule View**: Filterable daily and weekly roster of assigned appointments.
* **REQ-STAF-02: Appointment Execution**: Ability to mark appointments as `IN_PROGRESS` or `COMPLETED`, and append private internal service notes.
* **REQ-STAF-03: Shift & Leave Visibility**: View configured working days, shift timings, break hours, and submit time-off requests.
* **REQ-STAF-04: Privacy Safeguard**: Beauticians must only see necessary client details (first name, chosen service, allergies/notes) without sensitive financial or payment details.

### 2.6 Admin Operations & SaaS Control Center (`/admin`)
* **REQ-ADM-01: Live Operations Calendar**: Interactive day, week, and month calendar views with staff swimlanes, drag-and-drop rescheduling, and quick-block capabilities.
* **REQ-ADM-02: Catalog & Pricing Administration**: Full CRUD on service categories, individual services, add-on options, durations, pricing, and staff assignment matrix.
* **REQ-ADM-03: Staff Roster Management**: Staff profiles, skill tagging, recurring weekly working hours, shift break configurations, and emergency unavailability blocks.
* **REQ-ADM-04: Financials & Razorpay Reconciliation**: Detailed ledger of all payments, advance deposits, remaining balances, payment statuses, and partial/full refund controls.
* **REQ-ADM-05: Marketing & Promotions**: Create and manage coupons (percentage/flat, max discount, min spend, per-user limits, expiry dates), flash offers, and bridal packages.
* **REQ-ADM-06: Review Moderation**: Triage client-submitted reviews with photos; publish, reject, or feature reviews on public landing pages.
* **REQ-ADM-07: Inquiries Management**: Triage contact inquiries across lifecycle states: `NEW`, `CONTACTED`, `FOLLOW_UP`, `CONVERTED`, `CLOSED`.
* **REQ-ADM-08: CMS & Salon Settings**: No-code management of salon operational hours, business metadata, SEO tags, banner alerts, social links, FAQs, and Google Maps embed parameters.
* **REQ-ADM-09: Audit Logging**: Immutable chronological log tracking staff and admin modifications (price edits, cancellations, refunds, staff assignments).

### 2.7 Business Analytics & Reporting
* **REQ-ANA-01: Real-Time Operational KPIs**: Today's revenue, expected vs. collected cash, upcoming appointment count, staff utilization rate, and new vs. repeat customer ratio.
* **REQ-ANA-02: Trend Visualizations**: Time-series charts (7 days, 30 days, 3 months, 1 year) for revenue growth, booking volume by category, and peak hours heatmap.
* **REQ-ANA-03: Cohort & Churn Diagnostics**: Automated segmentation identifying dormant customers (inactive for 30, 60, or 90 days) eligible for re-engagement offers.

### 2.8 Third-Party Integrations
* **REQ-INT-01: Razorpay Payment Gateway**: Seamless integration for deposits and full prepayments via UPI, Credit/Debit cards, Netbanking, and Wallets. Webhook listener for asynchronous confirmation.
* **REQ-INT-02: Google Sheets Operational Sync**: Automated background sync appending booking records to an operational Google Sheet. Fail-safe retry queue ensures database operations never block on Google API latency or errors.
* **REQ-INT-03: Multi-Channel Notifications**:
  - Transactional HTML emails via Resend / SMTP for bookings, cancellations, reminders, and payment receipts.
  - Dynamic WhatsApp deep-links for prefilled customer messaging and backend abstraction for WhatsApp Business Cloud API automated notifications.
* **REQ-INT-04: Calendar Synchronization**: Customer one-click Google Calendar / iCal export link with pre-populated location, beautician, and appointment notes.

---

## 3. Non-Functional Requirements (NFRs)

### 3.1 Performance & Core Web Vitals
* **NFR-PERF-01**: Largest Contentful Paint (LCP) under 2.0 seconds on standard mobile 4G networks.
* **NFR-PERF-02**: Cumulative Layout Shift (CLS) <= 0.05 across all responsive breakpoints.
* **NFR-PERF-03**: First Input Delay (FID) / Interaction to Next Paint (INP) <= 100ms.
* **NFR-PERF-04**: Heavy assets (photography, hero images) served via optimized WebP/AVIF formats with responsive `srcset` and layout dimension placeholders.

### 3.2 Security & Data Protection
* **NFR-SEC-01**: HTTPS-only transport with HTTP Strict Transport Security (HSTS) headers.
* **NFR-SEC-02**: Protection against OWASP Top 10 vulnerabilities (CSRF, XSS, SQL Injection via Prisma prepared statements, Clickjacking via `X-Frame-Options: DENY`).
* **NFR-SEC-03**: Secure server-side credential isolation (API secrets, database credentials, webhook keys never exposed to the client bundle).
* **NFR-SEC-04**: Strict rate limiting on authentication, booking submission, and coupon validation endpoints to mitigate brute force and automated denial-of-service.

### 3.3 Reliability & Availability
* **NFR-REL-01**: 99.9% uptime target.
* **NFR-REL-02**: External integration failures (Google Sheets, Email dispatch) must not cause transactional booking requests to abort. Background retry queue guarantees eventual consistency.

### 3.4 Accessibility (a11y)
* **NFR-A11Y-01**: Compliance with WCAG 2.1 Level AA standards.
* **NFR-A11Y-02**: Accessible focus rings, screen-reader friendly labels (`aria-label`, `aria-expanded`, `aria-live`), and full keyboard navigability throughout the booking modal and navigation drawer.

### 3.5 Search Engine Optimization (SEO)
* **NFR-SEO-01**: Server-side rendered meta tags, canonical links, OpenGraph cards, and Twitter cards on all public routes.
* **NFR-SEO-02**: Rich structured data (JSON-LD) for `BeautySalon`, `Service`, `Review`, `BreadcrumbList`, and `FAQPage`.
* **NFR-SEO-03**: Dynamic `sitemap.xml` and `robots.txt` generation reflecting active services, categories, and bridal packages.
