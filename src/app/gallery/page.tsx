"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Sparkles } from "lucide-react";

interface GalleryMedia {
  id: string;
  title: string;
  category: "all" | "hair" | "skin" | "makeup" | "nails" | "bridal";
  imageUrl: string;
  tag: string;
}

const GALLERY_ITEMS: GalleryMedia[] = [
  {
    id: "g-1",
    title: "Royal Crimson Bridal Look",
    category: "bridal",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    tag: "HD Airbrush Bridal",
  },
  {
    id: "g-2",
    title: "Signature Hydra-Infusion Glass Skin",
    category: "skin",
    imageUrl: "https://images.unsplash.com/photo-1512290900672-1f55b9e0350d?auto=format&fit=crop&w=1000&q=80",
    tag: "Vortex Facial",
  },
  {
    id: "g-3",
    title: "Architectural Haircut & Silk Blowout",
    category: "hair",
    imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1000&q=80",
    tag: "Couture Styling",
  },
  {
    id: "g-4",
    title: "Artisanal Chrome French Gel Nails",
    category: "nails",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=80",
    tag: "Japanese Gel Art",
  },
  {
    id: "g-5",
    title: "Caviar Scalp & Cellular Steam Spa",
    category: "hair",
    imageUrl: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1000&q=80",
    tag: "Restorative Spa",
  },
  {
    id: "g-6",
    title: "Engagement Sangeet Editorial Glow",
    category: "makeup",
    imageUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80",
    tag: "Evening Glam",
  },
  {
    id: "g-7",
    title: "Botanical Milk & Honey Pedicure",
    category: "nails",
    imageUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=80",
    tag: "Spa Pedicure",
  },
  {
    id: "g-8",
    title: "Rose Petal & Gold Body Detox",
    category: "skin",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    tag: "Botanical De-Tan",
  },
  {
    id: "g-9",
    title: "Reception Couture Minimalist Glam",
    category: "bridal",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    tag: "Reception Look",
  },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredItems = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="bg-canvas py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
            Visual Sanctuary Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal font-normal">
            The Aesthetic Lookbook
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed font-light">
            Explore authentic artistry from our master hair directors, clinical aestheticians, and bridal couture teams.
          </p>
        </div>

        {/* Navigation & Before/After Link Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-border">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Looks" },
              { id: "bridal", label: "Bridal Couture" },
              { id: "skin", label: "Skin & Facials" },
              { id: "hair", label: "Hair & Spas" },
              { id: "makeup", label: "Celebration Makeup" },
              { id: "nails", label: "Nails & Pedicures" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider transition-all duration-200 border ${
                  filter === tab.id
                    ? "bg-charcoal text-canvas border-charcoal font-semibold shadow-sm"
                    : "bg-surface hover:bg-surface-hover text-charcoal-muted border-border"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Link to Before/After */}
          <Link
            href="/gallery/before-after"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-gold-dark hover:text-charcoal font-semibold border-b border-gold-dark pb-1 transition-colors shrink-0"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Interactive Before / After Showcase →</span>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-border-subtle shadow-md"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-canvas">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">
                  {item.tag}
                </span>
                <h3 className="font-serif text-xl font-normal mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
