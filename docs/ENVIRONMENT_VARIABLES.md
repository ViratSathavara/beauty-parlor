# Beauty Parlor — Environment Variables Specification

## 1. Overview & Security Rules

All configuration secrets are injected via environment variables.
* **`NEXT_PUBLIC_*`**: Safe for client browser consumption. Never place database credentials, API secrets, or private keys in variables with this prefix.
* **Private Secrets**: Strictly consumed on Node.js server runtimes (Server Components, Route Handlers, Server Actions).
* **Local Development**: Stored in `.env.local` (ignored by git).
* **Repository Rule**: Never commit actual secret keys to source control. Always refer to `.env.example`.

---

## 2. Definitive Environment Variables Directory

| Variable Name | Required | Default / Format | Description & Security Context |
| :--- | :---: | :--- | :--- |
| **DATABASE_URL** | Yes | `postgresql://user:pass@host:5432/beauty_db?pgbouncer=true` | Primary PostgreSQL connection string with pooling. |
| **DIRECT_URL** | Conditional | `postgresql://user:pass@host:5432/beauty_db` | Direct connection string for Prisma migrations (bypassing pooler). |
| **NEXTAUTH_URL** | Yes | `http://localhost:3000` or `https://beauty-parlor.com` | Base URL of the application for Auth.js redirects. |
| **NEXTAUTH_SECRET** | Yes | 32-byte hex string (`openssl rand -base64 32`) | Cryptographic secret used to sign session JWTs. |
| **GOOGLE_CLIENT_ID** | Optional | `xxxx.apps.googleusercontent.com` | Google OAuth Client ID for customer social login. |
| **GOOGLE_CLIENT_SECRET**| Optional | String | Google OAuth Client Secret. |
| **RAZORPAY_KEY_ID** | Yes | `rzp_test_...` or `rzp_live_...` | Public Razorpay Key ID used in checkout modal. |
| **RAZORPAY_KEY_SECRET**| Yes | String (32 chars) | Private Razorpay Key Secret for order creation & signature verification. |
| **RAZORPAY_WEBHOOK_SECRET**| Yes | String | Secret key configured in Razorpay dashboard for webhook HMAC verification. |
| **EMAIL_API_KEY** | Yes | `re_...` (Resend) | API key for transactional email dispatch. |
| **EMAIL_FROM** | Yes | `Elegance Salon <bookings@beauty-parlor.com>` | Verified sender address appearing in customer inbox. |
| **GOOGLE_SERVICE_ACCOUNT_EMAIL** | Yes | `service-acc@proj.iam.gserviceaccount.com` | Google Cloud Service Account with Google Sheets Editor rights. |
| **GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY** | Yes | `-----BEGIN PRIVATE KEY-----\n...` | RSA private key for Google Cloud IAM authentication. |
| **GOOGLE_SHEET_ID** | Yes | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` | ID of target Google Spreadsheet from its browser URL. |
| **WHATSAPP_API_KEY** | Optional | Bearer token | Cloud API bearer token for automated WhatsApp template dispatch. |
| **WHATSAPP_PHONE_NUMBER_ID** | Optional | Numeric string | Meta WhatsApp Business phone number identifier. |
| **CLOUDINARY_CLOUD_NAME** | Yes | String | Cloudinary cloud identifier for responsive image hosting. |
| **CLOUDINARY_API_KEY** | Yes | Numeric string | Cloudinary API Key. |
| **CLOUDINARY_API_SECRET**| Yes | String | Cloudinary private API secret. |
| **NEXT_PUBLIC_SITE_URL** | Yes | `https://beauty-parlor.com` | Canonical site URL for OpenGraph and Schema.org metadata. |
| **NEXT_PUBLIC_GOOGLE_MAPS_KEY** | Optional | String | Restricted Google Maps JavaScript API key for location rendering. |
| **NEXT_PUBLIC_WHATSAPP_NUMBER** | Yes | `919876543210` | E.164 formatted salon WhatsApp number for click-to-chat links. |
| **NEXT_PUBLIC_SALON_PHONE** | Yes | `+91 98765 43210` | Customer support phone number for call triggers and headers. |
| **ADMIN_DEFAULT_EMAIL** | Dev only | `admin@beautyparlor.com` | Seed script initial Super Admin user email. |
| **ADMIN_DEFAULT_PASSWORD** | Dev only | Complex password | Seed script initial Super Admin temporary password. |
