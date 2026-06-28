"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Mon", load: 40 },
  { name: "Tue", load: 30 },
  { name: "Wed", load: 60 },
  { name: "Thu", load: 45 },
  { name: "Fri", load: 80 },
];

export default function AdminPerformance({ logs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3  py-4">
      <div className="bg-[#111] border border-white/[0.07] ">
        <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em] mb-6">
          System Load Matrix
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#555" fontSize={10} />
              <YAxis stroke="#555" fontSize={10} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#000",
                  border: "1px solid #333",
                }}
              />
              <Line
                type="monotone"
                dataKey="load"
                stroke="#caf300"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#111] border border-white/[0.07] p-6 overflow-hidden">
        <h3 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.25em] mb-6">
          Recent Activity Log
        </h3>
        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {logs && logs.length > 0 ? (
            logs.map((log, index) => (
              <div
                key={index}
                className="flex gap-4 border-b border-white/[0.05] pb-2"
              >
                <span className="text-[9px] font-mono text-[#caf300] shrink-0">
                  [{new Date(log.createdAt).toLocaleTimeString()}]
                </span>
                <p className="text-[11px] text-white/70 truncate">
                  {log.action || "New activity detected"}
                  <span className="text-white/30 ml-2 italic">
                    by {log.userName || "System"}
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-[10px] text-white/20 italic">
              No logs available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}