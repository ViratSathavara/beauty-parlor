"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, Sparkles } from "lucide-react";
import { SeedBeforeAfter } from "@/lib/db/seedData";

interface BeforeAfterSliderProps {
  items: SeedBeforeAfter[];
}

export default function BeforeAfterSlider({ items }: BeforeAfterSliderProps) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = items[activeItemIndex] || items[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Transformations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal">
            Real Results. Visible Radiance.
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Slide horizontally to explore authentic, unretouched transformations achieved by our senior specialists using medical hydra-technology and couture bridal airbrushing.
          </p>
        </div>

        {/* Item Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
                activeItemIndex === idx
                  ? "bg-charcoal text-canvas border-charcoal font-semibold"
                  : "bg-canvas text-charcoal-muted border-border hover:bg-surface-hover"
              }`}
            >
              {item.title} ({item.category})
            </button>
          ))}
        </div>

        {/* Interactive Comparison Component */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden select-none cursor-ew-resize rounded-sm shadow-2xl border border-border bg-charcoal"
          >
            {/* "After" Image (Background Layer) */}
            <div className="absolute inset-0">
              <Image
                src={currentItem.afterImage}
                alt={`${currentItem.title} After Treatment`}
                fill
                className="object-cover object-center pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <span className="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md text-canvas px-3 py-1 text-xs uppercase tracking-widest font-semibold border border-white/20">
                After
              </span>
            </div>

            {/* "Before" Image (Foreground Layer with Clip) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image
                src={currentItem.beforeImage}
                alt={`${currentItem.title} Before Treatment`}
                fill
                className="object-cover object-center pointer-events-none"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <span className="absolute top-4 left-4 bg-charcoal/80 backdrop-blur-md text-canvas px-3 py-1 text-xs uppercase tracking-widest font-semibold border border-white/20">
                Before
              </span>
            </div>

            {/* Split Divider & Central Drag Pill */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-canvas shadow-lg pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-charcoal border-2 border-gold text-canvas flex items-center justify-center shadow-xl">
                <ArrowLeftRight className="w-4 h-4 text-gold" />
              </div>
            </div>
          </div>

          {/* Transformation Narrative Card */}
          <div className="mt-6 p-6 bg-canvas border border-border flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                Treatment Spotlight
              </span>
              <h4 className="font-serif text-xl text-charcoal font-medium">
                {currentItem.title}
              </h4>
              <p className="text-xs text-charcoal-muted max-w-xl">
                {currentItem.description}
              </p>
            </div>
            <Link
              href="/gallery/before-after"
              className="inline-flex items-center space-x-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-canvas px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shrink-0"
            >
              <span>View Full Lookbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
