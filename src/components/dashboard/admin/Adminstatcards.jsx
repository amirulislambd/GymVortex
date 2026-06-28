"use client";

import { useEffect, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import {
  RiGroupLine,
  RiCalendarCheckLine,
  RiBookmarkLine,
  RiDiscussLine,
} from "react-icons/ri";

// Animated Counter
function Counter({ value = 0 }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, Number(value), {
      duration: 1.4,
      ease: "easeOut",
    });

    const unsubscribe = count.on("change", (v) => setDisplay(Math.round(v)));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value]);

  return <>{display.toLocaleString()}</>;
}

function Card({ icon, title, value, color }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-6 group"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-[radial-gradient(circle_at_top,rgba(202,243,0,.12),transparent_65%)]" />

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[#caf300]/40 transition duration-500" />

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/40 font-mono">
            {title}
          </p>

          <h2
            className="mt-4 text-5xl font-black text-white leading-none"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            <Counter value={value} />
          </h2>
        </div>

        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="flex h-14 w-14 items-center justify-center rounded-xl"
          style={{
            background: `${color}20`,
            color,
          }}
        >
          <span className="text-3xl">{icon}</span>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700"
        style={{
          background: color,
        }}
      />
    </motion.div>
  );
}

export default function AdminStatCards({ stats }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <Card
        title="Total Users"
        value={stats?.totalUsers ?? 0}
        icon={<RiGroupLine />}
        color="#caf300"
      />

      <Card
        title="Total Classes"
        value={stats?.totalClasses ?? 0}
        icon={<RiCalendarCheckLine />}
        color="#00d4ff"
      />

      <Card
        title="Bookings"
        value={stats?.totalBookings ?? 0}
        icon={<RiBookmarkLine />}
        color="#ffb800"
      />

      <Card
        title="Forum Posts"
        value={stats?.totalForums ?? 0}
        icon={<RiDiscussLine />}
        color="#ff4d6d"
      />
    </section>
  );
}