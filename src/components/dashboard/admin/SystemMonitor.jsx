"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaServer,
  FaMemory,
  FaDatabase,
  FaShieldAlt,
} from "react-icons/fa";
import { getSystemHealth } from "@/lib/api/adminOverview";

export default function SystemMonitor() {
  const [health, setHealth] = useState({
    trafficLoad: 0,
    dbIntegrity: 0,
    status: "SECURE",
    memoryUsed: "0%",
  });

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await getSystemHealth();
        if (res) setHealth(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 3000);

    return () => clearInterval(interval);
  }, []);

  const traffic = Number(health.trafficLoad) || 0;
  const memory = parseInt(health.memoryUsed) || 0;
  const integrity = Number(health.dbIntegrity) || 0;

  return (
    <div className="space-y-5">

      {/* Traffic */}
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010] p-6 shadow-[0_0_40px_rgba(202,243,0,.05)]"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#caf300]">
              System Traffic
            </p>

            <h2 className="mt-3 text-5xl font-black text-white">
              {traffic}
              <span className="text-[#caf300] text-3xl">%</span>
            </h2>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#caf300]/10 border border-[#caf300]/20">
            <FaServer className="text-3xl text-[#caf300]" />
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${traffic}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-[#caf300]"
          />
        </div>
      </motion.div>

      {/* Memory */}
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010] p-6 shadow-[0_0_40px_rgba(0,212,255,.05)]"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaMemory className="text-xl text-sky-400" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/60">
              Memory Usage
            </span>
          </div>

          <span className="rounded-full bg-sky-500/10 px-3 py-1 text-sm font-bold text-sky-400">
            {health.memoryUsed}
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${memory}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300"
          />
        </div>
      </motion.div>

      {/* Database */}
      <motion.div
        whileHover={{ y: -4 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#101010] p-6 shadow-[0_0_40px_rgba(202,243,0,.05)]"
      >
        <div className="flex items-center justify-between">

          <div>
            <div className="flex items-center gap-3">
              <FaDatabase className="text-xl text-[#caf300]" />

              <span className="text-xs uppercase tracking-[0.25em] text-white/60">
                Database Integrity
              </span>
            </div>

            <h2 className="mt-4 text-4xl font-black text-white">
              {integrity}
              <span className="text-[#caf300] text-2xl">%</span>
            </h2>
          </div>

          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase ${
              health.status === "SECURE"
                ? "bg-[#caf300]/10 text-[#caf300]"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            <FaShieldAlt />
            {health.status}
          </div>
        </div>

        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${integrity}%` }}
            transition={{ duration: 1 }}
            className="h-full rounded-full bg-[#caf300]"
          />
        </div>
      </motion.div>

    </div>
  );
}