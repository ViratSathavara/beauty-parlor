import Link from 'next/link';
import { User, Calendar, Award, Gift, Sparkles, LogOut, ArrowRight } from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Overview & Pass', href: '/account', icon: Calendar },
    { label: 'My Appointments', href: '/account/appointments', icon: Calendar },
    { label: 'Sanctuary Rewards', href: '/account/rewards', icon: Award },
    { label: 'VIP Membership', href: '/account/membership', icon: Sparkles },
    { label: 'Refer & Earn ₹200', href: '/account/referrals', icon: Gift },
    { label: 'My Profile & Preferences', href: '/account/profile', icon: User },
  ];

  return (
    <div className="bg-canvas min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="bg-surface p-6 sm:p-8 border border-border rounded-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold">Sanctuary Account Portal</div>
            <h1 className="font-serif text-3xl font-normal text-charcoal">Welcome Back, Priya</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-gold/20 text-charcoal text-xs font-mono font-bold rounded-sm border border-gold/30">
              Gold VIP Member
            </span>
          </div>
        </div>

        {/* Account Body */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <aside className="bg-surface p-5 border border-border rounded-sm space-y-2 h-fit">
            <div className="text-[11px] uppercase tracking-widest text-charcoal-muted font-semibold px-3 pb-2 border-b border-border">
              Customer Account
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2.5 rounded-sm text-xs font-medium text-charcoal hover:bg-stone-100 hover:text-gold-dark transition-all"
                  >
                    <Icon className="w-4 h-4 text-gold" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Account View */}
          <main className="lg:col-span-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
