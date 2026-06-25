"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { RiGroupLine, RiCalendarCheckLine, RiBookmarkLine } from "react-icons/ri";

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ to, suffix = "" }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const ctrl = animate(count, to, { duration: 1.4, ease: "easeOut" });
    const unsub = count.on("change", (v) => setDisplay(Math.round(v)));
    return () => { ctrl.stop(); unsub(); };
  }, [to]);

  return <motion.span>{display.toLocaleString()}{suffix}</motion.span>;
}

// ─── Single Stat Card ─────────────────────────────────────────────────────────

function StatCard({ icon, label, value, badge, badgeColor }) {
  return (
    <div className="relative flex-1 min-w-[160px] bg-[#111] border border-white/[0.07] p-5 overflow-hidden group">
      {/* hover glow */}
      <div className="absolute inset-0 border border-[#caf300] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* icon + label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[#caf300] text-base">{icon}</span>
        <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em]">{label}</p>
      </div>

      {/* value + badge */}
      <div className="flex items-end gap-2">
        <h3
          className="text-4xl font-black text-white leading-none tracking-tighter"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          <Counter to={value} />
        </h3>
        {badge && (
          <span
            className="text-[10px] font-mono font-bold mb-0.5 uppercase"
            style={{ color: badgeColor || "#caf300" }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminStatCards({ stats }) {
  // stats comes from your API
  // fallback to dummy data until API is connected
  const data = stats || {
    totalUsers: 8420,
    userGrowth: "+4.2%",
    totalClasses: 156,
    classStatus: "Active",
    totalBookedClasses: 1248,
    bookingGrowth: "+8%",
  };

  return (
    <div className="flex flex-wrap gap-3 px-4 sm:px-6 py-4">
      <StatCard
        icon={<RiGroupLine />}
        label="Total Users"
        value={data.totalUsers}
        badge={data.userGrowth}
        badgeColor="#caf300"
      />
      <StatCard
        icon={<RiCalendarCheckLine />}
        label="Total Classes"
        value={data.totalClasses}
        badge={data.classStatus}
        badgeColor="#caf300"
      />
      <StatCard
        icon={<RiBookmarkLine />}
        label="Total Booked Classes"
        value={data.totalBookedClasses}
        badge={data.bookingGrowth}
        badgeColor="#caf300"
      />
    </div>
  );
}