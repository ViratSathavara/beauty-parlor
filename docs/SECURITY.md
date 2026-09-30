# Beauty Parlor — Security & Hardening Architecture

## 1. Security Philosophy: Defense in Depth

The Beauty Parlor platform enforces security across every layer of the system: network edge, Next.js middleware, API route handlers, domain services, database queries, and third-party integrations.

```
+--------------------------------------------------------------------------+
|                     MULTI-LAYERED DEFENSE ARCHITECTURE                   |
+--------------------------------------------------------------------------+
| 1. EDGE: Cloudflare / Vercel WAF & Rate Limiting                         |
| 2. MIDDLEWARE: Next.js Session Decryption & RBAC Path Protection         |
| 3. API CONTROLLER: Zod Request Validation & Sanitization                 |
| 4. SERVICE LAYER: Business Policy Verification & Concurrency Checks      |
| 5. DATABASE: PostgreSQL Parameterized Queries via Prisma ORM            |
| 6. INFRASTRUCTURE: Non-Root Docker Containers & Secret Isolation        |
+--------------------------------------------------------------------------+
```

---

## 2. Key Safeguards

### 2.1 Cryptographic Storage & Authentication
* **Password Hashing**: Passwords hashed using `bcrypt` with cost factor 12. Plaintext passwords are never logged, serialized, or returned in API responses.
* **Session Storage**: JWT tokens stored inside HTTP-Only, Secure, `SameSite=Lax` cookies. Tokens cannot be accessed via JavaScript `document.cookie`, preventing cross-site scripting (XSS) token exfiltration.
* **Timing-Attack Resistance**: Authentication failures execute constant-time comparisons (`crypto.timingSafeEqual`) to prevent username enumeration via response duration profiling.

### 2.2 Input Validation & Sanitization
* All incoming API payloads are parsed against **Zod schemas**.
* Unknown JSON properties are stripped by default (`.strict()` / `.strip()`).
* Rich text or user-provided messages are sanitized using DOMPurify before database persistence.

### 2.3 SQL Injection & ORM Protection
* All data access utilizes **Prisma ORM**, ensuring queries are automatically prepared and parameterized at the database driver level.
* Raw SQL queries are strictly prohibited unless executing database-level advisory locks, and always utilize Prisma's tagged template literal `prisma.$queryRaw` with typed parameter binding.

### 2.4 Rate Limiting & DoS Mitigation
* Applied via token-bucket algorithm on sensitive routes:
  - `/api/auth/login`: 5 requests per 15 minutes per IP.
  - `/api/auth/register`: 3 requests per hour per IP.
  - `/api/appointments/book`: 10 requests per minute per IP.
  - `/api/coupons/validate`: 20 requests per minute per IP (prevents automated dictionary attacks on discount codes).

### 2.5 Security Headers (HTTP)
Injected via `next.config.js`:
```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.razorpay.com https://lumberjack.razorpay.com; frame-src https://api.razorpay.com;"
  }
];
```

### 2.6 Financial Isolation & PCI Compliance
* **Zero Cardholder Data Storage**: Credit card numbers, CVVs, and banking PINs never touch our servers. All financial input is captured in the client browser inside Razorpay's PCI-DSS Level 1 compliant iframe.
* **Cryptographic Verification**: Every transaction must verify Razorpay's HMAC-SHA256 signature using `RAZORPAY_KEY_SECRET`.

---

## 3. Administrative Audit Logging

All privileged actions (price changes, appointment cancellations, role assignments, manual loyalty point adjustments) write an immutable record to the `AuditLog` table capturing:
* Actor `userId`.
* Action type (`SERVICE_PRICE_UPDATED`, `APPOINTMENT_CANCELLED`, etc.).
* Entity name and ID.
* JSON snapshot of previous state vs. new state.
* Client IP address and User Agent.
