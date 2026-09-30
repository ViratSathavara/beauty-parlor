import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Award, Gift, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'My Account Dashboard',
  description: 'View upcoming appointment pass, sanctuary loyalty rewards, and active membership perks.',
};

export default function AccountOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Upcoming Appointment VIP Pass Card */}
      <div className="bg-espresso text-canvas p-6 sm:p-8 rounded-sm border border-gold/40 shadow-sm space-y-6">
        <div className="flex justify-between items-start border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Upcoming Reservation</span>
            <h2 className="font-serif text-2xl font-normal text-canvas mt-0.5">Bridal Makeover Ritual</h2>
          </div>
          <span className="px-3 py-1 bg-emerald-900/60 text-emerald-300 text-xs font-mono font-bold rounded-sm border border-emerald-500/30">
            CONFIRMED
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Date & Time</span>
            <div className="font-bold text-stone-200">Oct 15, 2026 • 11:00 AM</div>
          </div>

          <div className="space-y-1">
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Specialist</span>
            <div className="font-bold text-stone-200">Priya (Senior Specialist)</div>
          </div>

          <div className="space-y-1">
            <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Financial Status</span>
            <div className="font-bold text-stone-200">Deposit Paid: ₹500 (Due: ₹4,500)</div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-stone-300">
            <MapPin className="w-4 h-4 text-gold" />
            <span>Lavelle Road Sanctuary Studio, Bengaluru</span>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="https://wa.me/919876543210?text=Hi,%20I%20have%20a%20question%20about%20booking%20BP-2026-1024"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold hover:bg-gold-hover text-charcoal px-4 py-2 font-semibold text-[11px] uppercase tracking-wider transition-all"
            >
              Contact Salon
            </a>
          </div>
        </div>
      </div>

      {/* Rewards & Loyalty Ledger Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-surface p-6 border border-border rounded-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Loyalty Ledger</span>
            <Award className="w-5 h-5 text-gold" />
          </div>
          <div className="font-serif text-4xl text-charcoal font-medium">480 Points</div>
          <p className="text-xs text-charcoal-muted">Equivalent to ₹480 OFF on your next sanctuary visit.</p>
          <Link href="/account/rewards" className="text-xs font-semibold text-gold-dark hover:underline inline-flex items-center space-x-1 pt-2">
            <span>View Ledger History</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="bg-surface p-6 border border-border rounded-sm space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider text-charcoal-muted font-semibold">Referral Code</span>
            <Gift className="w-5 h-5 text-gold" />
          </div>
          <div className="font-mono text-2xl text-charcoal font-bold bg-surface-raised p-2 text-center rounded border border-border">
            PRIYA200
          </div>
          <p className="text-xs text-charcoal-muted">Give friends ₹200 OFF; earn 200 points when they visit.</p>
          <Link href="/account/referrals" className="text-xs font-semibold text-gold-dark hover:underline inline-flex items-center space-x-1 pt-2">
            <span>Share Referral Link</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
