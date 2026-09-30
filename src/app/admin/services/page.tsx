import { Metadata } from 'next';
import { Scissors, Plus, Edit, CheckCircle, Clock } from 'lucide-react';
import { formatPrice, formatDuration } from '@/lib/utils';
import { getServices, getCategories } from '@/services/catalogService';

export const metadata: Metadata = {
  title: 'Service Catalog Management',
  description: 'Manage salon treatments, durations, base prices, discounts, and advance deposit policies.',
};

export default async function AdminServicesPage() {
  const [services, categories] = await Promise.all([getServices(), getCategories()]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-charcoal">Service Catalog & No-Code CMS Manager</h1>
          <p className="text-xs text-stone-500 font-light mt-1">Add, edit pricing, adjust treatment durations, and toggle active status.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-charcoal text-canvas px-4 py-2 text-xs uppercase tracking-wider font-semibold flex items-center space-x-2 rounded-sm hover:bg-gold transition-all">
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-sm border border-stone-200 overflow-x-auto shadow-xs">
        <table className="w-full text-left text-xs text-charcoal">
          <thead className="bg-stone-50 uppercase text-[10px] tracking-wider text-stone-500 font-semibold border-b border-stone-200">
            <tr>
              <th className="p-3.5">Service Name</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Duration</th>
              <th className="p-3.5">Base Price</th>
              <th className="p-3.5">Discount Price</th>
              <th className="p-3.5">Deposit Advance</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-mono">
            {services.map((s) => (
              <tr key={s.slug} className="hover:bg-stone-50/60 transition-all">
                <td className="p-3.5 font-sans font-medium text-charcoal">
                  <div>{s.name}</div>
                  <div className="text-[10px] text-stone-400 font-mono">/{s.slug}</div>
                </td>
                <td className="p-3.5 font-sans uppercase text-[10px] tracking-wider text-stone-500">
                  {s.categorySlug}
                </td>
                <td className="p-3.5">{formatDuration(s.durationMinutes)}</td>
                <td className="p-3.5 font-bold">{formatPrice(s.basePrice)}</td>
                <td className="p-3.5 text-emerald-700 font-bold">
                  {s.discountPrice ? formatPrice(s.discountPrice) : '—'}
                </td>
                <td className="p-3.5 font-bold text-amber-700">{formatPrice(s.advancePaymentAmount)}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-100 text-emerald-800 font-sans font-bold">
                    Active
                  </span>
                </td>
                <td className="p-3.5 text-right font-sans">
                  <button className="text-[11px] font-semibold text-amber-800 hover:underline inline-flex items-center space-x-1">
                    <Edit className="w-3 h-3" />
                    <span>Edit</span>
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
