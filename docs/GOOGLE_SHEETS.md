# Beauty Parlor — Google Sheets Operational Integration

## 1. Architectural Role & Boundary

**Google Sheets is an operational reporting and external backup layer, NOT the primary database.**

* **PostgreSQL is the single source of truth** for all business data, customer balances, and appointment schedules.
* The Google Sheets integration provides salon managers and front-desk receptionists with a live, familiar spreadsheet overview for day-to-day coordination on salon tablets or phones without requiring dashboard logins.
* **Fail-Safe Principle**: If the Google Sheets API encounters rate limits, authentication errors, or network outages, **the customer booking process is never disrupted**. The sync job is queued for automatic background retry.

```
[Appointment Created / Updated]
               |
               v
      [PostgreSQL Database]  <--- (Transaction Confirmed)
               |
      [Enqueues Sync Task]
               |
               v
   [Google Sheets Sync Worker]
               |
   +-----------+-----------+
   | (Success)             | (Failure)
   v                       v
[Appends Row to Sheet]   [Logs Failure to IntegrationSyncJob]
                           [Alerts Admin & Schedules Retry]
```

---

## 2. Spreadsheet Column Mapping

The integration maps booking entities to standardized columns in the master operational spreadsheet:

| Col # | Column Header | Data Source / Format | Example Value |
| :---: | :--- | :--- | :--- |
| **A** | Booking ID | `Appointment.bookingNumber` | `BP-2026-1024` |
| **B** | Customer Name | `CustomerProfile.firstName + lastName` | `Pooja Sharma` |
| **C** | Phone | `User.phone` | `+91 98765 43210` |
| **D** | Email | `User.email` | `pooja.sharma@example.com` |
| **E** | Service(s) | Comma-separated service names | `Hydra Facial + Under-Eye Mask` |
| **F** | Assigned Beautician | `Staff.fullName` | `Priya Patel` |
| **G** | Appointment Date | `Appointment.date` (`YYYY-MM-DD`) | `2026-10-15` |
| **H** | Slot Time | `Appointment.startTime` (`HH:mm AM/PM`) | `11:00 AM` |
| **I** | Total Value (₹) | `Appointment.totalAmount` | `₹3,500.00` |
| **J** | Advance Paid (₹) | `Appointment.advanceAmount` | `₹500.00` |
| **K** | Due at Salon (₹) | `Appointment.dueAmount` | `₹3,000.00` |
| **L** | Payment Status | `Payment.status` | `PAID` |
| **M** | Booking Status | `Appointment.status` | `CONFIRMED` |
| **N** | Booked At | `Appointment.createdAt` (ISO String) | `2026-09-30 10:14:22` |

---

## 3. Google API Authentication & Configuration

The service authenticates via a Google Cloud Service Account with restricted permissions:
* **Scopes**: `https://www.googleapis.com/auth/spreadsheets`
* **Credentials**:
  - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: e.g. `beauty-parlor-sync@project-id.iam.gserviceaccount.com`
  - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`: RSA private key stored in environment variables (with newline escaping).
  - `GOOGLE_SHEET_ID`: Target Google Spreadsheet ID from URL.

---

## 4. Failure Handling & Admin Control

1. **Auto-Retry Pipeline**:
   - Failed API requests log error status code and payload to `IntegrationSyncJob`.
   - A cron/worker attempts re-synchronization up to 5 times using exponential backoff.
2. **Admin Operations Portal (`/admin/settings/integrations`)**:
   - Live status card: **Google Sheets Sync Health** (`CONNECTED` / `WARNING` / `OFFLINE`).
   - Counter of pending or failed sync rows.
   - **"Retry Failed Syncs"** button triggering an immediate batch push of unresolved records.
   - Direct link to view the synchronized Google Sheet.
