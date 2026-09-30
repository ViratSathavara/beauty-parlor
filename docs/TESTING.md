# Beauty Parlor — Testing Strategy & Quality Assurance

## 1. Testing Pyramid & Tooling

```
      / \
     / E2E \       Playwright (Critical User Flows)
    /-------\
   /  Integ  \     Vitest + Test DB (API Routes & Prisma Transactions)
  /-----------\
 /    Unit     \   Vitest (Availability Algorithm, Ledgers, Pricing, Coupons)
/---------------\
```

* **Unit Testing**: Vitest (instant execution, full TypeScript support). Focuses on pure domain algorithms.
* **Integration Testing**: Vitest against an isolated PostgreSQL test container. Tests Prisma transactions, API routes, and error envelopes.
* **End-to-End Testing**: Playwright. Automates headless browser sessions for customer booking, Razorpay checkout simulation, and admin calendar interactions.

---

## 2. Critical Unit Test Suites

### 2.1 Availability Engine (`tests/unit/availability.test.ts`)
* `test_generates_slots_matching_service_duration_and_buffer`: Verifies a 60m service with 15m buffer creates slots on 75m boundaries.
* `test_excludes_slots_overlapping_staff_lunch_break`: Verifies no slots cross 13:00 to 14:00 break.
* `test_excludes_dates_marked_as_salon_holidays`: Verifies closed days return empty array.
* `test_enforces_minimum_two_hour_advance_notice`: Past or immediate slots within 2 hours are excluded.
* `test_any_available_staff_aggregates_all_qualified_specialists`: Confirms union of open slots across eligible staff.

### 2.2 Coupon & Discount Engine (`tests/unit/coupon.test.ts`)
* `test_calculates_percentage_discount_with_max_cap`: e.g. 20% of ₹5,000 with ₹500 cap yields ₹500 discount.
* `test_rejects_expired_coupon`: Throws `COUPON_EXPIRED`.
* `test_rejects_cart_below_minimum_spend`: Throws `MIN_SPEND_NOT_MET`.
* `test_enforces_per_user_usage_limit`: Prevents customer from reusing a single-use coupon.

### 2.3 Double-Entry Loyalty Ledger (`tests/unit/loyalty.test.ts`)
* `test_computes_exact_balance_from_ledger_transactions`: Sums `EARN` (+100), `REDEEM` (-50), `ADJUST` (+20) -> 70 points.
* `test_prevents_redemption_exceeding_current_balance`: Throws `INSUFFICIENT_POINTS`.
* `test_prevents_self_referral`: Verifies customer cannot redeem their own referral code.

### 2.4 Cryptographic Payment Signature (`tests/unit/payment.test.ts`)
* `test_valid_razorpay_hmac_signature_passes`: Confirms valid SHA256 matches.
* `test_tampered_signature_throws_invalid_signature`: Rejects forged signatures.

---

## 3. Integration & Edge Case Test Scenarios

### 3.1 Concurrency Slot Collision
```typescript
it('should reject simultaneous booking for the same beautician slot', async () => {
  const payloadA = { serviceId: 's1', staffId: 'staff-priya', time: '11:00 AM', customerId: 'cust-1' };
  const payloadB = { serviceId: 's1', staffId: 'staff-priya', time: '11:00 AM', customerId: 'cust-2' };

  // Execute concurrently
  const [resA, resB] = await Promise.allSettled([
    bookingService.reserveSlot(payloadA),
    bookingService.reserveSlot(payloadB),
  ]);

  const fulfilled = [resA, resB].filter(r => r.status === 'fulfilled');
  const rejected = [resA, resB].filter(r => r.status === 'rejected');

  expect(fulfilled).toHaveLength(1);
  expect(rejected).toHaveLength(1);
});
```

### 3.2 External Integration Resilience
* **Google Sheets Failure**: When Google Sheets API mock throws an HTTP 500 or timeout error, the booking transaction still commits successfully, returning `bookingConfirmed: true`, and logs a pending retry task in `IntegrationSyncJob`.
* **Email Provider Downtime**: Email failure does not roll back payment or appointment confirmation.
