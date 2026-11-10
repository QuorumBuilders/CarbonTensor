"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Cpu, Users, Wallet, Activity, ShieldCheck } from "lucide-react";

interface Slide {
  id: string;
  tag: string;
  title: string;
  caption: string;
  image: string;
  icon: typeof Cpu;
}

const SLIDES: Slide[] = [
  {
    id: "telemetry",
    tag: "Edge IoT Telemetry",
    title: "Automated Piezometer Telemetry",
    caption: "Monitoring water tables in real time without manual tampering.",
    image: "/images/farm1.png",
    icon: Cpu,
  },
  {
    id: "aggregation",
    tag: "Smallholder Aggregation",
    title: "Cooperative Aggregation",
    caption: "Unlocking accredited carbon finance for Nigerian smallholders.",
    image: "/images/farm2.png",
    icon: Users,
  },
  {
    id: "disbursal",
    tag: "Access Bank Sandbox",
    title: "Direct Dividend Disbursal",
    caption: "Fast, transparent proceeds routed to cooperative and farmer wallets.",
    image: "/images/farm3.png",
    icon: Wallet,
  },
];

export function AuthCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Next slide handler
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Timed 2.5 second auto-rotation interval with hover pause & reduced motion check
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
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-primary-green-700 text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="CarbonTensor Key Capabilities Carousel"
    >
      {/* Background Images with 400ms cross-fade */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className="absolute inset-0 bg-neutral-purple-200/20"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 400ms cubic-bezier(0.22, 1, 0.36, 1)",
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
              {/* Solid Green Brand Gradient Overlays */}
              <div className="absolute inset-0 bg-primary-green-900/65 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green-900 via-primary-green-900/40 to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Top Header Identity */}
      <div className="relative z-10 p-8 sm:p-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-primary-green-600 border border-primary-green-400 flex items-center justify-center text-white shadow-xs">
            <Activity className="w-5 h-5 text-primary-green-100" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white block">
              CarbonTensor
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary-green-200 font-bold">
              MRV &amp; Dividend Disbursal
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-primary-green-800/80 border border-primary-green-600/70 text-xs font-mono text-primary-green-200 backdrop-blur-xs">
          <span className="w-2 h-2 rounded-full bg-primary-green-400 animate-pulse" />
          <span>Argungu Cluster, Kebbi</span>
        </div>
      </div>

      {/* Bottom Content: Captions & Slide Indicators */}
      <div className="relative z-10 p-8 sm:p-12 flex flex-col space-y-6">
        {/* Caption Container */}
        <div className="min-h-[140px] flex flex-col justify-end">
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            const Icon = slide.icon;
            if (!isActive) return null;

            return (
              <div
                key={slide.id}
                className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary-green-800/90 border border-primary-green-600 text-xs font-mono font-semibold text-primary-green-100">
                  <Icon className="w-3.5 h-3.5 text-accent-orange-500" />
                  <span>{slide.tag}</span>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
                  {slide.title}
                </h2>

                <p className="text-base text-neutral-100/90 leading-relaxed font-normal max-w-lg">
                  {slide.caption}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar Indicators */}
        <div className="pt-4 border-t border-primary-green-600/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1 max-w-xs">
            {SLIDES.map((slide, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className="flex-1 py-2 group focus:outline-none"
                  aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-accent-orange-500 w-full"
                        : "bg-primary-green-600/60 group-hover:bg-primary-green-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-primary-green-200">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-green-400" />
            <span>2.5s Cycle • Hover to pause</span>
          </div>
        </div>
      </div>
    </div>
  );
}
