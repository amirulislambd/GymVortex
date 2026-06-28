"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getUserStats } from "@/lib/api/adminOverview";
import { FaUsers } from "react-icons/fa";

const COLORS = ["#caf300", "#00D4FF", "#FF5C8A"];

export default function UserStatsChart() {
  const [stats, setStats] = useState({
    total: 0,
    distribution: {
      admin: 0,
      trainer: 0,
      user: 0,
    },
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUserStats();
        if (data) setStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    {
      name: "Admin",
      value: Number(stats.distribution.admin) || 0,
    },
    {
      name: "Trainer",
      value: Number(stats.distribution.trainer) || 0,
    },
    {
      name: "User",
      value: Number(stats.distribution.user) || 0,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151515] via-[#111] to-[#0b0b0b] p-6 shadow-[0_0_50px_rgba(202,243,0,.08)]">

      {/* Glow */}
      <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-[#caf300]/10 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#caf300]">
            USER DISTRIBUTION
          </p>

          <h2 className="mt-2 text-2xl font-black text-white">
            Platform Users
          </h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#caf300]/20 bg-[#caf300]/10">
          <FaUsers className="text-2xl text-[#caf300]" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">

        {/* Chart */}
        <div className="relative h-[320px] w-full lg:w-1/2">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                cornerRadius={12}
                paddingAngle={5}
                stroke="#111"
                strokeWidth={5}
                animationDuration={1200}
              >
                {chartData.map((item, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                    style={{
                      filter: `drop-shadow(0 0 10px ${COLORS[index]})`,
                    }}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                TOTAL
              </p>

              <h2 className="text-5xl font-black text-white">
                {stats.total}
              </h2>

              <p className="mt-1 text-xs uppercase tracking-widest text-[#caf300]">
                Users
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="w-full lg:w-1/2 space-y-4">

          {chartData.map((item, index) => {
            const percent =
              stats.total > 0
                ? ((item.value / stats.total) * 100).toFixed(1)
                : 0;

            return (
              <div
                key={item.name}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-[#caf300]/40 hover:bg-white/[0.05]"
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{
                        background: COLORS[index],
                        boxShadow: `0 0 15px ${COLORS[index]}`,
                      }}
                    />

                    <div>
                      <h3 className="font-bold text-white">
                        {item.name}
                      </h3>

                      <p className="text-xs uppercase tracking-widest text-white/40">
                        Role
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <h3 className="text-2xl font-black text-[#caf300]">
                      {item.value}
                    </h3>

                    <p className="text-xs text-white/40">
                      {percent}%
                    </p>
                  </div>

                </div>

                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${percent}%`,
                      background: COLORS[index],
                      boxShadow: `0 0 12px ${COLORS[index]}`,
                    }}
                  />
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}