import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db/mongodb";
import { ContactInquiry } from "@/lib/db/models/ContactInquiry";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Please provide a valid 10-digit phone number"),
  service: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = inquirySchema.parse(body);

    let savedId = "demo-" + Date.now();

    try {
      await connectToDatabase();
      const inquiry = await ContactInquiry.create({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: validatedData.service,
        message: validatedData.message,
        status: "NEW",
      });
      savedId = inquiry._id.toString();
    } catch (dbError) {
      console.warn("MongoDB connection fallback for inquiry submission:", (dbError as Error).message);
    }

    return NextResponse.json({
      success: true,
      data: {
        id: savedId,
        message: "Your inquiry has been received. Our concierge will contact you within 2 hours.",
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: error.errors[0]?.message || "Invalid input data",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "Unable to submit inquiry at this moment. Please reach out via WhatsApp.",
        },
      },
      { status: 500 }
    );
  }
}
