import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPackage extends Document {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  originalPrice: number;
  packagePrice: number;
  savings: number;
  durationHours: number;
  imageUrl?: string;
  includedServices: string[];
  terms: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    packagePrice: { type: Number, required: true },
    savings: { type: Number, required: true },
    durationHours: { type: Number, required: true },
    imageUrl: { type: String },
    includedServices: [{ type: String }],
    terms: [{ type: String }],
    isFeatured: { type: Boolean, default: false, index: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Package: Model<IPackage> =
  mongoose.models.Package || mongoose.model<IPackage>("Package", PackageSchema);
