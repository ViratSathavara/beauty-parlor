const DEFAULT_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export function getWhatsAppBookingLink(serviceName?: string, date?: string, time?: string): string {
  let message = "Hi! I would like to book an appointment at Elegance Beauty Sanctuary.";
  if (serviceName) {
    message = `Hi! I would like to book *${serviceName}*`;
    if (date && time) {
      message += ` on *${date}* at *${time}*`;
    }
    message += `. Please let me know the available slots.`;
  }
  return `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppInquiryLink(topic: string = "general"): string {
  let message = "Hi! I would like to inquire about your salon services.";
  if (topic === "bridal") {
    message = "Hi! I am planning my wedding and would love to consult regarding your Luxury Bridal Packages.";
  } else if (topic === "offers") {
    message = "Hi! I would like to know about your current seasonal offers and packages.";
  }
  return `https://wa.me/${DEFAULT_PHONE}?text=${encodeURIComponent(message)}`;
}
