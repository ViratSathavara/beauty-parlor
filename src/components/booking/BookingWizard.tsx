'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar as CalendarIcon, Clock, User, CheckCircle, ShieldCheck, Tag, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { formatPrice, formatDuration } from '@/lib/utils';
import { SeedService, SeedStaff } from '@/lib/db/seedData';

interface BookingWizardProps {
  services: SeedService[];
  staffMembers: SeedStaff[];
  initialServiceSlug?: string;
  initialCoupon?: string;
}

export default function BookingWizard({
  services,
  staffMembers,
  initialServiceSlug,
  initialCoupon,
}: BookingWizardProps) {
  // Step State (1-8)
  const [step, setStep] = useState<number>(1);

  // Form Selections
  const [selectedService, setSelectedService] = useState<SeedService | null>(
    services.find((s) => s.slug === initialServiceSlug) || services[0] || null
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow YYYY-MM-DD
  );
  const [selectedStaff, setSelectedStaff] = useState<SeedStaff | null>(null);
  const [availableSlots, setAvailableSlots] = useState<{ startTime: string; endTime: string; available: boolean }[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Coupon & Payment
  const [couponInput, setCouponInput] = useState<string>(initialCoupon || '');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [couponError, setCouponError] = useState<string>('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState<'ADVANCE' | 'FULL'>('ADVANCE');

  // Confirmation Result
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    bookingNumber: string;
    totalAmount: number;
    advanceAmount: number;
    dueAmount: number;
  } | null>(null);

  // Fetch available slots when service/date/staff changes
  useEffect(() => {
    if (selectedService && selectedDate) {
      fetchSlots(selectedService.slug, selectedDate, selectedStaff?.id);
    }
  }, [selectedService, selectedDate, selectedStaff]);

  const fetchSlots = async (serviceSlug: string, date: string, staffId?: string) => {
    setIsLoadingSlots(true);
    try {
      const url = `/api/availability?service=${serviceSlug}&date=${date}${staffId ? `&staffId=${staffId}` : ''}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.data?.slots) {
        setAvailableSlots(json.data.slots);
      }
    } catch (e) {
      console.error('Failed to load slots:', e);
    } finally {
      setIsLoadingSlots(false);
    }
  };

  // Calculations
  const basePrice = selectedService ? (selectedService.discountPrice || selectedService.basePrice) : 0;
  const addonsTotal = selectedService?.addons
    ? selectedService.addons
        .filter((a) => selectedAddons.includes(a.name))
        .reduce((sum, a) => sum + a.price, 0)
    : 0;

  const subtotal = basePrice + addonsTotal;
  const discount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const totalAmount = Math.max(0, subtotal - discount);
  const advanceAmount = selectedService ? (selectedService.advancePaymentAmount || 500) : 500;
  const payNowAmount = paymentOption === 'FULL' ? totalAmount : advanceAmount;
  const remainingDue = Math.max(0, totalAmount - payNowAmount);

  // Coupon Handler
  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    setCouponError('');
    try {
      const res = await fetch('/api/offers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, cartAmount: subtotal }),
      });
      const json = await res.json();
      if (json.success) {
        setAppliedCoupon({
          code: json.data.code,
          discountAmount: json.data.discountAmount,
        });
      } else {
        setCouponError(json.error?.message || 'Invalid coupon');
        setAppliedCoupon(null);
      }
    } catch (e) {
      setCouponError('Failed to apply coupon');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  // Submit Booking & Payment
  const handleCompleteBooking = async () => {
    if (!customerName || !customerPhone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    setIsProcessing(true);
    try {
      // Step 1: Create Booking Intent
      const bookRes = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceSlug: selectedService?.slug,
          date: selectedDate,
          startTime: selectedSlot || '11:00',
          staffId: selectedStaff?.id,
          customerName,
          customerEmail,
          customerPhone,
          couponCode: appliedCoupon?.code,
          discountAmount: discount,
          totalAmount,
          advanceAmount: payNowAmount,
          notes,
        }),
      });
      const bookJson = await bookRes.json();
      if (!bookJson.success) {
        alert(bookJson.error?.message || 'Booking slot conflict. Please choose another slot.');
        setIsProcessing(false);
        return;
      }

      const { bookingNumber } = bookJson.data;

      // Step 2: Create Razorpay Order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingNumber, amount: payNowAmount }),
      });
      const orderJson = await orderRes.json();
      const orderId = orderJson.data?.orderId || `order_mock_${Date.now()}`;

      // Step 3: Verify Payment Signature
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: orderId,
          razorpayPaymentId: `pay_mock_${Date.now()}`,
          razorpaySignature: 'mock_signature',
          bookingNumber,
        }),
      });
      const verifyJson = await verifyRes.json();

      setBookingConfirmation({
        bookingNumber,
        totalAmount,
        advanceAmount: payNowAmount,
        dueAmount: remainingDue,
      });
      setStep(8); // Move to final confirmation screen
    } catch (error) {
      alert('Failed to complete booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-canvas border border-border p-6 sm:p-10 rounded-sm space-y-8 shadow-sm">
      {/* Wizard Progress Bar */}
      <div className="flex items-center justify-between text-xs font-mono border-b border-border pb-4">
        <span className="uppercase tracking-widest text-gold-dark font-bold">
          Step {step} of 8: {getStepTitle(step)}
        </span>
        <div className="flex space-x-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === step ? 'bg-gold scale-125' : i < step ? 'bg-charcoal' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: Select Treatment & Add-ons */}
      {step === 1 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Select Your Service & Add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => {
              const isSel = selectedService?.slug === s.slug;
              return (
                <div
                  key={s.slug}
                  onClick={() => setSelectedService(s)}
                  className={`p-4 rounded-sm border cursor-pointer transition-all ${
                    isSel ? 'border-gold bg-stone-50 shadow-sm' : 'border-border hover:border-gold/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-base font-medium text-charcoal">{s.name}</h4>
                    <span className="font-serif text-sm font-bold text-gold-dark">
                      {formatPrice(s.discountPrice || s.basePrice)}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">{formatDuration(s.durationMinutes)}</p>
                </div>
              );
            })}
          </div>

          {selectedService?.addons && selectedService.addons.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-xs uppercase tracking-widest text-charcoal font-semibold">Optional Add-on Enhancements</h4>
              <div className="space-y-2">
                {selectedService.addons.map((addon) => {
                  const checked = selectedAddons.includes(addon.name);
                  return (
                    <label key={addon.name} className="flex items-center justify-between p-3 border border-border rounded-sm bg-surface-raised cursor-pointer text-xs">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedAddons([...selectedAddons, addon.name]);
                            else setSelectedAddons(selectedAddons.filter((a) => a !== addon.name));
                          }}
                          className="accent-gold"
                        />
                        <span className="font-medium text-charcoal">{addon.name}</span>
                      </div>
                      <span className="font-mono text-gold-dark font-bold">+{formatPrice(addon.price)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 hover:bg-gold transition-all"
            >
              <span>Next: Select Date</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Select Date */}
      {step === 2 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Choose Preferred Appointment Date</h3>
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-4 border border-border rounded-sm font-mono text-sm bg-surface text-charcoal focus:outline-none focus:border-gold"
          />
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button onClick={() => setStep(3)} className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2">
              <span>Next: Select Specialist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Select Specialist */}
      {step === 3 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Select Preferred Beautician</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setSelectedStaff(null)}
              className={`p-4 border rounded-sm cursor-pointer ${
                selectedStaff === null ? 'border-gold bg-stone-50' : 'border-border'
              }`}
            >
              <h4 className="font-serif text-base font-medium">Any Available Specialist</h4>
              <p className="text-xs text-charcoal-muted mt-1">Assign fastest available expert</p>
            </div>
            {staffMembers.map((st) => (
              <div
                key={st.id}
                onClick={() => setSelectedStaff(st)}
                className={`p-4 border rounded-sm cursor-pointer ${
                  selectedStaff?.id === st.id ? 'border-gold bg-stone-50' : 'border-border'
                }`}
              >
                <h4 className="font-serif text-base font-medium">{st.fullName}</h4>
                <p className="text-xs text-charcoal-muted">{st.title} ({st.experienceYears} yrs exp)</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(2)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button onClick={() => setStep(4)} className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2">
              <span>Next: Select Time Slot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Select Time Slot */}
      {step === 4 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Select Live Available Time Slot</h3>
          {isLoadingSlots ? (
            <div className="flex items-center justify-center py-10 space-x-2 text-charcoal-muted">
              <Loader2 className="w-5 h-5 animate-spin text-gold" />
              <span>Computing available time slots...</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableSlots.map((slot) => {
                const isSel = selectedSlot === slot.startTime;
                return (
                  <button
                    key={slot.startTime}
                    disabled={!slot.available}
                    onClick={() => setSelectedSlot(slot.startTime)}
                    className={`py-3 px-2 text-xs font-mono border rounded-sm transition-all ${
                      !slot.available
                        ? 'opacity-40 bg-gray-100 cursor-not-allowed border-gray-200 text-gray-400'
                        : isSel
                        ? 'bg-charcoal text-canvas border-charcoal font-bold'
                        : 'bg-surface hover:border-gold text-charcoal'
                    }`}
                  >
                    {slot.startTime}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(3)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button
              disabled={!selectedSlot}
              onClick={() => setStep(5)}
              className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2 disabled:opacity-50"
            >
              <span>Next: Customer Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Customer Contact Details */}
      {step === 5 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Customer Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">Full Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Priya Sharma"
                className="w-full p-3.5 border border-border rounded-sm text-sm bg-surface"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">Phone Number (WhatsApp) *</label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full p-3.5 border border-border rounded-sm text-sm bg-surface"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-charcoal font-semibold">Email Address (Optional)</label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="priya@example.com"
                className="w-full p-3.5 border border-border rounded-sm text-sm bg-surface"
              />
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(4)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button onClick={() => setStep(6)} className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2">
              <span>Next: Apply Promo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Apply Coupon Code */}
      {step === 6 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Apply Promotional Coupon</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="e.g. BRIDAL10 or FACIAL20"
              className="flex-1 p-3.5 border border-border rounded-sm text-sm uppercase font-mono"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon}
              className="bg-gold hover:bg-gold-hover text-charcoal font-semibold px-6 text-xs uppercase tracking-wider"
            >
              {isApplyingCoupon ? 'Verifying...' : 'Apply'}
            </button>
          </div>
          {couponError && <p className="text-xs text-red-600 font-mono">{couponError}</p>}
          {appliedCoupon && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Coupon <strong>{appliedCoupon.code}</strong> applied! You saved {formatPrice(appliedCoupon.discountAmount)}.</span>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(5)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button onClick={() => setStep(7)} className="bg-charcoal text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold flex items-center space-x-2">
              <span>Next: Payment Selection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: Deposit vs Full Payment */}
      {step === 7 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-charcoal font-normal">Select Payment Option</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setPaymentOption('ADVANCE')}
              className={`p-5 border rounded-sm cursor-pointer space-y-2 ${
                paymentOption === 'ADVANCE' ? 'border-gold bg-stone-50' : 'border-border'
              }`}
            >
              <h4 className="font-serif text-lg font-medium">Pay Deposit Advance ({formatPrice(advanceAmount)})</h4>
              <p className="text-xs text-charcoal-muted">Pay deposit now to reserve slot, pay remaining {formatPrice(totalAmount - advanceAmount)} at salon.</p>
            </div>

            <div
              onClick={() => setPaymentOption('FULL')}
              className={`p-5 border rounded-sm cursor-pointer space-y-2 ${
                paymentOption === 'FULL' ? 'border-gold bg-stone-50' : 'border-border'
              }`}
            >
              <h4 className="font-serif text-lg font-medium">Pay Full Amount ({formatPrice(totalAmount)})</h4>
              <p className="text-xs text-charcoal-muted">Clear complete payment online with instant checkout confirmation.</p>
            </div>
          </div>

          <div className="bg-surface p-4 border border-border text-xs space-y-2">
            <div className="flex justify-between">
              <span>Treatment Subtotal:</span>
              <span className="font-mono">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Discount:</span>
                <span className="font-mono">-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm border-t border-border pt-2">
              <span>Total Payable Now:</span>
              <span className="font-mono text-gold-dark">{formatPrice(payNowAmount)}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(6)} className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest">Back</button>
            <button
              onClick={handleCompleteBooking}
              disabled={isProcessing}
              className="bg-gold hover:bg-gold-hover text-charcoal px-8 py-3.5 text-xs uppercase tracking-widest font-bold flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Pay {formatPrice(payNowAmount)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: Confirmation Screen */}
      {step === 8 && bookingConfirmation && (
        <div className="text-center py-8 space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-3xl text-charcoal font-normal">Appointment Confirmed!</h3>
            <p className="text-xs font-mono text-gold-dark font-bold uppercase tracking-widest">
              Booking Ref: {bookingConfirmation.bookingNumber}
            </p>
          </div>

          <div className="bg-surface p-6 border border-border text-xs max-w-md mx-auto space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Service:</span>
              <span className="font-semibold">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Date & Time:</span>
              <span className="font-semibold">{selectedDate} at {selectedSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Customer:</span>
              <span className="font-semibold">{customerName} ({customerPhone})</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-charcoal-muted">Paid Online:</span>
              <span className="font-bold font-mono text-emerald-700">{formatPrice(bookingConfirmation.advanceAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-muted">Remaining at Salon:</span>
              <span className="font-bold font-mono text-charcoal">{formatPrice(bookingConfirmation.dueAmount)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/919876543210?text=Hi,%20I%20have%20confirmed%20booking%20${bookingConfirmation.bookingNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-espresso text-canvas px-6 py-3 text-xs uppercase tracking-widest font-semibold"
            >
              WhatsApp Confirmation
            </a>
            <button
              onClick={() => window.location.href = '/'}
              className="border border-border px-6 py-3 text-xs uppercase tracking-widest"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function getStepTitle(step: number): string {
  const titles = [
    'Service Selection',
    'Date Choice',
    'Specialist Selection',
    'Time Slot Selection',
    'Customer Contact Details',
    'Promotional Coupon',
    'Payment Option',
    'Confirmed Pass',
  ];
  return titles[step - 1] || 'Reservation';
}
