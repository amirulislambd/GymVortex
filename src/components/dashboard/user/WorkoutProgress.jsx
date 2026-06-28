"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { authClient } from "@/lib/auth-client";

// ─── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchWorkoutProgress(email, mode) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/workout-progress?email=${email}&mode=${mode}`,
  );
  const data = await res.json();
  console.log("data:", data);
  if (!data.success) throw new Error("Failed to fetch");
  return data.data;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

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

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ChartSkeleton() {
  return (
    <div className="h-48 sm:h-56 w-full flex items-end gap-2 px-2">
      {[65, 80, 45, 90, 30, 0, 0].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-white/5 animate-pulse rounded-sm"
          style={{ height: `${h || 10}%` }}
        />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function WorkoutProgress() {
  const [mode, setMode] = useState("weekly");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { data: session } = authClient.useSession();
  const email = session?.user?.email;

  useEffect(() => {
    if (!email) return;

    setIsLoading(true);
    setIsError(false);

    fetchWorkoutProgress(email, mode)
      .then((res) => setData(res))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [email, mode]);

  return (
    <div className="bg-[#0f0f0f] border border-neutral-900 p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2
          className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
          style={{ fontFamily: "Archivo Narrow, sans-serif" }}
        >
          Workout Progress
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
      {isLoading ? (
        <ChartSkeleton />
      ) : isError ? (
        <div className="h-48 flex items-center justify-center">
          <p className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
            Failed to load data
          </p>
        </div>
      ) : (
        <div className="h-48 sm:h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data || []} barCategoryGap="30%">
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
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(202,243,0,0.05)" }}
              />
              <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                {(data || []).map((entry, index) => (
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
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer */}
      {!isLoading && !isError && data && (
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
          Based on your class bookings ·{" "}
          {mode === "weekly" ? "Last 7 days" : "Last 4 weeks"}
        </p>
      )}
    </div>
  );
}