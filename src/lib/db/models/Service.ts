import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceAddon {
  name: string;
  price: number;
  durationMinutes: number;
}

export interface IService extends Document {
  categoryId: mongoose.Types.ObjectId;
  categorySlug: string;
  name: string;
  slug: string;
  description: string;
  benefits?: string[];
  inclusions?: string[];
  durationMinutes: number;
  bufferMinutes: number;
  basePrice: number;
  discountPrice?: number;
  advancePaymentAmount?: number;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  bookingEnabled: boolean;
  addons: IServiceAddon[];
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "ServiceCategory", required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    benefits: [{ type: String }],
    inclusions: [{ type: String }],
    durationMinutes: { type: Number, required: true },
    bufferMinutes: { type: Number, default: 15 },
    basePrice: { type: Number, required: true },
    discountPrice: { type: Number },
    advancePaymentAmount: { type: Number, default: 500 },
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
    bookingEnabled: { type: Boolean, default: true },
    addons: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        durationMinutes: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
