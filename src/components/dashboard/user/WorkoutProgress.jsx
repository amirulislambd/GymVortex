"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const weeklyData = [
  { day: "MON", value: 65 },
  { day: "TUE", value: 80 },
  { day: "WED", value: 90 },
  { day: "THU", value: 100, current: true },
  { day: "FRI", value: 0 },
  { day: "SAT", value: 0 },
  { day: "SUN", value: 0 },
];

const monthlyData = [
  { day: "W1", value: 70 },
  { day: "W2", value: 85 },
  { day: "W3", value: 60 },
  { day: "W4", value: 90 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div
        className="px-3 py-2 text-xs font-bold uppercase border border-[#caf300]/20 bg-[#0a0a0a]"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        <p className="text-neutral-400">{label}</p>
        <p className="text-[#caf300]">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function WorkoutProgress() {
  const [mode, setMode] = useState("weekly");
  const data = mode === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          WORKOUT PROGRESS
        </h2>
        <div className="flex items-center gap-1">
          {["weekly", "monthly"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest transition-all ${
                mode === m
                  ? "bg-[#caf300] text-[#0a0a0a]"
                  : "text-neutral-500 hover:text-white border border-neutral-800"
              }`}
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {m === "weekly" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 sm:h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="30%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#525252",
                fontSize: 10,
                fontFamily: "JetBrains Mono, monospace",
                fontWeight: 700,
              }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(202,243,0,0.05)" }} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.current
                      ? "url(#stripePattern)"
                      : entry.value > 0
                      ? "#caf300"
                      : "#1a1a1a"
                  }
                />
              ))}
            </Bar>
            <defs>
              <pattern
                id="stripePattern"
                patternUnits="userSpaceOnUse"
                width="8"
                height="8"
                patternTransform="rotate(45)"
              >
                <rect width="4" height="8" fill="#caf300" />
                <rect x="4" width="4" height="8" fill="#2a2a00" />
              </pattern>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}