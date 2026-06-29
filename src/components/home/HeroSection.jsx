"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7_doWXjP0UNZjiihqO8sdyrPVgMFYFGkNEpTFuH-6wFX27FVR0F2yZwOosb0bR6n49CpP3YyhZ7DMEj3N_lBccPRoNuOrTvMPOgLV8OI0sUoGMDpi5n993r2TjdLJbgyZL8t2jyDzrfkfDKIVFOxn3ZiNNBeRxCBRjiWN5RN7bEa0lKxApOf8FwPtSAcYbuOBh-SKxWbO8nZcPAT5ekRGb9au0-0dl6gontyT35cInPja5TlcZpVXKk-I5nRMrz9JtnTt562mNuk",
    tag: "STRENGTH PROTOCOL",
    stat: "485 LBS",
    statLabel: "PEAK LOAD",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_yCfah2LZwmdANqCT5MlY5UbYRvBHd3C9HLqvJ0eghaSQdkWP3WXmvzoxQFtq8YON02llcRDK2NvSRqExn-bf3dFuD3ceGNneCOpAg32lQbOlE-Qle1ZbGX17UOkI4uuLGkTda7K2E_fNcVbw4_rF2hdZ9PXcQf3uyHLVhJ742VyJ-4uPxfskyck3pWUSDkSnnaqpxaBhY11-buE05Wpm9jPmjanmptF7UfK5SxOu7QAvt3WE21a6Jq15KLt5qm_wZh1uWwCCZgQ",
    tag: "CARDIO ENGINE",
    stat: "18:42",
    statLabel: "PERSONAL BEST",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJlvKPsQy-8BHZXXMlf38Kich5QT6hZEcSnJdxnYV06ozMPs7b1ZI46cXrozaw_p7fnk5HJeEBd55PtaXMtgMC6Qhxv0lJxYTwyQ43eiDEhZX949kb5qCVOJpHerJPk-RxivW4SxRSZZryc5tDkTorLUYPbtrLlwU82jtuXt_x57xvxL-sPtQYKR2r-7PwowQJ-YB61OWrf1IUZKLlqHF-Z2ze4e0WXSNuOFJVU0w_tZwl_bnHe15uPZyI1WDrAF_ZyxtRI0ybc_U",
    tag: "HYPERTROPHY BLOCK",
    stat: "9.5",
    statLabel: "RPE INTENSITY",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJE5LUXw9cD4d66_G6wf6_3z4ru3uAGH8LPn7PX9gLBVze6fcdz8Ib4kYeMaaue3hXa6m42dQfisZmgLZMrPpqrVqSQ5h-EyjoGqwMJ5aaudJuAHJKCMTtbv43mF7SSl9Ry-HD531ioXskiVJjE8ilO6gIgM2mUPe0m1s1_b40eX-dB5eF8rsjOjK_0eJJGKFsuS14bCSzE5RRdYJXZTwOcs28ab3W9onnyBqy-BD0Wf0JTLD5B4839a8FqKF7Rl3C3H9t_-JRX2M",
    tag: "ELITE CONDITIONING",
    stat: "156",
    statLabel: "ACTIVE CLASSES",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtzWnm_mb8OsRsPdFO86K_mFOPUk1MjrYrXTZMpnq-gTyFIimpidXq_MteJ3yCwIg86gFLfZKzdurGHdY-CMrMi4GCsUU2vi_60q0HJLM4-RFMjzxX1ORxHI8TogQRv5uoILklN4_9fOci8PrWuqEKBjokvdRPdf3J9l8zsPYNz7TV2uzdBqeLs1jXTwDWz2bQtOxU8qd17N3DJc63D-Af5FL45S5kqFJnkwxtWJ4QrBzcQOl0V0yFH-1ZneTPHI1HEuOUvL-THTA",
    tag: "POWER SURGE",
    stat: "42+",
    statLabel: "ENROLLED TODAY",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgDABzEmXPgL-Uk9sl4u6TVmw5ARIVDeb7x0N3hUZ6g-EFcgKQTf2vT3-DwiQ2JvSr8cgCJm53sq6OuI51PjiWbzO-JWoYmhZaGJr_Cuju1C7tpPpKJWA4p1NDR-H6O3ycrzRsEit2VqPcSAunqBtqIvDNCxbBIDEu5NXLXTuOBCjKh_xu635I8vg1hDhyDB7JAk3r4ETjU4BEKjS_sX3JkdbDxuvEfaQS4Nv17rAhiVNE5kr1UzRnxSHAf3g6GjlAT7pXQ8qt12A",
    tag: "IRON CORE",
    stat: "V2.4",
    statLabel: "SYSTEM BUILD",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUh0K2GC0FrpTUs4ZY_ggTh5JmYNoXH92D-avysee7DxtgMCqhhP9LzN8EfNu5yL4wkpuydbW4bTNw2gUCzrrpwdePIEIsvICtA341AetgC7npSYT6nJj3GIrlaVmXBPVw3Dt8hFTesIxahmhssXzq_Ci3klhxbMZdiCJErBj6zfpM9CE5i0H5z-RHBdczFpIL1cLw4igspx0IXBMRDtAydeo7xtmXl0PIb_NRRw-3dp1TtugKc3FJ8DSyURNxPCSCngTPGCl7Iw4",
    tag: "IRON CORE",
    stat: "V5.4",
    statLabel: "SYSTEM BUILD",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const DURATION = 6000;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, DURATION);
    return () => clearInterval(interval);
  }, [next]);

  // Progress bar tick
  useEffect(() => {
    setProgress(0);
    const tick = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (DURATION / 50), 100));
    }, 50);
    return () => clearInterval(tick);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="relative w-full min-h-[600px] md:min-h-[820px] overflow-hidden bg-[#0a0a0a] flex flex-col">
      {/* ── Background images — all pre-rendered, opacity toggled ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={s.src}
              alt={s.tag}
              fill
              priority={i < 2}
              sizes="100vw"
              className="object-cover object-center"
              style={{
                transform: i === current ? "scale(1.04)" : "scale(1)",
                transition: "transform 8s ease-in-out",
              }}
            />
          </div>
        ))}
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Slide tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`tag-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-6 h-px bg-[#caf300]" />
              <span
                className="text-[#caf300] text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                {slide.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Main headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter text-white leading-none mb-6"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              FORGE YOUR <span className="text-[#caf300]">LIMITS</span>
            </motion.h1>
          </AnimatePresence>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-neutral-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Industrial athletics for the modern elite. Push through structural
            barriers with data-driven training and raw intensity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/classes"
              className="inline-flex items-center justify-center gap-3 bg-[#caf300] text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all active:scale-95"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              EXPLORE CLASSES
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 font-black uppercase tracking-widest text-sm hover:border-[#caf300] hover:text-[#caf300] transition-all active:scale-95"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              JOIN THE ELITE
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Right side live stat ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`stat-${current}`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-end gap-1"
        >
          <span
            className="text-5xl lg:text-6xl font-black text-[#caf300]"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            {slide.stat}
          </span>
          <span
            className="text-[10px] text-neutral-500 uppercase tracking-widest"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            {slide.statLabel}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Bottom controls ── */}
      <div className="relative z-20 px-6 md:px-16 lg:px-24 pb-10 flex items-end justify-between">
        {/* Slide indicators with progress */}
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setProgress(0);
              }}
              aria-label={`Slide ${i + 1}`}
              className="relative h-[3px] overflow-hidden transition-all duration-300"
              style={{ width: i === current ? "48px" : "20px" }}
            >
              <div className="absolute inset-0 bg-white/20" />
              {i === current && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#caf300]"
                  style={{ width: `${progress}%` }}
                />
              )}
              {i !== current && (
                <div className="absolute inset-0 bg-white/30" />
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div
          className="text-[10px] text-neutral-600 uppercase tracking-widest"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <span className="text-[#caf300]">
            {String(current + 1).padStart(2, "0")}
          </span>{" "}
          / {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <div className="relative z-20 border-t border-white/5 grid grid-cols-3 divide-x divide-white/5">
        {[
          { value: "156+", label: "Active Classes" },
          { value: "4.9", label: "Avg. Rating" },
          { value: "42+", label: "Students Today" },
        ].map(({ value, label }) => (
          <div
            key={label}
            className="px-6 md:px-10 py-4 flex flex-col items-center gap-0.5"
          >
            <span
              className="text-xl md:text-2xl font-black text-white"
              style={{ fontFamily: "Archivo Narrow, sans-serif" }}
            >
              {value}
            </span>
            <span
              className="text-[9px] text-neutral-600 uppercase tracking-widest"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}