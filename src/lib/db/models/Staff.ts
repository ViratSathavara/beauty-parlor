import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWorkingHour {
  dayOfWeek: number; // 0 = Sun, 1 = Mon, ..., 6 = Sat
  startTime: string; // "09:30"
  endTime: string;   // "20:00"
  isOffDay: boolean;
}

export interface IStaff extends Document {
  fullName: string;
  title: string;
  experienceYears: number;
  bio: string;
  avatarUrl?: string;
  isFeatured: boolean;
  ratingAvg: number;
  ratingCount: number;
  isActive: boolean;
  specializations: string[];
  workingHours: IWorkingHour[];
  createdAt: Date;
  updatedAt: Date;
}

const StaffSchema = new Schema<IStaff>(
  {
    fullName: { type: String, required: true },
    title: { type: String, required: true },
    experienceYears: { type: Number, default: 0 },
    bio: { type: String, required: true },
    avatarUrl: { type: String },
    isFeatured: { type: Boolean, default: false, index: true },
    ratingAvg: { type: Number, default: 5.0 },
    ratingCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    specializations: [{ type: String }],
    workingHours: [
      {
        dayOfWeek: { type: Number, required: true },
        startTime: { type: String, default: "09:30" },
        endTime: { type: String, default: "20:00" },
        isOffDay: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

export const Staff: Model<IStaff> =
  mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema);
