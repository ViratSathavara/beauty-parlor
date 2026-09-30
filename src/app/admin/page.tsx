import { Metadata } from 'next';
import {
  Calendar,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Scissors,
} from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getServices, getStaffMembers } from '@/services/catalogService';

export const metadata: Metadata = {
  title: 'Admin Dashboard Overview',
  description: 'Business intelligence KPIs, revenue analytics, and daily appointment metrics.',
};

export default async function AdminDashboardPage() {
  const [services, staff] = await Promise.all([getServices(), getStaffMembers()]);

  // Mock KPI Metrics calculated from platform state
  const kpis = [
    { title: "Today's Appointments", value: '14', change: '+12% from yesterday', icon: Clock, color: 'text-amber-600' },
    { title: "Today's Revenue", value: '₹24,500', change: '+18% vs target', icon: DollarSign, color: 'text-emerald-600' },
    { title: 'Monthly Revenue (Sept)', value: '₹4,85,000', change: '+24% YoY', icon: TrendingUp, color: 'text-indigo-600' },
    { title: 'Active Customers', value: '1,248', change: '+32 new this week', icon: Users, color: 'text-rose-600' },
  ];

  const recentBookings = [
    { id: 'BP-2026-1024', customer: 'Priya Sharma', service: 'Bridal Makeover Ritual', time: '11:00 AM', status: 'CONFIRMED', amount: 5000, advance: 500 },
    { id: 'BP-2026-1025', customer: 'Ananya Roy', service: 'Royal Caviar Hair Spa', time: '01:30 PM', status: 'IN_PROGRESS', amount: 3500, advance: 500 },
    { id: 'BP-2026-1026', customer: 'Kavita Menon', service: 'Hydra-Glow Facial', time: '03:00 PM', status: 'CONFIRMED', amount: 2800, advance: 500 },
    { id: 'BP-2026-1027', customer: 'Sneha Patel', service: 'Keratin Smoothening', time: '04:30 PM', status: 'PENDING', amount: 6000, advance: 500 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-charcoal">Business Operations Executive Dashboard</h1>
          <p className="text-xs text-stone-500 font-light mt-1">Live metrics for Elegance Beauty Sanctuary Sanctuary</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational Online</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-sm border border-stone-200 space-y-3 shadow-xs">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-wider text-stone-500 font-semibold">{kpi.title}</span>
                <div className={`p-2 rounded-sm bg-stone-50 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-medium text-charcoal">{kpi.value}</div>
                <p className="text-[11px] text-stone-400 mt-1 flex items-center space-x-1">
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  <span>{kpi.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Bookings Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
            <h3 className="font-serif text-xl text-charcoal font-normal">Today's Appointment Queue</h3>
            <a href="/admin/appointments" className="text-xs text-amber-700 font-semibold uppercase tracking-wider hover:underline">View All Queue</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-stone-50 uppercase text-[10px] tracking-wider text-stone-500 font-semibold border-b border-stone-200">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Treatment</th>
                  <th className="p-3">Time</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/50">
                    <td className="p-3 font-bold text-stone-700">{b.id}</td>
                    <td className="p-3 font-sans font-medium">{b.customer}</td>
                    <td className="p-3 font-sans text-stone-600">{b.service}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] rounded-full font-sans font-bold ${
                        b.status === 'CONFIRMED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'IN_PROGRESS'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-600'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold">{formatPrice(b.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Utilization & Popular Services */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-xs">
            <h3 className="font-serif text-lg text-charcoal font-normal border-b border-stone-100 pb-3">Active Beauticians on Shift</h3>
            <div className="space-y-3">
              {staff.slice(0, 4).map((st) => (
                <div key={st.id} className="flex items-center justify-between text-xs p-2 rounded-sm hover:bg-stone-50">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-full bg-stone-200 text-charcoal flex items-center justify-center font-bold">
                      {st.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">{st.fullName}</p>
                      <p className="text-[10px] text-stone-400">{st.title}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">4 Bookings Today</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
