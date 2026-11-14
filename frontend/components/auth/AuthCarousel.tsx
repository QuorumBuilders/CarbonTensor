"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  IconCpu,
  IconBuildingCommunity,
  IconCoins,
  IconActivity,
  IconShieldCheck,
} from "@tabler/icons-react";

interface Slide {
  id: string;
  tag: string;
  title: string;
  caption: string;
  image: string;
  icon: typeof IconCpu;
}

const SLIDES: Slide[] = [
  {
    id: "telemetry",
    tag: "Ground Telemetry",
    title: "Continuous Field Piezometers",
    caption:
      "Perforated PVC tubes log soil water recession down to -15 cm without manual tampering or paperwork.",
    image: "/images/farm1.webp",
    icon: IconCpu,
  },
  {
    id: "aggregation",
    tag: "Union Governance",
    title: "Smallholder Cohort Aggregation",
    caption:
      "Bundling contiguous 1-hectare rice parcels into registry-scale cohorts solves prohibitive audit costs.",
    image: "/images/farm2.webp",
    icon: IconBuildingCommunity,
  },
  {
    id: "disbursal",
    tag: "Direct Settlement",
    title: "Transparent Carbon Proceeds",
    caption:
      "Automated 70/15/15 smart contracts disburse NGN dividends directly to verified farmer bank accounts.",
    image: "/images/farm3.webp",
    icon: IconCoins,
  },
];

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      nextSlide();
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-chrome text-brand-foreground select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="CarbonTensor Platform Capabilities Carousel"
    >
      {/* Background Images with Cross-Fade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className="absolute inset-0 bg-chrome"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                zIndex: isActive ? 1 : 0,
              }}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="50vw"
              />
              {/* Forest Green Tonal Gradient Overlays (Zero Backdrop Blur) */}
              <div className="absolute inset-0 bg-chrome/75 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-chrome via-chrome/50 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Top Header Identity */}
      <div className="relative z-10 p-8 sm:p-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-control bg-brand border border-white/20 flex items-center justify-center text-brand-foreground">
            <IconActivity size={18} stroke={1.5} />
          </div>
          <div>
            <span className="font-medium text-lg tracking-tight text-white block">
              CarbonTensor
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">
              MRV &amp; Dividend Disbursal
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-white/10 border border-white/20 text-xs font-mono text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span>Argungu Cluster, Kebbi</span>
        </div>
      </div>

      {/* Bottom Content: Captions & Slide Indicators */}
      <div className="relative z-10 p-8 sm:p-12 flex flex-col space-y-6">
        {/* Caption Container */}
        <div className="min-h-[130px] flex flex-col justify-end">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const Icon = slide.icon;
            if (!isActive) return null;

            return (
              <div
                key={slide.id}
                className="space-y-3 animate-in fade-in duration-200"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-pill bg-white/10 border border-white/20 text-xs font-mono font-medium text-white">
                  <Icon size={14} stroke={1.5} className="text-accent" />
                  <span>{slide.tag}</span>
                </div>

                <h2 className="text-2xl font-medium text-white tracking-tight leading-[1.2]">
                  {slide.title}
                </h2>

                <p className="text-sm text-white/80 leading-relaxed font-normal max-w-lg">
                  {slide.caption}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Indicators */}
        <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className="flex-1 py-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-control"
                  aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div
                    className={`h-1 rounded-pill transition-all duration-200 ${
                      isActive ? "bg-accent w-full" : "bg-white/30 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-white/70">
            <IconShieldCheck size={14} stroke={1.5} className="text-brand-muted" />
            <span>Hover to pause</span>
          </div>
        </div>
      </div>
    </div>
  );
}
