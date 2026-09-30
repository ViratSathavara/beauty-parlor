# Beauty Parlor — REST API Specification & Endpoint Directory

## 1. API Design Standards

### 1.1 Architectural Style
* **Base URL**: `/api`
* **Format**: RESTful over HTTPS with JSON request/response payloads.
* **Idempotency**: All mutation requests (`POST`, `PATCH`, `DELETE`) require unique validation constraints. Critical payment/booking operations support optional `Idempotency-Key` headers.
* **Standard Response Envelope**:
  ```json
  // Success Response
  {
    "success": true,
    "data": { ... },
    "meta": {
      "page": 1,
      "limit": 20,
      "total": 142
    }
  }

  // Error Response
  {
    "success": false,
    "error": {
      "code": "SLOT_CONFLICT",
      "message": "The selected beautician slot has just been reserved by another client.",
      "details": {
        "staffId": "9d8e...",
        "requestedTime": "2026-10-15T11:00:00.000Z"
      }
    }
  }
  ```

---

## 2. API Endpoint Directory

### 2.1 Authentication & Profile (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Customer registration with referral code support |
| `POST` | `/api/auth/login` | Public | Credentials sign-in returning session cookie & JWT |
| `POST` | `/api/auth/logout` | Authenticated | Clears user session |
| `GET` | `/api/auth/session` | Authenticated | Retrieves active user identity, role, and profile |
| `POST` | `/api/auth/forgot-password` | Public | Generates password reset email link |
| `POST` | `/api/auth/reset-password` | Public | Consumes reset token and updates password |

### 2.2 Service Catalog & Categories (`/api/services` & `/api/categories`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Public | Lists all active categories with service counts |
| `POST` | `/api/categories` | Admin | Creates a new service category |
| `PATCH` | `/api/categories/:id` | Admin | Updates category title, image, or sort order |
| `DELETE` | `/api/categories/:id` | Admin | Deactivates or deletes category |
| `GET` | `/api/services` | Public | Filterable services list (by category, price, search) |
| `GET` | `/api/services/:slug` | Public | Detailed service information including addons and reviews |
| `POST` | `/api/services` | Admin | Creates a new service with pricing and durations |
| `PATCH` | `/api/services/:id` | Admin | Updates service details, pricing, and eligible staff |
| `DELETE` | `/api/services/:id` | Admin | Deactivates service from booking catalog |

### 2.3 Staff & Schedules (`/api/staff`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/staff` | Public | Lists active public beauticians with ratings & skills |
| `GET` | `/api/staff/:id` | Public | Public profile and customer reviews of a specialist |
| `POST` | `/api/staff` | Admin | Creates staff profile and assigns user credentials |
| `PATCH` | `/api/staff/:id` | Admin | Updates bio, experience, skills, and status |
| `GET` | `/api/staff/:id/schedule`| Staff / Admin | Retrieves weekly shifts and planned breaks |
| `PUT` | `/api/staff/:id/schedule`| Admin | Replaces staff weekly working schedule |
| `POST` | `/api/staff/:id/block` | Staff / Admin | Adds temporary leave or blocked time window |

### 2.4 Availability & Slot Engine (`/api/availability`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/availability/dates` | Public | Returns available calendar dates for a service within a month |
| `GET` | `/api/availability/slots` | Public | Dynamic slot engine: returns open time slots given `serviceId`, `date`, and optional `staffId` |

### 2.5 Appointments & Bookings (`/api/appointments`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/appointments/book` | Public / Auth | Validates slot, holds reservation, creates Razorpay order |
| `GET` | `/api/appointments/:id` | Customer/Staff/Admin | Fetches appointment details, status history, and receipt |
| `GET` | `/api/appointments` | Admin / Staff | Paginated appointments list with date/staff/status filters |
| `PATCH` | `/api/appointments/:id/status` | Staff / Admin | Updates status (`CONFIRMED`, `IN_PROGRESS`, `COMPLETED`, `NO_SHOW`) |
| `POST` | `/api/appointments/:id/reschedule` | Customer / Admin | Moves appointment to new date/time adhering to policy rules |
| `POST` | `/api/appointments/:id/cancel` | Customer / Admin | Cancels appointment and handles refund/credit logic |

