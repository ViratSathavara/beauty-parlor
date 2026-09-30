import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: "Clear guidelines on appointment cancellations, rescheduling, and payment refund processing.",
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 border-b border-border pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Consumer Transparency
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-charcoal-muted">
            Last Updated: September 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-charcoal-muted leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">1. Standard Treatment Cancellation Timeline</h2>
            <div className="bg-surface-raised border border-border p-6 rounded-sm space-y-4">
              <div className="flex items-start space-x-3">
                <span className="font-mono text-gold-dark font-bold text-base">≥ 24h</span>
                <div>
                  <h4 className="font-semibold text-charcoal text-xs uppercase tracking-wider">
                    Full Advance Deposit Refund (100%)
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Cancellations made 24 hours or more before the appointment receive an immediate 100% refund to the original payment source.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-border pt-3">
                <span className="font-mono text-gold-dark font-bold text-base">4h – 24h</span>
                <div>
                  <h4 className="font-semibold text-charcoal text-xs uppercase tracking-wider">
                    100% Store Credit or 50% Gateway Refund
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Cancellations between 4 and 24 hours can be converted into 100% store loyalty points or refunded at 50% via gateway.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border-t border-border pt-3">
                <span className="font-mono text-rose-700 font-bold text-base">&lt; 4h</span>
                <div>
                  <h4 className="font-semibold text-rose-800 text-xs uppercase tracking-wider">
                    Deposit Forfeiture / No-Show
                  </h4>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Cancellations under 4 hours or failure to arrive without notice forfeit the advance deposit to compensate the reserved specialist's time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">2. Free Rescheduling</h2>
            <p>
              Guests may reschedule any standard treatment up to 4 hours in advance at zero penalty through their online customer account or via WhatsApp concierge.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">3. Bridal Package Specific Terms</h2>
            <p>
              Bridal reservations lock prime calendar dates. Cancellations made 30 days or more prior to the event date receive an 80% refund of the deposit. Cancellations within 14 days forfeit the deposit or may reschedule to an alternate date subject to availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">4. Refund Processing Time</h2>
            <p>
              All authorized refunds are submitted instantly to Razorpay. Depending on your banking institution (UPI, Netbanking, Credit Card), the funds typically reflect in your account within 5 to 7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
