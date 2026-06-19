"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VortexSpinner({ loading }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const statusText = [
    "calibrating.performance.engines",
    "synchronizing.biometric.nodes",
    "optimizing.workout.schematics",
    "establishing.secure.protocols",
    "loading.vortex.dashboard",
  ];

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statusText.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#131313] text-[#e5e2e1] z-50 flex flex-col items-center justify-center font-mono select-none overflow-hidden"
        >
          {/* Cyberpunk Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #caf300 1px, transparent 1px),
                linear-gradient(to bottom, #caf300 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Deep Radial Vignette Backing */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#000_100%)] pointer-events-none" />

          {/* Scanning Technical Sweep Grid Line */}
          <motion.div
            initial={{ translateY: "-100%" }}
            animate={{ translateY: "100vh" }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#caf300]/10 to-transparent pointer-events-none"
          />

          {/* Structural Top-Left Metadata Indicator */}
          <div className="absolute top-12 left-12 hidden md:block border-l-2 border-[#caf300]/20 pl-4">
            <p className="text-[10px] text-[#caf300]/40 uppercase tracking-widest">
              SYSTEM: FORGEFIT_CORE_V4
            </p>
            <p className="text-[10px] text-[#e5e2e1]/20 uppercase tracking-widest">
              KERNEL: VX-800-ALPHA
            </p>
          </div>

          {/* Structural Bottom-Right Metadata Indicator */}
          <div className="absolute bottom-12 right-12 hidden md:block border-r-2 border-[#caf300]/20 pr-4 text-right">
            <p className="text-[10px] text-[#caf300]/40 uppercase tracking-widest">
              ENCRYPTION: ACTIVE
            </p>
            <p className="text-[10px] text-[#e5e2e1]/20 uppercase tracking-widest">
              PROTOCOL: VX-800
            </p>
          </div>

          {/* Core Sci-Fi Circular HUD Spinner Box - Fully Responsive & Compact */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 flex items-center justify-center">
            {/* Outermost Perfectly Circular Rotating Ledger Track */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-[#caf300]/20 rounded-full"
            >
              {/* Rotating Laser Node */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#caf300] rounded-full shadow-[0_0_12px_#caf300]" />
            </motion.div>

            {/* Inner Concentric Dashed Circle Structure */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 sm:inset-4 border border-dashed border-[#caf300]/10 rounded-full"
            />

            {/* Deep Glassmorphic Circular Core Container */}
            <div className="absolute inset-8 sm:inset-10 bg-[#201f1f]/40 backdrop-blur-md border border-[#caf300]/5 rounded-full flex items-center justify-center shadow-[inset_0_0_25px_rgba(202,243,0,0.03)]" />

            {/* Central High-Intensity Neon Glow Logo V - Scaled down for responsiveness */}
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [0.97, 1.02, 0.97],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex flex-col items-center justify-center scale-75 sm:scale-90 md:scale-100"
            >
              <svg
                className="drop-shadow-[0_0_15px_#caf300]"
                fill="none"
                height="64"
                viewBox="0 0 64 64"
                width="64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 20L32 52L52 20"
                  stroke="#caf300"
                  strokeWidth="5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
                <path
                  d="M22 20L32 36L42 20"
                  stroke="#caf300"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              </svg>
            </motion.div>
          </div>

          {/* Terminal Command Pipeline Output Footer */}
          <div className="mt-10 md:mt-12 text-center space-y-3 px-4 max-w-sm">
            <h1 className="text-[10px] sm:text-xs text-[#caf300] tracking-[0.5em] sm:tracking-[0.6em] font-bold uppercase">
              INITIALIZING VORTEX TERMINAL
            </h1>

            {/* Micro-activity Log Streamer */}
            <div className="flex items-center justify-center space-x-2 min-h-[16px]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-[10px] sm:text-[11px] text-[#c5c9ac] tracking-widest lowercase font-medium"
                >
                  {statusText[currentIndex]}
                </motion.p>
              </AnimatePresence>
              <div className="w-1.5 h-3 bg-[#caf300]/50 animate-pulse shrink-0" />
            </div>
          </div>

          {/* Bottom Security Credentials Node */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20 flex flex-col items-center">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#c5c9ac]">
              VERIFYING CREDENTIALS
            </p>
            <span className="material-symbols-outlined text-[#caf300] text-[14px] mt-1 animate-bounce">
              expand_more
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
