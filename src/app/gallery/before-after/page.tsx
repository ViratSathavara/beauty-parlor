import { Metadata } from "next";
import BeforeAfterSlider from "@/components/public/BeforeAfterSlider";
import { getBeforeAfterItems } from "@/services/catalogService";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Before & After Transformations Lookbook",
  description: "Explore unretouched before and after clinical skin facials, keratin hair transformations, and royal bridal makeovers.",
};

export default function BeforeAfterPage() {
  const items = getBeforeAfterItems();

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back link */}
        <Link
          href="/gallery"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-charcoal-muted hover:text-gold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Visual Lookbook</span>
        </Link>

        {/* Section Slider Container */}
        <BeforeAfterSlider items={items} />

        {/* Clinical Note */}
        <div className="max-w-3xl mx-auto p-6 bg-surface-raised border border-border rounded-sm text-center space-y-2">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal">
            Our Photography & Integrity Commitment
          </h4>
          <p className="text-xs text-charcoal-muted leading-relaxed font-light">
            All before-and-after photographs are captured under standardized medical daylight studio lighting without digital retouching, skin smoothing filters, or altered contrast. Photos are displayed with explicit written client consent.
          </p>
        </div>
      </div>
    </div>
  );
}
