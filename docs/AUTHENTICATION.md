# Beauty Parlor — Authentication & Session Architecture

## 1. Authentication Strategy Overview

The platform uses **NextAuth.js (Auth.js)** configured with a **JSON Web Token (JWT)** session strategy. This guarantees stateless verification across Next.js Server Components, Route Handlers, and Edge Middleware without introducing database lookup latency on every page request.

```mermaid
flowchart LR
    Client[Browser / Client] -->|Credentials or Google| AuthEndpoint[/api/auth/*]
    AuthEndpoint -->|Bcrypt Compare| DB[(PostgreSQL User Store)]
    AuthEndpoint -->|Issue Signed JWT in HTTP-Only Cookie| Client
    Client -->|Subsequent Requests with Cookie| Middleware[Edge Middleware]
    Middleware -->|Verify Signature & Decode Role| ProtectedRoutes[Protected Routes]
```

---

## 2. Core Capabilities

### 2.1 Supported Identity Providers
1. **Credentials Provider**:
   - Identifier: Email or Phone Number.
   - Secret: Salted password hashed using `bcrypt` (12 rounds) or `argon2id`.
   - Protection against user enumeration: Normalized generic error messages ("Invalid email or password").
2. **Google OAuth Provider**:
   - Frictionless social sign-in for customers.
   - Auto-creates `CustomerProfile` with a unique generated referral code (e.g. `BP-XXXXX`) upon first login.

### 2.2 Guest Checkout Hybrid Flow
To minimize booking abandonment, clients are not forced to create an account prior to selecting a service.
1. Client selects service, beautician, date, and time.
2. In Step 5 (Customer Details), client enters Name, Phone, and Email.
3. System checks if a user with that email/phone already exists:
   - **If existing**: Links booking to existing profile.
   - **If new**: Automatically provisions a `User` account with role `CUSTOMER`, sends an invite/welcome email with a temporary magic link to set a password, and proceeds to payment.

---

## 3. Token Payload & Session Claims

The JWT token contains lightweight identity and authorization claims:

```typescript
interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';
  staffId?: string; // Present if role is STAFF
  profileId?: string; // Present if role is CUSTOMER
  referralCode?: string;
}

interface AppJWT {
  sub: string; // User ID
  email: string;
  role: 'CUSTOMER' | 'STAFF' | 'ADMIN' | 'SUPER_ADMIN';
  staffId?: string;
  profileId?: string;
  iat: number;
  exp: number; // Defaults to 30 days with rolling refresh
}
```

---

## 4. Security Hardening Measures

### 4.1 Cookie Flags
* `HttpOnly: true` (Inaccessible to client-side JavaScript, defeating XSS token theft).
* `Secure: true` (Transmitted strictly over HTTPS in production).
* `SameSite: 'lax'` (Provides balanced CSRF protection while permitting top-level navigation).
* `Path: '/'`.

### 4.2 Rate Limiting on Auth Endpoints
* Login attempts: Maximum 5 failed attempts per IP/Email per 15 minutes.
* Password reset requests: Maximum 3 requests per hour per email.
* Handled via Redis / Upstash Token Bucket or in-memory sliding window fallback.

### 4.3 Password Reset Lifecycle
1. User requests reset via `/api/auth/forgot-password`.
2. Backend creates a cryptographic 32-byte hex token.
3. Token is hashed (`SHA-256`) and saved to database with a 60-minute expiration.
4. Raw token is dispatched via transactional email with a signed link (`/reset-password?token=...`).
5. Upon submission, token hash is verified and password updated within a transaction.
