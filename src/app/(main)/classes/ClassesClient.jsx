"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AllClasses from "@/components/classes/AllClasses";

const bannerImages = [
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop",
];

export default function ClassesClient() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % bannerImages.length,
      );
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen relative overflow-hidden">
      {/* Expanded Next.js Optimized Background Slider Layer */}
      <div className="absolute top-0 left-0 w-full h-[650px] md:h-[720px] pointer-events-none select-none z-0">
        {/* Double Layer Dark Cyberpunk Vignette Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/30 via-[#131313]/70 to-[#131313] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_transparent_15%,_#131313_98%)] z-10" />

        {/* Animated Slide Controller Pipeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }} // Matches your exact original opacity requirement
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={bannerImages[currentImageIndex]}
              alt={`Vortex training environment shift ${currentImageIndex + 1}`}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale contrast-125 scale-105"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content Layer with Substantial Top Padding */}
      <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <AllClasses />
      </div>
    </div>
  );
}
