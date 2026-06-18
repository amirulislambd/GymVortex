"use client";

import React, { useEffect, useState } from "react";

const STATS_CONFIG = [
  { target: 10000, suffix: "K+", label: "ACTIVE MEMBERS", divisor: 1000 },
  { target: 500, suffix: "+", label: "CLASS CYCLES" },
  { target: 45, suffix: "", label: "ELITE TRAINERS" },
  { target: 12, suffix: "", label: "GYM CORES" },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(STATS_CONFIG.map(() => 0));

  useEffect(() => {
    const duration = 2000; // Animation duration in milliseconds (2 seconds)
    const frameRate = 1000 / 60; // 60 FPS smooth execution framework
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      // Cubic ease-out calculation for smooth deceleration braking effect
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      setCounts(
        STATS_CONFIG.map((stat) => {
          return Math.floor(easeOutProgress * stat.target);
        })
      );

      if (frame === totalFrames) {
        clearInterval(counter);
        // Guarantee precision alignment to strict target configurations
        setCounts(STATS_CONFIG.map((stat) => stat.target));
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, []);

  const formatDisplay = (value, stat) => {
    if (stat.divisor) {
      return Math.floor(value / stat.divisor);
    }
    return value;
  };

  return (
    <section className="bg-[#0a0a0a] border-y border-neutral-900/60 md:py-16 select-none font-mono relative">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12">
        
        {/* Section Headline */}
        <div className="text-center mb-10">
          <p className="text-[25px] font-bold tracking-[0.3em] text-[#caf300] uppercase">
            METRIC DIAGNOSTICS
          </p>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
          {STATS_CONFIG.map((stat, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center justify-center text-center relative py-8 px-4 transition-all duration-300 hover:bg-neutral-900/20 ${
                index !== STATS_CONFIG.length - 1
                  ? "md:border-r border-neutral-900/40"
                  : ""
              }`}
            >
              {/* Tactical Hover Border Traces */}
              <span className="absolute top-0 left-0 w-0 h-[1.5px] bg-[#caf300] transition-all duration-300 group-hover:w-full" />
              <span className="absolute bottom-0 right-0 w-0 h-[1.5px] bg-[#caf300] transition-all duration-300 group-hover:w-full" />
              <span className="absolute top-0 right-0 h-0 w-[1.5px] bg-[#caf300] transition-all duration-300 group-hover:h-full" />
              <span className="absolute bottom-0 left-0 h-0 w-[1.5px] bg-[#caf300] transition-all duration-300 group-hover:h-full" />

              {/* Animated Value Layer */}
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#caf300] tracking-tight mb-2 transition-all duration-300 group-hover:scale-105 group-hover:text-white drop-shadow-[0_0_12px_rgba(202,243,0,0.15)]">
                {formatDisplay(counts[index], stat)}
                {stat.suffix}
              </h3>

              {/* Sub-label Config */}
              <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase transition-colors duration-300 group-hover:text-[#caf300]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}