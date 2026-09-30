import Link from "next/link";
import { Coins, UserPlus, Gift, ArrowRight } from "lucide-react";

export default function LoyaltyPreview() {
  return (
    <section className="py-20 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-raised border border-border p-8 sm:p-12 lg:p-16 rounded-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
                Sanctuary Loyalty Ledger
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
                Every Visit Enriches Your Experience
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed font-light">
                Our transparent ledger rewards your commitment to self-care. Earn points on every treatment, redeem them instantly during booking, and gift friends exclusive privileges with your unique invitation code.
              </p>
              <div className="pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal hover:text-gold font-semibold transition-colors"
                >
                  <span>Start Earning Points Today</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Steps Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-canvas border border-border p-6 rounded-sm space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-surface border border-border text-gold flex items-center justify-center">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Earn on Care
                </h4>
                <p className="text-xs text-charcoal-muted">
                  Earn 10 Points for every ₹100 spent on any sanctuary service.
                </p>
              </div>

              <div className="bg-canvas border border-border p-6 rounded-sm space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-surface border border-border text-gold flex items-center justify-center">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Instant Discount
                </h4>
                <p className="text-xs text-charcoal-muted">
                  Redeem 100 Points for ₹50 instant deduction at online checkout.
                </p>
              </div>

              <div className="bg-canvas border border-border p-6 rounded-sm space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-surface border border-border text-gold flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal">
                  Refer & Receive
                </h4>
                <p className="text-xs text-charcoal-muted">
                  Share your referral code. Friends get ₹200 off; you receive 250 points.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
