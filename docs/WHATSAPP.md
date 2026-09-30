# Beauty Parlor — WhatsApp Integration Architecture

## 1. Two-Tier WhatsApp Strategy

WhatsApp is the most popular direct customer communication channel in India. The platform implements a **two-tier architecture**:

```
+--------------------------------------------------------------------------+
|                       WHATSAPP INTEGRATION STRATEGY                      |
+------------------------------------+-------------------------------------+
| TIER 1: CLIENT-SIDE INTERACTION    | TIER 2: AUTOMATED CLOUD API         |
+------------------------------------+-------------------------------------+
| * Instant deep-links (wa.me)       | * Server-side transactional dispatch|
| * Pre-filled, context-aware strings| * Meta WhatsApp Cloud API / Twilio  |
| * Zero API cost or rate limits     | * Automated 24h reminders           |
| * Works on mobile & desktop        | * Instant booking confirmations     |
| * Floating salon concierge pill    | * Pre-approved HSM message templates|
+------------------------------------+-------------------------------------+
```

---

## 2. Tier 1: Contextual Click-to-Chat Deep Links

The platform features pre-configured WhatsApp direct links populated with dynamic context:

### 2.1 Dynamic Context Generators (`src/lib/whatsapp/links.ts`)
* **General Salon Inquiry**:
  ```
  https://wa.me/919876543210?text=Hi%20Beauty%20Parlor%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.
  ```
* **Specific Service Consultation**:
  ```
  https://wa.me/919876543210?text=Hi%2C%20I%20am%20interested%20in%20booking%20the%20*Hydra%20Facial*%20treatment.%20Could%20you%20share%20details%3F
  ```
* **Bridal Consultation Request**:
  ```
  https://wa.me/919876543210?text=Hi!%20I%20am%20planning%20my%20wedding%20and%20interested%20in%20the%20*Luxury%20Bridal%20Package*.%20I%20would%20love%20to%20schedule%20a%20bridal%20consultation.
  ```
* **Confirmed Booking Follow-up**:
  ```
  https://wa.me/919876543210?text=Hello%2C%20I%20have%20an%20appointment%20*BP-2026-1024*%20for%20*Bridal%20Makeup*%20on%2015%20Oct%20at%2011%3A00%20AM.%20Connecting%20with%20you%20here!
  ```

---

## 3. Tier 2: Automated Cloud API Abstraction

To ensure long-term flexibility, automated notifications interact through an adapter interface rather than coupling to a single vendor.

### 3.1 Service Abstraction Interface
```typescript
export interface IWhatsAppProvider {
  sendTemplateMessage(options: {
    to: string; // E.164 formatted number (e.g. +919876543210)
    templateName: string;
    languageCode: string;
    components: Array<{
      type: 'header' | 'body' | 'button';
      parameters: Array<{
        type: 'text' | 'image' | 'date_time';
        text?: string;
        imageUrl?: string;
      }>;
    }>;
  }): Promise<{ success: boolean; messageId?: string; error?: string }>;
}
```

### 3.2 Supported Adapters
1. **Meta WhatsApp Cloud API**: Direct connection using Graph API with zero middleman markups.
2. **Twilio WhatsApp API**: Turnkey setup for international or enterprise deployments.
3. **Mock Provider (Development / Testing)**: Emits structured logs to the developer console and saves message records without consuming SMS/WhatsApp credits.

---

## 4. Compliance & Opt-In Governance

* Customers explicitly configure marketing and transactional preferences during registration and booking.
* The system checks `CustomerProfile.marketingConsentWhatsApp` before transmitting any promotional or discount messages.
* Transactional messages (appointment confirmation, cancellation, and payment receipts) are transmitted under operational customer service permissions.