### 2.6 Payments & Razorpay Integration (`/api/payments`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/create-order` | Authenticated | Server-side Razorpay order generation for deposit or full amount |
| `POST` | `/api/payments/verify` | Authenticated | Verifies HMAC-SHA256 signature and confirms appointment |
| `POST` | `/api/payments/webhook` | Webhook (Razorpay) | Asynchronous webhook for captured, failed, or refunded events |
| `GET` | `/api/payments/history` | Customer / Admin | List of payment transactions and downloadable invoices |
| `POST` | `/api/payments/:id/refund` | Admin | Initiates partial or full Razorpay refund |

### 2.7 Offers, Coupons & Packages (`/api/offers`, `/api/coupons`, `/api/packages`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/offers` | Public | Active public promotional offers |
| `POST` | `/api/coupons/validate` | Authenticated | Validates coupon code against cart value and user eligibility |
| `POST` | `/api/coupons` | Admin | Creates new coupon code with usage rules |
| `GET` | `/api/packages` | Public | Lists bridal and bundled packages |
| `GET` | `/api/packages/:slug` | Public | Details of bridal package with inclusion breakdown |

### 2.8 Loyalty, Referrals & Memberships (`/api/loyalty`, `/api/referrals`, `/api/memberships`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/loyalty/balance` | Customer | Returns customer's current balance and tier status |
| `GET` | `/api/loyalty/history` | Customer | Complete ledger transaction history |
| `POST` | `/api/loyalty/adjust` | Admin | Manual debit/credit adjustment with mandatory audit note |
| `GET` | `/api/referrals/summary` | Customer | Customer's referral code, invite counts, and earned rewards |
| `GET` | `/api/memberships` | Public | Available membership tiers (Silver, Gold, Platinum) |
| `POST` | `/api/memberships/subscribe` | Customer | Enrolls customer in membership plan via payment |

### 2.9 Reviews & Moderation (`/api/reviews`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews` | Public | Paginated approved public reviews |
| `POST` | `/api/reviews` | Customer | Submits verified review after completed appointment |
| `PATCH` | `/api/reviews/:id/status` | Admin | Moderation action (`APPROVED`, `REJECTED`) |

### 2.10 Contact Inquiries (`/api/inquiries`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/inquiries` | Public | Submits contact/bridal inquiry with validation |
| `GET` | `/api/inquiries` | Admin | Filterable inquiries list |
| `PATCH` | `/api/inquiries/:id` | Admin | Updates status (`CONTACTED`, `CONVERTED`, etc.) and adds notes |

### 2.11 Integrations & Sync (`/api/integrations`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/integrations/google-sheets/status` | Admin | Shows sync health and pending queue length |
| `POST` | `/api/integrations/google-sheets/retry` | Admin | Retries failed synchronization jobs |
| `POST` | `/api/integrations/whatsapp/send-template` | Admin / System | Dispatches transactional WhatsApp template |

### 2.12 Business Analytics (`/api/analytics`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics/kpis` | Admin | Daily/weekly revenue, appointment volumes, and customer growth |
| `GET` | `/api/analytics/revenue-trend` | Admin | Time-series revenue chart data |
| `GET` | `/api/analytics/staff-utilization` | Admin | Beautician load, completed services, and ratings |
| `GET` | `/api/analytics/inactive-customers` | Admin | Cohort segmentation of clients inactive for 30/60/90 days |

### 2.13 CMS & Settings (`/api/settings`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/settings/public` | Public | Operational hours, salon phone, address, and social links |
| `PUT` | `/api/settings` | Admin | Updates business configuration and CMS content |
