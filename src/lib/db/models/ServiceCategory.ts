import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCategorySchema = new Schema<IServiceCategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    imageUrl: { type: String },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const ServiceCategory: Model<IServiceCategory> =
  mongoose.models.ServiceCategory || mongoose.model<IServiceCategory>("ServiceCategory", ServiceCategorySchema);
