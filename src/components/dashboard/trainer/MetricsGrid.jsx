"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

function Counter({ from, to, isFloat }) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 1.3,
      ease: "easeOut",
    });

    const unsubscribe = count.on("change", (v) => {
      setDisplayValue(isFloat ? parseFloat(v.toFixed(1)) : Math.round(v));
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [to]);

  return <motion.span>{displayValue}</motion.span>;
}

export default function MetricsGrid({ metrics }) {
  const {
    totalStudents = 0,
    totalClasses = 0,
    totalEnrolled = 0,
    bookingsTodayCount = 0,
  } = metrics || {};

  const formattedMetrics = [
    {
      title: "TOTAL STUDENTS",
      value: totalStudents,
      badge: "LIVE",
    },
    {
      title: "TOTAL CLASSES",
      value: totalClasses,
      badge: "ACTIVE",
    },
    {
      title: "TOTAL BOOKINGS",
      value: totalEnrolled,
      badge: "BOOKED",
    },
    {
      title: "TODAY BOOKINGS",
      value: bookingsTodayCount,
      badge: "TODAY",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {formattedMetrics.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-2xl border border-white/10
          bg-gradient-to-br from-[#171717] via-[#131313] to-[#0d0d0d]
          p-6 min-h-[175px]
          flex flex-col justify-between
          transition-all duration-500
          hover:-translate-y-1.5
          hover:border-[#caf300]/50
          hover:shadow-[0_0_45px_rgba(202,243,0,.08)]"
        >
          {/* Glow */}
          <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#caf300]/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Animated Top Border */}
          <div className="absolute left-0 top-0 h-[3px] w-0 bg-[#caf300] transition-all duration-500 group-hover:w-full" />

          {/* Animated Bottom Border */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#caf300] transition-all duration-700 group-hover:w-full" />

          {/* Small Accent */}
          <div className="absolute right-5 top-5 h-3 w-3 rounded-full bg-[#caf300]/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-[#caf300]" />

          {/* Header */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/45 font-semibold">
              {item.title}
            </p>
          </div>

          {/* Number */}
          <div className="mt-auto flex items-end justify-between">
            <h2
              className="text-5xl md:text-6xl font-black leading-none tracking-tight text-white"
              style={{
                fontFamily: "'Archivo Narrow','Arial Black',sans-serif",
              }}
            >
              <Counter from={0} to={item.value} isFloat={item.isFloat} />
            </h2>

            <span className="rounded-full border border-[#caf300]/30 bg-[#caf300]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#caf300]">
              {item.badge}
            </span>
          </div>

          {/* Decorative Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}