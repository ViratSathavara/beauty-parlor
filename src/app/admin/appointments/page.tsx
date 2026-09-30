import { Metadata } from 'next';
import { Clock, Filter, Plus, Calendar as CalendarIcon, CheckCircle, XCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Appointment Management',
  description: 'Manage salon appointment queue, statuses, staff assignments, and customer notes.',
};

export default function AdminAppointmentsPage() {
  const appointments = [
    {
      id: 'BP-2026-1024',
      customerName: 'Priya Sharma',
      customerPhone: '+91 98765 43210',
      serviceName: 'Bridal Makeover Ritual',
      staffName: 'Priya (Lead Specialist)',
      date: '2026-10-15',
      time: '11:00 AM',
      totalAmount: 5000,
      advancePaid: 500,
      dueAmount: 4500,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
    {
      id: 'BP-2026-1025',
      customerName: 'Ananya Roy',
      customerPhone: '+91 98765 43211',
      serviceName: 'Royal Caviar Hair Spa',
      staffName: 'Kavita (Hair Stylist)',
      date: '2026-10-15',
      time: '01:30 PM',
      totalAmount: 3500,
      advancePaid: 500,
      dueAmount: 3000,
      status: 'IN_PROGRESS',
      paymentStatus: 'PAID',
    },
    {
      id: 'BP-2026-1026',
      customerName: 'Kavita Menon',
      customerPhone: '+91 98765 43212',
      serviceName: 'Hydra-Glow Facial',
      staffName: 'Meera (Skin Specialist)',
      date: '2026-10-15',
      time: '03:00 PM',
      totalAmount: 2800,
      advancePaid: 500,
      dueAmount: 2300,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
    },
    {
      id: 'BP-2026-1027',
      customerName: 'Sneha Patel',
      customerPhone: '+91 98765 43213',
      serviceName: 'Keratin Smoothening',
      staffName: 'Kavita (Hair Stylist)',
      date: '2026-10-16',
      time: '10:00 AM',
      totalAmount: 6000,
      advancePaid: 500,
      dueAmount: 5500,
      status: 'PENDING',
      paymentStatus: 'PENDING',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-charcoal">Appointments Queue Manager</h1>
          <p className="text-xs text-stone-500 font-light mt-1">Review live bookings, reschedule, assign staff, and update statuses.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-charcoal text-canvas px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 rounded-sm hover:bg-gold transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>New Manual Booking</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-sm border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-stone-400" />
          <span className="font-semibold uppercase tracking-wider text-stone-600">Status Filter:</span>
          <select className="border border-stone-200 rounded-sm p-1.5 bg-stone-50 text-stone-700">
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending Approval</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div className="font-mono text-stone-500">
          Total Queue: <strong>{appointments.length} Appointments</strong>
        </div>
      </div>

      {/* Appointments Data Table */}
      <div className="bg-white rounded-sm border border-stone-200 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs text-charcoal">
          <thead className="bg-stone-50 uppercase text-[10px] tracking-wider text-stone-500 font-semibold border-b border-stone-200">
            <tr>
              <th className="p-3.5">Booking Ref</th>
              <th className="p-3.5">Customer</th>
              <th className="p-3.5">Treatment</th>
              <th className="p-3.5">Beautician</th>
              <th className="p-3.5">Date & Time</th>
              <th className="p-3.5">Financials</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-mono">
            {appointments.map((a) => (
              <tr key={a.id} className="hover:bg-stone-50/60 transition-all">
                <td className="p-3.5 font-bold text-stone-800">{a.id}</td>
                <td className="p-3.5 font-sans">
                  <div className="font-semibold text-charcoal">{a.customerName}</div>
                  <div className="text-[10px] text-stone-400 font-mono">{a.customerPhone}</div>
                </td>
                <td className="p-3.5 font-sans text-stone-700">{a.serviceName}</td>
                <td className="p-3.5 font-sans text-stone-600">{a.staffName}</td>
                <td className="p-3.5">
                  <div>{a.date}</div>
                  <div className="text-[10px] text-stone-400">{a.time}</div>
                </td>
                <td className="p-3.5">
                  <div className="font-bold">{formatPrice(a.totalAmount)}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">Advance: {formatPrice(a.advancePaid)}</div>
                </td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-1 text-[10px] rounded-full font-sans font-bold ${
                    a.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : a.status === 'IN_PROGRESS'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-3.5 text-right font-sans">
                  <button className="text-[11px] font-semibold text-amber-800 hover:underline">
                    Edit / Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
