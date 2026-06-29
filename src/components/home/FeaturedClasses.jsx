"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GetClasses } from "@/lib/api/getClasses";
import ClassCard from "../classes/ClassCard";

export default function FeaturedClasses() {
  const [featuredClasses, setFeaturedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadFeaturedData = async () => {
      try {
        // Fetching with specific limit for the landing page matrix layout
        const res = await GetClasses({ page: 1, limit: 6, category: "All" });
        if (ignore) return;

        if (res?.success) {
          setFeaturedClasses(Array.isArray(res.data) ? res.data : []);
        }
      } catch (error) {
        console.log("Error loading featured classes pipeline:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadFeaturedData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="bg-[#131313] text-[#e5e2e1] py-16 px-4 md:px-12 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Heading Metadata Infrastructure */}
        <div className="flex justify-between items-end mb-10 border-b border-[#444932]/20 pb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[#caf300] font-mono text-[10px] tracking-widest uppercase font-bold">
                // CURRENT_CYCLES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight uppercase text-white">
              FEATURED CLASSES
            </h2>
          </div>

          {/* Action Redirection Trigger */}
          <a
            href="/classes"
            className="font-mono text-[11px] text-[#caf300] tracking-widest uppercase border-b border-[#caf300]/40 pb-1 hover:text-white hover:border-white transition-all duration-300 cursor-pointer"
          >
            VIEW ALL CLASSES
          </a>
        </div>

        {/* 3-Column Responsive Grid Integration Wrapper */}
        <div className="min-h-[300px] relative">
          <AnimatePresence mode="wait">
            {!loading && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 md:gap-8"
              >
                {/* Rendering your pre-existing ClassCard component map */}
                {featuredClasses.slice(0, 6).map((item) => (
                  <ClassCard key={item._id} item={item} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
