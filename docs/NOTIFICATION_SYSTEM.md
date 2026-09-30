# Beauty Parlor — Multi-Channel Notification System

## 1. Architectural Strategy

The notification infrastructure is architected for **high reliability, client privacy, and zero blocking latency**. When business events occur (such as a customer confirming an appointment or submitting a bridal inquiry), transactional dispatches are offloaded to an asynchronous background worker queue:

```
[Core Service] ---(Enqueue Event)---> [IntegrationSyncJob (PostgreSQL)]
                                                |
                                        [Async Worker Queue]
                                                |
                       +------------------------+------------------------+
                       |                        |                        |
                       v                        v                        v
             [Email Provider (Resend)]   [WhatsApp Provider]     [In-App Notification]
```

---

## 2. Notification Channels

### 2.1 Email Engine (Resend / SMTP)
* Responsive, high-fashion branded HTML email templates stored in `/emails`:
  - `appointment-confirmed.html`: Includes appointment number, specialist photo/name, treatment duration, salon location map link, and Google Calendar attachment (`.ics`).
  - `appointment-reminder-24h.html`: Dispatched 24 hours prior to service.
  - `appointment-cancelled.html`: Details reason and refund/rescheduling options.
  - `payment-receipt.html`: Itemized financial invoice.
  - `review-request.html`: Sent 2 hours post-completion inviting client feedback.
  - `birthday-gift.html`: Exclusive VIP birthday discount coupon.
  - `referral-credited.html`: Informs referrer that points have been deposited.

### 2.2 WhatsApp Communication
* **Direct Deep-Links**: One-click interactive buttons on the website generating pre-filled messages:
  - `"Hi! I would like to inquire about Bridal Makeup on 15 Oct at 11:00 AM."`
* **Automated Cloud API Abstraction**: Clean provider interface (`IWhatsAppProvider`) allowing direct integration with Meta WhatsApp Cloud API or aggregators (Twilio, Gupshup, Wati) without altering business logic.

### 2.3 Admin In-App Notification Center
* Live dashboard bell indicator displaying unread notifications:
  - New appointment booked.
  - Payment received.
  - Client cancelled appointment.
  - New contact inquiry submitted.
  - New review awaiting moderation.
  - Google Sheets sync failure alert.

---

## 3. Scheduled Notification Workflows

| Trigger | Timing | Channels | Audience | Consent Required? |
| :--- | :--- | :--- | :--- | :--- |
| **New Booking** | Instant | Email, WhatsApp, In-App | Customer & Admin | No (Transactional) |
| **Payment Captured**| Instant | Email, In-App | Customer & Admin | No (Transactional) |
| **24-Hour Reminder**| Exactly 24h prior | Email, WhatsApp | Customer | No (Operational) |
| **Post-Service Review**| 2h after completion | Email | Customer | Yes (`marketingConsentEmail`) |
| **Birthday Promo** | 9:00 AM on birthday | Email, WhatsApp | Customer | Yes (Explicit opt-in) |
| **Inactive 60 Days** | Weekly batch scan | Email | Customer | Yes (Explicit opt-in) |

---

## 4. Fail-Safe Resilience & Retry Logic

Notifications must never cause a booking failure if an external gateway is experiencing downtime:
1. Notification payloads are written to the `IntegrationSyncJob` table with status `PENDING`.
2. The dispatch worker executes the HTTP call:
   - On success: updates status to `SUCCESS`.
   - On failure: logs the error stack, increments `retryCount`, and calculates next retry using exponential backoff:
     $$\text{delay} = 2^{\text{retryCount}} \times 60 \text{ seconds}$$
3. After 5 failed attempts, the job is flagged as `FAILED` and an alert is pinned to the Admin Notification Center with a manual **Retry** trigger button.
