"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoAnalyticsOutline } from "react-icons/io5";

// ─── Dummy data — replace with API ───────────────────────────────────────────

const DUMMY_DATA = [
  { day: "MON", current: 40, benchmark: 60 },
  { day: "TUE", current: 55, benchmark: 60 },
  { day: "WED", current: 30, benchmark: 60 },
  { day: "THU", current: 70, benchmark: 60 },
  { day: "FRI", current: 85, benchmark: 60 },
  { day: "SAT", current: 95, benchmark: 60 },
  { day: "SUN", current: 50, benchmark: 60 },
];

// ─── Single Bar Group ─────────────────────────────────────────────────────────

function BarGroup({ day, current, benchmark, maxValue, index }) {
  const currentPct  = (current  / maxValue) * 100;
  const benchmarkPct = (benchmark / maxValue) * 100;

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {/* Bars */}
      <div className="relative w-full flex items-end justify-center gap-1" style={{ height: "160px" }}>
        {/* Benchmark bar (dark) */}
        <motion.div
          className="w-[40%] bg-white/10 rounded-sm origin-bottom"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.07, ease: "easeOut" }}
          style={{ height: `${benchmarkPct}%` }}
        />
        {/* Current bar (lime) */}
        <motion.div
          className="w-[40%] rounded-sm origin-bottom"
          style={{
            height: `${currentPct}%`,
            background: currentPct > benchmarkPct
              ? "#caf300"
              : "repeating-linear-gradient(45deg, #caf300, #caf300 4px, #1a2000 4px, #1a2000 8px)",
          }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: index * 0.07 + 0.1, ease: "easeOut" }}
        />
      </div>
      {/* Day label */}
      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{day}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPerformance({ data }) {
  const chartData = data || DUMMY_DATA;
  const maxValue  = Math.max(...chartData.flatMap((d) => [d.current, d.benchmark]));

  return (
    <div className="bg-[#111] border border-white/[0.07] p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2
            className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2"
            style={{ fontFamily: "Archivo Narrow, sans-serif" }}
          >
            <IoAnalyticsOutline className="text-[#caf300]" />
            Performance Analytics
          </h2>
          <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mt-0.5">
            Traffic vs Output relative to 6x Benchmark
          </p>
        </div>
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1">
          Last 07 Days
        </span>
      </div>

      {/* Y-axis grid lines */}
      <div className="relative mb-2">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ height: "160px" }}>
          {[100, 75, 50, 25, 0].map((v) => (
            <div key={v} className="flex items-center gap-2 w-full">
              <span className="text-[8px] font-mono text-white/20 w-6 text-right shrink-0">{v}</span>
              <div className="flex-1 border-t border-white/[0.04]" />
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="flex items-end gap-1 pl-8" style={{ height: "160px" }}>
          {chartData.map((d, i) => (
            <BarGroup
              key={d.day}
              index={i}
              day={d.day}
              current={d.current}
              benchmark={d.benchmark}
              maxValue={maxValue}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pl-8">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#caf300] rounded-sm" />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Current Output</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-white/10 rounded-sm" />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">6x Benchmark</span>
        </div>
      </div>
    </div>
  );
}