import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  customerName: string;
  serviceName: string;
  rating: number; // 1 - 5
  comment: string;
  date: string;
  avatarUrl?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    customerName: { type: String, required: true },
    serviceName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    avatarUrl: { type: String },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "APPROVED", index: true },
    isFeatured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
