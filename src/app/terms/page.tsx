import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions of appointment reservations and salon services at Elegance Beauty Sanctuary.",
};

export default function TermsPage() {
  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 border-b border-border pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Client Agreement
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Terms of Service
          </h1>
          <p className="text-xs text-charcoal-muted">
            Last Updated: September 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-charcoal-muted leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">1. Reservation & Slot Holding</h2>
            <p>
              To confirm an appointment online, an advance booking deposit is required via our secure Razorpay checkout. This deposit reserves the assigned specialist's time and prevents duplicate bookings. The remaining balance is payable upon completion of your ritual at the salon.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">2. Punctuality & Arrival</h2>
            <p>
              We request all guests arrive 10 minutes prior to scheduled appointments to enjoy our welcoming herbal tea and complete any skin assessment questionnaires. Late arrivals exceeding 15 minutes may result in an abbreviated treatment duration to respect subsequent reservations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">3. Bridal Suites & Event Booking</h2>
            <p>
              Bridal reservations require a 50% deposit to lock wedding dates. Because we restrict bookings to two brides per weekend, bridal reservations are governed by specific cancellation schedules detailed in our Refund Policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">4. Health Disclosures</h2>
            <p>
              Clients are obligated to notify their aesthetician of any existing dermatological conditions, retinoid/Accutane use, allergies, or pregnancy before treatments commence.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
