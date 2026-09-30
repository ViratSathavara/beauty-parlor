import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message: string;
  status: "NEW" | "CONTACTED" | "FOLLOW_UP" | "CONVERTED" | "CLOSED";
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CONVERTED", "CLOSED"],
      default: "NEW",
      index: true,
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

export const ContactInquiry: Model<IContactInquiry> =
  mongoose.models.ContactInquiry || mongoose.model<IContactInquiry>("ContactInquiry", ContactInquirySchema);
