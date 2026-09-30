"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number (at least 10 digits)"),
  service: z.string().optional(),
  message: z.string().min(5, "Please provide a brief message or request"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.error?.message || "Failed to submit inquiry.");
      }

      setSubmitSuccess(true);
      reset();
    } catch (err) {
      setErrorMessage((err as Error).message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-canvas border border-border p-8 sm:p-12 rounded-sm text-center space-y-4 shadow-sm animate-fade-in">
        <div className="w-12 h-12 mx-auto rounded-full bg-surface border border-emerald-300 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl text-charcoal font-medium">
          Inquiry Successfully Received
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. A dedicated beauty consultant from our Indiranagar sanctuary will connect with you within 2 hours.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="mt-4 inline-block bg-charcoal text-canvas px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-canvas border border-border p-8 sm:p-10 rounded-sm shadow-sm">
      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-sm text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="inquiry-name" className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
          Your Name <span className="text-gold">*</span>
        </label>
        <input
          id="inquiry-name"
          type="text"
          placeholder="e.g. Priya Sharma"
          {...register("name")}
          className={`w-full px-4 py-3 bg-surface-raised border text-xs text-charcoal focus:outline-none focus:border-gold transition-colors ${
            errors.name ? "border-rose-400" : "border-border"
          }`}
        />
        {errors.name && (
          <p className="text-[11px] text-rose-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label htmlFor="inquiry-email" className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            id="inquiry-email"
            type="email"
            placeholder="priya@example.com"
            {...register("email")}
            className={`w-full px-4 py-3 bg-surface-raised border text-xs text-charcoal focus:outline-none focus:border-gold transition-colors ${
              errors.email ? "border-rose-400" : "border-border"
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-rose-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="inquiry-phone" className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
            Phone / WhatsApp <span className="text-gold">*</span>
          </label>
          <input
            id="inquiry-phone"
            type="tel"
            placeholder="+91 98765 43210"
            {...register("phone")}
            className={`w-full px-4 py-3 bg-surface-raised border text-xs text-charcoal focus:outline-none focus:border-gold transition-colors ${
              errors.phone ? "border-rose-400" : "border-border"
            }`}
          />
          {errors.phone && (
            <p className="text-[11px] text-rose-600">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Interested Service */}
      <div className="space-y-1.5">
        <label htmlFor="inquiry-service" className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
          Treatment of Interest (Optional)
        </label>
        <select
          id="inquiry-service"
          {...register("service")}
          className="w-full px-4 py-3 bg-surface-raised border border-border text-xs text-charcoal focus:outline-none focus:border-gold"
        >
          <option value="">Select a treatment or category...</option>
          <option value="Bridal Suite & Consultation">Royal Bridal Suite & Consultation</option>
          <option value="Signature Hydra Facial">Signature Hydra-Glow Facial</option>
          <option value="Caviar Restorative Hair Spa">Caviar & Argan Hair Spa</option>
          <option value="Keratin Infusion">Brazilian Keratin Protein Infusion</option>
          <option value="Artisanal Gel Nails">Artisanal Gel Nails & Nail Art</option>
          <option value="Curated Packages">Curated Wellness Packages</option>
          <option value="VIP Membership Inquiry">VIP Membership Inquiry</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="inquiry-message" className="text-xs uppercase tracking-wider font-semibold text-charcoal block">
          Your Message or Event Dates <span className="text-gold">*</span>
        </label>
        <textarea
          id="inquiry-message"
          rows={4}
          placeholder="Tell us about your requirements, wedding timeline, or any skin/hair concerns..."
          {...register("message")}
          className={`w-full px-4 py-3 bg-surface-raised border text-xs text-charcoal focus:outline-none focus:border-gold transition-colors ${
            errors.message ? "border-rose-400" : "border-border"
          }`}
        />
        {errors.message && (
          <p className="text-[11px] text-rose-600">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center space-x-2 bg-charcoal hover:bg-gold-dark text-canvas py-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Inquiry...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Transmit Inquiry</span>
          </>
        )}
      </button>
    </form>
  );
}
