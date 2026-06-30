"use client";

import React from "react";
import { motion } from "framer-motion";

const ClassStats = ({ stats, filteredCount = 0 }) => {

  const pendingCount = stats?.pendingCount ?? 0;
  const approvedCount = stats?.approvedCount ?? 0;
  const rejectedCount = stats?.rejectedCount ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-mono">
      {/*  PENDING APPROVALS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-[#caf300]/20 bg-[#111111] p-5 border-l-4 border-l-[#caf300] shadow-[0_4px_20px_rgba(202,243,0,0.03)] hover:border-[#caf300]/40 transition-all duration-300 rounded-sm"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-widest font-semibold">Pending Approvals</p>
        <p className="text-3xl font-black text-[#caf300] mt-2 tracking-tight">{pendingCount}</p>
      </motion.div>
      
      {/*  TOTAL LIVE CLASSES */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="border border-zinc-800/80 bg-[#111111] p-5 border-l-4 border-l-zinc-500 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:border-[#caf300]/20 transition-all duration-300 rounded-sm"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-widest font-semibold">Total Live Classes</p>
        <p className="text-3xl font-black text-white mt-2 tracking-tight">{approvedCount}</p>
      </motion.div>

      {/*  REJECTED REQUESTS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="border border-zinc-800/80 bg-[#111111] p-5 border-l-4 border-l-red-500/80 shadow-[0_4px_20px_rgba(239,68,68,0.02)] hover:border-red-500/30 transition-all duration-300 rounded-sm"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-widest font-semibold">Rejected Requests</p>
        <p className="text-3xl font-black text-red-500 mt-2 tracking-tight">{rejectedCount}</p>
      </motion.div>

      {/*  FILTERED RESULTS */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15 }}
        className="border border-zinc-800/80 bg-[#111111] p-5 border-l-4 border-l-teal-500/80 shadow-[0_4px_20px_rgba(20,184,166,0.02)] hover:border-teal-500/30 transition-all duration-300 rounded-sm bg-gradient-to-br from-teal-500/5 to-transparent"
      >
        <p className="text-[10px] uppercase text-[#c5c9ac] tracking-widest font-semibold">Filtered Results</p>
        <p className="text-3xl font-black text-white mt-2 tracking-tight">{filteredCount}</p>
      </motion.div>
    </div>
  );
};

export default ClassStats;