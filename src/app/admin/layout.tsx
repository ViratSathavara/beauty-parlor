import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  UserCheck,
  Scissors,
  Tag,
  Package,
  Image as ImageIcon,
  MessageSquare,
  CreditCard,
  Settings,
  Sparkles,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Appointments', href: '/admin/appointments', icon: Clock },
    { label: 'Live Calendar', href: '/admin/calendar', icon: Calendar },
    { label: 'Services Catalog', href: '/admin/services', icon: Scissors },
    { label: 'Beauticians / Staff', href: '/admin/staff', icon: UserCheck },
    { label: 'Customer CRM', href: '/admin/customers', icon: Users },
    { label: 'Offers & Coupons', href: '/admin/offers', icon: Tag },
    { label: 'Packages', href: '/admin/packages', icon: Package },
    { label: 'Gallery Moderation', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Reviews Triage', href: '/admin/reviews', icon: MessageSquare },
    { label: 'Payments & Revenue', href: '/admin/payments', icon: CreditCard },
    { label: 'Business Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal text-canvas p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="font-serif text-xl font-normal tracking-wide text-canvas">
              ELEGANCE <span className="text-gold text-xs uppercase tracking-widest block font-sans font-semibold">Admin Console</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-sm text-xs font-medium text-stone-300 hover:text-canvas hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4 text-gold-dark" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 text-[11px] text-stone-400">
          <p>Elegance Parlor v1.0.0</p>
          <p className="text-gold-dark font-mono mt-0.5">Role: ADMIN</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
