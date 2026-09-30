# Beauty Parlor — Production Deployment & DevOps Guide

## 1. Target Infrastructure Blueprint

```
+--------------------------------------------------------------------------+
|                         PRODUCTION DEPLOYMENT TOPOLOGY                   |
+------------------------------------+-------------------------------------+
| COMPUTATION                        | PERSISTENCE & CACHING               |
+------------------------------------+-------------------------------------+
| * Next.js on Vercel / Node Docker  | * Managed PostgreSQL (Neon/Supabase)|
| * Edge CDN & DDoS Protection       | * PgBouncer Connection Pooling      |
| * Automatic HTTPS via Let's Encrypt| * Upstash Redis (Rate limiting)     |
+------------------------------------+-------------------------------------+
| STORAGE & MEDIA                    | THIRD-PARTY ADAPTERS                |
+------------------------------------+-------------------------------------+
| * Cloudinary / AWS S3              | * Razorpay Payment Gateway          |
| * AVIF/WebP Automated Optimization | * Resend Transactional Email        |
| * Global Fastly/Cloudflare CDN     | * Google Cloud Service Account      |
+------------------------------------+-------------------------------------+
```

---

## 2. Step-by-Step Deployment Guide

### 2.1 Database Initialization
1. Provision a PostgreSQL instance (v15+) with connection pooling enabled.
2. Run Prisma migrations to establish tables, indexes, and relations:
   ```bash
   npx prisma migrate deploy
   ```
3. Populate baseline categories, demo services, roles, and default business settings:
   ```bash
   npm run db:seed
   ```

### 2.2 Third-Party Service Onboarding

#### A. Razorpay Integration
1. Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Generate **Key ID** and **Key Secret** under *Settings > API Keys*.
3. Add a Webhook URL:
   - Endpoint: `https://your-domain.com/api/payments/webhook`
   - Active Events: `payment.captured`, `payment.failed`, `refund.processed`
   - Set a strong random Webhook Secret and add it to `RAZORPAY_WEBHOOK_SECRET`.

#### B. Resend (Transactional Email)
1. Register domain on [Resend.com](https://resend.com).
2. Configure DNS records (SPF, DKIM, MX) with your domain registrar.
3. Obtain API key and store as `EMAIL_API_KEY`.
4. Configure sender email: `EMAIL_FROM="Elegance Beauty <hello@your-domain.com>"`.

#### C. Google Cloud & Sheets Setup
1. Create a project in [Google Cloud Console](https://console.cloud.google.com).
2. Enable the **Google Sheets API v4**.
3. Create a **Service Account** and generate a JSON key.
4. Create a new Google Spreadsheet and share it with the Service Account email with **Editor** permissions.
5. Populate `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, and `GOOGLE_SHEET_ID`.

#### D. Cloudinary Media Asset Pipeline
1. Create account on [Cloudinary](https://cloudinary.com).
2. Configure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
3. Set auto-formatting to `f_auto,q_auto` to ensure browser-optimized WebP/AVIF delivery.

---

## 3. Production Build & Execution

```bash
# Install production dependencies
npm ci

# Validate types & linting
npm run type-check
npm run lint

# Generate Prisma client
npx prisma generate

# Build Next.js application
npm run build

# Start production server
npm start
```

---

## 4. Health Checks & Diagnostics

* **Health Endpoint**: `GET /api/health`
  - Validates PostgreSQL database connectivity.
  - Validates Redis / memory cache connectivity.
  - Returns `200 OK` with system uptime and environment indicator.
* **Structured Logging**: Application logs use JSON structured outputs (`Pino`) with correlation IDs (`x-request-id`) to enable effortless ingestion into Datadog, Better Stack, or CloudWatch.
