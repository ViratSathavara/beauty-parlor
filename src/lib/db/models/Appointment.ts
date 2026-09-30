import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStatusHistoryItem {
  oldStatus: string;
  newStatus: string;
  changedBy: string;
  reason: string;
  timestamp: Date;
}

export interface IAppointment extends Document {
  bookingNumber: string;
  serviceSlug: string;
  customerDetails: {
    name: string;
    email?: string;
    phone: string;
  };
  staffId?: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW' | 'RESCHEDULED';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  totalAmount: number;
  discountAmount: number;
  advanceAmount: number;
  dueAmount: number;
  customerNotes?: string;
  staffNotes?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  statusHistory: IStatusHistoryItem[];
  createdAt: Date;
  updatedAt: Date;
}

const StatusHistorySchema = new Schema<IStatusHistoryItem>({
  oldStatus: { type: String, required: true },
  newStatus: { type: String, required: true },
  changedBy: { type: String, required: true },
  reason: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const AppointmentSchema = new Schema<IAppointment>(
  {
    bookingNumber: { type: String, required: true, unique: true, index: true },
    serviceSlug: { type: String, required: true, index: true },
    customerDetails: {
      name: { type: String, required: true },
      email: { type: String, default: '' },
      phone: { type: String, required: true },
    },
    staffId: { type: String, default: null, index: true },
    date: { type: Date, required: true, index: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW', 'RESCHEDULED'],
      default: 'PENDING',
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    advanceAmount: { type: Number, required: true },
    dueAmount: { type: Number, required: true },
    customerNotes: { type: String, default: '' },
    staffNotes: { type: String, default: '' },
    razorpayOrderId: { type: String, sparse: true },
    razorpayPaymentId: { type: String, sparse: true },
    statusHistory: [StatusHistorySchema],
  },
  {
    timestamps: true,
  }
);

export const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);
