import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy, data protection, and customer consent standards at Elegance Beauty Sanctuary.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 border-b border-border pb-8">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Legal & Governance
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal-muted">
            Last Updated: September 2026
          </p>
        </div>

        <div className="space-y-8 text-sm text-charcoal-muted leading-relaxed font-light">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">1. Introduction</h2>
            <p>
              Elegance Beauty Sanctuary ("we", "our", or "the Sanctuary") respects your personal integrity and is committed to protecting the confidential information you share with us. This policy outlines how we collect, store, and process your personal data across our digital platform and in-person consultations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">2. Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Identity:</strong> Full name, telephone/WhatsApp number, and email address.</li>
              <li><strong>Appointment Records:</strong> Selected treatment, assigned specialist, appointment date/time, and financial transactions.</li>
              <li><strong>Health & Allergy Notes:</strong> Voluntary disclosures regarding skin sensitivities, allergies, or contraindications to ensure treatment safety.</li>
              <li><strong>Marketing & Communication Preferences:</strong> Explicit opt-in records for transactional reminders and seasonal promotions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">3. Payment Security & Financial Isolation</h2>
            <p>
              We do NOT store credit/debit card numbers, CVVs, or banking PINs on our servers. All digital payments and advance booking deposits are processed via Razorpay’s PCI-DSS Level 1 certified gateway.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">4. Photography & Social Media Consent</h2>
            <p>
              Before-and-after treatment photographs or bridal transformation imagery are NEVER published to our lookbook or marketing channels without explicit prior written authorization from the client.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl text-charcoal font-medium">5. Your Rights</h2>
            <p>
              You have the right to inspect, update, or request complete deletion of your customer profile and transaction history at any time by contacting us at hello@elegancebeauty.in.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
